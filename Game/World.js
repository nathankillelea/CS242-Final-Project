import Rock from "../EnvironmentObjects/Rock";
import Bush from "../EnvironmentObjects/Bush";
import Crate from "../EnvironmentObjects/Crate";
import TankEnemy from "../Enemies/TankEnemy";
import RegularEnemy from "../Enemies/RegularEnemy";
import LightEnemy from "../Enemies/LightEnemy";
import ProjectileEnemy from "../Enemies/ProjectileEnemy";
import MiniBoss from '../Enemies/MiniBoss';
import Player from "../Players/Player";
import Camera from "../Players/Camera";
import Util from "../Utilities/Util";

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
        this.environmentObjects = [];
        this.enemies = [];
        this.bullets = [];
        this.enemyProjectiles = [];
        this.initializeEnvironment();
        this.player = new Player(canvas.width/2, canvas.height/2);
        this.camera = new Camera(0, 0, canvas.width, canvas.height, 10000, 5625);
        this.camera.follow(this.player, canvas.width/2, canvas.height/2);
        this.wave = 1;
        this.startWave();
    }

    /**
     * This function initializes the environment by pushing environment objects onto the environmentObjects array.
     */
    initializeEnvironment() {
        let crateCap = 20;
        let bushCap = 30;
        let rockCap = 30;

        for(let i = 0; i < crateCap; i++)
            this.environmentObjects.push(new Crate(Util.randomIntFromInterval(250, 9750), Util.randomIntFromInterval(250, 5375)));
        for(let i = 0; i < bushCap; i++)
            this.environmentObjects.push(new Bush(Util.randomIntFromInterval(250, 9750), Util.randomIntFromInterval(250, 5375)));
        for(let i = 0; i < rockCap; i++)
            this.environmentObjects.push(new Rock(Util.randomIntFromInterval(250, 9750), Util.randomIntFromInterval(250, 5375)));

        let collisionFlag = true;
        while(collisionFlag === true) {
            let i = Util.areAnyCollisionsInSameArray(this.environmentObjects);
            if(i === -1)
                collisionFlag = false;
            else
                this.environmentObjects[i].setPosition(Util.randomIntFromInterval(250, 9750), Util.randomIntFromInterval(250, 5375));
        }
    }

    /**
     * This function starts the wave by pushing enemies onto the enemies array.
     */
    startWave() {
        let lightEnemyCap = this.wave * 10;
        let regularEnemyCap = this.wave * 10;
        let tankEnemyCap = this.wave * 5;
        let projectileEnemyCap = Math.floor(this.wave/2)*5;
        let miniBossCap = Math.floor(this.wave/5);

        for(let i = 0; i < lightEnemyCap; i++)
            this.enemies.push(new LightEnemy(Util.randomIntFromInterval(250, 9750), Util.randomIntFromInterval(250, 5375)));
        for(let i = 0; i < regularEnemyCap; i++)
            this.enemies.push(new RegularEnemy(Util.randomIntFromInterval(250, 9750), Util.randomIntFromInterval(250, 5375)));
        for(let i = 0; i < tankEnemyCap; i++)
            this.enemies.push(new TankEnemy(Util.randomIntFromInterval(250, 9750), Util.randomIntFromInterval(250, 5375)));
        for(let i = 0; i < projectileEnemyCap; i++)
            this.enemies.push(new ProjectileEnemy(Util.randomIntFromInterval(250, 9750), Util.randomIntFromInterval(250, 5375)));
        for(let i = 0; i < miniBossCap; i++)
            this.enemies.push(new MiniBoss(Util.randomIntFromInterval(250, 9750), Util.randomIntFromInterval(250, 5375)));

        let collisionFlag = true;
        while(collisionFlag === true) {
            let i = Util.areAnyCollisions(this.enemies, this.environmentObjects);
            if (i === -1)
                collisionFlag = false;
            else
                this.enemies[i].setPosition(Util.randomIntFromInterval(250, 9750), Util.randomIntFromInterval(250, 5375));
        }
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
            this.width = this.background.width;
            this.height = this.background.height;
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
