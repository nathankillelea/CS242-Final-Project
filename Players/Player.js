import Pistol from '../Weapons/Pistol.js'
import Sniper from '../Weapons/Sniper.js'
import Util from '../Utilities/Util.js';

class Player {
  //this.x = x position
  //this.y = y position
  //this.health = player's life
  //this.speed = player's movespeed
  //this.loadImage() is a function to attach the image to the player.
  //The player has an array to hold his items and he will start with a pistol and sniper this week for easy testing
  //Next week items will be picked up by walking over them and as such there will need to be an addItem function
  constructor(x, y) {
      this.x = x;
      this.y = y;
      this.health = 100;
      this.speed = 256;
      this.loadImage();
      let start_pistol = new Pistol();
      let start_sniper = new Sniper();
      this.inventory = [start_pistol, start_sniper];
      this.active_index = 0;
  }

    isCollisionWithEnvironmentObject(environmentObjects) {
        for (let i = 0; i < environmentObjects.length; i++) {
            if (Util.isCollision(environmentObjects[i], this) && environmentObjects[i].isBlocking)
                return true;
        }
        return false;
    };

  loadImage() {
      this.isImageLoaded = false;
      this.image = new Image();
      this.image.onload = () => {
          this.isImageLoaded = true;
          this.width = this.image.width;
          this.height = this.image.height;
      };
      this.image.src = "Graphics/Player.png";
  }
    //Still not used yet, should be moved to each weapon or something
    /*shoot() {
      this.shootCooldown += 10;
    }*/
    draw(ctx, camera) {
        ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
    }
}

export default Player;
