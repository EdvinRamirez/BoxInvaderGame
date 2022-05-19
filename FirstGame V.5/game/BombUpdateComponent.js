import Component from "../engine/Component.js"
import Game from "../engine/Game.js"
import Time from "../engine/Time.js";
import Collisions from "../engine/Collisions.js"

class BombUpdateComponent extends Component
{
    constructor(parent)
    {
        super(parent)
            this.dy = 250
            this.explosionoccured = false;
            this.flagexplosion = false;
            this.explosiontime = 0;
            this.explosionpower = 2;
    }

    update()
    {
        let bomb = this.parent.getComponent("Circle");
        let explosioncolor = this.parent.getComponent("CircleDraw");

        if(bomb.y < 0)
        {
            this.parent.markForDelete = true;
        }

            bomb.y -= this.dy * Time.secondsBetweenFrame;

            let allenemy = Game.findByType("EnemyGameObject");
            let allbullets = Game.findByType("EnemyBulletGameObject");


            if (this.explosionoccured)
            {
                explosioncolor.fillStyle = "yellow";
                for (let enemy of allenemy)
                {   
                    let tempenemy = enemy.getComponent("Rectangle");
                    if (Collisions.inCollision(bomb, tempenemy))
                    {
                        tempenemy.parent.markForDelete = true;
                        tempenemy.parent.markForDelete = true;
                    }
                }
                this.dy = 0;
                this.explosiontime += Time.secondsBetweenFrame;
                if(this.explosiontime > 1)
                {
                    this.parent.markForDelete = true;
                }
            }
            else 
            {
                for (let enemy of allenemy)
                {
                    let tempenemy = enemy.getComponent("Rectangle");
                    if (Collisions.inCollision(bomb, tempenemy))
                    {
                        this.explosionoccured = true;
                        bomb.ballRadius = bomb.ballRadius*this.explosionpower;
                        break;
                    }
                }
                for(let bullet of allbullets)
                {
                    let tempbullet = bullet.getComponent("Rectangle");
                    if (Collisions.inCollision(bomb, tempbullet))
                    {
                        tempbullet.parent.markForDelete = true;
                        this.explosionpower += 0.30;
                        break;
                    }
                }
            }
        
    }
}

export default BombUpdateComponent