/*
  Sources:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  https://stackoverflow.com/questions/4037212/html-canvas-full-screen?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  https://stackoverflow.com/questions/16919601/html5-canvas-world.camera-viewport-how-to-actally-do-it?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  http://jsfiddle.net/gfcarv/QKgHs/
 */

import Game from './Game/Game.js';

let canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

let game = new Game(canvas, document.body);

let main = () => {
    let now = Date.now();
    let delta = now - then;

    game.update(delta / 1000);
    game.draw();

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
