import Weapon from './Weapon.js';

class Shotgun extends Weapon{
    constructor(){
        super(8, 32, .75);
        this.name = "Shotgun";
        super.loadShootSound('Audio/ShotgunShot.mp3');
    }
}

export default Shotgun;
