import GameObject from "../engine/GameObject.js"
import ScoreUpdateComponent from "./ScoreUpdateComponent.js";
import Text from "../engine/components/Text.js";
import TextDraw from "../engine/components/TextDraw.js";

class ScoreGameObject extends GameObject{
  constructor(x,y){
    super();
    this.x = x;
    this.y = y;
    this.start();
  }
  start(){
    this.components.push(new Text(this, this.x,this.y, "", "30px arial"));
    this.components.push(new TextDraw(this, "white", "gray"));
    this.components.push(new ScoreUpdateComponent(this));
  }
  
}

export default ScoreGameObject;
