function World(scene, camera, composer, renderer) {
	this.scene = scene;
	this.portalLocations = [];

	//reference sphere
	var geometry = new THREE.CubeGeometry(1,1,1);
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	cube.position.x = 5;
	scene.add(cube);

	//world
	var sceneLocation = new THREE.Vector3(50, 0, 0);
	var portalLocation = new THREE.Vector3(0, 0, 0);
	this.portalLocations.push(new PortalLocation(scene, camera, portalLocation, sceneLocation));

	this.mainScene = new Main(scene, camera, composer, renderer, this.portalLocations);
}

World.prototype.render = function() {
	for (var i = 0; i < this.portalLocations.length; i++) {
		this.portalLocations[i].render();
	}
	this.mainScene.render();
}