"use strict";
///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
var L12_FudgeCraftCollision;
///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
(function (L12_FudgeCraftCollision) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    L12_FudgeCraftCollision.game = new ƒ.Node("FudgeCraft");
    L12_FudgeCraftCollision.grid = new L12_FudgeCraftCollision.Grid();
    let control = new L12_FudgeCraftCollision.Control();
    let viewport;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize(true);
        ƒ.Debug.log("Canvas", canvas);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(4, 6, 20));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = ƒ.Color.WHITE;
        let cmpLight = new ƒ.ComponentLight(new ƒ.LightDirectional(ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new ƒ.Vector3(0.5, 1, 0.8));
        L12_FudgeCraftCollision.game.addComponent(cmpLight);
        let cmpLightAmbient = new ƒ.ComponentLight(new ƒ.LightAmbient(ƒ.Color.DARK_GREY));
        L12_FudgeCraftCollision.game.addComponent(cmpLightAmbient);
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", L12_FudgeCraftCollision.game, cmpCamera, canvas);
        ƒ.Debug.log("Viewport", viewport);
        viewport.draw();
        startRandomFragment();
        L12_FudgeCraftCollision.game.appendChild(control);
        viewport.draw();
        ƒ.Debug.log("Game", L12_FudgeCraftCollision.game);
        window.addEventListener("keydown", hndKeyDown);
    }
    function hndKeyDown(_event) {
        if (_event.code == ƒ.KEYBOARD_CODE.SPACE) {
            control.freeze();
            startRandomFragment();
        }
        let transformation = L12_FudgeCraftCollision.Control.transformations[_event.code];
        if (transformation)
            move(transformation);
        // ƒ.RenderManager.update();
        viewport.draw();
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
        let fragment = L12_FudgeCraftCollision.Fragment.getRandom();
        control.cmpTransform.local = ƒ.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
    }
    L12_FudgeCraftCollision.startRandomFragment = startRandomFragment;
    // function getGrid(): Cube{
    //     return null;
    // }
    // function setGrid( cube: Cube){
    // }
})(L12_FudgeCraftCollision || (L12_FudgeCraftCollision = {}));
//# sourceMappingURL=Main.js.map