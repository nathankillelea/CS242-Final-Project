import Enemy from './Enemy.js';

/**
 * The LightEnemy class extends the Enemy class. It is a fast enemy with low health.
 */
class LightEnemy extends Enemy {

    /**
     * The constructor initializes the fields of the LightEnemy. A call is made to the Enemy classes constructor with
     * the inputted x and y, the velocity set to 128, the health set to 10, the damage set to 10, and the pointsOnKill
     * set to 50.
     * @param x The x position of the LightEnemy.
     * @param y The y position of the LightEnemy.
     */
    constructor(x, y) {
        super(x, y, 128, 10, 10, 50);
        super.loadImage("Graphics/LightEnemy.png");
    }
}

export default LightEnemy;