angular.module("tjsModelViewer", [])
	.directive(
		"tjsModelViewer",
		[function () {
			return {
				restrict: "E",
				scope: {
					//assimpUrl: "=assimpUrl"
				},
				link: function ($scope, $elem, $attr) {
					var container;
					var camera;
					var scene;
					var renderer;
					var previous;
					var controls;
					//var keyboard = new KeyboardState();


					//Inject
					var targetList = [];
		        var projector, mouse = { x: 0, y: 0 },INTERSECTED;
		        var selectedFaces = [];
		        var floorSide=1000;
		        var baseColor=new THREE.Color( 0x44dd66 );
		        var highlightedColor=new THREE.Color( 0xddaa00 );
		        var selectedColor=new THREE.Color( 0x4466dd );
		        var mouseSphereCoords = null;
		        var mouseSphere=[];
		        var country_targetList = [];

					//Inject End

					// init scene
					init();


					// Load Model --------
					// Load jeep model using the AssimpJSONLoader
					// var loader1 = new THREE.AssimpJSONLoader();
					//
					//
					// scope.$watch("assimpUrl", function(newValue, oldValue) {
					// 	if (newValue != oldValue) loadModel(newValue);
					// });
					//
					// function loadModel(modelUrl) {
					//
					// 	//Model Loader
					// 	loader1.load(modelUrl, function (assimpjson) {
					// 		assimpjson.scale.x = assimpjson.scale.y = assimpjson.scale.z = 0.2;
					// 		assimpjson.updateMatrix();
					// 		if (previous) scene.remove(previous);
					// 		//Add to Scene
					// 		scene.add(assimpjson);
					//
					// 		previous = assimpjson;
					//
					// 	});
					// }
					// // Load Model --------
					//
					// loadModel(scope.assimpUrl);

					//Earth Geometry
					 var newEarth= new THREE.SphereGeometry(75,75,75);
					 var newEarth_shaded = new THREE.Mesh(newEarth, new THREE.MeshBasicMaterial({ color: 0x2266dd }));
					 newEarth_shaded.position.x = 0;
					 newEarth_shaded.position.y = 0;
					 newEarth_shaded.position.z = 0;
					 newEarth_shaded.name = "Earth";
					scene.add(newEarth_shaded);


					//American Dollar
					 var newtouchpointUSD= new THREE.SphereGeometry(5,5,5);
					 var newtouchpointUSD_shaded = new THREE.Mesh(newtouchpointUSD, new THREE.MeshBasicMaterial({ color: 0x2266dd }));
					 newtouchpointUSD_shaded.position.x = 0;
					 newtouchpointUSD_shaded.position.y = 50;
					 newtouchpointUSD_shaded.position.z = -75;

					 scene.add(newtouchpointUSD_shaded);
					 //Add to Interaction List
					 targetList.push(newtouchpointUSD_shaded);

					 //country_targetList.push("American Dollar");


				 //Euro
				 var newtouchpointEU= new THREE.SphereGeometry(5,5,5);
				 var newtouchpointEU_shaded = new THREE.Mesh(newtouchpointEU, new THREE.MeshBasicMaterial({ color: 0x2266dd }));
				 newtouchpointEU_shaded.position.x = 0;
				 newtouchpointEU_shaded.position.y = 50;
				 newtouchpointEU_shaded.position.z = 75;
				 scene.add(newtouchpointEU_shaded);
				 targetList.push(newtouchpointEU_shaded);
				 country_targetList.push("Euro");

				//
				//
				// //Chinese Yen
				// var newtouchpointCHA= new THREE.SphereGeometry(5,5,5);
				// var newtouchpointCHA_shaded = new THREE.Mesh(newtouchpointCHA, new THREE.MeshBasicMaterial({ color: 0x2266dd }));
				// newtouchpointCHA_shaded.position.x = 100;
				// newtouchpointCHA_shaded.position.y = 50;
				// newtouchpointCHA_shaded.position.z = 0;
				// scene.add(newtouchpointCHA_shaded);
				// targetList.push(newtouchpointCHA_shaded);
				// country_targetList.push("Chinese Yen");


					animate();

					//Initilize Start
					function init() {
						//camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);

						// CAMERA


						//camera.position.set(0,250,950);

						scene = new THREE.Scene();
						var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
						var VIEW_ANGLE = 30, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 10000;
						camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
						scene.add(camera);
						camera.position.set(-750,50,0);
						camera.lookAt(scene.position);
						//scene.fog = new THREE.FogExp2(0x000000, 0.035);

						// Lights
						var light = new THREE.AmbientLight( 0x333333 ); // soft white light
		        	scene.add( light );
		        	var light = new THREE.PointLight(0xffffff,1,4500);
		        	light.position.set(-300,1000,-300);
		        	scene.add(light);



							// // FLOOR
						  //       	var faceMat = new THREE.MeshBasicMaterial({color: 0x888888,side: THREE.DoubleSide});
						  //       	var wireMat = new THREE.MeshBasicMaterial({color:0xaaaaaa,wireframe:true,transparent:true});
						  //       	var multiMat = [faceMat ,wireMat];
							//
						  //       	var floor= THREE.SceneUtils.createMultiMaterialObject(new THREE.PlaneGeometry(floorSide, floorSide, 10, 10),multiMat);
							//
						  //       	floor.rotation.x = Math.PI / 2;
						  //       	scene.add(floor);


							// // SKYBOX
						  //   	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
							//   	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0xdddddd, side: THREE.BackSide } );
						  //   	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
						  //   	scene.add(skyBox);





						  //Renderer
						  renderer = new THREE.CanvasRenderer();
						  //renderer = new THREE.WebGLRenderer( {antialias:true} );
						  renderer.setSize(window.innerWidth, window.innerHeight);
						  //elem[0].appendChild(renderer.domElement);
						  container = document.getElementById( 'ThreeJS' );
						  container.appendChild(renderer.domElement );

						  // Events


						  // RENDERER

				        	// renderer = new THREE.WebGLRenderer( {antialias:true} );
				        	// renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
				        	// container = document.getElementById( 'ThreeJS' );
				        	// container.appendChild(renderer.domElement );

				        	// EVENTS

				        	// CONTROLS
				        	controls = new THREE.OrbitControls( camera, renderer.domElement );

									// LIGHT
				        	var light = new THREE.AmbientLight( 0x333333 ); // soft white light
				        	scene.add( light );
				        	var light = new THREE.PointLight(0xffffff,1,4500);
				        	light.position.set(-300,1000,-300);
				        	scene.add(light);
				        	// FLOOR
				        	// var faceMat = new THREE.MeshBasicMaterial({color: 0x888888,side: THREE.DoubleSide});
				        	// var wireMat = new THREE.MeshBasicMaterial({color:0xaaaaaa,wireframe:true,transparent:true});
				        	// var multiMat = [faceMat ,wireMat];
				        	// var floor= THREE.SceneUtils.createMultiMaterialObject(new THREE.PlaneGeometry(floorSide, floorSide, 10, 10),multiMat);
				        	// floor.rotation.x = Math.PI / 2;
				        	// scene.add(floor);

				        	// SKYBOX




						// initialize object to perform world/screen calculations
					 projector = new THREE.Projector();

					 // when the mouse moves, call the given function
					 document.addEventListener( 'mousedown', onDocumentMouseDown, false );
					 document.addEventListener( 'mousemove', onDocumentMouseMove, false );


						window.addEventListener('resize', onWindowResize, false);
					}
					//Initilize End





					//On Resize
					function onWindowResize(event) {
						renderer.setSize(window.innerWidth, window.innerHeight);
						camera.aspect = window.innerWidth / window.innerHeight;
						camera.updateProjectionMatrix();
					}
					//On Resize End


					var t = 0;

					//Inject 3

					//Mouse Move Start
		        function onDocumentMouseMove( event )
		        {
							console.log("Go");
		        	// the following line would stop any other event handler from firing
		        	// (such as the mouse's TrackballControls)
		        	//event.preventDefault();
		        	// update the mouse variable
		        	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		        	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		        }
		        //Mouse Move End

		        //Mouse Down
		        function onDocumentMouseDown( event )
		        {
							console.log("Bang");
		        	// the following line would stop any other event handler from firing
		        	// (such as the mouse's TrackballControls)
		        	// event.preventDefault();
		        	//console.log("Click.");
		        	// update the mouse variable
		        	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		        	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		        	checkSelection();
		        }
		        //Mouse Down End



						//Inject 4

						// Find intersections
						function checkSelection(){


							// create a Ray with origin at the mouse position
							//   and direction into the scene (camera direction)
							console.log("Ping");
							console.log("Emitting");

							//$scope.$emit("message", "Hello, this is ThreeJS!");


							//Validate Loaded Currnecies
							//console.log("Loaded Models: " + targetList);
							//console.log("Loaded Identifiers: " + country_targetList);

							var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
							projector.unprojectVector( vector, camera );
							var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

							// create an array containing all objects in the scene with which the ray intersects
							var intersects = ray.intersectObjects( targetList );




							//if an intersection is detected
							if ( intersects.length > 0 )
							{
								//Validate Intersect
								console.log("Intersects :" + intersects.length);
								console.log("Intersect Location : " + intersects);



								//test items in selected faces array

								var test=-1;

								//Activity of Economy
								var activityUSD=0;
								var activityEU=0;



								//Validate State
								selectedFaces.forEach( function(arrayItem)
								{


									//Validate Selection
									console.log("What Country was Selected? " + arrayItem.object.id);



									//Validate USD
									if (arrayItem.object.id === 8)
									{
										console.log("After True Check 00 on USD");
										activityUSD = 1;
										// $scope.$emit("message", "USD Active");
										// $scope.$emit("messageUSD", 1);

										//test=arrayItem.object.id;
										//----------------------------
										// if the faceIndex and object ID are the same between the intersect and selected faces ,
										// the face index is recorded
										if(intersects[0].faceIndex==arrayItem.faceIndex && intersects[0].object.id==arrayItem.object.id){
											test=selectedFaces.indexOf(arrayItem);
											console.log("ObjectID 01 Check: " + arrayItem.object.id);
											console.log("Check FaceIndex - Check 01 on USD")
											activityUSD = 2;

										}
										//Check Face Index
										//----------------------------
									}
									//End Validation of USD


									//Validate EU
									else if (arrayItem.object.id === 9)
									{
										console.log("After True Check 00 on EU");
										activityEU = 1;
										// $scope.$emit("message", "USD Active");
										// $scope.$emit("messageUSD", 1);

										//test=arrayItem.object.id;
										//----------------------------
										// if the faceIndex and object ID are the same between the intersect and selected faces ,
										// the face index is recorded
										if(intersects[0].faceIndex==arrayItem.faceIndex && intersects[0].object.id==arrayItem.object.id){
											test=selectedFaces.indexOf(arrayItem);
											console.log("ObjectID 01 Check: " + arrayItem.object.id);
											console.log("Check FaceIndex - Check 01 on EU")
											activityEU = 2;

										}
										//Check Face Index
										//----------------------------
									}

									//End Validation of EU




								});
								//Selected Faces

								// if is a previously selected face, change the color back to green, otherswise change to blue
								if(test>=0)
								{

									console.log("False Flag: " + "USD: " + activityUSD + " EU: " + activityEU);
									intersects[ 0 ].face.color=new THREE.Color( 0x44dd66 );
									selectedFaces.splice(test, 1);


									//Validate De-Selection of USD
									if (activityUSD === 2)
									{
										console.log("Test Flag A Set To : " + test );
										console.log("False Flag for USD");
										$scope.$emit("message", "USD In-Active");
										$scope.$emit("messageUSD", 0);
										test = -1;
										console.log("Test Flag B Set To : " + test );
										activityUSD = 0;
									}
									//-----
									else if (activityEU === 2)
									{
										console.log("Test Flag A Set To : " + test );
										console.log("False Flag for EU");
										$scope.$emit("message", "EU In-Active");
										$scope.$emit("messageEU", 0);
										test = -1;
										console.log("Test Flag B Set To : " + test );
										activityEU = 0;
									}



								}


								else
								{

									console.log("True Flag: " + "USD: " + activityUSD + " EU: " + activityEU);
									intersects[ 0 ].face.color=new THREE.Color( 0x222288 );
									selectedFaces.push(intersects[0]);

									//Validate USD Selection to Master Controller
									if (activityUSD === 1)
									{
										console.log("True Flag for USD");
										$scope.$emit("message", "USD Active");
										$scope.$emit("messageUSD", 1);

										activityUSD = 1;
									}
									//-----

									//Validate EU Selection to Master Controller
									else if (activityEU === 1)
									{

										console.log("True Flag for EU");
										$scope.$emit("message", "EU Active");
										$scope.$emit("messageEU", 1);
										test = -1;

									}
									//------


								}
								//End of If/Else Check Testing





								intersects[ 0 ].object.geometry.colorsNeedUpdate = true;
							} //End of Intersects
						}
						// Find intersections End

						//End inject 4


					function update()
					{
					  controls.update();
					}

					//Inject 3 End



					//Animate Start
					function animate() {
						requestAnimationFrame(animate);
						update();
						render();
					}
					//Animate End



					//Render Start
					function render() {
						// var timer = Date.now() * 0.0005;
					  // camera.position.x = 10;
						// camera.position.y = 4;
						// camera.position.z = Math.sin(timer) * 10;
						renderer.render(scene, camera);
					}
					//Animate End
				}
			}
		}
	]);
