import Component from "../engine/Component.js"
import Game from "../engine/Game.js";
import Input from "../engine/Input.js";
import Time from "../engine/Time.js";
import BulletGameObject from "./BulletGameObject.js";
import Constants from "./Constants.js";

class BulletUpdateComponent extends Component
{
    constructor(parent)
    {
        super(parent)
        this.VelY = 300;
    }
    
    update()
    {
        
        let bullet = this.parent.getComponent("Rectangle");
        let BulletDraw =  this.parent.getComponent("RectangleDraw");

        bullet.y -= this.VelY * Time.secondsBetweenFrame;

        if (bullet.y < 20)
        {
            this.parent.markForDelete = true;
        }


    }

}

export default BulletUpdateComponent