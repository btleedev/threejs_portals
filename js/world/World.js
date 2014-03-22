function World(scene) {
	this.scene = scene;
	this.portalLocations = [];

	//reference sphere
	var geometry = new THREE.CubeGeometry(1,1,1);
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	cube.position.x = 5;
	//scene.add(cube);

	//world
	this._addPortalsAndLocations();
}

World.prototype._addPortalsAndLocations = function() {
	var location = new THREE.Vector3(0, 0, 0);
	this.portalLocations.push(new PortalLocation(this.scene, location));
}

World.prototype.render = function() {
	for (var i = 0; i < this.portalLocations.length; i++) {
		this.portalLocations[i].render();
	}
}