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
            rotatorX.addComponent(new ƒ.ComponentTransform());
            this.appendChild(rotatorX);
            let cmpCamera = new ƒ.ComponentCamera();
            cmpCamera.backgroundColor = ƒ.Color.WHITE;
            rotatorX.addComponent(cmpCamera);
            this.setDistance(20);
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
            this.cmpTransform.local.rotation = ƒ.Vector3.Y(_angle);
        }
        setRotationX(_angle) {
            _angle = Math.min(Math.max(-this.maxRotX, _angle), this.maxRotX);
            this.rotatorX.cmpTransform.local.rotation = ƒ.Vector3.X(_angle);
        }
        rotateY(_delta) {
            this.cmpTransform.local.rotateY(_delta);
        }
        rotateX(_delta) {
            let angle = this.rotatorX.cmpTransform.local.rotation.x + _delta;
            this.setRotationX(angle);
        }
        translate(_delta) {
            let distance = this.cmpCamera.pivot.translation.z + _delta;
            this.setDistance(distance);
        }
    }
    L13_FudgeCraftCamera.CameraOrbit = CameraOrbit;
})(L13_FudgeCraftCamera || (L13_FudgeCraftCamera = {}));
//# sourceMappingURL=Camera.js.map