/*
  Sources:
  http://jsfiddle.net/gfcarv/QKgHs/
*/

/**
 * The Camera class is used to follow the player's movement.
 */
class Camera {

    /**
     * The constructor initializes the fields of the Camera.
     * @param x The x position of the Camera.
     * @param y The y position of the Camera.
     * @param canvasWidth The width of the canvas.
     * @param canvasHeight The height of the canvas.
     * @param worldWidth The width of the world.
     * @param worldHeight The height of the world.
     */
    constructor(x, y, canvasWidth, canvasHeight, worldWidth, worldHeight) {
        this.x = x;
        this.y = y;
        this.xDeadZone = 0;
        this.yDeadZone = 0;
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
    }

    /**
     * This function is used to set who the camera is following.
     * @param player The player that the camera should follow.
     * @param xDeadZone
     * @param yDeadZone
     */
    follow(player, xDeadZone, yDeadZone) {
        this.following = player;
        this.xDeadZone = xDeadZone;
        this.yDeadZone = yDeadZone;
    }

    /**
     * This function updates the camera's x and y position.
     */
    update() {
        if(this.following != null) {
            if(this.following.x - this.x + this.xDeadZone > this.width)
                this.x = this.following.x - (this.width - this.xDeadZone);
            else if(this.following.x - this.xDeadZone < this.x)
                this.x = this.following.x - this.xDeadZone;
            if(this.following.y - this.y + this.yDeadZone > this.height)
                this.y = this.following.y - (this.height - this.yDeadZone);
            else if(this.following.y - this.yDeadZone < this.y)
                this.y = this.following.y - this.yDeadZone;
        }
        if(this.x < 0)
            this.x = 0;
        if(this.y < 0)
            this.y = 0;
        if(this.x + this.width > this.worldWidth)
            this.x = this.worldWidth - this.width;
        if(this.y + this.height > this.worldHeight)
            this.y = this.worldHeight - this.height;
    }
}

export default Camera;