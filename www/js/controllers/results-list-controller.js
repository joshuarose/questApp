/**
 * Created by joshuarose on 1/8/14.
 */
questApp.controller('results-list-controller', function($scope, userService) {
  $scope.results = "";
  $scope.loggedIn = false;

  $scope.init = function () {
    if (userService.loggedIn) {
      $scope.loggedIn = true;
      dpd.results.get({owner: userService.currentUser.username }, function(results, error) {
        if(error){
          return;
        }
        $scope.results = results;
        $scope.$apply();
      });
    }
    else {
      $state.go('tab.login');
    }
  };

  $scope.init();
});