/**
 * Created by joshuarose on 1/8/14.
 */
questApp.controller('in-list-controller', function($scope){
    $scope.leftButtons = [
        {
            type: 'button-positive',
            content: '<i class="icon ion-navicon"></i>',
            tap: function (e) {
            }
        }
    ];
    $scope.rightButtons = [
        {
            type: 'button-clear',
            content: 'Edit',
            tap: function (e) {
            }
        }
    ];
});