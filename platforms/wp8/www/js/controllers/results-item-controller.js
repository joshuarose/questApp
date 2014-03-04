/**
 * Created by joshuarose on 1/8/14.
 */
questApp.controller('results-item-controller', function($scope, $stateParams) {
  $scope.pageTitle = "";
  $scope.result = "";
  $scope.init = function () {
      dpd.results.get({id: $stateParams.id}, function(results, error) {
        if(error){
          return;
        }
        $scope.result = results;
        $scope.pageTitle = $scope.result.questtitle + "-" + $scope.result.taker;
        $scope.$apply();
      });
  };

  $scope.init();
});