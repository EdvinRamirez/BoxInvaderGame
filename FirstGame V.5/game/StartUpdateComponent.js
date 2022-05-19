import Component from "../engine/Component.js"
import Game from "../engine/Game.js";
import Time from "../engine/Time.js"
import Input from "../engine/Input.js"


class StartUpdateComponent extends Component {
  constructor(parent) {
    super(parent);
  }
  update() {
    if(Input.getKey(" "))
    {
      Game.changeScene(1)
    }

      let title = Game.findByNameOne("Game Title");
      let titletemp = title.getComponent("Text");
      //let newtemp = document.getElementById(titletemp.text);

      let welcome = Game.findByTypeOne("StartGameObject");
      let welcometemp = welcome.getComponent("Text");
      //welcometemp.style.textAlign = "center";
    
  }
}

export default StartUpdateComponent;