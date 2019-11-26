"use strict";
var L12_FudgeCraftCollision;
(function (L12_FudgeCraftCollision) {
    var ƒ = FudgeCore;
    function test() {
        testGrid();
    }
    L12_FudgeCraftCollision.test = test;
    function testGrid() {
        let cube = new L12_FudgeCraftCollision.Cube(L12_FudgeCraftCollision.CUBE_TYPE.GREEN, ƒ.Vector3.ZERO());
        L12_FudgeCraftCollision.grid.push(cube.cmpTransform.local.translation, new L12_FudgeCraftCollision.GridElement(cube));
        let pulled = L12_FudgeCraftCollision.grid.pull(cube.cmpTransform.local.translation);
        logResult(cube == pulled.cube, "Grid push and pull", cube, pulled.cube, pulled);
        let popped = L12_FudgeCraftCollision.grid.pop(cube.cmpTransform.local.translation);
        logResult(cube == popped.cube, "Grid pop", cube, popped.cube, popped);
        let empty = L12_FudgeCraftCollision.grid.pull(cube.cmpTransform.local.translation);
        logResult(empty == undefined, "Grid element deleted");
    }
    function logResult(_success, ..._args) {
        let log = _success ? console.log : console.warn;
        log(`Test success: ${_success}`, _args);
    }
})(L12_FudgeCraftCollision || (L12_FudgeCraftCollision = {}));
//# sourceMappingURL=Test.js.map