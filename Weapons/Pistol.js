class Pistol extends Weapon{
  constructor(){
    pistol_bullet = new Bullet_9mm();
    super(15, 90, false, pistol_bullet)
  }
}