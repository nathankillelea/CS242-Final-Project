import PlacedTrap from './PlacedTrap.js';

/**
 * The SpikeTrapPlaced class extends the PlacedTrap class.
 */
class SpikeTrapPlaced extends PlacedTrap {

    /**
     * The constructor initializes the fields of the SpikeTrapPlaced.
     * @param x The x position of the SpikeTrapPlaced.
     * @param y The y position of the SpikeTrapPlaced.
     */
    constructor(x, y) {
        super(x, y);
        super.loadImage("Graphics/SpikeTrap.png");
    }
}

export default SpikeTrapPlaced;
