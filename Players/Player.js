import Pistol from '../Weapons/Pistol.js'
import Sniper from '../Weapons/Sniper.js'
import Shotgun from '../Weapons/Shotgun.js'
import AssaultRifle from '../Weapons/AssaultRifle.js'
import Util from '../Utilities/Util.js';

class Player {
  //this.x = x position
  //this.y = y position
  //this.health = player's life
  //this.speed = player's movespeed
  //this.inventory = array to hold weapon objects, player starts with a pistol.
  //this.loadImage() is a function to attach the image to the player.
  //this.stamina = how many seconds the user can sprint. increases when resting and decreases when sprintnig
  //this.resting = boolean to tell the movement function whether or not the player is allowed to sprint
  //The player has an array to hold his items and he will start with a pistol and sniper this week for easy testing
  //Next week items will be picked up by walking over them and as such there will need to be an addItem function
  constructor(x, y) {
      this.x = x;
      this.y = y;
      this.health = 100;
      this.speed = 256;
      this.loadImage();
      this.loadDamageTakenSound('Audio/DamageTaken.mp3');
      let start_pistol = new Pistol();
      let start_sniper = new Sniper();
      let start_rifle = new AssaultRifle();
      let start_shotgun = new Shotgun();
      this.stamina = 7;
      this.resting = false;
      this.inventory = [start_pistol];
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

  loadDamageTakenSound(url) {
      this.isSound1Loaded = false;
      this.damageTakenSound = new Audio();
      this.damageTakenSound.onload = () => {
          this.isSound1Loaded = true;
      };
      this.damageTakenSound.src = url;
  }
    //Save the original canvas settings.
    //Translate canvas top left corner to be the center of the player's position so that rotation is done about the center.
    //Calculate the angle of rotation with trig using the cursor and user positions.
    //Rotate the canvas and draw the image slightly offset so that the center aligns with the corner of the canvas.
    //Restore the original canvas settings.
    draw(ctx, camera, mouse) {
        ctx.save();
        ctx.translate((this.x+this.width/2) - camera.x, (this.y+this.height/2) - camera.y);
        let angle = Math.atan2(mouse[1] - (this.y+this.height/2-camera.y), mouse[0] - (this.x+this.width/2-camera.x));
        ctx.rotate(angle+(Math.PI/2));
        ctx.drawImage(this.image, 0-this.width/2, 0-this.height/2);
        ctx.restore();
    }
}

export default Player;
