import PlacedTrap from './PlacedTrap.js';

/**
 * The TarTrapPlaced class extends the PlacedTrap class.
 */
class TarTrapPlaced extends PlacedTrap {

    /**
     * The constructor initializes the fields of the TarTrapPlaced.
     * @param x The x position of the TarTrapPlaced.
     * @param y The y position of the TarTrapPlaced.
     */
    constructor(x, y) {
        super(x, y);
        super.loadImage("Graphics/TarTrap.png");
    }
}

export default TarTrapPlaced;