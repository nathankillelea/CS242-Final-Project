//clipSize and ammo will be used as expected next week
//automatic will be used as a boolean for whether or not
//holding click should continuously fire.
//The name field is used for the HUD displaying the active weapon.
class Weapon {

    constructor(clipSize, maxAmmo, maxCoolDown) {
        this.clipSize = clipSize;
        this.maxAmmo = maxAmmo;
        this.name = '';
        this.cooldown = 0;
        this.maxCoolDown = maxCoolDown;
    }
    loadShootSound(url) {
        this.isSoundLoaded = false;
        this.sound = new Audio();
        this.sound.onload = () => {
            this.isSoundLoaded = true;
        };
        this.sound.src = url;
    }
    addCooldown(){
      this.cooldown += this.maxCoolDown;
    }

}

export default Weapon;
