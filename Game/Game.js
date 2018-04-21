import World from './World.js';
import Controller from './Controller.js';
import EnemyProjectile from "../Enemies/EnemyProjectile";
import MiniBoss from "../Enemies/MiniBoss";
import ProjectileEnemy from "../Enemies/ProjectileEnemy";
import Cursor from '../Cursor.js';
import Pistol from "../Weapons/Pistol";
import Sniper from "../Weapons/Sniper";
import Bullet50cal from "../Weapons/Bullet50cal";
import Bullet9mm from "../Weapons/Bullet9mm";

class Game {

    constructor(canvas, documentBody) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.world = new World(canvas);
        this.controller = new Controller(documentBody);
        this.cursor = new Cursor();
    }

    update(modifier) {
        if(this.world.player.health > 0) {
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
                let mouse = this.controller.getMousePosition();

                //Fire the correct bullet type for the currently equipped weapon.
                //This could be done more gracefully in the future
                if(wep instanceof Pistol)
                    this.world.bullets.push(new Bullet9mm(this.world.player.x + this.world.player.width/2, this.world.player.y, mouse[0]+this.world.camera.x, mouse[1]+this.world.camera.y));
                else if(wep instanceof Sniper)
                    this.world.bullets.push(new Bullet50cal(this.world.player.x + this.world.player.width/2, this.world.player.y, mouse[0]+this.world.camera.x, mouse[1]+this.world.camera.y));
                //The bounding box in this if statement tells if the mouse was clicked inside the try again button,
                //and if so the this.world is restarted.
                if(this.world.player.health < 0) {

                }
            }
            //These controls change the active weapon with simple 1,2,3,etc controls for inventory
            if (this.controller.isKeyPressed(49)) { // Player pressed 1
                this.world.player.active_index = 0;
            }
            if (this.controller.isKeyPressed(50)) { // Player pressed 2
                this.world.player.active_index = 1;
            }
            for(let i = this.world.bullets.length - 1; i >= 0; i--) {
                this.world.bullets[i].move(modifier, this.world.environmentObjects, this.world.enemies);
                if(this.world.bullets[i].live === false) {
                    this.world.bullets.splice(i, 1);
                }
            }
        }
        else {
            if(this.controller.isMousePressed()) {
                let mouse = this.controller.getMousePosition();

                if(mouse[0] > this.canvas.width/2 - 100 && mouse[0] < (this.canvas.width/2 - 100+200)
                    && mouse[1] > this.canvas.height/2 + 25 && mouse[1] < this.canvas.height/2 + 25 + 100) {
                    this.world.start(this.canvas);
                }
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

    draw() {
        if(this.world.player.health < 0) {
            this.ctx.font = "128px sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillStyle='#FFF';
            this.ctx.fillText("Game Over", this.canvas.width/2, this.canvas.height/2);
            this.ctx.fillStyle='#000';
            this.ctx.strokeText("Game Over", this.canvas.width/2, this.canvas.height/2);
            this.ctx.fillStyle='#FFF';
            this.ctx.fillRect(this.canvas.width/2 - 100, this.canvas.height/2 + 25, 200, 100);
            this.ctx.strokeRect(this.canvas.width/2 - 100, this.canvas.height/2 + 25, 200, 100);
            this.ctx.font = "24px sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillStyle='#000';
            this.ctx.fillText("Try again?", this.canvas.width/2 - 100 + 100, this.canvas.height/2 + 25 + 50);
        }
        else {
            if(this.world.isBackgroundLoaded) {
                this.world.drawBackground(this.ctx, this.canvas);
            }
            for(let i = 0; i < this.world.enemies.length; i++) {
                if(this.world.enemies[i].isImageLoaded) {
                    this.world.enemies[i].draw(this.ctx, this.world.camera);
                }
            }
            for(let i = 0; i < this.world.environmentObjects.length; i++) {
                if(this.world.environmentObjects[i].isImageLoaded) {
                    this.world.environmentObjects[i].draw(this.ctx, this.world.camera);
                }
            }

            for(let i = 0; i < this.world.bullets.length; i++) {
                if(this.world.bullets[i].isImageLoaded && this.world.bullets[i].live) {
                    this.world.bullets[i].draw(this.ctx, this.world.camera);
                }
            }
            for(let i = 0; i < this.world.enemyProjectiles.length; i++) {
                if(this.world.enemyProjectiles[i].isImageLoaded && this.world.enemyProjectiles[i].live) {
                    this.world.enemyProjectiles[i].draw(this.ctx, this.world.camera);
                }
            }

            if(this.world.player.isImageLoaded) {
                this.world.player.draw(this.ctx, this.world.camera);
                this.ctx.font = "48px sans-serif";
                this.ctx.textAlign = "center";
                this.ctx.fillStyle='#FFF';
                this.ctx.fillText(this.world.player.health + " HP", this.canvas.width/2 - 290, 50);
                this.ctx.strokeText(this.world.player.health + " HP", this.canvas.width/2 - 290, 50);
                this.ctx.fillText("Wave " + this.world.wave, this.canvas.width/2, 50);
                this.ctx.strokeText("Wave " + this.world.wave, this.canvas.width/2, 50);
                this.ctx.fillText(this.world.enemies.length + " Enemies Left", this.canvas.width/2 + 350, 50);
                this.ctx.strokeText(this.world.enemies.length + " Enemies Left", this.canvas.width/2 + 350, 50);
                this.ctx.font = "48px sans-serif";
                this.ctx.textAlign = "center";
                this.ctx.fillStyle='#FFF';
                this.ctx.fillText('Active Weapon: ' + this.world.player.inventory[this.world.player.active_index].name, this.canvas.width/2, 125);
                this.ctx.strokeText('Active Weapon: ' + this.world.player.inventory[this.world.player.active_index].name, this.canvas.width/2, 125);
            }
        }
        let mouse = this.controller.getMousePosition();
        this.ctx.drawImage(this.cursor.image, mouse[0] - this.cursor.image.width/2, mouse[1] - this.cursor.image.height/2);
    }
}

export default Game;