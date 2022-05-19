import GameObject from "../engine/GameObject.js"
import CircleDraw from "../engine/components/CircleDraw.js"
import Circle from "../engine/components/Circle.js"
import BombUpdateComponent from "./BombUpdateComponent.js";


class BombGameObject extends GameObject
{
    constructor(x,y,ballradius, startx, endx)
    {
        super();
        this.components.push(new Circle(this, x, y, ballradius, startx, endx));
        this.components.push(new CircleDraw(this, "blue", "purple"));
        this.components.push(new BombUpdateComponent(this));
    }
}

export default BombGameObject