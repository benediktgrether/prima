"use strict";
var L13_FudgeCraftCamera;
(function (L13_FudgeCraftCamera) {
    var ƒ = FudgeCore;
    class CameraOrbit extends ƒ.Node {
        constructor(_maxRotX) {
            super("CameraOrbit");
            // public camera: Camera;
            // private static camera: ƒ.ComponentCamera;
            // rotatorX: ƒ.Node;
            this.maxRotX = 75;
            this.minDistance = 1;
            this.maxRotX = Math.min(_maxRotX, 89);
            let cmpTransform = new ƒ.ComponentTransform();
            this.addComponent(cmpTransform);
            let rotatorX = new ƒ.Node("CameraRotX");
            this.appendChild(rotatorX);
            let cmpCamera = new ƒ.ComponentCamera();
            cmpCamera.backgroundColor = ƒ.Color.WHITE;
            rotatorX.addComponent(cmpCamera);
            this.setDistance(20);
            cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        }
        get cmpCamera() {
            return this.rotatorX.getComponent(ƒ.ComponentCamera);
        }
        get rotatorX() {
            return this.getChildrenByName("CameraRotX")[0];
        }
        setDistance(_distance) {
            let newDistance = Math.max(this.minDistance, _distance);
            this.cmpCamera.pivot.translation = ƒ.Vector3.Z(newDistance);
        }
        moveDistance(_delta) {
            this.setDistance(this.cmpCamera.pivot.translation.z + _delta);
        }
        setRotationY(_angle) {
            this.cmpTransform.local.rotation.y = _angle;
        }
        setRotationX(_angle) {
            this.rotatorX.cmpTransform.local.rotation.x = _angle;
        }
    }
    L13_FudgeCraftCamera.CameraOrbit = CameraOrbit;
})(L13_FudgeCraftCamera || (L13_FudgeCraftCamera = {}));
//# sourceMappingURL=Camera.js.map