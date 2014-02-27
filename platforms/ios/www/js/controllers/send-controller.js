/**
 * Created by joshuarose on 2/20/14.
 */
questApp.controller('send-controller', function ($scope, $stateParams, $state, $location, $rootScope) {

  $scope.data = {};
  var recipients = [];
  $scope.questId = "";

  $scope.updateRecipients = function () {
    //if there are  commas
    recipients = [];
    var names = $scope.data.sendtext.split(',');
    for(var i = 0; i < names.length; i++) {
      recipients.push({"user" : names[i], status : "new"});
    }
  };

  $scope.rightButtons = [
    {
      type: "button-royal",
      content: "Send",
      tap : function (e) {
        $scope.updateRecipients();
        dpd.quests.put($scope.questId, {recipients: recipients}, function(results, error){
          //$location.replace('#/tab/maker');
          $rootScope.$viewHistory = {
            histories: { root: { historyId: 'root', parentHistoryId: null, stack: [], cursor: -1 } },
            backView: null,
            forwardView: null,
            currentView: null,
            disabledRegistrableTagNames: []
          };
          $state.go('tab.maker', {location: 'replace'});
        });
      }
    }
  ];

  $scope.init = function () {
    $scope.questId = $stateParams.id;
    $scope.$apply();
  };

  $scope.init();
});