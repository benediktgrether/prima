namespace L02_FirstGamePong{
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);

    function hndLoad(_event: Event): void {
        let canvas: HTMLCanvasElement = document.querySelector("canvas");

        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);
        console.log(canvas);

        // Initialize Player Nodes
        let playerOneNode: ƒ.Node = new ƒ.Node("Quad");
        let playerTwoNode: ƒ.Node = new ƒ.Node("Quad");
        let playBallNode: ƒ.Node = new ƒ.Node("Quad");

        // Create Mesh and change the mesh to Component
        let playerOneMesh: ƒ.MeshQuad = new ƒ.MeshQuad();
        let cmpPlayerOneMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(playerOneMesh);
        cmpPlayerOneMesh.pivot.scaleX(0.1);
        cmpPlayerOneMesh.pivot.scaleY(0.4);
        cmpPlayerOneMesh.pivot.translateX(1);
        
        let playerTwoMesh: ƒ.MeshQuad = new ƒ.MeshQuad();
        let cmpPlayerTwoMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(playerTwoMesh);
        cmpPlayerTwoMesh.pivot.scaleX(0.1);
        cmpPlayerTwoMesh.pivot.scaleY(0.4);
        cmpPlayerTwoMesh.pivot.translateX(-1);

        let playBallMesh: ƒ.MeshQuad = new ƒ.MeshQuad();
        let cmpPlayBallMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(playBallMesh);
        cmpPlayBallMesh.pivot.scaleX(0.1);
        cmpPlayBallMesh.pivot.scaleY(0.1);

        // Create Material and change Material to Component
        let playerOneMaterial: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 0, 1)));
        let cmpPlayerOneMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(playerOneMaterial);
        
        let playerTwoMaterial: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 0, 1)));
        let cmpPlayerTwoMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(playerTwoMaterial);
        
        let playBallMaterial: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 0, 1)));
        let cmpPlayBallMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(playBallMaterial);

        // Link Component with Player One Node
        playerOneNode.addComponent(cmpPlayerOneMesh);
        playerOneNode.addComponent(cmpPlayerOneMaterial);

        // Player Two and Play ball add as Child to Player One Node
        playerOneNode.appendChild(playerTwoNode);
        playerTwoNode.addComponent(cmpPlayerTwoMesh);
        playerTwoNode.addComponent(cmpPlayerTwoMaterial);

        playerOneNode.appendChild(playBallNode);
        playBallNode.addComponent(cmpPlayBallMesh);
        playBallNode.addComponent(cmpPlayBallMaterial);

        // Player Movement

        // 

        // Add Camera Component
        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        let viewport: ƒ.Viewport = new ƒ.Viewport;
        viewport.initialize("camrea",playerOneNode, cmpCamera, canvas);

        viewport.camera.pivot.translateZ(2);
        ƒ.Debug.log(viewport);
        viewport.draw();
    }
}