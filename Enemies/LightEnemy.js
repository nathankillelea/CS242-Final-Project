import Enemy from './Enemy.js';

class LightEnemy extends Enemy {
    constructor(x, y) {
        super(x, y, 20, 10, 10, 50);
    }

    draw(ctx) {
        ctx.drawImage('../Graphics/LightEnemy.png', this.x, this.y);
    }
}

export default LightEnemy;