import GameObject from "./gameObject";


export default class Ball extends GameObject{
    constructor(...args){
        super(...args);
        this.velX = 1;
        this.velY = 1;
        this.isCollide = false;
    }

    draw(ctx){
        if(this.isCollide){
            ctx.fillStyle = "red";
        }else{
            ctx.fillStyle = "white";
        }
        ctx.fillRect(this.x,this.y,100,100);
        // ctx.beginPath();
        // ctx.arc(this.x+(this.width/2),this.y+(this.width/2),(this.width/2),0,360);
        // ctx.fill();
        // ctx.closePath();
    }

    update(){
        this.x+=this.velX*5;
        this.y+=this.velY*5;

        if(this.x+this.width >= width || this.x <=0){
            this.velX*=-1;
        }
        if(this.y+this.height >= height || this.y <=0){
            this.velY*=-1;
        }
        this.isCollide = false;
    }


}