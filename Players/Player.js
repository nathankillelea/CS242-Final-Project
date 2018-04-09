class Player {
  constructor() {
      this.health = 100;
      this.speed = 256;
      this.x = 250;
      this.y = 250;
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
}

export default Player;