import GameObject from "../engine/GameObject.js"
import BossUpdateComponent from "./BossUpdateComponent.js";
import Rectangle from "../engine/components/Rectangle.js";
import RectangleDraw from "../engine/components/RectangleDraw.js";


class BossGameObject extends GameObject
{
    constructor(x,y,w,h)
    {
        super();
        this.components.push(new Rectangle(this,x,y,w,h));
        this.components.push(new RectangleDraw(this, "red", "gray"));
        this.components.push(new BossUpdateComponent(this, x, y, w, h));
    }

}

export default BossGameObject