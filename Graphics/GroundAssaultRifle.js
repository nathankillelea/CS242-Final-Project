import GroundWeapon from './GroundWeapon.js';
import Weapon from '../Weapons/Weapon.js';
import AssaultRifle from '../Weapons/AssaultRifle.js';

/**
 * The Rock class extends the EnvironmentObject class. It is a blocking object with high health.
 */
class GroundAssaultRifle extends GroundWeapon {

    constructor(x, y) {
        let weapon = new AssaultRifle();
        super(x, y, weapon);
        super.loadImage("Graphics/GroundAssaultRifle.png");
    }
}

export default GroundAssaultRifle;
