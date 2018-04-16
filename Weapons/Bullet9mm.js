import Bullet from './Bullet.js';
import Util from '../Utilities/Util.js';
//the 9mm bullet is a simple pistol bullet that will be in the
//user's starting weapon. it does minimal damage and moves at a slow speed.
//the value of isPenetrating is set to false to indicate the bullet should
//not be live after it collides with something and does its damage.
//in the future the bullet will have a maximum range/live time to
//limit its usefulness more.
class Bullet9mm extends Bullet {
    constructor(x, y, destX, destY) {
        super(1000, 10, x, y, destX, destY, false);
        super.loadImage("Graphics/bullet3.png");
    }
}

export default Bullet9mm;
