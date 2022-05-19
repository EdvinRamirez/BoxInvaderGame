import Component from "../Component.js";

class Circle extends Component
{
    constructor(parent, x, y, ballRadius, startx, endx, )
    {
        super(parent)
        this.x = x;
        this.y = y;
        this.ballRadius = ballRadius;
        this.startx = startx;
        this.endx = endx;
    }
}

export default Circle