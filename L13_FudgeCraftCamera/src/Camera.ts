namespace L13_FudgeCraftCamera{
  import ƒ = FudgeCore;

  export class CameraOrbit extends ƒ.Node {
    // public camera: Camera;
    // private static camera: ƒ.ComponentCamera;
    // rotatorX: ƒ.Node;
    maxRotX: number = 75;
    minDistance: number = 1;
  
    constructor(_maxRotX: number) {
      super("CameraOrbit");

      this.maxRotX = Math.min(_maxRotX, 89);

      let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform();
      this.addComponent(cmpTransform);

      let rotatorX: ƒ.Node = new ƒ.Node("CameraRotX");
      this.appendChild(rotatorX);

      let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
  
      cmpCamera.backgroundColor = ƒ.Color.WHITE;

      rotatorX.addComponent(cmpCamera);
      this.setDistance(20);
      cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
    }

    get cmpCamera(): ƒ.ComponentCamera {
      return this.rotatorX.getComponent(ƒ.ComponentCamera);
    }

    get rotatorX(): ƒ.Node {
      return this.getChildrenByName("CameraRotX")[0];
    }

    setDistance(_distance: number ): void {
      let newDistance: number = Math.max(this.minDistance, _distance);
      this.cmpCamera.pivot.translation = ƒ.Vector3.Z(newDistance);
    }

    moveDistance(_delta: number): void {
      this.setDistance(this.cmpCamera.pivot.translation.z + _delta);
    }

    setRotationY(_angle: number): void {
      this.cmpTransform.local.rotation.y = _angle;
    }

    setRotationX(_angle: number): void {
      this.rotatorX.cmpTransform.local.rotation.x = _angle;
    }
  }

}