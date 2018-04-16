import Pistol from '../Weapons/Pistol.js'
import Sniper from '../Weapons/Sniper.js'
class Player {
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
