"use strict";
///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
var L13_FudgeCraftCamera;
///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
(function (L13_FudgeCraftCamera) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    L13_FudgeCraftCamera.game = new ƒ.Node("FudgeCraft");
    L13_FudgeCraftCamera.grid = new L13_FudgeCraftCamera.Grid();
    let control = new L13_FudgeCraftCamera.Control();
    let viewport;
    let camera;
    let speedCameraRotation = 0.2;
    let speedCameraTranslation = 0.02;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize(true);
        ƒ.Debug.log("Canvas", canvas);
        // enable unlimited mouse-movement (user needs to click on canvas first)
        canvas.addEventListener("click", canvas.requestPointerLock);
        // set lights
        let cmpLight = new ƒ.ComponentLight(new ƒ.LightDirectional(ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new ƒ.Vector3(0.5, 1, 0.8));
        L13_FudgeCraftCamera.game.addComponent(cmpLight);
        let cmpLightAmbient = new ƒ.ComponentLight(new ƒ.LightAmbient(ƒ.Color.DARK_GREY));
        L13_FudgeCraftCamera.game.addComponent(cmpLightAmbient);
        // setup orbiting camera
        camera = new L13_FudgeCraftCamera.CameraOrbit(75);
        L13_FudgeCraftCamera.game.appendChild(camera);
        camera.setRotationX(-20);
        camera.setRotationY(20);
        // setup viewport
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", L13_FudgeCraftCamera.game, camera.cmpCamera, canvas);
        ƒ.Debug.log("Viewport", viewport);
        // setup event handling 
        viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
        viewport.activateWheelEvent("\u0192wheel" /* WHEEL */, true);
        viewport.addEventListener("\u0192pointermove" /* MOVE */, hndPointerMove);
        viewport.addEventListener("\u0192wheel" /* WHEEL */, hndWheelMove);
        window.addEventListener("keydown", hndKeyDown);
        startRandomFragment();
        L13_FudgeCraftCamera.game.appendChild(control);
        updateDisplay();
        ƒ.Debug.log("Game", L13_FudgeCraftCamera.game);
    }
    function updateDisplay() {
        viewport.draw();
    }
    function hndPointerMove(_event) {
        camera.rotateY(_event.movementX * speedCameraRotation);
        camera.rotateX(_event.movementX * speedCameraRotation);
        updateDisplay();
    }
    function hndWheelMove(_event) {
        camera.translate(_event.deltaY * speedCameraTranslation);
        updateDisplay();
    }
    function hndKeyDown(_event) {
        if (_event.code == ƒ.KEYBOARD_CODE.SPACE) {
            control.freeze();
            startRandomFragment();
        }
        let transformation = L13_FudgeCraftCamera.Control.transformations[_event.code];
        if (transformation)
            move(transformation);
        updateDisplay();
    }
    function move(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        let fullTranslation = 1;
        let move = {
            rotation: _transformation.rotation ? ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new ƒ.Vector3(),
            translation: _transformation.translation ? ƒ.Vector3.SCALE(_transformation.translation, fullTranslation) : new ƒ.Vector3()
        };
        let timers = ƒ.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;
        let collision = control.checkCollisions(move);
        if (collision.length > 0)
            return;
        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);
        ƒ.Time.game.setTimer(10, animationSteps, function () {
            control.move(move);
            viewport.draw();
        });
    }
    function startRandomFragment() {
        let fragment = L13_FudgeCraftCamera.Fragment.getRandom();
        control.cmpTransform.local = ƒ.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
    }
    L13_FudgeCraftCamera.startRandomFragment = startRandomFragment;
})(L13_FudgeCraftCamera || (L13_FudgeCraftCamera = {}));
//# sourceMappingURL=Main.js.map