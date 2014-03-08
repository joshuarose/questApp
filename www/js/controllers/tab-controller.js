/**
 * Created by joshuarose on 1/8/14.
 */
questApp.controller('tab-Controller', function ($scope, userService, tabService) {

    $scope.newTakerCount = "";
    $scope.newResultCount = "";
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
      var promise2 = tabService.getNewResultCount();
      promise2.then(function(result){
        $scope.newResultCount = result;
      });
    };
  // another controller or even directive

  $scope.$on('tab.update', function() {
    $scope.init();
  });

  $scope.init();
});