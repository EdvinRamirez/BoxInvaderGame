import GameObject from "../engine/GameObject.js"
import Text from "../engine/components/Text.js"
import TextDraw from "../engine/components/TextDraw.js"
import StartUpdateComponent from "./StartUpdateComponent.js"

class StartGameObject extends GameObject{
  constructor(x,y){
    super();
    this.x = x;
    this.y = y;
    this.start();
  }
  start(){
    this.components.push(new Text(this, this.x,this.y,"Press Spacebar to Start", "75px arial"))
    this.components.push(new TextDraw(this, "red", "purple"))
    this.components.push(new StartUpdateComponent(this))
  }
}

export default StartGameObject;