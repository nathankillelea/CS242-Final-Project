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

},{"../Utilities/Util.js":26}],3:[function(require,module,exports){
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

},{"../Utilities/Util.js":26}],4:[function(require,module,exports){
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

var _Bullet50cal = require('../Weapons/Bullet50cal');

var _Bullet50cal2 = _interopRequireDefault(_Bullet50cal);

var _Bullet = require('../Weapons/Bullet556');

var _Bullet2 = _interopRequireDefault(_Bullet);

var _Bullet12Gauge = require('../Weapons/Bullet12Gauge');

var _Bullet12Gauge2 = _interopRequireDefault(_Bullet12Gauge);

var _Bullet9mm = require('../Weapons/Bullet9mm');

var _Bullet9mm2 = _interopRequireDefault(_Bullet9mm);

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

},{"../Cursor.js":1,"../Enemies/EnemyProjectile":3,"../Enemies/FinalBoss":4,"../Enemies/MiniBoss":6,"../Enemies/ProjectileEnemy":8,"../Utilities/Util.js":26,"../Weapons/AssaultRifle":27,"../Weapons/Bullet12Gauge":29,"../Weapons/Bullet50cal":30,"../Weapons/Bullet556":31,"../Weapons/Bullet9mm":32,"../Weapons/Pistol":33,"../Weapons/Shotgun":34,"../Weapons/Sniper":35,"./Controller.js":15,"./World.js":17}],17:[function(require,module,exports){
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
            var healthPackCap = 7;

            for (var i = 0; i < sniperCap; i++) {
                this.groundWeapons.push(new _GroundSniper2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i4 = 0; _i4 < assaultRifleCap; _i4++) {
                this.groundWeapons.push(new _GroundAssaultRifle2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i5 = 0; _i5 < shotgunCap; _i5++) {
                this.groundWeapons.push(new _GroundShotgun2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i6 = 0; _i6 < healthPackCap; _i6++) {
                this.pickUps.push(new _Healthpack2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }var selfCollisionFlag = true;
            while (selfCollisionFlag) {
                var _i7 = _Util2.default.areAnyCollisionsInSameArray(this.groundWeapons);
                if (_i7 === -1) selfCollisionFlag = false;else this.groundWeapons[_i7].setPosition(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375));
            }

            selfCollisionFlag = true;
            while (selfCollisionFlag) {
                var _i8 = _Util2.default.areAnyCollisionsInSameArray(this.pickUps);
                if (_i8 === -1) selfCollisionFlag = false;else this.pickUps[_i8].setPosition(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375));
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
                }for (var _i9 = 0; _i9 < regularEnemyCap; _i9++) {
                    this.enemies.push(new _RegularEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
                }for (var _i10 = 0; _i10 < tankEnemyCap; _i10++) {
                    this.enemies.push(new _TankEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
                }for (var _i11 = 0; _i11 < projectileEnemyCap; _i11++) {
                    this.enemies.push(new _ProjectileEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
                }for (var _i12 = 0; _i12 < miniBossCap; _i12++) {
                    this.enemies.push(new _MiniBoss2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
                }for (var _i13 = 0; _i13 < parasiteEnemyCap; _i13++) {
                    this.enemies.push(new _ParasiteEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
                }
            }

            var collisionFlag = true;
            while (collisionFlag === true) {
                var _i14 = _Util2.default.areAnyCollisions(this.enemies, this.environmentObjects);
                if (_i14 === -1) collisionFlag = false;else this.enemies[_i14].setPosition(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375));
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

},{"../Enemies/FinalBoss":4,"../Enemies/LightEnemy":5,"../Enemies/MiniBoss":6,"../Enemies/ParasiteEnemy":7,"../Enemies/ProjectileEnemy":8,"../Enemies/RegularEnemy":9,"../Enemies/TankEnemy":10,"../EnvironmentObjects/Bush":11,"../EnvironmentObjects/Crate":12,"../EnvironmentObjects/Rock":14,"../PickUps/GroundAssaultRifle.js":19,"../PickUps/GroundShotgun.js":20,"../PickUps/GroundSniper.js":21,"../PickUps/Healthpack.js":23,"../Players/Camera":24,"../Players/Player":25,"../Utilities/Util":26}],18:[function(require,module,exports){
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

},{"../Weapons/AssaultRifle.js":27,"./GroundWeapon.js":22}],20:[function(require,module,exports){
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

},{"../Weapons/Shotgun.js":34,"./GroundWeapon.js":22}],21:[function(require,module,exports){
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

},{"../Weapons/Sniper.js":35,"../Weapons/Weapon.js":36,"./GroundWeapon.js":22}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{"../Utilities/Util.js":26,"../Weapons/AssaultRifle.js":27,"../Weapons/Pistol.js":33,"../Weapons/Shotgun.js":34,"../Weapons/Sniper.js":35}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{"./Weapon.js":36}],28:[function(require,module,exports){
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

},{"../Utilities/Util.js":26}],29:[function(require,module,exports){
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

},{"../Utilities/Util.js":26,"./Bullet.js":28}],30:[function(require,module,exports){
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

},{"../Utilities/Util.js":26,"./Bullet.js":28}],31:[function(require,module,exports){
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

},{"../Utilities/Util.js":26,"./Bullet.js":28}],32:[function(require,module,exports){
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

},{"../Utilities/Util.js":26,"./Bullet.js":28}],33:[function(require,module,exports){
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

},{"./Weapon.js":36}],34:[function(require,module,exports){
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

},{"./Weapon.js":36}],35:[function(require,module,exports){
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

},{"./Weapon.js":36}],36:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDdXJzb3IuanMiLCJFbmVtaWVzL0VuZW15LmpzIiwiRW5lbWllcy9FbmVteVByb2plY3RpbGUuanMiLCJFbmVtaWVzL0ZpbmFsQm9zcy5qcyIsIkVuZW1pZXMvTGlnaHRFbmVteS5qcyIsIkVuZW1pZXMvTWluaUJvc3MuanMiLCJFbmVtaWVzL1BhcmFzaXRlRW5lbXkuanMiLCJFbmVtaWVzL1Byb2plY3RpbGVFbmVteS5qcyIsIkVuZW1pZXMvUmVndWxhckVuZW15LmpzIiwiRW5lbWllcy9UYW5rRW5lbXkuanMiLCJFbnZpcm9ubWVudE9iamVjdHMvQnVzaC5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9DcmF0ZS5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9FbnZpcm9ubWVudE9iamVjdC5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9Sb2NrLmpzIiwiR2FtZS9Db250cm9sbGVyLmpzIiwiR2FtZS9HYW1lLmpzIiwiR2FtZS9Xb3JsZC5qcyIsIk1haW4uanMiLCJQaWNrVXBzL0dyb3VuZEFzc2F1bHRSaWZsZS5qcyIsIlBpY2tVcHMvR3JvdW5kU2hvdGd1bi5qcyIsIlBpY2tVcHMvR3JvdW5kU25pcGVyLmpzIiwiUGlja1Vwcy9Hcm91bmRXZWFwb24uanMiLCJQaWNrVXBzL0hlYWx0aHBhY2suanMiLCJQbGF5ZXJzL0NhbWVyYS5qcyIsIlBsYXllcnMvUGxheWVyLmpzIiwiVXRpbGl0aWVzL1V0aWwuanMiLCJXZWFwb25zL0Fzc2F1bHRSaWZsZS5qcyIsIldlYXBvbnMvQnVsbGV0LmpzIiwiV2VhcG9ucy9CdWxsZXQxMkdhdWdlLmpzIiwiV2VhcG9ucy9CdWxsZXQ1MGNhbC5qcyIsIldlYXBvbnMvQnVsbGV0NTU2LmpzIiwiV2VhcG9ucy9CdWxsZXQ5bW0uanMiLCJXZWFwb25zL1Bpc3RvbC5qcyIsIldlYXBvbnMvU2hvdGd1bi5qcyIsIldlYXBvbnMvU25pcGVyLmpzIiwiV2VhcG9ucy9X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KCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vSnVzdCBhIHBsdXMgY3Vyc29yIHRvIGJlIHJlbmRlcmVkIGF0IHRoZVxyXG4vL2N1cnNvcidzIGxvY2F0aW9uIGVhY2ggVXBkYXRlXHJcbi8vVGhlIGN1cnNvciBmb3IgdGhlIGVudGlyZSBIVE1MIGRvY3VtZW50IGlzIHR1cm5lZCBvZmYgdmlhIHN0eWxpbmcgb24gdGhlIGRvY3VtZW50LlxyXG5jbGFzcyBDdXJzb3Ige1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkSW1hZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBcIkdyYXBoaWNzL2Nyb3NzaGFpci5wbmdcIjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBDdXJzb3I7XHJcbiIsIi8qKlxyXG4gKiBTb3VyY2VzOlxyXG4gKiBodHRwczovL21lZGl1bS5jb20vQHl1cmliZXR0L2phdmFzY3JpcHQtYWJzdHJhY3QtbWV0aG9kLXdpdGgtZXM2LTVkYmVhNGIwMDAyN1xyXG4gKiBodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PUk1ZEFScEFQbE5rXHJcbiAqL1xyXG5cclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBFbmVteSBjbGFzcyBpcyB0aGUgcGFyZW50IGNsYXNzIGZvciBhbGwgb2YgdGhlIGVuZW1pZXMuXHJcbiAqL1xyXG5jbGFzcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gdmVsb2NpdHkgVGhlIHZlbG9jaXR5IG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSBoZWFsdGggVGhlIGhlYWx0aCBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gZGFtYWdlIFRoZSBkYW1hZ2Ugb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHBvaW50c09uS2lsbCBUaGUgcG9pbnRzIHJld2FyZGVkIGZvciBraWxsaW5nIHRoZSBFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgdmVsb2NpdHksIGhlYWx0aCwgZGFtYWdlLCBwb2ludHNPbktpbGwpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy5hbmdsZSA9IE1hdGguUEkvMjtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdmVsb2NpdHk7XHJcbiAgICAgICAgdGhpcy5oZWFsdGggPSBoZWFsdGg7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgdGhpcy5wb2ludHNPbktpbGwgPSBwb2ludHNPbktpbGw7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tDb29sZG93biA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbG9hZEltYWdlIGZ1bmN0aW9uIHRha2VzIGluIGEgdXJsIGFuZCBsb2FkcyBpdCBhcyBhbiBJbWFnZS4gT25jZSB0aGUgaW1hZ2UgaXMgbG9hZGVkLCB0aGlzLmlzSW1hZ2VMb2FkZWQgaXNcclxuICAgICAqIHNldCB0byB0cnVlLiBUaGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgRW5lbXkgYXJlIHNldCB0byB0aGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgaW1hZ2UuXHJcbiAgICAgKiBAcGFyYW0gdXJsIFRoZSB1cmwgdGhhdCBzaG91bGQgYmUgbG9hZGVkLlxyXG4gICAgICovXHJcbiAgICBsb2FkSW1hZ2UodXJsKSB7XHJcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGF0dGFjayBmdW5jdGlvbiB0YWtlcyBpbiBhbiBvYmplY3QgYW5kIHJlbW92ZXMgdGhlIGFtb3VudCBvZiBkYW1hZ2UgdGhlIEVuZW15IGRlYWxzIGZyb20gdGhlaXIgaGVhbHRoLlxyXG4gICAgICogNTAwIGlzIGFkZGVkIHRvIHRoZSBhdHRhY2sgY29vbGRvd24gb2YgdGhlIGVuZW15IGFmdGVyIGFuIGF0dGFjay5cclxuICAgICAqIEBwYXJhbSBvYmplY3QgVGhlIG9iamVjdCB0aGF0IGlzIGJlaW5nIGF0dGFja2VkLlxyXG4gICAgICovXHJcbiAgICBhdHRhY2sob2JqZWN0KSB7XHJcbiAgICAgICAgb2JqZWN0LmhlYWx0aCAtPSB0aGlzLmRhbWFnZTtcclxuICAgICAgICB0aGlzLmF0dGFja0Nvb2xkb3duICs9IDUwMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1vdmVzIHRoZSBlbmVteSB0b3dhcmRzIHRoZSBwbGF5ZXIuXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIFRoZSBwbGF5ZXIgb2JqZWN0IHRvIG1vdmUgdG93YXJkcy5cclxuICAgICAqIEBwYXJhbSBtb2RpZmllciBUaGUgbW9kaWZpZXIgdG8gYmUgbXVsdGlwbGllZCBieSB0aGUgdmVsb2NpdHkuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3RzIEFuIGFycmF5IG9mIGVudmlyb25tZW50IG9iamVjdHMuXHJcbiAgICAgKi9cclxuICAgIG1vdmUocGxheWVyLCBtb2RpZmllciwgZW52aXJvbm1lbnRPYmplY3RzLCBjYW1lcmEpIHtcclxuICAgICAgICBsZXQgZGlmZlggPSBwbGF5ZXIueCAtIHRoaXMueDtcclxuICAgICAgICBsZXQgZGlmZlkgPSBwbGF5ZXIueSAtIHRoaXMueTtcclxuXHJcbiAgICAgICAgbGV0IGNvZWZmWDtcclxuICAgICAgICBsZXQgY29lZmZZO1xyXG5cclxuICAgICAgICBpZihNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpIHtcclxuICAgICAgICAgICAgY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWCk7XHJcbiAgICAgICAgICAgIGNvZWZmWSA9IGRpZmZZIC8gTWF0aC5hYnMoZGlmZlgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29lZmZZID0gZGlmZlkgLyBNYXRoLmFicyhkaWZmWSk7XHJcbiAgICAgICAgICAgIGNvZWZmWCA9IGRpZmZYIC8gTWF0aC5hYnMoZGlmZlkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hbmdsZSA9IE1hdGguYXRhbjIocGxheWVyLnkrcGxheWVyLmhlaWdodC8yLWNhbWVyYS55IC0gKHRoaXMueSArIHRoaXMuaGVpZ2h0LzIgLSBjYW1lcmEueSksIHBsYXllci54K3BsYXllci53aWR0aC8yLWNhbWVyYS54IC0gKHRoaXMueCArIHRoaXMud2lkdGgvMiAtIGNhbWVyYS54KSk7XHJcblxyXG4gICAgICAgIGxldCBvbGRYID0gdGhpcy54O1xyXG4gICAgICAgIGxldCBvbGRZID0gdGhpcy55O1xyXG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyKmNvZWZmWDtcclxuICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcipjb2VmZlk7XHJcblxyXG4gICAgICAgIGlmKCh0aGlzLnggKyB0aGlzLndpZHRoID4gMTAwMDApIHx8ICh0aGlzLnggPCAwKSB8fCAodGhpcy55ICsgdGhpcy5oZWlnaHQgPiA1NjI1KSB8fCAodGhpcy55IDwgMCkgfHwgdGhpcy5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdChlbnZpcm9ubWVudE9iamVjdHMpKSAge1xyXG4gICAgICAgICAgICB0aGlzLnggPSBvbGRYO1xyXG4gICAgICAgICAgICB0aGlzLnkgPSBvbGRZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBwbGF5ZXIpICYmIHRoaXMuYXR0YWNrQ29vbGRvd24gPT09IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWFsdGggYmVmb3JlIGF0dGFja1wiICsgcGxheWVyLmhlYWx0aCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrKHBsYXllcik7XHJcbiAgICAgICAgICAgIHBsYXllci5kYW1hZ2VUYWtlblNvdW5kLnBsYXkoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWFsdGggYWZ0ZXIgYXR0YWNrXCIgKyBwbGF5ZXIuaGVhbHRoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBlbmVteSBnaXZlbiB4IGFuZCB5LlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gdG8gYmUgc2V0LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gdG8gYmUgc2V0LlxyXG4gICAgICovXHJcbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyBhIGhlbHBlciBmdW5jdGlvbiB1c2VkIGJ5IHRoZSBtb3ZlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBpZiB0aGVyZSBpcyBhIGNvbGxpc2lvbiBiZXR3ZWVuIGFuXHJcbiAgICAgKiBlbnZpcm9ubWVudCBvYmplY3QgYW5kIHRoZSBlbmVteS4gSWYgdGhlcmUgaXMgYSBjb2xsaXNpb24sIHRoZSBvYmplY3QgaXMgYXR0YWNrZWQuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3RzIEFuIGFycmF5IG9mIGVudmlyb25tZW50IG9iamVjdHMuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBhIGNvbGxpc2lvbiBleGlzdHMuXHJcbiAgICAgKi9cclxuICAgIGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KGVudmlyb25tZW50T2JqZWN0cykge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbnZpcm9ubWVudE9iamVjdHNbaV0pICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmF0dGFja0Nvb2xkb3duID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2soZW52aXJvbm1lbnRPYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkcmF3IGZ1bmN0aW9uIGRyYXdzIHRoZSBpbWFnZSBvbiB0aGUgY2FudmFzIGF0IHRoZSB4IGFuZCB5IHBvc2l0aW9uIG9mIHRoZSBMaWdodEVuZW15LlxyXG4gICAgICogQHBhcmFtIGN0eCBUaGUgY29udGV4dCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIGNhbWVyYSBUaGUgY2FtZXJhIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xyXG4gICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSgodGhpcy54ICsgdGhpcy53aWR0aC8yKSAtIGNhbWVyYS54LCAodGhpcy55ICsgdGhpcy5oZWlnaHQvMikgLSBjYW1lcmEueSk7XHJcbiAgICAgICAgY3R4LnJvdGF0ZSh0aGlzLmFuZ2xlKyhNYXRoLlBJLzIpKTtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDAtdGhpcy53aWR0aC8yLCAwLXRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVuZW15O1xyXG4iLCJpbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIEVuZW15UHJvamVjdGlsZSBjbGFzcyBpcyB0aGUgb2JqZWN0IHRoYXQgaXMgZmlyZWQgZnJvbSB0aGUgUHJvamVjdGlsZUVuZW15IGVuZW15LlxyXG4gKi9cclxuY2xhc3MgRW5lbXlQcm9qZWN0aWxlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBFbmVteVByb2plY3RpbGUgY2xhc3MgYW5kIGdldHMgdGhlIHggYW5kIHkgY29lZmZpY2llbnRzIGZvciB1c2VcclxuICAgICAqIGluIHRoZSBtb3ZlIGZ1bmN0aW9uLiBUaGUgbG9hZEltYWdlIGZ1bmN0aW9uIGlzIGFsc28gY2FsbGVkLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gZGVzdFggVGhlIHggZGVzdGluYXRpb24gb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBkZXN0WSBUaGUgeSBkZXN0aW5hdGlvbiBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBkZXN0WCwgZGVzdFkpIHtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gNjAwO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlID0gNTtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy5saXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgZGlmZlggPSBkZXN0WCAtIHRoaXMueDtcclxuICAgICAgICBsZXQgZGlmZlkgPSBkZXN0WSAtIHRoaXMueTtcclxuICAgICAgICBpZihNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jb2VmZlggPSBkaWZmWCAvIE1hdGguYWJzKGRpZmZYKTtcclxuICAgICAgICAgICAgdGhpcy5jb2VmZlkgPSBkaWZmWSAvIE1hdGguYWJzKGRpZmZYKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29lZmZZID0gZGlmZlkgLyBNYXRoLmFicyhkaWZmWSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIG1vdmVzIHRoZSBFbmVteVByb2plY3RpbGUgYWNjb3JkaW5nIHRvIHRoZSB4IGFuZCB5IGNvZWZmaWNpZW50cy5cclxuICAgICAqIEBwYXJhbSBtb2RpZmllciBUaGUgbW9kaWZpZXIgdG8gYmUgbXVsdGlwbGllZCBieSB0aGUgdmVsb2NpdHkuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3RzIFRoZSBhcnJheSBvZiBlbnZpcm9ubWVudCBvYmplY3RzLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgbW92ZShtb2RpZmllciwgZW52aXJvbm1lbnRPYmplY3RzLCBwbGF5ZXIpIHtcclxuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcip0aGlzLmNvZWZmWDtcclxuICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcip0aGlzLmNvZWZmWTtcclxuICAgICAgICBpZih0aGlzLmhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIHBsYXllcikpIHtcclxuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMueCA8IDAgfHwgdGhpcy54ID4gMTAwMDAgfHwgdGhpcy55IDwgMCB8fCB0aGlzLnkgPiA1NjI1KXtcclxuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB0YWtlcyBhd2F5IGhlYWx0aCBmcm9tIHRoZSBwbGF5ZXIgZXF1YWwgdG8gdGhlIGRhbWFnZSBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZGFtYWdlUGxheWVyKHBsYXllcikge1xyXG4gICAgICAgIHBsYXllci5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XHJcbiAgICAgICAgcGxheWVyLmRhbWFnZVRha2VuU291bmQucGxheSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB0YWtlcyBhd2F5IGhlYWx0aCBmcm9tIHRoZSBlbnZpcm9ubWVudCBvYmplY3QgZXF1YWwgdG8gdGhlIGRhbWFnZSBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0IFRoZSBlbnZpcm9ubWVudCBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGRhbWFnZUVudmlyb25tZW50KGVudmlyb25tZW50T2JqZWN0KXtcclxuICAgICAgICBlbnZpcm9ubWVudE9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyBpZiBhbiBlbnZpcm9ubWVudCBvYmplY3Qgb3IgYSBwbGF5ZXIgd2VyZSBoaXQgYnkgdGhlIHByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3RzIFRoZSBhcnJheSBvZiBlbnZpcm9ubWVudCBvYmplY3RzLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCBzb21ldGhpbmcgd2FzIGhpdC5cclxuICAgICAqL1xyXG4gICAgaGl0U29tZXRoaW5nKGVudmlyb25tZW50T2JqZWN0cywgcGxheWVyKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIGVudmlyb25tZW50T2JqZWN0c1tpXSkgJiYgZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzQmxvY2tpbmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlRW52aXJvbm1lbnQoZW52aXJvbm1lbnRPYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgcGxheWVyKSl7XHJcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlUGxheWVyKHBsYXllcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbG9hZEltYWdlIGZ1bmN0aW9uIGxvYWRzIHRoZSB1cmwgYXMgYW4gSW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0ltYWdlTG9hZGVkIGlzXHJcbiAgICAgKiBzZXQgdG8gdHJ1ZS4gVGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIEVuZW15UHJvamVjdGlsZSBhcmUgc2V0IHRvIHRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBpbWFnZS5cclxuICAgICAqL1xyXG4gICAgbG9hZEltYWdlKCkge1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IFwiR3JhcGhpY3MvRW5lbXlQcm9qZWN0aWxlLnBuZ1wiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRyYXcgZnVuY3Rpb24gZHJhd3MgdGhlIGltYWdlIG9uIHRoZSBjYW52YXMgYXQgdGhlIHggYW5kIHkgcG9zaXRpb24gb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBjdHggVGhlIGNvbnRleHQgb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjYW1lcmEgVGhlIGNhbWVyYSBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVuZW15UHJvamVjdGlsZTsiLCJpbXBvcnQgRW5lbXkgZnJvbSAnLi9FbmVteS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIEZpbmFsQm9zcyBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaXMgYSBoaWdoIGhlYWx0aCBhbmQgZGFtYWdlIGVuZW15LlxyXG4gKi9cclxuY2xhc3MgRmluYWxCb3NzIGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEZpbmFsQm9zcy4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gMTI4LCB0aGUgaGVhbHRoIHNldCB0byA1MDAwLCB0aGUgZGFtYWdlIHNldCB0byA1MCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byAxMDAwMC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBGaW5hbEJvc3MuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgRmluYWxCb3NzLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMTI4LCA1MDAwLCA1MCwgMTAwMDApO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93biA9IDEwMDtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SYXRlID0gMTtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SZXNldCA9IDEwMDtcclxuICAgICAgICB0aGlzLnJhcGlkRmlyZUNvb2xkb3duID0gNTAwO1xyXG4gICAgICAgIHRoaXMucmFwaWRGaXJlQ29vbGRvd25SYXRlID0gMTtcclxuICAgICAgICB0aGlzLnJhcGlkRmlyZUNvb2xkb3duUmVzZXQgPSA1MDA7XHJcbiAgICAgICAgdGhpcy5yYXBpZEZpcmVMZW5ndGggPSA1MDA7XHJcbiAgICAgICAgdGhpcy5yYXBpZEZpcmVMZW5ndGhSZXNldCA9IDUwMDtcclxuICAgICAgICB0aGlzLmlzUmFwaWRGaXJlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jaGFyZ2VBdHRhY2tDb29sZG93biA9IDEyNTA7XHJcbiAgICAgICAgdGhpcy5jaGFyZ2VBdHRhY2tDb29sZG93blJhdGUgPSAxO1xyXG4gICAgICAgIHRoaXMuY2hhcmdlQXR0YWNrQ29vbGRvd25SZXNldCA9IDEyNTA7XHJcbiAgICAgICAgdGhpcy5jaGFyZ2VBdHRhY2tMZW5ndGggPSAxMDA7XHJcbiAgICAgICAgdGhpcy5jaGFyZ2VBdHRhY2tMZW5ndGhSZXNldCA9IDEwMDtcclxuICAgICAgICB0aGlzLmlzQ2hhcmdlQXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvRmluYWxCb3NzLnBuZ1wiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gc3RhcnRzIHRoZSBjaGFyZ2UgYXR0YWNrIGJ5IHNldHRpbmcgdmVsb2NpdHkgdG8gMTAyNCwgc2V0dGluZyBkYW1hZ2UgdG8gMTAsIGFuZCBzZXR0aW5nIGlzQ2hhcmdlQXR0YWNrXHJcbiAgICAgKiB0byB0cnVlLlxyXG4gICAgICovXHJcbiAgICBzdGFydENoYXJnZUF0dGFjaygpIHtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gMTAyNDtcclxuICAgICAgICB0aGlzLmRhbWFnZSA9IDEwO1xyXG4gICAgICAgIHRoaXMuaXNDaGFyZ2VBdHRhY2sgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBlbmRzIHRoZSBjaGFyZ2UgYXR0YWNrIGJ5IHJlc2V0dGluZyB2ZWxvY2l0eSBhbmQgZGFtYWdlIHRvIHRoZWlyIGRlZmF1bHQgdmFsdWVzLlxyXG4gICAgICovXHJcbiAgICBlbmRDaGFyZ2VBdHRhY2soKSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IDEyODtcclxuICAgICAgICB0aGlzLmRhbWFnZSA9IDUwO1xyXG4gICAgICAgIHRoaXMuaXNDaGFyZ2VBdHRhY2sgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gc3RhcnRzIHJhcGlkIGZpcmUgYnkgc2V0dGluZyB0aGUgc2hvb3RDb29sZG93blJhdGUgdG8gMjUgYW5kIHNldHRpbmcgaXNSYXBpZEZpcmUgdG8gdHJ1ZS5cclxuICAgICAqL1xyXG4gICAgc3RhcnRSYXBpZEZpcmUoKSB7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duUmF0ZSA9IDI1O1xyXG4gICAgICAgIHRoaXMuaXNSYXBpZEZpcmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBlbmRzIHRoZSByYXBpZCBmaXJlIGJ5IHNldHMgcmFwaWQgZmlyZSBiYWNrIHRvIGl0cyBkZWZhdWx0IHZhbHVlLlxyXG4gICAgICovXHJcbiAgICBlbmRSYXBpZEZpcmUoKSB7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duUmF0ZSA9IDE7XHJcbiAgICAgICAgdGhpcy5pc1JhcGlkRmlyZSA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaW5hbEJvc3M7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBMaWdodEVuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBpcyBhIGZhc3QgZW5lbXkgd2l0aCBsb3cgaGVhbHRoLlxyXG4gKi9cclxuY2xhc3MgTGlnaHRFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBMaWdodEVuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byAxMjgsIHRoZSBoZWFsdGggc2V0IHRvIDEwLCB0aGUgZGFtYWdlIHNldCB0byAxMCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byA1MC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBMaWdodEVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIExpZ2h0RW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAxMjgsIDEwLCAxMCwgNTApO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0xpZ2h0RW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaWdodEVuZW15OyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgTWluaUJvc3MgY2xhc3MgZXh0ZW5kcyB0aGUgRW5lbXkgY2xhc3MuIEl0IGlzIGEgaGlnaCBoZWFsdGggYW5kIGRhbWFnZSBlbmVteS5cclxuICovXHJcbmNsYXNzIE1pbmlCb3NzIGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIE1pbmlCb3NzLiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byAxMjgsIHRoZSBoZWFsdGggc2V0IHRvIDUwMCwgdGhlIGRhbWFnZSBzZXQgdG8gNTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gMTAwMC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBNaW5pQm9zcy5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBNaW5pQm9zcy5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDEyOCwgNTAwLCA1MCwgMTAwMCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duID0gMjAwO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJhdGUgPSAxO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJlc2V0ID0gMjAwO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL01pbmlCb3NzLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWluaUJvc3M7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQYXJhc2l0ZUVuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBpcyBhIHZlcnkgZmFzdCBlbmVteSB3aXRoIHZlcnkgbG93IGhwLlxyXG4gKi9cclxuY2xhc3MgUGFyYXNpdGVFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBQYXJhc2l0ZUVuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byA1MTIsIHRoZSBoZWFsdGggc2V0IHRvIDEsIHRoZSBkYW1hZ2Ugc2V0IHRvIDEwMCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byA1MDAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgUGFyYXNpdGVFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBQYXJhc2l0ZUVuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgNTEyLCAxLCAxMDAsIDUwMCk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvUGFyYXNpdGVFbmVteS5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhcmFzaXRlRW5lbXk7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQcm9qZWN0aWxlRW5lbXkgY2xhc3MgZXh0ZW5kcyB0aGUgZW5lbXkgY2xhc3MuIEl0IGNhbiBzaG9vdCBwcm9qZWN0aWxlcyBhdCB0aGUgcGxheWVyLlxyXG4gKi9cclxuY2xhc3MgUHJvamVjdGlsZUVuZW15IGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFByb2plY3RpbGVFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gOTYsIHRoZSBoZWFsdGggc2V0IHRvIDQwLCB0aGUgZGFtYWdlIHNldCB0byAxMCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byAyNTAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgUHJvamVjdGlsZUVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFByb2plY3RpbGVFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDk2LCA0MCwgMTAsIDI1MCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duID0gMzAwO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJhdGUgPSAxO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJlc2V0ID0gMzAwO1xyXG4gICAgICAgIHRoaXMuc2hvb3RBbW91bnQgPSAxO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1Byb2plY3RpbGVFbmVteS5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2plY3RpbGVFbmVteTsiLCJpbXBvcnQgRW5lbXkgZnJvbSAnLi9FbmVteS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIFJlZ3VsYXJFbmVteSBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaGFzIGJhbGFuY2VkIHN0YXRzIGFjcm9zcyB0aGUgYm9hcmQuXHJcbiAqL1xyXG5jbGFzcyBSZWd1bGFyRW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgUmVndWxhckVuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byA2NCwgdGhlIGhlYWx0aCBzZXQgdG8gMjUsIHRoZSBkYW1hZ2Ugc2V0IHRvIDEwLCBhbmQgdGhlIHBvaW50c09uS2lsbFxyXG4gICAgICogc2V0IHRvIDEwMC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBSZWd1bGFyRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgUmVndWxhckVuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgNjQsIDI1LCAxMCwgMTAwKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9SZWd1bGFyRW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWd1bGFyRW5lbXk7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBUYW5rRW5lbXkgY2xhc3MgZXh0ZW5kcyB0aGUgRW5lbXkgY2xhc3MuIEl0IGlzIGEgc2xvdyBlbmVteSB3aXRoIGhpZ2ggaGVhbHRoIGFuZCBkYW1hZ2UuXHJcbiAqL1xyXG5jbGFzcyBUYW5rRW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgVGFua0VuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byAzMiwgdGhlIGhlYWx0aCBzZXQgdG8gMTAwLCB0aGUgZGFtYWdlIHNldCB0byAyNSwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byA1MDAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgVGFua0VuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFRhbmtFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDMyLCAxMDAsICAyNSwgNTAwKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9UYW5rRW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYW5rRW5lbXk7IiwiaW1wb3J0IEVudmlyb25tZW50T2JqZWN0IGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3QuanMnO1xuXG4vKipcbiAqIFRoZSBCdXNoIGNsYXNzIGV4dGVuZHMgdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzLiBJdCBpcyBhIG5vbi1ibG9ja2luZyBvYmplY3QuXG4gKi9cbmNsYXNzIEJ1c2ggZXh0ZW5kcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgQnVzaC4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzZXMgY29uc3RydWN0b3JcbiAgICAgKiB3aXRoIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgaGVhbHRoIHNldCB0byAxMDAwMDAsIGFuZCBpc0Jsb2NraW5nIHNldCB0byBmYWxzZS5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgQnVzaC5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgQnVzaC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHN1cGVyKHgsIHksIDEwMDAwMCwgZmFsc2UpO1xuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9CdXNoLnBuZ1wiKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1c2g7IiwiaW1wb3J0IEVudmlyb25tZW50T2JqZWN0IGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3QuanMnO1xuXG4vKipcbiAqIFRoZSBDcmF0ZSBjbGFzcyBleHRlbmRzIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzcy4gSXQgaXMgYSBibG9ja2luZyBvYmplY3Qgd2l0aCBsb3cgaGVhbHRoLlxuICovXG5jbGFzcyBDcmF0ZSBleHRlbmRzIEVudmlyb25tZW50T2JqZWN0IHtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBDcmF0ZS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzZXMgY29uc3RydWN0b3JcbiAgICAgKiB3aXRoIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgaGVhbHRoIHNldCB0byAxMDAsIGFuZCBpc0Jsb2NraW5nIHNldCB0byB0cnVlLlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBDcmF0ZS5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgQ3JhdGUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICBzdXBlcih4LCB5LCAxMDAsIHRydWUpO1xuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9DcmF0ZS5wbmdcIik7XG4gICAgICAgIHN1cGVyLmxvYWRTb3VuZCgnQXVkaW8vQm94QnJlYWsubXAzJyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDcmF0ZTtcbiIsIi8qKlxuICogVGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzIGlzIHRoZSBwYXJlbnQgZm9yIGFsbCBlbnZpcm9ubWVudCBvYmplY3RzLlxuICovXG5jbGFzcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0gaGVhbHRoIFRoZSBoZWFsdGggb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSBpc0Jsb2NraW5nIFdoZXRoZXIgdGhlIEVudmlyb25tZW50T2JqZWN0IGNhbiBiZSB3YWxrZWQgdGhyb3VnaC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBoZWFsdGgsIGlzQmxvY2tpbmcpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5oZWFsdGggPSBoZWFsdGg7XG4gICAgICAgIHRoaXMuaXNCbG9ja2luZyA9IGlzQmxvY2tpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBmdW5jdGlvbiBzZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgZW52aXJvbm1lbnQgb2JqZWN0IGdpdmVuIHggYW5kIHkuXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gdG8gYmUgc2V0LlxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIHRvIGJlIHNldC5cbiAgICAgKi9cbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiB0YWtlcyBpbiBhIHVybCBhbmQgbG9hZHMgaXQgYXMgYW4gSW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0ltYWdlTG9hZGVkIGlzXG4gICAgICogc2V0IHRvIHRydWUuIFRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdCBhcmUgc2V0IHRvIHRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBpbWFnZS5cbiAgICAgKiBAcGFyYW0gdXJsIFRoZSB1cmwgdGhhdCBzaG91bGQgYmUgbG9hZGVkLlxuICAgICAqL1xuICAgIGxvYWRJbWFnZSh1cmwpIHtcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcbiAgICB9XG4gICAgbG9hZFNvdW5kKHVybCkge1xuICAgICAgICB0aGlzLmlzU291bmRMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zb3VuZCA9IG5ldyBBdWRpbygpO1xuICAgICAgICB0aGlzLnNvdW5kLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNTb3VuZExvYWRlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc291bmQuc3JjID0gdXJsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBkcmF3IGZ1bmN0aW9uIGRyYXdzIHRoZSBpbWFnZSBvbiB0aGUgY2FudmFzIGF0IHRoZSB4IGFuZCB5IHBvc2l0aW9uIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0gY3R4IFRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXMuXG4gICAgICogQHBhcmFtIGNhbWVyYSBUaGUgY2FtZXJhIG9iamVjdC5cbiAgICAgKi9cbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVudmlyb25tZW50T2JqZWN0O1xuIiwiaW1wb3J0IEVudmlyb25tZW50T2JqZWN0IGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3QuanMnO1xuXG4vKipcbiAqIFRoZSBSb2NrIGNsYXNzIGV4dGVuZHMgdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzLiBJdCBpcyBhIGJsb2NraW5nIG9iamVjdCB3aXRoIGhpZ2ggaGVhbHRoLlxuICovXG5jbGFzcyBSb2NrIGV4dGVuZHMgRW52aXJvbm1lbnRPYmplY3Qge1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFJvY2suIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzc2VzIGNvbnN0cnVjdG9yXG4gICAgICogd2l0aCB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIGhlYWx0aCBzZXQgdG8gMzAwLCBhbmQgaXNCbG9ja2luZyBzZXQgdG8gdHJ1ZS5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgUm9jay5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgUm9jay5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHN1cGVyKHgsIHksIDMwMCwgdHJ1ZSk7XG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1JvY2sucG5nXCIpO1xuICAgICAgICBzdXBlci5sb2FkU291bmQoJ0F1ZGlvL0JveEJyZWFrLm1wMycpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUm9jaztcbiIsIi8qKlxyXG4gKiBUaGUgQ29udHJvbGxlciBjbGFzcyBsaXN0ZW5zIGZvciB1c2VyIGlucHV0cyBhbmQgc3RvcmVzIHdoYXQgaXMgYmVpbmcgcHJlc3NlZC5cclxuICovXHJcbmNsYXNzIENvbnRyb2xsZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIENvbnRyb2xsZXIuIEl0IGFsc28gYWRkcyBldmVudCBsaXN0ZW5lcnMgZm9yIGtleWRvd24sIGtleXVwLCBtb3VzZW1vdmUsXHJcbiAgICAgKiBtb3VzZWRvd24sIGFuZCBtb3VzZXVwLlxyXG4gICAgICogQHBhcmFtIGRvY3VtZW50Qm9keSBUaGUgYm9keSBvZiB0aGUgZG9jdW1lbnQuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50Qm9keSkge1xyXG4gICAgICAgIHRoaXMua2V5c1ByZXNzZWQgPSBbXTtcclxuICAgICAgICB0aGlzLm1vdXNlID0gWzAsIDBdO1xyXG4gICAgICAgIHRoaXMubW91c2VQcmVzc2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Qm9keS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5rZXlzUHJlc3NlZFtldmVudC5rZXlDb2RlXSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Qm9keS5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMua2V5c1ByZXNzZWRbZXZlbnQua2V5Q29kZV0gPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnRCb2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlWzBdID0gZXZlbnQuY2xpZW50WDtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZVsxXSA9IGV2ZW50LmNsaWVudFk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Qm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZVByZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudEJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGlmIHRoZSBpbnB1dHRlZCBrZXkgaXMgYmVpbmcgcHJlc3NlZC5cclxuICAgICAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byBjaGVjay5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIHRoZSBrZXkgaXMgYmVpbmcgcHJlc3NlZC5cclxuICAgICAqL1xyXG4gICAgaXNLZXlQcmVzc2VkKGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmtleXNQcmVzc2VkW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyBpZiB0aGUgbW91c2UgaXMgYmVpbmcgcHJlc3NlZC5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIHRoZSBtb3VzZSBpcyBwcmVzc2VkLlxyXG4gICAgICovXHJcbiAgICBpc01vdXNlUHJlc3NlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb3VzZVByZXNzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIG1vdXNlIHBvc2l0aW9uLlxyXG4gICAgICogQHJldHVybnMge251bWJlcltdfSBUaGUgeCBhbmQgeSBwb3NpdGlvbiBvZiB0aGUgbW91c2UgYXMgYW4gYXJyYXkuIChbeCx5XSlcclxuICAgICAqL1xyXG4gICAgZ2V0TW91c2VQb3NpdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb3VzZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcjtcclxuIiwiaW1wb3J0IFdvcmxkIGZyb20gJy4vV29ybGQuanMnO1xyXG5pbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL0NvbnRyb2xsZXIuanMnO1xyXG5pbXBvcnQgRW5lbXlQcm9qZWN0aWxlIGZyb20gXCIuLi9FbmVtaWVzL0VuZW15UHJvamVjdGlsZVwiO1xyXG5pbXBvcnQgTWluaUJvc3MgZnJvbSBcIi4uL0VuZW1pZXMvTWluaUJvc3NcIjtcclxuaW1wb3J0IEZpbmFsQm9zcyBmcm9tIFwiLi4vRW5lbWllcy9GaW5hbEJvc3NcIjtcclxuaW1wb3J0IFByb2plY3RpbGVFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9Qcm9qZWN0aWxlRW5lbXlcIjtcclxuaW1wb3J0IEN1cnNvciBmcm9tICcuLi9DdXJzb3IuanMnO1xyXG5pbXBvcnQgUGlzdG9sIGZyb20gXCIuLi9XZWFwb25zL1Bpc3RvbFwiO1xyXG5pbXBvcnQgU25pcGVyIGZyb20gXCIuLi9XZWFwb25zL1NuaXBlclwiO1xyXG5pbXBvcnQgU2hvdGd1biBmcm9tIFwiLi4vV2VhcG9ucy9TaG90Z3VuXCI7XHJcbmltcG9ydCBBc3NhdWx0UmlmbGUgZnJvbSAnLi4vV2VhcG9ucy9Bc3NhdWx0UmlmbGUnXHJcbmltcG9ydCBCdWxsZXQ1MGNhbCBmcm9tIFwiLi4vV2VhcG9ucy9CdWxsZXQ1MGNhbFwiO1xyXG5pbXBvcnQgQnVsbGV0NTU2IGZyb20gXCIuLi9XZWFwb25zL0J1bGxldDU1NlwiO1xyXG5pbXBvcnQgQnVsbGV0MTJHYXVnZSBmcm9tIFwiLi4vV2VhcG9ucy9CdWxsZXQxMkdhdWdlXCI7XHJcbmltcG9ydCBCdWxsZXQ5bW0gZnJvbSBcIi4uL1dlYXBvbnMvQnVsbGV0OW1tXCI7XHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgR2FtZSBjbGFzcyBpcyB1c2VkIHRvIHN0b3JlIHRoZSBnYW1lIHN0YXRlLiBJdCBhbHNvIGFsbG93cyBmb3IgdGhlIGdhbWUgdG8gYmUgdXBkYXRlZCBvciBkcmF3bi5cclxuICovXHJcbmNsYXNzIEdhbWUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEdhbWUgY2xhc3MuIFRoZSBnYW1lU3RhdGUgaXMgc2V0IHRvICdQbGF5aW5nJyBpbml0aWFsbHkuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzIFRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gZG9jdW1lbnRCb2R5IFRoZSBib2R5IG9mIHRoZSBkb2N1bWVudC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY2FudmFzLCBkb2N1bWVudEJvZHkpIHtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgICAgICB0aGlzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdGhpcy53b3JsZCA9IG5ldyBXb3JsZChjYW52YXMpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKGRvY3VtZW50Qm9keSk7XHJcbiAgICAgICAgdGhpcy5jdXJzb3IgPSBuZXcgQ3Vyc29yKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSAnUGxheWluZyc7XHJcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XHJcbiAgICAgICAgdGhpcy50b3BTY29yZXMgPSBbMCwgMCwgMF07XHJcbiAgICAgICAgdGhpcy5jb21ib0xlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5jb21ib0VuZW1pZXNLaWxsZWQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB1cGRhdGVzIHRoZSBnYW1lLiBJZiB0aGUgZ2FtZVN0YXRlIGlzICdQbGF5aW5nLCcgZXZlcnl0aGluZyBpbiB0aGUgd29ybGQgaXMgY2hlY2tlZCBhbmQgdXBkYXRlZC5cclxuICAgICAqIElmIHRoZSBnYW1lU3RhdGUgaXMgJ1BhdXNlZCwnIGV2ZXJ5dGhpbmcgaW4gdGhlIHdvcmxkIHJlbWFpbnMgc3RpbGwgdW50aWwgdGhlIHJlc3VtZSBidXR0b24gaXMgcHJlc3NlZC4gSWYgdGhlXHJcbiAgICAgKiBnYW1lU3RhdGUgaXMgJ0dhbWUgT3ZlciwnIGV2ZXJ5dGhpbmcgaW4gdGhlIHdvcmxkIHJlbWFpbnMgc3RpbGwgdW50aWwgdGhlIFRyeSBBZ2FpbiBidXR0b24gaXMgcHJlc3NlZC5cclxuICAgICAqIEBwYXJhbSBtb2RpZmllciBUaGUgbW9kaWZpZXIgdG8gYmUgdXNlZCBmb3IgbW92ZW1lbnQuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZShtb2RpZmllcikge1xyXG4gICAgICAgIGlmKHRoaXMuZ2FtZVN0YXRlID09PSAnUGxheWluZycpIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaGVhbHRoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gJ0dhbWUgT3Zlcic7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRvcFNjb3JlcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCgyNykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9ICdQYXVzZWQnO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb21ib0xlbmd0aCAtPSBtb2RpZmllcjtcclxuICAgICAgICAgICAgaWYodGhpcy5jb21ib0xlbmd0aCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tYm9FbmVtaWVzS2lsbGVkID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tYm9MZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYXllcihtb2RpZmllcik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2hvdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUVxdWlwcGVkKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRW5lbWllcyhtb2RpZmllcik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGlja1VwcygpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVdlYXBvbkNvb2xkb3duKG1vZGlmaWVyKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQcm9qZWN0aWxlcyhtb2RpZmllcik7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRW52aXJvbm1lbnRPYmplY3RzKCk7XHJcbiAgICAgICAgICAgIHRoaXMud29ybGQuY2FtZXJhLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC53YXZlICs9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnN0YXJ0V2F2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5nYW1lU3RhdGUgPT09ICdHYW1lIE92ZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZU92ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLmdhbWVTdGF0ZSA9PT0gJ1BhdXNlZCcpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQYXVzZVNjcmVlbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgZXZlcnl0aGluZyBpbiB0aGUgd29ybGQuIElmIHRoZSBnYW1lU3RhdGUgaXMgJ0dhbWUgT3ZlciwnIGEgZ2FtZSBvdmVyIG1lc3NhZ2UgaXMgZGlzcGxheWVkLFxyXG4gICAgICogaWYgdGhlIGdhbWVTdGF0ZSBpcyAnUGF1c2VkLCcgYSBwYXVzZSBtZXNzYWdlIGlzIGRpc3BsYXllZCwgYW5kIGlmIHRoZSBnYW1lU3RhdGUgaXMgJ1BsYXlpbmcsJyBhbGwgb2YgdGhlIG9iamVjdHNcclxuICAgICAqIGluIHRoZSB3b3JsZCBhcmUgZHJhd24sIGFsb25nIHdpdGggdGhlIEhVRCwgTWluaU1hcCwgYW5kIGN1cnNvci5cclxuICAgICAqL1xyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBpZih0aGlzLmdhbWVTdGF0ZSA9PT0gJ0dhbWUgT3ZlcicpIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3R2FtZU92ZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3U2NvcmVib2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuZ2FtZVN0YXRlID09PSAnUGF1c2VkJykge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdQYXVzZVNjcmVlbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5pc0JhY2tncm91bmRMb2FkZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmRyYXdCYWNrZ3JvdW5kKHRoaXMuY3R4LCB0aGlzLmNhbnZhcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRyYXdXZWFwb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1BpY2tVcHMoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmlzSW1hZ2VMb2FkZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5kcmF3KHRoaXMuY3R4LCB0aGlzLndvcmxkLmNhbWVyYSwgdGhpcy5jb250cm9sbGVyLm1vdXNlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0VuZW1pZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3RW5lbXlQcm9qZWN0aWxlcygpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdCdWxsZXRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0Vudmlyb25tZW50T2JqZWN0cygpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdNaW5pTWFwKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0hVRCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5jdXJzb3IuaW1hZ2UsIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSAtIHRoaXMuY3Vyc29yLmltYWdlLndpZHRoLzIsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSAtIHRoaXMuY3Vyc29yLmltYWdlLmhlaWdodC8yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgYSBNaW5pTWFwIHRoYXQgZGlzcGxheXMgdGhlIHBsYXllcidzIGxvY2F0aW9uLCBlbmVteSBsb2NhdGlvbnMsIGFuZCBlbnZpcm9ubWVudCBvYmplY3QgbG9jYXRpb25zLlxyXG4gICAgICovXHJcbiAgICBkcmF3TWluaU1hcCgpIHtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAncmdiYSgzNSwgMTc3LCA3NywgMC4yKSc7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDBcIjtcclxuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAzO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDI1LCB0aGlzLmNhbnZhcy5oZWlnaHQgLSAyNTAsIDQwMCwgMjI1KTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KDI1LCB0aGlzLmNhbnZhcy5oZWlnaHQgLSAyNTAsIDQwMCwgMjI1KTtcclxuICAgICAgICBsZXQgeFBlcmNlbnQgPSAodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIpIC8gdGhpcy53b3JsZC53aWR0aDtcclxuICAgICAgICBsZXQgeVBlcmNlbnQgPSAodGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yKSAvIHRoaXMud29ybGQuaGVpZ2h0O1xyXG4gICAgICAgIGxldCB4UmVsYXRpdmUgPSB4UGVyY2VudCo0MDA7XHJcbiAgICAgICAgbGV0IHlSZWxhdGl2ZSA9IHlQZXJjZW50KjIyNTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzAwRkYwMCc7XHJcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgdGhpcy5jdHguYXJjKDI1ICsgeFJlbGF0aXZlLCAodGhpcy5jYW52YXMuaGVpZ2h0IC0gMjUwKSArIHlSZWxhdGl2ZSwgMi41LCAwLCAyKk1hdGguUEkpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uaXNJbWFnZUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHhQZXJjZW50ID0gKHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLnggKyB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS53aWR0aC8yKSAvIHRoaXMud29ybGQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBsZXQgeVBlcmNlbnQgPSAodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0ueSArIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmhlaWdodC8yKSAvIHRoaXMud29ybGQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHhSZWxhdGl2ZSA9IHhQZXJjZW50KjQwMDtcclxuICAgICAgICAgICAgICAgIGxldCB5UmVsYXRpdmUgPSB5UGVyY2VudCoyMjU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzgwODA4MCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmFyYygyNSArIHhSZWxhdGl2ZSwgKHRoaXMuY2FudmFzLmhlaWdodCAtIDI1MCkgKyB5UmVsYXRpdmUsIDIuNSwgMCwgMipNYXRoLlBJKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgeFBlcmNlbnQgPSAodGhpcy53b3JsZC5lbmVtaWVzW2ldLnggKyB0aGlzLndvcmxkLmVuZW1pZXNbaV0ud2lkdGgvMikgLyB0aGlzLndvcmxkLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgbGV0IHlQZXJjZW50ID0gKHRoaXMud29ybGQuZW5lbWllc1tpXS55ICsgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmhlaWdodC8yKSAvIHRoaXMud29ybGQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHhSZWxhdGl2ZSA9IHhQZXJjZW50KjQwMDtcclxuICAgICAgICAgICAgICAgIGxldCB5UmVsYXRpdmUgPSB5UGVyY2VudCoyMjU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI0ZGMDAwMCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmFyYygyNSArIHhSZWxhdGl2ZSwgKHRoaXMuY2FudmFzLmhlaWdodCAtIDI1MCkgKyB5UmVsYXRpdmUsIDIuNSwgMCwgMipNYXRoLlBJKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgdGhlIEhVRCB3aGljaCBjb250YWlucyB0aGUgcGxheWVyJ3MgaGVhbHRoLCB0aGUgd2F2ZSBudW1iZXIsIGFuZCB0aGUgbnVtYmVyIG9mIGVuZW1pZXMgbGVmdC5cclxuICAgICAqIFRoZSBjdXJyZW50IHNlbGVjdGVkIHdlYXBvbiBpcyBhbHNvIGRpc3BsYXllZC5cclxuICAgICAqL1xyXG4gICAgZHJhd0hVRCgpIHtcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCI0OHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkZGJztcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMFwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDE7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGhpcy53b3JsZC5wbGF5ZXIuaGVhbHRoICsgXCIgSFBcIiwgdGhpcy5jYW52YXMud2lkdGgvMiAtIDI5MCwgNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQodGhpcy53b3JsZC5wbGF5ZXIuaGVhbHRoICsgXCIgSFBcIiwgdGhpcy5jYW52YXMud2lkdGgvMiAtIDI5MCwgNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiV2F2ZSBcIiArIHRoaXMud29ybGQud2F2ZSwgdGhpcy5jYW52YXMud2lkdGgvMiwgNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoXCJXYXZlIFwiICsgdGhpcy53b3JsZC53YXZlLCB0aGlzLmNhbnZhcy53aWR0aC8yLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aCArIFwiIEVuZW1pZXMgTGVmdFwiLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgMzUwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCh0aGlzLndvcmxkLmVuZW1pZXMubGVuZ3RoICsgXCIgRW5lbWllcyBMZWZ0XCIsIHRoaXMuY2FudmFzLndpZHRoLzIgKyAzNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCI0OHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkZGJztcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnQWN0aXZlIFdlYXBvbjogJyArIHRoaXMud29ybGQucGxheWVyLmludmVudG9yeVt0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXhdLm5hbWUsIHRoaXMuY2FudmFzLndpZHRoLzIsIHRoaXMuY2FudmFzLmhlaWdodCAtIDUwKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCdBY3RpdmUgV2VhcG9uOiAnICsgdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W3RoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleF0ubmFtZSwgdGhpcy5jYW52YXMud2lkdGgvMiwgdGhpcy5jYW52YXMuaGVpZ2h0IC0gNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCdTY29yZTogJyArIHRoaXMuc2NvcmUsIHRoaXMuY2FudmFzLndpZHRoLzIsIDEyNSk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCgnU2NvcmU6ICcgKyB0aGlzLnNjb3JlLCB0aGlzLmNhbnZhcy53aWR0aC8yLCAxMjUpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCdDb21ibzogJyArIHRoaXMuY29tYm9FbmVtaWVzS2lsbGVkLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgMzUwLCAxMjUpO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoJ0NvbWJvOiAnICsgdGhpcy5jb21ib0VuZW1pZXNLaWxsZWQsIHRoaXMuY2FudmFzLndpZHRoLzIgKyAzNTAsIDEyNSk7XHJcbiAgICAgICAgLy8gcmVtb3ZlIGxhdGVyIC0gZGVidWdnaW5nIHB1cnBvc2VzXHJcbiAgICAgICAgLy8gdGhpcy5jdHguZm9udCA9IFwiMjRweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxUZXh0KCdQb3NYOiAnICsgdGhpcy53b3JsZC5wbGF5ZXIueCwgdGhpcy5jYW52YXMud2lkdGgvMiAtIDI5MCwgMTc1KTtcclxuICAgICAgICAvLyB0aGlzLmN0eC5zdHJva2VUZXh0KCdQb3NZOiAnICsgdGhpcy53b3JsZC5wbGF5ZXIueSwgdGhpcy5jYW52YXMud2lkdGgvMiAtIDI5MCwgMjUwKTtcclxuICAgICAgICAvLyB0aGlzLmN0eC5maWxsVGV4dCgnQ2FtZXJhWDogJyArIHRoaXMud29ybGQuY2FtZXJhLngsIHRoaXMuY2FudmFzLndpZHRoLzIsIDE3NSk7XHJcbiAgICAgICAgLy8gdGhpcy5jdHguc3Ryb2tlVGV4dCgnQ2FtZXJhWTogJyArIHRoaXMud29ybGQuY2FtZXJhLnksIHRoaXMuY2FudmFzLndpZHRoLzIsIDI1MCk7XHJcbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbFRleHQoJ21vdXNlWDogJyArIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSwgdGhpcy5jYW52YXMud2lkdGgvMiArIDM1MCwgMTc1KTtcclxuICAgICAgICAvLyB0aGlzLmN0eC5zdHJva2VUZXh0KCdtb3VzZVk6ICcgKyB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyAzNTAsIDI1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyB3aGV0aGVyIHRoZSByZXN0YXJ0IGJ1dHRvbiBvbiB0aGUgZ2FtZSBvdmVyIHNjcmVlbiBoYXMgYmVlbiBwcmVzc2VkLiBJZiBpdCBoYXMsIHRoZSB3b3JsZCBpc1xyXG4gICAgICogcmVzdGFydGVkLCB0aGUgZ2FtZSBzdGF0ZSBpcyBzZXQgdG8gJ3BsYXlpbmcsJyBhbmQgdGhlIHNjb3JlIGlzIHNldCB0byAwLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVHYW1lT3ZlcigpIHtcclxuICAgICAgICBpZih0aGlzLmNvbnRyb2xsZXIuaXNNb3VzZVByZXNzZWQoKSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0gPiB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwICYmIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSA8ICh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwICsgMjAwKVxyXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdID4gdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSAmJiB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0gPCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1ICsgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnN0YXJ0KHRoaXMuY2FudmFzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gJ1BsYXlpbmcnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY29yZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIHRoZSBnYW1lIG92ZXIgc2NyZWVuIGFuZCBhIGJ1dHRvbiB0byB0cnkgYWdhaW4uXHJcbiAgICAgKi9cclxuICAgIGRyYXdHYW1lT3ZlcigpIHtcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIxMjhweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI0ZGRic7XHJcbiAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gMTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkdhbWUgT3ZlclwiLCB0aGlzLmNhbnZhcy53aWR0aC8yLCB0aGlzLmNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyMwMDAnO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoXCJHYW1lIE92ZXJcIiwgdGhpcy5jYW52YXMud2lkdGgvMiwgdGhpcy5jYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkZGJztcclxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1LCAyMDAsIDEwMCk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdCh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1LCAyMDAsIDEwMCk7XHJcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMjRweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJUcnkgYWdhaW4/XCIsIHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAgKyAxMDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUgKyA1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVG9wU2NvcmVzKCkge1xyXG4gICAgICAgIGlmKHRoaXMuc2NvcmUgPiB0aGlzLnRvcFNjb3Jlc1swXSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvcFNjb3Jlc1syXSA9IHRoaXMudG9wU2NvcmVzWzFdO1xyXG4gICAgICAgICAgICB0aGlzLnRvcFNjb3Jlc1sxXSA9IHRoaXMudG9wU2NvcmVzWzBdO1xyXG4gICAgICAgICAgICB0aGlzLnRvcFNjb3Jlc1swXSA9IHRoaXMuc2NvcmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5zY29yZSA+IHRoaXMudG9wU2NvcmVzWzFdKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9wU2NvcmVzWzJdID0gdGhpcy50b3BTY29yZXNbMV07XHJcbiAgICAgICAgICAgIHRoaXMudG9wU2NvcmVzWzFdID0gdGhpcy5zY29yZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnNjb3JlID4gdGhpcy50b3BTY29yZXNbMl0pIHtcclxuICAgICAgICAgICAgdGhpcy50b3BTY29yZXNbMl0gPSB0aGlzLnNjb3JlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgdGhlIHRvcCAzIHNjb3Jlcy5cclxuICAgICAqL1xyXG4gICAgZHJhd1Njb3JlYm9hcmQoKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiNjBweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwic3RhcnRcIjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnSGlnaCBTY29yZXMnLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgNDQwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiAtIDc1KTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCdIaWdoIFNjb3JlcycsIHRoaXMuY2FudmFzLndpZHRoLzIgKyA0NDAsIHRoaXMuY2FudmFzLmhlaWdodC8yIC0gNzUpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCcxc3QnLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgNDAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCgnMXN0JywgdGhpcy5jYW52YXMud2lkdGgvMiArIDQwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCcybmQnLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgNDAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDc1KTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCcybmQnLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgNDAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDc1KTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnM3JkJywgdGhpcy5jYW52YXMud2lkdGgvMiArIDQwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAxNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoJzNyZCcsIHRoaXMuY2FudmFzLndpZHRoLzIgKyA0MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMTUwKTtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImVuZFwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCcnICsgdGhpcy50b3BTY29yZXNbMF0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyA4MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCcnICsgdGhpcy50b3BTY29yZXNbMF0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyA4MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnJyArIHRoaXMudG9wU2NvcmVzWzFdLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgODAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDc1KTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCcnICsgdGhpcy50b3BTY29yZXNbMV0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyA4MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgNzUpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCcnICsgdGhpcy50b3BTY29yZXNbMl0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyA4MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMTUwKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCcnICsgdGhpcy50b3BTY29yZXNbMl0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyA4MDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMTUwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIHdoZXRoZXIgdGhlIHJlc3VtZSBidXR0b24gb24gdGhlIHBhdXNlZCBzY3JlZW4gaGFzIGJlZW4gcHJlc3NlZC4gSWYgaXQgaGFzLCB0aGUgZ2FtZSBzdGF0ZSBpcyBzZXQgdG8gJ3BsYXlpbmcuJ1xyXG4gICAgICovXHJcbiAgICB1cGRhdGVQYXVzZVNjcmVlbigpIHtcclxuICAgICAgICBpZih0aGlzLmNvbnRyb2xsZXIuaXNNb3VzZVByZXNzZWQoKSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0gPiB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwICYmIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSA8ICh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwKzIwMClcclxuICAgICAgICAgICAgICAgICYmIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSA+IHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUgJiYgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdIDwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSArIDEwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSAnUGxheWluZyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIHRoZSBwYXVzZSBzY3JlZW4gYW5kIGEgcmVzdW1lIGJ1dHRvbi5cclxuICAgICAqL1xyXG4gICAgZHJhd1BhdXNlU2NyZWVuKCkge1xyXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjEyOHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkZGJztcclxuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiUGF1c2VkXCIsIHRoaXMuY2FudmFzLndpZHRoLzIsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIlBhdXNlZFwiLCB0aGlzLmNhbnZhcy53aWR0aC8yLCB0aGlzLmNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUsIDIwMCwgMTAwKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUsIDIwMCwgMTAwKTtcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIyNHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlJlc3VtZVwiLCB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwICsgMTAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1ICsgNTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyBhbGwgb2YgdGhlIGVuZW1pZXMgaW4gdGhlIHdvcmxkLlxyXG4gICAgICovXHJcbiAgICBkcmF3RW5lbWllcygpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB1cGRhdGVzIHRoZSBsb2NhdGlvbiBvZiBhbGwgb2YgdGhlIGVuZW1pZXMsIHVwZGF0ZXMgdGhlaXIgY29vbGRvd25zLCBhbmQgcmVtb3ZlcyB0aGVtIGlmIHRoZXkgaGF2ZVxyXG4gICAgICogbm8gaGVhbHRoLlxyXG4gICAgICogQHBhcmFtIG1vZGlmaWVyIFRoZSBnYW1lIG1vZGlmaWVyIHNwZWVkLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVFbmVtaWVzKG1vZGlmaWVyKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gdGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5tb3ZlKHRoaXMud29ybGQucGxheWVyLCBtb2RpZmllciwgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLmF0dGFja0Nvb2xkb3duID4gMClcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5hdHRhY2tDb29sZG93biAtPSA1O1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0gaW5zdGFuY2VvZiBGaW5hbEJvc3MpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVDb29sZG93biA+IDAgJiYgIXRoaXMud29ybGQuZW5lbWllc1tpXS5pc1JhcGlkRmlyZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlQ29vbGRvd24gLT0gdGhpcy53b3JsZC5lbmVtaWVzW2ldLnJhcGlkRmlyZUNvb2xkb3duUmF0ZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLnJhcGlkRmlyZUNvb2xkb3duIDw9IDAgJiYgIXRoaXMud29ybGQuZW5lbWllc1tpXS5pc1JhcGlkRmlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5zdGFydFJhcGlkRmlyZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVMZW5ndGggPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlTGVuZ3RoUmVzZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlTGVuZ3RoID4gMCAmJiB0aGlzLndvcmxkLmVuZW1pZXNbaV0uaXNSYXBpZEZpcmUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLnJhcGlkRmlyZUxlbmd0aCAtPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlQ29vbGRvd25SYXRlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlTGVuZ3RoIDw9IDAgJiYgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmlzUmFwaWRGaXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmVuZFJhcGlkRmlyZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVDb29sZG93biA9IHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVDb29sZG93blJlc2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tDb29sZG93biA+IDAgJiYgIXRoaXMud29ybGQuZW5lbWllc1tpXS5pc0NoYXJnZUF0dGFjaylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrQ29vbGRvd24gLT0gdGhpcy53b3JsZC5lbmVtaWVzW2ldLmNoYXJnZUF0dGFja0Nvb2xkb3duUmF0ZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLmNoYXJnZUF0dGFja0Nvb2xkb3duIDw9IDAgJiYgIXRoaXMud29ybGQuZW5lbWllc1tpXS5pc0NoYXJnZUF0dGFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5zdGFydENoYXJnZUF0dGFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tMZW5ndGggPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrTGVuZ3RoUmVzZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrTGVuZ3RoID4gMCAmJiB0aGlzLndvcmxkLmVuZW1pZXNbaV0uaXNDaGFyZ2VBdHRhY2spXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmNoYXJnZUF0dGFja0xlbmd0aCAtPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrQ29vbGRvd25SYXRlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrTGVuZ3RoIDw9IDAgJiYgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmlzQ2hhcmdlQXR0YWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmVuZENoYXJnZUF0dGFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tDb29sZG93biA9IHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tDb29sZG93blJlc2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXSBpbnN0YW5jZW9mIFByb2plY3RpbGVFbmVteSB8fCB0aGlzLndvcmxkLmVuZW1pZXNbaV0gaW5zdGFuY2VvZiBNaW5pQm9zcyB8fCB0aGlzLndvcmxkLmVuZW1pZXNbaV0gaW5zdGFuY2VvZiBGaW5hbEJvc3MpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duID4gMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93biAtPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93blJhdGU7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXMucHVzaChuZXcgRW5lbXlQcm9qZWN0aWxlKHRoaXMud29ybGQuZW5lbWllc1tpXS54ICsgdGhpcy53b3JsZC5lbmVtaWVzW2ldLndpZHRoLzIsIHRoaXMud29ybGQuZW5lbWllc1tpXS55ICsgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmhlaWdodC8yLCB0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLnNob290Q29vbGRvd24gKz0gdGhpcy53b3JsZC5lbmVtaWVzW2ldLnNob290Q29vbGRvd25SZXNldDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0uaGVhbHRoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tYm9FbmVtaWVzS2lsbGVkICs9IDE7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbWJvTGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9IHRoaXMud29ybGQuZW5lbWllc1tpXS5wb2ludHNPbktpbGwqMjtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9IHRoaXMud29ybGQuZW5lbWllc1tpXS5wb2ludHNPbktpbGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWJvTGVuZ3RoID0gMztcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgdGhlIHBsYXllcnMgbG9jYXRpb24gYmFzZWQgb24gdXNlciBpbnB1dC5cclxuICAgICAqIEBwYXJhbSBtb2RpZmllciBUaGUgZ2FtZSBzcGVlZCBtb2RpZmllci5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlUGxheWVyKG1vZGlmaWVyKSB7XHJcbiAgICAgICAgbGV0IHNwcmludGluZyA9IHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoMTYpO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDg3KSkgeyAvLyBQbGF5ZXIgaG9sZGluZyB1cFxyXG4gICAgICAgICAgICAvL09ubHkgbW92ZSB1cCBpZiB3ZSBhcmUgbm90IGF0IHRoZSB2ZXJ5IHRvcCBvZiB0aGUgd29ybGRcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIueSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHRoZSBwbGF5ZXIgaXMgc3ByaW50aW5nIGhlIG11c3QgbW92ZSB0d2ljZSBhcyBmYXN0XHJcbiAgICAgICAgICAgICAgICBpZihzcHJpbnRpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueSAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCptb2RpZmllcioyO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnkgLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIC8vSWYgdGhlIG1vdmVtZW50IGNhdXNlZCB0aGUgcGxheWVyIHRvIGJlIGNvbGxpZGluZywgdW5kbyB0aGUgbW92ZW1lbnQgYW5kIGdpdmUgYmFjayB0aGUgc3RhbWluYSBpZiBoZSB3YXMgc3ByaXRuaW5nLlxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3ByaW50aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkKm1vZGlmaWVyKjI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoODMpKSB7IC8vIFBsYXllciBob2xkaW5nIGRvd25cclxuICAgICAgICAgICAgLy9Pbmx5IG1vdmUgZG93biBpZiB3ZSBhcmUgbm90IGF0IHRoZSB2ZXJ5IGJvdHRvbSBvZiB0aGUgd29ybGRcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodCA8PSA1NjI1KSB7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHRoZSBwbGF5ZXIgaXMgc3ByaW50aW5nIGhlIG11c3QgbW92ZSB0d2ljZSBhcyBmYXN0LCBhbmQgaGlzIHN0YW1pbmEgbXVzdCBkcmFpbiBiYXNlZCBvbiB0aGUgbW9kaWZpZXIgKHNlY29uZHMgc2luY2UgbGFzdCB1cGRhdGUpXHJcbiAgICAgICAgICAgICAgICBpZihzcHJpbnRpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueSArPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCptb2RpZmllcioyO1xyXG4gICAgICAgICAgICAgICAgLy9PdGhlcndpc2UgbW92ZSBsaWtlIG5vcm1hbFxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnkgKz0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIC8vSWYgdGhlIG1vdmVtZW50IGNhdXNlZCB0aGUgcGxheWVyIHRvIGJlIGNvbGxpZGluZywgdW5kbyB0aGUgbW92ZW1lbnQgYW5kIGdpdmUgYmFjayB0aGUgc3RhbWluYSBpZiBoZSB3YXMgc3ByaXRuaW5nLlxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3ByaW50aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55IC09IHRoaXMud29ybGQucGxheWVyLnNwZWVkKm1vZGlmaWVyKjI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55IC09IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoNjUpKSB7IC8vIFBsYXllciBob2xkaW5nIGxlZnRcclxuICAgICAgICAgICAgLy9vbmx5IGdvIGxlZnQgaWYgd2UgYXJlIG5vdCBvbiB0aGUgZmFyIGxlZnQgZWRnZSBhbHJlYWR5XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLnggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYoc3ByaW50aW5nKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcioyO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwcmludGluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueCArPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyKjI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkKm1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDY4KSkgeyAvLyBQbGF5ZXIgaG9sZGluZyByaWdodFxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGggPD0gMTAwMDApIHtcclxuICAgICAgICAgICAgICAgIGlmKHNwcmludGluZylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXIqMjtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdCh0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihzcHJpbnRpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcioyO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueCAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiByZW1vdmVzIGVudmlyb25tZW50IG9iamVjdHMgdGhhdCBoYXZlIG5vIGhlYWx0aCByZW1haW5pbmcgYW5kIHBsYXlzIGEgc291bmQuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUVudmlyb25tZW50T2JqZWN0cygpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5oZWFsdGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyBhbGwgb2YgdGhlIGVudmlyb25tZW50IG9iamVjdHMgaW4gdGhlIHdvcmxkLlxyXG4gICAgICovXHJcbiAgICBkcmF3RW52aXJvbm1lbnRPYmplY3RzKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLndvcmxkLmNhbWVyYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIGFsbCBvZiB0aGUgd2VhcG9ucyBpbiB0aGUgd29ybGQuXHJcbiAgICAgKi9cclxuICAgIGRyYXdXZWFwb25zKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmdyb3VuZFdlYXBvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5ncm91bmRXZWFwb25zW2ldLmlzSW1hZ2VMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZ3JvdW5kV2VhcG9uc1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLndvcmxkLmNhbWVyYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgdGhlIHBpY2t1cHMgb24gdGhlIGdyb3VuZCwgc3VjaCBhcyBncm91bmQgd2VhcG9ucyBhbmQgbWVkcGFja3MuIElmIHRoZSBwbGF5ZXIgY29sbGlkZXMgd2l0aCB0aGVtLFxyXG4gICAgICogdGhleSBhcmUgcmVtb3ZlZCBmcm9tIHRoZSB3b3JsZCBhbmQgZWl0aGVyIGFkZGVkIHRvIHRoZSBwbGF5ZXIncyBpbnZlbnRvcnkgb3IgY29uc3VtZWQuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVBpY2tVcHMoKSB7XHJcbiAgICAgICAgLy8gdXBkYXRlIGdyb3VuZCB3ZWFwb25zXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMud29ybGQuZ3JvdW5kV2VhcG9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMud29ybGQucGxheWVyLCB0aGlzLndvcmxkLmdyb3VuZFdlYXBvbnNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3duc1dlcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBqID0gdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5Lmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W2pdLm5hbWUgPT09IHRoaXMud29ybGQuZ3JvdW5kV2VhcG9uc1tpXS53ZWFwb24ubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvd25zV2VwID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihvd25zV2VwID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZ3JvdW5kV2VhcG9uc1tpXS5hZGRXZWFwb24odGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmdyb3VuZFdlYXBvbnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHVwZGF0ZSBtZWRwYWNrc1xyXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMud29ybGQucGlja1Vwcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMud29ybGQucGxheWVyLCB0aGlzLndvcmxkLnBpY2tVcHNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5oZWFsdGggPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5oZWFsdGggPSAxMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5waWNrVXBzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyB0aGUgY29vbGRvd24gb2YgYWxsIG9mIHRoZSB3ZWFwb25zIGluIHRoZSBwbGF5ZXIncyBpbnZlbnRvcnkuXHJcbiAgICAgKiBAcGFyYW0gbW9kaWZpZXIgVGhlIGdhbWUgc3BlZWQgbW9kaWZpZXIuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVdlYXBvbkNvb2xkb3duKG1vZGlmaWVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMud29ybGQucGxheWVyLmludmVudG9yeS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBsZXQgd2VwID0gdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W2ldO1xyXG4gICAgICAgICAgICBpZih3ZXAuY29vbGRvd24gPiAwKXtcclxuICAgICAgICAgICAgICAgIHdlcC5jb29sZG93biAtPSBtb2RpZmllcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgYWxsIG9mIHRoZSBsaXZlIGJ1bGxldHMgaW4gdGhlIHdvcmxkLlxyXG4gICAgICovXHJcbiAgICBkcmF3QnVsbGV0cygpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5idWxsZXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuYnVsbGV0c1tpXS5pc0ltYWdlTG9hZGVkICYmIHRoaXMud29ybGQuYnVsbGV0c1tpXS5saXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHNbaV0uZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBhZGRzIG5ldyBidWxsZXRzIHRvIHRoZSB3b3JsZCBkZXBlbmRpbmcgb24gaWYgdGhlIHBsYXllciBwcmVzc2VkIHRoZWlyIG1vdXNlIGJ1dHRvbiBhbmQgd2hhdCB3ZWFwb25cclxuICAgICAqIHdhcyBlcXVpcHBlZC4gSXQgY2hlY2tzIHRoZSB0eXBlIG9mIHdlYXBvbiB0aGUgcGxheWVyIGhhcyBlcXVpcHBlZCBhbmQgZmlyZXMgdGhlIGNvcnJlY3QgYnVsbGV0cy4gU2hvdGd1biBpcyB1bmlxdWVcclxuICAgICAqIGluIHRoYXQgaXQgZmlyZXMgNSBidWxsZXRzIHdpdGggYSBzcHJlYWQgd2hpY2ggaXMgZG9uZSBieSBhZGRpbmcvc3VidHJhY3RpbmcgYSBjb25zdGFudCBmcm9tIHRoZSBkZXN0aW5hdGlvbi5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlU2hvdCgpIHtcclxuICAgICAgICBpZih0aGlzLmNvbnRyb2xsZXIuaXNNb3VzZVByZXNzZWQoKSkge1xyXG4gICAgICAgICAgICBsZXQgd2VwID0gdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W3RoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleF07XHJcbiAgICAgICAgICAgIGlmKHdlcC5jb29sZG93biA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXAuc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgd2VwLnNvdW5kLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgIHdlcC5hZGRDb29sZG93bigpO1xyXG4gICAgICAgICAgICAgICAgaWYod2VwIGluc3RhbmNlb2YgUGlzdG9sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDltbSh0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0rdGhpcy53b3JsZC5jYW1lcmEueCwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdK3RoaXMud29ybGQuY2FtZXJhLnkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYod2VwIGluc3RhbmNlb2YgU25pcGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDUwY2FsKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0LzIsIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54LCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih3ZXAgaW5zdGFuY2VvZiBBc3NhdWx0UmlmbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0NTU2KHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0LzIsIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54LCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih3ZXAgaW5zdGFuY2VvZiBTaG90Z3VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDEyR2F1Z2UodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDEyR2F1Z2UodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngrMjUsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55KzI1KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDEyR2F1Z2UodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngrNTAsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55KzUwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDEyR2F1Z2UodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngtMjUsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55LTI1KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDEyR2F1Z2UodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngtNTAsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55LTUwKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgd2hhdCB0aGUgcGxheWVyIGhhcyBlcXVpcHBlZCBiYXNlZCBvbiB3aGF0IGtleSBpcyBwcmVzc2VkLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVFcXVpcHBlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg0OSkpIC8vIFBsYXllciBwcmVzc2VkIDFcclxuICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gMDtcclxuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg1MCkpIHsgLy8gUGxheWVyIHByZXNzZWQgMlxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnkubGVuZ3RoID4gMSlcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleCA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDUxKSkgeyAvLyBQbGF5ZXIgcHJlc3NlZCAzXHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmludmVudG9yeS5sZW5ndGggPiAyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoNTIpKSB7IC8vIFBsYXllciBwcmVzc2VkIDRcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5Lmxlbmd0aCA+IDMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXggPSAzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyBidWxsZXRzIGFuZCBlbmVteSBwcm9qZWN0aWxlcyBpbiB0aGUgd29ybGQuIElmIGEgcHJvamVjdGlsZSBoaXRzIGFuIG9iamVjdCBlbmVteS9wbGF5ZXJcclxuICAgICAqIGl0IGRpc2FwcGVhcnMgZnJvbSB0aGUgd29ybGQuXHJcbiAgICAgKiBAcGFyYW0gbW9kaWZpZXIgVGhlIGdhbWUgc3BlZWQgbW9kaWZpZXIuXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVByb2plY3RpbGVzKG1vZGlmaWVyKSB7XHJcbiAgICAgICAgLy8gZW5lbXkgcHJvamVjdGlsZXNcclxuICAgICAgICBmb3IobGV0IGkgPSB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzW2ldLm1vdmUobW9kaWZpZXIsIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzLCB0aGlzLndvcmxkLnBsYXllcik7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5saXZlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBwbGF5ZXIgYnVsbGV0c1xyXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMud29ybGQuYnVsbGV0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHNbaV0ubW92ZShtb2RpZmllciwgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMsIHRoaXMud29ybGQuZW5lbWllcyk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuYnVsbGV0c1tpXS5saXZlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgYWxsIG9mIHRoZSBsaXZlIGVuZW15IHByb2plY3RpbGVzIGluIHRoZSB3b3JsZC5cclxuICAgICAqL1xyXG4gICAgZHJhd0VuZW15UHJvamVjdGlsZXMoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXNbaV0uaXNJbWFnZUxvYWRlZCAmJiB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXNbaV0ubGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIGFsbCBvZiB0aGUgcGljayB1cHMgaW4gdGhlIHdvcmxkLlxyXG4gICAgICovXHJcbiAgICBkcmF3UGlja1VwcygpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5waWNrVXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGlja1Vwc1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBpY2tVcHNbaV0uZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xyXG4iLCJpbXBvcnQgUm9jayBmcm9tIFwiLi4vRW52aXJvbm1lbnRPYmplY3RzL1JvY2tcIjtcclxuaW1wb3J0IEJ1c2ggZnJvbSBcIi4uL0Vudmlyb25tZW50T2JqZWN0cy9CdXNoXCI7XHJcbmltcG9ydCBDcmF0ZSBmcm9tIFwiLi4vRW52aXJvbm1lbnRPYmplY3RzL0NyYXRlXCI7XHJcbmltcG9ydCBUYW5rRW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvVGFua0VuZW15XCI7XHJcbmltcG9ydCBSZWd1bGFyRW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvUmVndWxhckVuZW15XCI7XHJcbmltcG9ydCBMaWdodEVuZW15IGZyb20gXCIuLi9FbmVtaWVzL0xpZ2h0RW5lbXlcIjtcclxuaW1wb3J0IFByb2plY3RpbGVFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9Qcm9qZWN0aWxlRW5lbXlcIjtcclxuaW1wb3J0IE1pbmlCb3NzIGZyb20gJy4uL0VuZW1pZXMvTWluaUJvc3MnO1xyXG5pbXBvcnQgRmluYWxCb3NzIGZyb20gJy4uL0VuZW1pZXMvRmluYWxCb3NzJztcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi4vUGxheWVycy9QbGF5ZXJcIjtcclxuaW1wb3J0IENhbWVyYSBmcm9tIFwiLi4vUGxheWVycy9DYW1lcmFcIjtcclxuaW1wb3J0IEdyb3VuZEFzc2F1bHRSaWZsZSBmcm9tIFwiLi4vUGlja1Vwcy9Hcm91bmRBc3NhdWx0UmlmbGUuanNcIjtcclxuaW1wb3J0IEdyb3VuZFNuaXBlciBmcm9tIFwiLi4vUGlja1Vwcy9Hcm91bmRTbmlwZXIuanNcIjtcclxuaW1wb3J0IEdyb3VuZFNob3RndW4gZnJvbSAnLi4vUGlja1Vwcy9Hcm91bmRTaG90Z3VuLmpzJztcclxuaW1wb3J0IEhlYWx0aFBhY2sgZnJvbSBcIi4uL1BpY2tVcHMvSGVhbHRocGFjay5qc1wiO1xyXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vVXRpbGl0aWVzL1V0aWxcIjtcclxuaW1wb3J0IFBhcmFzaXRlRW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvUGFyYXNpdGVFbmVteVwiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBXb3JsZCBjbGFzcyBob2xkcyB0aGUgaW5mb3JtYXRpb24gcmVsYXRlZCB0byB0aGUgd29ybGQuXHJcbiAqL1xyXG5jbGFzcyBXb3JsZCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkIG9mIHRoZSB3b3JsZCBhbmQgbG9hZHMgdGhlIGJhY2tncm91bmQuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzIFRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhcykge1xyXG4gICAgICAgIHRoaXMuc3RhcnQoY2FudmFzKTtcclxuICAgICAgICB0aGlzLmxvYWRCYWNrZ3JvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc3RhcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgV29ybGQuIFRoZSBwbGF5ZXIgaXMgbWFkZSBhbmQgdGhlIGNhbWVyYSBpcyBhdHRhY2hlZCB0byB0aGUgcGxheWVyLlxyXG4gICAgICogQSBjYWxsIGlzIHRvIGluaXRpYWxpemUgdGhlIGVudmlyb25tZW50IGFuZCBzdGFydCB0aGUgd2F2ZS5cclxuICAgICAqIEBwYXJhbSBjYW52YXMgVGhlIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgc3RhcnQoY2FudmFzKSB7XHJcbiAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLmVuZW1pZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmJ1bGxldHMgPSBbXTtcclxuICAgICAgICB0aGlzLmVuZW15UHJvamVjdGlsZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnBpY2tVcHMgPSBbXTtcclxuICAgICAgICB0aGlzLmdyb3VuZFdlYXBvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVFbnZpcm9ubWVudCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVBpY2tVcHMoKTtcclxuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoY2FudmFzLndpZHRoLzIsIGNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgQ2FtZXJhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCwgMTAwMDAsIDU2MjUpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllciwgY2FudmFzLndpZHRoLzIsIGNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy53YXZlID0gMTtcclxuICAgICAgICB0aGlzLnN0YXJ0V2F2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpbml0aWFsaXplcyB0aGUgZW52aXJvbm1lbnQgYnkgcHVzaGluZyBlbnZpcm9ubWVudCBvYmplY3RzIG9udG8gdGhlIGVudmlyb25tZW50T2JqZWN0cyBhcnJheS5cclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZUVudmlyb25tZW50KCkge1xyXG4gICAgICAgIGxldCBjcmF0ZUNhcCA9IDE1O1xyXG4gICAgICAgIGxldCBidXNoQ2FwID0gMTU7XHJcbiAgICAgICAgbGV0IHJvY2tDYXAgPSAxNTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGNyYXRlQ2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzLnB1c2gobmV3IENyYXRlKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYnVzaENhcDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cy5wdXNoKG5ldyBCdXNoKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcm9ja0NhcDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cy5wdXNoKG5ldyBSb2NrKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbGxpc2lvbkZsYWcgPSB0cnVlO1xyXG4gICAgICAgIHdoaWxlKGNvbGxpc2lvbkZsYWcgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IGkgPSBVdGlsLmFyZUFueUNvbGxpc2lvbnNJblNhbWVBcnJheSh0aGlzLmVudmlyb25tZW50T2JqZWN0cyk7XHJcbiAgICAgICAgICAgIGlmKGkgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0c1tpXS5zZXRQb3NpdGlvbihVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGluaXRpYWxpemVzIFBpY2tVcHMgc3VjaCBhcyB3ZWFwb25zIGFuZCBoZWFsdGggcGFja3MgYnkgcHVzaGluZyB0aGVtIG9udG8gdGhlIFBpY2tVcHMgYW5kIGdyb3VuZFdlYXBvbnMgYXJyYXlzLlxyXG4gICAgICovXHJcbiAgICAgaW5pdGlhbGl6ZVBpY2tVcHMoKSB7XHJcbiAgICAgICAgIGxldCBzbmlwZXJDYXAgPSAzO1xyXG4gICAgICAgICBsZXQgYXNzYXVsdFJpZmxlQ2FwID0gNTtcclxuICAgICAgICAgbGV0IHNob3RndW5DYXAgPSA1O1xyXG4gICAgICAgICBsZXQgaGVhbHRoUGFja0NhcCA9IDc7XHJcblxyXG4gICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc25pcGVyQ2FwOyBpKyspXHJcbiAgICAgICAgICAgICB0aGlzLmdyb3VuZFdlYXBvbnMucHVzaChuZXcgR3JvdW5kU25pcGVyKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFzc2F1bHRSaWZsZUNhcDsgaSsrKVxyXG4gICAgICAgICAgICAgdGhpcy5ncm91bmRXZWFwb25zLnB1c2gobmV3IEdyb3VuZEFzc2F1bHRSaWZsZShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaG90Z3VuQ2FwOyBpKyspXHJcbiAgICAgICAgICAgICB0aGlzLmdyb3VuZFdlYXBvbnMucHVzaChuZXcgR3JvdW5kU2hvdGd1bihVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBoZWFsdGhQYWNrQ2FwOyBpKyspXHJcbiAgICAgICAgICAgICB0aGlzLnBpY2tVcHMucHVzaChuZXcgSGVhbHRoUGFjayhVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcblxyXG4gICAgICAgICBsZXQgc2VsZkNvbGxpc2lvbkZsYWcgPSB0cnVlO1xyXG4gICAgICAgICB3aGlsZShzZWxmQ29sbGlzaW9uRmxhZykge1xyXG4gICAgICAgICAgICAgbGV0IGkgPSBVdGlsLmFyZUFueUNvbGxpc2lvbnNJblNhbWVBcnJheSh0aGlzLmdyb3VuZFdlYXBvbnMpO1xyXG4gICAgICAgICAgICAgaWYoaSA9PT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgc2VsZkNvbGxpc2lvbkZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICB0aGlzLmdyb3VuZFdlYXBvbnNbaV0uc2V0UG9zaXRpb24oVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHNlbGZDb2xsaXNpb25GbGFnID0gdHJ1ZTtcclxuICAgICAgICAgd2hpbGUoc2VsZkNvbGxpc2lvbkZsYWcpIHtcclxuICAgICAgICAgICAgIGxldCBpID0gVXRpbC5hcmVBbnlDb2xsaXNpb25zSW5TYW1lQXJyYXkodGhpcy5waWNrVXBzKTtcclxuICAgICAgICAgICAgIGlmKGkgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgIHNlbGZDb2xsaXNpb25GbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgdGhpcy5waWNrVXBzW2ldLnNldFBvc2l0aW9uKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpO1xyXG4gICAgICAgICB9XHJcbiAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzdGFydHMgdGhlIHdhdmUgYnkgcHVzaGluZyBlbmVtaWVzIG9udG8gdGhlIGVuZW1pZXMgYXJyYXkuXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0V2F2ZSgpIHtcclxuICAgICAgICBsZXQgbGlnaHRFbmVteUNhcCA9IHRoaXMud2F2ZSAqIDEwO1xyXG4gICAgICAgIGxldCByZWd1bGFyRW5lbXlDYXAgPSB0aGlzLndhdmUgKiAxMDtcclxuICAgICAgICBsZXQgdGFua0VuZW15Q2FwID0gdGhpcy53YXZlICogNTtcclxuICAgICAgICBsZXQgcHJvamVjdGlsZUVuZW15Q2FwID0gTWF0aC5mbG9vcih0aGlzLndhdmUvMikqNTtcclxuICAgICAgICBsZXQgbWluaUJvc3NDYXAgPSBNYXRoLmZsb29yKHRoaXMud2F2ZS81KTtcclxuICAgICAgICBsZXQgcGFyYXNpdGVFbmVteUNhcCA9IHRoaXMud2F2ZTtcclxuXHJcbiAgICAgICAgaWYodGhpcy53YXZlID09PSA2KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBGaW5hbEJvc3MoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxpZ2h0RW5lbXlDYXA7IGkrKylcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBMaWdodEVuZW15KFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHJlZ3VsYXJFbmVteUNhcDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IFJlZ3VsYXJFbmVteShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0YW5rRW5lbXlDYXA7IGkrKylcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBUYW5rRW5lbXkoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcHJvamVjdGlsZUVuZW15Q2FwOyBpKyspXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgUHJvamVjdGlsZUVuZW15KFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG1pbmlCb3NzQ2FwOyBpKyspXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgTWluaUJvc3MoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGFyYXNpdGVFbmVteUNhcDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IFBhcmFzaXRlRW5lbXkoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNvbGxpc2lvbkZsYWcgPSB0cnVlO1xyXG4gICAgICAgIHdoaWxlKGNvbGxpc2lvbkZsYWcgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IGkgPSBVdGlsLmFyZUFueUNvbGxpc2lvbnModGhpcy5lbmVtaWVzLCB0aGlzLmVudmlyb25tZW50T2JqZWN0cyk7XHJcbiAgICAgICAgICAgIGlmIChpID09PSAtMSlcclxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbkZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmVtaWVzW2ldLnNldFBvc2l0aW9uKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsb2FkQmFja2dyb3VuZCBmdW5jdGlvbiBsb2FkcyB0aGUgYmFja2dyb3VuZCBpbWFnZS4gT25jZSB0aGUgaW1hZ2UgaXMgbG9hZGVkLCB0aGlzLmlzQmFja2dyb3VuZExvYWRlZCBpc1xyXG4gICAgICogc2V0IHRvIHRydWUuXHJcbiAgICAgKi9cclxuICAgIGxvYWRCYWNrZ3JvdW5kKCkge1xyXG4gICAgICAgIHRoaXMuaXNCYWNrZ3JvdW5kTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0JhY2tncm91bmRMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5iYWNrZ3JvdW5kLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuYmFja2dyb3VuZC5oZWlnaHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQuc3JjID0gXCJHcmFwaGljcy9CYWNrZ3JvdW5kLnBuZ1wiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRyYXdCYWNrZ3JvdW5kIGZ1bmN0aW9uIGRyYXdzIHRoZSBiYWNrZ3JvdW5kIG9mIHRoZSB3b3JsZC5cclxuICAgICAqIEBwYXJhbSBjdHggVGhlIGNvbnRleHQgb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjYW52YXMgVGhlIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgZHJhd0JhY2tncm91bmQoY3R4LCBjYW52YXMpIHtcclxuICAgICAgICBsZXQgc1dpZHRoLCBzSGVpZ2h0O1xyXG4gICAgICAgIHNXaWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgICAgICBzSGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuXHJcbiAgICAgICAgaWYodGhpcy5iYWNrZ3JvdW5kLndpZHRoIC0gdGhpcy5jYW1lcmEueCA8IGNhbnZhcy53aWR0aClcclxuICAgICAgICAgICAgc1dpZHRoID0gdGhpcy5iYWNrZ3JvdW5kLndpZHRoIC0gdGhpcy5jYW1lcmEueDtcclxuICAgICAgICBpZih0aGlzLmJhY2tncm91bmQuaGVpZ2h0IC0gdGhpcy5jYW1lcmEueSA8IGNhbnZhcy5oZWlnaHQpXHJcbiAgICAgICAgICAgIHNIZWlnaHQgPSB0aGlzLmJhY2tncm91bmQuaGVpZ2h0IC0gdGhpcy5jYW1lcmEueTtcclxuXHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmJhY2tncm91bmQsIHRoaXMuY2FtZXJhLngsIHRoaXMuY2FtZXJhLnksIHNXaWR0aCwgc0hlaWdodCwgMCwgMCwgc1dpZHRoLCBzSGVpZ2h0KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdvcmxkO1xyXG4iLCIvKlxuICBTb3VyY2VzOlxuICBodHRwOi8vd3d3Lmxvc3RkZWNhZGVnYW1lcy5jb20vaG93LXRvLW1ha2UtYS1zaW1wbGUtaHRtbDUtY2FudmFzLWdhbWUvXG4gIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQwMzcyMTIvaHRtbC1jYW52YXMtZnVsbC1zY3JlZW4/dXRtX21lZGl1bT1vcmdhbmljJnV0bV9zb3VyY2U9Z29vZ2xlX3JpY2hfcWEmdXRtX2NhbXBhaWduPWdvb2dsZV9yaWNoX3FhXG4gIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2OTE5NjAxL2h0bWw1LWNhbnZhcy13b3JsZC5jYW1lcmEtdmlld3BvcnQtaG93LXRvLWFjdGFsbHktZG8taXQ/dXRtX21lZGl1bT1vcmdhbmljJnV0bV9zb3VyY2U9Z29vZ2xlX3JpY2hfcWEmdXRtX2NhbXBhaWduPWdvb2dsZV9yaWNoX3FhXG4gIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvZ2ZjYXJ2L1FLZ0hzL1xuICovXG5cbmltcG9ydCBHYW1lIGZyb20gJy4vR2FtZS9HYW1lLmpzJztcblxubGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbmxldCBnYW1lID0gbmV3IEdhbWUoY2FudmFzLCBkb2N1bWVudC5ib2R5KTtcblxubGV0IG1haW4gPSAoKSA9PiB7XG4gICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgbGV0IGRlbHRhID0gbm93IC0gdGhlbjtcblxuICAgIGdhbWUudXBkYXRlKGRlbHRhIC8gMTAwMCk7XG4gICAgZ2FtZS5kcmF3KCk7XG5cbiAgICB0aGVuID0gbm93O1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW4pO1xufTtcblxuLy8gQ3Jvc3MtYnJvd3NlciBzdXBwb3J0IGZvciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZTtcblxubGV0IHRoZW4gPSBEYXRlLm5vdygpO1xubWFpbigpO1xuIiwiaW1wb3J0IEdyb3VuZFdlYXBvbiBmcm9tICcuL0dyb3VuZFdlYXBvbi5qcyc7XHJcbmltcG9ydCBBc3NhdWx0UmlmbGUgZnJvbSAnLi4vV2VhcG9ucy9Bc3NhdWx0UmlmbGUuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBHcm91bmRBc3NhdWx0UmlmbGUgY2xhc3MgZXh0ZW5kcyB0aGUgR3JvdW5kV2VhcG9uIGNsYXNzLlxyXG4gKi9cclxuY2xhc3MgR3JvdW5kQXNzYXVsdFJpZmxlIGV4dGVuZHMgR3JvdW5kV2VhcG9uIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgbGV0IHdlYXBvbiA9IG5ldyBBc3NhdWx0UmlmbGUoKTtcclxuICAgICAgICBzdXBlcih4LCB5LCB3ZWFwb24pO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0dyb3VuZEFzc2F1bHRSaWZsZS5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdyb3VuZEFzc2F1bHRSaWZsZTtcclxuIiwiaW1wb3J0IEdyb3VuZFdlYXBvbiBmcm9tICcuL0dyb3VuZFdlYXBvbi5qcyc7XHJcbmltcG9ydCBTaG90Z3VuIGZyb20gJy4uL1dlYXBvbnMvU2hvdGd1bi5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIEdyb3VuZEFzc2F1bHRSaWZsZSBjbGFzcyBleHRlbmRzIHRoZSBHcm91bmRXZWFwb24gY2xhc3MuXHJcbiAqL1xyXG5jbGFzcyBHcm91bmRTaG90Z3VuIGV4dGVuZHMgR3JvdW5kV2VhcG9uIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgbGV0IHdlYXBvbiA9IG5ldyBTaG90Z3VuKCk7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2VhcG9uKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9Hcm91bmRTaG90Z3VuLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBHcm91bmRTaG90Z3VuO1xyXG4iLCJpbXBvcnQgR3JvdW5kV2VhcG9uIGZyb20gJy4vR3JvdW5kV2VhcG9uLmpzJztcclxuaW1wb3J0IFdlYXBvbiBmcm9tICcuLi9XZWFwb25zL1dlYXBvbi5qcyc7XHJcbmltcG9ydCBTbmlwZXIgZnJvbSAnLi4vV2VhcG9ucy9TbmlwZXIuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBHcm91bmRTbmlwZXIgY2xhc3MgZXh0ZW5kcyB0aGUgR3JvdW5kV2VhcG9uIGNsYXNzLlxyXG4gKi9cclxuY2xhc3MgR3JvdW5kU25pcGVyIGV4dGVuZHMgR3JvdW5kV2VhcG9uIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgbGV0IHdlYXBvbiA9IG5ldyBTbmlwZXIoKTtcclxuICAgICAgICBzdXBlcih4LCB5LCB3ZWFwb24pO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0dyb3VuZFNuaXBlci5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdyb3VuZFNuaXBlcjtcclxuIiwiY2xhc3MgR3JvdW5kV2VhcG9uIHtcclxuICAgIC8veCA9IHRoZSB4IHBvc2l0aW9uIG9mIHRoZSBncm91bmQgd2VhcG9uXHJcbiAgICAvL3kgPSB0aGUgeSBwb3NpdGlvbiBvZiB0aGUgZ3JvdW5kIHdlYXBvblxyXG4gICAgLy93ZWFwb24gID0gdGhlIHdlYXBvbiBvYmplY3QgdGhhdCB3aWxsIGJlIGFkZGVkIHRvIHRoZSBwbGF5ZXIncyBpbnZlbnRvcnlcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIHdlYXBvbikge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLndlYXBvbiA9IHdlYXBvbjtcclxuICAgIH1cclxuICAgIHNldFBvc2l0aW9uKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbiAgICBsb2FkSW1hZ2UodXJsKSB7XHJcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICBhcnJheSA9IHRoZSBhcnJheSB0aGF0IHRoZSB3ZXBhb24gb2JqZWN0IHN0b3JlZCBpbiB0aGlzIEdyb3VuZFdlYXBvbiB3aWxsIGJlIHB1c2hlZCBpbnRvLiBUaGlzIG1ldGhvZCBpcyB0byBiZSB1c2VkIHdpdGggYSBwbGF5ZXIncyBpbnZlbnRvcnkuXHJcbiAgICAqL1xyXG4gICAgYWRkV2VhcG9uKGFycmF5KXtcclxuICAgICAgYXJyYXkucHVzaCh0aGlzLndlYXBvbik7XHJcbiAgICB9XHJcbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEdyb3VuZFdlYXBvbjtcclxuIiwiY2xhc3MgSGVhbHRoUGFjayB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLmhlYWxpbmcgPSAxMDA7XHJcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRJbWFnZSgpIHtcclxuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSAnR3JhcGhpY3MvSGVhbHRoUGFjay5wbmcnO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhlYWx0aFBhY2s7XHJcbiIsIi8qXHJcbiAgU291cmNlczpcclxuICBodHRwOi8vanNmaWRkbGUubmV0L2dmY2Fydi9RS2dIcy9cclxuKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgQ2FtZXJhIGNsYXNzIGlzIHVzZWQgdG8gZm9sbG93IHRoZSBwbGF5ZXIncyBtb3ZlbWVudC5cclxuICovXHJcbmNsYXNzIENhbWVyYSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgQ2FtZXJhLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIENhbWVyYS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBDYW1lcmEuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzV2lkdGggVGhlIHdpZHRoIG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzSGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSB3b3JsZFdpZHRoIFRoZSB3aWR0aCBvZiB0aGUgd29ybGQuXHJcbiAgICAgKiBAcGFyYW0gd29ybGRIZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgd29ybGQuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQsIHdvcmxkV2lkdGgsIHdvcmxkSGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMueERlYWRab25lID0gMDtcclxuICAgICAgICB0aGlzLnlEZWFkWm9uZSA9IDA7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IGNhbnZhc1dpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gY2FudmFzSGVpZ2h0O1xyXG4gICAgICAgIHRoaXMud29ybGRXaWR0aCA9IHdvcmxkV2lkdGg7XHJcbiAgICAgICAgdGhpcy53b3JsZEhlaWdodCA9IHdvcmxkSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIHNldCB3aG8gdGhlIGNhbWVyYSBpcyBmb2xsb3dpbmcuXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIFRoZSBwbGF5ZXIgdGhhdCB0aGUgY2FtZXJhIHNob3VsZCBmb2xsb3cuXHJcbiAgICAgKiBAcGFyYW0geERlYWRab25lXHJcbiAgICAgKiBAcGFyYW0geURlYWRab25lXHJcbiAgICAgKi9cclxuICAgIGZvbGxvdyhwbGF5ZXIsIHhEZWFkWm9uZSwgeURlYWRab25lKSB7XHJcbiAgICAgICAgdGhpcy5mb2xsb3dpbmcgPSBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy54RGVhZFpvbmUgPSB4RGVhZFpvbmU7XHJcbiAgICAgICAgdGhpcy55RGVhZFpvbmUgPSB5RGVhZFpvbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgdGhlIGNhbWVyYSdzIHggYW5kIHkgcG9zaXRpb24uXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBpZih0aGlzLmZvbGxvd2luZyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZm9sbG93aW5nLnggLSB0aGlzLnggKyB0aGlzLnhEZWFkWm9uZSA+IHRoaXMud2lkdGgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmZvbGxvd2luZy54IC0gKHRoaXMud2lkdGggLSB0aGlzLnhEZWFkWm9uZSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5mb2xsb3dpbmcueCAtIHRoaXMueERlYWRab25lIDwgdGhpcy54KVxyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5mb2xsb3dpbmcueCAtIHRoaXMueERlYWRab25lO1xyXG4gICAgICAgICAgICBpZih0aGlzLmZvbGxvd2luZy55IC0gdGhpcy55ICsgdGhpcy55RGVhZFpvbmUgPiB0aGlzLmhlaWdodClcclxuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuZm9sbG93aW5nLnkgLSAodGhpcy5oZWlnaHQgLSB0aGlzLnlEZWFkWm9uZSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5mb2xsb3dpbmcueSAtIHRoaXMueURlYWRab25lIDwgdGhpcy55KVxyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5mb2xsb3dpbmcueSAtIHRoaXMueURlYWRab25lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnggPCAwKVxyXG4gICAgICAgICAgICB0aGlzLnggPSAwO1xyXG4gICAgICAgIGlmKHRoaXMueSA8IDApXHJcbiAgICAgICAgICAgIHRoaXMueSA9IDA7XHJcbiAgICAgICAgaWYodGhpcy54ICsgdGhpcy53aWR0aCA+IHRoaXMud29ybGRXaWR0aClcclxuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy53b3JsZFdpZHRoIC0gdGhpcy53aWR0aDtcclxuICAgICAgICBpZih0aGlzLnkgKyB0aGlzLmhlaWdodCA+IHRoaXMud29ybGRIZWlnaHQpXHJcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMud29ybGRIZWlnaHQgLSB0aGlzLmhlaWdodDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2FtZXJhOyIsImltcG9ydCBQaXN0b2wgZnJvbSAnLi4vV2VhcG9ucy9QaXN0b2wuanMnXG5pbXBvcnQgU25pcGVyIGZyb20gJy4uL1dlYXBvbnMvU25pcGVyLmpzJ1xuaW1wb3J0IFNob3RndW4gZnJvbSAnLi4vV2VhcG9ucy9TaG90Z3VuLmpzJ1xuaW1wb3J0IEFzc2F1bHRSaWZsZSBmcm9tICcuLi9XZWFwb25zL0Fzc2F1bHRSaWZsZS5qcydcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcblxuY2xhc3MgUGxheWVyIHtcbiAgLy90aGlzLnggPSB4IHBvc2l0aW9uXG4gIC8vdGhpcy55ID0geSBwb3NpdGlvblxuICAvL3RoaXMuaGVhbHRoID0gcGxheWVyJ3MgbGlmZVxuICAvL3RoaXMuc3BlZWQgPSBwbGF5ZXIncyBtb3Zlc3BlZWRcbiAgLy90aGlzLmxvYWRJbWFnZSgpIGlzIGEgZnVuY3Rpb24gdG8gYXR0YWNoIHRoZSBpbWFnZSB0byB0aGUgcGxheWVyLlxuICAvL1RoZSBwbGF5ZXIgaGFzIGFuIGFycmF5IHRvIGhvbGQgaGlzIGl0ZW1zIGFuZCBoZSB3aWxsIHN0YXJ0IHdpdGggYSBwaXN0b2wgYW5kIHNuaXBlciB0aGlzIHdlZWsgZm9yIGVhc3kgdGVzdGluZ1xuICAvL05leHQgd2VlayBpdGVtcyB3aWxsIGJlIHBpY2tlZCB1cCBieSB3YWxraW5nIG92ZXIgdGhlbSBhbmQgYXMgc3VjaCB0aGVyZSB3aWxsIG5lZWQgdG8gYmUgYW4gYWRkSXRlbSBmdW5jdGlvblxuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICB0aGlzLnggPSB4O1xuICAgICAgdGhpcy55ID0geTtcbiAgICAgIHRoaXMuaGVhbHRoID0gMTAwO1xuICAgICAgdGhpcy5zcGVlZCA9IDI1NjtcbiAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgICB0aGlzLmxvYWREYW1hZ2VUYWtlblNvdW5kKCdBdWRpby9EYW1hZ2VUYWtlbi5tcDMnKTtcbiAgICAgIGxldCBzdGFydF9waXN0b2wgPSBuZXcgUGlzdG9sKCk7XG4gICAgICBsZXQgc3RhcnRfc25pcGVyID0gbmV3IFNuaXBlcigpO1xuICAgICAgbGV0IHN0YXJ0X3JpZmxlID0gbmV3IEFzc2F1bHRSaWZsZSgpO1xuICAgICAgbGV0IHN0YXJ0X3Nob3RndW4gPSBuZXcgU2hvdGd1bigpO1xuICAgICAgdGhpcy5pbnZlbnRvcnkgPSBbc3RhcnRfcGlzdG9sXTtcbiAgICAgIHRoaXMuYWN0aXZlX2luZGV4ID0gMDtcbiAgfVxuXG4gICAgaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoVXRpbC5pc0NvbGxpc2lvbihlbnZpcm9ubWVudE9iamVjdHNbaV0sIHRoaXMpICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gIGxvYWRJbWFnZSgpIHtcbiAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgfTtcbiAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gXCJHcmFwaGljcy9QbGF5ZXIucG5nXCI7XG4gIH1cblxuICBsb2FkRGFtYWdlVGFrZW5Tb3VuZCh1cmwpIHtcbiAgICAgIHRoaXMuaXNTb3VuZDFMb2FkZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGFtYWdlVGFrZW5Tb3VuZCA9IG5ldyBBdWRpbygpO1xuICAgICAgdGhpcy5kYW1hZ2VUYWtlblNvdW5kLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzU291bmQxTG9hZGVkID0gdHJ1ZTtcbiAgICAgIH07XG4gICAgICB0aGlzLmRhbWFnZVRha2VuU291bmQuc3JjID0gdXJsO1xuICB9XG5cbiAgICBkcmF3KGN0eCwgY2FtZXJhLCBtb3VzZSkge1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHgudHJhbnNsYXRlKCh0aGlzLngrdGhpcy53aWR0aC8yKSAtIGNhbWVyYS54LCAodGhpcy55K3RoaXMuaGVpZ2h0LzIpIC0gY2FtZXJhLnkpO1xuICAgICAgICBsZXQgYW5nbGUgPSBNYXRoLmF0YW4yKG1vdXNlWzFdIC0gKHRoaXMueSt0aGlzLmhlaWdodC8yLWNhbWVyYS55KSwgbW91c2VbMF0gLSAodGhpcy54K3RoaXMud2lkdGgvMi1jYW1lcmEueCkpO1xuICAgICAgICBjdHgucm90YXRlKGFuZ2xlKyhNYXRoLlBJLzIpKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAwLXRoaXMud2lkdGgvMiwgMC10aGlzLmhlaWdodC8yKTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsIi8qXHJcbiAgU291cmNlczpcclxuICBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0dhbWVzL1RlY2huaXF1ZXMvMkRfY29sbGlzaW9uX2RldGVjdGlvblxyXG4gIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ5NTk5NzUvZ2VuZXJhdGUtcmFuZG9tLW51bWJlci1iZXR3ZWVuLXR3by1udW1iZXJzLWluLWphdmFzY3JpcHRcclxuKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgVXRpbCBjbGFzcyBjb250YWlucyB2YXJpb3VzIHV0aWxpdHkgZnVuY3Rpb25zLlxyXG4gKi9cclxuY2xhc3MgVXRpbCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgaXNDb2xsaXNpb24gbWV0aG9kIGNoZWNrcyBpZiB0aGVyZSBpcyBhIGNvbGxpc2lvbiBiZXR3ZWVuIHRoZSB0d28gaW5wdXR0ZWQgcmVjdGFuZ2xlcy4gVGhpcyBhbGdvcml0aG0gb25seVxyXG4gICAgICogd29ya3Mgd2l0aCBheGlzLWFsaWduZWQgcmVjdGFuZ2xlcy5cclxuICAgICAqIEBwYXJhbSByZWN0YW5nbGUxIFRoZSBmaXJzdCByZWN0YW5nbGUuXHJcbiAgICAgKiBAcGFyYW0gcmVjdGFuZ2xlMiBUaGUgc2Vjb25kIHJlY3RhbmdsZS5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIHRoZXJlIGV4aXN0cyBhIGNvbGxpc2lvbiBiZXR3ZWVuIHRoZSB0d28gaW5wdXR0ZWQgcmVjdGFuZ2xlcy5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzQ29sbGlzaW9uKHJlY3RhbmdsZTEsIHJlY3RhbmdsZTIpIHtcclxuICAgICAgICBpZihyZWN0YW5nbGUxLnggPCByZWN0YW5nbGUyLnggKyByZWN0YW5nbGUyLndpZHRoICYmXHJcbiAgICAgICAgICAgIHJlY3RhbmdsZTEueCArIHJlY3RhbmdsZTEud2lkdGggPiByZWN0YW5nbGUyLnggJiZcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMS55IDwgcmVjdGFuZ2xlMi55ICsgcmVjdGFuZ2xlMi5oZWlnaHQgJiZcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMS55ICsgcmVjdGFuZ2xlMS5oZWlnaHQgPiByZWN0YW5nbGUyLnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgdGhlcmUgYXJlIGFueSBjb2xsaXNpb25zIGJldHdlZW4gdGhlIHR3byBhcnJheXMuIFRoaXMgYWxnb3JpdGhtIG9ubHkgd29ya3Mgd2l0aFxyXG4gICAgICogYXhpcy1hbGlnbmVkIHJlY3RhbmdsZXMuXHJcbiAgICAgKiBAcGFyYW0gYXJyYXkxIEFuIGFycmF5IG9mIHJlY3RhbmdsZXMuXHJcbiAgICAgKiBAcGFyYW0gYXJyYXkyIEFuIGFycmF5IG9mIHJlY3RhbmdsZXMuXHJcbiAgICAgKiBAcmV0dXJucyB7aW50ZWdlcn0gLTEgaWYgdGhlcmUgYXJlIG5vIGNvbGxpc2lvbnMgb3IgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBhcnJheSBpZiB0aGVyZSBpcy5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFyZUFueUNvbGxpc2lvbnMoYXJyYXkxLCBhcnJheTIpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyYXkxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBhcnJheTIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb24oYXJyYXkxW2ldLCBhcnJheTJbal0pKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYXJlQW55Q29sbGlzaW9uc0luU2FtZUFycmF5KGFycmF5KSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBhcnJheS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYoaSAhPT0gaikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb24oYXJyYXlbaV0sIGFycmF5W2pdKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgcmFuZG9tIG51bWJlciBpbiB0aGUgZ2l2ZW4gaW50ZXJ2YWwuXHJcbiAgICAgKiBAcGFyYW0gZnJvbVxyXG4gICAgICogQHBhcmFtIHRvXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmFuZG9tSW50RnJvbUludGVydmFsKGZyb20sIHRvKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0byAtIGZyb20gKyAxKSArIGZyb20pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFV0aWw7IiwiaW1wb3J0IFdlYXBvbiBmcm9tICcuL1dlYXBvbi5qcyc7XHJcblxyXG5jbGFzcyBBc3NhdWx0UmlmbGUgZXh0ZW5kcyBXZWFwb257XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKDUsIDMwLCAuMSk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJBc3NhdWx0IFJpZmxlXCI7XHJcbiAgICAgICAgc3VwZXIubG9hZFNob290U291bmQoJ0F1ZGlvL1JpZmxlU2hvdC5tcDMnKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBBc3NhdWx0UmlmbGU7XHJcbiIsImltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcblxuY2xhc3MgQnVsbGV0e1xuICAgIGNvbnN0cnVjdG9yKHZlbG9jaXR5LCBkYW1hZ2UsIHgsIHksIGRlc3RYLCBkZXN0WSwgcGVuZXRyYXRlcykge1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdmVsb2NpdHk7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLmRlc3RYID0gZGVzdFg7XG4gICAgICAgIHRoaXMuZGVzdFkgPSBkZXN0WTtcbiAgICAgICAgdGhpcy5saXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc1BlbmV0cmF0aW5nID0gcGVuZXRyYXRlcztcbiAgICAgICAgbGV0IGRpZmZYID0gdGhpcy5kZXN0WCAtIHRoaXMueDtcbiAgICAgICAgbGV0IGRpZmZZID0gdGhpcy5kZXN0WSAtIHRoaXMueTtcbiAgICAgICAgdGhpcy5saXZlVGltZSA9IDA7XG4gICAgICAgIC8vVGhpcyBsb2dpYyBmaW5kcyBhIGNvZWZmaWNpZW50IGZvciBYIGFuZCBZIHRoYXQgY2FuIGJlIGFwcGxpZWRcbiAgICAgICAgLy90byB0aGUgbW92ZSBmdW5jdGlvbiBpbiBvcmRlciB0byBtb3ZlIHRoZSBidWxsZXQgaW4gYSBzdHJhaWdodCBsaW5lXG4gICAgICAgIC8vZGlyZWN0bHkgdG8gaXRzIGRlc3RpbmF0aW9uLlxuICAgICAgICBpZihNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpIHtcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWCk7XG4gICAgICAgICAgICB0aGlzLmNvZWZmWSA9IGRpZmZZIC8gTWF0aC5hYnMoZGlmZlgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb2VmZlkgPSBkaWZmWSAvIE1hdGguYWJzKGRpZmZZKTtcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9hZEltYWdlKHVybCkge1xuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xuICAgIH1cbiAgICAvL01vdmVzIHRoZSBidWxsZXQgZnJvbSBpdHMgc3RhcnRpbmcgcG9pbnQgKHdoaWNoIHdpbGwgYmUgdGhlIHBsYXllcidzIGxvY2F0aW9uKVxuICAgIC8vdG8gaXRzIGRlc3RpbmF0aW9uICh3aGljaCB3aWxsIGJlIHRoZSBjdXJzb3IgbG9jYXRpb24gd2hlbiB0aGUgYnVsbGV0IGlzIGNyZWF0ZWQpLlxuICAgIC8vRWFjaCB0aW1lIG1vdmUgaXMgY2FsbGVkIGl0IGlzIGNoZWNrZWQgaWYgdGhlIGJ1bGxldCBoaXRzIGFueXRoaW5nLCBpZiBpdCBkb2VzIHRoZVxuICAgIC8vaGl0U29tZXRoaW5nIG1ldGhvZCB3aWxsIGNhbGwgYSBkYW1hZ2UgZnVuY3Rpb24gYW5kIHRoZSBkYW1hZ2Ugd2lsbCBiZSBhcHBsaWVkLCBzb1xuICAgIC8vdGhpcyBmdW5jdGlvbiBzZXRzIHRoaXMubGl2ZSA9IGZhbHNlIG1lYW5pbmcgdGhlIGJ1bGxldCBpcyBubyBsb25nZXIgbGl2ZS5cbiAgICAvL0lmIHRoZSBidWxsZXQgaXNQZW5ldHJhdGluZyB0aGF0IG1lYW5zIGl0IHdpbGwgbm90IGJlIHNldCB0byAnZGVhZCcgdXBvbiBhIGNvbGxpc2lvbiB3aXRoIHNvbWV0aGluZ1xuICAgIC8vVGhpcyBhbGxvd3MgcGVuZXRyYXRpbmcgYnVsbGV0cyB0byB0cmF2ZWwgdGhyb3VnaCBtdWx0aXBsZSB0YXJnZXRzIGFuZCB0aHJvdWdoIHdvcmxkIG9iamVjdHMuXG4gICAgbW92ZShtb2RpZmllciwgZW52aXJvbm1lbnRPYmplY3RzLCBlbmVtaWVzKXtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXIqdGhpcy5jb2VmZlg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyKnRoaXMuY29lZmZZO1xuICAgICAgICB0aGlzLmxpdmVUaW1lICs9IG1vZGlmaWVyO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxpdmVUaW1lKTtcbiAgICAgICAgaWYodGhpcy5oaXRTb21ldGhpbmcoZW52aXJvbm1lbnRPYmplY3RzLCBlbmVtaWVzKSAmJiB0aGlzLmlzUGVuZXRyYXRpbmcgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMueCA8IDAgfHwgdGhpcy54ID4gMTAwMDAgfHwgdGhpcy55IDwgMCB8fCB0aGlzLnkgPiA1NjI1KSB7XG4gICAgICAgICAgICB0aGlzLmxpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmxpdmVUaW1lID4gLjUgJiYgdGhpcy5pc1BlbmV0cmF0aW5nID09IGZhbHNlKXtcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vQ2hlY2tzIGlmIHRoZSBidWxsZXQgaGl0IGFueSBvZiBvdXIgb2JqZWN0cyB0aGF0IGNhbiBiZSBoaXQsIGlmIHNvIHRoYXQgb2JqZWN0IGxvc2VzIEhQXG4gICAgLy9hbmQgdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB0byBpbmRpY2F0ZSB0aGF0IHRoZSBvYmplY3Qgd2FzIGhpdC4gSWYgbm90LCBmYWxzZSBpcyByZXR1cm5lZFxuICAgIC8vYW5kIG5vdGhpbmcgaXMgZG9uZS5cbiAgICBkYW1hZ2VFbmVteShlbmVteU9iamVjdCkge1xuICAgICAgICBlbmVteU9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XG4gICAgfVxuXG4gICAgZGFtYWdlRW52aXJvbm1lbnQoZW52aXJvbm1lbnRPYmplY3Qpe1xuICAgICAgICBlbnZpcm9ubWVudE9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XG4gICAgfVxuICAgIC8vQ2hlY2tzIGlmIHdlIGhpdCBhbiBlbnZpcm9ubWVudCBvYmplY3QgdGhlbiBjaGVja3MgaWYgd2UgaGl0IGFuIGVuZW15LiBpbiBlaXRoZXIgY2FzZSBpdCBjYWxscyB0aGVcbiAgICAvL2NvcnJlc3BvbmRpbmcgZGFtYWdlIGZ1bmN0aW9uIGFuZCB0aGVuIHJldHVybnMgdHJ1ZSB0byBpbmRpY2F0ZSB0aGF0IHNvbWV0aGluZyB3YXMgaGl0LCB3aGljaCB0ZWxscyBtb3ZlIHRvIHNldCB0aGVcbiAgICAvL2J1bGxldCdzIGxpdmUgdmFsdWUgYWNjb3JkaW5nbHlcbiAgICBoaXRTb21ldGhpbmcoZW52aXJvbm1lbnRPYmplY3RzLCBlbmVtaWVzKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgZW52aXJvbm1lbnRPYmplY3RzW2ldKSAmJiBlbnZpcm9ubWVudE9iamVjdHNbaV0uaXNCbG9ja2luZykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlRW52aXJvbm1lbnQoZW52aXJvbm1lbnRPYmplY3RzW2ldKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZW5lbWllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbmVtaWVzW2ldKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VFbmVteShlbmVtaWVzW2ldKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ7XG4iLCJpbXBvcnQgQnVsbGV0IGZyb20gJy4vQnVsbGV0LmpzJztcclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG5cclxuLy9UaGUgNTAgY2FsaWJlciB3aWxsIHBlbmV0cmF0ZSB0aHJvdWdoIG9iamVjdHMgYW5kIG9ubHkgc3RvcHMgYmVpbmcgbGl2ZVxyXG4vL29uY2UgaXQgZXhpdHMgdGhlIGNhbnZhcywgc28gaXRzIGRhbWFnZSBpcyBzZXQgdG8gYSBzbWFsbCBudW1iZXIgYXMgaXQgZGVhbHNcclxuLy9kYW1hZ2UgZHVyaW5nIGVhY2ggZnJhbWUgYXMgaXQgcGVuZXRyYXRlcyB0aGUgb2JqZWN0IG9yIGVuZW15XHJcbmNsYXNzIEJ1bGxldDEyR2F1Z2UgZXh0ZW5kcyBCdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgZGVzdFgsIGRlc3RZKSB7XHJcbiAgICAgICAgc3VwZXIoMTAwMCwgOCwgeCwgeSwgZGVzdFgsIGRlc3RZLCBmYWxzZSk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvYnVsbGV0My5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQnVsbGV0MTJHYXVnZTtcclxuIiwiaW1wb3J0IEJ1bGxldCBmcm9tICcuL0J1bGxldC5qcyc7XHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbi8vVGhlIDUwIGNhbGliZXIgd2lsbCBwZW5ldHJhdGUgdGhyb3VnaCBvYmplY3RzIGFuZCBvbmx5IHN0b3BzIGJlaW5nIGxpdmVcclxuLy9vbmNlIGl0IGV4aXRzIHRoZSBjYW52YXMsIHNvIGl0cyBkYW1hZ2UgaXMgc2V0IHRvIGEgc21hbGwgbnVtYmVyIGFzIGl0IGRlYWxzXHJcbi8vZGFtYWdlIGR1cmluZyBlYWNoIGZyYW1lIGFzIGl0IHBlbmV0cmF0ZXMgdGhlIG9iamVjdCBvciBlbmVteVxyXG5jbGFzcyBCdWxsZXQ1MGNhbCBleHRlbmRzIEJ1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBkZXN0WCwgZGVzdFkpIHtcclxuICAgICAgICBzdXBlcigyNTAwLCA3LCB4LCB5LCBkZXN0WCwgZGVzdFksIHRydWUpO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL2J1bGxldDMucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ1MGNhbDtcclxuIiwiaW1wb3J0IEJ1bGxldCBmcm9tICcuL0J1bGxldC5qcyc7XHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbi8vVGhlIDUwIGNhbGliZXIgd2lsbCBwZW5ldHJhdGUgdGhyb3VnaCBvYmplY3RzIGFuZCBvbmx5IHN0b3BzIGJlaW5nIGxpdmVcclxuLy9vbmNlIGl0IGV4aXRzIHRoZSBjYW52YXMsIHNvIGl0cyBkYW1hZ2UgaXMgc2V0IHRvIGEgc21hbGwgbnVtYmVyIGFzIGl0IGRlYWxzXHJcbi8vZGFtYWdlIGR1cmluZyBlYWNoIGZyYW1lIGFzIGl0IHBlbmV0cmF0ZXMgdGhlIG9iamVjdCBvciBlbmVteVxyXG5jbGFzcyBCdWxsZXQ1NTYgZXh0ZW5kcyBCdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgZGVzdFgsIGRlc3RZKSB7XHJcbiAgICAgICAgc3VwZXIoMjAwMCwgMTIsIHgsIHksIGRlc3RYLCBkZXN0WSwgZmFsc2UpO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL2J1bGxldDMucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEJ1bGxldDU1NjtcclxuIiwiaW1wb3J0IEJ1bGxldCBmcm9tICcuL0J1bGxldC5qcyc7XHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuLy90aGUgOW1tIGJ1bGxldCBpcyBhIHNpbXBsZSBwaXN0b2wgYnVsbGV0IHRoYXQgd2lsbCBiZSBpbiB0aGVcclxuLy91c2VyJ3Mgc3RhcnRpbmcgd2VhcG9uLiBpdCBkb2VzIG1pbmltYWwgZGFtYWdlIGFuZCBtb3ZlcyBhdCBhIHNsb3cgc3BlZWQuXHJcbi8vdGhlIHZhbHVlIG9mIGlzUGVuZXRyYXRpbmcgaXMgc2V0IHRvIGZhbHNlIHRvIGluZGljYXRlIHRoZSBidWxsZXQgc2hvdWxkXHJcbi8vbm90IGJlIGxpdmUgYWZ0ZXIgaXQgY29sbGlkZXMgd2l0aCBzb21ldGhpbmcgYW5kIGRvZXMgaXRzIGRhbWFnZS5cclxuLy9pbiB0aGUgZnV0dXJlIHRoZSBidWxsZXQgd2lsbCBoYXZlIGEgbWF4aW11bSByYW5nZS9saXZlIHRpbWUgdG9cclxuLy9saW1pdCBpdHMgdXNlZnVsbmVzcyBtb3JlLlxyXG5jbGFzcyBCdWxsZXQ5bW0gZXh0ZW5kcyBCdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgZGVzdFgsIGRlc3RZKSB7XHJcbiAgICAgICAgc3VwZXIoMTAwMCwgMTAsIHgsIHksIGRlc3RYLCBkZXN0WSwgZmFsc2UpO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL2J1bGxldDMucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ5bW07XHJcbiIsIi8vVGhlIHNuaXBlciBpcyBvbmx5IGN1cnJlbnRseSB1c2VkIHRvIGRldGVybWluZSB0aGUgdHlwZSBvZiBidWxsZXQgdG8gYmUgZ2VuZXJhdGVkXG4vL2luIG1haW4uanMnIGV2ZW50IGhhbmRsZXIgZm9yIGNsaWNrc1xuLy9JbiB0aGUgZnV0dXJlIGl0IHdpbGwgY29udHJvbCBmaXJlIHJhdGUgYW5kIHRoZSBhbW1vIGNhcGFjaXR5LlxuaW1wb3J0IFdlYXBvbiBmcm9tICcuL1dlYXBvbi5qcyc7XG5cbmNsYXNzIFBpc3RvbCBleHRlbmRzIFdlYXBvbntcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigxNSwgOTAsIC40KTtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJQaXN0b2xcIjtcbiAgICAgICAgc3VwZXIubG9hZFNob290U291bmQoJ0F1ZGlvL1Bpc3RvbFNob3QubXAzJyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQaXN0b2w7XG4iLCJpbXBvcnQgV2VhcG9uIGZyb20gJy4vV2VhcG9uLmpzJztcclxuXHJcbmNsYXNzIFNob3RndW4gZXh0ZW5kcyBXZWFwb257XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKDgsIDMyLCAxKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlNob3RndW5cIjtcclxuICAgICAgICBzdXBlci5sb2FkU2hvb3RTb3VuZCgnQXVkaW8vU2hvdGd1blNob3QubXAzJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNob3RndW47XHJcbiIsIi8vVGhlIHNuaXBlciBpcyBvbmx5IGN1cnJlbnRseSB1c2VkIHRvIGRldGVybWluZSB0aGUgdHlwZSBvZiBidWxsZXQgdG8gYmUgZ2VuZXJhdGVkXHJcbi8vaW4gbWFpbi5qcycgZXZlbnQgaGFuZGxlciBmb3IgY2xpY2tzXHJcbi8vSW4gdGhlIGZ1dHVyZSBpdCB3aWxsIGNvbnRyb2wgZmlyZSByYXRlIGFuZCB0aGUgYW1tbyBjYXBhY2l0eS5cclxuaW1wb3J0IFdlYXBvbiBmcm9tICcuL1dlYXBvbi5qcyc7XHJcblxyXG5jbGFzcyBTbmlwZXIgZXh0ZW5kcyBXZWFwb257XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKDUsIDMwLCAxLjc1KTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlNuaXBlclwiO1xyXG4gICAgICAgIHN1cGVyLmxvYWRTaG9vdFNvdW5kKCdBdWRpby9TbmlwZXJTaG90Lm1wMycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTbmlwZXI7XHJcbiIsIi8vY2xpcFNpemUgYW5kIGFtbW8gd2lsbCBiZSB1c2VkIGFzIGV4cGVjdGVkIG5leHQgd2Vla1xuLy9hdXRvbWF0aWMgd2lsbCBiZSB1c2VkIGFzIGEgYm9vbGVhbiBmb3Igd2hldGhlciBvciBub3Rcbi8vaG9sZGluZyBjbGljayBzaG91bGQgY29udGludW91c2x5IGZpcmUuXG4vL1RoZSBuYW1lIGZpZWxkIGlzIHVzZWQgZm9yIHRoZSBIVUQgZGlzcGxheWluZyB0aGUgYWN0aXZlIHdlYXBvbi5cbmNsYXNzIFdlYXBvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcihjbGlwU2l6ZSwgbWF4QW1tbywgbWF4Q29vbERvd24pIHtcbiAgICAgICAgdGhpcy5jbGlwU2l6ZSA9IGNsaXBTaXplO1xuICAgICAgICB0aGlzLm1heEFtbW8gPSBtYXhBbW1vO1xuICAgICAgICB0aGlzLm5hbWUgPSAnJztcbiAgICAgICAgdGhpcy5jb29sZG93biA9IDA7XG4gICAgICAgIHRoaXMubWF4Q29vbERvd24gPSBtYXhDb29sRG93bjtcbiAgICB9XG4gICAgbG9hZFNob290U291bmQodXJsKSB7XG4gICAgICAgIHRoaXMuaXNTb3VuZExvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNvdW5kID0gbmV3IEF1ZGlvKCk7XG4gICAgICAgIHRoaXMuc291bmQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc1NvdW5kTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zb3VuZC5zcmMgPSB1cmw7XG4gICAgfVxuICAgIGFkZENvb2xkb3duKCl7XG4gICAgICB0aGlzLmNvb2xkb3duICs9IHRoaXMubWF4Q29vbERvd247XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYXBvbjtcbiJdfQ==
