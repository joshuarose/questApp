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
          toastr.clear();
          toastr.error(error);
          $scope.loggedIn = false;
        });
    };

    $scope.register = function (email, password, username, phone) {
        var formattedPhone = phone.replace('(','').replace(')','').replace('-','').replace(' ', '');
        var promise = userService.register(email, password, username, formattedPhone);
        promise.then(function (user) {
          $scope.user = user;
          $scope.loggedIn = true;
        }, function (error) {
          toastr.clear();
          toastr.error(error);
          $scope.loggedIn = false;
        });
    };

    $scope.logOut = function () {
      userService.logOut();
      $scope.loggedIn = false;
      $scope.user = null;
    };

    $scope.rightButtons = [
      {
        type: "button-positive",
        content: "Log Out",
        tap: function (e) {
          $scope.loggedIn = false;
          $scope.user = null;
          $scope.logOut();
        }
      }
    ];

    $scope.init = function () {
      if ($scope.user !== null) {
        $scope.loggedIn = true;
      }
      else{
        $scope.loggedIn = false;
        $scope.user = null;
      }
    };

    $scope.init();
});