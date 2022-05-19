import Component from "../Component.js"

class CircleDraw extends Component {
    constructor(parent, fillStyle, strokeStyle) {
        super(parent);
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
    }
    draw(ctx){
        let circle = this.parent.getComponent("Circle");


        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;

        ctx.beginPath();
        ctx.arc(
            circle.x,
            circle.y,
            circle.ballRadius,
            circle.startx,
            circle.endx
        )
        ctx.fill()
        ctx.stroke()
        ctx.closePath();
    }

}

export default CircleDraw