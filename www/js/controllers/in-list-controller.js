questApp.controller('in-list-controller', function ($scope, userService, $state) {
  $scope.quests = "";
  $scope.loggedIn = false;
  $scope.empty = true;
  $scope.newQuests = [];
  $scope.completedQuests = [];
  $scope.failedQuests = [];
  $scope.abandonedQuests = [];
  $scope.showDelete = false;

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

  $scope.leftButtons = [
    {
      type: "button-positive",
      content: "<i class='ion-edit'></i>",
      tap : function (e) {
        if ($scope.showDelete){
          $scope.showDelete = false;
        }
        else{
          $scope.showDelete = true;
        }
      }
    }
  ];

  $scope.searchFilter = function (obj, status) {
    var re = new RegExp(status, 'i');
    return !$scope.searchText || re.test(obj.status);
  };



  $scope.onNewItemDelete = function (item) {
    for (var i = 0; i < item.recipients.length; i++) {
      if (item.recipients[i].user === userService.currentUser.username) {
        item.recipients.splice(i,1);
      }
    }

    dpd.quests.put(item.id, item, function (result, error) {
    });


    $scope.quests.splice($scope.quests.indexOf(item), 1);
    $scope.newQuests.splice($scope.newQuests.indexOf(item), 1);

    $scope.$apply();
  };

  $scope.onCompleteItemDelete = function (item) {
    //find recipient from
    for (var i = 0; i < item.recipients.length; i++) {
      if (item.recipients[i].user === userService.currentUser.username) {
        item.recipients.splice(i,1);
      }
    }

    dpd.quests.put(item.id, item, function (result, error) {
    });


    $scope.quests.splice($scope.quests.indexOf(item), 1);
    $scope.completedQuests.splice($scope.completedQuests.indexOf(item), 1);

    $scope.$apply();
  };

  $scope.onFailedItemDelete = function (item) {
    for (var i = 0; i < item.recipients.length; i++) {
      if (item.recipients[i].user === userService.currentUser.username) {
        item.recipients.splice(i,1);
      }
    }

    dpd.quests.put(item.id, item, function (result, error) {
    });


    $scope.quests.splice($scope.quests.indexOf(item), 1);
    $scope.failedQuests.splice($scope.failedQuests.indexOf(item), 1);

    $scope.$apply();
  };

  $scope.onAbandonedItemDelete = function (item) {
    for (var i = 0; i < item.recipients.length; i++) {
      if (item.recipients[i].user === userService.currentUser.username) {
        item.recipients.splice(i,1);
      }
    }

    dpd.quests.put(item.id, item, function (result, error) {
    });


    $scope.quests.splice($scope.quests.indexOf(item), 1);
    $scope.abandonedQuests.splice($scope.abandonedQuests.indexOf(item), 1);

    $scope.$apply();
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
          $scope.completedQuests.push(quest);
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