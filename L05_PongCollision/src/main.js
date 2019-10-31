///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
var L05_PongCollision;
(function (L05_PongCollision) {
    var ƒ = FudgeCore;
    window.addEventListener("load", handleLoad);
    // What do the viewport?
    var viewport;
    var pong = new ƒ.Node("Pong");
    var ball;
    var paddleLeft;
    var paddleRight;
    var posRect;
    var sclRect;
    var ballVelocity = new ƒ.Vector3(generateRandomeValue(), generateRandomeValue(), 0);
    var collisionRightTop = false;
    var collisionRightBottom = false;
    var collisionLeftTop = false;
    var collisionLeftBottom = false;
    var keysPressed = {};
    function handleLoad(_event) {
        var canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);
        var pong = createPong();
        var cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(42);
        // paddleRight.cmpTransform.local.translateX(18);
        // paddleLeft.cmpTransform.local.translateX(-18);
        // (<ƒ.ComponentMesh>paddleLeft.getComponent(ƒ.ComponentMesh)).pivot.scaleY(4);
        // (<ƒ.ComponentMesh>paddleRight.getComponent(ƒ.ComponentMesh)).pivot.scaleY(4);
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
        if (keysPressed[ƒ.KEYBOARD_CODE.ARROW_LEFT]) {
            paddleRight.cmpTransform.local.translate(new ƒ.Vector3(-0.3, 0, 0));
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
        for (var _i = 0, _a = pong.getChildren(); _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.name != "Ball") {
                sclRect = i.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
                posRect = i.cmpTransform.local.translation.copy;
                var hit = detectHit(ball.cmpTransform.local.translation, posRect, sclRect);
                // console.log(hit);
                if (!hit) {
                    moveBall();
                }
                else {
                    ballVelocity.x = -ballVelocity.x;
                }
            }
        }
        function detectHit(_position, _posRect, _sclRect) {
            var rect = new ƒ.Rectangle(_posRect.x, _posRect.y, _sclRect.x, _sclRect.y, ƒ.ORIGIN2D.CENTER);
            return rect.isInside(_position.toVector2());
        }
        function moveBall() {
            ball.cmpTransform.local.translate(ballVelocity);
        }
        // console.log(detectHit(ball.cmpTransform.local.translation, paddleRight.cmpTransform.local));
        // moveBall();
        // console.log(ballPosX);
        ƒ.RenderManager.update();
        viewport.draw();
    }
    function createPong() {
        var meshQuad = new ƒ.MeshQuad();
        var mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
        // ball.addComponent(new ƒ.ComponentMesh(meshQuad));
        // paddleLeft.addComponent(new ƒ.ComponentMesh(meshQuad));
        // paddleRight.addComponent(new ƒ.ComponentMesh(meshQuad));
        // ball.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        // paddleLeft.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        // paddleRight.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        // Component for the Node to Transform in the World 
        // ball.addComponent(new ƒ.ComponentTransform);
        // paddleLeft.addComponent(new ƒ.ComponentTransform);
        // paddleRight.addComponent(new ƒ.ComponentTransform);
        ball = createNode("Ball", meshQuad, mtrSolidWhite, ƒ.Vector2.ZERO, new ƒ.Vector2(1, 1));
        paddleLeft = createNode("PaddleLeft", meshQuad, mtrSolidWhite, new ƒ.Vector2(-20, 0), new ƒ.Vector2(1, 4));
        paddleRight = createNode("PaddleRight", meshQuad, mtrSolidWhite, new ƒ.Vector2(20, 0), new ƒ.Vector2(1, 4));
        // ball.cmpTransform.local.translate( new ƒ.Vector3(-20.8, -13.7, 0) );
        ƒ.Debug.log(ball.cmpTransform.local.translation.x);
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        return pong;
    }
    function createNode(_name, _mesh, _material, _translation, _scaling) {
        var node = new ƒ.Node(_name);
        node.addComponent(new ƒ.ComponentTransform);
        node.addComponent(new ƒ.ComponentMaterial(_material));
        node.addComponent(new ƒ.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation.toVector3());
        node.getComponent(ƒ.ComponentMesh).pivot.scale(_scaling.toVector3());
        return node;
    }
    function hndKeyup(_event) {
        keysPressed[_event.code] = false;
    }
    function hndKeydown(_event) {
        keysPressed[_event.code] = true;
    }
    function generateRandomeValue() {
        if (Math.random() <= 0.5) {
            return Math.random() * (+0.003 - +0.0005) + +0.05;
        }
        else {
            return (Math.random() * (+0.03 - +0.005) + +0.005) * -1;
        }
    }
})(L05_PongCollision || (L05_PongCollision = {}));
// function moveBall(): void {
//     ball.cmpTransform.local.translate(ballVelocity);
//     ballTranslationX = ball.cmpTransform.local.translation.x;
//     ballTranslationY = ball.cmpTransform.local.translation.y;
//     if ( ballTranslationX < -20.8 || ballTranslationX > 20.8) {
//         ballVelocity.x = -ballVelocity.x;
//     }
//     if (ballTranslationY < -13.7 || ballTranslationY > 13.7) {
//         ballVelocity.y = -ballVelocity.y;
//     }
//     // if (ballTranslationX > paddleRight.cmpTransform.local.translation.x) {
//     //     ballVelocityY = -ballVelocityY;
//     //     console.log("Test");
//     // }
// }
