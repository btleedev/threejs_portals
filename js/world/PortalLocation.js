function PortalLocation(scene, primaryCamera, portalLocation, sceneLocation) {
	this.primaryCamera = primaryCamera;
	this.portalLocation = portalLocation;
	this.sceneLocation = sceneLocation;
	this.skybox = new Skybox(scene, sceneLocation);
	this.sphere = new Sphere(scene, sceneLocation);
	this.portalCam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 20000);
}

PortalLocation.prototype.render = function() {
    this.portalCam.position.set(this.sceneLocation.x + (this.primaryCamera.position.x - this.portalLocation.x), this.sceneLocation.y + (this.primaryCamera.position.y - this.portalLocation.y), this.sceneLocation.z + (this.primaryCamera.position.z - this.portalLocation.z));

    //copy avatar cam and cam in door scene
    var vector = new THREE.Vector3(0, 0, -1);
    vector.applyQuaternion(this.primaryCamera.quaternion);
    vector.add(this.portalCam.position);
    this.portalCam.lookAt(vector);

	this.sphere.render();
}