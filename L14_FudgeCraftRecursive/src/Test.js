"use strict";
var L14_FudgeCraftRecursive;
(function (L14_FudgeCraftRecursive) {
    var ƒ = FudgeCore;
    function test() {
        testGrid();
    }
    L14_FudgeCraftRecursive.test = test;
    function testGrid() {
        let cube = new L14_FudgeCraftRecursive.Cube(L14_FudgeCraftRecursive.CUBE_TYPE.GREEN, ƒ.Vector3.ZERO());
        L14_FudgeCraftRecursive.grid.push(cube.cmpTransform.local.translation, new L14_FudgeCraftRecursive.GridElement(cube));
        let pulled = L14_FudgeCraftRecursive.grid.pull(cube.cmpTransform.local.translation);
        logResult(cube == pulled.cube, "Grid push and pull", cube, pulled.cube, pulled);
        let popped = L14_FudgeCraftRecursive.grid.pop(cube.cmpTransform.local.translation);
        logResult(cube == popped.cube, "Grid pop", cube, popped.cube, popped);
        let empty = L14_FudgeCraftRecursive.grid.pull(cube.cmpTransform.local.translation);
        logResult(empty == undefined, "Grid element deleted");
    }
    function logResult(_success, ..._args) {
        let log = _success ? console.log : console.warn;
        log(`Test success: ${_success}`, _args);
    }
})(L14_FudgeCraftRecursive || (L14_FudgeCraftRecursive = {}));
//# sourceMappingURL=Test.js.map