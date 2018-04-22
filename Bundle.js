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

},{"../Utilities/Util.js":19}],3:[function(require,module,exports){
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

},{"../Utilities/Util.js":19}],4:[function(require,module,exports){
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
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
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

    _createClass(Controller, [{
        key: "isKeyPressed",
        value: function isKeyPressed(key) {
            return this.keysPressed[key];
        }
    }, {
        key: "isMousePressed",
        value: function isMousePressed() {
            return this.mousePressed;
        }
    }, {
        key: "getMousePosition",
        value: function getMousePosition() {
            return this.mouse;
        }
    }]);

    return Controller;
}();

exports.default = Controller;

},{}],14:[function(require,module,exports){
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

var _ProjectileEnemy = require('../Enemies/ProjectileEnemy');

var _ProjectileEnemy2 = _interopRequireDefault(_ProjectileEnemy);

var _Cursor = require('../Cursor.js');

var _Cursor2 = _interopRequireDefault(_Cursor);

var _Pistol = require('../Weapons/Pistol');

var _Pistol2 = _interopRequireDefault(_Pistol);

var _Sniper = require('../Weapons/Sniper');

var _Sniper2 = _interopRequireDefault(_Sniper);

var _AssaultRifle = require('../Weapons/AssaultRifle');

var _AssaultRifle2 = _interopRequireDefault(_AssaultRifle);

var _Bullet50cal = require('../Weapons/Bullet50cal');

var _Bullet50cal2 = _interopRequireDefault(_Bullet50cal);

var _Bullet = require('../Weapons/Bullet556');

var _Bullet2 = _interopRequireDefault(_Bullet);

var _Bullet9mm = require('../Weapons/Bullet9mm');

var _Bullet9mm2 = _interopRequireDefault(_Bullet9mm);

var _Rock = require('../EnvironmentObjects/Rock');

var _Rock2 = _interopRequireDefault(_Rock);

var _Crate = require('../EnvironmentObjects/Crate');

var _Crate2 = _interopRequireDefault(_Crate);

var _Bush = require('../EnvironmentObjects/Bush');

var _Bush2 = _interopRequireDefault(_Bush);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(canvas, documentBody) {
        _classCallCheck(this, Game);

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.world = new _World2.default(canvas);
        this.controller = new _Controller2.default(documentBody);
        this.cursor = new _Cursor2.default();
    }

    _createClass(Game, [{
        key: 'update',
        value: function update(modifier) {
            if (this.world.player.health > 0) {
                if (this.controller.isKeyPressed(87)) {
                    // Player holding up
                    if (this.world.player.y >= 0) {
                        this.world.player.y -= this.world.player.speed * modifier;
                        if (this.world.player.isCollisionWithEnvironmentObject(this.world.environmentObjects)) {
                            this.world.player.y += this.world.player.speed * modifier;
                        }
                    }
                }
                if (this.controller.isKeyPressed(83)) {
                    // Player holding down
                    if (this.world.player.y + this.world.player.height <= 5625) {
                        this.world.player.y += this.world.player.speed * modifier;
                        if (this.world.player.isCollisionWithEnvironmentObject(this.world.environmentObjects)) {
                            this.world.player.y -= this.world.player.speed * modifier;
                        }
                    }
                }
                if (this.controller.isKeyPressed(65)) {
                    // Player holding left
                    if (this.world.player.x >= 0) {
                        this.world.player.x -= this.world.player.speed * modifier;
                        if (this.world.player.isCollisionWithEnvironmentObject(this.world.environmentObjects)) {
                            this.world.player.x += this.world.player.speed * modifier;
                        }
                    }
                }
                if (this.controller.isKeyPressed(68)) {
                    // Player holding right
                    if (this.world.player.x + this.world.player.width <= 10000) {
                        this.world.player.x += this.world.player.speed * modifier;
                        if (this.world.player.isCollisionWithEnvironmentObject(this.world.environmentObjects)) {
                            this.world.player.x -= this.world.player.speed * modifier;
                        }
                    }
                }
                if (this.controller.isMousePressed()) {
                    var wep = this.world.player.inventory[this.world.player.active_index];
                    var mouse = this.controller.getMousePosition();

                    //Fire the correct bullet type for the currently equipped weapon.
                    //This could be done more gracefully in the future
                    if (wep instanceof _Pistol2.default) {
                        if (wep.cooldown <= 0) {
                            this.world.bullets.push(new _Bullet9mm2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y, mouse[0] + this.world.camera.x, mouse[1] + this.world.camera.y));
                            wep.sound.play();
                            wep.sound.currentTime = 0;
                            wep.cooldown += 200;
                        }
                    } else if (wep instanceof _Sniper2.default) {
                        if (wep.cooldown <= 0) {
                            this.world.bullets.push(new _Bullet50cal2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y, mouse[0] + this.world.camera.x, mouse[1] + this.world.camera.y));
                            wep.sound.play();
                            wep.sound.currentTime = 0;
                            wep.cooldown += 900;
                        }
                    } else if (wep instanceof _AssaultRifle2.default) {
                        if (wep.cooldown <= 0) {
                            this.world.bullets.push(new _Bullet2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y, mouse[0] + this.world.camera.x, mouse[1] + this.world.camera.y));
                            wep.sound.play();
                            wep.sound.currentTime = 0;
                            wep.cooldown += 25;
                        }
                    }
                    //The bounding box in this if statement tells if the mouse was clicked inside the try again button,
                    //and if so the this.world is restarted.
                }
                //These controls change the active weapon with simple 1,2,3,etc controls for inventory
                if (this.controller.isKeyPressed(49)) {
                    // Player pressed 1
                    this.world.player.active_index = 0;
                }
                if (this.controller.isKeyPressed(50)) {
                    // Player pressed 2
                    this.world.player.active_index = 1;
                }
                if (this.controller.isKeyPressed(51)) {
                    // Player pressed 3
                    this.world.player.active_index = 2;
                }
                for (var i = this.world.bullets.length - 1; i >= 0; i--) {
                    this.world.bullets[i].move(modifier, this.world.environmentObjects, this.world.enemies);
                    if (this.world.bullets[i].live === false) {
                        this.world.bullets.splice(i, 1);
                    }
                }
            } else {
                if (this.controller.isMousePressed()) {
                    var _mouse = this.controller.getMousePosition();

                    if (_mouse[0] > this.canvas.width / 2 - 100 && _mouse[0] < this.canvas.width / 2 - 100 + 200 && _mouse[1] > this.canvas.height / 2 + 25 && _mouse[1] < this.canvas.height / 2 + 25 + 100) {
                        this.world.start(this.canvas);
                    }
                }
            }
            for (var _i = this.world.enemies.length - 1; _i >= 0; _i--) {
                this.world.enemies[_i].move(this.world.player, modifier, this.world.environmentObjects);
                if (this.world.enemies[_i].attackCooldown > 0) this.world.enemies[_i].attackCooldown -= 5;
                if (this.world.enemies[_i] instanceof _ProjectileEnemy2.default || this.world.enemies[_i] instanceof _MiniBoss2.default) {
                    if (this.world.enemies[_i].shootCooldown > 0) this.world.enemies[_i].shootCooldown -= this.world.enemies[_i].shootCooldownRate;else {
                        this.world.enemyProjectiles.push(new _EnemyProjectile2.default(this.world.enemies[_i].x + this.world.enemies[_i].width / 2, this.world.enemies[_i].y + this.world.enemies[_i].height / 2, this.world.player.x + this.world.player.width / 2, this.world.player.y + this.world.player.height / 2));
                        this.world.enemies[_i].shootCooldown += this.world.enemies[_i].shootCooldownReset;
                    }
                }
                if (this.world.enemies[_i].health <= 0) this.world.enemies.splice(_i, 1);
            }
            //Update weapon cooldowns
            for (var _i2 = this.world.player.inventory.length - 1; _i2 >= 0; _i2--) {
                var _wep = this.world.player.inventory[_i2];
                if (_wep.cooldown > 0) {
                    _wep.cooldown -= 5;
                }
            }
            for (var _i3 = this.world.enemyProjectiles.length - 1; _i3 >= 0; _i3--) {
                this.world.enemyProjectiles[_i3].move(modifier, this.world.environmentObjects, this.world.player);
                if (this.world.enemyProjectiles[_i3].live === false) {
                    this.world.enemyProjectiles.splice(_i3, 1);
                }
            }

            for (var _i4 = this.world.environmentObjects.length - 1; _i4 >= 0; _i4--) {
                if (this.world.environmentObjects[_i4].health <= 0) this.world.environmentObjects.splice(_i4, 1);
            }

            if (this.world.enemies.length === 0) {
                this.world.wave += 1;
                this.world.startWave();
            }

            this.world.camera.update();
        }
    }, {
        key: 'draw',
        value: function draw() {
            var mouse = this.controller.getMousePosition();
            if (this.world.player.health < 0) {
                this.ctx.font = "128px sans-serif";
                this.ctx.textAlign = "center";
                this.ctx.fillStyle = '#FFF';
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
            } else {
                if (this.world.isBackgroundLoaded) {
                    this.world.drawBackground(this.ctx, this.canvas);
                }
                for (var i = 0; i < this.world.enemies.length; i++) {
                    if (this.world.enemies[i].isImageLoaded) {
                        this.world.enemies[i].draw(this.ctx, this.world.camera);
                    }
                }
                for (var _i5 = 0; _i5 < this.world.environmentObjects.length; _i5++) {
                    if (this.world.environmentObjects[_i5].isImageLoaded) {
                        this.world.environmentObjects[_i5].draw(this.ctx, this.world.camera);
                    }
                }

                for (var _i6 = 0; _i6 < this.world.bullets.length; _i6++) {
                    if (this.world.bullets[_i6].isImageLoaded && this.world.bullets[_i6].live) {
                        this.world.bullets[_i6].draw(this.ctx, this.world.camera);
                    }
                }
                for (var _i7 = 0; _i7 < this.world.enemyProjectiles.length; _i7++) {
                    if (this.world.enemyProjectiles[_i7].isImageLoaded && this.world.enemyProjectiles[_i7].live) {
                        this.world.enemyProjectiles[_i7].draw(this.ctx, this.world.camera);
                    }
                }

                if (this.world.player.isImageLoaded) {
                    this.world.player.draw(this.ctx, this.world.camera, mouse);
                    this.ctx.font = "48px sans-serif";
                    this.ctx.textAlign = "center";
                    this.ctx.fillStyle = '#FFF';
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

                    // Minimap
                    this.ctx.fillStyle = 'rgba(35, 177, 77, 0.2)';
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
                    for (var _i8 = 0; _i8 < this.world.environmentObjects.length; _i8++) {
                        if (this.world.environmentObjects[_i8].isImageLoaded) {
                            var _xPercent = (this.world.environmentObjects[_i8].x + this.world.environmentObjects[_i8].width / 2) / this.world.width;
                            var _yPercent = (this.world.environmentObjects[_i8].y + this.world.environmentObjects[_i8].height / 2) / this.world.height;
                            var _xRelative = _xPercent * 400;
                            var _yRelative = _yPercent * 225;
                            //ctx.drawImage(this.world.environmentObjects[i].image, (this.canvas.width - 425) + xRelative + this.world.environmentObjects[i].width/2, 25 + yRelative + this.world.environmentObjects[i].height/2, this.world.environmentObjects[i].width/25, this.world.environmentObjects[i].height/25);
                            this.ctx.fillStyle = '#808080';
                            this.ctx.beginPath();
                            this.ctx.arc(this.canvas.width - 425 + _xRelative, 25 + _yRelative, 2.5, 0, 2 * Math.PI);
                            this.ctx.fill();
                        }
                    }
                    for (var _i9 = 0; _i9 < this.world.enemies.length; _i9++) {
                        if (this.world.enemies[_i9].isImageLoaded) {
                            var _xPercent2 = (this.world.enemies[_i9].x + this.world.enemies[_i9].width / 2) / this.world.width;
                            var _yPercent2 = (this.world.enemies[_i9].y + this.world.enemies[_i9].height / 2) / this.world.height;
                            var _xRelative2 = _xPercent2 * 400;
                            var _yRelative2 = _yPercent2 * 225;
                            this.ctx.fillStyle = '#FF0000';
                            this.ctx.beginPath();
                            this.ctx.arc(this.canvas.width - 425 + _xRelative2, 25 + _yRelative2, 2.5, 0, 2 * Math.PI);
                            this.ctx.fill();
                        }
                    }

                    // remove later - debugging purposes
                    this.ctx.font = "24px sans-serif";
                    this.ctx.fillStyle = '#FFF';
                    this.ctx.fillText('PosX: ' + this.world.player.x, this.canvas.width / 2 - 290, 175);
                    this.ctx.strokeText('PosY: ' + this.world.player.y, this.canvas.width / 2 - 290, 250);
                    this.ctx.fillText('CameraX: ' + this.world.camera.x, this.canvas.width / 2, 175);
                    this.ctx.strokeText('CameraY: ' + this.world.camera.y, this.canvas.width / 2, 250);
                    this.ctx.fillText('mouseX: ' + mouse[0], this.canvas.width / 2 + 350, 175);
                    this.ctx.strokeText('mouseY: ' + mouse[1], this.canvas.width / 2 + 350, 250);
                }
            }
            this.ctx.drawImage(this.cursor.image, mouse[0] - this.cursor.image.width / 2, mouse[1] - this.cursor.image.height / 2);
        }
    }]);

    return Game;
}();

exports.default = Game;

},{"../Cursor.js":1,"../Enemies/EnemyProjectile":3,"../Enemies/MiniBoss":5,"../Enemies/ProjectileEnemy":6,"../EnvironmentObjects/Bush":9,"../EnvironmentObjects/Crate":10,"../EnvironmentObjects/Rock":12,"../Weapons/AssaultRifle":20,"../Weapons/Bullet50cal":22,"../Weapons/Bullet556":23,"../Weapons/Bullet9mm":24,"../Weapons/Pistol":25,"../Weapons/Sniper":26,"./Controller.js":13,"./World.js":15}],15:[function(require,module,exports){
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
            this.environmentObjects = [];
            this.enemies = [];
            this.bullets = [];
            this.enemyProjectiles = [];
            this.initializeEnvironment();
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
            }for (var _i4 = 0; _i4 < regularEnemyCap; _i4++) {
                this.enemies.push(new _RegularEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i5 = 0; _i5 < tankEnemyCap; _i5++) {
                this.enemies.push(new _TankEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i6 = 0; _i6 < projectileEnemyCap; _i6++) {
                this.enemies.push(new _ProjectileEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i7 = 0; _i7 < miniBossCap; _i7++) {
                this.enemies.push(new _MiniBoss2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }var collisionFlag = true;
            while (collisionFlag === true) {
                var _i8 = _Util2.default.areAnyCollisions(this.enemies, this.environmentObjects);
                if (_i8 === -1) collisionFlag = false;else this.enemies[_i8].setPosition(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375));
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

},{"../Enemies/LightEnemy":4,"../Enemies/MiniBoss":5,"../Enemies/ProjectileEnemy":6,"../Enemies/RegularEnemy":7,"../Enemies/TankEnemy":8,"../EnvironmentObjects/Bush":9,"../EnvironmentObjects/Crate":10,"../EnvironmentObjects/Rock":12,"../Players/Camera":17,"../Players/Player":18,"../Utilities/Util":19}],16:[function(require,module,exports){
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

},{"./Game/Game.js":14}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Pistol = require('../Weapons/Pistol.js');

var _Pistol2 = _interopRequireDefault(_Pistol);

var _Sniper = require('../Weapons/Sniper.js');

var _Sniper2 = _interopRequireDefault(_Sniper);

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
        var start_pistol = new _Pistol2.default();
        var start_sniper = new _Sniper2.default();
        var start_rifle = new _AssaultRifle2.default();
        this.inventory = [start_pistol, start_sniper, start_rifle];
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

},{"../Utilities/Util.js":19,"../Weapons/AssaultRifle.js":20,"../Weapons/Pistol.js":25,"../Weapons/Sniper.js":26}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

        var _this = _possibleConstructorReturn(this, (AssaultRifle.__proto__ || Object.getPrototypeOf(AssaultRifle)).call(this, 5, 30));

        _this.name = "Assault Rifle";
        _get(AssaultRifle.prototype.__proto__ || Object.getPrototypeOf(AssaultRifle.prototype), 'loadShootSound', _this).call(_this, 'Audio/RifleShot.mp3');
        return _this;
    }

    return AssaultRifle;
}(_Weapon3.default);

exports.default = AssaultRifle;

},{"./Weapon.js":27}],21:[function(require,module,exports){
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

},{"../Utilities/Util.js":19}],22:[function(require,module,exports){
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

},{"../Utilities/Util.js":19,"./Bullet.js":21}],23:[function(require,module,exports){
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

        var _this = _possibleConstructorReturn(this, (Bullet556.__proto__ || Object.getPrototypeOf(Bullet556)).call(this, 1500, 12, x, y, destX, destY, false));

        _get(Bullet556.prototype.__proto__ || Object.getPrototypeOf(Bullet556.prototype), 'loadImage', _this).call(_this, "Graphics/bullet3.png");
        return _this;
    }

    return Bullet556;
}(_Bullet3.default);

exports.default = Bullet556;

},{"../Utilities/Util.js":19,"./Bullet.js":21}],24:[function(require,module,exports){
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

},{"../Utilities/Util.js":19,"./Bullet.js":21}],25:[function(require,module,exports){
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

        var _this = _possibleConstructorReturn(this, (Pistol.__proto__ || Object.getPrototypeOf(Pistol)).call(this, 15, 90));

        _this.name = "Pistol";
        _get(Pistol.prototype.__proto__ || Object.getPrototypeOf(Pistol.prototype), 'loadShootSound', _this).call(_this, 'Audio/PistolShot.mp3');
        return _this;
    }

    return Pistol;
}(_Weapon3.default);

exports.default = Pistol;

},{"./Weapon.js":27}],26:[function(require,module,exports){
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

        var _this = _possibleConstructorReturn(this, (Sniper.__proto__ || Object.getPrototypeOf(Sniper)).call(this, 5, 30));

        _this.name = "Sniper";
        _get(Sniper.prototype.__proto__ || Object.getPrototypeOf(Sniper.prototype), 'loadShootSound', _this).call(_this, 'Audio/SniperShot.mp3');
        return _this;
    }

    return Sniper;
}(_Weapon3.default);

exports.default = Sniper;

},{"./Weapon.js":27}],27:[function(require,module,exports){
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
    function Weapon(clipSize, maxAmmo) {
        _classCallCheck(this, Weapon);

        this.clipSize = clipSize;
        this.maxAmmo = maxAmmo;
        this.name = '';
        this.cooldown = 0;
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
    }]);

    return Weapon;
}();

exports.default = Weapon;

},{}]},{},[16])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDdXJzb3IuanMiLCJFbmVtaWVzL0VuZW15LmpzIiwiRW5lbWllcy9FbmVteVByb2plY3RpbGUuanMiLCJFbmVtaWVzL0xpZ2h0RW5lbXkuanMiLCJFbmVtaWVzL01pbmlCb3NzLmpzIiwiRW5lbWllcy9Qcm9qZWN0aWxlRW5lbXkuanMiLCJFbmVtaWVzL1JlZ3VsYXJFbmVteS5qcyIsIkVuZW1pZXMvVGFua0VuZW15LmpzIiwiRW52aXJvbm1lbnRPYmplY3RzL0J1c2guanMiLCJFbnZpcm9ubWVudE9iamVjdHMvQ3JhdGUuanMiLCJFbnZpcm9ubWVudE9iamVjdHMvRW52aXJvbm1lbnRPYmplY3QuanMiLCJFbnZpcm9ubWVudE9iamVjdHMvUm9jay5qcyIsIkdhbWUvQ29udHJvbGxlci5qcyIsIkdhbWUvR2FtZS5qcyIsIkdhbWUvV29ybGQuanMiLCJNYWluLmpzIiwiUGxheWVycy9DYW1lcmEuanMiLCJQbGF5ZXJzL1BsYXllci5qcyIsIlV0aWxpdGllcy9VdGlsLmpzIiwiV2VhcG9ucy9Bc3NhdWx0UmlmbGUuanMiLCJXZWFwb25zL0J1bGxldC5qcyIsIldlYXBvbnMvQnVsbGV0NTBjYWwuanMiLCJXZWFwb25zL0J1bGxldDU1Ni5qcyIsIldlYXBvbnMvQnVsbGV0OW1tLmpzIiwiV2VhcG9ucy9QaXN0b2wuanMiLCJXZWFwb25zL1NuaXBlci5qcyIsIldlYXBvbnMvV2VhcG9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtJQUNNLE07QUFDRixzQkFBYztBQUFBOztBQUNWLGFBQUssU0FBTDtBQUNIOzs7O29DQUVXO0FBQUE7O0FBQ1IsaUJBQUssYUFBTCxHQUFxQixLQUFyQjtBQUNBLGlCQUFLLEtBQUwsR0FBYSxJQUFJLEtBQUosRUFBYjtBQUNBLGlCQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLFlBQU07QUFDdEIsc0JBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNILGFBRkQ7QUFHQSxpQkFBSyxLQUFMLENBQVcsR0FBWCxHQUFpQix3QkFBakI7QUFDSDs7Ozs7O2tCQUVVLE07Ozs7Ozs7OztxakJDakJmOzs7Ozs7QUFNQTs7Ozs7Ozs7QUFFQTs7O0lBR00sSzs7QUFFRjs7Ozs7Ozs7O0FBU0EsbUJBQVksQ0FBWixFQUFlLENBQWYsRUFBa0IsUUFBbEIsRUFBNEIsTUFBNUIsRUFBb0MsTUFBcEMsRUFBNEMsWUFBNUMsRUFBMEQ7QUFBQTs7QUFDdEQsYUFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxhQUFLLEtBQUwsR0FBYSxLQUFLLEVBQUwsR0FBUSxDQUFyQjtBQUNBLGFBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLGFBQUssTUFBTCxHQUFjLE1BQWQ7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsYUFBSyxZQUFMLEdBQW9CLFlBQXBCO0FBQ0EsYUFBSyxjQUFMLEdBQXNCLENBQXRCO0FBQ0g7O0FBRUQ7Ozs7Ozs7OztrQ0FLVSxHLEVBQUs7QUFBQTs7QUFDWCxpQkFBSyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0EsaUJBQUssS0FBTCxHQUFhLElBQUksS0FBSixFQUFiO0FBQ0EsaUJBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsWUFBTTtBQUN0QixzQkFBSyxhQUFMLEdBQXFCLElBQXJCO0FBQ0Esc0JBQUssS0FBTCxHQUFhLE1BQUssS0FBTCxDQUFXLEtBQXhCO0FBQ0Esc0JBQUssTUFBTCxHQUFjLE1BQUssS0FBTCxDQUFXLE1BQXpCO0FBQ0gsYUFKRDtBQUtBLGlCQUFLLEtBQUwsQ0FBVyxHQUFYLEdBQWlCLEdBQWpCO0FBQ0g7O0FBRUQ7Ozs7Ozs7OytCQUtPLE0sRUFBUTtBQUNYLG1CQUFPLE1BQVAsSUFBaUIsS0FBSyxNQUF0QjtBQUNBLGlCQUFLLGNBQUwsSUFBdUIsR0FBdkI7QUFDSDs7QUFFRDs7Ozs7Ozs7OzZCQU1LLE0sRUFBUSxRLEVBQVUsa0IsRUFBb0I7QUFDdkMsZ0JBQUksUUFBUSxPQUFPLENBQVAsR0FBVyxLQUFLLENBQTVCO0FBQ0EsZ0JBQUksUUFBUSxPQUFPLENBQVAsR0FBVyxLQUFLLENBQTVCO0FBQ0EsZ0JBQUksU0FBUyxLQUFLLElBQUwsQ0FBVSxRQUFRLEtBQVIsR0FBZ0IsUUFBUSxLQUFsQyxDQUFiO0FBQ0EsZ0JBQUcsV0FBVyxDQUFkLEVBQWlCO0FBQ2IseUJBQVMsTUFBVDtBQUNBLHlCQUFTLE1BQVQ7QUFDSDs7QUFFRCxpQkFBSyxLQUFMLEdBQWEsS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixLQUFsQixDQUFiOztBQUVBLGdCQUFHLFFBQVEsQ0FBWCxFQUFjO0FBQ1Ysb0JBQUcsS0FBSyxDQUFMLEdBQVMsS0FBSyxLQUFkLElBQXVCLEtBQTFCLEVBQWlDO0FBQzdCLHlCQUFLLENBQUwsSUFBVSxLQUFLLFFBQUwsR0FBYyxRQUF4QjtBQUNBLHdCQUFHLEtBQUssZ0NBQUwsQ0FBc0Msa0JBQXRDLENBQUgsRUFBOEQ7QUFDMUQsNkJBQUssQ0FBTCxJQUFVLEtBQUssUUFBTCxHQUFjLFFBQXhCO0FBQ0g7QUFDSjtBQUNKLGFBUEQsTUFRSyxJQUFHLFFBQVEsQ0FBWCxFQUFjO0FBQ2Ysb0JBQUcsS0FBSyxDQUFMLElBQVUsQ0FBYixFQUFnQjtBQUNaLHlCQUFLLENBQUwsSUFBVSxLQUFLLFFBQUwsR0FBYyxRQUF4QjtBQUNBLHdCQUFHLEtBQUssZ0NBQUwsQ0FBc0Msa0JBQXRDLENBQUgsRUFBOEQ7QUFDMUQsNkJBQUssQ0FBTCxJQUFVLEtBQUssUUFBTCxHQUFjLFFBQXhCO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsZ0JBQUcsUUFBUSxDQUFYLEVBQWM7QUFDVixvQkFBRyxLQUFLLENBQUwsR0FBUyxLQUFLLE1BQWQsSUFBd0IsSUFBM0IsRUFBaUM7QUFDN0IseUJBQUssQ0FBTCxJQUFVLEtBQUssUUFBTCxHQUFjLFFBQXhCO0FBQ0Esd0JBQUcsS0FBSyxnQ0FBTCxDQUFzQyxrQkFBdEMsQ0FBSCxFQUE4RDtBQUMxRCw2QkFBSyxDQUFMLElBQVUsS0FBSyxRQUFMLEdBQWMsUUFBeEI7QUFDSDtBQUNKO0FBQ0osYUFQRCxNQVFLLElBQUcsUUFBUSxDQUFYLEVBQWM7QUFDZixvQkFBRyxLQUFLLENBQUwsSUFBVSxDQUFiLEVBQWdCO0FBQ1oseUJBQUssQ0FBTCxJQUFVLEtBQUssUUFBTCxHQUFjLFFBQXhCO0FBQ0Esd0JBQUcsS0FBSyxnQ0FBTCxDQUFzQyxrQkFBdEMsQ0FBSCxFQUE4RDtBQUMxRCw2QkFBSyxDQUFMLElBQVUsS0FBSyxRQUFMLEdBQWMsUUFBeEI7QUFDSDtBQUNKO0FBQ0o7O0FBRUQsZ0JBQUcsZUFBSyxXQUFMLENBQWlCLElBQWpCLEVBQXVCLE1BQXZCLEtBQWtDLEtBQUssY0FBTCxLQUF3QixDQUE3RCxFQUFnRTtBQUM1RCx3QkFBUSxHQUFSLENBQVkseUJBQXlCLE9BQU8sTUFBNUM7QUFDQSxxQkFBSyxNQUFMLENBQVksTUFBWjtBQUNBLHdCQUFRLEdBQVIsQ0FBWSx3QkFBd0IsT0FBTyxNQUEzQztBQUNIO0FBQ0o7O0FBRUQ7Ozs7Ozs7O29DQUtZLEMsRUFBRyxDLEVBQUc7QUFDZCxpQkFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLGlCQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozt5REFNaUMsa0IsRUFBb0I7QUFDakQsaUJBQUksSUFBSSxJQUFJLENBQVosRUFBZSxJQUFJLG1CQUFtQixNQUF0QyxFQUE4QyxHQUE5QyxFQUFtRDtBQUMvQyxvQkFBRyxlQUFLLFdBQUwsQ0FBaUIsSUFBakIsRUFBdUIsbUJBQW1CLENBQW5CLENBQXZCLEtBQWlELG1CQUFtQixDQUFuQixFQUFzQixVQUExRSxFQUFzRjtBQUNsRix3QkFBRyxLQUFLLGNBQUwsS0FBd0IsQ0FBM0IsRUFBOEI7QUFDMUIsNkJBQUssTUFBTCxDQUFZLG1CQUFtQixDQUFuQixDQUFaO0FBQ0g7QUFDRCwyQkFBTyxJQUFQO0FBQ0g7QUFDSjtBQUNELG1CQUFPLEtBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7NkJBS0ssRyxFQUFLLE0sRUFBUTtBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQUksU0FBSixDQUFjLEtBQUssS0FBbkIsRUFBMEIsS0FBSyxDQUFMLEdBQVMsT0FBTyxDQUExQyxFQUE2QyxLQUFLLENBQUwsR0FBUyxPQUFPLENBQTdEO0FBQ0E7QUFDSDs7Ozs7O2tCQUdVLEs7Ozs7Ozs7Ozs7O0FDL0pmOzs7Ozs7OztBQUVBOzs7SUFHTSxlOztBQUVGOzs7Ozs7OztBQVFBLDZCQUFZLENBQVosRUFBZSxDQUFmLEVBQWtCLEtBQWxCLEVBQXlCLEtBQXpCLEVBQWdDO0FBQUE7O0FBQzVCLGFBQUssUUFBTCxHQUFnQixHQUFoQjtBQUNBLGFBQUssTUFBTCxHQUFjLENBQWQ7QUFDQSxhQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsYUFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLGFBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxZQUFJLFFBQVEsUUFBUSxLQUFLLENBQXpCO0FBQ0EsWUFBSSxRQUFRLFFBQVEsS0FBSyxDQUF6QjtBQUNBLFlBQUcsS0FBSyxHQUFMLENBQVMsS0FBVCxJQUFrQixLQUFLLEdBQUwsQ0FBUyxLQUFULENBQXJCLEVBQXNDO0FBQ2xDLGlCQUFLLE1BQUwsR0FBYyxRQUFRLEtBQUssR0FBTCxDQUFTLEtBQVQsQ0FBdEI7QUFDQSxpQkFBSyxNQUFMLEdBQWMsUUFBUSxLQUFLLEdBQUwsQ0FBUyxLQUFULENBQXRCO0FBQ0gsU0FIRCxNQUlLO0FBQ0QsaUJBQUssTUFBTCxHQUFjLFFBQVEsS0FBSyxHQUFMLENBQVMsS0FBVCxDQUF0QjtBQUNBLGlCQUFLLE1BQUwsR0FBYyxRQUFRLEtBQUssR0FBTCxDQUFTLEtBQVQsQ0FBdEI7QUFDSDtBQUNELGFBQUssU0FBTDtBQUNIOztBQUVEOzs7Ozs7Ozs7OzZCQU1LLFEsRUFBVSxrQixFQUFvQixNLEVBQVE7QUFDdkMsaUJBQUssQ0FBTCxJQUFVLEtBQUssUUFBTCxHQUFjLFFBQWQsR0FBdUIsS0FBSyxNQUF0QztBQUNBLGlCQUFLLENBQUwsSUFBVSxLQUFLLFFBQUwsR0FBYyxRQUFkLEdBQXVCLEtBQUssTUFBdEM7QUFDQSxnQkFBRyxLQUFLLFlBQUwsQ0FBa0Isa0JBQWxCLEVBQXNDLE1BQXRDLENBQUgsRUFBa0Q7QUFDOUMscUJBQUssSUFBTCxHQUFZLEtBQVo7QUFDSDtBQUNELGdCQUFHLEtBQUssQ0FBTCxHQUFTLENBQVQsSUFBYyxLQUFLLENBQUwsR0FBUyxLQUF2QixJQUFnQyxLQUFLLENBQUwsR0FBUyxDQUF6QyxJQUE4QyxLQUFLLENBQUwsR0FBUyxJQUExRCxFQUErRDtBQUMzRCxxQkFBSyxJQUFMLEdBQVksS0FBWjtBQUNIO0FBQ0o7O0FBRUQ7Ozs7Ozs7cUNBSWEsTSxFQUFRO0FBQ2pCLG1CQUFPLE1BQVAsSUFBaUIsS0FBSyxNQUF0QjtBQUNIOztBQUVEOzs7Ozs7OzBDQUlrQixpQixFQUFrQjtBQUNoQyw4QkFBa0IsTUFBbEIsSUFBNEIsS0FBSyxNQUFqQztBQUNIOztBQUVEOzs7Ozs7Ozs7cUNBTWEsa0IsRUFBb0IsTSxFQUFRO0FBQ3JDLGlCQUFJLElBQUksSUFBSSxDQUFaLEVBQWUsSUFBSSxtQkFBbUIsTUFBdEMsRUFBOEMsR0FBOUMsRUFBbUQ7QUFDL0Msb0JBQUcsZUFBSyxXQUFMLENBQWlCLElBQWpCLEVBQXVCLG1CQUFtQixDQUFuQixDQUF2QixLQUFpRCxtQkFBbUIsQ0FBbkIsRUFBc0IsVUFBMUUsRUFBc0Y7QUFDbEYseUJBQUssaUJBQUwsQ0FBdUIsbUJBQW1CLENBQW5CLENBQXZCO0FBQ0EsMkJBQU8sSUFBUDtBQUNIO0FBQ0o7QUFDRCxnQkFBRyxlQUFLLFdBQUwsQ0FBaUIsSUFBakIsRUFBdUIsTUFBdkIsQ0FBSCxFQUFrQztBQUM5QixxQkFBSyxZQUFMLENBQWtCLE1BQWxCO0FBQ0EsdUJBQU8sSUFBUDtBQUNIO0FBQ0QsbUJBQU8sS0FBUDtBQUNIOztBQUVEOzs7Ozs7O29DQUlZO0FBQUE7O0FBQ1IsaUJBQUssYUFBTCxHQUFxQixLQUFyQjtBQUNBLGlCQUFLLEtBQUwsR0FBYSxJQUFJLEtBQUosRUFBYjtBQUNBLGlCQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLFlBQU07QUFDdEIsc0JBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNBLHNCQUFLLEtBQUwsR0FBYSxNQUFLLEtBQUwsQ0FBVyxLQUF4QjtBQUNBLHNCQUFLLE1BQUwsR0FBYyxNQUFLLEtBQUwsQ0FBVyxNQUF6QjtBQUNILGFBSkQ7QUFLQSxpQkFBSyxLQUFMLENBQVcsR0FBWCxHQUFpQiw4QkFBakI7QUFDSDs7QUFFRDs7Ozs7Ozs7NkJBS0ssRyxFQUFLLE0sRUFBUTtBQUNkLGdCQUFJLFNBQUosQ0FBYyxLQUFLLEtBQW5CLEVBQTBCLEtBQUssQ0FBTCxHQUFTLE9BQU8sQ0FBMUMsRUFBNkMsS0FBSyxDQUFMLEdBQVMsT0FBTyxDQUE3RDtBQUNIOzs7Ozs7a0JBR1UsZTs7Ozs7Ozs7Ozs7QUNoSGY7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTSxVOzs7QUFFRjs7Ozs7OztBQU9BLHNCQUFZLENBQVosRUFBZSxDQUFmLEVBQWtCO0FBQUE7O0FBQUEsd0hBQ1IsQ0FEUSxFQUNMLENBREssRUFDRixHQURFLEVBQ0csRUFESCxFQUNPLEVBRFAsRUFDVyxFQURYOztBQUVkLHdIQUFnQix5QkFBaEI7QUFGYztBQUdqQjs7Ozs7a0JBR1UsVTs7Ozs7Ozs7Ozs7QUNwQmY7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTSxROzs7QUFFRjs7Ozs7OztBQU9BLG9CQUFZLENBQVosRUFBZSxDQUFmLEVBQWtCO0FBQUE7O0FBQUEsb0hBQ1IsQ0FEUSxFQUNMLENBREssRUFDRixHQURFLEVBQ0csR0FESCxFQUNRLEVBRFIsRUFDWSxJQURaOztBQUVkLFVBQUssYUFBTCxHQUFxQixHQUFyQjtBQUNBLFVBQUssaUJBQUwsR0FBeUIsQ0FBekI7QUFDQSxVQUFLLGtCQUFMLEdBQTBCLEdBQTFCO0FBQ0EsVUFBSyxXQUFMLEdBQW1CLENBQW5CO0FBQ0Esb0hBQWdCLHVCQUFoQjtBQU5jO0FBT2pCOzs7OztrQkFHVSxROzs7Ozs7Ozs7OztBQ3hCZjs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdNLGU7OztBQUVGOzs7Ozs7O0FBT0EsMkJBQVksQ0FBWixFQUFlLENBQWYsRUFBa0I7QUFBQTs7QUFBQSxrSUFDUixDQURRLEVBQ0wsQ0FESyxFQUNGLEVBREUsRUFDRSxFQURGLEVBQ00sRUFETixFQUNVLEdBRFY7O0FBRWQsVUFBSyxhQUFMLEdBQXFCLEdBQXJCO0FBQ0EsVUFBSyxpQkFBTCxHQUF5QixDQUF6QjtBQUNBLFVBQUssa0JBQUwsR0FBMEIsR0FBMUI7QUFDQSxVQUFLLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxrSUFBZ0IsOEJBQWhCO0FBTmM7QUFPakI7Ozs7O2tCQUdVLGU7Ozs7Ozs7Ozs7O0FDeEJmOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR00sWTs7O0FBRUY7Ozs7Ozs7QUFPQSx3QkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQjtBQUFBOztBQUFBLDRIQUNSLENBRFEsRUFDTCxDQURLLEVBQ0YsRUFERSxFQUNFLEVBREYsRUFDTSxFQUROLEVBQ1UsR0FEVjs7QUFFZCw0SEFBZ0IsMkJBQWhCO0FBRmM7QUFHakI7Ozs7O2tCQUdVLFk7Ozs7Ozs7Ozs7O0FDcEJmOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR00sUzs7O0FBRUY7Ozs7Ozs7QUFPQSxxQkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQjtBQUFBOztBQUFBLHNIQUNSLENBRFEsRUFDTCxDQURLLEVBQ0YsRUFERSxFQUNFLEdBREYsRUFDUSxFQURSLEVBQ1ksR0FEWjs7QUFFZCxzSEFBZ0Isd0JBQWhCO0FBRmM7QUFHakI7Ozs7O2tCQUdVLFM7Ozs7Ozs7Ozs7O0FDcEJmOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR00sSTs7O0FBRUY7Ozs7OztBQU1BLGdCQUFZLENBQVosRUFBZSxDQUFmLEVBQWtCO0FBQUE7O0FBQUEsNEdBQ1IsQ0FEUSxFQUNMLENBREssRUFDRixNQURFLEVBQ00sS0FETjs7QUFFZCw0R0FBZ0IsbUJBQWhCO0FBRmM7QUFHakI7Ozs7O2tCQUdVLEk7Ozs7Ozs7Ozs7O0FDbkJmOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR00sSzs7O0FBRUY7Ozs7OztBQU1BLGlCQUFZLENBQVosRUFBZSxDQUFmLEVBQWtCO0FBQUE7O0FBQUEsOEdBQ1IsQ0FEUSxFQUNMLENBREssRUFDRixHQURFLEVBQ0csSUFESDs7QUFFZCw4R0FBZ0Isb0JBQWhCO0FBRmM7QUFHakI7Ozs7O2tCQUdVLEs7Ozs7Ozs7Ozs7Ozs7QUNuQmY7OztJQUdNLGlCOztBQUVGOzs7Ozs7O0FBT0EsK0JBQVksQ0FBWixFQUFlLENBQWYsRUFBa0IsTUFBbEIsRUFBMEIsVUFBMUIsRUFBc0M7QUFBQTs7QUFDbEMsYUFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsYUFBSyxVQUFMLEdBQWtCLFVBQWxCO0FBQ0g7O0FBRUQ7Ozs7Ozs7OztvQ0FLWSxDLEVBQUcsQyxFQUFHO0FBQ2QsaUJBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxpQkFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNIOztBQUVEOzs7Ozs7OztrQ0FLVSxHLEVBQUs7QUFBQTs7QUFDWCxpQkFBSyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0EsaUJBQUssS0FBTCxHQUFhLElBQUksS0FBSixFQUFiO0FBQ0EsaUJBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsWUFBTTtBQUN0QixzQkFBSyxhQUFMLEdBQXFCLElBQXJCO0FBQ0Esc0JBQUssS0FBTCxHQUFhLE1BQUssS0FBTCxDQUFXLEtBQXhCO0FBQ0Esc0JBQUssTUFBTCxHQUFjLE1BQUssS0FBTCxDQUFXLE1BQXpCO0FBQ0gsYUFKRDtBQUtBLGlCQUFLLEtBQUwsQ0FBVyxHQUFYLEdBQWlCLEdBQWpCO0FBQ0g7O0FBRUQ7Ozs7Ozs7OzZCQUtLLEcsRUFBSyxNLEVBQVE7QUFDZCxnQkFBSSxTQUFKLENBQWMsS0FBSyxLQUFuQixFQUEwQixLQUFLLENBQUwsR0FBUyxPQUFPLENBQTFDLEVBQTZDLEtBQUssQ0FBTCxHQUFTLE9BQU8sQ0FBN0Q7QUFDSDs7Ozs7O2tCQUdVLGlCOzs7Ozs7Ozs7OztBQ3ZEZjs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdNLEk7OztBQUVGOzs7Ozs7QUFNQSxnQkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQjtBQUFBOztBQUFBLDRHQUNSLENBRFEsRUFDTCxDQURLLEVBQ0YsR0FERSxFQUNHLElBREg7O0FBRWQsNEdBQWdCLG1CQUFoQjtBQUZjO0FBR2pCOzs7OztrQkFHVSxJOzs7Ozs7Ozs7Ozs7O0lDbkJULFU7QUFFRix3QkFBWSxZQUFaLEVBQTBCO0FBQUE7O0FBQUE7O0FBQ3RCLGFBQUssV0FBTCxHQUFtQixFQUFuQjtBQUNBLGFBQUssS0FBTCxHQUFhLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBYjtBQUNBLGFBQUssWUFBTCxHQUFvQixLQUFwQjs7QUFFQSxxQkFBYSxnQkFBYixDQUE4QixTQUE5QixFQUF5QyxVQUFDLEtBQUQsRUFBVztBQUNoRCxrQkFBSyxXQUFMLENBQWlCLE1BQU0sT0FBdkIsSUFBa0MsSUFBbEM7QUFDSCxTQUZEOztBQUlBLHFCQUFhLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLFVBQUMsS0FBRCxFQUFXO0FBQzlDLGtCQUFLLFdBQUwsQ0FBaUIsTUFBTSxPQUF2QixJQUFrQyxLQUFsQztBQUNILFNBRkQ7O0FBSUEscUJBQWEsZ0JBQWIsQ0FBOEIsV0FBOUIsRUFBMkMsVUFBQyxLQUFELEVBQVc7QUFDbEQsa0JBQUssS0FBTCxDQUFXLENBQVgsSUFBZ0IsTUFBTSxPQUF0QjtBQUNBLGtCQUFLLEtBQUwsQ0FBVyxDQUFYLElBQWdCLE1BQU0sT0FBdEI7QUFDSCxTQUhEOztBQUtBLHFCQUFhLGdCQUFiLENBQThCLFdBQTlCLEVBQTJDLFVBQUMsS0FBRCxFQUFXO0FBQ2xELGtCQUFLLFlBQUwsR0FBb0IsSUFBcEI7QUFDSCxTQUZEOztBQUlBLHFCQUFhLGdCQUFiLENBQThCLFNBQTlCLEVBQXlDLFVBQUMsS0FBRCxFQUFXO0FBQ2hELGtCQUFLLFlBQUwsR0FBb0IsS0FBcEI7QUFDSCxTQUZEO0FBR0g7Ozs7cUNBRVksRyxFQUFLO0FBQ2QsbUJBQU8sS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQVA7QUFDSDs7O3lDQUVnQjtBQUNiLG1CQUFPLEtBQUssWUFBWjtBQUNIOzs7MkNBRWtCO0FBQ2YsbUJBQU8sS0FBSyxLQUFaO0FBQ0g7Ozs7OztrQkFHVSxVOzs7Ozs7Ozs7OztBQzFDZjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU0sSTtBQUVGLGtCQUFZLE1BQVosRUFBb0IsWUFBcEIsRUFBa0M7QUFBQTs7QUFDOUIsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGFBQUssR0FBTCxHQUFXLE9BQU8sVUFBUCxDQUFrQixJQUFsQixDQUFYO0FBQ0EsYUFBSyxLQUFMLEdBQWEsb0JBQVUsTUFBVixDQUFiO0FBQ0EsYUFBSyxVQUFMLEdBQWtCLHlCQUFlLFlBQWYsQ0FBbEI7QUFDQSxhQUFLLE1BQUwsR0FBYyxzQkFBZDtBQUNIOzs7OytCQUVNLFEsRUFBVTtBQUNiLGdCQUFHLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsTUFBbEIsR0FBMkIsQ0FBOUIsRUFBaUM7QUFDN0Isb0JBQUksS0FBSyxVQUFMLENBQWdCLFlBQWhCLENBQTZCLEVBQTdCLENBQUosRUFBc0M7QUFBRTtBQUNwQyx3QkFBRyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLENBQWxCLElBQXVCLENBQTFCLEVBQTZCO0FBQ3pCLDZCQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLENBQWxCLElBQXVCLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsS0FBbEIsR0FBMEIsUUFBakQ7QUFDQSw0QkFBRyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLGdDQUFsQixDQUFtRCxLQUFLLEtBQUwsQ0FBVyxrQkFBOUQsQ0FBSCxFQUFzRjtBQUNsRixpQ0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixDQUFsQixJQUF1QixLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEtBQWxCLEdBQTBCLFFBQWpEO0FBQ0g7QUFDSjtBQUNKO0FBQ0Qsb0JBQUksS0FBSyxVQUFMLENBQWdCLFlBQWhCLENBQTZCLEVBQTdCLENBQUosRUFBc0M7QUFBRTtBQUNwQyx3QkFBRyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLENBQWxCLEdBQXNCLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsTUFBeEMsSUFBa0QsSUFBckQsRUFBMkQ7QUFDdkQsNkJBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsQ0FBbEIsSUFBdUIsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixLQUFsQixHQUEwQixRQUFqRDtBQUNBLDRCQUFHLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsZ0NBQWxCLENBQW1ELEtBQUssS0FBTCxDQUFXLGtCQUE5RCxDQUFILEVBQXNGO0FBQ2xGLGlDQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLENBQWxCLElBQXVCLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsS0FBbEIsR0FBMEIsUUFBakQ7QUFDSDtBQUNKO0FBQ0o7QUFDRCxvQkFBSSxLQUFLLFVBQUwsQ0FBZ0IsWUFBaEIsQ0FBNkIsRUFBN0IsQ0FBSixFQUFzQztBQUFFO0FBQ3BDLHdCQUFHLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsQ0FBbEIsSUFBdUIsQ0FBMUIsRUFBNkI7QUFDekIsNkJBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsQ0FBbEIsSUFBdUIsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixLQUFsQixHQUEwQixRQUFqRDtBQUNBLDRCQUFHLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsZ0NBQWxCLENBQW1ELEtBQUssS0FBTCxDQUFXLGtCQUE5RCxDQUFILEVBQXNGO0FBQ2xGLGlDQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLENBQWxCLElBQXVCLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsS0FBbEIsR0FBMEIsUUFBakQ7QUFDSDtBQUNKO0FBQ0o7QUFDRCxvQkFBSSxLQUFLLFVBQUwsQ0FBZ0IsWUFBaEIsQ0FBNkIsRUFBN0IsQ0FBSixFQUFzQztBQUFFO0FBQ3BDLHdCQUFHLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsQ0FBbEIsR0FBc0IsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixLQUF4QyxJQUFpRCxLQUFwRCxFQUEyRDtBQUN2RCw2QkFBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixDQUFsQixJQUF1QixLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEtBQWxCLEdBQTBCLFFBQWpEO0FBQ0EsNEJBQUcsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixnQ0FBbEIsQ0FBbUQsS0FBSyxLQUFMLENBQVcsa0JBQTlELENBQUgsRUFBc0Y7QUFDbEYsaUNBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsQ0FBbEIsSUFBdUIsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixLQUFsQixHQUEwQixRQUFqRDtBQUNIO0FBQ0o7QUFDSjtBQUNELG9CQUFHLEtBQUssVUFBTCxDQUFnQixjQUFoQixFQUFILEVBQXFDO0FBQ2pDLHdCQUFJLE1BQU0sS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixTQUFsQixDQUE0QixLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLFlBQTlDLENBQVY7QUFDQSx3QkFBSSxRQUFRLEtBQUssVUFBTCxDQUFnQixnQkFBaEIsRUFBWjs7QUFFQTtBQUNBO0FBQ0Esd0JBQUcsK0JBQUgsRUFBMEI7QUFDdEIsNEJBQUcsSUFBSSxRQUFKLElBQWdCLENBQW5CLEVBQXFCO0FBQ2pCLGlDQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLElBQW5CLENBQXdCLHdCQUFjLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsQ0FBbEIsR0FBc0IsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixLQUFsQixHQUF3QixDQUE1RCxFQUErRCxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLENBQWpGLEVBQW9GLE1BQU0sQ0FBTixJQUFTLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsQ0FBL0csRUFBa0gsTUFBTSxDQUFOLElBQVMsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixDQUE3SSxDQUF4QjtBQUNBLGdDQUFJLEtBQUosQ0FBVSxJQUFWO0FBQ0EsZ0NBQUksS0FBSixDQUFVLFdBQVYsR0FBd0IsQ0FBeEI7QUFDQSxnQ0FBSSxRQUFKLElBQWMsR0FBZDtBQUNIO0FBQ0oscUJBUEQsTUFRSyxJQUFHLCtCQUFILEVBQTBCO0FBQzNCLDRCQUFHLElBQUksUUFBSixJQUFnQixDQUFuQixFQUFzQjtBQUNsQixpQ0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixJQUFuQixDQUF3QiwwQkFBZ0IsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixDQUFsQixHQUFzQixLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEtBQWxCLEdBQXdCLENBQTlELEVBQWlFLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsQ0FBbkYsRUFBc0YsTUFBTSxDQUFOLElBQVMsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixDQUFqSCxFQUFvSCxNQUFNLENBQU4sSUFBUyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLENBQS9JLENBQXhCO0FBQ0EsZ0NBQUksS0FBSixDQUFVLElBQVY7QUFDQSxnQ0FBSSxLQUFKLENBQVUsV0FBVixHQUF3QixDQUF4QjtBQUNBLGdDQUFJLFFBQUosSUFBYyxHQUFkO0FBQ0g7QUFDSixxQkFQSSxNQVFBLElBQUcscUNBQUgsRUFBZ0M7QUFDakMsNEJBQUcsSUFBSSxRQUFKLElBQWdCLENBQW5CLEVBQXFCO0FBQ2pCLGlDQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLElBQW5CLENBQXdCLHFCQUFjLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsQ0FBbEIsR0FBc0IsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixLQUFsQixHQUF3QixDQUE1RCxFQUErRCxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLENBQWpGLEVBQW9GLE1BQU0sQ0FBTixJQUFTLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsQ0FBL0csRUFBa0gsTUFBTSxDQUFOLElBQVMsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixDQUE3SSxDQUF4QjtBQUNBLGdDQUFJLEtBQUosQ0FBVSxJQUFWO0FBQ0EsZ0NBQUksS0FBSixDQUFVLFdBQVYsR0FBd0IsQ0FBeEI7QUFDQSxnQ0FBSSxRQUFKLElBQWMsRUFBZDtBQUNIO0FBQ0o7QUFDRDtBQUNBO0FBQ0g7QUFDRDtBQUNBLG9CQUFJLEtBQUssVUFBTCxDQUFnQixZQUFoQixDQUE2QixFQUE3QixDQUFKLEVBQXNDO0FBQUU7QUFDcEMseUJBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsWUFBbEIsR0FBaUMsQ0FBakM7QUFDSDtBQUNELG9CQUFJLEtBQUssVUFBTCxDQUFnQixZQUFoQixDQUE2QixFQUE3QixDQUFKLEVBQXNDO0FBQUU7QUFDcEMseUJBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsWUFBbEIsR0FBaUMsQ0FBakM7QUFDSDtBQUNELG9CQUFJLEtBQUssVUFBTCxDQUFnQixZQUFoQixDQUE2QixFQUE3QixDQUFKLEVBQXNDO0FBQUU7QUFDcEMseUJBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsWUFBbEIsR0FBaUMsQ0FBakM7QUFDSDtBQUNELHFCQUFJLElBQUksSUFBSSxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLE1BQW5CLEdBQTRCLENBQXhDLEVBQTJDLEtBQUssQ0FBaEQsRUFBbUQsR0FBbkQsRUFBd0Q7QUFDcEQseUJBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsQ0FBbkIsRUFBc0IsSUFBdEIsQ0FBMkIsUUFBM0IsRUFBcUMsS0FBSyxLQUFMLENBQVcsa0JBQWhELEVBQW9FLEtBQUssS0FBTCxDQUFXLE9BQS9FO0FBQ0Esd0JBQUcsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixDQUFuQixFQUFzQixJQUF0QixLQUErQixLQUFsQyxFQUF5QztBQUNyQyw2QkFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUFuQixDQUEwQixDQUExQixFQUE2QixDQUE3QjtBQUNIO0FBQ0o7QUFDSixhQWxGRCxNQW1GSztBQUNELG9CQUFHLEtBQUssVUFBTCxDQUFnQixjQUFoQixFQUFILEVBQXFDO0FBQ2pDLHdCQUFJLFNBQVEsS0FBSyxVQUFMLENBQWdCLGdCQUFoQixFQUFaOztBQUVBLHdCQUFHLE9BQU0sQ0FBTixJQUFXLEtBQUssTUFBTCxDQUFZLEtBQVosR0FBa0IsQ0FBbEIsR0FBc0IsR0FBakMsSUFBd0MsT0FBTSxDQUFOLElBQVksS0FBSyxNQUFMLENBQVksS0FBWixHQUFrQixDQUFsQixHQUFzQixHQUF0QixHQUEwQixHQUE5RSxJQUNJLE9BQU0sQ0FBTixJQUFXLEtBQUssTUFBTCxDQUFZLE1BQVosR0FBbUIsQ0FBbkIsR0FBdUIsRUFEdEMsSUFDNEMsT0FBTSxDQUFOLElBQVcsS0FBSyxNQUFMLENBQVksTUFBWixHQUFtQixDQUFuQixHQUF1QixFQUF2QixHQUE0QixHQUR0RixFQUMyRjtBQUN2Riw2QkFBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixLQUFLLE1BQXRCO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsaUJBQUksSUFBSSxLQUFJLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsTUFBbkIsR0FBNEIsQ0FBeEMsRUFBMkMsTUFBSyxDQUFoRCxFQUFtRCxJQUFuRCxFQUF3RDtBQUNwRCxxQkFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixFQUFuQixFQUFzQixJQUF0QixDQUEyQixLQUFLLEtBQUwsQ0FBVyxNQUF0QyxFQUE4QyxRQUE5QyxFQUF3RCxLQUFLLEtBQUwsQ0FBVyxrQkFBbkU7QUFDQSxvQkFBRyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEVBQW5CLEVBQXNCLGNBQXRCLEdBQXVDLENBQTFDLEVBQ0ksS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixFQUFuQixFQUFzQixjQUF0QixJQUF3QyxDQUF4QztBQUNKLG9CQUFHLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsRUFBbkIsMENBQW9ELEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsRUFBbkIsK0JBQXZELEVBQWtHO0FBQzlGLHdCQUFHLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsRUFBbkIsRUFBc0IsYUFBdEIsR0FBc0MsQ0FBekMsRUFDSSxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEVBQW5CLEVBQXNCLGFBQXRCLElBQXVDLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsRUFBbkIsRUFBc0IsaUJBQTdELENBREosS0FFSztBQUNELDZCQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixJQUE1QixDQUFpQyw4QkFBb0IsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixFQUFuQixFQUFzQixDQUF0QixHQUEwQixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEVBQW5CLEVBQXNCLEtBQXRCLEdBQTRCLENBQTFFLEVBQTZFLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsRUFBbkIsRUFBc0IsQ0FBdEIsR0FBMEIsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixFQUFuQixFQUFzQixNQUF0QixHQUE2QixDQUFwSSxFQUF1SSxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLENBQWxCLEdBQXNCLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsS0FBbEIsR0FBd0IsQ0FBckwsRUFBd0wsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixDQUFsQixHQUFzQixLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLE1BQWxCLEdBQXlCLENBQXZPLENBQWpDO0FBQ0EsNkJBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsRUFBbkIsRUFBc0IsYUFBdEIsSUFBdUMsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixFQUFuQixFQUFzQixrQkFBN0Q7QUFDSDtBQUNKO0FBQ0Qsb0JBQUcsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixFQUFuQixFQUFzQixNQUF0QixJQUFnQyxDQUFuQyxFQUNJLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsTUFBbkIsQ0FBMEIsRUFBMUIsRUFBNkIsQ0FBN0I7QUFDUDtBQUNEO0FBQ0EsaUJBQUssSUFBSSxNQUFJLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsU0FBbEIsQ0FBNEIsTUFBNUIsR0FBcUMsQ0FBbEQsRUFBcUQsT0FBSyxDQUExRCxFQUE2RCxLQUE3RCxFQUFrRTtBQUNoRSxvQkFBSSxPQUFNLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsU0FBbEIsQ0FBNEIsR0FBNUIsQ0FBVjtBQUNBLG9CQUFHLEtBQUksUUFBSixHQUFlLENBQWxCLEVBQW9CO0FBQ2xCLHlCQUFJLFFBQUosSUFBZSxDQUFmO0FBQ0Q7QUFDRjtBQUNELGlCQUFJLElBQUksTUFBSSxLQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixNQUE1QixHQUFxQyxDQUFqRCxFQUFvRCxPQUFLLENBQXpELEVBQTRELEtBQTVELEVBQWlFO0FBQzdELHFCQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixHQUE1QixFQUErQixJQUEvQixDQUFvQyxRQUFwQyxFQUE4QyxLQUFLLEtBQUwsQ0FBVyxrQkFBekQsRUFBNkUsS0FBSyxLQUFMLENBQVcsTUFBeEY7QUFDQSxvQkFBRyxLQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixHQUE1QixFQUErQixJQUEvQixLQUF3QyxLQUEzQyxFQUFrRDtBQUM5Qyx5QkFBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsTUFBNUIsQ0FBbUMsR0FBbkMsRUFBc0MsQ0FBdEM7QUFDSDtBQUNKOztBQUVELGlCQUFJLElBQUksTUFBSSxLQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixNQUE5QixHQUF1QyxDQUFuRCxFQUFzRCxPQUFLLENBQTNELEVBQThELEtBQTlELEVBQW1FO0FBQy9ELG9CQUFHLEtBQUssS0FBTCxDQUFXLGtCQUFYLENBQThCLEdBQTlCLEVBQWlDLE1BQWpDLElBQTJDLENBQTlDLEVBQ0ksS0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsTUFBOUIsQ0FBcUMsR0FBckMsRUFBd0MsQ0FBeEM7QUFDUDs7QUFFRCxnQkFBRyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLE1BQW5CLEtBQThCLENBQWpDLEVBQW9DO0FBQ2hDLHFCQUFLLEtBQUwsQ0FBVyxJQUFYLElBQW1CLENBQW5CO0FBQ0EscUJBQUssS0FBTCxDQUFXLFNBQVg7QUFDSDs7QUFFRCxpQkFBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixNQUFsQjtBQUVIOzs7K0JBRU07QUFDSCxnQkFBSSxRQUFRLEtBQUssVUFBTCxDQUFnQixnQkFBaEIsRUFBWjtBQUNBLGdCQUFHLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsTUFBbEIsR0FBMkIsQ0FBOUIsRUFBaUM7QUFDN0IscUJBQUssR0FBTCxDQUFTLElBQVQsR0FBZ0Isa0JBQWhCO0FBQ0EscUJBQUssR0FBTCxDQUFTLFNBQVQsR0FBcUIsUUFBckI7QUFDQSxxQkFBSyxHQUFMLENBQVMsU0FBVCxHQUFxQixNQUFyQjtBQUNBLHFCQUFLLEdBQUwsQ0FBUyxRQUFULENBQWtCLFdBQWxCLEVBQStCLEtBQUssTUFBTCxDQUFZLEtBQVosR0FBa0IsQ0FBakQsRUFBb0QsS0FBSyxNQUFMLENBQVksTUFBWixHQUFtQixDQUF2RTtBQUNBLHFCQUFLLEdBQUwsQ0FBUyxTQUFULEdBQXFCLE1BQXJCO0FBQ0EscUJBQUssR0FBTCxDQUFTLFVBQVQsQ0FBb0IsV0FBcEIsRUFBaUMsS0FBSyxNQUFMLENBQVksS0FBWixHQUFrQixDQUFuRCxFQUFzRCxLQUFLLE1BQUwsQ0FBWSxNQUFaLEdBQW1CLENBQXpFO0FBQ0EscUJBQUssR0FBTCxDQUFTLFNBQVQsR0FBcUIsTUFBckI7QUFDQSxxQkFBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixLQUFLLE1BQUwsQ0FBWSxLQUFaLEdBQWtCLENBQWxCLEdBQXNCLEdBQXhDLEVBQTZDLEtBQUssTUFBTCxDQUFZLE1BQVosR0FBbUIsQ0FBbkIsR0FBdUIsRUFBcEUsRUFBd0UsR0FBeEUsRUFBNkUsR0FBN0U7QUFDQSxxQkFBSyxHQUFMLENBQVMsVUFBVCxDQUFvQixLQUFLLE1BQUwsQ0FBWSxLQUFaLEdBQWtCLENBQWxCLEdBQXNCLEdBQTFDLEVBQStDLEtBQUssTUFBTCxDQUFZLE1BQVosR0FBbUIsQ0FBbkIsR0FBdUIsRUFBdEUsRUFBMEUsR0FBMUUsRUFBK0UsR0FBL0U7QUFDQSxxQkFBSyxHQUFMLENBQVMsSUFBVCxHQUFnQixpQkFBaEI7QUFDQSxxQkFBSyxHQUFMLENBQVMsU0FBVCxHQUFxQixRQUFyQjtBQUNBLHFCQUFLLEdBQUwsQ0FBUyxTQUFULEdBQXFCLE1BQXJCO0FBQ0EscUJBQUssR0FBTCxDQUFTLFFBQVQsQ0FBa0IsWUFBbEIsRUFBZ0MsS0FBSyxNQUFMLENBQVksS0FBWixHQUFrQixDQUFsQixHQUFzQixHQUF0QixHQUE0QixHQUE1RCxFQUFpRSxLQUFLLE1BQUwsQ0FBWSxNQUFaLEdBQW1CLENBQW5CLEdBQXVCLEVBQXZCLEdBQTRCLEVBQTdGO0FBQ0gsYUFkRCxNQWVLO0FBQ0Qsb0JBQUcsS0FBSyxLQUFMLENBQVcsa0JBQWQsRUFBa0M7QUFDOUIseUJBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsS0FBSyxHQUEvQixFQUFvQyxLQUFLLE1BQXpDO0FBQ0g7QUFDRCxxQkFBSSxJQUFJLElBQUksQ0FBWixFQUFlLElBQUksS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUF0QyxFQUE4QyxHQUE5QyxFQUFtRDtBQUMvQyx3QkFBRyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLENBQW5CLEVBQXNCLGFBQXpCLEVBQXdDO0FBQ3BDLDZCQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLENBQW5CLEVBQXNCLElBQXRCLENBQTJCLEtBQUssR0FBaEMsRUFBcUMsS0FBSyxLQUFMLENBQVcsTUFBaEQ7QUFDSDtBQUNKO0FBQ0QscUJBQUksSUFBSSxNQUFJLENBQVosRUFBZSxNQUFJLEtBQUssS0FBTCxDQUFXLGtCQUFYLENBQThCLE1BQWpELEVBQXlELEtBQXpELEVBQThEO0FBQzFELHdCQUFHLEtBQUssS0FBTCxDQUFXLGtCQUFYLENBQThCLEdBQTlCLEVBQWlDLGFBQXBDLEVBQW1EO0FBQy9DLDZCQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixHQUE5QixFQUFpQyxJQUFqQyxDQUFzQyxLQUFLLEdBQTNDLEVBQWdELEtBQUssS0FBTCxDQUFXLE1BQTNEO0FBQ0g7QUFDSjs7QUFFRCxxQkFBSSxJQUFJLE1BQUksQ0FBWixFQUFlLE1BQUksS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUF0QyxFQUE4QyxLQUE5QyxFQUFtRDtBQUMvQyx3QkFBRyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEdBQW5CLEVBQXNCLGFBQXRCLElBQXVDLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsR0FBbkIsRUFBc0IsSUFBaEUsRUFBc0U7QUFDbEUsNkJBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsR0FBbkIsRUFBc0IsSUFBdEIsQ0FBMkIsS0FBSyxHQUFoQyxFQUFxQyxLQUFLLEtBQUwsQ0FBVyxNQUFoRDtBQUNIO0FBQ0o7QUFDRCxxQkFBSSxJQUFJLE1BQUksQ0FBWixFQUFlLE1BQUksS0FBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsTUFBL0MsRUFBdUQsS0FBdkQsRUFBNEQ7QUFDeEQsd0JBQUcsS0FBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsR0FBNUIsRUFBK0IsYUFBL0IsSUFBZ0QsS0FBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsR0FBNUIsRUFBK0IsSUFBbEYsRUFBd0Y7QUFDcEYsNkJBQUssS0FBTCxDQUFXLGdCQUFYLENBQTRCLEdBQTVCLEVBQStCLElBQS9CLENBQW9DLEtBQUssR0FBekMsRUFBOEMsS0FBSyxLQUFMLENBQVcsTUFBekQ7QUFDSDtBQUNKOztBQUVELG9CQUFHLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsYUFBckIsRUFBb0M7QUFDaEMseUJBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsSUFBbEIsQ0FBdUIsS0FBSyxHQUE1QixFQUFpQyxLQUFLLEtBQUwsQ0FBVyxNQUE1QyxFQUFvRCxLQUFwRDtBQUNBLHlCQUFLLEdBQUwsQ0FBUyxJQUFULEdBQWdCLGlCQUFoQjtBQUNBLHlCQUFLLEdBQUwsQ0FBUyxTQUFULEdBQXFCLFFBQXJCO0FBQ0EseUJBQUssR0FBTCxDQUFTLFNBQVQsR0FBcUIsTUFBckI7QUFDQSx5QkFBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLE1BQWxCLEdBQTJCLEtBQTdDLEVBQW9ELEtBQUssTUFBTCxDQUFZLEtBQVosR0FBa0IsQ0FBbEIsR0FBc0IsR0FBMUUsRUFBK0UsRUFBL0U7QUFDQSx5QkFBSyxHQUFMLENBQVMsVUFBVCxDQUFvQixLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLE1BQWxCLEdBQTJCLEtBQS9DLEVBQXNELEtBQUssTUFBTCxDQUFZLEtBQVosR0FBa0IsQ0FBbEIsR0FBc0IsR0FBNUUsRUFBaUYsRUFBakY7QUFDQSx5QkFBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixVQUFVLEtBQUssS0FBTCxDQUFXLElBQXZDLEVBQTZDLEtBQUssTUFBTCxDQUFZLEtBQVosR0FBa0IsQ0FBL0QsRUFBa0UsRUFBbEU7QUFDQSx5QkFBSyxHQUFMLENBQVMsVUFBVCxDQUFvQixVQUFVLEtBQUssS0FBTCxDQUFXLElBQXpDLEVBQStDLEtBQUssTUFBTCxDQUFZLEtBQVosR0FBa0IsQ0FBakUsRUFBb0UsRUFBcEU7QUFDQSx5QkFBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLE1BQW5CLEdBQTRCLGVBQTlDLEVBQStELEtBQUssTUFBTCxDQUFZLEtBQVosR0FBa0IsQ0FBbEIsR0FBc0IsR0FBckYsRUFBMEYsRUFBMUY7QUFDQSx5QkFBSyxHQUFMLENBQVMsVUFBVCxDQUFvQixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLE1BQW5CLEdBQTRCLGVBQWhELEVBQWlFLEtBQUssTUFBTCxDQUFZLEtBQVosR0FBa0IsQ0FBbEIsR0FBc0IsR0FBdkYsRUFBNEYsRUFBNUY7QUFDQSx5QkFBSyxHQUFMLENBQVMsSUFBVCxHQUFnQixpQkFBaEI7QUFDQSx5QkFBSyxHQUFMLENBQVMsU0FBVCxHQUFxQixRQUFyQjtBQUNBLHlCQUFLLEdBQUwsQ0FBUyxTQUFULEdBQXFCLE1BQXJCO0FBQ0EseUJBQUssR0FBTCxDQUFTLFFBQVQsQ0FBa0Isb0JBQW9CLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsU0FBbEIsQ0FBNEIsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixZQUE5QyxFQUE0RCxJQUFsRyxFQUF3RyxLQUFLLE1BQUwsQ0FBWSxLQUFaLEdBQWtCLENBQTFILEVBQTZILEdBQTdIO0FBQ0EseUJBQUssR0FBTCxDQUFTLFVBQVQsQ0FBb0Isb0JBQW9CLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsU0FBbEIsQ0FBNEIsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixZQUE5QyxFQUE0RCxJQUFwRyxFQUEwRyxLQUFLLE1BQUwsQ0FBWSxLQUFaLEdBQWtCLENBQTVILEVBQStILEdBQS9IOztBQUVBO0FBQ0EseUJBQUssR0FBTCxDQUFTLFNBQVQsR0FBcUIsd0JBQXJCO0FBQ0EseUJBQUssR0FBTCxDQUFTLFFBQVQsQ0FBa0IsS0FBSyxNQUFMLENBQVksS0FBWixHQUFvQixHQUF0QyxFQUEyQyxFQUEzQyxFQUErQyxHQUEvQyxFQUFvRCxHQUFwRDtBQUNBLHlCQUFLLEdBQUwsQ0FBUyxVQUFULENBQW9CLEtBQUssTUFBTCxDQUFZLEtBQVosR0FBb0IsR0FBeEMsRUFBNkMsRUFBN0MsRUFBaUQsR0FBakQsRUFBc0QsR0FBdEQ7QUFDQSx3QkFBSSxXQUFXLENBQUMsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixDQUFsQixHQUFzQixLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEtBQWxCLEdBQXdCLENBQS9DLElBQW9ELEtBQUssS0FBTCxDQUFXLEtBQTlFO0FBQ0Esd0JBQUksV0FBVyxDQUFDLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsQ0FBbEIsR0FBc0IsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixNQUFsQixHQUF5QixDQUFoRCxJQUFxRCxLQUFLLEtBQUwsQ0FBVyxNQUEvRTtBQUNBLHdCQUFJLFlBQVksV0FBUyxHQUF6QjtBQUNBLHdCQUFJLFlBQVksV0FBUyxHQUF6QjtBQUNBLHlCQUFLLEdBQUwsQ0FBUyxTQUFULEdBQXFCLFNBQXJCO0FBQ0EseUJBQUssR0FBTCxDQUFTLFNBQVQ7QUFDQSx5QkFBSyxHQUFMLENBQVMsR0FBVCxDQUFjLEtBQUssTUFBTCxDQUFZLEtBQVosR0FBb0IsR0FBckIsR0FBNEIsU0FBekMsRUFBb0QsS0FBSyxTQUF6RCxFQUFvRSxHQUFwRSxFQUF5RSxDQUF6RSxFQUE0RSxJQUFFLEtBQUssRUFBbkY7QUFDQSx5QkFBSyxHQUFMLENBQVMsSUFBVDtBQUNBLHlCQUFJLElBQUksTUFBSSxDQUFaLEVBQWUsTUFBSSxLQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixNQUFqRCxFQUF5RCxLQUF6RCxFQUE4RDtBQUMxRCw0QkFBRyxLQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixHQUE5QixFQUFpQyxhQUFwQyxFQUFtRDtBQUMvQyxnQ0FBSSxZQUFXLENBQUMsS0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsR0FBOUIsRUFBaUMsQ0FBakMsR0FBcUMsS0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsR0FBOUIsRUFBaUMsS0FBakMsR0FBdUMsQ0FBN0UsSUFBa0YsS0FBSyxLQUFMLENBQVcsS0FBNUc7QUFDQSxnQ0FBSSxZQUFXLENBQUMsS0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsR0FBOUIsRUFBaUMsQ0FBakMsR0FBcUMsS0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsR0FBOUIsRUFBaUMsTUFBakMsR0FBd0MsQ0FBOUUsSUFBbUYsS0FBSyxLQUFMLENBQVcsTUFBN0c7QUFDQSxnQ0FBSSxhQUFZLFlBQVMsR0FBekI7QUFDQSxnQ0FBSSxhQUFZLFlBQVMsR0FBekI7QUFDQTtBQUNBLGlDQUFLLEdBQUwsQ0FBUyxTQUFULEdBQXFCLFNBQXJCO0FBQ0EsaUNBQUssR0FBTCxDQUFTLFNBQVQ7QUFDQSxpQ0FBSyxHQUFMLENBQVMsR0FBVCxDQUFjLEtBQUssTUFBTCxDQUFZLEtBQVosR0FBb0IsR0FBckIsR0FBNEIsVUFBekMsRUFBb0QsS0FBSyxVQUF6RCxFQUFvRSxHQUFwRSxFQUF5RSxDQUF6RSxFQUE0RSxJQUFFLEtBQUssRUFBbkY7QUFDQSxpQ0FBSyxHQUFMLENBQVMsSUFBVDtBQUNIO0FBQ0o7QUFDRCx5QkFBSSxJQUFJLE1BQUksQ0FBWixFQUFlLE1BQUksS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixNQUF0QyxFQUE4QyxLQUE5QyxFQUFtRDtBQUMvQyw0QkFBRyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEdBQW5CLEVBQXNCLGFBQXpCLEVBQXdDO0FBQ3BDLGdDQUFJLGFBQVcsQ0FBQyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEdBQW5CLEVBQXNCLENBQXRCLEdBQTBCLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsR0FBbkIsRUFBc0IsS0FBdEIsR0FBNEIsQ0FBdkQsSUFBNEQsS0FBSyxLQUFMLENBQVcsS0FBdEY7QUFDQSxnQ0FBSSxhQUFXLENBQUMsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixHQUFuQixFQUFzQixDQUF0QixHQUEwQixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEdBQW5CLEVBQXNCLE1BQXRCLEdBQTZCLENBQXhELElBQTZELEtBQUssS0FBTCxDQUFXLE1BQXZGO0FBQ0EsZ0NBQUksY0FBWSxhQUFTLEdBQXpCO0FBQ0EsZ0NBQUksY0FBWSxhQUFTLEdBQXpCO0FBQ0EsaUNBQUssR0FBTCxDQUFTLFNBQVQsR0FBcUIsU0FBckI7QUFDQSxpQ0FBSyxHQUFMLENBQVMsU0FBVDtBQUNBLGlDQUFLLEdBQUwsQ0FBUyxHQUFULENBQWMsS0FBSyxNQUFMLENBQVksS0FBWixHQUFvQixHQUFyQixHQUE0QixXQUF6QyxFQUFvRCxLQUFLLFdBQXpELEVBQW9FLEdBQXBFLEVBQXlFLENBQXpFLEVBQTRFLElBQUUsS0FBSyxFQUFuRjtBQUNBLGlDQUFLLEdBQUwsQ0FBUyxJQUFUO0FBQ0g7QUFDSjs7QUFFRDtBQUNBLHlCQUFLLEdBQUwsQ0FBUyxJQUFULEdBQWdCLGlCQUFoQjtBQUNBLHlCQUFLLEdBQUwsQ0FBUyxTQUFULEdBQXFCLE1BQXJCO0FBQ0EseUJBQUssR0FBTCxDQUFTLFFBQVQsQ0FBa0IsV0FBVyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLENBQS9DLEVBQWtELEtBQUssTUFBTCxDQUFZLEtBQVosR0FBa0IsQ0FBbEIsR0FBc0IsR0FBeEUsRUFBNkUsR0FBN0U7QUFDQSx5QkFBSyxHQUFMLENBQVMsVUFBVCxDQUFvQixXQUFXLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsQ0FBakQsRUFBb0QsS0FBSyxNQUFMLENBQVksS0FBWixHQUFrQixDQUFsQixHQUFzQixHQUExRSxFQUErRSxHQUEvRTtBQUNBLHlCQUFLLEdBQUwsQ0FBUyxRQUFULENBQWtCLGNBQWMsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixDQUFsRCxFQUFxRCxLQUFLLE1BQUwsQ0FBWSxLQUFaLEdBQWtCLENBQXZFLEVBQTBFLEdBQTFFO0FBQ0EseUJBQUssR0FBTCxDQUFTLFVBQVQsQ0FBb0IsY0FBYyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLENBQXBELEVBQXVELEtBQUssTUFBTCxDQUFZLEtBQVosR0FBa0IsQ0FBekUsRUFBNEUsR0FBNUU7QUFDQSx5QkFBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixhQUFhLE1BQU0sQ0FBTixDQUEvQixFQUF5QyxLQUFLLE1BQUwsQ0FBWSxLQUFaLEdBQWtCLENBQWxCLEdBQXNCLEdBQS9ELEVBQW9FLEdBQXBFO0FBQ0EseUJBQUssR0FBTCxDQUFTLFVBQVQsQ0FBb0IsYUFBYSxNQUFNLENBQU4sQ0FBakMsRUFBMkMsS0FBSyxNQUFMLENBQVksS0FBWixHQUFrQixDQUFsQixHQUFzQixHQUFqRSxFQUFzRSxHQUF0RTtBQUNIO0FBQ0o7QUFDRCxpQkFBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixLQUFLLE1BQUwsQ0FBWSxLQUEvQixFQUFzQyxNQUFNLENBQU4sSUFBVyxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQWxCLEdBQXdCLENBQXpFLEVBQTRFLE1BQU0sQ0FBTixJQUFXLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsTUFBbEIsR0FBeUIsQ0FBaEg7QUFDSDs7Ozs7O2tCQUdVLEk7Ozs7Ozs7Ozs7O0FDcFJmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7OztJQUdNLEs7O0FBRUY7Ozs7QUFJQSxtQkFBWSxNQUFaLEVBQW9CO0FBQUE7O0FBQ2hCLGFBQUssS0FBTCxDQUFXLE1BQVg7QUFDQSxhQUFLLGNBQUw7QUFDSDs7QUFFRDs7Ozs7Ozs7OzhCQUtNLE0sRUFBUTtBQUNWLGlCQUFLLGtCQUFMLEdBQTBCLEVBQTFCO0FBQ0EsaUJBQUssT0FBTCxHQUFlLEVBQWY7QUFDQSxpQkFBSyxPQUFMLEdBQWUsRUFBZjtBQUNBLGlCQUFLLGdCQUFMLEdBQXdCLEVBQXhCO0FBQ0EsaUJBQUsscUJBQUw7QUFDQSxpQkFBSyxNQUFMLEdBQWMscUJBQVcsT0FBTyxLQUFQLEdBQWEsQ0FBeEIsRUFBMkIsT0FBTyxNQUFQLEdBQWMsQ0FBekMsQ0FBZDtBQUNBLGlCQUFLLE1BQUwsR0FBYyxxQkFBVyxDQUFYLEVBQWMsQ0FBZCxFQUFpQixPQUFPLEtBQXhCLEVBQStCLE9BQU8sTUFBdEMsRUFBOEMsS0FBOUMsRUFBcUQsSUFBckQsQ0FBZDtBQUNBLGlCQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLEtBQUssTUFBeEIsRUFBZ0MsT0FBTyxLQUFQLEdBQWEsQ0FBN0MsRUFBZ0QsT0FBTyxNQUFQLEdBQWMsQ0FBOUQ7QUFDQSxpQkFBSyxJQUFMLEdBQVksQ0FBWjtBQUNBLGlCQUFLLFNBQUw7QUFDSDs7QUFFRDs7Ozs7O2dEQUd3QjtBQUNwQixnQkFBSSxXQUFXLEVBQWY7QUFDQSxnQkFBSSxVQUFVLEVBQWQ7QUFDQSxnQkFBSSxVQUFVLEVBQWQ7O0FBRUEsaUJBQUksSUFBSSxJQUFJLENBQVosRUFBZSxJQUFJLFFBQW5CLEVBQTZCLEdBQTdCO0FBQ0kscUJBQUssa0JBQUwsQ0FBd0IsSUFBeEIsQ0FBNkIsb0JBQVUsZUFBSyxxQkFBTCxDQUEyQixHQUEzQixFQUFnQyxJQUFoQyxDQUFWLEVBQWlELGVBQUsscUJBQUwsQ0FBMkIsR0FBM0IsRUFBZ0MsSUFBaEMsQ0FBakQsQ0FBN0I7QUFESixhQUVBLEtBQUksSUFBSSxLQUFJLENBQVosRUFBZSxLQUFJLE9BQW5CLEVBQTRCLElBQTVCO0FBQ0kscUJBQUssa0JBQUwsQ0FBd0IsSUFBeEIsQ0FBNkIsbUJBQVMsZUFBSyxxQkFBTCxDQUEyQixHQUEzQixFQUFnQyxJQUFoQyxDQUFULEVBQWdELGVBQUsscUJBQUwsQ0FBMkIsR0FBM0IsRUFBZ0MsSUFBaEMsQ0FBaEQsQ0FBN0I7QUFESixhQUVBLEtBQUksSUFBSSxNQUFJLENBQVosRUFBZSxNQUFJLE9BQW5CLEVBQTRCLEtBQTVCO0FBQ0kscUJBQUssa0JBQUwsQ0FBd0IsSUFBeEIsQ0FBNkIsbUJBQVMsZUFBSyxxQkFBTCxDQUEyQixHQUEzQixFQUFnQyxJQUFoQyxDQUFULEVBQWdELGVBQUsscUJBQUwsQ0FBMkIsR0FBM0IsRUFBZ0MsSUFBaEMsQ0FBaEQsQ0FBN0I7QUFESixhQUdBLElBQUksZ0JBQWdCLElBQXBCO0FBQ0EsbUJBQU0sa0JBQWtCLElBQXhCLEVBQThCO0FBQzFCLG9CQUFJLE1BQUksZUFBSywyQkFBTCxDQUFpQyxLQUFLLGtCQUF0QyxDQUFSO0FBQ0Esb0JBQUcsUUFBTSxDQUFDLENBQVYsRUFDSSxnQkFBZ0IsS0FBaEIsQ0FESixLQUdJLEtBQUssa0JBQUwsQ0FBd0IsR0FBeEIsRUFBMkIsV0FBM0IsQ0FBdUMsZUFBSyxxQkFBTCxDQUEyQixHQUEzQixFQUFnQyxJQUFoQyxDQUF2QyxFQUE4RSxlQUFLLHFCQUFMLENBQTJCLEdBQTNCLEVBQWdDLElBQWhDLENBQTlFO0FBQ1A7QUFDSjs7QUFFRDs7Ozs7O29DQUdZO0FBQ1IsZ0JBQUksZ0JBQWdCLEtBQUssSUFBTCxHQUFZLEVBQWhDO0FBQ0EsZ0JBQUksa0JBQWtCLEtBQUssSUFBTCxHQUFZLEVBQWxDO0FBQ0EsZ0JBQUksZUFBZSxLQUFLLElBQUwsR0FBWSxDQUEvQjtBQUNBLGdCQUFJLHFCQUFxQixLQUFLLEtBQUwsQ0FBVyxLQUFLLElBQUwsR0FBVSxDQUFyQixJQUF3QixDQUFqRDtBQUNBLGdCQUFJLGNBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxJQUFMLEdBQVUsQ0FBckIsQ0FBbEI7O0FBRUEsaUJBQUksSUFBSSxJQUFJLENBQVosRUFBZSxJQUFJLGFBQW5CLEVBQWtDLEdBQWxDO0FBQ0kscUJBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IseUJBQWUsZUFBSyxxQkFBTCxDQUEyQixHQUEzQixFQUFnQyxJQUFoQyxDQUFmLEVBQXNELGVBQUsscUJBQUwsQ0FBMkIsR0FBM0IsRUFBZ0MsSUFBaEMsQ0FBdEQsQ0FBbEI7QUFESixhQUVBLEtBQUksSUFBSSxNQUFJLENBQVosRUFBZSxNQUFJLGVBQW5CLEVBQW9DLEtBQXBDO0FBQ0kscUJBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsMkJBQWlCLGVBQUsscUJBQUwsQ0FBMkIsR0FBM0IsRUFBZ0MsSUFBaEMsQ0FBakIsRUFBd0QsZUFBSyxxQkFBTCxDQUEyQixHQUEzQixFQUFnQyxJQUFoQyxDQUF4RCxDQUFsQjtBQURKLGFBRUEsS0FBSSxJQUFJLE1BQUksQ0FBWixFQUFlLE1BQUksWUFBbkIsRUFBaUMsS0FBakM7QUFDSSxxQkFBSyxPQUFMLENBQWEsSUFBYixDQUFrQix3QkFBYyxlQUFLLHFCQUFMLENBQTJCLEdBQTNCLEVBQWdDLElBQWhDLENBQWQsRUFBcUQsZUFBSyxxQkFBTCxDQUEyQixHQUEzQixFQUFnQyxJQUFoQyxDQUFyRCxDQUFsQjtBQURKLGFBRUEsS0FBSSxJQUFJLE1BQUksQ0FBWixFQUFlLE1BQUksa0JBQW5CLEVBQXVDLEtBQXZDO0FBQ0kscUJBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsOEJBQW9CLGVBQUsscUJBQUwsQ0FBMkIsR0FBM0IsRUFBZ0MsSUFBaEMsQ0FBcEIsRUFBMkQsZUFBSyxxQkFBTCxDQUEyQixHQUEzQixFQUFnQyxJQUFoQyxDQUEzRCxDQUFsQjtBQURKLGFBRUEsS0FBSSxJQUFJLE1BQUksQ0FBWixFQUFlLE1BQUksV0FBbkIsRUFBZ0MsS0FBaEM7QUFDSSxxQkFBSyxPQUFMLENBQWEsSUFBYixDQUFrQix1QkFBYSxlQUFLLHFCQUFMLENBQTJCLEdBQTNCLEVBQWdDLElBQWhDLENBQWIsRUFBb0QsZUFBSyxxQkFBTCxDQUEyQixHQUEzQixFQUFnQyxJQUFoQyxDQUFwRCxDQUFsQjtBQURKLGFBR0EsSUFBSSxnQkFBZ0IsSUFBcEI7QUFDQSxtQkFBTSxrQkFBa0IsSUFBeEIsRUFBOEI7QUFDMUIsb0JBQUksTUFBSSxlQUFLLGdCQUFMLENBQXNCLEtBQUssT0FBM0IsRUFBb0MsS0FBSyxrQkFBekMsQ0FBUjtBQUNBLG9CQUFJLFFBQU0sQ0FBQyxDQUFYLEVBQ0ksZ0JBQWdCLEtBQWhCLENBREosS0FHSSxLQUFLLE9BQUwsQ0FBYSxHQUFiLEVBQWdCLFdBQWhCLENBQTRCLGVBQUsscUJBQUwsQ0FBMkIsR0FBM0IsRUFBZ0MsSUFBaEMsQ0FBNUIsRUFBbUUsZUFBSyxxQkFBTCxDQUEyQixHQUEzQixFQUFnQyxJQUFoQyxDQUFuRTtBQUNQO0FBQ0o7O0FBRUQ7Ozs7Ozs7eUNBSWlCO0FBQUE7O0FBQ2IsaUJBQUssa0JBQUwsR0FBMEIsS0FBMUI7QUFDQSxpQkFBSyxVQUFMLEdBQWtCLElBQUksS0FBSixFQUFsQjtBQUNBLGlCQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsR0FBeUIsWUFBTTtBQUMzQixzQkFBSyxrQkFBTCxHQUEwQixJQUExQjtBQUNBLHNCQUFLLEtBQUwsR0FBYSxNQUFLLFVBQUwsQ0FBZ0IsS0FBN0I7QUFDQSxzQkFBSyxNQUFMLEdBQWMsTUFBSyxVQUFMLENBQWdCLE1BQTlCO0FBQ0gsYUFKRDtBQUtBLGlCQUFLLFVBQUwsQ0FBZ0IsR0FBaEIsR0FBc0IseUJBQXRCO0FBQ0g7O0FBRUQ7Ozs7Ozs7O3VDQUtlLEcsRUFBSyxNLEVBQVE7QUFDeEIsZ0JBQUksZUFBSjtBQUFBLGdCQUFZLGdCQUFaO0FBQ0EscUJBQVMsT0FBTyxLQUFoQjtBQUNBLHNCQUFVLE9BQU8sTUFBakI7O0FBRUEsZ0JBQUcsS0FBSyxVQUFMLENBQWdCLEtBQWhCLEdBQXdCLEtBQUssTUFBTCxDQUFZLENBQXBDLEdBQXdDLE9BQU8sS0FBbEQsRUFDSSxTQUFTLEtBQUssVUFBTCxDQUFnQixLQUFoQixHQUF3QixLQUFLLE1BQUwsQ0FBWSxDQUE3QztBQUNKLGdCQUFHLEtBQUssVUFBTCxDQUFnQixNQUFoQixHQUF5QixLQUFLLE1BQUwsQ0FBWSxDQUFyQyxHQUF5QyxPQUFPLE1BQW5ELEVBQ0ksVUFBVSxLQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsR0FBeUIsS0FBSyxNQUFMLENBQVksQ0FBL0M7O0FBRUosZ0JBQUksU0FBSixDQUFjLEtBQUssVUFBbkIsRUFBK0IsS0FBSyxNQUFMLENBQVksQ0FBM0MsRUFBOEMsS0FBSyxNQUFMLENBQVksQ0FBMUQsRUFBNkQsTUFBN0QsRUFBcUUsT0FBckUsRUFBOEUsQ0FBOUUsRUFBaUYsQ0FBakYsRUFBb0YsTUFBcEYsRUFBNEYsT0FBNUY7QUFDSDs7Ozs7O2tCQUdVLEs7Ozs7O0FDOUhmOzs7Ozs7QUFFQSxJQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQWIsQyxDQVZBOzs7Ozs7OztBQVdBLE9BQU8sS0FBUCxHQUFlLE9BQU8sVUFBdEI7QUFDQSxPQUFPLE1BQVAsR0FBZ0IsT0FBTyxXQUF2QjtBQUNBLFNBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsTUFBMUI7O0FBRUEsSUFBSSxPQUFPLG1CQUFTLE1BQVQsRUFBaUIsU0FBUyxJQUExQixDQUFYOztBQUVBLElBQUksT0FBTyxTQUFQLElBQU8sR0FBTTtBQUNiLFFBQUksTUFBTSxLQUFLLEdBQUwsRUFBVjtBQUNBLFFBQUksUUFBUSxNQUFNLElBQWxCOztBQUVBLFNBQUssTUFBTCxDQUFZLFFBQVEsSUFBcEI7QUFDQSxTQUFLLElBQUw7O0FBRUEsV0FBTyxHQUFQOztBQUVBLDBCQUFzQixJQUF0QjtBQUNILENBVkQ7O0FBWUE7QUFDQSx3QkFBd0IsT0FBTyxxQkFBUCxJQUNwQixPQUFPLDJCQURhLElBRXBCLE9BQU8sdUJBRmEsSUFHcEIsT0FBTyx3QkFIWDs7QUFLQSxJQUFJLE9BQU8sS0FBSyxHQUFMLEVBQVg7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3BDQTs7Ozs7QUFLQTs7O0lBR00sTTs7QUFFRjs7Ozs7Ozs7O0FBU0Esb0JBQVksQ0FBWixFQUFlLENBQWYsRUFBa0IsV0FBbEIsRUFBK0IsWUFBL0IsRUFBNkMsVUFBN0MsRUFBeUQsV0FBekQsRUFBc0U7QUFBQTs7QUFDbEUsYUFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxhQUFLLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxhQUFLLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxhQUFLLEtBQUwsR0FBYSxXQUFiO0FBQ0EsYUFBSyxNQUFMLEdBQWMsWUFBZDtBQUNBLGFBQUssVUFBTCxHQUFrQixVQUFsQjtBQUNBLGFBQUssV0FBTCxHQUFtQixXQUFuQjtBQUNIOztBQUVEOzs7Ozs7Ozs7OytCQU1PLE0sRUFBUSxTLEVBQVcsUyxFQUFXO0FBQ2pDLGlCQUFLLFNBQUwsR0FBaUIsTUFBakI7QUFDQSxpQkFBSyxTQUFMLEdBQWlCLFNBQWpCO0FBQ0EsaUJBQUssU0FBTCxHQUFpQixTQUFqQjtBQUNIOztBQUVEOzs7Ozs7aUNBR1M7QUFDTCxnQkFBRyxLQUFLLFNBQUwsSUFBa0IsSUFBckIsRUFBMkI7QUFDdkIsb0JBQUcsS0FBSyxTQUFMLENBQWUsQ0FBZixHQUFtQixLQUFLLENBQXhCLEdBQTRCLEtBQUssU0FBakMsR0FBNkMsS0FBSyxLQUFyRCxFQUNJLEtBQUssQ0FBTCxHQUFTLEtBQUssU0FBTCxDQUFlLENBQWYsSUFBb0IsS0FBSyxLQUFMLEdBQWEsS0FBSyxTQUF0QyxDQUFULENBREosS0FFSyxJQUFHLEtBQUssU0FBTCxDQUFlLENBQWYsR0FBbUIsS0FBSyxTQUF4QixHQUFvQyxLQUFLLENBQTVDLEVBQ0QsS0FBSyxDQUFMLEdBQVMsS0FBSyxTQUFMLENBQWUsQ0FBZixHQUFtQixLQUFLLFNBQWpDO0FBQ0osb0JBQUcsS0FBSyxTQUFMLENBQWUsQ0FBZixHQUFtQixLQUFLLENBQXhCLEdBQTRCLEtBQUssU0FBakMsR0FBNkMsS0FBSyxNQUFyRCxFQUNJLEtBQUssQ0FBTCxHQUFTLEtBQUssU0FBTCxDQUFlLENBQWYsSUFBb0IsS0FBSyxNQUFMLEdBQWMsS0FBSyxTQUF2QyxDQUFULENBREosS0FFSyxJQUFHLEtBQUssU0FBTCxDQUFlLENBQWYsR0FBbUIsS0FBSyxTQUF4QixHQUFvQyxLQUFLLENBQTVDLEVBQ0QsS0FBSyxDQUFMLEdBQVMsS0FBSyxTQUFMLENBQWUsQ0FBZixHQUFtQixLQUFLLFNBQWpDO0FBQ1A7QUFDRCxnQkFBRyxLQUFLLENBQUwsR0FBUyxDQUFaLEVBQ0ksS0FBSyxDQUFMLEdBQVMsQ0FBVDtBQUNKLGdCQUFHLEtBQUssQ0FBTCxHQUFTLENBQVosRUFDSSxLQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0osZ0JBQUcsS0FBSyxDQUFMLEdBQVMsS0FBSyxLQUFkLEdBQXNCLEtBQUssVUFBOUIsRUFDSSxLQUFLLENBQUwsR0FBUyxLQUFLLFVBQUwsR0FBa0IsS0FBSyxLQUFoQztBQUNKLGdCQUFHLEtBQUssQ0FBTCxHQUFTLEtBQUssTUFBZCxHQUF1QixLQUFLLFdBQS9CLEVBQ0ksS0FBSyxDQUFMLEdBQVMsS0FBSyxXQUFMLEdBQW1CLEtBQUssTUFBakM7QUFDUDs7Ozs7O2tCQUdVLE07Ozs7Ozs7Ozs7O0FDbkVmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVNLE07QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFZLENBQVosRUFBZSxDQUFmLEVBQWtCO0FBQUE7O0FBQ2QsYUFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxhQUFLLE1BQUwsR0FBYyxHQUFkO0FBQ0EsYUFBSyxLQUFMLEdBQWEsR0FBYjtBQUNBLGFBQUssU0FBTDtBQUNBLFlBQUksZUFBZSxzQkFBbkI7QUFDQSxZQUFJLGVBQWUsc0JBQW5CO0FBQ0EsWUFBSSxjQUFjLDRCQUFsQjtBQUNBLGFBQUssU0FBTCxHQUFpQixDQUFDLFlBQUQsRUFBZSxZQUFmLEVBQTZCLFdBQTdCLENBQWpCO0FBQ0EsYUFBSyxZQUFMLEdBQW9CLENBQXBCO0FBQ0g7Ozs7eURBRWtDLGtCLEVBQW9CO0FBQ2pELGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksbUJBQW1CLE1BQXZDLEVBQStDLEdBQS9DLEVBQW9EO0FBQ2hELG9CQUFJLGVBQUssV0FBTCxDQUFpQixtQkFBbUIsQ0FBbkIsQ0FBakIsRUFBd0MsSUFBeEMsS0FBaUQsbUJBQW1CLENBQW5CLEVBQXNCLFVBQTNFLEVBQ0ksT0FBTyxJQUFQO0FBQ1A7QUFDRCxtQkFBTyxLQUFQO0FBQ0g7OztvQ0FFUztBQUFBOztBQUNSLGlCQUFLLGFBQUwsR0FBcUIsS0FBckI7QUFDQSxpQkFBSyxLQUFMLEdBQWEsSUFBSSxLQUFKLEVBQWI7QUFDQSxpQkFBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixZQUFNO0FBQ3RCLHNCQUFLLGFBQUwsR0FBcUIsSUFBckI7QUFDQSxzQkFBSyxLQUFMLEdBQWEsTUFBSyxLQUFMLENBQVcsS0FBeEI7QUFDQSxzQkFBSyxNQUFMLEdBQWMsTUFBSyxLQUFMLENBQVcsTUFBekI7QUFDSCxhQUpEO0FBS0EsaUJBQUssS0FBTCxDQUFXLEdBQVgsR0FBaUIscUJBQWpCO0FBQ0g7Ozs2QkFFTSxHLEVBQUssTSxFQUFRLEssRUFBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxnQkFBSSxTQUFKLENBQWMsS0FBSyxLQUFuQixFQUEwQixLQUFLLENBQUwsR0FBUyxPQUFPLENBQTFDLEVBQTZDLEtBQUssQ0FBTCxHQUFTLE9BQU8sQ0FBN0Q7QUFDQTtBQUNIOzs7Ozs7a0JBR1UsTTs7Ozs7Ozs7Ozs7OztBQ3REZjs7Ozs7O0FBTUE7OztJQUdNLEk7Ozs7Ozs7OztBQUVGOzs7Ozs7O29DQU9tQixVLEVBQVksVSxFQUFZO0FBQ3ZDLGdCQUFHLFdBQVcsQ0FBWCxHQUFlLFdBQVcsQ0FBWCxHQUFlLFdBQVcsS0FBekMsSUFDQyxXQUFXLENBQVgsR0FBZSxXQUFXLEtBQTFCLEdBQWtDLFdBQVcsQ0FEOUMsSUFFQyxXQUFXLENBQVgsR0FBZSxXQUFXLENBQVgsR0FBZSxXQUFXLE1BRjFDLElBR0MsV0FBVyxDQUFYLEdBQWUsV0FBVyxNQUExQixHQUFtQyxXQUFXLENBSGxELEVBR3FEO0FBQ2pELHVCQUFPLElBQVA7QUFDSCxhQUxELE1BTUs7QUFDRCx1QkFBTyxLQUFQO0FBQ0g7QUFDSjs7QUFFRDs7Ozs7Ozs7Ozt5Q0FPd0IsTSxFQUFRLE0sRUFBUTtBQUNwQyxpQkFBSSxJQUFJLElBQUksQ0FBWixFQUFlLElBQUksT0FBTyxNQUExQixFQUFrQyxHQUFsQyxFQUF1QztBQUNuQyxxQkFBSSxJQUFJLElBQUksQ0FBWixFQUFlLElBQUksT0FBTyxNQUExQixFQUFrQyxHQUFsQyxFQUF1QztBQUNuQyx3QkFBRyxLQUFLLFdBQUwsQ0FBaUIsT0FBTyxDQUFQLENBQWpCLEVBQTRCLE9BQU8sQ0FBUCxDQUE1QixDQUFILEVBQ0ksT0FBTyxDQUFQO0FBQ1A7QUFDSjtBQUNELG1CQUFPLENBQUMsQ0FBUjtBQUNIOzs7b0RBRWtDLEssRUFBTztBQUN0QyxpQkFBSSxJQUFJLElBQUksQ0FBWixFQUFlLElBQUksTUFBTSxNQUF6QixFQUFpQyxHQUFqQyxFQUFzQztBQUNsQyxxQkFBSSxJQUFJLElBQUksQ0FBWixFQUFlLElBQUksTUFBTSxNQUF6QixFQUFpQyxHQUFqQyxFQUFzQztBQUNsQyx3QkFBRyxNQUFNLENBQVQsRUFBWTtBQUNSLDRCQUFHLEtBQUssV0FBTCxDQUFpQixNQUFNLENBQU4sQ0FBakIsRUFBMkIsTUFBTSxDQUFOLENBQTNCLENBQUgsRUFDSSxPQUFPLENBQVA7QUFDUDtBQUNKO0FBQ0o7QUFDRCxtQkFBTyxDQUFDLENBQVI7QUFDSDs7QUFFRDs7Ozs7Ozs7OzhDQU02QixJLEVBQU0sRSxFQUFJO0FBQ25DLG1CQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxNQUFpQixLQUFLLElBQUwsR0FBWSxDQUE3QixJQUFrQyxJQUE3QyxDQUFQO0FBQ0g7Ozs7OztrQkFHVSxJOzs7Ozs7Ozs7OztBQ3RFZjs7Ozs7Ozs7Ozs7O0lBRU0sWTs7O0FBQ0YsNEJBQWE7QUFBQTs7QUFBQSxnSUFDSCxDQURHLEVBQ0EsRUFEQTs7QUFFVCxjQUFLLElBQUwsR0FBWSxlQUFaO0FBQ0EscUlBQXFCLHFCQUFyQjtBQUhTO0FBSVo7Ozs7O2tCQUdVLFk7Ozs7Ozs7Ozs7O0FDVmY7Ozs7Ozs7O0lBRU0sTTtBQUNGLG9CQUFZLFFBQVosRUFBc0IsTUFBdEIsRUFBOEIsQ0FBOUIsRUFBaUMsQ0FBakMsRUFBb0MsS0FBcEMsRUFBMkMsS0FBM0MsRUFBa0QsVUFBbEQsRUFBOEQ7QUFBQTs7QUFDMUQsYUFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxhQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsYUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGFBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxhQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsYUFBSyxhQUFMLEdBQXFCLFVBQXJCO0FBQ0EsWUFBSSxRQUFRLEtBQUssS0FBTCxHQUFhLEtBQUssQ0FBOUI7QUFDQSxZQUFJLFFBQVEsS0FBSyxLQUFMLEdBQWEsS0FBSyxDQUE5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUcsS0FBSyxHQUFMLENBQVMsS0FBVCxJQUFrQixLQUFLLEdBQUwsQ0FBUyxLQUFULENBQXJCLEVBQXNDO0FBQ2xDLGlCQUFLLE1BQUwsR0FBYyxRQUFRLEtBQUssR0FBTCxDQUFTLEtBQVQsQ0FBdEI7QUFDQSxpQkFBSyxNQUFMLEdBQWMsUUFBUSxLQUFLLEdBQUwsQ0FBUyxLQUFULENBQXRCO0FBQ0gsU0FIRCxNQUlLO0FBQ0QsaUJBQUssTUFBTCxHQUFjLFFBQVEsS0FBSyxHQUFMLENBQVMsS0FBVCxDQUF0QjtBQUNBLGlCQUFLLE1BQUwsR0FBYyxRQUFRLEtBQUssR0FBTCxDQUFTLEtBQVQsQ0FBdEI7QUFDSDtBQUNKOzs7O2tDQUNTLEcsRUFBSztBQUFBOztBQUNYLGlCQUFLLGFBQUwsR0FBcUIsS0FBckI7QUFDQSxpQkFBSyxLQUFMLEdBQWEsSUFBSSxLQUFKLEVBQWI7QUFDQSxpQkFBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixZQUFNO0FBQ3RCLHNCQUFLLGFBQUwsR0FBcUIsSUFBckI7QUFDQSxzQkFBSyxLQUFMLEdBQWEsTUFBSyxLQUFMLENBQVcsS0FBeEI7QUFDQSxzQkFBSyxNQUFMLEdBQWMsTUFBSyxLQUFMLENBQVcsTUFBekI7QUFDSCxhQUpEO0FBS0EsaUJBQUssS0FBTCxDQUFXLEdBQVgsR0FBaUIsR0FBakI7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OzZCQUNLLFEsRUFBVSxrQixFQUFvQixPLEVBQVE7QUFDdkMsaUJBQUssQ0FBTCxJQUFVLEtBQUssUUFBTCxHQUFjLFFBQWQsR0FBdUIsS0FBSyxNQUF0QztBQUNBLGlCQUFLLENBQUwsSUFBVSxLQUFLLFFBQUwsR0FBYyxRQUFkLEdBQXVCLEtBQUssTUFBdEM7QUFDQSxnQkFBRyxLQUFLLFlBQUwsQ0FBa0Isa0JBQWxCLEVBQXNDLE9BQXRDLEtBQWtELEtBQUssYUFBTCxJQUFzQixLQUEzRSxFQUFrRjtBQUM5RSxxQkFBSyxJQUFMLEdBQVksS0FBWjtBQUNIO0FBQ0QsZ0JBQUcsS0FBSyxDQUFMLEdBQVMsQ0FBVCxJQUFjLEtBQUssQ0FBTCxHQUFTLEtBQXZCLElBQWdDLEtBQUssQ0FBTCxHQUFTLENBQXpDLElBQThDLEtBQUssQ0FBTCxHQUFTLElBQTFELEVBQWdFO0FBQzVELHFCQUFLLElBQUwsR0FBWSxLQUFaO0FBQ0g7QUFFSjtBQUNEO0FBQ0E7QUFDQTs7OztvQ0FDWSxXLEVBQWE7QUFDckIsd0JBQVksTUFBWixJQUFzQixLQUFLLE1BQTNCO0FBQ0g7OzswQ0FFaUIsaUIsRUFBa0I7QUFDaEMsOEJBQWtCLE1BQWxCLElBQTRCLEtBQUssTUFBakM7QUFDSDtBQUNEO0FBQ0E7QUFDQTs7OztxQ0FDYSxrQixFQUFvQixPLEVBQVM7QUFDdEMsaUJBQUksSUFBSSxJQUFJLENBQVosRUFBZSxJQUFJLG1CQUFtQixNQUF0QyxFQUE4QyxHQUE5QyxFQUFtRDtBQUMvQyxvQkFBRyxlQUFLLFdBQUwsQ0FBaUIsSUFBakIsRUFBdUIsbUJBQW1CLENBQW5CLENBQXZCLEtBQWlELG1CQUFtQixDQUFuQixFQUFzQixVQUExRSxFQUFzRjtBQUNsRix5QkFBSyxpQkFBTCxDQUF1QixtQkFBbUIsQ0FBbkIsQ0FBdkI7QUFDQSwyQkFBTyxJQUFQO0FBQ0g7QUFDSjtBQUNELGlCQUFJLElBQUksS0FBSSxDQUFaLEVBQWUsS0FBSSxRQUFRLE1BQTNCLEVBQW1DLElBQW5DLEVBQXdDO0FBQ3BDLG9CQUFHLGVBQUssV0FBTCxDQUFpQixJQUFqQixFQUF1QixRQUFRLEVBQVIsQ0FBdkIsQ0FBSCxFQUFzQztBQUNsQyx5QkFBSyxXQUFMLENBQWlCLFFBQVEsRUFBUixDQUFqQjtBQUNBLDJCQUFPLElBQVA7QUFDSDtBQUNKO0FBQ0QsbUJBQU8sS0FBUDtBQUNIOzs7NkJBRUksRyxFQUFLLE0sRUFBUTtBQUNkLGdCQUFJLFNBQUosQ0FBYyxLQUFLLEtBQW5CLEVBQTBCLEtBQUssQ0FBTCxHQUFTLE9BQU8sQ0FBMUMsRUFBNkMsS0FBSyxDQUFMLEdBQVMsT0FBTyxDQUE3RDtBQUNIOzs7Ozs7a0JBR1UsTTs7Ozs7Ozs7Ozs7QUN4RmY7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBO0lBQ00sVzs7O0FBQ0YseUJBQVksQ0FBWixFQUFlLENBQWYsRUFBa0IsS0FBbEIsRUFBeUIsS0FBekIsRUFBZ0M7QUFBQTs7QUFBQSw4SEFDdEIsSUFEc0IsRUFDaEIsQ0FEZ0IsRUFDYixDQURhLEVBQ1YsQ0FEVSxFQUNQLEtBRE8sRUFDQSxLQURBLEVBQ08sSUFEUDs7QUFFNUIsOEhBQWdCLHNCQUFoQjtBQUY0QjtBQUcvQjs7Ozs7a0JBR1UsVzs7Ozs7Ozs7Ozs7QUNiZjs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7SUFDTSxTOzs7QUFDRix1QkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQixLQUFsQixFQUF5QixLQUF6QixFQUFnQztBQUFBOztBQUFBLDBIQUN0QixJQURzQixFQUNoQixFQURnQixFQUNaLENBRFksRUFDVCxDQURTLEVBQ04sS0FETSxFQUNDLEtBREQsRUFDUSxLQURSOztBQUU1QiwwSEFBZ0Isc0JBQWhCO0FBRjRCO0FBRy9COzs7OztrQkFFVSxTOzs7Ozs7Ozs7OztBQ1pmOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNNLFM7OztBQUNGLHVCQUFZLENBQVosRUFBZSxDQUFmLEVBQWtCLEtBQWxCLEVBQXlCLEtBQXpCLEVBQWdDO0FBQUE7O0FBQUEsMEhBQ3RCLElBRHNCLEVBQ2hCLEVBRGdCLEVBQ1osQ0FEWSxFQUNULENBRFMsRUFDTixLQURNLEVBQ0MsS0FERCxFQUNRLEtBRFI7O0FBRTVCLDBIQUFnQixzQkFBaEI7QUFGNEI7QUFHL0I7Ozs7O2tCQUdVLFM7Ozs7Ozs7Ozs0ZUNmZjtBQUNBO0FBQ0E7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTSxNOzs7QUFDRixzQkFBYTtBQUFBOztBQUFBLG9IQUNILEVBREcsRUFDQyxFQUREOztBQUVULGNBQUssSUFBTCxHQUFZLFFBQVo7QUFDQSx5SEFBcUIsc0JBQXJCO0FBSFM7QUFJWjs7Ozs7a0JBR1UsTTs7Ozs7Ozs7OzRlQ2JmO0FBQ0E7QUFDQTs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNLE07OztBQUNGLHNCQUFhO0FBQUE7O0FBQUEsb0hBQ0gsQ0FERyxFQUNBLEVBREE7O0FBRVQsY0FBSyxJQUFMLEdBQVksUUFBWjtBQUNBLHlIQUFxQixzQkFBckI7QUFIUztBQUlaOzs7OztrQkFHVSxNOzs7Ozs7Ozs7Ozs7O0FDYmY7QUFDQTtBQUNBO0FBQ0E7SUFDTSxNO0FBRUYsb0JBQVksUUFBWixFQUFzQixPQUF0QixFQUErQjtBQUFBOztBQUMzQixhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxhQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsYUFBSyxJQUFMLEdBQVksRUFBWjtBQUNBLGFBQUssUUFBTCxHQUFnQixDQUFoQjtBQUNIOzs7O3VDQUVjLEcsRUFBSztBQUFBOztBQUNoQixpQkFBSyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0EsaUJBQUssS0FBTCxHQUFhLElBQUksS0FBSixFQUFiO0FBQ0EsaUJBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsWUFBTTtBQUN0QixzQkFBSyxhQUFMLEdBQXFCLElBQXJCO0FBQ0gsYUFGRDtBQUdBLGlCQUFLLEtBQUwsQ0FBVyxHQUFYLEdBQWlCLEdBQWpCO0FBQ0g7Ozs7OztrQkFHVSxNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy9KdXN0IGEgcGx1cyBjdXJzb3IgdG8gYmUgcmVuZGVyZWQgYXQgdGhlXHJcbi8vY3Vyc29yJ3MgbG9jYXRpb24gZWFjaCBVcGRhdGVcclxuLy9UaGUgY3Vyc29yIGZvciB0aGUgZW50aXJlIEhUTUwgZG9jdW1lbnQgaXMgdHVybmVkIG9mZiB2aWEgc3R5bGluZyBvbiB0aGUgZG9jdW1lbnQuXHJcbmNsYXNzIEN1cnNvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxvYWRJbWFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRJbWFnZSgpIHtcclxuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IFwiR3JhcGhpY3MvY3Jvc3NoYWlyLnBuZ1wiO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEN1cnNvcjtcclxuIiwiLyoqXHJcbiAqIFNvdXJjZXM6XHJcbiAqIGh0dHBzOi8vbWVkaXVtLmNvbS9AeXVyaWJldHQvamF2YXNjcmlwdC1hYnN0cmFjdC1tZXRob2Qtd2l0aC1lczYtNWRiZWE0YjAwMDI3XHJcbiAqIGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9STVkQVJwQVBsTmtcclxuICovXHJcblxyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIEVuZW15IGNsYXNzIGlzIHRoZSBwYXJlbnQgY2xhc3MgZm9yIGFsbCBvZiB0aGUgZW5lbWllcy5cclxuICovXHJcbmNsYXNzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSB2ZWxvY2l0eSBUaGUgdmVsb2NpdHkgb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIGhlYWx0aCBUaGUgaGVhbHRoIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSBkYW1hZ2UgVGhlIGRhbWFnZSBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gcG9pbnRzT25LaWxsIFRoZSBwb2ludHMgcmV3YXJkZWQgZm9yIGtpbGxpbmcgdGhlIEVuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB2ZWxvY2l0eSwgaGVhbHRoLCBkYW1hZ2UsIHBvaW50c09uS2lsbCkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLmFuZ2xlID0gTWF0aC5QSS8yO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2ZWxvY2l0eTtcclxuICAgICAgICB0aGlzLmhlYWx0aCA9IGhlYWx0aDtcclxuICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgICB0aGlzLnBvaW50c09uS2lsbCA9IHBvaW50c09uS2lsbDtcclxuICAgICAgICB0aGlzLmF0dGFja0Nvb2xkb3duID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsb2FkSW1hZ2UgZnVuY3Rpb24gdGFrZXMgaW4gYSB1cmwgYW5kIGxvYWRzIGl0IGFzIGFuIEltYWdlLiBPbmNlIHRoZSBpbWFnZSBpcyBsb2FkZWQsIHRoaXMuaXNJbWFnZUxvYWRlZCBpc1xyXG4gICAgICogc2V0IHRvIHRydWUuIFRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBFbmVteSBhcmUgc2V0IHRvIHRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBpbWFnZS5cclxuICAgICAqIEBwYXJhbSB1cmwgVGhlIHVybCB0aGF0IHNob3VsZCBiZSBsb2FkZWQuXHJcbiAgICAgKi9cclxuICAgIGxvYWRJbWFnZSh1cmwpIHtcclxuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgYXR0YWNrIGZ1bmN0aW9uIHRha2VzIGluIGFuIG9iamVjdCBhbmQgcmVtb3ZlcyB0aGUgYW1vdW50IG9mIGRhbWFnZSB0aGUgRW5lbXkgZGVhbHMgZnJvbSB0aGVpciBoZWFsdGguXHJcbiAgICAgKiA1MDAgaXMgYWRkZWQgdG8gdGhlIGF0dGFjayBjb29sZG93biBvZiB0aGUgZW5lbXkgYWZ0ZXIgYW4gYXR0YWNrLlxyXG4gICAgICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0IHRoYXQgaXMgYmVpbmcgYXR0YWNrZWQuXHJcbiAgICAgKi9cclxuICAgIGF0dGFjayhvYmplY3QpIHtcclxuICAgICAgICBvYmplY3QuaGVhbHRoIC09IHRoaXMuZGFtYWdlO1xyXG4gICAgICAgIHRoaXMuYXR0YWNrQ29vbGRvd24gKz0gNTAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTW92ZXMgdGhlIGVuZW15IHRvd2FyZHMgdGhlIHBsYXllci5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciBvYmplY3QgdG8gbW92ZSB0b3dhcmRzLlxyXG4gICAgICogQHBhcmFtIG1vZGlmaWVyIFRoZSBtb2RpZmllciB0byBiZSBtdWx0aXBsaWVkIGJ5IHRoZSB2ZWxvY2l0eS5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdHMgQW4gYXJyYXkgb2YgZW52aXJvbm1lbnQgb2JqZWN0cy5cclxuICAgICAqL1xyXG4gICAgbW92ZShwbGF5ZXIsIG1vZGlmaWVyLCBlbnZpcm9ubWVudE9iamVjdHMpIHtcclxuICAgICAgICBsZXQgZGlmZlggPSBwbGF5ZXIueCAtIHRoaXMueDtcclxuICAgICAgICBsZXQgZGlmZlkgPSBwbGF5ZXIueSAtIHRoaXMueTtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gTWF0aC5zcXJ0KGRpZmZYICogZGlmZlggKyBkaWZmWSAqIGRpZmZZKTtcclxuICAgICAgICBpZihsZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgZGlmZlggLz0gbGVuZ3RoO1xyXG4gICAgICAgICAgICBkaWZmWSAvPSBsZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFuZ2xlID0gTWF0aC5hdGFuMihkaWZmWSwgZGlmZlgpO1xyXG5cclxuICAgICAgICBpZihkaWZmWCA+IDApIHtcclxuICAgICAgICAgICAgaWYodGhpcy54ICsgdGhpcy53aWR0aCA8PSAxMDAwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KGVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnggLT0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGRpZmZYIDwgMCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54IC09IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KGVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkaWZmWSA+IDApIHtcclxuICAgICAgICAgICAgaWYodGhpcy55ICsgdGhpcy5oZWlnaHQgPD0gNTYyNSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KGVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnkgLT0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGRpZmZZIDwgMCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy55IC09IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KGVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBwbGF5ZXIpICYmIHRoaXMuYXR0YWNrQ29vbGRvd24gPT09IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWFsdGggYmVmb3JlIGF0dGFja1wiICsgcGxheWVyLmhlYWx0aCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrKHBsYXllcik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVhbHRoIGFmdGVyIGF0dGFja1wiICsgcGxheWVyLmhlYWx0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgZW5lbXkgZ2l2ZW4geCBhbmQgeS5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIHRvIGJlIHNldC5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIHRvIGJlIHNldC5cclxuICAgICAqL1xyXG4gICAgc2V0UG9zaXRpb24oeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgYSBoZWxwZXIgZnVuY3Rpb24gdXNlZCBieSB0aGUgbW92ZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgaWYgdGhlcmUgaXMgYSBjb2xsaXNpb24gYmV0d2VlbiBhblxyXG4gICAgICogZW52aXJvbm1lbnQgb2JqZWN0IGFuZCB0aGUgZW5lbXkuIElmIHRoZXJlIGlzIGEgY29sbGlzaW9uLCB0aGUgb2JqZWN0IGlzIGF0dGFja2VkLlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0cyBBbiBhcnJheSBvZiBlbnZpcm9ubWVudCBvYmplY3RzLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgYSBjb2xsaXNpb24gZXhpc3RzLlxyXG4gICAgICovXHJcbiAgICBpc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdChlbnZpcm9ubWVudE9iamVjdHMpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgZW52aXJvbm1lbnRPYmplY3RzW2ldKSAmJiBlbnZpcm9ubWVudE9iamVjdHNbaV0uaXNCbG9ja2luZykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5hdHRhY2tDb29sZG93biA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrKGVudmlyb25tZW50T2JqZWN0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZHJhdyBmdW5jdGlvbiBkcmF3cyB0aGUgaW1hZ2Ugb24gdGhlIGNhbnZhcyBhdCB0aGUgeCBhbmQgeSBwb3NpdGlvbiBvZiB0aGUgTGlnaHRFbmVteS5cclxuICAgICAqIEBwYXJhbSBjdHggVGhlIGNvbnRleHQgb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjYW1lcmEgVGhlIGNhbWVyYSBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcclxuICAgICAgICAvL2N0eC5zYXZlKCk7XHJcbiAgICAgICAgLy9jdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICAvL2N0eC5yb3RhdGUodGhpcy5hbmdsZSArIE1hdGguUEkvMi4wKTtcclxuICAgICAgICAvL2N0eC50cmFuc2xhdGUoLXRoaXMueCwgLXRoaXMueSk7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xyXG4gICAgICAgIC8vY3R4LnJlc3RvcmUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRW5lbXk7IiwiaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBFbmVteVByb2plY3RpbGUgY2xhc3MgaXMgdGhlIG9iamVjdCB0aGF0IGlzIGZpcmVkIGZyb20gdGhlIFByb2plY3RpbGVFbmVteSBlbmVteS5cclxuICovXHJcbmNsYXNzIEVuZW15UHJvamVjdGlsZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlIGNsYXNzIGFuZCBnZXRzIHRoZSB4IGFuZCB5IGNvZWZmaWNpZW50cyBmb3IgdXNlXHJcbiAgICAgKiBpbiB0aGUgbW92ZSBmdW5jdGlvbi4gVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiBpcyBhbHNvIGNhbGxlZC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIGRlc3RYIFRoZSB4IGRlc3RpbmF0aW9uIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gZGVzdFkgVGhlIHkgZGVzdGluYXRpb24gb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgZGVzdFgsIGRlc3RZKSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IDYwMDtcclxuICAgICAgICB0aGlzLmRhbWFnZSA9IDU7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMubGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IGRpZmZYID0gZGVzdFggLSB0aGlzLng7XHJcbiAgICAgICAgbGV0IGRpZmZZID0gZGVzdFkgLSB0aGlzLnk7XHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZGlmZlgpID4gTWF0aC5hYnMoZGlmZlkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29lZmZZID0gZGlmZlkgLyBNYXRoLmFicyhkaWZmWCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvZWZmWSA9IGRpZmZZIC8gTWF0aC5hYnMoZGlmZlkpO1xyXG4gICAgICAgICAgICB0aGlzLmNvZWZmWCA9IGRpZmZYIC8gTWF0aC5hYnMoZGlmZlkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWRJbWFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBtb3ZlcyB0aGUgRW5lbXlQcm9qZWN0aWxlIGFjY29yZGluZyB0byB0aGUgeCBhbmQgeSBjb2VmZmljaWVudHMuXHJcbiAgICAgKiBAcGFyYW0gbW9kaWZpZXIgVGhlIG1vZGlmaWVyIHRvIGJlIG11bHRpcGxpZWQgYnkgdGhlIHZlbG9jaXR5LlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0cyBUaGUgYXJyYXkgb2YgZW52aXJvbm1lbnQgb2JqZWN0cy5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIG1vdmUobW9kaWZpZXIsIGVudmlyb25tZW50T2JqZWN0cywgcGxheWVyKSB7XHJcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXIqdGhpcy5jb2VmZlg7XHJcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXIqdGhpcy5jb2VmZlk7XHJcbiAgICAgICAgaWYodGhpcy5oaXRTb21ldGhpbmcoZW52aXJvbm1lbnRPYmplY3RzLCBwbGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnggPCAwIHx8IHRoaXMueCA+IDEwMDAwIHx8IHRoaXMueSA8IDAgfHwgdGhpcy55ID4gNTYyNSl7XHJcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYXdheSBoZWFsdGggZnJvbSB0aGUgcGxheWVyIGVxdWFsIHRvIHRoZSBkYW1hZ2Ugb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGRhbWFnZVBsYXllcihwbGF5ZXIpIHtcclxuICAgICAgICBwbGF5ZXIuaGVhbHRoIC09IHRoaXMuZGFtYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB0YWtlcyBhd2F5IGhlYWx0aCBmcm9tIHRoZSBlbnZpcm9ubWVudCBvYmplY3QgZXF1YWwgdG8gdGhlIGRhbWFnZSBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0IFRoZSBlbnZpcm9ubWVudCBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGRhbWFnZUVudmlyb25tZW50KGVudmlyb25tZW50T2JqZWN0KXtcclxuICAgICAgICBlbnZpcm9ubWVudE9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyBpZiBhbiBlbnZpcm9ubWVudCBvYmplY3Qgb3IgYSBwbGF5ZXIgd2VyZSBoaXQgYnkgdGhlIHByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3RzIFRoZSBhcnJheSBvZiBlbnZpcm9ubWVudCBvYmplY3RzLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdC5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCBzb21ldGhpbmcgd2FzIGhpdC5cclxuICAgICAqL1xyXG4gICAgaGl0U29tZXRoaW5nKGVudmlyb25tZW50T2JqZWN0cywgcGxheWVyKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIGVudmlyb25tZW50T2JqZWN0c1tpXSkgJiYgZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzQmxvY2tpbmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlRW52aXJvbm1lbnQoZW52aXJvbm1lbnRPYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgcGxheWVyKSl7XHJcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlUGxheWVyKHBsYXllcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbG9hZEltYWdlIGZ1bmN0aW9uIGxvYWRzIHRoZSB1cmwgYXMgYW4gSW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0ltYWdlTG9hZGVkIGlzXHJcbiAgICAgKiBzZXQgdG8gdHJ1ZS4gVGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIEVuZW15UHJvamVjdGlsZSBhcmUgc2V0IHRvIHRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBpbWFnZS5cclxuICAgICAqL1xyXG4gICAgbG9hZEltYWdlKCkge1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IFwiR3JhcGhpY3MvRW5lbXlQcm9qZWN0aWxlLnBuZ1wiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRyYXcgZnVuY3Rpb24gZHJhd3MgdGhlIGltYWdlIG9uIHRoZSBjYW52YXMgYXQgdGhlIHggYW5kIHkgcG9zaXRpb24gb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBjdHggVGhlIGNvbnRleHQgb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjYW1lcmEgVGhlIGNhbWVyYSBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVuZW15UHJvamVjdGlsZTsiLCJpbXBvcnQgRW5lbXkgZnJvbSAnLi9FbmVteS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIExpZ2h0RW5lbXkgY2xhc3MgZXh0ZW5kcyB0aGUgRW5lbXkgY2xhc3MuIEl0IGlzIGEgZmFzdCBlbmVteSB3aXRoIGxvdyBoZWFsdGguXHJcbiAqL1xyXG5jbGFzcyBMaWdodEVuZW15IGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIExpZ2h0RW5lbXkuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDEyOCwgdGhlIGhlYWx0aCBzZXQgdG8gMTAsIHRoZSBkYW1hZ2Ugc2V0IHRvIDEwLCBhbmQgdGhlIHBvaW50c09uS2lsbFxyXG4gICAgICogc2V0IHRvIDUwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIExpZ2h0RW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgTGlnaHRFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDEyOCwgMTAsIDEwLCA1MCk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvTGlnaHRFbmVteS5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpZ2h0RW5lbXk7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBNaW5pQm9zcyBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaXMgYSBoaWdoIGhlYWx0aCBhbmQgZGFtYWdlIGVuZW15LlxyXG4gKi9cclxuY2xhc3MgTWluaUJvc3MgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgTWluaUJvc3MuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDEyOCwgdGhlIGhlYWx0aCBzZXQgdG8gNTAwLCB0aGUgZGFtYWdlIHNldCB0byA1MCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byAxMDAwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIE1pbmlCb3NzLlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIE1pbmlCb3NzLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMTI4LCA1MDAsIDUwLCAxMDAwKTtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd24gPSAyMDA7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duUmF0ZSA9IDE7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duUmVzZXQgPSAyMDA7XHJcbiAgICAgICAgdGhpcy5zaG9vdEFtb3VudCA9IDU7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvTWluaUJvc3MucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNaW5pQm9zczsiLCJpbXBvcnQgRW5lbXkgZnJvbSAnLi9FbmVteS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIFByb2plY3RpbGVFbmVteSBjbGFzcyBleHRlbmRzIHRoZSBlbmVteSBjbGFzcy4gSXQgY2FuIHNob290IHByb2plY3RpbGVzIGF0IHRoZSBwbGF5ZXIuXHJcbiAqL1xyXG5jbGFzcyBQcm9qZWN0aWxlRW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgUHJvamVjdGlsZUVuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byA5NiwgdGhlIGhlYWx0aCBzZXQgdG8gNDAsIHRoZSBkYW1hZ2Ugc2V0IHRvIDEwLCBhbmQgdGhlIHBvaW50c09uS2lsbFxyXG4gICAgICogc2V0IHRvIDI1MC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBQcm9qZWN0aWxlRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgUHJvamVjdGlsZUVuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgOTYsIDQwLCAxMCwgMjUwKTtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd24gPSAzMDA7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duUmF0ZSA9IDE7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duUmVzZXQgPSAzMDA7XHJcbiAgICAgICAgdGhpcy5zaG9vdEFtb3VudCA9IDE7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvUHJvamVjdGlsZUVuZW15LnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdGlsZUVuZW15OyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUmVndWxhckVuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBoYXMgYmFsYW5jZWQgc3RhdHMgYWNyb3NzIHRoZSBib2FyZC5cclxuICovXHJcbmNsYXNzIFJlZ3VsYXJFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBSZWd1bGFyRW5lbXkuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDY0LCB0aGUgaGVhbHRoIHNldCB0byAyNSwgdGhlIGRhbWFnZSBzZXQgdG8gMTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gMTAwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFJlZ3VsYXJFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBSZWd1bGFyRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCA2NCwgMjUsIDEwLCAxMDApO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1JlZ3VsYXJFbmVteS5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlZ3VsYXJFbmVteTsiLCJpbXBvcnQgRW5lbXkgZnJvbSAnLi9FbmVteS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIFRhbmtFbmVteSBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaXMgYSBzbG93IGVuZW15IHdpdGggaGlnaCBoZWFsdGggYW5kIGRhbWFnZS5cclxuICovXHJcbmNsYXNzIFRhbmtFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBUYW5rRW5lbXkuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDMyLCB0aGUgaGVhbHRoIHNldCB0byAxMDAsIHRoZSBkYW1hZ2Ugc2V0IHRvIDI1LCBhbmQgdGhlIHBvaW50c09uS2lsbFxyXG4gICAgICogc2V0IHRvIDUwMC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBUYW5rRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgVGFua0VuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMzIsIDEwMCwgIDI1LCA1MDApO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1RhbmtFbmVteS5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhbmtFbmVteTsiLCJpbXBvcnQgRW52aXJvbm1lbnRPYmplY3QgZnJvbSAnLi9FbnZpcm9ubWVudE9iamVjdC5qcyc7XG5cbi8qKlxuICogVGhlIEJ1c2ggY2xhc3MgZXh0ZW5kcyB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3MuIEl0IGlzIGEgbm9uLWJsb2NraW5nIG9iamVjdC5cbiAqL1xuY2xhc3MgQnVzaCBleHRlbmRzIEVudmlyb25tZW50T2JqZWN0IHtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBCdXNoLiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3NlcyBjb25zdHJ1Y3RvclxuICAgICAqIHdpdGggdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSBoZWFsdGggc2V0IHRvIDEwMDAwMCwgYW5kIGlzQmxvY2tpbmcgc2V0IHRvIGZhbHNlLlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBCdXNoLlxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBCdXNoLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgMTAwMDAwLCBmYWxzZSk7XG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0J1c2gucG5nXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnVzaDsiLCJpbXBvcnQgRW52aXJvbm1lbnRPYmplY3QgZnJvbSAnLi9FbnZpcm9ubWVudE9iamVjdC5qcyc7XG5cbi8qKlxuICogVGhlIENyYXRlIGNsYXNzIGV4dGVuZHMgdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzLiBJdCBpcyBhIGJsb2NraW5nIG9iamVjdCB3aXRoIGxvdyBoZWFsdGguXG4gKi9cbmNsYXNzIENyYXRlIGV4dGVuZHMgRW52aXJvbm1lbnRPYmplY3Qge1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIENyYXRlLiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3NlcyBjb25zdHJ1Y3RvclxuICAgICAqIHdpdGggdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSBoZWFsdGggc2V0IHRvIDEwMCwgYW5kIGlzQmxvY2tpbmcgc2V0IHRvIHRydWUuXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIENyYXRlLlxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBDcmF0ZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHN1cGVyKHgsIHksIDEwMCwgdHJ1ZSk7XG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0NyYXRlLnBuZ1wiKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENyYXRlO1xuIiwiLyoqXG4gKiBUaGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3MgaXMgdGhlIHBhcmVudCBmb3IgYWxsIGVudmlyb25tZW50IG9iamVjdHMuXG4gKi9cbmNsYXNzIEVudmlyb25tZW50T2JqZWN0IHtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSBoZWFsdGggVGhlIGhlYWx0aCBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIGlzQmxvY2tpbmcgV2hldGhlciB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2FuIGJlIHdhbGtlZCB0aHJvdWdoLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIGhlYWx0aCwgaXNCbG9ja2luZykge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLmhlYWx0aCA9IGhlYWx0aDtcbiAgICAgICAgdGhpcy5pc0Jsb2NraW5nID0gaXNCbG9ja2luZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBlbnZpcm9ubWVudCBvYmplY3QgZ2l2ZW4geCBhbmQgeS5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiB0byBiZSBzZXQuXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gdG8gYmUgc2V0LlxuICAgICAqL1xuICAgIHNldFBvc2l0aW9uKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbG9hZEltYWdlIGZ1bmN0aW9uIHRha2VzIGluIGEgdXJsIGFuZCBsb2FkcyBpdCBhcyBhbiBJbWFnZS4gT25jZSB0aGUgaW1hZ2UgaXMgbG9hZGVkLCB0aGlzLmlzSW1hZ2VMb2FkZWQgaXNcbiAgICAgKiBzZXQgdG8gdHJ1ZS4gVGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIEVudmlyb25tZW50T2JqZWN0IGFyZSBzZXQgdG8gdGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIGltYWdlLlxuICAgICAqIEBwYXJhbSB1cmwgVGhlIHVybCB0aGF0IHNob3VsZCBiZSBsb2FkZWQuXG4gICAgICovXG4gICAgbG9hZEltYWdlKHVybCkge1xuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBkcmF3IGZ1bmN0aW9uIGRyYXdzIHRoZSBpbWFnZSBvbiB0aGUgY2FudmFzIGF0IHRoZSB4IGFuZCB5IHBvc2l0aW9uIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0gY3R4IFRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXMuXG4gICAgICogQHBhcmFtIGNhbWVyYSBUaGUgY2FtZXJhIG9iamVjdC5cbiAgICAgKi9cbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVudmlyb25tZW50T2JqZWN0OyIsImltcG9ydCBFbnZpcm9ubWVudE9iamVjdCBmcm9tICcuL0Vudmlyb25tZW50T2JqZWN0LmpzJztcblxuLyoqXG4gKiBUaGUgUm9jayBjbGFzcyBleHRlbmRzIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzcy4gSXQgaXMgYSBibG9ja2luZyBvYmplY3Qgd2l0aCBoaWdoIGhlYWx0aC5cbiAqL1xuY2xhc3MgUm9jayBleHRlbmRzIEVudmlyb25tZW50T2JqZWN0IHtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBSb2NrLiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3NlcyBjb25zdHJ1Y3RvclxuICAgICAqIHdpdGggdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSBoZWFsdGggc2V0IHRvIDMwMCwgYW5kIGlzQmxvY2tpbmcgc2V0IHRvIHRydWUuXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFJvY2suXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFJvY2suXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICBzdXBlcih4LCB5LCAzMDAsIHRydWUpO1xuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9Sb2NrLnBuZ1wiKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJvY2s7XG4iLCJjbGFzcyBDb250cm9sbGVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudEJvZHkpIHtcclxuICAgICAgICB0aGlzLmtleXNQcmVzc2VkID0gW107XHJcbiAgICAgICAgdGhpcy5tb3VzZSA9IFswLCAwXTtcclxuICAgICAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBkb2N1bWVudEJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMua2V5c1ByZXNzZWRbZXZlbnQua2V5Q29kZV0gPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudEJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmtleXNQcmVzc2VkW2V2ZW50LmtleUNvZGVdID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Qm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZVswXSA9IGV2ZW50LmNsaWVudFg7XHJcbiAgICAgICAgICAgIHRoaXMubW91c2VbMV0gPSBldmVudC5jbGllbnRZO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudEJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubW91c2VQcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnRCb2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZVByZXNzZWQgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpc0tleVByZXNzZWQoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5c1ByZXNzZWRba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICBpc01vdXNlUHJlc3NlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb3VzZVByZXNzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TW91c2VQb3NpdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb3VzZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcjtcclxuIiwiaW1wb3J0IFdvcmxkIGZyb20gJy4vV29ybGQuanMnO1xyXG5pbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL0NvbnRyb2xsZXIuanMnO1xyXG5pbXBvcnQgRW5lbXlQcm9qZWN0aWxlIGZyb20gXCIuLi9FbmVtaWVzL0VuZW15UHJvamVjdGlsZVwiO1xyXG5pbXBvcnQgTWluaUJvc3MgZnJvbSBcIi4uL0VuZW1pZXMvTWluaUJvc3NcIjtcclxuaW1wb3J0IFByb2plY3RpbGVFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9Qcm9qZWN0aWxlRW5lbXlcIjtcclxuaW1wb3J0IEN1cnNvciBmcm9tICcuLi9DdXJzb3IuanMnO1xyXG5pbXBvcnQgUGlzdG9sIGZyb20gXCIuLi9XZWFwb25zL1Bpc3RvbFwiO1xyXG5pbXBvcnQgU25pcGVyIGZyb20gXCIuLi9XZWFwb25zL1NuaXBlclwiO1xyXG5pbXBvcnQgQXNzYXVsdFJpZmxlIGZyb20gJy4uL1dlYXBvbnMvQXNzYXVsdFJpZmxlJ1xyXG5pbXBvcnQgQnVsbGV0NTBjYWwgZnJvbSBcIi4uL1dlYXBvbnMvQnVsbGV0NTBjYWxcIjtcclxuaW1wb3J0IEJ1bGxldDU1NiBmcm9tIFwiLi4vV2VhcG9ucy9CdWxsZXQ1NTZcIjtcclxuaW1wb3J0IEJ1bGxldDltbSBmcm9tIFwiLi4vV2VhcG9ucy9CdWxsZXQ5bW1cIjtcclxuaW1wb3J0IFJvY2sgZnJvbSAnLi4vRW52aXJvbm1lbnRPYmplY3RzL1JvY2snO1xyXG5pbXBvcnQgQ3JhdGUgZnJvbSAnLi4vRW52aXJvbm1lbnRPYmplY3RzL0NyYXRlJztcclxuaW1wb3J0IEJ1c2ggZnJvbSAnLi4vRW52aXJvbm1lbnRPYmplY3RzL0J1c2gnO1xyXG5cclxuY2xhc3MgR2FtZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FudmFzLCBkb2N1bWVudEJvZHkpIHtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgICAgICB0aGlzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdGhpcy53b3JsZCA9IG5ldyBXb3JsZChjYW52YXMpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKGRvY3VtZW50Qm9keSk7XHJcbiAgICAgICAgdGhpcy5jdXJzb3IgPSBuZXcgQ3Vyc29yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKG1vZGlmaWVyKSB7XHJcbiAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaGVhbHRoID4gMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg4NykpIHsgLy8gUGxheWVyIGhvbGRpbmcgdXBcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLnkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnkgLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdCh0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueSArPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg4MykpIHsgLy8gUGxheWVyIGhvbGRpbmcgZG93blxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodCA8PSA1NjI1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueSArPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55IC09IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDY1KSkgeyAvLyBQbGF5ZXIgaG9sZGluZyBsZWZ0XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci54ID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54IC09IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggKz0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoNjgpKSB7IC8vIFBsYXllciBob2xkaW5nIHJpZ2h0XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGggPD0gMTAwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5jb250cm9sbGVyLmlzTW91c2VQcmVzc2VkKCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCB3ZXAgPSB0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnlbdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGxldCBtb3VzZSA9IHRoaXMuY29udHJvbGxlci5nZXRNb3VzZVBvc2l0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9GaXJlIHRoZSBjb3JyZWN0IGJ1bGxldCB0eXBlIGZvciB0aGUgY3VycmVudGx5IGVxdWlwcGVkIHdlYXBvbi5cclxuICAgICAgICAgICAgICAgIC8vVGhpcyBjb3VsZCBiZSBkb25lIG1vcmUgZ3JhY2VmdWxseSBpbiB0aGUgZnV0dXJlXHJcbiAgICAgICAgICAgICAgICBpZih3ZXAgaW5zdGFuY2VvZiBQaXN0b2wpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih3ZXAuY29vbGRvd24gPD0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5wdXNoKG5ldyBCdWxsZXQ5bW0odGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnksIG1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngsIG1vdXNlWzFdK3RoaXMud29ybGQuY2FtZXJhLnkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VwLnNvdW5kLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VwLnNvdW5kLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VwLmNvb2xkb3duKz0yMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih3ZXAgaW5zdGFuY2VvZiBTbmlwZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih3ZXAuY29vbGRvd24gPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0NTBjYWwodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnksIG1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngsIG1vdXNlWzFdK3RoaXMud29ybGQuY2FtZXJhLnkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VwLnNvdW5kLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VwLnNvdW5kLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VwLmNvb2xkb3duKz05MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih3ZXAgaW5zdGFuY2VvZiBBc3NhdWx0UmlmbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih3ZXAuY29vbGRvd24gPD0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5wdXNoKG5ldyBCdWxsZXQ1NTYodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnksIG1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngsIG1vdXNlWzFdK3RoaXMud29ybGQuY2FtZXJhLnkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VwLnNvdW5kLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VwLnNvdW5kLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VwLmNvb2xkb3duKz0yNTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL1RoZSBib3VuZGluZyBib3ggaW4gdGhpcyBpZiBzdGF0ZW1lbnQgdGVsbHMgaWYgdGhlIG1vdXNlIHdhcyBjbGlja2VkIGluc2lkZSB0aGUgdHJ5IGFnYWluIGJ1dHRvbixcclxuICAgICAgICAgICAgICAgIC8vYW5kIGlmIHNvIHRoZSB0aGlzLndvcmxkIGlzIHJlc3RhcnRlZC5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL1RoZXNlIGNvbnRyb2xzIGNoYW5nZSB0aGUgYWN0aXZlIHdlYXBvbiB3aXRoIHNpbXBsZSAxLDIsMyxldGMgY29udHJvbHMgZm9yIGludmVudG9yeVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg0OSkpIHsgLy8gUGxheWVyIHByZXNzZWQgMVxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg1MCkpIHsgLy8gUGxheWVyIHByZXNzZWQgMlxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg1MSkpIHsgLy8gUGxheWVyIHByZXNzZWQgM1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSB0aGlzLndvcmxkLmJ1bGxldHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0c1tpXS5tb3ZlKG1vZGlmaWVyLCB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cywgdGhpcy53b3JsZC5lbmVtaWVzKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuYnVsbGV0c1tpXS5saXZlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29udHJvbGxlci5pc01vdXNlUHJlc3NlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW91c2UgPSB0aGlzLmNvbnRyb2xsZXIuZ2V0TW91c2VQb3NpdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKG1vdXNlWzBdID4gdGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCAmJiBtb3VzZVswXSA8ICh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwKzIwMClcclxuICAgICAgICAgICAgICAgICAgICAmJiBtb3VzZVsxXSA+IHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUgJiYgbW91c2VbMV0gPCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1ICsgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5zdGFydCh0aGlzLmNhbnZhcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpID0gdGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5tb3ZlKHRoaXMud29ybGQucGxheWVyLCBtb2RpZmllciwgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMpO1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0uYXR0YWNrQ29vbGRvd24gPiAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmF0dGFja0Nvb2xkb3duIC09IDU7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXSBpbnN0YW5jZW9mIFByb2plY3RpbGVFbmVteSB8fCB0aGlzLndvcmxkLmVuZW1pZXNbaV0gaW5zdGFuY2VvZiBNaW5pQm9zcykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLnNob290Q29vbGRvd24gPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duIC09IHRoaXMud29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duUmF0ZTtcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlcy5wdXNoKG5ldyBFbmVteVByb2plY3RpbGUodGhpcy53b3JsZC5lbmVtaWVzW2ldLnggKyB0aGlzLndvcmxkLmVuZW1pZXNbaV0ud2lkdGgvMiwgdGhpcy53b3JsZC5lbmVtaWVzW2ldLnkgKyB0aGlzLndvcmxkLmVuZW1pZXNbaV0uaGVpZ2h0LzIsIHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0LzIpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93biArPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93blJlc2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5oZWFsdGggPD0gMClcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vVXBkYXRlIHdlYXBvbiBjb29sZG93bnNcclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICBsZXQgd2VwID0gdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W2ldO1xyXG4gICAgICAgICAgaWYod2VwLmNvb2xkb3duID4gMCl7XHJcbiAgICAgICAgICAgIHdlcC5jb29sZG93biAtPTU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXNbaV0ubW92ZShtb2RpZmllciwgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMsIHRoaXMud29ybGQucGxheWVyKTtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzW2ldLmxpdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5oZWFsdGggPD0gMClcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzLnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy53b3JsZC53YXZlICs9IDE7XHJcbiAgICAgICAgICAgIHRoaXMud29ybGQuc3RhcnRXYXZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLndvcmxkLmNhbWVyYS51cGRhdGUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBsZXQgbW91c2UgPSB0aGlzLmNvbnRyb2xsZXIuZ2V0TW91c2VQb3NpdGlvbigpO1xyXG4gICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmhlYWx0aCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMTI4cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI0ZGRic7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiR2FtZSBPdmVyXCIsIHRoaXMuY2FudmFzLndpZHRoLzIsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyMwMDAnO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KFwiR2FtZSBPdmVyXCIsIHRoaXMuY2FudmFzLndpZHRoLzIsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1LCAyMDAsIDEwMCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVJlY3QodGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSwgMjAwLCAxMDApO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIyNHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyMwMDAnO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlRyeSBhZ2Fpbj9cIiwgdGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCArIDEwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSArIDUwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuaXNCYWNrZ3JvdW5kTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmRyYXdCYWNrZ3JvdW5kKHRoaXMuY3R4LCB0aGlzLmNhbnZhcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLmlzSW1hZ2VMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uaXNJbWFnZUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuYnVsbGV0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5idWxsZXRzW2ldLmlzSW1hZ2VMb2FkZWQgJiYgdGhpcy53b3JsZC5idWxsZXRzW2ldLmxpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHNbaV0uZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5pc0ltYWdlTG9hZGVkICYmIHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5saXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaXNJbWFnZUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEsIG1vdXNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjQ4cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkZGJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRoaXMud29ybGQucGxheWVyLmhlYWx0aCArIFwiIEhQXCIsIHRoaXMuY2FudmFzLndpZHRoLzIgLSAyOTAsIDUwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQodGhpcy53b3JsZC5wbGF5ZXIuaGVhbHRoICsgXCIgSFBcIiwgdGhpcy5jYW52YXMud2lkdGgvMiAtIDI5MCwgNTApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJXYXZlIFwiICsgdGhpcy53b3JsZC53YXZlLCB0aGlzLmNhbnZhcy53aWR0aC8yLCA1MCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KFwiV2F2ZSBcIiArIHRoaXMud29ybGQud2F2ZSwgdGhpcy5jYW52YXMud2lkdGgvMiwgNTApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aCArIFwiIEVuZW1pZXMgTGVmdFwiLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgMzUwLCA1MCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGggKyBcIiBFbmVtaWVzIExlZnRcIiwgdGhpcy5jYW52YXMud2lkdGgvMiArIDM1MCwgNTApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiNDhweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoJ0FjdGl2ZSBXZWFwb246ICcgKyB0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnlbdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4XS5uYW1lLCB0aGlzLmNhbnZhcy53aWR0aC8yLCAxMjUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCgnQWN0aXZlIFdlYXBvbjogJyArIHRoaXMud29ybGQucGxheWVyLmludmVudG9yeVt0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXhdLm5hbWUsIHRoaXMuY2FudmFzLndpZHRoLzIsIDEyNSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTWluaW1hcFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJ3JnYmEoMzUsIDE3NywgNzcsIDAuMiknO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QodGhpcy5jYW52YXMud2lkdGggLSA0MjUsIDI1LCA0MDAsIDIyNSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KHRoaXMuY2FudmFzLndpZHRoIC0gNDI1LCAyNSwgNDAwLCAyMjUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHhQZXJjZW50ID0gKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yKSAvIHRoaXMud29ybGQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBsZXQgeVBlcmNlbnQgPSAodGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yKSAvIHRoaXMud29ybGQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHhSZWxhdGl2ZSA9IHhQZXJjZW50KjQwMDtcclxuICAgICAgICAgICAgICAgIGxldCB5UmVsYXRpdmUgPSB5UGVyY2VudCoyMjU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzAwRkYwMCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmFyYygodGhpcy5jYW52YXMud2lkdGggLSA0MjUpICsgeFJlbGF0aXZlLCAyNSArIHlSZWxhdGl2ZSwgMi41LCAwLCAyKk1hdGguUEkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uaXNJbWFnZUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgeFBlcmNlbnQgPSAodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0ueCArIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLndpZHRoLzIpIC8gdGhpcy53b3JsZC53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHlQZXJjZW50ID0gKHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLnkgKyB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5oZWlnaHQvMikgLyB0aGlzLndvcmxkLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHhSZWxhdGl2ZSA9IHhQZXJjZW50KjQwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHlSZWxhdGl2ZSA9IHlQZXJjZW50KjIyNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jdHguZHJhd0ltYWdlKHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmltYWdlLCAodGhpcy5jYW52YXMud2lkdGggLSA0MjUpICsgeFJlbGF0aXZlICsgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0ud2lkdGgvMiwgMjUgKyB5UmVsYXRpdmUgKyB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5oZWlnaHQvMiwgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0ud2lkdGgvMjUsIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmhlaWdodC8yNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjODA4MDgwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmFyYygodGhpcy5jYW52YXMud2lkdGggLSA0MjUpICsgeFJlbGF0aXZlLCAyNSArIHlSZWxhdGl2ZSwgMi41LCAwLCAyKk1hdGguUEkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB4UGVyY2VudCA9ICh0aGlzLndvcmxkLmVuZW1pZXNbaV0ueCArIHRoaXMud29ybGQuZW5lbWllc1tpXS53aWR0aC8yKSAvIHRoaXMud29ybGQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB5UGVyY2VudCA9ICh0aGlzLndvcmxkLmVuZW1pZXNbaV0ueSArIHRoaXMud29ybGQuZW5lbWllc1tpXS5oZWlnaHQvMikgLyB0aGlzLndvcmxkLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHhSZWxhdGl2ZSA9IHhQZXJjZW50KjQwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHlSZWxhdGl2ZSA9IHlQZXJjZW50KjIyNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRjAwMDAnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguYXJjKCh0aGlzLmNhbnZhcy53aWR0aCAtIDQyNSkgKyB4UmVsYXRpdmUsIDI1ICsgeVJlbGF0aXZlLCAyLjUsIDAsIDIqTWF0aC5QSSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGxhdGVyIC0gZGVidWdnaW5nIHB1cnBvc2VzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIyNHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkZGJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCdQb3NYOiAnICsgdGhpcy53b3JsZC5wbGF5ZXIueCwgdGhpcy5jYW52YXMud2lkdGgvMiAtIDI5MCwgMTc1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoJ1Bvc1k6ICcgKyB0aGlzLndvcmxkLnBsYXllci55LCB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMjkwLCAyNTApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoJ0NhbWVyYVg6ICcgKyB0aGlzLndvcmxkLmNhbWVyYS54LCB0aGlzLmNhbnZhcy53aWR0aC8yLCAxNzUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCgnQ2FtZXJhWTogJyArIHRoaXMud29ybGQuY2FtZXJhLnksIHRoaXMuY2FudmFzLndpZHRoLzIsIDI1MCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnbW91c2VYOiAnICsgbW91c2VbMF0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyAzNTAsIDE3NSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCdtb3VzZVk6ICcgKyBtb3VzZVsxXSwgdGhpcy5jYW52YXMud2lkdGgvMiArIDM1MCwgMjUwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5jdXJzb3IuaW1hZ2UsIG1vdXNlWzBdIC0gdGhpcy5jdXJzb3IuaW1hZ2Uud2lkdGgvMiwgbW91c2VbMV0gLSB0aGlzLmN1cnNvci5pbWFnZS5oZWlnaHQvMik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWU7XHJcbiIsImltcG9ydCBSb2NrIGZyb20gXCIuLi9FbnZpcm9ubWVudE9iamVjdHMvUm9ja1wiO1xyXG5pbXBvcnQgQnVzaCBmcm9tIFwiLi4vRW52aXJvbm1lbnRPYmplY3RzL0J1c2hcIjtcclxuaW1wb3J0IENyYXRlIGZyb20gXCIuLi9FbnZpcm9ubWVudE9iamVjdHMvQ3JhdGVcIjtcclxuaW1wb3J0IFRhbmtFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9UYW5rRW5lbXlcIjtcclxuaW1wb3J0IFJlZ3VsYXJFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9SZWd1bGFyRW5lbXlcIjtcclxuaW1wb3J0IExpZ2h0RW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvTGlnaHRFbmVteVwiO1xyXG5pbXBvcnQgUHJvamVjdGlsZUVuZW15IGZyb20gXCIuLi9FbmVtaWVzL1Byb2plY3RpbGVFbmVteVwiO1xyXG5pbXBvcnQgTWluaUJvc3MgZnJvbSAnLi4vRW5lbWllcy9NaW5pQm9zcyc7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL1BsYXllcnMvUGxheWVyXCI7XHJcbmltcG9ydCBDYW1lcmEgZnJvbSBcIi4uL1BsYXllcnMvQ2FtZXJhXCI7XHJcbmltcG9ydCBVdGlsIGZyb20gXCIuLi9VdGlsaXRpZXMvVXRpbFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBXb3JsZCBjbGFzcyBob2xkcyB0aGUgaW5mb3JtYXRpb24gcmVsYXRlZCB0byB0aGUgd29ybGQuXHJcbiAqL1xyXG5jbGFzcyBXb3JsZCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkIG9mIHRoZSB3b3JsZCBhbmQgbG9hZHMgdGhlIGJhY2tncm91bmQuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzIFRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhcykge1xyXG4gICAgICAgIHRoaXMuc3RhcnQoY2FudmFzKTtcclxuICAgICAgICB0aGlzLmxvYWRCYWNrZ3JvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc3RhcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgV29ybGQuIFRoZSBwbGF5ZXIgaXMgbWFkZSBhbmQgdGhlIGNhbWVyYSBpcyBhdHRhY2hlZCB0byB0aGUgcGxheWVyLlxyXG4gICAgICogQSBjYWxsIGlzIHRvIGluaXRpYWxpemUgdGhlIGVudmlyb25tZW50IGFuZCBzdGFydCB0aGUgd2F2ZS5cclxuICAgICAqIEBwYXJhbSBjYW52YXMgVGhlIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgc3RhcnQoY2FudmFzKSB7XHJcbiAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLmVuZW1pZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmJ1bGxldHMgPSBbXTtcclxuICAgICAgICB0aGlzLmVuZW15UHJvamVjdGlsZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVFbnZpcm9ubWVudCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBDYW1lcmEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0LCAxMDAwMCwgNTYyNSk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyLCBjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLndhdmUgPSAxO1xyXG4gICAgICAgIHRoaXMuc3RhcnRXYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGluaXRpYWxpemVzIHRoZSBlbnZpcm9ubWVudCBieSBwdXNoaW5nIGVudmlyb25tZW50IG9iamVjdHMgb250byB0aGUgZW52aXJvbm1lbnRPYmplY3RzIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplRW52aXJvbm1lbnQoKSB7XHJcbiAgICAgICAgbGV0IGNyYXRlQ2FwID0gMjA7XHJcbiAgICAgICAgbGV0IGJ1c2hDYXAgPSAzMDtcclxuICAgICAgICBsZXQgcm9ja0NhcCA9IDMwO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgY3JhdGVDYXA7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMucHVzaChuZXcgQ3JhdGUoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBidXNoQ2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzLnB1c2gobmV3IEJ1c2goVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByb2NrQ2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzLnB1c2gobmV3IFJvY2soVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG5cclxuICAgICAgICBsZXQgY29sbGlzaW9uRmxhZyA9IHRydWU7XHJcbiAgICAgICAgd2hpbGUoY29sbGlzaW9uRmxhZyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgaSA9IFV0aWwuYXJlQW55Q29sbGlzaW9uc0luU2FtZUFycmF5KHRoaXMuZW52aXJvbm1lbnRPYmplY3RzKTtcclxuICAgICAgICAgICAgaWYoaSA9PT0gLTEpXHJcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25GbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzW2ldLnNldFBvc2l0aW9uKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gc3RhcnRzIHRoZSB3YXZlIGJ5IHB1c2hpbmcgZW5lbWllcyBvbnRvIHRoZSBlbmVtaWVzIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBzdGFydFdhdmUoKSB7XHJcbiAgICAgICAgbGV0IGxpZ2h0RW5lbXlDYXAgPSB0aGlzLndhdmUgKiAxMDtcclxuICAgICAgICBsZXQgcmVndWxhckVuZW15Q2FwID0gdGhpcy53YXZlICogMTA7XHJcbiAgICAgICAgbGV0IHRhbmtFbmVteUNhcCA9IHRoaXMud2F2ZSAqIDU7XHJcbiAgICAgICAgbGV0IHByb2plY3RpbGVFbmVteUNhcCA9IE1hdGguZmxvb3IodGhpcy53YXZlLzIpKjU7XHJcbiAgICAgICAgbGV0IG1pbmlCb3NzQ2FwID0gTWF0aC5mbG9vcih0aGlzLndhdmUvNSk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsaWdodEVuZW15Q2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBMaWdodEVuZW15KFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmVndWxhckVuZW15Q2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBSZWd1bGFyRW5lbXkoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0YW5rRW5lbXlDYXA7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IFRhbmtFbmVteShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHByb2plY3RpbGVFbmVteUNhcDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgUHJvamVjdGlsZUVuZW15KFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbWluaUJvc3NDYXA7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IE1pbmlCb3NzKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbGxpc2lvbkZsYWcgPSB0cnVlO1xyXG4gICAgICAgIHdoaWxlKGNvbGxpc2lvbkZsYWcgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IGkgPSBVdGlsLmFyZUFueUNvbGxpc2lvbnModGhpcy5lbmVtaWVzLCB0aGlzLmVudmlyb25tZW50T2JqZWN0cyk7XHJcbiAgICAgICAgICAgIGlmIChpID09PSAtMSlcclxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbkZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmVtaWVzW2ldLnNldFBvc2l0aW9uKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsb2FkQmFja2dyb3VuZCBmdW5jdGlvbiBsb2FkcyB0aGUgYmFja2dyb3VuZCBpbWFnZS4gT25jZSB0aGUgaW1hZ2UgaXMgbG9hZGVkLCB0aGlzLmlzQmFja2dyb3VuZExvYWRlZCBpc1xyXG4gICAgICogc2V0IHRvIHRydWUuXHJcbiAgICAgKi9cclxuICAgIGxvYWRCYWNrZ3JvdW5kKCkge1xyXG4gICAgICAgIHRoaXMuaXNCYWNrZ3JvdW5kTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0JhY2tncm91bmRMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5iYWNrZ3JvdW5kLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuYmFja2dyb3VuZC5oZWlnaHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQuc3JjID0gXCJHcmFwaGljcy9CYWNrZ3JvdW5kLnBuZ1wiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRyYXdCYWNrZ3JvdW5kIGZ1bmN0aW9uIGRyYXdzIHRoZSBiYWNrZ3JvdW5kIG9mIHRoZSB3b3JsZC5cclxuICAgICAqIEBwYXJhbSBjdHggVGhlIGNvbnRleHQgb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjYW52YXMgVGhlIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgZHJhd0JhY2tncm91bmQoY3R4LCBjYW52YXMpIHtcclxuICAgICAgICBsZXQgc1dpZHRoLCBzSGVpZ2h0O1xyXG4gICAgICAgIHNXaWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgICAgICBzSGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuXHJcbiAgICAgICAgaWYodGhpcy5iYWNrZ3JvdW5kLndpZHRoIC0gdGhpcy5jYW1lcmEueCA8IGNhbnZhcy53aWR0aClcclxuICAgICAgICAgICAgc1dpZHRoID0gdGhpcy5iYWNrZ3JvdW5kLndpZHRoIC0gdGhpcy5jYW1lcmEueDtcclxuICAgICAgICBpZih0aGlzLmJhY2tncm91bmQuaGVpZ2h0IC0gdGhpcy5jYW1lcmEueSA8IGNhbnZhcy5oZWlnaHQpXHJcbiAgICAgICAgICAgIHNIZWlnaHQgPSB0aGlzLmJhY2tncm91bmQuaGVpZ2h0IC0gdGhpcy5jYW1lcmEueTtcclxuXHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmJhY2tncm91bmQsIHRoaXMuY2FtZXJhLngsIHRoaXMuY2FtZXJhLnksIHNXaWR0aCwgc0hlaWdodCwgMCwgMCwgc1dpZHRoLCBzSGVpZ2h0KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdvcmxkO1xyXG4iLCIvKlxuICBTb3VyY2VzOlxuICBodHRwOi8vd3d3Lmxvc3RkZWNhZGVnYW1lcy5jb20vaG93LXRvLW1ha2UtYS1zaW1wbGUtaHRtbDUtY2FudmFzLWdhbWUvXG4gIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQwMzcyMTIvaHRtbC1jYW52YXMtZnVsbC1zY3JlZW4/dXRtX21lZGl1bT1vcmdhbmljJnV0bV9zb3VyY2U9Z29vZ2xlX3JpY2hfcWEmdXRtX2NhbXBhaWduPWdvb2dsZV9yaWNoX3FhXG4gIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2OTE5NjAxL2h0bWw1LWNhbnZhcy13b3JsZC5jYW1lcmEtdmlld3BvcnQtaG93LXRvLWFjdGFsbHktZG8taXQ/dXRtX21lZGl1bT1vcmdhbmljJnV0bV9zb3VyY2U9Z29vZ2xlX3JpY2hfcWEmdXRtX2NhbXBhaWduPWdvb2dsZV9yaWNoX3FhXG4gIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvZ2ZjYXJ2L1FLZ0hzL1xuICovXG5cbmltcG9ydCBHYW1lIGZyb20gJy4vR2FtZS9HYW1lLmpzJztcblxubGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbmxldCBnYW1lID0gbmV3IEdhbWUoY2FudmFzLCBkb2N1bWVudC5ib2R5KTtcblxubGV0IG1haW4gPSAoKSA9PiB7XG4gICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgbGV0IGRlbHRhID0gbm93IC0gdGhlbjtcblxuICAgIGdhbWUudXBkYXRlKGRlbHRhIC8gMTAwMCk7XG4gICAgZ2FtZS5kcmF3KCk7XG5cbiAgICB0aGVuID0gbm93O1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW4pO1xufTtcblxuLy8gQ3Jvc3MtYnJvd3NlciBzdXBwb3J0IGZvciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZTtcblxubGV0IHRoZW4gPSBEYXRlLm5vdygpO1xubWFpbigpO1xuIiwiLypcclxuICBTb3VyY2VzOlxyXG4gIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvZ2ZjYXJ2L1FLZ0hzL1xyXG4qL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBDYW1lcmEgY2xhc3MgaXMgdXNlZCB0byBmb2xsb3cgdGhlIHBsYXllcidzIG1vdmVtZW50LlxyXG4gKi9cclxuY2xhc3MgQ2FtZXJhIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBDYW1lcmEuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgQ2FtZXJhLlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIENhbWVyYS5cclxuICAgICAqIEBwYXJhbSBjYW52YXNXaWR0aCBUaGUgd2lkdGggb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjYW52YXNIZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIHdvcmxkV2lkdGggVGhlIHdpZHRoIG9mIHRoZSB3b3JsZC5cclxuICAgICAqIEBwYXJhbSB3b3JsZEhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSB3b3JsZC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCwgd29ybGRXaWR0aCwgd29ybGRIZWlnaHQpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy54RGVhZFpvbmUgPSAwO1xyXG4gICAgICAgIHRoaXMueURlYWRab25lID0gMDtcclxuICAgICAgICB0aGlzLndpZHRoID0gY2FudmFzV2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBjYW52YXNIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy53b3JsZFdpZHRoID0gd29ybGRXaWR0aDtcclxuICAgICAgICB0aGlzLndvcmxkSGVpZ2h0ID0gd29ybGRIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gc2V0IHdobyB0aGUgY2FtZXJhIGlzIGZvbGxvd2luZy5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciB0aGF0IHRoZSBjYW1lcmEgc2hvdWxkIGZvbGxvdy5cclxuICAgICAqIEBwYXJhbSB4RGVhZFpvbmVcclxuICAgICAqIEBwYXJhbSB5RGVhZFpvbmVcclxuICAgICAqL1xyXG4gICAgZm9sbG93KHBsYXllciwgeERlYWRab25lLCB5RGVhZFpvbmUpIHtcclxuICAgICAgICB0aGlzLmZvbGxvd2luZyA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLnhEZWFkWm9uZSA9IHhEZWFkWm9uZTtcclxuICAgICAgICB0aGlzLnlEZWFkWm9uZSA9IHlEZWFkWm9uZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyB0aGUgY2FtZXJhJ3MgeCBhbmQgeSBwb3NpdGlvbi5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZm9sbG93aW5nICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5mb2xsb3dpbmcueCAtIHRoaXMueCArIHRoaXMueERlYWRab25lID4gdGhpcy53aWR0aClcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuZm9sbG93aW5nLnggLSAodGhpcy53aWR0aCAtIHRoaXMueERlYWRab25lKTtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmZvbGxvd2luZy54IC0gdGhpcy54RGVhZFpvbmUgPCB0aGlzLngpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmZvbGxvd2luZy54IC0gdGhpcy54RGVhZFpvbmU7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZm9sbG93aW5nLnkgLSB0aGlzLnkgKyB0aGlzLnlEZWFkWm9uZSA+IHRoaXMuaGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5mb2xsb3dpbmcueSAtICh0aGlzLmhlaWdodCAtIHRoaXMueURlYWRab25lKTtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmZvbGxvd2luZy55IC0gdGhpcy55RGVhZFpvbmUgPCB0aGlzLnkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmZvbGxvd2luZy55IC0gdGhpcy55RGVhZFpvbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMueCA8IDApXHJcbiAgICAgICAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgICAgaWYodGhpcy55IDwgMClcclxuICAgICAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICBpZih0aGlzLnggKyB0aGlzLndpZHRoID4gdGhpcy53b3JsZFdpZHRoKVxyXG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLndvcmxkV2lkdGggLSB0aGlzLndpZHRoO1xyXG4gICAgICAgIGlmKHRoaXMueSArIHRoaXMuaGVpZ2h0ID4gdGhpcy53b3JsZEhlaWdodClcclxuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy53b3JsZEhlaWdodCAtIHRoaXMuaGVpZ2h0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYW1lcmE7IiwiaW1wb3J0IFBpc3RvbCBmcm9tICcuLi9XZWFwb25zL1Bpc3RvbC5qcydcbmltcG9ydCBTbmlwZXIgZnJvbSAnLi4vV2VhcG9ucy9TbmlwZXIuanMnXG5pbXBvcnQgQXNzYXVsdFJpZmxlIGZyb20gJy4uL1dlYXBvbnMvQXNzYXVsdFJpZmxlLmpzJ1xuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xuXG5jbGFzcyBQbGF5ZXIge1xuICAvL3RoaXMueCA9IHggcG9zaXRpb25cbiAgLy90aGlzLnkgPSB5IHBvc2l0aW9uXG4gIC8vdGhpcy5oZWFsdGggPSBwbGF5ZXIncyBsaWZlXG4gIC8vdGhpcy5zcGVlZCA9IHBsYXllcidzIG1vdmVzcGVlZFxuICAvL3RoaXMubG9hZEltYWdlKCkgaXMgYSBmdW5jdGlvbiB0byBhdHRhY2ggdGhlIGltYWdlIHRvIHRoZSBwbGF5ZXIuXG4gIC8vVGhlIHBsYXllciBoYXMgYW4gYXJyYXkgdG8gaG9sZCBoaXMgaXRlbXMgYW5kIGhlIHdpbGwgc3RhcnQgd2l0aCBhIHBpc3RvbCBhbmQgc25pcGVyIHRoaXMgd2VlayBmb3IgZWFzeSB0ZXN0aW5nXG4gIC8vTmV4dCB3ZWVrIGl0ZW1zIHdpbGwgYmUgcGlja2VkIHVwIGJ5IHdhbGtpbmcgb3ZlciB0aGVtIGFuZCBhcyBzdWNoIHRoZXJlIHdpbGwgbmVlZCB0byBiZSBhbiBhZGRJdGVtIGZ1bmN0aW9uXG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgIHRoaXMueCA9IHg7XG4gICAgICB0aGlzLnkgPSB5O1xuICAgICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgICB0aGlzLnNwZWVkID0gMjU2O1xuICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICAgIGxldCBzdGFydF9waXN0b2wgPSBuZXcgUGlzdG9sKCk7XG4gICAgICBsZXQgc3RhcnRfc25pcGVyID0gbmV3IFNuaXBlcigpO1xuICAgICAgbGV0IHN0YXJ0X3JpZmxlID0gbmV3IEFzc2F1bHRSaWZsZSgpO1xuICAgICAgdGhpcy5pbnZlbnRvcnkgPSBbc3RhcnRfcGlzdG9sLCBzdGFydF9zbmlwZXIsIHN0YXJ0X3JpZmxlXTtcbiAgICAgIHRoaXMuYWN0aXZlX2luZGV4ID0gMDtcbiAgfVxuXG4gICAgaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoVXRpbC5pc0NvbGxpc2lvbihlbnZpcm9ubWVudE9iamVjdHNbaV0sIHRoaXMpICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gIGxvYWRJbWFnZSgpIHtcbiAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgfTtcbiAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gXCJHcmFwaGljcy9QbGF5ZXIucG5nXCI7XG4gIH1cblxuICAgIGRyYXcoY3R4LCBjYW1lcmEsIG1vdXNlKSB7XG4gICAgICAgIC8vY3R4LnNhdmUoKTtcbiAgICAgICAgLy9jdHgudHJhbnNsYXRlKCh0aGlzLnggKyB0aGlzLndpZHRoLzIpIC0gY2FtZXJhLngsICh0aGlzLnkgKyB0aGlzLmhlaWdodC8yKSAtIGNhbWVyYS55KTtcbiAgICAgICAgLy9jdHgucm90YXRlKE1hdGguYXRhbjIobW91c2VbMV0gLSAodGhpcy55IC0gY2FtZXJhLnkpLCBtb3VzZVswXSAtICh0aGlzLnggLSBjYW1lcmEueCkpKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xuICAgICAgICAvL2N0eC5yZXN0b3JlKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCIvKlxyXG4gIFNvdXJjZXM6XHJcbiAgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9HYW1lcy9UZWNobmlxdWVzLzJEX2NvbGxpc2lvbl9kZXRlY3Rpb25cclxuICBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80OTU5OTc1L2dlbmVyYXRlLXJhbmRvbS1udW1iZXItYmV0d2Vlbi10d28tbnVtYmVycy1pbi1qYXZhc2NyaXB0XHJcbiovXHJcblxyXG4vKipcclxuICogVGhlIFV0aWwgY2xhc3MgY29udGFpbnMgdmFyaW91cyB1dGlsaXR5IGZ1bmN0aW9ucy5cclxuICovXHJcbmNsYXNzIFV0aWwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGlzQ29sbGlzaW9uIG1ldGhvZCBjaGVja3MgaWYgdGhlcmUgaXMgYSBjb2xsaXNpb24gYmV0d2VlbiB0aGUgdHdvIGlucHV0dGVkIHJlY3RhbmdsZXMuIFRoaXMgYWxnb3JpdGhtIG9ubHlcclxuICAgICAqIHdvcmtzIHdpdGggYXhpcy1hbGlnbmVkIHJlY3RhbmdsZXMuXHJcbiAgICAgKiBAcGFyYW0gcmVjdGFuZ2xlMSBUaGUgZmlyc3QgcmVjdGFuZ2xlLlxyXG4gICAgICogQHBhcmFtIHJlY3RhbmdsZTIgVGhlIHNlY29uZCByZWN0YW5nbGUuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciB0aGVyZSBleGlzdHMgYSBjb2xsaXNpb24gYmV0d2VlbiB0aGUgdHdvIGlucHV0dGVkIHJlY3RhbmdsZXMuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc0NvbGxpc2lvbihyZWN0YW5nbGUxLCByZWN0YW5nbGUyKSB7XHJcbiAgICAgICAgaWYocmVjdGFuZ2xlMS54IDwgcmVjdGFuZ2xlMi54ICsgcmVjdGFuZ2xlMi53aWR0aCAmJlxyXG4gICAgICAgICAgICByZWN0YW5nbGUxLnggKyByZWN0YW5nbGUxLndpZHRoID4gcmVjdGFuZ2xlMi54ICYmXHJcbiAgICAgICAgICAgIHJlY3RhbmdsZTEueSA8IHJlY3RhbmdsZTIueSArIHJlY3RhbmdsZTIuaGVpZ2h0ICYmXHJcbiAgICAgICAgICAgIHJlY3RhbmdsZTEueSArIHJlY3RhbmdsZTEuaGVpZ2h0ID4gcmVjdGFuZ2xlMi55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIHRoZXJlIGFyZSBhbnkgY29sbGlzaW9ucyBiZXR3ZWVuIHRoZSB0d28gYXJyYXlzLiBUaGlzIGFsZ29yaXRobSBvbmx5IHdvcmtzIHdpdGhcclxuICAgICAqIGF4aXMtYWxpZ25lZCByZWN0YW5nbGVzLlxyXG4gICAgICogQHBhcmFtIGFycmF5MSBBbiBhcnJheSBvZiByZWN0YW5nbGVzLlxyXG4gICAgICogQHBhcmFtIGFycmF5MiBBbiBhcnJheSBvZiByZWN0YW5nbGVzLlxyXG4gICAgICogQHJldHVybnMge2ludGVnZXJ9IC0xIGlmIHRoZXJlIGFyZSBubyBjb2xsaXNpb25zIG9yIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgYXJyYXkgaWYgdGhlcmUgaXMuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhcmVBbnlDb2xsaXNpb25zKGFycmF5MSwgYXJyYXkyKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFycmF5MS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgYXJyYXkyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzQ29sbGlzaW9uKGFycmF5MVtpXSwgYXJyYXkyW2pdKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFyZUFueUNvbGxpc2lvbnNJblNhbWVBcnJheShhcnJheSkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgYXJyYXkubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKGkgIT09IGopIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlzQ29sbGlzaW9uKGFycmF5W2ldLCBhcnJheVtqXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhIHJhbmRvbSBudW1iZXIgaW4gdGhlIGdpdmVuIGludGVydmFsLlxyXG4gICAgICogQHBhcmFtIGZyb21cclxuICAgICAqIEBwYXJhbSB0b1xyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJhbmRvbUludEZyb21JbnRlcnZhbChmcm9tLCB0bykge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodG8gLSBmcm9tICsgMSkgKyBmcm9tKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVdGlsOyIsImltcG9ydCBXZWFwb24gZnJvbSAnLi9XZWFwb24uanMnO1xyXG5cclxuY2xhc3MgQXNzYXVsdFJpZmxlIGV4dGVuZHMgV2VhcG9ue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcig1LCAzMCk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJBc3NhdWx0IFJpZmxlXCI7XHJcbiAgICAgICAgc3VwZXIubG9hZFNob290U291bmQoJ0F1ZGlvL1JpZmxlU2hvdC5tcDMnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXNzYXVsdFJpZmxlO1xyXG4iLCJpbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XG5cbmNsYXNzIEJ1bGxldHtcbiAgICBjb25zdHJ1Y3Rvcih2ZWxvY2l0eSwgZGFtYWdlLCB4LCB5LCBkZXN0WCwgZGVzdFksIHBlbmV0cmF0ZXMpIHtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5kZXN0WCA9IGRlc3RYO1xuICAgICAgICB0aGlzLmRlc3RZID0gZGVzdFk7XG4gICAgICAgIHRoaXMubGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNQZW5ldHJhdGluZyA9IHBlbmV0cmF0ZXM7XG4gICAgICAgIGxldCBkaWZmWCA9IHRoaXMuZGVzdFggLSB0aGlzLng7XG4gICAgICAgIGxldCBkaWZmWSA9IHRoaXMuZGVzdFkgLSB0aGlzLnk7XG4gICAgICAgIC8vVGhpcyBsb2dpYyBmaW5kcyBhIGNvZWZmaWNpZW50IGZvciBYIGFuZCBZIHRoYXQgY2FuIGJlIGFwcGxpZWRcbiAgICAgICAgLy90byB0aGUgbW92ZSBmdW5jdGlvbiBpbiBvcmRlciB0byBtb3ZlIHRoZSBidWxsZXQgaW4gYSBzdHJhaWdodCBsaW5lXG4gICAgICAgIC8vZGlyZWN0bHkgdG8gaXRzIGRlc3RpbmF0aW9uLlxuICAgICAgICBpZihNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpIHtcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWCk7XG4gICAgICAgICAgICB0aGlzLmNvZWZmWSA9IGRpZmZZIC8gTWF0aC5hYnMoZGlmZlgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb2VmZlkgPSBkaWZmWSAvIE1hdGguYWJzKGRpZmZZKTtcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9hZEltYWdlKHVybCkge1xuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xuICAgIH1cbiAgICAvL01vdmVzIHRoZSBidWxsZXQgZnJvbSBpdHMgc3RhcnRpbmcgcG9pbnQgKHdoaWNoIHdpbGwgYmUgdGhlIHBsYXllcidzIGxvY2F0aW9uKVxuICAgIC8vdG8gaXRzIGRlc3RpbmF0aW9uICh3aGljaCB3aWxsIGJlIHRoZSBjdXJzb3IgbG9jYXRpb24gd2hlbiB0aGUgYnVsbGV0IGlzIGNyZWF0ZWQpLlxuICAgIC8vRWFjaCB0aW1lIG1vdmUgaXMgY2FsbGVkIGl0IGlzIGNoZWNrZWQgaWYgdGhlIGJ1bGxldCBoaXRzIGFueXRoaW5nLCBpZiBpdCBkb2VzIHRoZVxuICAgIC8vaGl0U29tZXRoaW5nIG1ldGhvZCB3aWxsIGNhbGwgYSBkYW1hZ2UgZnVuY3Rpb24gYW5kIHRoZSBkYW1hZ2Ugd2lsbCBiZSBhcHBsaWVkLCBzb1xuICAgIC8vdGhpcyBmdW5jdGlvbiBzZXRzIHRoaXMubGl2ZSA9IGZhbHNlIG1lYW5pbmcgdGhlIGJ1bGxldCBpcyBubyBsb25nZXIgbGl2ZS5cbiAgICAvL0lmIHRoZSBidWxsZXQgaXNQZW5ldHJhdGluZyB0aGF0IG1lYW5zIGl0IHdpbGwgbm90IGJlIHNldCB0byAnZGVhZCcgdXBvbiBhIGNvbGxpc2lvbiB3aXRoIHNvbWV0aGluZ1xuICAgIC8vVGhpcyBhbGxvd3MgcGVuZXRyYXRpbmcgYnVsbGV0cyB0byB0cmF2ZWwgdGhyb3VnaCBtdWx0aXBsZSB0YXJnZXRzIGFuZCB0aHJvdWdoIHdvcmxkIG9iamVjdHMuXG4gICAgbW92ZShtb2RpZmllciwgZW52aXJvbm1lbnRPYmplY3RzLCBlbmVtaWVzKXtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXIqdGhpcy5jb2VmZlg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyKnRoaXMuY29lZmZZO1xuICAgICAgICBpZih0aGlzLmhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIGVuZW1pZXMpICYmIHRoaXMuaXNQZW5ldHJhdGluZyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy54IDwgMCB8fCB0aGlzLnggPiAxMDAwMCB8fCB0aGlzLnkgPCAwIHx8IHRoaXMueSA+IDU2MjUpIHtcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgLy9DaGVja3MgaWYgdGhlIGJ1bGxldCBoaXQgYW55IG9mIG91ciBvYmplY3RzIHRoYXQgY2FuIGJlIGhpdCwgaWYgc28gdGhhdCBvYmplY3QgbG9zZXMgSFBcbiAgICAvL2FuZCB0aGUgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHRvIGluZGljYXRlIHRoYXQgdGhlIG9iamVjdCB3YXMgaGl0LiBJZiBub3QsIGZhbHNlIGlzIHJldHVybmVkXG4gICAgLy9hbmQgbm90aGluZyBpcyBkb25lLlxuICAgIGRhbWFnZUVuZW15KGVuZW15T2JqZWN0KSB7XG4gICAgICAgIGVuZW15T2JqZWN0LmhlYWx0aCAtPSB0aGlzLmRhbWFnZTtcbiAgICB9XG5cbiAgICBkYW1hZ2VFbnZpcm9ubWVudChlbnZpcm9ubWVudE9iamVjdCl7XG4gICAgICAgIGVudmlyb25tZW50T2JqZWN0LmhlYWx0aCAtPSB0aGlzLmRhbWFnZTtcbiAgICB9XG4gICAgLy9DaGVja3MgaWYgd2UgaGl0IGFuIGVudmlyb25tZW50IG9iamVjdCB0aGVuIGNoZWNrcyBpZiB3ZSBoaXQgYW4gZW5lbXkuIGluIGVpdGhlciBjYXNlIGl0IGNhbGxzIHRoZVxuICAgIC8vY29ycmVzcG9uZGluZyBkYW1hZ2UgZnVuY3Rpb24gYW5kIHRoZW4gcmV0dXJucyB0cnVlIHRvIGluZGljYXRlIHRoYXQgc29tZXRoaW5nIHdhcyBoaXQsIHdoaWNoIHRlbGxzIG1vdmUgdG8gc2V0IHRoZVxuICAgIC8vYnVsbGV0J3MgbGl2ZSB2YWx1ZSBhY2NvcmRpbmdseVxuICAgIGhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIGVuZW1pZXMpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbnZpcm9ubWVudE9iamVjdHNbaV0pICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VFbnZpcm9ubWVudChlbnZpcm9ubWVudE9iamVjdHNbaV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbmVtaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIGVuZW1pZXNbaV0pKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZUVuZW15KGVuZW1pZXNbaV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1bGxldDtcbiIsImltcG9ydCBCdWxsZXQgZnJvbSAnLi9CdWxsZXQuanMnO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vL1RoZSA1MCBjYWxpYmVyIHdpbGwgcGVuZXRyYXRlIHRocm91Z2ggb2JqZWN0cyBhbmQgb25seSBzdG9wcyBiZWluZyBsaXZlXHJcbi8vb25jZSBpdCBleGl0cyB0aGUgY2FudmFzLCBzbyBpdHMgZGFtYWdlIGlzIHNldCB0byBhIHNtYWxsIG51bWJlciBhcyBpdCBkZWFsc1xyXG4vL2RhbWFnZSBkdXJpbmcgZWFjaCBmcmFtZSBhcyBpdCBwZW5ldHJhdGVzIHRoZSBvYmplY3Qgb3IgZW5lbXlcclxuY2xhc3MgQnVsbGV0NTBjYWwgZXh0ZW5kcyBCdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgZGVzdFgsIGRlc3RZKSB7XHJcbiAgICAgICAgc3VwZXIoMjUwMCwgNSwgeCwgeSwgZGVzdFgsIGRlc3RZLCB0cnVlKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9idWxsZXQzLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnVsbGV0NTBjYWw7XHJcbiIsImltcG9ydCBCdWxsZXQgZnJvbSAnLi9CdWxsZXQuanMnO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vL1RoZSA1MCBjYWxpYmVyIHdpbGwgcGVuZXRyYXRlIHRocm91Z2ggb2JqZWN0cyBhbmQgb25seSBzdG9wcyBiZWluZyBsaXZlXHJcbi8vb25jZSBpdCBleGl0cyB0aGUgY2FudmFzLCBzbyBpdHMgZGFtYWdlIGlzIHNldCB0byBhIHNtYWxsIG51bWJlciBhcyBpdCBkZWFsc1xyXG4vL2RhbWFnZSBkdXJpbmcgZWFjaCBmcmFtZSBhcyBpdCBwZW5ldHJhdGVzIHRoZSBvYmplY3Qgb3IgZW5lbXlcclxuY2xhc3MgQnVsbGV0NTU2IGV4dGVuZHMgQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGRlc3RYLCBkZXN0WSkge1xyXG4gICAgICAgIHN1cGVyKDE1MDAsIDEyLCB4LCB5LCBkZXN0WCwgZGVzdFksIGZhbHNlKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9idWxsZXQzLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ1NTY7XHJcbiIsImltcG9ydCBCdWxsZXQgZnJvbSAnLi9CdWxsZXQuanMnO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcbi8vdGhlIDltbSBidWxsZXQgaXMgYSBzaW1wbGUgcGlzdG9sIGJ1bGxldCB0aGF0IHdpbGwgYmUgaW4gdGhlXHJcbi8vdXNlcidzIHN0YXJ0aW5nIHdlYXBvbi4gaXQgZG9lcyBtaW5pbWFsIGRhbWFnZSBhbmQgbW92ZXMgYXQgYSBzbG93IHNwZWVkLlxyXG4vL3RoZSB2YWx1ZSBvZiBpc1BlbmV0cmF0aW5nIGlzIHNldCB0byBmYWxzZSB0byBpbmRpY2F0ZSB0aGUgYnVsbGV0IHNob3VsZFxyXG4vL25vdCBiZSBsaXZlIGFmdGVyIGl0IGNvbGxpZGVzIHdpdGggc29tZXRoaW5nIGFuZCBkb2VzIGl0cyBkYW1hZ2UuXHJcbi8vaW4gdGhlIGZ1dHVyZSB0aGUgYnVsbGV0IHdpbGwgaGF2ZSBhIG1heGltdW0gcmFuZ2UvbGl2ZSB0aW1lIHRvXHJcbi8vbGltaXQgaXRzIHVzZWZ1bG5lc3MgbW9yZS5cclxuY2xhc3MgQnVsbGV0OW1tIGV4dGVuZHMgQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGRlc3RYLCBkZXN0WSkge1xyXG4gICAgICAgIHN1cGVyKDEwMDAsIDEwLCB4LCB5LCBkZXN0WCwgZGVzdFksIGZhbHNlKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9idWxsZXQzLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnVsbGV0OW1tO1xyXG4iLCIvL1RoZSBzbmlwZXIgaXMgb25seSBjdXJyZW50bHkgdXNlZCB0byBkZXRlcm1pbmUgdGhlIHR5cGUgb2YgYnVsbGV0IHRvIGJlIGdlbmVyYXRlZFxuLy9pbiBtYWluLmpzJyBldmVudCBoYW5kbGVyIGZvciBjbGlja3Ncbi8vSW4gdGhlIGZ1dHVyZSBpdCB3aWxsIGNvbnRyb2wgZmlyZSByYXRlIGFuZCB0aGUgYW1tbyBjYXBhY2l0eS5cbmltcG9ydCBXZWFwb24gZnJvbSAnLi9XZWFwb24uanMnO1xuXG5jbGFzcyBQaXN0b2wgZXh0ZW5kcyBXZWFwb257XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoMTUsIDkwKTtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJQaXN0b2xcIjtcbiAgICAgICAgc3VwZXIubG9hZFNob290U291bmQoJ0F1ZGlvL1Bpc3RvbFNob3QubXAzJyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQaXN0b2w7XG4iLCIvL1RoZSBzbmlwZXIgaXMgb25seSBjdXJyZW50bHkgdXNlZCB0byBkZXRlcm1pbmUgdGhlIHR5cGUgb2YgYnVsbGV0IHRvIGJlIGdlbmVyYXRlZFxyXG4vL2luIG1haW4uanMnIGV2ZW50IGhhbmRsZXIgZm9yIGNsaWNrc1xyXG4vL0luIHRoZSBmdXR1cmUgaXQgd2lsbCBjb250cm9sIGZpcmUgcmF0ZSBhbmQgdGhlIGFtbW8gY2FwYWNpdHkuXHJcbmltcG9ydCBXZWFwb24gZnJvbSAnLi9XZWFwb24uanMnO1xyXG5cclxuY2xhc3MgU25pcGVyIGV4dGVuZHMgV2VhcG9ue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcig1LCAzMCk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJTbmlwZXJcIjtcclxuICAgICAgICBzdXBlci5sb2FkU2hvb3RTb3VuZCgnQXVkaW8vU25pcGVyU2hvdC5tcDMnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU25pcGVyO1xyXG4iLCIvL2NsaXBTaXplIGFuZCBhbW1vIHdpbGwgYmUgdXNlZCBhcyBleHBlY3RlZCBuZXh0IHdlZWtcbi8vYXV0b21hdGljIHdpbGwgYmUgdXNlZCBhcyBhIGJvb2xlYW4gZm9yIHdoZXRoZXIgb3Igbm90XG4vL2hvbGRpbmcgY2xpY2sgc2hvdWxkIGNvbnRpbnVvdXNseSBmaXJlLlxuLy9UaGUgbmFtZSBmaWVsZCBpcyB1c2VkIGZvciB0aGUgSFVEIGRpc3BsYXlpbmcgdGhlIGFjdGl2ZSB3ZWFwb24uXG5jbGFzcyBXZWFwb24ge1xuXG4gICAgY29uc3RydWN0b3IoY2xpcFNpemUsIG1heEFtbW8pIHtcbiAgICAgICAgdGhpcy5jbGlwU2l6ZSA9IGNsaXBTaXplO1xuICAgICAgICB0aGlzLm1heEFtbW8gPSBtYXhBbW1vO1xuICAgICAgICB0aGlzLm5hbWUgPSAnJztcbiAgICAgICAgdGhpcy5jb29sZG93biA9IDA7XG4gICAgfVxuXG4gICAgbG9hZFNob290U291bmQodXJsKSB7XG4gICAgICAgIHRoaXMuaXNTb3VuZExvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNvdW5kID0gbmV3IEF1ZGlvKCk7XG4gICAgICAgIHRoaXMuc291bmQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc1NvdW5kTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zb3VuZC5zcmMgPSB1cmw7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWFwb247XG4iXX0=
