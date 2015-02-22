'use strict';

angular.module('iat381-a02', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/mainscreen/threejstest.html',
        controller: ''
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
