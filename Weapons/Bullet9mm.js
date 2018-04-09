import Bullet from './Bullet.js';
import Util from '../Utilities/Util.js';

class Bullet9mm extends Bullet {
  constructor(x, y, destX, destY) {
    super(400, 10, x, y, destX, destY);
    super.loadImage("Graphics/Bullet.png");
  }
}

export default Bullet9mm;
