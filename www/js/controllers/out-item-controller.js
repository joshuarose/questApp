/**
 * Created by joshuarose on 1/7/14.
 */
questApp.controller('out-item-controller', function($scope, questService, userService, $stateParams, $state) {

    $scope.quest = null;
    $scope.questions = null;

    $scope.addQuestion = function () {
      if ($scope.questions.length >= 4){
       toastr.error("A quest can only have 4 questions");
      }
      else{
        dpd.questions.post({questid: $scope.quest.id,text:"", answers:[{"name": "newAnswer", "text": "", "bomb": false, creationtime : Date.now()}, {"name": "newAnswer", "text": "", "bomb": false, creationtime : Date.now()}], creationtime: Date.now()}, function(result, error){
          dpd.questions.get({questid: $scope.quest.id}, function(results, error){
            if(error){
              return;
            }
            $scope.questions = results;
            $scope.$apply();
          });
        });
      }
    };

    $scope.update = function (question) {
      dpd.questions.put(question.id, question, function(results, error){
        $scope.$apply();
      });
    };

    $scope.updateTitle = function () {
      if ($scope.quest.title.length <= 0){
        toastr.error("Title cannot be blank");
        $scope.quest.title = "New quest";
      }
      else{
        dpd.quests.put($scope.quest.id, $scope.quest, function(results, error){
          $scope.$apply();
        });
      }
    };

    $scope.addAnswer = function (question) {
      if (question.answers.length >= 4){
        toastr.error("A question cannot have more than 4 answers");
      }
      else{
        question.answers.push({"name": "newAnswer", "text": "", "bomb": false, creationtime : Date.now()});
        dpd.questions.put(question.id, question, function (result, error) {
          $scope.$apply();
        });
      }
    };

    $scope.removeAnswer = function (question, index) {
      if (question.answers.length <= 2){
        toastr.error("A question must have at least 2 answers");
      }
      else{
        question.answers.splice(index, 1);
        dpd.questions.put(question.id, question, function(result, error){
          $scope.$apply();
        });
      }
    };

    $scope.removeQuestion = function (id) {
      if ($scope.questions.length <= 1){
        toastr.error("A quest must have at least 1 question");
      }
      else{
        dpd.questions.del(id, function(result, error) {
          dpd.questions.get({questid: $scope.quest.id}, function (results, error) {
            if (error) {
              return;
            }
            $scope.questions = results;
            $scope.$apply();
          });
        });
      }
    };

    $scope.rightButtons = [
      {
        type: "button-positive",
        content: "Send",
        tap : function (e) {
          var valid = $scope.validateQuest();
          if (valid){
            $state.go('tab.send', {id : $scope.quest.id});
          }
        }
      }
    ];

    $scope.init = function () {
      $scope.quest = null;
      $scope.questions = null;

      dpd.quests.get({id: $stateParams.id}, function (results, error) {
        $scope.quest = results;
        if ($scope.quest === null) {
            dpd.quests.post({title: "New Quest", owner: userService.currentUser.username}, function (quest, error) {
                $scope.quest = quest;
                dpd.questions.post({questid: quest.id,text:"", answers:[{"name": "newAnswer", "text": "", "bomb": false, creationtime : Date.now()},{"name": "newAnswer", "text": "", "bomb": false, creationtime : Date.now()}], creationtime : Date.now()}, function (result, error) {
                    dpd.questions.get({questid: quest.id}, function(questions, error){
                        $scope.questions = questions;
                        $scope.$apply();
                    });
                });
            });
        }
        $scope.$apply();
      });
      dpd.questions.get({questid: $stateParams.id}, function (results, error) {
        if (error) {
          return;
        }
        $scope.questions = results;
        $scope.$apply();
      });


    };

  $scope.validateQuest = function () {
    //This will be run before you can send a quest

    //no more than 2-4 answers
    //at least 1 answer per question has to be bomb - false
    var noLengthQuestion = false;
    for(var i = 0; i < $scope.questions.length; i++){
      var allWrong = true;
      var noLengthAnswer = false;
      if ($scope.questions[i].text.length < 1){
        noLengthQuestion = true;
      }
      for (var x = 0; x < $scope.questions[i].answers.length; x++){
        if ($scope.questions[i].answers[x].bomb === false){
          allWrong = false;
        }
        if ($scope.questions[i].answers[x].text.length < 1){
          noLengthAnswer = true;
        }
      }
      if (allWrong){
        toastr.error("Each question must have at least one correct answer");
        return false;
      }
      if (noLengthAnswer){
        toastr.error("Answers cannot be blank");
        return false;
      }
    }
    if (noLengthQuestion){
      toastr.error("Questions cannot be blank");
      return false;
    }
    return true;

    //between 1-4 questions

  };

    $scope.focusEditBox = function () {
      //Setting the config.xml preference <preference name="KeyboardDisplayRequiresUserAction" value="false" /> negates the need for this
      //        document.activeElement.blur();
      //        //var tb = document.getElementById('editbox');
      //        $('#editbox').blur().delay(20).focus();

    };

    $scope.init();
});