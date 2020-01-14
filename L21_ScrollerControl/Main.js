"use strict";
/// <reference path="../L20_ScrollerFoundation/SpriteGenerator.ts"/>
var L21_ScrollerControl;
/// <reference path="../L20_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L21_ScrollerControl) {
    L21_ScrollerControl.ƒ = FudgeCore;
    L21_ScrollerControl.Sprite = L20_ScrollerFoundation.Sprite;
    L21_ScrollerControl.NodeSprite = L20_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", test);
    let keysPressed = {};
    let game;
    let bene;
    function test() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let img = document.querySelector("img");
        let txtbene = new L21_ScrollerControl.ƒ.TextureImage();
        txtbene.image = img;
        L21_ScrollerControl.Bene.generateSprites(txtbene);
        L21_ScrollerControl.ƒ.RenderManager.initialize(true, false);
        game = new L21_ScrollerControl.ƒ.Node("Game");
        bene = new L21_ScrollerControl.Bene("Bene");
        game.appendChild(bene);
        let cmpCamera = new L21_ScrollerControl.ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(L21_ScrollerControl.ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = L21_ScrollerControl.ƒ.Color.CSS("aliceblue");
        let viewport = new L21_ScrollerControl.ƒ.Viewport();
        viewport.initialize("Viewport", game, cmpCamera, canvas);
        viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        L21_ScrollerControl.ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        L21_ScrollerControl.ƒ.Loop.start(L21_ScrollerControl.ƒ.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            processInput();
            viewport.draw();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
    }
    function processInput() {
        if (keysPressed[L21_ScrollerControl.ƒ.KEYBOARD_CODE.A]) {
            bene.act(L21_ScrollerControl.ACTION.WALK, L21_ScrollerControl.DIRECTION.LEFT);
            return;
        }
        if (keysPressed[L21_ScrollerControl.ƒ.KEYBOARD_CODE.D]) {
            bene.act(L21_ScrollerControl.ACTION.WALK, L21_ScrollerControl.DIRECTION.RIGHT);
            return;
        }
        bene.act(L21_ScrollerControl.ACTION.IDLE);
    }
})(L21_ScrollerControl || (L21_ScrollerControl = {}));
//# sourceMappingURL=Main.js.map