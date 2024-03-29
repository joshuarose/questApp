questApp.controller('login-controller', function ($scope, userService, smsService, $state) {
    $scope.error = "";
    $scope.email = "";
    $scope.password = "";
    $scope.phone = "";
    $scope.username = "";
    $scope.newUser = false;
    $scope.user = userService.currentUser;
    $scope.loggedIn = false;
    $scope.offline = false;

    $scope.login = function (email, password) {
        var promise = userService.login(email, password);
        promise.then(function (user) {
          if (user){
            $scope.user = user;
            $scope.loggedIn = true;
            $scope.$emit('tab.update', null);
          }
        }, function (error) {
          toastr.clear();
          toastr.error(error);
          $scope.loggedIn = false;
        });
    };

    $scope.validateInfo = function (email, password, phone, user) {
      var formValid = true;

      var re = /\S+@\S+\.\S+/;
      var emailValid = re.test(email);

      if (!emailValid) {
        toastr.error("Valid email required");
        formValid = false;
      }

      var re2 = /^\(?\d{3}\)? ?-? ?\d{3} ?-? ?\d{4}$/;
      var phoneValid = re2.test(phone);
      if (!phoneValid) {
        toastr.error("Valid phone required");
        formValid = false;
      }

      var formattedPhone = phone.replace('(','').replace(')','').replace('-','').replace('+','').replace(/\s+/, "").trim();
      if (formattedPhone.length !== 10){
        toastr.error("Phone number must be valid 10 digit syntax");
        formValid = false;
      }

      if (password.length < 6){
        toastr.error("Password must be at least 6 characters");
        formValid = false;
      }

      if (user.length < 4){
        toastr.error("Username must be at least 4 characters");
        formValid = false;
      }

      return formValid;
    };

    $scope.register = function (email, password, username, phone) {
        if ($scope.validateInfo (email,password,phone,username)) {
          var formattedPhone = phone.replace('(','').replace(')','').replace('-','').replace('+','').replace(/\s+/, "").trim();
          var promise = userService.register(email, password, username, formattedPhone);
          promise.then(function (user) {
            if (user){
              $scope.user = user;
              $scope.loggedIn = true;
              $scope.$emit('tab.update', null);
              smsService.sendSMS(formattedPhone, "Thanks for registering for quest " + username + "!");
            }
          }, function (error) {
            toastr.clear();
            toastr.error(error);
            $scope.loggedIn = false;
          });
        }
    };

    $scope.logOut = function () {
      userService.logOut();
      $scope.loggedIn = false;
      $scope.user = null;
    };

    $scope.resetPassword = function () {
      $state.go("tab.pwdreset")
    };

    $scope.changePassword = function () {
      $state.go("tab.pwdchange")
    };

    $scope.init = function () {
      if (dpd === undefined){
        $scope.offline = true;
        return;
      }
      if ($scope.user) {
        $scope.loggedIn = true;
        $scope.user = userService.currentUser;
        $scope.$emit('tab.update', null);
      }
      else{
        $scope.loggedIn = false;
        $scope.user = null;
      }
    };

    $scope.init();
});