"use strict";
var L13_FudgeCraftCamera;
(function (L13_FudgeCraftCamera) {
    var ƒ = FudgeCore;
    function test() {
        testGrid();
    }
    L13_FudgeCraftCamera.test = test;
    function testGrid() {
        let cube = new L13_FudgeCraftCamera.Cube(L13_FudgeCraftCamera.CUBE_TYPE.GREEN, ƒ.Vector3.ZERO());
        L13_FudgeCraftCamera.grid.push(cube.cmpTransform.local.translation, new L13_FudgeCraftCamera.GridElement(cube));
        let pulled = L13_FudgeCraftCamera.grid.pull(cube.cmpTransform.local.translation);
        logResult(cube == pulled.cube, "Grid push and pull", cube, pulled.cube, pulled);
        let popped = L13_FudgeCraftCamera.grid.pop(cube.cmpTransform.local.translation);
        logResult(cube == popped.cube, "Grid pop", cube, popped.cube, popped);
        let empty = L13_FudgeCraftCamera.grid.pull(cube.cmpTransform.local.translation);
        logResult(empty == undefined, "Grid element deleted");
    }
    function logResult(_success, ..._args) {
        let log = _success ? console.log : console.warn;
        log(`Test success: ${_success}`, _args);
    }
})(L13_FudgeCraftCamera || (L13_FudgeCraftCamera = {}));
//# sourceMappingURL=Test.js.map