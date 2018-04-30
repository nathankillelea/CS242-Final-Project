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
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Enemy2 = require("./Enemy.js");

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
        _get(FinalBoss.prototype.__proto__ || Object.getPrototypeOf(FinalBoss.prototype), "loadImage", _this).call(_this, "Graphics/FinalBoss.png");
        return _this;
    }

    /**
     * This function starts the charge attack by setting velocity to 1024, setting damage to 10, and setting isChargeAttack
     * to true.
     */


    _createClass(FinalBoss, [{
        key: "startChargeAttack",
        value: function startChargeAttack() {
            this.velocity = 1024;
            this.damage = 10;
            this.isChargeAttack = true;
        }

        /**
         * This function ends the charge attack by resetting velocity and damage to their default values.
         */

    }, {
        key: "endChargeAttack",
        value: function endChargeAttack() {
            this.velocity = 128;
            this.damage = 50;
            this.isChargeAttack = false;
        }

        /**
         * This function starts rapid fire by setting the shootCooldownRate to 25 and setting isRapidFire to true.
         */

    }, {
        key: "startRapidFire",
        value: function startRapidFire() {
            this.shootCooldownRate = 25;
            this.isRapidFire = true;
        }

        /**
         * This function ends the rapid fire by sets rapid fire back to its default value.
         */

    }, {
        key: "endRapidFire",
        value: function endRapidFire() {
            this.shootCooldownRate = 1;
            this.isRapidFire = false;
        }
    }]);

    return FinalBoss;
}(_Enemy3.default);

exports.default = FinalBoss;

},{"./Enemy.js":2}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Enemy2 = require("./Enemy.js");

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

    _get(LightEnemy.prototype.__proto__ || Object.getPrototypeOf(LightEnemy.prototype), "loadImage", _this).call(_this, "Graphics/LightEnemy.png");
    return _this;
  }

  return LightEnemy;
}(_Enemy3.default);

exports.default = LightEnemy;

},{"./Enemy.js":2}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Enemy2 = require("./Enemy.js");

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
    _get(MiniBoss.prototype.__proto__ || Object.getPrototypeOf(MiniBoss.prototype), "loadImage", _this).call(_this, "Graphics/MiniBoss.png");
    return _this;
  }

  return MiniBoss;
}(_Enemy3.default);

exports.default = MiniBoss;

},{"./Enemy.js":2}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Enemy2 = require("./Enemy.js");

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
   * the inputted x and y, the velocity set to 512, the health set to 1, the damage set to 99, and the pointsOnKill
   * set to 500.
   * @param x The x position of the ParasiteEnemy.
   * @param y The y position of the ParasiteEnemy.
   */
  function ParasiteEnemy(x, y) {
    _classCallCheck(this, ParasiteEnemy);

    var _this = _possibleConstructorReturn(this, (ParasiteEnemy.__proto__ || Object.getPrototypeOf(ParasiteEnemy)).call(this, x, y, 512, 1, 99, 500));

    _get(ParasiteEnemy.prototype.__proto__ || Object.getPrototypeOf(ParasiteEnemy.prototype), "loadImage", _this).call(_this, "Graphics/ParasiteEnemy.png");
    return _this;
  }

  return ParasiteEnemy;
}(_Enemy3.default);

exports.default = ParasiteEnemy;

},{"./Enemy.js":2}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Enemy2 = require("./Enemy.js");

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
    _get(ProjectileEnemy.prototype.__proto__ || Object.getPrototypeOf(ProjectileEnemy.prototype), "loadImage", _this).call(_this, "Graphics/ProjectileEnemy.png");
    return _this;
  }

  return ProjectileEnemy;
}(_Enemy3.default);

exports.default = ProjectileEnemy;

},{"./Enemy.js":2}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Enemy2 = require("./Enemy.js");

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

    _get(RegularEnemy.prototype.__proto__ || Object.getPrototypeOf(RegularEnemy.prototype), "loadImage", _this).call(_this, "Graphics/RegularEnemy.png");
    return _this;
  }

  return RegularEnemy;
}(_Enemy3.default);

exports.default = RegularEnemy;

},{"./Enemy.js":2}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Enemy2 = require("./Enemy.js");

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

    _get(TankEnemy.prototype.__proto__ || Object.getPrototypeOf(TankEnemy.prototype), "loadImage", _this).call(_this, "Graphics/TankEnemy.png");
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

        /**
         * The load sound function loads the environment objects breaking sound.
         * @param url The url that should be loaded.
         */

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

  /**
   * The constructor initializes the fields of the ground spike trap. A call is made to the GroundWeapons constructor
   * with a SpikeTrap object set as the weapon.
   * @param x The x position of the ground spike trap.
   * @param y The y position of the ground spike trap.
   */
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

  /**
   * The constructor initializes the fields of the ground tar trap. A call is made to the GroundWeapons constructor
   * with a TarTrap object set as the weapon.
   * @param x The x position of the ground tar trap.
   * @param y The y position of the ground tar trap.
   */
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
 * The SpikeTrap class extends the Weapon class.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDdXJzb3IuanMiLCJFbmVtaWVzL0VuZW15LmpzIiwiRW5lbWllcy9FbmVteVByb2plY3RpbGUuanMiLCJFbmVtaWVzL0ZpbmFsQm9zcy5qcyIsIkVuZW1pZXMvTGlnaHRFbmVteS5qcyIsIkVuZW1pZXMvTWluaUJvc3MuanMiLCJFbmVtaWVzL1BhcmFzaXRlRW5lbXkuanMiLCJFbmVtaWVzL1Byb2plY3RpbGVFbmVteS5qcyIsIkVuZW1pZXMvUmVndWxhckVuZW15LmpzIiwiRW5lbWllcy9UYW5rRW5lbXkuanMiLCJFbnZpcm9ubWVudE9iamVjdHMvQnVzaC5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9DcmF0ZS5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9FbnZpcm9ubWVudE9iamVjdC5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9Sb2NrLmpzIiwiR2FtZS9Db250cm9sbGVyLmpzIiwiR2FtZS9HYW1lLmpzIiwiR2FtZS9Xb3JsZC5qcyIsIk1haW4uanMiLCJQaWNrVXBzL0dyb3VuZEFzc2F1bHRSaWZsZS5qcyIsIlBpY2tVcHMvR3JvdW5kRmxhbWV0aHJvd2VyLmpzIiwiUGlja1Vwcy9Hcm91bmRTaG90Z3VuLmpzIiwiUGlja1Vwcy9Hcm91bmRTbmlwZXIuanMiLCJQaWNrVXBzL0dyb3VuZFNwaWtlVHJhcC5qcyIsIlBpY2tVcHMvR3JvdW5kVGFyVHJhcC5qcyIsIlBpY2tVcHMvR3JvdW5kV2VhcG9uLmpzIiwiUGlja1Vwcy9IZWFsdGhwYWNrLmpzIiwiUGxhY2VkVHJhcHMvUGxhY2VkVHJhcC5qcyIsIlBsYWNlZFRyYXBzL1NwaWtlVHJhcFBsYWNlZC5qcyIsIlBsYWNlZFRyYXBzL1RhclRyYXBQbGFjZWQuanMiLCJQbGF5ZXJzL0NhbWVyYS5qcyIsIlBsYXllcnMvUGxheWVyLmpzIiwiVXRpbGl0aWVzL1V0aWwuanMiLCJXZWFwb25zL0Fzc2F1bHRSaWZsZS5qcyIsIldlYXBvbnMvQnVsbGV0LmpzIiwiV2VhcG9ucy9CdWxsZXQxMkdhdWdlLmpzIiwiV2VhcG9ucy9CdWxsZXQ1MGNhbC5qcyIsIldlYXBvbnMvQnVsbGV0NTU2LmpzIiwiV2VhcG9ucy9CdWxsZXQ5bW0uanMiLCJXZWFwb25zL0J1bGxldEZpcmUuanMiLCJXZWFwb25zL0ZsYW1ldGhyb3dlci5qcyIsIldlYXBvbnMvUGlzdG9sLmpzIiwiV2VhcG9ucy9TaG90Z3VuLmpzIiwiV2VhcG9ucy9TbmlwZXIuanMiLCJXZWFwb25zL1NwaWtlVHJhcC5qcyIsIldlYXBvbnMvVGFyVHJhcC5qcyIsIldlYXBvbnMvV2VhcG9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtJQUNNLE07QUFDRixzQkFBYztBQUFBOztBQUNWLGFBQUssU0FBTDtBQUNIOzs7O29DQUVXO0FBQUE7O0FBQ1IsaUJBQUssYUFBTCxHQUFxQixLQUFyQjtBQUNBLGlCQUFLLEtBQUwsR0FBYSxJQUFJLEtBQUosRUFBYjtBQUNBLGlCQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLFlBQU07QUFDdEIsc0JBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNILGFBRkQ7QUFHQSxpQkFBSyxLQUFMLENBQVcsR0FBWCxHQUFpQix3QkFBakI7QUFDSDs7Ozs7O2tCQUVVLE07Ozs7Ozs7OztxakJDakJmOzs7Ozs7QUFNQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7OztJQUdNLEs7O0FBRUY7Ozs7Ozs7OztBQVNBLG1CQUFZLENBQVosRUFBZSxDQUFmLEVBQWtCLFFBQWxCLEVBQTRCLE1BQTVCLEVBQW9DLE1BQXBDLEVBQTRDLFlBQTVDLEVBQTBEO0FBQUE7O0FBQ3RELGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxhQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsYUFBSyxLQUFMLEdBQWEsS0FBSyxFQUFMLEdBQVEsQ0FBckI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFk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QUosRUFBYjtBQUNBLGlCQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLFlBQU07QUFDdEIsc0JBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNILGFBRkQ7QUFHQSxpQkFBSyxLQUFMLENBQVcsR0FBWCxHQUFpQixHQUFqQjtBQUNIOzs7c0NBQ1k7QUFDWCxpQkFBSyxRQUFMLElBQWlCLEtBQUssV0FBdEI7QUFDRDs7Ozs7O2tCQUlVLE0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL0p1c3QgYSBwbHVzIGN1cnNvciB0byBiZSByZW5kZXJlZCBhdCB0aGVcclxuLy9jdXJzb3IncyBsb2NhdGlvbiBlYWNoIFVwZGF0ZVxyXG4vL1RoZSBjdXJzb3IgZm9yIHRoZSBlbnRpcmUgSFRNTCBkb2N1bWVudCBpcyB0dXJuZWQgb2ZmIHZpYSBzdHlsaW5nIG9uIHRoZSBkb2N1bWVudC5cclxuY2xhc3MgQ3Vyc29yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEltYWdlKCkge1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gXCJHcmFwaGljcy9jcm9zc2hhaXIucG5nXCI7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQ3Vyc29yO1xyXG4iLCIvKipcclxuICogU291cmNlczpcclxuICogaHR0cHM6Ly9tZWRpdW0uY29tL0B5dXJpYmV0dC9qYXZhc2NyaXB0LWFic3RyYWN0LW1ldGhvZC13aXRoLWVzNi01ZGJlYTRiMDAwMjdcclxuICogaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1JNWRBUnBBUGxOa1xyXG4gKi9cclxuXHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuaW1wb3J0IFNwaWtlVHJhcFBsYWNlZCBmcm9tICcuLi9QbGFjZWRUcmFwcy9TcGlrZVRyYXBQbGFjZWQnO1xyXG5pbXBvcnQgVGFyVHJhcFBsYWNlZCBmcm9tICcuLi9QbGFjZWRUcmFwcy9UYXJUcmFwUGxhY2VkJ1xyXG5cclxuLyoqXHJcbiAqIFRoZSBFbmVteSBjbGFzcyBpcyB0aGUgcGFyZW50IGNsYXNzIGZvciBhbGwgb2YgdGhlIGVuZW1pZXMuXHJcbiAqL1xyXG5jbGFzcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gdmVsb2NpdHkgVGhlIHZlbG9jaXR5IG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSBoZWFsdGggVGhlIGhlYWx0aCBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gZGFtYWdlIFRoZSBkYW1hZ2Ugb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHBvaW50c09uS2lsbCBUaGUgcG9pbnRzIHJld2FyZGVkIGZvciBraWxsaW5nIHRoZSBFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgdmVsb2NpdHksIGhlYWx0aCwgZGFtYWdlLCBwb2ludHNPbktpbGwpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy5hbmdsZSA9IE1hdGguUEkvMjtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdmVsb2NpdHk7XHJcbiAgICAgICAgdGhpcy5oZWFsdGggPSBoZWFsdGg7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgdGhpcy5wb2ludHNPbktpbGwgPSBwb2ludHNPbktpbGw7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tDb29sZG93biA9IDA7XHJcbiAgICAgICAgdGhpcy5pc1Nsb3dlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXR0YWNrRGFtYWdlVGFrZW5Db29sZG93biA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbG9hZEltYWdlIGZ1bmN0aW9uIHRha2VzIGluIGEgdXJsIGFuZCBsb2FkcyBpdCBhcyBhbiBJbWFnZS4gT25jZSB0aGUgaW1hZ2UgaXMgbG9hZGVkLCB0aGlzLmlzSW1hZ2VMb2FkZWQgaXNcclxuICAgICAqIHNldCB0byB0cnVlLiBUaGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgRW5lbXkgYXJlIHNldCB0byB0aGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgaW1hZ2UuXHJcbiAgICAgKiBAcGFyYW0gdXJsIFRoZSB1cmwgdGhhdCBzaG91bGQgYmUgbG9hZGVkLlxyXG4gICAgICovXHJcbiAgICBsb2FkSW1hZ2UodXJsKSB7XHJcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGF0dGFjayBmdW5jdGlvbiB0YWtlcyBpbiBhbiBvYmplY3QgYW5kIHJlbW92ZXMgdGhlIGFtb3VudCBvZiBkYW1hZ2UgdGhlIEVuZW15IGRlYWxzIGZyb20gdGhlaXIgaGVhbHRoLlxyXG4gICAgICogNTAwIGlzIGFkZGVkIHRvIHRoZSBhdHRhY2sgY29vbGRvd24gb2YgdGhlIGVuZW15IGFmdGVyIGFuIGF0dGFjay5cclxuICAgICAqIEBwYXJhbSBvYmplY3QgVGhlIG9iamVjdCB0aGF0IGlzIGJlaW5nIGF0dGFja2VkLlxyXG4gICAgICovXHJcbiAgICBhdHRhY2sob2JqZWN0KSB7XHJcbiAgICAgICAgb2JqZWN0LmhlYWx0aCAtPSB0aGlzLmRhbWFnZTtcclxuICAgICAgICB0aGlzLmF0dGFja0Nvb2xkb3duICs9IDUwMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1vdmVzIHRoZSBlbmVteSB0b3dhcmRzIHRoZSBwbGF5ZXIuXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIFRoZSBwbGF5ZXIgb2JqZWN0IHRvIG1vdmUgdG93YXJkcy5cclxuICAgICAqIEBwYXJhbSBtb2RpZmllciBUaGUgbW9kaWZpZXIgdG8gYmUgbXVsdGlwbGllZCBieSB0aGUgdmVsb2NpdHkuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3RzIEFuIGFycmF5IG9mIGVudmlyb25tZW50IG9iamVjdHMuXHJcbiAgICAgKiBAcGFyYW0gcGxhY2VkVHJhcHMgQW4gYXJyYXkgb2YgcGxhY2VkIHRyYXBzLlxyXG4gICAgICogQHBhcmFtIGNhbWVyYSBUaGUgY2FtZXJhIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgbW92ZShwbGF5ZXIsIG1vZGlmaWVyLCBlbnZpcm9ubWVudE9iamVjdHMsIHBsYWNlZFRyYXBzLCBjYW1lcmEpIHtcclxuICAgICAgICBsZXQgZGlmZlggPSBwbGF5ZXIueCAtIHRoaXMueDtcclxuICAgICAgICBsZXQgZGlmZlkgPSBwbGF5ZXIueSAtIHRoaXMueTtcclxuXHJcbiAgICAgICAgbGV0IGNvZWZmWDtcclxuICAgICAgICBsZXQgY29lZmZZO1xyXG5cclxuICAgICAgICBpZihNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpIHtcclxuICAgICAgICAgICAgY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWCk7XHJcbiAgICAgICAgICAgIGNvZWZmWSA9IGRpZmZZIC8gTWF0aC5hYnMoZGlmZlgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29lZmZZID0gZGlmZlkgLyBNYXRoLmFicyhkaWZmWSk7XHJcbiAgICAgICAgICAgIGNvZWZmWCA9IGRpZmZYIC8gTWF0aC5hYnMoZGlmZlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hbmdsZSA9IE1hdGguYXRhbjIocGxheWVyLnkrcGxheWVyLmhlaWdodC8yLWNhbWVyYS55IC0gKHRoaXMueSArIHRoaXMuaGVpZ2h0LzIgLSBjYW1lcmEueSksIHBsYXllci54K3BsYXllci53aWR0aC8yLWNhbWVyYS54IC0gKHRoaXMueCArIHRoaXMud2lkdGgvMiAtIGNhbWVyYS54KSk7XHJcblxyXG4gICAgICAgIGxldCBvbGRYID0gdGhpcy54O1xyXG4gICAgICAgIGxldCBvbGRZID0gdGhpcy55O1xyXG5cclxuICAgICAgICB0aGlzLmF0dGFja0RhbWFnZVRha2VuQ29vbGRvd24gLT0gbW9kaWZpZXI7XHJcbiAgICAgICAgdGhpcy5pc0NvbGxpc2lvbldpdGhQbGFjZWRUcmFwcyhwbGFjZWRUcmFwcyk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuaXNTbG93ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkvMiptb2RpZmllcipjb2VmZlg7XHJcbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5LzIqbW9kaWZpZXIqY29lZmZZO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXIqY29lZmZYO1xyXG4gICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcipjb2VmZlk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZigodGhpcy54ICsgdGhpcy53aWR0aCA+IDEwMDAwKSB8fCAodGhpcy54IDwgMCkgfHwgKHRoaXMueSArIHRoaXMuaGVpZ2h0ID4gNTYyNSkgfHwgKHRoaXMueSA8IDApIHx8IHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkgIHtcclxuICAgICAgICAgICAgdGhpcy54ID0gb2xkWDtcclxuICAgICAgICAgICAgdGhpcy55ID0gb2xkWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgcGxheWVyKSAmJiB0aGlzLmF0dGFja0Nvb2xkb3duID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVhbHRoIGJlZm9yZSBhdHRhY2tcIiArIHBsYXllci5oZWFsdGgpO1xyXG4gICAgICAgICAgICB0aGlzLmF0dGFjayhwbGF5ZXIpO1xyXG4gICAgICAgICAgICBwbGF5ZXIuZGFtYWdlVGFrZW5Tb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVhbHRoIGFmdGVyIGF0dGFja1wiICsgcGxheWVyLmhlYWx0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgZW5lbXkgZ2l2ZW4geCBhbmQgeS5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIHRvIGJlIHNldC5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIHRvIGJlIHNldC5cclxuICAgICAqL1xyXG4gICAgc2V0UG9zaXRpb24oeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgYSBoZWxwZXIgZnVuY3Rpb24gdXNlZCBieSB0aGUgbW92ZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgaWYgdGhlcmUgaXMgYSBjb2xsaXNpb24gYmV0d2VlbiBhblxyXG4gICAgICogZW52aXJvbm1lbnQgb2JqZWN0IGFuZCB0aGUgZW5lbXkuIElmIHRoZXJlIGlzIGEgY29sbGlzaW9uLCB0aGUgb2JqZWN0IGlzIGF0dGFja2VkLlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0cyBBbiBhcnJheSBvZiBlbnZpcm9ubWVudCBvYmplY3RzLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgYSBjb2xsaXNpb24gZXhpc3RzLlxyXG4gICAgICovXHJcbiAgICBpc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdChlbnZpcm9ubWVudE9iamVjdHMpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgZW52aXJvbm1lbnRPYmplY3RzW2ldKSAmJiBlbnZpcm9ubWVudE9iamVjdHNbaV0uaXNCbG9ja2luZykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5hdHRhY2tDb29sZG93biA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrKGVudmlyb25tZW50T2JqZWN0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyBpZiB0aGUgZW5lbXkgaXMgY29sbGlkaW5nIHdpdGggYSB0cmFwLiBJZiB0aGV5IGFyZSBjb2xsaWRpbmcgd2l0aCBhIHNwaWtlIHRyYXAsIHRoZXkgdGFrZVxyXG4gICAgICogNSBkYW1hZ2UgZXZlcnkgNSBzZWNvbmRzLiBJZiB0aGV5IGFyZSBjb2xsaWRpbmcgd2l0aCBhIHRhciB0cmFwLCB0aGUgaXNTbG93ZWQgZmxhZyBpcyBzZXQgdG8gdHJ1ZSBhbmQgdGhlaXJcclxuICAgICAqIG1vdmVtZW50IGlzIGN1dCBpbiBoYWxmLlxyXG4gICAgICogQHBhcmFtIHBsYWNlZFRyYXBzXHJcbiAgICAgKi9cclxuICAgIGlzQ29sbGlzaW9uV2l0aFBsYWNlZFRyYXBzKHBsYWNlZFRyYXBzKSB7XHJcbiAgICAgICAgaWYodGhpcy5hdHRhY2tEYW1hZ2VUYWtlbkNvb2xkb3duIDwgMClcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2tEYW1hZ2VUYWtlbkNvb2xkb3duID0gMDtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxhY2VkVHJhcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBwbGFjZWRUcmFwc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIGlmKHBsYWNlZFRyYXBzW2ldIGluc3RhbmNlb2YgU3Bpa2VUcmFwUGxhY2VkICYmIHRoaXMuYXR0YWNrRGFtYWdlVGFrZW5Db29sZG93biA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhbHRoIC09IDU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tEYW1hZ2VUYWtlbkNvb2xkb3duICs9IDU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHBsYWNlZFRyYXBzW2ldIGluc3RhbmNlb2YgVGFyVHJhcFBsYWNlZClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU2xvd2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkcmF3IGZ1bmN0aW9uIGRyYXdzIHRoZSBpbWFnZSBvbiB0aGUgY2FudmFzIGF0IHRoZSB4IGFuZCB5IHBvc2l0aW9uIG9mIHRoZSBMaWdodEVuZW15LlxyXG4gICAgICogQHBhcmFtIGN0eCBUaGUgY29udGV4dCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIGNhbWVyYSBUaGUgY2FtZXJhIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xyXG4gICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSgodGhpcy54ICsgdGhpcy53aWR0aC8yKSAtIGNhbWVyYS54LCAodGhpcy55ICsgdGhpcy5oZWlnaHQvMikgLSBjYW1lcmEueSk7XHJcbiAgICAgICAgY3R4LnJvdGF0ZSh0aGlzLmFuZ2xlKyhNYXRoLlBJLzIpKTtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDAtdGhpcy53aWR0aC8yLCAwLXRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVuZW15O1xyXG4iLCJpbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIEVuZW15UHJvamVjdGlsZSBjbGFzcyBpcyB0aGUgb2JqZWN0IHRoYXQgaXMgZmlyZWQgZnJvbSB0aGUgUHJvamVjdGlsZUVuZW15IGVuZW15LlxyXG4gKi9cclxuY2xhc3MgRW5lbXlQcm9qZWN0aWxlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBFbmVteVByb2plY3RpbGUgY2xhc3MgYW5kIGdldHMgdGhlIHggYW5kIHkgY29lZmZpY2llbnRzIGZvciB1c2VcclxuICAgICAqIGluIHRoZSBtb3ZlIGZ1bmN0aW9uLiBUaGUgbG9hZEltYWdlIGZ1bmN0aW9uIGlzIGFsc28gY2FsbGVkLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gZGVzdFggVGhlIHggZGVzdGluYXRpb24gb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBkZXN0WSBUaGUgeSBkZXN0aW5hdGlvbiBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBkZXN0WCwgZGVzdFkpIHtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gNjAwO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlID0gNTtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy5saXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgZGlmZlggPSBkZXN0WCAtIHRoaXMueDtcclxuICAgICAgICBsZXQgZGlmZlkgPSBkZXN0WSAtIHRoaXMueTtcclxuICAgICAgICBpZihNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jb2VmZlggPSBkaWZmWCAvIE1hdGguYWJzKGRpZmZYKTtcclxuICAgICAgICAgICAgdGhpcy5jb2VmZlkgPSBkaWZmWSAvIE1hdGguYWJzKGRpZmZYKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29lZmZZID0gZGlmZlkgLyBNYXRoLmFicyhkaWZmWSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIG1vdmVzIHRoZSBFbmVteVByb2plY3RpbGUgYWNjb3JkaW5nIHRvIHRoZSB4IGFuZCB5IGNvZWZmaWNpZW50cy5cclxuICAgICAqIEBwYXJhbSBtb2RpZmllciBUaGUgbW9kaWZpZXIgdG8gYmUgbXVsdGlwbGllZCBieSB0aGUgdmVsb2NpdHkuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3RzIFRoZSBhcnJheSBvZiBlbnZpcm9ubWVudCBvYmplY3RzLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgbW92ZShtb2RpZmllciwgZW52aXJvbm1lbnRPYmplY3RzLCBwbGF5ZXIpIHtcclxuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcip0aGlzLmNvZWZmWDtcclxuICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcip0aGlzLmNvZWZmWTtcclxuICAgICAgICBpZih0aGlzLmhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIHBsYXllcikpIHtcclxuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMueCA8IDAgfHwgdGhpcy54ID4gMTAwMDAgfHwgdGhpcy55IDwgMCB8fCB0aGlzLnkgPiA1NjI1KXtcclxuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB0YWtlcyBhd2F5IGhlYWx0aCBmcm9tIHRoZSBwbGF5ZXIgZXF1YWwgdG8gdGhlIGRhbWFnZSBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZGFtYWdlUGxheWVyKHBsYXllcikge1xyXG4gICAgICAgIHBsYXllci5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XHJcbiAgICAgICAgcGxheWVyLmRhbWFnZVRha2VuU291bmQucGxheSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB0YWtlcyBhd2F5IGhlYWx0aCBmcm9tIHRoZSBlbnZpcm9ubWVudCBvYmplY3QgZXF1YWwgdG8gdGhlIGRhbWFnZSBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0IFRoZSBlbnZpcm9ubWVudCBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGRhbWFnZUVudmlyb25tZW50KGVudmlyb25tZW50T2JqZWN0KXtcclxuICAgICAgICBlbnZpcm9ubWVudE9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyBpZiBhbiBlbnZpcm9ubWVudCBvYmplY3Qgb3IgYSBwbGF5ZXIgd2VyZSBoaXQgYnkgdGhlIHByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3RzIFRoZSBhcnJheSBvZiBlbnZpcm9ubWVudCBvYmplY3RzLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCBzb21ldGhpbmcgd2FzIGhpdC5cclxuICAgICAqL1xyXG4gICAgaGl0U29tZXRoaW5nKGVudmlyb25tZW50T2JqZWN0cywgcGxheWVyKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIGVudmlyb25tZW50T2JqZWN0c1tpXSkgJiYgZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzQmxvY2tpbmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlRW52aXJvbm1lbnQoZW52aXJvbm1lbnRPYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgcGxheWVyKSl7XHJcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlUGxheWVyKHBsYXllcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbG9hZEltYWdlIGZ1bmN0aW9uIGxvYWRzIHRoZSB1cmwgYXMgYW4gSW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0ltYWdlTG9hZGVkIGlzXHJcbiAgICAgKiBzZXQgdG8gdHJ1ZS4gVGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIEVuZW15UHJvamVjdGlsZSBhcmUgc2V0IHRvIHRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBpbWFnZS5cclxuICAgICAqL1xyXG4gICAgbG9hZEltYWdlKCkge1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IFwiR3JhcGhpY3MvRW5lbXlQcm9qZWN0aWxlLnBuZ1wiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRyYXcgZnVuY3Rpb24gZHJhd3MgdGhlIGltYWdlIG9uIHRoZSBjYW52YXMgYXQgdGhlIHggYW5kIHkgcG9zaXRpb24gb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBjdHggVGhlIGNvbnRleHQgb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjYW1lcmEgVGhlIGNhbWVyYSBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVuZW15UHJvamVjdGlsZTsiLCJpbXBvcnQgRW5lbXkgZnJvbSAnLi9FbmVteS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIEZpbmFsQm9zcyBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaXMgYSBoaWdoIGhlYWx0aCBhbmQgZGFtYWdlIGVuZW15LlxyXG4gKi9cclxuY2xhc3MgRmluYWxCb3NzIGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEZpbmFsQm9zcy4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gMTI4LCB0aGUgaGVhbHRoIHNldCB0byA1MDAwLCB0aGUgZGFtYWdlIHNldCB0byA1MCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byAxMDAwMC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBGaW5hbEJvc3MuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgRmluYWxCb3NzLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMTI4LCA1MDAwLCA1MCwgMTAwMDApO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93biA9IDEwMDtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SYXRlID0gMTtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SZXNldCA9IDEwMDtcclxuICAgICAgICB0aGlzLnJhcGlkRmlyZUNvb2xkb3duID0gNTAwO1xyXG4gICAgICAgIHRoaXMucmFwaWRGaXJlQ29vbGRvd25SYXRlID0gMTtcclxuICAgICAgICB0aGlzLnJhcGlkRmlyZUNvb2xkb3duUmVzZXQgPSA1MDA7XHJcbiAgICAgICAgdGhpcy5yYXBpZEZpcmVMZW5ndGggPSA1MDA7XHJcbiAgICAgICAgdGhpcy5yYXBpZEZpcmVMZW5ndGhSZXNldCA9IDUwMDtcclxuICAgICAgICB0aGlzLmlzUmFwaWRGaXJlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jaGFyZ2VBdHRhY2tDb29sZG93biA9IDEyNTA7XHJcbiAgICAgICAgdGhpcy5jaGFyZ2VBdHRhY2tDb29sZG93blJhdGUgPSAxO1xyXG4gICAgICAgIHRoaXMuY2hhcmdlQXR0YWNrQ29vbGRvd25SZXNldCA9IDEyNTA7XHJcbiAgICAgICAgdGhpcy5jaGFyZ2VBdHRhY2tMZW5ndGggPSAxMDA7XHJcbiAgICAgICAgdGhpcy5jaGFyZ2VBdHRhY2tMZW5ndGhSZXNldCA9IDEwMDtcclxuICAgICAgICB0aGlzLmlzQ2hhcmdlQXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvRmluYWxCb3NzLnBuZ1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gc3RhcnRzIHRoZSBjaGFyZ2UgYXR0YWNrIGJ5IHNldHRpbmcgdmVsb2NpdHkgdG8gMTAyNCwgc2V0dGluZyBkYW1hZ2UgdG8gMTAsIGFuZCBzZXR0aW5nIGlzQ2hhcmdlQXR0YWNrXHJcbiAgICAgKiB0byB0cnVlLlxyXG4gICAgICovXHJcbiAgICBzdGFydENoYXJnZUF0dGFjaygpIHtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gMTAyNDtcclxuICAgICAgICB0aGlzLmRhbWFnZSA9IDEwO1xyXG4gICAgICAgIHRoaXMuaXNDaGFyZ2VBdHRhY2sgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBlbmRzIHRoZSBjaGFyZ2UgYXR0YWNrIGJ5IHJlc2V0dGluZyB2ZWxvY2l0eSBhbmQgZGFtYWdlIHRvIHRoZWlyIGRlZmF1bHQgdmFsdWVzLlxyXG4gICAgICovXHJcbiAgICBlbmRDaGFyZ2VBdHRhY2soKSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IDEyODtcclxuICAgICAgICB0aGlzLmRhbWFnZSA9IDUwO1xyXG4gICAgICAgIHRoaXMuaXNDaGFyZ2VBdHRhY2sgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gc3RhcnRzIHJhcGlkIGZpcmUgYnkgc2V0dGluZyB0aGUgc2hvb3RDb29sZG93blJhdGUgdG8gMjUgYW5kIHNldHRpbmcgaXNSYXBpZEZpcmUgdG8gdHJ1ZS5cclxuICAgICAqL1xyXG4gICAgc3RhcnRSYXBpZEZpcmUoKSB7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duUmF0ZSA9IDI1O1xyXG4gICAgICAgIHRoaXMuaXNSYXBpZEZpcmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBlbmRzIHRoZSByYXBpZCBmaXJlIGJ5IHNldHMgcmFwaWQgZmlyZSBiYWNrIHRvIGl0cyBkZWZhdWx0IHZhbHVlLlxyXG4gICAgICovXHJcbiAgICBlbmRSYXBpZEZpcmUoKSB7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duUmF0ZSA9IDE7XHJcbiAgICAgICAgdGhpcy5pc1JhcGlkRmlyZSA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaW5hbEJvc3M7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBMaWdodEVuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBpcyBhIGZhc3QgZW5lbXkgd2l0aCBsb3cgaGVhbHRoLlxyXG4gKi9cclxuY2xhc3MgTGlnaHRFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBMaWdodEVuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byAxMjgsIHRoZSBoZWFsdGggc2V0IHRvIDEwLCB0aGUgZGFtYWdlIHNldCB0byAxMCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byA1MC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBMaWdodEVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIExpZ2h0RW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAxMjgsIDEwLCAxMCwgNTApO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0xpZ2h0RW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaWdodEVuZW15OyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgTWluaUJvc3MgY2xhc3MgZXh0ZW5kcyB0aGUgRW5lbXkgY2xhc3MuIEl0IGlzIGEgaGlnaCBoZWFsdGggYW5kIGRhbWFnZSBlbmVteS5cclxuICovXHJcbmNsYXNzIE1pbmlCb3NzIGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIE1pbmlCb3NzLiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byAxMjgsIHRoZSBoZWFsdGggc2V0IHRvIDUwMCwgdGhlIGRhbWFnZSBzZXQgdG8gNTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gMTAwMC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBNaW5pQm9zcy5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBNaW5pQm9zcy5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDEyOCwgNTAwLCA1MCwgMTAwMCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duID0gMjAwO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJhdGUgPSAxO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJlc2V0ID0gMjAwO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL01pbmlCb3NzLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWluaUJvc3M7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQYXJhc2l0ZUVuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBpcyBhIHZlcnkgZmFzdCBlbmVteSB3aXRoIHZlcnkgbG93IGhwLlxyXG4gKi9cclxuY2xhc3MgUGFyYXNpdGVFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBQYXJhc2l0ZUVuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byA1MTIsIHRoZSBoZWFsdGggc2V0IHRvIDEsIHRoZSBkYW1hZ2Ugc2V0IHRvIDk5LCBhbmQgdGhlIHBvaW50c09uS2lsbFxyXG4gICAgICogc2V0IHRvIDUwMC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBQYXJhc2l0ZUVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFBhcmFzaXRlRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCA1MTIsIDEsIDk5LCA1MDApO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1BhcmFzaXRlRW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYXJhc2l0ZUVuZW15OyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUHJvamVjdGlsZUVuZW15IGNsYXNzIGV4dGVuZHMgdGhlIGVuZW15IGNsYXNzLiBJdCBjYW4gc2hvb3QgcHJvamVjdGlsZXMgYXQgdGhlIHBsYXllci5cclxuICovXHJcbmNsYXNzIFByb2plY3RpbGVFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBQcm9qZWN0aWxlRW5lbXkuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDk2LCB0aGUgaGVhbHRoIHNldCB0byA0MCwgdGhlIGRhbWFnZSBzZXQgdG8gMTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gMjUwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFByb2plY3RpbGVFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBQcm9qZWN0aWxlRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCA5NiwgNDAsIDEwLCAyNTApO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93biA9IDMwMDtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SYXRlID0gMTtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SZXNldCA9IDMwMDtcclxuICAgICAgICB0aGlzLnNob290QW1vdW50ID0gMTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9Qcm9qZWN0aWxlRW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0aWxlRW5lbXk7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBSZWd1bGFyRW5lbXkgY2xhc3MgZXh0ZW5kcyB0aGUgRW5lbXkgY2xhc3MuIEl0IGhhcyBiYWxhbmNlZCBzdGF0cyBhY3Jvc3MgdGhlIGJvYXJkLlxyXG4gKi9cclxuY2xhc3MgUmVndWxhckVuZW15IGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFJlZ3VsYXJFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gNjQsIHRoZSBoZWFsdGggc2V0IHRvIDI1LCB0aGUgZGFtYWdlIHNldCB0byAxMCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byAxMDAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgUmVndWxhckVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFJlZ3VsYXJFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDY0LCAyNSwgMTAsIDEwMCk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvUmVndWxhckVuZW15LnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVndWxhckVuZW15OyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgVGFua0VuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBpcyBhIHNsb3cgZW5lbXkgd2l0aCBoaWdoIGhlYWx0aCBhbmQgZGFtYWdlLlxyXG4gKi9cclxuY2xhc3MgVGFua0VuZW15IGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFRhbmtFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gMzIsIHRoZSBoZWFsdGggc2V0IHRvIDEwMCwgdGhlIGRhbWFnZSBzZXQgdG8gMjUsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gNTAwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFRhbmtFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBUYW5rRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAzMiwgMTAwLCAgMjUsIDUwMCk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvVGFua0VuZW15LnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFua0VuZW15OyIsImltcG9ydCBFbnZpcm9ubWVudE9iamVjdCBmcm9tICcuL0Vudmlyb25tZW50T2JqZWN0LmpzJztcblxuLyoqXG4gKiBUaGUgQnVzaCBjbGFzcyBleHRlbmRzIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzcy4gSXQgaXMgYSBub24tYmxvY2tpbmcgb2JqZWN0LlxuICovXG5jbGFzcyBCdXNoIGV4dGVuZHMgRW52aXJvbm1lbnRPYmplY3Qge1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEJ1c2guIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzc2VzIGNvbnN0cnVjdG9yXG4gICAgICogd2l0aCB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIGhlYWx0aCBzZXQgdG8gMTAwMDAwLCBhbmQgaXNCbG9ja2luZyBzZXQgdG8gZmFsc2UuXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEJ1c2guXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIEJ1c2guXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICBzdXBlcih4LCB5LCAxMDAwMDAsIGZhbHNlKTtcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvQnVzaC5wbmdcIik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdXNoOyIsImltcG9ydCBFbnZpcm9ubWVudE9iamVjdCBmcm9tICcuL0Vudmlyb25tZW50T2JqZWN0LmpzJztcblxuLyoqXG4gKiBUaGUgQ3JhdGUgY2xhc3MgZXh0ZW5kcyB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3MuIEl0IGlzIGEgYmxvY2tpbmcgb2JqZWN0IHdpdGggbG93IGhlYWx0aC5cbiAqL1xuY2xhc3MgQ3JhdGUgZXh0ZW5kcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgQ3JhdGUuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzc2VzIGNvbnN0cnVjdG9yXG4gICAgICogd2l0aCB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIGhlYWx0aCBzZXQgdG8gMTAwLCBhbmQgaXNCbG9ja2luZyBzZXQgdG8gdHJ1ZS5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgQ3JhdGUuXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIENyYXRlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgMTAwLCB0cnVlKTtcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvQ3JhdGUucG5nXCIpO1xuICAgICAgICBzdXBlci5sb2FkU291bmQoJ0F1ZGlvL0JveEJyZWFrLm1wMycpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ3JhdGU7XG4iLCIvKipcbiAqIFRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzcyBpcyB0aGUgcGFyZW50IGZvciBhbGwgZW52aXJvbm1lbnQgb2JqZWN0cy5cbiAqL1xuY2xhc3MgRW52aXJvbm1lbnRPYmplY3Qge1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIGhlYWx0aCBUaGUgaGVhbHRoIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0gaXNCbG9ja2luZyBXaGV0aGVyIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjYW4gYmUgd2Fsa2VkIHRocm91Z2guXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSwgaGVhbHRoLCBpc0Jsb2NraW5nKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gaGVhbHRoO1xuICAgICAgICB0aGlzLmlzQmxvY2tpbmcgPSBpc0Jsb2NraW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gc2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGVudmlyb25tZW50IG9iamVjdCBnaXZlbiB4IGFuZCB5LlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIHRvIGJlIHNldC5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiB0byBiZSBzZXQuXG4gICAgICovXG4gICAgc2V0UG9zaXRpb24oeCwgeSkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBsb2FkSW1hZ2UgZnVuY3Rpb24gdGFrZXMgaW4gYSB1cmwgYW5kIGxvYWRzIGl0IGFzIGFuIEltYWdlLiBPbmNlIHRoZSBpbWFnZSBpcyBsb2FkZWQsIHRoaXMuaXNJbWFnZUxvYWRlZCBpc1xuICAgICAqIHNldCB0byB0cnVlLiBUaGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QgYXJlIHNldCB0byB0aGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgaW1hZ2UuXG4gICAgICogQHBhcmFtIHVybCBUaGUgdXJsIHRoYXQgc2hvdWxkIGJlIGxvYWRlZC5cbiAgICAgKi9cbiAgICBsb2FkSW1hZ2UodXJsKSB7XG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB1cmw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGxvYWQgc291bmQgZnVuY3Rpb24gbG9hZHMgdGhlIGVudmlyb25tZW50IG9iamVjdHMgYnJlYWtpbmcgc291bmQuXG4gICAgICogQHBhcmFtIHVybCBUaGUgdXJsIHRoYXQgc2hvdWxkIGJlIGxvYWRlZC5cbiAgICAgKi9cbiAgICBsb2FkU291bmQodXJsKSB7XG4gICAgICAgIHRoaXMuaXNTb3VuZExvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNvdW5kID0gbmV3IEF1ZGlvKCk7XG4gICAgICAgIHRoaXMuc291bmQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc1NvdW5kTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zb3VuZC5zcmMgPSB1cmw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGRyYXcgZnVuY3Rpb24gZHJhd3MgdGhlIGltYWdlIG9uIHRoZSBjYW52YXMgYXQgdGhlIHggYW5kIHkgcG9zaXRpb24gb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSBjdHggVGhlIGNvbnRleHQgb2YgdGhlIGNhbnZhcy5cbiAgICAgKiBAcGFyYW0gY2FtZXJhIFRoZSBjYW1lcmEgb2JqZWN0LlxuICAgICAqL1xuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW52aXJvbm1lbnRPYmplY3Q7XG4iLCJpbXBvcnQgRW52aXJvbm1lbnRPYmplY3QgZnJvbSAnLi9FbnZpcm9ubWVudE9iamVjdC5qcyc7XG5cbi8qKlxuICogVGhlIFJvY2sgY2xhc3MgZXh0ZW5kcyB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3MuIEl0IGlzIGEgYmxvY2tpbmcgb2JqZWN0IHdpdGggaGlnaCBoZWFsdGguXG4gKi9cbmNsYXNzIFJvY2sgZXh0ZW5kcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgUm9jay4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzZXMgY29uc3RydWN0b3JcbiAgICAgKiB3aXRoIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgaGVhbHRoIHNldCB0byAzMDAsIGFuZCBpc0Jsb2NraW5nIHNldCB0byB0cnVlLlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBSb2NrLlxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBSb2NrLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgMzAwLCB0cnVlKTtcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvUm9jay5wbmdcIik7XG4gICAgICAgIHN1cGVyLmxvYWRTb3VuZCgnQXVkaW8vQm94QnJlYWsubXAzJyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb2NrO1xuIiwiLyoqXHJcbiAqIFRoZSBDb250cm9sbGVyIGNsYXNzIGxpc3RlbnMgZm9yIHVzZXIgaW5wdXRzIGFuZCBzdG9yZXMgd2hhdCBpcyBiZWluZyBwcmVzc2VkLlxyXG4gKi9cclxuY2xhc3MgQ29udHJvbGxlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgQ29udHJvbGxlci4gSXQgYWxzbyBhZGRzIGV2ZW50IGxpc3RlbmVycyBmb3Iga2V5ZG93biwga2V5dXAsIG1vdXNlbW92ZSxcclxuICAgICAqIG1vdXNlZG93biwgYW5kIG1vdXNldXAuXHJcbiAgICAgKiBAcGFyYW0gZG9jdW1lbnRCb2R5IFRoZSBib2R5IG9mIHRoZSBkb2N1bWVudC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRCb2R5KSB7XHJcbiAgICAgICAgdGhpcy5rZXlzUHJlc3NlZCA9IFtdO1xyXG4gICAgICAgIHRoaXMubW91c2UgPSBbMCwgMF07XHJcbiAgICAgICAgdGhpcy5tb3VzZVByZXNzZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnRCb2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmtleXNQcmVzc2VkW2V2ZW50LmtleUNvZGVdID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnRCb2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5rZXlzUHJlc3NlZFtldmVudC5rZXlDb2RlXSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudEJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubW91c2VbMF0gPSBldmVudC5jbGllbnRYO1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlWzFdID0gZXZlbnQuY2xpZW50WTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnRCb2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Qm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubW91c2VQcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgaWYgdGhlIGlucHV0dGVkIGtleSBpcyBiZWluZyBwcmVzc2VkLlxyXG4gICAgICogQHBhcmFtIGtleSBUaGUga2V5IHRvIGNoZWNrLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgdGhlIGtleSBpcyBiZWluZyBwcmVzc2VkLlxyXG4gICAgICovXHJcbiAgICBpc0tleVByZXNzZWQoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5c1ByZXNzZWRba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIHRoZSBtb3VzZSBpcyBiZWluZyBwcmVzc2VkLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgdGhlIG1vdXNlIGlzIHByZXNzZWQuXHJcbiAgICAgKi9cclxuICAgIGlzTW91c2VQcmVzc2VkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vdXNlUHJlc3NlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgbW91c2UgcG9zaXRpb24uXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyW119IFRoZSB4IGFuZCB5IHBvc2l0aW9uIG9mIHRoZSBtb3VzZSBhcyBhbiBhcnJheS4gKFt4LHldKVxyXG4gICAgICovXHJcbiAgICBnZXRNb3VzZVBvc2l0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vdXNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyO1xyXG4iLCJpbXBvcnQgV29ybGQgZnJvbSAnLi9Xb3JsZC5qcyc7XHJcbmltcG9ydCBDb250cm9sbGVyIGZyb20gJy4vQ29udHJvbGxlci5qcyc7XHJcbmltcG9ydCBFbmVteVByb2plY3RpbGUgZnJvbSBcIi4uL0VuZW1pZXMvRW5lbXlQcm9qZWN0aWxlXCI7XHJcbmltcG9ydCBNaW5pQm9zcyBmcm9tIFwiLi4vRW5lbWllcy9NaW5pQm9zc1wiO1xyXG5pbXBvcnQgRmluYWxCb3NzIGZyb20gXCIuLi9FbmVtaWVzL0ZpbmFsQm9zc1wiO1xyXG5pbXBvcnQgUHJvamVjdGlsZUVuZW15IGZyb20gXCIuLi9FbmVtaWVzL1Byb2plY3RpbGVFbmVteVwiO1xyXG5pbXBvcnQgQ3Vyc29yIGZyb20gJy4uL0N1cnNvci5qcyc7XHJcbmltcG9ydCBQaXN0b2wgZnJvbSBcIi4uL1dlYXBvbnMvUGlzdG9sXCI7XHJcbmltcG9ydCBTbmlwZXIgZnJvbSBcIi4uL1dlYXBvbnMvU25pcGVyXCI7XHJcbmltcG9ydCBTaG90Z3VuIGZyb20gXCIuLi9XZWFwb25zL1Nob3RndW5cIjtcclxuaW1wb3J0IEFzc2F1bHRSaWZsZSBmcm9tICcuLi9XZWFwb25zL0Fzc2F1bHRSaWZsZSdcclxuaW1wb3J0IEZsYW1ldGhyb3dlciBmcm9tIFwiLi4vV2VhcG9ucy9GbGFtZXRocm93ZXJcIjtcclxuaW1wb3J0IEJ1bGxldDUwY2FsIGZyb20gXCIuLi9XZWFwb25zL0J1bGxldDUwY2FsXCI7XHJcbmltcG9ydCBCdWxsZXQ1NTYgZnJvbSBcIi4uL1dlYXBvbnMvQnVsbGV0NTU2XCI7XHJcbmltcG9ydCBCdWxsZXQxMkdhdWdlIGZyb20gXCIuLi9XZWFwb25zL0J1bGxldDEyR2F1Z2VcIjtcclxuaW1wb3J0IEJ1bGxldDltbSBmcm9tIFwiLi4vV2VhcG9ucy9CdWxsZXQ5bW1cIjtcclxuaW1wb3J0IEJ1bGxldEZpcmUgZnJvbSBcIi4uL1dlYXBvbnMvQnVsbGV0RmlyZVwiO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcbmltcG9ydCBTcGlrZVRyYXAgZnJvbSBcIi4uL1dlYXBvbnMvU3Bpa2VUcmFwXCI7XHJcbmltcG9ydCBUYXJUcmFwIGZyb20gXCIuLi9XZWFwb25zL1RhclRyYXBcIjtcclxuaW1wb3J0IFNwaWtlVHJhcFBsYWNlZCBmcm9tIFwiLi4vUGxhY2VkVHJhcHMvU3Bpa2VUcmFwUGxhY2VkXCI7XHJcbmltcG9ydCBUYXJUcmFwUGxhY2VkIGZyb20gXCIuLi9QbGFjZWRUcmFwcy9UYXJUcmFwUGxhY2VkXCI7XHJcblxyXG4vKipcclxuICogVGhlIEdhbWUgY2xhc3MgaXMgdXNlZCB0byBzdG9yZSB0aGUgZ2FtZSBzdGF0ZS4gSXQgYWxzbyBhbGxvd3MgZm9yIHRoZSBnYW1lIHRvIGJlIHVwZGF0ZWQgb3IgZHJhd24uXHJcbiAqL1xyXG5jbGFzcyBHYW1lIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBHYW1lIGNsYXNzLiBUaGUgZ2FtZVN0YXRlIGlzIHNldCB0byAnUGxheWluZycgaW5pdGlhbGx5LlxyXG4gICAgICogQHBhcmFtIGNhbnZhcyBUaGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIGRvY3VtZW50Qm9keSBUaGUgYm9keSBvZiB0aGUgZG9jdW1lbnQuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgZG9jdW1lbnRCb2R5KSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICAgICAgdGhpcy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIHRoaXMud29ybGQgPSBuZXcgV29ybGQoY2FudmFzKTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcihkb2N1bWVudEJvZHkpO1xyXG4gICAgICAgIHRoaXMuY3Vyc29yID0gbmV3IEN1cnNvcigpO1xyXG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gJ1BsYXlpbmcnO1xyXG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xyXG4gICAgICAgIHRoaXMudG9wU2NvcmVzID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIHRoaXMuY29tYm9MZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuY29tYm9FbmVtaWVzS2lsbGVkID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyB0aGUgZ2FtZS4gSWYgdGhlIGdhbWVTdGF0ZSBpcyAnUGxheWluZywnIGV2ZXJ5dGhpbmcgaW4gdGhlIHdvcmxkIGlzIGNoZWNrZWQgYW5kIHVwZGF0ZWQuXHJcbiAgICAgKiBJZiB0aGUgZ2FtZVN0YXRlIGlzICdQYXVzZWQsJyBldmVyeXRoaW5nIGluIHRoZSB3b3JsZCByZW1haW5zIHN0aWxsIHVudGlsIHRoZSByZXN1bWUgYnV0dG9uIGlzIHByZXNzZWQuIElmIHRoZVxyXG4gICAgICogZ2FtZVN0YXRlIGlzICdHYW1lIE92ZXIsJyBldmVyeXRoaW5nIGluIHRoZSB3b3JsZCByZW1haW5zIHN0aWxsIHVudGlsIHRoZSBUcnkgQWdhaW4gYnV0dG9uIGlzIHByZXNzZWQuXHJcbiAgICAgKiBAcGFyYW0gbW9kaWZpZXIgVGhlIG1vZGlmaWVyIHRvIGJlIHVzZWQgZm9yIG1vdmVtZW50LlxyXG4gICAgICovXHJcbiAgICB1cGRhdGUobW9kaWZpZXIpIHtcclxuICAgICAgICBpZih0aGlzLmdhbWVTdGF0ZSA9PT0gJ1BsYXlpbmcnKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmhlYWx0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9ICdHYW1lIE92ZXInO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUb3BTY29yZXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoMjcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSAnUGF1c2VkJztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29tYm9MZW5ndGggLT0gbW9kaWZpZXI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29tYm9MZW5ndGggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWJvRW5lbWllc0tpbGxlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWJvTGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5ZXIobW9kaWZpZXIpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNob3QoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVFcXVpcHBlZCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUVuZW1pZXMobW9kaWZpZXIpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBpY2tVcHMoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVXZWFwb25Db29sZG93bihtb2RpZmllcik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvamVjdGlsZXMobW9kaWZpZXIpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUVudmlyb25tZW50T2JqZWN0cygpO1xyXG4gICAgICAgICAgICB0aGlzLndvcmxkLmNhbWVyYS51cGRhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQud2F2ZSArPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5zdGFydFdhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuZ2FtZVN0YXRlID09PSAnR2FtZSBPdmVyJykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVPdmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5nYW1lU3RhdGUgPT09ICdQYXVzZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGF1c2VTY3JlZW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIGV2ZXJ5dGhpbmcgaW4gdGhlIHdvcmxkLiBJZiB0aGUgZ2FtZVN0YXRlIGlzICdHYW1lIE92ZXIsJyBhIGdhbWUgb3ZlciBtZXNzYWdlIGlzIGRpc3BsYXllZCxcclxuICAgICAqIGlmIHRoZSBnYW1lU3RhdGUgaXMgJ1BhdXNlZCwnIGEgcGF1c2UgbWVzc2FnZSBpcyBkaXNwbGF5ZWQsIGFuZCBpZiB0aGUgZ2FtZVN0YXRlIGlzICdQbGF5aW5nLCcgYWxsIG9mIHRoZSBvYmplY3RzXHJcbiAgICAgKiBpbiB0aGUgd29ybGQgYXJlIGRyYXduLCBhbG9uZyB3aXRoIHRoZSBIVUQsIE1pbmlNYXAsIGFuZCBjdXJzb3IuXHJcbiAgICAgKi9cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgaWYodGhpcy5nYW1lU3RhdGUgPT09ICdHYW1lIE92ZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0dhbWVPdmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1Njb3JlYm9hcmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLmdhbWVTdGF0ZSA9PT0gJ1BhdXNlZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3UGF1c2VTY3JlZW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuaXNCYWNrZ3JvdW5kTG9hZGVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5kcmF3QmFja2dyb3VuZCh0aGlzLmN0eCwgdGhpcy5jYW52YXMpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kcmF3V2VhcG9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdQaWNrVXBzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1BsYWNlZFRyYXBzKCk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pc0ltYWdlTG9hZGVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEsIHRoaXMuY29udHJvbGxlci5tb3VzZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRyYXdFbmVtaWVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0VuZW15UHJvamVjdGlsZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3QnVsbGV0cygpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdFbnZpcm9ubWVudE9iamVjdHMoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3TWluaU1hcCgpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdIVUQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuY3Vyc29yLmltYWdlLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0gLSB0aGlzLmN1cnNvci5pbWFnZS53aWR0aC8yLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0gLSB0aGlzLmN1cnNvci5pbWFnZS5oZWlnaHQvMik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIGEgTWluaU1hcCB0aGF0IGRpc3BsYXlzIHRoZSBwbGF5ZXIncyBsb2NhdGlvbiwgZW5lbXkgbG9jYXRpb25zLCBhbmQgZW52aXJvbm1lbnQgb2JqZWN0IGxvY2F0aW9ucy5cclxuICAgICAqL1xyXG4gICAgZHJhd01pbmlNYXAoKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJ3JnYmEoMzUsIDE3NywgNzcsIDAuMiknO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCI7XHJcbiAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gMztcclxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgyNSwgdGhpcy5jYW52YXMuaGVpZ2h0IC0gMjUwLCA0MDAsIDIyNSk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdCgyNSwgdGhpcy5jYW52YXMuaGVpZ2h0IC0gMjUwLCA0MDAsIDIyNSk7XHJcbiAgICAgICAgbGV0IHhQZXJjZW50ID0gKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yKSAvIHRoaXMud29ybGQud2lkdGg7XHJcbiAgICAgICAgbGV0IHlQZXJjZW50ID0gKHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQvMikgLyB0aGlzLndvcmxkLmhlaWdodDtcclxuICAgICAgICBsZXQgeFJlbGF0aXZlID0geFBlcmNlbnQqNDAwO1xyXG4gICAgICAgIGxldCB5UmVsYXRpdmUgPSB5UGVyY2VudCoyMjU7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyMwMEZGMDAnO1xyXG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIHRoaXMuY3R4LmFyYygyNSArIHhSZWxhdGl2ZSwgKHRoaXMuY2FudmFzLmhlaWdodCAtIDI1MCkgKyB5UmVsYXRpdmUsIDIuNSwgMCwgMipNYXRoLlBJKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzSW1hZ2VMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCB4UGVyY2VudCA9ICh0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS54ICsgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0ud2lkdGgvMikgLyB0aGlzLndvcmxkLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgbGV0IHlQZXJjZW50ID0gKHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLnkgKyB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5oZWlnaHQvMikgLyB0aGlzLndvcmxkLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGxldCB4UmVsYXRpdmUgPSB4UGVyY2VudCo0MDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgeVJlbGF0aXZlID0geVBlcmNlbnQqMjI1O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyM4MDgwODAnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5hcmMoMjUgKyB4UmVsYXRpdmUsICh0aGlzLmNhbnZhcy5oZWlnaHQgLSAyNTApICsgeVJlbGF0aXZlLCAyLjUsIDAsIDIqTWF0aC5QSSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0uaXNJbWFnZUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHhQZXJjZW50ID0gKHRoaXMud29ybGQuZW5lbWllc1tpXS54ICsgdGhpcy53b3JsZC5lbmVtaWVzW2ldLndpZHRoLzIpIC8gdGhpcy53b3JsZC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGxldCB5UGVyY2VudCA9ICh0aGlzLndvcmxkLmVuZW1pZXNbaV0ueSArIHRoaXMud29ybGQuZW5lbWllc1tpXS5oZWlnaHQvMikgLyB0aGlzLndvcmxkLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGxldCB4UmVsYXRpdmUgPSB4UGVyY2VudCo0MDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgeVJlbGF0aXZlID0geVBlcmNlbnQqMjI1O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRjAwMDAnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5hcmMoMjUgKyB4UmVsYXRpdmUsICh0aGlzLmNhbnZhcy5oZWlnaHQgLSAyNTApICsgeVJlbGF0aXZlLCAyLjUsIDAsIDIqTWF0aC5QSSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIHRoZSBIVUQgd2hpY2ggY29udGFpbnMgdGhlIHBsYXllcidzIGhlYWx0aCwgdGhlIHdhdmUgbnVtYmVyLCBhbmQgdGhlIG51bWJlciBvZiBlbmVtaWVzIGxlZnQuXHJcbiAgICAgKiBUaGUgY3VycmVudCBzZWxlY3RlZCB3ZWFwb24gaXMgYWxzbyBkaXNwbGF5ZWQuXHJcbiAgICAgKi9cclxuICAgIGRyYXdIVUQoKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiNDhweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI0ZGRic7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDBcIjtcclxuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRoaXMud29ybGQucGxheWVyLmhlYWx0aCArIFwiIEhQXCIsIHRoaXMuY2FudmFzLndpZHRoLzIgLSAyOTAsIDUwKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KHRoaXMud29ybGQucGxheWVyLmhlYWx0aCArIFwiIEhQXCIsIHRoaXMuY2FudmFzLndpZHRoLzIgLSAyOTAsIDUwKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIldhdmUgXCIgKyB0aGlzLndvcmxkLndhdmUsIHRoaXMuY2FudmFzLndpZHRoLzIsIDUwKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KFwiV2F2ZSBcIiArIHRoaXMud29ybGQud2F2ZSwgdGhpcy5jYW52YXMud2lkdGgvMiwgNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGggKyBcIiBFbmVtaWVzIExlZnRcIiwgdGhpcy5jYW52YXMud2lkdGgvMiArIDM1MCwgNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQodGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aCArIFwiIEVuZW1pZXMgTGVmdFwiLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgMzUwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiNDhweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI0ZGRic7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoJ0FjdGl2ZSBXZWFwb246ICcgKyB0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnlbdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4XS5uYW1lLCB0aGlzLmNhbnZhcy53aWR0aC8yLCB0aGlzLmNhbnZhcy5oZWlnaHQgLSA1MCk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCgnQWN0aXZlIFdlYXBvbjogJyArIHRoaXMud29ybGQucGxheWVyLmludmVudG9yeVt0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXhdLm5hbWUsIHRoaXMuY2FudmFzLndpZHRoLzIsIHRoaXMuY2FudmFzLmhlaWdodCAtIDUwKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnU2NvcmU6ICcgKyB0aGlzLnNjb3JlLCB0aGlzLmNhbnZhcy53aWR0aC8yLCAxMjUpO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoJ1Njb3JlOiAnICsgdGhpcy5zY29yZSwgdGhpcy5jYW52YXMud2lkdGgvMiwgMTI1KTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnQ29tYm86ICcgKyB0aGlzLmNvbWJvRW5lbWllc0tpbGxlZCwgdGhpcy5jYW52YXMud2lkdGgvMiArIDM1MCwgMTI1KTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCdDb21ibzogJyArIHRoaXMuY29tYm9FbmVtaWVzS2lsbGVkLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgMzUwLCAxMjUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyBhbGwgb2YgdGhlIHBsYWNlZCB0cmFwcyBpbiB0aGUgd29ybGQuXHJcbiAgICAgKi9cclxuICAgIGRyYXdQbGFjZWRUcmFwcygpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5wbGFjZWRUcmFwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYWNlZFRyYXBzW2ldLmlzSW1hZ2VMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxhY2VkVHJhcHNbaV0uZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBjaGVja3Mgd2hldGhlciB0aGUgcmVzdGFydCBidXR0b24gb24gdGhlIGdhbWUgb3ZlciBzY3JlZW4gaGFzIGJlZW4gcHJlc3NlZC4gSWYgaXQgaGFzLCB0aGUgd29ybGQgaXNcclxuICAgICAqIHJlc3RhcnRlZCwgdGhlIGdhbWUgc3RhdGUgaXMgc2V0IHRvICdwbGF5aW5nLCcgYW5kIHRoZSBzY29yZSBpcyBzZXQgdG8gMC5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlR2FtZU92ZXIoKSB7XHJcbiAgICAgICAgaWYodGhpcy5jb250cm9sbGVyLmlzTW91c2VQcmVzc2VkKCkpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5jb250cm9sbGVyLm1vdXNlWzBdID4gdGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCAmJiB0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0gPCAodGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCArIDIwMClcclxuICAgICAgICAgICAgICAgICYmIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSA+IHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUgJiYgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdIDwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSArIDEwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5zdGFydCh0aGlzLmNhbnZhcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9ICdQbGF5aW5nJztcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyB0aGUgZ2FtZSBvdmVyIHNjcmVlbiBhbmQgYSBidXR0b24gdG8gdHJ5IGFnYWluLlxyXG4gICAgICovXHJcbiAgICBkcmF3R2FtZU92ZXIoKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMTI4cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDE7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJHYW1lIE92ZXJcIiwgdGhpcy5jYW52YXMud2lkdGgvMiwgdGhpcy5jYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KFwiR2FtZSBPdmVyXCIsIHRoaXMuY2FudmFzLndpZHRoLzIsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI0ZGRic7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QodGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSwgMjAwLCAxMDApO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVJlY3QodGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSwgMjAwLCAxMDApO1xyXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjI0cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyMwMDAnO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiVHJ5IGFnYWluP1wiLCB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwICsgMTAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1ICsgNTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB1cGRhdGVzIHRoZSB0b3Agc2NvcmVzIGJhc2VkIG9uIHRoZSBjdXJyZW50IHNjb3JlLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVUb3BTY29yZXMoKSB7XHJcbiAgICAgICAgaWYodGhpcy5zY29yZSA+IHRoaXMudG9wU2NvcmVzWzBdKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9wU2NvcmVzWzJdID0gdGhpcy50b3BTY29yZXNbMV07XHJcbiAgICAgICAgICAgIHRoaXMudG9wU2NvcmVzWzFdID0gdGhpcy50b3BTY29yZXNbMF07XHJcbiAgICAgICAgICAgIHRoaXMudG9wU2NvcmVzWzBdID0gdGhpcy5zY29yZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnNjb3JlID4gdGhpcy50b3BTY29yZXNbMV0pIHtcclxuICAgICAgICAgICAgdGhpcy50b3BTY29yZXNbMl0gPSB0aGlzLnRvcFNjb3Jlc1sxXTtcclxuICAgICAgICAgICAgdGhpcy50b3BTY29yZXNbMV0gPSB0aGlzLnNjb3JlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuc2NvcmUgPiB0aGlzLnRvcFNjb3Jlc1syXSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvcFNjb3Jlc1syXSA9IHRoaXMuc2NvcmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyB0aGUgdG9wIDMgc2NvcmVzLlxyXG4gICAgICovXHJcbiAgICBkcmF3U2NvcmVib2FyZCgpIHtcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCI2MHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI0ZGRic7XHJcbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJzdGFydFwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCdIaWdoIFNjb3JlcycsIHRoaXMuY2FudmFzLndpZHRoLzIgKyA0NDAsIHRoaXMuY2FudmFzLmhlaWdodC8yIC0gNzUpO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoJ0hpZ2ggU2NvcmVzJywgdGhpcy5jYW52YXMud2lkdGgvMiArIDQ0MCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgLSA3NSk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoJzFzdCcsIHRoaXMuY2FudmFzLndpZHRoLzIgKyA0MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCcxc3QnLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgNDAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoJzJuZCcsIHRoaXMuY2FudmFzLndpZHRoLzIgKyA0MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgNzUpO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoJzJuZCcsIHRoaXMuY2FudmFzLndpZHRoLzIgKyA0MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgNzUpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCczcmQnLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgNDAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDE1MCk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCgnM3JkJywgdGhpcy5jYW52YXMud2lkdGgvMiArIDQwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAxNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwiZW5kXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoJycgKyB0aGlzLnRvcFNjb3Jlc1swXSwgdGhpcy5jYW52YXMud2lkdGgvMiArIDgwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoJycgKyB0aGlzLnRvcFNjb3Jlc1swXSwgdGhpcy5jYW52YXMud2lkdGgvMiArIDgwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCcnICsgdGhpcy50b3BTY29yZXNbMV0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyA4MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgNzUpO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoJycgKyB0aGlzLnRvcFNjb3Jlc1sxXSwgdGhpcy5jYW52YXMud2lkdGgvMiArIDgwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyA3NSk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoJycgKyB0aGlzLnRvcFNjb3Jlc1syXSwgdGhpcy5jYW52YXMud2lkdGgvMiArIDgwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAxNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoJycgKyB0aGlzLnRvcFNjb3Jlc1syXSwgdGhpcy5jYW52YXMud2lkdGgvMiArIDgwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAxNTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBjaGVja3Mgd2hldGhlciB0aGUgcmVzdW1lIGJ1dHRvbiBvbiB0aGUgcGF1c2VkIHNjcmVlbiBoYXMgYmVlbiBwcmVzc2VkLiBJZiBpdCBoYXMsIHRoZSBnYW1lIHN0YXRlIGlzIHNldCB0byAncGxheWluZy4nXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVBhdXNlU2NyZWVuKCkge1xyXG4gICAgICAgIGlmKHRoaXMuY29udHJvbGxlci5pc01vdXNlUHJlc3NlZCgpKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29udHJvbGxlci5tb3VzZVswXSA+IHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAgJiYgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdIDwgKHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDArMjAwKVxyXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdID4gdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSAmJiB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0gPCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1ICsgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9ICdQbGF5aW5nJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgdGhlIHBhdXNlIHNjcmVlbiBhbmQgYSByZXN1bWUgYnV0dG9uLlxyXG4gICAgICovXHJcbiAgICBkcmF3UGF1c2VTY3JlZW4oKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMTI4cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDE7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJQYXVzZWRcIiwgdGhpcy5jYW52YXMud2lkdGgvMiwgdGhpcy5jYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KFwiUGF1c2VkXCIsIHRoaXMuY2FudmFzLndpZHRoLzIsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI0ZGRic7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QodGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSwgMjAwLCAxMDApO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVJlY3QodGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSwgMjAwLCAxMDApO1xyXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjI0cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyMwMDAnO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiUmVzdW1lXCIsIHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAgKyAxMDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUgKyA1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIGFsbCBvZiB0aGUgZW5lbWllcyBpbiB0aGUgd29ybGQuXHJcbiAgICAgKi9cclxuICAgIGRyYXdFbmVtaWVzKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmVuZW1pZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLmlzSW1hZ2VMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLndvcmxkLmNhbWVyYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgdGhlIGxvY2F0aW9uIG9mIGFsbCBvZiB0aGUgZW5lbWllcywgdXBkYXRlcyB0aGVpciBjb29sZG93bnMsIGFuZCByZW1vdmVzIHRoZW0gaWYgdGhleSBoYXZlXHJcbiAgICAgKiBubyBoZWFsdGguXHJcbiAgICAgKiBAcGFyYW0gbW9kaWZpZXIgVGhlIGdhbWUgbW9kaWZpZXIgc3BlZWQuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUVuZW1pZXMobW9kaWZpZXIpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSB0aGlzLndvcmxkLmVuZW1pZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLm1vdmUodGhpcy53b3JsZC5wbGF5ZXIsIG1vZGlmaWVyLCB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cywgdGhpcy53b3JsZC5wbGFjZWRUcmFwcywgdGhpcy53b3JsZC5jYW1lcmEpO1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0uYXR0YWNrQ29vbGRvd24gPiAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmF0dGFja0Nvb2xkb3duIC09IDU7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXSBpbnN0YW5jZW9mIEZpbmFsQm9zcykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLnJhcGlkRmlyZUNvb2xkb3duID4gMCAmJiAhdGhpcy53b3JsZC5lbmVtaWVzW2ldLmlzUmFwaWRGaXJlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVDb29sZG93biAtPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlQ29vbGRvd25SYXRlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlQ29vbGRvd24gPD0gMCAmJiAhdGhpcy53b3JsZC5lbmVtaWVzW2ldLmlzUmFwaWRGaXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLnN0YXJ0UmFwaWRGaXJlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLnJhcGlkRmlyZUxlbmd0aCA9IHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVMZW5ndGhSZXNldDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVMZW5ndGggPiAwICYmIHRoaXMud29ybGQuZW5lbWllc1tpXS5pc1JhcGlkRmlyZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlTGVuZ3RoIC09IHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVDb29sZG93blJhdGU7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVMZW5ndGggPD0gMCAmJiB0aGlzLndvcmxkLmVuZW1pZXNbaV0uaXNSYXBpZEZpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uZW5kUmFwaWRGaXJlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLnJhcGlkRmlyZUNvb2xkb3duID0gdGhpcy53b3JsZC5lbmVtaWVzW2ldLnJhcGlkRmlyZUNvb2xkb3duUmVzZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLmNoYXJnZUF0dGFja0Nvb2xkb3duID4gMCAmJiAhdGhpcy53b3JsZC5lbmVtaWVzW2ldLmlzQ2hhcmdlQXR0YWNrKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tDb29sZG93biAtPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrQ29vbGRvd25SYXRlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrQ29vbGRvd24gPD0gMCAmJiAhdGhpcy53b3JsZC5lbmVtaWVzW2ldLmlzQ2hhcmdlQXR0YWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLnN0YXJ0Q2hhcmdlQXR0YWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmNoYXJnZUF0dGFja0xlbmd0aCA9IHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tMZW5ndGhSZXNldDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tMZW5ndGggPiAwICYmIHRoaXMud29ybGQuZW5lbWllc1tpXS5pc0NoYXJnZUF0dGFjaylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrTGVuZ3RoIC09IHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tDb29sZG93blJhdGU7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tMZW5ndGggPD0gMCAmJiB0aGlzLndvcmxkLmVuZW1pZXNbaV0uaXNDaGFyZ2VBdHRhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uZW5kQ2hhcmdlQXR0YWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmNoYXJnZUF0dGFja0Nvb2xkb3duID0gdGhpcy53b3JsZC5lbmVtaWVzW2ldLmNoYXJnZUF0dGFja0Nvb2xkb3duUmVzZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldIGluc3RhbmNlb2YgUHJvamVjdGlsZUVuZW15IHx8IHRoaXMud29ybGQuZW5lbWllc1tpXSBpbnN0YW5jZW9mIE1pbmlCb3NzIHx8IHRoaXMud29ybGQuZW5lbWllc1tpXSBpbnN0YW5jZW9mIEZpbmFsQm9zcykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLnNob290Q29vbGRvd24gPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duIC09IHRoaXMud29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duUmF0ZTtcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlcy5wdXNoKG5ldyBFbmVteVByb2plY3RpbGUodGhpcy53b3JsZC5lbmVtaWVzW2ldLnggKyB0aGlzLndvcmxkLmVuZW1pZXNbaV0ud2lkdGgvMiwgdGhpcy53b3JsZC5lbmVtaWVzW2ldLnkgKyB0aGlzLndvcmxkLmVuZW1pZXNbaV0uaGVpZ2h0LzIsIHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0LzIpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93biArPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93blJlc2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5oZWFsdGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21ib0VuZW1pZXNLaWxsZWQgKz0gMTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY29tYm9MZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUgKz0gdGhpcy53b3JsZC5lbmVtaWVzW2ldLnBvaW50c09uS2lsbCoyO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUgKz0gdGhpcy53b3JsZC5lbmVtaWVzW2ldLnBvaW50c09uS2lsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tYm9MZW5ndGggPSAzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyB0aGUgcGxheWVycyBsb2NhdGlvbiBiYXNlZCBvbiB1c2VyIGlucHV0LlxyXG4gICAgICogQHBhcmFtIG1vZGlmaWVyIFRoZSBnYW1lIHNwZWVkIG1vZGlmaWVyLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVQbGF5ZXIobW9kaWZpZXIpIHtcclxuICAgICAgICBsZXQgc3ByaW50aW5nID0gdGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCgxNik7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoODcpKSB7IC8vIFBsYXllciBob2xkaW5nIHVwXHJcbiAgICAgICAgICAgIC8vT25seSBtb3ZlIHVwIGlmIHdlIGFyZSBub3QgYXQgdGhlIHZlcnkgdG9wIG9mIHRoZSB3b3JsZFxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci55ID49IDApIHtcclxuICAgICAgICAgICAgICAgIC8vSWYgdGhlIHBsYXllciBpcyBzcHJpbnRpbmcgaGUgbXVzdCBtb3ZlIHR3aWNlIGFzIGZhc3RcclxuICAgICAgICAgICAgICAgIGlmKHNwcmludGluZylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55IC09IHRoaXMud29ybGQucGxheWVyLnNwZWVkKm1vZGlmaWVyKjI7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueSAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgLy9JZiB0aGUgbW92ZW1lbnQgY2F1c2VkIHRoZSBwbGF5ZXIgdG8gYmUgY29sbGlkaW5nLCB1bmRvIHRoZSBtb3ZlbWVudCBhbmQgZ2l2ZSBiYWNrIHRoZSBzdGFtaW5hIGlmIGhlIHdhcyBzcHJpdG5pbmcuXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdCh0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihzcHJpbnRpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnkgKz0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQqbW9kaWZpZXIqMjtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnkgKz0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg4MykpIHsgLy8gUGxheWVyIGhvbGRpbmcgZG93blxyXG4gICAgICAgICAgICAvL09ubHkgbW92ZSBkb3duIGlmIHdlIGFyZSBub3QgYXQgdGhlIHZlcnkgYm90dG9tIG9mIHRoZSB3b3JsZFxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0IDw9IDU2MjUpIHtcclxuICAgICAgICAgICAgICAgIC8vSWYgdGhlIHBsYXllciBpcyBzcHJpbnRpbmcgaGUgbXVzdCBtb3ZlIHR3aWNlIGFzIGZhc3QsIGFuZCBoaXMgc3RhbWluYSBtdXN0IGRyYWluIGJhc2VkIG9uIHRoZSBtb2RpZmllciAoc2Vjb25kcyBzaW5jZSBsYXN0IHVwZGF0ZSlcclxuICAgICAgICAgICAgICAgIGlmKHNwcmludGluZylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkKm1vZGlmaWVyKjI7XHJcbiAgICAgICAgICAgICAgICAvL090aGVyd2lzZSBtb3ZlIGxpa2Ugbm9ybWFsXHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueSArPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgLy9JZiB0aGUgbW92ZW1lbnQgY2F1c2VkIHRoZSBwbGF5ZXIgdG8gYmUgY29sbGlkaW5nLCB1bmRvIHRoZSBtb3ZlbWVudCBhbmQgZ2l2ZSBiYWNrIHRoZSBzdGFtaW5hIGlmIGhlIHdhcyBzcHJpdG5pbmcuXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdCh0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihzcHJpbnRpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnkgLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQqbW9kaWZpZXIqMjtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnkgLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg2NSkpIHsgLy8gUGxheWVyIGhvbGRpbmcgbGVmdFxyXG4gICAgICAgICAgICAvL29ubHkgZ28gbGVmdCBpZiB3ZSBhcmUgbm90IG9uIHRoZSBmYXIgbGVmdCBlZGdlIGFscmVhZHlcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIueCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZihzcHJpbnRpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueCAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyKjI7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueCAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3ByaW50aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXIqMjtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggKz0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoNjgpKSB7IC8vIFBsYXllciBob2xkaW5nIHJpZ2h0XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aCA8PSAxMDAwMCkge1xyXG4gICAgICAgICAgICAgICAgaWYoc3ByaW50aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggKz0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcioyO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggKz0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwcmludGluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueCAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyKjI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54IC09IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHJlbW92ZXMgZW52aXJvbm1lbnQgb2JqZWN0cyB0aGF0IGhhdmUgbm8gaGVhbHRoIHJlbWFpbmluZyBhbmQgcGxheXMgYSBzb3VuZC5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlRW52aXJvbm1lbnRPYmplY3RzKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmhlYWx0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5zb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIGFsbCBvZiB0aGUgZW52aXJvbm1lbnQgb2JqZWN0cyBpbiB0aGUgd29ybGQuXHJcbiAgICAgKi9cclxuICAgIGRyYXdFbnZpcm9ubWVudE9iamVjdHMoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzSW1hZ2VMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgYWxsIG9mIHRoZSB3ZWFwb25zIGluIHRoZSB3b3JsZC5cclxuICAgICAqL1xyXG4gICAgZHJhd1dlYXBvbnMoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuZ3JvdW5kV2VhcG9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmdyb3VuZFdlYXBvbnNbaV0uaXNJbWFnZUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5ncm91bmRXZWFwb25zW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyB0aGUgcGlja3VwcyBvbiB0aGUgZ3JvdW5kLCBzdWNoIGFzIGdyb3VuZCB3ZWFwb25zIGFuZCBtZWRwYWNrcy4gSWYgdGhlIHBsYXllciBjb2xsaWRlcyB3aXRoIHRoZW0sXHJcbiAgICAgKiB0aGV5IGFyZSByZW1vdmVkIGZyb20gdGhlIHdvcmxkIGFuZCBlaXRoZXIgYWRkZWQgdG8gdGhlIHBsYXllcidzIGludmVudG9yeSBvciBjb25zdW1lZC5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlUGlja1VwcygpIHtcclxuICAgICAgICAvLyB1cGRhdGUgZ3JvdW5kIHdlYXBvbnNcclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy53b3JsZC5ncm91bmRXZWFwb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcy53b3JsZC5wbGF5ZXIsIHRoaXMud29ybGQuZ3JvdW5kV2VhcG9uc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBvd25zV2VwID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGogPSB0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnkubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnlbal0ubmFtZSA9PT0gdGhpcy53b3JsZC5ncm91bmRXZWFwb25zW2ldLndlYXBvbi5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG93bnNXZXAgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKG93bnNXZXAgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5ncm91bmRXZWFwb25zW2ldLmFkZFdlYXBvbih0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZ3JvdW5kV2VhcG9ucy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdXBkYXRlIG1lZHBhY2tzXHJcbiAgICAgICAgZm9yKGxldCBpID0gdGhpcy53b3JsZC5waWNrVXBzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcy53b3JsZC5wbGF5ZXIsIHRoaXMud29ybGQucGlja1Vwc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmhlYWx0aCA8IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLmhlYWx0aCA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBpY2tVcHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB1cGRhdGVzIHRoZSBjb29sZG93biBvZiBhbGwgb2YgdGhlIHdlYXBvbnMgaW4gdGhlIHBsYXllcidzIGludmVudG9yeS5cclxuICAgICAqIEBwYXJhbSBtb2RpZmllciBUaGUgZ2FtZSBzcGVlZCBtb2RpZmllci5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlV2VhcG9uQ29vbGRvd24obW9kaWZpZXIpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCB3ZXAgPSB0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnlbaV07XHJcbiAgICAgICAgICAgIGlmKHdlcC5jb29sZG93biA+IDApe1xyXG4gICAgICAgICAgICAgICAgd2VwLmNvb2xkb3duIC09IG1vZGlmaWVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyBhbGwgb2YgdGhlIGxpdmUgYnVsbGV0cyBpbiB0aGUgd29ybGQuXHJcbiAgICAgKi9cclxuICAgIGRyYXdCdWxsZXRzKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmJ1bGxldHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5idWxsZXRzW2ldLmlzSW1hZ2VMb2FkZWQgJiYgdGhpcy53b3JsZC5idWxsZXRzW2ldLmxpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0c1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLndvcmxkLmNhbWVyYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGFkZHMgbmV3IGJ1bGxldHMgdG8gdGhlIHdvcmxkIGRlcGVuZGluZyBvbiBpZiB0aGUgcGxheWVyIHByZXNzZWQgdGhlaXIgbW91c2UgYnV0dG9uIGFuZCB3aGF0IHdlYXBvblxyXG4gICAgICogd2FzIGVxdWlwcGVkLiBJdCBjaGVja3MgdGhlIHR5cGUgb2Ygd2VhcG9uIHRoZSBwbGF5ZXIgaGFzIGVxdWlwcGVkIGFuZCBmaXJlcyB0aGUgY29ycmVjdCBidWxsZXRzLiBTaG90Z3VuIGlzIHVuaXF1ZVxyXG4gICAgICogaW4gdGhhdCBpdCBmaXJlcyA1IGJ1bGxldHMgd2l0aCBhIHNwcmVhZCB3aGljaCBpcyBkb25lIGJ5IGFkZGluZy9zdWJ0cmFjdGluZyBhIGNvbnN0YW50IGZyb20gdGhlIGRlc3RpbmF0aW9uLlxyXG4gICAgICogSWYgYSB0cmFwIGlzIGN1cnJlbnRseSBlcXVpcHBlZCwgaXQgaXMgcGxhY2VkIGF0IHRoZSBtb3VzZSBwb3NpdGlvbiBhbmQgcmVtb3ZlZCBmcm9tIHRoZSBwbGF5ZXIncyBpbnZlbnRvcnkuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVNob3QoKSB7XHJcbiAgICAgICAgaWYodGhpcy5jb250cm9sbGVyLmlzTW91c2VQcmVzc2VkKCkpIHtcclxuICAgICAgICAgICAgbGV0IHdlcCA9IHRoaXMud29ybGQucGxheWVyLmludmVudG9yeVt0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXhdO1xyXG4gICAgICAgICAgICBpZih3ZXAuY29vbGRvd24gPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgd2VwLnNvdW5kLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIHdlcC5zb3VuZC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB3ZXAuYWRkQ29vbGRvd24oKTtcclxuICAgICAgICAgICAgICAgIGlmKHdlcCBpbnN0YW5jZW9mIFBpc3RvbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5wdXNoKG5ldyBCdWxsZXQ5bW0odGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHdlcCBpbnN0YW5jZW9mIFNuaXBlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5wdXNoKG5ldyBCdWxsZXQ1MGNhbCh0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0rdGhpcy53b3JsZC5jYW1lcmEueCwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdK3RoaXMud29ybGQuY2FtZXJhLnkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYod2VwIGluc3RhbmNlb2YgQXNzYXVsdFJpZmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDU1Nih0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0rdGhpcy53b3JsZC5jYW1lcmEueCwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdK3RoaXMud29ybGQuY2FtZXJhLnkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYod2VwIGluc3RhbmNlb2YgU2hvdGd1bikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5wdXNoKG5ldyBCdWxsZXQxMkdhdWdlKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0LzIsIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54LCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5wdXNoKG5ldyBCdWxsZXQxMkdhdWdlKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0LzIsIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54KzI1LCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueSsyNSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5wdXNoKG5ldyBCdWxsZXQxMkdhdWdlKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0LzIsIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54KzUwLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueSs1MCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5wdXNoKG5ldyBCdWxsZXQxMkdhdWdlKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0LzIsIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54LTI1LCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueS0yNSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5wdXNoKG5ldyBCdWxsZXQxMkdhdWdlKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0LzIsIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54LTUwLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueS01MCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy90aGUgZmxhbWV0aHJvd2VyIHdpbGwgc2hvb3QgYSBzaW5nbGUgYmFsbCBvZiBmaXJlIGVhY2ggdXBkYXRlIGlmIHBvc3NpYmxlIHdpdGggYSBzbGlnaHQgcmFuZG9tIHNwcmVhZFxyXG4gICAgICAgICAgICAgICAgLy9zbyB0aGUgZmlyZSBkb2VzIG5vdCBnbyBpbiBhIHN0cmFpZ2h0IGxpbmUuXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHdlcCBpbnN0YW5jZW9mIEZsYW1ldGhyb3dlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcHJlYWQxX3ggPSBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgtMTAwLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcHJlYWQxX3kgPSBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgtMTAwLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcHJlYWQyX3ggPSBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgtMTAwLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcHJlYWQyX3kgPSBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgtMTAwLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcHJlYWQzX3ggPSBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgtMTAwLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcHJlYWQzX3kgPSBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgtMTAwLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldEZpcmUodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngrc3ByZWFkMV94LCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueStzcHJlYWQxX3kpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0RmlyZSh0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0rdGhpcy53b3JsZC5jYW1lcmEueCtzcHJlYWQyX3gsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55K3NwcmVhZDJfeSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5wdXNoKG5ldyBCdWxsZXRGaXJlKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0LzIsIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54K3NwcmVhZDNfeCwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdK3RoaXMud29ybGQuY2FtZXJhLnkrc3ByZWFkM195KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHdlcCBpbnN0YW5jZW9mIFNwaWtlVHJhcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLmludmVudG9yeS5zcGxpY2UodGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXggPSB0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXggLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxhY2VkVHJhcHMucHVzaChuZXcgU3Bpa2VUcmFwUGxhY2VkKHRoaXMuY29udHJvbGxlci5tb3VzZVswXSArIHRoaXMud29ybGQuY2FtZXJhLnggLSAyMDAsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSArIHRoaXMud29ybGQuY2FtZXJhLnkgLSAyMDApKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYod2VwIGluc3RhbmNlb2YgVGFyVHJhcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLmludmVudG9yeS5zcGxpY2UodGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXggPSB0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXggLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxhY2VkVHJhcHMucHVzaChuZXcgVGFyVHJhcFBsYWNlZCh0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0gKyB0aGlzLndvcmxkLmNhbWVyYS54IC0gMjAwLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0gKyB0aGlzLndvcmxkLmNhbWVyYS55IC0gMjAwKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgd2hhdCB0aGUgcGxheWVyIGhhcyBlcXVpcHBlZCBiYXNlZCBvbiB3aGF0IGtleSBpcyBwcmVzc2VkLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVFcXVpcHBlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg0OSkpIC8vIFBsYXllciBwcmVzc2VkIDFcclxuICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gMDtcclxuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg1MCkpIHsgLy8gUGxheWVyIHByZXNzZWQgMlxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnkubGVuZ3RoID4gMSlcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleCA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDUxKSkgeyAvLyBQbGF5ZXIgcHJlc3NlZCAzXHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmludmVudG9yeS5sZW5ndGggPiAyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoNTIpKSB7IC8vIFBsYXllciBwcmVzc2VkIDRcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5Lmxlbmd0aCA+IDMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXggPSAzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg1MykpIHsgLy8gUGxheWVyIHByZXNzZWQgNVxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnkubGVuZ3RoID4gNClcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleCA9IDQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDU0KSkgeyAvLyBQbGF5ZXIgcHJlc3NlZCA2XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmludmVudG9yeS5sZW5ndGggPiA1KVxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoNTUpKSB7IC8vIFBsYXllciBwcmVzc2VkIDdcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5Lmxlbmd0aCA+IDYpXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXggPSA2O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyBidWxsZXRzIGFuZCBlbmVteSBwcm9qZWN0aWxlcyBpbiB0aGUgd29ybGQuIElmIGEgcHJvamVjdGlsZSBoaXRzIGFuIG9iamVjdCBlbmVteS9wbGF5ZXJcclxuICAgICAqIGl0IGRpc2FwcGVhcnMgZnJvbSB0aGUgd29ybGQuXHJcbiAgICAgKiBAcGFyYW0gbW9kaWZpZXIgVGhlIGdhbWUgc3BlZWQgbW9kaWZpZXIuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVByb2plY3RpbGVzKG1vZGlmaWVyKSB7XHJcbiAgICAgICAgLy8gZW5lbXkgcHJvamVjdGlsZXNcclxuICAgICAgICBmb3IobGV0IGkgPSB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzW2ldLm1vdmUobW9kaWZpZXIsIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzLCB0aGlzLndvcmxkLnBsYXllcik7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5saXZlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBwbGF5ZXIgYnVsbGV0c1xyXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMud29ybGQuYnVsbGV0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHNbaV0ubW92ZShtb2RpZmllciwgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMsIHRoaXMud29ybGQuZW5lbWllcyk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuYnVsbGV0c1tpXS5saXZlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgYWxsIG9mIHRoZSBsaXZlIGVuZW15IHByb2plY3RpbGVzIGluIHRoZSB3b3JsZC5cclxuICAgICAqL1xyXG4gICAgZHJhd0VuZW15UHJvamVjdGlsZXMoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXNbaV0uaXNJbWFnZUxvYWRlZCAmJiB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXNbaV0ubGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIGFsbCBvZiB0aGUgcGljayB1cHMgaW4gdGhlIHdvcmxkLlxyXG4gICAgICovXHJcbiAgICBkcmF3UGlja1VwcygpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5waWNrVXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGlja1Vwc1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBpY2tVcHNbaV0uZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xyXG4iLCJpbXBvcnQgUm9jayBmcm9tIFwiLi4vRW52aXJvbm1lbnRPYmplY3RzL1JvY2tcIjtcclxuaW1wb3J0IEJ1c2ggZnJvbSBcIi4uL0Vudmlyb25tZW50T2JqZWN0cy9CdXNoXCI7XHJcbmltcG9ydCBDcmF0ZSBmcm9tIFwiLi4vRW52aXJvbm1lbnRPYmplY3RzL0NyYXRlXCI7XHJcbmltcG9ydCBUYW5rRW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvVGFua0VuZW15XCI7XHJcbmltcG9ydCBSZWd1bGFyRW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvUmVndWxhckVuZW15XCI7XHJcbmltcG9ydCBMaWdodEVuZW15IGZyb20gXCIuLi9FbmVtaWVzL0xpZ2h0RW5lbXlcIjtcclxuaW1wb3J0IFByb2plY3RpbGVFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9Qcm9qZWN0aWxlRW5lbXlcIjtcclxuaW1wb3J0IE1pbmlCb3NzIGZyb20gJy4uL0VuZW1pZXMvTWluaUJvc3MnO1xyXG5pbXBvcnQgRmluYWxCb3NzIGZyb20gJy4uL0VuZW1pZXMvRmluYWxCb3NzJztcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi4vUGxheWVycy9QbGF5ZXJcIjtcclxuaW1wb3J0IENhbWVyYSBmcm9tIFwiLi4vUGxheWVycy9DYW1lcmFcIjtcclxuaW1wb3J0IEdyb3VuZEFzc2F1bHRSaWZsZSBmcm9tIFwiLi4vUGlja1Vwcy9Hcm91bmRBc3NhdWx0UmlmbGUuanNcIjtcclxuaW1wb3J0IEdyb3VuZFNuaXBlciBmcm9tIFwiLi4vUGlja1Vwcy9Hcm91bmRTbmlwZXIuanNcIjtcclxuaW1wb3J0IEdyb3VuZFNob3RndW4gZnJvbSAnLi4vUGlja1Vwcy9Hcm91bmRTaG90Z3VuLmpzJztcclxuaW1wb3J0IEdyb3VuZEZsYW1ldGhyb3dlciBmcm9tICcuLi9QaWNrVXBzL0dyb3VuZEZsYW1ldGhyb3dlci5qcyc7XHJcbmltcG9ydCBIZWFsdGhQYWNrIGZyb20gXCIuLi9QaWNrVXBzL0hlYWx0aHBhY2suanNcIjtcclxuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL1V0aWxpdGllcy9VdGlsXCI7XHJcbmltcG9ydCBQYXJhc2l0ZUVuZW15IGZyb20gXCIuLi9FbmVtaWVzL1BhcmFzaXRlRW5lbXlcIjtcclxuaW1wb3J0IEdyb3VuZFNwaWtlVHJhcCBmcm9tIFwiLi4vUGlja1Vwcy9Hcm91bmRTcGlrZVRyYXAuanNcIjtcclxuaW1wb3J0IEdyb3VuZFRhclRyYXAgZnJvbSAnLi4vUGlja1Vwcy9Hcm91bmRUYXJUcmFwLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgV29ybGQgY2xhc3MgaG9sZHMgdGhlIGluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gdGhlIHdvcmxkLlxyXG4gKi9cclxuY2xhc3MgV29ybGQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZCBvZiB0aGUgd29ybGQgYW5kIGxvYWRzIHRoZSBiYWNrZ3JvdW5kLlxyXG4gICAgICogQHBhcmFtIGNhbnZhcyBUaGUgY2FudmFzLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0KGNhbnZhcyk7XHJcbiAgICAgICAgdGhpcy5sb2FkQmFja2dyb3VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHN0YXJ0IGZ1bmN0aW9uIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFdvcmxkLiBUaGUgcGxheWVyIGlzIG1hZGUgYW5kIHRoZSBjYW1lcmEgaXMgYXR0YWNoZWQgdG8gdGhlIHBsYXllci5cclxuICAgICAqIEEgY2FsbCBpcyB0byBpbml0aWFsaXplIHRoZSBlbnZpcm9ubWVudCBhbmQgc3RhcnQgdGhlIHdhdmUuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzIFRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0KGNhbnZhcykge1xyXG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5lbmVtaWVzID0gW107XHJcbiAgICAgICAgdGhpcy5idWxsZXRzID0gW107XHJcbiAgICAgICAgdGhpcy5lbmVteVByb2plY3RpbGVzID0gW107XHJcbiAgICAgICAgdGhpcy5waWNrVXBzID0gW107XHJcbiAgICAgICAgdGhpcy5ncm91bmRXZWFwb25zID0gW107XHJcbiAgICAgICAgdGhpcy5wbGFjZWRUcmFwcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUVudmlyb25tZW50KCk7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplUGlja1VwcygpO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBDYW1lcmEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0LCAxMDAwMCwgNTYyNSk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyLCBjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLndhdmUgPSAxO1xyXG4gICAgICAgIHRoaXMuc3RhcnRXYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGluaXRpYWxpemVzIHRoZSBlbnZpcm9ubWVudCBieSBwdXNoaW5nIGVudmlyb25tZW50IG9iamVjdHMgb250byB0aGUgZW52aXJvbm1lbnRPYmplY3RzIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplRW52aXJvbm1lbnQoKSB7XHJcbiAgICAgICAgbGV0IGNyYXRlQ2FwID0gMTU7XHJcbiAgICAgICAgbGV0IGJ1c2hDYXAgPSAxNTtcclxuICAgICAgICBsZXQgcm9ja0NhcCA9IDE1O1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgY3JhdGVDYXA7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMucHVzaChuZXcgQ3JhdGUoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBidXNoQ2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzLnB1c2gobmV3IEJ1c2goVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByb2NrQ2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzLnB1c2gobmV3IFJvY2soVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG5cclxuICAgICAgICBsZXQgY29sbGlzaW9uRmxhZyA9IHRydWU7XHJcbiAgICAgICAgd2hpbGUoY29sbGlzaW9uRmxhZyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgaSA9IFV0aWwuYXJlQW55Q29sbGlzaW9uc0luU2FtZUFycmF5KHRoaXMuZW52aXJvbm1lbnRPYmplY3RzKTtcclxuICAgICAgICAgICAgaWYoaSA9PT0gLTEpXHJcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25GbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzW2ldLnNldFBvc2l0aW9uKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgUGlja1VwcyBzdWNoIGFzIHdlYXBvbnMgYW5kIGhlYWx0aCBwYWNrcyBieSBwdXNoaW5nIHRoZW0gb250byB0aGUgUGlja1VwcyBhbmQgZ3JvdW5kV2VhcG9ucyBhcnJheXMuXHJcbiAgICAgKi9cclxuICAgICBpbml0aWFsaXplUGlja1VwcygpIHtcclxuICAgICAgICAgbGV0IHNuaXBlckNhcCA9IDM7XHJcbiAgICAgICAgIGxldCBhc3NhdWx0UmlmbGVDYXAgPSA1O1xyXG4gICAgICAgICBsZXQgc2hvdGd1bkNhcCA9IDU7XHJcbiAgICAgICAgIGxldCBzcGlrZVRyYXBDYXAgPSA1O1xyXG4gICAgICAgICBsZXQgdGFyVHJhcENhcCA9IDU7XHJcbiAgICAgICAgIGxldCBmbGFtZXRocm93ZXJDYXAgPSA1O1xyXG4gICAgICAgICBsZXQgaGVhbHRoUGFja0NhcCA9IDc7XHJcblxyXG4gICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc25pcGVyQ2FwOyBpKyspXHJcbiAgICAgICAgICAgICB0aGlzLmdyb3VuZFdlYXBvbnMucHVzaChuZXcgR3JvdW5kU25pcGVyKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFzc2F1bHRSaWZsZUNhcDsgaSsrKVxyXG4gICAgICAgICAgICAgdGhpcy5ncm91bmRXZWFwb25zLnB1c2gobmV3IEdyb3VuZEFzc2F1bHRSaWZsZShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaG90Z3VuQ2FwOyBpKyspXHJcbiAgICAgICAgICAgICB0aGlzLmdyb3VuZFdlYXBvbnMucHVzaChuZXcgR3JvdW5kU2hvdGd1bihVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGZsYW1ldGhyb3dlckNhcDsgaSsrKVxyXG4gICAgICAgICAgICAgIHRoaXMuZ3JvdW5kV2VhcG9ucy5wdXNoKG5ldyBHcm91bmRGbGFtZXRocm93ZXIoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzcGlrZVRyYXBDYXA7IGkrKylcclxuICAgICAgICAgICAgICB0aGlzLmdyb3VuZFdlYXBvbnMucHVzaChuZXcgR3JvdW5kU3Bpa2VUcmFwKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGFyVHJhcENhcDsgaSsrKVxyXG4gICAgICAgICAgICAgIHRoaXMuZ3JvdW5kV2VhcG9ucy5wdXNoKG5ldyBHcm91bmRUYXJUcmFwKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGhlYWx0aFBhY2tDYXA7IGkrKylcclxuICAgICAgICAgICAgIHRoaXMucGlja1Vwcy5wdXNoKG5ldyBIZWFsdGhQYWNrKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuXHJcbiAgICAgICAgIGxldCBzZWxmQ29sbGlzaW9uRmxhZyA9IHRydWU7XHJcbiAgICAgICAgIHdoaWxlKHNlbGZDb2xsaXNpb25GbGFnKSB7XHJcbiAgICAgICAgICAgICBsZXQgaSA9IFV0aWwuYXJlQW55Q29sbGlzaW9uc0luU2FtZUFycmF5KHRoaXMuZ3JvdW5kV2VhcG9ucyk7XHJcbiAgICAgICAgICAgICBpZihpID09PSAtMSlcclxuICAgICAgICAgICAgICAgICBzZWxmQ29sbGlzaW9uRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgIHRoaXMuZ3JvdW5kV2VhcG9uc1tpXS5zZXRQb3NpdGlvbihVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgc2VsZkNvbGxpc2lvbkZsYWcgPSB0cnVlO1xyXG4gICAgICAgICB3aGlsZShzZWxmQ29sbGlzaW9uRmxhZykge1xyXG4gICAgICAgICAgICAgbGV0IGkgPSBVdGlsLmFyZUFueUNvbGxpc2lvbnNJblNhbWVBcnJheSh0aGlzLnBpY2tVcHMpO1xyXG4gICAgICAgICAgICAgaWYoaSA9PT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgc2VsZkNvbGxpc2lvbkZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICB0aGlzLnBpY2tVcHNbaV0uc2V0UG9zaXRpb24oVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSk7XHJcbiAgICAgICAgIH1cclxuICAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHN0YXJ0cyB0aGUgd2F2ZSBieSBwdXNoaW5nIGVuZW1pZXMgb250byB0aGUgZW5lbWllcyBhcnJheS5cclxuICAgICAqL1xyXG4gICAgc3RhcnRXYXZlKCkge1xyXG4gICAgICAgIGxldCBsaWdodEVuZW15Q2FwID0gdGhpcy53YXZlICogMTA7XHJcbiAgICAgICAgbGV0IHJlZ3VsYXJFbmVteUNhcCA9IHRoaXMud2F2ZSAqIDEwO1xyXG4gICAgICAgIGxldCB0YW5rRW5lbXlDYXAgPSB0aGlzLndhdmUgKiA1O1xyXG4gICAgICAgIGxldCBwcm9qZWN0aWxlRW5lbXlDYXAgPSBNYXRoLmZsb29yKHRoaXMud2F2ZS8yKSo1O1xyXG4gICAgICAgIGxldCBtaW5pQm9zc0NhcCA9IE1hdGguZmxvb3IodGhpcy53YXZlLzUpO1xyXG4gICAgICAgIGxldCBwYXJhc2l0ZUVuZW15Q2FwID0gdGhpcy53YXZlO1xyXG5cclxuICAgICAgICBpZih0aGlzLndhdmUgPT09IDYpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IEZpbmFsQm9zcyhVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGlnaHRFbmVteUNhcDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IExpZ2h0RW5lbXkoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmVndWxhckVuZW15Q2FwOyBpKyspXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgUmVndWxhckVuZW15KFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRhbmtFbmVteUNhcDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IFRhbmtFbmVteShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwcm9qZWN0aWxlRW5lbXlDYXA7IGkrKylcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBQcm9qZWN0aWxlRW5lbXkoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbWluaUJvc3NDYXA7IGkrKylcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBNaW5pQm9zcyhVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwYXJhc2l0ZUVuZW15Q2FwOyBpKyspXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgUGFyYXNpdGVFbmVteShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY29sbGlzaW9uRmxhZyA9IHRydWU7XHJcbiAgICAgICAgd2hpbGUoY29sbGlzaW9uRmxhZyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgaSA9IFV0aWwuYXJlQW55Q29sbGlzaW9ucyh0aGlzLmVuZW1pZXMsIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzKTtcclxuICAgICAgICAgICAgaWYgKGkgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW1pZXNbaV0uc2V0UG9zaXRpb24oVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvYWRCYWNrZ3JvdW5kIGZ1bmN0aW9uIGxvYWRzIHRoZSBiYWNrZ3JvdW5kIGltYWdlLiBPbmNlIHRoZSBpbWFnZSBpcyBsb2FkZWQsIHRoaXMuaXNCYWNrZ3JvdW5kTG9hZGVkIGlzXHJcbiAgICAgKiBzZXQgdG8gdHJ1ZS5cclxuICAgICAqL1xyXG4gICAgbG9hZEJhY2tncm91bmQoKSB7XHJcbiAgICAgICAgdGhpcy5pc0JhY2tncm91bmRMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzQmFja2dyb3VuZExvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmJhY2tncm91bmQud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5iYWNrZ3JvdW5kLmhlaWdodDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZC5zcmMgPSBcIkdyYXBoaWNzL0JhY2tncm91bmQucG5nXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZHJhd0JhY2tncm91bmQgZnVuY3Rpb24gZHJhd3MgdGhlIGJhY2tncm91bmQgb2YgdGhlIHdvcmxkLlxyXG4gICAgICogQHBhcmFtIGN0eCBUaGUgY29udGV4dCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIGNhbnZhcyBUaGUgY2FudmFzLlxyXG4gICAgICovXHJcbiAgICBkcmF3QmFja2dyb3VuZChjdHgsIGNhbnZhcykge1xyXG4gICAgICAgIGxldCBzV2lkdGgsIHNIZWlnaHQ7XHJcbiAgICAgICAgc1dpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgICAgIHNIZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG5cclxuICAgICAgICBpZih0aGlzLmJhY2tncm91bmQud2lkdGggLSB0aGlzLmNhbWVyYS54IDwgY2FudmFzLndpZHRoKVxyXG4gICAgICAgICAgICBzV2lkdGggPSB0aGlzLmJhY2tncm91bmQud2lkdGggLSB0aGlzLmNhbWVyYS54O1xyXG4gICAgICAgIGlmKHRoaXMuYmFja2dyb3VuZC5oZWlnaHQgLSB0aGlzLmNhbWVyYS55IDwgY2FudmFzLmhlaWdodClcclxuICAgICAgICAgICAgc0hlaWdodCA9IHRoaXMuYmFja2dyb3VuZC5oZWlnaHQgLSB0aGlzLmNhbWVyYS55O1xyXG5cclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuYmFja2dyb3VuZCwgdGhpcy5jYW1lcmEueCwgdGhpcy5jYW1lcmEueSwgc1dpZHRoLCBzSGVpZ2h0LCAwLCAwLCBzV2lkdGgsIHNIZWlnaHQpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgV29ybGQ7XHJcbiIsIi8qXG4gIFNvdXJjZXM6XG4gIGh0dHA6Ly93d3cubG9zdGRlY2FkZWdhbWVzLmNvbS9ob3ctdG8tbWFrZS1hLXNpbXBsZS1odG1sNS1jYW52YXMtZ2FtZS9cbiAgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDAzNzIxMi9odG1sLWNhbnZhcy1mdWxsLXNjcmVlbj91dG1fbWVkaXVtPW9yZ2FuaWMmdXRtX3NvdXJjZT1nb29nbGVfcmljaF9xYSZ1dG1fY2FtcGFpZ249Z29vZ2xlX3JpY2hfcWFcbiAgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTY5MTk2MDEvaHRtbDUtY2FudmFzLXdvcmxkLmNhbWVyYS12aWV3cG9ydC1ob3ctdG8tYWN0YWxseS1kby1pdD91dG1fbWVkaXVtPW9yZ2FuaWMmdXRtX3NvdXJjZT1nb29nbGVfcmljaF9xYSZ1dG1fY2FtcGFpZ249Z29vZ2xlX3JpY2hfcWFcbiAgaHR0cDovL2pzZmlkZGxlLm5ldC9nZmNhcnYvUUtnSHMvXG4gKi9cblxuaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lL0dhbWUuanMnO1xuXG5sZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxubGV0IGdhbWUgPSBuZXcgR2FtZShjYW52YXMsIGRvY3VtZW50LmJvZHkpO1xuXG5sZXQgbWFpbiA9ICgpID0+IHtcbiAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBsZXQgZGVsdGEgPSBub3cgLSB0aGVuO1xuXG4gICAgZ2FtZS51cGRhdGUoZGVsdGEgLyAxMDAwKTtcbiAgICBnYW1lLmRyYXcoKTtcblxuICAgIHRoZW4gPSBub3c7XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobWFpbik7XG59O1xuXG4vLyBDcm9zcy1icm93c2VyIHN1cHBvcnQgZm9yIHJlcXVlc3RBbmltYXRpb25GcmFtZVxucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXG5sZXQgdGhlbiA9IERhdGUubm93KCk7XG5tYWluKCk7XG4iLCJpbXBvcnQgR3JvdW5kV2VhcG9uIGZyb20gJy4vR3JvdW5kV2VhcG9uLmpzJztcclxuaW1wb3J0IEFzc2F1bHRSaWZsZSBmcm9tICcuLi9XZWFwb25zL0Fzc2F1bHRSaWZsZS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIEdyb3VuZEFzc2F1bHRSaWZsZSBjbGFzcyBleHRlbmRzIHRoZSBHcm91bmRXZWFwb24gY2xhc3MuXHJcbiAqL1xyXG5jbGFzcyBHcm91bmRBc3NhdWx0UmlmbGUgZXh0ZW5kcyBHcm91bmRXZWFwb24ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBsZXQgd2VhcG9uID0gbmV3IEFzc2F1bHRSaWZsZSgpO1xyXG4gICAgICAgIHN1cGVyKHgsIHksIHdlYXBvbik7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvR3JvdW5kQXNzYXVsdFJpZmxlLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3JvdW5kQXNzYXVsdFJpZmxlO1xyXG4iLCJpbXBvcnQgR3JvdW5kV2VhcG9uIGZyb20gJy4vR3JvdW5kV2VhcG9uLmpzJztcclxuaW1wb3J0IEZsYW1ldGhyb3dlciBmcm9tICcuLi9XZWFwb25zL0ZsYW1ldGhyb3dlci5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIEdyb3VuZEFzc2F1bHRSaWZsZSBjbGFzcyBleHRlbmRzIHRoZSBHcm91bmRXZWFwb24gY2xhc3MuXHJcbiAqL1xyXG5jbGFzcyBHcm91bmRGbGFtZXRocm93ZXIgZXh0ZW5kcyBHcm91bmRXZWFwb24ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBsZXQgd2VhcG9uID0gbmV3IEZsYW1ldGhyb3dlcigpO1xyXG4gICAgICAgIHN1cGVyKHgsIHksIHdlYXBvbik7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvR3JvdW5kRmxhbWV0aHJvd2VyLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBHcm91bmRGbGFtZXRocm93ZXI7XHJcbiIsImltcG9ydCBHcm91bmRXZWFwb24gZnJvbSAnLi9Hcm91bmRXZWFwb24uanMnO1xyXG5pbXBvcnQgU2hvdGd1biBmcm9tICcuLi9XZWFwb25zL1Nob3RndW4uanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBHcm91bmRBc3NhdWx0UmlmbGUgY2xhc3MgZXh0ZW5kcyB0aGUgR3JvdW5kV2VhcG9uIGNsYXNzLlxyXG4gKi9cclxuY2xhc3MgR3JvdW5kU2hvdGd1biBleHRlbmRzIEdyb3VuZFdlYXBvbiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIGxldCB3ZWFwb24gPSBuZXcgU2hvdGd1bigpO1xyXG4gICAgICAgIHN1cGVyKHgsIHksIHdlYXBvbik7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvR3JvdW5kU2hvdGd1bi5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgR3JvdW5kU2hvdGd1bjtcclxuIiwiaW1wb3J0IEdyb3VuZFdlYXBvbiBmcm9tICcuL0dyb3VuZFdlYXBvbi5qcyc7XHJcbmltcG9ydCBXZWFwb24gZnJvbSAnLi4vV2VhcG9ucy9XZWFwb24uanMnO1xyXG5pbXBvcnQgU25pcGVyIGZyb20gJy4uL1dlYXBvbnMvU25pcGVyLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgR3JvdW5kU25pcGVyIGNsYXNzIGV4dGVuZHMgdGhlIEdyb3VuZFdlYXBvbiBjbGFzcy5cclxuICovXHJcbmNsYXNzIEdyb3VuZFNuaXBlciBleHRlbmRzIEdyb3VuZFdlYXBvbiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIGxldCB3ZWFwb24gPSBuZXcgU25pcGVyKCk7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2VhcG9uKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9Hcm91bmRTbmlwZXIucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHcm91bmRTbmlwZXI7XHJcbiIsImltcG9ydCBHcm91bmRXZWFwb24gZnJvbSAnLi9Hcm91bmRXZWFwb24uanMnO1xyXG5pbXBvcnQgU3Bpa2VUcmFwIGZyb20gJy4uL1dlYXBvbnMvU3Bpa2VUcmFwLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgR3JvdW5kU3Bpa2VUcmFwIGNsYXNzIGV4dGVuZHMgdGhlIEdyb3VuZFdlYXBvbiBjbGFzcy5cclxuICovXHJcbmNsYXNzIEdyb3VuZFNwaWtlVHJhcCBleHRlbmRzIEdyb3VuZFdlYXBvbiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgZ3JvdW5kIHNwaWtlIHRyYXAuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBHcm91bmRXZWFwb25zIGNvbnN0cnVjdG9yXHJcbiAgICAgKiB3aXRoIGEgU3Bpa2VUcmFwIG9iamVjdCBzZXQgYXMgdGhlIHdlYXBvbi5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBncm91bmQgc3Bpa2UgdHJhcC5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBncm91bmQgc3Bpa2UgdHJhcC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIGxldCB3ZWFwb24gPSBuZXcgU3Bpa2VUcmFwKCk7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2VhcG9uKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9Hcm91bmRTcGlrZVRyYXAucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHcm91bmRTcGlrZVRyYXA7XHJcbiIsImltcG9ydCBHcm91bmRXZWFwb24gZnJvbSAnLi9Hcm91bmRXZWFwb24uanMnO1xyXG5pbXBvcnQgVGFyVHJhcCBmcm9tICcuLi9XZWFwb25zL1RhclRyYXAuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBUYXJUcmFwIGNsYXNzIGV4dGVuZHMgdGhlIEdyb3VuZFdlYXBvbiBjbGFzcy5cclxuICovXHJcbmNsYXNzIEdyb3VuZFRhclRyYXAgZXh0ZW5kcyBHcm91bmRXZWFwb24ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIGdyb3VuZCB0YXIgdHJhcC4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEdyb3VuZFdlYXBvbnMgY29uc3RydWN0b3JcclxuICAgICAqIHdpdGggYSBUYXJUcmFwIG9iamVjdCBzZXQgYXMgdGhlIHdlYXBvbi5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBncm91bmQgdGFyIHRyYXAuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgZ3JvdW5kIHRhciB0cmFwLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgbGV0IHdlYXBvbiA9IG5ldyBUYXJUcmFwKCk7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2VhcG9uKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9Hcm91bmRUYXJUcmFwLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3JvdW5kVGFyVHJhcDtcclxuIiwiY2xhc3MgR3JvdW5kV2VhcG9uIHtcclxuICAgIC8veCA9IHRoZSB4IHBvc2l0aW9uIG9mIHRoZSBncm91bmQgd2VhcG9uXHJcbiAgICAvL3kgPSB0aGUgeSBwb3NpdGlvbiBvZiB0aGUgZ3JvdW5kIHdlYXBvblxyXG4gICAgLy93ZWFwb24gID0gdGhlIHdlYXBvbiBvYmplY3QgdGhhdCB3aWxsIGJlIGFkZGVkIHRvIHRoZSBwbGF5ZXIncyBpbnZlbnRvcnlcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIHdlYXBvbikge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLndlYXBvbiA9IHdlYXBvbjtcclxuICAgIH1cclxuICAgIHNldFBvc2l0aW9uKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbiAgICBsb2FkSW1hZ2UodXJsKSB7XHJcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICBhcnJheSA9IHRoZSBhcnJheSB0aGF0IHRoZSB3ZXBhb24gb2JqZWN0IHN0b3JlZCBpbiB0aGlzIEdyb3VuZFdlYXBvbiB3aWxsIGJlIHB1c2hlZCBpbnRvLiBUaGlzIG1ldGhvZCBpcyB0byBiZSB1c2VkIHdpdGggYSBwbGF5ZXIncyBpbnZlbnRvcnkuXHJcbiAgICAqL1xyXG4gICAgYWRkV2VhcG9uKGFycmF5KXtcclxuICAgICAgYXJyYXkucHVzaCh0aGlzLndlYXBvbik7XHJcbiAgICB9XHJcbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEdyb3VuZFdlYXBvbjtcclxuIiwiY2xhc3MgSGVhbHRoUGFjayB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLmhlYWxpbmcgPSAxMDA7XHJcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRJbWFnZSgpIHtcclxuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSAnR3JhcGhpY3MvSGVhbHRoUGFjay5wbmcnO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhlYWx0aFBhY2s7XHJcbiIsIi8qKlxyXG4gKiBUaGUgUGxhY2VkVHJhcCBjbGFzcyBpcyB0aGUgcGFyZW50IGZvciBhbGwgcGxhY2VkIHRyYXBzLlxyXG4gKi9cclxuY2xhc3MgUGxhY2VkVHJhcCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgUGxhY2VkVHJhcC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBQbGFjZWRUcmFwLlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFBsYWNlZFRyYXAuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBwbGFjZWQgdHJhcCBnaXZlbiB4IGFuZCB5LlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gdG8gYmUgc2V0LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gdG8gYmUgc2V0LlxyXG4gICAgICovXHJcbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiB0YWtlcyBpbiBhIHVybCBhbmQgbG9hZHMgaXQgYXMgYW4gSW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0ltYWdlTG9hZGVkIGlzXHJcbiAgICAgKiBzZXQgdG8gdHJ1ZS4gVGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIFBsYWNlZFRyYXAgYXJlIHNldCB0byB0aGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgaW1hZ2UuXHJcbiAgICAgKiBAcGFyYW0gdXJsIFRoZSB1cmwgdGhhdCBzaG91bGQgYmUgbG9hZGVkLlxyXG4gICAgICovXHJcbiAgICBsb2FkSW1hZ2UodXJsKSB7XHJcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRyYXcgZnVuY3Rpb24gZHJhd3MgdGhlIGltYWdlIG9uIHRoZSBjYW52YXMgYXQgdGhlIHggYW5kIHkgcG9zaXRpb24gb2YgdGhlIFBsYWNlZFRyYXAuXHJcbiAgICAgKiBAcGFyYW0gY3R4IFRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gY2FtZXJhIFRoZSBjYW1lcmEgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGFjZWRUcmFwO1xyXG4iLCJpbXBvcnQgUGxhY2VkVHJhcCBmcm9tICcuL1BsYWNlZFRyYXAuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBTcGlrZVRyYXBQbGFjZWQgY2xhc3MgZXh0ZW5kcyB0aGUgUGxhY2VkVHJhcCBjbGFzcy5cclxuICovXHJcbmNsYXNzIFNwaWtlVHJhcFBsYWNlZCBleHRlbmRzIFBsYWNlZFRyYXAge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFNwaWtlVHJhcFBsYWNlZC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBTcGlrZVRyYXBQbGFjZWQuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgU3Bpa2VUcmFwUGxhY2VkLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvU3Bpa2VUcmFwLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3Bpa2VUcmFwUGxhY2VkOyIsImltcG9ydCBQbGFjZWRUcmFwIGZyb20gJy4vUGxhY2VkVHJhcC5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIFRhclRyYXBQbGFjZWQgY2xhc3MgZXh0ZW5kcyB0aGUgUGxhY2VkVHJhcCBjbGFzcy5cclxuICovXHJcbmNsYXNzIFRhclRyYXBQbGFjZWQgZXh0ZW5kcyBQbGFjZWRUcmFwIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBUYXJUcmFwUGxhY2VkLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFRhclRyYXBQbGFjZWQuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgVGFyVHJhcFBsYWNlZC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHkpO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1RhclRyYXAucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYXJUcmFwUGxhY2VkOyIsIi8qXHJcbiAgU291cmNlczpcclxuICBodHRwOi8vanNmaWRkbGUubmV0L2dmY2Fydi9RS2dIcy9cclxuKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgQ2FtZXJhIGNsYXNzIGlzIHVzZWQgdG8gZm9sbG93IHRoZSBwbGF5ZXIncyBtb3ZlbWVudC5cclxuICovXHJcbmNsYXNzIENhbWVyYSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgQ2FtZXJhLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIENhbWVyYS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBDYW1lcmEuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzV2lkdGggVGhlIHdpZHRoIG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzSGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSB3b3JsZFdpZHRoIFRoZSB3aWR0aCBvZiB0aGUgd29ybGQuXHJcbiAgICAgKiBAcGFyYW0gd29ybGRIZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgd29ybGQuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQsIHdvcmxkV2lkdGgsIHdvcmxkSGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMueERlYWRab25lID0gMDtcclxuICAgICAgICB0aGlzLnlEZWFkWm9uZSA9IDA7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IGNhbnZhc1dpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gY2FudmFzSGVpZ2h0O1xyXG4gICAgICAgIHRoaXMud29ybGRXaWR0aCA9IHdvcmxkV2lkdGg7XHJcbiAgICAgICAgdGhpcy53b3JsZEhlaWdodCA9IHdvcmxkSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIHNldCB3aG8gdGhlIGNhbWVyYSBpcyBmb2xsb3dpbmcuXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIFRoZSBwbGF5ZXIgdGhhdCB0aGUgY2FtZXJhIHNob3VsZCBmb2xsb3cuXHJcbiAgICAgKiBAcGFyYW0geERlYWRab25lXHJcbiAgICAgKiBAcGFyYW0geURlYWRab25lXHJcbiAgICAgKi9cclxuICAgIGZvbGxvdyhwbGF5ZXIsIHhEZWFkWm9uZSwgeURlYWRab25lKSB7XHJcbiAgICAgICAgdGhpcy5mb2xsb3dpbmcgPSBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy54RGVhZFpvbmUgPSB4RGVhZFpvbmU7XHJcbiAgICAgICAgdGhpcy55RGVhZFpvbmUgPSB5RGVhZFpvbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgdGhlIGNhbWVyYSdzIHggYW5kIHkgcG9zaXRpb24uXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBpZih0aGlzLmZvbGxvd2luZyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZm9sbG93aW5nLnggLSB0aGlzLnggKyB0aGlzLnhEZWFkWm9uZSA+IHRoaXMud2lkdGgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmZvbGxvd2luZy54IC0gKHRoaXMud2lkdGggLSB0aGlzLnhEZWFkWm9uZSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5mb2xsb3dpbmcueCAtIHRoaXMueERlYWRab25lIDwgdGhpcy54KVxyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5mb2xsb3dpbmcueCAtIHRoaXMueERlYWRab25lO1xyXG4gICAgICAgICAgICBpZih0aGlzLmZvbGxvd2luZy55IC0gdGhpcy55ICsgdGhpcy55RGVhZFpvbmUgPiB0aGlzLmhlaWdodClcclxuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuZm9sbG93aW5nLnkgLSAodGhpcy5oZWlnaHQgLSB0aGlzLnlEZWFkWm9uZSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5mb2xsb3dpbmcueSAtIHRoaXMueURlYWRab25lIDwgdGhpcy55KVxyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5mb2xsb3dpbmcueSAtIHRoaXMueURlYWRab25lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnggPCAwKVxyXG4gICAgICAgICAgICB0aGlzLnggPSAwO1xyXG4gICAgICAgIGlmKHRoaXMueSA8IDApXHJcbiAgICAgICAgICAgIHRoaXMueSA9IDA7XHJcbiAgICAgICAgaWYodGhpcy54ICsgdGhpcy53aWR0aCA+IHRoaXMud29ybGRXaWR0aClcclxuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy53b3JsZFdpZHRoIC0gdGhpcy53aWR0aDtcclxuICAgICAgICBpZih0aGlzLnkgKyB0aGlzLmhlaWdodCA+IHRoaXMud29ybGRIZWlnaHQpXHJcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMud29ybGRIZWlnaHQgLSB0aGlzLmhlaWdodDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2FtZXJhOyIsImltcG9ydCBQaXN0b2wgZnJvbSAnLi4vV2VhcG9ucy9QaXN0b2wuanMnXG5pbXBvcnQgU25pcGVyIGZyb20gJy4uL1dlYXBvbnMvU25pcGVyLmpzJ1xuaW1wb3J0IFNob3RndW4gZnJvbSAnLi4vV2VhcG9ucy9TaG90Z3VuLmpzJ1xuaW1wb3J0IEFzc2F1bHRSaWZsZSBmcm9tICcuLi9XZWFwb25zL0Fzc2F1bHRSaWZsZS5qcydcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcblxuY2xhc3MgUGxheWVyIHtcbiAgLy90aGlzLnggPSB4IHBvc2l0aW9uXG4gIC8vdGhpcy55ID0geSBwb3NpdGlvblxuICAvL3RoaXMuaGVhbHRoID0gcGxheWVyJ3MgbGlmZVxuICAvL3RoaXMuc3BlZWQgPSBwbGF5ZXIncyBtb3Zlc3BlZWRcbiAgLy90aGlzLmxvYWRJbWFnZSgpIGlzIGEgZnVuY3Rpb24gdG8gYXR0YWNoIHRoZSBpbWFnZSB0byB0aGUgcGxheWVyLlxuICAvL1RoZSBwbGF5ZXIgaGFzIGFuIGFycmF5IHRvIGhvbGQgaGlzIGl0ZW1zIGFuZCBoZSB3aWxsIHN0YXJ0IHdpdGggYSBwaXN0b2wgYW5kIHNuaXBlciB0aGlzIHdlZWsgZm9yIGVhc3kgdGVzdGluZ1xuICAvL05leHQgd2VlayBpdGVtcyB3aWxsIGJlIHBpY2tlZCB1cCBieSB3YWxraW5nIG92ZXIgdGhlbSBhbmQgYXMgc3VjaCB0aGVyZSB3aWxsIG5lZWQgdG8gYmUgYW4gYWRkSXRlbSBmdW5jdGlvblxuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICB0aGlzLnggPSB4O1xuICAgICAgdGhpcy55ID0geTtcbiAgICAgIHRoaXMuaGVhbHRoID0gMTAwO1xuICAgICAgdGhpcy5zcGVlZCA9IDI1NjtcbiAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgICB0aGlzLmxvYWREYW1hZ2VUYWtlblNvdW5kKCdBdWRpby9EYW1hZ2VUYWtlbi5tcDMnKTtcbiAgICAgIGxldCBzdGFydF9waXN0b2wgPSBuZXcgUGlzdG9sKCk7XG4gICAgICBsZXQgc3RhcnRfc25pcGVyID0gbmV3IFNuaXBlcigpO1xuICAgICAgbGV0IHN0YXJ0X3JpZmxlID0gbmV3IEFzc2F1bHRSaWZsZSgpO1xuICAgICAgbGV0IHN0YXJ0X3Nob3RndW4gPSBuZXcgU2hvdGd1bigpO1xuICAgICAgdGhpcy5pbnZlbnRvcnkgPSBbc3RhcnRfcGlzdG9sXTtcbiAgICAgIHRoaXMuYWN0aXZlX2luZGV4ID0gMDtcbiAgfVxuXG4gICAgaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoVXRpbC5pc0NvbGxpc2lvbihlbnZpcm9ubWVudE9iamVjdHNbaV0sIHRoaXMpICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gIGxvYWRJbWFnZSgpIHtcbiAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgfTtcbiAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gXCJHcmFwaGljcy9QbGF5ZXIucG5nXCI7XG4gIH1cblxuICBsb2FkRGFtYWdlVGFrZW5Tb3VuZCh1cmwpIHtcbiAgICAgIHRoaXMuaXNTb3VuZDFMb2FkZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGFtYWdlVGFrZW5Tb3VuZCA9IG5ldyBBdWRpbygpO1xuICAgICAgdGhpcy5kYW1hZ2VUYWtlblNvdW5kLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzU291bmQxTG9hZGVkID0gdHJ1ZTtcbiAgICAgIH07XG4gICAgICB0aGlzLmRhbWFnZVRha2VuU291bmQuc3JjID0gdXJsO1xuICB9XG5cbiAgICBkcmF3KGN0eCwgY2FtZXJhLCBtb3VzZSkge1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHgudHJhbnNsYXRlKCh0aGlzLngrdGhpcy53aWR0aC8yKSAtIGNhbWVyYS54LCAodGhpcy55K3RoaXMuaGVpZ2h0LzIpIC0gY2FtZXJhLnkpO1xuICAgICAgICBsZXQgYW5nbGUgPSBNYXRoLmF0YW4yKG1vdXNlWzFdIC0gKHRoaXMueSt0aGlzLmhlaWdodC8yLWNhbWVyYS55KSwgbW91c2VbMF0gLSAodGhpcy54K3RoaXMud2lkdGgvMi1jYW1lcmEueCkpO1xuICAgICAgICBjdHgucm90YXRlKGFuZ2xlKyhNYXRoLlBJLzIpKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAwLXRoaXMud2lkdGgvMiwgMC10aGlzLmhlaWdodC8yKTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsIi8qXHJcbiAgU291cmNlczpcclxuICBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0dhbWVzL1RlY2huaXF1ZXMvMkRfY29sbGlzaW9uX2RldGVjdGlvblxyXG4gIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ5NTk5NzUvZ2VuZXJhdGUtcmFuZG9tLW51bWJlci1iZXR3ZWVuLXR3by1udW1iZXJzLWluLWphdmFzY3JpcHRcclxuKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgVXRpbCBjbGFzcyBjb250YWlucyB2YXJpb3VzIHV0aWxpdHkgZnVuY3Rpb25zLlxyXG4gKi9cclxuY2xhc3MgVXRpbCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgaXNDb2xsaXNpb24gbWV0aG9kIGNoZWNrcyBpZiB0aGVyZSBpcyBhIGNvbGxpc2lvbiBiZXR3ZWVuIHRoZSB0d28gaW5wdXR0ZWQgcmVjdGFuZ2xlcy4gVGhpcyBhbGdvcml0aG0gb25seVxyXG4gICAgICogd29ya3Mgd2l0aCBheGlzLWFsaWduZWQgcmVjdGFuZ2xlcy5cclxuICAgICAqIEBwYXJhbSByZWN0YW5nbGUxIFRoZSBmaXJzdCByZWN0YW5nbGUuXHJcbiAgICAgKiBAcGFyYW0gcmVjdGFuZ2xlMiBUaGUgc2Vjb25kIHJlY3RhbmdsZS5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIHRoZXJlIGV4aXN0cyBhIGNvbGxpc2lvbiBiZXR3ZWVuIHRoZSB0d28gaW5wdXR0ZWQgcmVjdGFuZ2xlcy5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzQ29sbGlzaW9uKHJlY3RhbmdsZTEsIHJlY3RhbmdsZTIpIHtcclxuICAgICAgICBpZihyZWN0YW5nbGUxLnggPCByZWN0YW5nbGUyLnggKyByZWN0YW5nbGUyLndpZHRoICYmXHJcbiAgICAgICAgICAgIHJlY3RhbmdsZTEueCArIHJlY3RhbmdsZTEud2lkdGggPiByZWN0YW5nbGUyLnggJiZcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMS55IDwgcmVjdGFuZ2xlMi55ICsgcmVjdGFuZ2xlMi5oZWlnaHQgJiZcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMS55ICsgcmVjdGFuZ2xlMS5oZWlnaHQgPiByZWN0YW5nbGUyLnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgdGhlcmUgYXJlIGFueSBjb2xsaXNpb25zIGJldHdlZW4gdGhlIHR3byBhcnJheXMuIFRoaXMgYWxnb3JpdGhtIG9ubHkgd29ya3Mgd2l0aFxyXG4gICAgICogYXhpcy1hbGlnbmVkIHJlY3RhbmdsZXMuXHJcbiAgICAgKiBAcGFyYW0gYXJyYXkxIEFuIGFycmF5IG9mIHJlY3RhbmdsZXMuXHJcbiAgICAgKiBAcGFyYW0gYXJyYXkyIEFuIGFycmF5IG9mIHJlY3RhbmdsZXMuXHJcbiAgICAgKiBAcmV0dXJucyB7aW50ZWdlcn0gLTEgaWYgdGhlcmUgYXJlIG5vIGNvbGxpc2lvbnMgb3IgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBhcnJheSBpZiB0aGVyZSBpcy5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFyZUFueUNvbGxpc2lvbnMoYXJyYXkxLCBhcnJheTIpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyYXkxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBhcnJheTIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb24oYXJyYXkxW2ldLCBhcnJheTJbal0pKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYXJlQW55Q29sbGlzaW9uc0luU2FtZUFycmF5KGFycmF5KSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBhcnJheS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoaSAhPT0gaikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb24oYXJyYXlbaV0sIGFycmF5W2pdKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgcmFuZG9tIG51bWJlciBpbiB0aGUgZ2l2ZW4gaW50ZXJ2YWwuXHJcbiAgICAgKiBAcGFyYW0gZnJvbVxyXG4gICAgICogQHBhcmFtIHRvXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmFuZG9tSW50RnJvbUludGVydmFsKGZyb20sIHRvKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0byAtIGZyb20gKyAxKSArIGZyb20pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFV0aWw7IiwiaW1wb3J0IFdlYXBvbiBmcm9tICcuL1dlYXBvbi5qcyc7XHJcblxyXG5jbGFzcyBBc3NhdWx0UmlmbGUgZXh0ZW5kcyBXZWFwb257XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKDUsIDMwLCAuMSk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJBc3NhdWx0IFJpZmxlXCI7XHJcbiAgICAgICAgc3VwZXIubG9hZFNob290U291bmQoJ0F1ZGlvL1JpZmxlU2hvdC5tcDMnKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBBc3NhdWx0UmlmbGU7XHJcbiIsImltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcblxuY2xhc3MgQnVsbGV0e1xuICAgIGNvbnN0cnVjdG9yKHZlbG9jaXR5LCBkYW1hZ2UsIHgsIHksIGRlc3RYLCBkZXN0WSwgcGVuZXRyYXRlcykge1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdmVsb2NpdHk7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLmRlc3RYID0gZGVzdFg7XG4gICAgICAgIHRoaXMuZGVzdFkgPSBkZXN0WTtcbiAgICAgICAgdGhpcy5saXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc1BlbmV0cmF0aW5nID0gcGVuZXRyYXRlcztcbiAgICAgICAgbGV0IGRpZmZYID0gdGhpcy5kZXN0WCAtIHRoaXMueDtcbiAgICAgICAgbGV0IGRpZmZZID0gdGhpcy5kZXN0WSAtIHRoaXMueTtcbiAgICAgICAgdGhpcy5saXZlVGltZSA9IDA7XG4gICAgICAgIC8vVGhpcyBsb2dpYyBmaW5kcyBhIGNvZWZmaWNpZW50IGZvciBYIGFuZCBZIHRoYXQgY2FuIGJlIGFwcGxpZWRcbiAgICAgICAgLy90byB0aGUgbW92ZSBmdW5jdGlvbiBpbiBvcmRlciB0byBtb3ZlIHRoZSBidWxsZXQgaW4gYSBzdHJhaWdodCBsaW5lXG4gICAgICAgIC8vZGlyZWN0bHkgdG8gaXRzIGRlc3RpbmF0aW9uLlxuICAgICAgICBpZihNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpIHtcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWCk7XG4gICAgICAgICAgICB0aGlzLmNvZWZmWSA9IGRpZmZZIC8gTWF0aC5hYnMoZGlmZlgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb2VmZlkgPSBkaWZmWSAvIE1hdGguYWJzKGRpZmZZKTtcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9hZEltYWdlKHVybCkge1xuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xuICAgIH1cbiAgICAvL01vdmVzIHRoZSBidWxsZXQgZnJvbSBpdHMgc3RhcnRpbmcgcG9pbnQgKHdoaWNoIHdpbGwgYmUgdGhlIHBsYXllcidzIGxvY2F0aW9uKVxuICAgIC8vdG8gaXRzIGRlc3RpbmF0aW9uICh3aGljaCB3aWxsIGJlIHRoZSBjdXJzb3IgbG9jYXRpb24gd2hlbiB0aGUgYnVsbGV0IGlzIGNyZWF0ZWQpLlxuICAgIC8vRWFjaCB0aW1lIG1vdmUgaXMgY2FsbGVkIGl0IGlzIGNoZWNrZWQgaWYgdGhlIGJ1bGxldCBoaXRzIGFueXRoaW5nLCBpZiBpdCBkb2VzIHRoZVxuICAgIC8vaGl0U29tZXRoaW5nIG1ldGhvZCB3aWxsIGNhbGwgYSBkYW1hZ2UgZnVuY3Rpb24gYW5kIHRoZSBkYW1hZ2Ugd2lsbCBiZSBhcHBsaWVkLCBzb1xuICAgIC8vdGhpcyBmdW5jdGlvbiBzZXRzIHRoaXMubGl2ZSA9IGZhbHNlIG1lYW5pbmcgdGhlIGJ1bGxldCBpcyBubyBsb25nZXIgbGl2ZS5cbiAgICAvL0lmIHRoZSBidWxsZXQgaXNQZW5ldHJhdGluZyB0aGF0IG1lYW5zIGl0IHdpbGwgbm90IGJlIHNldCB0byAnZGVhZCcgdXBvbiBhIGNvbGxpc2lvbiB3aXRoIHNvbWV0aGluZ1xuICAgIC8vVGhpcyBhbGxvd3MgcGVuZXRyYXRpbmcgYnVsbGV0cyB0byB0cmF2ZWwgdGhyb3VnaCBtdWx0aXBsZSB0YXJnZXRzIGFuZCB0aHJvdWdoIHdvcmxkIG9iamVjdHMuXG4gICAgbW92ZShtb2RpZmllciwgZW52aXJvbm1lbnRPYmplY3RzLCBlbmVtaWVzKXtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXIqdGhpcy5jb2VmZlg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyKnRoaXMuY29lZmZZO1xuICAgICAgICB0aGlzLmxpdmVUaW1lICs9IG1vZGlmaWVyO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxpdmVUaW1lKTtcbiAgICAgICAgaWYodGhpcy5oaXRTb21ldGhpbmcoZW52aXJvbm1lbnRPYmplY3RzLCBlbmVtaWVzKSAmJiB0aGlzLmlzUGVuZXRyYXRpbmcgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMueCA8IDAgfHwgdGhpcy54ID4gMTAwMDAgfHwgdGhpcy55IDwgMCB8fCB0aGlzLnkgPiA1NjI1KSB7XG4gICAgICAgICAgICB0aGlzLmxpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmxpdmVUaW1lID4gLjUgJiYgdGhpcy5pc1BlbmV0cmF0aW5nID09IGZhbHNlKXtcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vQ2hlY2tzIGlmIHRoZSBidWxsZXQgaGl0IGFueSBvZiBvdXIgb2JqZWN0cyB0aGF0IGNhbiBiZSBoaXQsIGlmIHNvIHRoYXQgb2JqZWN0IGxvc2VzIEhQXG4gICAgLy9hbmQgdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB0byBpbmRpY2F0ZSB0aGF0IHRoZSBvYmplY3Qgd2FzIGhpdC4gSWYgbm90LCBmYWxzZSBpcyByZXR1cm5lZFxuICAgIC8vYW5kIG5vdGhpbmcgaXMgZG9uZS5cbiAgICBkYW1hZ2VFbmVteShlbmVteU9iamVjdCkge1xuICAgICAgICBlbmVteU9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XG4gICAgfVxuXG4gICAgZGFtYWdlRW52aXJvbm1lbnQoZW52aXJvbm1lbnRPYmplY3Qpe1xuICAgICAgICBlbnZpcm9ubWVudE9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XG4gICAgfVxuICAgIC8vQ2hlY2tzIGlmIHdlIGhpdCBhbiBlbnZpcm9ubWVudCBvYmplY3QgdGhlbiBjaGVja3MgaWYgd2UgaGl0IGFuIGVuZW15LiBpbiBlaXRoZXIgY2FzZSBpdCBjYWxscyB0aGVcbiAgICAvL2NvcnJlc3BvbmRpbmcgZGFtYWdlIGZ1bmN0aW9uIGFuZCB0aGVuIHJldHVybnMgdHJ1ZSB0byBpbmRpY2F0ZSB0aGF0IHNvbWV0aGluZyB3YXMgaGl0LCB3aGljaCB0ZWxscyBtb3ZlIHRvIHNldCB0aGVcbiAgICAvL2J1bGxldCdzIGxpdmUgdmFsdWUgYWNjb3JkaW5nbHlcbiAgICBoaXRTb21ldGhpbmcoZW52aXJvbm1lbnRPYmplY3RzLCBlbmVtaWVzKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgZW52aXJvbm1lbnRPYmplY3RzW2ldKSAmJiBlbnZpcm9ubWVudE9iamVjdHNbaV0uaXNCbG9ja2luZykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlRW52aXJvbm1lbnQoZW52aXJvbm1lbnRPYmplY3RzW2ldKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZW5lbWllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbmVtaWVzW2ldKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VFbmVteShlbmVtaWVzW2ldKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ7XG4iLCJpbXBvcnQgQnVsbGV0IGZyb20gJy4vQnVsbGV0LmpzJztcclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG5cclxuLy9UaGUgNTAgY2FsaWJlciB3aWxsIHBlbmV0cmF0ZSB0aHJvdWdoIG9iamVjdHMgYW5kIG9ubHkgc3RvcHMgYmVpbmcgbGl2ZVxyXG4vL29uY2UgaXQgZXhpdHMgdGhlIGNhbnZhcywgc28gaXRzIGRhbWFnZSBpcyBzZXQgdG8gYSBzbWFsbCBudW1iZXIgYXMgaXQgZGVhbHNcclxuLy9kYW1hZ2UgZHVyaW5nIGVhY2ggZnJhbWUgYXMgaXQgcGVuZXRyYXRlcyB0aGUgb2JqZWN0IG9yIGVuZW15XHJcbmNsYXNzIEJ1bGxldDEyR2F1Z2UgZXh0ZW5kcyBCdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgZGVzdFgsIGRlc3RZKSB7XHJcbiAgICAgICAgc3VwZXIoMTAwMCwgOCwgeCwgeSwgZGVzdFgsIGRlc3RZLCBmYWxzZSk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvYnVsbGV0My5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQnVsbGV0MTJHYXVnZTtcclxuIiwiaW1wb3J0IEJ1bGxldCBmcm9tICcuL0J1bGxldC5qcyc7XHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbi8vVGhlIDUwIGNhbGliZXIgd2lsbCBwZW5ldHJhdGUgdGhyb3VnaCBvYmplY3RzIGFuZCBvbmx5IHN0b3BzIGJlaW5nIGxpdmVcclxuLy9vbmNlIGl0IGV4aXRzIHRoZSBjYW52YXMsIHNvIGl0cyBkYW1hZ2UgaXMgc2V0IHRvIGEgc21hbGwgbnVtYmVyIGFzIGl0IGRlYWxzXHJcbi8vZGFtYWdlIGR1cmluZyBlYWNoIGZyYW1lIGFzIGl0IHBlbmV0cmF0ZXMgdGhlIG9iamVjdCBvciBlbmVteVxyXG5jbGFzcyBCdWxsZXQ1MGNhbCBleHRlbmRzIEJ1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBkZXN0WCwgZGVzdFkpIHtcclxuICAgICAgICBzdXBlcigyNTAwLCA3LCB4LCB5LCBkZXN0WCwgZGVzdFksIHRydWUpO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL2J1bGxldDMucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ1MGNhbDtcclxuIiwiaW1wb3J0IEJ1bGxldCBmcm9tICcuL0J1bGxldC5qcyc7XHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbi8vVGhlIDUwIGNhbGliZXIgd2lsbCBwZW5ldHJhdGUgdGhyb3VnaCBvYmplY3RzIGFuZCBvbmx5IHN0b3BzIGJlaW5nIGxpdmVcclxuLy9vbmNlIGl0IGV4aXRzIHRoZSBjYW52YXMsIHNvIGl0cyBkYW1hZ2UgaXMgc2V0IHRvIGEgc21hbGwgbnVtYmVyIGFzIGl0IGRlYWxzXHJcbi8vZGFtYWdlIGR1cmluZyBlYWNoIGZyYW1lIGFzIGl0IHBlbmV0cmF0ZXMgdGhlIG9iamVjdCBvciBlbmVteVxyXG5jbGFzcyBCdWxsZXQ1NTYgZXh0ZW5kcyBCdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgZGVzdFgsIGRlc3RZKSB7XHJcbiAgICAgICAgc3VwZXIoMjAwMCwgMTIsIHgsIHksIGRlc3RYLCBkZXN0WSwgZmFsc2UpO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL2J1bGxldDMucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEJ1bGxldDU1NjtcclxuIiwiaW1wb3J0IEJ1bGxldCBmcm9tICcuL0J1bGxldC5qcyc7XHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuLy90aGUgOW1tIGJ1bGxldCBpcyBhIHNpbXBsZSBwaXN0b2wgYnVsbGV0IHRoYXQgd2lsbCBiZSBpbiB0aGVcclxuLy91c2VyJ3Mgc3RhcnRpbmcgd2VhcG9uLiBpdCBkb2VzIG1pbmltYWwgZGFtYWdlIGFuZCBtb3ZlcyBhdCBhIHNsb3cgc3BlZWQuXHJcbi8vdGhlIHZhbHVlIG9mIGlzUGVuZXRyYXRpbmcgaXMgc2V0IHRvIGZhbHNlIHRvIGluZGljYXRlIHRoZSBidWxsZXQgc2hvdWxkXHJcbi8vbm90IGJlIGxpdmUgYWZ0ZXIgaXQgY29sbGlkZXMgd2l0aCBzb21ldGhpbmcgYW5kIGRvZXMgaXRzIGRhbWFnZS5cclxuLy9pbiB0aGUgZnV0dXJlIHRoZSBidWxsZXQgd2lsbCBoYXZlIGEgbWF4aW11bSByYW5nZS9saXZlIHRpbWUgdG9cclxuLy9saW1pdCBpdHMgdXNlZnVsbmVzcyBtb3JlLlxyXG5jbGFzcyBCdWxsZXQ5bW0gZXh0ZW5kcyBCdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgZGVzdFgsIGRlc3RZKSB7XHJcbiAgICAgICAgc3VwZXIoMTAwMCwgMTAsIHgsIHksIGRlc3RYLCBkZXN0WSwgZmFsc2UpO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL2J1bGxldDMucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ5bW07XHJcbiIsImltcG9ydCBCdWxsZXQgZnJvbSAnLi9CdWxsZXQuanMnO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vL1RoZSA1MCBjYWxpYmVyIHdpbGwgcGVuZXRyYXRlIHRocm91Z2ggb2JqZWN0cyBhbmQgb25seSBzdG9wcyBiZWluZyBsaXZlXHJcbi8vb25jZSBpdCBleGl0cyB0aGUgY2FudmFzLCBzbyBpdHMgZGFtYWdlIGlzIHNldCB0byBhIHNtYWxsIG51bWJlciBhcyBpdCBkZWFsc1xyXG4vL2RhbWFnZSBkdXJpbmcgZWFjaCBmcmFtZSBhcyBpdCBwZW5ldHJhdGVzIHRoZSBvYmplY3Qgb3IgZW5lbXlcclxuY2xhc3MgQnVsbGV0RmlyZSBleHRlbmRzIEJ1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBkZXN0WCwgZGVzdFkpIHtcclxuICAgICAgICBzdXBlcig1MDAsIDIsIHgsIHksIGRlc3RYLCBkZXN0WSwgZmFsc2UpO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0ZpcmUucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEJ1bGxldEZpcmU7XHJcbiIsImltcG9ydCBXZWFwb24gZnJvbSAnLi9XZWFwb24uanMnO1xyXG5cclxuY2xhc3MgRmxhbWV0aHJvd2VyIGV4dGVuZHMgV2VhcG9ue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcig4LCAzMiwgLjA1KTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIkZsYW1ldGhyb3dlclwiO1xyXG4gICAgICAgIHN1cGVyLmxvYWRTaG9vdFNvdW5kKCdBdWRpby9GbGFtZXRocm93ZXJTb3VuZC5tcDMnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmxhbWV0aHJvd2VyO1xyXG4iLCIvL1RoZSBzbmlwZXIgaXMgb25seSBjdXJyZW50bHkgdXNlZCB0byBkZXRlcm1pbmUgdGhlIHR5cGUgb2YgYnVsbGV0IHRvIGJlIGdlbmVyYXRlZFxuLy9pbiBtYWluLmpzJyBldmVudCBoYW5kbGVyIGZvciBjbGlja3Ncbi8vSW4gdGhlIGZ1dHVyZSBpdCB3aWxsIGNvbnRyb2wgZmlyZSByYXRlIGFuZCB0aGUgYW1tbyBjYXBhY2l0eS5cbmltcG9ydCBXZWFwb24gZnJvbSAnLi9XZWFwb24uanMnO1xuXG5jbGFzcyBQaXN0b2wgZXh0ZW5kcyBXZWFwb257XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoMTUsIDkwLCAuNCk7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiUGlzdG9sXCI7XG4gICAgICAgIHN1cGVyLmxvYWRTaG9vdFNvdW5kKCdBdWRpby9QaXN0b2xTaG90Lm1wMycpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGlzdG9sO1xuIiwiaW1wb3J0IFdlYXBvbiBmcm9tICcuL1dlYXBvbi5qcyc7XHJcblxyXG5jbGFzcyBTaG90Z3VuIGV4dGVuZHMgV2VhcG9ue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcig4LCAzMiwgMSk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJTaG90Z3VuXCI7XHJcbiAgICAgICAgc3VwZXIubG9hZFNob290U291bmQoJ0F1ZGlvL1Nob3RndW5TaG90Lm1wMycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaG90Z3VuO1xyXG4iLCIvL1RoZSBzbmlwZXIgaXMgb25seSBjdXJyZW50bHkgdXNlZCB0byBkZXRlcm1pbmUgdGhlIHR5cGUgb2YgYnVsbGV0IHRvIGJlIGdlbmVyYXRlZFxyXG4vL2luIG1haW4uanMnIGV2ZW50IGhhbmRsZXIgZm9yIGNsaWNrc1xyXG4vL0luIHRoZSBmdXR1cmUgaXQgd2lsbCBjb250cm9sIGZpcmUgcmF0ZSBhbmQgdGhlIGFtbW8gY2FwYWNpdHkuXHJcbmltcG9ydCBXZWFwb24gZnJvbSAnLi9XZWFwb24uanMnO1xyXG5cclxuY2xhc3MgU25pcGVyIGV4dGVuZHMgV2VhcG9ue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcig1LCAzMCwgMS43NSk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJTbmlwZXJcIjtcclxuICAgICAgICBzdXBlci5sb2FkU2hvb3RTb3VuZCgnQXVkaW8vU25pcGVyU2hvdC5tcDMnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU25pcGVyO1xyXG4iLCJpbXBvcnQgV2VhcG9uIGZyb20gJy4vV2VhcG9uLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgU3Bpa2VUcmFwIGNsYXNzIGV4dGVuZHMgdGhlIFdlYXBvbiBjbGFzcy5cclxuICovXHJcbmNsYXNzIFNwaWtlVHJhcCBleHRlbmRzIFdlYXBvbiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgU3Bpa2VUcmFwLiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgV2VhcG9uIGNsYXNzZXMgY29uc3RydWN0b3IuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMubmFtZSA9ICdTcGlrZSBUcmFwJztcclxuICAgICAgICBzdXBlci5sb2FkU2hvb3RTb3VuZCgnQXVkaW8vU3Bpa2VUcmFwLm1wMycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcGlrZVRyYXA7XHJcbiIsImltcG9ydCBXZWFwb24gZnJvbSAnLi9XZWFwb24uanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBUYXJUcmFwIGNsYXNzIGV4dGVuZHMgdGhlIFdlYXBvbiBjbGFzcy5cclxuICovXHJcbmNsYXNzIFRhclRyYXAgZXh0ZW5kcyBXZWFwb24ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFRhclRyYXAuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBXZWFwb24gY2xhc3NlcyBjb25zdHJ1Y3Rvci5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gJ1RhciBUcmFwJztcclxuICAgICAgICBzdXBlci5sb2FkU2hvb3RTb3VuZCgnQXVkaW8vVGFyVHJhcC5tcDMnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFyVHJhcDtcclxuIiwiLy9jbGlwU2l6ZSBhbmQgYW1tbyB3aWxsIGJlIHVzZWQgYXMgZXhwZWN0ZWQgbmV4dCB3ZWVrXG4vL2F1dG9tYXRpYyB3aWxsIGJlIHVzZWQgYXMgYSBib29sZWFuIGZvciB3aGV0aGVyIG9yIG5vdFxuLy9ob2xkaW5nIGNsaWNrIHNob3VsZCBjb250aW51b3VzbHkgZmlyZS5cbi8vVGhlIG5hbWUgZmllbGQgaXMgdXNlZCBmb3IgdGhlIEhVRCBkaXNwbGF5aW5nIHRoZSBhY3RpdmUgd2VhcG9uLlxuY2xhc3MgV2VhcG9uIHtcblxuICAgIGNvbnN0cnVjdG9yKGNsaXBTaXplLCBtYXhBbW1vLCBtYXhDb29sRG93bikge1xuICAgICAgICB0aGlzLmNsaXBTaXplID0gY2xpcFNpemU7XG4gICAgICAgIHRoaXMubWF4QW1tbyA9IG1heEFtbW87XG4gICAgICAgIHRoaXMubmFtZSA9ICcnO1xuICAgICAgICB0aGlzLmNvb2xkb3duID0gMDtcbiAgICAgICAgdGhpcy5tYXhDb29sRG93biA9IG1heENvb2xEb3duO1xuICAgIH1cbiAgICBsb2FkU2hvb3RTb3VuZCh1cmwpIHtcbiAgICAgICAgdGhpcy5pc1NvdW5kTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc291bmQgPSBuZXcgQXVkaW8oKTtcbiAgICAgICAgdGhpcy5zb3VuZC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzU291bmRMb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNvdW5kLnNyYyA9IHVybDtcbiAgICB9XG4gICAgYWRkQ29vbGRvd24oKXtcbiAgICAgIHRoaXMuY29vbGRvd24gKz0gdGhpcy5tYXhDb29sRG93bjtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2VhcG9uO1xuIl19
