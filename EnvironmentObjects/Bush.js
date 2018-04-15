import EnvironmentObject from './EnvironmentObject.js';

/**
 * The Bush class extends the EnvironmentObject class. It is a non-blocking object.
 */
class Bush extends EnvironmentObject {

    /**
     * The constructor initializes the fields of the Bush. A call is made to the EnvironmentObject classes constructor
     * with the inputted x and y, the health set to 100000, and isBlocking set to false.
     * @param x The x position of the Bush.
     * @param y The y position of the Bush.
     */
    constructor(x, y) {
        super(x, y, 100000, false);
        super.loadImage("Graphics/Bush.png");
    }
}

export default Bush;