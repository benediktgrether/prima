"use strict";
var L20_ScrollerFoundation;
(function (L20_ScrollerFoundation) {
    var ƒ = FudgeCore;
    window.addEventListener("load", test);
    let sprite;
    let root;
    function test() {
        let img = document.querySelector("img");
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let txtImage = new ƒ.TextureImage();
        txtImage.image = img;
        sprite = new L20_ScrollerFoundation.Sprite("Test");
        let rects = [
            new ƒ.Rectangle(0, 0, 360, 416),
            new ƒ.Rectangle(0, 0, 180, 208),
            new ƒ.Rectangle(180, 0, 180, 208),
            new ƒ.Rectangle(0, 208, 180, 208),
            new ƒ.Rectangle(180, 208, 180, 208)
        ];
        sprite.generate(txtImage, rects, 300, ƒ.ORIGIN2D.BOTTOMCENTER);
        ƒ.RenderManager.initialize(true, false);
        root = new L20_ScrollerFoundation.NodeSprite("Root", sprite);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = ƒ.Color.CSS("aliceblue");
        let viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        viewport.draw();
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            // ƒ.Debug.log(frame);
            root.showFrameNext();
            viewport.draw();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
})(L20_ScrollerFoundation || (L20_ScrollerFoundation = {}));
//# sourceMappingURL=Test.js.map