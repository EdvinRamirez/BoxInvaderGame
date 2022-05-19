import Component from "../engine/Component.js"
import Game from "../engine/Game.js";

class ScoreUpdateComponent extends Component {
  constructor(parent) {
    super(parent);
    this.score = 0;
  }
  update() {

    let text = this.parent.getComponent("Text");
    let tempscore = Game.persistent.score;

    if(typeof Game.persistent.score == "undefined")
    {
      Game.persistent.score = 0;
      score = 0;
    }

    text.text = "SCORE " + tempscore;
  }
}

export default ScoreUpdateComponent;