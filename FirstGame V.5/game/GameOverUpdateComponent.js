import Component from "../engine/Component.js"
import Game from "../engine/Game.js";
import Time from "../engine/Time.js"
import Input from "../engine/Input.js"
import Constants from "./Constants.js";
import PrefabTextSmall from "../engine/prefabs/PrefabTextSmall.js";
import ScoreGameObject from "./ScoreGameObject.js";
import PrefabTextLarge from "../engine/prefabs/PrefabTextLarge.js";

class GameOverUpdateComponent extends Component
{
    constructor(parent) {
        super(parent);
        this.VelY = 100;
        this.RestartText = false
      }
      update() {

        let text = this.parent.getComponent("Text");

        if (text.y < Constants.Height/2)
        {
          text.y += this.VelY * Time.secondsBetweenFrame;
        }
        else if(!this.RestartText)
        {
          let newText = new PrefabTextSmall("RestartGame", Constants.Width/2 - 260, Constants.Height/2 + 100, "Press Spacebar to Restart");
          newText.getComponent("Text").font = "50px ariel";
          Game.scene().gameObjects.push(newText);
          this.RestartText = true;
        }
        else if(this.RestartText)
        {
          text.text = "";
          let score = new PrefabTextLarge("EndScore", Constants.Width/2 - 400, Constants.Height/2, "Your Score is: " + Game.persistent.score);
          Game.scene().gameObjects.push(score);
          if(Input.getKey(" ")){
            Game.changeScene(1)
          }
        }
      }
}

export default GameOverUpdateComponent