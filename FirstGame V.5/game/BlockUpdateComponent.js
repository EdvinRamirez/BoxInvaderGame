import Component from "../engine/Component.js"
import Game from "../engine/Game.js"
import Collisions from "../engine/Collisions.js";
import EnemyBulletGameObject from "./EnemyBulletGameObject.js";

class BlockUpdateComponent extends Component
{
    constructor(parent)
    {
        super(parent)
        this.life = 10;
    }

    update()
    {
        let block = this.parent.getComponent("Rectangle");

        let bullets = Game.findByType("EnemyBulletGameObject");

        for(let bullet of bullets)
        {
            let temp = bullet.getComponent("Rectangle");
            if(Collisions.inCollision(temp, block))
            {
                this.life--;
                temp.parent.markForDelete = true;
            }
        }

        let friedlybullet = Game.findByType("BulletGameObject");
        for (let bullet of friedlybullet)
        {
            let temp = bullet.getComponent("Rectangle");
            if (Collisions.inCollision(temp, block))
            {
                this.life--;
                let newBullet = new EnemyBulletGameObject(temp.x, temp.y + temp.h + 2, temp.w, temp.h, 100);
                Game.scene().gameObjects.push(newBullet);
                temp.parent.markForDelete = true;
            }
        }

        
        let bomb = Game.findByTypeOne("BombGameObject");
        if(bomb != null)
        {
            let bombtemp = bomb.getComponent("Circle")
            let bombexplode = bomb.getComponent("BombUpdateComponent");
            if(Collisions.inCollision(bombtemp, block))
            {
                //bombtemp.parent.markForDelete = true;
                bombexplode.explosionoccured = true;
                bombtemp.ballRadius = bombtemp.ballRadius * 5;
                this.parent.markForDelete = true;
                let player = Game.findByTypeOne("PlayerGameObject");
                let tempplayer = player.getComponent("PlayerUpdateComponent");
                if(Collisions.inCollision(player.getComponent("Rectangle")), bombtemp)
                {
                    tempplayer.lifecount = 0;
                }
            }
        }

        if(this.life <= 0)
        {
            this.parent.markForDelete = true;
        }

    }
}

export default BlockUpdateComponent