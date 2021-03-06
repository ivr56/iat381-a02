'use strict';

var a02 =  angular.module('angularjsThreejsApp', ['tjsModelViewer', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute'])

	var globaldial = {};
	var checkcountry = {};

// templateUrl: 'app/mainscreen/globe.html',
	//--------
	//Route Provider
	a02.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
        templateUrl: 'app/mainscreen/globe.html',
				controller: 'MainCtrl'
			})
      .when('/resultsUSEU', {
        templateUrl: 'app/results/resultsUSEU.html',
        controller: 'resultscontroller'
      })
			.when('/resultsUSCHA', {
				templateUrl: 'app/results/resultsUSCHA.html',
				controller: 'resultscontroller'
			})

			.when('/resultsCHAEU', {
				templateUrl: 'app/results/resultsCHAEU.html',
				controller: 'resultscontroller'
			})


			.when('/resultsEUCHA', {
				templateUrl: 'app/results/resultsEUCHA.html',
				controller: 'resultscontroller'
			})
			.when('/resultsCHAUS', {
				templateUrl: 'app/results/resultsCHAUS.html',
				controller: 'resultscontroller'
			})
			.when('/resultsEUUS', {
				templateUrl: 'app/results/resultsEUUS.html',
				controller: 'resultscontroller'
			})

			.otherwise({
				redirectTo: '/'
			});
	});
	//End Route Provider
	//--------
a02.run(function ($rootScope)
{
	//Global Check for US <3 EU
	$rootScope.USEU = 0;
});


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
	// function globaldial.irene(varing)
	// {
	//   console.log("var: " + varing);
	// }

	a02.controller("resultscontroller", function($scope, $rootScope)
	{

		//	$(".knob").globaldial.myfunctions(irenes);
		//
		//
		// var uni = 0;
		// globaldial.jam = function(inti)
		// {
		//
		// 	var irene = inti;
		// 	//If Statement for Countries
		// 	irene = irene*2;
		// 	var irenes = irene.toString()
		//  	console.log("Check Jam: " + irenes);
		// 	document.getElementById("testing").innerHTML = irenes;
		//
		// }


	});



	a02.controller('MainCtrl', function ($scope, $rootScope)
		{



		//Test Attribute
		var test = 0;

		//Verify how many selections were made
		//Add and Subtract values dependent on broadcast messages recieved from ThreeJS/Angular Directives
		var active = 0;

		var activeUSD = 0;
		var activeEU = 0;
		var activeCHA = 0;



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

					document.getElementById("ca").innerHTML = "";
					document.getElementById("cb").innerHTML = "";
					activeUSD = 1;

					if (active === 2)
					{

						//Activate Button to Confirm
						console.log("Button Activated for Exchange through USD");

						// [ code_here. ] //
						// [ Toggle HTML DOM Element Visiblity]
						//--------
					}
					else if (active > 2)
					{

						//Activate Button to Confirm
						console.log("Too Many");

						// [ code_here. ] //
						// [ Toggle HTML DOM Element Visiblity]
						//--------


					}


				}

				else if (msg === 0)
				{
					activeUSD = 0;
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
					activeEU = 1;
					active = active + 1;
					console.log("Active: " + active);
					console.log("Added EU Selection");

					console.log("USD: " + activeUSD);
					document.getElementById("ca").innerHTML = "";
					document.getElementById("cb").innerHTML = "";


					if (active === 2)
					{

						//Activate Button to Confirm
						console.log("Button Activated for Exchange");


						// [ code_here. ] //
						// [ Toggle HTML DOM Element Visiblity]
						//--------


					}

					else if (active > 2)
					{

						//Activate Button to Confirm
						console.log("Too Many");

						// [ code_here. ] //
						// [ Toggle HTML DOM Element Visiblity]
						//--------


					}

				}
				else if (msg === 0)
				{
					activeEU = 0;
					active = active - 1;
					console.log("Active: " + active);
					console.log("Removed EU Selection");

				}


		});
		//End Messages and Activity for EU
		//--------




		//--------
		//Read Read Messages for EU
		$scope.$on("messageCHA", function (e, msg)
		{
				console.log(msg + " : CHA");
				if (msg === 1)
				{
					activeCHA = 1;
					active = active + 1;
					console.log("Active: " + active);
					console.log("Added CHA Selection");

					document.getElementById("ca").innerHTML = "";
					document.getElementById("cb").innerHTML = "";

					if (active === 2)
					{

						//Activate Button to Confirm
						console.log("Button Activated for Exchange");


						// [ code_here. ] //
						// [ Toggle HTML DOM Element Visiblity]
						//--------


					}
					else if (active > 2)
					{

						//Activate Button to Confirm
						console.log("Too Many");


						// [ code_here. ] //
						// [ Toggle HTML DOM Element Visiblity]
						//--------


					}


				}
				else if (msg === 0)
				{
					activeCHA = 0;
					active = active - 1;
					console.log("Active: " + active);
					console.log("Removed CHA Selection");

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



	a02.controller('states', function ($scope, $rootScope, $location)
	{

			$scope.usdeu = function()
			{
				console.log('/resultsUSEU');
				$location.url('/resultsUSEU');
			}
			$scope.usdcha = function ()
			{
				console.log('USCHA');
				$location.url('/resultsUSCHA');
			}
			$scope.chaeu = function ()
			{
				console.log('CHAEU');
				$location.url('/resultsCHAEU');
			}


	});

	a02.controller('resultstates', function ($scope, $rootScope, $location)
	{

			//US - EU
			$scope.usdeu = function()
			{
				console.log('/resultsUSEU');
				$location.url('/resultsUSEU');
			}
			$scope.euusd = function()
			{
				console.log('/resultsEUUS');
				$location.url('/resultsEUUS');
			}


			//CHA - US
			$scope.usdcha = function ()
			{
				console.log('USCHA');
				$location.url('/resultsUSCHA');
			}
			$scope.chaus = function ()
			{
				console.log('CHAEU');
				$location.url('/resultsCHAUS');
			}

			//EU - CHA
			$scope.eucha = function ()
			{
				console.log('EUCHA');
				$location.url('/resultsEUCHA');
			}
			$scope.chaeu = function ()
			{
				console.log('CHAEU');
				$location.url('/resultsCHAEU');
			}
	});


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
