import Component from "../engine/Component.js"
import Constants from "./Constants.js";
import Game from "../engine/Game.js"
import Time from "../engine/Time.js";
import EnemyBulletGameObject from "./EnemyBulletGameObject.js"

class EnemyUpdateComponent extends Component
{
    constructor(parent, velX, velY)
    {
        super(parent)
        this.velX = velX;
        this.BulletInterval = false;
        this.lifecount = 1;
        this.velY = velY;
        this.fall = false;
        this.falltime = 0;
    }

    update()
    {
        let d = new Date();
        let enemeies = this.parent.getComponent("Rectangle");
        let enemycolor =  this.parent.getComponent("RectangleDraw");


        let bullet = Game.findByType("BulletGameObject");
        
        let score = Game.findByTypeOne("ScoreGameObject");
        let currentscore = score.getComponent("ScoreUpdateComponent");
        
        for(let i = 0; i < bullet.length; i++)
        {
        let bulletX = bullet.map(w=>w.getComponent("Rectangle").x)[i]
        let bulletY = bullet.map(w=>w.getComponent("Rectangle").y)[i]
        let bulletW = bullet.map(w=>w.getComponent("Rectangle").w)[i]
        let bulletH = bullet.map(w=>w.getComponent("Rectangle").h)[i]

        bulletX = parseInt(bulletX, 10)
        bulletY = parseInt(bulletY, 10)
        bulletW = parseInt(bulletW, 10)
        bulletH = parseInt(bulletH, 10)

        if (bulletX > enemeies.x && bulletX < enemeies.x + enemeies.w
            && bulletY + bulletH > enemeies.y && bulletY < enemeies.y + enemeies.h) 
        {
            if (this.lifecount == 0)
            {
                this.parent.markForDelete = true;
                Game.persistent.score += 100;
            }
            enemycolor.fillStyle = "yellow";
            this.lifecount--;
            bullet.map(w=>w.getComponent("Rectangle"))[i].parent.markForDelete = true;
        }
    }
         

        let random = Math.floor(Math.random() * 10);
        if (d.getSeconds() % 3 == 0 && this.BulletInterval != true && random == 3)
        {
            let newBullet = new EnemyBulletGameObject(enemeies.x + (enemeies.w/2), enemeies.y + enemeies.h, 10, 25, 85);
            Game.scene().gameObjects.push(newBullet);
            this.BulletInterval = true;;
        }
        else if (d.getSeconds() % 3 != 0)
        {
            this.BulletInterval = false;
        }

        //let allenemies = Game.findByType("EnemyGameObject");
        /** 
        if (enemeies.x > Constants.Width - enemeies.w)
        {
            enemeies.y = enemeies.y + (enemeies.w * 1.75);
            enemeies.x = 100;
        }
        */

        if(enemeies.x > Constants.Width - enemeies.w - 1 || enemeies.x < 1)
        {
            let tempAllEnemy = Game.findByType("EnemyGameObject");
            for (let tempenemy of tempAllEnemy)
            {
                let newtempVelx = tempenemy.getComponent("EnemyUpdateComponent");
                newtempVelx.velX = -newtempVelx.velX;
                newtempVelx.fall = true;
            }
        }

        if(this.fall && this.falltime < 2)
        {
            enemeies.y += this.velY * Time.secondsBetweenFrame;
            this.falltime += Time.secondsBetweenFrame;
        }
        else 
        {
            this.falltime = 0;
            this.fall = false;
        }

        enemeies.x += this.velX * Time.secondsBetweenFrame;
    }
}

export default EnemyUpdateComponent