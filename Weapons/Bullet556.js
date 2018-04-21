import Bullet from './Bullet.js';
import Util from '../Utilities/Util.js';

//The 50 caliber will penetrate through objects and only stops being live
//once it exits the canvas, so its damage is set to a small number as it deals
//damage during each frame as it penetrates the object or enemy
class Bullet556 extends Bullet {
    constructor(x, y, destX, destY) {
        super(1500, 12, x, y, destX, destY, false);
        super.loadImage("Graphics/bullet3.png");
    }
}
export default Bullet556;
