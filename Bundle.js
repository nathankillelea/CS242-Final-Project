(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Just a plus cursor to be rendered at the
//cursor's location each Update
//The cursor for the entire HTML document is turned off via styling on the document.
var Cursor = function () {
    function Cursor() {
        _classCallCheck(this, Cursor);

        this.loadImage();
    }

    _createClass(Cursor, [{
        key: "loadImage",
        value: function loadImage() {
            var _this = this;

            this.isImageLoaded = false;
            this.image = new Image();
            this.image.onload = function () {
                _this.isImageLoaded = true;
            };
            this.image.src = "Graphics/crosshair.png";
        }
    }]);

    return Cursor;
}();

exports.default = Cursor;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Sources:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://medium.com/@yuribett/javascript-abstract-method-with-es6-5dbea4b00027
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://www.youtube.com/watch?v=I5dARpAPlNk
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Util = require('../Utilities/Util.js');

var _Util2 = _interopRequireDefault(_Util);

var _SpikeTrapPlaced = require('../PlacedTraps/SpikeTrapPlaced');

var _SpikeTrapPlaced2 = _interopRequireDefault(_SpikeTrapPlaced);

var _TarTrapPlaced = require('../PlacedTraps/TarTrapPlaced');

var _TarTrapPlaced2 = _interopRequireDefault(_TarTrapPlaced);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The Enemy class is the parent class for all of the enemies.
 */
var Enemy = function () {

    /**
     * The constructor initializes the fields of the Enemy.
     * @param x The x position of the Enemy.
     * @param y The y position of the Enemy.
     * @param velocity The velocity of the Enemy.
     * @param health The health of the Enemy.
     * @param damage The damage of the Enemy.
     * @param pointsOnKill The points rewarded for killing the Enemy.
     */
    function Enemy(x, y, velocity, health, damage, pointsOnKill) {
        _classCallCheck(this, Enemy);

        this.x = x;
        this.y = y;
        this.angle = Math.PI / 2;
        this.velocity = velocity;
        this.health = health;
        this.damage = damage;
        this.pointsOnKill = pointsOnKill;
        this.attackCooldown = 0;
        this.isSlowed = false;
        this.attackDamageTakenCooldown = 0;
    }

    /**
     * The loadImage function takes in a url and loads it as an Image. Once the image is loaded, this.isImageLoaded is
     * set to true. The height and width of the Enemy are set to the height and width of the image.
     * @param url The url that should be loaded.
     */


    _createClass(Enemy, [{
        key: 'loadImage',
        value: function loadImage(url) {
            var _this = this;

            this.isImageLoaded = false;
            this.image = new Image();
            this.image.onload = function () {
                _this.isImageLoaded = true;
                _this.width = _this.image.width;
                _this.height = _this.image.height;
            };
            this.image.src = url;
        }
    }, {
        key: 'loadDamageTakenSound',
        value: function loadDamageTakenSound(url) {
            var _this2 = this;

            this.isSound1Loaded = false;
            this.damageTakenSound = new Audio();
            this.damageTakenSound.onload = function () {
                _this2.isSound1Loaded = true;
            };
            this.damageTakenSound.src = url;
        }

        /**
         * The attack function takes in an object and removes the amount of damage the Enemy deals from their health.
         * 500 is added to the attack cooldown of the enemy after an attack.
         * @param object The object that is being attacked.
         */

    }, {
        key: 'attack',
        value: function attack(object) {
            object.health -= this.damage;
            this.attackCooldown += 500;
        }

        /**
         * Moves the enemy towards the player.
         * @param player The player object to move towards.
         * @param modifier The modifier to be multiplied by the velocity.
         * @param environmentObjects An array of environment objects.
         * @param placedTraps An array of placed traps.
         * @param camera The camera object.
         */

    }, {
        key: 'move',
        value: function move(player, modifier, environmentObjects, placedTraps, camera) {
            var diffX = player.x - this.x;
            var diffY = player.y - this.y;

            var coeffX = void 0;
            var coeffY = void 0;

            if (Math.abs(diffX) > Math.abs(diffY)) {
                coeffX = diffX / Math.abs(diffX);
                coeffY = diffY / Math.abs(diffX);
            } else {
                coeffY = diffY / Math.abs(diffY);
                coeffX = diffX / Math.abs(diffY);
            }

            this.angle = Math.atan2(player.y + player.height / 2 - camera.y - (this.y + this.height / 2 - camera.y), player.x + player.width / 2 - camera.x - (this.x + this.width / 2 - camera.x));

            var oldX = this.x;
            var oldY = this.y;

            this.attackDamageTakenCooldown -= modifier;
            this.isCollisionWithPlacedTraps(placedTraps);

            if (this.isSlowed) {
                this.x += this.velocity / 2 * modifier * coeffX;
                this.y += this.velocity / 2 * modifier * coeffY;
            } else {
                this.x += this.velocity * modifier * coeffX;
                this.y += this.velocity * modifier * coeffY;
            }

            if (this.x + this.width > 10000 || this.x < 0 || this.y + this.height > 5625 || this.y < 0 || this.isCollisionWithEnvironmentObject(environmentObjects)) {
                this.x = oldX;
                this.y = oldY;
            }

            if (_Util2.default.isCollision(this, player) && this.attackCooldown === 0) {
                console.log("health before attack" + player.health);
                this.attack(player);
                player.damageTakenSound.play();
                console.log("health after attack" + player.health);
            }
        }

        /**
         * This function sets the position of the enemy given x and y.
         * @param x The x position to be set.
         * @param y The y position to be set.
         */

    }, {
        key: 'setPosition',
        value: function setPosition(x, y) {
            this.x = x;
            this.y = y;
        }

        /**
         * This function is a helper function used by the move function to determine if there is a collision between an
         * environment object and the enemy. If there is a collision, the object is attacked.
         * @param environmentObjects An array of environment objects.
         * @returns {boolean} Whether a collision exists.
         */

    }, {
        key: 'isCollisionWithEnvironmentObject',
        value: function isCollisionWithEnvironmentObject(environmentObjects) {
            for (var i = 0; i < environmentObjects.length; i++) {
                if (_Util2.default.isCollision(this, environmentObjects[i]) && environmentObjects[i].isBlocking) {
                    if (this.attackCooldown === 0) {
                        this.attack(environmentObjects[i]);
                    }
                    return true;
                }
            }
            return false;
        }

        /**
         * This function checks if the enemy is colliding with a trap. If they are colliding with a spike trap, they take
         * 5 damage every 5 seconds. If they are colliding with a tar trap, the isSlowed flag is set to true and their
         * movement is cut in half.
         * @param placedTraps
         */

    }, {
        key: 'isCollisionWithPlacedTraps',
        value: function isCollisionWithPlacedTraps(placedTraps) {
            if (this.attackDamageTakenCooldown < 0) this.attackDamageTakenCooldown = 0;
            for (var i = 0; i < placedTraps.length; i++) {
                if (_Util2.default.isCollision(this, placedTraps[i])) {
                    if (placedTraps[i] instanceof _SpikeTrapPlaced2.default && this.attackDamageTakenCooldown === 0) {
                        this.health -= 5;
                        this.attackDamageTakenCooldown += 5;
                    } else if (placedTraps[i] instanceof _TarTrapPlaced2.default) this.isSlowed = true;
                }
            }
        }

        /**
         * The draw function draws the image on the canvas at the x and y position of the LightEnemy.
         * @param ctx The context of the canvas.
         * @param camera The camera object.
         */

    }, {
        key: 'draw',
        value: function draw(ctx, camera) {
            ctx.save();
            ctx.translate(this.x + this.width / 2 - camera.x, this.y + this.height / 2 - camera.y);
            ctx.rotate(this.angle + Math.PI / 2);
            ctx.drawImage(this.image, 0 - this.width / 2, 0 - this.height / 2);
            ctx.restore();
        }
    }]);

    return Enemy;
}();

exports.default = Enemy;

},{"../PlacedTraps/SpikeTrapPlaced":28,"../PlacedTraps/TarTrapPlaced":29,"../Utilities/Util.js":32}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = require("../Utilities/Util.js");

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The EnemyProjectile class is the object that is fired from the ProjectileEnemy enemy.
 */
var EnemyProjectile = function () {

    /**
     * The constructor initializes the fields of the EnemyProjectile class and gets the x and y coefficients for use
     * in the move function. The loadImage function is also called.
     * @param x The x position of the EnemyProjectile.
     * @param y The y position of the EnemyProjectile.
     * @param destX The x destination of the EnemyProjectile.
     * @param destY The y destination of the EnemyProjectile.
     */
    function EnemyProjectile(x, y, destX, destY) {
        _classCallCheck(this, EnemyProjectile);

        this.velocity = 600;
        this.damage = 5;
        this.x = x;
        this.y = y;
        this.live = true;
        var diffX = destX - this.x;
        var diffY = destY - this.y;
        if (Math.abs(diffX) > Math.abs(diffY)) {
            this.coeffX = diffX / Math.abs(diffX);
            this.coeffY = diffY / Math.abs(diffX);
        } else {
            this.coeffY = diffY / Math.abs(diffY);
            this.coeffX = diffX / Math.abs(diffY);
        }
        this.loadImage();
    }

    /**
     * This function moves the EnemyProjectile according to the x and y coefficients.
     * @param modifier The modifier to be multiplied by the velocity.
     * @param environmentObjects The array of environment objects.
     * @param player The player object.
     */


    _createClass(EnemyProjectile, [{
        key: "move",
        value: function move(modifier, environmentObjects, player) {
            this.x += this.velocity * modifier * this.coeffX;
            this.y += this.velocity * modifier * this.coeffY;
            if (this.hitSomething(environmentObjects, player)) {
                this.live = false;
            }
            if (this.x < 0 || this.x > 10000 || this.y < 0 || this.y > 5625) {
                this.live = false;
            }
        }

        /**
         * This function takes away health from the player equal to the damage of the EnemyProjectile.
         * @param player The player object.
         */

    }, {
        key: "damagePlayer",
        value: function damagePlayer(player) {
            player.health -= this.damage;
            player.damageTakenSound.play();
        }

        /**
         * This function takes away health from the environment object equal to the damage of the EnemyProjectile.
         * @param environmentObject The environment object.
         */

    }, {
        key: "damageEnvironment",
        value: function damageEnvironment(environmentObject) {
            environmentObject.health -= this.damage;
        }

        /**
         * This function checks if an environment object or a player were hit by the projectile.
         * @param environmentObjects The array of environment objects.
         * @param player The player object.
         * @returns {boolean} Whether or not something was hit.
         */

    }, {
        key: "hitSomething",
        value: function hitSomething(environmentObjects, player) {
            for (var i = 0; i < environmentObjects.length; i++) {
                if (_Util2.default.isCollision(this, environmentObjects[i]) && environmentObjects[i].isBlocking) {
                    this.damageEnvironment(environmentObjects[i]);
                    return true;
                }
            }
            if (_Util2.default.isCollision(this, player)) {
                this.damagePlayer(player);
                return true;
            }
            return false;
        }

        /**
         * The loadImage function loads the url as an Image. Once the image is loaded, this.isImageLoaded is
         * set to true. The height and width of the EnemyProjectile are set to the height and width of the image.
         */

    }, {
        key: "loadImage",
        value: function loadImage() {
            var _this = this;

            this.isImageLoaded = false;
            this.image = new Image();
            this.image.onload = function () {
                _this.isImageLoaded = true;
                _this.width = _this.image.width;
                _this.height = _this.image.height;
            };
            this.image.src = "Graphics/EnemyProjectile.png";
        }

        /**
         * The draw function draws the image on the canvas at the x and y position of the EnemyProjectile.
         * @param ctx The context of the canvas.
         * @param camera The camera object.
         */

    }, {
        key: "draw",
        value: function draw(ctx, camera) {
            ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
        }
    }]);

    return EnemyProjectile;
}();

exports.default = EnemyProjectile;

},{"../Utilities/Util.js":32}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Enemy2 = require('./Enemy.js');

var _Enemy3 = _interopRequireDefault(_Enemy2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The FinalBoss class extends the Enemy class. It is a high health and damage enemy.
 */
var FinalBoss = function (_Enemy) {
    _inherits(FinalBoss, _Enemy);

    /**
     * The constructor initializes the fields of the FinalBoss. A call is made to the Enemy classes constructor with
     * the inputted x and y, the velocity set to 128, the health set to 5000, the damage set to 50, and the pointsOnKill
     * set to 10000.
     * @param x The x position of the FinalBoss.
     * @param y The y position of the FinalBoss.
     */
    function FinalBoss(x, y) {
        _classCallCheck(this, FinalBoss);

        var _this = _possibleConstructorReturn(this, (FinalBoss.__proto__ || Object.getPrototypeOf(FinalBoss)).call(this, x, y, 128, 5000, 50, 10000));

        _this.shootCooldown = 100;
        _this.shootCooldownRate = 1;
        _this.shootCooldownReset = 100;
        _this.rapidFireCooldown = 500;
        _this.rapidFireCooldownRate = 1;
        _this.rapidFireCooldownReset = 500;
        _this.rapidFireLength = 500;
        _this.rapidFireLengthReset = 500;
        _this.isRapidFire = false;
        _this.chargeAttackCooldown = 1250;
        _this.chargeAttackCooldownRate = 1;
        _this.chargeAttackCooldownReset = 1250;
        _this.chargeAttackLength = 100;
        _this.chargeAttackLengthReset = 100;
        _this.isChargeAttack = false;
        _get(FinalBoss.prototype.__proto__ || Object.getPrototypeOf(FinalBoss.prototype), 'loadImage', _this).call(_this, "Graphics/FinalBoss.png");
        _get(FinalBoss.prototype.__proto__ || Object.getPrototypeOf(FinalBoss.prototype), 'loadDamageTakenSound', _this).call(_this, 'Audio/FinalBossDamageTaken.mp3');
        return _this;
    }

    /**
     * This function starts the charge attack by setting velocity to 1024, setting damage to 10, and setting isChargeAttack
     * to true.
     */


    _createClass(FinalBoss, [{
        key: 'startChargeAttack',
        value: function startChargeAttack() {
            this.velocity = 1024;
            this.damage = 10;
            this.isChargeAttack = true;
        }

        /**
         * This function ends the charge attack by resetting velocity and damage to their default values.
         */

    }, {
        key: 'endChargeAttack',
        value: function endChargeAttack() {
            this.velocity = 128;
            this.damage = 50;
            this.isChargeAttack = false;
        }

        /**
         * This function starts rapid fire by setting the shootCooldownRate to 25 and setting isRapidFire to true.
         */

    }, {
        key: 'startRapidFire',
        value: function startRapidFire() {
            this.shootCooldownRate = 25;
            this.isRapidFire = true;
        }

        /**
         * This function ends the rapid fire by sets rapid fire back to its default value.
         */

    }, {
        key: 'endRapidFire',
        value: function endRapidFire() {
            this.shootCooldownRate = 1;
            this.isRapidFire = false;
        }
    }]);

    return FinalBoss;
}(_Enemy3.default);

exports.default = FinalBoss;

},{"./Enemy.js":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Enemy2 = require('./Enemy.js');

var _Enemy3 = _interopRequireDefault(_Enemy2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The LightEnemy class extends the Enemy class. It is a fast enemy with low health.
 */
var LightEnemy = function (_Enemy) {
  _inherits(LightEnemy, _Enemy);

  /**
   * The constructor initializes the fields of the LightEnemy. A call is made to the Enemy classes constructor with
   * the inputted x and y, the velocity set to 128, the health set to 10, the damage set to 10, and the pointsOnKill
   * set to 50.
   * @param x The x position of the LightEnemy.
   * @param y The y position of the LightEnemy.
   */
  function LightEnemy(x, y) {
    _classCallCheck(this, LightEnemy);

    var _this = _possibleConstructorReturn(this, (LightEnemy.__proto__ || Object.getPrototypeOf(LightEnemy)).call(this, x, y, 128, 10, 10, 50));

    _get(LightEnemy.prototype.__proto__ || Object.getPrototypeOf(LightEnemy.prototype), 'loadImage', _this).call(_this, "Graphics/LightEnemy.png");
    _get(LightEnemy.prototype.__proto__ || Object.getPrototypeOf(LightEnemy.prototype), 'loadDamageTakenSound', _this).call(_this, 'Audio/LightEnemyDamageTaken.mp3');
    return _this;
  }

  return LightEnemy;
}(_Enemy3.default);

exports.default = LightEnemy;

},{"./Enemy.js":2}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Enemy2 = require('./Enemy.js');

var _Enemy3 = _interopRequireDefault(_Enemy2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The MiniBoss class extends the Enemy class. It is a high health and damage enemy.
 */
var MiniBoss = function (_Enemy) {
  _inherits(MiniBoss, _Enemy);

  /**
   * The constructor initializes the fields of the MiniBoss. A call is made to the Enemy classes constructor with
   * the inputted x and y, the velocity set to 128, the health set to 500, the damage set to 50, and the pointsOnKill
   * set to 1000.
   * @param x The x position of the MiniBoss.
   * @param y The y position of the MiniBoss.
   */
  function MiniBoss(x, y) {
    _classCallCheck(this, MiniBoss);

    var _this = _possibleConstructorReturn(this, (MiniBoss.__proto__ || Object.getPrototypeOf(MiniBoss)).call(this, x, y, 128, 500, 50, 1000));

    _this.shootCooldown = 200;
    _this.shootCooldownRate = 1;
    _this.shootCooldownReset = 200;
    _get(MiniBoss.prototype.__proto__ || Object.getPrototypeOf(MiniBoss.prototype), 'loadImage', _this).call(_this, "Graphics/MiniBoss.png");
    _get(MiniBoss.prototype.__proto__ || Object.getPrototypeOf(MiniBoss.prototype), 'loadDamageTakenSound', _this).call(_this, 'Audio/MiniBossDamageTaken.mp3');
    return _this;
  }

  return MiniBoss;
}(_Enemy3.default);

exports.default = MiniBoss;

},{"./Enemy.js":2}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Enemy2 = require('./Enemy.js');

var _Enemy3 = _interopRequireDefault(_Enemy2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The ParasiteEnemy class extends the Enemy class. It is a very fast enemy with very low hp.
 */
var ParasiteEnemy = function (_Enemy) {
  _inherits(ParasiteEnemy, _Enemy);

  /**
   * The constructor initializes the fields of the ParasiteEnemy. A call is made to the Enemy classes constructor with
   * the inputted x and y, the velocity set to 512, the health set to 1, the damage set to 100, and the pointsOnKill
   * set to 500.
   * @param x The x position of the ParasiteEnemy.
   * @param y The y position of the ParasiteEnemy.
   */
  function ParasiteEnemy(x, y) {
    _classCallCheck(this, ParasiteEnemy);

    var _this = _possibleConstructorReturn(this, (ParasiteEnemy.__proto__ || Object.getPrototypeOf(ParasiteEnemy)).call(this, x, y, 512, 1, 99, 500));

    _get(ParasiteEnemy.prototype.__proto__ || Object.getPrototypeOf(ParasiteEnemy.prototype), 'loadImage', _this).call(_this, "Graphics/ParasiteEnemy.png");
    _get(ParasiteEnemy.prototype.__proto__ || Object.getPrototypeOf(ParasiteEnemy.prototype), 'loadDamageTakenSound', _this).call(_this, 'Audio/ParasiteEnemyDamageTaken.mp3');
    return _this;
  }

  return ParasiteEnemy;
}(_Enemy3.default);

exports.default = ParasiteEnemy;

},{"./Enemy.js":2}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Enemy2 = require('./Enemy.js');

var _Enemy3 = _interopRequireDefault(_Enemy2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The ProjectileEnemy class extends the enemy class. It can shoot projectiles at the player.
 */
var ProjectileEnemy = function (_Enemy) {
  _inherits(ProjectileEnemy, _Enemy);

  /**
   * The constructor initializes the fields of the ProjectileEnemy. A call is made to the Enemy classes constructor with
   * the inputted x and y, the velocity set to 96, the health set to 40, the damage set to 10, and the pointsOnKill
   * set to 250.
   * @param x The x position of the ProjectileEnemy.
   * @param y The y position of the ProjectileEnemy.
   */
  function ProjectileEnemy(x, y) {
    _classCallCheck(this, ProjectileEnemy);

    var _this = _possibleConstructorReturn(this, (ProjectileEnemy.__proto__ || Object.getPrototypeOf(ProjectileEnemy)).call(this, x, y, 96, 40, 10, 250));

    _this.shootCooldown = 300;
    _this.shootCooldownRate = 1;
    _this.shootCooldownReset = 300;
    _this.shootAmount = 1;
    _get(ProjectileEnemy.prototype.__proto__ || Object.getPrototypeOf(ProjectileEnemy.prototype), 'loadImage', _this).call(_this, "Graphics/ProjectileEnemy.png");
    _get(ProjectileEnemy.prototype.__proto__ || Object.getPrototypeOf(ProjectileEnemy.prototype), 'loadDamageTakenSound', _this).call(_this, 'Audio/ProjectileEnemyDamageTaken.mp3');
    return _this;
  }

  return ProjectileEnemy;
}(_Enemy3.default);

exports.default = ProjectileEnemy;

},{"./Enemy.js":2}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Enemy2 = require('./Enemy.js');

var _Enemy3 = _interopRequireDefault(_Enemy2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The RegularEnemy class extends the Enemy class. It has balanced stats across the board.
 */
var RegularEnemy = function (_Enemy) {
  _inherits(RegularEnemy, _Enemy);

  /**
   * The constructor initializes the fields of the RegularEnemy. A call is made to the Enemy classes constructor with
   * the inputted x and y, the velocity set to 64, the health set to 25, the damage set to 10, and the pointsOnKill
   * set to 100.
   * @param x The x position of the RegularEnemy.
   * @param y The y position of the RegularEnemy.
   */
  function RegularEnemy(x, y) {
    _classCallCheck(this, RegularEnemy);

    var _this = _possibleConstructorReturn(this, (RegularEnemy.__proto__ || Object.getPrototypeOf(RegularEnemy)).call(this, x, y, 64, 25, 10, 100));

    _get(RegularEnemy.prototype.__proto__ || Object.getPrototypeOf(RegularEnemy.prototype), 'loadImage', _this).call(_this, "Graphics/RegularEnemy.png");
    _get(RegularEnemy.prototype.__proto__ || Object.getPrototypeOf(RegularEnemy.prototype), 'loadDamageTakenSound', _this).call(_this, 'Audio/RegularEnemyDamageTaken.mp3');
    return _this;
  }

  return RegularEnemy;
}(_Enemy3.default);

exports.default = RegularEnemy;

},{"./Enemy.js":2}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Enemy2 = require('./Enemy.js');

var _Enemy3 = _interopRequireDefault(_Enemy2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The TankEnemy class extends the Enemy class. It is a slow enemy with high health and damage.
 */
var TankEnemy = function (_Enemy) {
  _inherits(TankEnemy, _Enemy);

  /**
   * The constructor initializes the fields of the TankEnemy. A call is made to the Enemy classes constructor with
   * the inputted x and y, the velocity set to 32, the health set to 100, the damage set to 25, and the pointsOnKill
   * set to 500.
   * @param x The x position of the TankEnemy.
   * @param y The y position of the TankEnemy.
   */
  function TankEnemy(x, y) {
    _classCallCheck(this, TankEnemy);

    var _this = _possibleConstructorReturn(this, (TankEnemy.__proto__ || Object.getPrototypeOf(TankEnemy)).call(this, x, y, 32, 100, 25, 500));

    _get(TankEnemy.prototype.__proto__ || Object.getPrototypeOf(TankEnemy.prototype), 'loadImage', _this).call(_this, "Graphics/TankEnemy.png");
    _get(TankEnemy.prototype.__proto__ || Object.getPrototypeOf(TankEnemy.prototype), 'loadDamageTakenSound', _this).call(_this, 'Audio/TankEnemyDamageTaken.mp3');
    return _this;
  }

  return TankEnemy;
}(_Enemy3.default);

exports.default = TankEnemy;

},{"./Enemy.js":2}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _EnvironmentObject2 = require("./EnvironmentObject.js");

var _EnvironmentObject3 = _interopRequireDefault(_EnvironmentObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The Bush class extends the EnvironmentObject class. It is a non-blocking object.
 */
var Bush = function (_EnvironmentObject) {
  _inherits(Bush, _EnvironmentObject);

  /**
   * The constructor initializes the fields of the Bush. A call is made to the EnvironmentObject classes constructor
   * with the inputted x and y, the health set to 100000, and isBlocking set to false.
   * @param x The x position of the Bush.
   * @param y The y position of the Bush.
   */
  function Bush(x, y) {
    _classCallCheck(this, Bush);

    var _this = _possibleConstructorReturn(this, (Bush.__proto__ || Object.getPrototypeOf(Bush)).call(this, x, y, 100000, false));

    _get(Bush.prototype.__proto__ || Object.getPrototypeOf(Bush.prototype), "loadImage", _this).call(_this, "Graphics/Bush.png");
    return _this;
  }

  return Bush;
}(_EnvironmentObject3.default);

exports.default = Bush;

},{"./EnvironmentObject.js":13}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _EnvironmentObject2 = require('./EnvironmentObject.js');

var _EnvironmentObject3 = _interopRequireDefault(_EnvironmentObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The Crate class extends the EnvironmentObject class. It is a blocking object with low health.
 */
var Crate = function (_EnvironmentObject) {
  _inherits(Crate, _EnvironmentObject);

  /**
   * The constructor initializes the fields of the Crate. A call is made to the EnvironmentObject classes constructor
   * with the inputted x and y, the health set to 100, and isBlocking set to true.
   * @param x The x position of the Crate.
   * @param y The y position of the Crate.
   */
  function Crate(x, y) {
    _classCallCheck(this, Crate);

    var _this = _possibleConstructorReturn(this, (Crate.__proto__ || Object.getPrototypeOf(Crate)).call(this, x, y, 100, true));

    _get(Crate.prototype.__proto__ || Object.getPrototypeOf(Crate.prototype), 'loadImage', _this).call(_this, "Graphics/Crate.png");
    _get(Crate.prototype.__proto__ || Object.getPrototypeOf(Crate.prototype), 'loadSound', _this).call(_this, 'Audio/BoxBreak.mp3');
    return _this;
  }

  return Crate;
}(_EnvironmentObject3.default);

exports.default = Crate;

},{"./EnvironmentObject.js":13}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The EnvironmentObject class is the parent for all environment objects.
 */
var EnvironmentObject = function () {

    /**
     * The constructor initializes the fields of the EnvironmentObject.
     * @param x The x position of the EnvironmentObject.
     * @param y The y position of the EnvironmentObject.
     * @param health The health of the EnvironmentObject.
     * @param isBlocking Whether the EnvironmentObject can be walked through.
     */
    function EnvironmentObject(x, y, health, isBlocking) {
        _classCallCheck(this, EnvironmentObject);

        this.x = x;
        this.y = y;
        this.health = health;
        this.isBlocking = isBlocking;
    }

    /**
     * This function sets the position of the environment object given x and y.
     * @param x The x position to be set.
     * @param y The y position to be set.
     */


    _createClass(EnvironmentObject, [{
        key: "setPosition",
        value: function setPosition(x, y) {
            this.x = x;
            this.y = y;
        }

        /**
         * The loadImage function takes in a url and loads it as an Image. Once the image is loaded, this.isImageLoaded is
         * set to true. The height and width of the EnvironmentObject are set to the height and width of the image.
         * @param url The url that should be loaded.
         */

    }, {
        key: "loadImage",
        value: function loadImage(url) {
            var _this = this;

            this.isImageLoaded = false;
            this.image = new Image();
            this.image.onload = function () {
                _this.isImageLoaded = true;
                _this.width = _this.image.width;
                _this.height = _this.image.height;
            };
            this.image.src = url;
        }
    }, {
        key: "loadSound",
        value: function loadSound(url) {
            var _this2 = this;

            this.isSoundLoaded = false;
            this.sound = new Audio();
            this.sound.onload = function () {
                _this2.isSoundLoaded = true;
            };
            this.sound.src = url;
        }

        /**
         * The draw function draws the image on the canvas at the x and y position of the EnvironmentObject.
         * @param ctx The context of the canvas.
         * @param camera The camera object.
         */

    }, {
        key: "draw",
        value: function draw(ctx, camera) {
            ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
        }
    }]);

    return EnvironmentObject;
}();

exports.default = EnvironmentObject;

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _EnvironmentObject2 = require('./EnvironmentObject.js');

var _EnvironmentObject3 = _interopRequireDefault(_EnvironmentObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The Rock class extends the EnvironmentObject class. It is a blocking object with high health.
 */
var Rock = function (_EnvironmentObject) {
  _inherits(Rock, _EnvironmentObject);

  /**
   * The constructor initializes the fields of the Rock. A call is made to the EnvironmentObject classes constructor
   * with the inputted x and y, the health set to 300, and isBlocking set to true.
   * @param x The x position of the Rock.
   * @param y The y position of the Rock.
   */
  function Rock(x, y) {
    _classCallCheck(this, Rock);

    var _this = _possibleConstructorReturn(this, (Rock.__proto__ || Object.getPrototypeOf(Rock)).call(this, x, y, 300, true));

    _get(Rock.prototype.__proto__ || Object.getPrototypeOf(Rock.prototype), 'loadImage', _this).call(_this, "Graphics/Rock.png");
    _get(Rock.prototype.__proto__ || Object.getPrototypeOf(Rock.prototype), 'loadSound', _this).call(_this, 'Audio/BoxBreak.mp3');
    return _this;
  }

  return Rock;
}(_EnvironmentObject3.default);

exports.default = Rock;

},{"./EnvironmentObject.js":13}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The Controller class listens for user inputs and stores what is being pressed.
 */
var Controller = function () {

    /**
     * The constructor initializes the fields of the Controller. It also adds event listeners for keydown, keyup, mousemove,
     * mousedown, and mouseup.
     * @param documentBody The body of the document.
     */
    function Controller(documentBody) {
        var _this = this;

        _classCallCheck(this, Controller);

        this.keysPressed = [];
        this.mouse = [0, 0];
        this.mousePressed = false;

        documentBody.addEventListener("keydown", function (event) {
            _this.keysPressed[event.keyCode] = true;
        });

        documentBody.addEventListener("keyup", function (event) {
            _this.keysPressed[event.keyCode] = false;
        });

        documentBody.addEventListener('mousemove', function (event) {
            _this.mouse[0] = event.clientX;
            _this.mouse[1] = event.clientY;
        });

        documentBody.addEventListener('mousedown', function (event) {
            _this.mousePressed = true;
        });

        documentBody.addEventListener('mouseup', function (event) {
            _this.mousePressed = false;
        });
    }

    /**
     * This function returns if the inputted key is being pressed.
     * @param key The key to check.
     * @returns {boolean} Whether the key is being pressed.
     */


    _createClass(Controller, [{
        key: "isKeyPressed",
        value: function isKeyPressed(key) {
            return this.keysPressed[key];
        }

        /**
         * This function checks if the mouse is being pressed.
         * @returns {boolean} Whether the mouse is pressed.
         */

    }, {
        key: "isMousePressed",
        value: function isMousePressed() {
            return this.mousePressed;
        }

        /**
         * This function returns the mouse position.
         * @returns {number[]} The x and y position of the mouse as an array. ([x,y])
         */

    }, {
        key: "getMousePosition",
        value: function getMousePosition() {
            return this.mouse;
        }
    }]);

    return Controller;
}();

exports.default = Controller;

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _World = require('./World.js');

var _World2 = _interopRequireDefault(_World);

var _Controller = require('./Controller.js');

var _Controller2 = _interopRequireDefault(_Controller);

var _EnemyProjectile = require('../Enemies/EnemyProjectile');

var _EnemyProjectile2 = _interopRequireDefault(_EnemyProjectile);

var _MiniBoss = require('../Enemies/MiniBoss');

var _MiniBoss2 = _interopRequireDefault(_MiniBoss);

var _FinalBoss = require('../Enemies/FinalBoss');

var _FinalBoss2 = _interopRequireDefault(_FinalBoss);

var _ProjectileEnemy = require('../Enemies/ProjectileEnemy');

var _ProjectileEnemy2 = _interopRequireDefault(_ProjectileEnemy);

var _Cursor = require('../Cursor.js');

var _Cursor2 = _interopRequireDefault(_Cursor);

var _Pistol = require('../Weapons/Pistol');

var _Pistol2 = _interopRequireDefault(_Pistol);

var _Sniper = require('../Weapons/Sniper');

var _Sniper2 = _interopRequireDefault(_Sniper);

var _Shotgun = require('../Weapons/Shotgun');

var _Shotgun2 = _interopRequireDefault(_Shotgun);

var _AssaultRifle = require('../Weapons/AssaultRifle');

var _AssaultRifle2 = _interopRequireDefault(_AssaultRifle);

var _Flamethrower = require('../Weapons/Flamethrower');

var _Flamethrower2 = _interopRequireDefault(_Flamethrower);

var _Bullet50cal = require('../Weapons/Bullet50cal');

var _Bullet50cal2 = _interopRequireDefault(_Bullet50cal);

var _Bullet = require('../Weapons/Bullet556');

var _Bullet2 = _interopRequireDefault(_Bullet);

var _Bullet12Gauge = require('../Weapons/Bullet12Gauge');

var _Bullet12Gauge2 = _interopRequireDefault(_Bullet12Gauge);

var _Bullet9mm = require('../Weapons/Bullet9mm');

var _Bullet9mm2 = _interopRequireDefault(_Bullet9mm);

var _BulletFire = require('../Weapons/BulletFire');

var _BulletFire2 = _interopRequireDefault(_BulletFire);

var _Util = require('../Utilities/Util.js');

var _Util2 = _interopRequireDefault(_Util);

var _SpikeTrap = require('../Weapons/SpikeTrap');

var _SpikeTrap2 = _interopRequireDefault(_SpikeTrap);

var _TarTrap = require('../Weapons/TarTrap');

var _TarTrap2 = _interopRequireDefault(_TarTrap);

var _SpikeTrapPlaced = require('../PlacedTraps/SpikeTrapPlaced');

var _SpikeTrapPlaced2 = _interopRequireDefault(_SpikeTrapPlaced);

var _TarTrapPlaced = require('../PlacedTraps/TarTrapPlaced');

var _TarTrapPlaced2 = _interopRequireDefault(_TarTrapPlaced);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The Game class is used to store the game state. It also allows for the game to be updated or drawn.
 */
var Game = function () {

    /**
     * The constructor initializes the fields of the Game class. The gameState is set to 'Playing' initially.
     * @param canvas The canvas.
     * @param documentBody The body of the document.
     */
    function Game(canvas, documentBody) {
        _classCallCheck(this, Game);

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.world = new _World2.default(canvas);
        this.controller = new _Controller2.default(documentBody);
        this.cursor = new _Cursor2.default();
        this.gameState = 'Playing';
        this.score = 0;
        this.topScores = [0, 0, 0];
        this.comboLength = 0;
        this.comboEnemiesKilled = 0;
    }

    /**
     * This function updates the game. If the gameState is 'Playing,' everything in the world is checked and updated.
     * If the gameState is 'Paused,' everything in the world remains still until the resume button is pressed. If the
     * gameState is 'Game Over,' everything in the world remains still until the Try Again button is pressed.
     * @param modifier The modifier to be used for movement.
     */


    _createClass(Game, [{
        key: 'update',
        value: function update(modifier) {
            if (this.gameState === 'Playing') {
                if (this.world.player.health <= 0) {
                    this.gameState = 'Game Over';
                    this.updateTopScores();
                } else if (this.controller.isKeyPressed(27)) this.gameState = 'Paused';

                this.comboLength -= modifier;
                if (this.comboLength < 0) {
                    this.comboEnemiesKilled = 0;
                    this.comboLength = 0;
                }

                this.updatePlayer(modifier);
                this.updateShot();
                this.updateEquipped();
                this.updateEnemies(modifier);
                this.updatePickUps();
                this.updateWeaponCooldown(modifier);
                this.updateProjectiles(modifier);
                this.updateEnvironmentObjects();
                this.world.camera.update();

                if (this.world.enemies.length === 0) {
                    this.world.wave += 1;
                    this.world.startWave();
                }
            } else if (this.gameState === 'Game Over') {
                this.updateGameOver();
            } else if (this.gameState === 'Paused') {
                this.updatePauseScreen();
            }
        }

        /**
         * This function draws everything in the world. If the gameState is 'Game Over,' a game over message is displayed,
         * if the gameState is 'Paused,' a pause message is displayed, and if the gameState is 'Playing,' all of the objects
         * in the world are drawn, along with the HUD, MiniMap, and cursor.
         */

    }, {
        key: 'draw',
        value: function draw() {
            if (this.gameState === 'Game Over') {
                this.drawGameOver();
                this.drawScoreboard();
            } else if (this.gameState === 'Paused') {
                this.drawPauseScreen();
            } else {
                if (this.world.isBackgroundLoaded) this.world.drawBackground(this.ctx, this.canvas);

                this.drawWeapons();
                this.drawPickUps();
                this.drawPlacedTraps();

                if (this.world.player.isImageLoaded) this.world.player.draw(this.ctx, this.world.camera, this.controller.mouse);

                this.drawEnemies();
                this.drawEnemyProjectiles();
                this.drawBullets();
                this.drawEnvironmentObjects();
                this.drawMiniMap();
                this.drawHUD();
            }
            this.ctx.drawImage(this.cursor.image, this.controller.mouse[0] - this.cursor.image.width / 2, this.controller.mouse[1] - this.cursor.image.height / 2);
        }

        /**
         * This function draws a MiniMap that displays the player's location, enemy locations, and environment object locations.
         */

    }, {
        key: 'drawMiniMap',
        value: function drawMiniMap() {
            this.ctx.fillStyle = 'rgba(35, 177, 77, 0.2)';
            this.ctx.strokeStyle = "#000";
            this.ctx.lineWidth = 3;
            this.ctx.fillRect(25, this.canvas.height - 250, 400, 225);
            this.ctx.strokeRect(25, this.canvas.height - 250, 400, 225);
            var xPercent = (this.world.player.x + this.world.player.width / 2) / this.world.width;
            var yPercent = (this.world.player.y + this.world.player.height / 2) / this.world.height;
            var xRelative = xPercent * 400;
            var yRelative = yPercent * 225;
            this.ctx.fillStyle = '#00FF00';
            this.ctx.beginPath();
            this.ctx.arc(25 + xRelative, this.canvas.height - 250 + yRelative, 2.5, 0, 2 * Math.PI);
            this.ctx.fill();
            for (var i = 0; i < this.world.environmentObjects.length; i++) {
                if (this.world.environmentObjects[i].isImageLoaded) {
                    var _xPercent = (this.world.environmentObjects[i].x + this.world.environmentObjects[i].width / 2) / this.world.width;
                    var _yPercent = (this.world.environmentObjects[i].y + this.world.environmentObjects[i].height / 2) / this.world.height;
                    var _xRelative = _xPercent * 400;
                    var _yRelative = _yPercent * 225;
                    this.ctx.fillStyle = '#808080';
                    this.ctx.beginPath();
                    this.ctx.arc(25 + _xRelative, this.canvas.height - 250 + _yRelative, 2.5, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
            }
            for (var _i = 0; _i < this.world.enemies.length; _i++) {
                if (this.world.enemies[_i].isImageLoaded) {
                    var _xPercent2 = (this.world.enemies[_i].x + this.world.enemies[_i].width / 2) / this.world.width;
                    var _yPercent2 = (this.world.enemies[_i].y + this.world.enemies[_i].height / 2) / this.world.height;
                    var _xRelative2 = _xPercent2 * 400;
                    var _yRelative2 = _yPercent2 * 225;
                    this.ctx.fillStyle = '#FF0000';
                    this.ctx.beginPath();
                    this.ctx.arc(25 + _xRelative2, this.canvas.height - 250 + _yRelative2, 2.5, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
            }
        }

        /**
         * This function draws the HUD which contains the player's health, the wave number, and the number of enemies left.
         * The current selected weapon is also displayed.
         */

    }, {
        key: 'drawHUD',
        value: function drawHUD() {
            this.ctx.font = "48px sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillStyle = '#FFF';
            this.ctx.strokeStyle = "#000";
            this.ctx.lineWidth = 1;
            this.ctx.fillText(this.world.player.health + " HP", this.canvas.width / 2 - 290, 50);
            this.ctx.strokeText(this.world.player.health + " HP", this.canvas.width / 2 - 290, 50);
            this.ctx.fillText("Wave " + this.world.wave, this.canvas.width / 2, 50);
            this.ctx.strokeText("Wave " + this.world.wave, this.canvas.width / 2, 50);
            this.ctx.fillText(this.world.enemies.length + " Enemies Left", this.canvas.width / 2 + 350, 50);
            this.ctx.strokeText(this.world.enemies.length + " Enemies Left", this.canvas.width / 2 + 350, 50);
            this.ctx.font = "48px sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillStyle = '#FFF';
            this.ctx.fillText('Active Weapon: ' + this.world.player.inventory[this.world.player.active_index].name, this.canvas.width / 2, this.canvas.height - 50);
            this.ctx.strokeText('Active Weapon: ' + this.world.player.inventory[this.world.player.active_index].name, this.canvas.width / 2, this.canvas.height - 50);
            this.ctx.fillText('Score: ' + this.score, this.canvas.width / 2, 125);
            this.ctx.strokeText('Score: ' + this.score, this.canvas.width / 2, 125);
            this.ctx.fillText('Combo: ' + this.comboEnemiesKilled, this.canvas.width / 2 + 350, 125);
            this.ctx.strokeText('Combo: ' + this.comboEnemiesKilled, this.canvas.width / 2 + 350, 125);
        }

        /**
         * This function draws all of the placed traps in the world.
         */

    }, {
        key: 'drawPlacedTraps',
        value: function drawPlacedTraps() {
            for (var i = 0; i < this.world.placedTraps.length; i++) {
                if (this.world.placedTraps[i].isImageLoaded) {
                    this.world.placedTraps[i].draw(this.ctx, this.world.camera);
                }
            }
        }

        /**
         * This function checks whether the restart button on the game over screen has been pressed. If it has, the world is
         * restarted, the game state is set to 'playing,' and the score is set to 0.
         */

    }, {
        key: 'updateGameOver',
        value: function updateGameOver() {
            if (this.controller.isMousePressed()) {
                if (this.controller.mouse[0] > this.canvas.width / 2 - 100 && this.controller.mouse[0] < this.canvas.width / 2 - 100 + 200 && this.controller.mouse[1] > this.canvas.height / 2 + 25 && this.controller.mouse[1] < this.canvas.height / 2 + 25 + 100) {
                    this.world.start(this.canvas);
                    this.gameState = 'Playing';
                    this.score = 0;
                }
            }
        }

        /**
         * This function draws the game over screen and a button to try again.
         */

    }, {
        key: 'drawGameOver',
        value: function drawGameOver() {
            this.ctx.font = "128px sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillStyle = '#FFF';
            this.ctx.lineWidth = 1;
            this.ctx.fillText("Game Over", this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.fillStyle = '#000';
            this.ctx.strokeText("Game Over", this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.fillStyle = '#FFF';
            this.ctx.fillRect(this.canvas.width / 2 - 100, this.canvas.height / 2 + 25, 200, 100);
            this.ctx.strokeRect(this.canvas.width / 2 - 100, this.canvas.height / 2 + 25, 200, 100);
            this.ctx.font = "24px sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillStyle = '#000';
            this.ctx.fillText("Try again?", this.canvas.width / 2 - 100 + 100, this.canvas.height / 2 + 25 + 50);
        }

        /**
         * This function updates the top scores based on the current score.
         */

    }, {
        key: 'updateTopScores',
        value: function updateTopScores() {
            if (this.score > this.topScores[0]) {
                this.topScores[2] = this.topScores[1];
                this.topScores[1] = this.topScores[0];
                this.topScores[0] = this.score;
            } else if (this.score > this.topScores[1]) {
                this.topScores[2] = this.topScores[1];
                this.topScores[1] = this.score;
            } else if (this.score > this.topScores[2]) {
                this.topScores[2] = this.score;
            }
        }

        /**
         * This function draws the top 3 scores.
         */

    }, {
        key: 'drawScoreboard',
        value: function drawScoreboard() {
            this.ctx.font = "60px sans-serif";
            this.ctx.fillStyle = '#FFF';
            this.ctx.textAlign = "start";
            this.ctx.fillText('High Scores', this.canvas.width / 2 + 440, this.canvas.height / 2 - 75);
            this.ctx.strokeText('High Scores', this.canvas.width / 2 + 440, this.canvas.height / 2 - 75);
            this.ctx.fillText('1st', this.canvas.width / 2 + 400, this.canvas.height / 2);
            this.ctx.strokeText('1st', this.canvas.width / 2 + 400, this.canvas.height / 2);
            this.ctx.fillText('2nd', this.canvas.width / 2 + 400, this.canvas.height / 2 + 75);
            this.ctx.strokeText('2nd', this.canvas.width / 2 + 400, this.canvas.height / 2 + 75);
            this.ctx.fillText('3rd', this.canvas.width / 2 + 400, this.canvas.height / 2 + 150);
            this.ctx.strokeText('3rd', this.canvas.width / 2 + 400, this.canvas.height / 2 + 150);
            this.ctx.textAlign = "end";
            this.ctx.fillText('' + this.topScores[0], this.canvas.width / 2 + 800, this.canvas.height / 2);
            this.ctx.strokeText('' + this.topScores[0], this.canvas.width / 2 + 800, this.canvas.height / 2);
            this.ctx.fillText('' + this.topScores[1], this.canvas.width / 2 + 800, this.canvas.height / 2 + 75);
            this.ctx.strokeText('' + this.topScores[1], this.canvas.width / 2 + 800, this.canvas.height / 2 + 75);
            this.ctx.fillText('' + this.topScores[2], this.canvas.width / 2 + 800, this.canvas.height / 2 + 150);
            this.ctx.strokeText('' + this.topScores[2], this.canvas.width / 2 + 800, this.canvas.height / 2 + 150);
        }

        /**
         * This function checks whether the resume button on the paused screen has been pressed. If it has, the game state is set to 'playing.'
         */

    }, {
        key: 'updatePauseScreen',
        value: function updatePauseScreen() {
            if (this.controller.isMousePressed()) {
                if (this.controller.mouse[0] > this.canvas.width / 2 - 100 && this.controller.mouse[0] < this.canvas.width / 2 - 100 + 200 && this.controller.mouse[1] > this.canvas.height / 2 + 25 && this.controller.mouse[1] < this.canvas.height / 2 + 25 + 100) {
                    this.gameState = 'Playing';
                }
            }
        }

        /**
         * This function draws the pause screen and a resume button.
         */

    }, {
        key: 'drawPauseScreen',
        value: function drawPauseScreen() {
            this.ctx.font = "128px sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillStyle = '#FFF';
            this.ctx.lineWidth = 1;
            this.ctx.fillText("Paused", this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.fillStyle = '#000';
            this.ctx.strokeText("Paused", this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.fillStyle = '#FFF';
            this.ctx.fillRect(this.canvas.width / 2 - 100, this.canvas.height / 2 + 25, 200, 100);
            this.ctx.strokeRect(this.canvas.width / 2 - 100, this.canvas.height / 2 + 25, 200, 100);
            this.ctx.font = "24px sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.fillStyle = '#000';
            this.ctx.fillText("Resume", this.canvas.width / 2 - 100 + 100, this.canvas.height / 2 + 25 + 50);
        }

        /**
         * This function draws all of the enemies in the world.
         */

    }, {
        key: 'drawEnemies',
        value: function drawEnemies() {
            for (var i = 0; i < this.world.enemies.length; i++) {
                if (this.world.enemies[i].isImageLoaded) {
                    this.world.enemies[i].draw(this.ctx, this.world.camera);
                }
            }
        }

        /**
         * This function updates the location of all of the enemies, updates their cooldowns, and removes them if they have
         * no health.
         * @param modifier The game modifier speed.
         */

    }, {
        key: 'updateEnemies',
        value: function updateEnemies(modifier) {
            for (var i = this.world.enemies.length - 1; i >= 0; i--) {
                this.world.enemies[i].move(this.world.player, modifier, this.world.environmentObjects, this.world.placedTraps, this.world.camera);
                if (this.world.enemies[i].attackCooldown > 0) this.world.enemies[i].attackCooldown -= 5;
                if (this.world.enemies[i] instanceof _FinalBoss2.default) {
                    if (this.world.enemies[i].rapidFireCooldown > 0 && !this.world.enemies[i].isRapidFire) this.world.enemies[i].rapidFireCooldown -= this.world.enemies[i].rapidFireCooldownRate;else if (this.world.enemies[i].rapidFireCooldown <= 0 && !this.world.enemies[i].isRapidFire) {
                        this.world.enemies[i].startRapidFire();
                        this.world.enemies[i].rapidFireLength = this.world.enemies[i].rapidFireLengthReset;
                    }
                    if (this.world.enemies[i].rapidFireLength > 0 && this.world.enemies[i].isRapidFire) this.world.enemies[i].rapidFireLength -= this.world.enemies[i].rapidFireCooldownRate;else if (this.world.enemies[i].rapidFireLength <= 0 && this.world.enemies[i].isRapidFire) {
                        this.world.enemies[i].endRapidFire();
                        this.world.enemies[i].rapidFireCooldown = this.world.enemies[i].rapidFireCooldownReset;
                    }

                    if (this.world.enemies[i].chargeAttackCooldown > 0 && !this.world.enemies[i].isChargeAttack) this.world.enemies[i].chargeAttackCooldown -= this.world.enemies[i].chargeAttackCooldownRate;else if (this.world.enemies[i].chargeAttackCooldown <= 0 && !this.world.enemies[i].isChargeAttack) {
                        this.world.enemies[i].startChargeAttack();
                        this.world.enemies[i].chargeAttackLength = this.world.enemies[i].chargeAttackLengthReset;
                    }
                    if (this.world.enemies[i].chargeAttackLength > 0 && this.world.enemies[i].isChargeAttack) this.world.enemies[i].chargeAttackLength -= this.world.enemies[i].chargeAttackCooldownRate;else if (this.world.enemies[i].chargeAttackLength <= 0 && this.world.enemies[i].isChargeAttack) {
                        this.world.enemies[i].endChargeAttack();
                        this.world.enemies[i].chargeAttackCooldown = this.world.enemies[i].chargeAttackCooldownReset;
                    }
                }
                if (this.world.enemies[i] instanceof _ProjectileEnemy2.default || this.world.enemies[i] instanceof _MiniBoss2.default || this.world.enemies[i] instanceof _FinalBoss2.default) {
                    if (this.world.enemies[i].shootCooldown > 0) this.world.enemies[i].shootCooldown -= this.world.enemies[i].shootCooldownRate;else {
                        this.world.enemyProjectiles.push(new _EnemyProjectile2.default(this.world.enemies[i].x + this.world.enemies[i].width / 2, this.world.enemies[i].y + this.world.enemies[i].height / 2, this.world.player.x + this.world.player.width / 2, this.world.player.y + this.world.player.height / 2));
                        this.world.enemies[i].shootCooldown += this.world.enemies[i].shootCooldownReset;
                    }
                }
                if (this.world.enemies[i].health <= 0) {
                    this.world.enemies[i].damageTakenSound.play();
                    this.comboEnemiesKilled += 1;
                    if (this.comboLength > 0) this.score += this.world.enemies[i].pointsOnKill * 2;else this.score += this.world.enemies[i].pointsOnKill;
                    this.comboLength = 3;
                    this.world.enemies.splice(i, 1);
                }
            }
        }

        /**
         * This function updates the players location based on user input.
         * @param modifier The game speed modifier.
         */

    }, {
        key: 'updatePlayer',
        value: function updatePlayer(modifier) {
            var sprinting = this.controller.isKeyPressed(16);
            if (this.controller.isKeyPressed(87)) {
                // Player holding up
                //Only move up if we are not at the very top of the world
                if (this.world.player.y >= 0) {
                    //If the player is sprinting he must move twice as fast
                    if (sprinting) this.world.player.y -= this.world.player.speed * modifier * 2;else this.world.player.y -= this.world.player.speed * modifier;
                    //If the movement caused the player to be colliding, undo the movement and give back the stamina if he was spritning.
                    if (this.world.player.isCollisionWithEnvironmentObject(this.world.environmentObjects)) {
                        if (sprinting) this.world.player.y += this.world.player.speed * modifier * 2;else this.world.player.y += this.world.player.speed * modifier;
                    }
                }
            }
            if (this.controller.isKeyPressed(83)) {
                // Player holding down
                //Only move down if we are not at the very bottom of the world
                if (this.world.player.y + this.world.player.height <= 5625) {
                    //If the player is sprinting he must move twice as fast, and his stamina must drain based on the modifier (seconds since last update)
                    if (sprinting) this.world.player.y += this.world.player.speed * modifier * 2;
                    //Otherwise move like normal
                    else this.world.player.y += this.world.player.speed * modifier;
                    //If the movement caused the player to be colliding, undo the movement and give back the stamina if he was spritning.
                    if (this.world.player.isCollisionWithEnvironmentObject(this.world.environmentObjects)) {
                        if (sprinting) this.world.player.y -= this.world.player.speed * modifier * 2;else this.world.player.y -= this.world.player.speed * modifier;
                    }
                }
            }
            if (this.controller.isKeyPressed(65)) {
                // Player holding left
                //only go left if we are not on the far left edge already
                if (this.world.player.x >= 0) {
                    if (sprinting) this.world.player.x -= this.world.player.speed * modifier * 2;else this.world.player.x -= this.world.player.speed * modifier;
                    if (this.world.player.isCollisionWithEnvironmentObject(this.world.environmentObjects)) {
                        if (sprinting) this.world.player.x += this.world.player.speed * modifier * 2;else this.world.player.x += this.world.player.speed * modifier;
                    }
                }
            }
            if (this.controller.isKeyPressed(68)) {
                // Player holding right
                if (this.world.player.x + this.world.player.width <= 10000) {
                    if (sprinting) this.world.player.x += this.world.player.speed * modifier * 2;else this.world.player.x += this.world.player.speed * modifier;
                    if (this.world.player.isCollisionWithEnvironmentObject(this.world.environmentObjects)) {
                        if (sprinting) this.world.player.x -= this.world.player.speed * modifier * 2;else this.world.player.x -= this.world.player.speed * modifier;
                    }
                }
            }
        }

        /**
         * This function removes environment objects that have no health remaining and plays a sound.
         */

    }, {
        key: 'updateEnvironmentObjects',
        value: function updateEnvironmentObjects() {
            for (var i = this.world.environmentObjects.length - 1; i >= 0; i--) {
                if (this.world.environmentObjects[i].health <= 0) {
                    this.world.environmentObjects[i].sound.play();
                    this.world.environmentObjects.splice(i, 1);
                }
            }
        }

        /**
         * This function draws all of the environment objects in the world.
         */

    }, {
        key: 'drawEnvironmentObjects',
        value: function drawEnvironmentObjects() {
            for (var i = 0; i < this.world.environmentObjects.length; i++) {
                if (this.world.environmentObjects[i].isImageLoaded) {
                    this.world.environmentObjects[i].draw(this.ctx, this.world.camera);
                }
            }
        }

        /**
         * This function draws all of the weapons in the world.
         */

    }, {
        key: 'drawWeapons',
        value: function drawWeapons() {
            for (var i = 0; i < this.world.groundWeapons.length; i++) {
                if (this.world.groundWeapons[i].isImageLoaded) {
                    this.world.groundWeapons[i].draw(this.ctx, this.world.camera);
                }
            }
        }

        /**
         * This function updates the pickups on the ground, such as ground weapons and medpacks. If the player collides with them,
         * they are removed from the world and either added to the player's inventory or consumed.
         */

    }, {
        key: 'updatePickUps',
        value: function updatePickUps() {
            // update ground weapons
            for (var i = this.world.groundWeapons.length - 1; i >= 0; i--) {
                if (_Util2.default.isCollision(this.world.player, this.world.groundWeapons[i])) {
                    var ownsWep = false;
                    for (var j = this.world.player.inventory.length - 1; j >= 0; j--) {
                        if (this.world.player.inventory[j].name === this.world.groundWeapons[i].weapon.name) {
                            ownsWep = true;
                        }
                    }
                    if (ownsWep === false) {
                        this.world.groundWeapons[i].addWeapon(this.world.player.inventory);
                        this.world.groundWeapons.splice(i, 1);
                    }
                }
            }
            // update medpacks
            for (var _i2 = this.world.pickUps.length - 1; _i2 >= 0; _i2--) {
                if (_Util2.default.isCollision(this.world.player, this.world.pickUps[_i2])) {
                    if (this.world.player.health < 100) {
                        this.world.player.health = 100;
                        this.world.pickUps.splice(_i2, 1);
                    }
                }
            }
        }

        /**
         * This function updates the cooldown of all of the weapons in the player's inventory.
         * @param modifier The game speed modifier.
         */

    }, {
        key: 'updateWeaponCooldown',
        value: function updateWeaponCooldown(modifier) {
            for (var i = this.world.player.inventory.length - 1; i >= 0; i--) {
                var wep = this.world.player.inventory[i];
                if (wep.cooldown > 0) {
                    wep.cooldown -= modifier;
                }
            }
        }

        /**
         * This function draws all of the live bullets in the world.
         */

    }, {
        key: 'drawBullets',
        value: function drawBullets() {
            for (var i = 0; i < this.world.bullets.length; i++) {
                if (this.world.bullets[i].isImageLoaded && this.world.bullets[i].live) {
                    this.world.bullets[i].draw(this.ctx, this.world.camera);
                }
            }
        }

        /**
         * This function adds new bullets to the world depending on if the player pressed their mouse button and what weapon
         * was equipped. It checks the type of weapon the player has equipped and fires the correct bullets. Shotgun is unique
         * in that it fires 5 bullets with a spread which is done by adding/subtracting a constant from the destination.
         * If a trap is currently equipped, it is placed at the mouse position and removed from the player's inventory.
         */

    }, {
        key: 'updateShot',
        value: function updateShot() {
            if (this.controller.isMousePressed()) {
                var wep = this.world.player.inventory[this.world.player.active_index];
                if (wep.cooldown <= 0) {
                    wep.sound.play();
                    wep.sound.currentTime = 0;
                    wep.addCooldown();
                    if (wep instanceof _Pistol2.default) {
                        this.world.bullets.push(new _Bullet9mm2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y + this.world.player.height / 2, this.controller.mouse[0] + this.world.camera.x, this.controller.mouse[1] + this.world.camera.y));
                    } else if (wep instanceof _Sniper2.default) {
                        this.world.bullets.push(new _Bullet50cal2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y + this.world.player.height / 2, this.controller.mouse[0] + this.world.camera.x, this.controller.mouse[1] + this.world.camera.y));
                    } else if (wep instanceof _AssaultRifle2.default) {
                        this.world.bullets.push(new _Bullet2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y + this.world.player.height / 2, this.controller.mouse[0] + this.world.camera.x, this.controller.mouse[1] + this.world.camera.y));
                    } else if (wep instanceof _Shotgun2.default) {
                        this.world.bullets.push(new _Bullet12Gauge2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y + this.world.player.height / 2, this.controller.mouse[0] + this.world.camera.x, this.controller.mouse[1] + this.world.camera.y));
                        this.world.bullets.push(new _Bullet12Gauge2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y + this.world.player.height / 2, this.controller.mouse[0] + this.world.camera.x + 25, this.controller.mouse[1] + this.world.camera.y + 25));
                        this.world.bullets.push(new _Bullet12Gauge2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y + this.world.player.height / 2, this.controller.mouse[0] + this.world.camera.x + 50, this.controller.mouse[1] + this.world.camera.y + 50));
                        this.world.bullets.push(new _Bullet12Gauge2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y + this.world.player.height / 2, this.controller.mouse[0] + this.world.camera.x - 25, this.controller.mouse[1] + this.world.camera.y - 25));
                        this.world.bullets.push(new _Bullet12Gauge2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y + this.world.player.height / 2, this.controller.mouse[0] + this.world.camera.x - 50, this.controller.mouse[1] + this.world.camera.y - 50));
                    }
                    //the flamethrower will shoot a single ball of fire each update if possible with a slight random spread
                    //so the fire does not go in a straight line.
                    else if (wep instanceof _Flamethrower2.default) {
                            var spread1_x = _Util2.default.randomIntFromInterval(-100, 100);
                            var spread1_y = _Util2.default.randomIntFromInterval(-100, 100);
                            var spread2_x = _Util2.default.randomIntFromInterval(-100, 100);
                            var spread2_y = _Util2.default.randomIntFromInterval(-100, 100);
                            var spread3_x = _Util2.default.randomIntFromInterval(-100, 100);
                            var spread3_y = _Util2.default.randomIntFromInterval(-100, 10);
                            this.world.bullets.push(new _BulletFire2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y + this.world.player.height / 2, this.controller.mouse[0] + this.world.camera.x + spread1_x, this.controller.mouse[1] + this.world.camera.y + spread1_y));
                            this.world.bullets.push(new _BulletFire2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y + this.world.player.height / 2, this.controller.mouse[0] + this.world.camera.x + spread2_x, this.controller.mouse[1] + this.world.camera.y + spread2_y));
                            this.world.bullets.push(new _BulletFire2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y + this.world.player.height / 2, this.controller.mouse[0] + this.world.camera.x + spread3_x, this.controller.mouse[1] + this.world.camera.y + spread3_y));
                        } else if (wep instanceof _SpikeTrap2.default) {
                            this.world.player.inventory.splice(this.world.player.active_index, 1);
                            this.world.player.active_index = this.world.player.active_index - 1;
                            this.world.placedTraps.push(new _SpikeTrapPlaced2.default(this.controller.mouse[0] + this.world.camera.x - 200, this.controller.mouse[1] + this.world.camera.y - 200));
                        } else if (wep instanceof _TarTrap2.default) {
                            this.world.player.inventory.splice(this.world.player.active_index, 1);
                            this.world.player.active_index = this.world.player.active_index - 1;
                            this.world.placedTraps.push(new _TarTrapPlaced2.default(this.controller.mouse[0] + this.world.camera.x - 200, this.controller.mouse[1] + this.world.camera.y - 200));
                        }
                }
            }
        }

        /**
         * This function updates what the player has equipped based on what key is pressed.
         */

    }, {
        key: 'updateEquipped',
        value: function updateEquipped() {
            if (this.controller.isKeyPressed(49)) // Player pressed 1
                this.world.player.active_index = 0;
            if (this.controller.isKeyPressed(50)) {
                // Player pressed 2
                if (this.world.player.inventory.length > 1) this.world.player.active_index = 1;
            }
            if (this.controller.isKeyPressed(51)) {
                // Player pressed 3
                if (this.world.player.inventory.length > 2) this.world.player.active_index = 2;
            }
            if (this.controller.isKeyPressed(52)) {
                // Player pressed 4
                if (this.world.player.inventory.length > 3) this.world.player.active_index = 3;
            }
            if (this.controller.isKeyPressed(53)) {
                // Player pressed 5
                if (this.world.player.inventory.length > 4) this.world.player.active_index = 4;
            }
            if (this.controller.isKeyPressed(54)) {
                // Player pressed 6
                if (this.world.player.inventory.length > 5) this.world.player.active_index = 5;
            }
            if (this.controller.isKeyPressed(55)) {
                // Player pressed 7
                if (this.world.player.inventory.length > 6) this.world.player.active_index = 6;
            }
        }

        /**
         * This function updates bullets and enemy projectiles in the world. If a projectile hits an object enemy/player
         * it disappears from the world.
         * @param modifier The game speed modifier.
         */

    }, {
        key: 'updateProjectiles',
        value: function updateProjectiles(modifier) {
            // enemy projectiles
            for (var i = this.world.enemyProjectiles.length - 1; i >= 0; i--) {
                this.world.enemyProjectiles[i].move(modifier, this.world.environmentObjects, this.world.player);
                if (this.world.enemyProjectiles[i].live === false) {
                    this.world.enemyProjectiles.splice(i, 1);
                }
            }
            // player bullets
            for (var _i3 = this.world.bullets.length - 1; _i3 >= 0; _i3--) {
                this.world.bullets[_i3].move(modifier, this.world.environmentObjects, this.world.enemies);
                if (this.world.bullets[_i3].live === false) {
                    this.world.bullets.splice(_i3, 1);
                }
            }
        }

        /**
         * This function draws all of the live enemy projectiles in the world.
         */

    }, {
        key: 'drawEnemyProjectiles',
        value: function drawEnemyProjectiles() {
            for (var i = 0; i < this.world.enemyProjectiles.length; i++) {
                if (this.world.enemyProjectiles[i].isImageLoaded && this.world.enemyProjectiles[i].live) {
                    this.world.enemyProjectiles[i].draw(this.ctx, this.world.camera);
                }
            }
        }

        /**
         * This function draws all of the pick ups in the world.
         */

    }, {
        key: 'drawPickUps',
        value: function drawPickUps() {
            for (var i = 0; i < this.world.pickUps.length; i++) {
                if (this.world.pickUps[i].isImageLoaded) {
                    this.world.pickUps[i].draw(this.ctx, this.world.camera);
                }
            }
        }
    }]);

    return Game;
}();

exports.default = Game;

},{"../Cursor.js":1,"../Enemies/EnemyProjectile":3,"../Enemies/FinalBoss":4,"../Enemies/MiniBoss":6,"../Enemies/ProjectileEnemy":8,"../PlacedTraps/SpikeTrapPlaced":28,"../PlacedTraps/TarTrapPlaced":29,"../Utilities/Util.js":32,"../Weapons/AssaultRifle":33,"../Weapons/Bullet12Gauge":35,"../Weapons/Bullet50cal":36,"../Weapons/Bullet556":37,"../Weapons/Bullet9mm":38,"../Weapons/BulletFire":39,"../Weapons/Flamethrower":40,"../Weapons/Pistol":41,"../Weapons/Shotgun":42,"../Weapons/Sniper":43,"../Weapons/SpikeTrap":44,"../Weapons/TarTrap":45,"./Controller.js":15,"./World.js":17}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Rock = require("../EnvironmentObjects/Rock");

var _Rock2 = _interopRequireDefault(_Rock);

var _Bush = require("../EnvironmentObjects/Bush");

var _Bush2 = _interopRequireDefault(_Bush);

var _Crate = require("../EnvironmentObjects/Crate");

var _Crate2 = _interopRequireDefault(_Crate);

var _TankEnemy = require("../Enemies/TankEnemy");

var _TankEnemy2 = _interopRequireDefault(_TankEnemy);

var _RegularEnemy = require("../Enemies/RegularEnemy");

var _RegularEnemy2 = _interopRequireDefault(_RegularEnemy);

var _LightEnemy = require("../Enemies/LightEnemy");

var _LightEnemy2 = _interopRequireDefault(_LightEnemy);

var _ProjectileEnemy = require("../Enemies/ProjectileEnemy");

var _ProjectileEnemy2 = _interopRequireDefault(_ProjectileEnemy);

var _MiniBoss = require("../Enemies/MiniBoss");

var _MiniBoss2 = _interopRequireDefault(_MiniBoss);

var _FinalBoss = require("../Enemies/FinalBoss");

var _FinalBoss2 = _interopRequireDefault(_FinalBoss);

var _Player = require("../Players/Player");

var _Player2 = _interopRequireDefault(_Player);

var _Camera = require("../Players/Camera");

var _Camera2 = _interopRequireDefault(_Camera);

var _GroundAssaultRifle = require("../PickUps/GroundAssaultRifle.js");

var _GroundAssaultRifle2 = _interopRequireDefault(_GroundAssaultRifle);

var _GroundSniper = require("../PickUps/GroundSniper.js");

var _GroundSniper2 = _interopRequireDefault(_GroundSniper);

var _GroundShotgun = require("../PickUps/GroundShotgun.js");

var _GroundShotgun2 = _interopRequireDefault(_GroundShotgun);

var _GroundFlamethrower = require("../PickUps/GroundFlamethrower.js");

var _GroundFlamethrower2 = _interopRequireDefault(_GroundFlamethrower);

var _Healthpack = require("../PickUps/Healthpack.js");

var _Healthpack2 = _interopRequireDefault(_Healthpack);

var _Util = require("../Utilities/Util");

var _Util2 = _interopRequireDefault(_Util);

var _ParasiteEnemy = require("../Enemies/ParasiteEnemy");

var _ParasiteEnemy2 = _interopRequireDefault(_ParasiteEnemy);

var _GroundSpikeTrap = require("../PickUps/GroundSpikeTrap.js");

var _GroundSpikeTrap2 = _interopRequireDefault(_GroundSpikeTrap);

var _GroundTarTrap = require("../PickUps/GroundTarTrap.js");

var _GroundTarTrap2 = _interopRequireDefault(_GroundTarTrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The World class holds the information related to the world.
 */
var World = function () {

    /**
     * The constructor initializes the field of the world and loads the background.
     * @param canvas The canvas.
     */
    function World(canvas) {
        _classCallCheck(this, World);

        this.start(canvas);
        this.loadBackground();
    }

    /**
     * The start function initializes the fields of the World. The player is made and the camera is attached to the player.
     * A call is to initialize the environment and start the wave.
     * @param canvas The canvas.
     */


    _createClass(World, [{
        key: "start",
        value: function start(canvas) {
            this.environmentObjects = [];
            this.enemies = [];
            this.bullets = [];
            this.enemyProjectiles = [];
            this.pickUps = [];
            this.groundWeapons = [];
            this.placedTraps = [];
            this.initializeEnvironment();
            this.initializePickUps();
            this.player = new _Player2.default(canvas.width / 2, canvas.height / 2);
            this.camera = new _Camera2.default(0, 0, canvas.width, canvas.height, 10000, 5625);
            this.camera.follow(this.player, canvas.width / 2, canvas.height / 2);
            this.wave = 1;
            this.startWave();
        }

        /**
         * This function initializes the environment by pushing environment objects onto the environmentObjects array.
         */

    }, {
        key: "initializeEnvironment",
        value: function initializeEnvironment() {
            var crateCap = 15;
            var bushCap = 15;
            var rockCap = 15;

            for (var i = 0; i < crateCap; i++) {
                this.environmentObjects.push(new _Crate2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i = 0; _i < bushCap; _i++) {
                this.environmentObjects.push(new _Bush2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i2 = 0; _i2 < rockCap; _i2++) {
                this.environmentObjects.push(new _Rock2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }var collisionFlag = true;
            while (collisionFlag === true) {
                var _i3 = _Util2.default.areAnyCollisionsInSameArray(this.environmentObjects);
                if (_i3 === -1) collisionFlag = false;else this.environmentObjects[_i3].setPosition(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375));
            }
        }

        /**
         * This function initializes PickUps such as weapons and health packs by pushing them onto the PickUps and groundWeapons arrays.
         */

    }, {
        key: "initializePickUps",
        value: function initializePickUps() {
            var sniperCap = 3;
            var assaultRifleCap = 5;
            var shotgunCap = 5;
            var spikeTrapCap = 5;
            var tarTrapCap = 5;
            var flamethrowerCap = 5;
            var healthPackCap = 7;

            for (var i = 0; i < sniperCap; i++) {
                this.groundWeapons.push(new _GroundSniper2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i4 = 0; _i4 < assaultRifleCap; _i4++) {
                this.groundWeapons.push(new _GroundAssaultRifle2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i5 = 0; _i5 < shotgunCap; _i5++) {
                this.groundWeapons.push(new _GroundShotgun2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i6 = 0; _i6 < flamethrowerCap; _i6++) {
                this.groundWeapons.push(new _GroundFlamethrower2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i7 = 0; _i7 < spikeTrapCap; _i7++) {
                this.groundWeapons.push(new _GroundSpikeTrap2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i8 = 0; _i8 < tarTrapCap; _i8++) {
                this.groundWeapons.push(new _GroundTarTrap2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i9 = 0; _i9 < healthPackCap; _i9++) {
                this.pickUps.push(new _Healthpack2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }var selfCollisionFlag = true;
            while (selfCollisionFlag) {
                var _i10 = _Util2.default.areAnyCollisionsInSameArray(this.groundWeapons);
                if (_i10 === -1) selfCollisionFlag = false;else this.groundWeapons[_i10].setPosition(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375));
            }

            selfCollisionFlag = true;
            while (selfCollisionFlag) {
                var _i11 = _Util2.default.areAnyCollisionsInSameArray(this.pickUps);
                if (_i11 === -1) selfCollisionFlag = false;else this.pickUps[_i11].setPosition(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375));
            }
        }

        /**
         * This function starts the wave by pushing enemies onto the enemies array.
         */

    }, {
        key: "startWave",
        value: function startWave() {
            var lightEnemyCap = this.wave * 10;
            var regularEnemyCap = this.wave * 10;
            var tankEnemyCap = this.wave * 5;
            var projectileEnemyCap = Math.floor(this.wave / 2) * 5;
            var miniBossCap = Math.floor(this.wave / 5);
            var parasiteEnemyCap = this.wave;

            if (this.wave === 6) {
                this.enemies.push(new _FinalBoss2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            } else {
                for (var i = 0; i < lightEnemyCap; i++) {
                    this.enemies.push(new _LightEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
                }for (var _i12 = 0; _i12 < regularEnemyCap; _i12++) {
                    this.enemies.push(new _RegularEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
                }for (var _i13 = 0; _i13 < tankEnemyCap; _i13++) {
                    this.enemies.push(new _TankEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
                }for (var _i14 = 0; _i14 < projectileEnemyCap; _i14++) {
                    this.enemies.push(new _ProjectileEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
                }for (var _i15 = 0; _i15 < miniBossCap; _i15++) {
                    this.enemies.push(new _MiniBoss2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
                }for (var _i16 = 0; _i16 < parasiteEnemyCap; _i16++) {
                    this.enemies.push(new _ParasiteEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
                }
            }

            var collisionFlag = true;
            while (collisionFlag === true) {
                var _i17 = _Util2.default.areAnyCollisions(this.enemies, this.environmentObjects);
                if (_i17 === -1) collisionFlag = false;else this.enemies[_i17].setPosition(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375));
            }
        }

        /**
         * The loadBackground function loads the background image. Once the image is loaded, this.isBackgroundLoaded is
         * set to true.
         */

    }, {
        key: "loadBackground",
        value: function loadBackground() {
            var _this = this;

            this.isBackgroundLoaded = false;
            this.background = new Image();
            this.background.onload = function () {
                _this.isBackgroundLoaded = true;
                _this.width = _this.background.width;
                _this.height = _this.background.height;
            };
            this.background.src = "Graphics/Background.png";
        }

        /**
         * The drawBackground function draws the background of the world.
         * @param ctx The context of the canvas.
         * @param canvas The canvas.
         */

    }, {
        key: "drawBackground",
        value: function drawBackground(ctx, canvas) {
            var sWidth = void 0,
                sHeight = void 0;
            sWidth = canvas.width;
            sHeight = canvas.height;

            if (this.background.width - this.camera.x < canvas.width) sWidth = this.background.width - this.camera.x;
            if (this.background.height - this.camera.y < canvas.height) sHeight = this.background.height - this.camera.y;

            ctx.drawImage(this.background, this.camera.x, this.camera.y, sWidth, sHeight, 0, 0, sWidth, sHeight);
        }
    }]);

    return World;
}();

exports.default = World;

},{"../Enemies/FinalBoss":4,"../Enemies/LightEnemy":5,"../Enemies/MiniBoss":6,"../Enemies/ParasiteEnemy":7,"../Enemies/ProjectileEnemy":8,"../Enemies/RegularEnemy":9,"../Enemies/TankEnemy":10,"../EnvironmentObjects/Bush":11,"../EnvironmentObjects/Crate":12,"../EnvironmentObjects/Rock":14,"../PickUps/GroundAssaultRifle.js":19,"../PickUps/GroundFlamethrower.js":20,"../PickUps/GroundShotgun.js":21,"../PickUps/GroundSniper.js":22,"../PickUps/GroundSpikeTrap.js":23,"../PickUps/GroundTarTrap.js":24,"../PickUps/Healthpack.js":26,"../Players/Camera":30,"../Players/Player":31,"../Utilities/Util":32}],18:[function(require,module,exports){
"use strict";

var _Game = require("./Game/Game.js");

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.createElement("canvas"); /*
                                                 Sources:
                                                 http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
                                                 https://stackoverflow.com/questions/4037212/html-canvas-full-screen?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
                                                 https://stackoverflow.com/questions/16919601/html5-canvas-world.camera-viewport-how-to-actally-do-it?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
                                                 http://jsfiddle.net/gfcarv/QKgHs/
                                                */

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

var game = new _Game2.default(canvas, document.body);

var main = function main() {
    var now = Date.now();
    var delta = now - then;

    game.update(delta / 1000);
    game.draw();

    then = now;

    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

var then = Date.now();
main();

},{"./Game/Game.js":16}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GroundWeapon2 = require('./GroundWeapon.js');

var _GroundWeapon3 = _interopRequireDefault(_GroundWeapon2);

var _AssaultRifle = require('../Weapons/AssaultRifle.js');

var _AssaultRifle2 = _interopRequireDefault(_AssaultRifle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The GroundAssaultRifle class extends the GroundWeapon class.
 */
var GroundAssaultRifle = function (_GroundWeapon) {
    _inherits(GroundAssaultRifle, _GroundWeapon);

    function GroundAssaultRifle(x, y) {
        _classCallCheck(this, GroundAssaultRifle);

        var weapon = new _AssaultRifle2.default();

        var _this = _possibleConstructorReturn(this, (GroundAssaultRifle.__proto__ || Object.getPrototypeOf(GroundAssaultRifle)).call(this, x, y, weapon));

        _get(GroundAssaultRifle.prototype.__proto__ || Object.getPrototypeOf(GroundAssaultRifle.prototype), 'loadImage', _this).call(_this, "Graphics/GroundAssaultRifle.png");
        return _this;
    }

    return GroundAssaultRifle;
}(_GroundWeapon3.default);

exports.default = GroundAssaultRifle;

},{"../Weapons/AssaultRifle.js":33,"./GroundWeapon.js":25}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GroundWeapon2 = require('./GroundWeapon.js');

var _GroundWeapon3 = _interopRequireDefault(_GroundWeapon2);

var _Flamethrower = require('../Weapons/Flamethrower.js');

var _Flamethrower2 = _interopRequireDefault(_Flamethrower);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The GroundAssaultRifle class extends the GroundWeapon class.
 */
var GroundFlamethrower = function (_GroundWeapon) {
    _inherits(GroundFlamethrower, _GroundWeapon);

    function GroundFlamethrower(x, y) {
        _classCallCheck(this, GroundFlamethrower);

        var weapon = new _Flamethrower2.default();

        var _this = _possibleConstructorReturn(this, (GroundFlamethrower.__proto__ || Object.getPrototypeOf(GroundFlamethrower)).call(this, x, y, weapon));

        _get(GroundFlamethrower.prototype.__proto__ || Object.getPrototypeOf(GroundFlamethrower.prototype), 'loadImage', _this).call(_this, "Graphics/GroundFlamethrower.png");
        return _this;
    }

    return GroundFlamethrower;
}(_GroundWeapon3.default);

exports.default = GroundFlamethrower;

},{"../Weapons/Flamethrower.js":40,"./GroundWeapon.js":25}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GroundWeapon2 = require('./GroundWeapon.js');

var _GroundWeapon3 = _interopRequireDefault(_GroundWeapon2);

var _Shotgun = require('../Weapons/Shotgun.js');

var _Shotgun2 = _interopRequireDefault(_Shotgun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The GroundAssaultRifle class extends the GroundWeapon class.
 */
var GroundShotgun = function (_GroundWeapon) {
    _inherits(GroundShotgun, _GroundWeapon);

    function GroundShotgun(x, y) {
        _classCallCheck(this, GroundShotgun);

        var weapon = new _Shotgun2.default();

        var _this = _possibleConstructorReturn(this, (GroundShotgun.__proto__ || Object.getPrototypeOf(GroundShotgun)).call(this, x, y, weapon));

        _get(GroundShotgun.prototype.__proto__ || Object.getPrototypeOf(GroundShotgun.prototype), 'loadImage', _this).call(_this, "Graphics/GroundShotgun.png");
        return _this;
    }

    return GroundShotgun;
}(_GroundWeapon3.default);

exports.default = GroundShotgun;

},{"../Weapons/Shotgun.js":42,"./GroundWeapon.js":25}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GroundWeapon2 = require('./GroundWeapon.js');

var _GroundWeapon3 = _interopRequireDefault(_GroundWeapon2);

var _Weapon = require('../Weapons/Weapon.js');

var _Weapon2 = _interopRequireDefault(_Weapon);

var _Sniper = require('../Weapons/Sniper.js');

var _Sniper2 = _interopRequireDefault(_Sniper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The GroundSniper class extends the GroundWeapon class.
 */
var GroundSniper = function (_GroundWeapon) {
    _inherits(GroundSniper, _GroundWeapon);

    function GroundSniper(x, y) {
        _classCallCheck(this, GroundSniper);

        var weapon = new _Sniper2.default();

        var _this = _possibleConstructorReturn(this, (GroundSniper.__proto__ || Object.getPrototypeOf(GroundSniper)).call(this, x, y, weapon));

        _get(GroundSniper.prototype.__proto__ || Object.getPrototypeOf(GroundSniper.prototype), 'loadImage', _this).call(_this, "Graphics/GroundSniper.png");
        return _this;
    }

    return GroundSniper;
}(_GroundWeapon3.default);

exports.default = GroundSniper;

},{"../Weapons/Sniper.js":43,"../Weapons/Weapon.js":46,"./GroundWeapon.js":25}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GroundWeapon2 = require('./GroundWeapon.js');

var _GroundWeapon3 = _interopRequireDefault(_GroundWeapon2);

var _SpikeTrap = require('../Weapons/SpikeTrap.js');

var _SpikeTrap2 = _interopRequireDefault(_SpikeTrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The GroundSpikeTrap class extends the GroundWeapon class.
 */
var GroundSpikeTrap = function (_GroundWeapon) {
    _inherits(GroundSpikeTrap, _GroundWeapon);

    function GroundSpikeTrap(x, y) {
        _classCallCheck(this, GroundSpikeTrap);

        var weapon = new _SpikeTrap2.default();

        var _this = _possibleConstructorReturn(this, (GroundSpikeTrap.__proto__ || Object.getPrototypeOf(GroundSpikeTrap)).call(this, x, y, weapon));

        _get(GroundSpikeTrap.prototype.__proto__ || Object.getPrototypeOf(GroundSpikeTrap.prototype), 'loadImage', _this).call(_this, "Graphics/GroundSpikeTrap.png");
        return _this;
    }

    return GroundSpikeTrap;
}(_GroundWeapon3.default);

exports.default = GroundSpikeTrap;

},{"../Weapons/SpikeTrap.js":44,"./GroundWeapon.js":25}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GroundWeapon2 = require('./GroundWeapon.js');

var _GroundWeapon3 = _interopRequireDefault(_GroundWeapon2);

var _TarTrap = require('../Weapons/TarTrap.js');

var _TarTrap2 = _interopRequireDefault(_TarTrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The TarTrap class extends the GroundWeapon class.
 */
var GroundTarTrap = function (_GroundWeapon) {
    _inherits(GroundTarTrap, _GroundWeapon);

    function GroundTarTrap(x, y) {
        _classCallCheck(this, GroundTarTrap);

        var weapon = new _TarTrap2.default();

        var _this = _possibleConstructorReturn(this, (GroundTarTrap.__proto__ || Object.getPrototypeOf(GroundTarTrap)).call(this, x, y, weapon));

        _get(GroundTarTrap.prototype.__proto__ || Object.getPrototypeOf(GroundTarTrap.prototype), 'loadImage', _this).call(_this, "Graphics/GroundTarTrap.png");
        return _this;
    }

    return GroundTarTrap;
}(_GroundWeapon3.default);

exports.default = GroundTarTrap;

},{"../Weapons/TarTrap.js":45,"./GroundWeapon.js":25}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GroundWeapon = function () {
    //x = the x position of the ground weapon
    //y = the y position of the ground weapon
    //weapon  = the weapon object that will be added to the player's inventory
    function GroundWeapon(x, y, weapon) {
        _classCallCheck(this, GroundWeapon);

        this.x = x;
        this.y = y;
        this.weapon = weapon;
    }

    _createClass(GroundWeapon, [{
        key: "setPosition",
        value: function setPosition(x, y) {
            this.x = x;
            this.y = y;
        }
    }, {
        key: "loadImage",
        value: function loadImage(url) {
            var _this = this;

            this.isImageLoaded = false;
            this.image = new Image();
            this.image.onload = function () {
                _this.isImageLoaded = true;
                _this.width = _this.image.width;
                _this.height = _this.image.height;
            };
            this.image.src = url;
        }
        /**
        array = the array that the wepaon object stored in this GroundWeapon will be pushed into. This method is to be used with a player's inventory.
        */

    }, {
        key: "addWeapon",
        value: function addWeapon(array) {
            array.push(this.weapon);
        }
    }, {
        key: "draw",
        value: function draw(ctx, camera) {
            ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
        }
    }]);

    return GroundWeapon;
}();

exports.default = GroundWeapon;

},{}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HealthPack = function () {
    function HealthPack(x, y) {
        _classCallCheck(this, HealthPack);

        this.x = x;
        this.y = y;
        this.healing = 100;
        this.loadImage();
    }

    _createClass(HealthPack, [{
        key: 'setPosition',
        value: function setPosition(x, y) {
            this.x = x;
            this.y = y;
        }
    }, {
        key: 'loadImage',
        value: function loadImage() {
            var _this = this;

            this.isImageLoaded = false;
            this.image = new Image();
            this.image.onload = function () {
                _this.isImageLoaded = true;
                _this.width = _this.image.width;
                _this.height = _this.image.height;
            };
            this.image.src = 'Graphics/HealthPack.png';
        }
    }, {
        key: 'draw',
        value: function draw(ctx, camera) {
            ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
        }
    }]);

    return HealthPack;
}();

exports.default = HealthPack;

},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The PlacedTrap class is the parent for all placed traps.
 */
var PlacedTrap = function () {

    /**
     * The constructor initializes the fields of the PlacedTrap.
     * @param x The x position of the PlacedTrap.
     * @param y The y position of the PlacedTrap.
     */
    function PlacedTrap(x, y) {
        _classCallCheck(this, PlacedTrap);

        this.x = x;
        this.y = y;
    }

    /**
     * This function sets the position of the placed trap given x and y.
     * @param x The x position to be set.
     * @param y The y position to be set.
     */


    _createClass(PlacedTrap, [{
        key: "setPosition",
        value: function setPosition(x, y) {
            this.x = x;
            this.y = y;
        }

        /**
         * The loadImage function takes in a url and loads it as an Image. Once the image is loaded, this.isImageLoaded is
         * set to true. The height and width of the PlacedTrap are set to the height and width of the image.
         * @param url The url that should be loaded.
         */

    }, {
        key: "loadImage",
        value: function loadImage(url) {
            var _this = this;

            this.isImageLoaded = false;
            this.image = new Image();
            this.image.onload = function () {
                _this.isImageLoaded = true;
                _this.width = _this.image.width;
                _this.height = _this.image.height;
            };
            this.image.src = url;
        }

        /**
         * The draw function draws the image on the canvas at the x and y position of the PlacedTrap.
         * @param ctx The context of the canvas.
         * @param camera The camera object.
         */

    }, {
        key: "draw",
        value: function draw(ctx, camera) {
            ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
        }
    }]);

    return PlacedTrap;
}();

exports.default = PlacedTrap;

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _PlacedTrap2 = require("./PlacedTrap.js");

var _PlacedTrap3 = _interopRequireDefault(_PlacedTrap2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The SpikeTrapPlaced class extends the PlacedTrap class.
 */
var SpikeTrapPlaced = function (_PlacedTrap) {
  _inherits(SpikeTrapPlaced, _PlacedTrap);

  /**
   * The constructor initializes the fields of the SpikeTrapPlaced.
   * @param x The x position of the SpikeTrapPlaced.
   * @param y The y position of the SpikeTrapPlaced.
   */
  function SpikeTrapPlaced(x, y) {
    _classCallCheck(this, SpikeTrapPlaced);

    var _this = _possibleConstructorReturn(this, (SpikeTrapPlaced.__proto__ || Object.getPrototypeOf(SpikeTrapPlaced)).call(this, x, y));

    _get(SpikeTrapPlaced.prototype.__proto__ || Object.getPrototypeOf(SpikeTrapPlaced.prototype), "loadImage", _this).call(_this, "Graphics/SpikeTrap.png");
    return _this;
  }

  return SpikeTrapPlaced;
}(_PlacedTrap3.default);

exports.default = SpikeTrapPlaced;

},{"./PlacedTrap.js":27}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _PlacedTrap2 = require("./PlacedTrap.js");

var _PlacedTrap3 = _interopRequireDefault(_PlacedTrap2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The TarTrapPlaced class extends the PlacedTrap class.
 */
var TarTrapPlaced = function (_PlacedTrap) {
  _inherits(TarTrapPlaced, _PlacedTrap);

  /**
   * The constructor initializes the fields of the TarTrapPlaced.
   * @param x The x position of the TarTrapPlaced.
   * @param y The y position of the TarTrapPlaced.
   */
  function TarTrapPlaced(x, y) {
    _classCallCheck(this, TarTrapPlaced);

    var _this = _possibleConstructorReturn(this, (TarTrapPlaced.__proto__ || Object.getPrototypeOf(TarTrapPlaced)).call(this, x, y));

    _get(TarTrapPlaced.prototype.__proto__ || Object.getPrototypeOf(TarTrapPlaced.prototype), "loadImage", _this).call(_this, "Graphics/TarTrap.png");
    return _this;
  }

  return TarTrapPlaced;
}(_PlacedTrap3.default);

exports.default = TarTrapPlaced;

},{"./PlacedTrap.js":27}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
  Sources:
  http://jsfiddle.net/gfcarv/QKgHs/
*/

/**
 * The Camera class is used to follow the player's movement.
 */
var Camera = function () {

    /**
     * The constructor initializes the fields of the Camera.
     * @param x The x position of the Camera.
     * @param y The y position of the Camera.
     * @param canvasWidth The width of the canvas.
     * @param canvasHeight The height of the canvas.
     * @param worldWidth The width of the world.
     * @param worldHeight The height of the world.
     */
    function Camera(x, y, canvasWidth, canvasHeight, worldWidth, worldHeight) {
        _classCallCheck(this, Camera);

        this.x = x;
        this.y = y;
        this.xDeadZone = 0;
        this.yDeadZone = 0;
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
    }

    /**
     * This function is used to set who the camera is following.
     * @param player The player that the camera should follow.
     * @param xDeadZone
     * @param yDeadZone
     */


    _createClass(Camera, [{
        key: "follow",
        value: function follow(player, xDeadZone, yDeadZone) {
            this.following = player;
            this.xDeadZone = xDeadZone;
            this.yDeadZone = yDeadZone;
        }

        /**
         * This function updates the camera's x and y position.
         */

    }, {
        key: "update",
        value: function update() {
            if (this.following != null) {
                if (this.following.x - this.x + this.xDeadZone > this.width) this.x = this.following.x - (this.width - this.xDeadZone);else if (this.following.x - this.xDeadZone < this.x) this.x = this.following.x - this.xDeadZone;
                if (this.following.y - this.y + this.yDeadZone > this.height) this.y = this.following.y - (this.height - this.yDeadZone);else if (this.following.y - this.yDeadZone < this.y) this.y = this.following.y - this.yDeadZone;
            }
            if (this.x < 0) this.x = 0;
            if (this.y < 0) this.y = 0;
            if (this.x + this.width > this.worldWidth) this.x = this.worldWidth - this.width;
            if (this.y + this.height > this.worldHeight) this.y = this.worldHeight - this.height;
        }
    }]);

    return Camera;
}();

exports.default = Camera;

},{}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Pistol = require('../Weapons/Pistol.js');

var _Pistol2 = _interopRequireDefault(_Pistol);

var _Sniper = require('../Weapons/Sniper.js');

var _Sniper2 = _interopRequireDefault(_Sniper);

var _Shotgun = require('../Weapons/Shotgun.js');

var _Shotgun2 = _interopRequireDefault(_Shotgun);

var _AssaultRifle = require('../Weapons/AssaultRifle.js');

var _AssaultRifle2 = _interopRequireDefault(_AssaultRifle);

var _Util = require('../Utilities/Util.js');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    //this.x = x position
    //this.y = y position
    //this.health = player's life
    //this.speed = player's movespeed
    //this.loadImage() is a function to attach the image to the player.
    //The player has an array to hold his items and he will start with a pistol and sniper this week for easy testing
    //Next week items will be picked up by walking over them and as such there will need to be an addItem function
    function Player(x, y) {
        _classCallCheck(this, Player);

        this.x = x;
        this.y = y;
        this.health = 100;
        this.speed = 256;
        this.loadImage();
        this.loadDamageTakenSound('Audio/DamageTaken.mp3');
        var start_pistol = new _Pistol2.default();
        var start_sniper = new _Sniper2.default();
        var start_rifle = new _AssaultRifle2.default();
        var start_shotgun = new _Shotgun2.default();
        this.inventory = [start_pistol];
        this.active_index = 0;
    }

    _createClass(Player, [{
        key: 'isCollisionWithEnvironmentObject',
        value: function isCollisionWithEnvironmentObject(environmentObjects) {
            for (var i = 0; i < environmentObjects.length; i++) {
                if (_Util2.default.isCollision(environmentObjects[i], this) && environmentObjects[i].isBlocking) return true;
            }
            return false;
        }
    }, {
        key: 'loadImage',
        value: function loadImage() {
            var _this = this;

            this.isImageLoaded = false;
            this.image = new Image();
            this.image.onload = function () {
                _this.isImageLoaded = true;
                _this.width = _this.image.width;
                _this.height = _this.image.height;
            };
            this.image.src = "Graphics/Player.png";
        }
    }, {
        key: 'loadDamageTakenSound',
        value: function loadDamageTakenSound(url) {
            var _this2 = this;

            this.isSound1Loaded = false;
            this.damageTakenSound = new Audio();
            this.damageTakenSound.onload = function () {
                _this2.isSound1Loaded = true;
            };
            this.damageTakenSound.src = url;
        }
    }, {
        key: 'draw',
        value: function draw(ctx, camera, mouse) {
            ctx.save();
            ctx.translate(this.x + this.width / 2 - camera.x, this.y + this.height / 2 - camera.y);
            var angle = Math.atan2(mouse[1] - (this.y + this.height / 2 - camera.y), mouse[0] - (this.x + this.width / 2 - camera.x));
            ctx.rotate(angle + Math.PI / 2);
            ctx.drawImage(this.image, 0 - this.width / 2, 0 - this.height / 2);
            ctx.restore();
        }
    }]);

    return Player;
}();

exports.default = Player;

},{"../Utilities/Util.js":32,"../Weapons/AssaultRifle.js":33,"../Weapons/Pistol.js":41,"../Weapons/Shotgun.js":42,"../Weapons/Sniper.js":43}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
  Sources:
  https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
*/

/**
 * The Util class contains various utility functions.
 */
var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, null, [{
        key: "isCollision",


        /**
         * The isCollision method checks if there is a collision between the two inputted rectangles. This algorithm only
         * works with axis-aligned rectangles.
         * @param rectangle1 The first rectangle.
         * @param rectangle2 The second rectangle.
         * @returns {boolean} Whether there exists a collision between the two inputted rectangles.
         */
        value: function isCollision(rectangle1, rectangle2) {
            if (rectangle1.x < rectangle2.x + rectangle2.width && rectangle1.x + rectangle1.width > rectangle2.x && rectangle1.y < rectangle2.y + rectangle2.height && rectangle1.y + rectangle1.height > rectangle2.y) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * This function checks if there are any collisions between the two arrays. This algorithm only works with
         * axis-aligned rectangles.
         * @param array1 An array of rectangles.
         * @param array2 An array of rectangles.
         * @returns {integer} -1 if there are no collisions or the index of the first array if there is.
         */

    }, {
        key: "areAnyCollisions",
        value: function areAnyCollisions(array1, array2) {
            for (var i = 0; i < array1.length; i++) {
                for (var j = 0; j < array2.length; j++) {
                    if (this.isCollision(array1[i], array2[j])) return i;
                }
            }
            return -1;
        }
    }, {
        key: "areAnyCollisionsInSameArray",
        value: function areAnyCollisionsInSameArray(array) {
            for (var i = 0; i < array.length; i++) {
                for (var j = 0; j < array.length; j++) {
                    if (i !== j) {
                        if (this.isCollision(array[i], array[j])) return i;
                    }
                }
            }
            return -1;
        }

        /**
         * This function returns a random number in the given interval.
         * @param from
         * @param to
         * @returns {number}
         */

    }, {
        key: "randomIntFromInterval",
        value: function randomIntFromInterval(from, to) {
            return Math.floor(Math.random() * (to - from + 1) + from);
        }
    }]);

    return Util;
}();

exports.default = Util;

},{}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Weapon2 = require('./Weapon.js');

var _Weapon3 = _interopRequireDefault(_Weapon2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AssaultRifle = function (_Weapon) {
    _inherits(AssaultRifle, _Weapon);

    function AssaultRifle() {
        _classCallCheck(this, AssaultRifle);

        var _this = _possibleConstructorReturn(this, (AssaultRifle.__proto__ || Object.getPrototypeOf(AssaultRifle)).call(this, 5, 30, .1));

        _this.name = "Assault Rifle";
        _get(AssaultRifle.prototype.__proto__ || Object.getPrototypeOf(AssaultRifle.prototype), 'loadShootSound', _this).call(_this, 'Audio/RifleShot.mp3');
        return _this;
    }

    return AssaultRifle;
}(_Weapon3.default);

exports.default = AssaultRifle;

},{"./Weapon.js":46}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = require('../Utilities/Util.js');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bullet = function () {
    function Bullet(velocity, damage, x, y, destX, destY, penetrates) {
        _classCallCheck(this, Bullet);

        this.velocity = velocity;
        this.damage = damage;
        this.x = x;
        this.y = y;
        this.destX = destX;
        this.destY = destY;
        this.live = true;
        this.isPenetrating = penetrates;
        var diffX = this.destX - this.x;
        var diffY = this.destY - this.y;
        this.liveTime = 0;
        //This logic finds a coefficient for X and Y that can be applied
        //to the move function in order to move the bullet in a straight line
        //directly to its destination.
        if (Math.abs(diffX) > Math.abs(diffY)) {
            this.coeffX = diffX / Math.abs(diffX);
            this.coeffY = diffY / Math.abs(diffX);
        } else {
            this.coeffY = diffY / Math.abs(diffY);
            this.coeffX = diffX / Math.abs(diffY);
        }
    }

    _createClass(Bullet, [{
        key: 'loadImage',
        value: function loadImage(url) {
            var _this = this;

            this.isImageLoaded = false;
            this.image = new Image();
            this.image.onload = function () {
                _this.isImageLoaded = true;
                _this.width = _this.image.width;
                _this.height = _this.image.height;
            };
            this.image.src = url;
        }
        //Moves the bullet from its starting point (which will be the player's location)
        //to its destination (which will be the cursor location when the bullet is created).
        //Each time move is called it is checked if the bullet hits anything, if it does the
        //hitSomething method will call a damage function and the damage will be applied, so
        //this function sets this.live = false meaning the bullet is no longer live.
        //If the bullet isPenetrating that means it will not be set to 'dead' upon a collision with something
        //This allows penetrating bullets to travel through multiple targets and through world objects.

    }, {
        key: 'move',
        value: function move(modifier, environmentObjects, enemies) {
            this.x += this.velocity * modifier * this.coeffX;
            this.y += this.velocity * modifier * this.coeffY;
            this.liveTime += modifier;
            console.log(this.liveTime);
            if (this.hitSomething(environmentObjects, enemies) && this.isPenetrating == false) {
                this.live = false;
            }
            if (this.x < 0 || this.x > 10000 || this.y < 0 || this.y > 5625) {
                this.live = false;
            }
            if (this.liveTime > .5 && this.isPenetrating == false) {
                this.live = false;
            }
        }
        //Checks if the bullet hit any of our objects that can be hit, if so that object loses HP
        //and the function returns true to indicate that the object was hit. If not, false is returned
        //and nothing is done.

    }, {
        key: 'damageEnemy',
        value: function damageEnemy(enemyObject) {
            enemyObject.health -= this.damage;
        }
    }, {
        key: 'damageEnvironment',
        value: function damageEnvironment(environmentObject) {
            environmentObject.health -= this.damage;
        }
        //Checks if we hit an environment object then checks if we hit an enemy. in either case it calls the
        //corresponding damage function and then returns true to indicate that something was hit, which tells move to set the
        //bullet's live value accordingly

    }, {
        key: 'hitSomething',
        value: function hitSomething(environmentObjects, enemies) {
            for (var i = 0; i < environmentObjects.length; i++) {
                if (_Util2.default.isCollision(this, environmentObjects[i]) && environmentObjects[i].isBlocking) {
                    this.damageEnvironment(environmentObjects[i]);
                    return true;
                }
            }
            for (var _i = 0; _i < enemies.length; _i++) {
                if (_Util2.default.isCollision(this, enemies[_i])) {
                    this.damageEnemy(enemies[_i]);
                    return true;
                }
            }
            return false;
        }
    }, {
        key: 'draw',
        value: function draw(ctx, camera) {
            ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
        }
    }]);

    return Bullet;
}();

exports.default = Bullet;

},{"../Utilities/Util.js":32}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Bullet2 = require('./Bullet.js');

var _Bullet3 = _interopRequireDefault(_Bullet2);

var _Util = require('../Utilities/Util.js');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//The 50 caliber will penetrate through objects and only stops being live
//once it exits the canvas, so its damage is set to a small number as it deals
//damage during each frame as it penetrates the object or enemy
var Bullet12Gauge = function (_Bullet) {
    _inherits(Bullet12Gauge, _Bullet);

    function Bullet12Gauge(x, y, destX, destY) {
        _classCallCheck(this, Bullet12Gauge);

        var _this = _possibleConstructorReturn(this, (Bullet12Gauge.__proto__ || Object.getPrototypeOf(Bullet12Gauge)).call(this, 1000, 8, x, y, destX, destY, false));

        _get(Bullet12Gauge.prototype.__proto__ || Object.getPrototypeOf(Bullet12Gauge.prototype), 'loadImage', _this).call(_this, "Graphics/bullet3.png");
        return _this;
    }

    return Bullet12Gauge;
}(_Bullet3.default);

exports.default = Bullet12Gauge;

},{"../Utilities/Util.js":32,"./Bullet.js":34}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Bullet2 = require('./Bullet.js');

var _Bullet3 = _interopRequireDefault(_Bullet2);

var _Util = require('../Utilities/Util.js');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//The 50 caliber will penetrate through objects and only stops being live
//once it exits the canvas, so its damage is set to a small number as it deals
//damage during each frame as it penetrates the object or enemy
var Bullet50cal = function (_Bullet) {
    _inherits(Bullet50cal, _Bullet);

    function Bullet50cal(x, y, destX, destY) {
        _classCallCheck(this, Bullet50cal);

        var _this = _possibleConstructorReturn(this, (Bullet50cal.__proto__ || Object.getPrototypeOf(Bullet50cal)).call(this, 2500, 7, x, y, destX, destY, true));

        _get(Bullet50cal.prototype.__proto__ || Object.getPrototypeOf(Bullet50cal.prototype), 'loadImage', _this).call(_this, "Graphics/bullet3.png");
        return _this;
    }

    return Bullet50cal;
}(_Bullet3.default);

exports.default = Bullet50cal;

},{"../Utilities/Util.js":32,"./Bullet.js":34}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Bullet2 = require('./Bullet.js');

var _Bullet3 = _interopRequireDefault(_Bullet2);

var _Util = require('../Utilities/Util.js');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//The 50 caliber will penetrate through objects and only stops being live
//once it exits the canvas, so its damage is set to a small number as it deals
//damage during each frame as it penetrates the object or enemy
var Bullet556 = function (_Bullet) {
    _inherits(Bullet556, _Bullet);

    function Bullet556(x, y, destX, destY) {
        _classCallCheck(this, Bullet556);

        var _this = _possibleConstructorReturn(this, (Bullet556.__proto__ || Object.getPrototypeOf(Bullet556)).call(this, 2000, 12, x, y, destX, destY, false));

        _get(Bullet556.prototype.__proto__ || Object.getPrototypeOf(Bullet556.prototype), 'loadImage', _this).call(_this, "Graphics/bullet3.png");
        return _this;
    }

    return Bullet556;
}(_Bullet3.default);

exports.default = Bullet556;

},{"../Utilities/Util.js":32,"./Bullet.js":34}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Bullet2 = require('./Bullet.js');

var _Bullet3 = _interopRequireDefault(_Bullet2);

var _Util = require('../Utilities/Util.js');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//the 9mm bullet is a simple pistol bullet that will be in the
//user's starting weapon. it does minimal damage and moves at a slow speed.
//the value of isPenetrating is set to false to indicate the bullet should
//not be live after it collides with something and does its damage.
//in the future the bullet will have a maximum range/live time to
//limit its usefulness more.
var Bullet9mm = function (_Bullet) {
    _inherits(Bullet9mm, _Bullet);

    function Bullet9mm(x, y, destX, destY) {
        _classCallCheck(this, Bullet9mm);

        var _this = _possibleConstructorReturn(this, (Bullet9mm.__proto__ || Object.getPrototypeOf(Bullet9mm)).call(this, 1000, 10, x, y, destX, destY, false));

        _get(Bullet9mm.prototype.__proto__ || Object.getPrototypeOf(Bullet9mm.prototype), 'loadImage', _this).call(_this, "Graphics/bullet3.png");
        return _this;
    }

    return Bullet9mm;
}(_Bullet3.default);

exports.default = Bullet9mm;

},{"../Utilities/Util.js":32,"./Bullet.js":34}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Bullet2 = require('./Bullet.js');

var _Bullet3 = _interopRequireDefault(_Bullet2);

var _Util = require('../Utilities/Util.js');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//The 50 caliber will penetrate through objects and only stops being live
//once it exits the canvas, so its damage is set to a small number as it deals
//damage during each frame as it penetrates the object or enemy
var BulletFire = function (_Bullet) {
    _inherits(BulletFire, _Bullet);

    function BulletFire(x, y, destX, destY) {
        _classCallCheck(this, BulletFire);

        var _this = _possibleConstructorReturn(this, (BulletFire.__proto__ || Object.getPrototypeOf(BulletFire)).call(this, 500, 2, x, y, destX, destY, false));

        _get(BulletFire.prototype.__proto__ || Object.getPrototypeOf(BulletFire.prototype), 'loadImage', _this).call(_this, "Graphics/Fire.png");
        return _this;
    }

    return BulletFire;
}(_Bullet3.default);

exports.default = BulletFire;

},{"../Utilities/Util.js":32,"./Bullet.js":34}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Weapon2 = require('./Weapon.js');

var _Weapon3 = _interopRequireDefault(_Weapon2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Flamethrower = function (_Weapon) {
    _inherits(Flamethrower, _Weapon);

    function Flamethrower() {
        _classCallCheck(this, Flamethrower);

        var _this = _possibleConstructorReturn(this, (Flamethrower.__proto__ || Object.getPrototypeOf(Flamethrower)).call(this, 8, 32, .05));

        _this.name = "Flamethrower";
        _get(Flamethrower.prototype.__proto__ || Object.getPrototypeOf(Flamethrower.prototype), 'loadShootSound', _this).call(_this, 'Audio/FlamethrowerSound.mp3');
        return _this;
    }

    return Flamethrower;
}(_Weapon3.default);

exports.default = Flamethrower;

},{"./Weapon.js":46}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }; //The sniper is only currently used to determine the type of bullet to be generated
//in main.js' event handler for clicks
//In the future it will control fire rate and the ammo capacity.


var _Weapon2 = require('./Weapon.js');

var _Weapon3 = _interopRequireDefault(_Weapon2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pistol = function (_Weapon) {
    _inherits(Pistol, _Weapon);

    function Pistol() {
        _classCallCheck(this, Pistol);

        var _this = _possibleConstructorReturn(this, (Pistol.__proto__ || Object.getPrototypeOf(Pistol)).call(this, 15, 90, .4));

        _this.name = "Pistol";
        _get(Pistol.prototype.__proto__ || Object.getPrototypeOf(Pistol.prototype), 'loadShootSound', _this).call(_this, 'Audio/PistolShot.mp3');
        return _this;
    }

    return Pistol;
}(_Weapon3.default);

exports.default = Pistol;

},{"./Weapon.js":46}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Weapon2 = require('./Weapon.js');

var _Weapon3 = _interopRequireDefault(_Weapon2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shotgun = function (_Weapon) {
    _inherits(Shotgun, _Weapon);

    function Shotgun() {
        _classCallCheck(this, Shotgun);

        var _this = _possibleConstructorReturn(this, (Shotgun.__proto__ || Object.getPrototypeOf(Shotgun)).call(this, 8, 32, 1));

        _this.name = "Shotgun";
        _get(Shotgun.prototype.__proto__ || Object.getPrototypeOf(Shotgun.prototype), 'loadShootSound', _this).call(_this, 'Audio/ShotgunShot.mp3');
        return _this;
    }

    return Shotgun;
}(_Weapon3.default);

exports.default = Shotgun;

},{"./Weapon.js":46}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }; //The sniper is only currently used to determine the type of bullet to be generated
//in main.js' event handler for clicks
//In the future it will control fire rate and the ammo capacity.


var _Weapon2 = require('./Weapon.js');

var _Weapon3 = _interopRequireDefault(_Weapon2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sniper = function (_Weapon) {
    _inherits(Sniper, _Weapon);

    function Sniper() {
        _classCallCheck(this, Sniper);

        var _this = _possibleConstructorReturn(this, (Sniper.__proto__ || Object.getPrototypeOf(Sniper)).call(this, 5, 30, 1.75));

        _this.name = "Sniper";
        _get(Sniper.prototype.__proto__ || Object.getPrototypeOf(Sniper.prototype), 'loadShootSound', _this).call(_this, 'Audio/SniperShot.mp3');
        return _this;
    }

    return Sniper;
}(_Weapon3.default);

exports.default = Sniper;

},{"./Weapon.js":46}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Weapon2 = require('./Weapon.js');

var _Weapon3 = _interopRequireDefault(_Weapon2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The SpikeTrap class extends the Trap class.
 */
var SpikeTrap = function (_Weapon) {
  _inherits(SpikeTrap, _Weapon);

  /**
   * The constructor initializes the fields of the SpikeTrap. A call is made to the Weapon classes constructor.
   */
  function SpikeTrap() {
    _classCallCheck(this, SpikeTrap);

    var _this = _possibleConstructorReturn(this, (SpikeTrap.__proto__ || Object.getPrototypeOf(SpikeTrap)).call(this, 0, 0, 0));

    _this.name = 'Spike Trap';
    _get(SpikeTrap.prototype.__proto__ || Object.getPrototypeOf(SpikeTrap.prototype), 'loadShootSound', _this).call(_this, 'Audio/SpikeTrap.mp3');
    return _this;
  }

  return SpikeTrap;
}(_Weapon3.default);

exports.default = SpikeTrap;

},{"./Weapon.js":46}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Weapon2 = require('./Weapon.js');

var _Weapon3 = _interopRequireDefault(_Weapon2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The TarTrap class extends the Weapon class.
 */
var TarTrap = function (_Weapon) {
  _inherits(TarTrap, _Weapon);

  /**
   * The constructor initializes the fields of the TarTrap. A call is made to the Weapon classes constructor.
   */
  function TarTrap() {
    _classCallCheck(this, TarTrap);

    var _this = _possibleConstructorReturn(this, (TarTrap.__proto__ || Object.getPrototypeOf(TarTrap)).call(this, 0, 0, 0));

    _this.name = 'Tar Trap';
    _get(TarTrap.prototype.__proto__ || Object.getPrototypeOf(TarTrap.prototype), 'loadShootSound', _this).call(_this, 'Audio/TarTrap.mp3');
    return _this;
  }

  return TarTrap;
}(_Weapon3.default);

exports.default = TarTrap;

},{"./Weapon.js":46}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//clipSize and ammo will be used as expected next week
//automatic will be used as a boolean for whether or not
//holding click should continuously fire.
//The name field is used for the HUD displaying the active weapon.
var Weapon = function () {
    function Weapon(clipSize, maxAmmo, maxCoolDown) {
        _classCallCheck(this, Weapon);

        this.clipSize = clipSize;
        this.maxAmmo = maxAmmo;
        this.name = '';
        this.cooldown = 0;
        this.maxCoolDown = maxCoolDown;
    }

    _createClass(Weapon, [{
        key: 'loadShootSound',
        value: function loadShootSound(url) {
            var _this = this;

            this.isSoundLoaded = false;
            this.sound = new Audio();
            this.sound.onload = function () {
                _this.isSoundLoaded = true;
            };
            this.sound.src = url;
        }
    }, {
        key: 'addCooldown',
        value: function addCooldown() {
            this.cooldown += this.maxCoolDown;
        }
    }]);

    return Weapon;
}();

exports.default = Weapon;

},{}]},{},[18])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDdXJzb3IuanMiLCJFbmVtaWVzL0VuZW15LmpzIiwiRW5lbWllcy9FbmVteVByb2plY3RpbGUuanMiLCJFbmVtaWVzL0ZpbmFsQm9zcy5qcyIsIkVuZW1pZXMvTGlnaHRFbmVteS5qcyIsIkVuZW1pZXMvTWluaUJvc3MuanMiLCJFbmVtaWVzL1BhcmFzaXRlRW5lbXkuanMiLCJFbmVtaWVzL1Byb2plY3RpbGVFbmVteS5qcyIsIkVuZW1pZXMvUmVndWxhckVuZW15LmpzIiwiRW5lbWllcy9UYW5rRW5lbXkuanMiLCJFbnZpcm9ubWVudE9iamVjdHMvQnVzaC5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9DcmF0ZS5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9FbnZpcm9ubWVudE9iamVjdC5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9Sb2NrLmpzIiwiR2FtZS9Db250cm9sbGVyLmpzIiwiR2FtZS9HYW1lLmpzIiwiR2FtZS9Xb3JsZC5qcyIsIk1haW4uanMiLCJQaWNrVXBzL0dyb3VuZEFzc2F1bHRSaWZsZS5qcyIsIlBpY2tVcHMvR3JvdW5kRmxhbWV0aHJvd2VyLmpzIiwiUGlja1Vwcy9Hcm91bmRTaG90Z3VuLmpzIiwiUGlja1Vwcy9Hcm91bmRTbmlwZXIuanMiLCJQaWNrVXBzL0dyb3VuZFNwaWtlVHJhcC5qcyIsIlBpY2tVcHMvR3JvdW5kVGFyVHJhcC5qcyIsIlBpY2tVcHMvR3JvdW5kV2VhcG9uLmpzIiwiUGlja1Vwcy9IZWFsdGhwYWNrLmpzIiwiUGxhY2VkVHJhcHMvUGxhY2VkVHJhcC5qcyIsIlBsYWNlZFRyYXBzL1NwaWtlVHJhcFBsYWNlZC5qcyIsIlBsYWNlZFRyYXBzL1RhclRyYXBQbGFjZWQuanMiLCJQbGF5ZXJzL0NhbWVyYS5qcyIsIlBsYXllcnMvUGxheWVyLmpzIiwiVXRpbGl0aWVzL1V0aWwuanMiLCJXZWFwb25zL0Fzc2F1bHRSaWZsZS5qcyIsIldlYXBvbnMvQnVsbGV0LmpzIiwiV2VhcG9ucy9CdWxsZXQxMkdhdWdlLmpzIiwiV2VhcG9ucy9CdWxsZXQ1MGNhbC5qcyIsIldlYXBvbnMvQnVsbGV0NTU2LmpzIiwiV2VhcG9ucy9CdWxsZXQ5bW0uanMiLCJXZWFwb25zL0J1bGxldEZpcmUuanMiLCJXZWFwb25zL0ZsYW1ldGhyb3dlci5qcyIsIldlYXBvbnMvUGlzdG9sLmpzIiwiV2VhcG9ucy9TaG90Z3VuLmpzIiwiV2VhcG9ucy9TbmlwZXIuanMiLCJXZWFwb25zL1NwaWtlVHJhcC5qcyIsIldlYXBvbnMvVGFyVHJhcC5qcyIsIldlYXBvbnMvV2VhcG9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtJQUNNLE07QUFDRixzQkFBYztBQUFBOztBQUNWLGFBQUssU0FBTDtBQUNIOzs7O29DQUVXO0FBQUE7O0FBQ1IsaUJBQUssYUFBTCxHQUFxQixLQUFyQjtBQUNBLGlCQUFLLEtBQUwsR0FBYSxJQUFJLEtBQUosRUFBYjtBQUNBLGlCQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLFlBQU07QUFDdEIsc0JBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNILGFBRkQ7QUFHQSxpQkFBSyxLQUFMLENBQVcsR0FBWCxHQUFpQix3QkFBakI7QUFDSDs7Ozs7O2tCQUVVLE07Ozs7Ozs7OztxakJDakJmOzs7Ozs7QUFNQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7OztJQUdNLEs7O0FBRUY7Ozs7Ozs7OztBQVNBLG1CQUFZLENBQVosRUFBZSxDQUFmLEVBQWtCLFFBQWxCLEVBQTRCLE1BQTVCLEVBQW9DLE1BQXBDLEVBQTRDLFlBQTVDLEVBQTBEO0FBQUE7O0FBQ3RELGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxhQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsYUFBSyxLQUFMLEdBQWEsS0FBSyxFQUFMLEdBQVEsQ0FBckI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFk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QURGOztBQUVWLFVBQUssSUFBTCxHQUFZLFVBQVo7QUFDQSx1SEFBcUIsbUJBQXJCO0FBSFU7QUFJYjs7Ozs7a0JBR1UsTzs7Ozs7Ozs7Ozs7OztBQ2pCZjtBQUNBO0FBQ0E7QUFDQTtJQUNNLE07QUFFRixvQkFBWSxRQUFaLEVBQXNCLE9BQXRCLEVBQStCLFdBQS9CLEVBQTRDO0FBQUE7O0FBQ3hDLGFBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLGFBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxhQUFLLElBQUwsR0FBWSxFQUFaO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLENBQWhCO0FBQ0EsYUFBSyxXQUFMLEdBQW1CLFdBQW5CO0FBQ0g7Ozs7dUNBQ2MsRyxFQUFLO0FBQUE7O0FBQ2hCLGlCQUFLLGFBQUwsR0FBcUIsS0FBckI7QUFDQSxpQkFBSyxLQUFMLEdBQWEsSUFBSSxLQUFKLEVBQWI7QUFDQSxpQkFBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixZQUFNO0FBQ3RCLHNCQUFLLGFBQUwsR0FBcUIsSUFBckI7QUFDSCxhQUZEO0FBR0EsaUJBQUssS0FBTCxDQUFXLEdBQVgsR0FBaUIsR0FBakI7QUFDSDs7O3NDQUNZO0FBQ1gsaUJBQUssUUFBTCxJQUFpQixLQUFLLFdBQXRCO0FBQ0Q7Ozs7OztrQkFJVSxNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy9KdXN0IGEgcGx1cyBjdXJzb3IgdG8gYmUgcmVuZGVyZWQgYXQgdGhlXHJcbi8vY3Vyc29yJ3MgbG9jYXRpb24gZWFjaCBVcGRhdGVcclxuLy9UaGUgY3Vyc29yIGZvciB0aGUgZW50aXJlIEhUTUwgZG9jdW1lbnQgaXMgdHVybmVkIG9mZiB2aWEgc3R5bGluZyBvbiB0aGUgZG9jdW1lbnQuXHJcbmNsYXNzIEN1cnNvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxvYWRJbWFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRJbWFnZSgpIHtcclxuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IFwiR3JhcGhpY3MvY3Jvc3NoYWlyLnBuZ1wiO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEN1cnNvcjtcclxuIiwiLyoqXHJcbiAqIFNvdXJjZXM6XHJcbiAqIGh0dHBzOi8vbWVkaXVtLmNvbS9AeXVyaWJldHQvamF2YXNjcmlwdC1hYnN0cmFjdC1tZXRob2Qtd2l0aC1lczYtNWRiZWE0YjAwMDI3XHJcbiAqIGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9STVkQVJwQVBsTmtcclxuICovXHJcblxyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcbmltcG9ydCBTcGlrZVRyYXBQbGFjZWQgZnJvbSAnLi4vUGxhY2VkVHJhcHMvU3Bpa2VUcmFwUGxhY2VkJztcclxuaW1wb3J0IFRhclRyYXBQbGFjZWQgZnJvbSAnLi4vUGxhY2VkVHJhcHMvVGFyVHJhcFBsYWNlZCdcclxuXHJcbi8qKlxyXG4gKiBUaGUgRW5lbXkgY2xhc3MgaXMgdGhlIHBhcmVudCBjbGFzcyBmb3IgYWxsIG9mIHRoZSBlbmVtaWVzLlxyXG4gKi9cclxuY2xhc3MgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHZlbG9jaXR5IFRoZSB2ZWxvY2l0eSBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gaGVhbHRoIFRoZSBoZWFsdGggb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIGRhbWFnZSBUaGUgZGFtYWdlIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSBwb2ludHNPbktpbGwgVGhlIHBvaW50cyByZXdhcmRlZCBmb3Iga2lsbGluZyB0aGUgRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIHZlbG9jaXR5LCBoZWFsdGgsIGRhbWFnZSwgcG9pbnRzT25LaWxsKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuYW5nbGUgPSBNYXRoLlBJLzI7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5O1xyXG4gICAgICAgIHRoaXMuaGVhbHRoID0gaGVhbHRoO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlO1xyXG4gICAgICAgIHRoaXMucG9pbnRzT25LaWxsID0gcG9pbnRzT25LaWxsO1xyXG4gICAgICAgIHRoaXMuYXR0YWNrQ29vbGRvd24gPSAwO1xyXG4gICAgICAgIHRoaXMuaXNTbG93ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmF0dGFja0RhbWFnZVRha2VuQ29vbGRvd24gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiB0YWtlcyBpbiBhIHVybCBhbmQgbG9hZHMgaXQgYXMgYW4gSW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0ltYWdlTG9hZGVkIGlzXHJcbiAgICAgKiBzZXQgdG8gdHJ1ZS4gVGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIEVuZW15IGFyZSBzZXQgdG8gdGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIGltYWdlLlxyXG4gICAgICogQHBhcmFtIHVybCBUaGUgdXJsIHRoYXQgc2hvdWxkIGJlIGxvYWRlZC5cclxuICAgICAqL1xyXG4gICAgbG9hZEltYWdlKHVybCkge1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbG9hZERhbWFnZVRha2VuU291bmQodXJsKSB7XHJcbiAgICAgICAgdGhpcy5pc1NvdW5kMUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlVGFrZW5Tb3VuZCA9IG5ldyBBdWRpbygpO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlVGFrZW5Tb3VuZC5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTb3VuZDFMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5kYW1hZ2VUYWtlblNvdW5kLnNyYyA9IHVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhdHRhY2sgZnVuY3Rpb24gdGFrZXMgaW4gYW4gb2JqZWN0IGFuZCByZW1vdmVzIHRoZSBhbW91bnQgb2YgZGFtYWdlIHRoZSBFbmVteSBkZWFscyBmcm9tIHRoZWlyIGhlYWx0aC5cclxuICAgICAqIDUwMCBpcyBhZGRlZCB0byB0aGUgYXR0YWNrIGNvb2xkb3duIG9mIHRoZSBlbmVteSBhZnRlciBhbiBhdHRhY2suXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3QgdGhhdCBpcyBiZWluZyBhdHRhY2tlZC5cclxuICAgICAqL1xyXG4gICAgYXR0YWNrKG9iamVjdCkge1xyXG4gICAgICAgIG9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tDb29sZG93biArPSA1MDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlcyB0aGUgZW5lbXkgdG93YXJkcyB0aGUgcGxheWVyLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdCB0byBtb3ZlIHRvd2FyZHMuXHJcbiAgICAgKiBAcGFyYW0gbW9kaWZpZXIgVGhlIG1vZGlmaWVyIHRvIGJlIG11bHRpcGxpZWQgYnkgdGhlIHZlbG9jaXR5LlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0cyBBbiBhcnJheSBvZiBlbnZpcm9ubWVudCBvYmplY3RzLlxyXG4gICAgICogQHBhcmFtIHBsYWNlZFRyYXBzIEFuIGFycmF5IG9mIHBsYWNlZCB0cmFwcy5cclxuICAgICAqIEBwYXJhbSBjYW1lcmEgVGhlIGNhbWVyYSBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIG1vdmUocGxheWVyLCBtb2RpZmllciwgZW52aXJvbm1lbnRPYmplY3RzLCBwbGFjZWRUcmFwcywgY2FtZXJhKSB7XHJcbiAgICAgICAgbGV0IGRpZmZYID0gcGxheWVyLnggLSB0aGlzLng7XHJcbiAgICAgICAgbGV0IGRpZmZZID0gcGxheWVyLnkgLSB0aGlzLnk7XHJcblxyXG4gICAgICAgIGxldCBjb2VmZlg7XHJcbiAgICAgICAgbGV0IGNvZWZmWTtcclxuXHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZGlmZlgpID4gTWF0aC5hYnMoZGlmZlkpKSB7XHJcbiAgICAgICAgICAgIGNvZWZmWCA9IGRpZmZYIC8gTWF0aC5hYnMoZGlmZlgpO1xyXG4gICAgICAgICAgICBjb2VmZlkgPSBkaWZmWSAvIE1hdGguYWJzKGRpZmZYKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvZWZmWSA9IGRpZmZZIC8gTWF0aC5hYnMoZGlmZlkpO1xyXG4gICAgICAgICAgICBjb2VmZlggPSBkaWZmWCAvIE1hdGguYWJzKGRpZmZZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYW5nbGUgPSBNYXRoLmF0YW4yKHBsYXllci55K3BsYXllci5oZWlnaHQvMi1jYW1lcmEueSAtICh0aGlzLnkgKyB0aGlzLmhlaWdodC8yIC0gY2FtZXJhLnkpLCBwbGF5ZXIueCtwbGF5ZXIud2lkdGgvMi1jYW1lcmEueCAtICh0aGlzLnggKyB0aGlzLndpZHRoLzIgLSBjYW1lcmEueCkpO1xyXG5cclxuICAgICAgICBsZXQgb2xkWCA9IHRoaXMueDtcclxuICAgICAgICBsZXQgb2xkWSA9IHRoaXMueTtcclxuXHJcbiAgICAgICAgdGhpcy5hdHRhY2tEYW1hZ2VUYWtlbkNvb2xkb3duIC09IG1vZGlmaWVyO1xyXG4gICAgICAgIHRoaXMuaXNDb2xsaXNpb25XaXRoUGxhY2VkVHJhcHMocGxhY2VkVHJhcHMpO1xyXG5cclxuICAgICAgICBpZih0aGlzLmlzU2xvd2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5LzIqbW9kaWZpZXIqY29lZmZYO1xyXG4gICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eS8yKm1vZGlmaWVyKmNvZWZmWTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyKmNvZWZmWDtcclxuICAgICAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXIqY29lZmZZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoKHRoaXMueCArIHRoaXMud2lkdGggPiAxMDAwMCkgfHwgKHRoaXMueCA8IDApIHx8ICh0aGlzLnkgKyB0aGlzLmhlaWdodCA+IDU2MjUpIHx8ICh0aGlzLnkgPCAwKSB8fCB0aGlzLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KGVudmlyb25tZW50T2JqZWN0cykpICB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IG9sZFg7XHJcbiAgICAgICAgICAgIHRoaXMueSA9IG9sZFk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIHBsYXllcikgJiYgdGhpcy5hdHRhY2tDb29sZG93biA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlYWx0aCBiZWZvcmUgYXR0YWNrXCIgKyBwbGF5ZXIuaGVhbHRoKTtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2socGxheWVyKTtcclxuICAgICAgICAgICAgcGxheWVyLmRhbWFnZVRha2VuU291bmQucGxheSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlYWx0aCBhZnRlciBhdHRhY2tcIiArIHBsYXllci5oZWFsdGgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gc2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGVuZW15IGdpdmVuIHggYW5kIHkuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiB0byBiZSBzZXQuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiB0byBiZSBzZXQuXHJcbiAgICAgKi9cclxuICAgIHNldFBvc2l0aW9uKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGEgaGVscGVyIGZ1bmN0aW9uIHVzZWQgYnkgdGhlIG1vdmUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIHRoZXJlIGlzIGEgY29sbGlzaW9uIGJldHdlZW4gYW5cclxuICAgICAqIGVudmlyb25tZW50IG9iamVjdCBhbmQgdGhlIGVuZW15LiBJZiB0aGVyZSBpcyBhIGNvbGxpc2lvbiwgdGhlIG9iamVjdCBpcyBhdHRhY2tlZC5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdHMgQW4gYXJyYXkgb2YgZW52aXJvbm1lbnQgb2JqZWN0cy5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIGEgY29sbGlzaW9uIGV4aXN0cy5cclxuICAgICAqL1xyXG4gICAgaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIGVudmlyb25tZW50T2JqZWN0c1tpXSkgJiYgZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzQmxvY2tpbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYXR0YWNrQ29vbGRvd24gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFjayhlbnZpcm9ubWVudE9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgdGhlIGVuZW15IGlzIGNvbGxpZGluZyB3aXRoIGEgdHJhcC4gSWYgdGhleSBhcmUgY29sbGlkaW5nIHdpdGggYSBzcGlrZSB0cmFwLCB0aGV5IHRha2VcclxuICAgICAqIDUgZGFtYWdlIGV2ZXJ5IDUgc2Vjb25kcy4gSWYgdGhleSBhcmUgY29sbGlkaW5nIHdpdGggYSB0YXIgdHJhcCwgdGhlIGlzU2xvd2VkIGZsYWcgaXMgc2V0IHRvIHRydWUgYW5kIHRoZWlyXHJcbiAgICAgKiBtb3ZlbWVudCBpcyBjdXQgaW4gaGFsZi5cclxuICAgICAqIEBwYXJhbSBwbGFjZWRUcmFwc1xyXG4gICAgICovXHJcbiAgICBpc0NvbGxpc2lvbldpdGhQbGFjZWRUcmFwcyhwbGFjZWRUcmFwcykge1xyXG4gICAgICAgIGlmKHRoaXMuYXR0YWNrRGFtYWdlVGFrZW5Db29sZG93biA8IDApXHJcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrRGFtYWdlVGFrZW5Db29sZG93biA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYWNlZFRyYXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgcGxhY2VkVHJhcHNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICBpZihwbGFjZWRUcmFwc1tpXSBpbnN0YW5jZW9mIFNwaWtlVHJhcFBsYWNlZCAmJiB0aGlzLmF0dGFja0RhbWFnZVRha2VuQ29vbGRvd24gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWx0aCAtPSA1O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrRGFtYWdlVGFrZW5Db29sZG93biArPSA1O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihwbGFjZWRUcmFwc1tpXSBpbnN0YW5jZW9mIFRhclRyYXBQbGFjZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1Nsb3dlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZHJhdyBmdW5jdGlvbiBkcmF3cyB0aGUgaW1hZ2Ugb24gdGhlIGNhbnZhcyBhdCB0aGUgeCBhbmQgeSBwb3NpdGlvbiBvZiB0aGUgTGlnaHRFbmVteS5cclxuICAgICAqIEBwYXJhbSBjdHggVGhlIGNvbnRleHQgb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjYW1lcmEgVGhlIGNhbWVyYSBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgIGN0eC50cmFuc2xhdGUoKHRoaXMueCArIHRoaXMud2lkdGgvMikgLSBjYW1lcmEueCwgKHRoaXMueSArIHRoaXMuaGVpZ2h0LzIpIC0gY2FtZXJhLnkpO1xyXG4gICAgICAgIGN0eC5yb3RhdGUodGhpcy5hbmdsZSsoTWF0aC5QSS8yKSk7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAwLXRoaXMud2lkdGgvMiwgMC10aGlzLmhlaWdodC8yKTtcclxuICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFbmVteTtcclxuIiwiaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBFbmVteVByb2plY3RpbGUgY2xhc3MgaXMgdGhlIG9iamVjdCB0aGF0IGlzIGZpcmVkIGZyb20gdGhlIFByb2plY3RpbGVFbmVteSBlbmVteS5cclxuICovXHJcbmNsYXNzIEVuZW15UHJvamVjdGlsZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlIGNsYXNzIGFuZCBnZXRzIHRoZSB4IGFuZCB5IGNvZWZmaWNpZW50cyBmb3IgdXNlXHJcbiAgICAgKiBpbiB0aGUgbW92ZSBmdW5jdGlvbi4gVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiBpcyBhbHNvIGNhbGxlZC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIGRlc3RYIFRoZSB4IGRlc3RpbmF0aW9uIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gZGVzdFkgVGhlIHkgZGVzdGluYXRpb24gb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgZGVzdFgsIGRlc3RZKSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IDYwMDtcclxuICAgICAgICB0aGlzLmRhbWFnZSA9IDU7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMubGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IGRpZmZYID0gZGVzdFggLSB0aGlzLng7XHJcbiAgICAgICAgbGV0IGRpZmZZID0gZGVzdFkgLSB0aGlzLnk7XHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZGlmZlgpID4gTWF0aC5hYnMoZGlmZlkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29lZmZZID0gZGlmZlkgLyBNYXRoLmFicyhkaWZmWCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvZWZmWSA9IGRpZmZZIC8gTWF0aC5hYnMoZGlmZlkpO1xyXG4gICAgICAgICAgICB0aGlzLmNvZWZmWCA9IGRpZmZYIC8gTWF0aC5hYnMoZGlmZlkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWRJbWFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBtb3ZlcyB0aGUgRW5lbXlQcm9qZWN0aWxlIGFjY29yZGluZyB0byB0aGUgeCBhbmQgeSBjb2VmZmljaWVudHMuXHJcbiAgICAgKiBAcGFyYW0gbW9kaWZpZXIgVGhlIG1vZGlmaWVyIHRvIGJlIG11bHRpcGxpZWQgYnkgdGhlIHZlbG9jaXR5LlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0cyBUaGUgYXJyYXkgb2YgZW52aXJvbm1lbnQgb2JqZWN0cy5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIG1vdmUobW9kaWZpZXIsIGVudmlyb25tZW50T2JqZWN0cywgcGxheWVyKSB7XHJcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXIqdGhpcy5jb2VmZlg7XHJcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXIqdGhpcy5jb2VmZlk7XHJcbiAgICAgICAgaWYodGhpcy5oaXRTb21ldGhpbmcoZW52aXJvbm1lbnRPYmplY3RzLCBwbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnggPCAwIHx8IHRoaXMueCA+IDEwMDAwIHx8IHRoaXMueSA8IDAgfHwgdGhpcy55ID4gNTYyNSl7XHJcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYXdheSBoZWFsdGggZnJvbSB0aGUgcGxheWVyIGVxdWFsIHRvIHRoZSBkYW1hZ2Ugb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGRhbWFnZVBsYXllcihwbGF5ZXIpIHtcclxuICAgICAgICBwbGF5ZXIuaGVhbHRoIC09IHRoaXMuZGFtYWdlO1xyXG4gICAgICAgIHBsYXllci5kYW1hZ2VUYWtlblNvdW5kLnBsYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYXdheSBoZWFsdGggZnJvbSB0aGUgZW52aXJvbm1lbnQgb2JqZWN0IGVxdWFsIHRvIHRoZSBkYW1hZ2Ugb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdCBUaGUgZW52aXJvbm1lbnQgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBkYW1hZ2VFbnZpcm9ubWVudChlbnZpcm9ubWVudE9iamVjdCl7XHJcbiAgICAgICAgZW52aXJvbm1lbnRPYmplY3QuaGVhbHRoIC09IHRoaXMuZGFtYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgYW4gZW52aXJvbm1lbnQgb2JqZWN0IG9yIGEgcGxheWVyIHdlcmUgaGl0IGJ5IHRoZSBwcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0cyBUaGUgYXJyYXkgb2YgZW52aXJvbm1lbnQgb2JqZWN0cy5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3Qgc29tZXRoaW5nIHdhcyBoaXQuXHJcbiAgICAgKi9cclxuICAgIGhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIHBsYXllcikge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbnZpcm9ubWVudE9iamVjdHNbaV0pICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZUVudmlyb25tZW50KGVudmlyb25tZW50T2JqZWN0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIHBsYXllcikpe1xyXG4gICAgICAgICAgICB0aGlzLmRhbWFnZVBsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiBsb2FkcyB0aGUgdXJsIGFzIGFuIEltYWdlLiBPbmNlIHRoZSBpbWFnZSBpcyBsb2FkZWQsIHRoaXMuaXNJbWFnZUxvYWRlZCBpc1xyXG4gICAgICogc2V0IHRvIHRydWUuIFRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBFbmVteVByb2plY3RpbGUgYXJlIHNldCB0byB0aGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgaW1hZ2UuXHJcbiAgICAgKi9cclxuICAgIGxvYWRJbWFnZSgpIHtcclxuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBcIkdyYXBoaWNzL0VuZW15UHJvamVjdGlsZS5wbmdcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkcmF3IGZ1bmN0aW9uIGRyYXdzIHRoZSBpbWFnZSBvbiB0aGUgY2FudmFzIGF0IHRoZSB4IGFuZCB5IHBvc2l0aW9uIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gY3R4IFRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gY2FtZXJhIFRoZSBjYW1lcmEgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFbmVteVByb2plY3RpbGU7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBGaW5hbEJvc3MgY2xhc3MgZXh0ZW5kcyB0aGUgRW5lbXkgY2xhc3MuIEl0IGlzIGEgaGlnaCBoZWFsdGggYW5kIGRhbWFnZSBlbmVteS5cclxuICovXHJcbmNsYXNzIEZpbmFsQm9zcyBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBGaW5hbEJvc3MuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDEyOCwgdGhlIGhlYWx0aCBzZXQgdG8gNTAwMCwgdGhlIGRhbWFnZSBzZXQgdG8gNTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gMTAwMDAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgRmluYWxCb3NzLlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIEZpbmFsQm9zcy5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDEyOCwgNTAwMCwgNTAsIDEwMDAwKTtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd24gPSAxMDA7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duUmF0ZSA9IDE7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duUmVzZXQgPSAxMDA7XHJcbiAgICAgICAgdGhpcy5yYXBpZEZpcmVDb29sZG93biA9IDUwMDtcclxuICAgICAgICB0aGlzLnJhcGlkRmlyZUNvb2xkb3duUmF0ZSA9IDE7XHJcbiAgICAgICAgdGhpcy5yYXBpZEZpcmVDb29sZG93blJlc2V0ID0gNTAwO1xyXG4gICAgICAgIHRoaXMucmFwaWRGaXJlTGVuZ3RoID0gNTAwO1xyXG4gICAgICAgIHRoaXMucmFwaWRGaXJlTGVuZ3RoUmVzZXQgPSA1MDA7XHJcbiAgICAgICAgdGhpcy5pc1JhcGlkRmlyZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2hhcmdlQXR0YWNrQ29vbGRvd24gPSAxMjUwO1xyXG4gICAgICAgIHRoaXMuY2hhcmdlQXR0YWNrQ29vbGRvd25SYXRlID0gMTtcclxuICAgICAgICB0aGlzLmNoYXJnZUF0dGFja0Nvb2xkb3duUmVzZXQgPSAxMjUwO1xyXG4gICAgICAgIHRoaXMuY2hhcmdlQXR0YWNrTGVuZ3RoID0gMTAwO1xyXG4gICAgICAgIHRoaXMuY2hhcmdlQXR0YWNrTGVuZ3RoUmVzZXQgPSAxMDA7XHJcbiAgICAgICAgdGhpcy5pc0NoYXJnZUF0dGFjayA9IGZhbHNlO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0ZpbmFsQm9zcy5wbmdcIik7XHJcbiAgICAgICAgc3VwZXIubG9hZERhbWFnZVRha2VuU291bmQoJ0F1ZGlvL0ZpbmFsQm9zc0RhbWFnZVRha2VuLm1wMycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzdGFydHMgdGhlIGNoYXJnZSBhdHRhY2sgYnkgc2V0dGluZyB2ZWxvY2l0eSB0byAxMDI0LCBzZXR0aW5nIGRhbWFnZSB0byAxMCwgYW5kIHNldHRpbmcgaXNDaGFyZ2VBdHRhY2tcclxuICAgICAqIHRvIHRydWUuXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0Q2hhcmdlQXR0YWNrKCkge1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSAxMDI0O1xyXG4gICAgICAgIHRoaXMuZGFtYWdlID0gMTA7XHJcbiAgICAgICAgdGhpcy5pc0NoYXJnZUF0dGFjayA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGVuZHMgdGhlIGNoYXJnZSBhdHRhY2sgYnkgcmVzZXR0aW5nIHZlbG9jaXR5IGFuZCBkYW1hZ2UgdG8gdGhlaXIgZGVmYXVsdCB2YWx1ZXMuXHJcbiAgICAgKi9cclxuICAgIGVuZENoYXJnZUF0dGFjaygpIHtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gMTI4O1xyXG4gICAgICAgIHRoaXMuZGFtYWdlID0gNTA7XHJcbiAgICAgICAgdGhpcy5pc0NoYXJnZUF0dGFjayA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzdGFydHMgcmFwaWQgZmlyZSBieSBzZXR0aW5nIHRoZSBzaG9vdENvb2xkb3duUmF0ZSB0byAyNSBhbmQgc2V0dGluZyBpc1JhcGlkRmlyZSB0byB0cnVlLlxyXG4gICAgICovXHJcbiAgICBzdGFydFJhcGlkRmlyZSgpIHtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SYXRlID0gMjU7XHJcbiAgICAgICAgdGhpcy5pc1JhcGlkRmlyZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGVuZHMgdGhlIHJhcGlkIGZpcmUgYnkgc2V0cyByYXBpZCBmaXJlIGJhY2sgdG8gaXRzIGRlZmF1bHQgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIGVuZFJhcGlkRmlyZSgpIHtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SYXRlID0gMTtcclxuICAgICAgICB0aGlzLmlzUmFwaWRGaXJlID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpbmFsQm9zcztcclxuIiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBMaWdodEVuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBpcyBhIGZhc3QgZW5lbXkgd2l0aCBsb3cgaGVhbHRoLlxyXG4gKi9cclxuY2xhc3MgTGlnaHRFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBMaWdodEVuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byAxMjgsIHRoZSBoZWFsdGggc2V0IHRvIDEwLCB0aGUgZGFtYWdlIHNldCB0byAxMCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byA1MC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBMaWdodEVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIExpZ2h0RW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAxMjgsIDEwLCAxMCwgNTApO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0xpZ2h0RW5lbXkucG5nXCIpO1xyXG4gICAgICAgIHN1cGVyLmxvYWREYW1hZ2VUYWtlblNvdW5kKCdBdWRpby9MaWdodEVuZW15RGFtYWdlVGFrZW4ubXAzJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpZ2h0RW5lbXk7XHJcbiIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgTWluaUJvc3MgY2xhc3MgZXh0ZW5kcyB0aGUgRW5lbXkgY2xhc3MuIEl0IGlzIGEgaGlnaCBoZWFsdGggYW5kIGRhbWFnZSBlbmVteS5cclxuICovXHJcbmNsYXNzIE1pbmlCb3NzIGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIE1pbmlCb3NzLiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byAxMjgsIHRoZSBoZWFsdGggc2V0IHRvIDUwMCwgdGhlIGRhbWFnZSBzZXQgdG8gNTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gMTAwMC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBNaW5pQm9zcy5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBNaW5pQm9zcy5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDEyOCwgNTAwLCA1MCwgMTAwMCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duID0gMjAwO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJhdGUgPSAxO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJlc2V0ID0gMjAwO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL01pbmlCb3NzLnBuZ1wiKTtcclxuICAgICAgICBzdXBlci5sb2FkRGFtYWdlVGFrZW5Tb3VuZCgnQXVkaW8vTWluaUJvc3NEYW1hZ2VUYWtlbi5tcDMnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWluaUJvc3M7XHJcbiIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUGFyYXNpdGVFbmVteSBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaXMgYSB2ZXJ5IGZhc3QgZW5lbXkgd2l0aCB2ZXJ5IGxvdyBocC5cclxuICovXHJcbmNsYXNzIFBhcmFzaXRlRW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgUGFyYXNpdGVFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gNTEyLCB0aGUgaGVhbHRoIHNldCB0byAxLCB0aGUgZGFtYWdlIHNldCB0byAxMDAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gNTAwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFBhcmFzaXRlRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgUGFyYXNpdGVFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDUxMiwgMSwgOTksIDUwMCk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvUGFyYXNpdGVFbmVteS5wbmdcIik7XHJcbiAgICAgICAgc3VwZXIubG9hZERhbWFnZVRha2VuU291bmQoJ0F1ZGlvL1BhcmFzaXRlRW5lbXlEYW1hZ2VUYWtlbi5tcDMnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFyYXNpdGVFbmVteTtcclxuIiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQcm9qZWN0aWxlRW5lbXkgY2xhc3MgZXh0ZW5kcyB0aGUgZW5lbXkgY2xhc3MuIEl0IGNhbiBzaG9vdCBwcm9qZWN0aWxlcyBhdCB0aGUgcGxheWVyLlxyXG4gKi9cclxuY2xhc3MgUHJvamVjdGlsZUVuZW15IGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFByb2plY3RpbGVFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gOTYsIHRoZSBoZWFsdGggc2V0IHRvIDQwLCB0aGUgZGFtYWdlIHNldCB0byAxMCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byAyNTAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgUHJvamVjdGlsZUVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFByb2plY3RpbGVFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDk2LCA0MCwgMTAsIDI1MCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duID0gMzAwO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJhdGUgPSAxO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJlc2V0ID0gMzAwO1xyXG4gICAgICAgIHRoaXMuc2hvb3RBbW91bnQgPSAxO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1Byb2plY3RpbGVFbmVteS5wbmdcIik7XHJcbiAgICAgICAgc3VwZXIubG9hZERhbWFnZVRha2VuU291bmQoJ0F1ZGlvL1Byb2plY3RpbGVFbmVteURhbWFnZVRha2VuLm1wMycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0aWxlRW5lbXk7XHJcbiIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUmVndWxhckVuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBoYXMgYmFsYW5jZWQgc3RhdHMgYWNyb3NzIHRoZSBib2FyZC5cclxuICovXHJcbmNsYXNzIFJlZ3VsYXJFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBSZWd1bGFyRW5lbXkuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDY0LCB0aGUgaGVhbHRoIHNldCB0byAyNSwgdGhlIGRhbWFnZSBzZXQgdG8gMTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gMTAwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFJlZ3VsYXJFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBSZWd1bGFyRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCA2NCwgMjUsIDEwLCAxMDApO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1JlZ3VsYXJFbmVteS5wbmdcIik7XHJcbiAgICAgICAgc3VwZXIubG9hZERhbWFnZVRha2VuU291bmQoJ0F1ZGlvL1JlZ3VsYXJFbmVteURhbWFnZVRha2VuLm1wMycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWd1bGFyRW5lbXk7XHJcbiIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgVGFua0VuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBpcyBhIHNsb3cgZW5lbXkgd2l0aCBoaWdoIGhlYWx0aCBhbmQgZGFtYWdlLlxyXG4gKi9cclxuY2xhc3MgVGFua0VuZW15IGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFRhbmtFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gMzIsIHRoZSBoZWFsdGggc2V0IHRvIDEwMCwgdGhlIGRhbWFnZSBzZXQgdG8gMjUsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gNTAwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFRhbmtFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBUYW5rRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAzMiwgMTAwLCAgMjUsIDUwMCk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvVGFua0VuZW15LnBuZ1wiKTtcclxuICAgICAgICBzdXBlci5sb2FkRGFtYWdlVGFrZW5Tb3VuZCgnQXVkaW8vVGFua0VuZW15RGFtYWdlVGFrZW4ubXAzJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhbmtFbmVteTtcclxuIiwiaW1wb3J0IEVudmlyb25tZW50T2JqZWN0IGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3QuanMnO1xuXG4vKipcbiAqIFRoZSBCdXNoIGNsYXNzIGV4dGVuZHMgdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzLiBJdCBpcyBhIG5vbi1ibG9ja2luZyBvYmplY3QuXG4gKi9cbmNsYXNzIEJ1c2ggZXh0ZW5kcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgQnVzaC4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzZXMgY29uc3RydWN0b3JcbiAgICAgKiB3aXRoIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgaGVhbHRoIHNldCB0byAxMDAwMDAsIGFuZCBpc0Jsb2NraW5nIHNldCB0byBmYWxzZS5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgQnVzaC5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgQnVzaC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHN1cGVyKHgsIHksIDEwMDAwMCwgZmFsc2UpO1xuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9CdXNoLnBuZ1wiKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1c2g7IiwiaW1wb3J0IEVudmlyb25tZW50T2JqZWN0IGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3QuanMnO1xuXG4vKipcbiAqIFRoZSBDcmF0ZSBjbGFzcyBleHRlbmRzIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzcy4gSXQgaXMgYSBibG9ja2luZyBvYmplY3Qgd2l0aCBsb3cgaGVhbHRoLlxuICovXG5jbGFzcyBDcmF0ZSBleHRlbmRzIEVudmlyb25tZW50T2JqZWN0IHtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBDcmF0ZS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzZXMgY29uc3RydWN0b3JcbiAgICAgKiB3aXRoIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgaGVhbHRoIHNldCB0byAxMDAsIGFuZCBpc0Jsb2NraW5nIHNldCB0byB0cnVlLlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBDcmF0ZS5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgQ3JhdGUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICBzdXBlcih4LCB5LCAxMDAsIHRydWUpO1xuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9DcmF0ZS5wbmdcIik7XG4gICAgICAgIHN1cGVyLmxvYWRTb3VuZCgnQXVkaW8vQm94QnJlYWsubXAzJyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDcmF0ZTtcbiIsIi8qKlxuICogVGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzIGlzIHRoZSBwYXJlbnQgZm9yIGFsbCBlbnZpcm9ubWVudCBvYmplY3RzLlxuICovXG5jbGFzcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0gaGVhbHRoIFRoZSBoZWFsdGggb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSBpc0Jsb2NraW5nIFdoZXRoZXIgdGhlIEVudmlyb25tZW50T2JqZWN0IGNhbiBiZSB3YWxrZWQgdGhyb3VnaC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBoZWFsdGgsIGlzQmxvY2tpbmcpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5oZWFsdGggPSBoZWFsdGg7XG4gICAgICAgIHRoaXMuaXNCbG9ja2luZyA9IGlzQmxvY2tpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBmdW5jdGlvbiBzZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgZW52aXJvbm1lbnQgb2JqZWN0IGdpdmVuIHggYW5kIHkuXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gdG8gYmUgc2V0LlxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIHRvIGJlIHNldC5cbiAgICAgKi9cbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiB0YWtlcyBpbiBhIHVybCBhbmQgbG9hZHMgaXQgYXMgYW4gSW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0ltYWdlTG9hZGVkIGlzXG4gICAgICogc2V0IHRvIHRydWUuIFRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdCBhcmUgc2V0IHRvIHRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBpbWFnZS5cbiAgICAgKiBAcGFyYW0gdXJsIFRoZSB1cmwgdGhhdCBzaG91bGQgYmUgbG9hZGVkLlxuICAgICAqL1xuICAgIGxvYWRJbWFnZSh1cmwpIHtcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcbiAgICB9XG4gICAgbG9hZFNvdW5kKHVybCkge1xuICAgICAgICB0aGlzLmlzU291bmRMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zb3VuZCA9IG5ldyBBdWRpbygpO1xuICAgICAgICB0aGlzLnNvdW5kLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNTb3VuZExvYWRlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc291bmQuc3JjID0gdXJsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBkcmF3IGZ1bmN0aW9uIGRyYXdzIHRoZSBpbWFnZSBvbiB0aGUgY2FudmFzIGF0IHRoZSB4IGFuZCB5IHBvc2l0aW9uIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0gY3R4IFRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXMuXG4gICAgICogQHBhcmFtIGNhbWVyYSBUaGUgY2FtZXJhIG9iamVjdC5cbiAgICAgKi9cbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVudmlyb25tZW50T2JqZWN0O1xuIiwiaW1wb3J0IEVudmlyb25tZW50T2JqZWN0IGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3QuanMnO1xuXG4vKipcbiAqIFRoZSBSb2NrIGNsYXNzIGV4dGVuZHMgdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzLiBJdCBpcyBhIGJsb2NraW5nIG9iamVjdCB3aXRoIGhpZ2ggaGVhbHRoLlxuICovXG5jbGFzcyBSb2NrIGV4dGVuZHMgRW52aXJvbm1lbnRPYmplY3Qge1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFJvY2suIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzc2VzIGNvbnN0cnVjdG9yXG4gICAgICogd2l0aCB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIGhlYWx0aCBzZXQgdG8gMzAwLCBhbmQgaXNCbG9ja2luZyBzZXQgdG8gdHJ1ZS5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgUm9jay5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgUm9jay5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHN1cGVyKHgsIHksIDMwMCwgdHJ1ZSk7XG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1JvY2sucG5nXCIpO1xuICAgICAgICBzdXBlci5sb2FkU291bmQoJ0F1ZGlvL0JveEJyZWFrLm1wMycpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUm9jaztcbiIsIi8qKlxyXG4gKiBUaGUgQ29udHJvbGxlciBjbGFzcyBsaXN0ZW5zIGZvciB1c2VyIGlucHV0cyBhbmQgc3RvcmVzIHdoYXQgaXMgYmVpbmcgcHJlc3NlZC5cclxuICovXHJcbmNsYXNzIENvbnRyb2xsZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIENvbnRyb2xsZXIuIEl0IGFsc28gYWRkcyBldmVudCBsaXN0ZW5lcnMgZm9yIGtleWRvd24sIGtleXVwLCBtb3VzZW1vdmUsXHJcbiAgICAgKiBtb3VzZWRvd24sIGFuZCBtb3VzZXVwLlxyXG4gICAgICogQHBhcmFtIGRvY3VtZW50Qm9keSBUaGUgYm9keSBvZiB0aGUgZG9jdW1lbnQuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50Qm9keSkge1xyXG4gICAgICAgIHRoaXMua2V5c1ByZXNzZWQgPSBbXTtcclxuICAgICAgICB0aGlzLm1vdXNlID0gWzAsIDBdO1xyXG4gICAgICAgIHRoaXMubW91c2VQcmVzc2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Qm9keS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5rZXlzUHJlc3NlZFtldmVudC5rZXlDb2RlXSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Qm9keS5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMua2V5c1ByZXNzZWRbZXZlbnQua2V5Q29kZV0gPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnRCb2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlWzBdID0gZXZlbnQuY2xpZW50WDtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZVsxXSA9IGV2ZW50LmNsaWVudFk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Qm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZVByZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudEJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGlmIHRoZSBpbnB1dHRlZCBrZXkgaXMgYmVpbmcgcHJlc3NlZC5cclxuICAgICAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byBjaGVjay5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIHRoZSBrZXkgaXMgYmVpbmcgcHJlc3NlZC5cclxuICAgICAqL1xyXG4gICAgaXNLZXlQcmVzc2VkKGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmtleXNQcmVzc2VkW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyBpZiB0aGUgbW91c2UgaXMgYmVpbmcgcHJlc3NlZC5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIHRoZSBtb3VzZSBpcyBwcmVzc2VkLlxyXG4gICAgICovXHJcbiAgICBpc01vdXNlUHJlc3NlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb3VzZVByZXNzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIG1vdXNlIHBvc2l0aW9uLlxyXG4gICAgICogQHJldHVybnMge251bWJlcltdfSBUaGUgeCBhbmQgeSBwb3NpdGlvbiBvZiB0aGUgbW91c2UgYXMgYW4gYXJyYXkuIChbeCx5XSlcclxuICAgICAqL1xyXG4gICAgZ2V0TW91c2VQb3NpdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb3VzZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcjtcclxuIiwiaW1wb3J0IFdvcmxkIGZyb20gJy4vV29ybGQuanMnO1xyXG5pbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL0NvbnRyb2xsZXIuanMnO1xyXG5pbXBvcnQgRW5lbXlQcm9qZWN0aWxlIGZyb20gXCIuLi9FbmVtaWVzL0VuZW15UHJvamVjdGlsZVwiO1xyXG5pbXBvcnQgTWluaUJvc3MgZnJvbSBcIi4uL0VuZW1pZXMvTWluaUJvc3NcIjtcclxuaW1wb3J0IEZpbmFsQm9zcyBmcm9tIFwiLi4vRW5lbWllcy9GaW5hbEJvc3NcIjtcclxuaW1wb3J0IFByb2plY3RpbGVFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9Qcm9qZWN0aWxlRW5lbXlcIjtcclxuaW1wb3J0IEN1cnNvciBmcm9tICcuLi9DdXJzb3IuanMnO1xyXG5pbXBvcnQgUGlzdG9sIGZyb20gXCIuLi9XZWFwb25zL1Bpc3RvbFwiO1xyXG5pbXBvcnQgU25pcGVyIGZyb20gXCIuLi9XZWFwb25zL1NuaXBlclwiO1xyXG5pbXBvcnQgU2hvdGd1biBmcm9tIFwiLi4vV2VhcG9ucy9TaG90Z3VuXCI7XHJcbmltcG9ydCBBc3NhdWx0UmlmbGUgZnJvbSAnLi4vV2VhcG9ucy9Bc3NhdWx0UmlmbGUnXHJcbmltcG9ydCBGbGFtZXRocm93ZXIgZnJvbSBcIi4uL1dlYXBvbnMvRmxhbWV0aHJvd2VyXCI7XHJcbmltcG9ydCBCdWxsZXQ1MGNhbCBmcm9tIFwiLi4vV2VhcG9ucy9CdWxsZXQ1MGNhbFwiO1xyXG5pbXBvcnQgQnVsbGV0NTU2IGZyb20gXCIuLi9XZWFwb25zL0J1bGxldDU1NlwiO1xyXG5pbXBvcnQgQnVsbGV0MTJHYXVnZSBmcm9tIFwiLi4vV2VhcG9ucy9CdWxsZXQxMkdhdWdlXCI7XHJcbmltcG9ydCBCdWxsZXQ5bW0gZnJvbSBcIi4uL1dlYXBvbnMvQnVsbGV0OW1tXCI7XHJcbmltcG9ydCBCdWxsZXRGaXJlIGZyb20gXCIuLi9XZWFwb25zL0J1bGxldEZpcmVcIjtcclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG5pbXBvcnQgU3Bpa2VUcmFwIGZyb20gXCIuLi9XZWFwb25zL1NwaWtlVHJhcFwiO1xyXG5pbXBvcnQgVGFyVHJhcCBmcm9tIFwiLi4vV2VhcG9ucy9UYXJUcmFwXCI7XHJcbmltcG9ydCBTcGlrZVRyYXBQbGFjZWQgZnJvbSBcIi4uL1BsYWNlZFRyYXBzL1NwaWtlVHJhcFBsYWNlZFwiO1xyXG5pbXBvcnQgVGFyVHJhcFBsYWNlZCBmcm9tIFwiLi4vUGxhY2VkVHJhcHMvVGFyVHJhcFBsYWNlZFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBHYW1lIGNsYXNzIGlzIHVzZWQgdG8gc3RvcmUgdGhlIGdhbWUgc3RhdGUuIEl0IGFsc28gYWxsb3dzIGZvciB0aGUgZ2FtZSB0byBiZSB1cGRhdGVkIG9yIGRyYXduLlxyXG4gKi9cclxuY2xhc3MgR2FtZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgR2FtZSBjbGFzcy4gVGhlIGdhbWVTdGF0ZSBpcyBzZXQgdG8gJ1BsYXlpbmcnIGluaXRpYWxseS5cclxuICAgICAqIEBwYXJhbSBjYW52YXMgVGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBkb2N1bWVudEJvZHkgVGhlIGJvZHkgb2YgdGhlIGRvY3VtZW50LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIGRvY3VtZW50Qm9keSkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgICAgIHRoaXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB0aGlzLndvcmxkID0gbmV3IFdvcmxkKGNhbnZhcyk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIoZG9jdW1lbnRCb2R5KTtcclxuICAgICAgICB0aGlzLmN1cnNvciA9IG5ldyBDdXJzb3IoKTtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9ICdQbGF5aW5nJztcclxuICAgICAgICB0aGlzLnNjb3JlID0gMDtcclxuICAgICAgICB0aGlzLnRvcFNjb3JlcyA9IFswLCAwLCAwXTtcclxuICAgICAgICB0aGlzLmNvbWJvTGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLmNvbWJvRW5lbWllc0tpbGxlZCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgdGhlIGdhbWUuIElmIHRoZSBnYW1lU3RhdGUgaXMgJ1BsYXlpbmcsJyBldmVyeXRoaW5nIGluIHRoZSB3b3JsZCBpcyBjaGVja2VkIGFuZCB1cGRhdGVkLlxyXG4gICAgICogSWYgdGhlIGdhbWVTdGF0ZSBpcyAnUGF1c2VkLCcgZXZlcnl0aGluZyBpbiB0aGUgd29ybGQgcmVtYWlucyBzdGlsbCB1bnRpbCB0aGUgcmVzdW1lIGJ1dHRvbiBpcyBwcmVzc2VkLiBJZiB0aGVcclxuICAgICAqIGdhbWVTdGF0ZSBpcyAnR2FtZSBPdmVyLCcgZXZlcnl0aGluZyBpbiB0aGUgd29ybGQgcmVtYWlucyBzdGlsbCB1bnRpbCB0aGUgVHJ5IEFnYWluIGJ1dHRvbiBpcyBwcmVzc2VkLlxyXG4gICAgICogQHBhcmFtIG1vZGlmaWVyIFRoZSBtb2RpZmllciB0byBiZSB1c2VkIGZvciBtb3ZlbWVudC5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlKG1vZGlmaWVyKSB7XHJcbiAgICAgICAgaWYodGhpcy5nYW1lU3RhdGUgPT09ICdQbGF5aW5nJykge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5oZWFsdGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSAnR2FtZSBPdmVyJztcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVG9wU2NvcmVzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDI3KSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gJ1BhdXNlZCc7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbWJvTGVuZ3RoIC09IG1vZGlmaWVyO1xyXG4gICAgICAgICAgICBpZih0aGlzLmNvbWJvTGVuZ3RoIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21ib0VuZW1pZXNLaWxsZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21ib0xlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGxheWVyKG1vZGlmaWVyKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTaG90KCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRXF1aXBwZWQoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVFbmVtaWVzKG1vZGlmaWVyKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQaWNrVXBzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlV2VhcG9uQ29vbGRvd24obW9kaWZpZXIpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByb2plY3RpbGVzKG1vZGlmaWVyKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVFbnZpcm9ubWVudE9iamVjdHMoKTtcclxuICAgICAgICAgICAgdGhpcy53b3JsZC5jYW1lcmEudXBkYXRlKCk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLndhdmUgKz0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuc3RhcnRXYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLmdhbWVTdGF0ZSA9PT0gJ0dhbWUgT3ZlcicpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lT3ZlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuZ2FtZVN0YXRlID09PSAnUGF1c2VkJykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhdXNlU2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyBldmVyeXRoaW5nIGluIHRoZSB3b3JsZC4gSWYgdGhlIGdhbWVTdGF0ZSBpcyAnR2FtZSBPdmVyLCcgYSBnYW1lIG92ZXIgbWVzc2FnZSBpcyBkaXNwbGF5ZWQsXHJcbiAgICAgKiBpZiB0aGUgZ2FtZVN0YXRlIGlzICdQYXVzZWQsJyBhIHBhdXNlIG1lc3NhZ2UgaXMgZGlzcGxheWVkLCBhbmQgaWYgdGhlIGdhbWVTdGF0ZSBpcyAnUGxheWluZywnIGFsbCBvZiB0aGUgb2JqZWN0c1xyXG4gICAgICogaW4gdGhlIHdvcmxkIGFyZSBkcmF3biwgYWxvbmcgd2l0aCB0aGUgSFVELCBNaW5pTWFwLCBhbmQgY3Vyc29yLlxyXG4gICAgICovXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIGlmKHRoaXMuZ2FtZVN0YXRlID09PSAnR2FtZSBPdmVyJykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdHYW1lT3ZlcigpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdTY29yZWJvYXJkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5nYW1lU3RhdGUgPT09ICdQYXVzZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1BhdXNlU2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmlzQmFja2dyb3VuZExvYWRlZClcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZHJhd0JhY2tncm91bmQodGhpcy5jdHgsIHRoaXMuY2FudmFzKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1dlYXBvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3UGlja1VwcygpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdQbGFjZWRUcmFwcygpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaXNJbWFnZUxvYWRlZClcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhLCB0aGlzLmNvbnRyb2xsZXIubW91c2UpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kcmF3RW5lbWllcygpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdFbmVteVByb2plY3RpbGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0J1bGxldHMoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3RW52aXJvbm1lbnRPYmplY3RzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd01pbmlNYXAoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3SFVEKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmN1cnNvci5pbWFnZSwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdIC0gdGhpcy5jdXJzb3IuaW1hZ2Uud2lkdGgvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdIC0gdGhpcy5jdXJzb3IuaW1hZ2UuaGVpZ2h0LzIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyBhIE1pbmlNYXAgdGhhdCBkaXNwbGF5cyB0aGUgcGxheWVyJ3MgbG9jYXRpb24sIGVuZW15IGxvY2F0aW9ucywgYW5kIGVudmlyb25tZW50IG9iamVjdCBsb2NhdGlvbnMuXHJcbiAgICAgKi9cclxuICAgIGRyYXdNaW5pTWFwKCkge1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDM1LCAxNzcsIDc3LCAwLjIpJztcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMFwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMjUsIHRoaXMuY2FudmFzLmhlaWdodCAtIDI1MCwgNDAwLCAyMjUpO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVJlY3QoMjUsIHRoaXMuY2FudmFzLmhlaWdodCAtIDI1MCwgNDAwLCAyMjUpO1xyXG4gICAgICAgIGxldCB4UGVyY2VudCA9ICh0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMikgLyB0aGlzLndvcmxkLndpZHRoO1xyXG4gICAgICAgIGxldCB5UGVyY2VudCA9ICh0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0LzIpIC8gdGhpcy53b3JsZC5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IHhSZWxhdGl2ZSA9IHhQZXJjZW50KjQwMDtcclxuICAgICAgICBsZXQgeVJlbGF0aXZlID0geVBlcmNlbnQqMjI1O1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjMDBGRjAwJztcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICB0aGlzLmN0eC5hcmMoMjUgKyB4UmVsYXRpdmUsICh0aGlzLmNhbnZhcy5oZWlnaHQgLSAyNTApICsgeVJlbGF0aXZlLCAyLjUsIDAsIDIqTWF0aC5QSSk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgeFBlcmNlbnQgPSAodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0ueCArIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLndpZHRoLzIpIC8gdGhpcy53b3JsZC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGxldCB5UGVyY2VudCA9ICh0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS55ICsgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uaGVpZ2h0LzIpIC8gdGhpcy53b3JsZC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgeFJlbGF0aXZlID0geFBlcmNlbnQqNDAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHlSZWxhdGl2ZSA9IHlQZXJjZW50KjIyNTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjODA4MDgwJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguYXJjKDI1ICsgeFJlbGF0aXZlLCAodGhpcy5jYW52YXMuaGVpZ2h0IC0gMjUwKSArIHlSZWxhdGl2ZSwgMi41LCAwLCAyKk1hdGguUEkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmVuZW1pZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLmlzSW1hZ2VMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCB4UGVyY2VudCA9ICh0aGlzLndvcmxkLmVuZW1pZXNbaV0ueCArIHRoaXMud29ybGQuZW5lbWllc1tpXS53aWR0aC8yKSAvIHRoaXMud29ybGQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBsZXQgeVBlcmNlbnQgPSAodGhpcy53b3JsZC5lbmVtaWVzW2ldLnkgKyB0aGlzLndvcmxkLmVuZW1pZXNbaV0uaGVpZ2h0LzIpIC8gdGhpcy53b3JsZC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgeFJlbGF0aXZlID0geFBlcmNlbnQqNDAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHlSZWxhdGl2ZSA9IHlQZXJjZW50KjIyNTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkYwMDAwJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguYXJjKDI1ICsgeFJlbGF0aXZlLCAodGhpcy5jYW52YXMuaGVpZ2h0IC0gMjUwKSArIHlSZWxhdGl2ZSwgMi41LCAwLCAyKk1hdGguUEkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyB0aGUgSFVEIHdoaWNoIGNvbnRhaW5zIHRoZSBwbGF5ZXIncyBoZWFsdGgsIHRoZSB3YXZlIG51bWJlciwgYW5kIHRoZSBudW1iZXIgb2YgZW5lbWllcyBsZWZ0LlxyXG4gICAgICogVGhlIGN1cnJlbnQgc2VsZWN0ZWQgd2VhcG9uIGlzIGFsc28gZGlzcGxheWVkLlxyXG4gICAgICovXHJcbiAgICBkcmF3SFVEKCkge1xyXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjQ4cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCI7XHJcbiAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gMTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aGlzLndvcmxkLnBsYXllci5oZWFsdGggKyBcIiBIUFwiLCB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMjkwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCh0aGlzLndvcmxkLnBsYXllci5oZWFsdGggKyBcIiBIUFwiLCB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMjkwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJXYXZlIFwiICsgdGhpcy53b3JsZC53YXZlLCB0aGlzLmNhbnZhcy53aWR0aC8yLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIldhdmUgXCIgKyB0aGlzLndvcmxkLndhdmUsIHRoaXMuY2FudmFzLndpZHRoLzIsIDUwKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aGlzLndvcmxkLmVuZW1pZXMubGVuZ3RoICsgXCIgRW5lbWllcyBMZWZ0XCIsIHRoaXMuY2FudmFzLndpZHRoLzIgKyAzNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGggKyBcIiBFbmVtaWVzIExlZnRcIiwgdGhpcy5jYW52YXMud2lkdGgvMiArIDM1MCwgNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjQ4cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCdBY3RpdmUgV2VhcG9uOiAnICsgdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W3RoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleF0ubmFtZSwgdGhpcy5jYW52YXMud2lkdGgvMiwgdGhpcy5jYW52YXMuaGVpZ2h0IC0gNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoJ0FjdGl2ZSBXZWFwb246ICcgKyB0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnlbdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4XS5uYW1lLCB0aGlzLmNhbnZhcy53aWR0aC8yLCB0aGlzLmNhbnZhcy5oZWlnaHQgLSA1MCk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoJ1Njb3JlOiAnICsgdGhpcy5zY29yZSwgdGhpcy5jYW52YXMud2lkdGgvMiwgMTI1KTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCdTY29yZTogJyArIHRoaXMuc2NvcmUsIHRoaXMuY2FudmFzLndpZHRoLzIsIDEyNSk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoJ0NvbWJvOiAnICsgdGhpcy5jb21ib0VuZW1pZXNLaWxsZWQsIHRoaXMuY2FudmFzLndpZHRoLzIgKyAzNTAsIDEyNSk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCgnQ29tYm86ICcgKyB0aGlzLmNvbWJvRW5lbWllc0tpbGxlZCwgdGhpcy5jYW52YXMud2lkdGgvMiArIDM1MCwgMTI1KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgYWxsIG9mIHRoZSBwbGFjZWQgdHJhcHMgaW4gdGhlIHdvcmxkLlxyXG4gICAgICovXHJcbiAgICBkcmF3UGxhY2VkVHJhcHMoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQucGxhY2VkVHJhcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGFjZWRUcmFwc1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYWNlZFRyYXBzW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIHdoZXRoZXIgdGhlIHJlc3RhcnQgYnV0dG9uIG9uIHRoZSBnYW1lIG92ZXIgc2NyZWVuIGhhcyBiZWVuIHByZXNzZWQuIElmIGl0IGhhcywgdGhlIHdvcmxkIGlzXHJcbiAgICAgKiByZXN0YXJ0ZWQsIHRoZSBnYW1lIHN0YXRlIGlzIHNldCB0byAncGxheWluZywnIGFuZCB0aGUgc2NvcmUgaXMgc2V0IHRvIDAuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUdhbWVPdmVyKCkge1xyXG4gICAgICAgIGlmKHRoaXMuY29udHJvbGxlci5pc01vdXNlUHJlc3NlZCgpKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29udHJvbGxlci5tb3VzZVswXSA+IHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAgJiYgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdIDwgKHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAgKyAyMDApXHJcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0gPiB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1ICYmIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSA8IHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUgKyAxMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuc3RhcnQodGhpcy5jYW52YXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSAnUGxheWluZyc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgdGhlIGdhbWUgb3ZlciBzY3JlZW4gYW5kIGEgYnV0dG9uIHRvIHRyeSBhZ2Fpbi5cclxuICAgICAqL1xyXG4gICAgZHJhd0dhbWVPdmVyKCkge1xyXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjEyOHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkZGJztcclxuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiR2FtZSBPdmVyXCIsIHRoaXMuY2FudmFzLndpZHRoLzIsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIkdhbWUgT3ZlclwiLCB0aGlzLmNhbnZhcy53aWR0aC8yLCB0aGlzLmNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUsIDIwMCwgMTAwKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUsIDIwMCwgMTAwKTtcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIyNHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlRyeSBhZ2Fpbj9cIiwgdGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCArIDEwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSArIDUwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyB0aGUgdG9wIHNjb3JlcyBiYXNlZCBvbiB0aGUgY3VycmVudCBzY29yZS5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlVG9wU2NvcmVzKCkge1xyXG4gICAgICAgIGlmKHRoaXMuc2NvcmUgPiB0aGlzLnRvcFNjb3Jlc1swXSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvcFNjb3Jlc1syXSA9IHRoaXMudG9wU2NvcmVzWzFdO1xyXG4gICAgICAgICAgICB0aGlzLnRvcFNjb3Jlc1sxXSA9IHRoaXMudG9wU2NvcmVzWzBdO1xyXG4gICAgICAgICAgICB0aGlzLnRvcFNjb3Jlc1swXSA9IHRoaXMuc2NvcmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5zY29yZSA+IHRoaXMudG9wU2NvcmVzWzFdKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9wU2NvcmVzWzJdID0gdGhpcy50b3BTY29yZXNbMV07XHJcbiAgICAgICAgICAgIHRoaXMudG9wU2NvcmVzWzFdID0gdGhpcy5zY29yZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnNjb3JlID4gdGhpcy50b3BTY29yZXNbMl0pIHtcclxuICAgICAgICAgICAgdGhpcy50b3BTY29yZXNbMl0gPSB0aGlzLnNjb3JlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgdGhlIHRvcCAzIHNjb3Jlcy5cclxuICAgICAqL1xyXG4gICAgZHJhd1Njb3JlYm9hcmQoKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiNjBweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwic3RhcnRcIjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnSGlnaCBTY29yZXMnLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgNDQwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiAtIDc1KTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCdIaWdoIFNjb3JlcycsIHRoaXMuY2FudmFzLndpZHRoLzIgKyA0NDAsIHRoaXMuY2FudmFzLmhlaWdodC8yIC0gNzUpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCcxc3QnLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgNDAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCgnMXN0JywgdGhpcy5jYW52YXMud2lkdGgvMiArIDQwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCcybmQnLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgNDAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDc1KTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCcybmQnLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgNDAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDc1KTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnM3JkJywgdGhpcy5jYW52YXMud2lkdGgvMiArIDQwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAxNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoJzNyZCcsIHRoaXMuY2FudmFzLndpZHRoLzIgKyA0MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMTUwKTtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImVuZFwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCcnICsgdGhpcy50b3BTY29yZXNbMF0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyA4MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCcnICsgdGhpcy50b3BTY29yZXNbMF0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyA4MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnJyArIHRoaXMudG9wU2NvcmVzWzFdLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgODAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDc1KTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCcnICsgdGhpcy50b3BTY29yZXNbMV0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyA4MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgNzUpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCcnICsgdGhpcy50b3BTY29yZXNbMl0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyA4MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMTUwKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCcnICsgdGhpcy50b3BTY29yZXNbMl0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyA4MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMTUwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIHdoZXRoZXIgdGhlIHJlc3VtZSBidXR0b24gb24gdGhlIHBhdXNlZCBzY3JlZW4gaGFzIGJlZW4gcHJlc3NlZC4gSWYgaXQgaGFzLCB0aGUgZ2FtZSBzdGF0ZSBpcyBzZXQgdG8gJ3BsYXlpbmcuJ1xyXG4gICAgICovXHJcbiAgICB1cGRhdGVQYXVzZVNjcmVlbigpIHtcclxuICAgICAgICBpZih0aGlzLmNvbnRyb2xsZXIuaXNNb3VzZVByZXNzZWQoKSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0gPiB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwICYmIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSA8ICh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwKzIwMClcclxuICAgICAgICAgICAgICAgICYmIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSA+IHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUgJiYgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdIDwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSArIDEwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSAnUGxheWluZyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIHRoZSBwYXVzZSBzY3JlZW4gYW5kIGEgcmVzdW1lIGJ1dHRvbi5cclxuICAgICAqL1xyXG4gICAgZHJhd1BhdXNlU2NyZWVuKCkge1xyXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjEyOHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkZGJztcclxuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiUGF1c2VkXCIsIHRoaXMuY2FudmFzLndpZHRoLzIsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIlBhdXNlZFwiLCB0aGlzLmNhbnZhcy53aWR0aC8yLCB0aGlzLmNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUsIDIwMCwgMTAwKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUsIDIwMCwgMTAwKTtcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIyNHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlJlc3VtZVwiLCB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwICsgMTAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1ICsgNTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyBhbGwgb2YgdGhlIGVuZW1pZXMgaW4gdGhlIHdvcmxkLlxyXG4gICAgICovXHJcbiAgICBkcmF3RW5lbWllcygpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB1cGRhdGVzIHRoZSBsb2NhdGlvbiBvZiBhbGwgb2YgdGhlIGVuZW1pZXMsIHVwZGF0ZXMgdGhlaXIgY29vbGRvd25zLCBhbmQgcmVtb3ZlcyB0aGVtIGlmIHRoZXkgaGF2ZVxyXG4gICAgICogbm8gaGVhbHRoLlxyXG4gICAgICogQHBhcmFtIG1vZGlmaWVyIFRoZSBnYW1lIG1vZGlmaWVyIHNwZWVkLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVFbmVtaWVzKG1vZGlmaWVyKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gdGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5tb3ZlKHRoaXMud29ybGQucGxheWVyLCBtb2RpZmllciwgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMsIHRoaXMud29ybGQucGxhY2VkVHJhcHMsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLmF0dGFja0Nvb2xkb3duID4gMClcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5hdHRhY2tDb29sZG93biAtPSA1O1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0gaW5zdGFuY2VvZiBGaW5hbEJvc3MpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVDb29sZG93biA+IDAgJiYgIXRoaXMud29ybGQuZW5lbWllc1tpXS5pc1JhcGlkRmlyZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlQ29vbGRvd24gLT0gdGhpcy53b3JsZC5lbmVtaWVzW2ldLnJhcGlkRmlyZUNvb2xkb3duUmF0ZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLnJhcGlkRmlyZUNvb2xkb3duIDw9IDAgJiYgIXRoaXMud29ybGQuZW5lbWllc1tpXS5pc1JhcGlkRmlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5zdGFydFJhcGlkRmlyZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVMZW5ndGggPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlTGVuZ3RoUmVzZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlTGVuZ3RoID4gMCAmJiB0aGlzLndvcmxkLmVuZW1pZXNbaV0uaXNSYXBpZEZpcmUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLnJhcGlkRmlyZUxlbmd0aCAtPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlQ29vbGRvd25SYXRlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlTGVuZ3RoIDw9IDAgJiYgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmlzUmFwaWRGaXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmVuZFJhcGlkRmlyZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVDb29sZG93biA9IHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVDb29sZG93blJlc2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tDb29sZG93biA+IDAgJiYgIXRoaXMud29ybGQuZW5lbWllc1tpXS5pc0NoYXJnZUF0dGFjaylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrQ29vbGRvd24gLT0gdGhpcy53b3JsZC5lbmVtaWVzW2ldLmNoYXJnZUF0dGFja0Nvb2xkb3duUmF0ZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLmNoYXJnZUF0dGFja0Nvb2xkb3duIDw9IDAgJiYgIXRoaXMud29ybGQuZW5lbWllc1tpXS5pc0NoYXJnZUF0dGFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5zdGFydENoYXJnZUF0dGFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tMZW5ndGggPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrTGVuZ3RoUmVzZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrTGVuZ3RoID4gMCAmJiB0aGlzLndvcmxkLmVuZW1pZXNbaV0uaXNDaGFyZ2VBdHRhY2spXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmNoYXJnZUF0dGFja0xlbmd0aCAtPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrQ29vbGRvd25SYXRlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrTGVuZ3RoIDw9IDAgJiYgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmlzQ2hhcmdlQXR0YWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmVuZENoYXJnZUF0dGFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tDb29sZG93biA9IHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tDb29sZG93blJlc2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXSBpbnN0YW5jZW9mIFByb2plY3RpbGVFbmVteSB8fCB0aGlzLndvcmxkLmVuZW1pZXNbaV0gaW5zdGFuY2VvZiBNaW5pQm9zcyB8fCB0aGlzLndvcmxkLmVuZW1pZXNbaV0gaW5zdGFuY2VvZiBGaW5hbEJvc3MpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duID4gMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93biAtPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93blJhdGU7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXMucHVzaChuZXcgRW5lbXlQcm9qZWN0aWxlKHRoaXMud29ybGQuZW5lbWllc1tpXS54ICsgdGhpcy53b3JsZC5lbmVtaWVzW2ldLndpZHRoLzIsIHRoaXMud29ybGQuZW5lbWllc1tpXS55ICsgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmhlaWdodC8yLCB0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLnNob290Q29vbGRvd24gKz0gdGhpcy53b3JsZC5lbmVtaWVzW2ldLnNob290Q29vbGRvd25SZXNldDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0uaGVhbHRoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5kYW1hZ2VUYWtlblNvdW5kLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tYm9FbmVtaWVzS2lsbGVkICs9IDE7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbWJvTGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9IHRoaXMud29ybGQuZW5lbWllc1tpXS5wb2ludHNPbktpbGwqMjtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9IHRoaXMud29ybGQuZW5lbWllc1tpXS5wb2ludHNPbktpbGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWJvTGVuZ3RoID0gMztcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgdGhlIHBsYXllcnMgbG9jYXRpb24gYmFzZWQgb24gdXNlciBpbnB1dC5cclxuICAgICAqIEBwYXJhbSBtb2RpZmllciBUaGUgZ2FtZSBzcGVlZCBtb2RpZmllci5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlUGxheWVyKG1vZGlmaWVyKSB7XHJcbiAgICAgICAgbGV0IHNwcmludGluZyA9IHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoMTYpO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDg3KSkgeyAvLyBQbGF5ZXIgaG9sZGluZyB1cFxyXG4gICAgICAgICAgICAvL09ubHkgbW92ZSB1cCBpZiB3ZSBhcmUgbm90IGF0IHRoZSB2ZXJ5IHRvcCBvZiB0aGUgd29ybGRcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIueSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHRoZSBwbGF5ZXIgaXMgc3ByaW50aW5nIGhlIG11c3QgbW92ZSB0d2ljZSBhcyBmYXN0XHJcbiAgICAgICAgICAgICAgICBpZihzcHJpbnRpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueSAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCptb2RpZmllcioyO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnkgLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIC8vSWYgdGhlIG1vdmVtZW50IGNhdXNlZCB0aGUgcGxheWVyIHRvIGJlIGNvbGxpZGluZywgdW5kbyB0aGUgbW92ZW1lbnQgYW5kIGdpdmUgYmFjayB0aGUgc3RhbWluYSBpZiBoZSB3YXMgc3ByaXRuaW5nLlxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3ByaW50aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkKm1vZGlmaWVyKjI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoODMpKSB7IC8vIFBsYXllciBob2xkaW5nIGRvd25cclxuICAgICAgICAgICAgLy9Pbmx5IG1vdmUgZG93biBpZiB3ZSBhcmUgbm90IGF0IHRoZSB2ZXJ5IGJvdHRvbSBvZiB0aGUgd29ybGRcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodCA8PSA1NjI1KSB7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHRoZSBwbGF5ZXIgaXMgc3ByaW50aW5nIGhlIG11c3QgbW92ZSB0d2ljZSBhcyBmYXN0LCBhbmQgaGlzIHN0YW1pbmEgbXVzdCBkcmFpbiBiYXNlZCBvbiB0aGUgbW9kaWZpZXIgKHNlY29uZHMgc2luY2UgbGFzdCB1cGRhdGUpXHJcbiAgICAgICAgICAgICAgICBpZihzcHJpbnRpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueSArPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCptb2RpZmllcioyO1xyXG4gICAgICAgICAgICAgICAgLy9PdGhlcndpc2UgbW92ZSBsaWtlIG5vcm1hbFxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnkgKz0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIC8vSWYgdGhlIG1vdmVtZW50IGNhdXNlZCB0aGUgcGxheWVyIHRvIGJlIGNvbGxpZGluZywgdW5kbyB0aGUgbW92ZW1lbnQgYW5kIGdpdmUgYmFjayB0aGUgc3RhbWluYSBpZiBoZSB3YXMgc3ByaXRuaW5nLlxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3ByaW50aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55IC09IHRoaXMud29ybGQucGxheWVyLnNwZWVkKm1vZGlmaWVyKjI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55IC09IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoNjUpKSB7IC8vIFBsYXllciBob2xkaW5nIGxlZnRcclxuICAgICAgICAgICAgLy9vbmx5IGdvIGxlZnQgaWYgd2UgYXJlIG5vdCBvbiB0aGUgZmFyIGxlZnQgZWRnZSBhbHJlYWR5XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLnggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYoc3ByaW50aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcioyO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwcmludGluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueCArPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyKjI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkKm1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDY4KSkgeyAvLyBQbGF5ZXIgaG9sZGluZyByaWdodFxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGggPD0gMTAwMDApIHtcclxuICAgICAgICAgICAgICAgIGlmKHNwcmludGluZylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXIqMjtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdCh0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihzcHJpbnRpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcioyO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueCAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiByZW1vdmVzIGVudmlyb25tZW50IG9iamVjdHMgdGhhdCBoYXZlIG5vIGhlYWx0aCByZW1haW5pbmcgYW5kIHBsYXlzIGEgc291bmQuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUVudmlyb25tZW50T2JqZWN0cygpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5oZWFsdGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyBhbGwgb2YgdGhlIGVudmlyb25tZW50IG9iamVjdHMgaW4gdGhlIHdvcmxkLlxyXG4gICAgICovXHJcbiAgICBkcmF3RW52aXJvbm1lbnRPYmplY3RzKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLndvcmxkLmNhbWVyYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIGFsbCBvZiB0aGUgd2VhcG9ucyBpbiB0aGUgd29ybGQuXHJcbiAgICAgKi9cclxuICAgIGRyYXdXZWFwb25zKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmdyb3VuZFdlYXBvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5ncm91bmRXZWFwb25zW2ldLmlzSW1hZ2VMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZ3JvdW5kV2VhcG9uc1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLndvcmxkLmNhbWVyYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgdGhlIHBpY2t1cHMgb24gdGhlIGdyb3VuZCwgc3VjaCBhcyBncm91bmQgd2VhcG9ucyBhbmQgbWVkcGFja3MuIElmIHRoZSBwbGF5ZXIgY29sbGlkZXMgd2l0aCB0aGVtLFxyXG4gICAgICogdGhleSBhcmUgcmVtb3ZlZCBmcm9tIHRoZSB3b3JsZCBhbmQgZWl0aGVyIGFkZGVkIHRvIHRoZSBwbGF5ZXIncyBpbnZlbnRvcnkgb3IgY29uc3VtZWQuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVBpY2tVcHMoKSB7XHJcbiAgICAgICAgLy8gdXBkYXRlIGdyb3VuZCB3ZWFwb25zXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMud29ybGQuZ3JvdW5kV2VhcG9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMud29ybGQucGxheWVyLCB0aGlzLndvcmxkLmdyb3VuZFdlYXBvbnNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3duc1dlcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBqID0gdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5Lmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W2pdLm5hbWUgPT09IHRoaXMud29ybGQuZ3JvdW5kV2VhcG9uc1tpXS53ZWFwb24ubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvd25zV2VwID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihvd25zV2VwID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZ3JvdW5kV2VhcG9uc1tpXS5hZGRXZWFwb24odGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmdyb3VuZFdlYXBvbnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHVwZGF0ZSBtZWRwYWNrc1xyXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMud29ybGQucGlja1Vwcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMud29ybGQucGxheWVyLCB0aGlzLndvcmxkLnBpY2tVcHNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5oZWFsdGggPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5oZWFsdGggPSAxMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5waWNrVXBzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyB0aGUgY29vbGRvd24gb2YgYWxsIG9mIHRoZSB3ZWFwb25zIGluIHRoZSBwbGF5ZXIncyBpbnZlbnRvcnkuXHJcbiAgICAgKiBAcGFyYW0gbW9kaWZpZXIgVGhlIGdhbWUgc3BlZWQgbW9kaWZpZXIuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVdlYXBvbkNvb2xkb3duKG1vZGlmaWVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMud29ybGQucGxheWVyLmludmVudG9yeS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBsZXQgd2VwID0gdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W2ldO1xyXG4gICAgICAgICAgICBpZih3ZXAuY29vbGRvd24gPiAwKXtcclxuICAgICAgICAgICAgICAgIHdlcC5jb29sZG93biAtPSBtb2RpZmllcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgYWxsIG9mIHRoZSBsaXZlIGJ1bGxldHMgaW4gdGhlIHdvcmxkLlxyXG4gICAgICovXHJcbiAgICBkcmF3QnVsbGV0cygpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5idWxsZXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuYnVsbGV0c1tpXS5pc0ltYWdlTG9hZGVkICYmIHRoaXMud29ybGQuYnVsbGV0c1tpXS5saXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHNbaV0uZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBhZGRzIG5ldyBidWxsZXRzIHRvIHRoZSB3b3JsZCBkZXBlbmRpbmcgb24gaWYgdGhlIHBsYXllciBwcmVzc2VkIHRoZWlyIG1vdXNlIGJ1dHRvbiBhbmQgd2hhdCB3ZWFwb25cclxuICAgICAqIHdhcyBlcXVpcHBlZC4gSXQgY2hlY2tzIHRoZSB0eXBlIG9mIHdlYXBvbiB0aGUgcGxheWVyIGhhcyBlcXVpcHBlZCBhbmQgZmlyZXMgdGhlIGNvcnJlY3QgYnVsbGV0cy4gU2hvdGd1biBpcyB1bmlxdWVcclxuICAgICAqIGluIHRoYXQgaXQgZmlyZXMgNSBidWxsZXRzIHdpdGggYSBzcHJlYWQgd2hpY2ggaXMgZG9uZSBieSBhZGRpbmcvc3VidHJhY3RpbmcgYSBjb25zdGFudCBmcm9tIHRoZSBkZXN0aW5hdGlvbi5cclxuICAgICAqIElmIGEgdHJhcCBpcyBjdXJyZW50bHkgZXF1aXBwZWQsIGl0IGlzIHBsYWNlZCBhdCB0aGUgbW91c2UgcG9zaXRpb24gYW5kIHJlbW92ZWQgZnJvbSB0aGUgcGxheWVyJ3MgaW52ZW50b3J5LlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVTaG90KCkge1xyXG4gICAgICAgIGlmKHRoaXMuY29udHJvbGxlci5pc01vdXNlUHJlc3NlZCgpKSB7XHJcbiAgICAgICAgICAgIGxldCB3ZXAgPSB0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnlbdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4XTtcclxuICAgICAgICAgICAgaWYod2VwLmNvb2xkb3duIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHdlcC5zb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB3ZXAuc291bmQuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgd2VwLmFkZENvb2xkb3duKCk7XHJcbiAgICAgICAgICAgICAgICBpZih3ZXAgaW5zdGFuY2VvZiBQaXN0b2wpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0OW1tKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0LzIsIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54LCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih3ZXAgaW5zdGFuY2VvZiBTbmlwZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0NTBjYWwodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHdlcCBpbnN0YW5jZW9mIEFzc2F1bHRSaWZsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5wdXNoKG5ldyBCdWxsZXQ1NTYodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHdlcCBpbnN0YW5jZW9mIFNob3RndW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0MTJHYXVnZSh0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0rdGhpcy53b3JsZC5jYW1lcmEueCwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdK3RoaXMud29ybGQuY2FtZXJhLnkpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0MTJHYXVnZSh0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0rdGhpcy53b3JsZC5jYW1lcmEueCsyNSwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdK3RoaXMud29ybGQuY2FtZXJhLnkrMjUpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0MTJHYXVnZSh0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0rdGhpcy53b3JsZC5jYW1lcmEueCs1MCwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdK3RoaXMud29ybGQuY2FtZXJhLnkrNTApKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0MTJHYXVnZSh0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0rdGhpcy53b3JsZC5jYW1lcmEueC0yNSwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdK3RoaXMud29ybGQuY2FtZXJhLnktMjUpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0MTJHYXVnZSh0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0rdGhpcy53b3JsZC5jYW1lcmEueC01MCwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdK3RoaXMud29ybGQuY2FtZXJhLnktNTApKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vdGhlIGZsYW1ldGhyb3dlciB3aWxsIHNob290IGEgc2luZ2xlIGJhbGwgb2YgZmlyZSBlYWNoIHVwZGF0ZSBpZiBwb3NzaWJsZSB3aXRoIGEgc2xpZ2h0IHJhbmRvbSBzcHJlYWRcclxuICAgICAgICAgICAgICAgIC8vc28gdGhlIGZpcmUgZG9lcyBub3QgZ28gaW4gYSBzdHJhaWdodCBsaW5lLlxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih3ZXAgaW5zdGFuY2VvZiBGbGFtZXRocm93ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3ByZWFkMV94ID0gVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoLTEwMCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3ByZWFkMV95ID0gVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoLTEwMCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3ByZWFkMl94ID0gVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoLTEwMCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3ByZWFkMl95ID0gVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoLTEwMCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3ByZWFkM194ID0gVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoLTEwMCwgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3ByZWFkM195ID0gVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoLTEwMCwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5wdXNoKG5ldyBCdWxsZXRGaXJlKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0LzIsIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54K3NwcmVhZDFfeCwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdK3RoaXMud29ybGQuY2FtZXJhLnkrc3ByZWFkMV95KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldEZpcmUodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngrc3ByZWFkMl94LCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueStzcHJlYWQyX3kpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0RmlyZSh0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0rdGhpcy53b3JsZC5jYW1lcmEueCtzcHJlYWQzX3gsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55K3NwcmVhZDNfeSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih3ZXAgaW5zdGFuY2VvZiBTcGlrZVRyYXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnkuc3BsaWNlKHRoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4IC0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYWNlZFRyYXBzLnB1c2gobmV3IFNwaWtlVHJhcFBsYWNlZCh0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0gKyB0aGlzLndvcmxkLmNhbWVyYS54IC0gMjAwLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0gKyB0aGlzLndvcmxkLmNhbWVyYS55IC0gMjAwKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHdlcCBpbnN0YW5jZW9mIFRhclRyYXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnkuc3BsaWNlKHRoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4IC0gMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYWNlZFRyYXBzLnB1c2gobmV3IFRhclRyYXBQbGFjZWQodGhpcy5jb250cm9sbGVyLm1vdXNlWzBdICsgdGhpcy53b3JsZC5jYW1lcmEueCAtIDIwMCwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdICsgdGhpcy53b3JsZC5jYW1lcmEueSAtIDIwMCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB1cGRhdGVzIHdoYXQgdGhlIHBsYXllciBoYXMgZXF1aXBwZWQgYmFzZWQgb24gd2hhdCBrZXkgaXMgcHJlc3NlZC5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlRXF1aXBwZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoNDkpKSAvLyBQbGF5ZXIgcHJlc3NlZCAxXHJcbiAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleCA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoNTApKSB7IC8vIFBsYXllciBwcmVzc2VkIDJcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5Lmxlbmd0aCA+IDEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXggPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg1MSkpIHsgLy8gUGxheWVyIHByZXNzZWQgM1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnkubGVuZ3RoID4gMilcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleCA9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDUyKSkgeyAvLyBQbGF5ZXIgcHJlc3NlZCA0XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmludmVudG9yeS5sZW5ndGggPiAzKVxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gMztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoNTMpKSB7IC8vIFBsYXllciBwcmVzc2VkIDVcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5Lmxlbmd0aCA+IDQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXggPSA0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg1NCkpIHsgLy8gUGxheWVyIHByZXNzZWQgNlxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnkubGVuZ3RoID4gNSlcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleCA9IDU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDU1KSkgeyAvLyBQbGF5ZXIgcHJlc3NlZCA3XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmludmVudG9yeS5sZW5ndGggPiA2KVxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gNjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgYnVsbGV0cyBhbmQgZW5lbXkgcHJvamVjdGlsZXMgaW4gdGhlIHdvcmxkLiBJZiBhIHByb2plY3RpbGUgaGl0cyBhbiBvYmplY3QgZW5lbXkvcGxheWVyXHJcbiAgICAgKiBpdCBkaXNhcHBlYXJzIGZyb20gdGhlIHdvcmxkLlxyXG4gICAgICogQHBhcmFtIG1vZGlmaWVyIFRoZSBnYW1lIHNwZWVkIG1vZGlmaWVyLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVQcm9qZWN0aWxlcyhtb2RpZmllcikge1xyXG4gICAgICAgIC8vIGVuZW15IHByb2plY3RpbGVzXHJcbiAgICAgICAgZm9yKGxldCBpID0gdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5tb3ZlKG1vZGlmaWVyLCB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cywgdGhpcy53b3JsZC5wbGF5ZXIpO1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXNbaV0ubGl2ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcGxheWVyIGJ1bGxldHNcclxuICAgICAgICBmb3IobGV0IGkgPSB0aGlzLndvcmxkLmJ1bGxldHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzW2ldLm1vdmUobW9kaWZpZXIsIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzLCB0aGlzLndvcmxkLmVuZW1pZXMpO1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmJ1bGxldHNbaV0ubGl2ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIGFsbCBvZiB0aGUgbGl2ZSBlbmVteSBwcm9qZWN0aWxlcyBpbiB0aGUgd29ybGQuXHJcbiAgICAgKi9cclxuICAgIGRyYXdFbmVteVByb2plY3RpbGVzKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzW2ldLmlzSW1hZ2VMb2FkZWQgJiYgdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzW2ldLmxpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLndvcmxkLmNhbWVyYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyBhbGwgb2YgdGhlIHBpY2sgdXBzIGluIHRoZSB3b3JsZC5cclxuICAgICAqL1xyXG4gICAgZHJhd1BpY2tVcHMoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQucGlja1Vwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBpY2tVcHNbaV0uaXNJbWFnZUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5waWNrVXBzW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcclxuIiwiaW1wb3J0IFJvY2sgZnJvbSBcIi4uL0Vudmlyb25tZW50T2JqZWN0cy9Sb2NrXCI7XHJcbmltcG9ydCBCdXNoIGZyb20gXCIuLi9FbnZpcm9ubWVudE9iamVjdHMvQnVzaFwiO1xyXG5pbXBvcnQgQ3JhdGUgZnJvbSBcIi4uL0Vudmlyb25tZW50T2JqZWN0cy9DcmF0ZVwiO1xyXG5pbXBvcnQgVGFua0VuZW15IGZyb20gXCIuLi9FbmVtaWVzL1RhbmtFbmVteVwiO1xyXG5pbXBvcnQgUmVndWxhckVuZW15IGZyb20gXCIuLi9FbmVtaWVzL1JlZ3VsYXJFbmVteVwiO1xyXG5pbXBvcnQgTGlnaHRFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9MaWdodEVuZW15XCI7XHJcbmltcG9ydCBQcm9qZWN0aWxlRW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvUHJvamVjdGlsZUVuZW15XCI7XHJcbmltcG9ydCBNaW5pQm9zcyBmcm9tICcuLi9FbmVtaWVzL01pbmlCb3NzJztcclxuaW1wb3J0IEZpbmFsQm9zcyBmcm9tICcuLi9FbmVtaWVzL0ZpbmFsQm9zcyc7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL1BsYXllcnMvUGxheWVyXCI7XHJcbmltcG9ydCBDYW1lcmEgZnJvbSBcIi4uL1BsYXllcnMvQ2FtZXJhXCI7XHJcbmltcG9ydCBHcm91bmRBc3NhdWx0UmlmbGUgZnJvbSBcIi4uL1BpY2tVcHMvR3JvdW5kQXNzYXVsdFJpZmxlLmpzXCI7XHJcbmltcG9ydCBHcm91bmRTbmlwZXIgZnJvbSBcIi4uL1BpY2tVcHMvR3JvdW5kU25pcGVyLmpzXCI7XHJcbmltcG9ydCBHcm91bmRTaG90Z3VuIGZyb20gJy4uL1BpY2tVcHMvR3JvdW5kU2hvdGd1bi5qcyc7XHJcbmltcG9ydCBHcm91bmRGbGFtZXRocm93ZXIgZnJvbSAnLi4vUGlja1Vwcy9Hcm91bmRGbGFtZXRocm93ZXIuanMnO1xyXG5pbXBvcnQgSGVhbHRoUGFjayBmcm9tIFwiLi4vUGlja1Vwcy9IZWFsdGhwYWNrLmpzXCI7XHJcbmltcG9ydCBVdGlsIGZyb20gXCIuLi9VdGlsaXRpZXMvVXRpbFwiO1xyXG5pbXBvcnQgUGFyYXNpdGVFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9QYXJhc2l0ZUVuZW15XCI7XHJcbmltcG9ydCBHcm91bmRTcGlrZVRyYXAgZnJvbSBcIi4uL1BpY2tVcHMvR3JvdW5kU3Bpa2VUcmFwLmpzXCI7XHJcbmltcG9ydCBHcm91bmRUYXJUcmFwIGZyb20gJy4uL1BpY2tVcHMvR3JvdW5kVGFyVHJhcC5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIFdvcmxkIGNsYXNzIGhvbGRzIHRoZSBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIHRoZSB3b3JsZC5cclxuICovXHJcbmNsYXNzIFdvcmxkIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGQgb2YgdGhlIHdvcmxkIGFuZCBsb2FkcyB0aGUgYmFja2dyb3VuZC5cclxuICAgICAqIEBwYXJhbSBjYW52YXMgVGhlIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY2FudmFzKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydChjYW52YXMpO1xyXG4gICAgICAgIHRoaXMubG9hZEJhY2tncm91bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzdGFydCBmdW5jdGlvbiBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBXb3JsZC4gVGhlIHBsYXllciBpcyBtYWRlIGFuZCB0aGUgY2FtZXJhIGlzIGF0dGFjaGVkIHRvIHRoZSBwbGF5ZXIuXHJcbiAgICAgKiBBIGNhbGwgaXMgdG8gaW5pdGlhbGl6ZSB0aGUgZW52aXJvbm1lbnQgYW5kIHN0YXJ0IHRoZSB3YXZlLlxyXG4gICAgICogQHBhcmFtIGNhbnZhcyBUaGUgY2FudmFzLlxyXG4gICAgICovXHJcbiAgICBzdGFydChjYW52YXMpIHtcclxuICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZW5lbWllcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZW5lbXlQcm9qZWN0aWxlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMucGlja1VwcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZ3JvdW5kV2VhcG9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMucGxhY2VkVHJhcHMgPSBbXTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVFbnZpcm9ubWVudCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVBpY2tVcHMoKTtcclxuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoY2FudmFzLndpZHRoLzIsIGNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgQ2FtZXJhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCwgMTAwMDAsIDU2MjUpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllciwgY2FudmFzLndpZHRoLzIsIGNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy53YXZlID0gMTtcclxuICAgICAgICB0aGlzLnN0YXJ0V2F2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpbml0aWFsaXplcyB0aGUgZW52aXJvbm1lbnQgYnkgcHVzaGluZyBlbnZpcm9ubWVudCBvYmplY3RzIG9udG8gdGhlIGVudmlyb25tZW50T2JqZWN0cyBhcnJheS5cclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZUVudmlyb25tZW50KCkge1xyXG4gICAgICAgIGxldCBjcmF0ZUNhcCA9IDE1O1xyXG4gICAgICAgIGxldCBidXNoQ2FwID0gMTU7XHJcbiAgICAgICAgbGV0IHJvY2tDYXAgPSAxNTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGNyYXRlQ2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzLnB1c2gobmV3IENyYXRlKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYnVzaENhcDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cy5wdXNoKG5ldyBCdXNoKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcm9ja0NhcDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cy5wdXNoKG5ldyBSb2NrKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbGxpc2lvbkZsYWcgPSB0cnVlO1xyXG4gICAgICAgIHdoaWxlKGNvbGxpc2lvbkZsYWcgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IGkgPSBVdGlsLmFyZUFueUNvbGxpc2lvbnNJblNhbWVBcnJheSh0aGlzLmVudmlyb25tZW50T2JqZWN0cyk7XHJcbiAgICAgICAgICAgIGlmKGkgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0c1tpXS5zZXRQb3NpdGlvbihVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGluaXRpYWxpemVzIFBpY2tVcHMgc3VjaCBhcyB3ZWFwb25zIGFuZCBoZWFsdGggcGFja3MgYnkgcHVzaGluZyB0aGVtIG9udG8gdGhlIFBpY2tVcHMgYW5kIGdyb3VuZFdlYXBvbnMgYXJyYXlzLlxyXG4gICAgICovXHJcbiAgICAgaW5pdGlhbGl6ZVBpY2tVcHMoKSB7XHJcbiAgICAgICAgIGxldCBzbmlwZXJDYXAgPSAzO1xyXG4gICAgICAgICBsZXQgYXNzYXVsdFJpZmxlQ2FwID0gNTtcclxuICAgICAgICAgbGV0IHNob3RndW5DYXAgPSA1O1xyXG4gICAgICAgICBsZXQgc3Bpa2VUcmFwQ2FwID0gNTtcclxuICAgICAgICAgbGV0IHRhclRyYXBDYXAgPSA1O1xyXG4gICAgICAgICBsZXQgZmxhbWV0aHJvd2VyQ2FwID0gNTtcclxuICAgICAgICAgbGV0IGhlYWx0aFBhY2tDYXAgPSA3O1xyXG5cclxuICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNuaXBlckNhcDsgaSsrKVxyXG4gICAgICAgICAgICAgdGhpcy5ncm91bmRXZWFwb25zLnB1c2gobmV3IEdyb3VuZFNuaXBlcihVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3NhdWx0UmlmbGVDYXA7IGkrKylcclxuICAgICAgICAgICAgIHRoaXMuZ3JvdW5kV2VhcG9ucy5wdXNoKG5ldyBHcm91bmRBc3NhdWx0UmlmbGUoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hvdGd1bkNhcDsgaSsrKVxyXG4gICAgICAgICAgICAgdGhpcy5ncm91bmRXZWFwb25zLnB1c2gobmV3IEdyb3VuZFNob3RndW4oVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBmbGFtZXRocm93ZXJDYXA7IGkrKylcclxuICAgICAgICAgICAgICB0aGlzLmdyb3VuZFdlYXBvbnMucHVzaChuZXcgR3JvdW5kRmxhbWV0aHJvd2VyKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc3Bpa2VUcmFwQ2FwOyBpKyspXHJcbiAgICAgICAgICAgICAgdGhpcy5ncm91bmRXZWFwb25zLnB1c2gobmV3IEdyb3VuZFNwaWtlVHJhcChVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRhclRyYXBDYXA7IGkrKylcclxuICAgICAgICAgICAgICB0aGlzLmdyb3VuZFdlYXBvbnMucHVzaChuZXcgR3JvdW5kVGFyVHJhcChVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBoZWFsdGhQYWNrQ2FwOyBpKyspXHJcbiAgICAgICAgICAgICB0aGlzLnBpY2tVcHMucHVzaChuZXcgSGVhbHRoUGFjayhVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcblxyXG4gICAgICAgICBsZXQgc2VsZkNvbGxpc2lvbkZsYWcgPSB0cnVlO1xyXG4gICAgICAgICB3aGlsZShzZWxmQ29sbGlzaW9uRmxhZykge1xyXG4gICAgICAgICAgICAgbGV0IGkgPSBVdGlsLmFyZUFueUNvbGxpc2lvbnNJblNhbWVBcnJheSh0aGlzLmdyb3VuZFdlYXBvbnMpO1xyXG4gICAgICAgICAgICAgaWYoaSA9PT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgc2VsZkNvbGxpc2lvbkZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICB0aGlzLmdyb3VuZFdlYXBvbnNbaV0uc2V0UG9zaXRpb24oVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHNlbGZDb2xsaXNpb25GbGFnID0gdHJ1ZTtcclxuICAgICAgICAgd2hpbGUoc2VsZkNvbGxpc2lvbkZsYWcpIHtcclxuICAgICAgICAgICAgIGxldCBpID0gVXRpbC5hcmVBbnlDb2xsaXNpb25zSW5TYW1lQXJyYXkodGhpcy5waWNrVXBzKTtcclxuICAgICAgICAgICAgIGlmKGkgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgIHNlbGZDb2xsaXNpb25GbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgdGhpcy5waWNrVXBzW2ldLnNldFBvc2l0aW9uKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpO1xyXG4gICAgICAgICB9XHJcbiAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzdGFydHMgdGhlIHdhdmUgYnkgcHVzaGluZyBlbmVtaWVzIG9udG8gdGhlIGVuZW1pZXMgYXJyYXkuXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0V2F2ZSgpIHtcclxuICAgICAgICBsZXQgbGlnaHRFbmVteUNhcCA9IHRoaXMud2F2ZSAqIDEwO1xyXG4gICAgICAgIGxldCByZWd1bGFyRW5lbXlDYXAgPSB0aGlzLndhdmUgKiAxMDtcclxuICAgICAgICBsZXQgdGFua0VuZW15Q2FwID0gdGhpcy53YXZlICogNTtcclxuICAgICAgICBsZXQgcHJvamVjdGlsZUVuZW15Q2FwID0gTWF0aC5mbG9vcih0aGlzLndhdmUvMikqNTtcclxuICAgICAgICBsZXQgbWluaUJvc3NDYXAgPSBNYXRoLmZsb29yKHRoaXMud2F2ZS81KTtcclxuICAgICAgICBsZXQgcGFyYXNpdGVFbmVteUNhcCA9IHRoaXMud2F2ZTtcclxuXHJcbiAgICAgICAgaWYodGhpcy53YXZlID09PSA2KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBGaW5hbEJvc3MoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxpZ2h0RW5lbXlDYXA7IGkrKylcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBMaWdodEVuZW15KFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHJlZ3VsYXJFbmVteUNhcDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IFJlZ3VsYXJFbmVteShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0YW5rRW5lbXlDYXA7IGkrKylcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBUYW5rRW5lbXkoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcHJvamVjdGlsZUVuZW15Q2FwOyBpKyspXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgUHJvamVjdGlsZUVuZW15KFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG1pbmlCb3NzQ2FwOyBpKyspXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgTWluaUJvc3MoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGFyYXNpdGVFbmVteUNhcDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IFBhcmFzaXRlRW5lbXkoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNvbGxpc2lvbkZsYWcgPSB0cnVlO1xyXG4gICAgICAgIHdoaWxlKGNvbGxpc2lvbkZsYWcgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IGkgPSBVdGlsLmFyZUFueUNvbGxpc2lvbnModGhpcy5lbmVtaWVzLCB0aGlzLmVudmlyb25tZW50T2JqZWN0cyk7XHJcbiAgICAgICAgICAgIGlmIChpID09PSAtMSlcclxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbkZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmVtaWVzW2ldLnNldFBvc2l0aW9uKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsb2FkQmFja2dyb3VuZCBmdW5jdGlvbiBsb2FkcyB0aGUgYmFja2dyb3VuZCBpbWFnZS4gT25jZSB0aGUgaW1hZ2UgaXMgbG9hZGVkLCB0aGlzLmlzQmFja2dyb3VuZExvYWRlZCBpc1xyXG4gICAgICogc2V0IHRvIHRydWUuXHJcbiAgICAgKi9cclxuICAgIGxvYWRCYWNrZ3JvdW5kKCkge1xyXG4gICAgICAgIHRoaXMuaXNCYWNrZ3JvdW5kTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0JhY2tncm91bmRMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5iYWNrZ3JvdW5kLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuYmFja2dyb3VuZC5oZWlnaHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQuc3JjID0gXCJHcmFwaGljcy9CYWNrZ3JvdW5kLnBuZ1wiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRyYXdCYWNrZ3JvdW5kIGZ1bmN0aW9uIGRyYXdzIHRoZSBiYWNrZ3JvdW5kIG9mIHRoZSB3b3JsZC5cclxuICAgICAqIEBwYXJhbSBjdHggVGhlIGNvbnRleHQgb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjYW52YXMgVGhlIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgZHJhd0JhY2tncm91bmQoY3R4LCBjYW52YXMpIHtcclxuICAgICAgICBsZXQgc1dpZHRoLCBzSGVpZ2h0O1xyXG4gICAgICAgIHNXaWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgICAgICBzSGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuXHJcbiAgICAgICAgaWYodGhpcy5iYWNrZ3JvdW5kLndpZHRoIC0gdGhpcy5jYW1lcmEueCA8IGNhbnZhcy53aWR0aClcclxuICAgICAgICAgICAgc1dpZHRoID0gdGhpcy5iYWNrZ3JvdW5kLndpZHRoIC0gdGhpcy5jYW1lcmEueDtcclxuICAgICAgICBpZih0aGlzLmJhY2tncm91bmQuaGVpZ2h0IC0gdGhpcy5jYW1lcmEueSA8IGNhbnZhcy5oZWlnaHQpXHJcbiAgICAgICAgICAgIHNIZWlnaHQgPSB0aGlzLmJhY2tncm91bmQuaGVpZ2h0IC0gdGhpcy5jYW1lcmEueTtcclxuXHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmJhY2tncm91bmQsIHRoaXMuY2FtZXJhLngsIHRoaXMuY2FtZXJhLnksIHNXaWR0aCwgc0hlaWdodCwgMCwgMCwgc1dpZHRoLCBzSGVpZ2h0KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdvcmxkO1xyXG4iLCIvKlxuICBTb3VyY2VzOlxuICBodHRwOi8vd3d3Lmxvc3RkZWNhZGVnYW1lcy5jb20vaG93LXRvLW1ha2UtYS1zaW1wbGUtaHRtbDUtY2FudmFzLWdhbWUvXG4gIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQwMzcyMTIvaHRtbC1jYW52YXMtZnVsbC1zY3JlZW4/dXRtX21lZGl1bT1vcmdhbmljJnV0bV9zb3VyY2U9Z29vZ2xlX3JpY2hfcWEmdXRtX2NhbXBhaWduPWdvb2dsZV9yaWNoX3FhXG4gIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2OTE5NjAxL2h0bWw1LWNhbnZhcy13b3JsZC5jYW1lcmEtdmlld3BvcnQtaG93LXRvLWFjdGFsbHktZG8taXQ/dXRtX21lZGl1bT1vcmdhbmljJnV0bV9zb3VyY2U9Z29vZ2xlX3JpY2hfcWEmdXRtX2NhbXBhaWduPWdvb2dsZV9yaWNoX3FhXG4gIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvZ2ZjYXJ2L1FLZ0hzL1xuICovXG5cbmltcG9ydCBHYW1lIGZyb20gJy4vR2FtZS9HYW1lLmpzJztcblxubGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbmxldCBnYW1lID0gbmV3IEdhbWUoY2FudmFzLCBkb2N1bWVudC5ib2R5KTtcblxubGV0IG1haW4gPSAoKSA9PiB7XG4gICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgbGV0IGRlbHRhID0gbm93IC0gdGhlbjtcblxuICAgIGdhbWUudXBkYXRlKGRlbHRhIC8gMTAwMCk7XG4gICAgZ2FtZS5kcmF3KCk7XG5cbiAgICB0aGVuID0gbm93O1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW4pO1xufTtcblxuLy8gQ3Jvc3MtYnJvd3NlciBzdXBwb3J0IGZvciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZTtcblxubGV0IHRoZW4gPSBEYXRlLm5vdygpO1xubWFpbigpO1xuIiwiaW1wb3J0IEdyb3VuZFdlYXBvbiBmcm9tICcuL0dyb3VuZFdlYXBvbi5qcyc7XHJcbmltcG9ydCBBc3NhdWx0UmlmbGUgZnJvbSAnLi4vV2VhcG9ucy9Bc3NhdWx0UmlmbGUuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBHcm91bmRBc3NhdWx0UmlmbGUgY2xhc3MgZXh0ZW5kcyB0aGUgR3JvdW5kV2VhcG9uIGNsYXNzLlxyXG4gKi9cclxuY2xhc3MgR3JvdW5kQXNzYXVsdFJpZmxlIGV4dGVuZHMgR3JvdW5kV2VhcG9uIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgbGV0IHdlYXBvbiA9IG5ldyBBc3NhdWx0UmlmbGUoKTtcclxuICAgICAgICBzdXBlcih4LCB5LCB3ZWFwb24pO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0dyb3VuZEFzc2F1bHRSaWZsZS5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdyb3VuZEFzc2F1bHRSaWZsZTtcclxuIiwiaW1wb3J0IEdyb3VuZFdlYXBvbiBmcm9tICcuL0dyb3VuZFdlYXBvbi5qcyc7XHJcbmltcG9ydCBGbGFtZXRocm93ZXIgZnJvbSAnLi4vV2VhcG9ucy9GbGFtZXRocm93ZXIuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBHcm91bmRBc3NhdWx0UmlmbGUgY2xhc3MgZXh0ZW5kcyB0aGUgR3JvdW5kV2VhcG9uIGNsYXNzLlxyXG4gKi9cclxuY2xhc3MgR3JvdW5kRmxhbWV0aHJvd2VyIGV4dGVuZHMgR3JvdW5kV2VhcG9uIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgbGV0IHdlYXBvbiA9IG5ldyBGbGFtZXRocm93ZXIoKTtcclxuICAgICAgICBzdXBlcih4LCB5LCB3ZWFwb24pO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0dyb3VuZEZsYW1ldGhyb3dlci5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgR3JvdW5kRmxhbWV0aHJvd2VyO1xyXG4iLCJpbXBvcnQgR3JvdW5kV2VhcG9uIGZyb20gJy4vR3JvdW5kV2VhcG9uLmpzJztcclxuaW1wb3J0IFNob3RndW4gZnJvbSAnLi4vV2VhcG9ucy9TaG90Z3VuLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgR3JvdW5kQXNzYXVsdFJpZmxlIGNsYXNzIGV4dGVuZHMgdGhlIEdyb3VuZFdlYXBvbiBjbGFzcy5cclxuICovXHJcbmNsYXNzIEdyb3VuZFNob3RndW4gZXh0ZW5kcyBHcm91bmRXZWFwb24ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBsZXQgd2VhcG9uID0gbmV3IFNob3RndW4oKTtcclxuICAgICAgICBzdXBlcih4LCB5LCB3ZWFwb24pO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0dyb3VuZFNob3RndW4ucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEdyb3VuZFNob3RndW47XHJcbiIsImltcG9ydCBHcm91bmRXZWFwb24gZnJvbSAnLi9Hcm91bmRXZWFwb24uanMnO1xyXG5pbXBvcnQgV2VhcG9uIGZyb20gJy4uL1dlYXBvbnMvV2VhcG9uLmpzJztcclxuaW1wb3J0IFNuaXBlciBmcm9tICcuLi9XZWFwb25zL1NuaXBlci5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIEdyb3VuZFNuaXBlciBjbGFzcyBleHRlbmRzIHRoZSBHcm91bmRXZWFwb24gY2xhc3MuXHJcbiAqL1xyXG5jbGFzcyBHcm91bmRTbmlwZXIgZXh0ZW5kcyBHcm91bmRXZWFwb24ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBsZXQgd2VhcG9uID0gbmV3IFNuaXBlcigpO1xyXG4gICAgICAgIHN1cGVyKHgsIHksIHdlYXBvbik7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvR3JvdW5kU25pcGVyLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3JvdW5kU25pcGVyO1xyXG4iLCJpbXBvcnQgR3JvdW5kV2VhcG9uIGZyb20gJy4vR3JvdW5kV2VhcG9uLmpzJztcclxuaW1wb3J0IFNwaWtlVHJhcCBmcm9tICcuLi9XZWFwb25zL1NwaWtlVHJhcC5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIEdyb3VuZFNwaWtlVHJhcCBjbGFzcyBleHRlbmRzIHRoZSBHcm91bmRXZWFwb24gY2xhc3MuXHJcbiAqL1xyXG5jbGFzcyBHcm91bmRTcGlrZVRyYXAgZXh0ZW5kcyBHcm91bmRXZWFwb24ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBsZXQgd2VhcG9uID0gbmV3IFNwaWtlVHJhcCgpO1xyXG4gICAgICAgIHN1cGVyKHgsIHksIHdlYXBvbik7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvR3JvdW5kU3Bpa2VUcmFwLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3JvdW5kU3Bpa2VUcmFwO1xyXG4iLCJpbXBvcnQgR3JvdW5kV2VhcG9uIGZyb20gJy4vR3JvdW5kV2VhcG9uLmpzJztcclxuaW1wb3J0IFRhclRyYXAgZnJvbSAnLi4vV2VhcG9ucy9UYXJUcmFwLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgVGFyVHJhcCBjbGFzcyBleHRlbmRzIHRoZSBHcm91bmRXZWFwb24gY2xhc3MuXHJcbiAqL1xyXG5jbGFzcyBHcm91bmRUYXJUcmFwIGV4dGVuZHMgR3JvdW5kV2VhcG9uIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgbGV0IHdlYXBvbiA9IG5ldyBUYXJUcmFwKCk7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2VhcG9uKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9Hcm91bmRUYXJUcmFwLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3JvdW5kVGFyVHJhcDtcclxuIiwiY2xhc3MgR3JvdW5kV2VhcG9uIHtcclxuICAgIC8veCA9IHRoZSB4IHBvc2l0aW9uIG9mIHRoZSBncm91bmQgd2VhcG9uXHJcbiAgICAvL3kgPSB0aGUgeSBwb3NpdGlvbiBvZiB0aGUgZ3JvdW5kIHdlYXBvblxyXG4gICAgLy93ZWFwb24gID0gdGhlIHdlYXBvbiBvYmplY3QgdGhhdCB3aWxsIGJlIGFkZGVkIHRvIHRoZSBwbGF5ZXIncyBpbnZlbnRvcnlcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIHdlYXBvbikge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLndlYXBvbiA9IHdlYXBvbjtcclxuICAgIH1cclxuICAgIHNldFBvc2l0aW9uKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbiAgICBsb2FkSW1hZ2UodXJsKSB7XHJcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICBhcnJheSA9IHRoZSBhcnJheSB0aGF0IHRoZSB3ZXBhb24gb2JqZWN0IHN0b3JlZCBpbiB0aGlzIEdyb3VuZFdlYXBvbiB3aWxsIGJlIHB1c2hlZCBpbnRvLiBUaGlzIG1ldGhvZCBpcyB0byBiZSB1c2VkIHdpdGggYSBwbGF5ZXIncyBpbnZlbnRvcnkuXHJcbiAgICAqL1xyXG4gICAgYWRkV2VhcG9uKGFycmF5KXtcclxuICAgICAgYXJyYXkucHVzaCh0aGlzLndlYXBvbik7XHJcbiAgICB9XHJcbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEdyb3VuZFdlYXBvbjtcclxuIiwiY2xhc3MgSGVhbHRoUGFjayB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLmhlYWxpbmcgPSAxMDA7XHJcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRJbWFnZSgpIHtcclxuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSAnR3JhcGhpY3MvSGVhbHRoUGFjay5wbmcnO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhlYWx0aFBhY2s7XHJcbiIsIi8qKlxyXG4gKiBUaGUgUGxhY2VkVHJhcCBjbGFzcyBpcyB0aGUgcGFyZW50IGZvciBhbGwgcGxhY2VkIHRyYXBzLlxyXG4gKi9cclxuY2xhc3MgUGxhY2VkVHJhcCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgUGxhY2VkVHJhcC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBQbGFjZWRUcmFwLlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFBsYWNlZFRyYXAuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBwbGFjZWQgdHJhcCBnaXZlbiB4IGFuZCB5LlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gdG8gYmUgc2V0LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gdG8gYmUgc2V0LlxyXG4gICAgICovXHJcbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiB0YWtlcyBpbiBhIHVybCBhbmQgbG9hZHMgaXQgYXMgYW4gSW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0ltYWdlTG9hZGVkIGlzXHJcbiAgICAgKiBzZXQgdG8gdHJ1ZS4gVGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIFBsYWNlZFRyYXAgYXJlIHNldCB0byB0aGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgaW1hZ2UuXHJcbiAgICAgKiBAcGFyYW0gdXJsIFRoZSB1cmwgdGhhdCBzaG91bGQgYmUgbG9hZGVkLlxyXG4gICAgICovXHJcbiAgICBsb2FkSW1hZ2UodXJsKSB7XHJcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRyYXcgZnVuY3Rpb24gZHJhd3MgdGhlIGltYWdlIG9uIHRoZSBjYW52YXMgYXQgdGhlIHggYW5kIHkgcG9zaXRpb24gb2YgdGhlIFBsYWNlZFRyYXAuXHJcbiAgICAgKiBAcGFyYW0gY3R4IFRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gY2FtZXJhIFRoZSBjYW1lcmEgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGFjZWRUcmFwO1xyXG4iLCJpbXBvcnQgUGxhY2VkVHJhcCBmcm9tICcuL1BsYWNlZFRyYXAuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBTcGlrZVRyYXBQbGFjZWQgY2xhc3MgZXh0ZW5kcyB0aGUgUGxhY2VkVHJhcCBjbGFzcy5cclxuICovXHJcbmNsYXNzIFNwaWtlVHJhcFBsYWNlZCBleHRlbmRzIFBsYWNlZFRyYXAge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFNwaWtlVHJhcFBsYWNlZC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBTcGlrZVRyYXBQbGFjZWQuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgU3Bpa2VUcmFwUGxhY2VkLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvU3Bpa2VUcmFwLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3Bpa2VUcmFwUGxhY2VkO1xyXG4iLCJpbXBvcnQgUGxhY2VkVHJhcCBmcm9tICcuL1BsYWNlZFRyYXAuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBUYXJUcmFwUGxhY2VkIGNsYXNzIGV4dGVuZHMgdGhlIFBsYWNlZFRyYXAgY2xhc3MuXHJcbiAqL1xyXG5jbGFzcyBUYXJUcmFwUGxhY2VkIGV4dGVuZHMgUGxhY2VkVHJhcCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgVGFyVHJhcFBsYWNlZC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBUYXJUcmFwUGxhY2VkLlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFRhclRyYXBQbGFjZWQuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9UYXJUcmFwLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFyVHJhcFBsYWNlZDtcclxuIiwiLypcclxuICBTb3VyY2VzOlxyXG4gIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvZ2ZjYXJ2L1FLZ0hzL1xyXG4qL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBDYW1lcmEgY2xhc3MgaXMgdXNlZCB0byBmb2xsb3cgdGhlIHBsYXllcidzIG1vdmVtZW50LlxyXG4gKi9cclxuY2xhc3MgQ2FtZXJhIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBDYW1lcmEuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgQ2FtZXJhLlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIENhbWVyYS5cclxuICAgICAqIEBwYXJhbSBjYW52YXNXaWR0aCBUaGUgd2lkdGggb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjYW52YXNIZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIHdvcmxkV2lkdGggVGhlIHdpZHRoIG9mIHRoZSB3b3JsZC5cclxuICAgICAqIEBwYXJhbSB3b3JsZEhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSB3b3JsZC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCwgd29ybGRXaWR0aCwgd29ybGRIZWlnaHQpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy54RGVhZFpvbmUgPSAwO1xyXG4gICAgICAgIHRoaXMueURlYWRab25lID0gMDtcclxuICAgICAgICB0aGlzLndpZHRoID0gY2FudmFzV2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBjYW52YXNIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy53b3JsZFdpZHRoID0gd29ybGRXaWR0aDtcclxuICAgICAgICB0aGlzLndvcmxkSGVpZ2h0ID0gd29ybGRIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gc2V0IHdobyB0aGUgY2FtZXJhIGlzIGZvbGxvd2luZy5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciB0aGF0IHRoZSBjYW1lcmEgc2hvdWxkIGZvbGxvdy5cclxuICAgICAqIEBwYXJhbSB4RGVhZFpvbmVcclxuICAgICAqIEBwYXJhbSB5RGVhZFpvbmVcclxuICAgICAqL1xyXG4gICAgZm9sbG93KHBsYXllciwgeERlYWRab25lLCB5RGVhZFpvbmUpIHtcclxuICAgICAgICB0aGlzLmZvbGxvd2luZyA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLnhEZWFkWm9uZSA9IHhEZWFkWm9uZTtcclxuICAgICAgICB0aGlzLnlEZWFkWm9uZSA9IHlEZWFkWm9uZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyB0aGUgY2FtZXJhJ3MgeCBhbmQgeSBwb3NpdGlvbi5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZm9sbG93aW5nICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5mb2xsb3dpbmcueCAtIHRoaXMueCArIHRoaXMueERlYWRab25lID4gdGhpcy53aWR0aClcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuZm9sbG93aW5nLnggLSAodGhpcy53aWR0aCAtIHRoaXMueERlYWRab25lKTtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmZvbGxvd2luZy54IC0gdGhpcy54RGVhZFpvbmUgPCB0aGlzLngpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmZvbGxvd2luZy54IC0gdGhpcy54RGVhZFpvbmU7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZm9sbG93aW5nLnkgLSB0aGlzLnkgKyB0aGlzLnlEZWFkWm9uZSA+IHRoaXMuaGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5mb2xsb3dpbmcueSAtICh0aGlzLmhlaWdodCAtIHRoaXMueURlYWRab25lKTtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmZvbGxvd2luZy55IC0gdGhpcy55RGVhZFpvbmUgPCB0aGlzLnkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmZvbGxvd2luZy55IC0gdGhpcy55RGVhZFpvbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMueCA8IDApXHJcbiAgICAgICAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgICAgaWYodGhpcy55IDwgMClcclxuICAgICAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICBpZih0aGlzLnggKyB0aGlzLndpZHRoID4gdGhpcy53b3JsZFdpZHRoKVxyXG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLndvcmxkV2lkdGggLSB0aGlzLndpZHRoO1xyXG4gICAgICAgIGlmKHRoaXMueSArIHRoaXMuaGVpZ2h0ID4gdGhpcy53b3JsZEhlaWdodClcclxuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy53b3JsZEhlaWdodCAtIHRoaXMuaGVpZ2h0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYW1lcmE7IiwiaW1wb3J0IFBpc3RvbCBmcm9tICcuLi9XZWFwb25zL1Bpc3RvbC5qcydcbmltcG9ydCBTbmlwZXIgZnJvbSAnLi4vV2VhcG9ucy9TbmlwZXIuanMnXG5pbXBvcnQgU2hvdGd1biBmcm9tICcuLi9XZWFwb25zL1Nob3RndW4uanMnXG5pbXBvcnQgQXNzYXVsdFJpZmxlIGZyb20gJy4uL1dlYXBvbnMvQXNzYXVsdFJpZmxlLmpzJ1xuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xuXG5jbGFzcyBQbGF5ZXIge1xuICAvL3RoaXMueCA9IHggcG9zaXRpb25cbiAgLy90aGlzLnkgPSB5IHBvc2l0aW9uXG4gIC8vdGhpcy5oZWFsdGggPSBwbGF5ZXIncyBsaWZlXG4gIC8vdGhpcy5zcGVlZCA9IHBsYXllcidzIG1vdmVzcGVlZFxuICAvL3RoaXMubG9hZEltYWdlKCkgaXMgYSBmdW5jdGlvbiB0byBhdHRhY2ggdGhlIGltYWdlIHRvIHRoZSBwbGF5ZXIuXG4gIC8vVGhlIHBsYXllciBoYXMgYW4gYXJyYXkgdG8gaG9sZCBoaXMgaXRlbXMgYW5kIGhlIHdpbGwgc3RhcnQgd2l0aCBhIHBpc3RvbCBhbmQgc25pcGVyIHRoaXMgd2VlayBmb3IgZWFzeSB0ZXN0aW5nXG4gIC8vTmV4dCB3ZWVrIGl0ZW1zIHdpbGwgYmUgcGlja2VkIHVwIGJ5IHdhbGtpbmcgb3ZlciB0aGVtIGFuZCBhcyBzdWNoIHRoZXJlIHdpbGwgbmVlZCB0byBiZSBhbiBhZGRJdGVtIGZ1bmN0aW9uXG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgIHRoaXMueCA9IHg7XG4gICAgICB0aGlzLnkgPSB5O1xuICAgICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgICB0aGlzLnNwZWVkID0gMjU2O1xuICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICAgIHRoaXMubG9hZERhbWFnZVRha2VuU291bmQoJ0F1ZGlvL0RhbWFnZVRha2VuLm1wMycpO1xuICAgICAgbGV0IHN0YXJ0X3Bpc3RvbCA9IG5ldyBQaXN0b2woKTtcbiAgICAgIGxldCBzdGFydF9zbmlwZXIgPSBuZXcgU25pcGVyKCk7XG4gICAgICBsZXQgc3RhcnRfcmlmbGUgPSBuZXcgQXNzYXVsdFJpZmxlKCk7XG4gICAgICBsZXQgc3RhcnRfc2hvdGd1biA9IG5ldyBTaG90Z3VuKCk7XG4gICAgICB0aGlzLmludmVudG9yeSA9IFtzdGFydF9waXN0b2xdO1xuICAgICAgdGhpcy5hY3RpdmVfaW5kZXggPSAwO1xuICB9XG5cbiAgICBpc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdChlbnZpcm9ubWVudE9iamVjdHMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChVdGlsLmlzQ29sbGlzaW9uKGVudmlyb25tZW50T2JqZWN0c1tpXSwgdGhpcykgJiYgZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzQmxvY2tpbmcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgbG9hZEltYWdlKCkge1xuICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XG4gICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xuICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XG4gICAgICB9O1xuICAgICAgdGhpcy5pbWFnZS5zcmMgPSBcIkdyYXBoaWNzL1BsYXllci5wbmdcIjtcbiAgfVxuXG4gIGxvYWREYW1hZ2VUYWtlblNvdW5kKHVybCkge1xuICAgICAgdGhpcy5pc1NvdW5kMUxvYWRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5kYW1hZ2VUYWtlblNvdW5kID0gbmV3IEF1ZGlvKCk7XG4gICAgICB0aGlzLmRhbWFnZVRha2VuU291bmQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNTb3VuZDFMb2FkZWQgPSB0cnVlO1xuICAgICAgfTtcbiAgICAgIHRoaXMuZGFtYWdlVGFrZW5Tb3VuZC5zcmMgPSB1cmw7XG4gIH1cblxuICAgIGRyYXcoY3R4LCBjYW1lcmEsIG1vdXNlKSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC50cmFuc2xhdGUoKHRoaXMueCt0aGlzLndpZHRoLzIpIC0gY2FtZXJhLngsICh0aGlzLnkrdGhpcy5oZWlnaHQvMikgLSBjYW1lcmEueSk7XG4gICAgICAgIGxldCBhbmdsZSA9IE1hdGguYXRhbjIobW91c2VbMV0gLSAodGhpcy55K3RoaXMuaGVpZ2h0LzItY2FtZXJhLnkpLCBtb3VzZVswXSAtICh0aGlzLngrdGhpcy53aWR0aC8yLWNhbWVyYS54KSk7XG4gICAgICAgIGN0eC5yb3RhdGUoYW5nbGUrKE1hdGguUEkvMikpO1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDAtdGhpcy53aWR0aC8yLCAwLXRoaXMuaGVpZ2h0LzIpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiLypcclxuICBTb3VyY2VzOlxyXG4gIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvR2FtZXMvVGVjaG5pcXVlcy8yRF9jb2xsaXNpb25fZGV0ZWN0aW9uXHJcbiAgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDk1OTk3NS9nZW5lcmF0ZS1yYW5kb20tbnVtYmVyLWJldHdlZW4tdHdvLW51bWJlcnMtaW4tamF2YXNjcmlwdFxyXG4qL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBVdGlsIGNsYXNzIGNvbnRhaW5zIHZhcmlvdXMgdXRpbGl0eSBmdW5jdGlvbnMuXHJcbiAqL1xyXG5jbGFzcyBVdGlsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBpc0NvbGxpc2lvbiBtZXRob2QgY2hlY2tzIGlmIHRoZXJlIGlzIGEgY29sbGlzaW9uIGJldHdlZW4gdGhlIHR3byBpbnB1dHRlZCByZWN0YW5nbGVzLiBUaGlzIGFsZ29yaXRobSBvbmx5XHJcbiAgICAgKiB3b3JrcyB3aXRoIGF4aXMtYWxpZ25lZCByZWN0YW5nbGVzLlxyXG4gICAgICogQHBhcmFtIHJlY3RhbmdsZTEgVGhlIGZpcnN0IHJlY3RhbmdsZS5cclxuICAgICAqIEBwYXJhbSByZWN0YW5nbGUyIFRoZSBzZWNvbmQgcmVjdGFuZ2xlLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgdGhlcmUgZXhpc3RzIGEgY29sbGlzaW9uIGJldHdlZW4gdGhlIHR3byBpbnB1dHRlZCByZWN0YW5nbGVzLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNDb2xsaXNpb24ocmVjdGFuZ2xlMSwgcmVjdGFuZ2xlMikge1xyXG4gICAgICAgIGlmKHJlY3RhbmdsZTEueCA8IHJlY3RhbmdsZTIueCArIHJlY3RhbmdsZTIud2lkdGggJiZcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMS54ICsgcmVjdGFuZ2xlMS53aWR0aCA+IHJlY3RhbmdsZTIueCAmJlxyXG4gICAgICAgICAgICByZWN0YW5nbGUxLnkgPCByZWN0YW5nbGUyLnkgKyByZWN0YW5nbGUyLmhlaWdodCAmJlxyXG4gICAgICAgICAgICByZWN0YW5nbGUxLnkgKyByZWN0YW5nbGUxLmhlaWdodCA+IHJlY3RhbmdsZTIueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyBpZiB0aGVyZSBhcmUgYW55IGNvbGxpc2lvbnMgYmV0d2VlbiB0aGUgdHdvIGFycmF5cy4gVGhpcyBhbGdvcml0aG0gb25seSB3b3JrcyB3aXRoXHJcbiAgICAgKiBheGlzLWFsaWduZWQgcmVjdGFuZ2xlcy5cclxuICAgICAqIEBwYXJhbSBhcnJheTEgQW4gYXJyYXkgb2YgcmVjdGFuZ2xlcy5cclxuICAgICAqIEBwYXJhbSBhcnJheTIgQW4gYXJyYXkgb2YgcmVjdGFuZ2xlcy5cclxuICAgICAqIEByZXR1cm5zIHtpbnRlZ2VyfSAtMSBpZiB0aGVyZSBhcmUgbm8gY29sbGlzaW9ucyBvciB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGFycmF5IGlmIHRoZXJlIGlzLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXJlQW55Q29sbGlzaW9ucyhhcnJheTEsIGFycmF5Mikge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcnJheTEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGFycmF5Mi5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc0NvbGxpc2lvbihhcnJheTFbaV0sIGFycmF5MltqXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhcmVBbnlDb2xsaXNpb25zSW5TYW1lQXJyYXkoYXJyYXkpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGFycmF5Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihpICE9PSBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pc0NvbGxpc2lvbihhcnJheVtpXSwgYXJyYXlbal0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYSByYW5kb20gbnVtYmVyIGluIHRoZSBnaXZlbiBpbnRlcnZhbC5cclxuICAgICAqIEBwYXJhbSBmcm9tXHJcbiAgICAgKiBAcGFyYW0gdG9cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByYW5kb21JbnRGcm9tSW50ZXJ2YWwoZnJvbSwgdG8pIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRvIC0gZnJvbSArIDEpICsgZnJvbSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXRpbDsiLCJpbXBvcnQgV2VhcG9uIGZyb20gJy4vV2VhcG9uLmpzJztcclxuXHJcbmNsYXNzIEFzc2F1bHRSaWZsZSBleHRlbmRzIFdlYXBvbntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoNSwgMzAsIC4xKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIkFzc2F1bHQgUmlmbGVcIjtcclxuICAgICAgICBzdXBlci5sb2FkU2hvb3RTb3VuZCgnQXVkaW8vUmlmbGVTaG90Lm1wMycpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEFzc2F1bHRSaWZsZTtcclxuIiwiaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xuXG5jbGFzcyBCdWxsZXR7XG4gICAgY29uc3RydWN0b3IodmVsb2NpdHksIGRhbWFnZSwgeCwgeSwgZGVzdFgsIGRlc3RZLCBwZW5ldHJhdGVzKSB7XG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2ZWxvY2l0eTtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuZGVzdFggPSBkZXN0WDtcbiAgICAgICAgdGhpcy5kZXN0WSA9IGRlc3RZO1xuICAgICAgICB0aGlzLmxpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzUGVuZXRyYXRpbmcgPSBwZW5ldHJhdGVzO1xuICAgICAgICBsZXQgZGlmZlggPSB0aGlzLmRlc3RYIC0gdGhpcy54O1xuICAgICAgICBsZXQgZGlmZlkgPSB0aGlzLmRlc3RZIC0gdGhpcy55O1xuICAgICAgICB0aGlzLmxpdmVUaW1lID0gMDtcbiAgICAgICAgLy9UaGlzIGxvZ2ljIGZpbmRzIGEgY29lZmZpY2llbnQgZm9yIFggYW5kIFkgdGhhdCBjYW4gYmUgYXBwbGllZFxuICAgICAgICAvL3RvIHRoZSBtb3ZlIGZ1bmN0aW9uIGluIG9yZGVyIHRvIG1vdmUgdGhlIGJ1bGxldCBpbiBhIHN0cmFpZ2h0IGxpbmVcbiAgICAgICAgLy9kaXJlY3RseSB0byBpdHMgZGVzdGluYXRpb24uXG4gICAgICAgIGlmKE1hdGguYWJzKGRpZmZYKSA+IE1hdGguYWJzKGRpZmZZKSkge1xuICAgICAgICAgICAgdGhpcy5jb2VmZlggPSBkaWZmWCAvIE1hdGguYWJzKGRpZmZYKTtcbiAgICAgICAgICAgIHRoaXMuY29lZmZZID0gZGlmZlkgLyBNYXRoLmFicyhkaWZmWCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvZWZmWSA9IGRpZmZZIC8gTWF0aC5hYnMoZGlmZlkpO1xuICAgICAgICAgICAgdGhpcy5jb2VmZlggPSBkaWZmWCAvIE1hdGguYWJzKGRpZmZZKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsb2FkSW1hZ2UodXJsKSB7XG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB1cmw7XG4gICAgfVxuICAgIC8vTW92ZXMgdGhlIGJ1bGxldCBmcm9tIGl0cyBzdGFydGluZyBwb2ludCAod2hpY2ggd2lsbCBiZSB0aGUgcGxheWVyJ3MgbG9jYXRpb24pXG4gICAgLy90byBpdHMgZGVzdGluYXRpb24gKHdoaWNoIHdpbGwgYmUgdGhlIGN1cnNvciBsb2NhdGlvbiB3aGVuIHRoZSBidWxsZXQgaXMgY3JlYXRlZCkuXG4gICAgLy9FYWNoIHRpbWUgbW92ZSBpcyBjYWxsZWQgaXQgaXMgY2hlY2tlZCBpZiB0aGUgYnVsbGV0IGhpdHMgYW55dGhpbmcsIGlmIGl0IGRvZXMgdGhlXG4gICAgLy9oaXRTb21ldGhpbmcgbWV0aG9kIHdpbGwgY2FsbCBhIGRhbWFnZSBmdW5jdGlvbiBhbmQgdGhlIGRhbWFnZSB3aWxsIGJlIGFwcGxpZWQsIHNvXG4gICAgLy90aGlzIGZ1bmN0aW9uIHNldHMgdGhpcy5saXZlID0gZmFsc2UgbWVhbmluZyB0aGUgYnVsbGV0IGlzIG5vIGxvbmdlciBsaXZlLlxuICAgIC8vSWYgdGhlIGJ1bGxldCBpc1BlbmV0cmF0aW5nIHRoYXQgbWVhbnMgaXQgd2lsbCBub3QgYmUgc2V0IHRvICdkZWFkJyB1cG9uIGEgY29sbGlzaW9uIHdpdGggc29tZXRoaW5nXG4gICAgLy9UaGlzIGFsbG93cyBwZW5ldHJhdGluZyBidWxsZXRzIHRvIHRyYXZlbCB0aHJvdWdoIG11bHRpcGxlIHRhcmdldHMgYW5kIHRocm91Z2ggd29ybGQgb2JqZWN0cy5cbiAgICBtb3ZlKG1vZGlmaWVyLCBlbnZpcm9ubWVudE9iamVjdHMsIGVuZW1pZXMpe1xuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcip0aGlzLmNvZWZmWDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXIqdGhpcy5jb2VmZlk7XG4gICAgICAgIHRoaXMubGl2ZVRpbWUgKz0gbW9kaWZpZXI7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGl2ZVRpbWUpO1xuICAgICAgICBpZih0aGlzLmhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIGVuZW1pZXMpICYmIHRoaXMuaXNQZW5ldHJhdGluZyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy54IDwgMCB8fCB0aGlzLnggPiAxMDAwMCB8fCB0aGlzLnkgPCAwIHx8IHRoaXMueSA+IDU2MjUpIHtcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMubGl2ZVRpbWUgPiAuNSAmJiB0aGlzLmlzUGVuZXRyYXRpbmcgPT0gZmFsc2Upe1xuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9DaGVja3MgaWYgdGhlIGJ1bGxldCBoaXQgYW55IG9mIG91ciBvYmplY3RzIHRoYXQgY2FuIGJlIGhpdCwgaWYgc28gdGhhdCBvYmplY3QgbG9zZXMgSFBcbiAgICAvL2FuZCB0aGUgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHRvIGluZGljYXRlIHRoYXQgdGhlIG9iamVjdCB3YXMgaGl0LiBJZiBub3QsIGZhbHNlIGlzIHJldHVybmVkXG4gICAgLy9hbmQgbm90aGluZyBpcyBkb25lLlxuICAgIGRhbWFnZUVuZW15KGVuZW15T2JqZWN0KSB7XG4gICAgICAgIGVuZW15T2JqZWN0LmhlYWx0aCAtPSB0aGlzLmRhbWFnZTtcbiAgICB9XG5cbiAgICBkYW1hZ2VFbnZpcm9ubWVudChlbnZpcm9ubWVudE9iamVjdCl7XG4gICAgICAgIGVudmlyb25tZW50T2JqZWN0LmhlYWx0aCAtPSB0aGlzLmRhbWFnZTtcbiAgICB9XG4gICAgLy9DaGVja3MgaWYgd2UgaGl0IGFuIGVudmlyb25tZW50IG9iamVjdCB0aGVuIGNoZWNrcyBpZiB3ZSBoaXQgYW4gZW5lbXkuIGluIGVpdGhlciBjYXNlIGl0IGNhbGxzIHRoZVxuICAgIC8vY29ycmVzcG9uZGluZyBkYW1hZ2UgZnVuY3Rpb24gYW5kIHRoZW4gcmV0dXJucyB0cnVlIHRvIGluZGljYXRlIHRoYXQgc29tZXRoaW5nIHdhcyBoaXQsIHdoaWNoIHRlbGxzIG1vdmUgdG8gc2V0IHRoZVxuICAgIC8vYnVsbGV0J3MgbGl2ZSB2YWx1ZSBhY2NvcmRpbmdseVxuICAgIGhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIGVuZW1pZXMpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbnZpcm9ubWVudE9iamVjdHNbaV0pICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VFbnZpcm9ubWVudChlbnZpcm9ubWVudE9iamVjdHNbaV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbmVtaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIGVuZW1pZXNbaV0pKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZUVuZW15KGVuZW1pZXNbaV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1bGxldDtcbiIsImltcG9ydCBCdWxsZXQgZnJvbSAnLi9CdWxsZXQuanMnO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vL1RoZSA1MCBjYWxpYmVyIHdpbGwgcGVuZXRyYXRlIHRocm91Z2ggb2JqZWN0cyBhbmQgb25seSBzdG9wcyBiZWluZyBsaXZlXHJcbi8vb25jZSBpdCBleGl0cyB0aGUgY2FudmFzLCBzbyBpdHMgZGFtYWdlIGlzIHNldCB0byBhIHNtYWxsIG51bWJlciBhcyBpdCBkZWFsc1xyXG4vL2RhbWFnZSBkdXJpbmcgZWFjaCBmcmFtZSBhcyBpdCBwZW5ldHJhdGVzIHRoZSBvYmplY3Qgb3IgZW5lbXlcclxuY2xhc3MgQnVsbGV0MTJHYXVnZSBleHRlbmRzIEJ1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBkZXN0WCwgZGVzdFkpIHtcclxuICAgICAgICBzdXBlcigxMDAwLCA4LCB4LCB5LCBkZXN0WCwgZGVzdFksIGZhbHNlKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9idWxsZXQzLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQxMkdhdWdlO1xyXG4iLCJpbXBvcnQgQnVsbGV0IGZyb20gJy4vQnVsbGV0LmpzJztcclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG5cclxuLy9UaGUgNTAgY2FsaWJlciB3aWxsIHBlbmV0cmF0ZSB0aHJvdWdoIG9iamVjdHMgYW5kIG9ubHkgc3RvcHMgYmVpbmcgbGl2ZVxyXG4vL29uY2UgaXQgZXhpdHMgdGhlIGNhbnZhcywgc28gaXRzIGRhbWFnZSBpcyBzZXQgdG8gYSBzbWFsbCBudW1iZXIgYXMgaXQgZGVhbHNcclxuLy9kYW1hZ2UgZHVyaW5nIGVhY2ggZnJhbWUgYXMgaXQgcGVuZXRyYXRlcyB0aGUgb2JqZWN0IG9yIGVuZW15XHJcbmNsYXNzIEJ1bGxldDUwY2FsIGV4dGVuZHMgQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGRlc3RYLCBkZXN0WSkge1xyXG4gICAgICAgIHN1cGVyKDI1MDAsIDcsIHgsIHksIGRlc3RYLCBkZXN0WSwgdHJ1ZSk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvYnVsbGV0My5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1bGxldDUwY2FsO1xyXG4iLCJpbXBvcnQgQnVsbGV0IGZyb20gJy4vQnVsbGV0LmpzJztcclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG5cclxuLy9UaGUgNTAgY2FsaWJlciB3aWxsIHBlbmV0cmF0ZSB0aHJvdWdoIG9iamVjdHMgYW5kIG9ubHkgc3RvcHMgYmVpbmcgbGl2ZVxyXG4vL29uY2UgaXQgZXhpdHMgdGhlIGNhbnZhcywgc28gaXRzIGRhbWFnZSBpcyBzZXQgdG8gYSBzbWFsbCBudW1iZXIgYXMgaXQgZGVhbHNcclxuLy9kYW1hZ2UgZHVyaW5nIGVhY2ggZnJhbWUgYXMgaXQgcGVuZXRyYXRlcyB0aGUgb2JqZWN0IG9yIGVuZW15XHJcbmNsYXNzIEJ1bGxldDU1NiBleHRlbmRzIEJ1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBkZXN0WCwgZGVzdFkpIHtcclxuICAgICAgICBzdXBlcigyMDAwLCAxMiwgeCwgeSwgZGVzdFgsIGRlc3RZLCBmYWxzZSk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvYnVsbGV0My5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQnVsbGV0NTU2O1xyXG4iLCJpbXBvcnQgQnVsbGV0IGZyb20gJy4vQnVsbGV0LmpzJztcclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG4vL3RoZSA5bW0gYnVsbGV0IGlzIGEgc2ltcGxlIHBpc3RvbCBidWxsZXQgdGhhdCB3aWxsIGJlIGluIHRoZVxyXG4vL3VzZXIncyBzdGFydGluZyB3ZWFwb24uIGl0IGRvZXMgbWluaW1hbCBkYW1hZ2UgYW5kIG1vdmVzIGF0IGEgc2xvdyBzcGVlZC5cclxuLy90aGUgdmFsdWUgb2YgaXNQZW5ldHJhdGluZyBpcyBzZXQgdG8gZmFsc2UgdG8gaW5kaWNhdGUgdGhlIGJ1bGxldCBzaG91bGRcclxuLy9ub3QgYmUgbGl2ZSBhZnRlciBpdCBjb2xsaWRlcyB3aXRoIHNvbWV0aGluZyBhbmQgZG9lcyBpdHMgZGFtYWdlLlxyXG4vL2luIHRoZSBmdXR1cmUgdGhlIGJ1bGxldCB3aWxsIGhhdmUgYSBtYXhpbXVtIHJhbmdlL2xpdmUgdGltZSB0b1xyXG4vL2xpbWl0IGl0cyB1c2VmdWxuZXNzIG1vcmUuXHJcbmNsYXNzIEJ1bGxldDltbSBleHRlbmRzIEJ1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBkZXN0WCwgZGVzdFkpIHtcclxuICAgICAgICBzdXBlcigxMDAwLCAxMCwgeCwgeSwgZGVzdFgsIGRlc3RZLCBmYWxzZSk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvYnVsbGV0My5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1bGxldDltbTtcclxuIiwiaW1wb3J0IEJ1bGxldCBmcm9tICcuL0J1bGxldC5qcyc7XHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbi8vVGhlIDUwIGNhbGliZXIgd2lsbCBwZW5ldHJhdGUgdGhyb3VnaCBvYmplY3RzIGFuZCBvbmx5IHN0b3BzIGJlaW5nIGxpdmVcclxuLy9vbmNlIGl0IGV4aXRzIHRoZSBjYW52YXMsIHNvIGl0cyBkYW1hZ2UgaXMgc2V0IHRvIGEgc21hbGwgbnVtYmVyIGFzIGl0IGRlYWxzXHJcbi8vZGFtYWdlIGR1cmluZyBlYWNoIGZyYW1lIGFzIGl0IHBlbmV0cmF0ZXMgdGhlIG9iamVjdCBvciBlbmVteVxyXG5jbGFzcyBCdWxsZXRGaXJlIGV4dGVuZHMgQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGRlc3RYLCBkZXN0WSkge1xyXG4gICAgICAgIHN1cGVyKDUwMCwgMiwgeCwgeSwgZGVzdFgsIGRlc3RZLCBmYWxzZSk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvRmlyZS5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQnVsbGV0RmlyZTtcclxuIiwiaW1wb3J0IFdlYXBvbiBmcm9tICcuL1dlYXBvbi5qcyc7XHJcblxyXG5jbGFzcyBGbGFtZXRocm93ZXIgZXh0ZW5kcyBXZWFwb257XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKDgsIDMyLCAuMDUpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiRmxhbWV0aHJvd2VyXCI7XHJcbiAgICAgICAgc3VwZXIubG9hZFNob290U291bmQoJ0F1ZGlvL0ZsYW1ldGhyb3dlclNvdW5kLm1wMycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGbGFtZXRocm93ZXI7XHJcbiIsIi8vVGhlIHNuaXBlciBpcyBvbmx5IGN1cnJlbnRseSB1c2VkIHRvIGRldGVybWluZSB0aGUgdHlwZSBvZiBidWxsZXQgdG8gYmUgZ2VuZXJhdGVkXG4vL2luIG1haW4uanMnIGV2ZW50IGhhbmRsZXIgZm9yIGNsaWNrc1xuLy9JbiB0aGUgZnV0dXJlIGl0IHdpbGwgY29udHJvbCBmaXJlIHJhdGUgYW5kIHRoZSBhbW1vIGNhcGFjaXR5LlxuaW1wb3J0IFdlYXBvbiBmcm9tICcuL1dlYXBvbi5qcyc7XG5cbmNsYXNzIFBpc3RvbCBleHRlbmRzIFdlYXBvbntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigxNSwgOTAsIC40KTtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJQaXN0b2xcIjtcbiAgICAgICAgc3VwZXIubG9hZFNob290U291bmQoJ0F1ZGlvL1Bpc3RvbFNob3QubXAzJyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQaXN0b2w7XG4iLCJpbXBvcnQgV2VhcG9uIGZyb20gJy4vV2VhcG9uLmpzJztcclxuXHJcbmNsYXNzIFNob3RndW4gZXh0ZW5kcyBXZWFwb257XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKDgsIDMyLCAxKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlNob3RndW5cIjtcclxuICAgICAgICBzdXBlci5sb2FkU2hvb3RTb3VuZCgnQXVkaW8vU2hvdGd1blNob3QubXAzJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNob3RndW47XHJcbiIsIi8vVGhlIHNuaXBlciBpcyBvbmx5IGN1cnJlbnRseSB1c2VkIHRvIGRldGVybWluZSB0aGUgdHlwZSBvZiBidWxsZXQgdG8gYmUgZ2VuZXJhdGVkXHJcbi8vaW4gbWFpbi5qcycgZXZlbnQgaGFuZGxlciBmb3IgY2xpY2tzXHJcbi8vSW4gdGhlIGZ1dHVyZSBpdCB3aWxsIGNvbnRyb2wgZmlyZSByYXRlIGFuZCB0aGUgYW1tbyBjYXBhY2l0eS5cclxuaW1wb3J0IFdlYXBvbiBmcm9tICcuL1dlYXBvbi5qcyc7XHJcblxyXG5jbGFzcyBTbmlwZXIgZXh0ZW5kcyBXZWFwb257XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKDUsIDMwLCAxLjc1KTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlNuaXBlclwiO1xyXG4gICAgICAgIHN1cGVyLmxvYWRTaG9vdFNvdW5kKCdBdWRpby9TbmlwZXJTaG90Lm1wMycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTbmlwZXI7XHJcbiIsImltcG9ydCBXZWFwb24gZnJvbSAnLi9XZWFwb24uanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBTcGlrZVRyYXAgY2xhc3MgZXh0ZW5kcyB0aGUgVHJhcCBjbGFzcy5cclxuICovXHJcbmNsYXNzIFNwaWtlVHJhcCBleHRlbmRzIFdlYXBvbiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgU3Bpa2VUcmFwLiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgV2VhcG9uIGNsYXNzZXMgY29uc3RydWN0b3IuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMubmFtZSA9ICdTcGlrZSBUcmFwJztcclxuICAgICAgICBzdXBlci5sb2FkU2hvb3RTb3VuZCgnQXVkaW8vU3Bpa2VUcmFwLm1wMycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcGlrZVRyYXA7XHJcbiIsImltcG9ydCBXZWFwb24gZnJvbSAnLi9XZWFwb24uanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBUYXJUcmFwIGNsYXNzIGV4dGVuZHMgdGhlIFdlYXBvbiBjbGFzcy5cclxuICovXHJcbmNsYXNzIFRhclRyYXAgZXh0ZW5kcyBXZWFwb24ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFRhclRyYXAuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBXZWFwb24gY2xhc3NlcyBjb25zdHJ1Y3Rvci5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gJ1RhciBUcmFwJztcclxuICAgICAgICBzdXBlci5sb2FkU2hvb3RTb3VuZCgnQXVkaW8vVGFyVHJhcC5tcDMnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFyVHJhcDtcclxuIiwiLy9jbGlwU2l6ZSBhbmQgYW1tbyB3aWxsIGJlIHVzZWQgYXMgZXhwZWN0ZWQgbmV4dCB3ZWVrXG4vL2F1dG9tYXRpYyB3aWxsIGJlIHVzZWQgYXMgYSBib29sZWFuIGZvciB3aGV0aGVyIG9yIG5vdFxuLy9ob2xkaW5nIGNsaWNrIHNob3VsZCBjb250aW51b3VzbHkgZmlyZS5cbi8vVGhlIG5hbWUgZmllbGQgaXMgdXNlZCBmb3IgdGhlIEhVRCBkaXNwbGF5aW5nIHRoZSBhY3RpdmUgd2VhcG9uLlxuY2xhc3MgV2VhcG9uIHtcblxuICAgIGNvbnN0cnVjdG9yKGNsaXBTaXplLCBtYXhBbW1vLCBtYXhDb29sRG93bikge1xuICAgICAgICB0aGlzLmNsaXBTaXplID0gY2xpcFNpemU7XG4gICAgICAgIHRoaXMubWF4QW1tbyA9IG1heEFtbW87XG4gICAgICAgIHRoaXMubmFtZSA9ICcnO1xuICAgICAgICB0aGlzLmNvb2xkb3duID0gMDtcbiAgICAgICAgdGhpcy5tYXhDb29sRG93biA9IG1heENvb2xEb3duO1xuICAgIH1cbiAgICBsb2FkU2hvb3RTb3VuZCh1cmwpIHtcbiAgICAgICAgdGhpcy5pc1NvdW5kTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc291bmQgPSBuZXcgQXVkaW8oKTtcbiAgICAgICAgdGhpcy5zb3VuZC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzU291bmRMb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNvdW5kLnNyYyA9IHVybDtcbiAgICB9XG4gICAgYWRkQ29vbGRvd24oKXtcbiAgICAgIHRoaXMuY29vbGRvd24gKz0gdGhpcy5tYXhDb29sRG93bjtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2VhcG9uO1xuIl19
