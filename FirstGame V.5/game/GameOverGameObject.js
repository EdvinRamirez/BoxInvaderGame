import GameObject from "../engine/GameObject.js"
import Text from "../engine/components/Text.js"
import TextDraw from "../engine/components/TextDraw.js"
import GameOverUpdateComponent from "./GameOverUpdateComponent.js"

class GameOverGameObject extends GameObject
{
    constructor(x,y)
    {
        super();
        this.x = x;
        this.y = y;
        this.start();
    }

    start()
    {
        this.components.push(new Text(this, this.x,this.y,"Game Over", "100px sans"))
        this.components.push(new TextDraw(this, "red", "purple"))
        this.components.push(new GameOverUpdateComponent(this))
    }
}

export default GameOverGameObject