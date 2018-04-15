import Rock from "../EnvironmentObjects/Rock";
import Bush from "../EnvironmentObjects/Bush";
import Crate from "../EnvironmentObjects/Crate";
import TankEnemy from "../Enemies/TankEnemy";
import RegularEnemy from "../Enemies/RegularEnemy";
import LightEnemy from "../Enemies/LightEnemy";
import Player from "../Players/Player";
import Camera from "../Players/Camera";

/**
 * The World class holds the information related to the world.
 */
class World {

    /**
     * The constructor initializes the field of the world and loads the background.
     * @param canvas The canvas.
     */
    constructor(canvas) {
        this.start(canvas);
        this.loadBackground();
    }

    /**
     * The start function initializes the fields of the World. The player is made and the camera is attached to the player.
     * A call is to initialize the environment and start the wave.
     * @param canvas The canvas.
     */
    start(canvas) {
        this.player = new Player(canvas.width/2, canvas.height/2);
        this.camera = new Camera(0, 0, canvas.width, canvas.height, 10000, 5625);
        this.camera.follow(this.player, canvas.width/2, canvas.height/2);
        this.enemies = [];
        this.environmentObjects = [];
        this.bullets = [];
        this.wave = 1;
        this.initializeEnvironment();
        this.startWave();
    }

    /**
     * This function initializes the environment by pushing environment objects onto the environmentObjects array.
     */
    initializeEnvironment() {
        this.environmentObjects.push(new Crate(200, 400));
        this.environmentObjects.push(new Bush(20, 100));
        this.environmentObjects.push(new Rock(900, 20));
        this.environmentObjects.push(new Rock(9500, 20));
        this.environmentObjects.push(new Rock(20, 5250));
    }

    /**
     * This function starts the wave by pushing enemies onto the enemies array.
     */
    startWave() {
        this.enemies.push(new LightEnemy(500, 0));
        this.enemies.push(new RegularEnemy(300, 0));
        this.enemies.push(new TankEnemy(450, 0));
    }

    /**
     * The loadBackground function loads the background image. Once the image is loaded, this.isBackgroundLoaded is
     * set to true.
     */
    loadBackground() {
        this.isBackgroundLoaded = false;
        this.background = new Image();
        this.background.onload = () => {
            this.isBackgroundLoaded = true;
        };
        this.background.src = "Graphics/Background.png";
    }

    /**
     * The drawBackground function draws the background of the world.
     * @param ctx The context of the canvas.
     * @param canvas The canvas.
     */
    drawBackground(ctx, canvas) {
        let sWidth, sHeight;
        sWidth = canvas.width;
        sHeight = canvas.height;

        if(this.background.width - this.camera.x < canvas.width)
            sWidth = this.background.width - this.camera.x;
        if(this.background.height - this.camera.y < canvas.height)
            sHeight = this.background.height - this.camera.y;

        ctx.drawImage(this.background, this.camera.x, this.camera.y, sWidth, sHeight, 0, 0, sWidth, sHeight);
    };
}

export default World;