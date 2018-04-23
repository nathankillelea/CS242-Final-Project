import Weapon from './Weapon.js';

class AssaultRifle extends Weapon{
    constructor(){
        super(5, 30, .1);
        this.name = "Assault Rifle";
        super.loadShootSound('Audio/RifleShot.mp3');
    }
}
export default AssaultRifle;
