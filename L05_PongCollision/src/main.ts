///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
namespace L05_PongCollision {

    interface KeyPressed {
        [code: string]: boolean;
    }

    import ƒ = FudgeCore;

    window.addEventListener("load", handleLoad);

    // What do the viewport?
    let viewport: ƒ.Viewport;

    let pong: ƒ.Node = new ƒ.Node("Pong");
    let ball: ƒ.Node;
    let paddleLeft: ƒ.Node;
    let paddleRight: ƒ.Node;

    let ballVelocity: ƒ.Vector3 = new ƒ.Vector3(generateRandomeValue(), generateRandomeValue(), 0);

    let collisionRightTop: boolean = false;
    let collisionRightBottom: boolean = false;
    let collisionLeftTop: boolean = false;
    let collisionLeftBottom: boolean = false;

    let keysPressed: KeyPressed = {};

    function handleLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);

        let pong: ƒ.Node = createPong();

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(50);

        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        ƒ.Debug.log(viewport);


        document.addEventListener("keydown", hndKeydown);
        document.addEventListener("keyup", hndKeyup);

        viewport.draw();


        // FUDGE Core Game Loop and Starting the Loop
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        ƒ.Loop.start();
    }

    function update(_event: Event): void {
        // ƒ.Debug.log(keysPressed);

        if (keysPressed[ƒ.KEYBOARD_CODE.ARROW_UP]) {
            if (paddleRight.cmpTransform.local.translation.y < 12.2 && collisionRightTop === false) {
                paddleRight.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));
                collisionRightBottom = false;
            } else {
                collisionRightTop = true;
            }
        }
        if (keysPressed[ƒ.KEYBOARD_CODE.ARROW_DOWN]) {
            if (paddleRight.cmpTransform.local.translation.y > -12.2 && collisionRightBottom === false) {
                paddleRight.cmpTransform.local.translate(new ƒ.Vector3(0, -0.3, 0));
                collisionRightTop = false;
            } else {
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
            } else {
                collisionLeftTop = true;
            }
        }
        if (keysPressed[ƒ.KEYBOARD_CODE.S]) {
            if (paddleLeft.cmpTransform.local.translation.y > -12.2 && collisionLeftBottom === false) {
                paddleLeft.cmpTransform.local.translate(new ƒ.Vector3(0, -0.3, 0));
                collisionLeftTop = false;
            } else {
                collisionLeftBottom = true;
            }
        }

        let hit: boolean = false;
        for (let node of pong.getChildren()) {
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
    }

    function detectHit(_position: ƒ.Vector3, _node: ƒ.Node): boolean {
        let sclRect: ƒ.Vector3 = _node.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        let posRect: ƒ.Vector3 = _node.cmpTransform.local.translation.copy;
        let rect: ƒ.Rectangle = new ƒ.Rectangle(posRect.x, posRect.y, sclRect.x, sclRect.y, ƒ.ORIGIN2D.CENTER);
        return rect.isInside(_position.toVector2());
    }

    function processHit(_node: ƒ.Node): void {
        switch (_node.name) {
            case "WallTop":
                ballVelocity.y *= -1;
                break;
            case "WallBottom":
                ballVelocity.y *= -1;
                break;
            case "WallRight":
            case "WallLeft":
                ballVelocity.x *= -1;
                break;
            case "PaddleLeft":
                ballVelocity.x *= -1;
                break;
            case "PaddleRight":
                ballVelocity.x *= -1;
                break;
            default:
                console.warn("Oh, no, I hit something unknow!!", _node.name);
                break;
        }
    }

    function moveBall(): void {
        ball.cmpTransform.local.translate(ballVelocity);
    }

    function createPong(): ƒ.Node {

        let meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();
        let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));

        pong.appendChild(createNode("WallLeft", meshQuad, mtrSolidWhite, new ƒ.Vector2(-22, 0), new ƒ.Vector2(1, 30)));
        pong.appendChild(createNode("WallRight", meshQuad, mtrSolidWhite, new ƒ.Vector2(22, 0), new ƒ.Vector2(1, 30)));
        pong.appendChild(createNode("WallTop", meshQuad, mtrSolidWhite, new ƒ.Vector2(0, 15), new ƒ.Vector2(45, 1)));
        pong.appendChild(createNode("WallBottom", meshQuad, mtrSolidWhite, new ƒ.Vector2(0, -15), new ƒ.Vector2(45, 1)));


        ball = createNode("Ball", meshQuad, mtrSolidWhite, ƒ.Vector2.ZERO(), new ƒ.Vector2(1, 1));
        paddleLeft = createNode("PaddleLeft", meshQuad, mtrSolidWhite, new ƒ.Vector2(-18, 0), new ƒ.Vector2(1, 4));
        paddleRight = createNode("PaddleRight", meshQuad, mtrSolidWhite, new ƒ.Vector2(18, 0), new ƒ.Vector2(1, 4));

        ƒ.Debug.log(ball.cmpTransform.local.translation.x);

        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);

        return pong;
    }

    function createNode(_name: string, _mesh: ƒ.Mesh, _material: ƒ.Material, _translation: ƒ.Vector2, _scaling: ƒ.Vector2): ƒ.Node {

        let node: ƒ.Node = new ƒ.Node(_name);
        node.addComponent(new ƒ.ComponentTransform);
        node.addComponent(new ƒ.ComponentMaterial(_material));
        node.addComponent(new ƒ.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation.toVector3());
        node.getComponent(ƒ.ComponentMesh).pivot.scale(_scaling.toVector3());

        return node;
    }


    function hndKeyup(_event: KeyboardEvent): void {
        keysPressed[_event.code] = false;
    }

    function hndKeydown(_event: KeyboardEvent): void {
        keysPressed[_event.code] = true;
    }

    function generateRandomeValue(): number {
        if (Math.random() <= 0.5) {
            return Math.random() * (+0.3 - +0.05) + + 0.05;
        } else {
            return (Math.random() * (+0.3 - +0.05) + + 0.05) * -1;
        }
    }
}