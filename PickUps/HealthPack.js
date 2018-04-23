class HealthPack {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.healing = 100;
        this.loadImage();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    loadImage() {
        this.isImageLoaded = false;
        this.image = new Image();
        this.image.onload = () => {
            this.isImageLoaded = true;
            this.width = this.image.width;
            this.height = this.image.height;
        };
        this.image.src = 'Graphics/HealthPack.png';
    }

    draw(ctx, camera) {
        ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
    }
}

export default HealthPack;
