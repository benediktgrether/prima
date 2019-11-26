"use strict";
var L12_FudgeCraftCollision;
(function (L12_FudgeCraftCollision) {
    var ƒ = FudgeCore;
    class GridElement {
        constructor(_cube = null) {
            this.cube = _cube;
        }
    }
    L12_FudgeCraftCollision.GridElement = GridElement;
    class Grid extends Map {
        constructor() {
            super();
            this.push(ƒ.Vector3.ZERO(), new GridElement(new L12_FudgeCraftCollision.Cube(L12_FudgeCraftCollision.CUBE_TYPE.GREY, ƒ.Vector3.ZERO())));
        }
        push(_position, _element = null) {
            let key = this.toKey(_position);
            this.set(key, _element);
            if (_element)
                L12_FudgeCraftCollision.game.appendChild(_element.cube);
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
                L12_FudgeCraftCollision.game.removeChild(element.cube);
            return element;
        }
        toKey(_position) {
            let position = _position.map(Math.round);
            let key = position.toString();
            return key;
        }
    }
    L12_FudgeCraftCollision.Grid = Grid;
})(L12_FudgeCraftCollision || (L12_FudgeCraftCollision = {}));
//# sourceMappingURL=Grid.js.map