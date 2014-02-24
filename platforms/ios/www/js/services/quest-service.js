/**
 * Created by joshuarose on 1/7/14.
 */
questApp.factory('questService', ['userService', function (userService) {
    var factory = {};
    var createdQuests = null;

    factory.init = function () {
      if (userService.loggedIn) {
        dpd.quests.get(function(quests, error){
         if (error){
           alert(error);
         }
         createdQuests = quests;
        });
      }
    };

    factory.getQuests = function () {
        return createdQuests;
    };
    factory.getQuest = function (name) {
        currentQuiz = createdQuests.filter(function (quiz) {return (quiz.name === name); });
        return currentQuiz;
    };
    factory.postQuest = function (quiz) {
        questDb.update(quiz);
    };
    factory.deleteQuest = function (id) {
        //delete things
    };

    factory.init();
    return factory;
}]);