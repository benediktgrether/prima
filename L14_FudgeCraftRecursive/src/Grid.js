"use strict";
var L14_FudgeCraftRecursive;
(function (L14_FudgeCraftRecursive) {
    var ƒ = FudgeCore;
    class GridElement {
        constructor(_cube = null) {
            this.cube = _cube;
        }
    }
    L14_FudgeCraftRecursive.GridElement = GridElement;
    class Grid extends Map {
        // private grid: Map<string, Cube> = new Map();
        constructor() {
            super();
        }
        push(_position, _element = null) {
            let key = this.toKey(_position);
            this.set(key, _element);
            if (_element)
                L14_FudgeCraftRecursive.game.appendChild(_element.cube);
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
                L14_FudgeCraftRecursive.game.removeChild(element.cube);
            return element;
        }
        findNeigbors(_of) {
            let found = [];
            let offsets = [[0, 0, 1], [0, 0, -1], [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0]];
            for (let offset of offsets) {
                let posNeighbor = ƒ.Vector3.SUM(_of, new ƒ.Vector3(...offset));
                let neighbor = L14_FudgeCraftRecursive.grid.pull(posNeighbor);
                if (neighbor)
                    found.push(neighbor);
            }
            return found;
        }
        toKey(_position) {
            let position = _position.map(Math.round);
            let key = position.toString();
            return key;
        }
    }
    L14_FudgeCraftRecursive.Grid = Grid;
})(L14_FudgeCraftRecursive || (L14_FudgeCraftRecursive = {}));
//# sourceMappingURL=Grid.js.map