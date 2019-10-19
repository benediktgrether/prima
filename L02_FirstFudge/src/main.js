var L02_FirstFudge;
(function (L02_FirstFudge) {
    var ƒ = FudgeCore;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        var canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);
        // New Node for Quad
        var node = new ƒ.Node("Quad");
        var mesh = new ƒ.MeshQuad();
        var cmpMesh = new ƒ.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        var mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.WHITE));
        var cmpMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);
        var cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(2);
        L02_FirstFudge.viewport = new ƒ.Viewport();
        L02_FirstFudge.viewport.initialize("Viewport", node, cmpCamera, canvas);
        ƒ.Debug.log(L02_FirstFudge.viewport);
        L02_FirstFudge.viewport.draw();
    }
})(L02_FirstFudge || (L02_FirstFudge = {}));
