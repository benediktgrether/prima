/// <reference path="../L20_ScrollerFoundation/SpriteGenerator.ts"/>
namespace L21_ScrollerControl {
  export import ƒ = FudgeCore;
  export import Sprite = L20_ScrollerFoundation.Sprite;
  export import NodeSprite = L20_ScrollerFoundation.NodeSprite;

  window.addEventListener("load", test);

  interface KeyPressed {
    [code: string]: boolean;
  }
  let keysPressed: KeyPressed = {};

  let game: ƒ.Node;
  let bene: Bene;


  function test(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let img: HTMLImageElement = document.querySelector("img");
    let txtbene: ƒ.TextureImage = new ƒ.TextureImage();
    txtbene.image = img;
    Bene.generateSprites(txtbene);

    ƒ.RenderManager.initialize(true, false);
    game = new ƒ.Node("Game");
    bene = new Bene("Bene");
    game.appendChild(bene);

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translateZ(5);
    cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
    cmpCamera.backgroundColor = ƒ.Color.CSS("aliceblue");

    let viewport: ƒ.Viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", game, cmpCamera, canvas);
    viewport.draw();

    document.addEventListener("keydown", handleKeyboard);
    document.addEventListener("keyup", handleKeyboard);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);

    function update(_event: ƒ.Eventƒ): void {
      processInput();

      viewport.draw();

      crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
      crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
    }
  }

  function handleKeyboard(_event: KeyboardEvent): void {
    keysPressed[_event.code] = (_event.type == "keydown");
  }

  function processInput(): void {
    if (keysPressed[ƒ.KEYBOARD_CODE.A]) {
      bene.act(ACTION.WALK, DIRECTION.LEFT);
      return;
    }
    if (keysPressed[ƒ.KEYBOARD_CODE.D]) {
      bene.act(ACTION.WALK, DIRECTION.RIGHT);
      return;
    }

    bene.act(ACTION.IDLE);
  }
}