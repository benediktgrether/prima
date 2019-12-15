"use strict";
///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
var L14_FudgeCraftRecursive;
///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
(function (L14_FudgeCraftRecursive) {
    L14_FudgeCraftRecursive.ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    L14_FudgeCraftRecursive.game = new L14_FudgeCraftRecursive.ƒ.Node("FudgeCraft");
    L14_FudgeCraftRecursive.grid = new L14_FudgeCraftRecursive.Grid();
    let control = new L14_FudgeCraftRecursive.Control();
    let viewport;
    let camera;
    let speedCameraRotation = 0.2;
    let speedCameraTranslation = 0.02;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        L14_FudgeCraftRecursive.ƒ.RenderManager.initialize(true);
        L14_FudgeCraftRecursive.ƒ.Debug.log("Canvas", canvas);
        // enable unlimited mouse-movement (user needs to click on canvas first)
        canvas.addEventListener("click", canvas.requestPointerLock);
        // set lights
        let cmpLight = new L14_FudgeCraftRecursive.ƒ.ComponentLight(new L14_FudgeCraftRecursive.ƒ.LightDirectional(L14_FudgeCraftRecursive.ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new L14_FudgeCraftRecursive.ƒ.Vector3(0.5, 1, 0.8));
        // game.addComponent(cmpLight);
        let cmpLightAmbient = new L14_FudgeCraftRecursive.ƒ.ComponentLight(new L14_FudgeCraftRecursive.ƒ.LightAmbient(L14_FudgeCraftRecursive.ƒ.Color.DARK_GREY));
        L14_FudgeCraftRecursive.game.addComponent(cmpLightAmbient);
        // setup orbiting camera
        camera = new L14_FudgeCraftRecursive.CameraOrbit(75);
        L14_FudgeCraftRecursive.game.appendChild(camera);
        camera.setRotationX(-20);
        camera.setRotationY(20);
        camera.cmpCamera.getContainer().addComponent(cmpLight);
        // setup viewport
        viewport = new L14_FudgeCraftRecursive.ƒ.Viewport();
        viewport.initialize("Viewport", L14_FudgeCraftRecursive.game, camera.cmpCamera, canvas);
        L14_FudgeCraftRecursive.ƒ.Debug.log("Viewport", viewport);
        // setup event handling
        viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
        viewport.activateWheelEvent("\u0192wheel" /* WHEEL */, true);
        viewport.addEventListener("\u0192pointermove" /* MOVE */, hndPointerMove);
        viewport.addEventListener("\u0192wheel" /* WHEEL */, hndWheelMove);
        window.addEventListener("keydown", hndKeyDown);
        L14_FudgeCraftRecursive.game.appendChild(control);
        startGame();
        // startTests();
        updateDisplay();
        L14_FudgeCraftRecursive.ƒ.Debug.log("Game", L14_FudgeCraftRecursive.game);
    }
    function startGame() {
        L14_FudgeCraftRecursive.grid.push(L14_FudgeCraftRecursive.ƒ.Vector3.ZERO(), new L14_FudgeCraftRecursive.GridElement(new L14_FudgeCraftRecursive.Cube(L14_FudgeCraftRecursive.CUBE_TYPE.GREY, L14_FudgeCraftRecursive.ƒ.Vector3.ZERO())));
        startRandomFragment();
    }
    function updateDisplay() {
        viewport.draw();
    }
    L14_FudgeCraftRecursive.updateDisplay = updateDisplay;
    function hndPointerMove(_event) {
        // console.log(_event.movementX, _event.movementY);
        camera.rotateY(_event.movementX * speedCameraRotation);
        camera.rotateX(_event.movementY * speedCameraRotation);
        updateDisplay();
    }
    function hndWheelMove(_event) {
        camera.translate(_event.deltaY * speedCameraTranslation);
        updateDisplay();
    }
    function hndKeyDown(_event) {
        if (_event.code == L14_FudgeCraftRecursive.ƒ.KEYBOARD_CODE.SPACE) {
            let frozen = control.freeze();
            let combos = new L14_FudgeCraftRecursive.Combos(frozen);
            handleCombos(combos);
            startRandomFragment();
        }
        let transformation = L14_FudgeCraftRecursive.Control.transformations[_event.code];
        if (transformation)
            move(transformation);
        updateDisplay();
    }
    function handleCombos(_combos) {
        for (let combo of _combos.found)
            if (combo.length > 2)
                for (let element of combo) {
                    let mtxLocal = element.cube.cmpTransform.local;
                    console.log(element.cube.name, mtxLocal.translation.getMutator());
                    // mtxLocal.rotateX(45);
                    // mtxLocal.rotateY(45);
                    // mtxLocal.rotateY(45, true);
                    mtxLocal.scale(L14_FudgeCraftRecursive.ƒ.Vector3.ONE(0.5));
                }
    }
    function move(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        let fullTranslation = 1;
        let move = {
            rotation: _transformation.rotation ? L14_FudgeCraftRecursive.ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new L14_FudgeCraftRecursive.ƒ.Vector3(),
            translation: _transformation.translation ? L14_FudgeCraftRecursive.ƒ.Vector3.SCALE(_transformation.translation, fullTranslation) : new L14_FudgeCraftRecursive.ƒ.Vector3()
        };
        let timers = L14_FudgeCraftRecursive.ƒ.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;
        let collisions = control.checkCollisions(move);
        if (collisions.length > 0)
            return;
        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);
        L14_FudgeCraftRecursive.ƒ.Time.game.setTimer(10, animationSteps, function () {
            control.move(move);
            updateDisplay();
        });
    }
    function startRandomFragment() {
        let fragment = L14_FudgeCraftRecursive.Fragment.getRandom();
        control.cmpTransform.local = L14_FudgeCraftRecursive.ƒ.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
    }
    L14_FudgeCraftRecursive.startRandomFragment = startRandomFragment;
})(L14_FudgeCraftRecursive || (L14_FudgeCraftRecursive = {}));
//# sourceMappingURL=Main.js.map