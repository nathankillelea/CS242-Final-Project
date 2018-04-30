import GroundWeapon from './GroundWeapon.js';
import Flamethrower from '../Weapons/Flamethrower.js';

/**
 * The GroundAssaultRifle class extends the GroundWeapon class.
 */
class GroundFlamethrower extends GroundWeapon {

    constructor(x, y) {
        let weapon = new Flamethrower();
        super(x, y, weapon);
        super.loadImage("Graphics/GroundFlamethrower.png");
    }
}
export default GroundFlamethrower;
