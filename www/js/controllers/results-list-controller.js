/**
 * Created by joshuarose on 1/8/14.
 */
questApp.controller('results-list-controller', function($scope, userService, $state) {
  $scope.results = "";
  $scope.loggedIn = false;
  $scope.empty = true;

  $scope.init = function () {
    if (userService.loggedIn) {
      $scope.loggedIn = true;
      dpd.results.get({owner: userService.currentUser.username }, function(results, error) {
        if(error){
          return;
        }
        $scope.results = results;
        if (results.length > 0){
          $scope.empty = false;
        }
        $scope.$apply();
      });
    }
    else {
      $state.go('tab.login');
    }
  };

  $scope.init();
});