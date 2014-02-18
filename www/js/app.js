var questApp = angular.module('questApp', ['ionic', 'xeditable']); //, 'ngTouch', 'ngAnimate', 'ngRoute'
questApp.strict = function strict() {
    // Function-level strict mode syntax
    'use strict';
};

questApp.strict();

questApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tabs', {
            url: "/tab",
            abstract: true,
            templateUrl: "../templates/tabs.html"
        })
        .state('tabs.login', {
            url: "/login",
            views: {
                'login-tab': {
                    templateUrl: "../templates/login.html",
                    controller: 'login-controller'
                }
            }
        })
        .state('tabs.results', {
            url: "/results",
            views: {
                'results-tab': {
                    templateUrl: "../templates/results.html",
                    controller: 'results-controller'
                }
            }
        })
        .state('tabs.taker', {
            url: "/taker",
            views: {
                'taker-tab': {
                    templateUrl: "../templates/in-list.html",
                    controller: 'in-list-controller'
                }
            }
        })
        .state('tabs.friends', {
            url: "/friends",
            views: {
                'friends-tab' : {
                    templateUrl: "../templates/friends.html",
                    controller: 'friends-controller'
                }
            }
        })
        .state('tabs.maker', {
            url: "/maker",
            views: {
                'maker-tab' : {
                    templateUrl: "../templates/out-list.html",
                    controller: 'out-list-controller'
                }
            }
        })
        .state('tabs.makerid', {
            url: "/maker/:id",
            views: {
                'maker-tab' : {
                    templateUrl: "../templates/out-item.html",
                    controller: "out-item-controller"
                }
            }
        });

    // if none of the above are matched, go to this one
    $urlRouterProvider.otherwise("tab/login");
});

questApp.run(function (editableOptions, editableThemes) {
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
});