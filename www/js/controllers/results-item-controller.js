/**
 * Created by joshuarose on 1/8/14.
 */
questApp.controller('results-item-controller', function($scope, $stateParams) {
  $scope.result = "";
  $scope.init = function () {
      dpd.results.get({id: $stateParams.id}, function(results, error) {
        if(error){
          return;
        }
        $scope.result = results;
        $scope.$apply();
      });
  };

  $scope.init();
});