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
        value: function move(player, modifier, environmentObjects) {
            var diffX = player.x - this.x;
            var diffY = player.y - this.y;
            var length = Math.sqrt(diffX * diffX + diffY * diffY);
            if (length !== 0) {
                diffX /= length;
                diffY /= length;
            }

            this.angle = Math.atan2(diffY, diffX);

            if (diffX > 0) {
                if (this.x + this.width <= 10000) {
                    this.x += this.velocity * modifier;
                    if (this.isCollisionWithEnvironmentObject(environmentObjects)) {
                        this.x -= this.velocity * modifier;
                    }
                }
            } else if (diffX < 0) {
                if (this.x >= 0) {
                    this.x -= this.velocity * modifier;
                    if (this.isCollisionWithEnvironmentObject(environmentObjects)) {
                        this.x += this.velocity * modifier;
                    }
                }
            }
            if (diffY > 0) {
                if (this.y + this.height <= 5625) {
                    this.y += this.velocity * modifier;
                    if (this.isCollisionWithEnvironmentObject(environmentObjects)) {
                        this.y -= this.velocity * modifier;
                    }
                }
            } else if (diffY < 0) {
                if (this.y >= 0) {
                    this.y -= this.velocity * modifier;
                    if (this.isCollisionWithEnvironmentObject(environmentObjects)) {
                        this.y += this.velocity * modifier;
                    }
                }
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
            //ctx.save();
            //ctx.translate(this.x, this.y);
            //ctx.rotate(this.angle + Math.PI/2.0);
            //ctx.translate(-this.x, -this.y);
            ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
            //ctx.restore();
        }
    }]);

    return Enemy;
}();

exports.default = Enemy;

},{"../Utilities/Util.js":25}],3:[function(require,module,exports){
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

},{"../Utilities/Util.js":25}],4:[function(require,module,exports){
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

},{"./Enemy.js":2}],10:[function(require,module,exports){
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

},{"./EnvironmentObject.js":12}],11:[function(require,module,exports){
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

},{"./EnvironmentObject.js":12}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{"./EnvironmentObject.js":12}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

var _Rock = require('../EnvironmentObjects/Rock');

var _Rock2 = _interopRequireDefault(_Rock);

var _Crate = require('../EnvironmentObjects/Crate');

var _Crate2 = _interopRequireDefault(_Crate);

var _Bush = require('../EnvironmentObjects/Bush');

var _Bush2 = _interopRequireDefault(_Bush);

var _GroundWeapon = require('../PickUps/GroundWeapon.js');

var _GroundWeapon2 = _interopRequireDefault(_GroundWeapon);

var _GroundAssaultRifle = require('../PickUps/GroundAssaultRifle.js');

var _GroundAssaultRifle2 = _interopRequireDefault(_GroundAssaultRifle);

var _GroundSniper = require('../PickUps/GroundSniper.js');

var _GroundSniper2 = _interopRequireDefault(_GroundSniper);

var _GroundShotgun = require('../PickUps/GroundShotgun.js');

var _GroundShotgun2 = _interopRequireDefault(_GroundShotgun);

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
            var sprinting = this.controller.isKeyPressed(16);
            if (this.gameState === 'Playing') {
                if (this.world.player.health <= 0) this.gameState = 'Game Over';else if (this.controller.isKeyPressed(27)) this.gameState = 'Paused';
                if (this.controller.isKeyPressed(87)) {
                    // Player holding up
                    //Only move up if we are not at the very top of the world
                    if (this.world.player.y >= 0) {
                        //If the player is sprinting he must move twice as fast, and his stamina must drain based on the modifier (seconds since last update)
                        if (sprinting) {
                            this.world.player.y -= this.world.player.speed * modifier * 2;
                        } else {
                            this.world.player.y -= this.world.player.speed * modifier;
                        }
                        //If the movement caused the player to be colliding, undo the movement and give back the stamina if he was spritning.
                        if (this.world.player.isCollisionWithEnvironmentObject(this.world.environmentObjects)) {
                            if (sprinting) {
                                this.world.player.y += this.world.player.speed * modifier * 2;
                            } else {
                                this.world.player.y += this.world.player.speed * modifier;
                            }
                        }
                    }
                }
                if (this.controller.isKeyPressed(83)) {
                    // Player holding down
                    //Only move down if we are not at the very bottom of the world
                    if (this.world.player.y + this.world.player.height <= 5625) {
                        //If the player is sprinting he must move twice as fast, and his stamina must drain based on the modifier (seconds since last update)
                        if (sprinting) {
                            this.world.player.y += this.world.player.speed * modifier * 2;
                        }
                        //Otherwise move like normal
                        else {
                                this.world.player.y += this.world.player.speed * modifier;
                            }
                        //If the movement caused the player to be colliding, undo the movement and give back the stamina if he was spritning.
                        if (this.world.player.isCollisionWithEnvironmentObject(this.world.environmentObjects)) {
                            if (sprinting) {
                                this.world.player.y -= this.world.player.speed * modifier * 2;
                            } else {
                                this.world.player.y -= this.world.player.speed * modifier;
                            }
                        }
                    }
                }
                if (this.controller.isKeyPressed(65)) {
                    // Player holding left
                    //only go left if we are not on the far left edge already
                    if (this.world.player.x >= 0) {
                        if (sprinting) {
                            this.world.player.x -= this.world.player.speed * modifier * 2;
                        } else {
                            this.world.player.x -= this.world.player.speed * modifier;
                        }
                        if (this.world.player.isCollisionWithEnvironmentObject(this.world.environmentObjects)) {
                            if (sprinting) {
                                this.world.player.x += this.world.player.speed * modifier * 2;
                            } else {
                                this.world.player.x += this.world.player.speed * modifier;
                            }
                        }
                    }
                }
                if (this.controller.isKeyPressed(68)) {
                    // Player holding right
                    if (this.world.player.x + this.world.player.width <= 10000) {
                        if (sprinting) {
                            this.world.player.x += this.world.player.speed * modifier * 2;
                        } else {
                            this.world.player.x += this.world.player.speed * modifier;
                        }
                        if (this.world.player.isCollisionWithEnvironmentObject(this.world.environmentObjects)) {
                            if (sprinting) {
                                this.world.player.x -= this.world.player.speed * modifier * 2;
                            } else {
                                this.world.player.x -= this.world.player.speed * modifier;
                            }
                        }
                    }
                }
                if (this.controller.isMousePressed()) {
                    var wep = this.world.player.inventory[this.world.player.active_index];

                    //Fire the correct bullet type for the currently equipped weapon.
                    //This could be done more gracefully in the future
                    if (wep.cooldown <= 0) {
                        wep.sound.play();
                        wep.sound.currentTime = 0;
                        wep.addCooldown();
                        if (wep instanceof _Pistol2.default) {
                            this.world.bullets.push(new _Bullet9mm2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y, this.controller.mouse[0] + this.world.camera.x, this.controller.mouse[1] + this.world.camera.y));
                        } else if (wep instanceof _Sniper2.default) {
                            this.world.bullets.push(new _Bullet50cal2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y, this.controller.mouse[0] + this.world.camera.x, this.controller.mouse[1] + this.world.camera.y));
                        } else if (wep instanceof _AssaultRifle2.default) {
                            this.world.bullets.push(new _Bullet2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y, this.controller.mouse[0] + this.world.camera.x, this.controller.mouse[1] + this.world.camera.y));
                        } else if (wep instanceof _Shotgun2.default) {
                            this.world.bullets.push(new _Bullet12Gauge2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y, this.controller.mouse[0] + this.world.camera.x, this.controller.mouse[1] + this.world.camera.y));
                            this.world.bullets.push(new _Bullet12Gauge2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y, this.controller.mouse[0] + this.world.camera.x + 25, this.controller.mouse[1] + this.world.camera.y + 25));
                            this.world.bullets.push(new _Bullet12Gauge2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y, this.controller.mouse[0] + this.world.camera.x + 50, this.controller.mouse[1] + this.world.camera.y + 50));
                            this.world.bullets.push(new _Bullet12Gauge2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y, this.controller.mouse[0] + this.world.camera.x - 25, this.controller.mouse[1] + this.world.camera.y - 25));
                            this.world.bullets.push(new _Bullet12Gauge2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y, this.controller.mouse[0] + this.world.camera.x - 50, this.controller.mouse[1] + this.world.camera.y - 50));
                        }
                    }
                }
                //These controls change the active weapon with simple 1,2,3,etc controls for inventory
                if (this.controller.isKeyPressed(49)) {
                    // Player pressed 1
                    this.world.player.active_index = 0;
                }
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
                for (var i = this.world.bullets.length - 1; i >= 0; i--) {
                    this.world.bullets[i].move(modifier, this.world.environmentObjects, this.world.enemies);
                    if (this.world.bullets[i].live === false) {
                        this.world.bullets.splice(i, 1);
                    }
                }
                for (var _i = this.world.enemies.length - 1; _i >= 0; _i--) {
                    this.world.enemies[_i].move(this.world.player, modifier, this.world.environmentObjects);
                    if (this.world.enemies[_i].attackCooldown > 0) this.world.enemies[_i].attackCooldown -= 5;
                    if (this.world.enemies[_i] instanceof _FinalBoss2.default) {
                        if (this.world.enemies[_i].rapidFireCooldown > 0 && !this.world.enemies[_i].isRapidFire) this.world.enemies[_i].rapidFireCooldown -= this.world.enemies[_i].rapidFireCooldownRate;else if (this.world.enemies[_i].rapidFireCooldown <= 0 && !this.world.enemies[_i].isRapidFire) {
                            this.world.enemies[_i].startRapidFire();
                            this.world.enemies[_i].rapidFireLength = this.world.enemies[_i].rapidFireLengthReset;
                        }
                        if (this.world.enemies[_i].rapidFireLength > 0 && this.world.enemies[_i].isRapidFire) this.world.enemies[_i].rapidFireLength -= this.world.enemies[_i].rapidFireCooldownRate;else if (this.world.enemies[_i].rapidFireLength <= 0 && this.world.enemies[_i].isRapidFire) {
                            this.world.enemies[_i].endRapidFire();
                            this.world.enemies[_i].rapidFireCooldown = this.world.enemies[_i].rapidFireCooldownReset;
                        }

                        if (this.world.enemies[_i].chargeAttackCooldown > 0 && !this.world.enemies[_i].isChargeAttack) this.world.enemies[_i].chargeAttackCooldown -= this.world.enemies[_i].chargeAttackCooldownRate;else if (this.world.enemies[_i].chargeAttackCooldown <= 0 && !this.world.enemies[_i].isChargeAttack) {
                            this.world.enemies[_i].startChargeAttack();
                            this.world.enemies[_i].chargeAttackLength = this.world.enemies[_i].chargeAttackLengthReset;
                        }
                        if (this.world.enemies[_i].chargeAttackLength > 0 && this.world.enemies[_i].isChargeAttack) this.world.enemies[_i].chargeAttackLength -= this.world.enemies[_i].chargeAttackCooldownRate;else if (this.world.enemies[_i].chargeAttackLength <= 0 && this.world.enemies[_i].isChargeAttack) {
                            this.world.enemies[_i].endChargeAttack();
                            this.world.enemies[_i].chargeAttackCooldown = this.world.enemies[_i].chargeAttackCooldownReset;
                        }
                    }
                    if (this.world.enemies[_i] instanceof _ProjectileEnemy2.default || this.world.enemies[_i] instanceof _MiniBoss2.default || this.world.enemies[_i] instanceof _FinalBoss2.default) {
                        if (this.world.enemies[_i].shootCooldown > 0) this.world.enemies[_i].shootCooldown -= this.world.enemies[_i].shootCooldownRate;else {
                            this.world.enemyProjectiles.push(new _EnemyProjectile2.default(this.world.enemies[_i].x + this.world.enemies[_i].width / 2, this.world.enemies[_i].y + this.world.enemies[_i].height / 2, this.world.player.x + this.world.player.width / 2, this.world.player.y + this.world.player.height / 2));
                            this.world.enemies[_i].shootCooldown += this.world.enemies[_i].shootCooldownReset;
                        }
                    }
                    if (this.world.enemies[_i].health <= 0) this.world.enemies.splice(_i, 1);
                }
                //check for weapon pickUps
                for (var _i2 = this.world.groundWeapons.length - 1; _i2 >= 0; _i2--) {
                    if (_Util2.default.isCollision(this.world.player, this.world.groundWeapons[_i2])) {
                        var ownsWep = false;
                        for (var j = this.world.player.inventory.length - 1; j >= 0; j--) {
                            if (this.world.player.inventory[j].name === this.world.groundWeapons[_i2].weapon.name) {
                                ownsWep = true;
                            }
                        }
                        if (ownsWep == false) {
                            this.world.groundWeapons[_i2].addWeapon(this.world.player.inventory);
                            this.world.groundWeapons.splice(_i2, 1);
                        }
                    }
                }
                //Update weapon cooldowns
                for (var _i3 = this.world.player.inventory.length - 1; _i3 >= 0; _i3--) {
                    var _wep = this.world.player.inventory[_i3];
                    if (_wep.cooldown > 0) {
                        _wep.cooldown -= modifier;
                    }
                }
                for (var _i4 = this.world.enemyProjectiles.length - 1; _i4 >= 0; _i4--) {
                    this.world.enemyProjectiles[_i4].move(modifier, this.world.environmentObjects, this.world.player);
                    if (this.world.enemyProjectiles[_i4].live === false) {
                        this.world.enemyProjectiles.splice(_i4, 1);
                    }
                }
                for (var _i5 = this.world.environmentObjects.length - 1; _i5 >= 0; _i5--) {
                    if (this.world.environmentObjects[_i5].health <= 0) {
                        this.world.environmentObjects[_i5].sound.play();
                        this.world.environmentObjects.splice(_i5, 1);
                    }
                }
                for (var _i6 = this.world.pickUps.length - 1; _i6 >= 0; _i6--) {
                    if (_Util2.default.isCollision(this.world.player, this.world.pickUps[_i6])) {
                        if (this.world.player.health < 100) {
                            this.world.player.health = 100;
                            this.world.pickUps.splice(_i6, 1);
                        }
                    }
                }
                if (this.world.enemies.length === 0) {
                    this.world.wave += 1;
                    this.world.startWave();
                }
                this.world.camera.update();
            } else if (this.gameState === 'Game Over') {
                if (this.controller.isMousePressed()) {
                    if (this.controller.mouse[0] > this.canvas.width / 2 - 100 && this.controller.mouse[0] < this.canvas.width / 2 - 100 + 200 && this.controller.mouse[1] > this.canvas.height / 2 + 25 && this.controller.mouse[1] < this.canvas.height / 2 + 25 + 100) {
                        this.world.start(this.canvas);
                        this.gameState = 'Playing';
                    }
                }
            } else if (this.gameState === 'Paused') {
                if (this.controller.isMousePressed()) {
                    if (this.controller.mouse[0] > this.canvas.width / 2 - 100 && this.controller.mouse[0] < this.canvas.width / 2 - 100 + 200 && this.controller.mouse[1] > this.canvas.height / 2 + 25 && this.controller.mouse[1] < this.canvas.height / 2 + 25 + 100) {
                        this.gameState = 'Playing';
                    }
                }
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
            this.ctx.fillRect(this.canvas.width - 425, 25, 400, 225);
            this.ctx.strokeRect(this.canvas.width - 425, 25, 400, 225);
            var xPercent = (this.world.player.x + this.world.player.width / 2) / this.world.width;
            var yPercent = (this.world.player.y + this.world.player.height / 2) / this.world.height;
            var xRelative = xPercent * 400;
            var yRelative = yPercent * 225;
            this.ctx.fillStyle = '#00FF00';
            this.ctx.beginPath();
            this.ctx.arc(this.canvas.width - 425 + xRelative, 25 + yRelative, 2.5, 0, 2 * Math.PI);
            this.ctx.fill();
            for (var i = 0; i < this.world.environmentObjects.length; i++) {
                if (this.world.environmentObjects[i].isImageLoaded) {
                    var _xPercent = (this.world.environmentObjects[i].x + this.world.environmentObjects[i].width / 2) / this.world.width;
                    var _yPercent = (this.world.environmentObjects[i].y + this.world.environmentObjects[i].height / 2) / this.world.height;
                    var _xRelative = _xPercent * 400;
                    var _yRelative = _yPercent * 225;
                    //ctx.drawImage(this.world.environmentObjects[i].image, (this.canvas.width - 425) + xRelative + this.world.environmentObjects[i].width/2, 25 + yRelative + this.world.environmentObjects[i].height/2, this.world.environmentObjects[i].width/25, this.world.environmentObjects[i].height/25);
                    this.ctx.fillStyle = '#808080';
                    this.ctx.beginPath();
                    this.ctx.arc(this.canvas.width - 425 + _xRelative, 25 + _yRelative, 2.5, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
            }
            for (var _i7 = 0; _i7 < this.world.enemies.length; _i7++) {
                if (this.world.enemies[_i7].isImageLoaded) {
                    var _xPercent2 = (this.world.enemies[_i7].x + this.world.enemies[_i7].width / 2) / this.world.width;
                    var _yPercent2 = (this.world.enemies[_i7].y + this.world.enemies[_i7].height / 2) / this.world.height;
                    var _xRelative2 = _xPercent2 * 400;
                    var _yRelative2 = _yPercent2 * 225;
                    this.ctx.fillStyle = '#FF0000';
                    this.ctx.beginPath();
                    this.ctx.arc(this.canvas.width - 425 + _xRelative2, 25 + _yRelative2, 2.5, 0, 2 * Math.PI);
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
            this.ctx.fillText('Active Weapon: ' + this.world.player.inventory[this.world.player.active_index].name, this.canvas.width / 2, 125);
            this.ctx.strokeText('Active Weapon: ' + this.world.player.inventory[this.world.player.active_index].name, this.canvas.width / 2, 125);
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

},{"../Cursor.js":1,"../Enemies/EnemyProjectile":3,"../Enemies/FinalBoss":4,"../Enemies/MiniBoss":6,"../Enemies/ProjectileEnemy":7,"../EnvironmentObjects/Bush":10,"../EnvironmentObjects/Crate":11,"../EnvironmentObjects/Rock":13,"../PickUps/GroundAssaultRifle.js":18,"../PickUps/GroundShotgun.js":19,"../PickUps/GroundSniper.js":20,"../PickUps/GroundWeapon.js":21,"../Utilities/Util.js":25,"../Weapons/AssaultRifle":26,"../Weapons/Bullet12Gauge":28,"../Weapons/Bullet50cal":29,"../Weapons/Bullet556":30,"../Weapons/Bullet9mm":31,"../Weapons/Pistol":32,"../Weapons/Shotgun":33,"../Weapons/Sniper":34,"./Controller.js":14,"./World.js":16}],16:[function(require,module,exports){
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
            var crateCap = 20;
            var bushCap = 30;
            var rockCap = 30;

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
            var shotgunCap = 10;
            var healthPackCap = 10;

            for (var i = 0; i < sniperCap; i++) {
                this.groundWeapons.push(new _GroundSniper2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i4 = 0; _i4 < assaultRifleCap; _i4++) {
                this.groundWeapons.push(new _GroundAssaultRifle2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i5 = 0; _i5 < shotgunCap; _i5++) {
                this.groundWeapons.push(new _GroundShotgun2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }
            for (var _i6 = 0; _i6 < healthPackCap; _i6++) {
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
                }
            }

            var collisionFlag = true;
            while (collisionFlag === true) {
                var _i13 = _Util2.default.areAnyCollisions(this.enemies, this.environmentObjects);
                if (_i13 === -1) collisionFlag = false;else this.enemies[_i13].setPosition(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375));
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

},{"../Enemies/FinalBoss":4,"../Enemies/LightEnemy":5,"../Enemies/MiniBoss":6,"../Enemies/ProjectileEnemy":7,"../Enemies/RegularEnemy":8,"../Enemies/TankEnemy":9,"../EnvironmentObjects/Bush":10,"../EnvironmentObjects/Crate":11,"../EnvironmentObjects/Rock":13,"../PickUps/GroundAssaultRifle.js":18,"../PickUps/GroundShotgun.js":19,"../PickUps/GroundSniper.js":20,"../PickUps/Healthpack.js":22,"../Players/Camera":23,"../Players/Player":24,"../Utilities/Util":25}],17:[function(require,module,exports){
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

},{"./Game/Game.js":15}],18:[function(require,module,exports){
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

},{"../Weapons/AssaultRifle.js":26,"./GroundWeapon.js":21}],19:[function(require,module,exports){
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

},{"../Weapons/Shotgun.js":33,"./GroundWeapon.js":21}],20:[function(require,module,exports){
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

},{"../Weapons/Sniper.js":34,"../Weapons/Weapon.js":35,"./GroundWeapon.js":21}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GroundWeapon = function () {
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

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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
        //this.inventory = [start_pistol, start_sniper, start_rifle, start_shotgun];
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
            //ctx.save();
            //ctx.translate((this.x + this.width/2) - camera.x, (this.y + this.height/2) - camera.y);
            //ctx.rotate(Math.atan2(mouse[1] - (this.y - camera.y), mouse[0] - (this.x - camera.x)));
            ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
            //ctx.restore();
        }
    }]);

    return Player;
}();

exports.default = Player;

},{"../Utilities/Util.js":25,"../Weapons/AssaultRifle.js":26,"../Weapons/Pistol.js":32,"../Weapons/Shotgun.js":33,"../Weapons/Sniper.js":34}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{"./Weapon.js":35}],27:[function(require,module,exports){
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

},{"../Utilities/Util.js":25}],28:[function(require,module,exports){
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

},{"../Utilities/Util.js":25,"./Bullet.js":27}],29:[function(require,module,exports){
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

},{"../Utilities/Util.js":25,"./Bullet.js":27}],30:[function(require,module,exports){
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

},{"../Utilities/Util.js":25,"./Bullet.js":27}],31:[function(require,module,exports){
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

},{"../Utilities/Util.js":25,"./Bullet.js":27}],32:[function(require,module,exports){
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

},{"./Weapon.js":35}],33:[function(require,module,exports){
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

},{"./Weapon.js":35}],34:[function(require,module,exports){
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

},{"./Weapon.js":35}],35:[function(require,module,exports){
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

},{}]},{},[17])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDdXJzb3IuanMiLCJFbmVtaWVzL0VuZW15LmpzIiwiRW5lbWllcy9FbmVteVByb2plY3RpbGUuanMiLCJFbmVtaWVzL0ZpbmFsQm9zcy5qcyIsIkVuZW1pZXMvTGlnaHRFbmVteS5qcyIsIkVuZW1pZXMvTWluaUJvc3MuanMiLCJFbmVtaWVzL1Byb2plY3RpbGVFbmVteS5qcyIsIkVuZW1pZXMvUmVndWxhckVuZW15LmpzIiwiRW5lbWllcy9UYW5rRW5lbXkuanMiLCJFbnZpcm9ubWVudE9iamVjdHMvQnVzaC5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9DcmF0ZS5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9FbnZpcm9ubWVudE9iamVjdC5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9Sb2NrLmpzIiwiR2FtZS9Db250cm9sbGVyLmpzIiwiR2FtZS9HYW1lLmpzIiwiR2FtZS9Xb3JsZC5qcyIsIk1haW4uanMiLCJQaWNrVXBzL0dyb3VuZEFzc2F1bHRSaWZsZS5qcyIsIlBpY2tVcHMvR3JvdW5kU2hvdGd1bi5qcyIsIlBpY2tVcHMvR3JvdW5kU25pcGVyLmpzIiwiUGlja1Vwcy9Hcm91bmRXZWFwb24uanMiLCJQaWNrVXBzL0hlYWx0aHBhY2suanMiLCJQbGF5ZXJzL0NhbWVyYS5qcyIsIlBsYXllcnMvUGxheWVyLmpzIiwiVXRpbGl0aWVzL1V0aWwuanMiLCJXZWFwb25zL0Fzc2F1bHRSaWZsZS5qcyIsIldlYXBvbnMvQnVsbGV0LmpzIiwiV2VhcG9ucy9CdWxsZXQxMkdhdWdlLmpzIiwiV2VhcG9ucy9CdWxsZXQ1MGNhbC5qcyIsIldlYXBvbnMvQnVsbGV0NTU2LmpzIiwiV2VhcG9ucy9CdWxsZXQ5bW0uanMiLCJXZWFwb25zL1Bpc3RvbC5qcyIsIldlYXBvbnMvU2hvdGd1bi5qcyIsIldlYXBvbnMvU25pcGVyLmpzIiwiV2VhcG9ucy9XZWFwb24uanMiXSwibmFtZXMiOltdLCJtYXBw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Ozs7OztJQUVNLE87OztBQUNGLHVCQUFhO0FBQUE7O0FBQUEsc0hBQ0gsQ0FERyxFQUNBLEVBREEsRUFDSSxDQURKOztBQUVULGNBQUssSUFBTCxHQUFZLFNBQVo7QUFDQSwySEFBcUIsdUJBQXJCO0FBSFM7QUFJWjs7Ozs7a0JBR1UsTzs7Ozs7Ozs7OzRlQ1ZmO0FBQ0E7QUFDQTs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNLE07OztBQUNGLHNCQUFhO0FBQUE7O0FBQUEsb0hBQ0gsQ0FERyxFQUNBLEVBREEsRUFDSSxJQURKOztBQUVULGNBQUssSUFBTCxHQUFZLFFBQVo7QUFDQSx5SEFBcUIsc0JBQXJCO0FBSFM7QUFJWjs7Ozs7a0JBR1UsTTs7Ozs7Ozs7Ozs7OztBQ2JmO0FBQ0E7QUFDQTtBQUNBO0lBQ00sTTtBQUVGLG9CQUFZLFFBQVosRUFBc0IsT0FBdEIsRUFBK0IsV0FBL0IsRUFBNEM7QUFBQTs7QUFDeEMsYUFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsYUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGFBQUssSUFBTCxHQUFZLEVBQVo7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxhQUFLLFdBQUwsR0FBbUIsV0FBbkI7QUFDSDs7Ozt1Q0FDYyxHLEVBQUs7QUFBQTs7QUFDaEIsaUJBQUssYUFBTCxHQUFxQixLQUFyQjtBQUNBLGlCQUFLLEtBQUwsR0FBYSxJQUFJLEtBQUosRUFBYjtBQUNBLGlCQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLFlBQU07QUFDdEIsc0JBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNILGFBRkQ7QUFHQSxpQkFBSyxLQUFMLENBQVcsR0FBWCxHQUFpQixHQUFqQjtBQUNIOzs7c0NBQ1k7QUFDWCxpQkFBSyxRQUFMLElBQWlCLEtBQUssV0FBdEI7QUFDRDs7Ozs7O2tCQUlVLE0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL0p1c3QgYSBwbHVzIGN1cnNvciB0byBiZSByZW5kZXJlZCBhdCB0aGVcclxuLy9jdXJzb3IncyBsb2NhdGlvbiBlYWNoIFVwZGF0ZVxyXG4vL1RoZSBjdXJzb3IgZm9yIHRoZSBlbnRpcmUgSFRNTCBkb2N1bWVudCBpcyB0dXJuZWQgb2ZmIHZpYSBzdHlsaW5nIG9uIHRoZSBkb2N1bWVudC5cclxuY2xhc3MgQ3Vyc29yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEltYWdlKCkge1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gXCJHcmFwaGljcy9jcm9zc2hhaXIucG5nXCI7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQ3Vyc29yO1xyXG4iLCIvKipcclxuICogU291cmNlczpcclxuICogaHR0cHM6Ly9tZWRpdW0uY29tL0B5dXJpYmV0dC9qYXZhc2NyaXB0LWFic3RyYWN0LW1ldGhvZC13aXRoLWVzNi01ZGJlYTRiMDAwMjdcclxuICogaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1JNWRBUnBBUGxOa1xyXG4gKi9cclxuXHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgRW5lbXkgY2xhc3MgaXMgdGhlIHBhcmVudCBjbGFzcyBmb3IgYWxsIG9mIHRoZSBlbmVtaWVzLlxyXG4gKi9cclxuY2xhc3MgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHZlbG9jaXR5IFRoZSB2ZWxvY2l0eSBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gaGVhbHRoIFRoZSBoZWFsdGggb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIGRhbWFnZSBUaGUgZGFtYWdlIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSBwb2ludHNPbktpbGwgVGhlIHBvaW50cyByZXdhcmRlZCBmb3Iga2lsbGluZyB0aGUgRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIHZlbG9jaXR5LCBoZWFsdGgsIGRhbWFnZSwgcG9pbnRzT25LaWxsKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuYW5nbGUgPSBNYXRoLlBJLzI7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5O1xyXG4gICAgICAgIHRoaXMuaGVhbHRoID0gaGVhbHRoO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlO1xyXG4gICAgICAgIHRoaXMucG9pbnRzT25LaWxsID0gcG9pbnRzT25LaWxsO1xyXG4gICAgICAgIHRoaXMuYXR0YWNrQ29vbGRvd24gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiB0YWtlcyBpbiBhIHVybCBhbmQgbG9hZHMgaXQgYXMgYW4gSW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0ltYWdlTG9hZGVkIGlzXHJcbiAgICAgKiBzZXQgdG8gdHJ1ZS4gVGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIEVuZW15IGFyZSBzZXQgdG8gdGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIGltYWdlLlxyXG4gICAgICogQHBhcmFtIHVybCBUaGUgdXJsIHRoYXQgc2hvdWxkIGJlIGxvYWRlZC5cclxuICAgICAqL1xyXG4gICAgbG9hZEltYWdlKHVybCkge1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhdHRhY2sgZnVuY3Rpb24gdGFrZXMgaW4gYW4gb2JqZWN0IGFuZCByZW1vdmVzIHRoZSBhbW91bnQgb2YgZGFtYWdlIHRoZSBFbmVteSBkZWFscyBmcm9tIHRoZWlyIGhlYWx0aC5cclxuICAgICAqIDUwMCBpcyBhZGRlZCB0byB0aGUgYXR0YWNrIGNvb2xkb3duIG9mIHRoZSBlbmVteSBhZnRlciBhbiBhdHRhY2suXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3QgdGhhdCBpcyBiZWluZyBhdHRhY2tlZC5cclxuICAgICAqL1xyXG4gICAgYXR0YWNrKG9iamVjdCkge1xyXG4gICAgICAgIG9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tDb29sZG93biArPSA1MDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlcyB0aGUgZW5lbXkgdG93YXJkcyB0aGUgcGxheWVyLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdCB0byBtb3ZlIHRvd2FyZHMuXHJcbiAgICAgKiBAcGFyYW0gbW9kaWZpZXIgVGhlIG1vZGlmaWVyIHRvIGJlIG11bHRpcGxpZWQgYnkgdGhlIHZlbG9jaXR5LlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0cyBBbiBhcnJheSBvZiBlbnZpcm9ubWVudCBvYmplY3RzLlxyXG4gICAgICovXHJcbiAgICBtb3ZlKHBsYXllciwgbW9kaWZpZXIsIGVudmlyb25tZW50T2JqZWN0cykge1xyXG4gICAgICAgIGxldCBkaWZmWCA9IHBsYXllci54IC0gdGhpcy54O1xyXG4gICAgICAgIGxldCBkaWZmWSA9IHBsYXllci55IC0gdGhpcy55O1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBNYXRoLnNxcnQoZGlmZlggKiBkaWZmWCArIGRpZmZZICogZGlmZlkpO1xyXG4gICAgICAgIGlmKGxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICBkaWZmWCAvPSBsZW5ndGg7XHJcbiAgICAgICAgICAgIGRpZmZZIC89IGxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYW5nbGUgPSBNYXRoLmF0YW4yKGRpZmZZLCBkaWZmWCk7XHJcblxyXG4gICAgICAgIGlmKGRpZmZYID4gMCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnggKyB0aGlzLndpZHRoIDw9IDEwMDAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZGlmZlggPCAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMueCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggLT0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRpZmZZID4gMCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnkgKyB0aGlzLmhlaWdodCA8PSA1NjI1KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZGlmZlkgPCAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMueSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgLT0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIHBsYXllcikgJiYgdGhpcy5hdHRhY2tDb29sZG93biA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlYWx0aCBiZWZvcmUgYXR0YWNrXCIgKyBwbGF5ZXIuaGVhbHRoKTtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2socGxheWVyKTtcclxuICAgICAgICAgICAgcGxheWVyLmRhbWFnZVRha2VuU291bmQucGxheSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlYWx0aCBhZnRlciBhdHRhY2tcIiArIHBsYXllci5oZWFsdGgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gc2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGVuZW15IGdpdmVuIHggYW5kIHkuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiB0byBiZSBzZXQuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiB0byBiZSBzZXQuXHJcbiAgICAgKi9cclxuICAgIHNldFBvc2l0aW9uKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGEgaGVscGVyIGZ1bmN0aW9uIHVzZWQgYnkgdGhlIG1vdmUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIHRoZXJlIGlzIGEgY29sbGlzaW9uIGJldHdlZW4gYW5cclxuICAgICAqIGVudmlyb25tZW50IG9iamVjdCBhbmQgdGhlIGVuZW15LiBJZiB0aGVyZSBpcyBhIGNvbGxpc2lvbiwgdGhlIG9iamVjdCBpcyBhdHRhY2tlZC5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdHMgQW4gYXJyYXkgb2YgZW52aXJvbm1lbnQgb2JqZWN0cy5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIGEgY29sbGlzaW9uIGV4aXN0cy5cclxuICAgICAqL1xyXG4gICAgaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIGVudmlyb25tZW50T2JqZWN0c1tpXSkgJiYgZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzQmxvY2tpbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYXR0YWNrQ29vbGRvd24gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFjayhlbnZpcm9ubWVudE9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRyYXcgZnVuY3Rpb24gZHJhd3MgdGhlIGltYWdlIG9uIHRoZSBjYW52YXMgYXQgdGhlIHggYW5kIHkgcG9zaXRpb24gb2YgdGhlIExpZ2h0RW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gY3R4IFRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gY2FtZXJhIFRoZSBjYW1lcmEgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XHJcbiAgICAgICAgLy9jdHguc2F2ZSgpO1xyXG4gICAgICAgIC8vY3R4LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgLy9jdHgucm90YXRlKHRoaXMuYW5nbGUgKyBNYXRoLlBJLzIuMCk7XHJcbiAgICAgICAgLy9jdHgudHJhbnNsYXRlKC10aGlzLngsIC10aGlzLnkpO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcclxuICAgICAgICAvL2N0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVuZW15O1xyXG4iLCJpbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIEVuZW15UHJvamVjdGlsZSBjbGFzcyBpcyB0aGUgb2JqZWN0IHRoYXQgaXMgZmlyZWQgZnJvbSB0aGUgUHJvamVjdGlsZUVuZW15IGVuZW15LlxyXG4gKi9cclxuY2xhc3MgRW5lbXlQcm9qZWN0aWxlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBFbmVteVByb2plY3RpbGUgY2xhc3MgYW5kIGdldHMgdGhlIHggYW5kIHkgY29lZmZpY2llbnRzIGZvciB1c2VcclxuICAgICAqIGluIHRoZSBtb3ZlIGZ1bmN0aW9uLiBUaGUgbG9hZEltYWdlIGZ1bmN0aW9uIGlzIGFsc28gY2FsbGVkLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gZGVzdFggVGhlIHggZGVzdGluYXRpb24gb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBkZXN0WSBUaGUgeSBkZXN0aW5hdGlvbiBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBkZXN0WCwgZGVzdFkpIHtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gNjAwO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlID0gNTtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy5saXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgZGlmZlggPSBkZXN0WCAtIHRoaXMueDtcclxuICAgICAgICBsZXQgZGlmZlkgPSBkZXN0WSAtIHRoaXMueTtcclxuICAgICAgICBpZihNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jb2VmZlggPSBkaWZmWCAvIE1hdGguYWJzKGRpZmZYKTtcclxuICAgICAgICAgICAgdGhpcy5jb2VmZlkgPSBkaWZmWSAvIE1hdGguYWJzKGRpZmZYKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29lZmZZID0gZGlmZlkgLyBNYXRoLmFicyhkaWZmWSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIG1vdmVzIHRoZSBFbmVteVByb2plY3RpbGUgYWNjb3JkaW5nIHRvIHRoZSB4IGFuZCB5IGNvZWZmaWNpZW50cy5cclxuICAgICAqIEBwYXJhbSBtb2RpZmllciBUaGUgbW9kaWZpZXIgdG8gYmUgbXVsdGlwbGllZCBieSB0aGUgdmVsb2NpdHkuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3RzIFRoZSBhcnJheSBvZiBlbnZpcm9ubWVudCBvYmplY3RzLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgbW92ZShtb2RpZmllciwgZW52aXJvbm1lbnRPYmplY3RzLCBwbGF5ZXIpIHtcclxuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcip0aGlzLmNvZWZmWDtcclxuICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcip0aGlzLmNvZWZmWTtcclxuICAgICAgICBpZih0aGlzLmhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIHBsYXllcikpIHtcclxuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMueCA8IDAgfHwgdGhpcy54ID4gMTAwMDAgfHwgdGhpcy55IDwgMCB8fCB0aGlzLnkgPiA1NjI1KXtcclxuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB0YWtlcyBhd2F5IGhlYWx0aCBmcm9tIHRoZSBwbGF5ZXIgZXF1YWwgdG8gdGhlIGRhbWFnZSBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZGFtYWdlUGxheWVyKHBsYXllcikge1xyXG4gICAgICAgIHBsYXllci5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGF3YXkgaGVhbHRoIGZyb20gdGhlIGVudmlyb25tZW50IG9iamVjdCBlcXVhbCB0byB0aGUgZGFtYWdlIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3QgVGhlIGVudmlyb25tZW50IG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZGFtYWdlRW52aXJvbm1lbnQoZW52aXJvbm1lbnRPYmplY3Qpe1xyXG4gICAgICAgIGVudmlyb25tZW50T2JqZWN0LmhlYWx0aCAtPSB0aGlzLmRhbWFnZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIGFuIGVudmlyb25tZW50IG9iamVjdCBvciBhIHBsYXllciB3ZXJlIGhpdCBieSB0aGUgcHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdHMgVGhlIGFycmF5IG9mIGVudmlyb25tZW50IG9iamVjdHMuXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIFRoZSBwbGF5ZXIgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHNvbWV0aGluZyB3YXMgaGl0LlxyXG4gICAgICovXHJcbiAgICBoaXRTb21ldGhpbmcoZW52aXJvbm1lbnRPYmplY3RzLCBwbGF5ZXIpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgZW52aXJvbm1lbnRPYmplY3RzW2ldKSAmJiBlbnZpcm9ubWVudE9iamVjdHNbaV0uaXNCbG9ja2luZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VFbnZpcm9ubWVudChlbnZpcm9ubWVudE9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBwbGF5ZXIpKXtcclxuICAgICAgICAgICAgdGhpcy5kYW1hZ2VQbGF5ZXIocGxheWVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsb2FkSW1hZ2UgZnVuY3Rpb24gbG9hZHMgdGhlIHVybCBhcyBhbiBJbWFnZS4gT25jZSB0aGUgaW1hZ2UgaXMgbG9hZGVkLCB0aGlzLmlzSW1hZ2VMb2FkZWQgaXNcclxuICAgICAqIHNldCB0byB0cnVlLiBUaGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlIGFyZSBzZXQgdG8gdGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIGltYWdlLlxyXG4gICAgICovXHJcbiAgICBsb2FkSW1hZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gXCJHcmFwaGljcy9FbmVteVByb2plY3RpbGUucG5nXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZHJhdyBmdW5jdGlvbiBkcmF3cyB0aGUgaW1hZ2Ugb24gdGhlIGNhbnZhcyBhdCB0aGUgeCBhbmQgeSBwb3NpdGlvbiBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIGN0eCBUaGUgY29udGV4dCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIGNhbWVyYSBUaGUgY2FtZXJhIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRW5lbXlQcm9qZWN0aWxlOyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgRmluYWxCb3NzIGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBpcyBhIGhpZ2ggaGVhbHRoIGFuZCBkYW1hZ2UgZW5lbXkuXHJcbiAqL1xyXG5jbGFzcyBGaW5hbEJvc3MgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgRmluYWxCb3NzLiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byAxMjgsIHRoZSBoZWFsdGggc2V0IHRvIDUwMDAsIHRoZSBkYW1hZ2Ugc2V0IHRvIDUwLCBhbmQgdGhlIHBvaW50c09uS2lsbFxyXG4gICAgICogc2V0IHRvIDEwMDAwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEZpbmFsQm9zcy5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBGaW5hbEJvc3MuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAxMjgsIDUwMDAsIDUwLCAxMDAwMCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duID0gMTAwO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJhdGUgPSAxO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJlc2V0ID0gMTAwO1xyXG4gICAgICAgIHRoaXMucmFwaWRGaXJlQ29vbGRvd24gPSA1MDA7XHJcbiAgICAgICAgdGhpcy5yYXBpZEZpcmVDb29sZG93blJhdGUgPSAxO1xyXG4gICAgICAgIHRoaXMucmFwaWRGaXJlQ29vbGRvd25SZXNldCA9IDUwMDtcclxuICAgICAgICB0aGlzLnJhcGlkRmlyZUxlbmd0aCA9IDUwMDtcclxuICAgICAgICB0aGlzLnJhcGlkRmlyZUxlbmd0aFJlc2V0ID0gNTAwO1xyXG4gICAgICAgIHRoaXMuaXNSYXBpZEZpcmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNoYXJnZUF0dGFja0Nvb2xkb3duID0gMTI1MDtcclxuICAgICAgICB0aGlzLmNoYXJnZUF0dGFja0Nvb2xkb3duUmF0ZSA9IDE7XHJcbiAgICAgICAgdGhpcy5jaGFyZ2VBdHRhY2tDb29sZG93blJlc2V0ID0gMTI1MDtcclxuICAgICAgICB0aGlzLmNoYXJnZUF0dGFja0xlbmd0aCA9IDEwMDtcclxuICAgICAgICB0aGlzLmNoYXJnZUF0dGFja0xlbmd0aFJlc2V0ID0gMTAwO1xyXG4gICAgICAgIHRoaXMuaXNDaGFyZ2VBdHRhY2sgPSBmYWxzZTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9GaW5hbEJvc3MucG5nXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzdGFydHMgdGhlIGNoYXJnZSBhdHRhY2sgYnkgc2V0dGluZyB2ZWxvY2l0eSB0byAxMDI0LCBzZXR0aW5nIGRhbWFnZSB0byAxMCwgYW5kIHNldHRpbmcgaXNDaGFyZ2VBdHRhY2tcclxuICAgICAqIHRvIHRydWUuXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0Q2hhcmdlQXR0YWNrKCkge1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSAxMDI0O1xyXG4gICAgICAgIHRoaXMuZGFtYWdlID0gMTA7XHJcbiAgICAgICAgdGhpcy5pc0NoYXJnZUF0dGFjayA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGVuZHMgdGhlIGNoYXJnZSBhdHRhY2sgYnkgcmVzZXR0aW5nIHZlbG9jaXR5IGFuZCBkYW1hZ2UgdG8gdGhlaXIgZGVmYXVsdCB2YWx1ZXMuXHJcbiAgICAgKi9cclxuICAgIGVuZENoYXJnZUF0dGFjaygpIHtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gMTI4O1xyXG4gICAgICAgIHRoaXMuZGFtYWdlID0gNTA7XHJcbiAgICAgICAgdGhpcy5pc0NoYXJnZUF0dGFjayA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzdGFydHMgcmFwaWQgZmlyZSBieSBzZXR0aW5nIHRoZSBzaG9vdENvb2xkb3duUmF0ZSB0byAyNSBhbmQgc2V0dGluZyBpc1JhcGlkRmlyZSB0byB0cnVlLlxyXG4gICAgICovXHJcbiAgICBzdGFydFJhcGlkRmlyZSgpIHtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SYXRlID0gMjU7XHJcbiAgICAgICAgdGhpcy5pc1JhcGlkRmlyZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGVuZHMgdGhlIHJhcGlkIGZpcmUgYnkgc2V0cyByYXBpZCBmaXJlIGJhY2sgdG8gaXRzIGRlZmF1bHQgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIGVuZFJhcGlkRmlyZSgpIHtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SYXRlID0gMTtcclxuICAgICAgICB0aGlzLmlzUmFwaWRGaXJlID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpbmFsQm9zczsiLCJpbXBvcnQgRW5lbXkgZnJvbSAnLi9FbmVteS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIExpZ2h0RW5lbXkgY2xhc3MgZXh0ZW5kcyB0aGUgRW5lbXkgY2xhc3MuIEl0IGlzIGEgZmFzdCBlbmVteSB3aXRoIGxvdyBoZWFsdGguXHJcbiAqL1xyXG5jbGFzcyBMaWdodEVuZW15IGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIExpZ2h0RW5lbXkuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDEyOCwgdGhlIGhlYWx0aCBzZXQgdG8gMTAsIHRoZSBkYW1hZ2Ugc2V0IHRvIDEwLCBhbmQgdGhlIHBvaW50c09uS2lsbFxyXG4gICAgICogc2V0IHRvIDUwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIExpZ2h0RW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgTGlnaHRFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDEyOCwgMTAsIDEwLCA1MCk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvTGlnaHRFbmVteS5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpZ2h0RW5lbXk7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBNaW5pQm9zcyBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaXMgYSBoaWdoIGhlYWx0aCBhbmQgZGFtYWdlIGVuZW15LlxyXG4gKi9cclxuY2xhc3MgTWluaUJvc3MgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgTWluaUJvc3MuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDEyOCwgdGhlIGhlYWx0aCBzZXQgdG8gNTAwLCB0aGUgZGFtYWdlIHNldCB0byA1MCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byAxMDAwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIE1pbmlCb3NzLlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIE1pbmlCb3NzLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMTI4LCA1MDAsIDUwLCAxMDAwKTtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd24gPSAyMDA7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duUmF0ZSA9IDE7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duUmVzZXQgPSAyMDA7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvTWluaUJvc3MucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNaW5pQm9zczsiLCJpbXBvcnQgRW5lbXkgZnJvbSAnLi9FbmVteS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIFByb2plY3RpbGVFbmVteSBjbGFzcyBleHRlbmRzIHRoZSBlbmVteSBjbGFzcy4gSXQgY2FuIHNob290IHByb2plY3RpbGVzIGF0IHRoZSBwbGF5ZXIuXHJcbiAqL1xyXG5jbGFzcyBQcm9qZWN0aWxlRW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgUHJvamVjdGlsZUVuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byA5NiwgdGhlIGhlYWx0aCBzZXQgdG8gNDAsIHRoZSBkYW1hZ2Ugc2V0IHRvIDEwLCBhbmQgdGhlIHBvaW50c09uS2lsbFxyXG4gICAgICogc2V0IHRvIDI1MC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBQcm9qZWN0aWxlRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgUHJvamVjdGlsZUVuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgOTYsIDQwLCAxMCwgMjUwKTtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd24gPSAzMDA7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duUmF0ZSA9IDE7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duUmVzZXQgPSAzMDA7XHJcbiAgICAgICAgdGhpcy5zaG9vdEFtb3VudCA9IDE7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvUHJvamVjdGlsZUVuZW15LnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdGlsZUVuZW15OyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUmVndWxhckVuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBoYXMgYmFsYW5jZWQgc3RhdHMgYWNyb3NzIHRoZSBib2FyZC5cclxuICovXHJcbmNsYXNzIFJlZ3VsYXJFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBSZWd1bGFyRW5lbXkuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDY0LCB0aGUgaGVhbHRoIHNldCB0byAyNSwgdGhlIGRhbWFnZSBzZXQgdG8gMTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gMTAwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFJlZ3VsYXJFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBSZWd1bGFyRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCA2NCwgMjUsIDEwLCAxMDApO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1JlZ3VsYXJFbmVteS5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlZ3VsYXJFbmVteTsiLCJpbXBvcnQgRW5lbXkgZnJvbSAnLi9FbmVteS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIFRhbmtFbmVteSBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaXMgYSBzbG93IGVuZW15IHdpdGggaGlnaCBoZWFsdGggYW5kIGRhbWFnZS5cclxuICovXHJcbmNsYXNzIFRhbmtFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBUYW5rRW5lbXkuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDMyLCB0aGUgaGVhbHRoIHNldCB0byAxMDAsIHRoZSBkYW1hZ2Ugc2V0IHRvIDI1LCBhbmQgdGhlIHBvaW50c09uS2lsbFxyXG4gICAgICogc2V0IHRvIDUwMC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBUYW5rRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgVGFua0VuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMzIsIDEwMCwgIDI1LCA1MDApO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1RhbmtFbmVteS5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhbmtFbmVteTsiLCJpbXBvcnQgRW52aXJvbm1lbnRPYmplY3QgZnJvbSAnLi9FbnZpcm9ubWVudE9iamVjdC5qcyc7XG5cbi8qKlxuICogVGhlIEJ1c2ggY2xhc3MgZXh0ZW5kcyB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3MuIEl0IGlzIGEgbm9uLWJsb2NraW5nIG9iamVjdC5cbiAqL1xuY2xhc3MgQnVzaCBleHRlbmRzIEVudmlyb25tZW50T2JqZWN0IHtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBCdXNoLiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3NlcyBjb25zdHJ1Y3RvclxuICAgICAqIHdpdGggdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSBoZWFsdGggc2V0IHRvIDEwMDAwMCwgYW5kIGlzQmxvY2tpbmcgc2V0IHRvIGZhbHNlLlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBCdXNoLlxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBCdXNoLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgMTAwMDAwLCBmYWxzZSk7XG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0J1c2gucG5nXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnVzaDsiLCJpbXBvcnQgRW52aXJvbm1lbnRPYmplY3QgZnJvbSAnLi9FbnZpcm9ubWVudE9iamVjdC5qcyc7XG5cbi8qKlxuICogVGhlIENyYXRlIGNsYXNzIGV4dGVuZHMgdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzLiBJdCBpcyBhIGJsb2NraW5nIG9iamVjdCB3aXRoIGxvdyBoZWFsdGguXG4gKi9cbmNsYXNzIENyYXRlIGV4dGVuZHMgRW52aXJvbm1lbnRPYmplY3Qge1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIENyYXRlLiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3NlcyBjb25zdHJ1Y3RvclxuICAgICAqIHdpdGggdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSBoZWFsdGggc2V0IHRvIDEwMCwgYW5kIGlzQmxvY2tpbmcgc2V0IHRvIHRydWUuXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIENyYXRlLlxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBDcmF0ZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHN1cGVyKHgsIHksIDEwMCwgdHJ1ZSk7XG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0NyYXRlLnBuZ1wiKTtcbiAgICAgICAgc3VwZXIubG9hZFNvdW5kKCdBdWRpby9Cb3hCcmVhay5tcDMnKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENyYXRlO1xuIiwiLyoqXG4gKiBUaGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3MgaXMgdGhlIHBhcmVudCBmb3IgYWxsIGVudmlyb25tZW50IG9iamVjdHMuXG4gKi9cbmNsYXNzIEVudmlyb25tZW50T2JqZWN0IHtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSBoZWFsdGggVGhlIGhlYWx0aCBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIGlzQmxvY2tpbmcgV2hldGhlciB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2FuIGJlIHdhbGtlZCB0aHJvdWdoLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIGhlYWx0aCwgaXNCbG9ja2luZykge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLmhlYWx0aCA9IGhlYWx0aDtcbiAgICAgICAgdGhpcy5pc0Jsb2NraW5nID0gaXNCbG9ja2luZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBlbnZpcm9ubWVudCBvYmplY3QgZ2l2ZW4geCBhbmQgeS5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiB0byBiZSBzZXQuXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gdG8gYmUgc2V0LlxuICAgICAqL1xuICAgIHNldFBvc2l0aW9uKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbG9hZEltYWdlIGZ1bmN0aW9uIHRha2VzIGluIGEgdXJsIGFuZCBsb2FkcyBpdCBhcyBhbiBJbWFnZS4gT25jZSB0aGUgaW1hZ2UgaXMgbG9hZGVkLCB0aGlzLmlzSW1hZ2VMb2FkZWQgaXNcbiAgICAgKiBzZXQgdG8gdHJ1ZS4gVGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIEVudmlyb25tZW50T2JqZWN0IGFyZSBzZXQgdG8gdGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIGltYWdlLlxuICAgICAqIEBwYXJhbSB1cmwgVGhlIHVybCB0aGF0IHNob3VsZCBiZSBsb2FkZWQuXG4gICAgICovXG4gICAgbG9hZEltYWdlKHVybCkge1xuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xuICAgIH1cbiAgICBsb2FkU291bmQodXJsKSB7XG4gICAgICAgIHRoaXMuaXNTb3VuZExvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNvdW5kID0gbmV3IEF1ZGlvKCk7XG4gICAgICAgIHRoaXMuc291bmQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc1NvdW5kTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zb3VuZC5zcmMgPSB1cmw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGRyYXcgZnVuY3Rpb24gZHJhd3MgdGhlIGltYWdlIG9uIHRoZSBjYW52YXMgYXQgdGhlIHggYW5kIHkgcG9zaXRpb24gb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSBjdHggVGhlIGNvbnRleHQgb2YgdGhlIGNhbnZhcy5cbiAgICAgKiBAcGFyYW0gY2FtZXJhIFRoZSBjYW1lcmEgb2JqZWN0LlxuICAgICAqL1xuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW52aXJvbm1lbnRPYmplY3Q7XG4iLCJpbXBvcnQgRW52aXJvbm1lbnRPYmplY3QgZnJvbSAnLi9FbnZpcm9ubWVudE9iamVjdC5qcyc7XG5cbi8qKlxuICogVGhlIFJvY2sgY2xhc3MgZXh0ZW5kcyB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3MuIEl0IGlzIGEgYmxvY2tpbmcgb2JqZWN0IHdpdGggaGlnaCBoZWFsdGguXG4gKi9cbmNsYXNzIFJvY2sgZXh0ZW5kcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgUm9jay4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzZXMgY29uc3RydWN0b3JcbiAgICAgKiB3aXRoIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgaGVhbHRoIHNldCB0byAzMDAsIGFuZCBpc0Jsb2NraW5nIHNldCB0byB0cnVlLlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBSb2NrLlxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBSb2NrLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgMzAwLCB0cnVlKTtcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvUm9jay5wbmdcIik7XG4gICAgICAgIHN1cGVyLmxvYWRTb3VuZCgnQXVkaW8vQm94QnJlYWsubXAzJyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb2NrO1xuIiwiLyoqXHJcbiAqIFRoZSBDb250cm9sbGVyIGNsYXNzIGxpc3RlbnMgZm9yIHVzZXIgaW5wdXRzIGFuZCBzdG9yZXMgd2hhdCBpcyBiZWluZyBwcmVzc2VkLlxyXG4gKi9cclxuY2xhc3MgQ29udHJvbGxlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgQ29udHJvbGxlci4gSXQgYWxzbyBhZGRzIGV2ZW50IGxpc3RlbmVycyBmb3Iga2V5ZG93biwga2V5dXAsIG1vdXNlbW92ZSxcclxuICAgICAqIG1vdXNlZG93biwgYW5kIG1vdXNldXAuXHJcbiAgICAgKiBAcGFyYW0gZG9jdW1lbnRCb2R5IFRoZSBib2R5IG9mIHRoZSBkb2N1bWVudC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRCb2R5KSB7XHJcbiAgICAgICAgdGhpcy5rZXlzUHJlc3NlZCA9IFtdO1xyXG4gICAgICAgIHRoaXMubW91c2UgPSBbMCwgMF07XHJcbiAgICAgICAgdGhpcy5tb3VzZVByZXNzZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnRCb2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmtleXNQcmVzc2VkW2V2ZW50LmtleUNvZGVdID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnRCb2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5rZXlzUHJlc3NlZFtldmVudC5rZXlDb2RlXSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudEJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubW91c2VbMF0gPSBldmVudC5jbGllbnRYO1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlWzFdID0gZXZlbnQuY2xpZW50WTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnRCb2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Qm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubW91c2VQcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgaWYgdGhlIGlucHV0dGVkIGtleSBpcyBiZWluZyBwcmVzc2VkLlxyXG4gICAgICogQHBhcmFtIGtleSBUaGUga2V5IHRvIGNoZWNrLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgdGhlIGtleSBpcyBiZWluZyBwcmVzc2VkLlxyXG4gICAgICovXHJcbiAgICBpc0tleVByZXNzZWQoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5c1ByZXNzZWRba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIHRoZSBtb3VzZSBpcyBiZWluZyBwcmVzc2VkLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgdGhlIG1vdXNlIGlzIHByZXNzZWQuXHJcbiAgICAgKi9cclxuICAgIGlzTW91c2VQcmVzc2VkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vdXNlUHJlc3NlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgbW91c2UgcG9zaXRpb24uXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyW119IFRoZSB4IGFuZCB5IHBvc2l0aW9uIG9mIHRoZSBtb3VzZSBhcyBhbiBhcnJheS4gKFt4LHldKVxyXG4gICAgICovXHJcbiAgICBnZXRNb3VzZVBvc2l0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vdXNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyO1xyXG4iLCJpbXBvcnQgV29ybGQgZnJvbSAnLi9Xb3JsZC5qcyc7XHJcbmltcG9ydCBDb250cm9sbGVyIGZyb20gJy4vQ29udHJvbGxlci5qcyc7XHJcbmltcG9ydCBFbmVteVByb2plY3RpbGUgZnJvbSBcIi4uL0VuZW1pZXMvRW5lbXlQcm9qZWN0aWxlXCI7XHJcbmltcG9ydCBNaW5pQm9zcyBmcm9tIFwiLi4vRW5lbWllcy9NaW5pQm9zc1wiO1xyXG5pbXBvcnQgRmluYWxCb3NzIGZyb20gXCIuLi9FbmVtaWVzL0ZpbmFsQm9zc1wiO1xyXG5pbXBvcnQgUHJvamVjdGlsZUVuZW15IGZyb20gXCIuLi9FbmVtaWVzL1Byb2plY3RpbGVFbmVteVwiO1xyXG5pbXBvcnQgQ3Vyc29yIGZyb20gJy4uL0N1cnNvci5qcyc7XHJcbmltcG9ydCBQaXN0b2wgZnJvbSBcIi4uL1dlYXBvbnMvUGlzdG9sXCI7XHJcbmltcG9ydCBTbmlwZXIgZnJvbSBcIi4uL1dlYXBvbnMvU25pcGVyXCI7XHJcbmltcG9ydCBTaG90Z3VuIGZyb20gXCIuLi9XZWFwb25zL1Nob3RndW5cIjtcclxuaW1wb3J0IEFzc2F1bHRSaWZsZSBmcm9tICcuLi9XZWFwb25zL0Fzc2F1bHRSaWZsZSdcclxuaW1wb3J0IEJ1bGxldDUwY2FsIGZyb20gXCIuLi9XZWFwb25zL0J1bGxldDUwY2FsXCI7XHJcbmltcG9ydCBCdWxsZXQ1NTYgZnJvbSBcIi4uL1dlYXBvbnMvQnVsbGV0NTU2XCI7XHJcbmltcG9ydCBCdWxsZXQxMkdhdWdlIGZyb20gXCIuLi9XZWFwb25zL0J1bGxldDEyR2F1Z2VcIjtcclxuaW1wb3J0IEJ1bGxldDltbSBmcm9tIFwiLi4vV2VhcG9ucy9CdWxsZXQ5bW1cIjtcclxuaW1wb3J0IFJvY2sgZnJvbSAnLi4vRW52aXJvbm1lbnRPYmplY3RzL1JvY2snO1xyXG5pbXBvcnQgQ3JhdGUgZnJvbSAnLi4vRW52aXJvbm1lbnRPYmplY3RzL0NyYXRlJztcclxuaW1wb3J0IEJ1c2ggZnJvbSAnLi4vRW52aXJvbm1lbnRPYmplY3RzL0J1c2gnO1xyXG5pbXBvcnQgR3JvdW5kV2VhcG9uIGZyb20gXCIuLi9QaWNrVXBzL0dyb3VuZFdlYXBvbi5qc1wiO1xyXG5pbXBvcnQgR3JvdW5kQXNzYXVsdFJpZmxlIGZyb20gXCIuLi9QaWNrVXBzL0dyb3VuZEFzc2F1bHRSaWZsZS5qc1wiO1xyXG5pbXBvcnQgR3JvdW5kU25pcGVyIGZyb20gXCIuLi9QaWNrVXBzL0dyb3VuZFNuaXBlci5qc1wiO1xyXG5pbXBvcnQgR3JvdW5kU2hvdGd1biBmcm9tIFwiLi4vUGlja1Vwcy9Hcm91bmRTaG90Z3VuLmpzXCI7XHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgR2FtZSBjbGFzcyBpcyB1c2VkIHRvIHN0b3JlIHRoZSBnYW1lIHN0YXRlLiBJdCBhbHNvIGFsbG93cyBmb3IgdGhlIGdhbWUgdG8gYmUgdXBkYXRlZCBvciBkcmF3bi5cclxuICovXHJcbmNsYXNzIEdhbWUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEdhbWUgY2xhc3MuIFRoZSBnYW1lU3RhdGUgaXMgc2V0IHRvICdQbGF5aW5nJyBpbml0aWFsbHkuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzIFRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gZG9jdW1lbnRCb2R5IFRoZSBib2R5IG9mIHRoZSBkb2N1bWVudC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY2FudmFzLCBkb2N1bWVudEJvZHkpIHtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgICAgICB0aGlzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdGhpcy53b3JsZCA9IG5ldyBXb3JsZChjYW52YXMpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKGRvY3VtZW50Qm9keSk7XHJcbiAgICAgICAgdGhpcy5jdXJzb3IgPSBuZXcgQ3Vyc29yKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSAnUGxheWluZyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgdGhlIGdhbWUuIElmIHRoZSBnYW1lU3RhdGUgaXMgJ1BsYXlpbmcsJyBldmVyeXRoaW5nIGluIHRoZSB3b3JsZCBpcyBjaGVja2VkIGFuZCB1cGRhdGVkLlxyXG4gICAgICogSWYgdGhlIGdhbWVTdGF0ZSBpcyAnUGF1c2VkLCcgZXZlcnl0aGluZyBpbiB0aGUgd29ybGQgcmVtYWlucyBzdGlsbCB1bnRpbCB0aGUgcmVzdW1lIGJ1dHRvbiBpcyBwcmVzc2VkLiBJZiB0aGVcclxuICAgICAqIGdhbWVTdGF0ZSBpcyAnR2FtZSBPdmVyLCcgZXZlcnl0aGluZyBpbiB0aGUgd29ybGQgcmVtYWlucyBzdGlsbCB1bnRpbCB0aGUgVHJ5IEFnYWluIGJ1dHRvbiBpcyBwcmVzc2VkLlxyXG4gICAgICogQHBhcmFtIG1vZGlmaWVyIFRoZSBtb2RpZmllciB0byBiZSB1c2VkIGZvciBtb3ZlbWVudC5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlKG1vZGlmaWVyKSB7XHJcbiAgICAgICAgbGV0IHNwcmludGluZyA9IHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoMTYpO1xyXG4gICAgICAgIGlmKHRoaXMuZ2FtZVN0YXRlID09PSAnUGxheWluZycpIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaGVhbHRoIDw9IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9ICdHYW1lIE92ZXInO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoMjcpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSAnUGF1c2VkJztcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoODcpKSB7IC8vIFBsYXllciBob2xkaW5nIHVwXHJcbiAgICAgICAgICAgICAgICAvL09ubHkgbW92ZSB1cCBpZiB3ZSBhcmUgbm90IGF0IHRoZSB2ZXJ5IHRvcCBvZiB0aGUgd29ybGRcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLnkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vSWYgdGhlIHBsYXllciBpcyBzcHJpbnRpbmcgaGUgbXVzdCBtb3ZlIHR3aWNlIGFzIGZhc3QsIGFuZCBoaXMgc3RhbWluYSBtdXN0IGRyYWluIGJhc2VkIG9uIHRoZSBtb2RpZmllciAoc2Vjb25kcyBzaW5jZSBsYXN0IHVwZGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICBpZihzcHJpbnRpbmcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueSAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCptb2RpZmllcioyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueSAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL0lmIHRoZSBtb3ZlbWVudCBjYXVzZWQgdGhlIHBsYXllciB0byBiZSBjb2xsaWRpbmcsIHVuZG8gdGhlIG1vdmVtZW50IGFuZCBnaXZlIGJhY2sgdGhlIHN0YW1pbmEgaWYgaGUgd2FzIHNwcml0bmluZy5cclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdCh0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmKHNwcmludGluZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnkgKz0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQqbW9kaWZpZXIqMjtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnkgKz0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoODMpKSB7IC8vIFBsYXllciBob2xkaW5nIGRvd25cclxuICAgICAgICAgICAgICAgIC8vT25seSBtb3ZlIGRvd24gaWYgd2UgYXJlIG5vdCBhdCB0aGUgdmVyeSBib3R0b20gb2YgdGhlIHdvcmxkXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0IDw9IDU2MjUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0lmIHRoZSBwbGF5ZXIgaXMgc3ByaW50aW5nIGhlIG11c3QgbW92ZSB0d2ljZSBhcyBmYXN0LCBhbmQgaGlzIHN0YW1pbmEgbXVzdCBkcmFpbiBiYXNlZCBvbiB0aGUgbW9kaWZpZXIgKHNlY29uZHMgc2luY2UgbGFzdCB1cGRhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3ByaW50aW5nKXtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnkgKz0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQqbW9kaWZpZXIqMjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9PdGhlcndpc2UgbW92ZSBsaWtlIG5vcm1hbFxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vSWYgdGhlIG1vdmVtZW50IGNhdXNlZCB0aGUgcGxheWVyIHRvIGJlIGNvbGxpZGluZywgdW5kbyB0aGUgbW92ZW1lbnQgYW5kIGdpdmUgYmFjayB0aGUgc3RhbWluYSBpZiBoZSB3YXMgc3ByaXRuaW5nLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYoc3ByaW50aW5nKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueSAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCptb2RpZmllcioyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueSAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg2NSkpIHsgLy8gUGxheWVyIGhvbGRpbmcgbGVmdFxyXG4gICAgICAgICAgICAgICAgLy9vbmx5IGdvIGxlZnQgaWYgd2UgYXJlIG5vdCBvbiB0aGUgZmFyIGxlZnQgZWRnZSBhbHJlYWR5XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci54ID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihzcHJpbnRpbmcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueCAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyKjI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54IC09IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzcHJpbnRpbmcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggKz0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcioyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueCArPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg2OCkpIHsgLy8gUGxheWVyIGhvbGRpbmcgcmlnaHRcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aCA8PSAxMDAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwcmludGluZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXIqMjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggKz0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwcmludGluZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueCAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyKjI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54IC09IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5jb250cm9sbGVyLmlzTW91c2VQcmVzc2VkKCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCB3ZXAgPSB0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnlbdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4XTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0ZpcmUgdGhlIGNvcnJlY3QgYnVsbGV0IHR5cGUgZm9yIHRoZSBjdXJyZW50bHkgZXF1aXBwZWQgd2VhcG9uLlxyXG4gICAgICAgICAgICAgICAgLy9UaGlzIGNvdWxkIGJlIGRvbmUgbW9yZSBncmFjZWZ1bGx5IGluIHRoZSBmdXR1cmVcclxuICAgICAgICAgICAgICAgIGlmKHdlcC5jb29sZG93biA8PSAwKXtcclxuICAgICAgICAgICAgICAgICAgd2VwLnNvdW5kLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgd2VwLnNvdW5kLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgd2VwLmFkZENvb2xkb3duKCk7XHJcbiAgICAgICAgICAgICAgICAgIGlmKHdlcCBpbnN0YW5jZW9mIFBpc3RvbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDltbSh0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55KSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgZWxzZSBpZih3ZXAgaW5zdGFuY2VvZiBTbmlwZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5wdXNoKG5ldyBCdWxsZXQ1MGNhbCh0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55KSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgZWxzZSBpZih3ZXAgaW5zdGFuY2VvZiBBc3NhdWx0UmlmbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5wdXNoKG5ldyBCdWxsZXQ1NTYodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnksIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54LCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueSkpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIGVsc2UgaWYod2VwIGluc3RhbmNlb2YgU2hvdGd1bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDEyR2F1Z2UodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnksIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54LCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDEyR2F1Z2UodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnksIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54KzI1LCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueSsyNSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDEyR2F1Z2UodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnksIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54KzUwLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueSs1MCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDEyR2F1Z2UodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnksIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54LTI1LCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueS0yNSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDEyR2F1Z2UodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnksIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54LTUwLCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueS01MCkpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9UaGVzZSBjb250cm9scyBjaGFuZ2UgdGhlIGFjdGl2ZSB3ZWFwb24gd2l0aCBzaW1wbGUgMSwyLDMsZXRjIGNvbnRyb2xzIGZvciBpbnZlbnRvcnlcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoNDkpKSB7IC8vIFBsYXllciBwcmVzc2VkIDFcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoNTApKSB7IC8vIFBsYXllciBwcmVzc2VkIDJcclxuICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnkubGVuZ3RoID4gMSlcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleCA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoNTEpKSB7IC8vIFBsYXllciBwcmVzc2VkIDNcclxuICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnkubGVuZ3RoID4gMilcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleCA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoNTIpKSB7IC8vIFBsYXllciBwcmVzc2VkIDRcclxuICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnkubGVuZ3RoID4gMylcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleCA9IDM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gdGhpcy53b3JsZC5idWxsZXRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHNbaV0ubW92ZShtb2RpZmllciwgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMsIHRoaXMud29ybGQuZW5lbWllcyk7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLmJ1bGxldHNbaV0ubGl2ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLm1vdmUodGhpcy53b3JsZC5wbGF5ZXIsIG1vZGlmaWVyLCB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cyk7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0uYXR0YWNrQ29vbGRvd24gPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5hdHRhY2tDb29sZG93biAtPSA1O1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldIGluc3RhbmNlb2YgRmluYWxCb3NzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLnJhcGlkRmlyZUNvb2xkb3duID4gMCAmJiAhdGhpcy53b3JsZC5lbmVtaWVzW2ldLmlzUmFwaWRGaXJlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlQ29vbGRvd24gLT0gdGhpcy53b3JsZC5lbmVtaWVzW2ldLnJhcGlkRmlyZUNvb2xkb3duUmF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVDb29sZG93biA8PSAwICYmICF0aGlzLndvcmxkLmVuZW1pZXNbaV0uaXNSYXBpZEZpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLnN0YXJ0UmFwaWRGaXJlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVMZW5ndGggPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlTGVuZ3RoUmVzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVMZW5ndGggPiAwICYmIHRoaXMud29ybGQuZW5lbWllc1tpXS5pc1JhcGlkRmlyZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLnJhcGlkRmlyZUxlbmd0aCAtPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0ucmFwaWRGaXJlQ29vbGRvd25SYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLnJhcGlkRmlyZUxlbmd0aCA8PSAwICYmIHRoaXMud29ybGQuZW5lbWllc1tpXS5pc1JhcGlkRmlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uZW5kUmFwaWRGaXJlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVDb29sZG93biA9IHRoaXMud29ybGQuZW5lbWllc1tpXS5yYXBpZEZpcmVDb29sZG93blJlc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLmNoYXJnZUF0dGFja0Nvb2xkb3duID4gMCAmJiAhdGhpcy53b3JsZC5lbmVtaWVzW2ldLmlzQ2hhcmdlQXR0YWNrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrQ29vbGRvd24gLT0gdGhpcy53b3JsZC5lbmVtaWVzW2ldLmNoYXJnZUF0dGFja0Nvb2xkb3duUmF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tDb29sZG93biA8PSAwICYmICF0aGlzLndvcmxkLmVuZW1pZXNbaV0uaXNDaGFyZ2VBdHRhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLnN0YXJ0Q2hhcmdlQXR0YWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tMZW5ndGggPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrTGVuZ3RoUmVzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tMZW5ndGggPiAwICYmIHRoaXMud29ybGQuZW5lbWllc1tpXS5pc0NoYXJnZUF0dGFjaylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmNoYXJnZUF0dGFja0xlbmd0aCAtPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0uY2hhcmdlQXR0YWNrQ29vbGRvd25SYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLmNoYXJnZUF0dGFja0xlbmd0aCA8PSAwICYmIHRoaXMud29ybGQuZW5lbWllc1tpXS5pc0NoYXJnZUF0dGFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uZW5kQ2hhcmdlQXR0YWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tDb29sZG93biA9IHRoaXMud29ybGQuZW5lbWllc1tpXS5jaGFyZ2VBdHRhY2tDb29sZG93blJlc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXSBpbnN0YW5jZW9mIFByb2plY3RpbGVFbmVteSB8fCB0aGlzLndvcmxkLmVuZW1pZXNbaV0gaW5zdGFuY2VvZiBNaW5pQm9zcyB8fCB0aGlzLndvcmxkLmVuZW1pZXNbaV0gaW5zdGFuY2VvZiBGaW5hbEJvc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93biA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duIC09IHRoaXMud29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duUmF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzLnB1c2gobmV3IEVuZW15UHJvamVjdGlsZSh0aGlzLndvcmxkLmVuZW1pZXNbaV0ueCArIHRoaXMud29ybGQuZW5lbWllc1tpXS53aWR0aC8yLCB0aGlzLndvcmxkLmVuZW1pZXNbaV0ueSArIHRoaXMud29ybGQuZW5lbWllc1tpXS5oZWlnaHQvMiwgdGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQvMikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93biArPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93blJlc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5oZWFsdGggPD0gMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY2hlY2sgZm9yIHdlYXBvbiBwaWNrVXBzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLndvcmxkLmdyb3VuZFdlYXBvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pe1xyXG4gICAgICAgICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcy53b3JsZC5wbGF5ZXIsIHRoaXMud29ybGQuZ3JvdW5kV2VhcG9uc1tpXSkpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG93bnNXZXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IHRoaXMud29ybGQucGxheWVyLmludmVudG9yeS5sZW5ndGggLSAxOyBqID49IDA7IGotLSl7XHJcbiAgICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmludmVudG9yeVtqXS5uYW1lID09PSB0aGlzLndvcmxkLmdyb3VuZFdlYXBvbnNbaV0ud2VhcG9uLm5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIG93bnNXZXAgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihvd25zV2VwID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5ncm91bmRXZWFwb25zW2ldLmFkZFdlYXBvbih0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnkpO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmdyb3VuZFdlYXBvbnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL1VwZGF0ZSB3ZWFwb24gY29vbGRvd25zXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIGxldCB3ZXAgPSB0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnlbaV07XHJcbiAgICAgICAgICAgICAgICBpZih3ZXAuY29vbGRvd24gPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICB3ZXAuY29vbGRvd24gLT0gbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXNbaV0ubW92ZShtb2RpZmllciwgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMsIHRoaXMud29ybGQucGxheWVyKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5saXZlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmhlYWx0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSB0aGlzLndvcmxkLnBpY2tVcHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcy53b3JsZC5wbGF5ZXIsIHRoaXMud29ybGQucGlja1Vwc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5oZWFsdGggPCAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuaGVhbHRoID0gMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBpY2tVcHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLndhdmUgKz0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuc3RhcnRXYXZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy53b3JsZC5jYW1lcmEudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5nYW1lU3RhdGUgPT09ICdHYW1lIE92ZXInKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29udHJvbGxlci5pc01vdXNlUHJlc3NlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0gPiB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwICYmIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSA8ICh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwKzIwMClcclxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0gPiB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1ICYmIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSA8IHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUgKyAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnN0YXJ0KHRoaXMuY2FudmFzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9ICdQbGF5aW5nJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuZ2FtZVN0YXRlID09PSAnUGF1c2VkJykge1xyXG4gICAgICAgICAgICBpZih0aGlzLmNvbnRyb2xsZXIuaXNNb3VzZVByZXNzZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jb250cm9sbGVyLm1vdXNlWzBdID4gdGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCAmJiB0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0gPCAodGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCsyMDApXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdID4gdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSAmJiB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0gPCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1ICsgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSAnUGxheWluZyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIGV2ZXJ5dGhpbmcgaW4gdGhlIHdvcmxkLiBJZiB0aGUgZ2FtZVN0YXRlIGlzICdHYW1lIE92ZXIsJyBhIGdhbWUgb3ZlciBtZXNzYWdlIGlzIGRpc3BsYXllZCxcclxuICAgICAqIGlmIHRoZSBnYW1lU3RhdGUgaXMgJ1BhdXNlZCwnIGEgcGF1c2UgbWVzc2FnZSBpcyBkaXNwbGF5ZWQsIGFuZCBpZiB0aGUgZ2FtZVN0YXRlIGlzICdQbGF5aW5nLCcgYWxsIG9mIHRoZSBvYmplY3RzXHJcbiAgICAgKiBpbiB0aGUgd29ybGQgYXJlIGRyYXduLCBhbG9uZyB3aXRoIHRoZSBIVUQsIE1pbmlNYXAsIGFuZCBjdXJzb3IuXHJcbiAgICAgKi9cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgaWYodGhpcy5nYW1lU3RhdGUgPT09ICdHYW1lIE92ZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0dhbWVPdmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5nYW1lU3RhdGUgPT09ICdQYXVzZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1BhdXNlU2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmlzQmFja2dyb3VuZExvYWRlZClcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZHJhd0JhY2tncm91bmQodGhpcy5jdHgsIHRoaXMuY2FudmFzKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1dlYXBvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3UGlja1VwcygpO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaXNJbWFnZUxvYWRlZClcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhLCB0aGlzLmNvbnRyb2xsZXIubW91c2UpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kcmF3RW5lbWllcygpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdFbmVteVByb2plY3RpbGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0J1bGxldHMoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3RW52aXJvbm1lbnRPYmplY3RzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd01pbmlNYXAoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3SFVEKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmN1cnNvci5pbWFnZSwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdIC0gdGhpcy5jdXJzb3IuaW1hZ2Uud2lkdGgvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdIC0gdGhpcy5jdXJzb3IuaW1hZ2UuaGVpZ2h0LzIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyBhIE1pbmlNYXAgdGhhdCBkaXNwbGF5cyB0aGUgcGxheWVyJ3MgbG9jYXRpb24sIGVuZW15IGxvY2F0aW9ucywgYW5kIGVudmlyb25tZW50IG9iamVjdCBsb2NhdGlvbnMuXHJcbiAgICAgKi9cclxuICAgIGRyYXdNaW5pTWFwKCkge1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDM1LCAxNzcsIDc3LCAwLjIpJztcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMFwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDM7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QodGhpcy5jYW52YXMud2lkdGggLSA0MjUsIDI1LCA0MDAsIDIyNSk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdCh0aGlzLmNhbnZhcy53aWR0aCAtIDQyNSwgMjUsIDQwMCwgMjI1KTtcclxuICAgICAgICBsZXQgeFBlcmNlbnQgPSAodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIpIC8gdGhpcy53b3JsZC53aWR0aDtcclxuICAgICAgICBsZXQgeVBlcmNlbnQgPSAodGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yKSAvIHRoaXMud29ybGQuaGVpZ2h0O1xyXG4gICAgICAgIGxldCB4UmVsYXRpdmUgPSB4UGVyY2VudCo0MDA7XHJcbiAgICAgICAgbGV0IHlSZWxhdGl2ZSA9IHlQZXJjZW50KjIyNTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzAwRkYwMCc7XHJcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgdGhpcy5jdHguYXJjKCh0aGlzLmNhbnZhcy53aWR0aCAtIDQyNSkgKyB4UmVsYXRpdmUsIDI1ICsgeVJlbGF0aXZlLCAyLjUsIDAsIDIqTWF0aC5QSSk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgeFBlcmNlbnQgPSAodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0ueCArIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLndpZHRoLzIpIC8gdGhpcy53b3JsZC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGxldCB5UGVyY2VudCA9ICh0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS55ICsgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uaGVpZ2h0LzIpIC8gdGhpcy53b3JsZC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgeFJlbGF0aXZlID0geFBlcmNlbnQqNDAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHlSZWxhdGl2ZSA9IHlQZXJjZW50KjIyNTtcclxuICAgICAgICAgICAgICAgIC8vY3R4LmRyYXdJbWFnZSh0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5pbWFnZSwgKHRoaXMuY2FudmFzLndpZHRoIC0gNDI1KSArIHhSZWxhdGl2ZSArIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLndpZHRoLzIsIDI1ICsgeVJlbGF0aXZlICsgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uaGVpZ2h0LzIsIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLndpZHRoLzI1LCB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5oZWlnaHQvMjUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyM4MDgwODAnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5hcmMoKHRoaXMuY2FudmFzLndpZHRoIC0gNDI1KSArIHhSZWxhdGl2ZSwgMjUgKyB5UmVsYXRpdmUsIDIuNSwgMCwgMipNYXRoLlBJKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgeFBlcmNlbnQgPSAodGhpcy53b3JsZC5lbmVtaWVzW2ldLnggKyB0aGlzLndvcmxkLmVuZW1pZXNbaV0ud2lkdGgvMikgLyB0aGlzLndvcmxkLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgbGV0IHlQZXJjZW50ID0gKHRoaXMud29ybGQuZW5lbWllc1tpXS55ICsgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmhlaWdodC8yKSAvIHRoaXMud29ybGQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHhSZWxhdGl2ZSA9IHhQZXJjZW50KjQwMDtcclxuICAgICAgICAgICAgICAgIGxldCB5UmVsYXRpdmUgPSB5UGVyY2VudCoyMjU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI0ZGMDAwMCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmFyYygodGhpcy5jYW52YXMud2lkdGggLSA0MjUpICsgeFJlbGF0aXZlLCAyNSArIHlSZWxhdGl2ZSwgMi41LCAwLCAyKk1hdGguUEkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyB0aGUgSFVEIHdoaWNoIGNvbnRhaW5zIHRoZSBwbGF5ZXIncyBoZWFsdGgsIHRoZSB3YXZlIG51bWJlciwgYW5kIHRoZSBudW1iZXIgb2YgZW5lbWllcyBsZWZ0LlxyXG4gICAgICogVGhlIGN1cnJlbnQgc2VsZWN0ZWQgd2VhcG9uIGlzIGFsc28gZGlzcGxheWVkLlxyXG4gICAgICovXHJcbiAgICBkcmF3SFVEKCkge1xyXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjQ4cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCI7XHJcbiAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gMTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aGlzLndvcmxkLnBsYXllci5oZWFsdGggKyBcIiBIUFwiLCB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMjkwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCh0aGlzLndvcmxkLnBsYXllci5oZWFsdGggKyBcIiBIUFwiLCB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMjkwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJXYXZlIFwiICsgdGhpcy53b3JsZC53YXZlLCB0aGlzLmNhbnZhcy53aWR0aC8yLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIldhdmUgXCIgKyB0aGlzLndvcmxkLndhdmUsIHRoaXMuY2FudmFzLndpZHRoLzIsIDUwKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aGlzLndvcmxkLmVuZW1pZXMubGVuZ3RoICsgXCIgRW5lbWllcyBMZWZ0XCIsIHRoaXMuY2FudmFzLndpZHRoLzIgKyAzNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGggKyBcIiBFbmVtaWVzIExlZnRcIiwgdGhpcy5jYW52YXMud2lkdGgvMiArIDM1MCwgNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjQ4cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCdBY3RpdmUgV2VhcG9uOiAnICsgdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W3RoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleF0ubmFtZSwgdGhpcy5jYW52YXMud2lkdGgvMiwgMTI1KTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCdBY3RpdmUgV2VhcG9uOiAnICsgdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W3RoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleF0ubmFtZSwgdGhpcy5jYW52YXMud2lkdGgvMiwgMTI1KTtcclxuICAgICAgICAvLyByZW1vdmUgbGF0ZXIgLSBkZWJ1Z2dpbmcgcHVycG9zZXNcclxuICAgICAgICAvLyB0aGlzLmN0eC5mb250ID0gXCIyNHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICAvLyB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI0ZGRic7XHJcbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbFRleHQoJ1Bvc1g6ICcgKyB0aGlzLndvcmxkLnBsYXllci54LCB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMjkwLCAxNzUpO1xyXG4gICAgICAgIC8vIHRoaXMuY3R4LnN0cm9rZVRleHQoJ1Bvc1k6ICcgKyB0aGlzLndvcmxkLnBsYXllci55LCB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMjkwLCAyNTApO1xyXG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxUZXh0KCdDYW1lcmFYOiAnICsgdGhpcy53b3JsZC5jYW1lcmEueCwgdGhpcy5jYW52YXMud2lkdGgvMiwgMTc1KTtcclxuICAgICAgICAvLyB0aGlzLmN0eC5zdHJva2VUZXh0KCdDYW1lcmFZOiAnICsgdGhpcy53b3JsZC5jYW1lcmEueSwgdGhpcy5jYW52YXMud2lkdGgvMiwgMjUwKTtcclxuICAgICAgICAvLyB0aGlzLmN0eC5maWxsVGV4dCgnbW91c2VYOiAnICsgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgMzUwLCAxNzUpO1xyXG4gICAgICAgIC8vIHRoaXMuY3R4LnN0cm9rZVRleHQoJ21vdXNlWTogJyArIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSwgdGhpcy5jYW52YXMud2lkdGgvMiArIDM1MCwgMjUwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgdGhlIGdhbWUgb3ZlciBzY3JlZW4gYW5kIGEgYnV0dG9uIHRvIHRyeSBhZ2Fpbi5cclxuICAgICAqL1xyXG4gICAgZHJhd0dhbWVPdmVyKCkge1xyXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjEyOHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkZGJztcclxuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiR2FtZSBPdmVyXCIsIHRoaXMuY2FudmFzLndpZHRoLzIsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIkdhbWUgT3ZlclwiLCB0aGlzLmNhbnZhcy53aWR0aC8yLCB0aGlzLmNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUsIDIwMCwgMTAwKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUsIDIwMCwgMTAwKTtcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIyNHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlRyeSBhZ2Fpbj9cIiwgdGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCArIDEwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSArIDUwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgdGhlIHBhdXNlIHNjcmVlbiBhbmQgYSByZXN1bWUgYnV0dG9uLlxyXG4gICAgICovXHJcbiAgICBkcmF3UGF1c2VTY3JlZW4oKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMTI4cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDE7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJQYXVzZWRcIiwgdGhpcy5jYW52YXMud2lkdGgvMiwgdGhpcy5jYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KFwiUGF1c2VkXCIsIHRoaXMuY2FudmFzLndpZHRoLzIsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI0ZGRic7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QodGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSwgMjAwLCAxMDApO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVJlY3QodGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSwgMjAwLCAxMDApO1xyXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjI0cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyMwMDAnO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiUmVzdW1lXCIsIHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAgKyAxMDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUgKyA1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIGFsbCBvZiB0aGUgZW5lbWllcyBpbiB0aGUgd29ybGQuXHJcbiAgICAgKi9cclxuICAgIGRyYXdFbmVtaWVzKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmVuZW1pZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLmlzSW1hZ2VMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLndvcmxkLmNhbWVyYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRyYXdzIGFsbCBvZiB0aGUgZW52aXJvbm1lbnQgb2JqZWN0cyBpbiB0aGUgd29ybGQuXHJcbiAgICAgKi9cclxuICAgIGRyYXdFbnZpcm9ubWVudE9iamVjdHMoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzSW1hZ2VMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgYWxsIG9mIHRoZSB3ZWFwb25zIGluIHRoZSB3b3JsZC5cclxuICAgICAqL1xyXG4gICAgZHJhd1dlYXBvbnMoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuZ3JvdW5kV2VhcG9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmdyb3VuZFdlYXBvbnNbaV0uaXNJbWFnZUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5ncm91bmRXZWFwb25zW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gZHJhd3MgYWxsIG9mIHRoZSBsaXZlIGJ1bGxldHMgaW4gdGhlIHdvcmxkLlxyXG4gICAgICovXHJcbiAgICBkcmF3QnVsbGV0cygpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5idWxsZXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuYnVsbGV0c1tpXS5pc0ltYWdlTG9hZGVkICYmIHRoaXMud29ybGQuYnVsbGV0c1tpXS5saXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHNbaV0uZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyBhbGwgb2YgdGhlIGxpdmUgZW5lbXkgcHJvamVjdGlsZXMgaW4gdGhlIHdvcmxkLlxyXG4gICAgICovXHJcbiAgICBkcmF3RW5lbXlQcm9qZWN0aWxlcygpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5pc0ltYWdlTG9hZGVkICYmIHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5saXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXNbaV0uZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBkcmF3cyBhbGwgb2YgdGhlIHBpY2sgdXBzIGluIHRoZSB3b3JsZC5cclxuICAgICAqL1xyXG4gICAgZHJhd1BpY2tVcHMoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQucGlja1Vwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBpY2tVcHNbaV0uaXNJbWFnZUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5waWNrVXBzW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcclxuIiwiaW1wb3J0IFJvY2sgZnJvbSBcIi4uL0Vudmlyb25tZW50T2JqZWN0cy9Sb2NrXCI7XHJcbmltcG9ydCBCdXNoIGZyb20gXCIuLi9FbnZpcm9ubWVudE9iamVjdHMvQnVzaFwiO1xyXG5pbXBvcnQgQ3JhdGUgZnJvbSBcIi4uL0Vudmlyb25tZW50T2JqZWN0cy9DcmF0ZVwiO1xyXG5pbXBvcnQgVGFua0VuZW15IGZyb20gXCIuLi9FbmVtaWVzL1RhbmtFbmVteVwiO1xyXG5pbXBvcnQgUmVndWxhckVuZW15IGZyb20gXCIuLi9FbmVtaWVzL1JlZ3VsYXJFbmVteVwiO1xyXG5pbXBvcnQgTGlnaHRFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9MaWdodEVuZW15XCI7XHJcbmltcG9ydCBQcm9qZWN0aWxlRW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvUHJvamVjdGlsZUVuZW15XCI7XHJcbmltcG9ydCBNaW5pQm9zcyBmcm9tICcuLi9FbmVtaWVzL01pbmlCb3NzJztcclxuaW1wb3J0IEZpbmFsQm9zcyBmcm9tICcuLi9FbmVtaWVzL0ZpbmFsQm9zcyc7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL1BsYXllcnMvUGxheWVyXCI7XHJcbmltcG9ydCBDYW1lcmEgZnJvbSBcIi4uL1BsYXllcnMvQ2FtZXJhXCI7XHJcbmltcG9ydCBHcm91bmRBc3NhdWx0UmlmbGUgZnJvbSBcIi4uL1BpY2tVcHMvR3JvdW5kQXNzYXVsdFJpZmxlLmpzXCI7XHJcbmltcG9ydCBHcm91bmRTbmlwZXIgZnJvbSBcIi4uL1BpY2tVcHMvR3JvdW5kU25pcGVyLmpzXCI7XHJcbmltcG9ydCBHcm91bmRTaG90Z3VuIGZyb20gJy4uL1BpY2tVcHMvR3JvdW5kU2hvdGd1bi5qcyc7XHJcbmltcG9ydCBIZWFsdGhQYWNrIGZyb20gXCIuLi9QaWNrVXBzL0hlYWx0aHBhY2suanNcIjtcclxuaW1wb3J0IFV0aWwgZnJvbSBcIi4uL1V0aWxpdGllcy9VdGlsXCI7XHJcblxyXG4vKipcclxuICogVGhlIFdvcmxkIGNsYXNzIGhvbGRzIHRoZSBpbmZvcm1hdGlvbiByZWxhdGVkIHRvIHRoZSB3b3JsZC5cclxuICovXHJcbmNsYXNzIFdvcmxkIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGQgb2YgdGhlIHdvcmxkIGFuZCBsb2FkcyB0aGUgYmFja2dyb3VuZC5cclxuICAgICAqIEBwYXJhbSBjYW52YXMgVGhlIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoY2FudmFzKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydChjYW52YXMpO1xyXG4gICAgICAgIHRoaXMubG9hZEJhY2tncm91bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzdGFydCBmdW5jdGlvbiBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBXb3JsZC4gVGhlIHBsYXllciBpcyBtYWRlIGFuZCB0aGUgY2FtZXJhIGlzIGF0dGFjaGVkIHRvIHRoZSBwbGF5ZXIuXHJcbiAgICAgKiBBIGNhbGwgaXMgdG8gaW5pdGlhbGl6ZSB0aGUgZW52aXJvbm1lbnQgYW5kIHN0YXJ0IHRoZSB3YXZlLlxyXG4gICAgICogQHBhcmFtIGNhbnZhcyBUaGUgY2FudmFzLlxyXG4gICAgICovXHJcbiAgICBzdGFydChjYW52YXMpIHtcclxuICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZW5lbWllcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZW5lbXlQcm9qZWN0aWxlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMucGlja1VwcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZ3JvdW5kV2VhcG9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUVudmlyb25tZW50KCk7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplUGlja1VwcygpO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBDYW1lcmEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0LCAxMDAwMCwgNTYyNSk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyLCBjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLndhdmUgPSAxO1xyXG4gICAgICAgIHRoaXMuc3RhcnRXYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGluaXRpYWxpemVzIHRoZSBlbnZpcm9ubWVudCBieSBwdXNoaW5nIGVudmlyb25tZW50IG9iamVjdHMgb250byB0aGUgZW52aXJvbm1lbnRPYmplY3RzIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplRW52aXJvbm1lbnQoKSB7XHJcbiAgICAgICAgbGV0IGNyYXRlQ2FwID0gMjA7XHJcbiAgICAgICAgbGV0IGJ1c2hDYXAgPSAzMDtcclxuICAgICAgICBsZXQgcm9ja0NhcCA9IDMwO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgY3JhdGVDYXA7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMucHVzaChuZXcgQ3JhdGUoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBidXNoQ2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzLnB1c2gobmV3IEJ1c2goVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByb2NrQ2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzLnB1c2gobmV3IFJvY2soVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG5cclxuICAgICAgICBsZXQgY29sbGlzaW9uRmxhZyA9IHRydWU7XHJcbiAgICAgICAgd2hpbGUoY29sbGlzaW9uRmxhZyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgaSA9IFV0aWwuYXJlQW55Q29sbGlzaW9uc0luU2FtZUFycmF5KHRoaXMuZW52aXJvbm1lbnRPYmplY3RzKTtcclxuICAgICAgICAgICAgaWYoaSA9PT0gLTEpXHJcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25GbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzW2ldLnNldFBvc2l0aW9uKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgUGlja1VwcyBzdWNoIGFzIHdlYXBvbnMgYW5kIGhlYWx0aCBwYWNrcyBieSBwdXNoaW5nIHRoZW0gb250byB0aGUgUGlja1VwcyBhbmQgZ3JvdW5kV2VhcG9ucyBhcnJheXMuXHJcbiAgICAgKi9cclxuICAgICBpbml0aWFsaXplUGlja1VwcygpIHtcclxuICAgICAgICAgbGV0IHNuaXBlckNhcCA9IDM7XHJcbiAgICAgICAgIGxldCBhc3NhdWx0UmlmbGVDYXAgPSA1O1xyXG4gICAgICAgICBsZXQgc2hvdGd1bkNhcCA9IDEwO1xyXG4gICAgICAgICBsZXQgaGVhbHRoUGFja0NhcCA9IDEwO1xyXG5cclxuICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNuaXBlckNhcDsgaSsrKVxyXG4gICAgICAgICAgICAgdGhpcy5ncm91bmRXZWFwb25zLnB1c2gobmV3IEdyb3VuZFNuaXBlcihVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhc3NhdWx0UmlmbGVDYXA7IGkrKylcclxuICAgICAgICAgICAgIHRoaXMuZ3JvdW5kV2VhcG9ucy5wdXNoKG5ldyBHcm91bmRBc3NhdWx0UmlmbGUoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2hvdGd1bkNhcDsgaSsrKXtcclxuICAgICAgICAgICAgIHRoaXMuZ3JvdW5kV2VhcG9ucy5wdXNoKG5ldyBHcm91bmRTaG90Z3VuKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgaGVhbHRoUGFja0NhcDsgaSsrKVxyXG4gICAgICAgICAgICAgdGhpcy5waWNrVXBzLnB1c2gobmV3IEhlYWx0aFBhY2soVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG5cclxuICAgICAgICAgbGV0IHNlbGZDb2xsaXNpb25GbGFnID0gdHJ1ZTtcclxuICAgICAgICAgd2hpbGUoc2VsZkNvbGxpc2lvbkZsYWcpIHtcclxuICAgICAgICAgICAgIGxldCBpID0gVXRpbC5hcmVBbnlDb2xsaXNpb25zSW5TYW1lQXJyYXkodGhpcy5ncm91bmRXZWFwb25zKTtcclxuICAgICAgICAgICAgIGlmKGkgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgIHNlbGZDb2xsaXNpb25GbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgdGhpcy5ncm91bmRXZWFwb25zW2ldLnNldFBvc2l0aW9uKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBzZWxmQ29sbGlzaW9uRmxhZyA9IHRydWU7XHJcbiAgICAgICAgIHdoaWxlKHNlbGZDb2xsaXNpb25GbGFnKSB7XHJcbiAgICAgICAgICAgICBsZXQgaSA9IFV0aWwuYXJlQW55Q29sbGlzaW9uc0luU2FtZUFycmF5KHRoaXMucGlja1Vwcyk7XHJcbiAgICAgICAgICAgICBpZihpID09PSAtMSlcclxuICAgICAgICAgICAgICAgICBzZWxmQ29sbGlzaW9uRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgIHRoaXMucGlja1Vwc1tpXS5zZXRQb3NpdGlvbihVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKTtcclxuICAgICAgICAgfVxyXG4gICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gc3RhcnRzIHRoZSB3YXZlIGJ5IHB1c2hpbmcgZW5lbWllcyBvbnRvIHRoZSBlbmVtaWVzIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBzdGFydFdhdmUoKSB7XHJcbiAgICAgICAgbGV0IGxpZ2h0RW5lbXlDYXAgPSB0aGlzLndhdmUgKiAxMDtcclxuICAgICAgICBsZXQgcmVndWxhckVuZW15Q2FwID0gdGhpcy53YXZlICogMTA7XHJcbiAgICAgICAgbGV0IHRhbmtFbmVteUNhcCA9IHRoaXMud2F2ZSAqIDU7XHJcbiAgICAgICAgbGV0IHByb2plY3RpbGVFbmVteUNhcCA9IE1hdGguZmxvb3IodGhpcy53YXZlLzIpKjU7XHJcbiAgICAgICAgbGV0IG1pbmlCb3NzQ2FwID0gTWF0aC5mbG9vcih0aGlzLndhdmUvNSk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMud2F2ZSA9PT0gNikge1xyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgRmluYWxCb3NzKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsaWdodEVuZW15Q2FwOyBpKyspXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgTGlnaHRFbmVteShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZWd1bGFyRW5lbXlDYXA7IGkrKylcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBSZWd1bGFyRW5lbXkoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGFua0VuZW15Q2FwOyBpKyspXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgVGFua0VuZW15KFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHByb2plY3RpbGVFbmVteUNhcDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IFByb2plY3RpbGVFbmVteShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtaW5pQm9zc0NhcDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IE1pbmlCb3NzKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb2xsaXNpb25GbGFnID0gdHJ1ZTtcclxuICAgICAgICB3aGlsZShjb2xsaXNpb25GbGFnID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCBpID0gVXRpbC5hcmVBbnlDb2xsaXNpb25zKHRoaXMuZW5lbWllcywgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMpO1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gLTEpXHJcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25GbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5lbWllc1tpXS5zZXRQb3NpdGlvbihVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbG9hZEJhY2tncm91bmQgZnVuY3Rpb24gbG9hZHMgdGhlIGJhY2tncm91bmQgaW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0JhY2tncm91bmRMb2FkZWQgaXNcclxuICAgICAqIHNldCB0byB0cnVlLlxyXG4gICAgICovXHJcbiAgICBsb2FkQmFja2dyb3VuZCgpIHtcclxuICAgICAgICB0aGlzLmlzQmFja2dyb3VuZExvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZC5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNCYWNrZ3JvdW5kTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuYmFja2dyb3VuZC53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmJhY2tncm91bmQuaGVpZ2h0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLnNyYyA9IFwiR3JhcGhpY3MvQmFja2dyb3VuZC5wbmdcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkcmF3QmFja2dyb3VuZCBmdW5jdGlvbiBkcmF3cyB0aGUgYmFja2dyb3VuZCBvZiB0aGUgd29ybGQuXHJcbiAgICAgKiBAcGFyYW0gY3R4IFRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzIFRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGRyYXdCYWNrZ3JvdW5kKGN0eCwgY2FudmFzKSB7XHJcbiAgICAgICAgbGV0IHNXaWR0aCwgc0hlaWdodDtcclxuICAgICAgICBzV2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICAgICAgc0hlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuYmFja2dyb3VuZC53aWR0aCAtIHRoaXMuY2FtZXJhLnggPCBjYW52YXMud2lkdGgpXHJcbiAgICAgICAgICAgIHNXaWR0aCA9IHRoaXMuYmFja2dyb3VuZC53aWR0aCAtIHRoaXMuY2FtZXJhLng7XHJcbiAgICAgICAgaWYodGhpcy5iYWNrZ3JvdW5kLmhlaWdodCAtIHRoaXMuY2FtZXJhLnkgPCBjYW52YXMuaGVpZ2h0KVxyXG4gICAgICAgICAgICBzSGVpZ2h0ID0gdGhpcy5iYWNrZ3JvdW5kLmhlaWdodCAtIHRoaXMuY2FtZXJhLnk7XHJcblxyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5iYWNrZ3JvdW5kLCB0aGlzLmNhbWVyYS54LCB0aGlzLmNhbWVyYS55LCBzV2lkdGgsIHNIZWlnaHQsIDAsIDAsIHNXaWR0aCwgc0hlaWdodCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXb3JsZDtcclxuIiwiLypcbiAgU291cmNlczpcbiAgaHR0cDovL3d3dy5sb3N0ZGVjYWRlZ2FtZXMuY29tL2hvdy10by1tYWtlLWEtc2ltcGxlLWh0bWw1LWNhbnZhcy1nYW1lL1xuICBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80MDM3MjEyL2h0bWwtY2FudmFzLWZ1bGwtc2NyZWVuP3V0bV9tZWRpdW09b3JnYW5pYyZ1dG1fc291cmNlPWdvb2dsZV9yaWNoX3FhJnV0bV9jYW1wYWlnbj1nb29nbGVfcmljaF9xYVxuICBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjkxOTYwMS9odG1sNS1jYW52YXMtd29ybGQuY2FtZXJhLXZpZXdwb3J0LWhvdy10by1hY3RhbGx5LWRvLWl0P3V0bV9tZWRpdW09b3JnYW5pYyZ1dG1fc291cmNlPWdvb2dsZV9yaWNoX3FhJnV0bV9jYW1wYWlnbj1nb29nbGVfcmljaF9xYVxuICBodHRwOi8vanNmaWRkbGUubmV0L2dmY2Fydi9RS2dIcy9cbiAqL1xuXG5pbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUvR2FtZS5qcyc7XG5cbmxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG5sZXQgZ2FtZSA9IG5ldyBHYW1lKGNhbnZhcywgZG9jdW1lbnQuYm9keSk7XG5cbmxldCBtYWluID0gKCkgPT4ge1xuICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGxldCBkZWx0YSA9IG5vdyAtIHRoZW47XG5cbiAgICBnYW1lLnVwZGF0ZShkZWx0YSAvIDEwMDApO1xuICAgIGdhbWUuZHJhdygpO1xuXG4gICAgdGhlbiA9IG5vdztcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShtYWluKTtcbn07XG5cbi8vIENyb3NzLWJyb3dzZXIgc3VwcG9ydCBmb3IgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cbmxldCB0aGVuID0gRGF0ZS5ub3coKTtcbm1haW4oKTtcbiIsImltcG9ydCBHcm91bmRXZWFwb24gZnJvbSAnLi9Hcm91bmRXZWFwb24uanMnO1xyXG5pbXBvcnQgQXNzYXVsdFJpZmxlIGZyb20gJy4uL1dlYXBvbnMvQXNzYXVsdFJpZmxlLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgR3JvdW5kQXNzYXVsdFJpZmxlIGNsYXNzIGV4dGVuZHMgdGhlIEdyb3VuZFdlYXBvbiBjbGFzcy5cclxuICovXHJcbmNsYXNzIEdyb3VuZEFzc2F1bHRSaWZsZSBleHRlbmRzIEdyb3VuZFdlYXBvbiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIGxldCB3ZWFwb24gPSBuZXcgQXNzYXVsdFJpZmxlKCk7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2VhcG9uKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9Hcm91bmRBc3NhdWx0UmlmbGUucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHcm91bmRBc3NhdWx0UmlmbGU7XHJcbiIsImltcG9ydCBHcm91bmRXZWFwb24gZnJvbSAnLi9Hcm91bmRXZWFwb24uanMnO1xyXG5pbXBvcnQgU2hvdGd1biBmcm9tICcuLi9XZWFwb25zL1Nob3RndW4uanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBHcm91bmRBc3NhdWx0UmlmbGUgY2xhc3MgZXh0ZW5kcyB0aGUgR3JvdW5kV2VhcG9uIGNsYXNzLlxyXG4gKi9cclxuY2xhc3MgR3JvdW5kU2hvdGd1biBleHRlbmRzIEdyb3VuZFdlYXBvbiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIGxldCB3ZWFwb24gPSBuZXcgU2hvdGd1bigpO1xyXG4gICAgICAgIHN1cGVyKHgsIHksIHdlYXBvbik7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvR3JvdW5kU2hvdGd1bi5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgR3JvdW5kU2hvdGd1bjtcclxuIiwiaW1wb3J0IEdyb3VuZFdlYXBvbiBmcm9tICcuL0dyb3VuZFdlYXBvbi5qcyc7XHJcbmltcG9ydCBXZWFwb24gZnJvbSAnLi4vV2VhcG9ucy9XZWFwb24uanMnO1xyXG5pbXBvcnQgU25pcGVyIGZyb20gJy4uL1dlYXBvbnMvU25pcGVyLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgR3JvdW5kU25pcGVyIGNsYXNzIGV4dGVuZHMgdGhlIEdyb3VuZFdlYXBvbiBjbGFzcy5cclxuICovXHJcbmNsYXNzIEdyb3VuZFNuaXBlciBleHRlbmRzIEdyb3VuZFdlYXBvbiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIGxldCB3ZWFwb24gPSBuZXcgU25pcGVyKCk7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2VhcG9uKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9Hcm91bmRTbmlwZXIucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHcm91bmRTbmlwZXI7XHJcbiIsImNsYXNzIEdyb3VuZFdlYXBvbiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgd2VhcG9uKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMud2VhcG9uID0gd2VhcG9uO1xyXG4gICAgfVxyXG4gICAgc2V0UG9zaXRpb24oeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxuICAgIGxvYWRJbWFnZSh1cmwpIHtcclxuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB1cmw7XHJcbiAgICB9XHJcbiAgICBhZGRXZWFwb24oYXJyYXkpe1xyXG4gICAgICBhcnJheS5wdXNoKHRoaXMud2VhcG9uKTtcclxuICAgIH1cclxuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgR3JvdW5kV2VhcG9uO1xyXG4iLCJjbGFzcyBIZWFsdGhQYWNrIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuaGVhbGluZyA9IDEwMDtcclxuICAgICAgICB0aGlzLmxvYWRJbWFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBvc2l0aW9uKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEltYWdlKCkge1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9ICdHcmFwaGljcy9IZWFsdGhQYWNrLnBuZyc7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGVhbHRoUGFjaztcclxuIiwiLypcclxuICBTb3VyY2VzOlxyXG4gIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvZ2ZjYXJ2L1FLZ0hzL1xyXG4qL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBDYW1lcmEgY2xhc3MgaXMgdXNlZCB0byBmb2xsb3cgdGhlIHBsYXllcidzIG1vdmVtZW50LlxyXG4gKi9cclxuY2xhc3MgQ2FtZXJhIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBDYW1lcmEuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgQ2FtZXJhLlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIENhbWVyYS5cclxuICAgICAqIEBwYXJhbSBjYW52YXNXaWR0aCBUaGUgd2lkdGggb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjYW52YXNIZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIHdvcmxkV2lkdGggVGhlIHdpZHRoIG9mIHRoZSB3b3JsZC5cclxuICAgICAqIEBwYXJhbSB3b3JsZEhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSB3b3JsZC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCwgd29ybGRXaWR0aCwgd29ybGRIZWlnaHQpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy54RGVhZFpvbmUgPSAwO1xyXG4gICAgICAgIHRoaXMueURlYWRab25lID0gMDtcclxuICAgICAgICB0aGlzLndpZHRoID0gY2FudmFzV2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBjYW52YXNIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy53b3JsZFdpZHRoID0gd29ybGRXaWR0aDtcclxuICAgICAgICB0aGlzLndvcmxkSGVpZ2h0ID0gd29ybGRIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gc2V0IHdobyB0aGUgY2FtZXJhIGlzIGZvbGxvd2luZy5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciB0aGF0IHRoZSBjYW1lcmEgc2hvdWxkIGZvbGxvdy5cclxuICAgICAqIEBwYXJhbSB4RGVhZFpvbmVcclxuICAgICAqIEBwYXJhbSB5RGVhZFpvbmVcclxuICAgICAqL1xyXG4gICAgZm9sbG93KHBsYXllciwgeERlYWRab25lLCB5RGVhZFpvbmUpIHtcclxuICAgICAgICB0aGlzLmZvbGxvd2luZyA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLnhEZWFkWm9uZSA9IHhEZWFkWm9uZTtcclxuICAgICAgICB0aGlzLnlEZWFkWm9uZSA9IHlEZWFkWm9uZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyB0aGUgY2FtZXJhJ3MgeCBhbmQgeSBwb3NpdGlvbi5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZm9sbG93aW5nICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5mb2xsb3dpbmcueCAtIHRoaXMueCArIHRoaXMueERlYWRab25lID4gdGhpcy53aWR0aClcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuZm9sbG93aW5nLnggLSAodGhpcy53aWR0aCAtIHRoaXMueERlYWRab25lKTtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmZvbGxvd2luZy54IC0gdGhpcy54RGVhZFpvbmUgPCB0aGlzLngpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmZvbGxvd2luZy54IC0gdGhpcy54RGVhZFpvbmU7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZm9sbG93aW5nLnkgLSB0aGlzLnkgKyB0aGlzLnlEZWFkWm9uZSA+IHRoaXMuaGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5mb2xsb3dpbmcueSAtICh0aGlzLmhlaWdodCAtIHRoaXMueURlYWRab25lKTtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmZvbGxvd2luZy55IC0gdGhpcy55RGVhZFpvbmUgPCB0aGlzLnkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmZvbGxvd2luZy55IC0gdGhpcy55RGVhZFpvbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMueCA8IDApXHJcbiAgICAgICAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgICAgaWYodGhpcy55IDwgMClcclxuICAgICAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICBpZih0aGlzLnggKyB0aGlzLndpZHRoID4gdGhpcy53b3JsZFdpZHRoKVxyXG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLndvcmxkV2lkdGggLSB0aGlzLndpZHRoO1xyXG4gICAgICAgIGlmKHRoaXMueSArIHRoaXMuaGVpZ2h0ID4gdGhpcy53b3JsZEhlaWdodClcclxuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy53b3JsZEhlaWdodCAtIHRoaXMuaGVpZ2h0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYW1lcmE7IiwiaW1wb3J0IFBpc3RvbCBmcm9tICcuLi9XZWFwb25zL1Bpc3RvbC5qcydcbmltcG9ydCBTbmlwZXIgZnJvbSAnLi4vV2VhcG9ucy9TbmlwZXIuanMnXG5pbXBvcnQgU2hvdGd1biBmcm9tICcuLi9XZWFwb25zL1Nob3RndW4uanMnXG5pbXBvcnQgQXNzYXVsdFJpZmxlIGZyb20gJy4uL1dlYXBvbnMvQXNzYXVsdFJpZmxlLmpzJ1xuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xuXG5jbGFzcyBQbGF5ZXIge1xuICAvL3RoaXMueCA9IHggcG9zaXRpb25cbiAgLy90aGlzLnkgPSB5IHBvc2l0aW9uXG4gIC8vdGhpcy5oZWFsdGggPSBwbGF5ZXIncyBsaWZlXG4gIC8vdGhpcy5zcGVlZCA9IHBsYXllcidzIG1vdmVzcGVlZFxuICAvL3RoaXMubG9hZEltYWdlKCkgaXMgYSBmdW5jdGlvbiB0byBhdHRhY2ggdGhlIGltYWdlIHRvIHRoZSBwbGF5ZXIuXG4gIC8vVGhlIHBsYXllciBoYXMgYW4gYXJyYXkgdG8gaG9sZCBoaXMgaXRlbXMgYW5kIGhlIHdpbGwgc3RhcnQgd2l0aCBhIHBpc3RvbCBhbmQgc25pcGVyIHRoaXMgd2VlayBmb3IgZWFzeSB0ZXN0aW5nXG4gIC8vTmV4dCB3ZWVrIGl0ZW1zIHdpbGwgYmUgcGlja2VkIHVwIGJ5IHdhbGtpbmcgb3ZlciB0aGVtIGFuZCBhcyBzdWNoIHRoZXJlIHdpbGwgbmVlZCB0byBiZSBhbiBhZGRJdGVtIGZ1bmN0aW9uXG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgIHRoaXMueCA9IHg7XG4gICAgICB0aGlzLnkgPSB5O1xuICAgICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgICB0aGlzLnNwZWVkID0gMjU2O1xuICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICAgIHRoaXMubG9hZERhbWFnZVRha2VuU291bmQoJ0F1ZGlvL0RhbWFnZVRha2VuLm1wMycpO1xuICAgICAgbGV0IHN0YXJ0X3Bpc3RvbCA9IG5ldyBQaXN0b2woKTtcbiAgICAgIGxldCBzdGFydF9zbmlwZXIgPSBuZXcgU25pcGVyKCk7XG4gICAgICBsZXQgc3RhcnRfcmlmbGUgPSBuZXcgQXNzYXVsdFJpZmxlKCk7XG4gICAgICBsZXQgc3RhcnRfc2hvdGd1biA9IG5ldyBTaG90Z3VuKCk7XG4gICAgICAvL3RoaXMuaW52ZW50b3J5ID0gW3N0YXJ0X3Bpc3RvbCwgc3RhcnRfc25pcGVyLCBzdGFydF9yaWZsZSwgc3RhcnRfc2hvdGd1bl07XG4gICAgICB0aGlzLmludmVudG9yeSA9IFtzdGFydF9waXN0b2xdO1xuICAgICAgdGhpcy5hY3RpdmVfaW5kZXggPSAwO1xuICB9XG5cbiAgICBpc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdChlbnZpcm9ubWVudE9iamVjdHMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChVdGlsLmlzQ29sbGlzaW9uKGVudmlyb25tZW50T2JqZWN0c1tpXSwgdGhpcykgJiYgZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzQmxvY2tpbmcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgbG9hZEltYWdlKCkge1xuICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XG4gICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xuICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XG4gICAgICB9O1xuICAgICAgdGhpcy5pbWFnZS5zcmMgPSBcIkdyYXBoaWNzL1BsYXllci5wbmdcIjtcbiAgfVxuICBsb2FkRGFtYWdlVGFrZW5Tb3VuZCh1cmwpIHtcbiAgICAgIHRoaXMuaXNTb3VuZDFMb2FkZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGFtYWdlVGFrZW5Tb3VuZCA9IG5ldyBBdWRpbygpO1xuICAgICAgdGhpcy5kYW1hZ2VUYWtlblNvdW5kLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzU291bmQxTG9hZGVkID0gdHJ1ZTtcbiAgICAgIH07XG4gICAgICB0aGlzLmRhbWFnZVRha2VuU291bmQuc3JjID0gdXJsO1xuICB9XG5cbiAgICBkcmF3KGN0eCwgY2FtZXJhLCBtb3VzZSkge1xuICAgICAgICAvL2N0eC5zYXZlKCk7XG4gICAgICAgIC8vY3R4LnRyYW5zbGF0ZSgodGhpcy54ICsgdGhpcy53aWR0aC8yKSAtIGNhbWVyYS54LCAodGhpcy55ICsgdGhpcy5oZWlnaHQvMikgLSBjYW1lcmEueSk7XG4gICAgICAgIC8vY3R4LnJvdGF0ZShNYXRoLmF0YW4yKG1vdXNlWzFdIC0gKHRoaXMueSAtIGNhbWVyYS55KSwgbW91c2VbMF0gLSAodGhpcy54IC0gY2FtZXJhLngpKSk7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcbiAgICAgICAgLy9jdHgucmVzdG9yZSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiLypcclxuICBTb3VyY2VzOlxyXG4gIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvR2FtZXMvVGVjaG5pcXVlcy8yRF9jb2xsaXNpb25fZGV0ZWN0aW9uXHJcbiAgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDk1OTk3NS9nZW5lcmF0ZS1yYW5kb20tbnVtYmVyLWJldHdlZW4tdHdvLW51bWJlcnMtaW4tamF2YXNjcmlwdFxyXG4qL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBVdGlsIGNsYXNzIGNvbnRhaW5zIHZhcmlvdXMgdXRpbGl0eSBmdW5jdGlvbnMuXHJcbiAqL1xyXG5jbGFzcyBVdGlsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBpc0NvbGxpc2lvbiBtZXRob2QgY2hlY2tzIGlmIHRoZXJlIGlzIGEgY29sbGlzaW9uIGJldHdlZW4gdGhlIHR3byBpbnB1dHRlZCByZWN0YW5nbGVzLiBUaGlzIGFsZ29yaXRobSBvbmx5XHJcbiAgICAgKiB3b3JrcyB3aXRoIGF4aXMtYWxpZ25lZCByZWN0YW5nbGVzLlxyXG4gICAgICogQHBhcmFtIHJlY3RhbmdsZTEgVGhlIGZpcnN0IHJlY3RhbmdsZS5cclxuICAgICAqIEBwYXJhbSByZWN0YW5nbGUyIFRoZSBzZWNvbmQgcmVjdGFuZ2xlLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgdGhlcmUgZXhpc3RzIGEgY29sbGlzaW9uIGJldHdlZW4gdGhlIHR3byBpbnB1dHRlZCByZWN0YW5nbGVzLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNDb2xsaXNpb24ocmVjdGFuZ2xlMSwgcmVjdGFuZ2xlMikge1xyXG4gICAgICAgIGlmKHJlY3RhbmdsZTEueCA8IHJlY3RhbmdsZTIueCArIHJlY3RhbmdsZTIud2lkdGggJiZcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMS54ICsgcmVjdGFuZ2xlMS53aWR0aCA+IHJlY3RhbmdsZTIueCAmJlxyXG4gICAgICAgICAgICByZWN0YW5nbGUxLnkgPCByZWN0YW5nbGUyLnkgKyByZWN0YW5nbGUyLmhlaWdodCAmJlxyXG4gICAgICAgICAgICByZWN0YW5nbGUxLnkgKyByZWN0YW5nbGUxLmhlaWdodCA+IHJlY3RhbmdsZTIueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyBpZiB0aGVyZSBhcmUgYW55IGNvbGxpc2lvbnMgYmV0d2VlbiB0aGUgdHdvIGFycmF5cy4gVGhpcyBhbGdvcml0aG0gb25seSB3b3JrcyB3aXRoXHJcbiAgICAgKiBheGlzLWFsaWduZWQgcmVjdGFuZ2xlcy5cclxuICAgICAqIEBwYXJhbSBhcnJheTEgQW4gYXJyYXkgb2YgcmVjdGFuZ2xlcy5cclxuICAgICAqIEBwYXJhbSBhcnJheTIgQW4gYXJyYXkgb2YgcmVjdGFuZ2xlcy5cclxuICAgICAqIEByZXR1cm5zIHtpbnRlZ2VyfSAtMSBpZiB0aGVyZSBhcmUgbm8gY29sbGlzaW9ucyBvciB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGFycmF5IGlmIHRoZXJlIGlzLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXJlQW55Q29sbGlzaW9ucyhhcnJheTEsIGFycmF5Mikge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcnJheTEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGFycmF5Mi5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc0NvbGxpc2lvbihhcnJheTFbaV0sIGFycmF5MltqXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhcmVBbnlDb2xsaXNpb25zSW5TYW1lQXJyYXkoYXJyYXkpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGFycmF5Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihpICE9PSBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pc0NvbGxpc2lvbihhcnJheVtpXSwgYXJyYXlbal0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYSByYW5kb20gbnVtYmVyIGluIHRoZSBnaXZlbiBpbnRlcnZhbC5cclxuICAgICAqIEBwYXJhbSBmcm9tXHJcbiAgICAgKiBAcGFyYW0gdG9cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByYW5kb21JbnRGcm9tSW50ZXJ2YWwoZnJvbSwgdG8pIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRvIC0gZnJvbSArIDEpICsgZnJvbSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXRpbDsiLCJpbXBvcnQgV2VhcG9uIGZyb20gJy4vV2VhcG9uLmpzJztcclxuXHJcbmNsYXNzIEFzc2F1bHRSaWZsZSBleHRlbmRzIFdlYXBvbntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoNSwgMzAsIC4xKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIkFzc2F1bHQgUmlmbGVcIjtcclxuICAgICAgICBzdXBlci5sb2FkU2hvb3RTb3VuZCgnQXVkaW8vUmlmbGVTaG90Lm1wMycpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEFzc2F1bHRSaWZsZTtcclxuIiwiaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xuXG5jbGFzcyBCdWxsZXR7XG4gICAgY29uc3RydWN0b3IodmVsb2NpdHksIGRhbWFnZSwgeCwgeSwgZGVzdFgsIGRlc3RZLCBwZW5ldHJhdGVzKSB7XG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2ZWxvY2l0eTtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuZGVzdFggPSBkZXN0WDtcbiAgICAgICAgdGhpcy5kZXN0WSA9IGRlc3RZO1xuICAgICAgICB0aGlzLmxpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzUGVuZXRyYXRpbmcgPSBwZW5ldHJhdGVzO1xuICAgICAgICBsZXQgZGlmZlggPSB0aGlzLmRlc3RYIC0gdGhpcy54O1xuICAgICAgICBsZXQgZGlmZlkgPSB0aGlzLmRlc3RZIC0gdGhpcy55O1xuICAgICAgICB0aGlzLmxpdmVUaW1lID0gMDtcbiAgICAgICAgLy9UaGlzIGxvZ2ljIGZpbmRzIGEgY29lZmZpY2llbnQgZm9yIFggYW5kIFkgdGhhdCBjYW4gYmUgYXBwbGllZFxuICAgICAgICAvL3RvIHRoZSBtb3ZlIGZ1bmN0aW9uIGluIG9yZGVyIHRvIG1vdmUgdGhlIGJ1bGxldCBpbiBhIHN0cmFpZ2h0IGxpbmVcbiAgICAgICAgLy9kaXJlY3RseSB0byBpdHMgZGVzdGluYXRpb24uXG4gICAgICAgIGlmKE1hdGguYWJzKGRpZmZYKSA+IE1hdGguYWJzKGRpZmZZKSkge1xuICAgICAgICAgICAgdGhpcy5jb2VmZlggPSBkaWZmWCAvIE1hdGguYWJzKGRpZmZYKTtcbiAgICAgICAgICAgIHRoaXMuY29lZmZZID0gZGlmZlkgLyBNYXRoLmFicyhkaWZmWCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvZWZmWSA9IGRpZmZZIC8gTWF0aC5hYnMoZGlmZlkpO1xuICAgICAgICAgICAgdGhpcy5jb2VmZlggPSBkaWZmWCAvIE1hdGguYWJzKGRpZmZZKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsb2FkSW1hZ2UodXJsKSB7XG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB1cmw7XG4gICAgfVxuICAgIC8vTW92ZXMgdGhlIGJ1bGxldCBmcm9tIGl0cyBzdGFydGluZyBwb2ludCAod2hpY2ggd2lsbCBiZSB0aGUgcGxheWVyJ3MgbG9jYXRpb24pXG4gICAgLy90byBpdHMgZGVzdGluYXRpb24gKHdoaWNoIHdpbGwgYmUgdGhlIGN1cnNvciBsb2NhdGlvbiB3aGVuIHRoZSBidWxsZXQgaXMgY3JlYXRlZCkuXG4gICAgLy9FYWNoIHRpbWUgbW92ZSBpcyBjYWxsZWQgaXQgaXMgY2hlY2tlZCBpZiB0aGUgYnVsbGV0IGhpdHMgYW55dGhpbmcsIGlmIGl0IGRvZXMgdGhlXG4gICAgLy9oaXRTb21ldGhpbmcgbWV0aG9kIHdpbGwgY2FsbCBhIGRhbWFnZSBmdW5jdGlvbiBhbmQgdGhlIGRhbWFnZSB3aWxsIGJlIGFwcGxpZWQsIHNvXG4gICAgLy90aGlzIGZ1bmN0aW9uIHNldHMgdGhpcy5saXZlID0gZmFsc2UgbWVhbmluZyB0aGUgYnVsbGV0IGlzIG5vIGxvbmdlciBsaXZlLlxuICAgIC8vSWYgdGhlIGJ1bGxldCBpc1BlbmV0cmF0aW5nIHRoYXQgbWVhbnMgaXQgd2lsbCBub3QgYmUgc2V0IHRvICdkZWFkJyB1cG9uIGEgY29sbGlzaW9uIHdpdGggc29tZXRoaW5nXG4gICAgLy9UaGlzIGFsbG93cyBwZW5ldHJhdGluZyBidWxsZXRzIHRvIHRyYXZlbCB0aHJvdWdoIG11bHRpcGxlIHRhcmdldHMgYW5kIHRocm91Z2ggd29ybGQgb2JqZWN0cy5cbiAgICBtb3ZlKG1vZGlmaWVyLCBlbnZpcm9ubWVudE9iamVjdHMsIGVuZW1pZXMpe1xuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcip0aGlzLmNvZWZmWDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXIqdGhpcy5jb2VmZlk7XG4gICAgICAgIHRoaXMubGl2ZVRpbWUgKz0gbW9kaWZpZXI7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubGl2ZVRpbWUpO1xuICAgICAgICBpZih0aGlzLmhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIGVuZW1pZXMpICYmIHRoaXMuaXNQZW5ldHJhdGluZyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy54IDwgMCB8fCB0aGlzLnggPiAxMDAwMCB8fCB0aGlzLnkgPCAwIHx8IHRoaXMueSA+IDU2MjUpIHtcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMubGl2ZVRpbWUgPiAuNSAmJiB0aGlzLmlzUGVuZXRyYXRpbmcgPT0gZmFsc2Upe1xuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICAvL0NoZWNrcyBpZiB0aGUgYnVsbGV0IGhpdCBhbnkgb2Ygb3VyIG9iamVjdHMgdGhhdCBjYW4gYmUgaGl0LCBpZiBzbyB0aGF0IG9iamVjdCBsb3NlcyBIUFxuICAgIC8vYW5kIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgdG8gaW5kaWNhdGUgdGhhdCB0aGUgb2JqZWN0IHdhcyBoaXQuIElmIG5vdCwgZmFsc2UgaXMgcmV0dXJuZWRcbiAgICAvL2FuZCBub3RoaW5nIGlzIGRvbmUuXG4gICAgZGFtYWdlRW5lbXkoZW5lbXlPYmplY3QpIHtcbiAgICAgICAgZW5lbXlPYmplY3QuaGVhbHRoIC09IHRoaXMuZGFtYWdlO1xuICAgIH1cblxuICAgIGRhbWFnZUVudmlyb25tZW50KGVudmlyb25tZW50T2JqZWN0KXtcbiAgICAgICAgZW52aXJvbm1lbnRPYmplY3QuaGVhbHRoIC09IHRoaXMuZGFtYWdlO1xuICAgIH1cbiAgICAvL0NoZWNrcyBpZiB3ZSBoaXQgYW4gZW52aXJvbm1lbnQgb2JqZWN0IHRoZW4gY2hlY2tzIGlmIHdlIGhpdCBhbiBlbmVteS4gaW4gZWl0aGVyIGNhc2UgaXQgY2FsbHMgdGhlXG4gICAgLy9jb3JyZXNwb25kaW5nIGRhbWFnZSBmdW5jdGlvbiBhbmQgdGhlbiByZXR1cm5zIHRydWUgdG8gaW5kaWNhdGUgdGhhdCBzb21ldGhpbmcgd2FzIGhpdCwgd2hpY2ggdGVsbHMgbW92ZSB0byBzZXQgdGhlXG4gICAgLy9idWxsZXQncyBsaXZlIHZhbHVlIGFjY29yZGluZ2x5XG4gICAgaGl0U29tZXRoaW5nKGVudmlyb25tZW50T2JqZWN0cywgZW5lbWllcykge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIGVudmlyb25tZW50T2JqZWN0c1tpXSkgJiYgZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzQmxvY2tpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZUVudmlyb25tZW50KGVudmlyb25tZW50T2JqZWN0c1tpXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVuZW1pZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgZW5lbWllc1tpXSkpe1xuICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlRW5lbXkoZW5lbWllc1tpXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnVsbGV0O1xuIiwiaW1wb3J0IEJ1bGxldCBmcm9tICcuL0J1bGxldC5qcyc7XHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbi8vVGhlIDUwIGNhbGliZXIgd2lsbCBwZW5ldHJhdGUgdGhyb3VnaCBvYmplY3RzIGFuZCBvbmx5IHN0b3BzIGJlaW5nIGxpdmVcclxuLy9vbmNlIGl0IGV4aXRzIHRoZSBjYW52YXMsIHNvIGl0cyBkYW1hZ2UgaXMgc2V0IHRvIGEgc21hbGwgbnVtYmVyIGFzIGl0IGRlYWxzXHJcbi8vZGFtYWdlIGR1cmluZyBlYWNoIGZyYW1lIGFzIGl0IHBlbmV0cmF0ZXMgdGhlIG9iamVjdCBvciBlbmVteVxyXG5jbGFzcyBCdWxsZXQxMkdhdWdlIGV4dGVuZHMgQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGRlc3RYLCBkZXN0WSkge1xyXG4gICAgICAgIHN1cGVyKDEwMDAsIDgsIHgsIHksIGRlc3RYLCBkZXN0WSwgZmFsc2UpO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL2J1bGxldDMucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEJ1bGxldDEyR2F1Z2U7XHJcbiIsImltcG9ydCBCdWxsZXQgZnJvbSAnLi9CdWxsZXQuanMnO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vL1RoZSA1MCBjYWxpYmVyIHdpbGwgcGVuZXRyYXRlIHRocm91Z2ggb2JqZWN0cyBhbmQgb25seSBzdG9wcyBiZWluZyBsaXZlXHJcbi8vb25jZSBpdCBleGl0cyB0aGUgY2FudmFzLCBzbyBpdHMgZGFtYWdlIGlzIHNldCB0byBhIHNtYWxsIG51bWJlciBhcyBpdCBkZWFsc1xyXG4vL2RhbWFnZSBkdXJpbmcgZWFjaCBmcmFtZSBhcyBpdCBwZW5ldHJhdGVzIHRoZSBvYmplY3Qgb3IgZW5lbXlcclxuY2xhc3MgQnVsbGV0NTBjYWwgZXh0ZW5kcyBCdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgZGVzdFgsIGRlc3RZKSB7XHJcbiAgICAgICAgc3VwZXIoMjUwMCwgNywgeCwgeSwgZGVzdFgsIGRlc3RZLCB0cnVlKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9idWxsZXQzLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnVsbGV0NTBjYWw7XHJcbiIsImltcG9ydCBCdWxsZXQgZnJvbSAnLi9CdWxsZXQuanMnO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vL1RoZSA1MCBjYWxpYmVyIHdpbGwgcGVuZXRyYXRlIHRocm91Z2ggb2JqZWN0cyBhbmQgb25seSBzdG9wcyBiZWluZyBsaXZlXHJcbi8vb25jZSBpdCBleGl0cyB0aGUgY2FudmFzLCBzbyBpdHMgZGFtYWdlIGlzIHNldCB0byBhIHNtYWxsIG51bWJlciBhcyBpdCBkZWFsc1xyXG4vL2RhbWFnZSBkdXJpbmcgZWFjaCBmcmFtZSBhcyBpdCBwZW5ldHJhdGVzIHRoZSBvYmplY3Qgb3IgZW5lbXlcclxuY2xhc3MgQnVsbGV0NTU2IGV4dGVuZHMgQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGRlc3RYLCBkZXN0WSkge1xyXG4gICAgICAgIHN1cGVyKDIwMDAsIDEyLCB4LCB5LCBkZXN0WCwgZGVzdFksIGZhbHNlKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9idWxsZXQzLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ1NTY7XHJcbiIsImltcG9ydCBCdWxsZXQgZnJvbSAnLi9CdWxsZXQuanMnO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcbi8vdGhlIDltbSBidWxsZXQgaXMgYSBzaW1wbGUgcGlzdG9sIGJ1bGxldCB0aGF0IHdpbGwgYmUgaW4gdGhlXHJcbi8vdXNlcidzIHN0YXJ0aW5nIHdlYXBvbi4gaXQgZG9lcyBtaW5pbWFsIGRhbWFnZSBhbmQgbW92ZXMgYXQgYSBzbG93IHNwZWVkLlxyXG4vL3RoZSB2YWx1ZSBvZiBpc1BlbmV0cmF0aW5nIGlzIHNldCB0byBmYWxzZSB0byBpbmRpY2F0ZSB0aGUgYnVsbGV0IHNob3VsZFxyXG4vL25vdCBiZSBsaXZlIGFmdGVyIGl0IGNvbGxpZGVzIHdpdGggc29tZXRoaW5nIGFuZCBkb2VzIGl0cyBkYW1hZ2UuXHJcbi8vaW4gdGhlIGZ1dHVyZSB0aGUgYnVsbGV0IHdpbGwgaGF2ZSBhIG1heGltdW0gcmFuZ2UvbGl2ZSB0aW1lIHRvXHJcbi8vbGltaXQgaXRzIHVzZWZ1bG5lc3MgbW9yZS5cclxuY2xhc3MgQnVsbGV0OW1tIGV4dGVuZHMgQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGRlc3RYLCBkZXN0WSkge1xyXG4gICAgICAgIHN1cGVyKDEwMDAsIDEwLCB4LCB5LCBkZXN0WCwgZGVzdFksIGZhbHNlKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9idWxsZXQzLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnVsbGV0OW1tO1xyXG4iLCIvL1RoZSBzbmlwZXIgaXMgb25seSBjdXJyZW50bHkgdXNlZCB0byBkZXRlcm1pbmUgdGhlIHR5cGUgb2YgYnVsbGV0IHRvIGJlIGdlbmVyYXRlZFxuLy9pbiBtYWluLmpzJyBldmVudCBoYW5kbGVyIGZvciBjbGlja3Ncbi8vSW4gdGhlIGZ1dHVyZSBpdCB3aWxsIGNvbnRyb2wgZmlyZSByYXRlIGFuZCB0aGUgYW1tbyBjYXBhY2l0eS5cbmltcG9ydCBXZWFwb24gZnJvbSAnLi9XZWFwb24uanMnO1xuXG5jbGFzcyBQaXN0b2wgZXh0ZW5kcyBXZWFwb257XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoMTUsIDkwLCAuNCk7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiUGlzdG9sXCI7XG4gICAgICAgIHN1cGVyLmxvYWRTaG9vdFNvdW5kKCdBdWRpby9QaXN0b2xTaG90Lm1wMycpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGlzdG9sO1xuIiwiaW1wb3J0IFdlYXBvbiBmcm9tICcuL1dlYXBvbi5qcyc7XHJcblxyXG5jbGFzcyBTaG90Z3VuIGV4dGVuZHMgV2VhcG9ue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcig4LCAzMiwgMSk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJTaG90Z3VuXCI7XHJcbiAgICAgICAgc3VwZXIubG9hZFNob290U291bmQoJ0F1ZGlvL1Nob3RndW5TaG90Lm1wMycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaG90Z3VuO1xyXG4iLCIvL1RoZSBzbmlwZXIgaXMgb25seSBjdXJyZW50bHkgdXNlZCB0byBkZXRlcm1pbmUgdGhlIHR5cGUgb2YgYnVsbGV0IHRvIGJlIGdlbmVyYXRlZFxyXG4vL2luIG1haW4uanMnIGV2ZW50IGhhbmRsZXIgZm9yIGNsaWNrc1xyXG4vL0luIHRoZSBmdXR1cmUgaXQgd2lsbCBjb250cm9sIGZpcmUgcmF0ZSBhbmQgdGhlIGFtbW8gY2FwYWNpdHkuXHJcbmltcG9ydCBXZWFwb24gZnJvbSAnLi9XZWFwb24uanMnO1xyXG5cclxuY2xhc3MgU25pcGVyIGV4dGVuZHMgV2VhcG9ue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcig1LCAzMCwgMS43NSk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJTbmlwZXJcIjtcclxuICAgICAgICBzdXBlci5sb2FkU2hvb3RTb3VuZCgnQXVkaW8vU25pcGVyU2hvdC5tcDMnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU25pcGVyO1xyXG4iLCIvL2NsaXBTaXplIGFuZCBhbW1vIHdpbGwgYmUgdXNlZCBhcyBleHBlY3RlZCBuZXh0IHdlZWtcbi8vYXV0b21hdGljIHdpbGwgYmUgdXNlZCBhcyBhIGJvb2xlYW4gZm9yIHdoZXRoZXIgb3Igbm90XG4vL2hvbGRpbmcgY2xpY2sgc2hvdWxkIGNvbnRpbnVvdXNseSBmaXJlLlxuLy9UaGUgbmFtZSBmaWVsZCBpcyB1c2VkIGZvciB0aGUgSFVEIGRpc3BsYXlpbmcgdGhlIGFjdGl2ZSB3ZWFwb24uXG5jbGFzcyBXZWFwb24ge1xuXG4gICAgY29uc3RydWN0b3IoY2xpcFNpemUsIG1heEFtbW8sIG1heENvb2xEb3duKSB7XG4gICAgICAgIHRoaXMuY2xpcFNpemUgPSBjbGlwU2l6ZTtcbiAgICAgICAgdGhpcy5tYXhBbW1vID0gbWF4QW1tbztcbiAgICAgICAgdGhpcy5uYW1lID0gJyc7XG4gICAgICAgIHRoaXMuY29vbGRvd24gPSAwO1xuICAgICAgICB0aGlzLm1heENvb2xEb3duID0gbWF4Q29vbERvd247XG4gICAgfVxuICAgIGxvYWRTaG9vdFNvdW5kKHVybCkge1xuICAgICAgICB0aGlzLmlzU291bmRMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zb3VuZCA9IG5ldyBBdWRpbygpO1xuICAgICAgICB0aGlzLnNvdW5kLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNTb3VuZExvYWRlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc291bmQuc3JjID0gdXJsO1xuICAgIH1cbiAgICBhZGRDb29sZG93bigpe1xuICAgICAgdGhpcy5jb29sZG93biArPSB0aGlzLm1heENvb2xEb3duO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWFwb247XG4iXX0=
