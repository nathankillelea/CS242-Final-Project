class Cursor {
  constructor() {
      this.loadImage();
  }

    loadImage() {
        this.isImageLoaded = false;
        this.image = new Image();
        this.image.onload = () => {
            this.isImageLoaded = true;
        };
        this.image.src = "Graphics/crosshair.png";
    }
}
export default Cursor;
