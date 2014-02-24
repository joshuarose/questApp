questApp.controller('out-list-controller', function ($scope, userService, $state) {
    $scope.quests = "";
    $scope.loggedIn = false;

    $scope.init = function () {
      if (userService.loggedIn) {
        $scope.loggedIn = true;
        dpd.quests.get({owner: userService.currentUser.username}, function(results, error) {
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
    $scope.deleteQuest = function (quest) {
        questService.deleteQuest(quest.$id);
    };
  $scope.rightButtons = [
    {
      type: "button-royal",
      content: "New Quest",
      tap : function (e) {
        $state.go('tab.makerid', {id : createGuid()});
      }
    }
  ];

  function createGuid()
  {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  $scope.init();
});