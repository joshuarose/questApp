/**
 * Created by joshuarose on 1/8/14.
 */
questApp.factory('userService', function ($firebaseAuth, $location, $q) {
    var factory = {};
    factory.currentUser = null;
    factory.loggedIn = false;


    factory.db = new Firebase("https://bubblequizdb.firebaseio.com/");
    factory.usersDb = factory.db.child("users");
    factory.currentUserDb = null;

    //authenticate with the server
    factory.auth = $firebaseAuth(factory.db);

    factory.login = function (email, password) {
        var deferred = $q.defer();
        factory.auth.$login('password', {email: email, password: password }).then(function (user) {
            window.localStorage.setItem("user", JSON.stringify(user));
            factory.currentUser =  user;
            factory.currentUserDb = factory.usersDb.child(email.replace('.', ""));
            factory.loggedIn = true;
            deferred.resolve(user);
        }, function (error) {
            deferred.reject(error);
        });
      return deferred.promise;
    };

    factory.getCurrentQuestUrl = function () {
      return "https://bubblequizdb.firebaseio.com/users/" + factory.auth.user.email.replace('.', "") + "/createdQuests";
    };

    factory.register = function (email, password, username, phone) {
        var deferred = $q.defer();
        factory.auth.$createUser(email, password, null).then(function (user) {
                window.localStorage.setItem("user", JSON.stringify(user));
                factory.currentUser =  user;
                factory.currentUserDb = factory.usersDb.child(email.replace('.', ""));
                factory.usersDb.update({userId: user.id, username: username, phoneNumber: phone});
                factory.loggedIn = true;
                deferred.resolve(user);
            },
          function (error) {
            deferred.resolve(error);
          });
    };

    factory.init = function () {
        var storedUser = window.localStorage.getItem("user");
        factory.currentUser =  JSON.parse(storedUser);
        if (factory.currentUser !== null) {
            factory.auth.user = factory.currentUser;
            factory.currentUserDb = factory.usersDb.child(factory.currentUser.email.replace('.', ""));
            factory.loggedIn = true;
        }
    };

    factory.logOut = function () {
      window.localStorage.removeItem("user");
      factory.currentUser =  null;
      factory.auth.user = null;
      factory.currentUserDb = null;
      factory.loggedIn = false;
    };

    factory.getCurrentUser = function () {
        if (!factory.currentUser) {
            var storedUser = window.localStorage.getItem("user");
            factory.currentUser =  JSON.parse(storedUser);
            if (factory.currentUser !== null) {
              factory.loggedIn = true;
            }
        }
        return factory.currentUser;
    };
    factory.init();
    return factory;
});