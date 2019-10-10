///<reference types="./core/build/FudgeCore"/>
var ExampleSceneForest;
(function (ExampleSceneForest) {
    var ƒ = FudgeCore;
    window.addEventListener("DOMContentLoaded", init);
    function init() {
        ƒ.RenderManager.initialize();
        Scenes.createViewport();
        Scenes.viewPort.draw();
    }
    function createMiniForest() {
        var forest = new ƒ.Node("Forest");
        var clrLeaves = new ƒ.Color(0.2, 0.6, 0.3, 1);
        var clrNeedles = new ƒ.Color(0.1, 0.5, 0.3, 1);
        var clrTrunkTree = new ƒ.Color(0.5, 0.3, 0, 1);
        var clrCapMushroomBrown = new ƒ.Color(0.6, 0.4, 0, 1);
        var clrCapMushroomRed = new ƒ.Color(0.5, 0, 0, 1);
        var clrTrunkMushroom = new ƒ.Color(0.9, 0.8, 0.7, 1);
        var clrGround = new ƒ.Color(0.3, 0.6, 0.5, 1);
        var ground = Scenes.createCompleteMeshNode("Ground", new ƒ.Material("Ground", ƒ.ShaderUniColor, new ƒ.CoatColored(clrGround)), new ƒ.MeshCube());
        var cmpGroundMesh = ground.getComponent(ƒ.ComponentMesh);
        cmpGroundMesh.pivot.scale(new ƒ.Vector3(6, 0.05, 6));
        Scenes.node = ground;
        Scenes.camera = Scenes.createCamera();
        //Creates a forest of broadleaves 
        for (var i = 1; i <= 5; i++) {
            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            var broadleaf = createBroadleaf("BroadLeaf" + i, clrTrunkTree, clrLeaves, new ƒ.Vector3(Math.random() * 4 * plusOrMinus, 0, Math.random() * 4 * plusOrMinus), new ƒ.Vector3(0.2, 0.5, 0.2));
            forest.appendChild(broadleaf);
        }
        //Creates a forest of conifers 
        for (var i = 1; i <= 5; i++) {
            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            var conifer = createConifer("Conifer" + i, clrTrunkTree, clrNeedles, new ƒ.Vector3(Math.random() * 3 * plusOrMinus, 0, Math.random() * 3 * plusOrMinus), new ƒ.Vector3(0.2, 0.5, 0.2));
            forest.appendChild(conifer);
        }
        //Creates mushrooms 
        for (var i = 1; i <= 4; i++) {
            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            var mushroomRed = createMushroom("MushroomRed" + i, clrTrunkMushroom, clrCapMushroomRed, new ƒ.Vector3(Math.random() * 2 * plusOrMinus, 0, Math.random() * 2 * plusOrMinus), new ƒ.Vector3(0.1, 0.2, 0.1));
            var mushroomBrown = createMushroom("MushroomBrown" + i, clrTrunkMushroom, clrCapMushroomBrown, new ƒ.Vector3(Math.random() * 2 * plusOrMinus, 0, Math.random() * 2 * plusOrMinus), new ƒ.Vector3(0.1, 0.2, 0.1));
            forest.appendChild(mushroomRed);
            forest.appendChild(mushroomBrown);
        }
        Scenes.node.appendChild(forest);
    }
    function createBroadleaf(_name, _clrTrunk, _clrTop, _meshTrunk, _meshTop, _pos, _scale) {
        var tree = new ƒ.Node(_name);
        var treeTrunk = Scenes.createCompleteMeshNode("TreeTrunk", new ƒ.Material("TrunkTree", ƒ.ShaderUniColor, new ƒ.CoatColored(_clrTrunk)), _meshTrunk);
        var cmpTrunkMesh = treeTrunk.getComponent(ƒ.ComponentMesh);
        cmpTrunkMesh.pivot.scale(_scale);
        cmpTrunkMesh.pivot.translateY(_scale.y / 2);
        var treeTop = Scenes.createCompleteMeshNode("TreeTop", new ƒ.Material("TreeTop", ƒ.ShaderUniColor, new ƒ.CoatColored(_clrTop)), _meshTop);
        var cmpTreeTopMesh = treeTop.getComponent(ƒ.ComponentMesh);
        cmpTreeTopMesh.pivot.scale(new ƒ.Vector3((_scale.x * 2), (_scale.y * 3), (_scale.z * 2)));
        cmpTreeTopMesh.pivot.translateY((_scale.y * 2));
        tree.appendChild(treeTop);
        tree.appendChild(treeTrunk);
        tree.addComponent(new ƒ.ComponentTransform);
        tree.cmpTransform.local.translate(_pos);
        return tree;
    }
    function createConifer(_name, _clrTrunk, _clrTop, _meshTrunk, _meshTop, _pos, _scale) {
        var tree = new ƒ.Node(_name);
        var treeTrunk = Scenes.createCompleteMeshNode("TreeTrunk", new ƒ.Material("TrunkTree", ƒ.ShaderUniColor, new ƒ.CoatColored(_clrTrunk)), _meshTrunk);
        var cmpTrunkMesh = treeTrunk.getComponent(ƒ.ComponentMesh);
        cmpTrunkMesh.pivot.scale(_scale);
        cmpTrunkMesh.pivot.translateY(_scale.y / 2);
        var treeTop = Scenes.createCompleteMeshNode("TreeTop", new ƒ.Material("TreeTop", ƒ.ShaderUniColor, new ƒ.CoatColored(_clrTop)), _meshTop);
        var cmpTreeTopMesh = treeTop.getComponent(ƒ.ComponentMesh);
        cmpTreeTopMesh.pivot.scale(new ƒ.Vector3((_scale.x * 2), (_scale.y * 3), (_scale.z * 2)));
        cmpTreeTopMesh.pivot.translateY((_scale.y / 2));
        tree.appendChild(treeTop);
        tree.appendChild(treeTrunk);
        tree.addComponent(new ƒ.ComponentTransform);
        tree.cmpTransform.local.translate(_pos);
        return tree;
    }
    function createMushroom(_name, _clrTrunk, _clrCap, _meshTrunk, _meshTop, _pos, _scale) {
        var mushroom = new ƒ.Node(_name);
        var mushroomTrunk = Scenes.createCompleteMeshNode("MushroomTrunk", new ƒ.Material("MushroomTrunk", ƒ.ShaderUniColor, new ƒ.CoatColored(_clrTrunk)), _meshTrunk);
        var cmpMesh = mushroomTrunk.getComponent(ƒ.ComponentMesh);
        cmpMesh.pivot.scale(_scale);
        cmpMesh.pivot.translateY(_scale.y / 2);
        var mushroomCap = Scenes.createCompleteMeshNode("MushroomCapRed", new ƒ.Material("MushroomCapRed", ƒ.ShaderUniColor, new ƒ.CoatColored(_clrCap)), _meshTop);
        var cmpCapMesh = mushroomCap.getComponent(ƒ.ComponentMesh);
        cmpCapMesh.pivot.scale(new ƒ.Vector3((_scale.x * 2), (_scale.y - 0.05), (_scale.z * 2)));
        cmpCapMesh.pivot.translateY((_scale.y));
        mushroom.appendChild(mushroomCap);
        mushroom.appendChild(mushroomTrunk);
        mushroom.addComponent(new ƒ.ComponentTransform);
        mushroom.cmpTransform.local.translate(_pos);
        return mushroom;
    }
})(ExampleSceneForest || (ExampleSceneForest = {}));
