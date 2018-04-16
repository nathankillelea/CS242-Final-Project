import Util from '../Utilities/Util.js';
import Crate from '../EnvironmentObjects/Crate.js';
import Bush from '../EnvironmentObjects/Bush.js';
import Rock from '../EnvironmentObjects/Rock.js';

class Bullet{
  constructor(velocity, damage, x, y, destX, destY) {
      this.velocity = velocity;
      this.damage = damage;
      this.x = x;
      this.y = y;
      this.destX = destX;
      this.destY = destY;
      this.cooldown = 0;
      this.live = true;
      let diffX = this.destX - this.x;
      let diffY = this.destY - this.y;
      let bigger = 1
      if(Math.abs(diffX) > Math.abs(diffY)){
        bigger = diffX
        this.coeffX = diffX / Math.abs(diffX)
        this.coeffY = diffY / Math.abs(diffX)
      }
      else {
        bigger = diffY
        this.coeffY = diffY / Math.abs(diffY)
        this.coeffX = diffX / Math.abs(diffY)
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
  //hitSoemthing method will call a damage function and the damage will be applied, so
  //this function sets this.live = false meaning the bullet is no longer live.
  move(modifier, environmentObjects, enemies){
    //let length = Math.sqrt(diffX * diffX + diffY * diffY);
    this.x += this.velocity*modifier*this.coeffX;
    this.y += this.velocity*modifier*this.coeffY;
    if(this.hitSomething(environmentObjects, enemies)) {
      this.live = false;
    }
    if(this.x < 0 || this.x > 10000 || this.y < 0 || this.y > 5625){
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
