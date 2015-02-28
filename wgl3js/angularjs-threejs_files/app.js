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
	//End Global Scope
	//--------



	//var APP = {};
	//APP.publicMethods = {};


	//-----------------------------
	//-----------------------------
	//-----------------------------
	//Master Controller
	a02.controller('MainCtrl', function ($scope, $rootScope) {

		//--------
		var test = 0;

		var active = 0;

		//--------------------------------------------
		//--------------------------------------------
		//--------------------------------------------


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
		//Read Read Messages for USD
		$scope.$on("messageUSD", function (e, msg)
		{
				console.log(msg + " : USD");

				if (msg === 1)
				{
					active = active + 1;

				}
				else if (msg === 0)
				{
					active = active - 1;
				}

		});
		//End Messages and Activity for USD
		//--------


		//--------
		//Read Read Messages for EU
		$scope.$on("messageEU", function (e, msg)
		{
				console.log(msg + " : EU");
				if (msg === 1)
				{
					active = active + 1;

				}
				else if (msg === 0)
				{
					active = active - 1;
				}


		});
		//End Messages and Activity for EU
		//--------


		//--------
		//Read Read Messages for CHA
		$scope.$on("messageCHA", function (e, msg)
		{
				console.log(msg + ": CHA");
				if (msg === 1)
				{
					active = active + 1;

				}
				else if (msg === 0)
				{
					active = active - 1;
				}

		});
		//End Messages and Activity for CHA
		//--------

		//Check Activity if 2 Selected Run Button
		if (active === 2)
		{

			//Activate Button to Confirm

			//--------


		}


		//--------------------------------------------
		//--------------------------------------------
		//--------------------------------------------


		// $scope.foo = 'bar';
		//
		// APP.publicMethods.doSomething = $scope.doSomething = function() {
		// 	$scope.foo = 'bar none';
		// 	$scope.$apply();
		// }


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
	//-----------------------------
	//-----------------------------
	//-----------------------------





	//Change View State
	//-----------------------------
	//-----------------------------
	//-----------------------------






	//Change View State
	//-----------------------------
	//-----------------------------
	//-----------------------------
