//The sniper is only currently used to determine the type of bullet to be generated
//in main.js' event handler for clicks
//In the future it will control fire rate and the ammo capacity.
import Weapon from './Weapon.js';
class Sniper extends Weapon{
  constructor(){
    super(5, 30);
    this.name = "Sniper";
  }
}
export default Sniper;
