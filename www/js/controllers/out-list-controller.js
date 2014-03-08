questApp.controller('out-list-controller', function ($scope, userService, $state) {
    $scope.quests = "";
    $scope.loggedIn = false;
    $scope.empty = true;
    $scope.showDelete = false;

    $scope.init = function () {
      if (userService.loggedIn) {
        $scope.loggedIn = true;
        dpd.quests.get({owner: userService.currentUser.username}, function(results, error) {
          if(error){
            return;
          }
          $scope.quests = results;
          if (results.length > 0){
            $scope.empty = false;
          }
          $scope.$apply();
        });
      }
      else {
        $state.go('tab.login');
      }
    };
    $scope.deleteQuest = function (item) {
        dpd.quests.del(item.id, function (result, error){

        });
        $scope.quests.splice($scope.quests.indexOf(item), 1);
      $scope.$apply();
    };
  $scope.rightButtons = [
    {
      type: "button-positive",
      content: "New",
      tap : function (e) {
        $state.go('tab.makerid', {id : createGuid()});
      }
    }
  ];

  $scope.leftButtons = [
    {
      type: "button-positive",
      content: "Edit",
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

  function createGuid()
  {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  $scope.init();
});