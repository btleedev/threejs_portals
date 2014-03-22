$(document).ready(function() {	
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 20000);
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.autoClear = false;

	document.body.appendChild(renderer.domElement);

	var controls = new THREE.FirstPersonControls(camera);
	controls.movementSpeed = 5;
	controls.lookSpeed = 0.1;

	var clock = new THREE.Clock();

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	var renderModel = new THREE.RenderPass(scene, camera);
    var compParams = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: true };
    var composerScene = new THREE.EffectComposer(renderer, new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, compParams ) );
    composerScene.addPass(renderModel);

	//load world
	var world = new World(scene, camera, composerScene, renderer);

	window.addEventListener('resize', function() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
		controls.handleResize();
	}, false);

	function render() {
		requestAnimationFrame(render);
		controls.update(clock.getDelta());
		world.render();
		//renderer.render(scene, camera);
		composerScene.render(0.1);

        var renderScene = new THREE.TexturePass(composerScene.renderTarget2 );
        var composer1 = new THREE.EffectComposer(renderer, new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: true }));

        var copyPass = new THREE.ShaderPass(THREE.CopyShader);
        composer1.addPass(renderScene);
        composer1.addPass(copyPass);
        copyPass.renderToScreen = true;

        composer1.render(0.1);
	}

	render();

});