///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
var L10_FudgeCraft;
(function (L10_FudgeCraft) {
    var ƒ = FudgeCore;
    window.addEventListener("load", handleLoad);
    // What do the viewport?
    var viewport;
    var fudgeCraft = new ƒ.Node("FudgeCraft");
    var canvas;
    //#region T-Fragment
    var tFragment = new ƒ.Node("tFragment");
    var tFragmentBottom = new ƒ.Node("tFragmentBottom");
    var tFragmentTop = new ƒ.Node("tFragmentTop");
    var tFragmentLeft = new ƒ.Node("tFragmentLeft");
    var tFragmentRight = new ƒ.Node("tFragmentRight");
    //#endregion
    //#region L-Fragment
    var lFragment = new ƒ.Node("lFragment");
    var lFragmentTop = new ƒ.Node("lFragmentTop");
    var lFragmentMiddle = new ƒ.Node("lFragmentMiddle");
    var lFragmentBottom = new ƒ.Node("lFragmentBottom");
    var lFragmentBottomRight = new ƒ.Node("lGragmentBottomRight");
    //#endregion
    //#region Z-Fragment
    var zFragment = new ƒ.Node("zFragment");
    var zFragmentTopLeft = new ƒ.Node("zFragmentTopLeft");
    var zFragmentTop = new ƒ.Node("zFragmentTop");
    var zFragmentMiddle = new ƒ.Node("zFragmentMiddle");
    var zFragmentBottom = new ƒ.Node("zFragmentBottom");
    var zFragmentBottomRight = new ƒ.Node("zFragmentBottomRight");
    //#endregion
    function handleLoad(_event) {
        canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);
        var pong = createFudgeCraft();
        var cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(50);
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        ƒ.Debug.log(viewport);
        viewport.draw();
        // FUDGE Core Game Loop and Starting the Loop
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start();
    }
    function update(_event) {
        // ƒ.Debug.log(keysPressed);
        ƒ.RenderManager.update();
        viewport.draw();
    }
    function createFudgeCraft() {
        var meshCube = new ƒ.MeshCube();
        var mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
        fudgeCraft.appendChild(createNode("WallLeft", meshCube, mtrSolidWhite, new ƒ.Vector2(-22, 0), new ƒ.Vector2(1, 30)));
        fudgeCraft.appendChild(createNode("WallRight", meshCube, mtrSolidWhite, new ƒ.Vector2(22, 0), new ƒ.Vector2(1, 30)));
        fudgeCraft.appendChild(createNode("WallTop", meshCube, mtrSolidWhite, new ƒ.Vector2(0, 15), new ƒ.Vector2(45, 1)));
        fudgeCraft.appendChild(createNode("WallBottom", meshCube, mtrSolidWhite, new ƒ.Vector2(0, -15), new ƒ.Vector2(45, 1)));
        fudgeCraft.appendChild(tFragment);
        createTFragment(meshCube, mtrSolidWhite, tFragment);
        fudgeCraft.appendChild(lFragment);
        createLFragment(meshCube, mtrSolidWhite, lFragment);
        fudgeCraft.appendChild(zFragment);
        createZFragment(meshCube, mtrSolidWhite, lFragment);
        return fudgeCraft;
    }
    function createTFragment(meshCube, mtrSolidWhite, tFragment) {
        tFragmentBottom = createNode("TFragmentBottom", meshCube, mtrSolidWhite, new ƒ.Vector2(1, 1), new ƒ.Vector2(1, 1));
        tFragmentTop = createNode("TFragmentTop", meshCube, mtrSolidWhite, new ƒ.Vector2(1, 2), new ƒ.Vector2(1, 1));
        tFragmentLeft = createNode("TFragmentLeft", meshCube, mtrSolidWhite, new ƒ.Vector2(0, 2), new ƒ.Vector2(1, 1));
        tFragmentRight = createNode("TFragmentRight", meshCube, mtrSolidWhite, new ƒ.Vector2(2, 2), new ƒ.Vector2(1, 1));
        tFragment.appendChild(tFragmentBottom);
        tFragment.appendChild(tFragmentTop);
        tFragment.appendChild(tFragmentLeft);
        tFragment.appendChild(tFragmentRight);
    }
    function createLFragment(meshCube, mtrSolidWhite, lFragment) {
        lFragmentTop = createNode("lFragmentTop", meshCube, mtrSolidWhite, new ƒ.Vector2(10, 0), new ƒ.Vector2(1, 1));
        lFragmentMiddle = createNode("lFragmentMiddle", meshCube, mtrSolidWhite, new ƒ.Vector2(10, -1), new ƒ.Vector2(1, 1));
        lFragmentBottom = createNode("lFragmentBottom", meshCube, mtrSolidWhite, new ƒ.Vector2(10, -2), new ƒ.Vector2(1, 1));
        lFragmentBottomRight = createNode("lFragmentBottomRight", meshCube, mtrSolidWhite, new ƒ.Vector2(11, -2), new ƒ.Vector2(1, 1));
        lFragment.appendChild(lFragmentTop);
        lFragment.appendChild(lFragmentMiddle);
        lFragment.appendChild(lFragmentBottom);
        lFragment.appendChild(lFragmentBottomRight);
    }
    function createZFragment(meshCube, mtrSolidWhite, zFragment) {
        zFragmentTopLeft = createNode("zFragmentTopLeft", meshCube, mtrSolidWhite, new ƒ.Vector2(-11, 1), new ƒ.Vector2(1, 1));
        zFragmentTop = createNode("zFragmentTop", meshCube, mtrSolidWhite, new ƒ.Vector2(-10, 1), new ƒ.Vector2(1, 1));
        zFragmentMiddle = createNode("zFragmentMiddle", meshCube, mtrSolidWhite, new ƒ.Vector2(-10, 0), new ƒ.Vector2(1, 1));
        zFragmentBottom = createNode("zFragmentBottom", meshCube, mtrSolidWhite, new ƒ.Vector2(-10, -1), new ƒ.Vector2(1, 1));
        zFragmentBottomRight = createNode("zFragmentBottomRight", meshCube, mtrSolidWhite, new ƒ.Vector2(-9, -1), new ƒ.Vector2(1, 1));
        zFragment.appendChild(zFragmentTopLeft);
        zFragment.appendChild(zFragmentTop);
        zFragment.appendChild(zFragmentMiddle);
        zFragment.appendChild(zFragmentBottom);
        zFragment.appendChild(zFragmentBottomRight);
    }
    function createNode(_name, _mesh, _material, _translation, _scaling) {
        var node = new ƒ.Node(_name);
        node.addComponent(new ƒ.ComponentTransform);
        node.addComponent(new ƒ.ComponentMaterial(_material));
        node.addComponent(new ƒ.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation.toVector3());
        node.getComponent(ƒ.ComponentMesh).pivot.scale(_scaling.toVector3());
        return node;
    }
})(L10_FudgeCraft || (L10_FudgeCraft = {}));
