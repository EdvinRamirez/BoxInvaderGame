import Game from "../engine/Game.js";
import Component from "../engine/Component.js";
import Time from "../engine/Time.js";
import PrefabTextLarge from "../engine/prefabs/PrefabTextLarge.js";
import Constants from "./Constants.js";
import EnemyBulletGameObject from "./EnemyBulletGameObject.js";
import EnemyGameObject from "./EnemyGameObject.js";



class ControllorSecondLevel extends Component {
    constructor(parent)
    {
        super(parent);
        this.firstiteration = false;
        this.iterations = 0.7
        this.timepassBomb = 0;
        this.timepassedoverall = 0;
        this.spawntext = false;
        this.textdelete = false;
        this.timepassenemy = 0;
        this.enemyrounds = 0;
        this.clearleveltime = 0;
    }

    update()
    {
        this.timepassedoverall += Time.secondsBetweenFrame;
        this.timepassenemy += Time.secondsBetweenFrame;

        let allenemies = Game.findByType("EnemyGameObject");

        if (allenemies.length == 0)
        {
            this.clearleveltime += Time.secondsBetweenFrame
            if (this.clearleveltime > 1.5)
            {
                Game.changeScene(3);
            }
        }
        
        if(this.timepassenemy > 15 && this.enemyrounds < 3)
        {
            for (let enemy of allenemies)
            {
                enemy.getComponent("EnemyUpdateComponent").velX = 35
            }
            for (let x = 50; x < Constants.Width - 120; x += 250)
            {
                let newEnemy = new EnemyGameObject(x, 55, 50, 50 , 25, 15);
                Game.scene().gameObjects.push(newEnemy);
            }
            this.timepassenemy = 0;
            this.enemyrounds++;
        }



        if (this.timepassedoverall > 2 && !this.textdelete)
        {
            let temp = Game.findByNameOne("SecondLevelText");
            let tempdelete = temp.getComponent("Text");
            tempdelete.parent.markForDelete = true;
            this.textdelete = true;
        }
        else if(!this.spawntext)
        {
            let FirstlevelText = new PrefabTextLarge("SecondLevelText", Constants.Width/2 - 250, Constants.Height/2, "Second Level");
            Game.scene().gameObjects.push(FirstlevelText);
            this.spawntext = true;
        }


        if (this.firstiteration)
        {
            if(allenemies.length / this.totalenemies  < this.iterations )
            {
                for (let enemy of allenemies)
                {
                    let temp = enemy.getComponent("EnemyUpdateComponent");
                    temp.velX += temp.velX * 2;
                    this.iterations -= 0.2;
                }
            }
        }
        else 
        {   
            this.totalenemies = allenemies.length;
            this.firstiteration = true;
        }

    }
}

export default ControllorSecondLevel