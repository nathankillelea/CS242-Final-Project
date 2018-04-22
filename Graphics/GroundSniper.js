import GroundWeapon from './GroundWeapon.js';
import Weapon from '../Weapons/Weapon.js';
import Sniper from '../Weapons/Sniper.js';

/**
 * The Rock class extends the EnvironmentObject class. It is a blocking object with high health.
 */
class GroundSniper extends GroundWeapon {

    constructor(x, y) {
        let weapon = new Sniper();
        super(x, y, weapon);
        super.loadImage("Graphics/GroundSniper.png");
    }
}

export default GroundSniper;
