/**
 * Created by joshuarose on 1/7/14.
 */
questApp.factory('questService', ['userService', function (userService) {
    var factory = {};
    var createdQuests = null;

    factory.init = function () {
      if (userService.loggedIn) {
        var myQuests = Parse.Object.extend("Quest");
        var query = new Parse.Query(myQuests);
        query.equalTo("owner", userService.currentUser.get("username"));
        query.find({
          success: function (results) {
            createdQuests = results;
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
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