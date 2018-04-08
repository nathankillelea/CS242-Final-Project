import Enemy from './Enemy.js';

class TankEnemy extends Enemy {
    constructor(x, y) {
        super(x, y, 2.5, 100,  25, 500);
    }

    draw(ctx) {
        ctx.drawImage('../Graphics/TankEnemy.png', this.x, this.y);
    }
}

export default TankEnemy;