/**
 * Created by joshuarose on 2/20/14.
 */
questApp.controller('send-controller', function ($scope, $stateParams, $state, $location, $rootScope, smsService, $q, $timeout, $ionicLoading) {

  $scope.data = {};
  var recipients = [];
  $scope.questId = "";
  $scope.contacts = [];
  $scope.searchResults = {};
  $scope.sendList = [];
  $scope.selected = "";
  var unmatched = [];

  $scope.updateRecipients = function () {
    //if there are  commas
    var deferred = $q.defer();
    recipients = [];
    for(var i = 0; i < $scope.sendList.length; i++) {
      (function(index){
        var phoneQuery = $scope.sendList[index].phone[0].replace('(','').replace(')','').replace('-','').replace('+','').replace(/\s+/, "").trim();
        dpd.users.get({ $or :[{email: {$regex : $scope.sendList[index].email[0], $options : 'i' }},{ phone: {$regex : "^" + phoneQuery, $options : 'i'} }]}, function(results, error) {
          if (results.length > 0){
            var recipientMatch = results[0];
            recipients.push({"user" : recipientMatch.username, status : "new"});
            $scope.notifyNonQuesters($scope.sendList[index], true);
          }
          else{
            $scope.notifyNonQuesters($scope.sendList[index], false);
          }
        });
      })(i);
    }
    $timeout(function () {
      deferred.resolve();
    }, 2000);
    return deferred.promise;
  };

  $scope.notifyQuesters = function (matched){

  };

  $scope.showWait = function() {

    // Show the loading overlay and text
    $scope.loading = $ionicLoading.show({

      // The text to display in the loading indicator
      content: 'Loading',

      // The animation to use
      animation: 'fade-in',

      // Will a dark overlay or backdrop cover the entire view
      showBackdrop: true,

      // The maximum width of the loading indicator
      // Text will be wrapped if longer than maxWidth
      maxWidth: 200,

      // The delay in showing the indicator
      showDelay: 500
    });
  };

  // Hide the loading indicator
  $scope.hideWait = function(){
    $scope.loading.hide();
  };

  $scope.notifyNonQuesters = function (unmatched, bl) {
      if (unmatched.phone.length > 0){
        var formattedPhone = unmatched.phone[0].replace('(','').replace(')','').replace('-','').replace('+','').replace(/\s+/, "").trim();
        if (formattedPhone.length > 10){
          formattedPhone = formattedPhone.substring(1,10);
        }
        if(bl){
          smsService.sendSMS(formattedPhone, "A friend has sent you a new quest! Get to it!");
        }
        else{
          smsService.sendSMS(formattedPhone, "A friend has tried to send you a quest! Download QuestApp on your smart phone app store!");
        }
      }
  };

  $scope.onSelect = function ($item, $model, $label) {
    var contains = false;
    for (var i = 0; i < $scope.sendList.length; i++) {
      if ($scope.sendList[i] === $model){
        contains = true;
      }
    }
    if (!contains){
      $scope.sendList.push($model);
    }
    $scope.selected = "";
  };

  $scope.rightButtons = [
    {
      type: "button-positive",
      content: "Send",
      tap : function (e) {
        $scope.showWait();
        $scope.updateRecipients().then(function (){
          dpd.quests.put($scope.questId, {recipients: recipients}, function (results, error) {
            $rootScope.$viewHistory = {
              histories: { root: { historyId: 'root', parentHistoryId: null, stack: [], cursor: -1 } },
              backView: null,
              forwardView: null,
              currentView: null,
              disabledRegistrableTagNames: []
            };
            $scope.hideWait();
            $state.go('tab.maker', {location: 'replace'});
          });
        });
      }
    }
  ];

  $scope.formatInput = function ($model){
    $model = "";
  };

  $scope.removeRecipients = function (index) {
    $scope.sendList.splice(index, 1);
  };

  $scope.userTypeAhead = function(query){
    var phoneQuery = query.replace('(','').replace(')','').replace('-','').replace(' ', '');
    var options      = new ContactFindOptions();
    options.filter   = "query";
    options.multiple = true;
    var fields       = ["displayName", "name", "nickname", "phoneNumbers", "emails"];
    navigator.contacts.find(fields, onSuccess, onError, options);
    $scope.$apply();
  };

  $scope.init = function () {
    function onSuccess(contacts) {
      for (var i = 0; i < contacts.length; i += 1) {
        var newContact = {};
        newContact.name = contacts[i].name.formatted;
        newContact.phone = [];
        newContact.email = [];
        if (contacts[i].phoneNumbers) {
          for (var x = 0; x < contacts[i].phoneNumbers.length; x += 1) {
            if (contacts[i].phoneNumbers[x] && contacts[i].phoneNumbers[x].value) {
              var phoneNum = contacts[i].phoneNumbers[x].value.toString();
              if (phoneNum.length >= 10) {
                newContact.phone.push(phoneNum.replace("undefined", ""));
              }
            }
          }
        }
        if (contacts[i].emails) {
          for (var x = 0; x < contacts[i].emails.length; x += 1) {
            if (contacts[i].emails[x] && contacts[i].emails[x].value) {
              var email = contacts[i].emails[x].value.toString();
              if (email.length >= 1) {
                newContact.email.push(email.replace("undefined", ""));
              }
            }
          }
        }
        $scope.contacts.push(newContact);
      }
      $scope.$apply();
      $('#receivertext').focus();
    };

    function onError(contactError) {
      alert('onError!');
    };

    // find all contacts with 'Bob' in any name field
    var options      = new ContactFindOptions();
    options.filter   = "";
    options.multiple = true;
    var fields       = ["displayName", "name", "nickname", "phoneNumbers", "emails"];
    navigator.contacts.find(fields, onSuccess, onError, options);
    $scope.questId = $stateParams.id;
    $scope.$apply();
  };

  $scope.init();
});