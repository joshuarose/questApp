/**
 * Created by joshuarose on 1/7/14.
 */
questApp.controller('out-item-controller', function($scope, questService, userService, $stateParams, $firebase) {
    var url = "https://bubblequizdb.firebaseio.com/users/" + userService.getCurrentUser().email.replace('.', "") + "/createdQuests/" + $stateParams.name;
    var createdQuestRef = new Firebase(url);

    var quizRef = $firebase(createdQuestRef);
    quizRef.$bind($scope, 'quiz');

    if (quizRef.questionCount === undefined) {
      quizRef.$set({name: "new quiz", questionCount: 1, questions: { question1: { name: "question1", answerCount: 1,  answers: {"answer1": {"name" : "answer1", "bomb" : false}}}}});
      quizRef.$bind($scope, 'quiz');
    }

    $scope.addQuestion = function () {
        if (quizRef.questionCount === 0) {
            $score.quiz = {
              name: "new quiz",
              questionCount: 1,
              questions:
              {
                question1:
                {
                  name: "question1",
                  answerCount: 1,
                  answers:
                  {
                    "answer1": {
                      "name" : "answer1",
                      "bomb" : false
                    }
                  }
                }
              }
            };
            //quizRef.$set({name: "new quiz", questionCount: 1, questions: { question1: { name: "question1", answerCount: 1,  answers: {"answer1": {"name" : "answer1", "bomb" : false}}}}});
        }
        else{
            var nextQuestionId = quizRef.questionCount + 1;
            var questionRef = createdQuestRef.child('questions').child('question' + nextQuestionId);
            var questions = $firebase(questionRef);
            var newQuestion = { name: "question" + nextQuestionId, answerCount: 1,  answers: {"answer1": {"name":"answer1", "bomb": false}}};
            questions.$set(newQuestion);
            quizRef.questionCount += 1;
        }
    };
    $scope.addAnswer = function(questionName) {
        var newUrl = url + "/questions/" + questionName;
        var questionRef = new Firebase(newUrl);
        questionRef.once("value", function (questionCb) {
            var question = questionCb.val();
            question.answerCount += 1;
            questionRef.update(question);
            var answerRef = createdQuestRef.child('questions').child(questionName).child('answers').child('answer' + question.answerCount);
            var answer = $firebase(answerRef);
            var newAnswer = {"name": "answer" + question.answerCount, "bomb": false};
            answer.$set(newAnswer);
        });
    };
    $scope.removeAnswer = function (questionName, answerName) {
        var answerRef = createdQuestRef.child('questions').child(questionName).child('answers').child(answerName);
        var answer = $firebase(answerRef);
        answer.$remove();
        var newUrl = url + "/questions/" + questionName;
        var questionRef = new Firebase(newUrl);
        questionRef.once("value", function (questionCb) {
            var question = questionCb.val();
            question.answerCount -= 1;
            questionRef.update(question);
        });
    };
    $scope.removeQuestion = function(questionName) {
        var questionRef = createdQuestRef.child('questions').child(questionName);
        var question = $firebase(questionRef);
        question.$remove();
        quizRef.questionCount -= 1;
    };
    $scope.focusEditBox = function () {
        var tb = document.getElementById('editbox');
        tb.focus();
        tb.scroll = tb.maxScroll;
        tb.scrollTop = tb.scrollHeight;
    };
});