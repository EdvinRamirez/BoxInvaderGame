import Scene from "../engine/Scene.js"
import Constants from "./Constants.js"
import GameOverGameObject from "./GameOverGameObject.js";

class GameOverScene extends Scene
{
    constructor()
    {
        super("Game Over");
    }
    start()
    {
        this.gameObjects.push(new GameOverGameObject(Constants.Width/2 - 250, 0))
    }
}

export default GameOverScene