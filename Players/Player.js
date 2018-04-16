class Player {
  constructor(x, y) {
      this.x = x;
      this.y = y;
      this.health = 100;
      this.speed = 256;
      this.loadImage();
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
    shoot() {
      this.shootCooldown += 10;
    }
    draw(ctx, camera) {
        ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
    }
}

export default Player;
