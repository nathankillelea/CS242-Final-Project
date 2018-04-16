/*
  Sources:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  https://stackoverflow.com/questions/4037212/html-canvas-full-screen?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  https://stackoverflow.com/questions/16919601/html5-canvas-world.camera-viewport-how-to-actally-do-it?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  http://jsfiddle.net/gfcarv/QKgHs/
 */

import Bullet9mm from './Weapons/Bullet9mm.js';
import Bullet50cal from './Weapons/Bullet50cal.js';
import Sniper from './Weapons/Sniper.js';
import Pistol from './Weapons/Pistol.js';
import Util from './Utilities/Util.js';
import World from './World/World.js';
import Cursor from './Cursor.js';
import ProjectileEnemy from './Enemies/ProjectileEnemy.js';
import EnemyProjectile from "./Enemies/EnemyProjectile";
import MiniBoss from './Enemies/MiniBoss';

// Create the canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

let world = new World(canvas);

//create crosshair
let cursor = new Cursor();

// Handle controls
let keysPressed = {};
let mouse = [0,0];
//This variable would be used to tell when click is being held
//Which will be needed when automatic weapons are added
//let clicking = false;

//These event listeners simply catch any basic inputs and store them in global variables
//that later functions can check to handle movement and inputs
addEventListener("keydown", (e) => {
    keysPressed[e.keyCode] = true;
}, false);

addEventListener("keyup", (e) => {
    delete keysPressed[e.keyCode];
}, false);

addEventListener('mousemove', (e) => {
    mouse[0] = e.clientX;
    mouse[1] = e.clientY;
}, false);

addEventListener('mousedown', (e) => {
    //clicking = true;
    let wep = world.player.inventory[world.player.active_index];

    //Fire the correct bullet type for the currently equipped weapon.
    //This could be done more gracefully in the future
    if(wep instanceof Pistol )
      world.bullets.push(new Bullet9mm(world.player.x + world.player.width/2, world.player.y, e.clientX+world.camera.x, e.clientY+world.camera.y));
    else if(wep instanceof Sniper){
      world.bullets.push(new Bullet50cal(world.player.x + world.player.width/2, world.player.y, e.clientX+world.camera.x, e.clientY+world.camera.y));
    }
    //The bounding box in this if statement tells if the mouse was clicked inside the try again button,
    //and if so the world is restarted.
    if(world.player.health < 0) {
        if(e.clientX > canvas.width/2 - 100 && e.clientX < (canvas.width/2 - 100+200)
            && e.clientY > canvas.height/2 + 25 && e.clientY < canvas.height/2 + 25 + 100) {
            world.start(canvas);
        }
    }
});

let isCollisionWithEnvironmentObject = () => {
    for (let i = 0; i < world.environmentObjects.length; i++) {
        if (Util.isCollision(world.environmentObjects[i], world.player) && world.environmentObjects[i].isBlocking)
            return true;
    }
    return false;
};

// Update game objects
let update = (modifier) => {
    if(world.player.health > 0) {
      //These statements control movement with simple WASD for each direction
        if (87 in keysPressed) { // Player holding up
            if(world.player.y >= 0) {
                world.player.y -= world.player.speed * modifier;
                if(isCollisionWithEnvironmentObject()) {
                    world.player.y += world.player.speed * modifier;
                }
            }
        }
        if (83 in keysPressed) { // Player holding down
            if(world.player.y + world.player.height <= 5625) {
                world.player.y += world.player.speed * modifier;
                if(isCollisionWithEnvironmentObject()) {
                    world.player.y -= world.player.speed * modifier;
                }
            }
        }
        if (65 in keysPressed) { // Player holding left
            if(world.player.x >= 0) {
                world.player.x -= world.player.speed * modifier;
                if(isCollisionWithEnvironmentObject()) {
                    world.player.x += world.player.speed * modifier;
                }
            }
        }
        if (68 in keysPressed) { // Player holding right
            if(world.player.x + world.player.width <= 10000) {
                world.player.x += world.player.speed * modifier;
                if(isCollisionWithEnvironmentObject()) {
                    world.player.x -= world.player.speed * modifier;
                }
            }
        }
        //These controls change the active weapon with simple 1,2,3,etc controls for inventory
        if (49 in keysPressed) { // Player pressed 1
            world.player.active_index = 0;
        }
        if (50 in keysPressed) { // Player pressed 2
            world.player.active_index = 1;
        }
        for(let i = world.bullets.length - 1; i >= 0; i--) {
            world.bullets[i].move(modifier, world.environmentObjects, world.enemies);
            if(world.bullets[i].live === false) {
                world.bullets.splice(i, 1);
            }
        }
    }
    for(let i = world.enemies.length - 1; i >= 0; i--) {
        world.enemies[i].move(world.player, modifier, world.environmentObjects);
        if(world.enemies[i].attackCooldown > 0)
            world.enemies[i].attackCooldown -= 5;
        if(world.enemies[i] instanceof ProjectileEnemy || world.enemies[i] instanceof MiniBoss) {
        	if(world.enemies[i].shootCooldown > 0)
        		world.enemies[i].shootCooldown -= world.enemies[i].shootCooldownRate;
        	else {
				world.enemyProjectiles.push(new EnemyProjectile(world.enemies[i].x + world.enemies[i].width/2, world.enemies[i].y + world.enemies[i].height/2, world.player.x + world.player.width/2, world.player.y + world.player.height/2));
        		world.enemies[i].shootCooldown += world.enemies[i].shootCooldownReset;
			}
		}
        if(world.enemies[i].health <= 0)
            world.enemies.splice(i, 1);
    }

    for(let i = world.enemyProjectiles.length - 1; i >= 0; i--) {
        world.enemyProjectiles[i].move(modifier, world.environmentObjects, world.player);
        if(world.enemyProjectiles[i].live === false) {
            world.enemyProjectiles.splice(i, 1);
        }
    }

    for(let i = world.environmentObjects.length - 1; i >= 0; i--) {
        if(world.environmentObjects[i].health <= 0)
            world.environmentObjects.splice(i, 1);
    }

    if(world.enemies.length === 0) {
        world.wave += 1;
        world.startWave();
    }

};

// This loop will draw all images and text
let render = () => {
    //When player health is < 0 the game is over so we must display the "Game Over" text and add a Try Again button
    if(world.player.health < 0) {
        ctx.font = "128px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle='#FFF';
        ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
        ctx.fillStyle='#000';
        ctx.strokeText("Game Over", canvas.width/2, canvas.height/2);
        ctx.fillStyle='#FFF';
        ctx.fillRect(canvas.width/2 - 100, canvas.height/2 + 25, 200, 100);
        ctx.strokeRect(canvas.width/2 - 100, canvas.height/2 + 25, 200, 100);
        ctx.font = "24px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle='#000';
        ctx.fillText("Try again?", canvas.width/2 - 100 + 100, canvas.height/2 + 25 + 50);
    }
    else {
        //Render the Background
        if(world.isBackgroundLoaded) {
            world.drawBackground(ctx, canvas);
        }
        //Render all enemies in the world
        for(let i = 0; i < world.enemies.length; i++) {
            if(world.enemies[i].isImageLoaded) {
                world.enemies[i].draw(ctx, world.camera);
            }
        }
        //Render all environment objects that exist in the world
        for(let i = 0; i < world.environmentObjects.length; i++) {
            if(world.environmentObjects[i].isImageLoaded) {
                world.environmentObjects[i].draw(ctx, world.camera);
            }
        }

        //Render all the world.bullets at their locations and remove world.bullets that aren't live
        for(let i = 0; i < world.bullets.length; i++) {
            if(world.bullets[i].isImageLoaded && world.bullets[i].live) {
                world.bullets[i].draw(ctx, world.camera);
            }
        }
        //Render all the enemy projectiles just like bullets
        for(let i = 0; i < world.enemyProjectiles.length; i++) {
            if(world.enemyProjectiles[i].isImageLoaded && world.enemyProjectiles[i].live) {
                world.enemyProjectiles[i].draw(ctx, world.camera);
            }
        }

        if(world.player.isImageLoaded) {
            world.player.draw(ctx, world.camera);
            ctx.font = "48px sans-serif";
            ctx.textAlign = "center";
            ctx.fillStyle='#FFF';
            ctx.fillText(world.player.health + " HP", canvas.width/2 - 290, 50);
            ctx.strokeText(world.player.health + " HP", canvas.width/2 - 290, 50);
            ctx.fillText("Wave " + world.wave, canvas.width/2, 50);
            ctx.strokeText("Wave " + world.wave, canvas.width/2, 50);
            ctx.fillText(world.enemies.length + " Enemies Left", canvas.width/2 + 350, 50);
            ctx.strokeText(world.enemies.length + " Enemies Left", canvas.width/2 + 350, 50);
        }
        //This text displays the active weapon to the player (could be positioned better later)
        ctx.font = "48px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle='#FFF';
        ctx.fillText('Active Weapon: ' + world.player.inventory[world.player.active_index].name, canvas.width/2 - 290, 150);
        ctx.strokeText('Active Weapon: ' + world.player.inventory[world.player.active_index].name, canvas.width/2 - 290, 150);
    }
    ctx.drawImage(cursor.image, mouse[0] - cursor.image.width/2, mouse[1] - cursor.image.height/2);
};

// The main game loop
let main = () => {
    let now = Date.now();
    let delta = now - then;

    update(delta / 1000);
    world.camera.update();
    console.log('world.camera.x = ' + world.camera.x + '\nworld.camera.y = ' + world.camera.y);
    render();

    then = now;

    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.mozRequestAnimationFrame;

let then = Date.now();
main();
