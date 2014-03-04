/**
 * Created by joshuarose on 1/8/14.
 */
questApp.factory('userService', function ($location, $q) {
    var factory = {};
    factory.currentUser = null;
    factory.loggedIn = false;

    factory.login = function (un, pw) {
        var deferred = $q.defer();

        dpd.users.login({
          username: un,
          password: pw
        }, function (result, error) {
            if (error){
              factory.loggedIn = false;
              deferred.reject(error.message);
              return;
            }
            dpd('users').get('me', function(result, error) {
              factory.currentUser = result;
              factory.loggedIn = true;
              window.localStorage.setItem("user", JSON.stringify(factory.currentUser));
              deferred.resolve(result);
            });
          });
      return deferred.promise;
    };

    factory.register = function (email, pw, un, phone) {
      var deferred = $q.defer();

      dpd.users.post({
        username: un,
        password: pw,
        email: email,
        phone: phone
      }, function(user, error) {
        if (error) {
          if (error.message) {
            factory.loggedIn = false;
            deferred.reject(error.message);
            return;
          } else if (error.errors) {
            var messages = '';
            var errors = error.errors;

            if (errors.username) {
              messages += "Username " + errors.username + "\n";
            }
            if (errors.password) {
              messages += "Password " + errors.password + "\n";
            }

            deferred.reject(messages);
          }
        } else {
          dpd.users.login({
            username: un,
            password: pw
          }, function (result, error) {
            if (error){
              factory.loggedIn = false;
              deferred.reject(error.message);
              return;
            }
            dpd('users').get('me', function(result, error) {
              factory.currentUser = result;
              factory.loggedIn = true;
              window.localStorage.setItem("user", JSON.stringify(result));
              deferred.resolve(result);
            });
          });
        }
      });

      return deferred.promise;
    };

    factory.init = function () {
      var user = JSON.parse(window.localStorage.getItem("user"));
      if (user){
        factory.currentUser =  user;
        factory.loggedIn = true;
      }
      else{
        factory.currentUser = null;
        factory.loggedIn = false;
      }
    };

    factory.logOut = function () {
      var user = window.localStorage.removeItem("user");
      factory.currentUser =  null;
      factory.loggedIn = false;
      dpd.users.logout(function(result, error) {

      });
    };

    factory.getCurrentUser = function () {
        if (factory.currentUser) {
            return factory.currentUser;
        }
    };
    factory.init();
    return factory;
});