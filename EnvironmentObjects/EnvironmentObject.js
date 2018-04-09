class EnvironmentObject {

    constructor(x, y, health, isBlocking) {
        this.x = x;
        this.y = y;
        this.health = health;
        this.isBlocking = isBlocking;
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

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}

export default EnvironmentObject;