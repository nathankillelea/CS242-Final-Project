import Weapon from './Weapon.js';

/**
 * The TarTrap class extends the Weapon class.
 */
class TarTrap extends Weapon {

    /**
     * The constructor initializes the fields of the TarTrap. A call is made to the Weapon classes constructor.
     */
    constructor() {
        super(0, 0, 0);
        this.name = 'Spike Trap';
    }
}

export default TarTrap;