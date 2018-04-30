import GroundWeapon from './GroundWeapon.js';
import SpikeTrap from '../Weapons/SpikeTrap.js';

/**
 * The GroundSpikeTrap class extends the GroundWeapon class.
 */
class GroundSpikeTrap extends GroundWeapon {

    /**
     * The constructor initializes the fields of the ground spike trap. A call is made to the GroundWeapons constructor
     * with a SpikeTrap object set as the weapon.
     * @param x The x position of the ground spike trap.
     * @param y The y position of the ground spike trap.
     */
    constructor(x, y) {
        let weapon = new SpikeTrap();
        super(x, y, weapon);
        super.loadImage("Graphics/GroundSpikeTrap.png");
    }
}

export default GroundSpikeTrap;
