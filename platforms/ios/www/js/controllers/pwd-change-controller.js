questApp.controller('pwd-change-controller', function ($scope, userService, $state) {
    $scope.data = {};

    $scope.change = function () {
      if (!$scope.data.pass1 || $scope.data.pass1.length < 6){
        toastr.error("Password must be at least 6 characters");
        return;
      }

      if ($scope.data.pass1 !== $scope.data.pass2) {
        toastr.error("Passwords must match");
        return;
      }


      dpd.users.get(userService.currentUser.id, function (results, error) {
        if (results.length < 0) {
          toastr.error("User not found");
          return;
        }
        var user = results;
        user.password = $scope.data.pass1;
        dpd.users.put(userService.currentUser.id, user, function (result, error) {
          if (error) {
            toastr.error(error);
          }
          $state.go("tab.login");
        });
      });
    };
});