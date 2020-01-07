"use strict";
///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
var L20_Platformer;
///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
(function (L20_Platformer) {
    L20_Platformer.ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        L20_Platformer.ƒ.RenderManager.initialize(true);
        L20_Platformer.ƒ.Debug.log("Canvas", canvas);
    }
})(L20_Platformer || (L20_Platformer = {}));
//# sourceMappingURL=Main.js.map