/**
 * Created by joshuarose on 2/24/14.
 */
questApp.controller('in-item-controller', function($scope, userService, $stateParams, $state, $rootScope, md5){
  $scope.quest = {};
  $scope.questions = [];
  $scope.activeQuestion = {};
  $scope.selected = false;
  $scope.activeAnswer = "";
  $scope.reveal = false;
  $scope.fail = false;
  $scope.sender = {};
  var resultCollection = null;

  $scope.getNextQuestion = function () {
    $scope.addResult();
    for (var i = 0; i < $scope.activeQuestion.answers.length; i++){
      if ($scope.activeQuestion.answers[i].text === $scope.activeAnswer){
        if ($scope.activeQuestion.answers[i].bomb === true){
          for (var x = 0; x < $scope.quest.recipients.length; x++){
            if ($scope.quest.recipients[x].user === userService.currentUser.username){
              $scope.quest.recipients[x].status = "fail";
            }
          }
          dpd.quests.post($scope.quest.id, $scope.quest, function(results, error){
            $rootScope.$viewHistory = {
              histories: { root: { historyId: 'root', parentHistoryId: null, stack: [], cursor: -1 } },
              backView: null,
              forwardView: null,
              currentView: null,
              disabledRegistrableTagNames: []
            };
          });
          $scope.fail = true;
          dpd.results.post(resultCollection, function(results, error){
            $scope.$apply();
          });
          return;
        }
      }
    }
    if($scope.questions.length > 0){
      $scope.activeQuestion = $scope.questions.splice(0, 1)[0];
      $scope.clearSelection();
    }
    else{
      dpd.results.post(resultCollection, function(results, error){
        $scope.reveal = true;
        $scope.finishQuest();
        $scope.$apply();
      });
    }
  };

  $scope.leftButtons = [
    {
      type: 'button-positive',
      content: 'Abandon',
      tap: function(e) {
        for (var i = 0; i < $scope.quest.recipients.length; i++){
          if ($scope.quest.recipients[i].user === userService.currentUser.username){
            $scope.quest.recipients[i].status = "abandoned";
          }
        }
        $scope.endQuest();
      }
    }
  ];


  $scope.endQuest = function () {
    dpd.quests.post($scope.quest.id, $scope.quest, function(results, error){
      $rootScope.$viewHistory = {
        histories: { root: { historyId: 'root', parentHistoryId: null, stack: [], cursor: -1 } },
        backView: null,
        forwardView: null,
        currentView: null,
        disabledRegistrableTagNames: []
      };
      $state.go('tab.taker', {location: 'replace'});
    });
  };

  $scope.addResult  = function () {
    if (resultCollection === null) {
      resultCollection = {questtitle : $scope.quest.title, owner : $scope.quest.owner, taker : userService.currentUser.username, answers : [], status : "new"};
    }

    var result = {question: $scope.activeQuestion.text, answer: $scope.activeAnswer, unchosen: []};

    for (var i = 0; i < $scope.activeQuestion.answers.length; i++){
      if ($scope.activeQuestion.answers[i].text !== $scope.activeAnswer){
        result.unchosen.push($scope.activeQuestion.answers[i].text);
      }
    }
    resultCollection.answers.push(result);
  };

  $scope.finishQuest = function () {
    for (var i = 0; i < $scope.quest.recipients.length; i++){
      if ($scope.quest.recipients[i].user === userService.currentUser.username){
        $scope.quest.recipients[i].status = "complete";
      }
    }
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
      dpd.users.get({username : $scope.quest.owner}, function(results, error){
        $scope.sender = results[0];
        $scope.$apply();
      });
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

  $scope.getGravatar = function (email) {
    var baseUrl = "http://www.gravatar.com/avatar/"
    var hash = md5.createHash(email);
    baseUrl += hash + "?s=200";
    return baseUrl;
  };

  $scope.init();

});