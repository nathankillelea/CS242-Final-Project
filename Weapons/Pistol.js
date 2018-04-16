import Weapon from './Weapon.js';
class Pistol extends Weapon{
  constructor(){
    super(15, 90);
    this.name = "Pistol";
  }
}
export default Pistol;
