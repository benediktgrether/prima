"use strict";
///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
var L03_PongPanel;
///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
(function (L03_PongPanel) {
    var ƒ = FudgeCore;
    window.addEventListener("load", handleLoad);
    let ball = new ƒ.Node("Ball");
    let paddleLeft = new ƒ.Node("PaddleLeft");
    let paddleRight = new ƒ.Node("PaddleRight");
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);
        let pong = createPong();
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(42);
        paddleRight.cmpTransform.local.translateX(20);
        paddleLeft.cmpTransform.local.translateX(-20);
        paddleLeft.getComponent(ƒ.ComponentMesh).pivot.scaleY(4);
        paddleRight.getComponent(ƒ.ComponentMesh).pivot.scaleY(4);
        L03_PongPanel.viewport = new ƒ.Viewport();
        L03_PongPanel.viewport.initialize("Viewport", pong, cmpCamera, canvas);
        ƒ.Debug.log(L03_PongPanel.viewport);
        document.addEventListener("keydown", hndKeydown);
        L03_PongPanel.viewport.draw();
        // FUDGE Core Game Loop and Starting the Loop
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start();
    }
    function update(_event) {
        ƒ.RenderManager.update();
        L03_PongPanel.viewport.draw();
    }
    function createPong() {
        let pong = new ƒ.Node("Pong");
        let meshQuad = new ƒ.MeshQuad();
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
        ball.addComponent(new ƒ.ComponentMesh(meshQuad));
        paddleLeft.addComponent(new ƒ.ComponentMesh(meshQuad));
        paddleRight.addComponent(new ƒ.ComponentMesh(meshQuad));
        ball.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        paddleLeft.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        paddleRight.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        // Component for the Node to Transform in the World 
        ball.addComponent(new ƒ.ComponentTransform);
        paddleLeft.addComponent(new ƒ.ComponentTransform);
        paddleRight.addComponent(new ƒ.ComponentTransform);
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        return pong;
    }
    function hndKeydown(_event) {
        switch (_event.code) {
            case ƒ.KEYBOARD_CODE.ARROW_UP:
                paddleRight.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));
                break;
            case ƒ.KEYBOARD_CODE.ARROW_DOWN:
                paddleRight.cmpTransform.local.translate(new ƒ.Vector3(0, -0.3, 0));
                break;
            case ƒ.KEYBOARD_CODE.W:
                paddleLeft.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));
                break;
            case ƒ.KEYBOARD_CODE.S:
                paddleLeft.cmpTransform.local.translate(new ƒ.Vector3(0, -0.3, 0));
                break;
        }
    }
})(L03_PongPanel || (L03_PongPanel = {}));
//# sourceMappingURL=main.js.map