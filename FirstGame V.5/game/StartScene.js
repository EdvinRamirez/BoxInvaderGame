import Scene from "../engine/Scene.js"
import Constants from "./Constants.js"
import StartGameObject from "./StartGameObject.js";
import StartUpdateComponent from "./StartUpdateComponent.js";
import PrefabTextLarge from "../engine/prefabs/PrefabTextLarge.js"

class StartScene extends Scene {
  constructor() {
    super("First Level");
  }
  start(){
    this.gameObjects.push(new StartGameObject(Constants.Width/2 - 400,Constants.Height/2));

    this.gameObjects.push(new PrefabTextLarge("Game Title", Constants.Width/2 - 260, Constants.Height/5, "Box Invader",));

   //this.gameObjects.push(new Rectangle)
  }
}

export default StartScene;