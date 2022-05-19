import Component from "../engine/Component.js"
import Input from "../engine/Input.js"
import Constants from "./Constants.js";
import Game from "../engine/Game.js"
import Time from "../engine/Time.js";
import BulletGameObject from "./BulletGameObject.js";
import EnemyBulletGameObject from "./EnemyBulletGameObject.js";
import PrefabTextSmall from "../engine/prefabs/PrefabTextSmall.js"

import Collisions from "../engine/Collisions.js";
import BombGameObject from "./BombGameObject.js";
import PrefabTextLarge from "../engine/prefabs/PrefabTextLarge.js";




class PlayerUpdateComponent extends Component {
  constructor(parent) {
    super(parent);
    this.PlayerMoveX = 150;
    this.PlayerMoveY = 100;
    this.lifecount = 5;
    this.timesincestart = 0;
    this.flagtext = false;
    this.bombtexttime = 0;
    this.bombfired = false;
    this.warning = false;
  }
  update() {

    this.timesincestart += Time.secondsBetweenFrame;

    let rectangle = this.parent.getComponent("Rectangle");
    let rectanglePlayerDraw = this.parent.getComponent("RectangleDraw");

    let bullet = Game.findByType("EnemyBulletGameObject");

    //if(Input.getKeyDown("v"))
    //{
    //  Game.changeScene(4);
    //}

    

    rectanglePlayerDraw.fillStyle = "blue"

    //rectangle.x += dx;

    if (Input.getKey("a") && rectangle.x > 0)
    {
      rectangle.x += -this.PlayerMoveX * Time.secondsBetweenFrame;
      //console.log("The main is working");
    }
    else if (Input.getKey('d') && rectangle.x < Constants.Width - rectangle.w)
    {
      rectangle.x += this.PlayerMoveX * Time.secondsBetweenFrame;
    }
    else if (Input.getKey('s') && rectangle.y < Constants.Height - rectangle.h)
    {
      rectangle.y += this.PlayerMoveY * Time.secondsBetweenFrame;
    }
    else if (Input.getKey('w') && rectangle.y > (Constants.Height / 1.15))
    {
      rectangle.y += -this.PlayerMoveY * Time.secondsBetweenFrame;
    }

    if(Input.getMouseButtonDown(0) > 0)
    {
      let newBullet = new BulletGameObject(rectangle.x + (rectangle.w/2 - 5),rectangle.y - (rectangle.h),10,25);
      Game.scene().gameObjects.push(newBullet);
    }

    if (this.lifecount <= 0)
    {
      Game.changeScene(4);
    }
    else 
    {
      let health = Game.findByNameOne("Health Text");
      let healthtext = health.getComponent("Text");
      healthtext.text = "LIVES " + this.lifecount;
    }

    /*
    if (this.lifecount == 1 && !this.warning)
    {
      let warning = new PrefabTextLarge("Warning", Constants.Width/2 - 400, Constants.Height/2, "Warning Last Life");
      Game.scene().gameObjects.push(warning);
    }
    else if(this.warning)
    {

    }
    */

    if(Input.getKeyDown("n"))
    {
      Game.changeScene(2);
    }
    else if(Input.getKeyDown("u"))
    {
      Game.changeScene(3);
    }
    else if(Input.getKeyDown("v"))
    {
      Game.changeScene(4);
    }

    for (let i = 0; i < bullet.length; i++)
    {
      let bulletX = bullet.map(w=>w.getComponent("Rectangle").x)[i]
      let bulletY = bullet.map(w=>w.getComponent("Rectangle").y)[i]
      let bulletW = bullet.map(w=>w.getComponent("Rectangle").w)[i]
      let bulletH = bullet.map(w=>w.getComponent("Rectangle").h)[i]

      bulletX = parseInt(bulletX, 10)
      bulletY = parseInt(bulletY, 10)
      bulletW = parseInt(bulletW, 10)
      bulletH = parseInt(bulletH, 10)

      if (bulletX > rectangle.x && bulletX < rectangle.x + rectangle.w 
        && bulletY + bulletH > rectangle.y && bulletY < rectangle.y + rectangle.h)
        {
          bullet.map(w=>w.getComponent("Rectangle"))[i].parent.markForDelete = true;
          //rectanglePlayerDraw.fillStyle = "red";
          //rectanglePlayerDraw.strokeStyle = "purple";
          rectangle.w = rectangle.w / 1.50;
          this.lifecount--;
          this.PlayerMoveX += 25;
          this.PlayerMoveY + 10;
        }
    }

    //spawn bomb if ready 
    if(this.timesincestart > 10)
    {
      if(!this.flagtext && this.bombtexttime == 0)
      {
          Game.scene().gameObjects.push(new PrefabTextSmall("BombText", Constants.Width/2 - 50, 25, "BOMB IS READY"));
          this.flagtext = true;
      }
      else if (this.bombtexttime > 2 || this.bombfired)
      {
        let temptext = Game.findByNameOne("BombText");
        if(temptext != null)
        {
          let deletetext = temptext.getComponent("Text");
          deletetext.parent.markForDelete = true;
          this.bombtexttime = 0;
          this.timesincestart = 0;
          this.bombfired = false;
        }
      }
      if(Input.getKeyDown(" "))
      {
        let newBomb = new BombGameObject(rectangle.x + rectangle.w / 2, rectangle.y - rectangle.h - 2, 25, 0, 2*Math.PI);
        Game.scene().gameObjects.push(newBomb);
        this.flagtext = true;
        this.bombfired = true;
      }
    }

  }
}

export default PlayerUpdateComponent;