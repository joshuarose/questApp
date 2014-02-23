questApp.controller('in-list-controller', function ($scope, userService, $state) {
  $scope.quests = "";
  $scope.loggedIn = false;

  $scope.init = function () {
    if (userService.loggedIn) {
      $scope.loggedIn = true;
      dpd.quests.get({recipients: userService.currentUser.username }, function(results, error) {
        if(error){
          return;
        }
        $scope.quests = results;
        $scope.$apply();
      });
    }
    else {
      $state.go('tabs.login');
    }
  };

  $scope.init();
});