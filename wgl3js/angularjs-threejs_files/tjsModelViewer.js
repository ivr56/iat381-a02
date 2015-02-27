angular.module("tjsModelViewer", [])
	.directive(
		"tjsModelViewer",
		[function () {
			return {
				restrict: "E",
				scope: {
					//assimpUrl: "=assimpUrl"
				},
				link: function (scope, rootScope, elem, attr) {
					var container;
					var scene;
					var camera;
					var renderer;
					var controls;
					var previous;
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
					animate();








					////////////
					// INIT   //
					////////////


					//Initilize Start
					function init() {

						// SCENE
						scene = new THREE.Scene();

						// CAMERA
						var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
						var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 0;
						camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
						scene.add(camera);
						camera.position.set(0,250,950);
						camera.lookAt(scene.position);



						//RENDERER
						// if ( Detector.webgl )
						// 	renderer = new THREE.WebGLRenderer( {antialias:true} );
						// else
						renderer = new THREE.CanvasRenderer();
						renderer.setSize(window.innerWidth, window.innerHeight);
						//elem[0].appendChild(renderer.domElement);
						container = document.getElementById( 'ThreeJS' );
						container.appendChild(renderer.domElement );


						// CONTROLS
						controls = new THREE.OrbitControls( camera, renderer.domElement );


						// LIGHT
						var light = new THREE.AmbientLight( 0x333333 ); // soft white light
		        scene.add( light );
		        var light2 = new THREE.PointLight(0xffffff,1,4500);
		        light2.position.set(-300,1000,-300);
		        scene.add(light2);


						// FLOOR
						var faceMat = new THREE.MeshBasicMaterial({color: 0x888888,side: THREE.DoubleSide});
						var wireMat = new THREE.MeshBasicMaterial({color:0xaaaaaa,wireframe:true,transparent:true});
						var multiMat = [faceMat ,wireMat];

						var floor= THREE.SceneUtils.createMultiMaterialObject(new THREE.PlaneGeometry(floorSide, floorSide, 10, 10),multiMat);

						floor.rotation.x = Math.PI / 2;
						scene.add(floor);


						// SKYBOX
						var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
						var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0xdddddd, side: THREE.BackSide } );
						var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
						scene.add(skyBox);




				    // MOUSE SPHERE
						var newSphereGeom= new THREE.SphereGeometry(5,5,5);
						var sphere= new THREE.Mesh(newSphereGeom, new THREE.MeshBasicMaterial({ color: 0x2266dd }));
						scene.add(sphere);
						mouseSphere.push(sphere);


						// initialize object to perform world/screen calculations
					 projector = new THREE.Projector();

					 // GEOMERTY CREATION
					 addEarth();
					 addTouchpointsUSD();
					 addTouchpointsCAD();

					 // EVENT CALLS
					 document.addEventListener( 'mousedown', onDocumentMouseDown, false );
					 document.addEventListener( 'mousemove', onDocumentMouseMove, false );
					 //window.addEventListener('resize', onWindowResize, false);


					}

					////////////
					// INIT   //
					////////////




					////////////
					// GEOM   //
					////////////


					//Add Earth
					function addEarth()
					{

						var newEarth= new THREE.SphereGeometry(125,125,125);
						var newEarth_shaded = new THREE.Mesh(newEarth, new THREE.MeshBasicMaterial({ color: 0x2266dd }));
						newEarth_shaded.position.x = 0;
						newEarth_shaded.position.y = 100;
						newEarth_shaded.position.z = 0;
						scene.add(newEarth_shaded);

					}
					//Add Earth End

					//Currency 1
					function addTouchpointsUSD()
					{

						var newtouchpointUSD= new THREE.SphereGeometry(12,12,12);
						var newtouchpointUSD_shaded = new THREE.Mesh(newtouchpointUSD, new THREE.MeshBasicMaterial({ color: 0x2266dd }));
						newtouchpointUSD_shaded.position.x = 150;
						newtouchpointUSD_shaded.position.y = 150;
						newtouchpointUSD_shaded.position.z = 150;
						scene.add(newtouchpointUSD_shaded);

						targetList.push(newtouchpointUSD_shaded);
						country_targetList.push("American Dollar");
					}
					//Currency 1 End

					//Currency 2
					function addTouchpointsCAD()
					{

						var newtouchpointCAD= new THREE.SphereGeometry(12,12,12);
						var newtouchpointCAD_shaded = new THREE.Mesh(newtouchpointCAD, new THREE.MeshBasicMaterial({ color: 0x2266dd }));
						newtouchpointCAD_shaded.position.x = 250;
						newtouchpointCAD_shaded.position.y = 250;
						newtouchpointCAD_shaded.position.z = 250;
						scene.add(newtouchpointCAD_shaded);
						targetList.push(newtouchpointCAD_shaded);
						country_targetList.push("Canadian Dollar");

					}
					//Currency 2 End

					////////////
					// GEOM   //
					////////////



					//Octa Start
					function addOcta()
					{

						var position = new Array();
						var notAboveGround = true;
						while(notAboveGround){
							position[0]=Math.random()*floorSide-floorSide/2;
							position[1]=Math.random()*floorSide-floorSide/2;
							position[2]=Math.random()*floorSide/5;
							var cubeSide = Math.random()*floorSide/12+floorSide/50;
							//alert("cubeSide="+cubeSide);
							if(position[2]-cubeSide>0){
								notAboveGround = false;
							}
						}

						var faceColorMaterial = new THREE.MeshLambertMaterial(
						{ color: 0xffffff, vertexColors: THREE.FaceColors,shading:THREE.FlatShading,polygonOffset: true,polygonOffsetUnits: 1,polygonOffsetFactor: 1} );

						var octaGeom= new THREE.OctahedronGeometry(cubeSide,0);
						for ( var i = 0; i < octaGeom.faces.length; i++ )
						{
							face = octaGeom.faces[ i ];
							face.color= baseColor;
						}
						var octa= new THREE.Mesh( octaGeom, faceColorMaterial );
						octa.position.set(position[0], position[2], position[1]);
						// creates a wireMesh object
						wireOcta = new THREE.Mesh(octaGeom, new THREE.MeshBasicMaterial({ color: 0x116611, wireframe: true }));

						scene.add(octa);
						// wireMesh object is added to the original as a sub-object
						octa.add(wireOcta );

						targetList.push(octa);
					}
					//Octa End

					////////////
					// GEOM   //
					////////////



					//////////////////
					// INTERACTIONS //
					//////////////////

					//Mouse Move Start
					function onDocumentMouseMove( event )
					{
						console.log("Mouse Interaction Move:" + mouse.x + " : " + mouse.y);
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
	          console.log("Mouse Interaction Push:" + mouse.x + " : " + mouse.y);
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


					//////////////////
					// INTERACTIONS //
					//////////////////



					/////////////////////
					// COLOR SELECTION //
					/////////////////////

					//Color Select Start
					// function ColorSelected(){
					// 	selectedFaces.forEach( function(arrayItem)
					// 		{
					// 			arrayItem.face.color = selectedColor;
					// 			arrayItem.object.geometry.colorsNeedUpdate = true;
					// 		});
					// }
					//Color Select End

					/////////////////////
	        // SELECTION CHECK //
	        /////////////////////

	        // Find intersections
	        function checkSelection(){

	          // create a Ray with origin at the mouse position
	          //   and direction into the scene (camera direction)
	          var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
	          projector.unprojectVector( vector, camera );
	          var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
	          //console.log("X-: " + mouse.x);
	          //console.log("Y-: " + mouse.y);

	          // create an array containing all objects in the scene with which the ray intersects
	          var intersects = ray.intersectObjects( targetList );
	          var selected = 0;

	          //if an intersection is detected
	          if ( intersects.length > 0 )
	          {
	            console.log("Intersects :" + intersects.length);
	            //test items in selected faces array
	            var test=-1;
	            var selected = selected + 1;

	            selectedFaces.forEach( function(arrayItem)
	            {

	              console.log("True 1");
	              // if the faceIndex and object ID are the same between the intersect and selected faces ,
	              // the face index is recorded
	              if(intersects[0].faceIndex==arrayItem.faceIndex && intersects[0].object.id==arrayItem.object.id){
	                test=intersects[0].object.id;
	                console.log("ObjectID: " + arrayItem.object.id);

	            } //End Check
	            });


	            // if is a previously selected face, change the color back to green, otherswise change to blue
	            if(test>=0)
	            {
	              console.log("False");
	              intersects[ 0 ].face.color=new THREE.Color( 0x44dd66 );
	              selectedFaces.splice(test, 1);
	            }

	            else
	            {

	              console.log("True 2");
	              intersects[ 0 ].face.color=new THREE.Color( 0x222288 );
	              selectedFaces.push(intersects[0]);
	            }

	            //intersects[ 0 ].object.geometry.colorsNeedUpdate = true;
	          }
	        }
	        // Find intersections End


	        /////////////////
	        // SELECTION   //
	        /////////////////


					//Find Highlight
					// function checkHighlight(){
					// 	// find intersections
					//
					// 	// create a Ray with origin at the mouse position
					// 	//   and direction into the scene (camera direction)
					// 	var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
					// 	projector.unprojectVector( vector, camera );
					// 	var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
					//
					// 	// create an array containing all objects in the scene with which the ray intersects
					// 	var intersects = ray.intersectObjects( targetList );
					//
					// 	// INTERSECTED = the object in the scene currently closest to the camera
					// 	//		and intersected by the Ray projected from the mouse position
					//
					// 	// if there is one (or more) intersections
					// 	if ( intersects.length > 0 )
					// 	{	// case if mouse is not currently over an object
					// 		if(INTERSECTED==null){
					// 			INTERSECTED = intersects[ 0 ];
					// 			INTERSECTED.face.color = highlightedColor;
					// 		}
					// 		else{	// if thse mouse is over an object
					// 			INTERSECTED.face.color= baseColor;
					// 			INTERSECTED.object.geometry.colorsNeedUpdate=true;
					// 			INTERSECTED = intersects[ 0 ];
					// 			INTERSECTED.face.color = highlightedColor;
					// 		}
					// 		// upsdate mouseSphere coordinates and update colors
					// 		mouseSphereCoords = [INTERSECTED.point.x,INTERSECTED.point.y,INTERSECTED.point.z];
					// 		INTERSECTED.object.geometry.colorsNeedUpdate=true;
					//
					// 	}
					// 	else // there are no intersections
					// 	{
					// 		// restore previous intersection object (if it exists) to its original color
					// 		if ( INTERSECTED ){
					// 			INTERSECTED.face.color = baseColor;
					// 			INTERSECTED.object.geometry.colorsNeedUpdate=true;
					// 		}
					// 		// remove previous intersection object reference
					// 		//     by setting current intersection object to "nothing"
					//
					// 		INTERSECTED = null;
					// 		mouseSphereCoords = null;
					//
					//
					// 	}
					// }
					//Find highlight end

					//Check Mouse
					// function CheckMouseSphere(){
					// 	// if the coordinates exist, make the sphere visible
					// 	if(mouseSphereCoords != null){
					// 		//console.log(mouseSphereCoords[0].toString()+","+mouseSphereCoords[1].toString()+","+mouseSphereCoords[2].toString());
					// 		mouseSphere[0].position.set(mouseSphereCoords[0],mouseSphereCoords[1],mouseSphereCoords[2]);
					// 		mouseSphere[0].visible = true;
					// 	}
					// 	else{ // otherwise hide the sphere
					// 		mouseSphere[0].visible = false;
					// 	}
					// }
					//Check Mouse End



					///////////////
					// UPDATES   //
					///////////////

					function toString(v) { return "[ " + v.x + ", " + v.y + ", " + v.z + " ]"; }



					//Animate Start
					function animate() {
						requestAnimationFrame(animate);
						render();
						update();
					}
					//Animate End


						//End inject 4

						function update()
					  {

						controls.update();

					  }

					//Inject 3 End



					//Render Start
					function render()
					{
						renderer.render(scene, camera);
					}
					//Animate End

					///////////////
					// UPDATES   //
					///////////////



					// LINK END
				}
					// RETURN
			}
					// FUNCTION
		}
	]);
