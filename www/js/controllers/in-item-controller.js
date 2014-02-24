/**
 * Created by joshuarose on 2/24/14.
 */
questApp.controller('in-item-controller', function($scope, userService, $stateParams, $state){
  $scope.quest = {};
  $scope.questions = [];
  $scope.activeQuestion = {};

  $scope.getNextQuestion = function () {
    $scope.activeQuestion = $scope.questions.splice(0, 1)[0];
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

      $scope.$apply();
    });
  };

  $scope.init();

});