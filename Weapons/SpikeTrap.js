import Trap from './Trap.js';

/**
 * The SpikeTrap class extends the Trap class.
 */
class SpikeTrap extends Trap {

    /**
     * The constructor initializes the fields of the SpikeTrap. A call is made to the Trap classes constructor
     * with the inputted x and y.
     * @param x The x position of the Trap.
     * @param y The y position of the Trap.
     */
    constructor(x, y) {
        super(x, y);
        super.loadImage("Graphics/SpikeTrap.png");
    }
}

export default SpikeTrap;