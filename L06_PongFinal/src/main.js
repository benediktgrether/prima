///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
var L06_PongFinal;
(function (L06_PongFinal) {
    var ƒ = FudgeCore;
    window.addEventListener("load", handleLoad);
    // What do the viewport?
    var viewport;
    var pong = new ƒ.Node("Pong");
    var ball;
    var paddleLeft;
    var paddleRight;
    var canvas;
    var ballVelocity = new ƒ.Vector3(generateRandomeValue(), generateRandomeValue(), 0);
    var collisionRightTop = false;
    var collisionRightBottom = false;
    var collisionLeftTop = false;
    var collisionLeftBottom = false;
    var playerOne = 0;
    var playerTwo = 0;
    var noWin = true;
    var keysPressed = {};
    var paddleSpeedTranslation = 0.5;
    var paddleSpeedRotation = 5;
    var controls;
    var mtxBall;
    var crc2;
    function handleLoad(_event) {
        canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);
        crc2 = canvas.getContext("2d");
        var pong = createPong();
        controls = defineControls();
        mtxBall = ball.cmpTransform.local;
        var cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(50);
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
        if (noWin == true) {
            processInput();
            var hit = false;
            for (var _i = 0, _a = pong.getChildren(); _i < _a.length; _i++) {
                var node = _a[_i];
                if (node.name == "Ball")
                    continue;
                hit = detectHit(ball.cmpTransform.local.translation, node);
                if (hit) {
                    processHit(node);
                    break;
                }
            }
            moveBall();
            ƒ.RenderManager.update();
            viewport.draw();
            // crc2.strokeStyle = "white";
            // crc2.lineWidth = 4;
            // crc2.setLineDash([10, 10]);
            // crc2.moveTo(crc2.canvas.width / 2, 0);
            // crc2.lineTo(crc2.canvas.width / 2, crc2.canvas.height);
            // crc2.stroke();
        }
    }
    function detectHit(_position, _node) {
        var sclRect = _node.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        var mtxInverse = ƒ.Matrix4x4.INVERSION(_node.cmpTransform.local);
        _position.transform(mtxInverse);
        var rect = new ƒ.Rectangle(0, 0, sclRect.x, sclRect.y, ƒ.ORIGIN2D.CENTER);
        return rect.isInside(_position.toVector2());
    }
    function processHit(_node) {
        switch (_node.name) {
            case "WallTop":
            case "WallBottom":
                ballVelocity.y *= -1;
                break;
            case "WallRight":
            case "WallLeft":
                playerWin(_node);
                // ballVelocity.x *= -1;
                // window.alert("Hello");
                break;
            case "PaddleLeft":
            case "PaddleRight":
                reflectBall(_node);
                break;
            default:
                console.warn("Oh, no, I hit something unknown!!", _node.name);
                break;
        }
    }
    function reflectBall(_paddle) {
        var normal = ƒ.Vector3.X(-1);
        normal.transform(_paddle.cmpTransform.local, false);
        ballVelocity.reflect(normal);
    }
    function processInput() {
        for (var code in controls) {
            if (keysPressed[code]) {
                var control = controls[code];
                var mtxPaddle = control.paddle.cmpTransform.local;
                mtxPaddle.translation = ƒ.Vector3.SUM(mtxPaddle.translation, control.translation);
                mtxPaddle.rotateZ(control.rotation);
            }
        }
    }
    function defineControls() {
        var controls = {};
        controls[ƒ.KEYBOARD_CODE.ARROW_UP] = { paddle: paddleRight, translation: ƒ.Vector3.Y(paddleSpeedTranslation), rotation: 0 };
        controls[ƒ.KEYBOARD_CODE.ARROW_DOWN] = { paddle: paddleRight, translation: ƒ.Vector3.Y(-paddleSpeedTranslation), rotation: 0 };
        controls[ƒ.KEYBOARD_CODE.W] = { paddle: paddleLeft, translation: ƒ.Vector3.Y(paddleSpeedTranslation), rotation: 0 };
        controls[ƒ.KEYBOARD_CODE.S] = { paddle: paddleLeft, translation: ƒ.Vector3.Y(-paddleSpeedTranslation), rotation: 0 };
        return controls;
    }
    function moveBall() {
        // ball.cmpTransform.local.translate(ballVelocity);
        mtxBall.translate(ballVelocity);
    }
    function createPong() {
        var meshQuad = new ƒ.MeshQuad();
        var mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
        pong.appendChild(createNode("WallLeft", meshQuad, mtrSolidWhite, new ƒ.Vector2(-22, 0), new ƒ.Vector2(1, 30)));
        pong.appendChild(createNode("WallRight", meshQuad, mtrSolidWhite, new ƒ.Vector2(22, 0), new ƒ.Vector2(1, 30)));
        pong.appendChild(createNode("WallTop", meshQuad, mtrSolidWhite, new ƒ.Vector2(0, 15), new ƒ.Vector2(45, 1)));
        pong.appendChild(createNode("WallBottom", meshQuad, mtrSolidWhite, new ƒ.Vector2(0, -15), new ƒ.Vector2(45, 1)));
        ball = createNode("Ball", meshQuad, mtrSolidWhite, ƒ.Vector2.ZERO, new ƒ.Vector2(1, 1));
        paddleLeft = createNode("PaddleLeft", meshQuad, mtrSolidWhite, new ƒ.Vector2(-18, 0), new ƒ.Vector2(1, 4));
        paddleRight = createNode("PaddleRight", meshQuad, mtrSolidWhite, new ƒ.Vector2(18, 0), new ƒ.Vector2(1, 4));
        ƒ.Debug.log(ball.cmpTransform.local.translation.x);
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        return pong;
    }
    function playerWin(_node) {
        noWin = false;
        if (_node.name == "WallLeft") {
            playerOne++;
            // window.alert(playerOne);
        }
        else {
            playerTwo++;
            // window.alert(playerTwo);
        }
        // if (ƒ.KEYBOARD_CODE.ENTER) {
        //     noWin = true;
        // }
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
            return Math.random() * (+0.3 - +0.05) + +0.05;
        }
        else {
            return (Math.random() * (+0.3 - +0.05) + +0.05) * -1;
        }
    }
})(L06_PongFinal || (L06_PongFinal = {}));
