function MainApp(scene, camera, composer, renderer, portalLocations) {
	this.scene = scene;
	this.portalLocations = portalLocations;

	//world
	var prePortalCam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
	this.portal = new Portal(scene, camera, new THREE.Vector3(0, 0, 0), camera, portalLocations[0].portalCam, composer, renderer, portalLocations[0].sceneLocation);
}

MainApp.prototype.render = function() {
	this.portal.render();
	for (var i = 0; i < this.portalLocations.length; i++) {
		this.portalLocations[i].render();
	}
}