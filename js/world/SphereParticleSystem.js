function SphereParticleSystem(defaultY, minY, velocityY, radiusXZ, particleCount) {
    this.defaultY = defaultY;
    this.minY = minY;
    this.velocityY = velocityY;
    this.radiusXZ = radiusXZ;

    this.particles = new THREE.Geometry();
    var pMaterial = new THREE.ParticleBasicMaterial({
        color: 0x000000,
        size: 2
    });

    for (var p = 0; p < particleCount; p++) {
        var pX = Math.random() * this.radiusXZ * 2 - this.radiusXZ,
            pY = Math.random() * this.defaultY,
            pZ = Math.random() * this.radiusXZ * 2 - this.radiusXZ,
            particle = new THREE.Vector3(pX, pY, pZ);

        this.particles.vertices.push(particle);
    }

    this.particleSystem = new THREE.ParticleSystem(this.particles, pMaterial);
}

SphereParticleSystem.prototype.render = function() {
    //this.particleSystem.rotation.y += 0.01;
    var minY = this.minY;
    var defaultY = this.defaultY;
    var velocityY = this.velocityY;
    for (var i = 0; i < this.particles.vertices.length; i++) {
        var value = this.particles.vertices[i];
        if (value.y < minY) value.y = defaultY;
        else value.y += velocityY;
    }
    this.particleSystem.geometry.verticesNeedUpdate = true;
}
