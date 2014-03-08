questApp.controller('pwd-reset-controller', function ($scope, userService, smsService, $state) {
    $scope.data = {};
    $scope.offline = false;

    $scope.reset = function () {
      if (dpd === undefined){
        $scope.offline = true;
        return;
      }
      var query = {"email":  {$regex : $scope.data.email, $options : 'i'}};

      dpd.users.get(query, function (result) {
        if (result.length > 0){
          var user = result[0];
          var newPass = userService.generatePassword();
          user.password = newPass;
          dpd.users.put(user.id, user, function(result, error){
            if (error){
              toastr.error(error);
            }
            smsService.sendSMS(user.phone, "Your password has been reset to : " + newPass);
            $state.go("tab.login");
          });
        }
        else{
          toastr.error("Email not found");
        }
      });
    };

});