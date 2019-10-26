///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
var L04_PongAnimated;
(function (L04_PongAnimated) {
    var ƒ = FudgeCore;
    window.addEventListener("load", handleLoad);
    // What do the viewport?
    var viewport;
    var ball = new ƒ.Node("Ball");
    var paddleLeft = new ƒ.Node("PaddleLeft");
    var paddleRight = new ƒ.Node("PaddleRight");
    var keysPressed = {};
    function handleLoad(_event) {
        var canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);
        var pong = createPong();
        var cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(42);
        paddleRight.cmpTransform.local.translateX(20);
        paddleLeft.cmpTransform.local.translateX(-20);
        paddleLeft.getComponent(ƒ.ComponentMesh).pivot.scaleY(4);
        paddleRight.getComponent(ƒ.ComponentMesh).pivot.scaleY(4);
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        ƒ.Debug.log(viewport);
        document.addEventListener("keydown", hndKeydown);
        document.addEventListener("keyup", hndKeyup);
        viewport.draw();
        // FUDGE Core Game Loop and Starting the Loop
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start();
    }
    function update(_event) {
        // ƒ.Debug.log(keysPressed);
        if (keysPressed[ƒ.KEYBOARD_CODE.ARROW_UP]) {
            paddleRight.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));
        }
        if (keysPressed[ƒ.KEYBOARD_CODE.ARROW_DOWN]) {
            paddleRight.cmpTransform.local.translate(new ƒ.Vector3(0, -0.3, 0));
        }
        if (keysPressed[ƒ.KEYBOARD_CODE.W]) {
            paddleLeft.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));
        }
        if (keysPressed[ƒ.KEYBOARD_CODE.S]) {
            paddleLeft.cmpTransform.local.translate(new ƒ.Vector3(0, -0.3, 0));
        }
        ball.cmpTransform.local.translate(new ƒ.Vector3(0.1, -0.1, 0));
        ƒ.RenderManager.update();
        viewport.draw();
    }
    function createPong() {
        var pong = new ƒ.Node("Pong");
        var meshQuad = new ƒ.MeshQuad();
        var mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
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
    function hndKeyup(_event) {
        keysPressed[_event.code] = false;
    }
    function hndKeydown(_event) {
        keysPressed[_event.code] = true;
    }
})(L04_PongAnimated || (L04_PongAnimated = {}));
