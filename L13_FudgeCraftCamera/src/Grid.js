"use strict";
var L13_FudgeCraftCamera;
(function (L13_FudgeCraftCamera) {
    var ƒ = FudgeCore;
    class GridElement {
        constructor(_cube = null) {
            this.cube = _cube;
        }
    }
    L13_FudgeCraftCamera.GridElement = GridElement;
    class Grid extends Map {
        constructor() {
            super();
            this.push(ƒ.Vector3.ZERO(), new GridElement(new L13_FudgeCraftCamera.Cube(L13_FudgeCraftCamera.CUBE_TYPE.GREY, ƒ.Vector3.ZERO())));
        }
        push(_position, _element = null) {
            let key = this.toKey(_position);
            this.set(key, _element);
            if (_element)
                L13_FudgeCraftCamera.game.appendChild(_element.cube);
        }
        pull(_position) {
            let key = this.toKey(_position);
            let element = this.get(key);
            return element;
        }
        pop(_position) {
            let key = this.toKey(_position);
            let element = this.get(key);
            this.delete(key);
            if (element)
                L13_FudgeCraftCamera.game.removeChild(element.cube);
            return element;
        }
        toKey(_position) {
            let position = _position.map(Math.round);
            let key = position.toString();
            return key;
        }
    }
    L13_FudgeCraftCamera.Grid = Grid;
})(L13_FudgeCraftCamera || (L13_FudgeCraftCamera = {}));
//# sourceMappingURL=Grid.js.map