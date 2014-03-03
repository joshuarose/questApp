/**
 * Created by joshuarose on 2/20/14.
 */
questApp.controller('send-controller', function ($scope, $stateParams, $state, $location, $rootScope) {

  $scope.data = {};
  var recipients = [];
  $scope.questId = "";
  $scope.searchResults = {};
  $scope.sendList = [];
  $scope.selected = "";

  $scope.updateRecipients = function () {
    //if there are  commas
    recipients = [];
    for(var i = 0; i < $scope.sendList.length; i++) {
      recipients.push({"user" : $scope.sendList[i], status : "new"});
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

  $scope.formatInput = function ($model){
    $model = "";
  };

  $scope.removeRecipients = function (index) {
    $scope.sendList.splice(index, 1);
  };

  $scope.userTypeAhead = function(query){
    //dpd.users.get({username : query }, function(results, error){
    //phone regex : /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
    var phoneQuery = query.replace('(','').replace(')','').replace('-','').replace(' ', '');
    dpd.users.get({ $or :[{username :  {$regex : "^" + query, $options : 'i'}},{email: query },{ phone: {$regex : "^" + phoneQuery, $options : 'i'} }]}, function(results, error){
      $scope.searchResults = results;
      $scope.$apply();
    });
  };

  $scope.init = function () {
    $scope.questId = $stateParams.id;
    $scope.$apply();
  };

  $scope.init();
});