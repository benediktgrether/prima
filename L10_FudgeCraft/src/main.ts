///<reference types="./../../Fudge/FudgeCore.js"/> //Path to FudgeCore
namespace L10_FudgeCraft {


    import ƒ = FudgeCore;

    window.addEventListener("load", handleLoad);

    // What do the viewport?
    let viewport: ƒ.Viewport;

    let fudgeCraft: ƒ.Node = new ƒ.Node("FudgeCraft");

    let canvas: HTMLCanvasElement;

    //#region T-Fragment
    let tFragment: ƒ.Node = new ƒ.Node("tFragment");
    let tFragmentBottom: ƒ.Node = new ƒ.Node("tFragmentBottom");
    let tFragmentTop: ƒ.Node = new ƒ.Node("tFragmentTop");
    let tFragmentLeft: ƒ.Node = new ƒ.Node("tFragmentLeft");
    let tFragmentRight: ƒ.Node = new ƒ.Node("tFragmentRight");
    //#endregion

    //#region L-Fragment
    let lFragment: ƒ.Node = new ƒ.Node("lFragment");
    let lFragmentTop: ƒ.Node = new ƒ.Node("lFragmentTop");
    let lFragmentMiddle: ƒ.Node = new ƒ.Node("lFragmentMiddle");
    let lFragmentBottom: ƒ.Node = new ƒ.Node("lFragmentBottom");
    let lFragmentBottomRight: ƒ.Node = new ƒ.Node("lGragmentBottomRight");
    //#endregion

    //#region Z-Fragment
    let zFragment: ƒ.Node = new ƒ.Node("zFragment");
    let zFragmentTopLeft: ƒ.Node = new ƒ.Node("zFragmentTopLeft");
    let zFragmentTop: ƒ.Node = new ƒ.Node("zFragmentTop");
    let zFragmentMiddle: ƒ.Node = new ƒ.Node("zFragmentMiddle");
    let zFragmentBottom: ƒ.Node = new ƒ.Node("zFragmentBottom");
    let zFragmentBottomRight: ƒ.Node = new ƒ.Node("zFragmentBottomRight");

    //#endregion

    function handleLoad(_event: Event): void {
        
        canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);



        let pong: ƒ.Node = createFudgeCraft();


        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(50);

        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        ƒ.Debug.log(viewport);


        viewport.draw();

        // FUDGE Core Game Loop and Starting the Loop
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        ƒ.Loop.start();
    }

    function update(_event: Event): void {
        // ƒ.Debug.log(keysPressed);
        ƒ.RenderManager.update();
        viewport.draw();

    }

    function createFudgeCraft(): ƒ.Node {

        let meshCube: ƒ.MeshCube = new ƒ.MeshCube();
        let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));

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


    function createTFragment(meshCube: ƒ.MeshCube, mtrSolidWhite: ƒ.Material, tFragment: ƒ.Node): void {
        tFragmentBottom = createNode("TFragmentBottom", meshCube, mtrSolidWhite, new ƒ.Vector2(1, 1), new ƒ.Vector2(1, 1));
        tFragmentTop = createNode("TFragmentTop", meshCube, mtrSolidWhite, new ƒ.Vector2(1, 2), new ƒ.Vector2(1, 1));
        tFragmentLeft = createNode("TFragmentLeft", meshCube, mtrSolidWhite, new ƒ.Vector2(0, 2), new ƒ.Vector2(1, 1));
        tFragmentRight = createNode("TFragmentRight", meshCube, mtrSolidWhite, new ƒ.Vector2(2, 2), new ƒ.Vector2(1, 1));
        
        tFragment.appendChild(tFragmentBottom);
        tFragment.appendChild(tFragmentTop);
        tFragment.appendChild(tFragmentLeft);
        tFragment.appendChild(tFragmentRight);
    }

    function createLFragment(meshCube: ƒ.MeshCube, mtrSolidWhite: ƒ.Material, lFragment: ƒ.Node): void {
        lFragmentTop = createNode("lFragmentTop", meshCube, mtrSolidWhite, new ƒ.Vector2(10, 0), new ƒ.Vector2(1, 1));
        lFragmentMiddle = createNode("lFragmentMiddle", meshCube, mtrSolidWhite, new ƒ.Vector2(10, -1), new ƒ.Vector2(1, 1));
        lFragmentBottom = createNode("lFragmentBottom", meshCube, mtrSolidWhite, new ƒ.Vector2(10, -2), new ƒ.Vector2(1, 1));
        lFragmentBottomRight = createNode("lFragmentBottomRight", meshCube, mtrSolidWhite, new ƒ.Vector2(11, -2), new ƒ.Vector2(1, 1));

        lFragment.appendChild(lFragmentTop);
        lFragment.appendChild(lFragmentMiddle);
        lFragment.appendChild(lFragmentBottom);
        lFragment.appendChild(lFragmentBottomRight);
    }

    function createZFragment(meshCube: ƒ.MeshCube, mtrSolidWhite: ƒ.Material, zFragment: ƒ.Node): void {
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

    function createNode(_name: string, _mesh: ƒ.Mesh, _material: ƒ.Material, _translation: ƒ.Vector2, _scaling: ƒ.Vector2): ƒ.Node {

        let node: ƒ.Node = new ƒ.Node(_name);
        node.addComponent(new ƒ.ComponentTransform);
        node.addComponent(new ƒ.ComponentMaterial(_material));
        node.addComponent(new ƒ.ComponentMesh(_mesh));
        node.cmpTransform.local.translate(_translation.toVector3());
        node.getComponent(ƒ.ComponentMesh).pivot.scale(_scaling.toVector3());

        return node;
    }

}