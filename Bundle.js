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
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Sources:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://medium.com/@yuribett/javascript-abstract-method-with-es6-5dbea4b00027
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://www.youtube.com/watch?v=I5dARpAPlNk
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Util = require("../Utilities/Util.js");

var _Util2 = _interopRequireDefault(_Util);

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
    }

    /**
     * The loadImage function takes in a url and loads it as an Image. Once the image is loaded, this.isImageLoaded is
     * set to true. The height and width of the Enemy are set to the height and width of the image.
     * @param url The url that should be loaded.
     */


    _createClass(Enemy, [{
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
         * The attack function takes in an object and removes the amount of damage the Enemy deals from their health.
         * 500 is added to the attack cooldown of the enemy after an attack.
         * @param object The object that is being attacked.
         */

    }, {
        key: "attack",
        value: function attack(object) {
            object.health -= this.damage;
            this.attackCooldown += 500;
        }

        /**
         * Moves the enemy towards the player.
         * @param player The player object to move towards.
         * @param modifier The modifier to be multiplied by the velocity.
         * @param environmentObjects An array of environment objects.
         */

    }, {
        key: "move",
        value: function move(player, modifier, environmentObjects, camera) {
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
            this.x += this.velocity * modifier * coeffX;
            this.y += this.velocity * modifier * coeffY;

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
        key: "setPosition",
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
        key: "isCollisionWithEnvironmentObject",
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
         * The draw function draws the image on the canvas at the x and y position of the LightEnemy.
         * @param ctx The context of the canvas.
         * @param camera The camera object.
         */

    }, {
        key: "draw",
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

},{"../Utilities/Util.js":27}],3:[function(require,module,exports){
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

},{"../Utilities/Util.js":27}],4:[function(require,module,exports){
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
   * the inputted x and y, the velocity set to 512, the health set to 1, the damage set to 100, and the pointsOnKill
   * set to 500.
   * @param x The x position of the ParasiteEnemy.
   * @param y The y position of the ParasiteEnemy.
   */
  function ParasiteEnemy(x, y) {
    _classCallCheck(this, ParasiteEnemy);

    var _this = _possibleConstructorReturn(this, (ParasiteEnemy.__proto__ || Object.getPrototypeOf(ParasiteEnemy)).call(this, x, y, 512, 1, 100, 500));

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
            // remove later - debugging purposes
            // this.ctx.font = "24px sans-serif";
            // this.ctx.fillStyle = '#FFF';
            // this.ctx.fillText('PosX: ' + this.world.player.x, this.canvas.width/2 - 290, 175);
            // this.ctx.strokeText('PosY: ' + this.world.player.y, this.canvas.width/2 - 290, 250);
            // this.ctx.fillText('CameraX: ' + this.world.camera.x, this.canvas.width/2, 175);
            // this.ctx.strokeText('CameraY: ' + this.world.camera.y, this.canvas.width/2, 250);
            // this.ctx.fillText('mouseX: ' + this.controller.mouse[0], this.canvas.width/2 + 350, 175);
            // this.ctx.strokeText('mouseY: ' + this.controller.mouse[1], this.canvas.width/2 + 350, 250);
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
                this.world.enemies[i].move(this.world.player, modifier, this.world.environmentObjects, this.world.camera);
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

},{"../Cursor.js":1,"../Enemies/EnemyProjectile":3,"../Enemies/FinalBoss":4,"../Enemies/MiniBoss":6,"../Enemies/ProjectileEnemy":8,"../Utilities/Util.js":27,"../Weapons/AssaultRifle":28,"../Weapons/Bullet12Gauge":30,"../Weapons/Bullet50cal":31,"../Weapons/Bullet556":32,"../Weapons/Bullet9mm":33,"../Weapons/BulletFire":34,"../Weapons/Flamethrower":35,"../Weapons/Pistol":36,"../Weapons/Shotgun":37,"../Weapons/Sniper":38,"./Controller.js":15,"./World.js":17}],17:[function(require,module,exports){
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
            }for (var _i7 = 0; _i7 < healthPackCap; _i7++) {
                this.pickUps.push(new _Healthpack2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }var selfCollisionFlag = true;
            while (selfCollisionFlag) {
                var _i8 = _Util2.default.areAnyCollisionsInSameArray(this.groundWeapons);
                if (_i8 === -1) selfCollisionFlag = false;else this.groundWeapons[_i8].setPosition(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375));
            }

            selfCollisionFlag = true;
            while (selfCollisionFlag) {
                var _i9 = _Util2.default.areAnyCollisionsInSameArray(this.pickUps);
                if (_i9 === -1) selfCollisionFlag = false;else this.pickUps[_i9].setPosition(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375));
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
                }for (var _i10 = 0; _i10 < regularEnemyCap; _i10++) {
                    this.enemies.push(new _RegularEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
                }for (var _i11 = 0; _i11 < tankEnemyCap; _i11++) {
                    this.enemies.push(new _TankEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
                }for (var _i12 = 0; _i12 < projectileEnemyCap; _i12++) {
                    this.enemies.push(new _ProjectileEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
                }for (var _i13 = 0; _i13 < miniBossCap; _i13++) {
                    this.enemies.push(new _MiniBoss2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
                }for (var _i14 = 0; _i14 < parasiteEnemyCap; _i14++) {
                    this.enemies.push(new _ParasiteEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
                }
            }

            var collisionFlag = true;
            while (collisionFlag === true) {
                var _i15 = _Util2.default.areAnyCollisions(this.enemies, this.environmentObjects);
                if (_i15 === -1) collisionFlag = false;else this.enemies[_i15].setPosition(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375));
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

},{"../Enemies/FinalBoss":4,"../Enemies/LightEnemy":5,"../Enemies/MiniBoss":6,"../Enemies/ParasiteEnemy":7,"../Enemies/ProjectileEnemy":8,"../Enemies/RegularEnemy":9,"../Enemies/TankEnemy":10,"../EnvironmentObjects/Bush":11,"../EnvironmentObjects/Crate":12,"../EnvironmentObjects/Rock":14,"../PickUps/GroundAssaultRifle.js":19,"../PickUps/GroundFlamethrower.js":20,"../PickUps/GroundShotgun.js":21,"../PickUps/GroundSniper.js":22,"../PickUps/Healthpack.js":24,"../Players/Camera":25,"../Players/Player":26,"../Utilities/Util":27}],18:[function(require,module,exports){
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

},{"../Weapons/AssaultRifle.js":28,"./GroundWeapon.js":23}],20:[function(require,module,exports){
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

},{"../Weapons/Flamethrower.js":35,"./GroundWeapon.js":23}],21:[function(require,module,exports){
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

},{"../Weapons/Shotgun.js":37,"./GroundWeapon.js":23}],22:[function(require,module,exports){
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

},{"../Weapons/Sniper.js":38,"../Weapons/Weapon.js":39,"./GroundWeapon.js":23}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{"../Utilities/Util.js":27,"../Weapons/AssaultRifle.js":28,"../Weapons/Pistol.js":36,"../Weapons/Shotgun.js":37,"../Weapons/Sniper.js":38}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{"./Weapon.js":39}],29:[function(require,module,exports){
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

},{"../Utilities/Util.js":27}],30:[function(require,module,exports){
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

},{"../Utilities/Util.js":27,"./Bullet.js":29}],31:[function(require,module,exports){
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

},{"../Utilities/Util.js":27,"./Bullet.js":29}],32:[function(require,module,exports){
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

},{"../Utilities/Util.js":27,"./Bullet.js":29}],33:[function(require,module,exports){
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

},{"../Utilities/Util.js":27,"./Bullet.js":29}],34:[function(require,module,exports){
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

},{"../Utilities/Util.js":27,"./Bullet.js":29}],35:[function(require,module,exports){
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

},{"./Weapon.js":39}],36:[function(require,module,exports){
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

},{"./Weapon.js":39}],37:[function(require,module,exports){
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

},{"./Weapon.js":39}],38:[function(require,module,exports){
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

},{"./Weapon.js":39}],39:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDdXJzb3IuanMiLCJFbmVtaWVzL0VuZW15LmpzIiwiRW5lbWllcy9FbmVteVByb2plY3RpbGUuanMiLCJFbmVtaWVzL0ZpbmFsQm9zcy5qcyIsIkVuZW1pZXMvTGlnaHRFbmVteS5qcyIsIkVuZW1pZXMvTWluaUJvc3MuanMiLCJFbmVtaWVzL1BhcmFzaXRlRW5lbXkuanMiLCJFbmVtaWVzL1Byb2plY3RpbGVFbmVteS5qcyIsIkVuZW1pZXMvUmVndWxhckVuZW15LmpzIiwiRW5lbWllcy9UYW5rRW5lbXkuanMiLCJFbnZpcm9ubWVudE9iamVjdHMvQnVzaC5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9DcmF0ZS5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9FbnZpcm9ubWVudE9iamVjdC5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9Sb2NrLmpzIiwiR2FtZS9Db250cm9sbGVyLmpzIiwiR2FtZS9HYW1lLmpzIiwiR2FtZS9Xb3JsZC5qcyIsIk1haW4uanMiLCJQaWNrVXBzL0dyb3VuZEFzc2F1bHRSaWZsZS5qcyIsIlBpY2tVcHMvR3JvdW5kRmxhbWV0aHJvd2VyLmpzIiwiUGlja1Vwcy9Hcm91bmRTaG90Z3VuLmpzIiwiUGlja1Vwcy9Hcm91bmRTbmlwZXIuanMiLCJQaWNrVXBzL0dyb3VuZFdlYXBvbi5qcyIsIlBpY2tVcHMvSGVhbHRocGFjay5qcyIsIlBsYXllcnMvQ2FtZXJhLmpzIiwiUGxheWVycy9QbGF5ZXIuanMiLCJVdGlsaXRpZXMvVXRpbC5qcyIsIldlYXBvbnMvQXNzYXVsdFJpZmxlLmpzIiwiV2VhcG9ucy9CdWxsZXQuanMiLCJXZWFwb25zL0J1bGxldDEyR2F1Z2UuanMiLCJXZWFwb25zL0J1bGxldDUwY2FsLmpzIiwiV2VhcG9ucy9CdWxsZXQ1NTYuanMiLCJXZWFwb25zL0J1bGxldDltbS5qcyIsIldlYXBvbnMvQnVsbGV0RmlyZS5qcyIsIldlYXBvbnMvRmxhbWV0aHJvd2VyLmpzIiwiV2VhcG9ucy9QaXN0b2wuanMiLCJXZWFwb25zL1Nob3RndW4uanMiLCJXZWFwb25zL1NuaXBlci5qcyIsIldlYXBvbnMvV2VhcG9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtJQUNNLE07QUFDRixzQkFBYztBQUFBOztBQUNWLGFBQUssU0FBTDtBQUNIOzs7O29DQUVXO0FBQUE7O0FBQ1IsaUJBQUssYUFBTCxHQUFxQixLQUFyQjtBQUNBLGlCQUFLLEtBQUwsR0FBYSxJQUFJLEtBQUosRUFBYjtBQUNBLGlCQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLFlBQU07QUFDdEIsc0JBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNILGFBRkQ7QUFHQSxpQkFBSyxLQUFMLENBQVcsR0FBWCxHQUFpQix3QkFBakI7QUFDSDs7Ozs7O2tCQUVVLE07Ozs7Ozs7OztxakJDakJmOzs7Ozs7QUFNQTs7Ozs7Ozs7QUFFQTs7O0lBR00sSzs7QUFFRjs7Ozs7Ozs7O0FBU0EsbUJBQVksQ0FBWixFQUFlLENBQWYsRUFBa0IsUUFBbEIsRUFBNEIsTUFBNUIsRUFBb0MsTUFBcEMsRUFBNEMsWUFBNUMsRUFBMEQ7QUFBQTs7QUFDdEQsYUFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxhQUFLLEtBQUwsR0FBYSxLQUFLLEVBQUwsR0FBUSxDQUFyQjtBQUNBLGFBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLGFBQUssTUFBTCxHQUFjLE1BQWQ7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsYUFBSyxZQUFMLEdBQW9CLFlBQXBCO0FBQ0EsYUFBSyxjQUFMLEdBQXNCLENBQXRCO0FBQ0g7O0FBRUQ7Ozs7Ozs7OztrQ0FLVSxHLEVBQUs7QUFBQTs7QUFDWCxpQkFBSyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0EsaUJBQUssS0FBTCxHQUFhLElBQUksS0FBSixFQUFiO0FBQ0EsaUJBQUssS0FBTCxDQUFXLE1BQVgs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IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL0p1c3QgYSBwbHVzIGN1cnNvciB0byBiZSByZW5kZXJlZCBhdCB0aGVcclxuLy9jdXJzb3IncyBsb2NhdGlvbiBlYWNoIFVwZGF0ZVxyXG4vL1RoZSBjdXJzb3IgZm9yIHRoZSBlbnRpcmUgSFRNTCBkb2N1bWVudCBpcyB0dXJuZWQgb2ZmIHZpYSBzdHlsaW5nIG9uIHRoZSBkb2N1bWVudC5cclxuY2xhc3MgQ3Vyc29yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEltYWdlKCkge1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gXCJHcmFwaGljcy9jcm9zc2hhaXIucG5nXCI7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQ3Vyc29yO1xyXG4iLCIvKipcclxuICogU291cmNlczpcclxuICogaHR0cHM6Ly9tZWRpdW0uY29tL0B5dXJpYmV0dC9qYXZhc2NyaXB0LWFic3RyYWN0LW1ldGhvZC13aXRoLWVzNi01ZGJlYTRiMDAwMjdcclxuICogaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1JNWRBUnBBUGxOa1xyXG4gKi9cclxuXHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgRW5lbXkgY2xhc3MgaXMgdGhlIHBhcmVudCBjbGFzcyBmb3IgYWxsIG9mIHRoZSBlbmVtaWVzLlxyXG4gKi9cclxuY2xhc3MgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHZlbG9jaXR5IFRoZSB2ZWxvY2l0eSBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gaGVhbHRoIFRoZSBoZWFsdGggb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIGRhbWFnZSBUaGUgZGFtYWdlIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSBwb2ludHNPbktpbGwgVGhlIHBvaW50cyByZXdhcmRlZCBmb3Iga2lsbGluZyB0aGUgRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIHZlbG9jaXR5LCBoZWFsdGgsIGRhbWFnZSwgcG9pbnRzT25LaWxsKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuYW5nbGUgPSBNYXRoLlBJLzI7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5O1xyXG4gICAgICAgIHRoaXMuaGVhbHRoID0gaGVhbHRoO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlO1xyXG4gICAgICAgIHRoaXMucG9pbnRzT25LaWxsID0gcG9pbnRzT25LaWxsO1xyXG4gICAgICAgIHRoaXMuYXR0YWNrQ29vbGRvd24gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiB0YWtlcyBpbiBhIHVybCBhbmQgbG9hZHMgaXQgYXMgYW4gSW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0ltYWdlTG9hZGVkIGlzXHJcbiAgICAgKiBzZXQgdG8gdHJ1ZS4gVGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIEVuZW15IGFyZSBzZXQgdG8gdGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIGltYWdlLlxyXG4gICAgICogQHBhcmFtIHVybCBUaGUgdXJsIHRoYXQgc2hvdWxkIGJlIGxvYWRlZC5cclxuICAgICAqL1xyXG4gICAgbG9hZEltYWdlKHVybCkge1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhdHRhY2sgZnVuY3Rpb24gdGFrZXMgaW4gYW4gb2JqZWN0IGFuZCByZW1vdmVzIHRoZSBhbW91bnQgb2YgZGFtYWdlIHRoZSBFbmVteSBkZWFscyBmcm9tIHRoZWlyIGhlYWx0aC5cclxuICAgICAqIDUwMCBpcyBhZGRlZCB0byB0aGUgYXR0YWNrIGNvb2xkb3duIG9mIHRoZSBlbmVteSBhZnRlciBhbiBhdHRhY2suXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3QgdGhhdCBpcyBiZWluZyBhdHRhY2tlZC5cclxuICAgICAqL1xyXG4gICAgYXR0YWNrKG9iamVjdCkge1xyXG4gICAgICAgIG9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tDb29sZG93biArPSA1MDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlcyB0aGUgZW5lbXkgdG93YXJkcyB0aGUgcGxheWVyLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdCB0byBtb3ZlIHRvd2FyZHMuXHJcbiAgICAgKiBAcGFyYW0gbW9kaWZpZXIgVGhlIG1vZGlmaWVyIHRvIGJlIG11bHRpcGxpZWQgYnkgdGhlIHZlbG9jaXR5LlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0cyBBbiBhcnJheSBvZiBlbnZpcm9ubWVudCBvYmplY3RzLlxyXG4gICAgICovXHJcbiAgICBtb3ZlKHBsYXllciwgbW9kaWZpZXIsIGVudmlyb25tZW50T2JqZWN0cywgY2FtZXJhKSB7XHJcbiAgICAgICAgbGV0IGRpZmZYID0gcGxheWVyLnggLSB0aGlzLng7XHJcbiAgICAgICAgbGV0IGRpZmZZID0gcGxheWVyLnkgLSB0aGlzLnk7XHJcblxyXG4gICAgICAgIGxldCBjb2VmZlg7XHJcbiAgICAgICAgbGV0IGNvZWZmWTtcclxuXHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZGlmZlgpID4gTWF0aC5hYnMoZGlmZlkpKSB7XHJcbiAgICAgICAgICAgIGNvZWZmWCA9IGRpZmZYIC8gTWF0aC5hYnMoZGlmZlgpO1xyXG4gICAgICAgICAgICBjb2VmZlkgPSBkaWZmWSAvIE1hdGguYWJzKGRpZmZYKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvZWZmWSA9IGRpZmZZIC8gTWF0aC5hYnMoZGlmZlkpO1xyXG4gICAgICAgICAgICBjb2VmZlggPSBkaWZmWCAvIE1hdGguYWJzKGRpZmZZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYW5nbGUgPSBNYXRoLmF0YW4yKHBsYXllci55K3BsYXllci5oZWlnaHQvMi1jYW1lcmEueSAtICh0aGlzLnkgKyB0aGlzLmhlaWdodC8yIC0gY2FtZXJhLnkpLCBwbGF5ZXIueCtwbGF5ZXIud2lkdGgvMi1jYW1lcmEueCAtICh0aGlzLnggKyB0aGlzLndpZHRoLzIgLSBjYW1lcmEueCkpO1xyXG5cclxuICAgICAgICBsZXQgb2xkWCA9IHRoaXMueDtcclxuICAgICAgICBsZXQgb2xkWSA9IHRoaXMueTtcclxuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcipjb2VmZlg7XHJcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXIqY29lZmZZO1xyXG5cclxuICAgICAgICBpZigodGhpcy54ICsgdGhpcy53aWR0aCA+IDEwMDAwKSB8fCAodGhpcy54IDwgMCkgfHwgKHRoaXMueSArIHRoaXMuaGVpZ2h0ID4gNTYyNSkgfHwgKHRoaXMueSA8IDApIHx8IHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkgIHtcclxuICAgICAgICAgICAgdGhpcy54ID0gb2xkWDtcclxuICAgICAgICAgICAgdGhpcy55ID0gb2xkWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgcGxheWVyKSAmJiB0aGlzLmF0dGFja0Nvb2xkb3duID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVhbHRoIGJlZm9yZSBhdHRhY2tcIiArIHBsYXllci5oZWFsdGgpO1xyXG4gICAgICAgICAgICB0aGlzLmF0dGFjayhwbGF5ZXIpO1xyXG4gICAgICAgICAgICBwbGF5ZXIuZGFtYWdlVGFrZW5Tb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVhbHRoIGFmdGVyIGF0dGFja1wiICsgcGxheWVyLmhlYWx0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgZW5lbXkgZ2l2ZW4geCBhbmQgeS5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIHRvIGJlIHNldC5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIHRvIGJlIHNldC5cclxuICAgICAqL1xyXG4gICAgc2V0UG9zaXRpb24oeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgYSBoZWxwZXIgZnVuY3Rpb24gdXNlZCBieSB0aGUgbW92ZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgaWYgdGhlcmUgaXMgYSBjb2xsaXNpb24gYmV0d2VlbiBhblxyXG4gICAgICogZW52aXJvbm1lbnQgb2JqZWN0IGFuZCB0aGUgZW5lbXkuIElmIHRoZXJlIGlzIGEgY29sbGlzaW9uLCB0aGUgb2JqZWN0IGlzIGF0dGFja2VkLlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0cyBBbiBhcnJheSBvZiBlbnZpcm9ubWVudCBvYmplY3RzLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgYSBjb2xsaXNpb24gZXhpc3RzLlxyXG4gICAgICovXHJcbiAgICBpc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdChlbnZpcm9ubWVudE9iamVjdHMpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgZW52aXJvbm1lbnRPYmplY3RzW2ldKSAmJiBlbnZpcm9ubWVudE9iamVjdHNbaV0uaXNCbG9ja2luZykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5hdHRhY2tDb29sZG93biA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrKGVudmlyb25tZW50T2JqZWN0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZHJhdyBmdW5jdGlvbiBkcmF3cyB0aGUgaW1hZ2Ugb24gdGhlIGNhbnZhcyBhdCB0aGUgeCBhbmQgeSBwb3NpdGlvbiBvZiB0aGUgTGlnaHRFbmVteS5cclxuICAgICAqIEBwYXJhbSBjdHggVGhlIGNvbnRleHQgb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjYW1lcmEgVGhlIGNhbWVyYSBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgIGN0eC50cmFuc2xhdGUoKHRoaXMueCArIHRoaXMud2lkdGgvMikgLSBjYW1lcmEueCwgKHRoaXMueSArIHRoaXMuaGVpZ2h0LzIpIC0gY2FtZXJhLnkpO1xyXG4gICAgICAgIGN0eC5yb3RhdGUodGhpcy5hbmdsZSsoTWF0aC5QSS8yKSk7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAwLXRoaXMud2lkdGgvMiwgMC10aGlzLmhlaWdodC8yKTtcclxuICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFbmVteTtcclxuIiwiaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBFbmVteVByb2plY3RpbGUgY2xhc3MgaXMgdGhlIG9iamVjdCB0aGF0IGlzIGZpcmVkIGZyb20gdGhlIFByb2plY3RpbGVFbmVteSBlbmVteS5cclxuICovXHJcbmNsYXNzIEVuZW15UHJvamVjdGlsZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlIGNsYXNzIGFuZCBnZXRzIHRoZSB4IGFuZCB5IGNvZWZmaWNpZW50cyBmb3IgdXNlXHJcbiAgICAgKiBpbiB0aGUgbW92ZSBmdW5jdGlvbi4gVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiBpcyBhbHNvIGNhbGxlZC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIGRlc3RYIFRoZSB4IGRlc3RpbmF0aW9uIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gZGVzdFkgVGhlIHkgZGVzdGluYXRpb24gb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgZGVzdFgsIGRlc3RZKSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IDYwMDtcclxuICAgICAgICB0aGlzLmRhbWFnZSA9IDU7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMubGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IGRpZmZYID0gZGVzdFggLSB0aGlzLng7XHJcbiAgICAgICAgbGV0IGRpZmZZID0gZGVzdFkgLSB0aGlzLnk7XHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZGlmZlgpID4gTWF0aC5hYnMoZGlmZlkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29lZmZZID0gZGlmZlkgLyBNYXRoLmFicyhkaWZmWCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvZWZmWSA9IGRpZmZZIC8gTWF0aC5hYnMoZGlmZlkpO1xyXG4gICAgICAgICAgICB0aGlzLmNvZWZmWCA9IGRpZmZYIC8gTWF0aC5hYnMoZGlmZlkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWRJbWFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBtb3ZlcyB0aGUgRW5lbXlQcm9qZWN0aWxlIGFjY29yZGluZyB0byB0aGUgeCBhbmQgeSBjb2VmZmljaWVudHMuXHJcbiAgICAgKiBAcGFyYW0gbW9kaWZpZXIgVGhlIG1vZGlmaWVyIHRvIGJlIG11bHRpcGxpZWQgYnkgdGhlIHZlbG9jaXR5LlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0cyBUaGUgYXJyYXkgb2YgZW52aXJvbm1lbnQgb2JqZWN0cy5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIG1vdmUobW9kaWZpZXIsIGVudmlyb25tZW50T2JqZWN0cywgcGxheWVyKSB7XHJcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXIqdGhpcy5jb2VmZlg7XHJcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXIqdGhpcy5jb2VmZlk7XHJcbiAgICAgICAgaWYodGhpcy5oaXRTb21ldGhpbmcoZW52aXJvbm1lbnRPYmplY3RzLCBwbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnggPCAwIHx8IHRoaXMueCA+IDEwMDAwIHx8IHRoaXMueSA8IDAgfHwgdGhpcy55ID4gNTYyNSl7XHJcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYXdheSBoZWFsdGggZnJvbSB0aGUgcGxheWVyIGVxdWFsIHRvIHRoZSBkYW1hZ2Ugb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGRhbWFnZVBsYXllcihwbGF5ZXIpIHtcclxuICAgICAgICBwbGF5ZXIuaGVhbHRoIC09IHRoaXMuZGFtYWdlO1xyXG4gICAgICAgIHBsYXllci5kYW1hZ2VUYWtlblNvdW5kLnBsYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYXdheSBoZWFsdGggZnJvbSB0aGUgZW52aXJvbm1lbnQgb2JqZWN0IGVxdWFsIHRvIHRoZSBkYW1hZ2Ugb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdCBUaGUgZW52aXJvbm1lbnQgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBkYW1hZ2VFbnZpcm9ubWVudChlbnZpcm9ubWVudE9iamVjdCl7XHJcbiAgICAgICAgZW52aXJvbm1lbnRPYmplY3QuaGVhbHRoIC09IHRoaXMuZGFtYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgYW4gZW52aXJvbm1lbnQgb2JqZWN0IG9yIGEgcGxheWVyIHdlcmUgaGl0IGJ5IHRoZSBwcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0cyBUaGUgYXJyYXkgb2YgZW52aXJvbm1lbnQgb2JqZWN0cy5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3Qgc29tZXRoaW5nIHdhcyBoaXQuXHJcbiAgICAgKi9cclxuICAgIGhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIHBsYXllcikge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbnZpcm9ubWVudE9iamVjdHNbaV0pICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZUVudmlyb25tZW50KGVudmlyb25tZW50T2JqZWN0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIHBsYXllcikpe1xyXG4gICAgICAgICAgICB0aGlzLmRhbWFnZVBsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiBsb2FkcyB0aGUgdXJsIGFzIGFuIEltYWdlLiBPbmNlIHRoZSBpbWFnZSBpcyBsb2FkZWQsIHRoaXMuaXNJbWFnZUxvYWRlZCBpc1xyXG4gICAgICogc2V0IHRvIHRydWUuIFRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBFbmVteVByb2plY3RpbGUgYXJlIHNldCB0byB0aGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgaW1hZ2UuXHJcbiAgICAgKi9cclxuICAgIGxvYWRJbWFnZSgpIHtcclxuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBcIkdyYXBoaWNzL0VuZW15UHJvamVjdGlsZS5wbmdcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkcmF3IGZ1bmN0aW9uIGRyYXdzIHRoZSBpbWFnZSBvbiB0aGUgY2FudmFzIGF0IHRoZSB4IGFuZCB5IHBvc2l0aW9uIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gY3R4IFRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gY2FtZXJhIFRoZSBjYW1lcmEgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFbmVteVByb2plY3RpbGU7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBGaW5hbEJvc3MgY2xhc3MgZXh0ZW5kcyB0aGUgRW5lbXkgY2xhc3MuIEl0IGlzIGEgaGlnaCBoZWFsdGggYW5kIGRhbWFnZSBlbmVteS5cclxuICovXHJcbmNsYXNzIEZpbmFsQm9zcyBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBGaW5hbEJvc3MuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDEyOCwgdGhlIGhlYWx0aCBzZXQgdG8gNTAwMCwgdGhlIGRhbWFnZSBzZXQgdG8gNTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gMTAwMDAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgRmluYWxCb3NzLlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIEZpbmFsQm9zcy5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDEyOCwgNTAwMCwgNTAsIDEwMDAwKTtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd24gPSAxMDA7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duUmF0ZSA9IDE7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duUmVzZXQgPSAxMDA7XHJcbiAgICAgICAgdGhpcy5yYXBpZEZpcmVDb29sZG93biA9IDUwMDtcclxuICAgICAgICB0aGlzLnJhcGlkRmlyZUNvb2xkb3duUmF0ZSA9IDE7XHJcbiAgICAgICAgdGhpcy5yYXBpZEZpcmVDb29sZG93blJlc2V0ID0gNTAwO1xyXG4gICAgICAgIHRoaXMucmFwaWRGaXJlTGVuZ3RoID0gNTAwO1xyXG4gICAgICAgIHRoaXMucmFwaWRGaXJlTGVuZ3RoUmVzZXQgPSA1MDA7XHJcbiAgICAgICAgdGhpcy5pc1JhcGlkRmlyZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2hhcmdlQXR0YWNrQ29vbGRvd24gPSAxMjUwO1xyXG4gICAgICAgIHRoaXMuY2hhcmdlQXR0YWNrQ29vbGRvd25SYXRlID0gMTtcclxuICAgICAgICB0aGlzLmNoYXJnZUF0dGFja0Nvb2xkb3duUmVzZXQgPSAxMjUwO1xyXG4gICAgICAgIHRoaXMuY2hhcmdlQXR0YWNrTGVuZ3RoID0gMTAwO1xyXG4gICAgICAgIHRoaXMuY2hhcmdlQXR0YWNrTGVuZ3RoUmVzZXQgPSAxMDA7XHJcbiAgICAgICAgdGhpcy5pc0NoYXJnZUF0dGFjayA9IGZhbHNlO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0ZpbmFsQm9zcy5wbmdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHN0YXJ0cyB0aGUgY2hhcmdlIGF0dGFjayBieSBzZXR0aW5nIHZlbG9jaXR5IHRvIDEwMjQsIHNldHRpbmcgZGFtYWdlIHRvIDEwLCBhbmQgc2V0dGluZyBpc0NoYXJnZUF0dGFja1xyXG4gICAgICogdG8gdHJ1ZS5cclxuICAgICAqL1xyXG4gICAgc3RhcnRDaGFyZ2VBdHRhY2soKSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IDEwMjQ7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAxMDtcclxuICAgICAgICB0aGlzLmlzQ2hhcmdlQXR0YWNrID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZW5kcyB0aGUgY2hhcmdlIGF0dGFjayBieSByZXNldHRpbmcgdmVsb2NpdHkgYW5kIGRhbWFnZSB0byB0aGVpciBkZWZhdWx0IHZhbHVlcy5cclxuICAgICAqL1xyXG4gICAgZW5kQ2hhcmdlQXR0YWNrKCkge1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSAxMjg7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSA1MDtcclxuICAgICAgICB0aGlzLmlzQ2hhcmdlQXR0YWNrID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHN0YXJ0cyByYXBpZCBmaXJlIGJ5IHNldHRpbmcgdGhlIHNob290Q29vbGRvd25SYXRlIHRvIDI1IGFuZCBzZXR0aW5nIGlzUmFwaWRGaXJlIHRvIHRydWUuXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0UmFwaWRGaXJlKCkge1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJhdGUgPSAyNTtcclxuICAgICAgICB0aGlzLmlzUmFwaWRGaXJlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZW5kcyB0aGUgcmFwaWQgZmlyZSBieSBzZXRzIHJhcGlkIGZpcmUgYmFjayB0byBpdHMgZGVmYXVsdCB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgZW5kUmFwaWRGaXJlKCkge1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJhdGUgPSAxO1xyXG4gICAgICAgIHRoaXMuaXNSYXBpZEZpcmUgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmluYWxCb3NzOyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgTGlnaHRFbmVteSBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaXMgYSBmYXN0IGVuZW15IHdpdGggbG93IGhlYWx0aC5cclxuICovXHJcbmNsYXNzIExpZ2h0RW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgTGlnaHRFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gMTI4LCB0aGUgaGVhbHRoIHNldCB0byAxMCwgdGhlIGRhbWFnZSBzZXQgdG8gMTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gNTAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgTGlnaHRFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBMaWdodEVuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMTI4LCAxMCwgMTAsIDUwKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9MaWdodEVuZW15LnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlnaHRFbmVteTsiLCJpbXBvcnQgRW5lbXkgZnJvbSAnLi9FbmVteS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIE1pbmlCb3NzIGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBpcyBhIGhpZ2ggaGVhbHRoIGFuZCBkYW1hZ2UgZW5lbXkuXHJcbiAqL1xyXG5jbGFzcyBNaW5pQm9zcyBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBNaW5pQm9zcy4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gMTI4LCB0aGUgaGVhbHRoIHNldCB0byA1MDAsIHRoZSBkYW1hZ2Ugc2V0IHRvIDUwLCBhbmQgdGhlIHBvaW50c09uS2lsbFxyXG4gICAgICogc2V0IHRvIDEwMDAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgTWluaUJvc3MuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgTWluaUJvc3MuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAxMjgsIDUwMCwgNTAsIDEwMDApO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93biA9IDIwMDtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SYXRlID0gMTtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SZXNldCA9IDIwMDtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9NaW5pQm9zcy5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1pbmlCb3NzOyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUGFyYXNpdGVFbmVteSBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaXMgYSB2ZXJ5IGZhc3QgZW5lbXkgd2l0aCB2ZXJ5IGxvdyBocC5cclxuICovXHJcbmNsYXNzIFBhcmFzaXRlRW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgUGFyYXNpdGVFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gNTEyLCB0aGUgaGVhbHRoIHNldCB0byAxLCB0aGUgZGFtYWdlIHNldCB0byAxMDAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gNTAwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFBhcmFzaXRlRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgUGFyYXNpdGVFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDUxMiwgMSwgMTAwLCA1MDApO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1BhcmFzaXRlRW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYXJhc2l0ZUVuZW15OyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUHJvamVjdGlsZUVuZW15IGNsYXNzIGV4dGVuZHMgdGhlIGVuZW15IGNsYXNzLiBJdCBjYW4gc2hvb3QgcHJvamVjdGlsZXMgYXQgdGhlIHBsYXllci5cclxuICovXHJcbmNsYXNzIFByb2plY3RpbGVFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBQcm9qZWN0aWxlRW5lbXkuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDk2LCB0aGUgaGVhbHRoIHNldCB0byA0MCwgdGhlIGRhbWFnZSBzZXQgdG8gMTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gMjUwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFByb2plY3RpbGVFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBQcm9qZWN0aWxlRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCA5NiwgNDAsIDEwLCAyNTApO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93biA9IDMwMDtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SYXRlID0gMTtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SZXNldCA9IDMwMDtcclxuICAgICAgICB0aGlzLnNob290QW1vdW50ID0gMTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9Qcm9qZWN0aWxlRW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0aWxlRW5lbXk7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBSZWd1bGFyRW5lbXkgY2xhc3MgZXh0ZW5kcyB0aGUgRW5lbXkgY2xhc3MuIEl0IGhhcyBiYWxhbmNlZCBzdGF0cyBhY3Jvc3MgdGhlIGJvYXJkLlxyXG4gKi9cclxuY2xhc3MgUmVndWxhckVuZW15IGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFJlZ3VsYXJFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gNjQsIHRoZSBoZWFsdGggc2V0IHRvIDI1LCB0aGUgZGFtYWdlIHNldCB0byAxMCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byAxMDAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgUmVndWxhckVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFJlZ3VsYXJFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDY0LCAyNSwgMTAsIDEwMCk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvUmVndWxhckVuZW15LnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVndWxhckVuZW15OyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgVGFua0VuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBpcyBhIHNsb3cgZW5lbXkgd2l0aCBoaWdoIGhlYWx0aCBhbmQgZGFtYWdlLlxyXG4gKi9cclxuY2xhc3MgVGFua0VuZW15IGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFRhbmtFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gMzIsIHRoZSBoZWFsdGggc2V0IHRvIDEwMCwgdGhlIGRhbWFnZSBzZXQgdG8gMjUsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gNTAwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFRhbmtFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBUYW5rRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAzMiwgMTAwLCAgMjUsIDUwMCk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvVGFua0VuZW15LnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFua0VuZW15OyIsImltcG9ydCBFbnZpcm9ubWVudE9iamVjdCBmcm9tICcuL0Vudmlyb25tZW50T2JqZWN0LmpzJztcblxuLyoqXG4gKiBUaGUgQnVzaCBjbGFzcyBleHRlbmRzIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzcy4gSXQgaXMgYSBub24tYmxvY2tpbmcgb2JqZWN0LlxuICovXG5jbGFzcyBCdXNoIGV4dGVuZHMgRW52aXJvbm1lbnRPYmplY3Qge1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEJ1c2guIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzc2VzIGNvbnN0cnVjdG9yXG4gICAgICogd2l0aCB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIGhlYWx0aCBzZXQgdG8gMTAwMDAwLCBhbmQgaXNCbG9ja2luZyBzZXQgdG8gZmFsc2UuXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEJ1c2guXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIEJ1c2guXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICBzdXBlcih4LCB5LCAxMDAwMDAsIGZhbHNlKTtcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvQnVzaC5wbmdcIik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdXNoOyIsImltcG9ydCBFbnZpcm9ubWVudE9iamVjdCBmcm9tICcuL0Vudmlyb25tZW50T2JqZWN0LmpzJztcblxuLyoqXG4gKiBUaGUgQ3JhdGUgY2xhc3MgZXh0ZW5kcyB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3MuIEl0IGlzIGEgYmxvY2tpbmcgb2JqZWN0IHdpdGggbG93IGhlYWx0aC5cbiAqL1xuY2xhc3MgQ3JhdGUgZXh0ZW5kcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgQ3JhdGUuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzc2VzIGNvbnN0cnVjdG9yXG4gICAgICogd2l0aCB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIGhlYWx0aCBzZXQgdG8gMTAwLCBhbmQgaXNCbG9ja2luZyBzZXQgdG8gdHJ1ZS5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgQ3JhdGUuXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIENyYXRlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgMTAwLCB0cnVlKTtcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvQ3JhdGUucG5nXCIpO1xuICAgICAgICBzdXBlci5sb2FkU291bmQoJ0F1ZGlvL0JveEJyZWFrLm1wMycpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ3JhdGU7XG4iLCIvKipcbiAqIFRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzcyBpcyB0aGUgcGFyZW50IGZvciBhbGwgZW52aXJvbm1lbnQgb2JqZWN0cy5cbiAqL1xuY2xhc3MgRW52aXJvbm1lbnRPYmplY3Qge1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIGhlYWx0aCBUaGUgaGVhbHRoIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0gaXNCbG9ja2luZyBXaGV0aGVyIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjYW4gYmUgd2Fsa2VkIHRocm91Z2guXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSwgaGVhbHRoLCBpc0Jsb2NraW5nKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gaGVhbHRoO1xuICAgICAgICB0aGlzLmlzQmxvY2tpbmcgPSBpc0Jsb2NraW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gc2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGVudmlyb25tZW50IG9iamVjdCBnaXZlbiB4IGFuZCB5LlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIHRvIGJlIHNldC5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiB0byBiZSBzZXQuXG4gICAgICovXG4gICAgc2V0UG9zaXRpb24oeCwgeSkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBsb2FkSW1hZ2UgZnVuY3Rpb24gdGFrZXMgaW4gYSB1cmwgYW5kIGxvYWRzIGl0IGFzIGFuIEltYWdlLiBPbmNlIHRoZSBpbWFnZSBpcyBsb2FkZWQsIHRoaXMuaXNJbWFnZUxvYWRlZCBpc1xuICAgICAqIHNldCB0byB0cnVlLiBUaGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QgYXJlIHNldCB0byB0aGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgaW1hZ2UuXG4gICAgICogQHBhcmFtIHVybCBUaGUgdXJsIHRoYXQgc2hvdWxkIGJlIGxvYWRlZC5cbiAgICAgKi9cbiAgICBsb2FkSW1hZ2UodXJsKSB7XG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB1cmw7XG4gICAgfVxuICAgIGxvYWRTb3VuZCh1cmwpIHtcbiAgICAgICAgdGhpcy5pc1NvdW5kTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc291bmQgPSBuZXcgQXVkaW8oKTtcbiAgICAgICAgdGhpcy5zb3VuZC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzU291bmRMb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNvdW5kLnNyYyA9IHVybDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZHJhdyBmdW5jdGlvbiBkcmF3cyB0aGUgaW1hZ2Ugb24gdGhlIGNhbnZhcyBhdCB0aGUgeCBhbmQgeSBwb3NpdGlvbiBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIGN0eCBUaGUgY29udGV4dCBvZiB0aGUgY2FudmFzLlxuICAgICAqIEBwYXJhbSBjYW1lcmEgVGhlIGNhbWVyYSBvYmplY3QuXG4gICAgICovXG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbnZpcm9ubWVudE9iamVjdDtcbiIsImltcG9ydCBFbnZpcm9ubWVudE9iamVjdCBmcm9tICcuL0Vudmlyb25tZW50T2JqZWN0LmpzJztcblxuLyoqXG4gKiBUaGUgUm9jayBjbGFzcyBleHRlbmRzIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzcy4gSXQgaXMgYSBibG9ja2luZyBvYmplY3Qgd2l0aCBoaWdoIGhlYWx0aC5cbiAqL1xuY2xhc3MgUm9jayBleHRlbmRzIEVudmlyb25tZW50T2JqZWN0IHtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBSb2NrLiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3NlcyBjb25zdHJ1Y3RvclxuICAgICAqIHdpdGggdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSBoZWFsdGggc2V0IHRvIDMwMCwgYW5kIGlzQmxvY2tpbmcgc2V0IHRvIHRydWUuXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFJvY2suXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFJvY2suXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICBzdXBlcih4LCB5LCAzMDAsIHRydWUpO1xuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9Sb2NrLnBuZ1wiKTtcbiAgICAgICAgc3VwZXIubG9hZFNvdW5kKCdBdWRpby9Cb3hCcmVhay5tcDMnKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJvY2s7XG4iLCIvKipcclxuICogVGhlIENvbnRyb2xsZXIgY2xhc3MgbGlzdGVucyBmb3IgdXNlciBpbnB1dHMgYW5kIHN0b3JlcyB3aGF0IGlzIGJlaW5nIHByZXNzZWQuXHJcbiAqL1xyXG5jbGFzcyBDb250cm9sbGVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBDb250cm9sbGVyLiBJdCBhbHNvIGFkZHMgZXZlbnQgbGlzdGVuZXJzIGZvciBrZXlkb3duLCBrZXl1cCwgbW91c2Vtb3ZlLFxyXG4gICAgICogbW91c2Vkb3duLCBhbmQgbW91c2V1cC5cclxuICAgICAqIEBwYXJhbSBkb2N1bWVudEJvZHkgVGhlIGJvZHkgb2YgdGhlIGRvY3VtZW50LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudEJvZHkpIHtcclxuICAgICAgICB0aGlzLmtleXNQcmVzc2VkID0gW107XHJcbiAgICAgICAgdGhpcy5tb3VzZSA9IFswLCAwXTtcclxuICAgICAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBkb2N1bWVudEJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMua2V5c1ByZXNzZWRbZXZlbnQua2V5Q29kZV0gPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudEJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmtleXNQcmVzc2VkW2V2ZW50LmtleUNvZGVdID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Qm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZVswXSA9IGV2ZW50LmNsaWVudFg7XHJcbiAgICAgICAgICAgIHRoaXMubW91c2VbMV0gPSBldmVudC5jbGllbnRZO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudEJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubW91c2VQcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnRCb2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZVByZXNzZWQgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBpZiB0aGUgaW5wdXR0ZWQga2V5IGlzIGJlaW5nIHByZXNzZWQuXHJcbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gY2hlY2suXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciB0aGUga2V5IGlzIGJlaW5nIHByZXNzZWQuXHJcbiAgICAgKi9cclxuICAgIGlzS2V5UHJlc3NlZChrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5rZXlzUHJlc3NlZFtrZXldO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgdGhlIG1vdXNlIGlzIGJlaW5nIHByZXNzZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciB0aGUgbW91c2UgaXMgcHJlc3NlZC5cclxuICAgICAqL1xyXG4gICAgaXNNb3VzZVByZXNzZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW91c2VQcmVzc2VkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSBtb3VzZSBwb3NpdGlvbi5cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJbXX0gVGhlIHggYW5kIHkgcG9zaXRpb24gb2YgdGhlIG1vdXNlIGFzIGFuIGFycmF5LiAoW3gseV0pXHJcbiAgICAgKi9cclxuICAgIGdldE1vdXNlUG9zaXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW91c2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7XHJcbiIsImltcG9ydCBXb3JsZCBmcm9tICcuL1dvcmxkLmpzJztcclxuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9Db250cm9sbGVyLmpzJztcclxuaW1wb3J0IEVuZW15UHJvamVjdGlsZSBmcm9tIFwiLi4vRW5lbWllcy9FbmVteVByb2plY3RpbGVcIjtcclxuaW1wb3J0IE1pbmlCb3NzIGZyb20gXCIuLi9FbmVtaWVzL01pbmlCb3NzXCI7XHJcbmltcG9ydCBGaW5hbEJvc3MgZnJvbSBcIi4uL0VuZW1pZXMvRmluYWxCb3NzXCI7XHJcbmltcG9ydCBQcm9qZWN0aWxlRW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvUHJvamVjdGlsZUVuZW15XCI7XHJcbmltcG9ydCBDdXJzb3IgZnJvbSAnLi4vQ3Vyc29yLmpzJztcclxuaW1wb3J0IFBpc3RvbCBmcm9tIFwiLi4vV2VhcG9ucy9QaXN0b2xcIjtcclxuaW1wb3J0IFNuaXBlciBmcm9tIFwiLi4vV2VhcG9ucy9TbmlwZXJcIjtcclxuaW1wb3J0IFNob3RndW4gZnJvbSBcIi4uL1dlYXBvbnMvU2hvdGd1blwiO1xyXG5pbXBvcnQgQXNzYXVsdFJpZmxlIGZyb20gJy4uL1dlYXBvbnMvQXNzYXVsdFJpZmxlJ1xyXG5pbXBvcnQgRmxhbWV0aHJvd2VyIGZyb20gXCIuLi9XZWFwb25zL0ZsYW1ldGhyb3dlclwiO1xyXG5pbXBvcnQgQnVsbGV0NTBjYWwgZnJvbSBcIi4uL1dlYXBvbnMvQnVsbGV0NTBjYWxcIjtcclxuaW1wb3J0IEJ1bGxldDU1NiBmcm9tIFwiLi4vV2VhcG9ucy9CdWxsZXQ1NTZcIjtcclxuaW1wb3J0IEJ1bGxldDEyR2F1Z2UgZnJvbSBcIi4uL1dlYXBvbnMvQnVsbGV0MTJHYXVnZVwiO1xyXG5pbXBvcnQgQnVsbGV0OW1tIGZyb20gXCIuLi9XZWFwb25zL0J1bGxldDltbVwiO1xyXG5pbXBvcnQgQnVsbGV0RmlyZSBmcm9tIFwiLi4vV2VhcG9ucy9CdWxsZXRGaXJlXCI7XHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgR2FtZSBjbGFzcyBpcyB1c2VkIHRvIHN0b3JlIHRoZSBnYW1lIHN0YXRlLiBJdCBhbHNvIGFsbG93cyBmb3IgdGhlIGdhbWUgdG8gYmUgdXBkYXRlZCBvciBkcmF3bi5cclxuICovXHJcbmNsYXNzIEdhbWUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEdhbWUgY2xhc3MuIFRoZSBnYW1lU3RhdGUgaXMgc2V0IHRvICdQbGF5aW5nJyBpbml0aWFsbHkuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzIFRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gZG9jdW1lbnRCb2R5IFRoZSBib2R5IG9mIHRoZSBkb2N1bWVudC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY2FudmFzLCBkb2N1bWVudEJvZHkpIHtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgICAgICB0aGlzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdGhpcy53b3JsZCA9IG5ldyBXb3JsZChjYW52YXMpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKGRvY3VtZW50Qm9keSk7XHJcbiAgICAgICAgdGhpcy5jdXJzb3IgPSBuZXcgQ3Vyc29yKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSAnUGxheWluZyc7XHJcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XHJcbiAgICAgICAgdGhpcy50b3BTY29yZXMgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy5jb21ib0xlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5jb21ib0VuZW1pZXNLaWxsZWQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB1cGRhdGVzIHRoZSBnYW1lLiBJZiB0aGUgZ2FtZVN0YXRlIGlzICdQbGF5aW5nLCcgZXZlcnl0aGluZyBpbiB0aGUgd29ybGQgaXMgY2hlY2tlZCBhbmQgdXBkYXRlZC5cclxuICAgICAqIElmIHRoZSBnYW1lU3RhdGUgaXMgJ1BhdXNlZCwnIGV2ZXJ5dGhpbmcgaW4gdGhlIHdvcmxkIHJlbWFpbnMgc3RpbGwgdW50aWwgdGhlIHJlc3VtZSBidXR0b24gaXMgcHJlc3NlZC4gSWYgdGhlXHJcbiAgICAgKiBnYW1lU3RhdGUgaXMgJ0dhbWUgT3ZlciwnIGV2ZXJ5dGhpbmcgaW4gdGhlIHdvcmxkIHJlbWFpbnMgc3RpbGwgdW50aWwgdGhlIFRyeSBBZ2FpbiBidXR0b24gaXMgcHJlc3NlZC5cclxuICAgICAqIEBwYXJhbSBtb2RpZmllciBUaGUgbW9kaWZpZXIgdG8gYmUgdXNlZCBmb3IgbW92ZW1lbnQuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZShtb2RpZmllcikge1xyXG4gICAgICAgIGlmKHRoaXMuZ2FtZVN0YXRlID09PSAnUGxheWluZycpIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaGVhbHRoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gJ0dhbWUgT3Zlcic7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRvcFNjb3JlcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCgyNykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9ICdQYXVzZWQnO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb21ib0xlbmd0aCAtPSBtb2RpZmllcjtcclxuICAgICAgICAgICAgaWYodGhpcy5jb21ib0xlbmd0aCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tYm9FbmVtaWVzS2lsbGVkID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tYm9MZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYXllcihtb2RpZmllcik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2hvdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUVxdWlwcGVkKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRW5lbWllcyhtb2RpZmllcik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGlja1VwcygpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVdlYXBvbkNvb2xkb3duKG1vZGlmaWVyKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQcm9qZWN0aWxlcyhtb2RpZmllcik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRW52aXJvbm1lbnRPYmplY3RzKCk7XHJcbiAgICAgICAgICAgIHRoaXMud29ybGQuY2FtZXJhLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC53YXZlICs9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnN0YXJ0V2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5nYW1lU3RhdGUgPT09ICdHYW1lIE92ZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZU92ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLmdhbWVTdGF0ZSA9PT0gJ1BhdXNlZCcpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQYXVzZVNjcmVlbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgZXZlcnl0aGluZyBpbiB0aGUgd29ybGQuIElmIHRoZSBnYW1lU3RhdGUgaXMgJ0dhbWUgT3ZlciwnIGEgZ2FtZSBvdmVyIG1lc3NhZ2UgaXMgZGlzcGxheWVkLFxyXG4gICAgICogaWYgdGhlIGdhbWVTdGF0ZSBpcyAnUGF1c2VkLCcgYSBwYXVzZSBtZXNzYWdlIGlzIGRpc3BsYXllZCwgYW5kIGlmIHRoZSBnYW1lU3RhdGUgaXMgJ1BsYXlpbmcsJyBhbGwgb2YgdGhlIG9iamVjdHNcclxuICAgICAqIGluIHRoZSB3b3JsZCBhcmUgZHJhd24sIGFsb25nIHdpdGggdGhlIEhVRCwgTWluaU1hcCwgYW5kIGN1cnNvci5cclxuICAgICAqL1xyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBpZih0aGlzLmdhbWVTdGF0ZSA9PT0gJ0dhbWUgT3ZlcicpIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3R2FtZU92ZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3U2NvcmVib2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuZ2FtZVN0YXRlID09PSAnUGF1c2VkJykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdQYXVzZVNjcmVlbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5pc0JhY2tncm91bmRMb2FkZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmRyYXdCYWNrZ3JvdW5kKHRoaXMuY3R4LCB0aGlzLmNhbnZhcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRyYXdXZWFwb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1BpY2tVcHMoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmlzSW1hZ2VMb2FkZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5kcmF3KHRoaXMuY3R4LCB0aGlzLndvcmxkLmNhbWVyYSwgdGhpcy5jb250cm9sbGVyLm1vdXNlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0VuZW1pZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3RW5lbXlQcm9qZWN0aWxlcygpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdCdWxsZXRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0Vudmlyb25tZW50T2JqZWN0cygpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdNaW5pTWFwKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0hVRCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5jdXJzb3IuaW1hZ2UsIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSAtIHRoaXMuY3Vyc29yLmltYWdlLndpZHRoLzIsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSAtIHRoaXMuY3Vyc29yLmltYWdlLmhlaWdodC8yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgYSBNaW5pTWFwIHRoYXQgZGlzcGxheXMgdGhlIHBsYXllcidzIGxvY2F0aW9uLCBlbmVteSBsb2NhdGlvbnMsIGFuZCBlbnZpcm9ubWVudCBvYmplY3QgbG9jYXRpb25zLlxyXG4gICAgICovXHJcbiAgICBkcmF3TWluaU1hcCgpIHtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAncmdiYSgzNSwgMTc3LCA3NywgMC4yKSc7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDBcIjtcclxuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDI1LCB0aGlzLmNhbnZhcy5oZWlnaHQgLSAyNTAsIDQwMCwgMjI1KTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KDI1LCB0aGlzLmNhbnZhcy5oZWlnaHQgLSAyNTAsIDQwMCwgMjI1KTtcclxuICAgICAgICBsZXQgeFBlcmNlbnQgPSAodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIpIC8gdGhpcy53b3JsZC53aWR0aDtcclxuICAgICAgICBsZXQgeVBlcmNlbnQgPSAodGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yKSAvIHRoaXMud29ybGQuaGVpZ2h0O1xyXG4gICAgICAgIGxldCB4UmVsYXRpdmUgPSB4UGVyY2VudCo0MDA7XHJcbiAgICAgICAgbGV0IHlSZWxhdGl2ZSA9IHlQZXJjZW50KjIyNTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzAwRkYwMCc7XHJcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgdGhpcy5jdHguYXJjKDI1ICsgeFJlbGF0aXZlLCAodGhpcy5jYW52YXMuaGVpZ2h0IC0gMjUwKSArIHlSZWxhdGl2ZSwgMi41LCAwLCAyKk1hdGguUEkpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uaXNJbWFnZUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHhQZXJjZW50ID0gKHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLnggKyB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS53aWR0aC8yKSAvIHRoaXMud29ybGQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBsZXQgeVBlcmNlbnQgPSAodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0ueSArIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmhlaWdodC8yKSAvIHRoaXMud29ybGQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHhSZWxhdGl2ZSA9IHhQZXJjZW50KjQwMDtcclxuICAgICAgICAgICAgICAgIGxldCB5UmVsYXRpdmUgPSB5UGVyY2VudCoyMjU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzgwODA4MCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmFyYygyNSArIHhSZWxhdGl2ZSwgKHRoaXMuY2FudmFzLmhlaWdodCAtIDI1MCkgKyB5UmVsYXRpdmUsIDIuNSwgMCwgMipNYXRoLlBJKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgeFBlcmNlbnQgPSAodGhpcy53b3JsZC5lbmVtaWVzW2ldLnggKyB0aGlzLndvcmxkLmVuZW1pZXNbaV0ud2lkdGgvMikgLyB0aGlzLndvcmxkLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgbGV0IHlQZXJjZW50ID0gKHRoaXMud29ybGQuZW5lbWllc1tpXS55ICsgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmhlaWdodC8yKSAvIHRoaXMud29ybGQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHhSZWxhdGl2ZSA9IHhQZXJjZW50KjQwMDtcclxuICAgICAgICAgICAgICAgIGxldCB5UmVsYXRpdmUgPSB5UGVyY2VudCoyMjU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI0ZGMDAwMCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmFyYygyNSArIHhSZWxhdGl2ZSwgKHRoaXMuY2FudmFzLmhlaWdodCAtIDI1MCkgKyB5UmVsYXRpdmUsIDIuNSwgMCwgMipNYXRoLlBJKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgdGhlIEhVRCB3aGljaCBjb250YWlucyB0aGUgcGxheWVyJ3MgaGVhbHRoLCB0aGUgd2F2ZSBudW1iZXIsIGFuZCB0aGUgbnVtYmVyIG9mIGVuZW1pZXMgbGVmdC5cclxuICAgICAqIFRoZSBjdXJyZW50IHNlbGVjdGVkIHdlYXBvbiBpcyBhbHNvIGRpc3BsYXllZC5cclxuICAgICAqL1xyXG4gICAgZHJhd0hVRCgpIHtcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCI0OHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkZGJztcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMFwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDE7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGhpcy53b3JsZC5wbGF5ZXIuaGVhbHRoICsgXCIgSFBcIiwgdGhpcy5jYW52YXMud2lkdGgvMiAtIDI5MCwgNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQodGhpcy53b3JsZC5wbGF5ZXIuaGVhbHRoICsgXCIgSFBcIiwgdGhpcy5jYW52YXMud2lkdGgvMiAtIDI5MCwgNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiV2F2ZSBcIiArIHRoaXMud29ybGQud2F2ZSwgdGhpcy5jYW52YXMud2lkdGgvMiwgNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoXCJXYXZlIFwiICsgdGhpcy53b3JsZC53YXZlLCB0aGlzLmNhbnZhcy53aWR0aC8yLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aCArIFwiIEVuZW1pZXMgTGVmdFwiLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgMzUwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCh0aGlzLndvcmxkLmVuZW1pZXMubGVuZ3RoICsgXCIgRW5lbWllcyBMZWZ0XCIsIHRoaXMuY2FudmFzLndpZHRoLzIgKyAzNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCI0OHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkZGJztcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnQWN0aXZlIFdlYXBvbjogJyArIHRoaXMud29ybGQucGxheWVyLmludmVudG9yeVt0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXhdLm5hbWUsIHRoaXMuY2FudmFzLndpZHRoLzIsIHRoaXMuY2FudmFzLmhlaWdodCAtIDUwKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCdBY3RpdmUgV2VhcG9uOiAnICsgdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W3RoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleF0ubmFtZSwgdGhpcy5jYW52YXMud2lkdGgvMiwgdGhpcy5jYW52YXMuaGVpZ2h0IC0gNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCdTY29yZTogJyArIHRoaXMuc2NvcmUsIHRoaXMuY2FudmFzLndpZHRoLzIsIDEyNSk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCgnU2NvcmU6ICcgKyB0aGlzLnNjb3JlLCB0aGlzLmNhbnZhcy53aWR0aC8yLCAxMjUpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCdDb21ibzogJyArIHRoaXMuY29tYm9FbmVtaWVzS2lsbGVkLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgMzUwLCAxMjUpO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoJ0NvbWJvOiAnICsgdGhpcy5jb21ib0VuZW1pZXNLaWxsZWQsIHRoaXMuY2FudmFzLndpZHRoLzIgKyAzNTAsIDEyNSk7XHJcbiAgICAgICAgLy8gcmVtb3ZlIGxhdGVyIC0gZGVidWdnaW5nIHB1cnBvc2VzXHJcbiAgICAgICAgLy8gdGhpcy5jdHguZm9udCA9IFwiMjRweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxUZXh0KCdQb3NYOiAnICsgdGhpcy53b3JsZC5wbGF5ZXIueCwgdGhpcy5jYW52YXMud2lkdGgvMiAtIDI5MCwgMTc1KTtcclxuICAgICAgICAvLyB0aGlzLmN0eC5zdHJva2VUZXh0KCdQb3NZOiAnICsgdGhpcy53b3JsZC5wbGF5ZXIueSwgdGhpcy5jYW52YXMud2lkdGgvMiAtIDI5MCwgMjUwKTtcclxuICAgICAgICAvLyB0aGlzLmN0eC5maWxsVGV4dCgnQ2FtZXJhWDogJyArIHRoaXMud29ybGQuY2FtZXJhLngsIHRoaXMuY2FudmFzLndpZHRoLzIsIDE3NSk7XHJcbiAgICAgICAgLy8gdGhpcy5jdHguc3Ryb2tlVGV4dCgnQ2FtZXJhWTogJyArIHRoaXMud29ybGQuY2FtZXJhLnksIHRoaXMuY2FudmFzLndpZHRoLzIsIDI1MCk7XHJcbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbFRleHQoJ21vdXNlWDogJyArIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSwgdGhpcy5jYW52YXMud2lkdGgvMiArIDM1MCwgMTc1KTtcclxuICAgICAgICAvLyB0aGlzLmN0eC5zdHJva2VUZXh0KCdtb3VzZVk6ICcgKyB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyAzNTAsIDI1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyB3aGV0aGVyIHRoZSByZXN0YXJ0IGJ1dHRvbiBvbiB0aGUgZ2FtZSBvdmVyIHNjcmVlbiBoYXMgYmVlbiBwcmVzc2VkLiBJZiBpdCBoYXMsIHRoZSB3b3JsZCBpc1xyXG4gICAgICogcmVzdGFydGVkLCB0aGUgZ2FtZSBzdGF0ZSBpcyBzZXQgdG8gJ3BsYXlpbmcsJyBhbmQgdGhlIHNjb3JlIGlzIHNldCB0byAwLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVHYW1lT3ZlcigpIHtcclxuICAgICAgICBpZih0aGlzLmNvbnRyb2xsZXIuaXNNb3VzZVByZXNzZWQoKSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0gPiB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwICYmIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSA8ICh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwICsgMjAwKVxyXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdID4gdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSAmJiB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0gPCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1ICsgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnN0YXJ0KHRoaXMuY2FudmFzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gJ1BsYXlpbmcnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY29yZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIHRoZSBnYW1lIG92ZXIgc2NyZWVuIGFuZCBhIGJ1dHRvbiB0byB0cnkgYWdhaW4uXHJcbiAgICAgKi9cclxuICAgIGRyYXdHYW1lT3ZlcigpIHtcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIxMjhweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI0ZGRic7XHJcbiAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gMTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkdhbWUgT3ZlclwiLCB0aGlzLmNhbnZhcy53aWR0aC8yLCB0aGlzLmNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyMwMDAnO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoXCJHYW1lIE92ZXJcIiwgdGhpcy5jYW52YXMud2lkdGgvMiwgdGhpcy5jYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkZGJztcclxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1LCAyMDAsIDEwMCk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdCh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1LCAyMDAsIDEwMCk7XHJcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMjRweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJUcnkgYWdhaW4/XCIsIHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAgKyAxMDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUgKyA1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVG9wU2NvcmVzKCkge1xyXG4gICAgICAgIGlmKHRoaXMuc2NvcmUgPiB0aGlzLnRvcFNjb3Jlc1swXSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvcFNjb3Jlc1syXSA9IHRoaXMudG9wU2NvcmVzWzFdO1xyXG4gICAgICAgICAgICB0aGlzLnRvcFNjb3Jlc1sxXSA9IHRoaXMudG9wU2NvcmVzWzBdO1xyXG4gICAgICAgICAgICB0aGlzLnRvcFNjb3Jlc1swXSA9IHRoaXMuc2NvcmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5zY29yZSA+IHRoaXMudG9wU2NvcmVzWzFdKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9wU2NvcmVzWzJdID0gdGhpcy50b3BTY29yZXNbMV07XHJcbiAgICAgICAgICAgIHRoaXMudG9wU2NvcmVzWzFdID0gdGhpcy5zY29yZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnNjb3JlID4gdGhpcy50b3BTY29yZXNbMl0pIHtcclxuICAgICAgICAgICAgdGhpcy50b3BTY29yZXNbMl0gPSB0aGlzLnNjb3JlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgdGhlIHRvcCAzIHNjb3Jlcy5cclxuICAgICAqL1xyXG4gICAgZHJhd1Njb3JlYm9hcmQoKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiNjBweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwic3RhcnRcIjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnSGlnaCBTY29yZXMnLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgNDQwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiAtIDc1KTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCdIaWdoIFNjb3JlcycsIHRoaXMuY2FudmFzLndpZHRoLzIgKyA0NDAsIHRoaXMuY2FudmFzLmhlaWdodC8yIC0gNzUpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCcxc3QnLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgNDAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCgnMXN0JywgdGhpcy5jYW52YXMud2lkdGgvMiArIDQwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCcybmQnLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgNDAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDc1KTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCcybmQnLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgNDAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDc1KTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnM3JkJywgdGhpcy5jYW52YXMud2lkdGgvMiArIDQwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAxNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoJzNyZCcsIHRoaXMuY2FudmFzLndpZHRoLzIgKyA0MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMTUwKTtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImVuZFwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCcnICsgdGhpcy50b3BTY29yZXNbMF0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyA4MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCcnICsgdGhpcy50b3BTY29yZXNbMF0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyA4MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnJyArIHRoaXMudG9wU2NvcmVzWzFdLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgODAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDc1KTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCcnICsgdGhpcy50b3BTY29yZXNbMV0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyA4MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgNzUpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCcnICsgdGhpcy50b3BTY29yZXNbMl0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyA4MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMTUwKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCcnICsgdGhpcy50b3BTY29yZXNbMl0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyA4MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMTUwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIHdoZXRoZXIgdGhlIHJlc3VtZSBidXR0b24gb24gdGhlIHBhdXNlZCBzY3JlZW4gaGFzIGJlZW4gcHJlc3NlZC4gSWYgaXQgaGFzLCB0aGUgZ2FtZSBzdGF0ZSBpcyBzZXQgdG8gJ3BsYXlpbmcuJ1xyXG4gICAgICovXHJcbiAgICB1cGRhdGVQYXVzZVNjcmVlbigpIHtcclxuICAgICAgICBpZih0aGlzLmNvbnRyb2xsZXIuaXNNb3VzZVByZXNzZWQoKSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0gPiB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwICYmIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSA8ICh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwKzIwMClcclxuICAgICAgICAgICAgICAgICYmIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSA+IHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUgJiYgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdIDwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSArIDEwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSAnUGxheWluZyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIHRoZSBwYXVzZSBzY3JlZW4gYW5kIGEgcmVzdW1lIGJ1dHRvbi5cclxuICAgICAqL1xyXG4gICAgZHJhd1BhdXNlU2NyZWVuKCkge1xyXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjEyOHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkZGJztcclxuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiUGF1c2VkXCIsIHRoaXMuY2FudmFzLndpZHRoLzIsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIlBhdXNlZFwiLCB0aGlzLmNhbnZhcy53aWR0aC8yLCB0aGlzLmNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUsIDIwMCwgMTAwKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUsIDIwMCwgMTAwKTtcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIyNHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlJlc3VtZVwiLCB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwICsgMTAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1ICsgNTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyBhbGwgb2YgdGhlIGVuZW1pZXMgaW4gdGhlIHdvcmxkLlxyXG4gICAgICovXHJcbiAgICBkcmF3RW5lbWllcygpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB1cGRhdGVzIHRoZSBsb2NhdGlvbiBvZiBhbGwgb2YgdGhlIGVuZW1pZXMsIHVwZGF0ZXMgdGhlaXIgY29vbGRvd25zLCBhbmQgcmVtb3ZlcyB0aGVtIGlmIHRoZXkgaGF2ZVxyXG4gICAgICogbm8gaGVhbHRoLlxyXG4gICAgICogQHBhcmFtIG1vZGlmaWVyIFRoZSBnYW1lIG1vZGlmaWVyIHNwZWVkLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVFbmVtaWVzKG1vZGlmaWVyKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gdGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5tb3ZlKHRoaXMud29ybGQucGxheWVyLCBtb2RpZmllciwgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLmF0dGFja0Nvb2xkb3duID4gMClcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5hdHRhY2tDb29sZG93biAtPSA1O1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0gaW5zdGFuY2VvZiBGaW5hbEJvc3MpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVDb29sZG93biA+IDAgJiYgIXRoaXMud29ybGQuZW5lbWllc1tpXS5pc1JhcGlkRmlyZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlQ29vbGRvd24gLT0gdGhpcy53b3JsZC5lbmVtaWVzW2ldLnJhcGlkRmlyZUNvb2xkb3duUmF0ZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLnJhcGlkRmlyZUNvb2xkb3duIDw9IDAgJiYgIXRoaXMud29ybGQuZW5lbWllc1tpXS5pc1JhcGlkRmlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5zdGFydFJhcGlkRmlyZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVMZW5ndGggPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlTGVuZ3RoUmVzZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlTGVuZ3RoID4gMCAmJiB0aGlzLndvcmxkLmVuZW1pZXNbaV0uaXNSYXBpZEZpcmUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLnJhcGlkRmlyZUxlbmd0aCAtPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlQ29vbGRvd25SYXRlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlTGVuZ3RoIDw9IDAgJiYgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmlzUmFwaWRGaXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmVuZFJhcGlkRmlyZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVDb29sZG93biA9IHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVDb29sZG93blJlc2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tDb29sZG93biA+IDAgJiYgIXRoaXMud29ybGQuZW5lbWllc1tpXS5pc0NoYXJnZUF0dGFjaylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrQ29vbGRvd24gLT0gdGhpcy53b3JsZC5lbmVtaWVzW2ldLmNoYXJnZUF0dGFja0Nvb2xkb3duUmF0ZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLmNoYXJnZUF0dGFja0Nvb2xkb3duIDw9IDAgJiYgIXRoaXMud29ybGQuZW5lbWllc1tpXS5pc0NoYXJnZUF0dGFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5zdGFydENoYXJnZUF0dGFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tMZW5ndGggPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrTGVuZ3RoUmVzZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrTGVuZ3RoID4gMCAmJiB0aGlzLndvcmxkLmVuZW1pZXNbaV0uaXNDaGFyZ2VBdHRhY2spXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmNoYXJnZUF0dGFja0xlbmd0aCAtPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrQ29vbGRvd25SYXRlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrTGVuZ3RoIDw9IDAgJiYgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmlzQ2hhcmdlQXR0YWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmVuZENoYXJnZUF0dGFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tDb29sZG93biA9IHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tDb29sZG93blJlc2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXSBpbnN0YW5jZW9mIFByb2plY3RpbGVFbmVteSB8fCB0aGlzLndvcmxkLmVuZW1pZXNbaV0gaW5zdGFuY2VvZiBNaW5pQm9zcyB8fCB0aGlzLndvcmxkLmVuZW1pZXNbaV0gaW5zdGFuY2VvZiBGaW5hbEJvc3MpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duID4gMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93biAtPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93blJhdGU7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXMucHVzaChuZXcgRW5lbXlQcm9qZWN0aWxlKHRoaXMud29ybGQuZW5lbWllc1tpXS54ICsgdGhpcy53b3JsZC5lbmVtaWVzW2ldLndpZHRoLzIsIHRoaXMud29ybGQuZW5lbWllc1tpXS55ICsgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmhlaWdodC8yLCB0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLnNob290Q29vbGRvd24gKz0gdGhpcy53b3JsZC5lbmVtaWVzW2ldLnNob290Q29vbGRvd25SZXNldDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0uaGVhbHRoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tYm9FbmVtaWVzS2lsbGVkICs9IDE7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbWJvTGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9IHRoaXMud29ybGQuZW5lbWllc1tpXS5wb2ludHNPbktpbGwqMjtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9IHRoaXMud29ybGQuZW5lbWllc1tpXS5wb2ludHNPbktpbGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWJvTGVuZ3RoID0gMztcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgdGhlIHBsYXllcnMgbG9jYXRpb24gYmFzZWQgb24gdXNlciBpbnB1dC5cclxuICAgICAqIEBwYXJhbSBtb2RpZmllciBUaGUgZ2FtZSBzcGVlZCBtb2RpZmllci5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlUGxheWVyKG1vZGlmaWVyKSB7XHJcbiAgICAgICAgbGV0IHNwcmludGluZyA9IHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoMTYpO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDg3KSkgeyAvLyBQbGF5ZXIgaG9sZGluZyB1cFxyXG4gICAgICAgICAgICAvL09ubHkgbW92ZSB1cCBpZiB3ZSBhcmUgbm90IGF0IHRoZSB2ZXJ5IHRvcCBvZiB0aGUgd29ybGRcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIueSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHRoZSBwbGF5ZXIgaXMgc3ByaW50aW5nIGhlIG11c3QgbW92ZSB0d2ljZSBhcyBmYXN0XHJcbiAgICAgICAgICAgICAgICBpZihzcHJpbnRpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueSAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCptb2RpZmllcioyO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnkgLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIC8vSWYgdGhlIG1vdmVtZW50IGNhdXNlZCB0aGUgcGxheWVyIHRvIGJlIGNvbGxpZGluZywgdW5kbyB0aGUgbW92ZW1lbnQgYW5kIGdpdmUgYmFjayB0aGUgc3RhbWluYSBpZiBoZSB3YXMgc3ByaXRuaW5nLlxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3ByaW50aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkKm1vZGlmaWVyKjI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoODMpKSB7IC8vIFBsYXllciBob2xkaW5nIGRvd25cclxuICAgICAgICAgICAgLy9Pbmx5IG1vdmUgZG93biBpZiB3ZSBhcmUgbm90IGF0IHRoZSB2ZXJ5IGJvdHRvbSBvZiB0aGUgd29ybGRcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodCA8PSA1NjI1KSB7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHRoZSBwbGF5ZXIgaXMgc3ByaW50aW5nIGhlIG11c3QgbW92ZSB0d2ljZSBhcyBmYXN0LCBhbmQgaGlzIHN0YW1pbmEgbXVzdCBkcmFpbiBiYXNlZCBvbiB0aGUgbW9kaWZpZXIgKHNlY29uZHMgc2luY2UgbGFzdCB1cGRhdGUpXHJcbiAgICAgICAgICAgICAgICBpZihzcHJpbnRpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueSArPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCptb2RpZmllcioyO1xyXG4gICAgICAgICAgICAgICAgLy9PdGhlcndpc2UgbW92ZSBsaWtlIG5vcm1hbFxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnkgKz0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIC8vSWYgdGhlIG1vdmVtZW50IGNhdXNlZCB0aGUgcGxheWVyIHRvIGJlIGNvbGxpZGluZywgdW5kbyB0aGUgbW92ZW1lbnQgYW5kIGdpdmUgYmFjayB0aGUgc3RhbWluYSBpZiBoZSB3YXMgc3ByaXRuaW5nLlxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3ByaW50aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55IC09IHRoaXMud29ybGQucGxheWVyLnNwZWVkKm1vZGlmaWVyKjI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55IC09IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoNjUpKSB7IC8vIFBsYXllciBob2xkaW5nIGxlZnRcclxuICAgICAgICAgICAgLy9vbmx5IGdvIGxlZnQgaWYgd2UgYXJlIG5vdCBvbiB0aGUgZmFyIGxlZnQgZWRnZSBhbHJlYWR5XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLnggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYoc3ByaW50aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcioyO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwcmludGluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueCArPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyKjI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkKm1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDY4KSkgeyAvLyBQbGF5ZXIgaG9sZGluZyByaWdodFxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGggPD0gMTAwMDApIHtcclxuICAgICAgICAgICAgICAgIGlmKHNwcmludGluZylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXIqMjtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdCh0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihzcHJpbnRpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcioyO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueCAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiByZW1vdmVzIGVudmlyb25tZW50IG9iamVjdHMgdGhhdCBoYXZlIG5vIGhlYWx0aCByZW1haW5pbmcgYW5kIHBsYXlzIGEgc291bmQuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUVudmlyb25tZW50T2JqZWN0cygpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5oZWFsdGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyBhbGwgb2YgdGhlIGVudmlyb25tZW50IG9iamVjdHMgaW4gdGhlIHdvcmxkLlxyXG4gICAgICovXHJcbiAgICBkcmF3RW52aXJvbm1lbnRPYmplY3RzKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLndvcmxkLmNhbWVyYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIGFsbCBvZiB0aGUgd2VhcG9ucyBpbiB0aGUgd29ybGQuXHJcbiAgICAgKi9cclxuICAgIGRyYXdXZWFwb25zKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmdyb3VuZFdlYXBvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5ncm91bmRXZWFwb25zW2ldLmlzSW1hZ2VMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZ3JvdW5kV2VhcG9uc1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLndvcmxkLmNhbWVyYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgdGhlIHBpY2t1cHMgb24gdGhlIGdyb3VuZCwgc3VjaCBhcyBncm91bmQgd2VhcG9ucyBhbmQgbWVkcGFja3MuIElmIHRoZSBwbGF5ZXIgY29sbGlkZXMgd2l0aCB0aGVtLFxyXG4gICAgICogdGhleSBhcmUgcmVtb3ZlZCBmcm9tIHRoZSB3b3JsZCBhbmQgZWl0aGVyIGFkZGVkIHRvIHRoZSBwbGF5ZXIncyBpbnZlbnRvcnkgb3IgY29uc3VtZWQuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVBpY2tVcHMoKSB7XHJcbiAgICAgICAgLy8gdXBkYXRlIGdyb3VuZCB3ZWFwb25zXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMud29ybGQuZ3JvdW5kV2VhcG9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMud29ybGQucGxheWVyLCB0aGlzLndvcmxkLmdyb3VuZFdlYXBvbnNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3duc1dlcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBqID0gdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5Lmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W2pdLm5hbWUgPT09IHRoaXMud29ybGQuZ3JvdW5kV2VhcG9uc1tpXS53ZWFwb24ubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvd25zV2VwID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihvd25zV2VwID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZ3JvdW5kV2VhcG9uc1tpXS5hZGRXZWFwb24odGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmdyb3VuZFdlYXBvbnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHVwZGF0ZSBtZWRwYWNrc1xyXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMud29ybGQucGlja1Vwcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMud29ybGQucGxheWVyLCB0aGlzLndvcmxkLnBpY2tVcHNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5oZWFsdGggPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5oZWFsdGggPSAxMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5waWNrVXBzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyB0aGUgY29vbGRvd24gb2YgYWxsIG9mIHRoZSB3ZWFwb25zIGluIHRoZSBwbGF5ZXIncyBpbnZlbnRvcnkuXHJcbiAgICAgKiBAcGFyYW0gbW9kaWZpZXIgVGhlIGdhbWUgc3BlZWQgbW9kaWZpZXIuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVdlYXBvbkNvb2xkb3duKG1vZGlmaWVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMud29ybGQucGxheWVyLmludmVudG9yeS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBsZXQgd2VwID0gdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W2ldO1xyXG4gICAgICAgICAgICBpZih3ZXAuY29vbGRvd24gPiAwKXtcclxuICAgICAgICAgICAgICAgIHdlcC5jb29sZG93biAtPSBtb2RpZmllcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgYWxsIG9mIHRoZSBsaXZlIGJ1bGxldHMgaW4gdGhlIHdvcmxkLlxyXG4gICAgICovXHJcbiAgICBkcmF3QnVsbGV0cygpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5idWxsZXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuYnVsbGV0c1tpXS5pc0ltYWdlTG9hZGVkICYmIHRoaXMud29ybGQuYnVsbGV0c1tpXS5saXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHNbaV0uZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBhZGRzIG5ldyBidWxsZXRzIHRvIHRoZSB3b3JsZCBkZXBlbmRpbmcgb24gaWYgdGhlIHBsYXllciBwcmVzc2VkIHRoZWlyIG1vdXNlIGJ1dHRvbiBhbmQgd2hhdCB3ZWFwb25cclxuICAgICAqIHdhcyBlcXVpcHBlZC4gSXQgY2hlY2tzIHRoZSB0eXBlIG9mIHdlYXBvbiB0aGUgcGxheWVyIGhhcyBlcXVpcHBlZCBhbmQgZmlyZXMgdGhlIGNvcnJlY3QgYnVsbGV0cy4gU2hvdGd1biBpcyB1bmlxdWVcclxuICAgICAqIGluIHRoYXQgaXQgZmlyZXMgNSBidWxsZXRzIHdpdGggYSBzcHJlYWQgd2hpY2ggaXMgZG9uZSBieSBhZGRpbmcvc3VidHJhY3RpbmcgYSBjb25zdGFudCBmcm9tIHRoZSBkZXN0aW5hdGlvbi5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlU2hvdCgpIHtcclxuICAgICAgICBpZih0aGlzLmNvbnRyb2xsZXIuaXNNb3VzZVByZXNzZWQoKSkge1xyXG4gICAgICAgICAgICBsZXQgd2VwID0gdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W3RoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleF07XHJcbiAgICAgICAgICAgIGlmKHdlcC5jb29sZG93biA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXAuc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgd2VwLnNvdW5kLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgIHdlcC5hZGRDb29sZG93bigpO1xyXG4gICAgICAgICAgICAgICAgaWYod2VwIGluc3RhbmNlb2YgUGlzdG9sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDltbSh0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0rdGhpcy53b3JsZC5jYW1lcmEueCwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdK3RoaXMud29ybGQuY2FtZXJhLnkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYod2VwIGluc3RhbmNlb2YgU25pcGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDUwY2FsKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0LzIsIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54LCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih3ZXAgaW5zdGFuY2VvZiBBc3NhdWx0UmlmbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0NTU2KHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0LzIsIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54LCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih3ZXAgaW5zdGFuY2VvZiBTaG90Z3VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDEyR2F1Z2UodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDEyR2F1Z2UodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngrMjUsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55KzI1KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDEyR2F1Z2UodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngrNTAsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55KzUwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDEyR2F1Z2UodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngtMjUsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55LTI1KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDEyR2F1Z2UodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngtNTAsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55LTUwKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL3RoZSBmbGFtZXRocm93ZXIgd2lsbCBzaG9vdCBhIHNpbmdsZSBiYWxsIG9mIGZpcmUgZWFjaCB1cGRhdGUgaWYgcG9zc2libGUgd2l0aCBhIHNsaWdodCByYW5kb20gc3ByZWFkXHJcbiAgICAgICAgICAgICAgICAvL3NvIHRoZSBmaXJlIGRvZXMgbm90IGdvIGluIGEgc3RyYWlnaHQgbGluZS5cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYod2VwIGluc3RhbmNlb2YgRmxhbWV0aHJvd2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwcmVhZDFfeCA9IFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKC0xMDAsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwcmVhZDFfeSA9IFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKC0xMDAsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwcmVhZDJfeCA9IFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKC0xMDAsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwcmVhZDJfeSA9IFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKC0xMDAsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwcmVhZDNfeCA9IFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKC0xMDAsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwcmVhZDNfeSA9IFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKC0xMDAsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0RmlyZSh0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0rdGhpcy53b3JsZC5jYW1lcmEueCtzcHJlYWQxX3gsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55K3NwcmVhZDFfeSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5wdXNoKG5ldyBCdWxsZXRGaXJlKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0LzIsIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54K3NwcmVhZDJfeCwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdK3RoaXMud29ybGQuY2FtZXJhLnkrc3ByZWFkMl95KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldEZpcmUodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngrc3ByZWFkM194LCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueStzcHJlYWQzX3kpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyB3aGF0IHRoZSBwbGF5ZXIgaGFzIGVxdWlwcGVkIGJhc2VkIG9uIHdoYXQga2V5IGlzIHByZXNzZWQuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUVxdWlwcGVkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDQ5KSkgLy8gUGxheWVyIHByZXNzZWQgMVxyXG4gICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXggPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDUwKSkgeyAvLyBQbGF5ZXIgcHJlc3NlZCAyXHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmludmVudG9yeS5sZW5ndGggPiAxKVxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoNTEpKSB7IC8vIFBsYXllciBwcmVzc2VkIDNcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5Lmxlbmd0aCA+IDIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXggPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg1MikpIHsgLy8gUGxheWVyIHByZXNzZWQgNFxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnkubGVuZ3RoID4gMylcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleCA9IDM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDUzKSkgeyAvLyBQbGF5ZXIgcHJlc3NlZCA1XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmludmVudG9yeS5sZW5ndGggPiA0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gNDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgYnVsbGV0cyBhbmQgZW5lbXkgcHJvamVjdGlsZXMgaW4gdGhlIHdvcmxkLiBJZiBhIHByb2plY3RpbGUgaGl0cyBhbiBvYmplY3QgZW5lbXkvcGxheWVyXHJcbiAgICAgKiBpdCBkaXNhcHBlYXJzIGZyb20gdGhlIHdvcmxkLlxyXG4gICAgICogQHBhcmFtIG1vZGlmaWVyIFRoZSBnYW1lIHNwZWVkIG1vZGlmaWVyLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVQcm9qZWN0aWxlcyhtb2RpZmllcikge1xyXG4gICAgICAgIC8vIGVuZW15IHByb2plY3RpbGVzXHJcbiAgICAgICAgZm9yKGxldCBpID0gdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5tb3ZlKG1vZGlmaWVyLCB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cywgdGhpcy53b3JsZC5wbGF5ZXIpO1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXNbaV0ubGl2ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcGxheWVyIGJ1bGxldHNcclxuICAgICAgICBmb3IobGV0IGkgPSB0aGlzLndvcmxkLmJ1bGxldHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzW2ldLm1vdmUobW9kaWZpZXIsIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzLCB0aGlzLndvcmxkLmVuZW1pZXMpO1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmJ1bGxldHNbaV0ubGl2ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIGFsbCBvZiB0aGUgbGl2ZSBlbmVteSBwcm9qZWN0aWxlcyBpbiB0aGUgd29ybGQuXHJcbiAgICAgKi9cclxuICAgIGRyYXdFbmVteVByb2plY3RpbGVzKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzW2ldLmlzSW1hZ2VMb2FkZWQgJiYgdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzW2ldLmxpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLndvcmxkLmNhbWVyYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyBhbGwgb2YgdGhlIHBpY2sgdXBzIGluIHRoZSB3b3JsZC5cclxuICAgICAqL1xyXG4gICAgZHJhd1BpY2tVcHMoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQucGlja1Vwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBpY2tVcHNbaV0uaXNJbWFnZUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5waWNrVXBzW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcclxuIiwiaW1wb3J0IFJvY2sgZnJvbSBcIi4uL0Vudmlyb25tZW50T2JqZWN0cy9Sb2NrXCI7XHJcbmltcG9ydCBCdXNoIGZyb20gXCIuLi9FbnZpcm9ubWVudE9iamVjdHMvQnVzaFwiO1xyXG5pbXBvcnQgQ3JhdGUgZnJvbSBcIi4uL0Vudmlyb25tZW50T2JqZWN0cy9DcmF0ZVwiO1xyXG5pbXBvcnQgVGFua0VuZW15IGZyb20gXCIuLi9FbmVtaWVzL1RhbmtFbmVteVwiO1xyXG5pbXBvcnQgUmVndWxhckVuZW15IGZyb20gXCIuLi9FbmVtaWVzL1JlZ3VsYXJFbmVteVwiO1xyXG5pbXBvcnQgTGlnaHRFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9MaWdodEVuZW15XCI7XHJcbmltcG9ydCBQcm9qZWN0aWxlRW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvUHJvamVjdGlsZUVuZW15XCI7XHJcbmltcG9ydCBNaW5pQm9zcyBmcm9tICcuLi9FbmVtaWVzL01pbmlCb3NzJztcclxuaW1wb3J0IEZpbmFsQm9zcyBmcm9tICcuLi9FbmVtaWVzL0ZpbmFsQm9zcyc7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL1BsYXllcnMvUGxheWVyXCI7XHJcbmltcG9ydCBDYW1lcmEgZnJvbSBcIi4uL1BsYXllcnMvQ2FtZXJhXCI7XHJcbmltcG9ydCBHcm91bmRBc3NhdWx0UmlmbGUgZnJvbSBcIi4uL1BpY2tVcHMvR3JvdW5kQXNzYXVsdFJpZmxlLmpzXCI7XHJcbmltcG9ydCBHcm91bmRTbmlwZXIgZnJvbSBcIi4uL1BpY2tVcHMvR3JvdW5kU25pcGVyLmpzXCI7XHJcbmltcG9ydCBHcm91bmRTaG90Z3VuIGZyb20gJy4uL1BpY2tVcHMvR3JvdW5kU2hvdGd1bi5qcyc7XHJcbmltcG9ydCBHcm91bmRGbGFtZXRocm93ZXIgZnJvbSAnLi4vUGlja1Vwcy9Hcm91bmRGbGFtZXRocm93ZXIuanMnO1xyXG5pbXBvcnQgSGVhbHRoUGFjayBmcm9tIFwiLi4vUGlja1Vwcy9IZWFsdGhwYWNrLmpzXCI7XHJcbmltcG9ydCBVdGlsIGZyb20gXCIuLi9VdGlsaXRpZXMvVXRpbFwiO1xyXG5pbXBvcnQgUGFyYXNpdGVFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9QYXJhc2l0ZUVuZW15XCI7XHJcblxyXG4vKipcclxuICogVGhlIFdvcmxkIGNsYXNzIGhvbGRzIHRoZSBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIHRoZSB3b3JsZC5cclxuICovXHJcbmNsYXNzIFdvcmxkIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGQgb2YgdGhlIHdvcmxkIGFuZCBsb2FkcyB0aGUgYmFja2dyb3VuZC5cclxuICAgICAqIEBwYXJhbSBjYW52YXMgVGhlIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY2FudmFzKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydChjYW52YXMpO1xyXG4gICAgICAgIHRoaXMubG9hZEJhY2tncm91bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzdGFydCBmdW5jdGlvbiBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBXb3JsZC4gVGhlIHBsYXllciBpcyBtYWRlIGFuZCB0aGUgY2FtZXJhIGlzIGF0dGFjaGVkIHRvIHRoZSBwbGF5ZXIuXHJcbiAgICAgKiBBIGNhbGwgaXMgdG8gaW5pdGlhbGl6ZSB0aGUgZW52aXJvbm1lbnQgYW5kIHN0YXJ0IHRoZSB3YXZlLlxyXG4gICAgICogQHBhcmFtIGNhbnZhcyBUaGUgY2FudmFzLlxyXG4gICAgICovXHJcbiAgICBzdGFydChjYW52YXMpIHtcclxuICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZW5lbWllcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZW5lbXlQcm9qZWN0aWxlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMucGlja1VwcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZ3JvdW5kV2VhcG9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUVudmlyb25tZW50KCk7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplUGlja1VwcygpO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBDYW1lcmEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0LCAxMDAwMCwgNTYyNSk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyLCBjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLndhdmUgPSAxO1xyXG4gICAgICAgIHRoaXMuc3RhcnRXYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGluaXRpYWxpemVzIHRoZSBlbnZpcm9ubWVudCBieSBwdXNoaW5nIGVudmlyb25tZW50IG9iamVjdHMgb250byB0aGUgZW52aXJvbm1lbnRPYmplY3RzIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplRW52aXJvbm1lbnQoKSB7XHJcbiAgICAgICAgbGV0IGNyYXRlQ2FwID0gMTU7XHJcbiAgICAgICAgbGV0IGJ1c2hDYXAgPSAxNTtcclxuICAgICAgICBsZXQgcm9ja0NhcCA9IDE1O1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgY3JhdGVDYXA7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMucHVzaChuZXcgQ3JhdGUoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBidXNoQ2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzLnB1c2gobmV3IEJ1c2goVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByb2NrQ2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzLnB1c2gobmV3IFJvY2soVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG5cclxuICAgICAgICBsZXQgY29sbGlzaW9uRmxhZyA9IHRydWU7XHJcbiAgICAgICAgd2hpbGUoY29sbGlzaW9uRmxhZyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgaSA9IFV0aWwuYXJlQW55Q29sbGlzaW9uc0luU2FtZUFycmF5KHRoaXMuZW52aXJvbm1lbnRPYmplY3RzKTtcclxuICAgICAgICAgICAgaWYoaSA9PT0gLTEpXHJcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25GbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzW2ldLnNldFBvc2l0aW9uKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgUGlja1VwcyBzdWNoIGFzIHdlYXBvbnMgYW5kIGhlYWx0aCBwYWNrcyBieSBwdXNoaW5nIHRoZW0gb250byB0aGUgUGlja1VwcyBhbmQgZ3JvdW5kV2VhcG9ucyBhcnJheXMuXHJcbiAgICAgKi9cclxuICAgICBpbml0aWFsaXplUGlja1VwcygpIHtcclxuICAgICAgICAgbGV0IHNuaXBlckNhcCA9IDM7XHJcbiAgICAgICAgIGxldCBhc3NhdWx0UmlmbGVDYXAgPSA1O1xyXG4gICAgICAgICBsZXQgc2hvdGd1bkNhcCA9IDU7XHJcbiAgICAgICAgIGxldCBmbGFtZXRocm93ZXJDYXAgPSA1O1xyXG4gICAgICAgICBsZXQgaGVhbHRoUGFja0NhcCA9IDc7XHJcblxyXG4gICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc25pcGVyQ2FwOyBpKyspXHJcbiAgICAgICAgICAgICB0aGlzLmdyb3VuZFdlYXBvbnMucHVzaChuZXcgR3JvdW5kU25pcGVyKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFzc2F1bHRSaWZsZUNhcDsgaSsrKVxyXG4gICAgICAgICAgICAgdGhpcy5ncm91bmRXZWFwb25zLnB1c2gobmV3IEdyb3VuZEFzc2F1bHRSaWZsZShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaG90Z3VuQ2FwOyBpKyspXHJcbiAgICAgICAgICAgICB0aGlzLmdyb3VuZFdlYXBvbnMucHVzaChuZXcgR3JvdW5kU2hvdGd1bihVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGZsYW1ldGhyb3dlckNhcDsgaSsrKVxyXG4gICAgICAgICAgICAgIHRoaXMuZ3JvdW5kV2VhcG9ucy5wdXNoKG5ldyBHcm91bmRGbGFtZXRocm93ZXIoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgaGVhbHRoUGFja0NhcDsgaSsrKVxyXG4gICAgICAgICAgICAgdGhpcy5waWNrVXBzLnB1c2gobmV3IEhlYWx0aFBhY2soVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG5cclxuICAgICAgICAgbGV0IHNlbGZDb2xsaXNpb25GbGFnID0gdHJ1ZTtcclxuICAgICAgICAgd2hpbGUoc2VsZkNvbGxpc2lvbkZsYWcpIHtcclxuICAgICAgICAgICAgIGxldCBpID0gVXRpbC5hcmVBbnlDb2xsaXNpb25zSW5TYW1lQXJyYXkodGhpcy5ncm91bmRXZWFwb25zKTtcclxuICAgICAgICAgICAgIGlmKGkgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgIHNlbGZDb2xsaXNpb25GbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgdGhpcy5ncm91bmRXZWFwb25zW2ldLnNldFBvc2l0aW9uKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBzZWxmQ29sbGlzaW9uRmxhZyA9IHRydWU7XHJcbiAgICAgICAgIHdoaWxlKHNlbGZDb2xsaXNpb25GbGFnKSB7XHJcbiAgICAgICAgICAgICBsZXQgaSA9IFV0aWwuYXJlQW55Q29sbGlzaW9uc0luU2FtZUFycmF5KHRoaXMucGlja1Vwcyk7XHJcbiAgICAgICAgICAgICBpZihpID09PSAtMSlcclxuICAgICAgICAgICAgICAgICBzZWxmQ29sbGlzaW9uRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgIHRoaXMucGlja1Vwc1tpXS5zZXRQb3NpdGlvbihVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKTtcclxuICAgICAgICAgfVxyXG4gICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gc3RhcnRzIHRoZSB3YXZlIGJ5IHB1c2hpbmcgZW5lbWllcyBvbnRvIHRoZSBlbmVtaWVzIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBzdGFydFdhdmUoKSB7XHJcbiAgICAgICAgbGV0IGxpZ2h0RW5lbXlDYXAgPSB0aGlzLndhdmUgKiAxMDtcclxuICAgICAgICBsZXQgcmVndWxhckVuZW15Q2FwID0gdGhpcy53YXZlICogMTA7XHJcbiAgICAgICAgbGV0IHRhbmtFbmVteUNhcCA9IHRoaXMud2F2ZSAqIDU7XHJcbiAgICAgICAgbGV0IHByb2plY3RpbGVFbmVteUNhcCA9IE1hdGguZmxvb3IodGhpcy53YXZlLzIpKjU7XHJcbiAgICAgICAgbGV0IG1pbmlCb3NzQ2FwID0gTWF0aC5mbG9vcih0aGlzLndhdmUvNSk7XHJcbiAgICAgICAgbGV0IHBhcmFzaXRlRW5lbXlDYXAgPSB0aGlzLndhdmU7XHJcblxyXG4gICAgICAgIGlmKHRoaXMud2F2ZSA9PT0gNikge1xyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgRmluYWxCb3NzKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsaWdodEVuZW15Q2FwOyBpKyspXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgTGlnaHRFbmVteShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZWd1bGFyRW5lbXlDYXA7IGkrKylcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBSZWd1bGFyRW5lbXkoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGFua0VuZW15Q2FwOyBpKyspXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgVGFua0VuZW15KFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHByb2plY3RpbGVFbmVteUNhcDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IFByb2plY3RpbGVFbmVteShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtaW5pQm9zc0NhcDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IE1pbmlCb3NzKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBhcmFzaXRlRW5lbXlDYXA7IGkrKylcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBQYXJhc2l0ZUVuZW15KFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb2xsaXNpb25GbGFnID0gdHJ1ZTtcclxuICAgICAgICB3aGlsZShjb2xsaXNpb25GbGFnID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCBpID0gVXRpbC5hcmVBbnlDb2xsaXNpb25zKHRoaXMuZW5lbWllcywgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMpO1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gLTEpXHJcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25GbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5lbWllc1tpXS5zZXRQb3NpdGlvbihVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbG9hZEJhY2tncm91bmQgZnVuY3Rpb24gbG9hZHMgdGhlIGJhY2tncm91bmQgaW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0JhY2tncm91bmRMb2FkZWQgaXNcclxuICAgICAqIHNldCB0byB0cnVlLlxyXG4gICAgICovXHJcbiAgICBsb2FkQmFja2dyb3VuZCgpIHtcclxuICAgICAgICB0aGlzLmlzQmFja2dyb3VuZExvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZC5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNCYWNrZ3JvdW5kTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuYmFja2dyb3VuZC53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmJhY2tncm91bmQuaGVpZ2h0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLnNyYyA9IFwiR3JhcGhpY3MvQmFja2dyb3VuZC5wbmdcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkcmF3QmFja2dyb3VuZCBmdW5jdGlvbiBkcmF3cyB0aGUgYmFja2dyb3VuZCBvZiB0aGUgd29ybGQuXHJcbiAgICAgKiBAcGFyYW0gY3R4IFRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzIFRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGRyYXdCYWNrZ3JvdW5kKGN0eCwgY2FudmFzKSB7XHJcbiAgICAgICAgbGV0IHNXaWR0aCwgc0hlaWdodDtcclxuICAgICAgICBzV2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICAgICAgc0hlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuYmFja2dyb3VuZC53aWR0aCAtIHRoaXMuY2FtZXJhLnggPCBjYW52YXMud2lkdGgpXHJcbiAgICAgICAgICAgIHNXaWR0aCA9IHRoaXMuYmFja2dyb3VuZC53aWR0aCAtIHRoaXMuY2FtZXJhLng7XHJcbiAgICAgICAgaWYodGhpcy5iYWNrZ3JvdW5kLmhlaWdodCAtIHRoaXMuY2FtZXJhLnkgPCBjYW52YXMuaGVpZ2h0KVxyXG4gICAgICAgICAgICBzSGVpZ2h0ID0gdGhpcy5iYWNrZ3JvdW5kLmhlaWdodCAtIHRoaXMuY2FtZXJhLnk7XHJcblxyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5iYWNrZ3JvdW5kLCB0aGlzLmNhbWVyYS54LCB0aGlzLmNhbWVyYS55LCBzV2lkdGgsIHNIZWlnaHQsIDAsIDAsIHNXaWR0aCwgc0hlaWdodCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXb3JsZDtcclxuIiwiLypcbiAgU291cmNlczpcbiAgaHR0cDovL3d3dy5sb3N0ZGVjYWRlZ2FtZXMuY29tL2hvdy10by1tYWtlLWEtc2ltcGxlLWh0bWw1LWNhbnZhcy1nYW1lL1xuICBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80MDM3MjEyL2h0bWwtY2FudmFzLWZ1bGwtc2NyZWVuP3V0bV9tZWRpdW09b3JnYW5pYyZ1dG1fc291cmNlPWdvb2dsZV9yaWNoX3FhJnV0bV9jYW1wYWlnbj1nb29nbGVfcmljaF9xYVxuICBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjkxOTYwMS9odG1sNS1jYW52YXMtd29ybGQuY2FtZXJhLXZpZXdwb3J0LWhvdy10by1hY3RhbGx5LWRvLWl0P3V0bV9tZWRpdW09b3JnYW5pYyZ1dG1fc291cmNlPWdvb2dsZV9yaWNoX3FhJnV0bV9jYW1wYWlnbj1nb29nbGVfcmljaF9xYVxuICBodHRwOi8vanNmaWRkbGUubmV0L2dmY2Fydi9RS2dIcy9cbiAqL1xuXG5pbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUvR2FtZS5qcyc7XG5cbmxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG5sZXQgZ2FtZSA9IG5ldyBHYW1lKGNhbnZhcywgZG9jdW1lbnQuYm9keSk7XG5cbmxldCBtYWluID0gKCkgPT4ge1xuICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGxldCBkZWx0YSA9IG5vdyAtIHRoZW47XG5cbiAgICBnYW1lLnVwZGF0ZShkZWx0YSAvIDEwMDApO1xuICAgIGdhbWUuZHJhdygpO1xuXG4gICAgdGhlbiA9IG5vdztcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShtYWluKTtcbn07XG5cbi8vIENyb3NzLWJyb3dzZXIgc3VwcG9ydCBmb3IgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cbmxldCB0aGVuID0gRGF0ZS5ub3coKTtcbm1haW4oKTtcbiIsImltcG9ydCBHcm91bmRXZWFwb24gZnJvbSAnLi9Hcm91bmRXZWFwb24uanMnO1xyXG5pbXBvcnQgQXNzYXVsdFJpZmxlIGZyb20gJy4uL1dlYXBvbnMvQXNzYXVsdFJpZmxlLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgR3JvdW5kQXNzYXVsdFJpZmxlIGNsYXNzIGV4dGVuZHMgdGhlIEdyb3VuZFdlYXBvbiBjbGFzcy5cclxuICovXHJcbmNsYXNzIEdyb3VuZEFzc2F1bHRSaWZsZSBleHRlbmRzIEdyb3VuZFdlYXBvbiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIGxldCB3ZWFwb24gPSBuZXcgQXNzYXVsdFJpZmxlKCk7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2VhcG9uKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9Hcm91bmRBc3NhdWx0UmlmbGUucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHcm91bmRBc3NhdWx0UmlmbGU7XHJcbiIsImltcG9ydCBHcm91bmRXZWFwb24gZnJvbSAnLi9Hcm91bmRXZWFwb24uanMnO1xyXG5pbXBvcnQgRmxhbWV0aHJvd2VyIGZyb20gJy4uL1dlYXBvbnMvRmxhbWV0aHJvd2VyLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgR3JvdW5kQXNzYXVsdFJpZmxlIGNsYXNzIGV4dGVuZHMgdGhlIEdyb3VuZFdlYXBvbiBjbGFzcy5cclxuICovXHJcbmNsYXNzIEdyb3VuZEZsYW1ldGhyb3dlciBleHRlbmRzIEdyb3VuZFdlYXBvbiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIGxldCB3ZWFwb24gPSBuZXcgRmxhbWV0aHJvd2VyKCk7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2VhcG9uKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9Hcm91bmRGbGFtZXRocm93ZXIucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEdyb3VuZEZsYW1ldGhyb3dlcjtcclxuIiwiaW1wb3J0IEdyb3VuZFdlYXBvbiBmcm9tICcuL0dyb3VuZFdlYXBvbi5qcyc7XHJcbmltcG9ydCBTaG90Z3VuIGZyb20gJy4uL1dlYXBvbnMvU2hvdGd1bi5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIEdyb3VuZEFzc2F1bHRSaWZsZSBjbGFzcyBleHRlbmRzIHRoZSBHcm91bmRXZWFwb24gY2xhc3MuXHJcbiAqL1xyXG5jbGFzcyBHcm91bmRTaG90Z3VuIGV4dGVuZHMgR3JvdW5kV2VhcG9uIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgbGV0IHdlYXBvbiA9IG5ldyBTaG90Z3VuKCk7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2VhcG9uKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9Hcm91bmRTaG90Z3VuLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBHcm91bmRTaG90Z3VuO1xyXG4iLCJpbXBvcnQgR3JvdW5kV2VhcG9uIGZyb20gJy4vR3JvdW5kV2VhcG9uLmpzJztcclxuaW1wb3J0IFdlYXBvbiBmcm9tICcuLi9XZWFwb25zL1dlYXBvbi5qcyc7XHJcbmltcG9ydCBTbmlwZXIgZnJvbSAnLi4vV2VhcG9ucy9TbmlwZXIuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBHcm91bmRTbmlwZXIgY2xhc3MgZXh0ZW5kcyB0aGUgR3JvdW5kV2VhcG9uIGNsYXNzLlxyXG4gKi9cclxuY2xhc3MgR3JvdW5kU25pcGVyIGV4dGVuZHMgR3JvdW5kV2VhcG9uIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgbGV0IHdlYXBvbiA9IG5ldyBTbmlwZXIoKTtcclxuICAgICAgICBzdXBlcih4LCB5LCB3ZWFwb24pO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0dyb3VuZFNuaXBlci5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdyb3VuZFNuaXBlcjtcclxuIiwiY2xhc3MgR3JvdW5kV2VhcG9uIHtcclxuICAgIC8veCA9IHRoZSB4IHBvc2l0aW9uIG9mIHRoZSBncm91bmQgd2VhcG9uXHJcbiAgICAvL3kgPSB0aGUgeSBwb3NpdGlvbiBvZiB0aGUgZ3JvdW5kIHdlYXBvblxyXG4gICAgLy93ZWFwb24gID0gdGhlIHdlYXBvbiBvYmplY3QgdGhhdCB3aWxsIGJlIGFkZGVkIHRvIHRoZSBwbGF5ZXIncyBpbnZlbnRvcnlcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIHdlYXBvbikge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLndlYXBvbiA9IHdlYXBvbjtcclxuICAgIH1cclxuICAgIHNldFBvc2l0aW9uKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbiAgICBsb2FkSW1hZ2UodXJsKSB7XHJcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICBhcnJheSA9IHRoZSBhcnJheSB0aGF0IHRoZSB3ZXBhb24gb2JqZWN0IHN0b3JlZCBpbiB0aGlzIEdyb3VuZFdlYXBvbiB3aWxsIGJlIHB1c2hlZCBpbnRvLiBUaGlzIG1ldGhvZCBpcyB0byBiZSB1c2VkIHdpdGggYSBwbGF5ZXIncyBpbnZlbnRvcnkuXHJcbiAgICAqL1xyXG4gICAgYWRkV2VhcG9uKGFycmF5KXtcclxuICAgICAgYXJyYXkucHVzaCh0aGlzLndlYXBvbik7XHJcbiAgICB9XHJcbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEdyb3VuZFdlYXBvbjtcclxuIiwiY2xhc3MgSGVhbHRoUGFjayB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLmhlYWxpbmcgPSAxMDA7XHJcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRJbWFnZSgpIHtcclxuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSAnR3JhcGhpY3MvSGVhbHRoUGFjay5wbmcnO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhlYWx0aFBhY2s7XHJcbiIsIi8qXHJcbiAgU291cmNlczpcclxuICBodHRwOi8vanNmaWRkbGUubmV0L2dmY2Fydi9RS2dIcy9cclxuKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgQ2FtZXJhIGNsYXNzIGlzIHVzZWQgdG8gZm9sbG93IHRoZSBwbGF5ZXIncyBtb3ZlbWVudC5cclxuICovXHJcbmNsYXNzIENhbWVyYSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgQ2FtZXJhLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIENhbWVyYS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBDYW1lcmEuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzV2lkdGggVGhlIHdpZHRoIG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzSGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSB3b3JsZFdpZHRoIFRoZSB3aWR0aCBvZiB0aGUgd29ybGQuXHJcbiAgICAgKiBAcGFyYW0gd29ybGRIZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgd29ybGQuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQsIHdvcmxkV2lkdGgsIHdvcmxkSGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMueERlYWRab25lID0gMDtcclxuICAgICAgICB0aGlzLnlEZWFkWm9uZSA9IDA7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IGNhbnZhc1dpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gY2FudmFzSGVpZ2h0O1xyXG4gICAgICAgIHRoaXMud29ybGRXaWR0aCA9IHdvcmxkV2lkdGg7XHJcbiAgICAgICAgdGhpcy53b3JsZEhlaWdodCA9IHdvcmxkSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIHNldCB3aG8gdGhlIGNhbWVyYSBpcyBmb2xsb3dpbmcuXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIFRoZSBwbGF5ZXIgdGhhdCB0aGUgY2FtZXJhIHNob3VsZCBmb2xsb3cuXHJcbiAgICAgKiBAcGFyYW0geERlYWRab25lXHJcbiAgICAgKiBAcGFyYW0geURlYWRab25lXHJcbiAgICAgKi9cclxuICAgIGZvbGxvdyhwbGF5ZXIsIHhEZWFkWm9uZSwgeURlYWRab25lKSB7XHJcbiAgICAgICAgdGhpcy5mb2xsb3dpbmcgPSBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy54RGVhZFpvbmUgPSB4RGVhZFpvbmU7XHJcbiAgICAgICAgdGhpcy55RGVhZFpvbmUgPSB5RGVhZFpvbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgdGhlIGNhbWVyYSdzIHggYW5kIHkgcG9zaXRpb24uXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBpZih0aGlzLmZvbGxvd2luZyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZm9sbG93aW5nLnggLSB0aGlzLnggKyB0aGlzLnhEZWFkWm9uZSA+IHRoaXMud2lkdGgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmZvbGxvd2luZy54IC0gKHRoaXMud2lkdGggLSB0aGlzLnhEZWFkWm9uZSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5mb2xsb3dpbmcueCAtIHRoaXMueERlYWRab25lIDwgdGhpcy54KVxyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5mb2xsb3dpbmcueCAtIHRoaXMueERlYWRab25lO1xyXG4gICAgICAgICAgICBpZih0aGlzLmZvbGxvd2luZy55IC0gdGhpcy55ICsgdGhpcy55RGVhZFpvbmUgPiB0aGlzLmhlaWdodClcclxuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuZm9sbG93aW5nLnkgLSAodGhpcy5oZWlnaHQgLSB0aGlzLnlEZWFkWm9uZSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5mb2xsb3dpbmcueSAtIHRoaXMueURlYWRab25lIDwgdGhpcy55KVxyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5mb2xsb3dpbmcueSAtIHRoaXMueURlYWRab25lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnggPCAwKVxyXG4gICAgICAgICAgICB0aGlzLnggPSAwO1xyXG4gICAgICAgIGlmKHRoaXMueSA8IDApXHJcbiAgICAgICAgICAgIHRoaXMueSA9IDA7XHJcbiAgICAgICAgaWYodGhpcy54ICsgdGhpcy53aWR0aCA+IHRoaXMud29ybGRXaWR0aClcclxuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy53b3JsZFdpZHRoIC0gdGhpcy53aWR0aDtcclxuICAgICAgICBpZih0aGlzLnkgKyB0aGlzLmhlaWdodCA+IHRoaXMud29ybGRIZWlnaHQpXHJcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMud29ybGRIZWlnaHQgLSB0aGlzLmhlaWdodDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2FtZXJhOyIsImltcG9ydCBQaXN0b2wgZnJvbSAnLi4vV2VhcG9ucy9QaXN0b2wuanMnXG5pbXBvcnQgU25pcGVyIGZyb20gJy4uL1dlYXBvbnMvU25pcGVyLmpzJ1xuaW1wb3J0IFNob3RndW4gZnJvbSAnLi4vV2VhcG9ucy9TaG90Z3VuLmpzJ1xuaW1wb3J0IEFzc2F1bHRSaWZsZSBmcm9tICcuLi9XZWFwb25zL0Fzc2F1bHRSaWZsZS5qcydcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcblxuY2xhc3MgUGxheWVyIHtcbiAgLy90aGlzLnggPSB4IHBvc2l0aW9uXG4gIC8vdGhpcy55ID0geSBwb3NpdGlvblxuICAvL3RoaXMuaGVhbHRoID0gcGxheWVyJ3MgbGlmZVxuICAvL3RoaXMuc3BlZWQgPSBwbGF5ZXIncyBtb3Zlc3BlZWRcbiAgLy90aGlzLmxvYWRJbWFnZSgpIGlzIGEgZnVuY3Rpb24gdG8gYXR0YWNoIHRoZSBpbWFnZSB0byB0aGUgcGxheWVyLlxuICAvL1RoZSBwbGF5ZXIgaGFzIGFuIGFycmF5IHRvIGhvbGQgaGlzIGl0ZW1zIGFuZCBoZSB3aWxsIHN0YXJ0IHdpdGggYSBwaXN0b2wgYW5kIHNuaXBlciB0aGlzIHdlZWsgZm9yIGVhc3kgdGVzdGluZ1xuICAvL05leHQgd2VlayBpdGVtcyB3aWxsIGJlIHBpY2tlZCB1cCBieSB3YWxraW5nIG92ZXIgdGhlbSBhbmQgYXMgc3VjaCB0aGVyZSB3aWxsIG5lZWQgdG8gYmUgYW4gYWRkSXRlbSBmdW5jdGlvblxuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICB0aGlzLnggPSB4O1xuICAgICAgdGhpcy55ID0geTtcbiAgICAgIHRoaXMuaGVhbHRoID0gMTAwO1xuICAgICAgdGhpcy5zcGVlZCA9IDI1NjtcbiAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgICB0aGlzLmxvYWREYW1hZ2VUYWtlblNvdW5kKCdBdWRpby9EYW1hZ2VUYWtlbi5tcDMnKTtcbiAgICAgIGxldCBzdGFydF9waXN0b2wgPSBuZXcgUGlzdG9sKCk7XG4gICAgICBsZXQgc3RhcnRfc25pcGVyID0gbmV3IFNuaXBlcigpO1xuICAgICAgbGV0IHN0YXJ0X3JpZmxlID0gbmV3IEFzc2F1bHRSaWZsZSgpO1xuICAgICAgbGV0IHN0YXJ0X3Nob3RndW4gPSBuZXcgU2hvdGd1bigpO1xuICAgICAgdGhpcy5pbnZlbnRvcnkgPSBbc3RhcnRfcGlzdG9sXTtcbiAgICAgIHRoaXMuYWN0aXZlX2luZGV4ID0gMDtcbiAgfVxuXG4gICAgaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoVXRpbC5pc0NvbGxpc2lvbihlbnZpcm9ubWVudE9iamVjdHNbaV0sIHRoaXMpICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gIGxvYWRJbWFnZSgpIHtcbiAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgfTtcbiAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gXCJHcmFwaGljcy9QbGF5ZXIucG5nXCI7XG4gIH1cblxuICBsb2FkRGFtYWdlVGFrZW5Tb3VuZCh1cmwpIHtcbiAgICAgIHRoaXMuaXNTb3VuZDFMb2FkZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGFtYWdlVGFrZW5Tb3VuZCA9IG5ldyBBdWRpbygpO1xuICAgICAgdGhpcy5kYW1hZ2VUYWtlblNvdW5kLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzU291bmQxTG9hZGVkID0gdHJ1ZTtcbiAgICAgIH07XG4gICAgICB0aGlzLmRhbWFnZVRha2VuU291bmQuc3JjID0gdXJsO1xuICB9XG5cbiAgICBkcmF3KGN0eCwgY2FtZXJhLCBtb3VzZSkge1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHgudHJhbnNsYXRlKCh0aGlzLngrdGhpcy53aWR0aC8yKSAtIGNhbWVyYS54LCAodGhpcy55K3RoaXMuaGVpZ2h0LzIpIC0gY2FtZXJhLnkpO1xuICAgICAgICBsZXQgYW5nbGUgPSBNYXRoLmF0YW4yKG1vdXNlWzFdIC0gKHRoaXMueSt0aGlzLmhlaWdodC8yLWNhbWVyYS55KSwgbW91c2VbMF0gLSAodGhpcy54K3RoaXMud2lkdGgvMi1jYW1lcmEueCkpO1xuICAgICAgICBjdHgucm90YXRlKGFuZ2xlKyhNYXRoLlBJLzIpKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAwLXRoaXMud2lkdGgvMiwgMC10aGlzLmhlaWdodC8yKTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsIi8qXHJcbiAgU291cmNlczpcclxuICBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0dhbWVzL1RlY2huaXF1ZXMvMkRfY29sbGlzaW9uX2RldGVjdGlvblxyXG4gIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ5NTk5NzUvZ2VuZXJhdGUtcmFuZG9tLW51bWJlci1iZXR3ZWVuLXR3by1udW1iZXJzLWluLWphdmFzY3JpcHRcclxuKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgVXRpbCBjbGFzcyBjb250YWlucyB2YXJpb3VzIHV0aWxpdHkgZnVuY3Rpb25zLlxyXG4gKi9cclxuY2xhc3MgVXRpbCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgaXNDb2xsaXNpb24gbWV0aG9kIGNoZWNrcyBpZiB0aGVyZSBpcyBhIGNvbGxpc2lvbiBiZXR3ZWVuIHRoZSB0d28gaW5wdXR0ZWQgcmVjdGFuZ2xlcy4gVGhpcyBhbGdvcml0aG0gb25seVxyXG4gICAgICogd29ya3Mgd2l0aCBheGlzLWFsaWduZWQgcmVjdGFuZ2xlcy5cclxuICAgICAqIEBwYXJhbSByZWN0YW5nbGUxIFRoZSBmaXJzdCByZWN0YW5nbGUuXHJcbiAgICAgKiBAcGFyYW0gcmVjdGFuZ2xlMiBUaGUgc2Vjb25kIHJlY3RhbmdsZS5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIHRoZXJlIGV4aXN0cyBhIGNvbGxpc2lvbiBiZXR3ZWVuIHRoZSB0d28gaW5wdXR0ZWQgcmVjdGFuZ2xlcy5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzQ29sbGlzaW9uKHJlY3RhbmdsZTEsIHJlY3RhbmdsZTIpIHtcclxuICAgICAgICBpZihyZWN0YW5nbGUxLnggPCByZWN0YW5nbGUyLnggKyByZWN0YW5nbGUyLndpZHRoICYmXHJcbiAgICAgICAgICAgIHJlY3RhbmdsZTEueCArIHJlY3RhbmdsZTEud2lkdGggPiByZWN0YW5nbGUyLnggJiZcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMS55IDwgcmVjdGFuZ2xlMi55ICsgcmVjdGFuZ2xlMi5oZWlnaHQgJiZcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMS55ICsgcmVjdGFuZ2xlMS5oZWlnaHQgPiByZWN0YW5nbGUyLnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgdGhlcmUgYXJlIGFueSBjb2xsaXNpb25zIGJldHdlZW4gdGhlIHR3byBhcnJheXMuIFRoaXMgYWxnb3JpdGhtIG9ubHkgd29ya3Mgd2l0aFxyXG4gICAgICogYXhpcy1hbGlnbmVkIHJlY3RhbmdsZXMuXHJcbiAgICAgKiBAcGFyYW0gYXJyYXkxIEFuIGFycmF5IG9mIHJlY3RhbmdsZXMuXHJcbiAgICAgKiBAcGFyYW0gYXJyYXkyIEFuIGFycmF5IG9mIHJlY3RhbmdsZXMuXHJcbiAgICAgKiBAcmV0dXJucyB7aW50ZWdlcn0gLTEgaWYgdGhlcmUgYXJlIG5vIGNvbGxpc2lvbnMgb3IgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBhcnJheSBpZiB0aGVyZSBpcy5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFyZUFueUNvbGxpc2lvbnMoYXJyYXkxLCBhcnJheTIpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyYXkxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBhcnJheTIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb24oYXJyYXkxW2ldLCBhcnJheTJbal0pKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYXJlQW55Q29sbGlzaW9uc0luU2FtZUFycmF5KGFycmF5KSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBhcnJheS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoaSAhPT0gaikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb24oYXJyYXlbaV0sIGFycmF5W2pdKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgcmFuZG9tIG51bWJlciBpbiB0aGUgZ2l2ZW4gaW50ZXJ2YWwuXHJcbiAgICAgKiBAcGFyYW0gZnJvbVxyXG4gICAgICogQHBhcmFtIHRvXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmFuZG9tSW50RnJvbUludGVydmFsKGZyb20sIHRvKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0byAtIGZyb20gKyAxKSArIGZyb20pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFV0aWw7IiwiaW1wb3J0IFdlYXBvbiBmcm9tICcuL1dlYXBvbi5qcyc7XHJcblxyXG5jbGFzcyBBc3NhdWx0UmlmbGUgZXh0ZW5kcyBXZWFwb257XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKDUsIDMwLCAuMSk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJBc3NhdWx0IFJpZmxlXCI7XHJcbiAgICAgICAgc3VwZXIubG9hZFNob290U291bmQoJ0F1ZGlvL1JpZmxlU2hvdC5tcDMnKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBBc3NhdWx0UmlmbGU7XHJcbiIsImltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcblxuY2xhc3MgQnVsbGV0e1xuICAgIGNvbnN0cnVjdG9yKHZlbG9jaXR5LCBkYW1hZ2UsIHgsIHksIGRlc3RYLCBkZXN0WSwgcGVuZXRyYXRlcykge1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdmVsb2NpdHk7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLmRlc3RYID0gZGVzdFg7XG4gICAgICAgIHRoaXMuZGVzdFkgPSBkZXN0WTtcbiAgICAgICAgdGhpcy5saXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc1BlbmV0cmF0aW5nID0gcGVuZXRyYXRlcztcbiAgICAgICAgbGV0IGRpZmZYID0gdGhpcy5kZXN0WCAtIHRoaXMueDtcbiAgICAgICAgbGV0IGRpZmZZID0gdGhpcy5kZXN0WSAtIHRoaXMueTtcbiAgICAgICAgdGhpcy5saXZlVGltZSA9IDA7XG4gICAgICAgIC8vVGhpcyBsb2dpYyBmaW5kcyBhIGNvZWZmaWNpZW50IGZvciBYIGFuZCBZIHRoYXQgY2FuIGJlIGFwcGxpZWRcbiAgICAgICAgLy90byB0aGUgbW92ZSBmdW5jdGlvbiBpbiBvcmRlciB0byBtb3ZlIHRoZSBidWxsZXQgaW4gYSBzdHJhaWdodCBsaW5lXG4gICAgICAgIC8vZGlyZWN0bHkgdG8gaXRzIGRlc3RpbmF0aW9uLlxuICAgICAgICBpZihNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpIHtcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWCk7XG4gICAgICAgICAgICB0aGlzLmNvZWZmWSA9IGRpZmZZIC8gTWF0aC5hYnMoZGlmZlgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb2VmZlkgPSBkaWZmWSAvIE1hdGguYWJzKGRpZmZZKTtcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9hZEltYWdlKHVybCkge1xuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xuICAgIH1cbiAgICAvL01vdmVzIHRoZSBidWxsZXQgZnJvbSBpdHMgc3RhcnRpbmcgcG9pbnQgKHdoaWNoIHdpbGwgYmUgdGhlIHBsYXllcidzIGxvY2F0aW9uKVxuICAgIC8vdG8gaXRzIGRlc3RpbmF0aW9uICh3aGljaCB3aWxsIGJlIHRoZSBjdXJzb3IgbG9jYXRpb24gd2hlbiB0aGUgYnVsbGV0IGlzIGNyZWF0ZWQpLlxuICAgIC8vRWFjaCB0aW1lIG1vdmUgaXMgY2FsbGVkIGl0IGlzIGNoZWNrZWQgaWYgdGhlIGJ1bGxldCBoaXRzIGFueXRoaW5nLCBpZiBpdCBkb2VzIHRoZVxuICAgIC8vaGl0U29tZXRoaW5nIG1ldGhvZCB3aWxsIGNhbGwgYSBkYW1hZ2UgZnVuY3Rpb24gYW5kIHRoZSBkYW1hZ2Ugd2lsbCBiZSBhcHBsaWVkLCBzb1xuICAgIC8vdGhpcyBmdW5jdGlvbiBzZXRzIHRoaXMubGl2ZSA9IGZhbHNlIG1lYW5pbmcgdGhlIGJ1bGxldCBpcyBubyBsb25nZXIgbGl2ZS5cbiAgICAvL0lmIHRoZSBidWxsZXQgaXNQZW5ldHJhdGluZyB0aGF0IG1lYW5zIGl0IHdpbGwgbm90IGJlIHNldCB0byAnZGVhZCcgdXBvbiBhIGNvbGxpc2lvbiB3aXRoIHNvbWV0aGluZ1xuICAgIC8vVGhpcyBhbGxvd3MgcGVuZXRyYXRpbmcgYnVsbGV0cyB0byB0cmF2ZWwgdGhyb3VnaCBtdWx0aXBsZSB0YXJnZXRzIGFuZCB0aHJvdWdoIHdvcmxkIG9iamVjdHMuXG4gICAgbW92ZShtb2RpZmllciwgZW52aXJvbm1lbnRPYmplY3RzLCBlbmVtaWVzKXtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXIqdGhpcy5jb2VmZlg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyKnRoaXMuY29lZmZZO1xuICAgICAgICB0aGlzLmxpdmVUaW1lICs9IG1vZGlmaWVyO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxpdmVUaW1lKTtcbiAgICAgICAgaWYodGhpcy5oaXRTb21ldGhpbmcoZW52aXJvbm1lbnRPYmplY3RzLCBlbmVtaWVzKSAmJiB0aGlzLmlzUGVuZXRyYXRpbmcgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMueCA8IDAgfHwgdGhpcy54ID4gMTAwMDAgfHwgdGhpcy55IDwgMCB8fCB0aGlzLnkgPiA1NjI1KSB7XG4gICAgICAgICAgICB0aGlzLmxpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmxpdmVUaW1lID4gLjUgJiYgdGhpcy5pc1BlbmV0cmF0aW5nID09IGZhbHNlKXtcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vQ2hlY2tzIGlmIHRoZSBidWxsZXQgaGl0IGFueSBvZiBvdXIgb2JqZWN0cyB0aGF0IGNhbiBiZSBoaXQsIGlmIHNvIHRoYXQgb2JqZWN0IGxvc2VzIEhQXG4gICAgLy9hbmQgdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB0byBpbmRpY2F0ZSB0aGF0IHRoZSBvYmplY3Qgd2FzIGhpdC4gSWYgbm90LCBmYWxzZSBpcyByZXR1cm5lZFxuICAgIC8vYW5kIG5vdGhpbmcgaXMgZG9uZS5cbiAgICBkYW1hZ2VFbmVteShlbmVteU9iamVjdCkge1xuICAgICAgICBlbmVteU9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XG4gICAgfVxuXG4gICAgZGFtYWdlRW52aXJvbm1lbnQoZW52aXJvbm1lbnRPYmplY3Qpe1xuICAgICAgICBlbnZpcm9ubWVudE9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XG4gICAgfVxuICAgIC8vQ2hlY2tzIGlmIHdlIGhpdCBhbiBlbnZpcm9ubWVudCBvYmplY3QgdGhlbiBjaGVja3MgaWYgd2UgaGl0IGFuIGVuZW15LiBpbiBlaXRoZXIgY2FzZSBpdCBjYWxscyB0aGVcbiAgICAvL2NvcnJlc3BvbmRpbmcgZGFtYWdlIGZ1bmN0aW9uIGFuZCB0aGVuIHJldHVybnMgdHJ1ZSB0byBpbmRpY2F0ZSB0aGF0IHNvbWV0aGluZyB3YXMgaGl0LCB3aGljaCB0ZWxscyBtb3ZlIHRvIHNldCB0aGVcbiAgICAvL2J1bGxldCdzIGxpdmUgdmFsdWUgYWNjb3JkaW5nbHlcbiAgICBoaXRTb21ldGhpbmcoZW52aXJvbm1lbnRPYmplY3RzLCBlbmVtaWVzKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgZW52aXJvbm1lbnRPYmplY3RzW2ldKSAmJiBlbnZpcm9ubWVudE9iamVjdHNbaV0uaXNCbG9ja2luZykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlRW52aXJvbm1lbnQoZW52aXJvbm1lbnRPYmplY3RzW2ldKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZW5lbWllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbmVtaWVzW2ldKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VFbmVteShlbmVtaWVzW2ldKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ7XG4iLCJpbXBvcnQgQnVsbGV0IGZyb20gJy4vQnVsbGV0LmpzJztcclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG5cclxuLy9UaGUgNTAgY2FsaWJlciB3aWxsIHBlbmV0cmF0ZSB0aHJvdWdoIG9iamVjdHMgYW5kIG9ubHkgc3RvcHMgYmVpbmcgbGl2ZVxyXG4vL29uY2UgaXQgZXhpdHMgdGhlIGNhbnZhcywgc28gaXRzIGRhbWFnZSBpcyBzZXQgdG8gYSBzbWFsbCBudW1iZXIgYXMgaXQgZGVhbHNcclxuLy9kYW1hZ2UgZHVyaW5nIGVhY2ggZnJhbWUgYXMgaXQgcGVuZXRyYXRlcyB0aGUgb2JqZWN0IG9yIGVuZW15XHJcbmNsYXNzIEJ1bGxldDEyR2F1Z2UgZXh0ZW5kcyBCdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgZGVzdFgsIGRlc3RZKSB7XHJcbiAgICAgICAgc3VwZXIoMTAwMCwgOCwgeCwgeSwgZGVzdFgsIGRlc3RZLCBmYWxzZSk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvYnVsbGV0My5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQnVsbGV0MTJHYXVnZTtcclxuIiwiaW1wb3J0IEJ1bGxldCBmcm9tICcuL0J1bGxldC5qcyc7XHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbi8vVGhlIDUwIGNhbGliZXIgd2lsbCBwZW5ldHJhdGUgdGhyb3VnaCBvYmplY3RzIGFuZCBvbmx5IHN0b3BzIGJlaW5nIGxpdmVcclxuLy9vbmNlIGl0IGV4aXRzIHRoZSBjYW52YXMsIHNvIGl0cyBkYW1hZ2UgaXMgc2V0IHRvIGEgc21hbGwgbnVtYmVyIGFzIGl0IGRlYWxzXHJcbi8vZGFtYWdlIGR1cmluZyBlYWNoIGZyYW1lIGFzIGl0IHBlbmV0cmF0ZXMgdGhlIG9iamVjdCBvciBlbmVteVxyXG5jbGFzcyBCdWxsZXQ1MGNhbCBleHRlbmRzIEJ1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBkZXN0WCwgZGVzdFkpIHtcclxuICAgICAgICBzdXBlcigyNTAwLCA3LCB4LCB5LCBkZXN0WCwgZGVzdFksIHRydWUpO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL2J1bGxldDMucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ1MGNhbDtcclxuIiwiaW1wb3J0IEJ1bGxldCBmcm9tICcuL0J1bGxldC5qcyc7XHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbi8vVGhlIDUwIGNhbGliZXIgd2lsbCBwZW5ldHJhdGUgdGhyb3VnaCBvYmplY3RzIGFuZCBvbmx5IHN0b3BzIGJlaW5nIGxpdmVcclxuLy9vbmNlIGl0IGV4aXRzIHRoZSBjYW52YXMsIHNvIGl0cyBkYW1hZ2UgaXMgc2V0IHRvIGEgc21hbGwgbnVtYmVyIGFzIGl0IGRlYWxzXHJcbi8vZGFtYWdlIGR1cmluZyBlYWNoIGZyYW1lIGFzIGl0IHBlbmV0cmF0ZXMgdGhlIG9iamVjdCBvciBlbmVteVxyXG5jbGFzcyBCdWxsZXQ1NTYgZXh0ZW5kcyBCdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgZGVzdFgsIGRlc3RZKSB7XHJcbiAgICAgICAgc3VwZXIoMjAwMCwgMTIsIHgsIHksIGRlc3RYLCBkZXN0WSwgZmFsc2UpO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL2J1bGxldDMucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEJ1bGxldDU1NjtcclxuIiwiaW1wb3J0IEJ1bGxldCBmcm9tICcuL0J1bGxldC5qcyc7XHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuLy90aGUgOW1tIGJ1bGxldCBpcyBhIHNpbXBsZSBwaXN0b2wgYnVsbGV0IHRoYXQgd2lsbCBiZSBpbiB0aGVcclxuLy91c2VyJ3Mgc3RhcnRpbmcgd2VhcG9uLiBpdCBkb2VzIG1pbmltYWwgZGFtYWdlIGFuZCBtb3ZlcyBhdCBhIHNsb3cgc3BlZWQuXHJcbi8vdGhlIHZhbHVlIG9mIGlzUGVuZXRyYXRpbmcgaXMgc2V0IHRvIGZhbHNlIHRvIGluZGljYXRlIHRoZSBidWxsZXQgc2hvdWxkXHJcbi8vbm90IGJlIGxpdmUgYWZ0ZXIgaXQgY29sbGlkZXMgd2l0aCBzb21ldGhpbmcgYW5kIGRvZXMgaXRzIGRhbWFnZS5cclxuLy9pbiB0aGUgZnV0dXJlIHRoZSBidWxsZXQgd2lsbCBoYXZlIGEgbWF4aW11bSByYW5nZS9saXZlIHRpbWUgdG9cclxuLy9saW1pdCBpdHMgdXNlZnVsbmVzcyBtb3JlLlxyXG5jbGFzcyBCdWxsZXQ5bW0gZXh0ZW5kcyBCdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgZGVzdFgsIGRlc3RZKSB7XHJcbiAgICAgICAgc3VwZXIoMTAwMCwgMTAsIHgsIHksIGRlc3RYLCBkZXN0WSwgZmFsc2UpO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL2J1bGxldDMucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ5bW07XHJcbiIsImltcG9ydCBCdWxsZXQgZnJvbSAnLi9CdWxsZXQuanMnO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vL1RoZSA1MCBjYWxpYmVyIHdpbGwgcGVuZXRyYXRlIHRocm91Z2ggb2JqZWN0cyBhbmQgb25seSBzdG9wcyBiZWluZyBsaXZlXHJcbi8vb25jZSBpdCBleGl0cyB0aGUgY2FudmFzLCBzbyBpdHMgZGFtYWdlIGlzIHNldCB0byBhIHNtYWxsIG51bWJlciBhcyBpdCBkZWFsc1xyXG4vL2RhbWFnZSBkdXJpbmcgZWFjaCBmcmFtZSBhcyBpdCBwZW5ldHJhdGVzIHRoZSBvYmplY3Qgb3IgZW5lbXlcclxuY2xhc3MgQnVsbGV0RmlyZSBleHRlbmRzIEJ1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBkZXN0WCwgZGVzdFkpIHtcclxuICAgICAgICBzdXBlcig1MDAsIDIsIHgsIHksIGRlc3RYLCBkZXN0WSwgZmFsc2UpO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0ZpcmUucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEJ1bGxldEZpcmU7XHJcbiIsImltcG9ydCBXZWFwb24gZnJvbSAnLi9XZWFwb24uanMnO1xyXG5cclxuY2xhc3MgRmxhbWV0aHJvd2VyIGV4dGVuZHMgV2VhcG9ue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcig4LCAzMiwgLjA1KTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIkZsYW1ldGhyb3dlclwiO1xyXG4gICAgICAgIHN1cGVyLmxvYWRTaG9vdFNvdW5kKCdBdWRpby9GbGFtZXRocm93ZXJTb3VuZC5tcDMnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmxhbWV0aHJvd2VyO1xyXG4iLCIvL1RoZSBzbmlwZXIgaXMgb25seSBjdXJyZW50bHkgdXNlZCB0byBkZXRlcm1pbmUgdGhlIHR5cGUgb2YgYnVsbGV0IHRvIGJlIGdlbmVyYXRlZFxuLy9pbiBtYWluLmpzJyBldmVudCBoYW5kbGVyIGZvciBjbGlja3Ncbi8vSW4gdGhlIGZ1dHVyZSBpdCB3aWxsIGNvbnRyb2wgZmlyZSByYXRlIGFuZCB0aGUgYW1tbyBjYXBhY2l0eS5cbmltcG9ydCBXZWFwb24gZnJvbSAnLi9XZWFwb24uanMnO1xuXG5jbGFzcyBQaXN0b2wgZXh0ZW5kcyBXZWFwb257XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoMTUsIDkwLCAuNCk7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiUGlzdG9sXCI7XG4gICAgICAgIHN1cGVyLmxvYWRTaG9vdFNvdW5kKCdBdWRpby9QaXN0b2xTaG90Lm1wMycpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGlzdG9sO1xuIiwiaW1wb3J0IFdlYXBvbiBmcm9tICcuL1dlYXBvbi5qcyc7XHJcblxyXG5jbGFzcyBTaG90Z3VuIGV4dGVuZHMgV2VhcG9ue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcig4LCAzMiwgMSk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJTaG90Z3VuXCI7XHJcbiAgICAgICAgc3VwZXIubG9hZFNob290U291bmQoJ0F1ZGlvL1Nob3RndW5TaG90Lm1wMycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaG90Z3VuO1xyXG4iLCIvL1RoZSBzbmlwZXIgaXMgb25seSBjdXJyZW50bHkgdXNlZCB0byBkZXRlcm1pbmUgdGhlIHR5cGUgb2YgYnVsbGV0IHRvIGJlIGdlbmVyYXRlZFxyXG4vL2luIG1haW4uanMnIGV2ZW50IGhhbmRsZXIgZm9yIGNsaWNrc1xyXG4vL0luIHRoZSBmdXR1cmUgaXQgd2lsbCBjb250cm9sIGZpcmUgcmF0ZSBhbmQgdGhlIGFtbW8gY2FwYWNpdHkuXHJcbmltcG9ydCBXZWFwb24gZnJvbSAnLi9XZWFwb24uanMnO1xyXG5cclxuY2xhc3MgU25pcGVyIGV4dGVuZHMgV2VhcG9ue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcig1LCAzMCwgMS43NSk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJTbmlwZXJcIjtcclxuICAgICAgICBzdXBlci5sb2FkU2hvb3RTb3VuZCgnQXVkaW8vU25pcGVyU2hvdC5tcDMnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU25pcGVyO1xyXG4iLCIvL2NsaXBTaXplIGFuZCBhbW1vIHdpbGwgYmUgdXNlZCBhcyBleHBlY3RlZCBuZXh0IHdlZWtcbi8vYXV0b21hdGljIHdpbGwgYmUgdXNlZCBhcyBhIGJvb2xlYW4gZm9yIHdoZXRoZXIgb3Igbm90XG4vL2hvbGRpbmcgY2xpY2sgc2hvdWxkIGNvbnRpbnVvdXNseSBmaXJlLlxuLy9UaGUgbmFtZSBmaWVsZCBpcyB1c2VkIGZvciB0aGUgSFVEIGRpc3BsYXlpbmcgdGhlIGFjdGl2ZSB3ZWFwb24uXG5jbGFzcyBXZWFwb24ge1xuXG4gICAgY29uc3RydWN0b3IoY2xpcFNpemUsIG1heEFtbW8sIG1heENvb2xEb3duKSB7XG4gICAgICAgIHRoaXMuY2xpcFNpemUgPSBjbGlwU2l6ZTtcbiAgICAgICAgdGhpcy5tYXhBbW1vID0gbWF4QW1tbztcbiAgICAgICAgdGhpcy5uYW1lID0gJyc7XG4gICAgICAgIHRoaXMuY29vbGRvd24gPSAwO1xuICAgICAgICB0aGlzLm1heENvb2xEb3duID0gbWF4Q29vbERvd247XG4gICAgfVxuICAgIGxvYWRTaG9vdFNvdW5kKHVybCkge1xuICAgICAgICB0aGlzLmlzU291bmRMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zb3VuZCA9IG5ldyBBdWRpbygpO1xuICAgICAgICB0aGlzLnNvdW5kLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNTb3VuZExvYWRlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc291bmQuc3JjID0gdXJsO1xuICAgIH1cbiAgICBhZGRDb29sZG93bigpe1xuICAgICAgdGhpcy5jb29sZG93biArPSB0aGlzLm1heENvb2xEb3duO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWFwb247XG4iXX0=
