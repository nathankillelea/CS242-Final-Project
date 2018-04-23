let jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = (new JSDOM(''));
global.Image = window.Image;
global.Audio = window.Audio;

import RegularEnemy from '../Enemies/RegularEnemy.js';
import LightEnemy from '../Enemies/LightEnemy.js';
import TankEnemy from '../Enemies/TankEnemy.js';
import Player from '../Players/Player.js';
import Util from '../Utilities/Util.js';
import Crate from '../EnvironmentObjects/Crate.js';
import Bush from '../EnvironmentObjects/Bush.js';
import Rock from '../EnvironmentObjects/Rock.js';
import ProjectileEnemy from '../Enemies/ProjectileEnemy.js';
import MiniBoss from '../Enemies/MiniBoss.js';
import FinalBoss from '../Enemies/FinalBoss.js';

let assert = require('assert');

describe('Enemies', () => {
    let light = new LightEnemy(100, 100);
    let regular = new RegularEnemy(400, 100);
    let tank = new TankEnemy(800, 100);
    let projectileEnemy = new ProjectileEnemy(1000, 1000);
    let miniboss = new MiniBoss(5000, 5000);
    let finalboss = new FinalBoss(10000, 10000);
    
    describe('Light Enemy', () => {
        describe('Creation', () => {
            it('should have 128 velocity, 10 health, 10 damage, and give 50 points on kill', () => {
                assert.equal(light.velocity, 128);
                assert.equal(light.health, 10);
                assert.equal(light.damage, 10);
                assert.equal(light.pointsOnKill, 50);
            })
        });
        describe('Attack', () => {
            it('should remove 10 health from the player', () => {
                let player = new Player();
                assert.equal(player.health, 100);
                light.attack(player);
                assert.equal(player.health, 90);
            })
        })
    });
    describe('Regular Enemy', () => {
        describe('Creation', () => {
            it('should have 64 velocity, 25 health, 10 damage, and give 100 points on kill', () => {
                assert.equal(regular.velocity, 64);
                assert.equal(regular.health, 25);
                assert.equal(regular.damage, 10);
                assert.equal(regular.pointsOnKill, 100);
            })
        });
        describe('Attack', () => {
            it('should remove 10 health from the player', () => {
                let player = new Player();
                assert.equal(player.health, 100);
                regular.attack(player);
                assert.equal(player.health, 90);
            })
        })
    });
    describe('Tank Enemy', () => {
        describe('Creation', () => {
            it('should have 32 velocity, 100 health, 25 damage, and give 500 points on kill', () => {
                assert.equal(tank.velocity, 32);
                assert.equal(tank.health, 100);
                assert.equal(tank.damage, 25);
                assert.equal(tank.pointsOnKill, 500);
            })
        });
        describe('Attack', () => {
            it('should remove 25 health from the player', () => {
                let player = new Player();
                assert.equal(player.health, 100);
                tank.attack(player);
                assert.equal(player.health, 75);
            })
        })
    });
    describe('Projectile Enemy', () => {
        describe('Creation', () => {
            it('should have 96 velocity, 40 health, 10 damage, and give 250 points on kill', () => {
                assert.equal(projectileEnemy.velocity, 96);
                assert.equal(projectileEnemy.health, 40);
                assert.equal(projectileEnemy.damage, 10);
                assert.equal(projectileEnemy.pointsOnKill, 250);
            })
        });
        describe('Attack', () => {
            it('should remove 10 health from the player', () => {
                let player = new Player();
                assert.equal(player.health, 100);
                projectileEnemy.attack(player);
                assert.equal(player.health, 90);
            })
        })
    });
    describe('MiniBoss Enemy', () => {
        describe('Creation', () => {
            it('should have 128 velocity, 500 health, 50 damage, and give 1000 points on kill', () => {
                assert.equal(miniboss.velocity, 128);
                assert.equal(miniboss.health, 500);
                assert.equal(miniboss.damage, 50);
                assert.equal(miniboss.pointsOnKill, 1000);
            })
        });
        describe('Attack', () => {
            it('should remove 50 health from the player', () => {
                let player = new Player();
                assert.equal(player.health, 100);
                miniboss.attack(player);
                assert.equal(player.health, 50);
            })
        })
    });
    describe('FinalBoss Enemy', () => {
        describe('Creation', () => {
            it('should have 128 velocity, 5000 health, 75 damage, and give 10000 points on kill', () => {
                assert.equal(finalboss.velocity, 128);
                assert.equal(finalboss.health, 5000);
                assert.equal(finalboss.damage, 75);
                assert.equal(finalboss.pointsOnKill, 10000);
            })
        });
        describe('Charge Attack', () => {
            it('should have 128 velocity initially, 1024 velocity after start charge attack is called, and 128 velocity when end charge attack is called', () => {
                assert.equal(finalboss.velocity, 128);
                finalboss.startChargeAttack();
                assert.equal(finalboss.velocity, 1024);
                finalboss.endChargeAttack();
                assert.equal(finalboss.velocity, 128);
            })
        });
        describe('Rapid Fire', () => {
            it('should have 100 shootCooldownReset and 1 shootCooldownRate initially, 50 shootCooldownReset and .25 shootCooldownRate after start rapid fire is called, ' +
                'and 100 shootCooldownReset and 1 shootCooldownRate after end rapid fire is called', () => {
                assert.equal(finalboss.shootCooldownReset, 100);
                assert.equal(finalboss.shootCooldownRate, 1);
                finalboss.startRapidFire();
                assert.equal(finalboss.shootCooldownReset, 50);
                assert.equal(finalboss.shootCooldownRate, .25);
                finalboss.endRapidFire();
                assert.equal(finalboss.shootCooldownReset, 100);
                assert.equal(finalboss.shootCooldownRate, 1);
            })
        });
        describe('Attack', () => {
            it('should remove 75 health from the player', () => {
                let player = new Player();
                assert.equal(player.health, 100);
                finalboss.attack(player);
                assert.equal(player.health, 25);
            })
        })
    })
});
describe('Environment Objects', () => {
    let crate = new Crate(2000, 2000);
    let bush = new Bush(5000, 5000);
    let rock = new Rock(7500, 7500);
    describe('Crate', () => {
        describe('Creation', () => {
            it('should have 100 health and be blocking', () => {
                assert.equal(crate.health, 100);
                assert.equal(crate.isBlocking, true);
            })
        })
    });
    describe('Bush', () => {
        describe('Creation', () => {
            it('should have 100000 health and be non-blocking', () => {
                assert.equal(bush.health, 100000);
                assert.equal(bush.isBlocking, false);
            })
        })
    });
    describe('Rock', () => {
        describe('Creation', () => {
            it('should have 300 health and be blocking', () => {
                assert.equal(rock.health, 300);
                assert.equal(rock.isBlocking, true);
            })
        })
    })
});
describe('Collision', () => {
    it('should return true on collision', () => {
        let rectangle1 = {x: 5, y: 5, height: 50, width: 50};
        let rectangle2 = {x: 20, y: 10, height: 10, width: 10};
        assert.equal(Util.isCollision(rectangle1, rectangle2), true);
    });
    it('should return false on non-collision', () => {
        let rectangle1 = {x: 5, y: 5, height: 50, width: 50};
        let rectangle2 = {x: 200, y: 100, height: 10, width: 10};
        assert.equal(Util.isCollision(rectangle1,rectangle2), false);
    })
});
