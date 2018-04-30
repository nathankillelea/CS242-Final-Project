import GroundWeapon from './GroundWeapon.js';
import TarTrap from '../Weapons/TarTrap.js';

/**
 * The TarTrap class extends the GroundWeapon class.
 */
class GroundTarTrap extends GroundWeapon {

    constructor(x, y) {
        let weapon = new TarTrap();
        super(x, y, weapon);
        super.loadImage("Graphics/GroundTarTrap.png");
    }
}

export default GroundTarTrap;
