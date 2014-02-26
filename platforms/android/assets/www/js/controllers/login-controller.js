questApp.controller('login-controller', function ($scope, userService) {
    $scope.error = "";
    $scope.email = "";
    $scope.password = "";
    $scope.phone = "";
    $scope.username = "";
    $scope.newUser = false;
    $scope.user = userService.currentUser;
    $scope.loggedIn = false;

    $scope.login = function (email, password) {
        var promise = userService.login(email, password);
        promise.then(function (user) {
          $scope.user = user;
          $scope.loggedIn = true;
        }, function (error) {
          $scope.error = error;
        });
    };

    $scope.register = function (email, password, username, phone) {
        var promise = userService.register(email, password, username, phone);
        promise.then(function (user) {
          $scope.user = user;
          $scope.loggedIn = true;
        }, function (error) {
          $scope.error = error;
        });
    };

    $scope.logOut = function () {
      userService.logOut();
    };

    $scope.rightButtons = [
      {
        type: "button-royal",
        content: "Log Out",
        tap: function (e) {
          $scope.loggedIn = false;
          $scope.logOut();
        }
      }
    ];

    $scope.init = function () {
      if ($scope.user !== null) {
        $scope.loggedIn = true;
      }
    };

    $scope.init();
});