///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
var L10_FudgeCraft;
(function (L10_FudgeCraft) {
    var fudge = FudgeCore;
    window.addEventListener("load", handleLoad);
    var meshCube = new fudge.MeshCube;
    var allFragmentsMatrices = [];
    initializeBuildingMatrices();
    var translationValues = [[-1, 1], [0, 1], [1, 1],
        [-1, 0], [0, 0], [1, 0],
        [-1, -1], [0, -1], [1, -1]];
    var cmpCamera = new fudge.ComponentCamera();
    function handleLoad(_event) {
        var canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        fudge.Debug.log(canvas);
        cmpCamera.pivot.translateZ(50);
        var game = createGame();
        L10_FudgeCraft.viewport = new fudge.Viewport();
        L10_FudgeCraft.viewport.initialize("Viewport", game, cmpCamera, canvas);
        fudge.Debug.log(L10_FudgeCraft.viewport);
        L10_FudgeCraft.viewport.draw();
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        fudge.Loop.start();
    }
    function update(_event) {
        //cmpCamera.pivot.translateX(0.1);
        //cmpCamera.pivot.rotateY(0.05);
        fudge.RenderManager.update();
        L10_FudgeCraft.viewport.draw();
    }
    function createGame() {
        var game = new fudge.Node("Game");
        buildFragments(game);
        return game;
    }
    function buildFragments(_game) {
        var translationTemp = -20;
        for (var i = 0; i < allFragmentsMatrices.length; i++) {
            var baseBlock = new fudge.Node("Base_Block_Fragment");
            var mtrSoliColor = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 0, 0)));
            baseBlock.addComponent(new fudge.ComponentMesh(meshCube));
            baseBlock.addComponent(new fudge.ComponentMaterial(mtrSoliColor));
            baseBlock.addComponent(new fudge.ComponentTransform);
            baseBlock.cmpTransform.local.translateX(translationTemp);
            var buildingMtrx = allFragmentsMatrices[i];
            for (var j = 0; j < buildingMtrx.length; j++) {
                if (buildingMtrx[j] == true) {
                    var subBlock = new fudge.Node("subBlock");
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
        var buildingMtrxIBlock = [false, true, false,
            false, false, false,
            false, true, false];
        allFragmentsMatrices.push(buildingMtrxIBlock);
        var buildingMtrx2x2Block = [false, false, false,
            false, false, true,
            false, true, true];
        allFragmentsMatrices.push(buildingMtrx2x2Block);
        var buildingMtrxTBlock = [true, true, true,
            false, false, false,
            false, true, false];
        allFragmentsMatrices.push(buildingMtrxTBlock);
        var buildingMtrxLBlock = [false, true, false,
            false, false, false,
            false, true, true];
        allFragmentsMatrices.push(buildingMtrxLBlock);
        var buildingMtrxReversedLBlock = [false, true, false,
            false, false, false,
            true, true, false];
        allFragmentsMatrices.push(buildingMtrxReversedLBlock);
        var buildingMtrxZBlock = [true, true, false,
            false, false, false,
            false, true, true];
        allFragmentsMatrices.push(buildingMtrxZBlock);
        var buildingMtrxReversedZBlock = [false, true, true,
            false, false, false,
            true, true, false];
        allFragmentsMatrices.push(buildingMtrxReversedZBlock);
    }
})(L10_FudgeCraft || (L10_FudgeCraft = {}));
