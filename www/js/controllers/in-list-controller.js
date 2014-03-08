questApp.controller('in-list-controller', function ($scope, userService, $state) {
  $scope.quests = "";
  $scope.loggedIn = false;
  $scope.empty = true;
  $scope.newQuests = [];
  $scope.completeQuests = [];
  $scope.failedQuests = [];
  $scope.abandonedQuests = [];

  $scope.init = function () {
    if (userService.loggedIn) {
      $scope.loggedIn = true;
      dpd.quests.get({recipients: {$elemMatch : { user: userService.currentUser.username } } }, function(results, error) {
        if(error){
          return;
        }
        $scope.quests = results;
        if (results.length > 0){
          $scope.empty = false;
            for (var x = 0; x < results.length; x++) {
              $scope.sortQuest(results[x]);
            }
          }
        $scope.$apply();
      });
    }
    else {
      $state.go('tab.login');
    }
  };

  $scope.searchFilter = function (obj, status) {
    var re = new RegExp(status, 'i');
    return !$scope.searchText || re.test(obj.status);
  };

  $scope.sortQuest = function (quest) {
    for (var i = 0; i < quest.recipients.length; i++){
      if (quest.recipients[i].user === userService.currentUser.username){
        if (quest.recipients[i].status === "new"){
          $scope.newQuests.push(quest);
        }
        else if (quest.recipients[i].status === "abandoned"){
          $scope.abandonedQuests.push(quest);
        }
        else if (quest.recipients[i].status === "fail"){
          $scope.failedQuests.push(quest);
        }
        else if (quest.recipients[i].status === "complete"){
          $scope.completeQuests.push(quest);
        }
      }
    }
  };

  $scope.openQuest = function (quest) {
    for (var i = 0; i < quest.recipients.length; i++){
      if (quest.recipients[i].user === userService.currentUser.username){
        if (quest.recipients[i].status === "new"){
          $state.go('tab.takerid',{ id: quest.id});
        }
      }
    }
  };

  $scope.init();
});