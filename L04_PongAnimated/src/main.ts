///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
namespace L04_PongAnimated {
    
    interface KeyPressed {
        [code: string]: boolean;
    }

    import ƒ = FudgeCore;

    window.addEventListener("load", handleLoad);

    // What do the viewport?
    let viewport: ƒ.Viewport;

    let ball: ƒ.Node = new ƒ.Node("Ball");
    let paddleLeft: ƒ.Node =    new ƒ.Node("PaddleLeft");
    let paddleRight: ƒ.Node = new ƒ.Node("PaddleRight");
    
    let ballTranslationX: number;
    let ballTranslationY: number;
    // let ballTranslationX: number = ball.cmpTransform.local.translation.x;
    // let ballTranslationY: number = ball.cmpTransform.local.translation.y;
    let ballPosX: number = 0;
    let ballPosY: number = 0;
    let ballVelocityX: number = generateRandomeValue();
    let ballVelocityY: number = generateRandomeValue();
    console.log(ballPosX);

    let keysPressed: KeyPressed = {};
    
    function handleLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);

        

        let pong: ƒ.Node = createPong();

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(42);

        paddleRight.cmpTransform.local.translateX(20);
        paddleLeft.cmpTransform.local.translateX(-20);

        (<ƒ.ComponentMesh>paddleLeft.getComponent(ƒ.ComponentMesh)).pivot.scaleY(4);
        (<ƒ.ComponentMesh>paddleRight.getComponent(ƒ.ComponentMesh)).pivot.scaleY(4);

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

        if ( keysPressed[ƒ.KEYBOARD_CODE.ARROW_UP]) {
            paddleRight.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));

        } 
        if ( keysPressed[ƒ.KEYBOARD_CODE.ARROW_DOWN]) {
            paddleRight.cmpTransform.local.translate(new ƒ.Vector3(0, -0.3, 0));   

        } 
        if ( keysPressed[ƒ.KEYBOARD_CODE.W]) {
            paddleLeft.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));

        } 
        if ( keysPressed[ƒ.KEYBOARD_CODE.S]) {
            paddleLeft.cmpTransform.local.translate(new ƒ.Vector3(0, -0.3, 0));
        }

        moveBall()
        // console.log(ballPosX);
        
        ƒ.RenderManager.update();
        viewport.draw();
    }

    function moveBall(): void {

        ball.cmpTransform.local.translate(new ƒ.Vector3(ballVelocityX, ballVelocityY, 0) );

        ballTranslationX = ball.cmpTransform.local.translation.x;
        ballTranslationY = ball.cmpTransform.local.translation.y;



        if ( ballTranslationX < -20.8 || ballTranslationX > 20.8) {
            ballVelocityX = -ballVelocityX;
        }

        if (ballTranslationY < -13.7 || ballTranslationY > 13.7) {
            ballVelocityY = -ballVelocityY;
        }


    }

    function createPong(): ƒ.Node {
        let pong: ƒ.Node = new ƒ.Node("Pong");

        let meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();
        let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));

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
        ƒ.Debug.log(ball.cmpTransform.local.translation.x );

        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);

        return pong;
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