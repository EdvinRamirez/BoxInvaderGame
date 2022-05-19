import GameObject from "../engine/GameObject.js"
import Rectangle from "../engine/components/Rectangle.js";
import RectangleDraw from "../engine/components/RectangleDraw.js";
import BulletUpdateComponent from "./BulletUpdateComponent.js";

class BulletGameObject extends GameObject
{
    constructor(x,y,w,h)
    {
        super();
        this.components.push(new Rectangle(this, x,y,w,h));
        this.components.push(new RectangleDraw(this, "blue", "white"));
        this.components.push(new BulletUpdateComponent(this,x,y,w,h));
    }


}

export default BulletGameObject