// / <reference path="../L20_ScrollerFoundation/SpriteGenerator.js"/>
namespace L21_ScrollerControl {
  import ƒ = FudgeCore;

  export enum ACTION {
    IDLE = "Idle",
    WALK = "Walk"
  }
  export enum DIRECTION {
    LEFT, RIGHT
  }

  export class Bene extends ƒ.Node {
    private static sprites: Sprite[];
    private static speedMax: number = 1.5; // units per second
    // private action: ACTION;
    // private time: ƒ.Time = new ƒ.Time();
    public speed: number = 0;

    constructor(_name: string = "Bene") {
      super(_name);
      this.addComponent(new ƒ.ComponentTransform());

      for (let sprite of Bene.sprites) {
        let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
        nodeSprite.activate(false);

        nodeSprite.addEventListener(
          "showNext",
          (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
          true
        );

        this.appendChild(nodeSprite);
      }

      this.show(ACTION.IDLE);
      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
    }

    public static generateSprites(_txtImage: ƒ.TextureImage): void {
      Bene.sprites = [];
      let sprite: Sprite = new Sprite(ACTION.WALK);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(1, 279, 30.8, 51), 4, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
      Bene.sprites.push(sprite);

      sprite = new Sprite(ACTION.IDLE);
      sprite.generateByGrid(_txtImage, ƒ.Rectangle.GET(1, 279, 30.8, 51), 1, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
      Bene.sprites.push(sprite);
    }

    public show(_action: ACTION): void {
      for (let child of this.getChildren())
        child.activate(child.name == _action);
      // this.action = _action;
    }

    public act(_action: ACTION, _direction?: DIRECTION): void {
      switch (_action) {
        case ACTION.IDLE:
          this.speed = 0;
          break;
        case ACTION.WALK:
          let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
          this.speed = Bene.speedMax * direction;
          this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * direction);
          // console.log(direction);
          break;
      }
      this.show(_action);
    }

    private update = (_event: ƒ.Eventƒ): void => {
      let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
      this.cmpTransform.local.translateX(this.speed * timeFrame);
      this.broadcastEvent(new CustomEvent("showNext"));
    }
  }
}