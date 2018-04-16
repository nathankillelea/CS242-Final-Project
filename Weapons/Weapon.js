//clipSize and ammo will be used as expected next week
//automatic will be used as a boolean for whether or not
//holding click should continuously fire.
//The name field is used for the HUD displaying the active weapon.
class Weapon {
  constructor(clipSize, maxAmmo) {
      this.clipSize = clipSize;
      this.maxAmmo = maxAmmo;
      //this.automatic = automatic;
      //this.bullet = bullet;
      this.name = '';
  }
}
export default Weapon;
