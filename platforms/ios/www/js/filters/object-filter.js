/**
 * Created by joshuarose on 3/7/14.
 */
questApp.filter('objectFilter', function () {
  return function (items, search) {
    var result = [];
    angular.forEach(items, function (value, key) {
      angular.forEach(value, function (value2, key2) {
        if (value2 === search) {
          result.push(value2);
        }
        var objectType = Object.prototype.toString.call(value2);
      })
    });
    return result;

  }
});