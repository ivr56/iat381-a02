'use strict';

angular.module('iat381-a02', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/mainscreen/globe_experiment.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
