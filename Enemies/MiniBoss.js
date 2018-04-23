import Enemy from './Enemy.js';

/**
 * The MiniBoss class extends the Enemy class. It is a high health and damage enemy.
 */
class MiniBoss extends Enemy {

    /**
     * The constructor initializes the fields of the MiniBoss. A call is made to the Enemy classes constructor with
     * the inputted x and y, the velocity set to 128, the health set to 500, the damage set to 50, and the pointsOnKill
     * set to 1000.
     * @param x The x position of the MiniBoss.
     * @param y The y position of the MiniBoss.
     */
    constructor(x, y) {
        super(x, y, 128, 500, 50, 1000);
        this.shootCooldown = 200;
        this.shootCooldownRate = 1;
        this.shootCooldownReset = 200;
        super.loadImage("Graphics/MiniBoss.png");
    }
}

export default MiniBoss;