'use strict';

var a02 = angular.module('angularjsThreejsApp', ["tjsModelViewer"]);

	a02.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});

	a02.run(function ($rootScope)
		{
			$rootScope.activeUSD = 0;
			$rootScope.activeCAD = 0;




		}
		);


	a02.controller('MainCtrl', function ($scope, $rootScope) {

		if ($rootScope.activeUSD === 1)
		{
			console.log("USD Recieved");
		}
		else if ($rootScope.activeCAD === 1)
		{
			console.log("CAD Recieved");
		}


		});
