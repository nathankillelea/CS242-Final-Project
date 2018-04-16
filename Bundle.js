(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

},{"../Utilities/Util.js":16}],3:[function(require,module,exports){
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

},{"../Utilities/Util.js":16}],4:[function(require,module,exports){
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
    _this.shootAmount = 5;
    _get(MiniBoss.prototype.__proto__ || Object.getPrototypeOf(MiniBoss.prototype), "loadImage", _this).call(_this, "Graphics/MiniBoss.png");
    return _this;
  }

  return MiniBoss;
}(_Enemy3.default);

exports.default = MiniBoss;

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

},{"./Enemy.js":2}],9:[function(require,module,exports){
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

},{"./EnvironmentObject.js":11}],10:[function(require,module,exports){
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

    _get(Crate.prototype.__proto__ || Object.getPrototypeOf(Crate.prototype), "loadImage", _this).call(_this, "Graphics/Crate.png");
    return _this;
  }

  return Crate;
}(_EnvironmentObject3.default);

exports.default = Crate;

},{"./EnvironmentObject.js":11}],11:[function(require,module,exports){
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
     * The loadImage function takes in a url and loads it as an Image. Once the image is loaded, this.isImageLoaded is
     * set to true. The height and width of the EnvironmentObject are set to the height and width of the image.
     * @param url The url that should be loaded.
     */


    _createClass(EnvironmentObject, [{
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

},{}],12:[function(require,module,exports){
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

    _get(Rock.prototype.__proto__ || Object.getPrototypeOf(Rock.prototype), "loadImage", _this).call(_this, "Graphics/Rock.png");
    return _this;
  }

  return Rock;
}(_EnvironmentObject3.default);

exports.default = Rock;

},{"./EnvironmentObject.js":11}],13:[function(require,module,exports){
'use strict';

var _Bullet9mm = require('./Weapons/Bullet9mm.js');

var _Bullet9mm2 = _interopRequireDefault(_Bullet9mm);

var _Bullet50cal = require('./Weapons/Bullet50cal.js');

var _Bullet50cal2 = _interopRequireDefault(_Bullet50cal);

var _Sniper = require('./Weapons/Sniper.js');

var _Sniper2 = _interopRequireDefault(_Sniper);

var _Pistol = require('./Weapons/Pistol.js');

var _Pistol2 = _interopRequireDefault(_Pistol);

var _Util = require('./Utilities/Util.js');

var _Util2 = _interopRequireDefault(_Util);

var _World = require('./World/World.js');

var _World2 = _interopRequireDefault(_World);

var _Cursor = require('./Cursor.js');

var _Cursor2 = _interopRequireDefault(_Cursor);

var _ProjectileEnemy = require('./Enemies/ProjectileEnemy.js');

var _ProjectileEnemy2 = _interopRequireDefault(_ProjectileEnemy);

var _EnemyProjectile = require('./Enemies/EnemyProjectile');

var _EnemyProjectile2 = _interopRequireDefault(_EnemyProjectile);

var _MiniBoss = require('./Enemies/MiniBoss');

var _MiniBoss2 = _interopRequireDefault(_MiniBoss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create the canvas
/*
  Sources:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  https://stackoverflow.com/questions/4037212/html-canvas-full-screen?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  https://stackoverflow.com/questions/16919601/html5-canvas-world.camera-viewport-how-to-actally-do-it?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  http://jsfiddle.net/gfcarv/QKgHs/
 */

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

var world = new _World2.default(canvas);

//create crosshair
var cursor = new _Cursor2.default();

// Handle controls
var keysPressed = {};
var mouse = [0, 0];
//This variable would be used to tell when click is being held
//Which will be needed when automatic weapons are added
//let clicking = false;

addEventListener("keydown", function (e) {
    keysPressed[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysPressed[e.keyCode];
}, false);

addEventListener('mousemove', function (e) {
    mouse[0] = e.clientX;
    mouse[1] = e.clientY;
}, false);

addEventListener('mousedown', function (e) {
    //clicking = true;
    var wep = world.player.inventory[world.player.active_index];

    //Fire the correct bullet type for the currently equipped weapon.
    //This could be done more gracefully in the future
    if (wep instanceof _Pistol2.default) world.bullets.push(new _Bullet9mm2.default(world.player.x + world.player.width / 2, world.player.y, e.clientX + world.camera.x, e.clientY + world.camera.y));else if (wep instanceof _Sniper2.default) {
        world.bullets.push(new _Bullet50cal2.default(world.player.x + world.player.width / 2, world.player.y, e.clientX + world.camera.x, e.clientY + world.camera.y));
    }
    if (world.player.health < 0) {
        if (e.clientX > canvas.width / 2 - 100 && e.clientX < canvas.width / 2 - 100 + 200 && e.clientY > canvas.height / 2 + 25 && e.clientY < canvas.height / 2 + 25 + 100) {
            world.start(canvas);
        }
    }
});

var isCollisionWithEnvironmentObject = function isCollisionWithEnvironmentObject() {
    for (var i = 0; i < world.environmentObjects.length; i++) {
        if (_Util2.default.isCollision(world.environmentObjects[i], world.player) && world.environmentObjects[i].isBlocking) return true;
    }
    return false;
};

// Update game objects
var update = function update(modifier) {
    if (world.player.health > 0) {
        //These statements control movement with simple WASD for each direction
        if (87 in keysPressed) {
            // Player holding up
            if (world.player.y >= 0) {
                world.player.y -= world.player.speed * modifier;
                if (isCollisionWithEnvironmentObject()) {
                    world.player.y += world.player.speed * modifier;
                }
            }
        }
        if (83 in keysPressed) {
            // Player holding down
            if (world.player.y + world.player.height <= 5625) {
                world.player.y += world.player.speed * modifier;
                if (isCollisionWithEnvironmentObject()) {
                    world.player.y -= world.player.speed * modifier;
                }
            }
        }
        if (65 in keysPressed) {
            // Player holding left
            if (world.player.x >= 0) {
                world.player.x -= world.player.speed * modifier;
                if (isCollisionWithEnvironmentObject()) {
                    world.player.x += world.player.speed * modifier;
                }
            }
        }
        if (68 in keysPressed) {
            // Player holding right
            if (world.player.x + world.player.width <= 10000) {
                world.player.x += world.player.speed * modifier;
                if (isCollisionWithEnvironmentObject()) {
                    world.player.x -= world.player.speed * modifier;
                }
            }
        }
        //These controls change the active weapon with simple 1,2,3,etc controls for inventory
        if (49 in keysPressed) {
            // Player pressed 1
            world.player.active_index = 0;
        }
        if (50 in keysPressed) {
            // Player pressed 2
            world.player.active_index = 1;
        }
        for (var i = world.bullets.length - 1; i >= 0; i--) {
            world.bullets[i].move(modifier, world.environmentObjects, world.enemies);
            if (world.bullets[i].live === false) {
                world.bullets.splice(i, 1);
            }
        }
    }
    for (var _i = world.enemies.length - 1; _i >= 0; _i--) {
        world.enemies[_i].move(world.player, modifier, world.environmentObjects);
        if (world.enemies[_i].attackCooldown > 0) world.enemies[_i].attackCooldown -= 5;
        if (world.enemies[_i] instanceof _ProjectileEnemy2.default || world.enemies[_i] instanceof _MiniBoss2.default) {
            if (world.enemies[_i].shootCooldown > 0) world.enemies[_i].shootCooldown -= world.enemies[_i].shootCooldownRate;else {
                world.enemyProjectiles.push(new _EnemyProjectile2.default(world.enemies[_i].x + world.enemies[_i].width / 2, world.enemies[_i].y + world.enemies[_i].height / 2, world.player.x + world.player.width / 2, world.player.y + world.player.height / 2));
                world.enemies[_i].shootCooldown += world.enemies[_i].shootCooldownReset;
            }
        }
        if (world.enemies[_i].health <= 0) world.enemies.splice(_i, 1);
    }

    for (var _i2 = world.enemyProjectiles.length - 1; _i2 >= 0; _i2--) {
        world.enemyProjectiles[_i2].move(modifier, world.environmentObjects, world.player);
        if (world.enemyProjectiles[_i2].live === false) {
            world.enemyProjectiles.splice(_i2, 1);
        }
    }

    for (var _i3 = world.environmentObjects.length - 1; _i3 >= 0; _i3--) {
        if (world.environmentObjects[_i3].health <= 0) world.environmentObjects.splice(_i3, 1);
    }

    if (world.enemies.length === 0) {
        world.wave += 1;
        world.startWave();
    }
};

// Draw everything
var render = function render() {
    if (world.player.health < 0) {
        ctx.font = "128px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = '#FFF';
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
        ctx.fillStyle = '#000';
        ctx.strokeText("Game Over", canvas.width / 2, canvas.height / 2);
        ctx.fillStyle = '#FFF';
        ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 + 25, 200, 100);
        ctx.strokeRect(canvas.width / 2 - 100, canvas.height / 2 + 25, 200, 100);
        ctx.font = "24px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = '#000';
        ctx.fillText("Try again?", canvas.width / 2 - 100 + 100, canvas.height / 2 + 25 + 50);
    } else {
        if (world.isBackgroundLoaded) {
            world.drawBackground(ctx, canvas);
        }

        for (var i = 0; i < world.enemies.length; i++) {
            if (world.enemies[i].isImageLoaded) {
                world.enemies[i].draw(ctx, world.camera);
            }
        }

        for (var _i4 = 0; _i4 < world.environmentObjects.length; _i4++) {
            if (world.environmentObjects[_i4].isImageLoaded) {
                world.environmentObjects[_i4].draw(ctx, world.camera);
            }
        }

        //Render all the world.bullets at their locations and remove world.bullets that aren't live
        for (var _i5 = 0; _i5 < world.bullets.length; _i5++) {
            if (world.bullets[_i5].isImageLoaded && world.bullets[_i5].live) {
                world.bullets[_i5].draw(ctx, world.camera);
            }
        }

        for (var _i6 = 0; _i6 < world.enemyProjectiles.length; _i6++) {
            if (world.enemyProjectiles[_i6].isImageLoaded && world.enemyProjectiles[_i6].live) {
                world.enemyProjectiles[_i6].draw(ctx, world.camera);
            }
        }

        if (world.player.isImageLoaded) {
            world.player.draw(ctx, world.camera);
            ctx.font = "48px sans-serif";
            ctx.textAlign = "center";
            ctx.fillStyle = '#FFF';
            ctx.fillText(world.player.health + " HP", canvas.width / 2 - 290, 50);
            ctx.strokeText(world.player.health + " HP", canvas.width / 2 - 290, 50);
            ctx.fillText("Wave " + world.wave, canvas.width / 2, 50);
            ctx.strokeText("Wave " + world.wave, canvas.width / 2, 50);
            ctx.fillText(world.enemies.length + " Enemies Left", canvas.width / 2 + 350, 50);
            ctx.strokeText(world.enemies.length + " Enemies Left", canvas.width / 2 + 350, 50);
        }
        //This text displays the active weapon to the player (could be positioned better later)
        ctx.font = "48px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = '#FFF';
        ctx.fillText('Active Weapon: ' + world.player.inventory[world.player.active_index].name, canvas.width / 2 - 290, 150);
        ctx.strokeText('Active Weapon: ' + world.player.inventory[world.player.active_index].name, canvas.width / 2 - 290, 150);
    }
    ctx.drawImage(cursor.image, mouse[0] - cursor.image.width / 2, mouse[1] - cursor.image.height / 2);
};

// The main game loop
var main = function main() {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    world.camera.update();
    console.log('world.camera.x = ' + world.camera.x + '\nworld.camera.y = ' + world.camera.y);
    render();

    then = now;

    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

var then = Date.now();
main();

},{"./Cursor.js":1,"./Enemies/EnemyProjectile":3,"./Enemies/MiniBoss":5,"./Enemies/ProjectileEnemy.js":6,"./Utilities/Util.js":16,"./Weapons/Bullet50cal.js":18,"./Weapons/Bullet9mm.js":19,"./Weapons/Pistol.js":20,"./Weapons/Sniper.js":21,"./World/World.js":23}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Pistol = require('../Weapons/Pistol.js');

var _Pistol2 = _interopRequireDefault(_Pistol);

var _Sniper = require('../Weapons/Sniper.js');

var _Sniper2 = _interopRequireDefault(_Sniper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    function Player(x, y) {
        _classCallCheck(this, Player);

        this.x = x;
        this.y = y;
        this.health = 100;
        this.speed = 256;
        this.loadImage();
        var start_pistol = new _Pistol2.default();
        var start_sniper = new _Sniper2.default();
        this.inventory = [start_pistol, start_sniper];
        this.active_index = 0;
    }

    _createClass(Player, [{
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
        //Still not used yet, should be moved to each weapon or something
        /*shoot() {
          this.shootCooldown += 10;
        }*/

    }, {
        key: 'draw',
        value: function draw(ctx, camera) {
            ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
        }
    }]);

    return Player;
}();

exports.default = Player;

},{"../Weapons/Pistol.js":20,"../Weapons/Sniper.js":21}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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
        this.isPenetrating = true;
        var diffX = this.destX - this.x;
        var diffY = this.destY - this.y;
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
        //hitSoemthing method will call a damage function and the damage will be applied, so
        //this function sets this.live = false meaning the bullet is no longer live.

    }, {
        key: 'move',
        value: function move(modifier, environmentObjects, enemies) {
            this.x += this.velocity * modifier * this.coeffX;
            this.y += this.velocity * modifier * this.coeffY;
            if (this.hitSomething(environmentObjects, enemies) && this.isPenetrating == false) {
                this.live = false;
            }
            if (this.x < 0 || this.x > 10000 || this.y < 0 || this.y > 5625) {
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

},{"../Utilities/Util.js":16}],18:[function(require,module,exports){
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

        var _this = _possibleConstructorReturn(this, (Bullet50cal.__proto__ || Object.getPrototypeOf(Bullet50cal)).call(this, 2500, 5, x, y, destX, destY, true));

        _get(Bullet50cal.prototype.__proto__ || Object.getPrototypeOf(Bullet50cal.prototype), 'loadImage', _this).call(_this, "Graphics/bullet3.png");
        return _this;
    }

    return Bullet50cal;
}(_Bullet3.default);

exports.default = Bullet50cal;

},{"../Utilities/Util.js":16,"./Bullet.js":17}],19:[function(require,module,exports){
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

},{"../Utilities/Util.js":16,"./Bullet.js":17}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Weapon2 = require("./Weapon.js");

var _Weapon3 = _interopRequireDefault(_Weapon2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pistol = function (_Weapon) {
  _inherits(Pistol, _Weapon);

  function Pistol() {
    _classCallCheck(this, Pistol);

    var _this = _possibleConstructorReturn(this, (Pistol.__proto__ || Object.getPrototypeOf(Pistol)).call(this, 15, 90));

    _this.name = "Pistol";
    return _this;
  }

  return Pistol;
}(_Weapon3.default);

exports.default = Pistol;

},{"./Weapon.js":22}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Weapon2 = require("./Weapon.js");

var _Weapon3 = _interopRequireDefault(_Weapon2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sniper = function (_Weapon) {
  _inherits(Sniper, _Weapon);

  function Sniper() {
    _classCallCheck(this, Sniper);

    var _this = _possibleConstructorReturn(this, (Sniper.__proto__ || Object.getPrototypeOf(Sniper)).call(this, 5, 30));

    _this.name = "Sniper";
    return _this;
  }

  return Sniper;
}(_Weapon3.default);

exports.default = Sniper;

},{"./Weapon.js":22}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Weapon = function Weapon(clipSize, maxAmmo) {
    _classCallCheck(this, Weapon);

    this.clipSize = clipSize;
    this.maxAmmo = maxAmmo;
    //this.automatic = automatic;
    //this.bullet = bullet;
    this.name = '';
};

exports.default = Weapon;

},{}],23:[function(require,module,exports){
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

var _Player = require("../Players/Player");

var _Player2 = _interopRequireDefault(_Player);

var _Camera = require("../Players/Camera");

var _Camera2 = _interopRequireDefault(_Camera);

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
            this.player = new _Player2.default(canvas.width / 2, canvas.height / 2);
            this.camera = new _Camera2.default(0, 0, canvas.width, canvas.height, 10000, 5625);
            this.camera.follow(this.player, canvas.width / 2, canvas.height / 2);
            this.enemies = [];
            this.environmentObjects = [];
            this.bullets = [];
            this.enemyProjectiles = [];
            this.wave = 1;
            this.initializeEnvironment();
            this.startWave();
        }

        /**
         * This function initializes the environment by pushing environment objects onto the environmentObjects array.
         */

    }, {
        key: "initializeEnvironment",
        value: function initializeEnvironment() {
            this.environmentObjects.push(new _Crate2.default(200, 400));
            this.environmentObjects.push(new _Bush2.default(20, 100));
            this.environmentObjects.push(new _Rock2.default(900, 20));
            this.environmentObjects.push(new _Rock2.default(9500, 20));
            this.environmentObjects.push(new _Rock2.default(20, 5250));
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

            for (var i = 0; i < lightEnemyCap; i++) {
                this.enemies.push(new _LightEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i = 0; _i < regularEnemyCap; _i++) {
                this.enemies.push(new _RegularEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i2 = 0; _i2 < tankEnemyCap; _i2++) {
                this.enemies.push(new _TankEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i3 = 0; _i3 < projectileEnemyCap; _i3++) {
                this.enemies.push(new _ProjectileEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i4 = 0; _i4 < miniBossCap; _i4++) {
                this.enemies.push(new _MiniBoss2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }var collisionFlag = true;
            while (collisionFlag === true) {
                var _i5 = _Util2.default.areAnyCollisions(this.enemies, this.environmentObjects);
                if (_i5 === -1) collisionFlag = false;else this.enemies[_i5].setPosition(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375));
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

},{"../Enemies/LightEnemy":4,"../Enemies/MiniBoss":5,"../Enemies/ProjectileEnemy":6,"../Enemies/RegularEnemy":7,"../Enemies/TankEnemy":8,"../EnvironmentObjects/Bush":9,"../EnvironmentObjects/Crate":10,"../EnvironmentObjects/Rock":12,"../Players/Camera":14,"../Players/Player":15,"../Utilities/Util":16}]},{},[13])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDdXJzb3IuanMiLCJFbmVtaWVzL0VuZW15LmpzIiwiRW5lbWllcy9FbmVteVByb2plY3RpbGUuanMiLCJFbmVtaWVzL0xpZ2h0RW5lbXkuanMiLCJFbmVtaWVzL01pbmlCb3NzLmpzIiwiRW5lbWllcy9Qcm9qZWN0aWxlRW5lbXkuanMiLCJFbmVtaWVzL1JlZ3VsYXJFbmVteS5qcyIsIkVuZW1pZXMvVGFua0VuZW15LmpzIiwiRW52aXJvbm1lbnRPYmplY3RzL0J1c2guanMiLCJFbnZpcm9ubWVudE9iamVjdHMvQ3JhdGUuanMiLCJFbnZpcm9ubWVudE9iamVjdHMvRW52aXJvbm1lbnRPYmplY3QuanMiLCJFbnZpcm9ubWVudE9iamVjdHMvUm9jay5qcyIsIk1haW4uanMiLCJQbGF5ZXJzL0NhbWVyYS5qcyIsIlBsYXllcnMvUGxheWVyLmpzIiwiVXRpbGl0aWVzL1V0aWwuanMiLCJXZWFwb25zL0J1bGxldC5qcyIsIldlYXBvbnMvQnVsbGV0NTBjYWwuanMiLCJXZWFwb25zL0J1bGxldDltbS5qcyIsIldlYXBvbnMvUGlzdG9sLmpzIiwiV2VhcG9ucy9TbmlwZXIuanMiLCJXZWFwb25zL1dlYXBvbi5qcyIsIldvcmxkL1dvcmxkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FNLE07QUFDRixzQkFBYztBQUFBOztBQUNWLGFBQUssU0FBTDtBQUNIOzs7O29DQUVXO0FBQUE7O0FBQ1IsaUJBQUssYUFBTCxHQUFxQixLQUFyQjtBQUNBLGlCQUFLLEtBQUwsR0FBYSxJQUFJLEtBQUosRUFBYjtBQUNBLGlCQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLFlBQU07QUFDdEIsc0JBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNILGFBRkQ7QUFHQSxpQkFBSyxLQUFMLENBQVcsR0FBWCxHQUFpQix3QkFBakI7QUFDSDs7Ozs7O2tCQUVVLE07Ozs7Ozs7OztxakJD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KXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY2xhc3MgQ3Vyc29yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEltYWdlKCkge1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gXCJHcmFwaGljcy9jcm9zc2hhaXIucG5nXCI7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQ3Vyc29yOyIsIi8qKlxyXG4gKiBTb3VyY2VzOlxyXG4gKiBodHRwczovL21lZGl1bS5jb20vQHl1cmliZXR0L2phdmFzY3JpcHQtYWJzdHJhY3QtbWV0aG9kLXdpdGgtZXM2LTVkYmVhNGIwMDAyN1xyXG4gKiBodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PUk1ZEFScEFQbE5rXHJcbiAqL1xyXG5cclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBFbmVteSBjbGFzcyBpcyB0aGUgcGFyZW50IGNsYXNzIGZvciBhbGwgb2YgdGhlIGVuZW1pZXMuXHJcbiAqL1xyXG5jbGFzcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gdmVsb2NpdHkgVGhlIHZlbG9jaXR5IG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSBoZWFsdGggVGhlIGhlYWx0aCBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gZGFtYWdlIFRoZSBkYW1hZ2Ugb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHBvaW50c09uS2lsbCBUaGUgcG9pbnRzIHJld2FyZGVkIGZvciBraWxsaW5nIHRoZSBFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgdmVsb2NpdHksIGhlYWx0aCwgZGFtYWdlLCBwb2ludHNPbktpbGwpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy5hbmdsZSA9IE1hdGguUEkvMjtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdmVsb2NpdHk7XHJcbiAgICAgICAgdGhpcy5oZWFsdGggPSBoZWFsdGg7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgdGhpcy5wb2ludHNPbktpbGwgPSBwb2ludHNPbktpbGw7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tDb29sZG93biA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbG9hZEltYWdlIGZ1bmN0aW9uIHRha2VzIGluIGEgdXJsIGFuZCBsb2FkcyBpdCBhcyBhbiBJbWFnZS4gT25jZSB0aGUgaW1hZ2UgaXMgbG9hZGVkLCB0aGlzLmlzSW1hZ2VMb2FkZWQgaXNcclxuICAgICAqIHNldCB0byB0cnVlLiBUaGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgRW5lbXkgYXJlIHNldCB0byB0aGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgaW1hZ2UuXHJcbiAgICAgKiBAcGFyYW0gdXJsIFRoZSB1cmwgdGhhdCBzaG91bGQgYmUgbG9hZGVkLlxyXG4gICAgICovXHJcbiAgICBsb2FkSW1hZ2UodXJsKSB7XHJcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGF0dGFjayBmdW5jdGlvbiB0YWtlcyBpbiBhbiBvYmplY3QgYW5kIHJlbW92ZXMgdGhlIGFtb3VudCBvZiBkYW1hZ2UgdGhlIEVuZW15IGRlYWxzIGZyb20gdGhlaXIgaGVhbHRoLlxyXG4gICAgICogNTAwIGlzIGFkZGVkIHRvIHRoZSBhdHRhY2sgY29vbGRvd24gb2YgdGhlIGVuZW15IGFmdGVyIGFuIGF0dGFjay5cclxuICAgICAqIEBwYXJhbSBvYmplY3QgVGhlIG9iamVjdCB0aGF0IGlzIGJlaW5nIGF0dGFja2VkLlxyXG4gICAgICovXHJcbiAgICBhdHRhY2sob2JqZWN0KSB7XHJcbiAgICAgICAgb2JqZWN0LmhlYWx0aCAtPSB0aGlzLmRhbWFnZTtcclxuICAgICAgICB0aGlzLmF0dGFja0Nvb2xkb3duICs9IDUwMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1vdmVzIHRoZSBlbmVteSB0b3dhcmRzIHRoZSBwbGF5ZXIuXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIFRoZSBwbGF5ZXIgb2JqZWN0IHRvIG1vdmUgdG93YXJkcy5cclxuICAgICAqIEBwYXJhbSBtb2RpZmllciBUaGUgbW9kaWZpZXIgdG8gYmUgbXVsdGlwbGllZCBieSB0aGUgdmVsb2NpdHkuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3RzIEFuIGFycmF5IG9mIGVudmlyb25tZW50IG9iamVjdHMuXHJcbiAgICAgKi9cclxuICAgIG1vdmUocGxheWVyLCBtb2RpZmllciwgZW52aXJvbm1lbnRPYmplY3RzKSB7XHJcbiAgICAgICAgbGV0IGRpZmZYID0gcGxheWVyLnggLSB0aGlzLng7XHJcbiAgICAgICAgbGV0IGRpZmZZID0gcGxheWVyLnkgLSB0aGlzLnk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IE1hdGguc3FydChkaWZmWCAqIGRpZmZYICsgZGlmZlkgKiBkaWZmWSk7XHJcbiAgICAgICAgaWYobGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGRpZmZYIC89IGxlbmd0aDtcclxuICAgICAgICAgICAgZGlmZlkgLz0gbGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hbmdsZSA9IE1hdGguYXRhbjIoZGlmZlksIGRpZmZYKTtcclxuXHJcbiAgICAgICAgaWYoZGlmZlggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMueCArIHRoaXMud2lkdGggPD0gMTAwMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdChlbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54IC09IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihkaWZmWCA8IDApIHtcclxuICAgICAgICAgICAgaWYodGhpcy54ID49IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdChlbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGlmZlkgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMueSArIHRoaXMuaGVpZ2h0IDw9IDU2MjUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdChlbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55IC09IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihkaWZmWSA8IDApIHtcclxuICAgICAgICAgICAgaWYodGhpcy55ID49IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueSAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdChlbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgcGxheWVyKSAmJiB0aGlzLmF0dGFja0Nvb2xkb3duID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVhbHRoIGJlZm9yZSBhdHRhY2tcIiArIHBsYXllci5oZWFsdGgpO1xyXG4gICAgICAgICAgICB0aGlzLmF0dGFjayhwbGF5ZXIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlYWx0aCBhZnRlciBhdHRhY2tcIiArIHBsYXllci5oZWFsdGgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gc2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGVuZW15IGdpdmVuIHggYW5kIHkuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiB0byBiZSBzZXQuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiB0byBiZSBzZXQuXHJcbiAgICAgKi9cclxuICAgIHNldFBvc2l0aW9uKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGEgaGVscGVyIGZ1bmN0aW9uIHVzZWQgYnkgdGhlIG1vdmUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIHRoZXJlIGlzIGEgY29sbGlzaW9uIGJldHdlZW4gYW5cclxuICAgICAqIGVudmlyb25tZW50IG9iamVjdCBhbmQgdGhlIGVuZW15LiBJZiB0aGVyZSBpcyBhIGNvbGxpc2lvbiwgdGhlIG9iamVjdCBpcyBhdHRhY2tlZC5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdHMgQW4gYXJyYXkgb2YgZW52aXJvbm1lbnQgb2JqZWN0cy5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIGEgY29sbGlzaW9uIGV4aXN0cy5cclxuICAgICAqL1xyXG4gICAgaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIGVudmlyb25tZW50T2JqZWN0c1tpXSkgJiYgZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzQmxvY2tpbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYXR0YWNrQ29vbGRvd24gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFjayhlbnZpcm9ubWVudE9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRyYXcgZnVuY3Rpb24gZHJhd3MgdGhlIGltYWdlIG9uIHRoZSBjYW52YXMgYXQgdGhlIHggYW5kIHkgcG9zaXRpb24gb2YgdGhlIExpZ2h0RW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gY3R4IFRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gY2FtZXJhIFRoZSBjYW1lcmEgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XHJcbiAgICAgICAgLy9jdHguc2F2ZSgpO1xyXG4gICAgICAgIC8vY3R4LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgLy9jdHgucm90YXRlKHRoaXMuYW5nbGUgKyBNYXRoLlBJLzIuMCk7XHJcbiAgICAgICAgLy9jdHgudHJhbnNsYXRlKC10aGlzLngsIC10aGlzLnkpO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcclxuICAgICAgICAvL2N0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVuZW15OyIsImltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgRW5lbXlQcm9qZWN0aWxlIGNsYXNzIGlzIHRoZSBvYmplY3QgdGhhdCBpcyBmaXJlZCBmcm9tIHRoZSBQcm9qZWN0aWxlRW5lbXkgZW5lbXkuXHJcbiAqL1xyXG5jbGFzcyBFbmVteVByb2plY3RpbGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEVuZW15UHJvamVjdGlsZSBjbGFzcyBhbmQgZ2V0cyB0aGUgeCBhbmQgeSBjb2VmZmljaWVudHMgZm9yIHVzZVxyXG4gICAgICogaW4gdGhlIG1vdmUgZnVuY3Rpb24uIFRoZSBsb2FkSW1hZ2UgZnVuY3Rpb24gaXMgYWxzbyBjYWxsZWQuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBkZXN0WCBUaGUgeCBkZXN0aW5hdGlvbiBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIGRlc3RZIFRoZSB5IGRlc3RpbmF0aW9uIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGRlc3RYLCBkZXN0WSkge1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSA2MDA7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSA1O1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLmxpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBkaWZmWCA9IGRlc3RYIC0gdGhpcy54O1xyXG4gICAgICAgIGxldCBkaWZmWSA9IGRlc3RZIC0gdGhpcy55O1xyXG4gICAgICAgIGlmKE1hdGguYWJzKGRpZmZYKSA+IE1hdGguYWJzKGRpZmZZKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvZWZmWCA9IGRpZmZYIC8gTWF0aC5hYnMoZGlmZlgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvZWZmWSA9IGRpZmZZIC8gTWF0aC5hYnMoZGlmZlgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb2VmZlkgPSBkaWZmWSAvIE1hdGguYWJzKGRpZmZZKTtcclxuICAgICAgICAgICAgdGhpcy5jb2VmZlggPSBkaWZmWCAvIE1hdGguYWJzKGRpZmZZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gbW92ZXMgdGhlIEVuZW15UHJvamVjdGlsZSBhY2NvcmRpbmcgdG8gdGhlIHggYW5kIHkgY29lZmZpY2llbnRzLlxyXG4gICAgICogQHBhcmFtIG1vZGlmaWVyIFRoZSBtb2RpZmllciB0byBiZSBtdWx0aXBsaWVkIGJ5IHRoZSB2ZWxvY2l0eS5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdHMgVGhlIGFycmF5IG9mIGVudmlyb25tZW50IG9iamVjdHMuXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIFRoZSBwbGF5ZXIgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBtb3ZlKG1vZGlmaWVyLCBlbnZpcm9ubWVudE9iamVjdHMsIHBsYXllcikge1xyXG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyKnRoaXMuY29lZmZYO1xyXG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyKnRoaXMuY29lZmZZO1xyXG4gICAgICAgIGlmKHRoaXMuaGl0U29tZXRoaW5nKGVudmlyb25tZW50T2JqZWN0cywgcGxheWVyKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy54IDwgMCB8fCB0aGlzLnggPiAxMDAwMCB8fCB0aGlzLnkgPCAwIHx8IHRoaXMueSA+IDU2MjUpe1xyXG4gICAgICAgICAgICB0aGlzLmxpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGF3YXkgaGVhbHRoIGZyb20gdGhlIHBsYXllciBlcXVhbCB0byB0aGUgZGFtYWdlIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIFRoZSBwbGF5ZXIgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBkYW1hZ2VQbGF5ZXIocGxheWVyKSB7XHJcbiAgICAgICAgcGxheWVyLmhlYWx0aCAtPSB0aGlzLmRhbWFnZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYXdheSBoZWFsdGggZnJvbSB0aGUgZW52aXJvbm1lbnQgb2JqZWN0IGVxdWFsIHRvIHRoZSBkYW1hZ2Ugb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdCBUaGUgZW52aXJvbm1lbnQgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBkYW1hZ2VFbnZpcm9ubWVudChlbnZpcm9ubWVudE9iamVjdCl7XHJcbiAgICAgICAgZW52aXJvbm1lbnRPYmplY3QuaGVhbHRoIC09IHRoaXMuZGFtYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgYW4gZW52aXJvbm1lbnQgb2JqZWN0IG9yIGEgcGxheWVyIHdlcmUgaGl0IGJ5IHRoZSBwcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0cyBUaGUgYXJyYXkgb2YgZW52aXJvbm1lbnQgb2JqZWN0cy5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3Qgc29tZXRoaW5nIHdhcyBoaXQuXHJcbiAgICAgKi9cclxuICAgIGhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIHBsYXllcikge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbnZpcm9ubWVudE9iamVjdHNbaV0pICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZUVudmlyb25tZW50KGVudmlyb25tZW50T2JqZWN0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIHBsYXllcikpe1xyXG4gICAgICAgICAgICB0aGlzLmRhbWFnZVBsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiBsb2FkcyB0aGUgdXJsIGFzIGFuIEltYWdlLiBPbmNlIHRoZSBpbWFnZSBpcyBsb2FkZWQsIHRoaXMuaXNJbWFnZUxvYWRlZCBpc1xyXG4gICAgICogc2V0IHRvIHRydWUuIFRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBFbmVteVByb2plY3RpbGUgYXJlIHNldCB0byB0aGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgaW1hZ2UuXHJcbiAgICAgKi9cclxuICAgIGxvYWRJbWFnZSgpIHtcclxuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBcIkdyYXBoaWNzL0VuZW15UHJvamVjdGlsZS5wbmdcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkcmF3IGZ1bmN0aW9uIGRyYXdzIHRoZSBpbWFnZSBvbiB0aGUgY2FudmFzIGF0IHRoZSB4IGFuZCB5IHBvc2l0aW9uIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gY3R4IFRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gY2FtZXJhIFRoZSBjYW1lcmEgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFbmVteVByb2plY3RpbGU7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBMaWdodEVuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBpcyBhIGZhc3QgZW5lbXkgd2l0aCBsb3cgaGVhbHRoLlxyXG4gKi9cclxuY2xhc3MgTGlnaHRFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBMaWdodEVuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byAxMjgsIHRoZSBoZWFsdGggc2V0IHRvIDEwLCB0aGUgZGFtYWdlIHNldCB0byAxMCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byA1MC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBMaWdodEVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIExpZ2h0RW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAxMjgsIDEwLCAxMCwgNTApO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0xpZ2h0RW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaWdodEVuZW15OyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgTWluaUJvc3MgY2xhc3MgZXh0ZW5kcyB0aGUgRW5lbXkgY2xhc3MuIEl0IGlzIGEgaGlnaCBoZWFsdGggYW5kIGRhbWFnZSBlbmVteS5cclxuICovXHJcbmNsYXNzIE1pbmlCb3NzIGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIE1pbmlCb3NzLiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byAxMjgsIHRoZSBoZWFsdGggc2V0IHRvIDUwMCwgdGhlIGRhbWFnZSBzZXQgdG8gNTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gMTAwMC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBNaW5pQm9zcy5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBNaW5pQm9zcy5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDEyOCwgNTAwLCA1MCwgMTAwMCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duID0gMjAwO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJhdGUgPSAxO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJlc2V0ID0gMjAwO1xyXG4gICAgICAgIHRoaXMuc2hvb3RBbW91bnQgPSA1O1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL01pbmlCb3NzLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWluaUJvc3M7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQcm9qZWN0aWxlRW5lbXkgY2xhc3MgZXh0ZW5kcyB0aGUgZW5lbXkgY2xhc3MuIEl0IGNhbiBzaG9vdCBwcm9qZWN0aWxlcyBhdCB0aGUgcGxheWVyLlxyXG4gKi9cclxuY2xhc3MgUHJvamVjdGlsZUVuZW15IGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFByb2plY3RpbGVFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gOTYsIHRoZSBoZWFsdGggc2V0IHRvIDQwLCB0aGUgZGFtYWdlIHNldCB0byAxMCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byAyNTAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgUHJvamVjdGlsZUVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFByb2plY3RpbGVFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDk2LCA0MCwgMTAsIDI1MCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duID0gMzAwO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJhdGUgPSAxO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJlc2V0ID0gMzAwO1xyXG4gICAgICAgIHRoaXMuc2hvb3RBbW91bnQgPSAxO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1Byb2plY3RpbGVFbmVteS5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2plY3RpbGVFbmVteTsiLCJpbXBvcnQgRW5lbXkgZnJvbSAnLi9FbmVteS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIFJlZ3VsYXJFbmVteSBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaGFzIGJhbGFuY2VkIHN0YXRzIGFjcm9zcyB0aGUgYm9hcmQuXHJcbiAqL1xyXG5jbGFzcyBSZWd1bGFyRW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgUmVndWxhckVuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byA2NCwgdGhlIGhlYWx0aCBzZXQgdG8gMjUsIHRoZSBkYW1hZ2Ugc2V0IHRvIDEwLCBhbmQgdGhlIHBvaW50c09uS2lsbFxyXG4gICAgICogc2V0IHRvIDEwMC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBSZWd1bGFyRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgUmVndWxhckVuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgNjQsIDI1LCAxMCwgMTAwKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9SZWd1bGFyRW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWd1bGFyRW5lbXk7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBUYW5rRW5lbXkgY2xhc3MgZXh0ZW5kcyB0aGUgRW5lbXkgY2xhc3MuIEl0IGlzIGEgc2xvdyBlbmVteSB3aXRoIGhpZ2ggaGVhbHRoIGFuZCBkYW1hZ2UuXHJcbiAqL1xyXG5jbGFzcyBUYW5rRW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgVGFua0VuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byAzMiwgdGhlIGhlYWx0aCBzZXQgdG8gMTAwLCB0aGUgZGFtYWdlIHNldCB0byAyNSwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byA1MDAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgVGFua0VuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFRhbmtFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDMyLCAxMDAsICAyNSwgNTAwKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9UYW5rRW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYW5rRW5lbXk7IiwiaW1wb3J0IEVudmlyb25tZW50T2JqZWN0IGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3QuanMnO1xuXG4vKipcbiAqIFRoZSBCdXNoIGNsYXNzIGV4dGVuZHMgdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzLiBJdCBpcyBhIG5vbi1ibG9ja2luZyBvYmplY3QuXG4gKi9cbmNsYXNzIEJ1c2ggZXh0ZW5kcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgQnVzaC4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzZXMgY29uc3RydWN0b3JcbiAgICAgKiB3aXRoIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgaGVhbHRoIHNldCB0byAxMDAwMDAsIGFuZCBpc0Jsb2NraW5nIHNldCB0byBmYWxzZS5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgQnVzaC5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgQnVzaC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHN1cGVyKHgsIHksIDEwMDAwMCwgZmFsc2UpO1xuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9CdXNoLnBuZ1wiKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1c2g7IiwiaW1wb3J0IEVudmlyb25tZW50T2JqZWN0IGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3QuanMnO1xuXG4vKipcbiAqIFRoZSBDcmF0ZSBjbGFzcyBleHRlbmRzIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzcy4gSXQgaXMgYSBibG9ja2luZyBvYmplY3Qgd2l0aCBsb3cgaGVhbHRoLlxuICovXG5jbGFzcyBDcmF0ZSBleHRlbmRzIEVudmlyb25tZW50T2JqZWN0IHtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBDcmF0ZS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzZXMgY29uc3RydWN0b3JcbiAgICAgKiB3aXRoIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgaGVhbHRoIHNldCB0byAxMDAsIGFuZCBpc0Jsb2NraW5nIHNldCB0byB0cnVlLlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBDcmF0ZS5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgQ3JhdGUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICBzdXBlcih4LCB5LCAxMDAsIHRydWUpO1xuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9DcmF0ZS5wbmdcIik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDcmF0ZTtcbiIsIi8qKlxuICogVGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzIGlzIHRoZSBwYXJlbnQgZm9yIGFsbCBlbnZpcm9ubWVudCBvYmplY3RzLlxuICovXG5jbGFzcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0gaGVhbHRoIFRoZSBoZWFsdGggb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSBpc0Jsb2NraW5nIFdoZXRoZXIgdGhlIEVudmlyb25tZW50T2JqZWN0IGNhbiBiZSB3YWxrZWQgdGhyb3VnaC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBoZWFsdGgsIGlzQmxvY2tpbmcpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5oZWFsdGggPSBoZWFsdGg7XG4gICAgICAgIHRoaXMuaXNCbG9ja2luZyA9IGlzQmxvY2tpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiB0YWtlcyBpbiBhIHVybCBhbmQgbG9hZHMgaXQgYXMgYW4gSW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0ltYWdlTG9hZGVkIGlzXG4gICAgICogc2V0IHRvIHRydWUuIFRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdCBhcmUgc2V0IHRvIHRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBpbWFnZS5cbiAgICAgKiBAcGFyYW0gdXJsIFRoZSB1cmwgdGhhdCBzaG91bGQgYmUgbG9hZGVkLlxuICAgICAqL1xuICAgIGxvYWRJbWFnZSh1cmwpIHtcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZHJhdyBmdW5jdGlvbiBkcmF3cyB0aGUgaW1hZ2Ugb24gdGhlIGNhbnZhcyBhdCB0aGUgeCBhbmQgeSBwb3NpdGlvbiBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIGN0eCBUaGUgY29udGV4dCBvZiB0aGUgY2FudmFzLlxuICAgICAqIEBwYXJhbSBjYW1lcmEgVGhlIGNhbWVyYSBvYmplY3QuXG4gICAgICovXG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbnZpcm9ubWVudE9iamVjdDsiLCJpbXBvcnQgRW52aXJvbm1lbnRPYmplY3QgZnJvbSAnLi9FbnZpcm9ubWVudE9iamVjdC5qcyc7XG5cbi8qKlxuICogVGhlIFJvY2sgY2xhc3MgZXh0ZW5kcyB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3MuIEl0IGlzIGEgYmxvY2tpbmcgb2JqZWN0IHdpdGggaGlnaCBoZWFsdGguXG4gKi9cbmNsYXNzIFJvY2sgZXh0ZW5kcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgUm9jay4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzZXMgY29uc3RydWN0b3JcbiAgICAgKiB3aXRoIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgaGVhbHRoIHNldCB0byAzMDAsIGFuZCBpc0Jsb2NraW5nIHNldCB0byB0cnVlLlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBSb2NrLlxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBSb2NrLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgMzAwLCB0cnVlKTtcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvUm9jay5wbmdcIik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb2NrO1xuIiwiLypcbiAgU291cmNlczpcbiAgaHR0cDovL3d3dy5sb3N0ZGVjYWRlZ2FtZXMuY29tL2hvdy10by1tYWtlLWEtc2ltcGxlLWh0bWw1LWNhbnZhcy1nYW1lL1xuICBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80MDM3MjEyL2h0bWwtY2FudmFzLWZ1bGwtc2NyZWVuP3V0bV9tZWRpdW09b3JnYW5pYyZ1dG1fc291cmNlPWdvb2dsZV9yaWNoX3FhJnV0bV9jYW1wYWlnbj1nb29nbGVfcmljaF9xYVxuICBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjkxOTYwMS9odG1sNS1jYW52YXMtd29ybGQuY2FtZXJhLXZpZXdwb3J0LWhvdy10by1hY3RhbGx5LWRvLWl0P3V0bV9tZWRpdW09b3JnYW5pYyZ1dG1fc291cmNlPWdvb2dsZV9yaWNoX3FhJnV0bV9jYW1wYWlnbj1nb29nbGVfcmljaF9xYVxuICBodHRwOi8vanNmaWRkbGUubmV0L2dmY2Fydi9RS2dIcy9cbiAqL1xuXG5pbXBvcnQgQnVsbGV0OW1tIGZyb20gJy4vV2VhcG9ucy9CdWxsZXQ5bW0uanMnO1xuaW1wb3J0IEJ1bGxldDUwY2FsIGZyb20gJy4vV2VhcG9ucy9CdWxsZXQ1MGNhbC5qcyc7XG5pbXBvcnQgU25pcGVyIGZyb20gJy4vV2VhcG9ucy9TbmlwZXIuanMnO1xuaW1wb3J0IFBpc3RvbCBmcm9tICcuL1dlYXBvbnMvUGlzdG9sLmpzJztcbmltcG9ydCBVdGlsIGZyb20gJy4vVXRpbGl0aWVzL1V0aWwuanMnO1xuaW1wb3J0IFdvcmxkIGZyb20gJy4vV29ybGQvV29ybGQuanMnO1xuaW1wb3J0IEN1cnNvciBmcm9tICcuL0N1cnNvci5qcyc7XG5pbXBvcnQgUHJvamVjdGlsZUVuZW15IGZyb20gJy4vRW5lbWllcy9Qcm9qZWN0aWxlRW5lbXkuanMnO1xuaW1wb3J0IEVuZW15UHJvamVjdGlsZSBmcm9tIFwiLi9FbmVtaWVzL0VuZW15UHJvamVjdGlsZVwiO1xuaW1wb3J0IE1pbmlCb3NzIGZyb20gJy4vRW5lbWllcy9NaW5pQm9zcyc7XG5cbi8vIENyZWF0ZSB0aGUgY2FudmFzXG5sZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbmxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG5sZXQgd29ybGQgPSBuZXcgV29ybGQoY2FudmFzKTtcblxuLy9jcmVhdGUgY3Jvc3NoYWlyXG5sZXQgY3Vyc29yID0gbmV3IEN1cnNvcigpO1xuXG4vLyBIYW5kbGUgY29udHJvbHNcbmxldCBrZXlzUHJlc3NlZCA9IHt9O1xubGV0IG1vdXNlID0gWzAsMF07XG4vL1RoaXMgdmFyaWFibGUgd291bGQgYmUgdXNlZCB0byB0ZWxsIHdoZW4gY2xpY2sgaXMgYmVpbmcgaGVsZFxuLy9XaGljaCB3aWxsIGJlIG5lZWRlZCB3aGVuIGF1dG9tYXRpYyB3ZWFwb25zIGFyZSBhZGRlZFxuLy9sZXQgY2xpY2tpbmcgPSBmYWxzZTtcblxuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcbiAgICBrZXlzUHJlc3NlZFtlLmtleUNvZGVdID0gdHJ1ZTtcbn0sIGZhbHNlKTtcblxuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG4gICAgZGVsZXRlIGtleXNQcmVzc2VkW2Uua2V5Q29kZV07XG59LCBmYWxzZSk7XG5cbmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XG4gICAgbW91c2VbMF0gPSBlLmNsaWVudFg7XG4gICAgbW91c2VbMV0gPSBlLmNsaWVudFk7XG59LCBmYWxzZSk7XG5cbmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG4gICAgLy9jbGlja2luZyA9IHRydWU7XG4gICAgbGV0IHdlcCA9IHdvcmxkLnBsYXllci5pbnZlbnRvcnlbd29ybGQucGxheWVyLmFjdGl2ZV9pbmRleF07XG5cbiAgICAvL0ZpcmUgdGhlIGNvcnJlY3QgYnVsbGV0IHR5cGUgZm9yIHRoZSBjdXJyZW50bHkgZXF1aXBwZWQgd2VhcG9uLlxuICAgIC8vVGhpcyBjb3VsZCBiZSBkb25lIG1vcmUgZ3JhY2VmdWxseSBpbiB0aGUgZnV0dXJlXG4gICAgaWYod2VwIGluc3RhbmNlb2YgUGlzdG9sIClcbiAgICAgIHdvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0OW1tKHdvcmxkLnBsYXllci54ICsgd29ybGQucGxheWVyLndpZHRoLzIsIHdvcmxkLnBsYXllci55LCBlLmNsaWVudFgrd29ybGQuY2FtZXJhLngsIGUuY2xpZW50WSt3b3JsZC5jYW1lcmEueSkpO1xuICAgIGVsc2UgaWYod2VwIGluc3RhbmNlb2YgU25pcGVyKXtcbiAgICAgIHdvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0NTBjYWwod29ybGQucGxheWVyLnggKyB3b3JsZC5wbGF5ZXIud2lkdGgvMiwgd29ybGQucGxheWVyLnksIGUuY2xpZW50WCt3b3JsZC5jYW1lcmEueCwgZS5jbGllbnRZK3dvcmxkLmNhbWVyYS55KSk7XG4gICAgfVxuICAgIGlmKHdvcmxkLnBsYXllci5oZWFsdGggPCAwKSB7XG4gICAgICAgIGlmKGUuY2xpZW50WCA+IGNhbnZhcy53aWR0aC8yIC0gMTAwICYmIGUuY2xpZW50WCA8IChjYW52YXMud2lkdGgvMiAtIDEwMCsyMDApXG4gICAgICAgICAgICAmJiBlLmNsaWVudFkgPiBjYW52YXMuaGVpZ2h0LzIgKyAyNSAmJiBlLmNsaWVudFkgPCBjYW52YXMuaGVpZ2h0LzIgKyAyNSArIDEwMCkge1xuICAgICAgICAgICAgd29ybGQuc3RhcnQoY2FudmFzKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5sZXQgaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3JsZC5lbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKFV0aWwuaXNDb2xsaXNpb24od29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLCB3b3JsZC5wbGF5ZXIpICYmIHdvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbi8vIFVwZGF0ZSBnYW1lIG9iamVjdHNcbmxldCB1cGRhdGUgPSAobW9kaWZpZXIpID0+IHtcbiAgICBpZih3b3JsZC5wbGF5ZXIuaGVhbHRoID4gMCkge1xuICAgICAgLy9UaGVzZSBzdGF0ZW1lbnRzIGNvbnRyb2wgbW92ZW1lbnQgd2l0aCBzaW1wbGUgV0FTRCBmb3IgZWFjaCBkaXJlY3Rpb25cbiAgICAgICAgaWYgKDg3IGluIGtleXNQcmVzc2VkKSB7IC8vIFBsYXllciBob2xkaW5nIHVwXG4gICAgICAgICAgICBpZih3b3JsZC5wbGF5ZXIueSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgd29ybGQucGxheWVyLnkgLT0gd29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XG4gICAgICAgICAgICAgICAgaWYoaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoKSkge1xuICAgICAgICAgICAgICAgICAgICB3b3JsZC5wbGF5ZXIueSArPSB3b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKDgzIGluIGtleXNQcmVzc2VkKSB7IC8vIFBsYXllciBob2xkaW5nIGRvd25cbiAgICAgICAgICAgIGlmKHdvcmxkLnBsYXllci55ICsgd29ybGQucGxheWVyLmhlaWdodCA8PSA1NjI1KSB7XG4gICAgICAgICAgICAgICAgd29ybGQucGxheWVyLnkgKz0gd29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XG4gICAgICAgICAgICAgICAgaWYoaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoKSkge1xuICAgICAgICAgICAgICAgICAgICB3b3JsZC5wbGF5ZXIueSAtPSB3b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKDY1IGluIGtleXNQcmVzc2VkKSB7IC8vIFBsYXllciBob2xkaW5nIGxlZnRcbiAgICAgICAgICAgIGlmKHdvcmxkLnBsYXllci54ID49IDApIHtcbiAgICAgICAgICAgICAgICB3b3JsZC5wbGF5ZXIueCAtPSB3b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcbiAgICAgICAgICAgICAgICBpZihpc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdvcmxkLnBsYXllci54ICs9IHdvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoNjggaW4ga2V5c1ByZXNzZWQpIHsgLy8gUGxheWVyIGhvbGRpbmcgcmlnaHRcbiAgICAgICAgICAgIGlmKHdvcmxkLnBsYXllci54ICsgd29ybGQucGxheWVyLndpZHRoIDw9IDEwMDAwKSB7XG4gICAgICAgICAgICAgICAgd29ybGQucGxheWVyLnggKz0gd29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XG4gICAgICAgICAgICAgICAgaWYoaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoKSkge1xuICAgICAgICAgICAgICAgICAgICB3b3JsZC5wbGF5ZXIueCAtPSB3b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9UaGVzZSBjb250cm9scyBjaGFuZ2UgdGhlIGFjdGl2ZSB3ZWFwb24gd2l0aCBzaW1wbGUgMSwyLDMsZXRjIGNvbnRyb2xzIGZvciBpbnZlbnRvcnlcbiAgICAgICAgaWYgKDQ5IGluIGtleXNQcmVzc2VkKSB7IC8vIFBsYXllciBwcmVzc2VkIDFcbiAgICAgICAgICAgIHdvcmxkLnBsYXllci5hY3RpdmVfaW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICg1MCBpbiBrZXlzUHJlc3NlZCkgeyAvLyBQbGF5ZXIgcHJlc3NlZCAyXG4gICAgICAgICAgICB3b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGkgPSB3b3JsZC5idWxsZXRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICB3b3JsZC5idWxsZXRzW2ldLm1vdmUobW9kaWZpZXIsIHdvcmxkLmVudmlyb25tZW50T2JqZWN0cywgd29ybGQuZW5lbWllcyk7XG4gICAgICAgICAgICBpZih3b3JsZC5idWxsZXRzW2ldLmxpdmUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgd29ybGQuYnVsbGV0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yKGxldCBpID0gd29ybGQuZW5lbWllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICB3b3JsZC5lbmVtaWVzW2ldLm1vdmUod29ybGQucGxheWVyLCBtb2RpZmllciwgd29ybGQuZW52aXJvbm1lbnRPYmplY3RzKTtcbiAgICAgICAgaWYod29ybGQuZW5lbWllc1tpXS5hdHRhY2tDb29sZG93biA+IDApXG4gICAgICAgICAgICB3b3JsZC5lbmVtaWVzW2ldLmF0dGFja0Nvb2xkb3duIC09IDU7XG4gICAgICAgIGlmKHdvcmxkLmVuZW1pZXNbaV0gaW5zdGFuY2VvZiBQcm9qZWN0aWxlRW5lbXkgfHwgd29ybGQuZW5lbWllc1tpXSBpbnN0YW5jZW9mIE1pbmlCb3NzKSB7XG4gICAgICAgIFx0aWYod29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duID4gMClcbiAgICAgICAgXHRcdHdvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93biAtPSB3b3JsZC5lbmVtaWVzW2ldLnNob290Q29vbGRvd25SYXRlO1xuICAgICAgICBcdGVsc2Uge1xuXHRcdFx0XHR3b3JsZC5lbmVteVByb2plY3RpbGVzLnB1c2gobmV3IEVuZW15UHJvamVjdGlsZSh3b3JsZC5lbmVtaWVzW2ldLnggKyB3b3JsZC5lbmVtaWVzW2ldLndpZHRoLzIsIHdvcmxkLmVuZW1pZXNbaV0ueSArIHdvcmxkLmVuZW1pZXNbaV0uaGVpZ2h0LzIsIHdvcmxkLnBsYXllci54ICsgd29ybGQucGxheWVyLndpZHRoLzIsIHdvcmxkLnBsYXllci55ICsgd29ybGQucGxheWVyLmhlaWdodC8yKSk7XG4gICAgICAgIFx0XHR3b3JsZC5lbmVtaWVzW2ldLnNob290Q29vbGRvd24gKz0gd29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duUmVzZXQ7XG5cdFx0XHR9XG5cdFx0fVxuICAgICAgICBpZih3b3JsZC5lbmVtaWVzW2ldLmhlYWx0aCA8PSAwKVxuICAgICAgICAgICAgd29ybGQuZW5lbWllcy5zcGxpY2UoaSwgMSk7XG4gICAgfVxuXG4gICAgZm9yKGxldCBpID0gd29ybGQuZW5lbXlQcm9qZWN0aWxlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICB3b3JsZC5lbmVteVByb2plY3RpbGVzW2ldLm1vdmUobW9kaWZpZXIsIHdvcmxkLmVudmlyb25tZW50T2JqZWN0cywgd29ybGQucGxheWVyKTtcbiAgICAgICAgaWYod29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5saXZlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgd29ybGQuZW5lbXlQcm9qZWN0aWxlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IobGV0IGkgPSB3b3JsZC5lbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYod29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmhlYWx0aCA8PSAwKVxuICAgICAgICAgICAgd29ybGQuZW52aXJvbm1lbnRPYmplY3RzLnNwbGljZShpLCAxKTtcbiAgICB9XG5cbiAgICBpZih3b3JsZC5lbmVtaWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB3b3JsZC53YXZlICs9IDE7XG4gICAgICAgIHdvcmxkLnN0YXJ0V2F2ZSgpO1xuICAgIH1cblxufTtcblxuLy8gRHJhdyBldmVyeXRoaW5nXG5sZXQgcmVuZGVyID0gKCkgPT4ge1xuICAgIGlmKHdvcmxkLnBsYXllci5oZWFsdGggPCAwKSB7XG4gICAgICAgIGN0eC5mb250ID0gXCIxMjhweCBzYW5zLXNlcmlmXCI7XG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICBjdHguZmlsbFN0eWxlPScjRkZGJztcbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiR2FtZSBPdmVyXCIsIGNhbnZhcy53aWR0aC8yLCBjYW52YXMuaGVpZ2h0LzIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlPScjMDAwJztcbiAgICAgICAgY3R4LnN0cm9rZVRleHQoXCJHYW1lIE92ZXJcIiwgY2FudmFzLndpZHRoLzIsIGNhbnZhcy5oZWlnaHQvMik7XG4gICAgICAgIGN0eC5maWxsU3R5bGU9JyNGRkYnO1xuICAgICAgICBjdHguZmlsbFJlY3QoY2FudmFzLndpZHRoLzIgLSAxMDAsIGNhbnZhcy5oZWlnaHQvMiArIDI1LCAyMDAsIDEwMCk7XG4gICAgICAgIGN0eC5zdHJva2VSZWN0KGNhbnZhcy53aWR0aC8yIC0gMTAwLCBjYW52YXMuaGVpZ2h0LzIgKyAyNSwgMjAwLCAxMDApO1xuICAgICAgICBjdHguZm9udCA9IFwiMjRweCBzYW5zLXNlcmlmXCI7XG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICBjdHguZmlsbFN0eWxlPScjMDAwJztcbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiVHJ5IGFnYWluP1wiLCBjYW52YXMud2lkdGgvMiAtIDEwMCArIDEwMCwgY2FudmFzLmhlaWdodC8yICsgMjUgKyA1MCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZih3b3JsZC5pc0JhY2tncm91bmRMb2FkZWQpIHtcbiAgICAgICAgICAgIHdvcmxkLmRyYXdCYWNrZ3JvdW5kKGN0eCwgY2FudmFzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB3b3JsZC5lbmVtaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZih3b3JsZC5lbmVtaWVzW2ldLmlzSW1hZ2VMb2FkZWQpIHtcbiAgICAgICAgICAgICAgICB3b3JsZC5lbmVtaWVzW2ldLmRyYXcoY3R4LCB3b3JsZC5jYW1lcmEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHdvcmxkLmVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYod29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzSW1hZ2VMb2FkZWQpIHtcbiAgICAgICAgICAgICAgICB3b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uZHJhdyhjdHgsIHdvcmxkLmNhbWVyYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL1JlbmRlciBhbGwgdGhlIHdvcmxkLmJ1bGxldHMgYXQgdGhlaXIgbG9jYXRpb25zIGFuZCByZW1vdmUgd29ybGQuYnVsbGV0cyB0aGF0IGFyZW4ndCBsaXZlXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB3b3JsZC5idWxsZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZih3b3JsZC5idWxsZXRzW2ldLmlzSW1hZ2VMb2FkZWQgJiYgd29ybGQuYnVsbGV0c1tpXS5saXZlKSB7XG4gICAgICAgICAgICAgICAgd29ybGQuYnVsbGV0c1tpXS5kcmF3KGN0eCwgd29ybGQuY2FtZXJhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB3b3JsZC5lbmVteVByb2plY3RpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZih3b3JsZC5lbmVteVByb2plY3RpbGVzW2ldLmlzSW1hZ2VMb2FkZWQgJiYgd29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5saXZlKSB7XG4gICAgICAgICAgICAgICAgd29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5kcmF3KGN0eCwgd29ybGQuY2FtZXJhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHdvcmxkLnBsYXllci5pc0ltYWdlTG9hZGVkKSB7XG4gICAgICAgICAgICB3b3JsZC5wbGF5ZXIuZHJhdyhjdHgsIHdvcmxkLmNhbWVyYSk7XG4gICAgICAgICAgICBjdHguZm9udCA9IFwiNDhweCBzYW5zLXNlcmlmXCI7XG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGU9JyNGRkYnO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHdvcmxkLnBsYXllci5oZWFsdGggKyBcIiBIUFwiLCBjYW52YXMud2lkdGgvMiAtIDI5MCwgNTApO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVRleHQod29ybGQucGxheWVyLmhlYWx0aCArIFwiIEhQXCIsIGNhbnZhcy53aWR0aC8yIC0gMjkwLCA1MCk7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoXCJXYXZlIFwiICsgd29ybGQud2F2ZSwgY2FudmFzLndpZHRoLzIsIDUwKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KFwiV2F2ZSBcIiArIHdvcmxkLndhdmUsIGNhbnZhcy53aWR0aC8yLCA1MCk7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQod29ybGQuZW5lbWllcy5sZW5ndGggKyBcIiBFbmVtaWVzIExlZnRcIiwgY2FudmFzLndpZHRoLzIgKyAzNTAsIDUwKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KHdvcmxkLmVuZW1pZXMubGVuZ3RoICsgXCIgRW5lbWllcyBMZWZ0XCIsIGNhbnZhcy53aWR0aC8yICsgMzUwLCA1MCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9UaGlzIHRleHQgZGlzcGxheXMgdGhlIGFjdGl2ZSB3ZWFwb24gdG8gdGhlIHBsYXllciAoY291bGQgYmUgcG9zaXRpb25lZCBiZXR0ZXIgbGF0ZXIpXG4gICAgICAgIGN0eC5mb250ID0gXCI0OHB4IHNhbnMtc2VyaWZcIjtcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgIGN0eC5maWxsU3R5bGU9JyNGRkYnO1xuICAgICAgICBjdHguZmlsbFRleHQoJ0FjdGl2ZSBXZWFwb246ICcgKyB3b3JsZC5wbGF5ZXIuaW52ZW50b3J5W3dvcmxkLnBsYXllci5hY3RpdmVfaW5kZXhdLm5hbWUsIGNhbnZhcy53aWR0aC8yIC0gMjkwLCAxNTApO1xuICAgICAgICBjdHguc3Ryb2tlVGV4dCgnQWN0aXZlIFdlYXBvbjogJyArIHdvcmxkLnBsYXllci5pbnZlbnRvcnlbd29ybGQucGxheWVyLmFjdGl2ZV9pbmRleF0ubmFtZSwgY2FudmFzLndpZHRoLzIgLSAyOTAsIDE1MCk7XG4gICAgfVxuICAgIGN0eC5kcmF3SW1hZ2UoY3Vyc29yLmltYWdlLCBtb3VzZVswXSAtIGN1cnNvci5pbWFnZS53aWR0aC8yLCBtb3VzZVsxXSAtIGN1cnNvci5pbWFnZS5oZWlnaHQvMik7XG59O1xuXG4vLyBUaGUgbWFpbiBnYW1lIGxvb3BcbmxldCBtYWluID0gKCkgPT4ge1xuICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGxldCBkZWx0YSA9IG5vdyAtIHRoZW47XG5cbiAgICB1cGRhdGUoZGVsdGEgLyAxMDAwKTtcbiAgICB3b3JsZC5jYW1lcmEudXBkYXRlKCk7XG4gICAgY29uc29sZS5sb2coJ3dvcmxkLmNhbWVyYS54ID0gJyArIHdvcmxkLmNhbWVyYS54ICsgJ1xcbndvcmxkLmNhbWVyYS55ID0gJyArIHdvcmxkLmNhbWVyYS55KTtcbiAgICByZW5kZXIoKTtcblxuICAgIHRoZW4gPSBub3c7XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobWFpbik7XG59O1xuXG4vLyBDcm9zcy1icm93c2VyIHN1cHBvcnQgZm9yIHJlcXVlc3RBbmltYXRpb25GcmFtZVxucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXG5sZXQgdGhlbiA9IERhdGUubm93KCk7XG5tYWluKCk7XG4iLCIvKlxyXG4gIFNvdXJjZXM6XHJcbiAgaHR0cDovL2pzZmlkZGxlLm5ldC9nZmNhcnYvUUtnSHMvXHJcbiovXHJcblxyXG4vKipcclxuICogVGhlIENhbWVyYSBjbGFzcyBpcyB1c2VkIHRvIGZvbGxvdyB0aGUgcGxheWVyJ3MgbW92ZW1lbnQuXHJcbiAqL1xyXG5jbGFzcyBDYW1lcmEge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIENhbWVyYS5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBDYW1lcmEuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgQ2FtZXJhLlxyXG4gICAgICogQHBhcmFtIGNhbnZhc1dpZHRoIFRoZSB3aWR0aCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIGNhbnZhc0hlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gd29ybGRXaWR0aCBUaGUgd2lkdGggb2YgdGhlIHdvcmxkLlxyXG4gICAgICogQHBhcmFtIHdvcmxkSGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIHdvcmxkLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0LCB3b3JsZFdpZHRoLCB3b3JsZEhlaWdodCkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLnhEZWFkWm9uZSA9IDA7XHJcbiAgICAgICAgdGhpcy55RGVhZFpvbmUgPSAwO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSBjYW52YXNXaWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGNhbnZhc0hlaWdodDtcclxuICAgICAgICB0aGlzLndvcmxkV2lkdGggPSB3b3JsZFdpZHRoO1xyXG4gICAgICAgIHRoaXMud29ybGRIZWlnaHQgPSB3b3JsZEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBzZXQgd2hvIHRoZSBjYW1lcmEgaXMgZm9sbG93aW5nLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIHRoYXQgdGhlIGNhbWVyYSBzaG91bGQgZm9sbG93LlxyXG4gICAgICogQHBhcmFtIHhEZWFkWm9uZVxyXG4gICAgICogQHBhcmFtIHlEZWFkWm9uZVxyXG4gICAgICovXHJcbiAgICBmb2xsb3cocGxheWVyLCB4RGVhZFpvbmUsIHlEZWFkWm9uZSkge1xyXG4gICAgICAgIHRoaXMuZm9sbG93aW5nID0gcGxheWVyO1xyXG4gICAgICAgIHRoaXMueERlYWRab25lID0geERlYWRab25lO1xyXG4gICAgICAgIHRoaXMueURlYWRab25lID0geURlYWRab25lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB1cGRhdGVzIHRoZSBjYW1lcmEncyB4IGFuZCB5IHBvc2l0aW9uLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgaWYodGhpcy5mb2xsb3dpbmcgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmZvbGxvd2luZy54IC0gdGhpcy54ICsgdGhpcy54RGVhZFpvbmUgPiB0aGlzLndpZHRoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5mb2xsb3dpbmcueCAtICh0aGlzLndpZHRoIC0gdGhpcy54RGVhZFpvbmUpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuZm9sbG93aW5nLnggLSB0aGlzLnhEZWFkWm9uZSA8IHRoaXMueClcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuZm9sbG93aW5nLnggLSB0aGlzLnhEZWFkWm9uZTtcclxuICAgICAgICAgICAgaWYodGhpcy5mb2xsb3dpbmcueSAtIHRoaXMueSArIHRoaXMueURlYWRab25lID4gdGhpcy5oZWlnaHQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmZvbGxvd2luZy55IC0gKHRoaXMuaGVpZ2h0IC0gdGhpcy55RGVhZFpvbmUpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuZm9sbG93aW5nLnkgLSB0aGlzLnlEZWFkWm9uZSA8IHRoaXMueSlcclxuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuZm9sbG93aW5nLnkgLSB0aGlzLnlEZWFkWm9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy54IDwgMClcclxuICAgICAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICBpZih0aGlzLnkgPCAwKVxyXG4gICAgICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgIGlmKHRoaXMueCArIHRoaXMud2lkdGggPiB0aGlzLndvcmxkV2lkdGgpXHJcbiAgICAgICAgICAgIHRoaXMueCA9IHRoaXMud29ybGRXaWR0aCAtIHRoaXMud2lkdGg7XHJcbiAgICAgICAgaWYodGhpcy55ICsgdGhpcy5oZWlnaHQgPiB0aGlzLndvcmxkSGVpZ2h0KVxyXG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLndvcmxkSGVpZ2h0IC0gdGhpcy5oZWlnaHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhbWVyYTsiLCJpbXBvcnQgUGlzdG9sIGZyb20gJy4uL1dlYXBvbnMvUGlzdG9sLmpzJ1xuaW1wb3J0IFNuaXBlciBmcm9tICcuLi9XZWFwb25zL1NuaXBlci5qcydcbmNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgIHRoaXMueCA9IHg7XG4gICAgICB0aGlzLnkgPSB5O1xuICAgICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgICB0aGlzLnNwZWVkID0gMjU2O1xuICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICAgIGxldCBzdGFydF9waXN0b2wgPSBuZXcgUGlzdG9sKCk7XG4gICAgICBsZXQgc3RhcnRfc25pcGVyID0gbmV3IFNuaXBlcigpO1xuICAgICAgdGhpcy5pbnZlbnRvcnkgPSBbc3RhcnRfcGlzdG9sLCBzdGFydF9zbmlwZXJdO1xuICAgICAgdGhpcy5hY3RpdmVfaW5kZXggPSAwO1xuICB9XG5cbiAgICBsb2FkSW1hZ2UoKSB7XG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBcIkdyYXBoaWNzL1BsYXllci5wbmdcIjtcbiAgICB9XG4gICAgLy9TdGlsbCBub3QgdXNlZCB5ZXQsIHNob3VsZCBiZSBtb3ZlZCB0byBlYWNoIHdlYXBvbiBvciBzb21ldGhpbmdcbiAgICAvKnNob290KCkge1xuICAgICAgdGhpcy5zaG9vdENvb2xkb3duICs9IDEwO1xuICAgIH0qL1xuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiLypcclxuICBTb3VyY2VzOlxyXG4gIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvR2FtZXMvVGVjaG5pcXVlcy8yRF9jb2xsaXNpb25fZGV0ZWN0aW9uXHJcbiAgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDk1OTk3NS9nZW5lcmF0ZS1yYW5kb20tbnVtYmVyLWJldHdlZW4tdHdvLW51bWJlcnMtaW4tamF2YXNjcmlwdFxyXG4qL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBVdGlsIGNsYXNzIGNvbnRhaW5zIHZhcmlvdXMgdXRpbGl0eSBmdW5jdGlvbnMuXHJcbiAqL1xyXG5jbGFzcyBVdGlsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBpc0NvbGxpc2lvbiBtZXRob2QgY2hlY2tzIGlmIHRoZXJlIGlzIGEgY29sbGlzaW9uIGJldHdlZW4gdGhlIHR3byBpbnB1dHRlZCByZWN0YW5nbGVzLiBUaGlzIGFsZ29yaXRobSBvbmx5XHJcbiAgICAgKiB3b3JrcyB3aXRoIGF4aXMtYWxpZ25lZCByZWN0YW5nbGVzLlxyXG4gICAgICogQHBhcmFtIHJlY3RhbmdsZTEgVGhlIGZpcnN0IHJlY3RhbmdsZS5cclxuICAgICAqIEBwYXJhbSByZWN0YW5nbGUyIFRoZSBzZWNvbmQgcmVjdGFuZ2xlLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgdGhlcmUgZXhpc3RzIGEgY29sbGlzaW9uIGJldHdlZW4gdGhlIHR3byBpbnB1dHRlZCByZWN0YW5nbGVzLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNDb2xsaXNpb24ocmVjdGFuZ2xlMSwgcmVjdGFuZ2xlMikge1xyXG4gICAgICAgIGlmKHJlY3RhbmdsZTEueCA8IHJlY3RhbmdsZTIueCArIHJlY3RhbmdsZTIud2lkdGggJiZcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMS54ICsgcmVjdGFuZ2xlMS53aWR0aCA+IHJlY3RhbmdsZTIueCAmJlxyXG4gICAgICAgICAgICByZWN0YW5nbGUxLnkgPCByZWN0YW5nbGUyLnkgKyByZWN0YW5nbGUyLmhlaWdodCAmJlxyXG4gICAgICAgICAgICByZWN0YW5nbGUxLnkgKyByZWN0YW5nbGUxLmhlaWdodCA+IHJlY3RhbmdsZTIueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyBpZiB0aGVyZSBhcmUgYW55IGNvbGxpc2lvbnMgYmV0d2VlbiB0aGUgdHdvIGFycmF5cy4gVGhpcyBhbGdvcml0aG0gb25seSB3b3JrcyB3aXRoXHJcbiAgICAgKiBheGlzLWFsaWduZWQgcmVjdGFuZ2xlcy5cclxuICAgICAqIEBwYXJhbSBhcnJheTEgQW4gYXJyYXkgb2YgcmVjdGFuZ2xlcy5cclxuICAgICAqIEBwYXJhbSBhcnJheTIgQW4gYXJyYXkgb2YgcmVjdGFuZ2xlcy5cclxuICAgICAqIEByZXR1cm5zIHtpbnRlZ2VyfSAtMSBpZiB0aGVyZSBhcmUgbm8gY29sbGlzaW9ucyBvciB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGFycmF5IGlmIHRoZXJlIGlzLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXJlQW55Q29sbGlzaW9ucyhhcnJheTEsIGFycmF5Mikge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcnJheTEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGFycmF5Mi5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc0NvbGxpc2lvbihhcnJheTFbaV0sIGFycmF5MltqXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgcmFuZG9tIG51bWJlciBpbiB0aGUgZ2l2ZW4gaW50ZXJ2YWwuXHJcbiAgICAgKiBAcGFyYW0gZnJvbVxyXG4gICAgICogQHBhcmFtIHRvXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmFuZG9tSW50RnJvbUludGVydmFsKGZyb20sIHRvKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0byAtIGZyb20gKyAxKSArIGZyb20pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFV0aWw7IiwiaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xuXG5jbGFzcyBCdWxsZXR7XG4gICAgY29uc3RydWN0b3IodmVsb2NpdHksIGRhbWFnZSwgeCwgeSwgZGVzdFgsIGRlc3RZLCBwZW5ldHJhdGVzKSB7XG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2ZWxvY2l0eTtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuZGVzdFggPSBkZXN0WDtcbiAgICAgICAgdGhpcy5kZXN0WSA9IGRlc3RZO1xuICAgICAgICB0aGlzLmxpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzUGVuZXRyYXRpbmcgPSB0cnVlO1xuICAgICAgICBsZXQgZGlmZlggPSB0aGlzLmRlc3RYIC0gdGhpcy54O1xuICAgICAgICBsZXQgZGlmZlkgPSB0aGlzLmRlc3RZIC0gdGhpcy55O1xuICAgICAgICBpZihNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpIHtcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWCk7XG4gICAgICAgICAgICB0aGlzLmNvZWZmWSA9IGRpZmZZIC8gTWF0aC5hYnMoZGlmZlgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb2VmZlkgPSBkaWZmWSAvIE1hdGguYWJzKGRpZmZZKTtcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9hZEltYWdlKHVybCkge1xuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xuICAgIH1cbiAgICAvL01vdmVzIHRoZSBidWxsZXQgZnJvbSBpdHMgc3RhcnRpbmcgcG9pbnQgKHdoaWNoIHdpbGwgYmUgdGhlIHBsYXllcidzIGxvY2F0aW9uKVxuICAgIC8vdG8gaXRzIGRlc3RpbmF0aW9uICh3aGljaCB3aWxsIGJlIHRoZSBjdXJzb3IgbG9jYXRpb24gd2hlbiB0aGUgYnVsbGV0IGlzIGNyZWF0ZWQpLlxuICAgIC8vRWFjaCB0aW1lIG1vdmUgaXMgY2FsbGVkIGl0IGlzIGNoZWNrZWQgaWYgdGhlIGJ1bGxldCBoaXRzIGFueXRoaW5nLCBpZiBpdCBkb2VzIHRoZVxuICAgIC8vaGl0U29lbXRoaW5nIG1ldGhvZCB3aWxsIGNhbGwgYSBkYW1hZ2UgZnVuY3Rpb24gYW5kIHRoZSBkYW1hZ2Ugd2lsbCBiZSBhcHBsaWVkLCBzb1xuICAgIC8vdGhpcyBmdW5jdGlvbiBzZXRzIHRoaXMubGl2ZSA9IGZhbHNlIG1lYW5pbmcgdGhlIGJ1bGxldCBpcyBubyBsb25nZXIgbGl2ZS5cbiAgICBtb3ZlKG1vZGlmaWVyLCBlbnZpcm9ubWVudE9iamVjdHMsIGVuZW1pZXMpe1xuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcip0aGlzLmNvZWZmWDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXIqdGhpcy5jb2VmZlk7XG4gICAgICAgIGlmKHRoaXMuaGl0U29tZXRoaW5nKGVudmlyb25tZW50T2JqZWN0cywgZW5lbWllcykgJiYgdGhpcy5pc1BlbmV0cmF0aW5nID09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmxpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnggPCAwIHx8IHRoaXMueCA+IDEwMDAwIHx8IHRoaXMueSA8IDAgfHwgdGhpcy55ID4gNTYyNSkge1xuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICAvL0NoZWNrcyBpZiB0aGUgYnVsbGV0IGhpdCBhbnkgb2Ygb3VyIG9iamVjdHMgdGhhdCBjYW4gYmUgaGl0LCBpZiBzbyB0aGF0IG9iamVjdCBsb3NlcyBIUFxuICAgIC8vYW5kIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgdG8gaW5kaWNhdGUgdGhhdCB0aGUgb2JqZWN0IHdhcyBoaXQuIElmIG5vdCwgZmFsc2UgaXMgcmV0dXJuZWRcbiAgICAvL2FuZCBub3RoaW5nIGlzIGRvbmUuXG4gICAgZGFtYWdlRW5lbXkoZW5lbXlPYmplY3QpIHtcbiAgICAgICAgZW5lbXlPYmplY3QuaGVhbHRoIC09IHRoaXMuZGFtYWdlO1xuICAgIH1cblxuICAgIGRhbWFnZUVudmlyb25tZW50KGVudmlyb25tZW50T2JqZWN0KXtcbiAgICAgICAgZW52aXJvbm1lbnRPYmplY3QuaGVhbHRoIC09IHRoaXMuZGFtYWdlO1xuICAgIH1cblxuICAgIGhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIGVuZW1pZXMpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbnZpcm9ubWVudE9iamVjdHNbaV0pICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VFbnZpcm9ubWVudChlbnZpcm9ubWVudE9iamVjdHNbaV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbmVtaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIGVuZW1pZXNbaV0pKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZUVuZW15KGVuZW1pZXNbaV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1bGxldDtcbiIsImltcG9ydCBCdWxsZXQgZnJvbSAnLi9CdWxsZXQuanMnO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vL1RoZSA1MCBjYWxpYmVyIHdpbGwgcGVuZXRyYXRlIHRocm91Z2ggb2JqZWN0cyBhbmQgb25seSBzdG9wcyBiZWluZyBsaXZlXHJcbi8vb25jZSBpdCBleGl0cyB0aGUgY2FudmFzLCBzbyBpdHMgZGFtYWdlIGlzIHNldCB0byBhIHNtYWxsIG51bWJlciBhcyBpdCBkZWFsc1xyXG4vL2RhbWFnZSBkdXJpbmcgZWFjaCBmcmFtZSBhcyBpdCBwZW5ldHJhdGVzIHRoZSBvYmplY3Qgb3IgZW5lbXlcclxuY2xhc3MgQnVsbGV0NTBjYWwgZXh0ZW5kcyBCdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgZGVzdFgsIGRlc3RZKSB7XHJcbiAgICAgICAgc3VwZXIoMjUwMCwgNSwgeCwgeSwgZGVzdFgsIGRlc3RZLCB0cnVlKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9idWxsZXQzLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnVsbGV0NTBjYWw7XHJcbiIsImltcG9ydCBCdWxsZXQgZnJvbSAnLi9CdWxsZXQuanMnO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG5jbGFzcyBCdWxsZXQ5bW0gZXh0ZW5kcyBCdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgZGVzdFgsIGRlc3RZKSB7XHJcbiAgICAgICAgc3VwZXIoMTAwMCwgMTAsIHgsIHksIGRlc3RYLCBkZXN0WSwgZmFsc2UpO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL2J1bGxldDMucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ5bW07XHJcbiIsImltcG9ydCBXZWFwb24gZnJvbSAnLi9XZWFwb24uanMnO1xuY2xhc3MgUGlzdG9sIGV4dGVuZHMgV2VhcG9ue1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHN1cGVyKDE1LCA5MCk7XG4gICAgdGhpcy5uYW1lID0gXCJQaXN0b2xcIjtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgUGlzdG9sO1xuIiwiaW1wb3J0IFdlYXBvbiBmcm9tICcuL1dlYXBvbi5qcyc7XHJcbmNsYXNzIFNuaXBlciBleHRlbmRzIFdlYXBvbntcclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgc3VwZXIoNSwgMzApO1xyXG4gICAgdGhpcy5uYW1lID0gXCJTbmlwZXJcIjtcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgU25pcGVyO1xyXG4iLCJjbGFzcyBXZWFwb24ge1xuICBjb25zdHJ1Y3RvcihjbGlwU2l6ZSwgbWF4QW1tbykge1xuICAgICAgdGhpcy5jbGlwU2l6ZSA9IGNsaXBTaXplO1xuICAgICAgdGhpcy5tYXhBbW1vID0gbWF4QW1tbztcbiAgICAgIC8vdGhpcy5hdXRvbWF0aWMgPSBhdXRvbWF0aWM7XG4gICAgICAvL3RoaXMuYnVsbGV0ID0gYnVsbGV0O1xuICAgICAgdGhpcy5uYW1lID0gJyc7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFdlYXBvbjtcbiIsImltcG9ydCBSb2NrIGZyb20gXCIuLi9FbnZpcm9ubWVudE9iamVjdHMvUm9ja1wiO1xyXG5pbXBvcnQgQnVzaCBmcm9tIFwiLi4vRW52aXJvbm1lbnRPYmplY3RzL0J1c2hcIjtcclxuaW1wb3J0IENyYXRlIGZyb20gXCIuLi9FbnZpcm9ubWVudE9iamVjdHMvQ3JhdGVcIjtcclxuaW1wb3J0IFRhbmtFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9UYW5rRW5lbXlcIjtcclxuaW1wb3J0IFJlZ3VsYXJFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9SZWd1bGFyRW5lbXlcIjtcclxuaW1wb3J0IExpZ2h0RW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvTGlnaHRFbmVteVwiO1xyXG5pbXBvcnQgUHJvamVjdGlsZUVuZW15IGZyb20gXCIuLi9FbmVtaWVzL1Byb2plY3RpbGVFbmVteVwiO1xyXG5pbXBvcnQgTWluaUJvc3MgZnJvbSAnLi4vRW5lbWllcy9NaW5pQm9zcyc7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL1BsYXllcnMvUGxheWVyXCI7XHJcbmltcG9ydCBDYW1lcmEgZnJvbSBcIi4uL1BsYXllcnMvQ2FtZXJhXCI7XHJcbmltcG9ydCBVdGlsIGZyb20gXCIuLi9VdGlsaXRpZXMvVXRpbFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBXb3JsZCBjbGFzcyBob2xkcyB0aGUgaW5mb3JtYXRpb24gcmVsYXRlZCB0byB0aGUgd29ybGQuXHJcbiAqL1xyXG5jbGFzcyBXb3JsZCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkIG9mIHRoZSB3b3JsZCBhbmQgbG9hZHMgdGhlIGJhY2tncm91bmQuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzIFRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhcykge1xyXG4gICAgICAgIHRoaXMuc3RhcnQoY2FudmFzKTtcclxuICAgICAgICB0aGlzLmxvYWRCYWNrZ3JvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc3RhcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgV29ybGQuIFRoZSBwbGF5ZXIgaXMgbWFkZSBhbmQgdGhlIGNhbWVyYSBpcyBhdHRhY2hlZCB0byB0aGUgcGxheWVyLlxyXG4gICAgICogQSBjYWxsIGlzIHRvIGluaXRpYWxpemUgdGhlIGVudmlyb25tZW50IGFuZCBzdGFydCB0aGUgd2F2ZS5cclxuICAgICAqIEBwYXJhbSBjYW52YXMgVGhlIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgc3RhcnQoY2FudmFzKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKGNhbnZhcy53aWR0aC8yLCBjYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhID0gbmV3IENhbWVyYSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQsIDEwMDAwLCA1NjI1KTtcclxuICAgICAgICB0aGlzLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIsIGNhbnZhcy53aWR0aC8yLCBjYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuZW5lbWllcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5idWxsZXRzID0gW107XHJcbiAgICAgICAgdGhpcy5lbmVteVByb2plY3RpbGVzID0gW107XHJcbiAgICAgICAgdGhpcy53YXZlID0gMTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVFbnZpcm9ubWVudCgpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRXYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGluaXRpYWxpemVzIHRoZSBlbnZpcm9ubWVudCBieSBwdXNoaW5nIGVudmlyb25tZW50IG9iamVjdHMgb250byB0aGUgZW52aXJvbm1lbnRPYmplY3RzIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplRW52aXJvbm1lbnQoKSB7XHJcbiAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMucHVzaChuZXcgQ3JhdGUoMjAwLCA0MDApKTtcclxuICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cy5wdXNoKG5ldyBCdXNoKDIwLCAxMDApKTtcclxuICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cy5wdXNoKG5ldyBSb2NrKDkwMCwgMjApKTtcclxuICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cy5wdXNoKG5ldyBSb2NrKDk1MDAsIDIwKSk7XHJcbiAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMucHVzaChuZXcgUm9jaygyMCwgNTI1MCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzdGFydHMgdGhlIHdhdmUgYnkgcHVzaGluZyBlbmVtaWVzIG9udG8gdGhlIGVuZW1pZXMgYXJyYXkuXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0V2F2ZSgpIHtcclxuICAgICAgICBsZXQgbGlnaHRFbmVteUNhcCA9IHRoaXMud2F2ZSAqIDEwO1xyXG4gICAgICAgIGxldCByZWd1bGFyRW5lbXlDYXAgPSB0aGlzLndhdmUgKiAxMDtcclxuICAgICAgICBsZXQgdGFua0VuZW15Q2FwID0gdGhpcy53YXZlICogNTtcclxuICAgICAgICBsZXQgcHJvamVjdGlsZUVuZW15Q2FwID0gTWF0aC5mbG9vcih0aGlzLndhdmUvMikqNTtcclxuICAgICAgICBsZXQgbWluaUJvc3NDYXAgPSBNYXRoLmZsb29yKHRoaXMud2F2ZS81KTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxpZ2h0RW5lbXlDYXA7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IExpZ2h0RW5lbXkoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZWd1bGFyRW5lbXlDYXA7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IFJlZ3VsYXJFbmVteShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRhbmtFbmVteUNhcDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgVGFua0VuZW15KFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcHJvamVjdGlsZUVuZW15Q2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBQcm9qZWN0aWxlRW5lbXkoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtaW5pQm9zc0NhcDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgTWluaUJvc3MoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG5cclxuICAgICAgICBsZXQgY29sbGlzaW9uRmxhZyA9IHRydWU7XHJcbiAgICAgICAgd2hpbGUoY29sbGlzaW9uRmxhZyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgaSA9IFV0aWwuYXJlQW55Q29sbGlzaW9ucyh0aGlzLmVuZW1pZXMsIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzKTtcclxuICAgICAgICAgICAgaWYgKGkgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW1pZXNbaV0uc2V0UG9zaXRpb24oVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvYWRCYWNrZ3JvdW5kIGZ1bmN0aW9uIGxvYWRzIHRoZSBiYWNrZ3JvdW5kIGltYWdlLiBPbmNlIHRoZSBpbWFnZSBpcyBsb2FkZWQsIHRoaXMuaXNCYWNrZ3JvdW5kTG9hZGVkIGlzXHJcbiAgICAgKiBzZXQgdG8gdHJ1ZS5cclxuICAgICAqL1xyXG4gICAgbG9hZEJhY2tncm91bmQoKSB7XHJcbiAgICAgICAgdGhpcy5pc0JhY2tncm91bmRMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzQmFja2dyb3VuZExvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQuc3JjID0gXCJHcmFwaGljcy9CYWNrZ3JvdW5kLnBuZ1wiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRyYXdCYWNrZ3JvdW5kIGZ1bmN0aW9uIGRyYXdzIHRoZSBiYWNrZ3JvdW5kIG9mIHRoZSB3b3JsZC5cclxuICAgICAqIEBwYXJhbSBjdHggVGhlIGNvbnRleHQgb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjYW52YXMgVGhlIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgZHJhd0JhY2tncm91bmQoY3R4LCBjYW52YXMpIHtcclxuICAgICAgICBsZXQgc1dpZHRoLCBzSGVpZ2h0O1xyXG4gICAgICAgIHNXaWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgICAgICBzSGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuXHJcbiAgICAgICAgaWYodGhpcy5iYWNrZ3JvdW5kLndpZHRoIC0gdGhpcy5jYW1lcmEueCA8IGNhbnZhcy53aWR0aClcclxuICAgICAgICAgICAgc1dpZHRoID0gdGhpcy5iYWNrZ3JvdW5kLndpZHRoIC0gdGhpcy5jYW1lcmEueDtcclxuICAgICAgICBpZih0aGlzLmJhY2tncm91bmQuaGVpZ2h0IC0gdGhpcy5jYW1lcmEueSA8IGNhbnZhcy5oZWlnaHQpXHJcbiAgICAgICAgICAgIHNIZWlnaHQgPSB0aGlzLmJhY2tncm91bmQuaGVpZ2h0IC0gdGhpcy5jYW1lcmEueTtcclxuXHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmJhY2tncm91bmQsIHRoaXMuY2FtZXJhLngsIHRoaXMuY2FtZXJhLnksIHNXaWR0aCwgc0hlaWdodCwgMCwgMCwgc1dpZHRoLCBzSGVpZ2h0KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdvcmxkOyJdfQ==
