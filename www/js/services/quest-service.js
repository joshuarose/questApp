/**
 * Created by joshuarose on 1/7/14.
 */
questApp.factory('questService', ['$firebase','userService', '$firebaseAuth', function ($firebase, userService) {
    var factory = {};
    var url = "https://bubblequizdb.firebaseio.com/users/";
    var createdQuests = null;

    factory.init = function () {
      if (userService.loggedIn) {
        url += userService.getCurrentUser().email.replace('.', "") + "/createdQuests";
        createdQuests = $firebase(new Firebase(url));
      }
    };

    factory.getQuizes = function () {
        return createdQuests;
    };
    factory.getQuiz = function (name) {
        currentQuiz = createdQuests.filter(function (quiz) {return (quiz.name === name); });
        return currentQuiz;
    };
    factory.postQuiz = function (quiz) {
        questDb.update(quiz);
    };
    factory.deleteQuest = function (id) {
        var quest = $firebase(createdQuestRef.child(id));
        quest.$remove();
    };

    factory.init();
    return factory;
}]);