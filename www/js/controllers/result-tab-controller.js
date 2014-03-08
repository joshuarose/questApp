/**
 * Created by joshuarose on 1/8/14.
 */
questApp.controller('result-tab-Controller', function ($scope, userService, tabService) {

    $scope.newResultCount = "";

    $scope.init = function () {
      var promise = tabService.getNewResultCount();
      promise.then(function(result){
        $scope.newResultCount = result;
      });
    };

  $scope.$on('tab.shown', function() {
    $scope.init();
  });
  $scope.$on('tab.hidden', function() {
    $scope.init();
  });

  $scope.$on('tab.update', function() {
    $scope.init();
  });

  $scope.init();
});