///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
var L05_PongCollision;
(function (L05_PongCollision) {
    var ƒ = FudgeCore;
    window.addEventListener("load", handleLoad);
    // What do the viewport?
    var viewport;
    var ball = new ƒ.Node("Ball");
    var paddleLeft = new ƒ.Node("PaddleLeft");
    var paddleRight = new ƒ.Node("PaddleRight");
    var wallTop = new ƒ.Node("WallTop");
    var wallBottom = new ƒ.Node("WallBottom");
    var wallLeft = new ƒ.Node("WallLeft");
    var wallRight = new ƒ.Node("WallRight");
    var ballVelocity = new ƒ.Vector3(generateRandomeValue(), 0.3, 0);
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
        paddleRight.cmpTransform.local.translateX(18);
        paddleLeft.cmpTransform.local.translateX(-18);
        paddleLeft.getComponent(ƒ.ComponentMesh).pivot.scaleY(4);
        paddleRight.getComponent(ƒ.ComponentMesh).pivot.scaleY(4);
        wallTop.cmpTransform.local.translateY(14);
        wallTop.getComponent(ƒ.ComponentMesh).pivot.scaleX(43);
        wallBottom.cmpTransform.local.translateY(-14);
        wallBottom.getComponent(ƒ.ComponentMesh).pivot.scaleX(43);
        wallLeft.cmpTransform.local.translateX(-20);
        wallLeft.getComponent(ƒ.ComponentMesh).pivot.scaleY(28);
        wallRight.cmpTransform.local.translateY(10);
        wallRight.getComponent(ƒ.ComponentMesh).pivot.scaleX(43);
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
        var sclRectRight = paddleRight.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        var posRectRight = paddleRight.cmpTransform.local.translation.copy;
        var sclRectLeft = paddleLeft.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        var posRectLeft = paddleLeft.cmpTransform.local.translation.copy;
        var sclRectWallTop = wallTop.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        var posRectWallTop = wallTop.cmpTransform.local.translation.copy;
        var sclRectWallBottom = wallBottom.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        var posRectWallBottom = wallBottom.cmpTransform.local.translation.copy;
        var sclRectWallLeft = wallLeft.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        var posRectWallLeft = wallLeft.cmpTransform.local.translation.copy;
        var sclRectWallRight = wallRight.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        var posRectWallRight = wallRight.cmpTransform.local.translation.copy;
        var hit = detectHit(ball.cmpTransform.local.translation, posRectRight, sclRectRight, posRectLeft, sclRectLeft, sclRectWallTop, posRectWallTop, posRectWallBottom, sclRectWallBottom, sclRectWallLeft, posRectWallLeft, sclRectWallRight, posRectWallRight);
        // console.log(hit);
        if (!hit)
            moveBall();
        function detectHit(_position, _posRectRight, _sclRectRight, _posRectLeft, _sclRectLeft, _sclRectWallBottom, _posRectWallBottom, _posRectWallTop, _sclRectWallTop, _posRectWallLeft, _sclRectWallLeft, _posRectWallRight, _sclRectWallRight) {
            var rectRight = new ƒ.Rectangle(_posRectRight.x, _posRectRight.y, _sclRectRight.x, _sclRectRight.y, ƒ.ORIGIN2D.CENTER);
            var rectLeft = new ƒ.Rectangle(_posRectLeft.x, _posRectLeft.y, _sclRectLeft.x, _sclRectLeft.y, ƒ.ORIGIN2D.CENTER);
            var rectBottom = new ƒ.Rectangle(_posRectWallBottom.x, _posRectWallBottom.y, _sclRectWallBottom.x, _sclRectWallBottom.y, ƒ.ORIGIN2D.CENTER);
            var rectTop = new ƒ.Rectangle(_posRectWallTop.x, _posRectWallTop.y, _sclRectWallTop.x, _sclRectWallTop.y, ƒ.ORIGIN2D.CENTER);
            var rectWallLeft = new ƒ.Rectangle(_posRectWallLeft.x, _posRectWallLeft.y, _sclRectWallLeft.x, _sclRectWallLeft.y, ƒ.ORIGIN2D.CENTER);
            var rectWallRight = new ƒ.Rectangle(_posRectWallRight.x, _posRectWallRight.y, _sclRectWallRight.x, _sclRectWallRight.y, ƒ.ORIGIN2D.CENTER);
            console.log(rectBottom.isInside(_position.getVector2()));
            // console.log(rectRight, rectLeft);
            if (rectRight.isInside(_position.getVector2()) == true) {
                ballVelocity.x = -ballVelocity.x;
                ball.cmpTransform.local.translate(ballVelocity);
                return rectRight.isInside(_position.getVector2());
            }
            if (rectLeft.isInside(_position.getVector2()) == true) {
                ballVelocity.x = -ballVelocity.x;
                ball.cmpTransform.local.translate(ballVelocity);
                return rectLeft.isInside(_position.getVector2());
            }
            if (rectBottom.isInside(_position.getVector2()) == true) {
                console.log("hit");
                ballVelocity.y = -ballVelocity.y;
                ball.cmpTransform.local.translate(ballVelocity);
                return rectBottom.isInside(_position.getVector2());
            }
            if (rectTop.isInside(_position.getVector2()) == true) {
                ballVelocity.y = -ballVelocity.y;
                ball.cmpTransform.local.translate(ballVelocity);
                console.log("hit");
                return rectTop.isInside(_position.getVector2());
            }
            if (rectWallLeft.isInside(_position.getVector2()) == true) {
                // ballVelocity.x = 0;
                // ballVelocity.y = 0;
                // ball.cmpTransform.local.translate(ballVelocity);
                console.log("test");
                window.alert("Player One Wins");
                return rectWallLeft.isInside(_position.getVector2());
            }
            if (rectWallRight.isInside(_position.getVector2()) == true) {
                // ballVelocity.x = 0;
                // ballVelocity.y = 0;
                // ball.cmpTransform.local.translate(ballVelocity);
                console.log("test2");
                window.alert("Player Two Wins");
                return rectWallRight.isInside(_position.getVector2());
            }
            return false;
            // return rectRight.isInside(_position.getVector2());
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
        // Make Walls
        // for (let index = 0; index < 4; index++) {
        //     const element = array[index];
        // }
        wallTop.addComponent(new ƒ.ComponentMesh(meshQuad));
        wallTop.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        wallTop.addComponent(new ƒ.ComponentTransform);
        wallBottom.addComponent(new ƒ.ComponentMesh(meshQuad));
        wallBottom.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        wallBottom.addComponent(new ƒ.ComponentTransform);
        wallLeft.addComponent(new ƒ.ComponentMesh(meshQuad));
        wallLeft.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        wallLeft.addComponent(new ƒ.ComponentTransform);
        wallRight.addComponent(new ƒ.ComponentMesh(meshQuad));
        wallRight.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        wallRight.addComponent(new ƒ.ComponentTransform);
        pong.appendChild(wallTop);
        pong.appendChild(wallBottom);
        pong.appendChild(wallLeft);
        pong.appendChild(wallRight);
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
