/*
  Sources:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  https://stackoverflow.com/questions/4037212/html-canvas-full-screen?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  https://stackoverflow.com/questions/16919601/html5-canvas-world.camera-viewport-how-to-actally-do-it?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  http://jsfiddle.net/gfcarv/QKgHs/
 */

import Bullet9mm from './Weapons/Bullet9mm.js'
import Util from './Utilities/Util.js';
import World from './World/World.js';

// Create the canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

let world = new World(canvas);

// Handle controls
let keysPressed = {};
let mouse = [0,0];
let clicking = false;

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
	clicking = true;
	world.bullets.push(new Bullet9mm(world.player.x + world.player.width/2, world.player.y, e.clientX, e.clientY));
});

let isCollisionWithEnvironmentObject = () => {
    for (let i = 0; i < world.environmentObjects.length; i++) {
        if (Util.isCollision(world.environmentObjects[i], world.player) && world.environmentObjects[i].isBlocking) {
			return true;
        }
    }
    return false;
};

// Update game objects
let update = (modifier) => {
	if(world.player.health > 0) {
        if (87 in keysPressed) { // Player holding up
            world.player.y -= world.player.speed * modifier;
            if(isCollisionWithEnvironmentObject()) {
                world.player.y += world.player.speed * modifier;
            }
        }
        if (83 in keysPressed) { // Player holding down
            world.player.y += world.player.speed * modifier;
            if(isCollisionWithEnvironmentObject()) {
                world.player.y -= world.player.speed * modifier;
            }
        }
        if (65 in keysPressed) { // Player holding left
            world.player.x -= world.player.speed * modifier;
            if(isCollisionWithEnvironmentObject()) {
                world.player.x += world.player.speed * modifier;
            }
        }
        if (68 in keysPressed) { // Player holding right
            world.player.x += world.player.speed * modifier;
            if(isCollisionWithEnvironmentObject()) {
                world.player.x -= world.player.speed * modifier;
            }
        }
	}

	for(let i = world.enemies.length - 1; i >= 0; i--) {
		world.enemies[i].move(world.player, modifier, world.environmentObjects);
        if(world.enemies[i].attackCooldown > 0) {
            world.enemies[i].attackCooldown -= 5;
        }
		if(world.enemies[i].health <= 0) {
			world.enemies.splice(i, 1);
		}
	}
	for(let i = world.bullets.length - 1; i >= 0; i--) {
		world.bullets[i].move(modifier, world.environmentObjects, world.enemies);
        if(world.bullets[i].live == false){
            world.bullets.splice(i, 1);
        }
	}
	for(let i = world.environmentObjects.length - 1; i >= 0; i--) {
		if(world.environmentObjects[i].health <= 0) {
			world.environmentObjects.splice(i, 1);
		}
	}

	if(world.enemies.length === 0) {
		world.wave += 1;
		world.startWave();
	}

};

// Draw everything
let render = () => {
	if(world.player.health < 0){
        ctx.font = "128px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
	}
	else {
        if(world.isBackgroundLoaded) {
            world.drawBackground(ctx, canvas);
        }

        if(world.player.isImageLoaded) {
            world.player.draw(ctx, world.camera);
            ctx.font = "48px sans-serif";
            ctx.fillText(world.player.health + " HP", 10, 50);
        }

        for(let i = 0; i < world.enemies.length; i++) {
            if(world.enemies[i].isImageLoaded) {
                world.enemies[i].draw(ctx, world.camera);
            }
        }

        for(let i = 0; i < world.environmentObjects.length; i++) {
            if(world.environmentObjects[i].isImageLoaded) {
                world.environmentObjects[i].draw(ctx, world.camera);
            }
        }
	}

	//Render all the world.bullets at their locations and remove world.bullets that aren't live
	for(let i = 0; i < world.bullets.length; i++) {
		if(world.bullets[i].isImageLoaded && world.bullets[i].live) {
			world.bullets[i].draw(ctx, world.camera);
		}
	}
};

// The main game loop
let main = () => {
	let now = Date.now();
	let delta = now - then;

	update(delta / 1000);
	world.camera.update();
	console.log('world.camera.x = ' + world.camera.x + '\nworld.camera.y = ' + world.camera.y);
	// breaks when character/world.camera moves too far down or to the right
	// bullet ultra messed up
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame ||
	                    window.webkitRequestAnimationFrame ||
	                    window.msRequestAnimationFrame ||
	                    window.mozRequestAnimationFrame;

// Let's play this game!
let then = Date.now();
main();
