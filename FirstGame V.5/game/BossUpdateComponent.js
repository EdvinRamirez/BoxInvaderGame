import Component from "../engine/Component.js"
import Constants from "./Constants.js";
import Game from "../engine/Game.js"
import Time from "../engine/Time.js";
import EnemyBulletGameObject from "./EnemyBulletGameObject.js"
import EnemyGameObject from "./EnemyGameObject.js";
import Collisions from "../engine/Collisions.js";

class BossUpdateComponent extends Component
{
    constructor(parent)
    {
        super(parent)
        this.velX = 45;
        this.velY = 15;
        this.lifecount = 25;
        this.BulletInterval = false;
        this.bulletboss = false;
        this.bulletstart = 50;
        this.timebetweenenemies = 0;

        this.timebetwenbulletsmain = 0;
        this.timebetweenbullets = 0;

        this.timeforfall = 0;
        this.fall = false;
    }

    update()
    {
        this.timebetweenenemies += Time.secondsBetweenFrame;
        this.timebetweenbullets += Time.secondsBetweenFrame;
        this.timebetwenbulletsmain += Time.secondsBetweenFrame;

        let boss = this.parent.getComponent("Rectangle");
        let bosscolor = this.parent.getComponent("RectangleDraw");

        boss.x += this.velX * Time.secondsBetweenFrame;

        if(this.lifecount <= 0 && !this.change)
        {
            Game.persistent.score += 500;
            this.parent.markForDelete = true;
            this.change = true;
        }
        else if (this.lifecount <= 12)
        {
            bosscolor.fillStyle = "yellow";
        }

        let bullet = Game.findByType("BulletGameObject");

        for ( let temp of bullet)
        {
            let newtemp = temp.getComponent("Rectangle");
            if(Collisions.inCollision(newtemp, boss))
            {
                this.lifecount--;
                newtemp.parent.markForDelete = true;
            }
        }

        if(this.timebetweenbullets > 3)
        {
            for (let i = this.bulletstart; i < Constants.Width - 10; i += 150)
            {
                let random = Math.floor(Math.random() * 101) + 25;
                let newBullet = new EnemyBulletGameObject(i + random, boss.h + boss.y + 2, 10, 25, 75);
                Game.scene().gameObjects.push(newBullet);
            }
            this.timebetweenbullets = 0;
        }

        if(this.timebetwenbulletsmain > 7)
        {
            for (let i = boss.x - 200; i < boss.x + boss.w + 200; i += 100)
            {
                let newBullet = new EnemyBulletGameObject(i, boss.h + boss.y + 2, 10, 75, 250);
                Game.scene().gameObjects.push(newBullet);
            }
            this.timebetwenbulletsmain = 0;
        }


        if(boss.x > Constants.Width - 100 - boss.w)
        {
            this.velX = -this.velX;
            this.fall = true;
        }
        else if(boss.x < 100)
        {
            this.velX = -this.velX;
            this.fall = true;
        }

        if(this.fall && this.timeforfall < 3)
        {
            boss.y += this.velY * Time.secondsBetweenFrame;
            this.timeforfall += Time.secondsBetweenFrame;
        }
        else 
        {
            this.timeforfall = 0;
            this.fall = false;
        }

        if(this.timebetweenenemies > 20)
        {
            
            for (let i = 0; i < 4; i ++)
            {
                let newEnemy = new EnemyGameObject(boss.x - 100 + i*95, boss.y + boss.h + 10, 50, 50, this.velX/1.10, this.velY*3);
                Game.scene().gameObjects.push(newEnemy); 
            }
            this.timebetweenenemies = 0;
        }

    }
    

}

export default BossUpdateComponent