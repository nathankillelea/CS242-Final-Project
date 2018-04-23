import Weapon from './Weapon.js';

class Shotgun extends Weapon{
    constructor(){
        super(8, 32);
        this.name = "Shotgun";
        super.loadShootSound('Audio/SniperShot.mp3');
    }
}

export default Shotgun;
