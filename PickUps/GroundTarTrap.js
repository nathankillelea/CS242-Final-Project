import GroundWeapon from './GroundWeapon.js';
import TarTrap from '../Weapons/TarTrap.js';

/**
 * The TarTrap class extends the GroundWeapon class.
 */
class GroundTarTrap extends GroundWeapon {

    /**
     * The constructor initializes the fields of the ground tar trap. A call is made to the GroundWeapons constructor
     * with a TarTrap object set as the weapon.
     * @param x The x position of the ground tar trap.
     * @param y The y position of the ground tar trap.
     */
    constructor(x, y) {
        let weapon = new TarTrap();
        super(x, y, weapon);
        super.loadImage("Graphics/GroundTarTrap.png");
    }
}

export default GroundTarTrap;
