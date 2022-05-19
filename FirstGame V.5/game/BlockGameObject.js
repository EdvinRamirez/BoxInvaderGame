import GameObject from "../engine/GameObject.js"
import Rectangle from "../engine/components/Rectangle.js";
import RectangleDraw from "../engine/components/RectangleDraw.js";
import BlockUpdateComponent from "./BlockUpdateComponent.js";

class BlockGameObject extends GameObject
{
    constructor(x,y,w,h)
    {
        super();
        this.components.push(new Rectangle(this, x,y,w,h));
        this.components.push(new RectangleDraw(this, "white", "white"));
        this.components.push(new BlockUpdateComponent(this));
    }


}

export default BlockGameObject