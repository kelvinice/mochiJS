export default class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx) { throw "You must define function to draw!" }
    update() { throw "You must define function to update!" }

    isIntersect(g) {
        return this.x <= g.x + g.width && this.x + this.width >= g.x
            && this.y <= g.y + g.height && this.y + this.height >= g.y;
    }

    isHorizontalLinearIntersect(g) {
        return this.x <= g.x + g.width && this.x + this.width >= g.x
            && this.y <= g.y + g.height / 2 && this.y + this.height >= g.y + g.height / 2;
    }

    isIn(x, y) {
        return this.x <= x && this.x + this.width >= x
            && this.y <= y && this.y + this.height >= y;
    }

}

class AnimatedGameObject extends GameObject{
    
}