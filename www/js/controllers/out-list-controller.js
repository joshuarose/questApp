questApp.controller('out-list-controller', function ($scope, userService, questService, $state) {
    $scope.quests = "";
    $scope.loggedIn = false;
    var dataService = new breeze.DataService({
      serviceName: "https://quest.openspacedev.com:5000/",
      hasServerMetadata: false
    });
    var manager = new breeze.EntityManager({dataService: dataService});



    $scope.init = function () {
      if (userService.loggedIn) {
        $scope.loggedIn = true;
        var query = new breeze.EntityQuery()
          .from("quests")
          //.where("owner", "eq", userService.currentUser.username);

        manager.executeQuery(query).then(function(data){
          $scope.quests = data.results;
          $scope.$apply();
        }).fail(function(e) {
          alert(e);
        });
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
        $state.go('tabs.makerid', {name : createGuid()});
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