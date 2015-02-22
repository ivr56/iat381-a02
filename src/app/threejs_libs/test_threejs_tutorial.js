window.onload = function() {

	var container = document.getElementById( 'container' ),
		containerWidth, containerHeight,
		renderer,
		scene,
		camera,
		cubes,
		geom,
		range = 50,
		mouseVector,
		axes,
		controls;

	containerWidth = container.clientWidth;
	containerHeight = container.clientHeight;

	// Set up renderer, scene and camera
	renderer = new THREE.CanvasRenderer();
	renderer.setSize( containerWidth, containerHeight );
	container.appendChild( renderer.domElement );

	renderer.setClearColorHex( 0xeeeedd, 1.0 );

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 45, containerWidth / containerHeight, 1, 10000 );
	camera.position.set( 0, 0, range * 2 );
	camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

	// Add some cubes to the scene
	geom = new THREE.SphereGeometry( 4, 4, 4);
	geomw = new THREE.SphereGeometry( 6, 6, 6);

	cubes = new THREE.Object3D();
	scene.add( cubes );

	for(var i = 0; i < 4; i++ ) {
		var grayness = Math.random() * 0.5 + 0.25,
			mat = new THREE.MeshBasicMaterial(),
			cube = new THREE.Mesh( geom, mat );
		mat.color.setRGB( grayness, grayness, grayness );
		cube.position.set( range * (0.5 - Math.random()), range * (0.5 - Math.random()), range * (0.5 - Math.random()) );
		cube.rotation.set( Math.random(), Math.random(), Math.random() ).multiplyScalar( 2 * Math.PI );
		cube.grayness = grayness;
		cubes.add( cube );
	}

	for(var i = 0; i < 1; i++ ) {
		var grayness2 = Math.random() * 0.5 + 0.25,
			mat2 = new THREE.MeshBasicMaterial(),
			cube2 = new THREE.Mesh( geomw, mat2 );
		mat2.color.setRGB( grayness, grayness, grayness );
		cube2.position.set( range * (0.5 - Math.random()), range * (0.5 - Math.random()), range * (0.5 - Math.random()) );
		cube2.rotation.set( Math.random(), Math.random(), Math.random() ).multiplyScalar( 2 * Math.PI );
		cube2.grayness = grayness;
		cubes.add( cube2 );
	}

	// Axes
	axes = buildAxes();
	scene.add( axes );

	// Picking stuff

	projector = new THREE.Projector();
	mouseVector = new THREE.Vector3();

	// User interaction
	window.addEventListener( 'mousemove', onMouseMove, false );
	window.addEventListener( 'resize', onWindowResize, false );

	controls = new THREE.TrackballControls( camera );
	controls.zoomSpeed = 0.1;

	// And go!
	animate();

//Mouse Rotate and Zoom
	function onMouseMove( e ) {

		mouseVector.x = 2 * (e.clientX / containerWidth) - 1;
		mouseVector.y = 1 - 2 * ( e.clientY / containerHeight );

		var raycaster = projector.pickingRay( mouseVector.clone(), camera ),
			intersects = raycaster.intersectObjects( cubes.children );

		cubes.children.forEach(function( cube ) {
			cube.material.color.setRGB( cube.grayness, cube.grayness, cube.grayness );
		});


		//Interaction
		for( var i = 0; i < intersects.length; i++ ) {
			var intersection = intersects[ i ],
				obj = intersection.object;
				console.log("Engage");
			obj.material.color.setRGB( 1.0 - i / intersects.length, 0, 0 );
		}


	}

	//Resize Window Resize Content
	function onWindowResize( e ) {
		containerWidth = container.clientWidth;
		containerHeight = container.clientHeight;
		renderer.setSize( containerWidth, containerHeight );
		camera.aspect = containerWidth / containerHeight;
		camera.updateProjectionMatrix();
	}

	//Animate Everything
	function animate() {
		requestAnimationFrame( animate );
		controls.update();
		renderer.render( scene, camera );
	}






	// http://soledadpenades.com/articles/three-js-tutorials/drawing-the-coordinate-axes/
	function buildAxes() {
		var axes = new THREE.Object3D();

		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 100, 0, 0 ), 0xFF0000, false ) ); // +X
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -100, 0, 0 ), 0x800000, true) ); // -X
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 100, 0 ), 0x00FF00, false ) ); // +Y
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -100, 0 ), 0x008000, true ) ); // -Y
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 100 ), 0x0000FF, false ) ); // +Z
		axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -100 ), 0x000080, true ) ); // -Z

		return axes;

	}

	function buildAxis( src, dst, colorHex, dashed ) {
		var geom = new THREE.Geometry(),
			mat;

		if(dashed) {
			mat = new THREE.LineDashedMaterial({ linewidth: 1, color: colorHex, dashSize: 5, gapSize: 5 });
		} else {
			mat = new THREE.LineBasicMaterial({ linewidth: 1, color: colorHex });
		}

		geom.vertices.push( src.clone() );
		geom.vertices.push( dst.clone() );

		var axis = new THREE.Line( geom, mat );

		return axis;

	}

}
