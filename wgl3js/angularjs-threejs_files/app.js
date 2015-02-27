'use strict';

	//--------
var a02 = angular.module('angularjsThreejsApp', ["tjsModelViewer"]);
	//--------

	//--------
	//Route Provider
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
	//End Route Provider
	//--------


	//--------
	//Global Scope
	a02.run(function ($rootScope)
		{
		}
		);
	//End Global Scope
	//--------



	//--------
	//Master Controller
	a02.controller('MainCtrl', function ($scope, $rootScope) {

		//--------
		var test = 0;
		//--------


		//--------
		//Read Read Messages and Activity from ThreeJS + AngularJS Directive
		$scope.$on("message", function (e, msg)
		{
				console.log(msg + "Active");
				test = 2;

				//Message Service to Control JQuerry + Javascript Windows
				testing();

		});
		//End Messages and Activity from ThreeJS + AngularJS Directive
		//--------


		//--------
		//Check Communciation Between Functions
		function testing()
		{
			console.log(test);
		}
		//End Communciation Between Functions
		//--------


	});
	//End Master Controller
	//--------
	//--------
	//--------
