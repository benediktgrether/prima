"use strict";
///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
var FudgeCraft;
///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
(function (FudgeCraft) {
    var fudge = FudgeCore;
    window.addEventListener("load", handleLoad);
    let meshCube = new fudge.MeshCube;
    let allbuildingMatrices = [];
    initializeBuildingMatrices();
    let translationValues = [[-1, 1], [0, 1], [1, 1],
        [-1, 0], [0, 0], [1, 0],
        [-1, -1], [0, -1], [1, -1]];
    let cmpCamera = new fudge.ComponentCamera();
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        fudge.Debug.log(canvas);
        cmpCamera.pivot.translateZ(50);
        let game = createGame();
        FudgeCraft.viewport = new fudge.Viewport();
        FudgeCraft.viewport.initialize("Viewport", game, cmpCamera, canvas);
        fudge.Debug.log(FudgeCraft.viewport);
        FudgeCraft.viewport.draw();
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        fudge.Loop.start();
    }
    function update(_event) {
        //cmpCamera.pivot.translateX(0.1);
        //cmpCamera.pivot.rotateY(0.05);
        fudge.RenderManager.update();
        FudgeCraft.viewport.draw();
    }
    function createGame() {
        let game = new fudge.Node("Game");
        buildFragments(game);
        return game;
    }
    function buildFragments(_game) {
        let translationTemp = -20;
        for (let i = 0; i < allbuildingMatrices.length; i++) {
            let baseBlock = new fudge.Node("Base_Block_Fragment");
            let mtrSoliColor = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 0, 0)));
            baseBlock.addComponent(new fudge.ComponentMesh(meshCube));
            baseBlock.addComponent(new fudge.ComponentMaterial(mtrSoliColor));
            baseBlock.addComponent(new fudge.ComponentTransform);
            baseBlock.cmpTransform.local.translateX(translationTemp);
            let buildingMtrx = allbuildingMatrices[i];
            for (let j = 0; j < buildingMtrx.length; j++) {
                if (buildingMtrx[j] == true) {
                    let subBlock = new fudge.Node("subBlock");
                    subBlock.addComponent(new fudge.ComponentMesh(meshCube));
                    subBlock.addComponent(new fudge.ComponentMaterial(mtrSoliColor));
                    subBlock.addComponent(new fudge.ComponentTransform);
                    subBlock.cmpTransform.local.translateX(translationValues[j][0]);
                    subBlock.cmpTransform.local.translateY(translationValues[j][1]);
                    baseBlock.appendChild(subBlock);
                    _game.appendChild(baseBlock);
                }
            }
            translationTemp = translationTemp + 5;
        }
    }
    function initializeBuildingMatrices() {
        let buildingMtrxIBlock = [false, true, false,
            false, false, false,
            false, true, false];
        allbuildingMatrices.push(buildingMtrxIBlock);
        let buildingMtrx2x2Block = [false, false, false,
            false, false, true,
            false, true, true];
        allbuildingMatrices.push(buildingMtrx2x2Block);
        let buildingMtrxTBlock = [true, true, true,
            false, false, false,
            false, true, false];
        allbuildingMatrices.push(buildingMtrxTBlock);
        let buildingMtrxLBlock = [false, true, false,
            false, false, false,
            false, true, true];
        allbuildingMatrices.push(buildingMtrxLBlock);
        let buildingMtrxReversedLBlock = [false, true, false,
            false, false, false,
            true, true, false];
        allbuildingMatrices.push(buildingMtrxReversedLBlock);
        let buildingMtrxZBlock = [true, true, false,
            false, false, false,
            false, true, true];
        allbuildingMatrices.push(buildingMtrxZBlock);
        let buildingMtrxReversedZBlock = [false, true, true,
            false, false, false,
            true, true, false];
        allbuildingMatrices.push(buildingMtrxReversedZBlock);
    }
})(FudgeCraft || (FudgeCraft = {}));
//# sourceMappingURL=Main.js.map