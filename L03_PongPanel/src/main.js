///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
var L03_PongPanel;
(function (L03_PongPanel) {
    var ƒ = FudgeCore;
    window.addEventListener("load", handleLoad);
    var ball = new ƒ.Node("Ball");
    var paddleLeft = new ƒ.Node("PaddleLeft");
    var paddleRight = new ƒ.Node("PaddleRight");
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
        L03_PongPanel.viewport = new ƒ.Viewport();
        L03_PongPanel.viewport.initialize("Viewport", pong, cmpCamera, canvas);
        ƒ.Debug.log(L03_PongPanel.viewport);
        L03_PongPanel.viewport.draw();
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
})(L03_PongPanel || (L03_PongPanel = {}));
