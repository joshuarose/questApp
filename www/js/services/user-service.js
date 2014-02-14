/**
 * Created by joshuarose on 1/8/14.
 */
questApp.factory('userService', function ($location, $q) {
    var factory = {};
    factory.currentUser = null;
    factory.loggedIn = false;

    factory.login = function (username, password) {
        var deferred = $q.defer();

        Parse.User.logIn(username, password, {
          success: function (user) {
            factory.currentUser =  Parse.User.current();
            factory.loggedIn = true;
            window.localStorage.setItem("user", JSON.stringify(user));
            deferred.resolve(user);
          },
          error: function (user, error) {
            alert("Error: " + error.code + " " + error.message);
            deferred.reject(error);
          }
        });
      return deferred.promise;
    };

    factory.register = function (email, password, username, phone) {
        var deferred = $q.defer();

        var user = new Parse.User();
        user.set("username", username);
        user.set("password", password);
        user.set("email", email);
        user.set("phone", phone);

        user.signUp(null, {
          success: function (user) {
            // Hooray! Let them use the app now.
            factory.currentUser =  Parse.User.current();
            factory.loggedIn = true;
            deferred.resolve(user);
          },
          error: function (user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
            deferred.reject(error);
          }
        });
      return deferred.promise;
    };

    factory.init = function () {
        factory.currentUser =  Parse.User.current();
        if (factory.currentUser !== null) {
            factory.loggedIn = true;
        }
    };

    factory.logOut = function () {
      Parse.User.logOut();
      factory.currentUser =  null;
      factory.loggedIn = false;
    };

    factory.getCurrentUser = function () {
        if (!factory.currentUser) {
            factory.currentUser =  Parse.User.current();
            if (factory.currentUser !== null) {
              factory.loggedIn = true;
            }
        }
        return factory.currentUser;
    };
    factory.init();
    return factory;
});