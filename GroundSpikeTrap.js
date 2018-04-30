import GroundWeapon from './GroundWeapon.js';
import SpikeTrap from '../Weapons/SpikeTrap.js';

/**
 * The GroundSpikeTrap class extends the GroundWeapon class.
 */
class GroundSpikeTrap extends GroundWeapon {

    constructor(x, y) {
        let weapon = new SpikeTrap();
        super(x, y, weapon);
        super.loadImage("Graphics/GroundSpikeTrap.png");
    }
}

export default GroundSpikeTrap;
