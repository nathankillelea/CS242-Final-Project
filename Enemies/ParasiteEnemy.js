import Enemy from './Enemy.js';

/**
 * The ParasiteEnemy class extends the Enemy class. It is a very fast enemy with very low hp.
 */
class ParasiteEnemy extends Enemy {

    /**
     * The constructor initializes the fields of the ParasiteEnemy. A call is made to the Enemy classes constructor with
     * the inputted x and y, the velocity set to 512, the health set to 1, the damage set to 100, and the pointsOnKill
     * set to 500.
     * @param x The x position of the ParasiteEnemy.
     * @param y The y position of the ParasiteEnemy.
     */
    constructor(x, y) {
        super(x, y, 512, 1, 99, 500);
        super.loadImage("Graphics/ParasiteEnemy.png");
        super.loadDamageTakenSound('Audio/ParasiteEnemyDamageTaken.mp3');
    }
}

export default ParasiteEnemy;
