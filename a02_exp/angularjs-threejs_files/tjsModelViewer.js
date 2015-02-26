angular.module("tjsModelViewer", [])
	.directive(
		"tjsModelViewer",
		[function () {
			return {
				restrict: "E",
				scope: {
					assimpUrl: "=assimpUrl"
				},
				link: function (scope, elem, attr) {
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

					          var newEarth= new THREE.SphereGeometry(125,125,125);
					          var newEarth_shaded = new THREE.Mesh(newEarth, new THREE.MeshBasicMaterial({ color: 0x2266dd }));
					          newEarth_shaded.position.x = 0;
					          newEarth_shaded.position.y = 0;
					          newEarth_shaded.position.z = 0;
					        	scene.add(newEarth_shaded);


										var newtouchpointUSD= new THREE.SphereGeometry(12,12,12);
								          var newtouchpointUSD_shaded = new THREE.Mesh(newtouchpointUSD, new THREE.MeshBasicMaterial({ color: 0x2266dd }));
								          newtouchpointUSD_shaded.position.x = 150;
								          newtouchpointUSD_shaded.position.y = 150;
								          newtouchpointUSD_shaded.position.z = 150;
								        	scene.add(newtouchpointUSD_shaded);

								          targetList.push(newtouchpointUSD_shaded);
								          country_targetList.push("American Dollar");

													var newtouchpointCAD= new THREE.SphereGeometry(12,12,12);
	var newtouchpointCAD_shaded = new THREE.Mesh(newtouchpointCAD, new THREE.MeshBasicMaterial({ color: 0x2266dd }));
	newtouchpointCAD_shaded.position.x = 250;
	newtouchpointCAD_shaded.position.y = 250;
	newtouchpointCAD_shaded.position.z = 250;
	scene.add(newtouchpointCAD_shaded);
	targetList.push(newtouchpointCAD_shaded);
	country_targetList.push("Canadian Dollar");

					animate();

					//Initilize Start
					function init() {
						//camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);

						// CAMERA


						//camera.position.set(0,250,950);

						scene = new THREE.Scene();


						var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
						var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
						camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
						scene.add(camera);
						camera.position.set(0,1250,1950);
						camera.lookAt(scene.position);

						scene.fog = new THREE.FogExp2(0x000000, 0.035);

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
		        	//checkSelection();
		        }
		        //Mouse Down End

						//Inject 4

						//End inject 4

						function update()
					        {
					        	// checkHighlight();
					        	// CheckMouseSphere();
					        	// keyboard.update();
										//
					        	// if ( keyboard.down("up") )
					        	// {
					        	// //addOcta();
					        	// }
					        	// ColorSelected();
					        	//intersects[ 0 ].object.geometry.colorsNeedUpdate = true;
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