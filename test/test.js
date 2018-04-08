import RegularEnemy from '../Enemies/RegularEnemy.js';
import LightEnemy from '../Enemies/LightEnemy.js';
import TankEnemy from '../Enemies/TankEnemy.js';
import { jsdom } from 'jsdom';

let assert = require('assert');

//let canvas = document.getElementById("background");
//let ctx = canvas.getContext("2d");

// Enemy tests
describe('Enemies', () => {
    const light = new LightEnemy(100, 100);
    const regular = new RegularEnemy(400, 100);
    const tank = new TankEnemy(800, 100);
    describe('Light Enemy', () => {
        describe('Creation', () => {
            it('should have 20 velocity, 10 health, 10 damage, and 50 points on kill', () => {
                assert.equal(20, light.velocity);
                assert.equal(10, light.health);
                assert.equal(10, light.damage);
                assert.equal(50, light.pointsOnKill);
            })
        })
    });
    describe('Regular Enemy', () => {
        describe('Creation', () => {
            it('should have 10 velocity, 25 health, 10 damage, and 100 points on kill', () => {
                assert.equal(10, regular.velocity);
                assert.equal(25, regular.health);
                assert.equal(10, regular.damage);
                assert.equal(100, regular.pointsOnKill);
            })
        })
    });
    describe('Tank Enemy', () => {
        describe('Creation', () => {
            it('should have 2.5 velocity, 100 health, 25 damage, and 500 points on kill', () => {
                assert.equal(2.5, tank.velocity);
                assert.equal(100, tank.health);
                assert.equal(25, tank.damage);
                assert.equal(500, tank.pointsOnKill);
            })
        })
    })
});
