import Game from "../engine/Game.js";
import Component from "../engine/Component.js";
import Time from "../engine/Time.js";
import PrefabTextLarge from "../engine/prefabs/PrefabTextLarge.js";
import Constants from "./Constants.js";



class ControllorBoss extends Component {
    constructor(parent)
    {
        super(parent);
        this.firstiteration = false;
        this.iterations = 0.7
        this.timepassBomb = 0;
        this.timepassedoverall = 0;
        this.spawntext = false;
        this.textdelete = false;

        this.change = false;
        this.timechange = 0;
    }

    update()
    {
        this.timepassedoverall += Time.secondsBetweenFrame;
        if (this.timepassedoverall > 2 && !this.textdelete)
        {
            let temp = Game.findByNameOne("BossLevelText");
            let tempdelete = temp.getComponent("Text");
            tempdelete.parent.markForDelete = true;
            this.textdelete = true;
        }
        else if(!this.spawntext)
        {
            let FirstlevelText = new PrefabTextLarge("BossLevelText", Constants.Width/2 - 250, Constants.Height/2, "Boss Level");
            Game.scene().gameObjects.push(FirstlevelText);
            this.spawntext = true;
        }

        let boss = Game.findByTypeOne("BossGameObject");
        if(boss == null)
        {
            this.timechange += Time.secondsBetweenFrame;
        }

        if (this.timechange > 2)
        {
            Game.changeScene(4);
        }
    }

}

export default ControllorBoss