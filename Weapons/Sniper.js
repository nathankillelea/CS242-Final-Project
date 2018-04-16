import Weapon from './Weapon.js';
class Sniper extends Weapon{
  constructor(){
    super(5, 30);
    this.name = "Sniper";
  }
}
export default Sniper;
