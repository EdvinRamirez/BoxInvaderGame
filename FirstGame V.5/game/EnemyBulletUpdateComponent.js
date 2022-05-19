import Component from "../engine/Component.js"
import Game from "../engine/Game.js";
import Input from "../engine/Input.js";
import Time from "../engine/Time.js";
import Constants from "./Constants.js";


class EnemyBulletUpdateComponent extends Component
{
    constructor(parent, speed)
    {
        super(parent)
        this.VelY = speed;
    }

    update()
    {
        let enemybullet = this.parent.getComponent("Rectangle");
        let enemybulletDraw = this.parent.getComponent("RectangleDraw");

        enemybullet.y += this.VelY * Time.secondsBetweenFrame;

        if (enemybullet.y > Constants.Height)
        {
            this.parent.markForDelete = true;
        }

    }
}

export default EnemyBulletUpdateComponent