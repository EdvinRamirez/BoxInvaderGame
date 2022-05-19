import Scene from "../engine/Scene.js"
import Constants from "./Constants.js";
import PlayerGameObject from "./PlayerGameObject.js"
import BossGameObject from "./BossGameObject.js";
import PrefabEmpty from "../engine/prefabs/PrefabEmpty.js";
import ControllorBoss from "./ControllorBoss.js"
import BlockGameObject from "./BlockGameObject.js";
import PrefabTextSmall from "../engine/prefabs/PrefabTextSmall.js";
import ScoreGameObject from "./ScoreGameObject.js";

class BossScene extends Scene 
{
    constructor()
    {
        super("Boss Level")
    }

    start()
    {
        let PlayerX = (Constants.Width - 120) / 2;
        let PlayerY = (Constants.Height - 25 - 30);

        this.gameObjects.push(new PlayerGameObject(PlayerX,PlayerY,75,25));

        this.gameObjects.push(new BossGameObject(Constants.Width/2 - 100, 35, 100, 100));

        this.gameObjects.push(new PrefabEmpty("BossControllor").addComponent(new ControllorBoss()));

        this.gameObjects.push(new PrefabTextSmall("Health Text", Constants.Width - 200, 25, "Health"));

        this.gameObjects.push(new ScoreGameObject(10,25));

        for(let i = 125; i < Constants.Width - Constants.Width/8; i+= 300)
        {
            this.gameObjects.push(new BlockGameObject( i, Constants.Height/1.25, 100, 30));
        }

    }
}

export default BossScene