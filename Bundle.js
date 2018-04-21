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

var _Bullet50cal = require('../Weapons/Bullet50cal');

var _Bullet50cal2 = _interopRequireDefault(_Bullet50cal);

var _Bullet9mm = require('../Weapons/Bullet9mm');

var _Bullet9mm2 = _interopRequireDefault(_Bullet9mm);

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
                    if (wep instanceof _Pistol2.default) this.world.bullets.push(new _Bullet9mm2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y, mouse[0] + this.world.camera.x, mouse[1] + this.world.camera.y));else if (wep instanceof _Sniper2.default) this.world.bullets.push(new _Bullet50cal2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y, mouse[0] + this.world.camera.x, mouse[1] + this.world.camera.y));
                    //The bounding box in this if statement tells if the mouse was clicked inside the try again button,
                    //and if so the this.world is restarted.
                    if (this.world.player.health < 0) {}
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
                for (var i = this.world.bullets.length - 1; i >= 0; i--) {
                    this.world.bullets[i].move(modifier, this.world.environmentObjects, this.world.enemies);
                    if (this.world.bullets[i].live === false) {
                        this.world.bullets.splice(i, 1);
                    }
                }
            } else {
                if (this.controller.isMousePressed()) {
                    var _mouse = this.controller.getMousePosition();
                    // console.log('mouse x: ' + mouse[0]);
                    // console.log('mouse y: ' + mouse[1]);
                    // console.log('should be greater than' + this.canvas.width/2 - 100);
                    // console.log('should be less than ' + (this.canvas.width/2 - 100+200));
                    // console.log('should be greater than' + this.canvas.height/2 + 25);
                    // console.log('should be less than' + this.canvas.height/2 + 25 + 100);

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

            for (var _i2 = this.world.enemyProjectiles.length - 1; _i2 >= 0; _i2--) {
                this.world.enemyProjectiles[_i2].move(modifier, this.world.environmentObjects, this.world.player);
                if (this.world.enemyProjectiles[_i2].live === false) {
                    this.world.enemyProjectiles.splice(_i2, 1);
                }
            }

            for (var _i3 = this.world.environmentObjects.length - 1; _i3 >= 0; _i3--) {
                if (this.world.environmentObjects[_i3].health <= 0) this.world.environmentObjects.splice(_i3, 1);
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
                for (var _i4 = 0; _i4 < this.world.environmentObjects.length; _i4++) {
                    if (this.world.environmentObjects[_i4].isImageLoaded) {
                        this.world.environmentObjects[_i4].draw(this.ctx, this.world.camera);
                    }
                }

                for (var _i5 = 0; _i5 < this.world.bullets.length; _i5++) {
                    if (this.world.bullets[_i5].isImageLoaded && this.world.bullets[_i5].live) {
                        this.world.bullets[_i5].draw(this.ctx, this.world.camera);
                    }
                }
                for (var _i6 = 0; _i6 < this.world.enemyProjectiles.length; _i6++) {
                    if (this.world.enemyProjectiles[_i6].isImageLoaded && this.world.enemyProjectiles[_i6].live) {
                        this.world.enemyProjectiles[_i6].draw(this.ctx, this.world.camera);
                    }
                }

                if (this.world.player.isImageLoaded) {
                    this.world.player.draw(this.ctx, this.world.camera);
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
                }
            }
            var mouse = this.controller.getMousePosition();
            this.ctx.drawImage(this.cursor.image, mouse[0] - this.cursor.image.width / 2, mouse[1] - this.cursor.image.height / 2);
        }
    }]);

    return Game;
}();

exports.default = Game;

},{"../Cursor.js":1,"../Enemies/EnemyProjectile":3,"../Enemies/MiniBoss":5,"../Enemies/ProjectileEnemy":6,"../Weapons/Bullet50cal":21,"../Weapons/Bullet9mm":22,"../Weapons/Pistol":23,"../Weapons/Sniper":24,"./Controller.js":13,"./World.js":15}],15:[function(require,module,exports){
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

},{"../Enemies/LightEnemy":4,"../Enemies/MiniBoss":5,"../Enemies/ProjectileEnemy":6,"../Enemies/RegularEnemy":7,"../Enemies/TankEnemy":8,"../EnvironmentObjects/Bush":9,"../EnvironmentObjects/Crate":10,"../EnvironmentObjects/Rock":12,"../Players/Camera":17,"../Players/Player":18,"../Utilities/Util":19}],16:[function(require,module,exports){
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

var _World = require('./Game/World.js');

var _World2 = _interopRequireDefault(_World);

var _Cursor = require('./Cursor.js');

var _Cursor2 = _interopRequireDefault(_Cursor);

var _ProjectileEnemy = require('./Enemies/ProjectileEnemy.js');

var _ProjectileEnemy2 = _interopRequireDefault(_ProjectileEnemy);

var _EnemyProjectile = require('./Enemies/EnemyProjectile');

var _EnemyProjectile2 = _interopRequireDefault(_EnemyProjectile);

var _MiniBoss = require('./Enemies/MiniBoss');

var _MiniBoss2 = _interopRequireDefault(_MiniBoss);

var _Game = require('./Game/Game.js');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let world = new World(canvas);

//create crosshair
// let cursor = new Cursor();

// Handle controls
// let keysPressed = {};
// let mouse = [0,0];

//These event listeners simply catch any basic inputs and store them in global variables
//that later functions can check to handle movement and inputs
// addEventListener("keydown", (e) => {
//     keysPressed[e.keyCode] = true;
// }, false);

// addEventListener("keyup", (e) => {
//     delete keysPressed[e.keyCode];
// }, false);

// addEventListener('mousemove', (e) => {
//     mouse[0] = e.clientX;
//     mouse[1] = e.clientY;
// }, false);

// addEventListener('mousedown', (e) => {
//     //clicking = true;
//     let wep = world.player.inventory[world.player.active_index];
//
//     //Fire the correct bullet type for the currently equipped weapon.
//     //This could be done more gracefully in the future
//     if(wep instanceof Pistol)
//       world.bullets.push(new Bullet9mm(world.player.x + world.player.width/2, world.player.y, e.clientX+world.camera.x, e.clientY+world.camera.y));
//     else if(wep instanceof Sniper)
//       world.bullets.push(new Bullet50cal(world.player.x + world.player.width/2, world.player.y, e.clientX+world.camera.x, e.clientY+world.camera.y));
//     //The bounding box in this if statement tells if the mouse was clicked inside the try again button,
//     //and if so the world is restarted.
//     if(world.player.health < 0) {
//         if(e.clientX > canvas.width/2 - 100 && e.clientX < (canvas.width/2 - 100+200)
//             && e.clientY > canvas.height/2 + 25 && e.clientY < canvas.height/2 + 25 + 100) {
//             world.start(canvas);
//         }
//     }
// });

// let isCollisionWithEnvironmentObject = () => {
//     for (let i = 0; i < world.environmentObjects.length; i++) {
//         if (Util.isCollision(world.environmentObjects[i], world.player) && world.environmentObjects[i].isBlocking)
//             return true;
//     }
//     return false;
// };

// Update game objects
// let update = (modifier) => {
//     if(world.player.health > 0) {
//       //These statements control movement with simple WASD for each direction
//         if (87 in keysPressed) { // Player holding up
//             if(world.player.y >= 0) {
//                 world.player.y -= world.player.speed * modifier;
//                 if(isCollisionWithEnvironmentObject()) {
//                     world.player.y += world.player.speed * modifier;
//                 }
//             }
//         }
//         if (83 in keysPressed) { // Player holding down
//             if(world.player.y + world.player.height <= 5625) {
//                 world.player.y += world.player.speed * modifier;
//                 if(isCollisionWithEnvironmentObject()) {
//                     world.player.y -= world.player.speed * modifier;
//                 }
//             }
//         }
//         if (65 in keysPressed) { // Player holding left
//             if(world.player.x >= 0) {
//                 world.player.x -= world.player.speed * modifier;
//                 if(isCollisionWithEnvironmentObject()) {
//                     world.player.x += world.player.speed * modifier;
//                 }
//             }
//         }
//         if (68 in keysPressed) { // Player holding right
//             if(world.player.x + world.player.width <= 10000) {
//                 world.player.x += world.player.speed * modifier;
//                 if(isCollisionWithEnvironmentObject()) {
//                     world.player.x -= world.player.speed * modifier;
//                 }
//             }
//         }
//         //These controls change the active weapon with simple 1,2,3,etc controls for inventory
//         if (49 in keysPressed) { // Player pressed 1
//             world.player.active_index = 0;
//         }
//         if (50 in keysPressed) { // Player pressed 2
//             world.player.active_index = 1;
//         }
//         for(let i = world.bullets.length - 1; i >= 0; i--) {
//             world.bullets[i].move(modifier, world.environmentObjects, world.enemies);
//             if(world.bullets[i].live === false) {
//                 world.bullets.splice(i, 1);
//             }
//         }
//     }
//     for(let i = world.enemies.length - 1; i >= 0; i--) {
//         world.enemies[i].move(world.player, modifier, world.environmentObjects);
//         if(world.enemies[i].attackCooldown > 0)
//             world.enemies[i].attackCooldown -= 5;
//         if(world.enemies[i] instanceof ProjectileEnemy || world.enemies[i] instanceof MiniBoss) {
//         	if(world.enemies[i].shootCooldown > 0)
//         		world.enemies[i].shootCooldown -= world.enemies[i].shootCooldownRate;
//         	else {
// 				world.enemyProjectiles.push(new EnemyProjectile(world.enemies[i].x + world.enemies[i].width/2, world.enemies[i].y + world.enemies[i].height/2, world.player.x + world.player.width/2, world.player.y + world.player.height/2));
//         		world.enemies[i].shootCooldown += world.enemies[i].shootCooldownReset;
// 			}
// 		}
//         if(world.enemies[i].health <= 0)
//             world.enemies.splice(i, 1);
//     }
//
//     for(let i = world.enemyProjectiles.length - 1; i >= 0; i--) {
//         world.enemyProjectiles[i].move(modifier, world.environmentObjects, world.player);
//         if(world.enemyProjectiles[i].live === false) {
//             world.enemyProjectiles.splice(i, 1);
//         }
//     }
//
//     for(let i = world.environmentObjects.length - 1; i >= 0; i--) {
//         if(world.environmentObjects[i].health <= 0)
//             world.environmentObjects.splice(i, 1);
//     }
//
//     if(world.enemies.length === 0) {
//         world.wave += 1;
//         world.startWave();
//     }
//
// };

// This loop will draw all images and text
// let render = () => {
//     //When player health is < 0 the game is over so we must display the "Game Over" text and add a Try Again button
//     if(world.player.health < 0) {
//         ctx.font = "128px sans-serif";
//         ctx.textAlign = "center";
//         ctx.fillStyle='#FFF';
//         ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
//         ctx.fillStyle='#000';
//         ctx.strokeText("Game Over", canvas.width/2, canvas.height/2);
//         ctx.fillStyle='#FFF';
//         ctx.fillRect(canvas.width/2 - 100, canvas.height/2 + 25, 200, 100);
//         ctx.strokeRect(canvas.width/2 - 100, canvas.height/2 + 25, 200, 100);
//         ctx.font = "24px sans-serif";
//         ctx.textAlign = "center";
//         ctx.fillStyle='#000';
//         ctx.fillText("Try again?", canvas.width/2 - 100 + 100, canvas.height/2 + 25 + 50);
//     }
//     else {
//         //Render the Background
//         if(world.isBackgroundLoaded) {
//             world.drawBackground(ctx, canvas);
//         }
//         //Render all enemies in the world
//         for(let i = 0; i < world.enemies.length; i++) {
//             if(world.enemies[i].isImageLoaded) {
//                 world.enemies[i].draw(ctx, world.camera);
//             }
//         }
//         //Render all environment objects that exist in the world
//         for(let i = 0; i < world.environmentObjects.length; i++) {
//             if(world.environmentObjects[i].isImageLoaded) {
//                 world.environmentObjects[i].draw(ctx, world.camera);
//             }
//         }
//
//         //Render all the world.bullets at their locations and remove world.bullets that aren't live
//         for(let i = 0; i < world.bullets.length; i++) {
//             if(world.bullets[i].isImageLoaded && world.bullets[i].live) {
//                 world.bullets[i].draw(ctx, world.camera);
//             }
//         }
//         //Render all the enemy projectiles just like bullets
//         for(let i = 0; i < world.enemyProjectiles.length; i++) {
//             if(world.enemyProjectiles[i].isImageLoaded && world.enemyProjectiles[i].live) {
//                 world.enemyProjectiles[i].draw(ctx, world.camera);
//             }
//         }
//
//         if(world.player.isImageLoaded) {
//             world.player.draw(ctx, world.camera);
//             ctx.font = "48px sans-serif";
//             ctx.textAlign = "center";
//             ctx.fillStyle='#FFF';
//             ctx.fillText(world.player.health + " HP", canvas.width/2 - 290, 50);
//             ctx.strokeText(world.player.health + " HP", canvas.width/2 - 290, 50);
//             ctx.fillText("Wave " + world.wave, canvas.width/2, 50);
//             ctx.strokeText("Wave " + world.wave, canvas.width/2, 50);
//             ctx.fillText(world.enemies.length + " Enemies Left", canvas.width/2 + 350, 50);
//             ctx.strokeText(world.enemies.length + " Enemies Left", canvas.width/2 + 350, 50);
//             //This text displays the active weapon to the player (could be positioned better later)
//             ctx.font = "48px sans-serif";
//             ctx.textAlign = "center";
//             ctx.fillStyle='#FFF';
//             ctx.fillText('Active Weapon: ' + world.player.inventory[world.player.active_index].name, canvas.width/2, 125);
//             ctx.strokeText('Active Weapon: ' + world.player.inventory[world.player.active_index].name, canvas.width/2, 125);
//         }
//     }
//     ctx.drawImage(cursor.image, mouse[0] - cursor.image.width/2, mouse[1] - cursor.image.height/2);
// };

// The main game loop
// Create the canvas
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

},{"./Cursor.js":1,"./Enemies/EnemyProjectile":3,"./Enemies/MiniBoss":5,"./Enemies/ProjectileEnemy.js":6,"./Game/Game.js":14,"./Game/World.js":15,"./Utilities/Util.js":19,"./Weapons/Bullet50cal.js":21,"./Weapons/Bullet9mm.js":22,"./Weapons/Pistol.js":23,"./Weapons/Sniper.js":24}],17:[function(require,module,exports){
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
        this.inventory = [start_pistol, start_sniper];
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

},{"../Utilities/Util.js":19,"../Weapons/Pistol.js":23,"../Weapons/Sniper.js":24}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"../Utilities/Util.js":19}],21:[function(require,module,exports){
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

},{"../Utilities/Util.js":19,"./Bullet.js":20}],22:[function(require,module,exports){
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

},{"../Utilities/Util.js":19,"./Bullet.js":20}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Weapon2 = require("./Weapon.js");

var _Weapon3 = _interopRequireDefault(_Weapon2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //The sniper is only currently used to determine the type of bullet to be generated
//in main.js' event handler for clicks
//In the future it will control fire rate and the ammo capacity.


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

},{"./Weapon.js":25}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Weapon2 = require("./Weapon.js");

var _Weapon3 = _interopRequireDefault(_Weapon2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //The sniper is only currently used to determine the type of bullet to be generated
//in main.js' event handler for clicks
//In the future it will control fire rate and the ammo capacity.


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

},{"./Weapon.js":25}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//clipSize and ammo will be used as expected next week
//automatic will be used as a boolean for whether or not
//holding click should continuously fire.
//The name field is used for the HUD displaying the active weapon.
var Weapon = function Weapon(clipSize, maxAmmo) {
    _classCallCheck(this, Weapon);

    this.clipSize = clipSize;
    this.maxAmmo = maxAmmo;
    //this.automatic = automatic;
    //this.bullet = bullet;
    this.name = '';
};

exports.default = Weapon;

},{}]},{},[16])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDdXJzb3IuanMiLCJFbmVtaWVzL0VuZW15LmpzIiwiRW5lbWllcy9FbmVteVByb2plY3RpbGUuanMiLCJFbmVtaWVzL0xpZ2h0RW5lbXkuanMiLCJFbmVtaWVzL01pbmlCb3NzLmpzIiwiRW5lbWllcy9Qcm9qZWN0aWxlRW5lbXkuanMiLCJFbmVtaWVzL1JlZ3VsYXJFbmVteS5qcyIsIkVuZW1pZXMvVGFua0VuZW15LmpzIiwiRW52aXJvbm1lbnRPYmplY3RzL0J1c2guanMiLCJFbnZpcm9ubWVudE9iamVjdHMvQ3JhdGUuanMiLCJFbnZpcm9ubWVudE9iamVjdHMvRW52aXJvbm1lbnRPYmplY3QuanMiLCJFbnZpcm9ubWVudE9iamVjdHMvUm9jay5qcyIsIkdhbWUvQ29udHJvbGxlci5qcyIsIkdhbWUvR2FtZS5qcyIsIkdhbWUvV29ybGQuanMiLCJNYWluLmpzIiwiUGxheWVycy9DYW1lcmEuanMiLCJQbGF5ZXJzL1BsYXllci5qcyIsIlV0aWxpdGllcy9VdGlsLmpzIiwiV2VhcG9ucy9CdWxsZXQuanMiLCJXZWFwb25zL0J1bGxldDUwY2FsLmpzIiwiV2VhcG9ucy9CdWxsZXQ5bW0uanMiLCJXZWFwb25zL1Bpc3RvbC5qcyIsIldlYXBvbnMvU25pcGVyLmpzIiwiV2VhcG9ucy9XZWFwb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0lBQ00sTTtBQUNGLHNCQUFjO0FBQUE7O0FBQ1YsYUFBSyxTQUFMO0FBQ0g7Ozs7b0NBRVc7QUFBQTs7QUFDUixpQkFBSyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0EsaUJBQUssS0FBTCxHQUFhLElBQUksS0FBSixFQUFiO0FBQ0EsaUJBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsWUFBTTtBQUN0QixzQkFBSyxhQUFMLEdBQXFCLElBQXJCO0FBQ0gsYUFGRDtBQUdBLGlCQUFLLEtBQUwsQ0FB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QUNBOzs7O0FBQ0E7Ozs7OztBQUlBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Qjs7Ozs7a0JBR1UsVzs7Ozs7Ozs7Ozs7QUNiZjs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFDTSxTOzs7QUFDRix1QkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQixLQUFsQixFQUF5QixLQUF6QixFQUFnQztBQUFBOztBQUFBLDBIQUN0QixJQURzQixFQUNoQixFQURnQixFQUNaLENBRFksRUFDVCxDQURTLEVBQ04sS0FETSxFQUNDLEtBREQsRUFDUSxLQURSOztBQUU1QiwwSEFBZ0Isc0JBQWhCO0FBRjRCO0FBRy9COzs7OztrQkFHVSxTOzs7Ozs7Ozs7QUNaZjs7Ozs7Ozs7OzsrZUFIQTtBQUNBO0FBQ0E7OztJQUVNLE07OztBQUNKLG9CQUFhO0FBQUE7O0FBQUEsZ0hBQ0wsRUFESyxFQUNELEVBREM7O0FBRVgsVUFBSyxJQUFMLEdBQVksUUFBWjtBQUZXO0FBR1o7Ozs7O2tCQUVZLE07Ozs7Ozs7OztBQ1BmOzs7Ozs7Ozs7OytlQUhBO0FBQ0E7QUFDQTs7O0lBRU0sTTs7O0FBQ0osb0JBQWE7QUFBQTs7QUFBQSxnSEFDTCxDQURLLEVBQ0YsRUFERTs7QUFFWCxVQUFLLElBQUwsR0FBWSxRQUFaO0FBRlc7QUFHWjs7Ozs7a0JBRVksTTs7Ozs7Ozs7Ozs7QUNWZjtBQUNBO0FBQ0E7QUFDQTtJQUNNLE0sR0FDSixnQkFBWSxRQUFaLEVBQXNCLE9BQXRCLEVBQStCO0FBQUE7O0FBQzNCLFNBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLFNBQUssT0FBTCxHQUFlLE9BQWY7QUFDQTtBQUNBO0FBQ0EsU0FBSyxJQUFMLEdBQVksRUFBWjtBQUNILEM7O2tCQUVZLE0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL0p1c3QgYSBwbHVzIGN1cnNvciB0byBiZSByZW5kZXJlZCBhdCB0aGVcclxuLy9jdXJzb3IncyBsb2NhdGlvbiBlYWNoIFVwZGF0ZVxyXG4vL1RoZSBjdXJzb3IgZm9yIHRoZSBlbnRpcmUgSFRNTCBkb2N1bWVudCBpcyB0dXJuZWQgb2ZmIHZpYSBzdHlsaW5nIG9uIHRoZSBkb2N1bWVudC5cclxuY2xhc3MgQ3Vyc29yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEltYWdlKCkge1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gXCJHcmFwaGljcy9jcm9zc2hhaXIucG5nXCI7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQ3Vyc29yO1xyXG4iLCIvKipcclxuICogU291cmNlczpcclxuICogaHR0cHM6Ly9tZWRpdW0uY29tL0B5dXJpYmV0dC9qYXZhc2NyaXB0LWFic3RyYWN0LW1ldGhvZC13aXRoLWVzNi01ZGJlYTRiMDAwMjdcclxuICogaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1JNWRBUnBBUGxOa1xyXG4gKi9cclxuXHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgRW5lbXkgY2xhc3MgaXMgdGhlIHBhcmVudCBjbGFzcyBmb3IgYWxsIG9mIHRoZSBlbmVtaWVzLlxyXG4gKi9cclxuY2xhc3MgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHZlbG9jaXR5IFRoZSB2ZWxvY2l0eSBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gaGVhbHRoIFRoZSBoZWFsdGggb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIGRhbWFnZSBUaGUgZGFtYWdlIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSBwb2ludHNPbktpbGwgVGhlIHBvaW50cyByZXdhcmRlZCBmb3Iga2lsbGluZyB0aGUgRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIHZlbG9jaXR5LCBoZWFsdGgsIGRhbWFnZSwgcG9pbnRzT25LaWxsKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuYW5nbGUgPSBNYXRoLlBJLzI7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5O1xyXG4gICAgICAgIHRoaXMuaGVhbHRoID0gaGVhbHRoO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlO1xyXG4gICAgICAgIHRoaXMucG9pbnRzT25LaWxsID0gcG9pbnRzT25LaWxsO1xyXG4gICAgICAgIHRoaXMuYXR0YWNrQ29vbGRvd24gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiB0YWtlcyBpbiBhIHVybCBhbmQgbG9hZHMgaXQgYXMgYW4gSW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0ltYWdlTG9hZGVkIGlzXHJcbiAgICAgKiBzZXQgdG8gdHJ1ZS4gVGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIEVuZW15IGFyZSBzZXQgdG8gdGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIGltYWdlLlxyXG4gICAgICogQHBhcmFtIHVybCBUaGUgdXJsIHRoYXQgc2hvdWxkIGJlIGxvYWRlZC5cclxuICAgICAqL1xyXG4gICAgbG9hZEltYWdlKHVybCkge1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhdHRhY2sgZnVuY3Rpb24gdGFrZXMgaW4gYW4gb2JqZWN0IGFuZCByZW1vdmVzIHRoZSBhbW91bnQgb2YgZGFtYWdlIHRoZSBFbmVteSBkZWFscyBmcm9tIHRoZWlyIGhlYWx0aC5cclxuICAgICAqIDUwMCBpcyBhZGRlZCB0byB0aGUgYXR0YWNrIGNvb2xkb3duIG9mIHRoZSBlbmVteSBhZnRlciBhbiBhdHRhY2suXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3QgdGhhdCBpcyBiZWluZyBhdHRhY2tlZC5cclxuICAgICAqL1xyXG4gICAgYXR0YWNrKG9iamVjdCkge1xyXG4gICAgICAgIG9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tDb29sZG93biArPSA1MDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlcyB0aGUgZW5lbXkgdG93YXJkcyB0aGUgcGxheWVyLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdCB0byBtb3ZlIHRvd2FyZHMuXHJcbiAgICAgKiBAcGFyYW0gbW9kaWZpZXIgVGhlIG1vZGlmaWVyIHRvIGJlIG11bHRpcGxpZWQgYnkgdGhlIHZlbG9jaXR5LlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0cyBBbiBhcnJheSBvZiBlbnZpcm9ubWVudCBvYmplY3RzLlxyXG4gICAgICovXHJcbiAgICBtb3ZlKHBsYXllciwgbW9kaWZpZXIsIGVudmlyb25tZW50T2JqZWN0cykge1xyXG4gICAgICAgIGxldCBkaWZmWCA9IHBsYXllci54IC0gdGhpcy54O1xyXG4gICAgICAgIGxldCBkaWZmWSA9IHBsYXllci55IC0gdGhpcy55O1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBNYXRoLnNxcnQoZGlmZlggKiBkaWZmWCArIGRpZmZZICogZGlmZlkpO1xyXG4gICAgICAgIGlmKGxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICBkaWZmWCAvPSBsZW5ndGg7XHJcbiAgICAgICAgICAgIGRpZmZZIC89IGxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYW5nbGUgPSBNYXRoLmF0YW4yKGRpZmZZLCBkaWZmWCk7XHJcblxyXG4gICAgICAgIGlmKGRpZmZYID4gMCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnggKyB0aGlzLndpZHRoIDw9IDEwMDAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZGlmZlggPCAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMueCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggLT0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRpZmZZID4gMCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnkgKyB0aGlzLmhlaWdodCA8PSA1NjI1KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZGlmZlkgPCAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMueSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgLT0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIHBsYXllcikgJiYgdGhpcy5hdHRhY2tDb29sZG93biA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlYWx0aCBiZWZvcmUgYXR0YWNrXCIgKyBwbGF5ZXIuaGVhbHRoKTtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2socGxheWVyKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWFsdGggYWZ0ZXIgYXR0YWNrXCIgKyBwbGF5ZXIuaGVhbHRoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBlbmVteSBnaXZlbiB4IGFuZCB5LlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gdG8gYmUgc2V0LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gdG8gYmUgc2V0LlxyXG4gICAgICovXHJcbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyBhIGhlbHBlciBmdW5jdGlvbiB1c2VkIGJ5IHRoZSBtb3ZlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBpZiB0aGVyZSBpcyBhIGNvbGxpc2lvbiBiZXR3ZWVuIGFuXHJcbiAgICAgKiBlbnZpcm9ubWVudCBvYmplY3QgYW5kIHRoZSBlbmVteS4gSWYgdGhlcmUgaXMgYSBjb2xsaXNpb24sIHRoZSBvYmplY3QgaXMgYXR0YWNrZWQuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3RzIEFuIGFycmF5IG9mIGVudmlyb25tZW50IG9iamVjdHMuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBhIGNvbGxpc2lvbiBleGlzdHMuXHJcbiAgICAgKi9cclxuICAgIGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KGVudmlyb25tZW50T2JqZWN0cykge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbnZpcm9ubWVudE9iamVjdHNbaV0pICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmF0dGFja0Nvb2xkb3duID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2soZW52aXJvbm1lbnRPYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkcmF3IGZ1bmN0aW9uIGRyYXdzIHRoZSBpbWFnZSBvbiB0aGUgY2FudmFzIGF0IHRoZSB4IGFuZCB5IHBvc2l0aW9uIG9mIHRoZSBMaWdodEVuZW15LlxyXG4gICAgICogQHBhcmFtIGN0eCBUaGUgY29udGV4dCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIGNhbWVyYSBUaGUgY2FtZXJhIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xyXG4gICAgICAgIC8vY3R4LnNhdmUoKTtcclxuICAgICAgICAvL2N0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgICAgIC8vY3R4LnJvdGF0ZSh0aGlzLmFuZ2xlICsgTWF0aC5QSS8yLjApO1xyXG4gICAgICAgIC8vY3R4LnRyYW5zbGF0ZSgtdGhpcy54LCAtdGhpcy55KTtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XHJcbiAgICAgICAgLy9jdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFbmVteTsiLCJpbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIEVuZW15UHJvamVjdGlsZSBjbGFzcyBpcyB0aGUgb2JqZWN0IHRoYXQgaXMgZmlyZWQgZnJvbSB0aGUgUHJvamVjdGlsZUVuZW15IGVuZW15LlxyXG4gKi9cclxuY2xhc3MgRW5lbXlQcm9qZWN0aWxlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBFbmVteVByb2plY3RpbGUgY2xhc3MgYW5kIGdldHMgdGhlIHggYW5kIHkgY29lZmZpY2llbnRzIGZvciB1c2VcclxuICAgICAqIGluIHRoZSBtb3ZlIGZ1bmN0aW9uLiBUaGUgbG9hZEltYWdlIGZ1bmN0aW9uIGlzIGFsc28gY2FsbGVkLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gZGVzdFggVGhlIHggZGVzdGluYXRpb24gb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBkZXN0WSBUaGUgeSBkZXN0aW5hdGlvbiBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBkZXN0WCwgZGVzdFkpIHtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gNjAwO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlID0gNTtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy5saXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgZGlmZlggPSBkZXN0WCAtIHRoaXMueDtcclxuICAgICAgICBsZXQgZGlmZlkgPSBkZXN0WSAtIHRoaXMueTtcclxuICAgICAgICBpZihNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jb2VmZlggPSBkaWZmWCAvIE1hdGguYWJzKGRpZmZYKTtcclxuICAgICAgICAgICAgdGhpcy5jb2VmZlkgPSBkaWZmWSAvIE1hdGguYWJzKGRpZmZYKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29lZmZZID0gZGlmZlkgLyBNYXRoLmFicyhkaWZmWSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIG1vdmVzIHRoZSBFbmVteVByb2plY3RpbGUgYWNjb3JkaW5nIHRvIHRoZSB4IGFuZCB5IGNvZWZmaWNpZW50cy5cclxuICAgICAqIEBwYXJhbSBtb2RpZmllciBUaGUgbW9kaWZpZXIgdG8gYmUgbXVsdGlwbGllZCBieSB0aGUgdmVsb2NpdHkuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3RzIFRoZSBhcnJheSBvZiBlbnZpcm9ubWVudCBvYmplY3RzLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgbW92ZShtb2RpZmllciwgZW52aXJvbm1lbnRPYmplY3RzLCBwbGF5ZXIpIHtcclxuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcip0aGlzLmNvZWZmWDtcclxuICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcip0aGlzLmNvZWZmWTtcclxuICAgICAgICBpZih0aGlzLmhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIHBsYXllcikpIHtcclxuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMueCA8IDAgfHwgdGhpcy54ID4gMTAwMDAgfHwgdGhpcy55IDwgMCB8fCB0aGlzLnkgPiA1NjI1KXtcclxuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB0YWtlcyBhd2F5IGhlYWx0aCBmcm9tIHRoZSBwbGF5ZXIgZXF1YWwgdG8gdGhlIGRhbWFnZSBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZGFtYWdlUGxheWVyKHBsYXllcikge1xyXG4gICAgICAgIHBsYXllci5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGF3YXkgaGVhbHRoIGZyb20gdGhlIGVudmlyb25tZW50IG9iamVjdCBlcXVhbCB0byB0aGUgZGFtYWdlIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3QgVGhlIGVudmlyb25tZW50IG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZGFtYWdlRW52aXJvbm1lbnQoZW52aXJvbm1lbnRPYmplY3Qpe1xyXG4gICAgICAgIGVudmlyb25tZW50T2JqZWN0LmhlYWx0aCAtPSB0aGlzLmRhbWFnZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIGFuIGVudmlyb25tZW50IG9iamVjdCBvciBhIHBsYXllciB3ZXJlIGhpdCBieSB0aGUgcHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdHMgVGhlIGFycmF5IG9mIGVudmlyb25tZW50IG9iamVjdHMuXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIFRoZSBwbGF5ZXIgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHNvbWV0aGluZyB3YXMgaGl0LlxyXG4gICAgICovXHJcbiAgICBoaXRTb21ldGhpbmcoZW52aXJvbm1lbnRPYmplY3RzLCBwbGF5ZXIpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgZW52aXJvbm1lbnRPYmplY3RzW2ldKSAmJiBlbnZpcm9ubWVudE9iamVjdHNbaV0uaXNCbG9ja2luZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VFbnZpcm9ubWVudChlbnZpcm9ubWVudE9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBwbGF5ZXIpKXtcclxuICAgICAgICAgICAgdGhpcy5kYW1hZ2VQbGF5ZXIocGxheWVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsb2FkSW1hZ2UgZnVuY3Rpb24gbG9hZHMgdGhlIHVybCBhcyBhbiBJbWFnZS4gT25jZSB0aGUgaW1hZ2UgaXMgbG9hZGVkLCB0aGlzLmlzSW1hZ2VMb2FkZWQgaXNcclxuICAgICAqIHNldCB0byB0cnVlLiBUaGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlIGFyZSBzZXQgdG8gdGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIGltYWdlLlxyXG4gICAgICovXHJcbiAgICBsb2FkSW1hZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gXCJHcmFwaGljcy9FbmVteVByb2plY3RpbGUucG5nXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZHJhdyBmdW5jdGlvbiBkcmF3cyB0aGUgaW1hZ2Ugb24gdGhlIGNhbnZhcyBhdCB0aGUgeCBhbmQgeSBwb3NpdGlvbiBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIGN0eCBUaGUgY29udGV4dCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIGNhbWVyYSBUaGUgY2FtZXJhIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRW5lbXlQcm9qZWN0aWxlOyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgTGlnaHRFbmVteSBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaXMgYSBmYXN0IGVuZW15IHdpdGggbG93IGhlYWx0aC5cclxuICovXHJcbmNsYXNzIExpZ2h0RW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgTGlnaHRFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gMTI4LCB0aGUgaGVhbHRoIHNldCB0byAxMCwgdGhlIGRhbWFnZSBzZXQgdG8gMTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gNTAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgTGlnaHRFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBMaWdodEVuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMTI4LCAxMCwgMTAsIDUwKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9MaWdodEVuZW15LnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlnaHRFbmVteTsiLCJpbXBvcnQgRW5lbXkgZnJvbSAnLi9FbmVteS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIE1pbmlCb3NzIGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBpcyBhIGhpZ2ggaGVhbHRoIGFuZCBkYW1hZ2UgZW5lbXkuXHJcbiAqL1xyXG5jbGFzcyBNaW5pQm9zcyBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBNaW5pQm9zcy4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gMTI4LCB0aGUgaGVhbHRoIHNldCB0byA1MDAsIHRoZSBkYW1hZ2Ugc2V0IHRvIDUwLCBhbmQgdGhlIHBvaW50c09uS2lsbFxyXG4gICAgICogc2V0IHRvIDEwMDAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgTWluaUJvc3MuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgTWluaUJvc3MuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAxMjgsIDUwMCwgNTAsIDEwMDApO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93biA9IDIwMDtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SYXRlID0gMTtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SZXNldCA9IDIwMDtcclxuICAgICAgICB0aGlzLnNob290QW1vdW50ID0gNTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9NaW5pQm9zcy5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1pbmlCb3NzOyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUHJvamVjdGlsZUVuZW15IGNsYXNzIGV4dGVuZHMgdGhlIGVuZW15IGNsYXNzLiBJdCBjYW4gc2hvb3QgcHJvamVjdGlsZXMgYXQgdGhlIHBsYXllci5cclxuICovXHJcbmNsYXNzIFByb2plY3RpbGVFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBQcm9qZWN0aWxlRW5lbXkuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDk2LCB0aGUgaGVhbHRoIHNldCB0byA0MCwgdGhlIGRhbWFnZSBzZXQgdG8gMTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gMjUwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFByb2plY3RpbGVFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBQcm9qZWN0aWxlRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCA5NiwgNDAsIDEwLCAyNTApO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93biA9IDMwMDtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SYXRlID0gMTtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SZXNldCA9IDMwMDtcclxuICAgICAgICB0aGlzLnNob290QW1vdW50ID0gMTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9Qcm9qZWN0aWxlRW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0aWxlRW5lbXk7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBSZWd1bGFyRW5lbXkgY2xhc3MgZXh0ZW5kcyB0aGUgRW5lbXkgY2xhc3MuIEl0IGhhcyBiYWxhbmNlZCBzdGF0cyBhY3Jvc3MgdGhlIGJvYXJkLlxyXG4gKi9cclxuY2xhc3MgUmVndWxhckVuZW15IGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFJlZ3VsYXJFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gNjQsIHRoZSBoZWFsdGggc2V0IHRvIDI1LCB0aGUgZGFtYWdlIHNldCB0byAxMCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byAxMDAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgUmVndWxhckVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFJlZ3VsYXJFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDY0LCAyNSwgMTAsIDEwMCk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvUmVndWxhckVuZW15LnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVndWxhckVuZW15OyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgVGFua0VuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBpcyBhIHNsb3cgZW5lbXkgd2l0aCBoaWdoIGhlYWx0aCBhbmQgZGFtYWdlLlxyXG4gKi9cclxuY2xhc3MgVGFua0VuZW15IGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFRhbmtFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gMzIsIHRoZSBoZWFsdGggc2V0IHRvIDEwMCwgdGhlIGRhbWFnZSBzZXQgdG8gMjUsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gNTAwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFRhbmtFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBUYW5rRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAzMiwgMTAwLCAgMjUsIDUwMCk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvVGFua0VuZW15LnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFua0VuZW15OyIsImltcG9ydCBFbnZpcm9ubWVudE9iamVjdCBmcm9tICcuL0Vudmlyb25tZW50T2JqZWN0LmpzJztcblxuLyoqXG4gKiBUaGUgQnVzaCBjbGFzcyBleHRlbmRzIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzcy4gSXQgaXMgYSBub24tYmxvY2tpbmcgb2JqZWN0LlxuICovXG5jbGFzcyBCdXNoIGV4dGVuZHMgRW52aXJvbm1lbnRPYmplY3Qge1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEJ1c2guIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzc2VzIGNvbnN0cnVjdG9yXG4gICAgICogd2l0aCB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIGhlYWx0aCBzZXQgdG8gMTAwMDAwLCBhbmQgaXNCbG9ja2luZyBzZXQgdG8gZmFsc2UuXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEJ1c2guXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIEJ1c2guXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICBzdXBlcih4LCB5LCAxMDAwMDAsIGZhbHNlKTtcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvQnVzaC5wbmdcIik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdXNoOyIsImltcG9ydCBFbnZpcm9ubWVudE9iamVjdCBmcm9tICcuL0Vudmlyb25tZW50T2JqZWN0LmpzJztcblxuLyoqXG4gKiBUaGUgQ3JhdGUgY2xhc3MgZXh0ZW5kcyB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3MuIEl0IGlzIGEgYmxvY2tpbmcgb2JqZWN0IHdpdGggbG93IGhlYWx0aC5cbiAqL1xuY2xhc3MgQ3JhdGUgZXh0ZW5kcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgQ3JhdGUuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzc2VzIGNvbnN0cnVjdG9yXG4gICAgICogd2l0aCB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIGhlYWx0aCBzZXQgdG8gMTAwLCBhbmQgaXNCbG9ja2luZyBzZXQgdG8gdHJ1ZS5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgQ3JhdGUuXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIENyYXRlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgMTAwLCB0cnVlKTtcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvQ3JhdGUucG5nXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ3JhdGU7XG4iLCIvKipcbiAqIFRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzcyBpcyB0aGUgcGFyZW50IGZvciBhbGwgZW52aXJvbm1lbnQgb2JqZWN0cy5cbiAqL1xuY2xhc3MgRW52aXJvbm1lbnRPYmplY3Qge1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIGhlYWx0aCBUaGUgaGVhbHRoIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0gaXNCbG9ja2luZyBXaGV0aGVyIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjYW4gYmUgd2Fsa2VkIHRocm91Z2guXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSwgaGVhbHRoLCBpc0Jsb2NraW5nKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gaGVhbHRoO1xuICAgICAgICB0aGlzLmlzQmxvY2tpbmcgPSBpc0Jsb2NraW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBsb2FkSW1hZ2UgZnVuY3Rpb24gdGFrZXMgaW4gYSB1cmwgYW5kIGxvYWRzIGl0IGFzIGFuIEltYWdlLiBPbmNlIHRoZSBpbWFnZSBpcyBsb2FkZWQsIHRoaXMuaXNJbWFnZUxvYWRlZCBpc1xuICAgICAqIHNldCB0byB0cnVlLiBUaGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QgYXJlIHNldCB0byB0aGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgaW1hZ2UuXG4gICAgICogQHBhcmFtIHVybCBUaGUgdXJsIHRoYXQgc2hvdWxkIGJlIGxvYWRlZC5cbiAgICAgKi9cbiAgICBsb2FkSW1hZ2UodXJsKSB7XG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB1cmw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGRyYXcgZnVuY3Rpb24gZHJhd3MgdGhlIGltYWdlIG9uIHRoZSBjYW52YXMgYXQgdGhlIHggYW5kIHkgcG9zaXRpb24gb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSBjdHggVGhlIGNvbnRleHQgb2YgdGhlIGNhbnZhcy5cbiAgICAgKiBAcGFyYW0gY2FtZXJhIFRoZSBjYW1lcmEgb2JqZWN0LlxuICAgICAqL1xuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW52aXJvbm1lbnRPYmplY3Q7IiwiaW1wb3J0IEVudmlyb25tZW50T2JqZWN0IGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3QuanMnO1xuXG4vKipcbiAqIFRoZSBSb2NrIGNsYXNzIGV4dGVuZHMgdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzLiBJdCBpcyBhIGJsb2NraW5nIG9iamVjdCB3aXRoIGhpZ2ggaGVhbHRoLlxuICovXG5jbGFzcyBSb2NrIGV4dGVuZHMgRW52aXJvbm1lbnRPYmplY3Qge1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFJvY2suIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzc2VzIGNvbnN0cnVjdG9yXG4gICAgICogd2l0aCB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIGhlYWx0aCBzZXQgdG8gMzAwLCBhbmQgaXNCbG9ja2luZyBzZXQgdG8gdHJ1ZS5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgUm9jay5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgUm9jay5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHN1cGVyKHgsIHksIDMwMCwgdHJ1ZSk7XG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1JvY2sucG5nXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUm9jaztcbiIsImNsYXNzIENvbnRyb2xsZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50Qm9keSkge1xyXG4gICAgICAgIHRoaXMua2V5c1ByZXNzZWQgPSBbXTtcclxuICAgICAgICB0aGlzLm1vdXNlID0gWzAsIDBdO1xyXG4gICAgICAgIHRoaXMubW91c2VQcmVzc2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Qm9keS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5rZXlzUHJlc3NlZFtldmVudC5rZXlDb2RlXSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Qm9keS5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMua2V5c1ByZXNzZWRbZXZlbnQua2V5Q29kZV0gPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnRCb2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlWzBdID0gZXZlbnQuY2xpZW50WDtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZVsxXSA9IGV2ZW50LmNsaWVudFk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Qm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZVByZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudEJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlzS2V5UHJlc3NlZChrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5rZXlzUHJlc3NlZFtrZXldO1xyXG4gICAgfVxyXG5cclxuICAgIGlzTW91c2VQcmVzc2VkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vdXNlUHJlc3NlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNb3VzZVBvc2l0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vdXNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyOyIsImltcG9ydCBXb3JsZCBmcm9tICcuL1dvcmxkLmpzJztcclxuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9Db250cm9sbGVyLmpzJztcclxuaW1wb3J0IEVuZW15UHJvamVjdGlsZSBmcm9tIFwiLi4vRW5lbWllcy9FbmVteVByb2plY3RpbGVcIjtcclxuaW1wb3J0IE1pbmlCb3NzIGZyb20gXCIuLi9FbmVtaWVzL01pbmlCb3NzXCI7XHJcbmltcG9ydCBQcm9qZWN0aWxlRW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvUHJvamVjdGlsZUVuZW15XCI7XHJcbmltcG9ydCBDdXJzb3IgZnJvbSAnLi4vQ3Vyc29yLmpzJztcclxuaW1wb3J0IFBpc3RvbCBmcm9tIFwiLi4vV2VhcG9ucy9QaXN0b2xcIjtcclxuaW1wb3J0IFNuaXBlciBmcm9tIFwiLi4vV2VhcG9ucy9TbmlwZXJcIjtcclxuaW1wb3J0IEJ1bGxldDUwY2FsIGZyb20gXCIuLi9XZWFwb25zL0J1bGxldDUwY2FsXCI7XHJcbmltcG9ydCBCdWxsZXQ5bW0gZnJvbSBcIi4uL1dlYXBvbnMvQnVsbGV0OW1tXCI7XHJcblxyXG5jbGFzcyBHYW1lIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIGRvY3VtZW50Qm9keSkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgICAgIHRoaXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB0aGlzLndvcmxkID0gbmV3IFdvcmxkKGNhbnZhcyk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIoZG9jdW1lbnRCb2R5KTtcclxuICAgICAgICB0aGlzLmN1cnNvciA9IG5ldyBDdXJzb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUobW9kaWZpZXIpIHtcclxuICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5oZWFsdGggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDg3KSkgeyAvLyBQbGF5ZXIgaG9sZGluZyB1cFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIueSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueSAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDgzKSkgeyAvLyBQbGF5ZXIgaG9sZGluZyBkb3duXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0IDw9IDU2MjUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnkgLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoNjUpKSB7IC8vIFBsYXllciBob2xkaW5nIGxlZnRcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLnggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdCh0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueCArPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg2OCkpIHsgLy8gUGxheWVyIGhvbGRpbmcgcmlnaHRcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aCA8PSAxMDAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggKz0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdCh0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueCAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmNvbnRyb2xsZXIuaXNNb3VzZVByZXNzZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdlcCA9IHRoaXMud29ybGQucGxheWVyLmludmVudG9yeVt0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdXNlID0gdGhpcy5jb250cm9sbGVyLmdldE1vdXNlUG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0ZpcmUgdGhlIGNvcnJlY3QgYnVsbGV0IHR5cGUgZm9yIHRoZSBjdXJyZW50bHkgZXF1aXBwZWQgd2VhcG9uLlxyXG4gICAgICAgICAgICAgICAgLy9UaGlzIGNvdWxkIGJlIGRvbmUgbW9yZSBncmFjZWZ1bGx5IGluIHRoZSBmdXR1cmVcclxuICAgICAgICAgICAgICAgIGlmKHdlcCBpbnN0YW5jZW9mIFBpc3RvbClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0OW1tKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55LCBtb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54LCBtb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55KSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHdlcCBpbnN0YW5jZW9mIFNuaXBlcilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0NTBjYWwodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoLzIsIHRoaXMud29ybGQucGxheWVyLnksIG1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngsIG1vdXNlWzFdK3RoaXMud29ybGQuY2FtZXJhLnkpKTtcclxuICAgICAgICAgICAgICAgIC8vVGhlIGJvdW5kaW5nIGJveCBpbiB0aGlzIGlmIHN0YXRlbWVudCB0ZWxscyBpZiB0aGUgbW91c2Ugd2FzIGNsaWNrZWQgaW5zaWRlIHRoZSB0cnkgYWdhaW4gYnV0dG9uLFxyXG4gICAgICAgICAgICAgICAgLy9hbmQgaWYgc28gdGhlIHRoaXMud29ybGQgaXMgcmVzdGFydGVkLlxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaGVhbHRoIDwgMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL1RoZXNlIGNvbnRyb2xzIGNoYW5nZSB0aGUgYWN0aXZlIHdlYXBvbiB3aXRoIHNpbXBsZSAxLDIsMyxldGMgY29udHJvbHMgZm9yIGludmVudG9yeVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg0OSkpIHsgLy8gUGxheWVyIHByZXNzZWQgMVxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg1MCkpIHsgLy8gUGxheWVyIHByZXNzZWQgMlxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSB0aGlzLndvcmxkLmJ1bGxldHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0c1tpXS5tb3ZlKG1vZGlmaWVyLCB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cywgdGhpcy53b3JsZC5lbmVtaWVzKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuYnVsbGV0c1tpXS5saXZlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29udHJvbGxlci5pc01vdXNlUHJlc3NlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW91c2UgPSB0aGlzLmNvbnRyb2xsZXIuZ2V0TW91c2VQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ21vdXNlIHg6ICcgKyBtb3VzZVswXSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnbW91c2UgeTogJyArIG1vdXNlWzFdKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzaG91bGQgYmUgZ3JlYXRlciB0aGFuJyArIHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDApO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3Nob3VsZCBiZSBsZXNzIHRoYW4gJyArICh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwKzIwMCkpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3Nob3VsZCBiZSBncmVhdGVyIHRoYW4nICsgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2hvdWxkIGJlIGxlc3MgdGhhbicgKyB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1ICsgMTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihtb3VzZVswXSA+IHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAgJiYgbW91c2VbMF0gPCAodGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCsyMDApXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgbW91c2VbMV0gPiB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1ICYmIG1vdXNlWzFdIDwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSArIDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuc3RhcnQodGhpcy5jYW52YXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0ubW92ZSh0aGlzLndvcmxkLnBsYXllciwgbW9kaWZpZXIsIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzKTtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLmF0dGFja0Nvb2xkb3duID4gMClcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5hdHRhY2tDb29sZG93biAtPSA1O1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0gaW5zdGFuY2VvZiBQcm9qZWN0aWxlRW5lbXkgfHwgdGhpcy53b3JsZC5lbmVtaWVzW2ldIGluc3RhbmNlb2YgTWluaUJvc3MpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duID4gMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93biAtPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93blJhdGU7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXMucHVzaChuZXcgRW5lbXlQcm9qZWN0aWxlKHRoaXMud29ybGQuZW5lbWllc1tpXS54ICsgdGhpcy53b3JsZC5lbmVtaWVzW2ldLndpZHRoLzIsIHRoaXMud29ybGQuZW5lbWllc1tpXS55ICsgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmhlaWdodC8yLCB0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLnNob290Q29vbGRvd24gKz0gdGhpcy53b3JsZC5lbmVtaWVzW2ldLnNob290Q29vbGRvd25SZXNldDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0uaGVhbHRoIDw9IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5tb3ZlKG1vZGlmaWVyLCB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cywgdGhpcy53b3JsZC5wbGF5ZXIpO1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXNbaV0ubGl2ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmhlYWx0aCA8PSAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLndvcmxkLndhdmUgKz0gMTtcclxuICAgICAgICAgICAgdGhpcy53b3JsZC5zdGFydFdhdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMud29ybGQuY2FtZXJhLnVwZGF0ZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBkcmF3KCkge1xyXG4gICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmhlYWx0aCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMTI4cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGU9JyNGRkYnO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkdhbWUgT3ZlclwiLCB0aGlzLmNhbnZhcy53aWR0aC8yLCB0aGlzLmNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZT0nIzAwMCc7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoXCJHYW1lIE92ZXJcIiwgdGhpcy5jYW52YXMud2lkdGgvMiwgdGhpcy5jYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGU9JyNGRkYnO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1LCAyMDAsIDEwMCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVJlY3QodGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSwgMjAwLCAxMDApO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIyNHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlPScjMDAwJztcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJUcnkgYWdhaW4/XCIsIHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAgKyAxMDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUgKyA1MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmlzQmFja2dyb3VuZExvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5kcmF3QmFja2dyb3VuZCh0aGlzLmN0eCwgdGhpcy5jYW52YXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmVuZW1pZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzSW1hZ2VMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLndvcmxkLmNhbWVyYSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmJ1bGxldHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuYnVsbGV0c1tpXS5pc0ltYWdlTG9hZGVkICYmIHRoaXMud29ybGQuYnVsbGV0c1tpXS5saXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXNbaV0uaXNJbWFnZUxvYWRlZCAmJiB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXNbaV0ubGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLndvcmxkLmNhbWVyYSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmlzSW1hZ2VMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjQ4cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZT0nI0ZGRic7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aGlzLndvcmxkLnBsYXllci5oZWFsdGggKyBcIiBIUFwiLCB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMjkwLCA1MCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KHRoaXMud29ybGQucGxheWVyLmhlYWx0aCArIFwiIEhQXCIsIHRoaXMuY2FudmFzLndpZHRoLzIgLSAyOTAsIDUwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiV2F2ZSBcIiArIHRoaXMud29ybGQud2F2ZSwgdGhpcy5jYW52YXMud2lkdGgvMiwgNTApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIldhdmUgXCIgKyB0aGlzLndvcmxkLndhdmUsIHRoaXMuY2FudmFzLndpZHRoLzIsIDUwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGggKyBcIiBFbmVtaWVzIExlZnRcIiwgdGhpcy5jYW52YXMud2lkdGgvMiArIDM1MCwgNTApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCh0aGlzLndvcmxkLmVuZW1pZXMubGVuZ3RoICsgXCIgRW5lbWllcyBMZWZ0XCIsIHRoaXMuY2FudmFzLndpZHRoLzIgKyAzNTAsIDUwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjQ4cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZT0nI0ZGRic7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnQWN0aXZlIFdlYXBvbjogJyArIHRoaXMud29ybGQucGxheWVyLmludmVudG9yeVt0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXhdLm5hbWUsIHRoaXMuY2FudmFzLndpZHRoLzIsIDEyNSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCdBY3RpdmUgV2VhcG9uOiAnICsgdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W3RoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleF0ubmFtZSwgdGhpcy5jYW52YXMud2lkdGgvMiwgMTI1KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbW91c2UgPSB0aGlzLmNvbnRyb2xsZXIuZ2V0TW91c2VQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmN1cnNvci5pbWFnZSwgbW91c2VbMF0gLSB0aGlzLmN1cnNvci5pbWFnZS53aWR0aC8yLCBtb3VzZVsxXSAtIHRoaXMuY3Vyc29yLmltYWdlLmhlaWdodC8yKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJpbXBvcnQgUm9jayBmcm9tIFwiLi4vRW52aXJvbm1lbnRPYmplY3RzL1JvY2tcIjtcclxuaW1wb3J0IEJ1c2ggZnJvbSBcIi4uL0Vudmlyb25tZW50T2JqZWN0cy9CdXNoXCI7XHJcbmltcG9ydCBDcmF0ZSBmcm9tIFwiLi4vRW52aXJvbm1lbnRPYmplY3RzL0NyYXRlXCI7XHJcbmltcG9ydCBUYW5rRW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvVGFua0VuZW15XCI7XHJcbmltcG9ydCBSZWd1bGFyRW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvUmVndWxhckVuZW15XCI7XHJcbmltcG9ydCBMaWdodEVuZW15IGZyb20gXCIuLi9FbmVtaWVzL0xpZ2h0RW5lbXlcIjtcclxuaW1wb3J0IFByb2plY3RpbGVFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9Qcm9qZWN0aWxlRW5lbXlcIjtcclxuaW1wb3J0IE1pbmlCb3NzIGZyb20gJy4uL0VuZW1pZXMvTWluaUJvc3MnO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLi9QbGF5ZXJzL1BsYXllclwiO1xyXG5pbXBvcnQgQ2FtZXJhIGZyb20gXCIuLi9QbGF5ZXJzL0NhbWVyYVwiO1xyXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vVXRpbGl0aWVzL1V0aWxcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgV29ybGQgY2xhc3MgaG9sZHMgdGhlIGluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gdGhlIHdvcmxkLlxyXG4gKi9cclxuY2xhc3MgV29ybGQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZCBvZiB0aGUgd29ybGQgYW5kIGxvYWRzIHRoZSBiYWNrZ3JvdW5kLlxyXG4gICAgICogQHBhcmFtIGNhbnZhcyBUaGUgY2FudmFzLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0KGNhbnZhcyk7XHJcbiAgICAgICAgdGhpcy5sb2FkQmFja2dyb3VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHN0YXJ0IGZ1bmN0aW9uIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFdvcmxkLiBUaGUgcGxheWVyIGlzIG1hZGUgYW5kIHRoZSBjYW1lcmEgaXMgYXR0YWNoZWQgdG8gdGhlIHBsYXllci5cclxuICAgICAqIEEgY2FsbCBpcyB0byBpbml0aWFsaXplIHRoZSBlbnZpcm9ubWVudCBhbmQgc3RhcnQgdGhlIHdhdmUuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzIFRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0KGNhbnZhcykge1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBDYW1lcmEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0LCAxMDAwMCwgNTYyNSk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyLCBjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmVuZW1pZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZW5lbXlQcm9qZWN0aWxlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMud2F2ZSA9IDE7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplRW52aXJvbm1lbnQoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0V2F2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpbml0aWFsaXplcyB0aGUgZW52aXJvbm1lbnQgYnkgcHVzaGluZyBlbnZpcm9ubWVudCBvYmplY3RzIG9udG8gdGhlIGVudmlyb25tZW50T2JqZWN0cyBhcnJheS5cclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZUVudmlyb25tZW50KCkge1xyXG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzLnB1c2gobmV3IENyYXRlKDIwMCwgNDAwKSk7XHJcbiAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMucHVzaChuZXcgQnVzaCgyMCwgMTAwKSk7XHJcbiAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMucHVzaChuZXcgUm9jayg5MDAsIDIwKSk7XHJcbiAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMucHVzaChuZXcgUm9jayg5NTAwLCAyMCkpO1xyXG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzLnB1c2gobmV3IFJvY2soMjAsIDUyNTApKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gc3RhcnRzIHRoZSB3YXZlIGJ5IHB1c2hpbmcgZW5lbWllcyBvbnRvIHRoZSBlbmVtaWVzIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBzdGFydFdhdmUoKSB7XHJcbiAgICAgICAgbGV0IGxpZ2h0RW5lbXlDYXAgPSB0aGlzLndhdmUgKiAxMDtcclxuICAgICAgICBsZXQgcmVndWxhckVuZW15Q2FwID0gdGhpcy53YXZlICogMTA7XHJcbiAgICAgICAgbGV0IHRhbmtFbmVteUNhcCA9IHRoaXMud2F2ZSAqIDU7XHJcbiAgICAgICAgbGV0IHByb2plY3RpbGVFbmVteUNhcCA9IE1hdGguZmxvb3IodGhpcy53YXZlLzIpKjU7XHJcbiAgICAgICAgbGV0IG1pbmlCb3NzQ2FwID0gTWF0aC5mbG9vcih0aGlzLndhdmUvNSk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsaWdodEVuZW15Q2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBMaWdodEVuZW15KFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmVndWxhckVuZW15Q2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBSZWd1bGFyRW5lbXkoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0YW5rRW5lbXlDYXA7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IFRhbmtFbmVteShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHByb2plY3RpbGVFbmVteUNhcDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgUHJvamVjdGlsZUVuZW15KFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbWluaUJvc3NDYXA7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IE1pbmlCb3NzKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbGxpc2lvbkZsYWcgPSB0cnVlO1xyXG4gICAgICAgIHdoaWxlKGNvbGxpc2lvbkZsYWcgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IGkgPSBVdGlsLmFyZUFueUNvbGxpc2lvbnModGhpcy5lbmVtaWVzLCB0aGlzLmVudmlyb25tZW50T2JqZWN0cyk7XHJcbiAgICAgICAgICAgIGlmIChpID09PSAtMSlcclxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbkZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmVtaWVzW2ldLnNldFBvc2l0aW9uKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsb2FkQmFja2dyb3VuZCBmdW5jdGlvbiBsb2FkcyB0aGUgYmFja2dyb3VuZCBpbWFnZS4gT25jZSB0aGUgaW1hZ2UgaXMgbG9hZGVkLCB0aGlzLmlzQmFja2dyb3VuZExvYWRlZCBpc1xyXG4gICAgICogc2V0IHRvIHRydWUuXHJcbiAgICAgKi9cclxuICAgIGxvYWRCYWNrZ3JvdW5kKCkge1xyXG4gICAgICAgIHRoaXMuaXNCYWNrZ3JvdW5kTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0JhY2tncm91bmRMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLnNyYyA9IFwiR3JhcGhpY3MvQmFja2dyb3VuZC5wbmdcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkcmF3QmFja2dyb3VuZCBmdW5jdGlvbiBkcmF3cyB0aGUgYmFja2dyb3VuZCBvZiB0aGUgd29ybGQuXHJcbiAgICAgKiBAcGFyYW0gY3R4IFRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzIFRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGRyYXdCYWNrZ3JvdW5kKGN0eCwgY2FudmFzKSB7XHJcbiAgICAgICAgbGV0IHNXaWR0aCwgc0hlaWdodDtcclxuICAgICAgICBzV2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICAgICAgc0hlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuYmFja2dyb3VuZC53aWR0aCAtIHRoaXMuY2FtZXJhLnggPCBjYW52YXMud2lkdGgpXHJcbiAgICAgICAgICAgIHNXaWR0aCA9IHRoaXMuYmFja2dyb3VuZC53aWR0aCAtIHRoaXMuY2FtZXJhLng7XHJcbiAgICAgICAgaWYodGhpcy5iYWNrZ3JvdW5kLmhlaWdodCAtIHRoaXMuY2FtZXJhLnkgPCBjYW52YXMuaGVpZ2h0KVxyXG4gICAgICAgICAgICBzSGVpZ2h0ID0gdGhpcy5iYWNrZ3JvdW5kLmhlaWdodCAtIHRoaXMuY2FtZXJhLnk7XHJcblxyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5iYWNrZ3JvdW5kLCB0aGlzLmNhbWVyYS54LCB0aGlzLmNhbWVyYS55LCBzV2lkdGgsIHNIZWlnaHQsIDAsIDAsIHNXaWR0aCwgc0hlaWdodCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXb3JsZDsiLCIvKlxuICBTb3VyY2VzOlxuICBodHRwOi8vd3d3Lmxvc3RkZWNhZGVnYW1lcy5jb20vaG93LXRvLW1ha2UtYS1zaW1wbGUtaHRtbDUtY2FudmFzLWdhbWUvXG4gIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQwMzcyMTIvaHRtbC1jYW52YXMtZnVsbC1zY3JlZW4/dXRtX21lZGl1bT1vcmdhbmljJnV0bV9zb3VyY2U9Z29vZ2xlX3JpY2hfcWEmdXRtX2NhbXBhaWduPWdvb2dsZV9yaWNoX3FhXG4gIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2OTE5NjAxL2h0bWw1LWNhbnZhcy13b3JsZC5jYW1lcmEtdmlld3BvcnQtaG93LXRvLWFjdGFsbHktZG8taXQ/dXRtX21lZGl1bT1vcmdhbmljJnV0bV9zb3VyY2U9Z29vZ2xlX3JpY2hfcWEmdXRtX2NhbXBhaWduPWdvb2dsZV9yaWNoX3FhXG4gIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvZ2ZjYXJ2L1FLZ0hzL1xuICovXG5cbmltcG9ydCBCdWxsZXQ5bW0gZnJvbSAnLi9XZWFwb25zL0J1bGxldDltbS5qcyc7XG5pbXBvcnQgQnVsbGV0NTBjYWwgZnJvbSAnLi9XZWFwb25zL0J1bGxldDUwY2FsLmpzJztcbmltcG9ydCBTbmlwZXIgZnJvbSAnLi9XZWFwb25zL1NuaXBlci5qcyc7XG5pbXBvcnQgUGlzdG9sIGZyb20gJy4vV2VhcG9ucy9QaXN0b2wuanMnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi9VdGlsaXRpZXMvVXRpbC5qcyc7XG5pbXBvcnQgV29ybGQgZnJvbSAnLi9HYW1lL1dvcmxkLmpzJztcbmltcG9ydCBDdXJzb3IgZnJvbSAnLi9DdXJzb3IuanMnO1xuaW1wb3J0IFByb2plY3RpbGVFbmVteSBmcm9tICcuL0VuZW1pZXMvUHJvamVjdGlsZUVuZW15LmpzJztcbmltcG9ydCBFbmVteVByb2plY3RpbGUgZnJvbSBcIi4vRW5lbWllcy9FbmVteVByb2plY3RpbGVcIjtcbmltcG9ydCBNaW5pQm9zcyBmcm9tICcuL0VuZW1pZXMvTWluaUJvc3MnO1xuaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lL0dhbWUuanMnO1xuXG5cblxuLy8gbGV0IHdvcmxkID0gbmV3IFdvcmxkKGNhbnZhcyk7XG5cbi8vY3JlYXRlIGNyb3NzaGFpclxuLy8gbGV0IGN1cnNvciA9IG5ldyBDdXJzb3IoKTtcblxuLy8gSGFuZGxlIGNvbnRyb2xzXG4vLyBsZXQga2V5c1ByZXNzZWQgPSB7fTtcbi8vIGxldCBtb3VzZSA9IFswLDBdO1xuXG4vL1RoZXNlIGV2ZW50IGxpc3RlbmVycyBzaW1wbHkgY2F0Y2ggYW55IGJhc2ljIGlucHV0cyBhbmQgc3RvcmUgdGhlbSBpbiBnbG9iYWwgdmFyaWFibGVzXG4vL3RoYXQgbGF0ZXIgZnVuY3Rpb25zIGNhbiBjaGVjayB0byBoYW5kbGUgbW92ZW1lbnQgYW5kIGlucHV0c1xuLy8gYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcbi8vICAgICBrZXlzUHJlc3NlZFtlLmtleUNvZGVdID0gdHJ1ZTtcbi8vIH0sIGZhbHNlKTtcblxuLy8gYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG4vLyAgICAgZGVsZXRlIGtleXNQcmVzc2VkW2Uua2V5Q29kZV07XG4vLyB9LCBmYWxzZSk7XG5cbi8vIGFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XG4vLyAgICAgbW91c2VbMF0gPSBlLmNsaWVudFg7XG4vLyAgICAgbW91c2VbMV0gPSBlLmNsaWVudFk7XG4vLyB9LCBmYWxzZSk7XG5cbi8vIGFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG4vLyAgICAgLy9jbGlja2luZyA9IHRydWU7XG4vLyAgICAgbGV0IHdlcCA9IHdvcmxkLnBsYXllci5pbnZlbnRvcnlbd29ybGQucGxheWVyLmFjdGl2ZV9pbmRleF07XG4vL1xuLy8gICAgIC8vRmlyZSB0aGUgY29ycmVjdCBidWxsZXQgdHlwZSBmb3IgdGhlIGN1cnJlbnRseSBlcXVpcHBlZCB3ZWFwb24uXG4vLyAgICAgLy9UaGlzIGNvdWxkIGJlIGRvbmUgbW9yZSBncmFjZWZ1bGx5IGluIHRoZSBmdXR1cmVcbi8vICAgICBpZih3ZXAgaW5zdGFuY2VvZiBQaXN0b2wpXG4vLyAgICAgICB3b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDltbSh3b3JsZC5wbGF5ZXIueCArIHdvcmxkLnBsYXllci53aWR0aC8yLCB3b3JsZC5wbGF5ZXIueSwgZS5jbGllbnRYK3dvcmxkLmNhbWVyYS54LCBlLmNsaWVudFkrd29ybGQuY2FtZXJhLnkpKTtcbi8vICAgICBlbHNlIGlmKHdlcCBpbnN0YW5jZW9mIFNuaXBlcilcbi8vICAgICAgIHdvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0NTBjYWwod29ybGQucGxheWVyLnggKyB3b3JsZC5wbGF5ZXIud2lkdGgvMiwgd29ybGQucGxheWVyLnksIGUuY2xpZW50WCt3b3JsZC5jYW1lcmEueCwgZS5jbGllbnRZK3dvcmxkLmNhbWVyYS55KSk7XG4vLyAgICAgLy9UaGUgYm91bmRpbmcgYm94IGluIHRoaXMgaWYgc3RhdGVtZW50IHRlbGxzIGlmIHRoZSBtb3VzZSB3YXMgY2xpY2tlZCBpbnNpZGUgdGhlIHRyeSBhZ2FpbiBidXR0b24sXG4vLyAgICAgLy9hbmQgaWYgc28gdGhlIHdvcmxkIGlzIHJlc3RhcnRlZC5cbi8vICAgICBpZih3b3JsZC5wbGF5ZXIuaGVhbHRoIDwgMCkge1xuLy8gICAgICAgICBpZihlLmNsaWVudFggPiBjYW52YXMud2lkdGgvMiAtIDEwMCAmJiBlLmNsaWVudFggPCAoY2FudmFzLndpZHRoLzIgLSAxMDArMjAwKVxuLy8gICAgICAgICAgICAgJiYgZS5jbGllbnRZID4gY2FudmFzLmhlaWdodC8yICsgMjUgJiYgZS5jbGllbnRZIDwgY2FudmFzLmhlaWdodC8yICsgMjUgKyAxMDApIHtcbi8vICAgICAgICAgICAgIHdvcmxkLnN0YXJ0KGNhbnZhcyk7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyB9KTtcblxuLy8gbGV0IGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0ID0gKCkgPT4ge1xuLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29ybGQuZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4vLyAgICAgICAgIGlmIChVdGlsLmlzQ29sbGlzaW9uKHdvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXSwgd29ybGQucGxheWVyKSAmJiB3b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uaXNCbG9ja2luZylcbi8vICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuLy8gICAgIH1cbi8vICAgICByZXR1cm4gZmFsc2U7XG4vLyB9O1xuXG4vLyBVcGRhdGUgZ2FtZSBvYmplY3RzXG4vLyBsZXQgdXBkYXRlID0gKG1vZGlmaWVyKSA9PiB7XG4vLyAgICAgaWYod29ybGQucGxheWVyLmhlYWx0aCA+IDApIHtcbi8vICAgICAgIC8vVGhlc2Ugc3RhdGVtZW50cyBjb250cm9sIG1vdmVtZW50IHdpdGggc2ltcGxlIFdBU0QgZm9yIGVhY2ggZGlyZWN0aW9uXG4vLyAgICAgICAgIGlmICg4NyBpbiBrZXlzUHJlc3NlZCkgeyAvLyBQbGF5ZXIgaG9sZGluZyB1cFxuLy8gICAgICAgICAgICAgaWYod29ybGQucGxheWVyLnkgPj0gMCkge1xuLy8gICAgICAgICAgICAgICAgIHdvcmxkLnBsYXllci55IC09IHdvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xuLy8gICAgICAgICAgICAgICAgIGlmKGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KCkpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgd29ybGQucGxheWVyLnkgKz0gd29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGlmICg4MyBpbiBrZXlzUHJlc3NlZCkgeyAvLyBQbGF5ZXIgaG9sZGluZyBkb3duXG4vLyAgICAgICAgICAgICBpZih3b3JsZC5wbGF5ZXIueSArIHdvcmxkLnBsYXllci5oZWlnaHQgPD0gNTYyNSkge1xuLy8gICAgICAgICAgICAgICAgIHdvcmxkLnBsYXllci55ICs9IHdvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xuLy8gICAgICAgICAgICAgICAgIGlmKGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KCkpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgd29ybGQucGxheWVyLnkgLT0gd29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGlmICg2NSBpbiBrZXlzUHJlc3NlZCkgeyAvLyBQbGF5ZXIgaG9sZGluZyBsZWZ0XG4vLyAgICAgICAgICAgICBpZih3b3JsZC5wbGF5ZXIueCA+PSAwKSB7XG4vLyAgICAgICAgICAgICAgICAgd29ybGQucGxheWVyLnggLT0gd29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XG4vLyAgICAgICAgICAgICAgICAgaWYoaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoKSkge1xuLy8gICAgICAgICAgICAgICAgICAgICB3b3JsZC5wbGF5ZXIueCArPSB3b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgaWYgKDY4IGluIGtleXNQcmVzc2VkKSB7IC8vIFBsYXllciBob2xkaW5nIHJpZ2h0XG4vLyAgICAgICAgICAgICBpZih3b3JsZC5wbGF5ZXIueCArIHdvcmxkLnBsYXllci53aWR0aCA8PSAxMDAwMCkge1xuLy8gICAgICAgICAgICAgICAgIHdvcmxkLnBsYXllci54ICs9IHdvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xuLy8gICAgICAgICAgICAgICAgIGlmKGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KCkpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgd29ybGQucGxheWVyLnggLT0gd29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIC8vVGhlc2UgY29udHJvbHMgY2hhbmdlIHRoZSBhY3RpdmUgd2VhcG9uIHdpdGggc2ltcGxlIDEsMiwzLGV0YyBjb250cm9scyBmb3IgaW52ZW50b3J5XG4vLyAgICAgICAgIGlmICg0OSBpbiBrZXlzUHJlc3NlZCkgeyAvLyBQbGF5ZXIgcHJlc3NlZCAxXG4vLyAgICAgICAgICAgICB3b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gMDtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBpZiAoNTAgaW4ga2V5c1ByZXNzZWQpIHsgLy8gUGxheWVyIHByZXNzZWQgMlxuLy8gICAgICAgICAgICAgd29ybGQucGxheWVyLmFjdGl2ZV9pbmRleCA9IDE7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZm9yKGxldCBpID0gd29ybGQuYnVsbGV0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuLy8gICAgICAgICAgICAgd29ybGQuYnVsbGV0c1tpXS5tb3ZlKG1vZGlmaWVyLCB3b3JsZC5lbnZpcm9ubWVudE9iamVjdHMsIHdvcmxkLmVuZW1pZXMpO1xuLy8gICAgICAgICAgICAgaWYod29ybGQuYnVsbGV0c1tpXS5saXZlID09PSBmYWxzZSkge1xuLy8gICAgICAgICAgICAgICAgIHdvcmxkLmJ1bGxldHMuc3BsaWNlKGksIDEpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gICAgIGZvcihsZXQgaSA9IHdvcmxkLmVuZW1pZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbi8vICAgICAgICAgd29ybGQuZW5lbWllc1tpXS5tb3ZlKHdvcmxkLnBsYXllciwgbW9kaWZpZXIsIHdvcmxkLmVudmlyb25tZW50T2JqZWN0cyk7XG4vLyAgICAgICAgIGlmKHdvcmxkLmVuZW1pZXNbaV0uYXR0YWNrQ29vbGRvd24gPiAwKVxuLy8gICAgICAgICAgICAgd29ybGQuZW5lbWllc1tpXS5hdHRhY2tDb29sZG93biAtPSA1O1xuLy8gICAgICAgICBpZih3b3JsZC5lbmVtaWVzW2ldIGluc3RhbmNlb2YgUHJvamVjdGlsZUVuZW15IHx8IHdvcmxkLmVuZW1pZXNbaV0gaW5zdGFuY2VvZiBNaW5pQm9zcykge1xuLy8gICAgICAgICBcdGlmKHdvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93biA+IDApXG4vLyAgICAgICAgIFx0XHR3b3JsZC5lbmVtaWVzW2ldLnNob290Q29vbGRvd24gLT0gd29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duUmF0ZTtcbi8vICAgICAgICAgXHRlbHNlIHtcbi8vIFx0XHRcdFx0d29ybGQuZW5lbXlQcm9qZWN0aWxlcy5wdXNoKG5ldyBFbmVteVByb2plY3RpbGUod29ybGQuZW5lbWllc1tpXS54ICsgd29ybGQuZW5lbWllc1tpXS53aWR0aC8yLCB3b3JsZC5lbmVtaWVzW2ldLnkgKyB3b3JsZC5lbmVtaWVzW2ldLmhlaWdodC8yLCB3b3JsZC5wbGF5ZXIueCArIHdvcmxkLnBsYXllci53aWR0aC8yLCB3b3JsZC5wbGF5ZXIueSArIHdvcmxkLnBsYXllci5oZWlnaHQvMikpO1xuLy8gICAgICAgICBcdFx0d29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duICs9IHdvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93blJlc2V0O1xuLy8gXHRcdFx0fVxuLy8gXHRcdH1cbi8vICAgICAgICAgaWYod29ybGQuZW5lbWllc1tpXS5oZWFsdGggPD0gMClcbi8vICAgICAgICAgICAgIHdvcmxkLmVuZW1pZXMuc3BsaWNlKGksIDEpO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgZm9yKGxldCBpID0gd29ybGQuZW5lbXlQcm9qZWN0aWxlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuLy8gICAgICAgICB3b3JsZC5lbmVteVByb2plY3RpbGVzW2ldLm1vdmUobW9kaWZpZXIsIHdvcmxkLmVudmlyb25tZW50T2JqZWN0cywgd29ybGQucGxheWVyKTtcbi8vICAgICAgICAgaWYod29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5saXZlID09PSBmYWxzZSkge1xuLy8gICAgICAgICAgICAgd29ybGQuZW5lbXlQcm9qZWN0aWxlcy5zcGxpY2UoaSwgMSk7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vL1xuLy8gICAgIGZvcihsZXQgaSA9IHdvcmxkLmVudmlyb25tZW50T2JqZWN0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuLy8gICAgICAgICBpZih3b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uaGVhbHRoIDw9IDApXG4vLyAgICAgICAgICAgICB3b3JsZC5lbnZpcm9ubWVudE9iamVjdHMuc3BsaWNlKGksIDEpO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgaWYod29ybGQuZW5lbWllcy5sZW5ndGggPT09IDApIHtcbi8vICAgICAgICAgd29ybGQud2F2ZSArPSAxO1xuLy8gICAgICAgICB3b3JsZC5zdGFydFdhdmUoKTtcbi8vICAgICB9XG4vL1xuLy8gfTtcblxuLy8gVGhpcyBsb29wIHdpbGwgZHJhdyBhbGwgaW1hZ2VzIGFuZCB0ZXh0XG4vLyBsZXQgcmVuZGVyID0gKCkgPT4ge1xuLy8gICAgIC8vV2hlbiBwbGF5ZXIgaGVhbHRoIGlzIDwgMCB0aGUgZ2FtZSBpcyBvdmVyIHNvIHdlIG11c3QgZGlzcGxheSB0aGUgXCJHYW1lIE92ZXJcIiB0ZXh0IGFuZCBhZGQgYSBUcnkgQWdhaW4gYnV0dG9uXG4vLyAgICAgaWYod29ybGQucGxheWVyLmhlYWx0aCA8IDApIHtcbi8vICAgICAgICAgY3R4LmZvbnQgPSBcIjEyOHB4IHNhbnMtc2VyaWZcIjtcbi8vICAgICAgICAgY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4vLyAgICAgICAgIGN0eC5maWxsU3R5bGU9JyNGRkYnO1xuLy8gICAgICAgICBjdHguZmlsbFRleHQoXCJHYW1lIE92ZXJcIiwgY2FudmFzLndpZHRoLzIsIGNhbnZhcy5oZWlnaHQvMik7XG4vLyAgICAgICAgIGN0eC5maWxsU3R5bGU9JyMwMDAnO1xuLy8gICAgICAgICBjdHguc3Ryb2tlVGV4dChcIkdhbWUgT3ZlclwiLCBjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodC8yKTtcbi8vICAgICAgICAgY3R4LmZpbGxTdHlsZT0nI0ZGRic7XG4vLyAgICAgICAgIGN0eC5maWxsUmVjdChjYW52YXMud2lkdGgvMiAtIDEwMCwgY2FudmFzLmhlaWdodC8yICsgMjUsIDIwMCwgMTAwKTtcbi8vICAgICAgICAgY3R4LnN0cm9rZVJlY3QoY2FudmFzLndpZHRoLzIgLSAxMDAsIGNhbnZhcy5oZWlnaHQvMiArIDI1LCAyMDAsIDEwMCk7XG4vLyAgICAgICAgIGN0eC5mb250ID0gXCIyNHB4IHNhbnMtc2VyaWZcIjtcbi8vICAgICAgICAgY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4vLyAgICAgICAgIGN0eC5maWxsU3R5bGU9JyMwMDAnO1xuLy8gICAgICAgICBjdHguZmlsbFRleHQoXCJUcnkgYWdhaW4/XCIsIGNhbnZhcy53aWR0aC8yIC0gMTAwICsgMTAwLCBjYW52YXMuaGVpZ2h0LzIgKyAyNSArIDUwKTtcbi8vICAgICB9XG4vLyAgICAgZWxzZSB7XG4vLyAgICAgICAgIC8vUmVuZGVyIHRoZSBCYWNrZ3JvdW5kXG4vLyAgICAgICAgIGlmKHdvcmxkLmlzQmFja2dyb3VuZExvYWRlZCkge1xuLy8gICAgICAgICAgICAgd29ybGQuZHJhd0JhY2tncm91bmQoY3R4LCBjYW52YXMpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIC8vUmVuZGVyIGFsbCBlbmVtaWVzIGluIHRoZSB3b3JsZFxuLy8gICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgd29ybGQuZW5lbWllcy5sZW5ndGg7IGkrKykge1xuLy8gICAgICAgICAgICAgaWYod29ybGQuZW5lbWllc1tpXS5pc0ltYWdlTG9hZGVkKSB7XG4vLyAgICAgICAgICAgICAgICAgd29ybGQuZW5lbWllc1tpXS5kcmF3KGN0eCwgd29ybGQuY2FtZXJhKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgICAgICAvL1JlbmRlciBhbGwgZW52aXJvbm1lbnQgb2JqZWN0cyB0aGF0IGV4aXN0IGluIHRoZSB3b3JsZFxuLy8gICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgd29ybGQuZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4vLyAgICAgICAgICAgICBpZih3b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uaXNJbWFnZUxvYWRlZCkge1xuLy8gICAgICAgICAgICAgICAgIHdvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5kcmF3KGN0eCwgd29ybGQuY2FtZXJhKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgLy9SZW5kZXIgYWxsIHRoZSB3b3JsZC5idWxsZXRzIGF0IHRoZWlyIGxvY2F0aW9ucyBhbmQgcmVtb3ZlIHdvcmxkLmJ1bGxldHMgdGhhdCBhcmVuJ3QgbGl2ZVxuLy8gICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgd29ybGQuYnVsbGV0cy5sZW5ndGg7IGkrKykge1xuLy8gICAgICAgICAgICAgaWYod29ybGQuYnVsbGV0c1tpXS5pc0ltYWdlTG9hZGVkICYmIHdvcmxkLmJ1bGxldHNbaV0ubGl2ZSkge1xuLy8gICAgICAgICAgICAgICAgIHdvcmxkLmJ1bGxldHNbaV0uZHJhdyhjdHgsIHdvcmxkLmNhbWVyYSk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgLy9SZW5kZXIgYWxsIHRoZSBlbmVteSBwcm9qZWN0aWxlcyBqdXN0IGxpa2UgYnVsbGV0c1xuLy8gICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgd29ybGQuZW5lbXlQcm9qZWN0aWxlcy5sZW5ndGg7IGkrKykge1xuLy8gICAgICAgICAgICAgaWYod29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5pc0ltYWdlTG9hZGVkICYmIHdvcmxkLmVuZW15UHJvamVjdGlsZXNbaV0ubGl2ZSkge1xuLy8gICAgICAgICAgICAgICAgIHdvcmxkLmVuZW15UHJvamVjdGlsZXNbaV0uZHJhdyhjdHgsIHdvcmxkLmNhbWVyYSk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgIGlmKHdvcmxkLnBsYXllci5pc0ltYWdlTG9hZGVkKSB7XG4vLyAgICAgICAgICAgICB3b3JsZC5wbGF5ZXIuZHJhdyhjdHgsIHdvcmxkLmNhbWVyYSk7XG4vLyAgICAgICAgICAgICBjdHguZm9udCA9IFwiNDhweCBzYW5zLXNlcmlmXCI7XG4vLyAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbi8vICAgICAgICAgICAgIGN0eC5maWxsU3R5bGU9JyNGRkYnO1xuLy8gICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHdvcmxkLnBsYXllci5oZWFsdGggKyBcIiBIUFwiLCBjYW52YXMud2lkdGgvMiAtIDI5MCwgNTApO1xuLy8gICAgICAgICAgICAgY3R4LnN0cm9rZVRleHQod29ybGQucGxheWVyLmhlYWx0aCArIFwiIEhQXCIsIGNhbnZhcy53aWR0aC8yIC0gMjkwLCA1MCk7XG4vLyAgICAgICAgICAgICBjdHguZmlsbFRleHQoXCJXYXZlIFwiICsgd29ybGQud2F2ZSwgY2FudmFzLndpZHRoLzIsIDUwKTtcbi8vICAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KFwiV2F2ZSBcIiArIHdvcmxkLndhdmUsIGNhbnZhcy53aWR0aC8yLCA1MCk7XG4vLyAgICAgICAgICAgICBjdHguZmlsbFRleHQod29ybGQuZW5lbWllcy5sZW5ndGggKyBcIiBFbmVtaWVzIExlZnRcIiwgY2FudmFzLndpZHRoLzIgKyAzNTAsIDUwKTtcbi8vICAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KHdvcmxkLmVuZW1pZXMubGVuZ3RoICsgXCIgRW5lbWllcyBMZWZ0XCIsIGNhbnZhcy53aWR0aC8yICsgMzUwLCA1MCk7XG4vLyAgICAgICAgICAgICAvL1RoaXMgdGV4dCBkaXNwbGF5cyB0aGUgYWN0aXZlIHdlYXBvbiB0byB0aGUgcGxheWVyIChjb3VsZCBiZSBwb3NpdGlvbmVkIGJldHRlciBsYXRlcilcbi8vICAgICAgICAgICAgIGN0eC5mb250ID0gXCI0OHB4IHNhbnMtc2VyaWZcIjtcbi8vICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuLy8gICAgICAgICAgICAgY3R4LmZpbGxTdHlsZT0nI0ZGRic7XG4vLyAgICAgICAgICAgICBjdHguZmlsbFRleHQoJ0FjdGl2ZSBXZWFwb246ICcgKyB3b3JsZC5wbGF5ZXIuaW52ZW50b3J5W3dvcmxkLnBsYXllci5hY3RpdmVfaW5kZXhdLm5hbWUsIGNhbnZhcy53aWR0aC8yLCAxMjUpO1xuLy8gICAgICAgICAgICAgY3R4LnN0cm9rZVRleHQoJ0FjdGl2ZSBXZWFwb246ICcgKyB3b3JsZC5wbGF5ZXIuaW52ZW50b3J5W3dvcmxkLnBsYXllci5hY3RpdmVfaW5kZXhdLm5hbWUsIGNhbnZhcy53aWR0aC8yLCAxMjUpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gICAgIGN0eC5kcmF3SW1hZ2UoY3Vyc29yLmltYWdlLCBtb3VzZVswXSAtIGN1cnNvci5pbWFnZS53aWR0aC8yLCBtb3VzZVsxXSAtIGN1cnNvci5pbWFnZS5oZWlnaHQvMik7XG4vLyB9O1xuXG4vLyBUaGUgbWFpbiBnYW1lIGxvb3Bcbi8vIENyZWF0ZSB0aGUgY2FudmFzXG5sZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbmxldCBnYW1lID0gbmV3IEdhbWUoY2FudmFzLCBkb2N1bWVudC5ib2R5KTtcblxubGV0IG1haW4gPSAoKSA9PiB7XG4gICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgbGV0IGRlbHRhID0gbm93IC0gdGhlbjtcblxuICAgIGdhbWUudXBkYXRlKGRlbHRhIC8gMTAwMCk7XG4gICAgZ2FtZS5kcmF3KCk7XG5cbiAgICB0aGVuID0gbm93O1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW4pO1xufTtcblxuLy8gQ3Jvc3MtYnJvd3NlciBzdXBwb3J0IGZvciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZTtcblxubGV0IHRoZW4gPSBEYXRlLm5vdygpO1xubWFpbigpO1xuIiwiLypcclxuICBTb3VyY2VzOlxyXG4gIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvZ2ZjYXJ2L1FLZ0hzL1xyXG4qL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBDYW1lcmEgY2xhc3MgaXMgdXNlZCB0byBmb2xsb3cgdGhlIHBsYXllcidzIG1vdmVtZW50LlxyXG4gKi9cclxuY2xhc3MgQ2FtZXJhIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBDYW1lcmEuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgQ2FtZXJhLlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIENhbWVyYS5cclxuICAgICAqIEBwYXJhbSBjYW52YXNXaWR0aCBUaGUgd2lkdGggb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjYW52YXNIZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIHdvcmxkV2lkdGggVGhlIHdpZHRoIG9mIHRoZSB3b3JsZC5cclxuICAgICAqIEBwYXJhbSB3b3JsZEhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSB3b3JsZC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCwgd29ybGRXaWR0aCwgd29ybGRIZWlnaHQpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy54RGVhZFpvbmUgPSAwO1xyXG4gICAgICAgIHRoaXMueURlYWRab25lID0gMDtcclxuICAgICAgICB0aGlzLndpZHRoID0gY2FudmFzV2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBjYW52YXNIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy53b3JsZFdpZHRoID0gd29ybGRXaWR0aDtcclxuICAgICAgICB0aGlzLndvcmxkSGVpZ2h0ID0gd29ybGRIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gc2V0IHdobyB0aGUgY2FtZXJhIGlzIGZvbGxvd2luZy5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciB0aGF0IHRoZSBjYW1lcmEgc2hvdWxkIGZvbGxvdy5cclxuICAgICAqIEBwYXJhbSB4RGVhZFpvbmVcclxuICAgICAqIEBwYXJhbSB5RGVhZFpvbmVcclxuICAgICAqL1xyXG4gICAgZm9sbG93KHBsYXllciwgeERlYWRab25lLCB5RGVhZFpvbmUpIHtcclxuICAgICAgICB0aGlzLmZvbGxvd2luZyA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLnhEZWFkWm9uZSA9IHhEZWFkWm9uZTtcclxuICAgICAgICB0aGlzLnlEZWFkWm9uZSA9IHlEZWFkWm9uZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyB0aGUgY2FtZXJhJ3MgeCBhbmQgeSBwb3NpdGlvbi5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZm9sbG93aW5nICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5mb2xsb3dpbmcueCAtIHRoaXMueCArIHRoaXMueERlYWRab25lID4gdGhpcy53aWR0aClcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuZm9sbG93aW5nLnggLSAodGhpcy53aWR0aCAtIHRoaXMueERlYWRab25lKTtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmZvbGxvd2luZy54IC0gdGhpcy54RGVhZFpvbmUgPCB0aGlzLngpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmZvbGxvd2luZy54IC0gdGhpcy54RGVhZFpvbmU7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZm9sbG93aW5nLnkgLSB0aGlzLnkgKyB0aGlzLnlEZWFkWm9uZSA+IHRoaXMuaGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5mb2xsb3dpbmcueSAtICh0aGlzLmhlaWdodCAtIHRoaXMueURlYWRab25lKTtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmZvbGxvd2luZy55IC0gdGhpcy55RGVhZFpvbmUgPCB0aGlzLnkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmZvbGxvd2luZy55IC0gdGhpcy55RGVhZFpvbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMueCA8IDApXHJcbiAgICAgICAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgICAgaWYodGhpcy55IDwgMClcclxuICAgICAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICBpZih0aGlzLnggKyB0aGlzLndpZHRoID4gdGhpcy53b3JsZFdpZHRoKVxyXG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLndvcmxkV2lkdGggLSB0aGlzLndpZHRoO1xyXG4gICAgICAgIGlmKHRoaXMueSArIHRoaXMuaGVpZ2h0ID4gdGhpcy53b3JsZEhlaWdodClcclxuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy53b3JsZEhlaWdodCAtIHRoaXMuaGVpZ2h0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYW1lcmE7IiwiaW1wb3J0IFBpc3RvbCBmcm9tICcuLi9XZWFwb25zL1Bpc3RvbC5qcydcbmltcG9ydCBTbmlwZXIgZnJvbSAnLi4vV2VhcG9ucy9TbmlwZXIuanMnXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XG5cbmNsYXNzIFBsYXllciB7XG4gIC8vdGhpcy54ID0geCBwb3NpdGlvblxuICAvL3RoaXMueSA9IHkgcG9zaXRpb25cbiAgLy90aGlzLmhlYWx0aCA9IHBsYXllcidzIGxpZmVcbiAgLy90aGlzLnNwZWVkID0gcGxheWVyJ3MgbW92ZXNwZWVkXG4gIC8vdGhpcy5sb2FkSW1hZ2UoKSBpcyBhIGZ1bmN0aW9uIHRvIGF0dGFjaCB0aGUgaW1hZ2UgdG8gdGhlIHBsYXllci5cbiAgLy9UaGUgcGxheWVyIGhhcyBhbiBhcnJheSB0byBob2xkIGhpcyBpdGVtcyBhbmQgaGUgd2lsbCBzdGFydCB3aXRoIGEgcGlzdG9sIGFuZCBzbmlwZXIgdGhpcyB3ZWVrIGZvciBlYXN5IHRlc3RpbmdcbiAgLy9OZXh0IHdlZWsgaXRlbXMgd2lsbCBiZSBwaWNrZWQgdXAgYnkgd2Fsa2luZyBvdmVyIHRoZW0gYW5kIGFzIHN1Y2ggdGhlcmUgd2lsbCBuZWVkIHRvIGJlIGFuIGFkZEl0ZW0gZnVuY3Rpb25cbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgdGhpcy54ID0geDtcbiAgICAgIHRoaXMueSA9IHk7XG4gICAgICB0aGlzLmhlYWx0aCA9IDEwMDtcbiAgICAgIHRoaXMuc3BlZWQgPSAyNTY7XG4gICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgICAgbGV0IHN0YXJ0X3Bpc3RvbCA9IG5ldyBQaXN0b2woKTtcbiAgICAgIGxldCBzdGFydF9zbmlwZXIgPSBuZXcgU25pcGVyKCk7XG4gICAgICB0aGlzLmludmVudG9yeSA9IFtzdGFydF9waXN0b2wsIHN0YXJ0X3NuaXBlcl07XG4gICAgICB0aGlzLmFjdGl2ZV9pbmRleCA9IDA7XG4gIH1cblxuICAgIGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KGVudmlyb25tZW50T2JqZWN0cykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKFV0aWwuaXNDb2xsaXNpb24oZW52aXJvbm1lbnRPYmplY3RzW2ldLCB0aGlzKSAmJiBlbnZpcm9ubWVudE9iamVjdHNbaV0uaXNCbG9ja2luZylcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICBsb2FkSW1hZ2UoKSB7XG4gICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcbiAgICAgIH07XG4gICAgICB0aGlzLmltYWdlLnNyYyA9IFwiR3JhcGhpY3MvUGxheWVyLnBuZ1wiO1xuICB9XG4gICAgLy9TdGlsbCBub3QgdXNlZCB5ZXQsIHNob3VsZCBiZSBtb3ZlZCB0byBlYWNoIHdlYXBvbiBvciBzb21ldGhpbmdcbiAgICAvKnNob290KCkge1xuICAgICAgdGhpcy5zaG9vdENvb2xkb3duICs9IDEwO1xuICAgIH0qL1xuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiLypcclxuICBTb3VyY2VzOlxyXG4gIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvR2FtZXMvVGVjaG5pcXVlcy8yRF9jb2xsaXNpb25fZGV0ZWN0aW9uXHJcbiAgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDk1OTk3NS9nZW5lcmF0ZS1yYW5kb20tbnVtYmVyLWJldHdlZW4tdHdvLW51bWJlcnMtaW4tamF2YXNjcmlwdFxyXG4qL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBVdGlsIGNsYXNzIGNvbnRhaW5zIHZhcmlvdXMgdXRpbGl0eSBmdW5jdGlvbnMuXHJcbiAqL1xyXG5jbGFzcyBVdGlsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBpc0NvbGxpc2lvbiBtZXRob2QgY2hlY2tzIGlmIHRoZXJlIGlzIGEgY29sbGlzaW9uIGJldHdlZW4gdGhlIHR3byBpbnB1dHRlZCByZWN0YW5nbGVzLiBUaGlzIGFsZ29yaXRobSBvbmx5XHJcbiAgICAgKiB3b3JrcyB3aXRoIGF4aXMtYWxpZ25lZCByZWN0YW5nbGVzLlxyXG4gICAgICogQHBhcmFtIHJlY3RhbmdsZTEgVGhlIGZpcnN0IHJlY3RhbmdsZS5cclxuICAgICAqIEBwYXJhbSByZWN0YW5nbGUyIFRoZSBzZWNvbmQgcmVjdGFuZ2xlLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgdGhlcmUgZXhpc3RzIGEgY29sbGlzaW9uIGJldHdlZW4gdGhlIHR3byBpbnB1dHRlZCByZWN0YW5nbGVzLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNDb2xsaXNpb24ocmVjdGFuZ2xlMSwgcmVjdGFuZ2xlMikge1xyXG4gICAgICAgIGlmKHJlY3RhbmdsZTEueCA8IHJlY3RhbmdsZTIueCArIHJlY3RhbmdsZTIud2lkdGggJiZcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMS54ICsgcmVjdGFuZ2xlMS53aWR0aCA+IHJlY3RhbmdsZTIueCAmJlxyXG4gICAgICAgICAgICByZWN0YW5nbGUxLnkgPCByZWN0YW5nbGUyLnkgKyByZWN0YW5nbGUyLmhlaWdodCAmJlxyXG4gICAgICAgICAgICByZWN0YW5nbGUxLnkgKyByZWN0YW5nbGUxLmhlaWdodCA+IHJlY3RhbmdsZTIueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyBpZiB0aGVyZSBhcmUgYW55IGNvbGxpc2lvbnMgYmV0d2VlbiB0aGUgdHdvIGFycmF5cy4gVGhpcyBhbGdvcml0aG0gb25seSB3b3JrcyB3aXRoXHJcbiAgICAgKiBheGlzLWFsaWduZWQgcmVjdGFuZ2xlcy5cclxuICAgICAqIEBwYXJhbSBhcnJheTEgQW4gYXJyYXkgb2YgcmVjdGFuZ2xlcy5cclxuICAgICAqIEBwYXJhbSBhcnJheTIgQW4gYXJyYXkgb2YgcmVjdGFuZ2xlcy5cclxuICAgICAqIEByZXR1cm5zIHtpbnRlZ2VyfSAtMSBpZiB0aGVyZSBhcmUgbm8gY29sbGlzaW9ucyBvciB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGFycmF5IGlmIHRoZXJlIGlzLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXJlQW55Q29sbGlzaW9ucyhhcnJheTEsIGFycmF5Mikge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcnJheTEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGFycmF5Mi5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc0NvbGxpc2lvbihhcnJheTFbaV0sIGFycmF5MltqXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgcmFuZG9tIG51bWJlciBpbiB0aGUgZ2l2ZW4gaW50ZXJ2YWwuXHJcbiAgICAgKiBAcGFyYW0gZnJvbVxyXG4gICAgICogQHBhcmFtIHRvXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmFuZG9tSW50RnJvbUludGVydmFsKGZyb20sIHRvKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0byAtIGZyb20gKyAxKSArIGZyb20pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFV0aWw7IiwiaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xuXG5jbGFzcyBCdWxsZXR7XG4gICAgY29uc3RydWN0b3IodmVsb2NpdHksIGRhbWFnZSwgeCwgeSwgZGVzdFgsIGRlc3RZLCBwZW5ldHJhdGVzKSB7XG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2ZWxvY2l0eTtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuZGVzdFggPSBkZXN0WDtcbiAgICAgICAgdGhpcy5kZXN0WSA9IGRlc3RZO1xuICAgICAgICB0aGlzLmxpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzUGVuZXRyYXRpbmcgPSBwZW5ldHJhdGVzO1xuICAgICAgICBsZXQgZGlmZlggPSB0aGlzLmRlc3RYIC0gdGhpcy54O1xuICAgICAgICBsZXQgZGlmZlkgPSB0aGlzLmRlc3RZIC0gdGhpcy55O1xuICAgICAgICAvL1RoaXMgbG9naWMgZmluZHMgYSBjb2VmZmljaWVudCBmb3IgWCBhbmQgWSB0aGF0IGNhbiBiZSBhcHBsaWVkXG4gICAgICAgIC8vdG8gdGhlIG1vdmUgZnVuY3Rpb24gaW4gb3JkZXIgdG8gbW92ZSB0aGUgYnVsbGV0IGluIGEgc3RyYWlnaHQgbGluZVxuICAgICAgICAvL2RpcmVjdGx5IHRvIGl0cyBkZXN0aW5hdGlvbi5cbiAgICAgICAgaWYoTWF0aC5hYnMoZGlmZlgpID4gTWF0aC5hYnMoZGlmZlkpKSB7XG4gICAgICAgICAgICB0aGlzLmNvZWZmWCA9IGRpZmZYIC8gTWF0aC5hYnMoZGlmZlgpO1xuICAgICAgICAgICAgdGhpcy5jb2VmZlkgPSBkaWZmWSAvIE1hdGguYWJzKGRpZmZYKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29lZmZZID0gZGlmZlkgLyBNYXRoLmFicyhkaWZmWSk7XG4gICAgICAgICAgICB0aGlzLmNvZWZmWCA9IGRpZmZYIC8gTWF0aC5hYnMoZGlmZlkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxvYWRJbWFnZSh1cmwpIHtcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcbiAgICB9XG4gICAgLy9Nb3ZlcyB0aGUgYnVsbGV0IGZyb20gaXRzIHN0YXJ0aW5nIHBvaW50ICh3aGljaCB3aWxsIGJlIHRoZSBwbGF5ZXIncyBsb2NhdGlvbilcbiAgICAvL3RvIGl0cyBkZXN0aW5hdGlvbiAod2hpY2ggd2lsbCBiZSB0aGUgY3Vyc29yIGxvY2F0aW9uIHdoZW4gdGhlIGJ1bGxldCBpcyBjcmVhdGVkKS5cbiAgICAvL0VhY2ggdGltZSBtb3ZlIGlzIGNhbGxlZCBpdCBpcyBjaGVja2VkIGlmIHRoZSBidWxsZXQgaGl0cyBhbnl0aGluZywgaWYgaXQgZG9lcyB0aGVcbiAgICAvL2hpdFNvbWV0aGluZyBtZXRob2Qgd2lsbCBjYWxsIGEgZGFtYWdlIGZ1bmN0aW9uIGFuZCB0aGUgZGFtYWdlIHdpbGwgYmUgYXBwbGllZCwgc29cbiAgICAvL3RoaXMgZnVuY3Rpb24gc2V0cyB0aGlzLmxpdmUgPSBmYWxzZSBtZWFuaW5nIHRoZSBidWxsZXQgaXMgbm8gbG9uZ2VyIGxpdmUuXG4gICAgLy9JZiB0aGUgYnVsbGV0IGlzUGVuZXRyYXRpbmcgdGhhdCBtZWFucyBpdCB3aWxsIG5vdCBiZSBzZXQgdG8gJ2RlYWQnIHVwb24gYSBjb2xsaXNpb24gd2l0aCBzb21ldGhpbmdcbiAgICAvL1RoaXMgYWxsb3dzIHBlbmV0cmF0aW5nIGJ1bGxldHMgdG8gdHJhdmVsIHRocm91Z2ggbXVsdGlwbGUgdGFyZ2V0cyBhbmQgdGhyb3VnaCB3b3JsZCBvYmplY3RzLlxuICAgIG1vdmUobW9kaWZpZXIsIGVudmlyb25tZW50T2JqZWN0cywgZW5lbWllcyl7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyKnRoaXMuY29lZmZYO1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcip0aGlzLmNvZWZmWTtcbiAgICAgICAgaWYodGhpcy5oaXRTb21ldGhpbmcoZW52aXJvbm1lbnRPYmplY3RzLCBlbmVtaWVzKSAmJiB0aGlzLmlzUGVuZXRyYXRpbmcgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMueCA8IDAgfHwgdGhpcy54ID4gMTAwMDAgfHwgdGhpcy55IDwgMCB8fCB0aGlzLnkgPiA1NjI1KSB7XG4gICAgICAgICAgICB0aGlzLmxpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIC8vQ2hlY2tzIGlmIHRoZSBidWxsZXQgaGl0IGFueSBvZiBvdXIgb2JqZWN0cyB0aGF0IGNhbiBiZSBoaXQsIGlmIHNvIHRoYXQgb2JqZWN0IGxvc2VzIEhQXG4gICAgLy9hbmQgdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB0byBpbmRpY2F0ZSB0aGF0IHRoZSBvYmplY3Qgd2FzIGhpdC4gSWYgbm90LCBmYWxzZSBpcyByZXR1cm5lZFxuICAgIC8vYW5kIG5vdGhpbmcgaXMgZG9uZS5cbiAgICBkYW1hZ2VFbmVteShlbmVteU9iamVjdCkge1xuICAgICAgICBlbmVteU9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XG4gICAgfVxuXG4gICAgZGFtYWdlRW52aXJvbm1lbnQoZW52aXJvbm1lbnRPYmplY3Qpe1xuICAgICAgICBlbnZpcm9ubWVudE9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XG4gICAgfVxuICAgIC8vQ2hlY2tzIGlmIHdlIGhpdCBhbiBlbnZpcm9ubWVudCBvYmplY3QgdGhlbiBjaGVja3MgaWYgd2UgaGl0IGFuIGVuZW15LiBpbiBlaXRoZXIgY2FzZSBpdCBjYWxscyB0aGVcbiAgICAvL2NvcnJlc3BvbmRpbmcgZGFtYWdlIGZ1bmN0aW9uIGFuZCB0aGVuIHJldHVybnMgdHJ1ZSB0byBpbmRpY2F0ZSB0aGF0IHNvbWV0aGluZyB3YXMgaGl0LCB3aGljaCB0ZWxscyBtb3ZlIHRvIHNldCB0aGVcbiAgICAvL2J1bGxldCdzIGxpdmUgdmFsdWUgYWNjb3JkaW5nbHlcbiAgICBoaXRTb21ldGhpbmcoZW52aXJvbm1lbnRPYmplY3RzLCBlbmVtaWVzKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgZW52aXJvbm1lbnRPYmplY3RzW2ldKSAmJiBlbnZpcm9ubWVudE9iamVjdHNbaV0uaXNCbG9ja2luZykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlRW52aXJvbm1lbnQoZW52aXJvbm1lbnRPYmplY3RzW2ldKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZW5lbWllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbmVtaWVzW2ldKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VFbmVteShlbmVtaWVzW2ldKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ7XG4iLCJpbXBvcnQgQnVsbGV0IGZyb20gJy4vQnVsbGV0LmpzJztcclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG5cclxuLy9UaGUgNTAgY2FsaWJlciB3aWxsIHBlbmV0cmF0ZSB0aHJvdWdoIG9iamVjdHMgYW5kIG9ubHkgc3RvcHMgYmVpbmcgbGl2ZVxyXG4vL29uY2UgaXQgZXhpdHMgdGhlIGNhbnZhcywgc28gaXRzIGRhbWFnZSBpcyBzZXQgdG8gYSBzbWFsbCBudW1iZXIgYXMgaXQgZGVhbHNcclxuLy9kYW1hZ2UgZHVyaW5nIGVhY2ggZnJhbWUgYXMgaXQgcGVuZXRyYXRlcyB0aGUgb2JqZWN0IG9yIGVuZW15XHJcbmNsYXNzIEJ1bGxldDUwY2FsIGV4dGVuZHMgQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGRlc3RYLCBkZXN0WSkge1xyXG4gICAgICAgIHN1cGVyKDI1MDAsIDUsIHgsIHksIGRlc3RYLCBkZXN0WSwgdHJ1ZSk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvYnVsbGV0My5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1bGxldDUwY2FsO1xyXG4iLCJpbXBvcnQgQnVsbGV0IGZyb20gJy4vQnVsbGV0LmpzJztcclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG4vL3RoZSA5bW0gYnVsbGV0IGlzIGEgc2ltcGxlIHBpc3RvbCBidWxsZXQgdGhhdCB3aWxsIGJlIGluIHRoZVxyXG4vL3VzZXIncyBzdGFydGluZyB3ZWFwb24uIGl0IGRvZXMgbWluaW1hbCBkYW1hZ2UgYW5kIG1vdmVzIGF0IGEgc2xvdyBzcGVlZC5cclxuLy90aGUgdmFsdWUgb2YgaXNQZW5ldHJhdGluZyBpcyBzZXQgdG8gZmFsc2UgdG8gaW5kaWNhdGUgdGhlIGJ1bGxldCBzaG91bGRcclxuLy9ub3QgYmUgbGl2ZSBhZnRlciBpdCBjb2xsaWRlcyB3aXRoIHNvbWV0aGluZyBhbmQgZG9lcyBpdHMgZGFtYWdlLlxyXG4vL2luIHRoZSBmdXR1cmUgdGhlIGJ1bGxldCB3aWxsIGhhdmUgYSBtYXhpbXVtIHJhbmdlL2xpdmUgdGltZSB0b1xyXG4vL2xpbWl0IGl0cyB1c2VmdWxuZXNzIG1vcmUuXHJcbmNsYXNzIEJ1bGxldDltbSBleHRlbmRzIEJ1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBkZXN0WCwgZGVzdFkpIHtcclxuICAgICAgICBzdXBlcigxMDAwLCAxMCwgeCwgeSwgZGVzdFgsIGRlc3RZLCBmYWxzZSk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvYnVsbGV0My5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1bGxldDltbTtcclxuIiwiLy9UaGUgc25pcGVyIGlzIG9ubHkgY3VycmVudGx5IHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSB0eXBlIG9mIGJ1bGxldCB0byBiZSBnZW5lcmF0ZWRcbi8vaW4gbWFpbi5qcycgZXZlbnQgaGFuZGxlciBmb3IgY2xpY2tzXG4vL0luIHRoZSBmdXR1cmUgaXQgd2lsbCBjb250cm9sIGZpcmUgcmF0ZSBhbmQgdGhlIGFtbW8gY2FwYWNpdHkuXG5pbXBvcnQgV2VhcG9uIGZyb20gJy4vV2VhcG9uLmpzJztcbmNsYXNzIFBpc3RvbCBleHRlbmRzIFdlYXBvbntcbiAgY29uc3RydWN0b3IoKXtcbiAgICBzdXBlcigxNSwgOTApO1xuICAgIHRoaXMubmFtZSA9IFwiUGlzdG9sXCI7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFBpc3RvbDtcbiIsIi8vVGhlIHNuaXBlciBpcyBvbmx5IGN1cnJlbnRseSB1c2VkIHRvIGRldGVybWluZSB0aGUgdHlwZSBvZiBidWxsZXQgdG8gYmUgZ2VuZXJhdGVkXHJcbi8vaW4gbWFpbi5qcycgZXZlbnQgaGFuZGxlciBmb3IgY2xpY2tzXHJcbi8vSW4gdGhlIGZ1dHVyZSBpdCB3aWxsIGNvbnRyb2wgZmlyZSByYXRlIGFuZCB0aGUgYW1tbyBjYXBhY2l0eS5cclxuaW1wb3J0IFdlYXBvbiBmcm9tICcuL1dlYXBvbi5qcyc7XHJcbmNsYXNzIFNuaXBlciBleHRlbmRzIFdlYXBvbntcclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgc3VwZXIoNSwgMzApO1xyXG4gICAgdGhpcy5uYW1lID0gXCJTbmlwZXJcIjtcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgU25pcGVyO1xyXG4iLCIvL2NsaXBTaXplIGFuZCBhbW1vIHdpbGwgYmUgdXNlZCBhcyBleHBlY3RlZCBuZXh0IHdlZWtcbi8vYXV0b21hdGljIHdpbGwgYmUgdXNlZCBhcyBhIGJvb2xlYW4gZm9yIHdoZXRoZXIgb3Igbm90XG4vL2hvbGRpbmcgY2xpY2sgc2hvdWxkIGNvbnRpbnVvdXNseSBmaXJlLlxuLy9UaGUgbmFtZSBmaWVsZCBpcyB1c2VkIGZvciB0aGUgSFVEIGRpc3BsYXlpbmcgdGhlIGFjdGl2ZSB3ZWFwb24uXG5jbGFzcyBXZWFwb24ge1xuICBjb25zdHJ1Y3RvcihjbGlwU2l6ZSwgbWF4QW1tbykge1xuICAgICAgdGhpcy5jbGlwU2l6ZSA9IGNsaXBTaXplO1xuICAgICAgdGhpcy5tYXhBbW1vID0gbWF4QW1tbztcbiAgICAgIC8vdGhpcy5hdXRvbWF0aWMgPSBhdXRvbWF0aWM7XG4gICAgICAvL3RoaXMuYnVsbGV0ID0gYnVsbGV0O1xuICAgICAgdGhpcy5uYW1lID0gJyc7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFdlYXBvbjtcbiJdfQ==
