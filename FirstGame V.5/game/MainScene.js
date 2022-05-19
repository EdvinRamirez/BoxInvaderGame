import Scene from "../engine/Scene.js"
import Constants from "./Constants.js";
import EnemyGameObject from "./EnemyGameObject.js"
import PlayerGameObject from "./PlayerGameObject.js"
import BlockGameObject from "./BlockGameObject.js";
import ScoreGameObject from "./ScoreGameObject.js";
import PrefabEmpty from "../engine/prefabs/PrefabEmpty.js";
import ControllorFirstLevel from "./ControllorFirstLevel.js"
import PrefabTextSmall from "../engine/prefabs/PrefabTextSmall.js";
import RectangleDraw from "../engine/components/RectangleDraw.js";

class MainScene extends Scene
{
    constructor()
    {
        super("First Level");
    }

    start()
    {
        

        let PlayerX = (Constants.Width - 120) / 2;
        let PlayerY = (Constants.Height - 25 - 30);

        this.gameObjects.push(new PlayerGameObject(PlayerX,PlayerY,75,25));

        let mainy = 25;
        let mainx = 200;
        //let count = 1;

        //for (let y = -150; y < 0; i += 50)
        //{
            for(let x = 50; x < Constants.Width - 130; x += 285)
            {
                this.gameObjects.push(new EnemyGameObject(x, 55, 50, 50, 25, 10))
            }
            for(let x = 140; x < Constants.Width - 130; x += 285)
            {
                this.gameObjects.push(new EnemyGameObject(x, 110, 50, 50, 25, 10))
            }
            for(let x = 230; x < Constants.Width - 130; x += 285)
            {
                this.gameObjects.push(new EnemyGameObject(x, 55, 50, 50, 25, 10))
            }
        //}

        for(let i = 125; i < Constants.Width - Constants.Width/8; i+= 300)
        {
            this.gameObjects.push(new BlockGameObject( i, Constants.Height/1.25, 100, 30));
        }

        this.gameObjects.push(new ScoreGameObject(10,25));

        this.gameObjects.push(new PrefabEmpty("ControllorGameObject").addComponent(new ControllorFirstLevel()));
        this.gameObjects.push(new PrefabTextSmall("Health Text", Constants.Width - 200, 25, "Health"));


        

        /** 
        for (let y = mainy; y < Constants.Height / 5; y += 60)
        {
            for (let x = mainx; x < Constants.Width - 50; x += shift)
            {
                this.gameObjects.push(new EnemyGameObject(x, y, 50, 50));
            }
            mainx += 50;
        }
        */

    }

}

export default MainScene