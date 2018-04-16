//The sniper is only currently used to determine the type of bullet to be generated
//in main.js' event handler for clicks
//In the future it will control fire rate and the ammo capacity.
import Weapon from './Weapon.js';
class Pistol extends Weapon{
  constructor(){
    super(15, 90);
    this.name = "Pistol";
  }
}
export default Pistol;
