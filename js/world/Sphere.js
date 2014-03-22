function Sphere(scene, location) {

	var sphereGeom = new THREE.SphereGeometry(15, 32, 16);
	var wireframeMaterial = new THREE.MeshBasicMaterial( { wireframe: true } );

	this.sphere = new THREE.Mesh(sphereGeom, wireframeMaterial);
	this.sphere.position = location.clone();
	scene.add(this.sphere);

	//this.sps = new SphereParticleSystem(25, -25, -0.1, 5, 100);
	//scene.add(this.sps.particleSystem);
}

Sphere.prototype.render = function() {
	this.sphere.rotation.y += 0.1;

}

Sphere.RADIUS = 25;