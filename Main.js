//http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
import Player from './Players/Player.js';
import LightEnemy from './Enemies/LightEnemy.js';
import RegularEnemy from './Enemies/RegularEnemy.js';
import TankEnemy from './Enemies/TankEnemy.js';
import Crate from './EnvironmentObjects/Crate.js';
import Bush from './EnvironmentObjects/Bush.js';
import Rock from './EnvironmentObjects/Rock.js';
import Util from './Utilities/Util.js';

// Create the canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 720;
document.body.appendChild(canvas);

// Background image
let bgReady = false;
let bgImage = new Image();
bgImage.onload = () => {
	bgReady = true;
};
bgImage.src = "Graphics/Background.png";

// Game objects
let hero = new Player();
let enemies = [];
let environmentObjects = [];
enemies.push(new LightEnemy(500, 0));
enemies.push(new RegularEnemy(300, 0));
enemies.push(new TankEnemy(450, 0));
environmentObjects.push(new Crate(200, 400));
environmentObjects.push(new Bush(20, 100));
environmentObjects.push(new Rock(900, 20));

// Handle keyboard controls
let keysPressed = {};

addEventListener("keydown", (e) => {
	keysPressed[e.keyCode] = true;
}, false);

addEventListener("keyup", (e) => {
	delete keysPressed[e.keyCode];
}, false);


let reset = () => {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
};

let isCollisionWithEnvironmentObject = () => {
    for (let i = 0; i < environmentObjects.length; i++) {
        if (Util.isCollision(environmentObjects[i], hero) && environmentObjects[i].isBlocking) {
			return true;
        }
    }
    return false;
};

// Update game objects
let update = (modifier) => {
	if (87 in keysPressed) { // Player holding up
		hero.y -= hero.speed * modifier;
		if(isCollisionWithEnvironmentObject()) {
            hero.y += hero.speed * modifier;
        }
	}
	if (83 in keysPressed) { // Player holding down
		hero.y += hero.speed * modifier;
        if(isCollisionWithEnvironmentObject()) {
            hero.y -= hero.speed * modifier;
        }
	}
	if (65 in keysPressed) { // Player holding left
		hero.x -= hero.speed * modifier;
        if(isCollisionWithEnvironmentObject()) {
            hero.x += hero.speed * modifier;
        }
	}
	if (68 in keysPressed) { // Player holding right
		hero.x += hero.speed * modifier;
        if(isCollisionWithEnvironmentObject()) {
            hero.x -= hero.speed * modifier;
        }
	}

	for(let i = 0; i < enemies.length; i++) {
		enemies[i].move(hero, modifier, environmentObjects);
		if(enemies[i].attackCooldown > 0) {
			enemies[i].attackCooldown -= 5;
		}
	}
	for(let i = 0; i < environmentObjects.length; i++) {
		if(environmentObjects[i].health <= 0) {
			environmentObjects.splice(i, 1);
		}
	}
};

// Draw everything
let render = () => {
	if(bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if(hero.isImageLoaded) {
		ctx.drawImage(hero.image, hero.x, hero.y);
	}

    for(let i = 0; i < enemies.length; i++) {
        if(enemies[i].isImageLoaded) {
			enemies[i].draw(ctx);
		}
    }

    for(let i = 0; i < environmentObjects.length; i++) {
		if(environmentObjects[i].isImageLoaded) {
			environmentObjects[i].draw(ctx);
		}
	}
};

// The main game loop
let main = () => {
	let now = Date.now();
	let delta = now - then;

	update(delta / 1000);
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
reset();
main();