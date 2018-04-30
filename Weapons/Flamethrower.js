import Weapon from './Weapon.js';

class Flamethrower extends Weapon{
    constructor(){
        super(8, 32, .05);
        this.name = "Flamethrower";
        super.loadShootSound('Audio/FlamethrowerSound.mp3');
    }
}

export default Flamethrower;
