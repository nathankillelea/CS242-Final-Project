import World from './World.js';
import Controller from './Controller.js';
import EnemyProjectile from "../Enemies/EnemyProjectile";
import MiniBoss from "../Enemies/MiniBoss";
import ProjectileEnemy from "../Enemies/ProjectileEnemy";
import Cursor from '../Cursor.js';
import Pistol from "../Weapons/Pistol";
import Sniper from "../Weapons/Sniper";
import AssaultRifle from '../Weapons/AssaultRifle'
import Bullet50cal from "../Weapons/Bullet50cal";
import Bullet556 from "../Weapons/Bullet556";
import Bullet9mm from "../Weapons/Bullet9mm";
import Rock from '../EnvironmentObjects/Rock';
import Crate from '../EnvironmentObjects/Crate';
import Bush from '../EnvironmentObjects/Bush';
import GroundWeapon from "../PickUps/GroundWeapon.js";
import GroundAssaultRifle from "../PickUps/GroundAssaultRifle.js";
import GroundSniper from "../PickUps/GroundSniper.js";

/**
 * The Game class is used to store the game state. It also allows for the game to be updated or drawn.
 */
class Game {

    /**
     * The constructor initializes the fields of the Game class. The gameState is set to 'Playing' initially.
     * @param canvas The canvas.
     * @param documentBody The body of the document.
     */
    constructor(canvas, documentBody) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.world = new World(canvas);
        this.controller = new Controller(documentBody);
        this.cursor = new Cursor();
        this.gameState = 'Playing';
    }

    /**
     * This function updates the game. If the gameState is 'Playing,' everything in the world is checked and updated.
     * If the gameState is 'Paused,' everything in the world remains still until the resume button is pressed. If the
     * gameState is 'Game Over,' everything in the world remains still until the Try Again button is pressed.
     * @param modifier The modifier to be used for movement.
     */
    update(modifier) {
        if(this.gameState === 'Playing') {
            if(this.world.player.health <= 0)
                this.gameState = 'Game Over';
            else if(this.controller.isKeyPressed(27))
                this.gameState = 'Paused';
            if (this.controller.isKeyPressed(87)) { // Player holding up
                if(this.world.player.y >= 0) {
                    this.world.player.y -= this.world.player.speed * modifier;
                    if(this.world.player.isCollisionWithEnvironmentObject(this.world.environmentObjects)) {
                        this.world.player.y += this.world.player.speed * modifier;
                    }
                }
            }
            if (this.controller.isKeyPressed(83)) { // Player holding down
                if(this.world.player.y + this.world.player.height <= 5625) {
                    this.world.player.y += this.world.player.speed * modifier;
                    if(this.world.player.isCollisionWithEnvironmentObject(this.world.environmentObjects)) {
                        this.world.player.y -= this.world.player.speed * modifier;
                    }
                }
            }
            if (this.controller.isKeyPressed(65)) { // Player holding left
                if(this.world.player.x >= 0) {
                    this.world.player.x -= this.world.player.speed * modifier;
                    if(this.world.player.isCollisionWithEnvironmentObject(this.world.environmentObjects)) {
                        this.world.player.x += this.world.player.speed * modifier;
                    }
                }
            }
            if (this.controller.isKeyPressed(68)) { // Player holding right
                if(this.world.player.x + this.world.player.width <= 10000) {
                    this.world.player.x += this.world.player.speed * modifier;
                    if(this.world.player.isCollisionWithEnvironmentObject(this.world.environmentObjects)) {
                        this.world.player.x -= this.world.player.speed * modifier;
                    }
                }
            }
            if(this.controller.isMousePressed()) {
                let wep = this.world.player.inventory[this.world.player.active_index];

                //Fire the correct bullet type for the currently equipped weapon.
                //This could be done more gracefully in the future
                if(wep instanceof Pistol) {
                    if(wep.cooldown <= 0){
                        this.world.bullets.push(new Bullet9mm(this.world.player.x + this.world.player.width/2, this.world.player.y, this.controller.mouse[0]+this.world.camera.x, this.controller.mouse[1]+this.world.camera.y));
                        wep.sound.play();
                        wep.sound.currentTime = 0;
                        wep.cooldown+=300;
                    }
                }
                else if(wep instanceof Sniper) {
                    if(wep.cooldown <= 0) {
                        this.world.bullets.push(new Bullet50cal(this.world.player.x + this.world.player.width/2, this.world.player.y, this.controller.mouse[0]+this.world.camera.x, this.controller.mouse[1]+this.world.camera.y));
                        wep.sound.play();
                        wep.sound.currentTime = 0;
                        wep.cooldown+=1200;
                    }
                }
                else if(wep instanceof AssaultRifle) {
                    if(wep.cooldown <= 0){
                        this.world.bullets.push(new Bullet556(this.world.player.x + this.world.player.width/2, this.world.player.y, this.controller.mouse[0]+this.world.camera.x, this.controller.mouse[1]+this.world.camera.y));
                        wep.sound.play();
                        wep.sound.currentTime = 0;
                        wep.cooldown+=100;
                    }
                }
            }
            //These controls change the active weapon with simple 1,2,3,etc controls for inventory
            if (this.controller.isKeyPressed(49)) { // Player pressed 1
                this.world.player.active_index = 0;
            }
            if (this.controller.isKeyPressed(50)) { // Player pressed 2
                this.world.player.active_index = 1;
            }
            if (this.controller.isKeyPressed(51)) { // Player pressed 3
                this.world.player.active_index = 2;
            }
            for(let i = this.world.bullets.length - 1; i >= 0; i--) {
                this.world.bullets[i].move(modifier, this.world.environmentObjects, this.world.enemies);
                if(this.world.bullets[i].live === false) {
                    this.world.bullets.splice(i, 1);
                }
            }
            for(let i = this.world.enemies.length - 1; i >= 0; i--) {
                this.world.enemies[i].move(this.world.player, modifier, this.world.environmentObjects);
                if(this.world.enemies[i].attackCooldown > 0)
                    this.world.enemies[i].attackCooldown -= 5;
                if(this.world.enemies[i] instanceof ProjectileEnemy || this.world.enemies[i] instanceof MiniBoss) {
                    if(this.world.enemies[i].shootCooldown > 0)
                        this.world.enemies[i].shootCooldown -= this.world.enemies[i].shootCooldownRate;
                    else {
                        this.world.enemyProjectiles.push(new EnemyProjectile(this.world.enemies[i].x + this.world.enemies[i].width/2, this.world.enemies[i].y + this.world.enemies[i].height/2, this.world.player.x + this.world.player.width/2, this.world.player.y + this.world.player.height/2));
                        this.world.enemies[i].shootCooldown += this.world.enemies[i].shootCooldownReset;
                    }
                }
                if(this.world.enemies[i].health <= 0)
                    this.world.enemies.splice(i, 1);
            }
            //Update weapon cooldowns
            for (let i = this.world.player.inventory.length - 1; i >= 0; i--) {
                let wep = this.world.player.inventory[i];
                if(wep.cooldown > 0){
                    wep.cooldown -=5;
                }
            }
            for(let i = this.world.enemyProjectiles.length - 1; i >= 0; i--) {
                this.world.enemyProjectiles[i].move(modifier, this.world.environmentObjects, this.world.player);
                if(this.world.enemyProjectiles[i].live === false) {
                    this.world.enemyProjectiles.splice(i, 1);
                }
            }
            for(let i = this.world.environmentObjects.length - 1; i >= 0; i--) {
                if(this.world.environmentObjects[i].health <= 0)
                    this.world.environmentObjects.splice(i, 1);
            }
            if(this.world.enemies.length === 0) {
                this.world.wave += 1;
                this.world.startWave();
            }
            this.world.camera.update();
        }
        else if(this.gameState === 'Game Over') {
            if(this.controller.isMousePressed()) {
                if(this.controller.mouse[0] > this.canvas.width/2 - 100 && this.controller.mouse[0] < (this.canvas.width/2 - 100+200)
                    && this.controller.mouse[1] > this.canvas.height/2 + 25 && this.controller.mouse[1] < this.canvas.height/2 + 25 + 100) {
                    this.world.start(this.canvas);
                    this.gameState = 'Playing';
                }
            }
        }
        else if(this.gameState === 'Paused') {
            if(this.controller.isMousePressed()) {
                if(this.controller.mouse[0] > this.canvas.width/2 - 100 && this.controller.mouse[0] < (this.canvas.width/2 - 100+200)
                    && this.controller.mouse[1] > this.canvas.height/2 + 25 && this.controller.mouse[1] < this.canvas.height/2 + 25 + 100) {
                    this.gameState = 'Playing';
                }
            }
        }
    }

    /**
     * This function draws everything in the world. If the gameState is 'Game Over,' a game over message is displayed,
     * if the gameState is 'Paused,' a pause message is displayed, and if the gameState is 'Playing,' all of the objects
     * in the world are drawn, along with the HUD, MiniMap, and cursor.
     */
    draw() {
        if(this.gameState === 'Game Over') {
            this.drawGameOver();
        }
        else if(this.gameState === 'Paused') {
            this.drawPauseScreen();
        }
        else {
            if(this.world.isBackgroundLoaded)
                this.world.drawBackground(this.ctx, this.canvas);

            this.drawWeapons();
            this.drawPickUps();

            if(this.world.player.isImageLoaded)
                this.world.player.draw(this.ctx, this.world.camera, this.controller.mouse);

            this.drawEnemies();
            this.drawEnemyProjectiles();
            this.drawBullets();
            this.drawEnvironmentObjects();
            this.drawMiniMap();
            this.drawHUD();
        }
        this.ctx.drawImage(this.cursor.image, this.controller.mouse[0] - this.cursor.image.width/2, this.controller.mouse[1] - this.cursor.image.height/2);
    }

    /**
     * This function draws a MiniMap that displays the player's location, enemy locations, and environment object locations.
     */
    drawMiniMap() {
        this.ctx.fillStyle = 'rgba(35, 177, 77, 0.2)';
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 3;
        this.ctx.fillRect(this.canvas.width - 425, 25, 400, 225);
        this.ctx.strokeRect(this.canvas.width - 425, 25, 400, 225);
        let xPercent = (this.world.player.x + this.world.player.width/2) / this.world.width;
        let yPercent = (this.world.player.y + this.world.player.height/2) / this.world.height;
        let xRelative = xPercent*400;
        let yRelative = yPercent*225;
        this.ctx.fillStyle = '#00FF00';
        this.ctx.beginPath();
        this.ctx.arc((this.canvas.width - 425) + xRelative, 25 + yRelative, 2.5, 0, 2*Math.PI);
        this.ctx.fill();
        for(let i = 0; i < this.world.environmentObjects.length; i++) {
            if(this.world.environmentObjects[i].isImageLoaded) {
                let xPercent = (this.world.environmentObjects[i].x + this.world.environmentObjects[i].width/2) / this.world.width;
                let yPercent = (this.world.environmentObjects[i].y + this.world.environmentObjects[i].height/2) / this.world.height;
                let xRelative = xPercent*400;
                let yRelative = yPercent*225;
                //ctx.drawImage(this.world.environmentObjects[i].image, (this.canvas.width - 425) + xRelative + this.world.environmentObjects[i].width/2, 25 + yRelative + this.world.environmentObjects[i].height/2, this.world.environmentObjects[i].width/25, this.world.environmentObjects[i].height/25);
                this.ctx.fillStyle = '#808080';
                this.ctx.beginPath();
                this.ctx.arc((this.canvas.width - 425) + xRelative, 25 + yRelative, 2.5, 0, 2*Math.PI);
                this.ctx.fill();
            }
        }
        for(let i = 0; i < this.world.enemies.length; i++) {
            if(this.world.enemies[i].isImageLoaded) {
                let xPercent = (this.world.enemies[i].x + this.world.enemies[i].width/2) / this.world.width;
                let yPercent = (this.world.enemies[i].y + this.world.enemies[i].height/2) / this.world.height;
                let xRelative = xPercent*400;
                let yRelative = yPercent*225;
                this.ctx.fillStyle = '#FF0000';
                this.ctx.beginPath();
                this.ctx.arc((this.canvas.width - 425) + xRelative, 25 + yRelative, 2.5, 0, 2*Math.PI);
                this.ctx.fill();
            }
        }
    }

    /**
     * This function draws the HUD which contains the player's health, the wave number, and the number of enemies left.
     * The current selected weapon is also displayed.
     */
    drawHUD() {
        this.ctx.font = "48px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = '#FFF';
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 1;
        this.ctx.fillText(this.world.player.health + " HP", this.canvas.width/2 - 290, 50);
        this.ctx.strokeText(this.world.player.health + " HP", this.canvas.width/2 - 290, 50);
        this.ctx.fillText("Wave " + this.world.wave, this.canvas.width/2, 50);
        this.ctx.strokeText("Wave " + this.world.wave, this.canvas.width/2, 50);
        this.ctx.fillText(this.world.enemies.length + " Enemies Left", this.canvas.width/2 + 350, 50);
        this.ctx.strokeText(this.world.enemies.length + " Enemies Left", this.canvas.width/2 + 350, 50);
        this.ctx.font = "48px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = '#FFF';
        this.ctx.fillText('Active Weapon: ' + this.world.player.inventory[this.world.player.active_index].name, this.canvas.width/2, 125);
        this.ctx.strokeText('Active Weapon: ' + this.world.player.inventory[this.world.player.active_index].name, this.canvas.width/2, 125);
        // remove later - debugging purposes
        // this.ctx.font = "24px sans-serif";
        // this.ctx.fillStyle = '#FFF';
        // this.ctx.fillText('PosX: ' + this.world.player.x, this.canvas.width/2 - 290, 175);
        // this.ctx.strokeText('PosY: ' + this.world.player.y, this.canvas.width/2 - 290, 250);
        // this.ctx.fillText('CameraX: ' + this.world.camera.x, this.canvas.width/2, 175);
        // this.ctx.strokeText('CameraY: ' + this.world.camera.y, this.canvas.width/2, 250);
        // this.ctx.fillText('mouseX: ' + this.controller.mouse[0], this.canvas.width/2 + 350, 175);
        // this.ctx.strokeText('mouseY: ' + this.controller.mouse[1], this.canvas.width/2 + 350, 250);
    }

    /**
     * This function draws the game over screen and a button to try again.
     */
    drawGameOver() {
        this.ctx.font = "128px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = '#FFF';
        this.ctx.lineWidth = 1;
        this.ctx.fillText("Game Over", this.canvas.width/2, this.canvas.height/2);
        this.ctx.fillStyle = '#000';
        this.ctx.strokeText("Game Over", this.canvas.width/2, this.canvas.height/2);
        this.ctx.fillStyle = '#FFF';
        this.ctx.fillRect(this.canvas.width/2 - 100, this.canvas.height/2 + 25, 200, 100);
        this.ctx.strokeRect(this.canvas.width/2 - 100, this.canvas.height/2 + 25, 200, 100);
        this.ctx.font = "24px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = '#000';
        this.ctx.fillText("Try again?", this.canvas.width/2 - 100 + 100, this.canvas.height/2 + 25 + 50);
    }

    /**
     * This function draws the pause screen and a resume button.
     */
    drawPauseScreen() {
        this.ctx.font = "128px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = '#FFF';
        this.ctx.lineWidth = 1;
        this.ctx.fillText("Paused", this.canvas.width/2, this.canvas.height/2);
        this.ctx.fillStyle = '#000';
        this.ctx.strokeText("Paused", this.canvas.width/2, this.canvas.height/2);
        this.ctx.fillStyle = '#FFF';
        this.ctx.fillRect(this.canvas.width/2 - 100, this.canvas.height/2 + 25, 200, 100);
        this.ctx.strokeRect(this.canvas.width/2 - 100, this.canvas.height/2 + 25, 200, 100);
        this.ctx.font = "24px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = '#000';
        this.ctx.fillText("Resume", this.canvas.width/2 - 100 + 100, this.canvas.height/2 + 25 + 50);
    }

    /**
     * This function draws all of the enemies in the world.
     */
    drawEnemies() {
        for(let i = 0; i < this.world.enemies.length; i++) {
            if(this.world.enemies[i].isImageLoaded) {
                this.world.enemies[i].draw(this.ctx, this.world.camera);
            }
        }
    }

    /**
     * This function draws all of the environment objects in the world.
     */
    drawEnvironmentObjects() {
        for(let i = 0; i < this.world.environmentObjects.length; i++) {
            if(this.world.environmentObjects[i].isImageLoaded) {
                this.world.environmentObjects[i].draw(this.ctx, this.world.camera);
            }
        }
    }

    /**
     * This function draws all of the weapons in the world.
     */
    drawWeapons() {
        for(let i = 0; i < this.world.groundWeapons.length; i++) {
            if(this.world.groundWeapons[i].isImageLoaded) {
                this.world.groundWeapons[i].draw(this.ctx, this.world.camera);
            }
        }
    }

    /**
     * This function draws all of the live bullets in the world.
     */
    drawBullets() {
        for(let i = 0; i < this.world.bullets.length; i++) {
            if(this.world.bullets[i].isImageLoaded && this.world.bullets[i].live) {
                this.world.bullets[i].draw(this.ctx, this.world.camera);
            }
        }
    }

    /**
     * This function draws all of the live enemy projectiles in the world.
     */
    drawEnemyProjectiles() {
        for(let i = 0; i < this.world.enemyProjectiles.length; i++) {
            if(this.world.enemyProjectiles[i].isImageLoaded && this.world.enemyProjectiles[i].live) {
                this.world.enemyProjectiles[i].draw(this.ctx, this.world.camera);
            }
        }
    }

    /**
     * This function draws all of the pick ups in the world.
     */
    drawPickUps() {
        for(let i = 0; i < this.world.pickUps.length; i++) {
            if(this.world.pickUps[i].isImageLoaded) {
                this.world.pickUps[i].draw(this.ctx, this.world.camera);
            }
        }
    }
}

export default Game;