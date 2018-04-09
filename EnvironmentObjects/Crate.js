import EnvironmentObject from './EnvironmentObject.js';

class Crate extends EnvironmentObject {
    constructor(x, y) {
        super(x, y, 100, true);
        super.loadImage("Graphics/Crate.png");
    }
}

export default Crate;
