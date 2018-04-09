class Bullet{
  constructor(velocity, damage, x, y) {
      this.velocity = velocity;
      this.damage = damage;
      this.x = x;
      this.y = y;
  }
}

class Bullet_556 extends Bullet {
  constructor(x, y) {
    super(200, 25, x, y);
  }
}

class Bullet_762 extends Bullet {
  constructor(x, y) {
    super(250, 30, x, y)
  }
}

class Bullet_12Gauge extends Bullet {
  constructor(x, y) {
    super(300, 40, x, y);
  }
}

class Bullet_9mm extends Bullet {
  constructor(x, y) {
    super(150, 20, x, y);
  }
}

class Bullet_45ACP extends Bullet {
  constructor(x, y) {
    super(130, 18, x, y);
  }
}
