function World(scene) {
	this.scene = scene;

	//reference sphere
	var geometry = new THREE.CubeGeometry(1,1,1);
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	cube.position.x = 5;
	scene.add(cube);

	//world
	this._addPortalsAndLocations();
}

World.prototype._addPortalsAndLocations = function() {
	var location = new THREE.Vector3(0, 0, 0);
	var skybox = new Skybox(this.scene, location);
	var sphere = new Sphere(this.scene, location);
}