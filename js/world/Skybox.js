function Skybox(scene, location) {
	var imagePrefix = "res/skybox/clouds/";
	var directions  = ["right", "left", "top", "bottom", "front", "back"];
	var imageSuffix = ".jpg";
	var skyGeometry = new THREE.CubeGeometry(Skybox.CUBE_LEN, Skybox.CUBE_LEN, Skybox.CUBE_LEN);	
	
	var materialArray = [];
	for (var i = 0; i < 6; i++)
		materialArray.push( new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
			side: THREE.BackSide
		}));
	var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
	var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );

	skyBox.position = location.clone();
	scene.add( skyBox );
}

Skybox.CUBE_LEN = 50;