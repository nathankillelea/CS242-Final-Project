import GroundWeapon from './GroundWeapon.js';
import Weapon from '../Weapons/Weapon.js';
import Sniper from '../Weapons/Sniper.js';

/**
 * The GroundSniper class extends the GroundWeapon class.
 */
class GroundSniper extends GroundWeapon {

    constructor(x, y) {
        let weapon = new Sniper();
        super(x, y, weapon);
        super.loadImage("Graphics/GroundSniper.png");
    }
}

export default GroundSniper;
