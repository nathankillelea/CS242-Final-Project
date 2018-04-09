import EnvironmentObject from './EnvironmentObject.js';

class Bush extends EnvironmentObject {
    constructor(x, y) {
        super(x, y, 100000, false);
        super.loadImage("Graphics/Bush.png");
    }
}

export default Bush;