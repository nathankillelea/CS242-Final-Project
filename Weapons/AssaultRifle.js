import Weapon from './Weapon.js';
class AssaultRifle extends Weapon{
  constructor(){
    super(5, 30);
    this.name = "Assault Rifle";
  }
}
export default AssaultRifle;
