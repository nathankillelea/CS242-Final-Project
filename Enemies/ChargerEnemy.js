import Enemy from './Enemy.js';

/**
 * The ChargerEnemy class extends the Enemy class. It has balanced stats across the board.
 */
class ChargerEnemy extends Enemy {

    /**
     * The constructor initializes the fields of the ChargerEnemy. A call is made to the Enemy classes constructor with
     * the inputted x and y, the velocity set to 256, the health set to 250, the damage set to 25, and the pointsOnKill
     * set to 500.
     * @param x The x position of the ChargerEnemy.
     * @param y The y position of the ChargerEnemy.
     */
    constructor(x, y) {
        super(x, y, 256, 250, 25, 500);
        this.isChargeAttack = false;
        this.chargeAttackCooldown = 10;
        this.chargeAttackCooldownRate = 1;
        this.chargeAttackCooldownReset = 10;
        this.chargeAttackLength = 4;
        this.chargeAttackLengthReset = 4;
        super.loadImage("Graphics/ChargerEnemy.png");
        super.loadDamageTakenSound('Audio/ChargerEnemyDamageTaken.mp3');
    }

    /**
     * This function starts the charge attack by setting velocity to 1024 and setting isChargeAttack
     * to true.
     */
    startChargeAttack() {
        this.velocity = 1024;
        this.isChargeAttack = true;
    }

    /**
     * This function ends the charge attack by resetting velocity to its default values.
     */
    endChargeAttack() {
        this.velocity = 256;
        this.isChargeAttack = false;
    }
}

export default ChargerEnemy;