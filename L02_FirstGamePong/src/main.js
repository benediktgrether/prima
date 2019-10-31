"use strict";
var L02_FirstGamePong;
(function (L02_FirstGamePong) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        let canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);
        console.log(canvas);
        // Initialize Player Nodes
        let playerOneNode = new ƒ.Node("Quad");
        let playerTwoNode = new ƒ.Node("Quad");
        let playBallNode = new ƒ.Node("Quad");
        // Create Mesh and change the mesh to Component
        let playerOneMesh = new ƒ.MeshQuad();
        let cmpPlayerOneMesh = new ƒ.ComponentMesh(playerOneMesh);
        cmpPlayerOneMesh.pivot.scaleX(0.1);
        cmpPlayerOneMesh.pivot.scaleY(0.4);
        cmpPlayerOneMesh.pivot.translateX(1);
        let playerTwoMesh = new ƒ.MeshQuad();
        let cmpPlayerTwoMesh = new ƒ.ComponentMesh(playerTwoMesh);
        cmpPlayerTwoMesh.pivot.scaleX(0.1);
        cmpPlayerTwoMesh.pivot.scaleY(0.4);
        cmpPlayerTwoMesh.pivot.translateX(-1);
        let playBallMesh = new ƒ.MeshQuad();
        let cmpPlayBallMesh = new ƒ.ComponentMesh(playBallMesh);
        cmpPlayBallMesh.pivot.scaleX(0.1);
        cmpPlayBallMesh.pivot.scaleY(0.1);
        // Create Material and change Material to Component
        let playerOneMaterial = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 0, 1)));
        let cmpPlayerOneMaterial = new ƒ.ComponentMaterial(playerOneMaterial);
        let playerTwoMaterial = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 0, 1)));
        let cmpPlayerTwoMaterial = new ƒ.ComponentMaterial(playerTwoMaterial);
        let playBallMaterial = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 0, 1)));
        let cmpPlayBallMaterial = new ƒ.ComponentMaterial(playBallMaterial);
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
        document.body.onkeydown = function (e) {
            if (e.keyCode == 38) {
                cmpPlayerOneMesh.pivot.translateY(0.01);
                viewport.draw();
            }
            else if (e.keyCode == 40) {
                cmpPlayerOneMesh.pivot.translateY(-0.01);
                viewport.draw();
            }
            else if (e.keyCode == 87) {
                cmpPlayerTwoMesh.pivot.translateY(0.01);
                viewport.draw();
            }
            else if (e.keyCode == 83) {
                cmpPlayerTwoMesh.pivot.translateY(-0.01);
                viewport.draw();
            }
        };
        // 
        // Add Camera Component
        let cmpCamera = new ƒ.ComponentCamera();
        let viewport = new ƒ.Viewport;
        viewport.initialize("camrea", playerOneNode, cmpCamera, canvas);
        viewport.camera.pivot.translateZ(2);
        ƒ.Debug.log(viewport);
        viewport.draw();
    }
})(L02_FirstGamePong || (L02_FirstGamePong = {}));
//# sourceMappingURL=main.js.map