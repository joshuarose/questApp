questApp.controller('in-list-controller', function ($scope, userService, $state) {
  $scope.quests = "";
  $scope.loggedIn = false;

  $scope.init = function () {
    if (userService.loggedIn) {
      $scope.loggedIn = true;
      dpd.quests.get({recipients: {$elemMatch : { user: userService.currentUser.username } } }, function(results, error) {
        if(error){
          return;
        }
        $scope.quests = results;
        $scope.$apply();
      });
    }
    else {
      $state.go('tab.login');
    }
  };

  $scope.getQuest = function (index) {
    for (var i = 0; i < $scope.quests[index].recipients.length; i++){
      if ($scope.quests[index].recipients[i].user === userService.currentUser.username){
        if ($scope.quests[index].recipients[i].status === "new"){
          return "??????????";
        }
        else if ($scope.quests[index].recipients[i].status === "abandoned"){
          return "?????????";
        }
        else if ($scope.quests[index].recipients[i].status === "fail"){
          return $scope.quests[index].title;
        }
        else if ($scope.quests[index].recipients[i].status === "complete"){
          return $scope.quests[index].title;
        }
      }
    }
  };

  $scope.init();
});