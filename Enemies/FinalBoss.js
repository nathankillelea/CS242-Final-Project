import Enemy from './Enemy.js';

/**
 * The FinalBoss class extends the Enemy class. It is a high health and damage enemy.
 */
class FinalBoss extends Enemy {

    /**
     * The constructor initializes the fields of the FinalBoss. A call is made to the Enemy classes constructor with
     * the inputted x and y, the velocity set to 128, the health set to 5000, the damage set to 75, and the pointsOnKill
     * set to 10000.
     * @param x The x position of the FinalBoss.
     * @param y The y position of the FinalBoss.
     */
    constructor(x, y) {
        super(x, y, 128, 5000, 75, 10000);
        this.shootCooldown = 100;
        this.shootCooldownRate = 1;
        this.shootCooldownReset = 100;
        this.rapidFireCooldown = 500;
        this.chargeAttackCooldown = 1250;
        this.chargeLength = 200;
        this.chargeLengthReset = 200;
        super.loadImage("Graphics/FinalBoss.png");
    }

    startChargeAttack() {
        this.velocity = 1024;
    }

    endChargeAttack() {
        this.velocity = 128;
    }

    startRapidFire() {
        this.shootCooldownRate = .25;
        this.shootCooldownReset = 50;
    }

    endRapidFire() {
        this.shootCooldownRate = 1;
        this.shootCooldownReset = 100;
    }
}

export default FinalBoss;