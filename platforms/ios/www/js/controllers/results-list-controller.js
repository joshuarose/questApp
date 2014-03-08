/**
 * Created by joshuarose on 1/8/14.
 */
questApp.controller('results-list-controller', function($scope, userService, $state) {
  $scope.results = "";
  $scope.loggedIn = false;
  $scope.empty = true;
  $scope.showDelete = false;
  $scope.offline = false;

  $scope.init = function () {
    if (dpd === undefined){
      $scope.offline = true;
      return;
    }
    if (userService.loggedIn) {
      $scope.loggedIn = true;
      dpd.results.get({owner: userService.currentUser.username }, function(results, error) {
        if(error){
          return;
        }
        $scope.results = results;
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

  $scope.deleteResult = function (item) {
    dpd.results.del(item.id, function (result, error){

    });
    $scope.results.splice($scope.results.indexOf(item), 1);
    $scope.$apply();
  };

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

  $scope.init();
});