"use strict";
var L11_FudgeCraft;
(function (L11_FudgeCraft) {
    var ƒ = FudgeCore;
    class Fragment extends ƒ.Node {
        constructor(_shape) {
            super("Fragment-Type" + _shape);
            this.position = new ƒ.Vector3(0, 0, 0);
            let shape = Fragment.shapes[_shape];
            for (let position of shape) {
                let type = Fragment.getRandomEnum(L11_FudgeCraft.CUBE_TYPE);
                let vctPosition = ƒ.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube = new L11_FudgeCraft.Cube(type, vctPosition);
                this.appendChild(cube);
            }
        }
        static getShapeArray() {
            return [
                // corner
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]],
                // quad
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]],
                // s
                [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, -1, 0]]
            ];
        }
        static getRandomEnum(_enum) {
            let randomKey = Object.keys(_enum)[Math.floor(Math.random() * Object.keys(_enum).length)];
            return _enum[randomKey];
        }
    }
    Fragment.shapes = Fragment.getShapeArray();
    L11_FudgeCraft.Fragment = Fragment;
})(L11_FudgeCraft || (L11_FudgeCraft = {}));
//# sourceMappingURL=Fragment.js.map