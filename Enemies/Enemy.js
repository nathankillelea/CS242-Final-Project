/**
 * Sources:
 * https://medium.com/@yuribett/javascript-abstract-method-with-es6-5dbea4b00027
 *
 * make an array of enemies at start of wave, when array is empty, wave is over
 */

class Enemy {
    constructor(x, y, velocity, health, damage, pointsOnKill) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.health = health;
        this.damage = damage;
        this.pointsOnKill = pointsOnKill;
    }

    attack() { // take in person and remove HP from them

    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    death () {

    }

    draw(ctx) {
        throw new Error('You have to implement the method draw!');
    }
}

export default Enemy;