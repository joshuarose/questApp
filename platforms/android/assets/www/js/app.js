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

