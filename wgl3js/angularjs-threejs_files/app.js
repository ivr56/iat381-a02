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
	//Manage View State. Check Currency to be Used by User/Visitor

	a02.controller('MainCtrl', function ($scope, $rootScope)
		{

		//--------

		//Test Attribute
		var test = 0;

		//Verify how many selections were made
		//Add and Subtract values dependent on broadcast messages recieved from ThreeJS/Angular Directives
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
				console.log("Bank Relay : " + msg);

				if (msg === 1)
				{
					active = active + 1;
					console.log("Active Currencies: " + active);
					console.log("Added USD Selection to Active");

					if (active === 2)
					{

						//Activate Button to Confirm
						console.log("Button Activated for Exchange");

						// [ code_here. ] //
						// [ Toggle HTML DOM Element Visiblity]
						//--------


					}

				}

				else if (msg === 0)
				{
					active = active - 1;
					console.log("Active Currencies: " + active);
					console.log("Removed USD Selection from Active");
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
					console.log("Active: " + active);
					console.log("Added EU Selection");

					if (active === 2)
					{

						//Activate Button to Confirm
						console.log("Button Activated for Exchange");

						// [ code_here. ] //
						// [ Toggle HTML DOM Element Visiblity]
						//--------


					}


				}
				else if (msg === 0)
				{
					active = active - 1;
					console.log("Active: " + active);
					console.log("Removed EU Selection");
				}


		});
		//End Messages and Activity for EU
		//--------




		//Check Activity if 2 Selected Run Button



		// [ code_here. ] //
		// [ Toggle HTML DOM Element Visiblity]

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
		//Test function and value passthrough
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
	a02.controller('ViewState', function ($scope, $rootScope)
	{

		//--------
		//Read Read Messages for EU
		$scope.$on("messageView", function (e, msg)
		{
				console.log(msg + " : EU");
				if (msg === 1)
				{
					active = active + 1;
					console.log("Added Selection");

				}
				else if (msg === 0)
				{
					active = active - 1;
					console.log("Removed Selection");
				}


		});
		//End Messages and Activity for EU
		//--------


		//On Click Switch Views
		$scope.confirm = function ()
		{
			//Test Code


		}



	});



	//Change View State
	//-----------------------------
	//-----------------------------
	//-----------------------------



	//Second View State
	//-----------------------------
	//-----------------------------
	//-----------------------------

	a02.controller('logicState', function ($scope, $rootScope)
	{


	});


	//Change View State
	//-----------------------------
	//-----------------------------
	//-----------------------------
