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
    var ballTranslationX;
    var ballTranslationY;
    // let ballTranslationX: number = ball.cmpTransform.local.translation.x;
    // let ballTranslationY: number = ball.cmpTransform.local.translation.y;
    var ballPosX = 0;
    var ballPosY = 0;
    var ballVelocityX = generateRandomeValue();
    var ballVelocityY = generateRandomeValue();
    var collisionRightTop = false;
    var collisionRightBottom = false;
    var collisionLeftTop = false;
    var collisionLeftBottom = false;
    console.log(ballPosX);
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
            if (paddleRight.cmpTransform.local.translation.y < 12.2 && collisionRightTop === false) {
                paddleRight.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));
                collisionRightBottom = false;
            }
            else {
                collisionRightTop = true;
            }
        }
        if (keysPressed[ƒ.KEYBOARD_CODE.ARROW_DOWN]) {
            if (paddleRight.cmpTransform.local.translation.y > -12.2 && collisionRightBottom === false) {
                paddleRight.cmpTransform.local.translate(new ƒ.Vector3(0, -0.3, 0));
                collisionRightTop = false;
            }
            else {
                collisionRightBottom = true;
            }
        }
        if (keysPressed[ƒ.KEYBOARD_CODE.W]) {
            if (paddleLeft.cmpTransform.local.translation.y < 12.2 && collisionLeftTop === false) {
                paddleLeft.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));
                collisionLeftBottom = false;
            }
            else {
                collisionLeftTop = true;
            }
        }
        if (keysPressed[ƒ.KEYBOARD_CODE.S]) {
            if (paddleLeft.cmpTransform.local.translation.y > -12.2 && collisionLeftBottom === false) {
                paddleLeft.cmpTransform.local.translate(new ƒ.Vector3(0, -0.3, 0));
                collisionLeftTop = false;
            }
            else {
                collisionLeftBottom = true;
            }
        }
        moveBall();
        // console.log(ballPosX);
        ƒ.RenderManager.update();
        viewport.draw();
    }
    function moveBall() {
        ball.cmpTransform.local.translate(new ƒ.Vector3(ballVelocityX, ballVelocityY, 0));
        ballTranslationX = ball.cmpTransform.local.translation.x;
        ballTranslationY = ball.cmpTransform.local.translation.y;
        if (ballTranslationX < -20.8 || ballTranslationX > 20.8) {
            ballVelocityX = -ballVelocityX;
        }
        if (ballTranslationY < -13.7 || ballTranslationY > 13.7) {
            ballVelocityY = -ballVelocityY;
        }
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
        // ball.cmpTransform.local.translate( new ƒ.Vector3(-20.8, -13.7, 0) );
        ƒ.Debug.log(ball.cmpTransform.local.translation.x);
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
    function generateRandomeValue() {
        if (Math.random() <= 0.5) {
            return Math.random() * (+0.3 - +0.05) + +0.05;
        }
        else {
            return (Math.random() * (+0.3 - +0.05) + +0.05) * -1;
        }
    }
})(L04_PongAnimated || (L04_PongAnimated = {}));
