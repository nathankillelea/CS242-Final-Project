import Trap from './Trap.js';

/**
 * The TarTrap class extends the Trap class.
 */
class TarTrap extends Trap {

    /**
     * The constructor initializes the fields of the TarTrap. A call is made to the Trap classes constructor
     * with the inputted x and y.
     * @param x The x position of the Trap.
     * @param y The y position of the Trap.
     */
    constructor(x, y) {
        super(x, y);
        super.loadImage("Graphics/TarTrap.png");
    }
}

export default TarTrap;