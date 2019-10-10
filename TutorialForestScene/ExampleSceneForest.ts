///<reference types="./core/build/FudgeCore"/>
namespace ExampleSceneForest {
  import ƒ = FudgeCore;
  window.addEventListener("DOMContentLoaded", init);
  
  function init(): void {
    ƒ.RenderManager.initialize();
    Scenes.createViewport();
    Scenes.viewPort.draw();
  }

  function createMiniForest(): void {
    let forest: ƒ.Node = new ƒ.Node("Forest");
    let clrLeaves: ƒ.Color = new ƒ.Color(0.2, 0.6, 0.3, 1);
    let clrNeedles: ƒ.Color = new ƒ.Color(0.1, 0.5, 0.3, 1);
    let clrTrunkTree: ƒ.Color = new ƒ.Color(0.5, 0.3, 0, 1);
    let clrCapMushroomBrown: ƒ.Color = new ƒ.Color(0.6, 0.4, 0, 1);
    let clrCapMushroomRed: ƒ.Color = new ƒ.Color(0.5, 0, 0, 1);
    let clrTrunkMushroom: ƒ.Color = new ƒ.Color(0.9, 0.8, 0.7, 1);
    let clrGround: ƒ.Color = new ƒ.Color(0.3, 0.6, 0.5, 1);

    let ground: ƒ.Node = Scenes.createCompleteMeshNode("Ground", new ƒ.Material("Ground", ƒ.ShaderUniColor, new ƒ.CoatColored(clrGround)), new ƒ.MeshCube());

    let cmpGroundMesh: ƒ.ComponentMesh = ground.getComponent(ƒ.ComponentMesh); cmpGroundMesh.pivot.scale(new ƒ.Vector3(6, 0.05, 6));

    Scenes.node = ground;

    Scenes.camera = Scenes.createCamera();

    //Creates a forest of broadleaves 
    for (let i: number = 1; i <= 5; i++) {
      let plusOrMinus = Math.random() < 0.5 ? -1 : 1;

      let broadleaf: ƒ.Node = createBroadleaf("BroadLeaf" + i,
        clrTrunkTree, clrLeaves, new ƒ.Vector3(Math.random() * 4 * plusOrMinus, 0, Math.random() * 4 * plusOrMinus), new ƒ.Vector3(0.2, 0.5, 0.2));

      forest.appendChild(broadleaf);
    }

    //Creates a forest of conifers 
    for (let i: number = 1; i <= 5; i++) {
      let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      let conifer: ƒ.Node = createConifer("Conifer" + i, clrTrunkTree, clrNeedles, new ƒ.Vector3(Math.random() * 3 * plusOrMinus, 0, Math.random() * 3 * plusOrMinus), new ƒ.Vector3(0.2, 0.5, 0.2));

      forest.appendChild(conifer);
    }
    //Creates mushrooms 
    for (let i: number = 1; i <= 4; i++) {
      let plusOrMinus = Math.random() < 0.5 ? -1 : 1;

      let mushroomRed: ƒ.Node = createMushroom("MushroomRed" + i, clrTrunkMushroom, clrCapMushroomRed, new ƒ.Vector3(Math.random() * 2 * plusOrMinus, 0, Math.random() * 2 * plusOrMinus), new ƒ.Vector3(0.1, 0.2, 0.1));

      let mushroomBrown: ƒ.Node = createMushroom("MushroomBrown" + i, clrTrunkMushroom, clrCapMushroomBrown, new ƒ.Vector3(Math.random() * 2 * plusOrMinus, 0, Math.random() * 2 * plusOrMinus), new ƒ.Vector3(0.1, 0.2, 0.1));

      forest.appendChild(mushroomRed);
      forest.appendChild(mushroomBrown);
    }
    Scenes.node.appendChild(forest);

  }
  function createBroadleaf(_name: string, _clrTrunk: ƒ.Color, _clrTop: ƒ.Color, _meshTrunk: ƒ.Mesh, _meshTop: ƒ.Mesh, _pos: ƒ.Vector3, _scale: ƒ.Vector3): ƒ.Node {

    let tree: ƒ.Node = new ƒ.Node(_name);

    let treeTrunk: ƒ.Node = Scenes.createCompleteMeshNode("TreeTrunk", new ƒ.Material("TrunkTree", ƒ.ShaderUniColor, new ƒ.CoatColored(_clrTrunk)), _meshTrunk);

    let cmpTrunkMesh: ƒ.ComponentMesh = treeTrunk.getComponent(ƒ.ComponentMesh);
    cmpTrunkMesh.pivot.scale(_scale); cmpTrunkMesh.pivot.translateY(_scale.y / 2);

    let treeTop: ƒ.Node = Scenes.createCompleteMeshNode("TreeTop", new ƒ.Material("TreeTop", ƒ.ShaderUniColor, new ƒ.CoatColored(_clrTop)), _meshTop);

    let cmpTreeTopMesh: ƒ.ComponentMesh = treeTop.getComponent(ƒ.ComponentMesh);
    cmpTreeTopMesh.pivot.scale(new ƒ.Vector3((_scale.x * 2), (_scale.y * 3), (_scale.z * 2)));

    cmpTreeTopMesh.pivot.translateY((_scale.y * 2)); tree.appendChild(treeTop); tree.appendChild(treeTrunk);

    tree.addComponent(new ƒ.ComponentTransform);
    tree.cmpTransform.local.translate(_pos);
    return tree;
  }

  function createConifer(_name: string, _clrTrunk: ƒ.Color, _clrTop: ƒ.Color, _meshTrunk: ƒ.Mesh, _meshTop: ƒ.Mesh, _pos: ƒ.Vector3, _scale: ƒ.Vector3): ƒ.Node {

    let tree: ƒ.Node = new ƒ.Node(_name);

    let treeTrunk: ƒ.Node = Scenes.createCompleteMeshNode("TreeTrunk", new ƒ.Material("TrunkTree", ƒ.ShaderUniColor, new ƒ.CoatColored(_clrTrunk)), _meshTrunk);

    let cmpTrunkMesh: ƒ.ComponentMesh = treeTrunk.getComponent(ƒ.ComponentMesh);
    cmpTrunkMesh.pivot.scale(_scale); cmpTrunkMesh.pivot.translateY(_scale.y / 2);

    let treeTop: ƒ.Node = Scenes.createCompleteMeshNode("TreeTop", new ƒ.Material("TreeTop", ƒ.ShaderUniColor, new ƒ.CoatColored(_clrTop)), _meshTop);

    let cmpTreeTopMesh: ƒ.ComponentMesh = treeTop.getComponent(ƒ.ComponentMesh);

    cmpTreeTopMesh.pivot.scale(new ƒ.Vector3((_scale.x * 2), (_scale.y * 3), (_scale.z * 2)));

    cmpTreeTopMesh.pivot.translateY((_scale.y / 2)); tree.appendChild(treeTop); tree.appendChild(treeTrunk);

    tree.addComponent(new ƒ.ComponentTransform);
    tree.cmpTransform.local.translate(_pos);

    return tree;
  }

  function createMushroom(_name: string, _clrTrunk: ƒ.Color, _clrCap: ƒ.Color, _meshTrunk: ƒ.Mesh, _meshTop: ƒ.Mesh, _pos: ƒ.Vector3, _scale: ƒ.Vector3): ƒ.Node {

    let mushroom: ƒ.Node = new ƒ.Node(_name);
    let mushroomTrunk: ƒ.Node = Scenes.createCompleteMeshNode("MushroomTrunk", new ƒ.Material("MushroomTrunk", ƒ.ShaderUniColor, new ƒ.CoatColored(_clrTrunk)), _meshTrunk);

    let cmpMesh: ƒ.ComponentMesh = mushroomTrunk.getComponent(ƒ.ComponentMesh);

    cmpMesh.pivot.scale(_scale); cmpMesh.pivot.translateY(_scale.y / 2);

    let mushroomCap: ƒ.Node = Scenes.createCompleteMeshNode("MushroomCapRed", new ƒ.Material("MushroomCapRed", ƒ.ShaderUniColor, new ƒ.CoatColored(_clrCap)), _meshTop);

    let cmpCapMesh: ƒ.ComponentMesh = mushroomCap.getComponent(ƒ.ComponentMesh);

    cmpCapMesh.pivot.scale(new ƒ.Vector3((_scale.x * 2), (_scale.y - 0.05), (_scale.z * 2)));

    cmpCapMesh.pivot.translateY((_scale.y));

    mushroom.appendChild(mushroomCap);
    mushroom.appendChild(mushroomTrunk);

    mushroom.addComponent(new ƒ.ComponentTransform);
    mushroom.cmpTransform.local.translate(_pos);

    return mushroom;
  }
}
