angular.module("tjsModelViewer", [])
	.directive(
		"tjsModelViewer",
		[function () {
			return {
				restrict: "E",
				scope: {
					//assimpUrl: "=assimpUrl"
				},
				link: function ($scope, $rootScope, $elem, $attr) {
					var container;
					var camera;
					var scene;
					var renderer;
					var previous;
					var controls;
					var rendererCSS;
					var scene2;
					var renderer2;
					//var keyboard = new KeyboardState();
					var activityUSD=0;
					var activityEU=0;
					var table = [
								"H", "Hydrogen", "1.00794", 1, 1,

								"Uuo", "Ununoctium", "(294)", 18, 7
							];



							var objects = [];
							var targets = { table: [] };


					//Inject
					var targetList = [];
		        var projector, mouse = { x: 0, y: 0 },INTERSECTED;
		        var selectedFaces = [];
		        var floorSide=1000;
		        var baseColor=new THREE.Color( 0x14A0C1 );
		        var highlightedColor=new THREE.Color( 0xddaa00 );
		        var selectedColor=new THREE.Color( 0x4466dd );
		        var mouseSphereCoords = null;
		        var mouseSphere=[];
		        var country_targetList = [];

					//Inject End
					// init scene
					init();







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


						// directional lighting
	         var directionalLight = new THREE.DirectionalLight(0xffffff);
	      directionalLight.position.set(1, 1, 1).normalize();
	      scene.add(directionalLight);

	      // ambient lighting
	      var ambientLight = new THREE.AmbientLight(0xbbbbbb);
	      scene.add(ambientLight);





						  //Renderer
							var bgTexture = new THREE.ImageUtils.loadTexture( 'assets/earthtextures/backgroundtexture.png', {}, function(){
							console.log("Loaded Texture")
							},
							function(){
									alert('Error Loading Texture')
							});

							var bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture });

							if ( Detector.webgl )
								renderer = new THREE.WebGLRenderer( {antialias:true} );
							else
							renderer = new THREE.CanvasRenderer();
							//Set Backgound Color

						  //renderer = new THREE.WebGLRenderer( {antialias:true} );
						  renderer.setSize(window.innerWidth, window.innerHeight);
							renderer.setClearColor(0xd9d9d9, 1);
							//renderer.setTexture( bgMaterial, 1);
						  //elem[0].appendChild(renderer.domElement);
						  container = document.getElementById( 'ThreeJS' );
						  container.appendChild(renderer.domElement );



				        	// CONTROLS

				        	controls = new THREE.OrbitControls( camera, renderer.domElement );
									//controls = new THREE.TrackballControls( camera );

									// RENDERER




									var newSphereGeom= new THREE.SphereGeometry(5,5,5);
									var sphere= new THREE.Mesh(newSphereGeom, new THREE.MeshBasicMaterial({ color: 0x2266dd }));
									scene.add(sphere);
									mouseSphere.push(sphere);

						// initialize object to perform world/screen calculations
					 projector = new THREE.Projector();

					 // when the mouse moves, call the given function
					 document.addEventListener( 'mousedown', onDocumentMouseDown, false );
					 document.addEventListener( 'mousemove', onDocumentMouseMove, false );


						window.addEventListener('resize', onWindowResize, false);






						addEarthgeo();

						render();
						animate();

					}

					//Initilize End

					//EARTHS ------ (WorkAround)
					//Add Earth
					function addEarthgeo()
				  {

					var newEarth= new THREE.SphereGeometry(75,75,75);
				  // texture - texture must not be in same folder or there is an error.
					var earthTexture = new THREE.ImageUtils.loadTexture( 'assets/earthtextures/earthtextminwhole.png', {}, function(){
					console.log("Loaded Texture")
					},
					function(){
							alert('Error Loading Texture')
					});
					//newEarth_shaded.material.map.needsUpdate = true;
					//Create Mesh
					var earthmaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
					var newEarth_shaded = new THREE.Mesh(newEarth, earthmaterial );
					//Position Mesh
					newEarth_shaded.position.x = 0;
					newEarth_shaded.position.y = 0;
					newEarth_shaded.position.z = 0;
					//Add Identifiying Tag
					newEarth_shaded.name = "Earth";
					//Add to Scene
					scene.add(newEarth_shaded);


					addUSD();
					addEU();
					addCHA();
				}
					//Earth Create


					//EARTHS ------ (WorkAround)





				function addUSD()
				{
					var octaGeom = new THREE.Geometry();

					octaGeom.vertices.push(
						new THREE.Vector3( -90,  -20, 50 ),
						new THREE.Vector3( -100, -30, 62 ),
						new THREE.Vector3(  -80, -30, 62 )
					);

					octaGeom.faces.push( new THREE.Face3( 0, 1, 2 ) );

					var faceColorMaterial = new THREE.MeshLambertMaterial(
					{ color: 0x17A0BF, vertexColors: THREE.FaceColors,shading:THREE.FlatShading,polygonOffset: true,polygonOffsetUnits: 1,polygonOffsetFactor: 1} );

					//var octaGeom= new THREE.SphereGeometry(1,12,2);
					for ( var i = 0; i < octaGeom.faces.length; i++ )
					{
						face = octaGeom.faces[ i ];
						face.color= baseColor;
					}
					var octa= new THREE.Mesh( octaGeom, faceColorMaterial );
					//octa.position.set(position[0], position[2], position[1]);
					octa.position.x = 75;
					octa.position.y = 75;
					octa.position.z = 0;


					// creates a wireMesh object
					octa.name = "USD";
					wireOcta = new THREE.Mesh(octaGeom, new THREE.MeshBasicMaterial({ color: 0x17A0BF, wireframe: true }));


					scene.add(octa);
					// wireMesh object is added to the original as a sub-object
					octa.add(wireOcta);

					targetList.push(octa);
				}


								function addEU()
								{
									var octaGeom = new THREE.Geometry();

									octaGeom.vertices.push(
										new THREE.Vector3( -30,  10, -5 ),
										new THREE.Vector3( -20, 5, 5 ),
										new THREE.Vector3(  -20, 5, -15 )
									);

									octaGeom.faces.push( new THREE.Face3( 0, 1, 2 ) );

									var faceColorMaterial = new THREE.MeshLambertMaterial(
									{ color: 0x17A0BF, vertexColors: THREE.FaceColors,shading:THREE.FlatShading,polygonOffset: true,polygonOffsetUnits: 1,polygonOffsetFactor: 1} );

									//var octaGeom= new THREE.SphereGeometry(1,12,2);
									for ( var i = 0; i < octaGeom.faces.length; i++ )
									{
										face = octaGeom.faces[ i ];
										face.color= baseColor;
									}
									var octa= new THREE.Mesh( octaGeom, faceColorMaterial );
									//octa.position.set(position[0], position[2], position[1]);
									octa.position.x = 75;
									octa.position.y = 50;
									octa.position.z = 0;


									// creates a wireMesh object
									octa.name = "EU";
									wireOcta = new THREE.Mesh(octaGeom, new THREE.MeshBasicMaterial({ color: 0x17A0BF, wireframe: true }));


									scene.add(octa);
									// wireMesh object is added to the original as a sub-object
									octa.add(wireOcta);

									targetList.push(octa);
								}




																function addCHA()
																{
																	var octaGeom = new THREE.Geometry();

																	octaGeom.vertices.push(
																		new THREE.Vector3( -100,  15, -66 ),
																		new THREE.Vector3( -90, 25, -56 ),
																		new THREE.Vector3(  -80, 15, -66 )
																	);

																	octaGeom.faces.push( new THREE.Face3( 0, 1, 2 ) );

																	var faceColorMaterial = new THREE.MeshLambertMaterial(
																	{ color: 0x17A0BF, vertexColors: THREE.FaceColors,shading:THREE.FlatShading,polygonOffset: true,polygonOffsetUnits: 1,polygonOffsetFactor: 1} );

																	//var octaGeom= new THREE.SphereGeometry(1,12,2);
																	for ( var i = 0; i < octaGeom.faces.length; i++ )
																	{
																		face = octaGeom.faces[ i ];
																		face.color= baseColor;
																	}
																	var octa= new THREE.Mesh( octaGeom, faceColorMaterial );
																	//octa.position.set(position[0], position[2], position[1]);
																	octa.position.x = 75;
																	octa.position.y = 25;
																	octa.position.z = 0;


																	// creates a wireMesh object
																	octa.name = "CHA";
																	wireOcta = new THREE.Mesh(octaGeom, new THREE.MeshBasicMaterial({ color: 0x17A0BF, wireframe: true }));


																	scene.add(octa);
																	// wireMesh object is added to the original as a sub-object
																	octa.add(wireOcta);

																	targetList.push(octa);
																}



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
	// find intersections

	// create a Ray with origin at the mouse position
	//   and direction into the scene (camera direction)
	var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
	projector.unprojectVector( vector, camera );
	var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
  var activeEU = 0;
	var activeUS = 0;
	var activeCHA = 0;
	// create an array containing all objects in the scene with which the ray intersects
	var intersects = ray.intersectObjects( targetList );

	//if an intersection is detected
	if ( intersects.length > 0 )
	{
		console.log("Hit @ " + toString( intersects[0].point ) );

		//test items in selected faces array
		var test=-1;
		selectedFaces.forEach( function(arrayItem)
		{

			if (arrayItem.object.name === "USD")
			{
				if(intersects[0].faceIndex==arrayItem.faceIndex && intersects[0].object.id==arrayItem.object.id){
					test=selectedFaces.indexOf(arrayItem);
					console.log("False");
					$scope.$emit("messageUSD", 0);
					var cgtxt = scene.getObjectByName("Earth");


					if (activeCHA === 0 && activeUS === 1 && activeEU === 0)
					{
						cgtxt.material.map = THREE.ImageUtils.loadTexture( 'assets/earthtextures/earthtextminwhole.png', {}, function(){
						console.log("De-Loaded Texture for CHA")
						},
						function(){
								alert('Error Loading Texture')
						});

						cgtxt.material.needsUpdate  = true;
						animate();
					}
					else
					{
						cgtxt.material.map = THREE.ImageUtils.loadTexture( 'assets/earthtextures/earthtextminUSA.png', {}, function(){
						console.log("De-Loaded Texture for CHA")
						},
						function(){
								alert('Error Loading Texture')
						});

						cgtxt.material.needsUpdate  = true;
						animate();
					}

				}
			}

			else if (arrayItem.object.name === "EU")
			{
				if(intersects[0].faceIndex==arrayItem.faceIndex && intersects[0].object.id==arrayItem.object.id){
					test=selectedFaces.indexOf(arrayItem);
					console.log("False");
					$scope.$emit("messageEU", 0);
					activeCHA = 0;
					var cgtxt = scene.getObjectByName("Earth");
					if (activeCHA === 0 && activeUS === 0 && activeEU === 0)
					{
						cgtxt.material.map = THREE.ImageUtils.loadTexture( 'assets/earthtextures/earthtextminwhole.png', {}, function(){
						console.log("De-Loaded Texture for CHA")
						},
						function(){
								alert('Error Loading Texture')
						});

						cgtxt.material.needsUpdate  = true;
						animate();
					}
					else
					{
						cgtxt.material.map = THREE.ImageUtils.loadTexture( 'assets/earthtextures/earthtextminEU.png', {}, function(){
						console.log("De-Loaded Texture for CHA")
						},
						function(){
								alert('Error Loading Texture')
						});

						cgtxt.material.needsUpdate  = true;
						animate();
					}
				}
			}
			else if (arrayItem.object.name === "CHA")
			{
				if(intersects[0].faceIndex==arrayItem.faceIndex && intersects[0].object.id==arrayItem.object.id){
					test=selectedFaces.indexOf(arrayItem);
					console.log("False");
					$scope.$emit("messageCHA", 0);
					var cgtxt = scene.getObjectByName("Earth");
					if (activeCHA === 0 && activeUS === 0 && activeEU === 0)
					{
						cgtxt.material.map = THREE.ImageUtils.loadTexture( 'assets/earthtextures/earthtextminwhole.png', {}, function(){
						console.log("De-Loaded Texture for CHA")
						},
						function(){
								alert('Error Loading Texture')
						});

						cgtxt.material.needsUpdate  = true;
						animate();
					}
					else
					{
						cgtxt.material.map = THREE.ImageUtils.loadTexture( 'assets/earthtextures/earthtextminCHA.png', {}, function(){
						console.log("De-Loaded Texture for CHA")
						},
						function(){
								alert('Error Loading Texture')
						});

						cgtxt.material.needsUpdate  = true;
						animate();
					}


				}
			}




		});



		//Change Touchpoint Color
		// if is a previously selected face, change the color back to green, otherswise change to blue
		if(test>=0){
			intersects[ 0 ].face.color=new THREE.Color( 0x17A0BF );
			selectedFaces.splice(test, 1);

		}
		else{
			intersects[ 0 ].face.color=new THREE.Color( 0x17A0BF );
			selectedFaces.push(intersects[0]);
			selectedFaces.forEach(function(arrayItem)
			{
				if (arrayItem.object.name === "USD")
				{
				console.log("True");
				activeUS = 1;
				$scope.$emit("messageUSD", 1);
        if (activeUS === 1 && activeEU == 1 && activeCHA === 0)
				{
					document.getElementById("confirmpanelUSEDU").style.display = "block";
					document.getElementById("confirmpanelUSCHA").style.display = "none";
					document.getElementById("confirmpanelCHAEU").style.display = "none";

					$scope.$emit("messageUSEU", 1);

					document.getElementById("ca").innerHTML = "USD";
					document.getElementById("cb").innerHTML = "EU";
					var cgtxt = scene.getObjectByName("Earth");
					cgtxt.material.map = THREE.ImageUtils.loadTexture( 'assets/earthtextures/earthtextminUSEU.png', {}, function(){
					console.log("Loaded Texture for USA <3 EU")
					},
					function(){
							alert('Error Loading Texture')
					});

					cgtxt.material.needsUpdate  = true;
					animate();
				}
				else if (activeUS == 1 && activeCHA === 1  && activeEU == 0)
				{
					document.getElementById("confirmpanelUSEDU").style.display = "none";
					document.getElementById("confirmpanelUSCHA").style.display = "block";
					document.getElementById("confirmpanelCHAEU").style.display = "none";

					$scope.$emit("messageUSCHA", 1);
					document.getElementById("ca").innerHTML = "USD";
					document.getElementById("cb").innerHTML = "CHA";
					var cgtxt = scene.getObjectByName("Earth");
					cgtxt.material.map = THREE.ImageUtils.loadTexture( 'assets/earthtextures/earthtextminUSACHA.png', {}, function(){
					console.log("Loaded Texture for USA <3 CHA")
					},
					function(){
							alert('Error Loading Texture')
					});

					cgtxt.material.needsUpdate  = true;
					animate();
				}
				else
				{
					document.getElementById("confirmpanelUSEDU").style.display = "none";
					document.getElementById("confirmpanelUSCHA").style.display = "none";
					document.getElementById("confirmpanelCHAEU").style.display = "none";
					document.getElementById("ca").innerHTML = "";
					document.getElementById("cb").innerHTML = "";
					var cgtxt = scene.getObjectByName("Earth");
					cgtxt.material.map = THREE.ImageUtils.loadTexture( 'assets/earthtextures/earthtextminUSA.png', {}, function(){
					console.log("Loaded Texture for USA")
					},
					function(){
							alert('Error Loading Texture')
					});

					cgtxt.material.needsUpdate  = true;
					animate();
				}

				}


				else if (arrayItem.object.name === "EU")
				{
					console.log("True");
					activeEU = 1;
					$scope.$emit("messageUEU", 1);
					var cgtxt = scene.getObjectByName("Earth");
					if (activeUS === 1 && activeEU == 1  && activeCHA == 0)
					{
						document.getElementById("confirmpanelUSEDU").style.display = "block";
						document.getElementById("confirmpanelUSCHA").style.display = "none";
						document.getElementById("confirmpanelCHAEU").style.display = "none";

						$scope.$emit("messageEUUS", 1);
						document.getElementById("ca").innerHTML = "USD";
						document.getElementById("cb").innerHTML = "EU";
						var cgtxt = scene.getObjectByName("Earth");
						cgtxt.material.map = THREE.ImageUtils.loadTexture( 'assets/earthtextures/earthtextminUSAEU.png', {}, function(){
						console.log("Loaded Texture for USA <3 EU")
						},
						function(){
								alert('Error Loading Texture')
						});

						cgtxt.material.needsUpdate  = true;
						animate();
					}
					else if (activeEU == 1 && activeCHA === 1 && activeUS == 0)
					{
						document.getElementById("confirmpanelUSEDU").style.display = "none";
						document.getElementById("confirmpanelUSCHA").style.display = "none";
						document.getElementById("confirmpanelCHAEU").style.display = "block";

						$scope.$emit("messageEUCHA", 1);
						document.getElementById("ca").innerHTML = "EU";
						document.getElementById("cb").innerHTML = "CHA";
						var cgtxt = scene.getObjectByName("Earth");
						cgtxt.material.map = THREE.ImageUtils.loadTexture( 'assets/earthtextures/earthtextminCHAEU.png', {}, function(){
						console.log("Loaded Texture for CHA <3 EU")
						},
						function(){
								alert('Error Loading Texture')
						});

						cgtxt.material.needsUpdate  = true;
						animate();
					}
					else
					{
						document.getElementById("confirmpanelUSEDU").style.display = "none";
						document.getElementById("confirmpanelUSCHA").style.display = "none";
						document.getElementById("confirmpanelCHAEU").style.display = "none";
						document.getElementById("ca").innerHTML = "";
						document.getElementById("cb").innerHTML = "";

						var cgtxt = scene.getObjectByName("Earth");
						cgtxt.material.map = THREE.ImageUtils.loadTexture( 'assets/earthtextures/earthtextminEU.png', {}, function(){
						console.log("Loaded Texture for EU")
						},
						function(){
								alert('Error Loading Texture')
						});

						cgtxt.material.needsUpdate  = true;
						animate();
					}

					}



				else if (arrayItem.object.name === "CHA")
				{

						console.log("True");
						activeCHA = 1;
						$scope.$emit("messageCHA", 1);
						var cgtxt = scene.getObjectByName("Earth");
						if (activeUS === 1 && activeCHA === 1 && activeEU === 0)
						{
							document.getElementById("confirmpanelUSEDU").style.display = "none";
							document.getElementById("confirmpanelUSCHA").style.display = "block";
							document.getElementById("confirmpanelCHAEU").style.display = "none";

							$scope.$emit("messageCHAUS", 1);
							console.log("Bingo Sunshine");
							document.getElementById("ca").innerHTML = "CHA";
							document.getElementById("cb").innerHTML = "US";
							var cgtxt = scene.getObjectByName("Earth");
							cgtxt.material.map = THREE.ImageUtils.loadTexture( 'assets/earthtextures/earthtextminUSACHA.png', {}, function(){
							console.log("Loaded Texture for USA <3 EU")
							},
							function(){
									alert('Error Loading Texture')
							});

							cgtxt.material.needsUpdate  = true;
							animate();
						}
						else if (activeEU == 1 && activeCHA === 1 && activeUS === 0)
						{
							document.getElementById("confirmpanelUSEDU").style.display = "none";
							document.getElementById("confirmpanelUSCHA").style.display = "none";
							document.getElementById("confirmpanelCHAEU").style.display = "block";

							$scope.$emit("messageCHAEU", 1);
							document.getElementById("ca").innerHTML = "CHA";
							document.getElementById("cb").innerHTML = "EU";
							var cgtxt = scene.getObjectByName("Earth");
							cgtxt.material.map = THREE.ImageUtils.loadTexture( 'assets/earthtextures/earthtextminCHAEU.png', {}, function(){
							console.log("Loaded Texture for CHA < EU")
							},
							function(){
									alert('Error Loading Texture')
							});

							cgtxt.material.needsUpdate  = true;
							animate();
						}
						else
						{
							document.getElementById("confirmpanelUSEDU").style.display = "none";
							document.getElementById("confirmpanelUSCHA").style.display = "none";
							document.getElementById("confirmpanelCHAEU").style.display = "none";
							document.getElementById("ca").innerHTML = "";
							document.getElementById("cb").innerHTML = "";
							var cgtxt = scene.getObjectByName("Earth");
							cgtxt.material.map = THREE.ImageUtils.loadTexture( 'assets/earthtextures/earthtextminCHA.png', {}, function(){
							console.log("Loaded Texture for CHA")
							},
							function(){
									alert('Error Loading Texture')
							});

							cgtxt.material.needsUpdate  = true;
							animate();
						}

				}

			});

		}

		intersects[ 0 ].object.geometry.colorsNeedUpdate = true;
	}
}



						function checkHighlight(){
							// find intersections

							// create a Ray with origin at the mouse position
							//   and direction into the scene (camera direction)
							var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
							projector.unprojectVector( vector, camera );
							var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

							// create an array containing all objects in the scene with which the ray intersects
							var intersects = ray.intersectObjects( targetList );

							// INTERSECTED = the object in the scene currently closest to the camera
							//		and intersected by the Ray projected from the mouse position

							// if there is one (or more) intersections
							if ( intersects.length > 0 )
							{	// case if mouse is not currently over an object
								if(INTERSECTED==null){
									INTERSECTED = intersects[ 0 ];
									INTERSECTED.face.color = highlightedColor;
								}
								else{	// if thse mouse is over an object
									INTERSECTED.face.color= baseColor;
									INTERSECTED.object.geometry.colorsNeedUpdate=true;
									INTERSECTED = intersects[ 0 ];
									INTERSECTED.face.color = highlightedColor;
								}
								// upsdate mouseSphere coordinates and update colors
								mouseSphereCoords = [INTERSECTED.point.x,INTERSECTED.point.y,INTERSECTED.point.z];
								INTERSECTED.object.geometry.colorsNeedUpdate=true;
							}
							else // there are no intersections
							{
								// restore previous intersection object (if it exists) to its original color
								if ( INTERSECTED ){
									INTERSECTED.face.color = baseColor;
									INTERSECTED.object.geometry.colorsNeedUpdate=true;
								}
								// remove previous intersection object reference
								//     by setting current intersection object to "nothing"
								INTERSECTED = null;
								mouseSphereCoords = null;
							}
						}

						function ColorSelected(){
	selectedFaces.forEach( function(arrayItem)
		{
			arrayItem.face.color = selectedColor;
			arrayItem.object.geometry.colorsNeedUpdate = true;
		});
}


function toString(v) { return "[ " + v.x + ", " + v.y + ", " + v.z + " ]"; }



					function update()
					{
					  controls.update();
						checkHighlight();

						ColorSelected();

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
