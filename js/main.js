$(document).ready(function() {	
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	var controls = new THREE.FirstPersonControls(camera);
	controls.movementSpeed = 1;
	controls.lookSpeed = 0.1;

	var clock = new THREE.Clock();

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	//load world
	var world = new World(scene);

	window.addEventListener('resize', function() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
		controls.handleResize();
	}, false);

	function render() {
		requestAnimationFrame(render);
		controls.update(clock.getDelta());
		renderer.render(scene, camera);
	}

	render();

});