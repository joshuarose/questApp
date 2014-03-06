/**
 * Created by joshuarose on 1/8/14.
 */
questApp.controller('result-tab-Controller', function ($scope, userService) {

    $scope.newResultCount = "";

    $scope.init = function () {
      $scope.getNewResultCount();
    };

  $scope.getNewResultCount = function () {
    if (userService.loggedIn){
      dpd.results.get({owner: userService.currentUser.username, status : "new"}, function(results, error) {
        if(error){
          return;
        }
        if (results.length > 0){
          $scope.newResultCount = results.length.toString();
        }
        $scope.$apply();
      });
    }
  };

  $scope.$on('tab.shown', function() {
    $scope.init();
  });
  $scope.$on('tab.hidden', function() {
    $scope.init();
  });

  $scope.init();
});