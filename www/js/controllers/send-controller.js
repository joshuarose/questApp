/**
 * Created by joshuarose on 2/20/14.
 */
questApp.controller('send-controller', function ($scope, $stateParams, $state) {

  $scope.data = {};
  var recipients = [];
  $scope.questId = "";

  $scope.updateRecipients = function () {
    recipients = $scope.data.sendtext.split(',');
  };

  $scope.rightButtons = [
    {
      type: "button-royal",
      content: "Send",
      tap : function (e) {
        $scope.updateRecipients();
        dpd.quests.put($scope.questId, {recipients: recipients}, function(results, error){
          $state.go('tabs.maker', {location: 'replace'});
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