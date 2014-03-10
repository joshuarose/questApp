/**
 * Created by joshuarose on 1/8/14.
 */
questApp.controller('taker-tab-Controller', function ($scope, userService, tabService) {

    $scope.newTakerCount = "";
    $scope.offline = false;

    $scope.init = function () {
      if (dpd === undefined){
        $scope.offline = true;
        return;
      }
      var promise = tabService.getNewTakerCount();
      promise.then(function(result){
        $scope.newTakerCount = result;
      });
    };

  $scope.$on('tab.shown', function() {
    $scope.init();
    $scope.$apply();
  });
  $scope.$on('tab.hidden', function() {
    $scope.init();
    $scope.$apply();
  });

  $scope.$on('tab.update', function() {
    $scope.init();
  });
  // another controller or even directive

  $scope.init();
});