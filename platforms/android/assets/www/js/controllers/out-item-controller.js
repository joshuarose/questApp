/**
 * Created by joshuarose on 1/7/14.
 */
questApp.controller('out-item-controller', function($scope, questService, userService, $stateParams, $state) {

    $scope.quest = null;
    $scope.questions = null;

    $scope.addQuestion = function () {
      dpd.questions.post({questid: $scope.quest.id,text:"", answers:[]}, function(result, error){
        dpd.questions.get({questid: $scope.quest.id}, function(results, error){
          if(error){
            return;
          }
          $scope.questions = results;
          $scope.$apply();
        });
      });
    };

    $scope.update = function (question) {
      dpd.questions.put(question.id, question, function(results, error){
        $scope.$apply();
      });
    };

    $scope.updateTitle = function () {
      dpd.quests.put($scope.quest.id, $scope.quest, function(results, error){
        $scope.$apply();
      });
    };

    $scope.addAnswer = function (question) {
      question.answers.push({"name": "newAnswer", "text": "", "bomb": false});
      dpd.questions.put(question.id, question, function (result, error) {
        $scope.$apply();
      });
    };

    $scope.removeAnswer = function (question, index) {
      question.answers.splice(index, 1);
      dpd.questions.put(question.id, question, function(result, error){
        $scope.$apply();
      });
    };

    $scope.removeQuestion = function (id) {
      dpd.questions.del(id, function(result, error) {
        dpd.questions.get({questid: $scope.quest.id}, function (results, error) {
          if (error) {
            return;
          }
          $scope.questions = results;
          $scope.$apply();
        });
      });
    };

    $scope.rightButtons = [
      {
        type: "button-royal",
        content: "Send",
        tap : function (e) {
          $state.go('tab.send', {id : $scope.quest.id});
        }
      }
    ];

    $scope.init = function () {
      $scope.quest = null;
      $scope.questions = null;

      dpd.quests.get({id: $stateParams.id}, function (results, error) {
        $scope.quest = results;
        if ($scope.quest === null) {
            dpd.quests.post({title: "New Quest", owner: userService.currentUser.username}, function (quest, error) {
                $scope.quest = quest;
                dpd.questions.post({questid: quest.id,text:"", answers:[]}, function (result, error) {
                    dpd.questions.get({questid: quest.id}, function(questions, error){
                        $scope.questions = questions;
                        $scope.$apply();
                    });
                });
            });
        }
        $scope.$apply();
      });
      dpd.questions.get({questid: $stateParams.id}, function (results, error) {
        if (error) {
          return;
        }
        $scope.questions = results;
        $scope.$apply();
      });


    };

    $scope.focusEditBox = function () {
      //Setting the config.xml preference <preference name="KeyboardDisplayRequiresUserAction" value="false" /> negates the need for this
      //        document.activeElement.blur();
      //        //var tb = document.getElementById('editbox');
      //        $('#editbox').blur().delay(20).focus();

    };

    $scope.init();
});