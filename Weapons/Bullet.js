import Util from '../Utilities/Util.js';

class Bullet{
    constructor(velocity, damage, x, y, destX, destY, penetrates) {
        this.velocity = velocity;
        this.damage = damage;
        this.x = x;
        this.y = y;
        this.destX = destX;
        this.destY = destY;
        this.live = true;
        this.isPenetrating = true;
        let diffX = this.destX - this.x;
        let diffY = this.destY - this.y;
        //This logic finds a coefficient for X and Y that can be applied
        //to the move function in order to move the bullet in a straight line
        //directly to its destination.
        if(Math.abs(diffX) > Math.abs(diffY)) {
            this.coeffX = diffX / Math.abs(diffX);
            this.coeffY = diffY / Math.abs(diffX);
        }
        else {
            this.coeffY = diffY / Math.abs(diffY);
            this.coeffX = diffX / Math.abs(diffY);
        }
    }
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
    //Moves the bullet from its starting point (which will be the player's location)
    //to its destination (which will be the cursor location when the bullet is created).
    //Each time move is called it is checked if the bullet hits anything, if it does the
    //hitSomething method will call a damage function and the damage will be applied, so
    //this function sets this.live = false meaning the bullet is no longer live.
    //If the bullet isPenetrating that means it will not be set to 'dead' upon a collision with something
    //This allows penetrating bullets to travel through multiple targets and through world objects.
    move(modifier, environmentObjects, enemies){
        this.x += this.velocity*modifier*this.coeffX;
        this.y += this.velocity*modifier*this.coeffY;
        if(this.hitSomething(environmentObjects, enemies) && this.isPenetrating == false) {
            this.live = false;
        }
        if(this.x < 0 || this.x > 10000 || this.y < 0 || this.y > 5625) {
            this.live = false;
        }

    }
    //Checks if the bullet hit any of our objects that can be hit, if so that object loses HP
    //and the function returns true to indicate that the object was hit. If not, false is returned
    //and nothing is done.
    damageEnemy(enemyObject) {
        enemyObject.health -= this.damage;
    }

    damageEnvironment(environmentObject){
        environmentObject.health -= this.damage;
    }
    //Checks if we hit an environment object then checks if we hit an enemy. in either case it calls the
    //corresponding damage function and then returns true to indicate that something was hit, which tells move to set the
    //bullet's live value accordingly
    hitSomething(environmentObjects, enemies) {
        for(let i = 0; i < environmentObjects.length; i++) {
            if(Util.isCollision(this, environmentObjects[i]) && environmentObjects[i].isBlocking) {
                this.damageEnvironment(environmentObjects[i]);
                return true;
            }
        }
        for(let i = 0; i < enemies.length; i++) {
            if(Util.isCollision(this, enemies[i])){
                this.damageEnemy(enemies[i]);
                return true;
            }
        }
        return false;
    }

    draw(ctx, camera) {
        ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
    }
}

export default Bullet;
