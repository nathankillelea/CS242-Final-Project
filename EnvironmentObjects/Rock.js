import EnvironmentObject from './EnvironmentObject.js';

/**
 * The Rock class extends the EnvironmentObject class. It is a blocking object with high health.
 */
class Rock extends EnvironmentObject {

    /**
     * The constructor initializes the fields of the Rock. A call is made to the EnvironmentObject classes constructor
     * with the inputted x and y, the health set to 300, and isBlocking set to true.
     * @param x The x position of the Rock.
     * @param y The y position of the Rock.
     */
    constructor(x, y) {
        super(x, y, 300, true);
        super.loadImage("Graphics/Rock.png");
        super.loadSound('Audio/BoxBreak.mp3');
    }
}

export default Rock;
