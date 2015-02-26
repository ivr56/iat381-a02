'use strict';
var a02 = angular.module('iat381-a02', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute'])

  a02.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/mainscreen/globe_experiment.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
