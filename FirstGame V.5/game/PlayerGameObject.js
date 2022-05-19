import GameObject from "../engine/GameObject.js"
import PlayerUpdateComponent from "./PlayerUpdateComponent.js";
import Rectangle from "../engine/components/Rectangle.js";
import RectangleDraw from "../engine/components/RectangleDraw.js";


class PlayerGameObject extends GameObject{
  constructor(x,y,w,h){
    super();
    this.components.push(new Rectangle(this, x,y,w,h));
    this.components.push(new RectangleDraw(this, "blue", "blue"));
    this.components.push(new PlayerUpdateComponent(this,x,y,w,h));
    
  }
  
}

export default PlayerGameObject;