/**
 * Created by joshuarose on 3/7/14.
 */
questApp.factory('tabService', function ($http, $q, userService) {
  var factory = {};

  factory.updateTabs = function () {
    factory.getNewResultCount();
    factory.getNewCount();
  };

  factory.getNewResultCount = function () {
    var deferred = $q.defer();
    if (userService.loggedIn){
      dpd.results.get({owner: userService.currentUser.username, status : "new"}, function(results, error) {
        if(error){
          return;
        }
        if (results.length > 0) {
          deferred.resolve(results.length.toString());
        }
      });
    }
    return deferred.promise;
  };

  factory.getNewTakerCount = function () {
    var deferred = $q.defer();
    if (userService.loggedIn){
      dpd.quests.get({recipients: {$elemMatch : { user: userService.currentUser.username, status : "new"}}}, function(results, error) {
        if(error){
          return;
        }
        if (results.length > 0){
          deferred.resolve(results.length.toString());
        }

      });
    }
    return deferred.promise;
  };

  return factory;
});