import Enemy from './Enemy.js';

/**
 * The TankEnemy class extends the Enemy class. It is a slow enemy with high health and damage.
 */
class TankEnemy extends Enemy {

    /**
     * The constructor initializes the fields of the TankEnemy. A call is made to the Enemy classes constructor with
     * the inputted x and y, the velocity set to 32, the health set to 100, the damage set to 25, and the pointsOnKill
     * set to 500.
     * @param x The x position of the TankEnemy.
     * @param y The y position of the TankEnemy.
     */
    constructor(x, y) {
        super(x, y, 32, 100,  25, 500);
        super.loadImage("Graphics/TankEnemy.png");
        super.loadDamageTakenSound('Audio/TankEnemyDamageTaken.mp3');
    }
}

export default TankEnemy;
