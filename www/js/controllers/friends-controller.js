/**
 * Created by joshuarose on 1/8/14.
 */
questApp.controller('friends-controller', function ($scope) {

    $scope.contacts = [];

    $scope.init = function () {
      function onSuccess(contacts) {
        for (var i = 0; i < contacts.length; i += 1) {
          var newContact = {};
          newContact.name = contacts[i].name.formatted;
          newContact.phone = "";
          if (contacts[i].phoneNumbers) {
            for (var x = 0; x < contacts[i].phoneNumbers.length; x += 1) {
              if (contacts[i].phoneNumbers[x] && contacts[i].phoneNumbers[x].value) {
                var phoneNum = contacts[i].phoneNumbers[x].value.toString();
                if (phoneNum.length >= 10) {
                  newContact.phone += phoneNum.replace("undefined", "");
                }
              }
            }
          }
          $scope.contacts.push(newContact);
        }
        $scope.$apply();
      };

      function onError(contactError) {
        alert('onError!');
      };

      // find all contacts with 'Bob' in any name field
      var options      = new ContactFindOptions();
      options.filter   = "";
      options.multiple = true;
      var fields       = ["displayName", "name", "nickname", "phoneNumbers"];
      navigator.contacts.find(fields, onSuccess, onError, options);
    };

  $scope.init();
});