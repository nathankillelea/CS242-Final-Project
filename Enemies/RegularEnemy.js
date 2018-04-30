import Enemy from './Enemy.js';

/**
 * The RegularEnemy class extends the Enemy class. It has balanced stats across the board.
 */
class RegularEnemy extends Enemy {

    /**
     * The constructor initializes the fields of the RegularEnemy. A call is made to the Enemy classes constructor with
     * the inputted x and y, the velocity set to 64, the health set to 25, the damage set to 10, and the pointsOnKill
     * set to 100.
     * @param x The x position of the RegularEnemy.
     * @param y The y position of the RegularEnemy.
     */
    constructor(x, y) {
        super(x, y, 64, 25, 10, 100);
        super.loadImage("Graphics/RegularEnemy.png");
        super.loadDamageTakenSound('Audio/RegularEnemyDamageTaken.mp3');
    }
}

export default RegularEnemy;
