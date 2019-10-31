///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
namespace L05_PongCollision {
    
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
    
    let wallTop: ƒ.Node = new ƒ.Node("WallTop");
    let wallBottom: ƒ.Node = new ƒ.Node("WallBottom");
    let wallLeft: ƒ.Node = new ƒ.Node("WallLeft");
    let wallRight: ƒ.Node = new ƒ.Node("WallRight");
    

    let ballVelocity: ƒ.Vector3 =  new ƒ.Vector3(generateRandomeValue(), 0.3, 0);

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
        cmpCamera.pivot.translateZ(42);

        paddleRight.cmpTransform.local.translateX(18);
        paddleLeft.cmpTransform.local.translateX(-18);


        (<ƒ.ComponentMesh>paddleLeft.getComponent(ƒ.ComponentMesh)).pivot.scaleY(4);
        (<ƒ.ComponentMesh>paddleRight.getComponent(ƒ.ComponentMesh)).pivot.scaleY(4);


        wallTop.cmpTransform.local.translateY(14);
        (<ƒ.ComponentMesh>wallTop.getComponent(ƒ.ComponentMesh)).pivot.scaleX(43);
        
        wallBottom.cmpTransform.local.translateY(-14);
        (<ƒ.ComponentMesh>wallBottom.getComponent(ƒ.ComponentMesh)).pivot.scaleX(43);
        
        wallLeft.cmpTransform.local.translateX(-20);
        (<ƒ.ComponentMesh>wallLeft.getComponent(ƒ.ComponentMesh)).pivot.scaleY(28);
        
        wallRight.cmpTransform.local.translateY(10);
        (<ƒ.ComponentMesh>wallRight.getComponent(ƒ.ComponentMesh)).pivot.scaleX(43);

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

        if ( keysPressed[ƒ.KEYBOARD_CODE.ARROW_UP] ) {
            if (paddleRight.cmpTransform.local.translation.y < 12.2 && collisionRightTop === false) {
                paddleRight.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));
                collisionRightBottom = false;
            } else {
                collisionRightTop = true;
            }
        } 
        if ( keysPressed[ƒ.KEYBOARD_CODE.ARROW_DOWN] ) {
            if (paddleRight.cmpTransform.local.translation.y > -12.2  && collisionRightBottom === false) {
                paddleRight.cmpTransform.local.translate(new ƒ.Vector3(0, -0.3, 0));
                collisionRightTop = false;   
            } else {
                collisionRightBottom = true;
            }

        } 
        if ( keysPressed[ƒ.KEYBOARD_CODE.ARROW_LEFT] ) {
            paddleRight.cmpTransform.local.translate(new ƒ.Vector3(-0.3, 0, 0));
        }
        if ( keysPressed[ƒ.KEYBOARD_CODE.W]) {
            if (paddleLeft.cmpTransform.local.translation.y < 12.2 && collisionLeftTop === false) {
                paddleLeft.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));
                collisionLeftBottom = false;
            } else {
                collisionLeftTop = true;
            }
        } 
        if ( keysPressed[ƒ.KEYBOARD_CODE.S]) {
            if (paddleLeft.cmpTransform.local.translation.y > -12.2 && collisionLeftBottom === false) {
                paddleLeft.cmpTransform.local.translate(new ƒ.Vector3(0, -0.3, 0));
                collisionLeftTop = false;  
            } else {
                collisionLeftBottom = true;
            }
        }


        let sclRectRight: ƒ.Vector3 = paddleRight.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        let posRectRight: ƒ.Vector3 = paddleRight.cmpTransform.local.translation.copy ;
        
        let sclRectLeft: ƒ.Vector3 = paddleLeft.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        let posRectLeft: ƒ.Vector3 = paddleLeft.cmpTransform.local.translation.copy ;
        
        let sclRectWallTop: ƒ.Vector3 = wallTop.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        let posRectWallTop: ƒ.Vector3 = wallTop.cmpTransform.local.translation.copy ;
        
        let sclRectWallBottom: ƒ.Vector3 = wallBottom.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        let posRectWallBottom: ƒ.Vector3 = wallBottom.cmpTransform.local.translation.copy ;
        
        let sclRectWallLeft: ƒ.Vector3 = wallLeft.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        let posRectWallLeft: ƒ.Vector3 = wallLeft.cmpTransform.local.translation.copy ;
        
        let sclRectWallRight: ƒ.Vector3 = wallRight.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        let posRectWallRight: ƒ.Vector3 = wallRight.cmpTransform.local.translation.copy ;

        let hit: boolean = detectHit(ball.cmpTransform.local.translation, posRectRight, sclRectRight, posRectLeft, sclRectLeft, sclRectWallTop, posRectWallTop, posRectWallBottom, sclRectWallBottom, sclRectWallLeft, posRectWallLeft, sclRectWallRight, posRectWallRight);
        // console.log(hit);
        if (!hit) 
            moveBall();


        function detectHit(_position: ƒ.Vector3, _posRectRight: ƒ.Vector3, _sclRectRight: ƒ.Vector3, _posRectLeft: ƒ.Vector3, _sclRectLeft: ƒ.Vector3, _sclRectWallBottom: ƒ.Vector3, _posRectWallBottom: ƒ.Vector3, _posRectWallTop: ƒ.Vector3, _sclRectWallTop: ƒ.Vector3, _posRectWallLeft: ƒ.Vector3, _sclRectWallLeft: ƒ.Vector3, _posRectWallRight: ƒ.Vector3, _sclRectWallRight: ƒ.Vector3): boolean {

            let rectRight: ƒ.Rectangle = new ƒ.Rectangle(_posRectRight.x, _posRectRight.y, _sclRectRight.x, _sclRectRight.y, ƒ.ORIGIN2D.CENTER); 

            let rectLeft: ƒ.Rectangle = new ƒ.Rectangle(_posRectLeft.x, _posRectLeft.y, _sclRectLeft.x, _sclRectLeft.y, ƒ.ORIGIN2D.CENTER); 
            
            let rectBottom: ƒ.Rectangle = new ƒ.Rectangle(_posRectWallBottom.x, _posRectWallBottom.y, _sclRectWallBottom.x, _sclRectWallBottom.y, ƒ.ORIGIN2D.CENTER); 
            
            let rectTop: ƒ.Rectangle = new ƒ.Rectangle(_posRectWallTop.x, _posRectWallTop.y, _sclRectWallTop.x, _sclRectWallTop.y, ƒ.ORIGIN2D.CENTER); 
            
            let rectWallLeft: ƒ.Rectangle = new ƒ.Rectangle(_posRectWallLeft.x, _posRectWallLeft.y, _sclRectWallLeft.x, _sclRectWallLeft.y, ƒ.ORIGIN2D.CENTER); 
            
            let rectWallRight: ƒ.Rectangle = new ƒ.Rectangle(_posRectWallRight.x, _posRectWallRight.y, _sclRectWallRight.x, _sclRectWallRight.y, ƒ.ORIGIN2D.CENTER); 

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
    
        function moveBall(): void {
            ball.cmpTransform.local.translate(ballVelocity);
        }

        // console.log(detectHit(ball.cmpTransform.local.translation, paddleRight.cmpTransform.local));
        // moveBall();
        // console.log(ballPosX);
        
        ƒ.RenderManager.update();
        viewport.draw();
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