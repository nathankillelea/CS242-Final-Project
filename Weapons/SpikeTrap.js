import Weapon from './Weapon.js';

/**
 * The SpikeTrap class extends the Trap class.
 */
class SpikeTrap extends Weapon {

    /**
     * The constructor initializes the fields of the SpikeTrap. A call is made to the Weapon classes constructor.
     */
    constructor() {
        super(0, 0, 0);
        this.name = 'Spike Trap';
        super.loadShootSound('Audio/SpikeTrap.mp3');
    }
}

export default SpikeTrap;
