(function() {
  'use strict';

  angular.module('ezTip')
    .config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/home');
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'welcome.html'
        })
        .state('calculate', {
          url: '/calculate',
          templateUrl: 'calculate.html',
          controller: 'TipCalculatorCtrl'
        })
    })
})();