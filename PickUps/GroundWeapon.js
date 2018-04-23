class GroundWeapon {
    //x = the x position of the ground weapon
    //y = the y position of the ground weapon
    //weapon  = the weapon object that will be added to the player's inventory
    constructor(x, y, weapon) {
        this.x = x;
        this.y = y;
        this.weapon = weapon;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    loadImage(url) {
        this.isImageLoaded = false;
        this.image = new Image();
        this.image.onload = () => {
            this.isImageLoaded = true;
            this.width = this.image.width;
            this.height = this.image.height;
        };
        this.image.src = url;
    }
    /**
    array = the array that the wepaon object stored in this GroundWeapon will be pushed into. This method is to be used with a player's inventory.
    *//
    addWeapon(array){
      array.push(this.weapon);
    }
    draw(ctx, camera) {
        ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
    }
}
export default GroundWeapon;
