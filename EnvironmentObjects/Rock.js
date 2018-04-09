import EnvironmentObject from './EnvironmentObject.js';

class Rock extends EnvironmentObject {
    constructor(x, y) {
        super(x, y, 300, true);
        super.loadImage("Graphics/Rock.png");
    }
}

export default Rock;
