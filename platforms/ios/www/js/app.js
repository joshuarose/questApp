var questApp = angular.module('questApp', ['ionic','xeditable','ui.bootstrap','angular-md5']);


questApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tab.login', {
      url: '/login',
      views: {
        'login-tab': {
          templateUrl: 'templates/login.html',
          controller: 'login-controller'
        }
      }
    })
    .state('tab.pwdreset', {
      url: '/pwdreset',
      views: {
        'login-tab': {
          templateUrl: 'templates/pwd-reset.html',
          controller: 'pwd-reset-controller'
        }
      }
    })
    .state('tab.pwdchange', {
      url: '/pwdchange',
      views: {
        'login-tab': {
          templateUrl: 'templates/pwd-change.html',
          controller: 'pwd-change-controller'
        }
      }
    })
    .state('tab.results', {
      url: "/results",
      views: {
        'results-tab': {
          templateUrl: "templates/results-list.html",
          controller: 'results-list-controller'
        }
      }
    })
    .state('tab.resultsid', {
      url: "/results/:id",
      views: {
        'results-tab': {
          templateUrl: "templates/results-item.html",
          controller: 'results-item-controller'
        }
      }
    })
    .state('tab.taker', {
      url: "/taker",
      views: {
        'taker-tab': {
          templateUrl: "templates/in-list.html",
          controller: 'in-list-controller'
        }
      }
    })
    .state('tab.takerid', {
      url: "/taker/:id",
      views: {
        'taker-tab' : {
          templateUrl: "templates/in-item.html",
          controller: "in-item-controller"
        }
      }
    })
    .state('tab.maker', {
      url: "/maker",
      views: {
        'maker-tab' : {
          templateUrl: "templates/out-list.html",
          controller: 'out-list-controller'
        }
      }
    })
    .state('tab.makerid', {
      url: "/maker/:id",
      views: {
        'maker-tab' : {
          templateUrl: "templates/out-item.html",
          controller: "out-item-controller"
        }
      }
    })
    .state('tab.send', {
      url: "/send/:id",
      views: {
        'maker-tab' : {
          templateUrl: "templates/send.html",
          controller: "send-controller"
        }
      }
    });
  $urlRouterProvider.otherwise('/tab/login');

});

questApp.run(function (editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
});

questApp.run(function (userService){
  ionic.Platform.ready(function(){
    var device = ionic.Platform.device();
    var pushNotification = window.plugins.pushNotification;
    function successHandler (result) {
      //alert('result = ' + result);
    }

    function errorHandler (error) {
     alert('error = ' + error);
    }

    // iOS
    window.onNotificationAPN = function onNotificationAPN (event) {
      if ( event.alert )
      {
        navigator.notification.alert(event.alert);
      }

      if ( event.sound )
      {
        var snd = new Media(event.sound);
        snd.play();
      }

      if ( event.badge )
      {
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
      }
    }

// Android
    window.onNotificationGCM = function onNotificationGCM(e) {
      //For testing
      //alert('EVENT -> RECEIVED:' + e.event);

      switch( e.event )
      {
        case 'registered':
          if ( e.regid.length > 0 )
          {
            //For testing
            //alert('REGISTERED -> REGID:' + e.regid);
            if (userService.currentUser.username){
              //for testing
              //alert(userService.currentUser.username);
              dpd.users.me(function(result, error){
                //for testing
                //alert(result.id);
                dpd.users.put(result.id, {device : e.regid}, function(results, error){

                });
              });
            }
            // Your GCM push server needs to know the regID before it can push to this device
            // here is where you might want to send it the regID for later use.
            //console.log("regID = " + e.regid);
          }
          break;

        case 'message':
          // if this flag is set, this notification happened while we were in the foreground.
          // you might want to play a sound to get the user's attention, throw up a dialog, etc.
          if ( e.foreground )
          {
            //alert('INLINE NOTIFICATION--');
          }
          else
          {  // otherwise we were launched because the user touched a notification in the notification tray.
            if ( e.coldstart )
            {
              //alert('--COLDSTART NOTIFICATION--');
            }
            else
            {
              //alert('--BACKGROUND NOTIFICATION--');
            }
          }
          toastr.success(e.payload.message);
          //alert('MESSAGE -> MSG: ' + e.payload.message);
          //alert('MESSAGE -> MSGCNT: ' + e.payload.msgcnt);
          break;

        case 'error':
          alert('ERROR -> MSG:' + e.msg);
          break;

        default:
          alert('EVENT -> Unknown, an event was received and we do not know what it is');
          break;
      }
    }
    // result contains any message sent from the plugin call

    function tokenHandler (token) {
      //alert('token: '+ token);
      // Your iOS push server needs to know the token before it can push to this device
      // here is where you might want to send it the token for later use.
      if (userService.currentUser.username){
        dpd.users.me(function(result, error){
          dpd.users.put(result.id, {device : token}, function(results, error){

            });
          });
        };
    }

    if ( device.platform == 'android' || device.platform == 'Android' )
    {
      pushNotification.register(
        successHandler,
        errorHandler, {
          "senderID":"635140378165",
          "ecb":"onNotificationGCM"
        });
    }
    else
    {
      pushNotification.register(
        tokenHandler,
        errorHandler, {
          "badge":"true",
          "sound":"true",
          "alert":"true",
          "ecb":"onNotificationAPN"
        });
    }


  });
});

