import EnvironmentObject from './EnvironmentObject.js';

/**
 * The Crate class extends the EnvironmentObject class. It is a blocking object with low health.
 */
class Crate extends EnvironmentObject {

    /**
     * The constructor initializes the fields of the Crate. A call is made to the EnvironmentObject classes constructor
     * with the inputted x and y, the health set to 100, and isBlocking set to true.
     * @param x The x position of the Crate.
     * @param y The y position of the Crate.
     */
    constructor(x, y) {
        super(x, y, 100, true);
        super.loadImage("Graphics/Crate.png");
        super.loadSound('Audio/BoxBreak.mp3');
    }
}

export default Crate;
