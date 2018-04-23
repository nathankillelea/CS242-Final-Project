class GroundWeapon {

    constructor(x, y, weapon) {
        this.x = x;
        this.y = y;
        this.weapon = weapon;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
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
    draw(ctx, camera) {
        ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
    }
}
export default GroundWeapon;
