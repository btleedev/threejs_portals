function Portal(scene, primaryCamera, portalPosition, prePortalCam, postPortalCam, composer, renderer, doorScenePosition) {
    this.scene = scene;
    this.primaryCamera = primaryCamera;
    this.prePortalCam = prePortalCam;
    this.portalPosition = portalPosition;
    this.doorScenePosition = doorScenePosition;
    var self = this;

    //this.portalRotation = new THREE.Vector3(Math.random()*Math.PI*2, Math.random()*Math.PI*2, Math.random()*Math.PI*2);
    this.portalRotation = new THREE.Vector3(0, 0, 0);

    var portalScene = new THREE.Scene();
    this.portal = new THREE.Mesh(new THREE.PlaneGeometry(Portal.DOOR_WIDTH, Portal.DOOR_HEIGHT, 1, 1), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    this.portal.position = portalPosition.clone();
    this.portal.position.y = Portal.DOOR_HEIGHT/2;
    this.portal.rotation.set(this.portalRotation.x, this.portalRotation.y, this.portalRotation.z);
    portalScene.add(this.portal);

    var clonedPortal = new THREE.Mesh(
        new THREE.CubeGeometry(Portal.DOOR_WIDTH, Portal.DOOR_HEIGHT, 1),
        new THREE.MeshBasicMaterial({ color: 0xFFFFFF }),
        0
    );
    clonedPortal.position = this.portal.position.clone();
    clonedPortal.rotation.set(this.portalRotation.x, this.portalRotation.y, this.portalRotation.z);
    //scene.add(clonedPortal);
    this.clonedPortal = clonedPortal;

    var backPortal = new THREE.Mesh(
        new THREE.CubeGeometry(Portal.DOOR_WIDTH, Portal.DOOR_HEIGHT, Portal.DOOR_BREADTH),
        new THREE.MeshBasicMaterial({ color: 0xFFFFFF }),
        0
    );
    backPortal.position = this.portal.position.clone();
    backPortal.position.z -= Portal.DOOR_BREADTH/2 + 1/2;
    backPortal.rotation.set(this.portalRotation.x, this.portalRotation.y, this.portalRotation.z);
    //scene.add(backPortal);
    this.backPortal = backPortal;

    this.clearMask = new THREE.ClearMaskPass();
    //clearMask.clear = true;
    //var tmpCam = new THREE.PerspectiveCamera(FIELD_OF_VIEW, window.innerWidth / window.innerHeight, 0.1, 1);
    //var tmpMesh = new THREE.Mesh(new THREE.PlaneGeometry(9999999, 9999999, 1, 1), new THREE.MeshBasicMaterial({ color: 0xFF00FF }));
    //var tmpScene = new THREE.Scene();
    //tmpMesh.z += 10;
    //tmpScene.add(tmpMesh);
    //tmpCam.lookAt(tmpMesh);
    //var clearMask = new THREE.MaskPass(tmpScene, tmpCam);
    //clearMask.inverse = true;
    //
    this.renderMask = new THREE.MaskPass(portalScene, prePortalCam);
    this.renderMask.clear = true;
    var renderModel = new THREE.RenderPass(scene, postPortalCam);

    this.composerScene = new THREE.EffectComposer(renderer, new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: true } ) );
    this.composerScene.addPass(renderModel);

    this.renderScene = new THREE.TexturePass(this.composerScene.renderTarget2);
    
    composer.addPass(this.renderMask);
    composer.addPass(this.renderScene);
    composer.addPass(this.clearMask);
}

Portal.DOOR_WIDTH = 1;
Portal.DOOR_HEIGHT = 2;
Portal.DOOR_BREADTH = 0.1;

Portal.prototype = {

    destroy: function() {
        this.renderScene.enabled = false;
        this.scene.remove(this.clonedPortal);
        this.scene.remove(this.backPortal);
    },

    contains: function(vector) {
        var vector = this.prePortalCam.position.clone();

        var vFOV = FIELD_OF_VIEW * Math.PI / 180;        // convert vertical fov to radians
        var height = 2 * Math.tan( vFOV / 2 ) * vector.distanceTo(this.portalPosition); // visible height

        var aspect = window.innerWidth / window.innerHeight;
        var width = height * aspect;                  // visible width

        return false;
        return (width <= DOOR_WIDTH && height <= DOOR_HEIGHT);
    },

    collide: function() {
        console.log('warp');
        var warpPos = new THREE.Vector3(this.doorScenePosition.x, this.doorScenePosition.y, this.doorScenePosition.z);
        warpPos.y += primaryCamera_HEIGHT/2;
        this.primaryCamera.position = warpPos;
        //this.primaryCamera.hasTeleported = !this.primaryCamera.hasTeleported;
    },

    render: function() {
        this.renderScene.enabled = true;

        this.composerScene.render(0.1);

        //detect if portal is visible
        //thanks http://stackoverflow.com/questions/17624021/determine-if-a-mesh-is-visible-on-the-viewport-according-to-current-camera
        var frustum = new THREE.Frustum();
        var cameraViewProjectionMatrix = new THREE.Matrix4();

        // every time the camera or objects change position (or every frame)

        this.prePortalCam.updateMatrixWorld(); // make sure the camera matrix is updated
        this.prePortalCam.matrixWorldInverse.getInverse( this.prePortalCam.matrixWorld );
        cameraViewProjectionMatrix.multiplyMatrices( this.prePortalCam.projectionMatrix, this.prePortalCam.matrixWorldInverse );
        frustum.setFromMatrix( cameraViewProjectionMatrix );

        // frustum is now ready to check all the objects you need

        //if (this.primaryCamera.hasTeleported || !frustum.intersectsObject( this.portal )) {
        if (!frustum.intersectsObject( this.portal )) {
            this.renderScene.enabled = false;
        }
    }

}