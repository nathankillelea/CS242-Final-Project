/**
 * The Trap class is the parent for all trap objects.
 */
class Trap {

    /**
     * The constructor initializes the fields of the Trap.
     * @param x The x position of the Trap.
     * @param y The y position of the Trap.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * This function sets the position of the trap given x and y.
     * @param x The x position to be set.
     * @param y The y position to be set.
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * The loadImage function takes in a url and loads it as an Image. Once the image is loaded, this.isImageLoaded is
     * set to true. The height and width of the trap are set to the height and width of the image.
     * @param url The url that should be loaded.
     */
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

    loadSound(url) {
        this.isSoundLoaded = false;
        this.sound = new Audio();
        this.sound.onload = () => {
            this.isSoundLoaded = true;
        };
        this.sound.src = url;
    }

    /**
     * The draw function draws the image on the canvas at the x and y position of the Trap.
     * @param ctx The context of the canvas.
     * @param camera The camera object.
     */
    draw(ctx, camera) {
        ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
    }
}

export default Trap;
