namespace L13_FudgeCraftCamera{
  import ƒ = FudgeCore;

  export class Camera {
    public camera: Camera;

    constructor() {
      // this.camera == _camera;
      let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
      cmpCamera.pivot.translate(new ƒ.Vector3(4, 6, 20));
      cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
      cmpCamera.backgroundColor = ƒ.Color.WHITE;

    }
    // let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    
  }

}