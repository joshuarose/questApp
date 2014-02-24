// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var questApp = angular.module('questApp', ['ionic','xeditable']);


questApp.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // the pet tab has its own child nav-view and history
    .state('tab.login', {
      url: '/login',
      views: {
        'login-tab': {
          templateUrl: 'templates/login.html',
          controller: 'login-controller'
        }
      }
    })
    .state('tab.results', {
      url: "/results",
      views: {
        'results-tab': {
          templateUrl: "templates/results.html",
          controller: 'results-controller'
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

//    .state('tab.pet-detail', {
//      url: '/pet/:petId',
//      views: {
//        'pets-tab': {
//          templateUrl: 'templates/pet-detail.html',
//          controller: 'PetDetailCtrl'
//        }
//      }
//    })
//
//    .state('tab.adopt', {
//      url: '/adopt',
//      views: {
//        'adopt-tab': {
//          templateUrl: 'templates/adopt.html'
//        }
//      }
//    })
//
//    .state('tab.about', {
//      url: '/about',
//      views: {
//        'about-tab': {
//          templateUrl: 'templates/about.html'
//        }
//      }
//    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

});

questApp.run(function (editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
});

