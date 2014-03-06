/**
 * Created by joshuarose on 1/8/14.
 */
questApp.controller('tab-Controller', function ($scope, userService) {

    $scope.newTakerCount = "";
    $scope.newResultCount = "";

    $scope.init = function () {
      $scope.getNewCount();
      $scope.getNewResultCount();
    };

    $scope.getNewCount = function () {
      if (userService.loggedIn){
        dpd.quests.get({recipients: {$elemMatch : { user: userService.currentUser.username, status : "new"}}}, function(results, error) {
          if(error){
            return;
          }
          if (results.length > 0){
            $scope.newTakerCount = results.length.toString();
          }
          $scope.$apply();
        });
      }
    };

  $scope.getNewResultCount = function () {
    if (userService.loggedIn){
      dpd.results.get({owner: userService.currentUser.username, status : "new"}, function(results, error) {
        if(error){
          return;
        }
        if (results.length > 0){
          $scope.newResultCount = results.length.toString();
        }
        $scope.$apply();
      });
    }
  };

  $scope.init();
});