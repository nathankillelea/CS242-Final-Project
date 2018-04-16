import Util from '../Utilities/Util.js';

/**
 * The EnemyProjectile class is the object that is fired from the ProjectileEnemy enemy.
 */
class EnemyProjectile {

    /**
     * The constructor initializes the fields of the EnemyProjectile class and gets the x and y coefficients for use
     * in the move function. The loadImage function is also called.
     * @param x The x position of the EnemyProjectile.
     * @param y The y position of the EnemyProjectile.
     * @param destX The x destination of the EnemyProjectile.
     * @param destY The y destination of the EnemyProjectile.
     */
    constructor(x, y, destX, destY) {
        this.velocity = 600;
        this.damage = 5;
        this.x = x;
        this.y = y;
        this.live = true;
        let diffX = destX - this.x;
        let diffY = destY - this.y;
        if(Math.abs(diffX) > Math.abs(diffY)) {
            this.coeffX = diffX / Math.abs(diffX);
            this.coeffY = diffY / Math.abs(diffX);
        }
        else {
            this.coeffY = diffY / Math.abs(diffY);
            this.coeffX = diffX / Math.abs(diffY);
        }
        this.loadImage();
    }

    /**
     * This function moves the EnemyProjectile according to the x and y coefficients.
     * @param modifier The modifier to be multiplied by the velocity.
     * @param environmentObjects The array of environment objects.
     * @param player The player object.
     */
    move(modifier, environmentObjects, player) {
        this.x += this.velocity*modifier*this.coeffX;
        this.y += this.velocity*modifier*this.coeffY;
        if(this.hitSomething(environmentObjects, player)) {
            this.live = false;
        }
        if(this.x < 0 || this.x > 10000 || this.y < 0 || this.y > 5625){
            this.live = false;
        }
    }

    /**
     * This function takes away health from the player equal to the damage of the EnemyProjectile.
     * @param player The player object.
     */
    damagePlayer(player) {
        player.health -= this.damage;
    }

    /**
     * This function takes away health from the environment object equal to the damage of the EnemyProjectile.
     * @param environmentObject The environment object.
     */
    damageEnvironment(environmentObject){
        environmentObject.health -= this.damage;
    }

    /**
     * This function checks if an environment object or a player were hit by the projectile.
     * @param environmentObjects The array of environment objects.
     * @param player The player object.
     * @returns {boolean} Whether or not something was hit.
     */
    hitSomething(environmentObjects, player) {
        for(let i = 0; i < environmentObjects.length; i++) {
            if(Util.isCollision(this, environmentObjects[i]) && environmentObjects[i].isBlocking) {
                this.damageEnvironment(environmentObjects[i]);
                return true;
            }
        }
        if(Util.isCollision(this, player)){
            this.damagePlayer(player);
            return true;
        }
        return false;
    }

    /**
     * The loadImage function loads the url as an Image. Once the image is loaded, this.isImageLoaded is
     * set to true. The height and width of the EnemyProjectile are set to the height and width of the image.
     */
    loadImage() {
        this.isImageLoaded = false;
        this.image = new Image();
        this.image.onload = () => {
            this.isImageLoaded = true;
            this.width = this.image.width;
            this.height = this.image.height;
        };
        this.image.src = "Graphics/EnemyProjectile.png";
    }

    /**
     * The draw function draws the image on the canvas at the x and y position of the EnemyProjectile.
     * @param ctx The context of the canvas.
     * @param camera The camera object.
     */
    draw(ctx, camera) {
        ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
    }
}

export default EnemyProjectile;