/**
 * Created by joshuarose on 2/24/14.
 */
questApp.controller('in-item-controller', function($scope, userService, $stateParams, $state){
  $scope.quest = {};
  $scope.questions = [];
  $scope.activeQuestion = {};
  $scope.selected = false;
  $scope.activeAnswer = "";
  $scope.reveal = false;
  var resultCollection = null;

  $scope.getNextQuestion = function () {
    if($scope.questions.length > 0){
      $scope.addResult();
      $scope.activeQuestion = $scope.questions.splice(0, 1)[0];
      $scope.clearSelection();
    }
    else{
      dpd.results.post(resultCollection, function(results, error){
        $scope.reveal = true;
        $scope.$apply();
      });
    }
  };

  $scope.addResult  = function () {
    if (resultCollection === null) {
      resultCollection = {questtitle : $scope.quest.title, owner : $scope.quest.owner, taker : userService.currentUser.username, answers : []};
    }
    var result = {question: $scope.activeQuestion.text, answer: $scope.activeAnswer};

    resultCollection.answers.push(result);
  };

  $scope.selectAnswer = function (answer) {
    if (!$scope.selected){
      $scope.selected = true;
      $scope.activeAnswer = answer.text;
      answer.selected = true;
    }
    else{
      $scope.clearSelection();
      $scope.selected = true;
      $scope.activeAnswer = answer.text;
      answer.selected = true;
    }
  };

  $scope.clearSelection = function () {
    $scope.selected = false;
    for(var i = 0; i < $scope.activeQuestion.answers.length; i++){
      $scope.activeQuestion.answers[i].selected = false;
    }
  };

  $scope.init = function () {
    $scope.quest = null;
    $scope.questions = [];

    dpd.quests.get({id: $stateParams.id}, function (results, error) {
      $scope.quest = results;
    });
    dpd.questions.get({questid: $stateParams.id}, function (results, error) {
      if (error) {
        return;
      }
      for (var i = 0; i < results.length; i++){
        $scope.questions.push(results[i]);
      }

      $scope.activeQuestion = $scope.questions.splice(0, 1)[0];

      $scope.clearSelection();

      $scope.$apply();
    });
  };

  $scope.init();

});