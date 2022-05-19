import GameObject from "../engine/GameObject.js"
import EnemyUpdateComponent from "./EnemyUpdateComponent.js";
import Rectangle from "../engine/components/Rectangle.js";
import RectangleDraw from "../engine/components/RectangleDraw.js";


class EnemyGameObject extends GameObject
{
    constructor(x,y,w,h, velX, velY)
    {
        super();
        this.components.push(new Rectangle(this,x,y,w,h));
        this.components.push(new RectangleDraw(this, "red", "red"));
        this.components.push(new EnemyUpdateComponent(this, velX, velY));
    }

}

export default EnemyGameObject