function PortalLocation(scene, location) {
	this.skybox = new Skybox(scene, location);
	this.sphere = new Sphere(scene, location);
}

PortalLocation.prototype.render = function() {
	this.sphere.render();
}