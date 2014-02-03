questApp.controller('out-list-controller', function ($scope, userService, questService, $state) {
    $scope.quizes = "";
    $scope.loggedIn = false;

    $scope.init = function () {
      if (userService.loggedIn) {
        $scope.loggedIn = true;
        $scope.quizes = questService.getQuizes(userService.getCurrentUser().email);
      }
      else {
        $state.go('tabs.login');
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
        $state.go('tabs.makername', {name : createGuid()});
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