"use strict";
///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
var L11_FudgeCraft;
///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
(function (L11_FudgeCraft) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    let viewport;
    let game;
    let rotate = ƒ.Vector3.ZERO();
    // let grid: Cube [][][];
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize(true);
        ƒ.Debug.log("Canvas", canvas);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(2, 3, 10));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        game = new ƒ.Node("FudgeCraft");
        // let cube: Cube = new Cube(CUBE_TYPE.BLUE);
        let fragment = new L11_FudgeCraft.Fragment(0);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new ƒ.ComponentTransform());
        game.appendChild(fragment);
        fragment = new L11_FudgeCraft.Fragment(1);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.X(3))));
        game.appendChild(fragment);
        fragment = new L11_FudgeCraft.Fragment(2);
        // ƒ.Debug.log("Fragment", fragment);
        fragment.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.X(-3))));
        game.appendChild(fragment);
        // fragment = new Fragment(3);
        // // ƒ.Debug.log("Fragment", fragment);
        // fragment.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.X(-6))));
        // game.appendChild(fragment);
        let cmpLight = new ƒ.ComponentLight(new ƒ.LightDirectional(ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new ƒ.Vector3(0.5, 1, 0.8));
        game.addComponent(cmpLight);
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        ƒ.Debug.log("Viewport", viewport);
        viewport.draw();
        ƒ.Debug.log("Game", game);
        window.addEventListener("keydown", hndKeyDown);
    }
    function hndKeyDown(_event) {
        //let rotate: ƒ.Vector3 = ƒ.Vector3.ZERO();
        switch (_event.code) {
            case ƒ.KEYBOARD_CODE.ARROW_UP:
                rotate.add(ƒ.Vector3.X(-90));
                break;
            case ƒ.KEYBOARD_CODE.ARROW_DOWN:
                rotate.add(ƒ.Vector3.X(90));
                break;
            case ƒ.KEYBOARD_CODE.ARROW_LEFT:
                rotate.add(ƒ.Vector3.Y(-90));
                break;
            case ƒ.KEYBOARD_CODE.ARROW_RIGHT:
                rotate.add(ƒ.Vector3.Y(90));
                break;
        }
        for (let fragment of game.getChildren()) {
            // fragment.cmpTransform.local.rotate(rotate);
            fragment.cmpTransform.local.rotation = rotate;
        }
        ƒ.RenderManager.update();
        viewport.draw();
    }
    // function getGrid(): Cube{
    //     return null;
    // }
    // function setGrid( cube: Cube){
    // }
})(L11_FudgeCraft || (L11_FudgeCraft = {}));
//# sourceMappingURL=Main.js.map