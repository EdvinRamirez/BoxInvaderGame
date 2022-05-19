import GameObject from "../engine/GameObject.js"
import Rectangle from "../engine/components/Rectangle.js";
import RectangleDraw from "../engine/components/RectangleDraw.js";
import EnemyBulletUpdateComponent from "./EnemyBulletUpdateComponent.js";

class EnemyBulletGameObject extends GameObject
{
    constructor(x,y,w,h,speed)
    {
        super();
        this.components.push(new Rectangle(this, x,y,w,h));
        this.components.push(new RectangleDraw(this, "green", "red"));
        this.components.push(new EnemyBulletUpdateComponent(this, speed));
    }


}

export default EnemyBulletGameObject