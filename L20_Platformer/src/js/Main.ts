///<reference types="../../../Fudge/FudgeCore.js"/> //Path to FudgeCore
namespace L20_Platformer {
  export import ƒ = FudgeCore;

  window.addEventListener("load", hndLoad);

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    ƒ.RenderManager.initialize(true);
    ƒ.Debug.log("Canvas", canvas);
  }
}