import Game from "../engine/Game.js";
import Component from "../engine/Component.js";
import Time from "../engine/Time.js";
import PrefabTextLarge from "../engine/prefabs/PrefabTextLarge.js";
import Constants from "./Constants.js";



class ControllorFirstLevel extends Component {
    constructor(parent)
    {
        super(parent);
        this.firstiteration = false;
        this.iterations = 0.7
        this.timepassBomb = 0;
        this.timepassedoverall = 0;
        this.spawntext = false;
        this.textdelete = false;
        this.clearleveltime = 0;
    }

    update()
    {
        this.timepassedoverall += Time.secondsBetweenFrame;
        if (this.timepassedoverall > 2 && !this.textdelete)
        {
            let temp = Game.findByNameOne("FirstLevelText");
            let tempdelete = temp.getComponent("Text");
            tempdelete.parent.markForDelete = true;
            this.textdelete = true;
        }
        else if(!this.spawntext)
        {
            let FirstlevelText = new PrefabTextLarge("FirstLevelText", Constants.Width/2 - 250, Constants.Height/2, "First Level");
            Game.scene().gameObjects.push(FirstlevelText);
            this.spawntext = true;
        }

        this.timepassBomb += Time.secondsBetweenFrame;
        let allenemies = Game.findByType("EnemyGameObject");

        if (allenemies.length == 0)
        {
            this.clearleveltime += Time.secondsBetweenFrame
            if (this.clearleveltime > 1.5)
            {
                Game.changeScene(2);
            }
        }

        if (this.firstiteration)
        {
            if(allenemies.length / this.totalenemies  < this.iterations )
            {
                for (let enemy of allenemies)
                {
                    let temp = enemy.getComponent("EnemyUpdateComponent");
                    temp.velX += temp.velX * 1.5;
                    this.iterations -= 0.15;
                }
            }
        }
        /**else if(allenemies.length <= 3)
        {
            for (let enemy of allenemies)
            {
                let temp = enemy.getComponent("EnemyUpdateComponent");
                if (allenemies.length == 3 && !this.lastthreeenemies)
                {
                    this.lastthreeenemies = true;
                    temp.velX = temp.velX * 4;
                }
                else if(allenemies.length == 2 && !this.lasttwoenemies)
                {
                    this.lasttwoenemies = true;
                    temp.velX = temp.velX * 8;
                }
                else if(allenemies.length == 1 && !this.lastenemy)
                {
                    this.lastenemy = true
                    temp.velX = temp.velX * 16;
                }
            }
        }*/
        else 
        {   
            this.totalenemies = allenemies.length;
            this.firstiteration = true;
        }
    }
}

export default ControllorFirstLevel