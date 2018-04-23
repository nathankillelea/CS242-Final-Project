import GroundWeapon from './GroundWeapon.js';
import Shotgun from '../Weapons/Shotgun.js';

/**
 * The GroundAssaultRifle class extends the GroundWeapon class.
 */
class GroundShotgun extends GroundWeapon {

    constructor(x, y) {
        let weapon = new Shotgun();
        super(x, y, weapon);
        super.loadImage("Graphics/GroundShotgun.png");
    }
}
export default GroundShotgun;
