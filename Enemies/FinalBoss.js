import Enemy from './Enemy.js';

/**
 * The FinalBoss class extends the Enemy class. It is a high health and damage enemy.
 */
class FinalBoss extends Enemy {

    /**
     * The constructor initializes the fields of the FinalBoss. A call is made to the Enemy classes constructor with
     * the inputted x and y, the velocity set to 128, the health set to 5000, the damage set to 50, and the pointsOnKill
     * set to 10000.
     * @param x The x position of the FinalBoss.
     * @param y The y position of the FinalBoss.
     */
    constructor(x, y) {
        super(x, y, 128, 5000, 50, 10000);
        this.shootCooldown = 100;
        this.shootCooldownRate = 1;
        this.shootCooldownReset = 100;
        this.rapidFireCooldown = 10;
        this.rapidFireCooldownRate = 1;
        this.rapidFireCooldownReset = 10;
        this.rapidFireLength = 10;
        this.rapidFireLengthReset = 10;
        this.isRapidFire = false;
        this.chargeAttackCooldown = 25;
        this.chargeAttackCooldownRate = 1;
        this.chargeAttackCooldownReset = 25;
        this.chargeAttackLength = 2.5;
        this.chargeAttackLengthReset = 2.5;
        this.isChargeAttack = false;
        super.loadImage("Graphics/FinalBoss.png");
        super.loadDamageTakenSound('Audio/FinalBossDamageTaken.mp3');
    }

    /**
     * This function starts the charge attack by setting velocity to 1024, setting damage to 10, and setting isChargeAttack
     * to true.
     */
    startChargeAttack() {
        this.velocity = 1024;
        this.damage = 10;
        this.isChargeAttack = true;
    }

    /**
     * This function ends the charge attack by resetting velocity and damage to their default values.
     */
    endChargeAttack() {
        this.velocity = 128;
        this.damage = 50;
        this.isChargeAttack = false;
    }

    /**
     * This function starts rapid fire by setting the shootCooldownRate to 25 and setting isRapidFire to true.
     */
    startRapidFire() {
        this.shootCooldownRate = 25;
        this.isRapidFire = true;
    }

    /**
     * This function ends the rapid fire by sets rapid fire back to its default value.
     */
    endRapidFire() {
        this.shootCooldownRate = 1;
        this.isRapidFire = false;
    }
}

export default FinalBoss;
