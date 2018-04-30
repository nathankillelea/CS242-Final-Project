import Enemy from './Enemy.js';

/**
 * The ProjectileEnemy class extends the enemy class. It can shoot projectiles at the player.
 */
class ProjectileEnemy extends Enemy {

    /**
     * The constructor initializes the fields of the ProjectileEnemy. A call is made to the Enemy classes constructor with
     * the inputted x and y, the velocity set to 96, the health set to 40, the damage set to 10, and the pointsOnKill
     * set to 250.
     * @param x The x position of the ProjectileEnemy.
     * @param y The y position of the ProjectileEnemy.
     */
    constructor(x, y) {
        super(x, y, 96, 40, 10, 250);
        this.shootCooldown = 300;
        this.shootCooldownRate = 1;
        this.shootCooldownReset = 300;
        this.shootAmount = 1;
        super.loadImage("Graphics/ProjectileEnemy.png");
        super.loadDamageTakenSound('Audio/ProjectileEnemyDamageTaken.mp3');
    }
}

export default ProjectileEnemy;
