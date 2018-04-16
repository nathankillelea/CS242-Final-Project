/**
 * The EnvironmentObject class is the parent for all environment objects.
 */
class EnvironmentObject {

    /**
     * The constructor initializes the fields of the EnvironmentObject.
     * @param x The x position of the EnvironmentObject.
     * @param y The y position of the EnvironmentObject.
     * @param health The health of the EnvironmentObject.
     * @param isBlocking Whether the EnvironmentObject can be walked through.
     */
    constructor(x, y, health, isBlocking) {
        this.x = x;
        this.y = y;
        this.health = health;
        this.isBlocking = isBlocking;
    }

    /**
     * The loadImage function takes in a url and loads it as an Image. Once the image is loaded, this.isImageLoaded is
     * set to true. The height and width of the EnvironmentObject are set to the height and width of the image.
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

    /**
     * The draw function draws the image on the canvas at the x and y position of the EnvironmentObject.
     * @param ctx The context of the canvas.
     * @param camera The camera object.
     */
    draw(ctx, camera) {
        ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
    }
}

export default EnvironmentObject;