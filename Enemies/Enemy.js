/**
 * Sources:
 * https://medium.com/@yuribett/javascript-abstract-method-with-es6-5dbea4b00027
 * https://www.youtube.com/watch?v=I5dARpAPlNk
 */

import Util from '../Utilities/Util.js';

/**
 * The Enemy class is the parent class for all of the enemies.
 */
class Enemy {

    /**
     * The constructor initializes the fields of the Enemy.
     * @param x The x position of the Enemy.
     * @param y The y position of the Enemy.
     * @param velocity The velocity of the Enemy.
     * @param health The health of the Enemy.
     * @param damage The damage of the Enemy.
     * @param pointsOnKill The points rewarded for killing the Enemy.
     */
    constructor(x, y, velocity, health, damage, pointsOnKill) {
        this.x = x;
        this.y = y;
        this.angle = Math.PI/2;
        this.velocity = velocity;
        this.health = health;
        this.damage = damage;
        this.pointsOnKill = pointsOnKill;
        this.attackCooldown = 0;
    }

    /**
     * The loadImage function takes in a url and loads it as an Image. Once the image is loaded, this.isImageLoaded is
     * set to true. The height and width of the Enemy are set to the height and width of the image.
     * @param url The url that should be loaded.
     */
    loadImage(url) {
        this.isImageLoaded = false;
        this.image = new Image();
        this.image.onload = () => {
            this.isImageLoaded = true;
            this.width = this.image.width;
            this.height = this.image.height;
        };
        this.image.src = url;
    }

    /**
     * The attack function takes in an object and removes the amount of damage the Enemy deals from their health.
     * 500 is added to the attack cooldown of the enemy after an attack.
     * @param object The object that is being attacked.
     */
    attack(object) {
        object.health -= this.damage;
        this.attackCooldown += 500;
    }

    /**
     * Moves the enemy towards the player.
     * @param player The player object to move towards.
     * @param modifier The modifier to be multiplied by the velocity.
     * @param environmentObjects An array of environment objects.
     */
    move(player, modifier, environmentObjects) {
        let diffX = player.x - this.x;
        let diffY = player.y - this.y;
        let length = Math.sqrt(diffX * diffX + diffY * diffY);
        if(length !== 0) {
            diffX /= length;
            diffY /= length;
        }

        this.angle = Math.atan2(diffY, diffX);

        if(diffX > 0) {
            if(this.x + this.width <= 10000) {
                this.x += this.velocity*modifier;
                if(this.isCollisionWithEnvironmentObject(environmentObjects)) {
                    this.x -= this.velocity*modifier;
                }
            }
        }
        else if(diffX < 0) {
            if(this.x >= 0) {
                this.x -= this.velocity*modifier;
                if(this.isCollisionWithEnvironmentObject(environmentObjects)) {
                    this.x += this.velocity*modifier;
                }
            }
        }
        if(diffY > 0) {
            if(this.y + this.height <= 5625) {
                this.y += this.velocity*modifier;
                if(this.isCollisionWithEnvironmentObject(environmentObjects)) {
                    this.y -= this.velocity*modifier;
                }
            }
        }
        else if(diffY < 0) {
            if(this.y >= 0) {
                this.y -= this.velocity*modifier;
                if(this.isCollisionWithEnvironmentObject(environmentObjects)) {
                    this.y += this.velocity*modifier;
                }
            }
        }

        if(Util.isCollision(this, player) && this.attackCooldown === 0) {
            console.log("health before attack" + player.health);
            this.attack(player);
            console.log("health after attack" + player.health);
        }
    }

    /**
     * This function sets the position of the enemy given x and y.
     * @param x The x position to be set.
     * @param y The y position to be set.
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * This function is a helper function used by the move function to determine if there is a collision between an
     * environment object and the enemy. If there is a collision, the object is attacked.
     * @param environmentObjects An array of environment objects.
     * @returns {boolean} Whether a collision exists.
     */
    isCollisionWithEnvironmentObject(environmentObjects) {
        for(let i = 0; i < environmentObjects.length; i++) {
            if(Util.isCollision(this, environmentObjects[i]) && environmentObjects[i].isBlocking) {
                if(this.attackCooldown === 0) {
                    this.attack(environmentObjects[i]);
                }
                return true;
            }
        }
        return false;
    }

    /**
     * The draw function draws the image on the canvas at the x and y position of the LightEnemy.
     * @param ctx The context of the canvas.
     */
    draw(ctx, camera) {
        //ctx.save();
        //ctx.translate(this.x, this.y);
        //ctx.rotate(this.angle + Math.PI/2.0);
        //ctx.translate(-this.x, -this.y);
        ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
        //ctx.restore();
    }
}

export default Enemy;