import Enemy from './Enemy.js';

class RegularEnemy extends Enemy {
    constructor(x, y) {
        super(x, y, 10, 25, 10, 100);
    }

    draw(ctx) {
        ctx.drawImage('../Graphics/RegularEnemy.png', this.x, this.y);
    }
}

export default RegularEnemy;