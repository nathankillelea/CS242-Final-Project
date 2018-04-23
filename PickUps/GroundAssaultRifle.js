import GroundWeapon from './GroundWeapon.js';
import AssaultRifle from '../Weapons/AssaultRifle.js';

/**
 * The GroundAssaultRifle class extends the GroundWeapon class.
 */
class GroundAssaultRifle extends GroundWeapon {

    constructor(x, y) {
        let weapon = new AssaultRifle();
        super(x, y, weapon);
        super.loadImage("Graphics/GroundAssaultRifle.png");
    }
}

export default GroundAssaultRifle;
