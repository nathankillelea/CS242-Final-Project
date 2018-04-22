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

},{"../Utilities/Util.js":22}],3:[function(require,module,exports){
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

},{"../Utilities/Util.js":22}],4:[function(require,module,exports){
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

var _GroundWeapon = require('../GroundWeapons/GroundWeapon.js');

var _GroundWeapon2 = _interopRequireDefault(_GroundWeapon);

var _GroundAssaultRifle = require('../GroundWeapons/GroundAssaultRifle.js');

var _GroundAssaultRifle2 = _interopRequireDefault(_GroundAssaultRifle);

var _GroundSniper = require('../GroundWeapons/GroundSniper.js');

var _GroundSniper2 = _interopRequireDefault(_GroundSniper);

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
                            wep.cooldown += 300;
                        }
                    } else if (wep instanceof _Sniper2.default) {
                        if (wep.cooldown <= 0) {
                            this.world.bullets.push(new _Bullet50cal2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y, mouse[0] + this.world.camera.x, mouse[1] + this.world.camera.y));
                            wep.sound.play();
                            wep.sound.currentTime = 0;
                            wep.cooldown += 1200;
                        }
                    } else if (wep instanceof _AssaultRifle2.default) {
                        if (wep.cooldown <= 0) {
                            this.world.bullets.push(new _Bullet2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y, mouse[0] + this.world.camera.x, mouse[1] + this.world.camera.y));
                            wep.sound.play();
                            wep.sound.currentTime = 0;
                            wep.cooldown += 100;
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
                for (var _i6 = 0; _i6 < this.world.groundWeapons.length; _i6++) {
                    if (this.world.groundWeapons[_i6].isImageLoaded) {
                        this.world.groundWeapons[_i6].draw(this.ctx, this.world.camera);
                    }
                }
                for (var _i7 = 0; _i7 < this.world.bullets.length; _i7++) {
                    if (this.world.bullets[_i7].isImageLoaded && this.world.bullets[_i7].live) {
                        this.world.bullets[_i7].draw(this.ctx, this.world.camera);
                    }
                }
                for (var _i8 = 0; _i8 < this.world.enemyProjectiles.length; _i8++) {
                    if (this.world.enemyProjectiles[_i8].isImageLoaded && this.world.enemyProjectiles[_i8].live) {
                        this.world.enemyProjectiles[_i8].draw(this.ctx, this.world.camera);
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
                    for (var _i9 = 0; _i9 < this.world.environmentObjects.length; _i9++) {
                        if (this.world.environmentObjects[_i9].isImageLoaded) {
                            var _xPercent = (this.world.environmentObjects[_i9].x + this.world.environmentObjects[_i9].width / 2) / this.world.width;
                            var _yPercent = (this.world.environmentObjects[_i9].y + this.world.environmentObjects[_i9].height / 2) / this.world.height;
                            var _xRelative = _xPercent * 400;
                            var _yRelative = _yPercent * 225;
                            //ctx.drawImage(this.world.environmentObjects[i].image, (this.canvas.width - 425) + xRelative + this.world.environmentObjects[i].width/2, 25 + yRelative + this.world.environmentObjects[i].height/2, this.world.environmentObjects[i].width/25, this.world.environmentObjects[i].height/25);
                            this.ctx.fillStyle = '#808080';
                            this.ctx.beginPath();
                            this.ctx.arc(this.canvas.width - 425 + _xRelative, 25 + _yRelative, 2.5, 0, 2 * Math.PI);
                            this.ctx.fill();
                        }
                    }
                    for (var _i10 = 0; _i10 < this.world.enemies.length; _i10++) {
                        if (this.world.enemies[_i10].isImageLoaded) {
                            var _xPercent2 = (this.world.enemies[_i10].x + this.world.enemies[_i10].width / 2) / this.world.width;
                            var _yPercent2 = (this.world.enemies[_i10].y + this.world.enemies[_i10].height / 2) / this.world.height;
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

},{"../Cursor.js":1,"../Enemies/EnemyProjectile":3,"../Enemies/MiniBoss":5,"../Enemies/ProjectileEnemy":6,"../EnvironmentObjects/Bush":9,"../EnvironmentObjects/Crate":10,"../EnvironmentObjects/Rock":12,"../GroundWeapons/GroundAssaultRifle.js":16,"../GroundWeapons/GroundSniper.js":17,"../GroundWeapons/GroundWeapon.js":18,"../Weapons/AssaultRifle":23,"../Weapons/Bullet50cal":25,"../Weapons/Bullet556":26,"../Weapons/Bullet9mm":27,"../Weapons/Pistol":28,"../Weapons/Sniper":29,"./Controller.js":13,"./World.js":15}],15:[function(require,module,exports){
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

var _GroundWeapon = require("../GroundWeapons/GroundWeapon.js");

var _GroundWeapon2 = _interopRequireDefault(_GroundWeapon);

var _GroundAssaultRifle = require("../GroundWeapons/GroundAssaultRifle.js");

var _GroundAssaultRifle2 = _interopRequireDefault(_GroundAssaultRifle);

var _GroundSniper = require("../GroundWeapons/GroundSniper.js");

var _GroundSniper2 = _interopRequireDefault(_GroundSniper);

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
            this.groundWeapons = [];
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
            var sniperCap = 10;
            var assaultRifleCap = 20;

            for (var i = 0; i < crateCap; i++) {
                this.environmentObjects.push(new _Crate2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i = 0; _i < bushCap; _i++) {
                this.environmentObjects.push(new _Bush2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i2 = 0; _i2 < rockCap; _i2++) {
                this.environmentObjects.push(new _Rock2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i3 = 0; _i3 < sniperCap; _i3++) {
                this.groundWeapons.push(new _GroundSniper2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i4 = 0; _i4 < assaultRifleCap; _i4++) {
                this.groundWeapons.push(new _GroundAssaultRifle2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }var collisionFlag = true;
            while (collisionFlag === true) {
                var _i5 = _Util2.default.areAnyCollisionsInSameArray(this.environmentObjects);
                if (_i5 === -1) collisionFlag = false;else this.environmentObjects[_i5].setPosition(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375));
            }
            //Now we check if the weapons are hitting eachother
            var selfCollisionFlag = true;
            while (selfCollisionFlag) {
                var _i6 = _Util2.default.areAnyCollisionsInSameArray(this.groundWeapons);
                if (_i6 === -1) selfCollisionFlag = false;else {
                    this.groundWeapons[_i6].setPosition(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375));
                }
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
            }for (var _i7 = 0; _i7 < regularEnemyCap; _i7++) {
                this.enemies.push(new _RegularEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i8 = 0; _i8 < tankEnemyCap; _i8++) {
                this.enemies.push(new _TankEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i9 = 0; _i9 < projectileEnemyCap; _i9++) {
                this.enemies.push(new _ProjectileEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i10 = 0; _i10 < miniBossCap; _i10++) {
                this.enemies.push(new _MiniBoss2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }var collisionFlag = true;
            while (collisionFlag === true) {
                var _i11 = _Util2.default.areAnyCollisions(this.enemies, this.environmentObjects);
                if (_i11 === -1) collisionFlag = false;else this.enemies[_i11].setPosition(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375));
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

},{"../Enemies/LightEnemy":4,"../Enemies/MiniBoss":5,"../Enemies/ProjectileEnemy":6,"../Enemies/RegularEnemy":7,"../Enemies/TankEnemy":8,"../EnvironmentObjects/Bush":9,"../EnvironmentObjects/Crate":10,"../EnvironmentObjects/Rock":12,"../GroundWeapons/GroundAssaultRifle.js":16,"../GroundWeapons/GroundSniper.js":17,"../GroundWeapons/GroundWeapon.js":18,"../Players/Camera":20,"../Players/Player":21,"../Utilities/Util":22}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GroundWeapon2 = require('./GroundWeapon.js');

var _GroundWeapon3 = _interopRequireDefault(_GroundWeapon2);

var _Weapon = require('../Weapons/Weapon.js');

var _Weapon2 = _interopRequireDefault(_Weapon);

var _AssaultRifle = require('../Weapons/AssaultRifle.js');

var _AssaultRifle2 = _interopRequireDefault(_AssaultRifle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The Rock class extends the EnvironmentObject class. It is a blocking object with high health.
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

},{"../Weapons/AssaultRifle.js":23,"../Weapons/Weapon.js":30,"./GroundWeapon.js":18}],17:[function(require,module,exports){
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
 * The Rock class extends the EnvironmentObject class. It is a blocking object with high health.
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

},{"../Weapons/Sniper.js":29,"../Weapons/Weapon.js":30,"./GroundWeapon.js":18}],18:[function(require,module,exports){
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
        key: "draw",
        value: function draw(ctx, camera) {
            ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
        }
    }]);

    return GroundWeapon;
}();

exports.default = GroundWeapon;

},{}],19:[function(require,module,exports){
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

},{"./Game/Game.js":14}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{"../Utilities/Util.js":22,"../Weapons/AssaultRifle.js":23,"../Weapons/Pistol.js":28,"../Weapons/Sniper.js":29}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{"./Weapon.js":30}],24:[function(require,module,exports){
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

},{"../Utilities/Util.js":22}],25:[function(require,module,exports){
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

},{"../Utilities/Util.js":22,"./Bullet.js":24}],26:[function(require,module,exports){
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

},{"../Utilities/Util.js":22,"./Bullet.js":24}],27:[function(require,module,exports){
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

},{"../Utilities/Util.js":22,"./Bullet.js":24}],28:[function(require,module,exports){
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

},{"./Weapon.js":30}],29:[function(require,module,exports){
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

},{"./Weapon.js":30}],30:[function(require,module,exports){
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

},{}]},{},[19])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDdXJzb3IuanMiLCJFbmVtaWVzL0VuZW15LmpzIiwiRW5lbWllcy9FbmVteVByb2plY3RpbGUuanMiLCJFbmVtaWVzL0xpZ2h0RW5lbXkuanMiLCJFbmVtaWVzL01pbmlCb3NzLmpzIiwiRW5lbWllcy9Qcm9qZWN0aWxlRW5lbXkuanMiLCJFbmVtaWVzL1JlZ3VsYXJFbmVteS5qcyIsIkVuZW1pZXMvVGFua0VuZW15LmpzIiwiRW52aXJvbm1lbnRPYmplY3RzL0J1c2guanMiLCJFbnZpcm9ubWVudE9iamVjdHMvQ3JhdGUuanMiLCJFbnZpcm9ubWVudE9iamVjdHMvRW52aXJvbm1lbnRPYmplY3QuanMiLCJFbnZpcm9ubWVudE9iamVjdHMvUm9jay5qcyIsIkdhbWUvQ29udHJvbGxlci5qcyIsIkdhbWUvR2FtZS5qcyIsIkdhbWUvV29ybGQuanMiLCJHcm91bmRXZWFwb25zL0dyb3VuZEFzc2F1bHRSaWZsZS5qcyIsIkdyb3VuZFdlYXBvbnMvR3JvdW5kU25pcGVyLmpzIiwiR3JvdW5kV2VhcG9ucy9Hcm91bmRXZWFwb24uanMiLCJNYWluLmpzIiwiUGxheWVycy9DYW1lcmEuanMiLCJQbGF5ZXJzL1BsYXllci5qcyIsIlV0aWxpdGllcy9VdGlsLmpzIiwiV2VhcG9ucy9Bc3NhdWx0UmlmbGUuanMiLCJXZWFwb25zL0J1bGxldC5qcyIsIldlYXBvbnMvQnVsbGV0NTBjYWwuanMiLCJXZWFwb25zL0J1bGxldDU1Ni5qcyIsIldlYXBvbnMvQnVsbGV0OW1tLmpzIiwiV2VhcG9ucy9QaXN0b2wuanMiLCJXZWFwb25zL1NuaXBlci5qcyIsIldlYXBvbnMvV2VhcG9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtJQUNNLE07QUFDRixzQkFBYztBQUFBOztBQUNWLGFBQUssU0FBTDtBQUNIOzs7O29DQUVXO0FBQUE7O0FBQ1IsaUJB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QUNBOzs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU0sTTs7O0FBQ0Ysc0JBQWE7QUFBQTs7QUFBQSxvSEFDSCxFQURHLEVBQ0MsRUFERDs7QUFFVCxjQUFLLElBQUwsR0FBWSxRQUFaO0FBQ0EseUhBQXFCLHNCQUFyQjtBQUhTO0FBSVo7Ozs7O2tCQUdVLE07Ozs7Ozs7Ozs0ZUNiZjtBQUNBO0FBQ0E7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTSxNOzs7QUFDRixzQkFBYTtBQUFBOztBQUFBLG9IQUNILENBREcsRUFDQSxFQURBOztBQUVULGNBQUssSUFBTCxHQUFZLFFBQVo7QUFDQSx5SEFBcUIsc0JBQXJCO0FBSFM7QUFJWjs7Ozs7a0JBR1UsTTs7Ozs7Ozs7Ozs7OztBQ2JmO0FBQ0E7QUFDQTtBQUNBO0lBQ00sTTtBQUVGLG9CQUFZLFFBQVosRUFBc0IsT0FBdEIsRUFBK0I7QUFBQTs7QUFDM0IsYUFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsYUFBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLGFBQUssSUFBTCxHQUFZLEVBQVo7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDSDs7Ozt1Q0FDYyxHLEVBQUs7QUFBQTs7QUFDaEIsaUJBQUssYUFBTCxHQUFxQixLQUFyQjtBQUNBLGlCQUFLLEtBQUwsR0FBYSxJQUFJLEtBQUosRUFBYjtBQUNBLGlCQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLFlBQU07QUFDdEIsc0JBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNILGFBRkQ7QUFHQSxpQkFBSyxLQUFMLENBQVcsR0FBWCxHQUFpQixHQUFqQjtBQUNIOzs7Ozs7a0JBSVUsTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vSnVzdCBhIHBsdXMgY3Vyc29yIHRvIGJlIHJlbmRlcmVkIGF0IHRoZVxyXG4vL2N1cnNvcidzIGxvY2F0aW9uIGVhY2ggVXBkYXRlXHJcbi8vVGhlIGN1cnNvciBmb3IgdGhlIGVudGlyZSBIVE1MIGRvY3VtZW50IGlzIHR1cm5lZCBvZmYgdmlhIHN0eWxpbmcgb24gdGhlIGRvY3VtZW50LlxyXG5jbGFzcyBDdXJzb3Ige1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkSW1hZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBcIkdyYXBoaWNzL2Nyb3NzaGFpci5wbmdcIjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBDdXJzb3I7XHJcbiIsIi8qKlxyXG4gKiBTb3VyY2VzOlxyXG4gKiBodHRwczovL21lZGl1bS5jb20vQHl1cmliZXR0L2phdmFzY3JpcHQtYWJzdHJhY3QtbWV0aG9kLXdpdGgtZXM2LTVkYmVhNGIwMDAyN1xyXG4gKiBodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PUk1ZEFScEFQbE5rXHJcbiAqL1xyXG5cclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBFbmVteSBjbGFzcyBpcyB0aGUgcGFyZW50IGNsYXNzIGZvciBhbGwgb2YgdGhlIGVuZW1pZXMuXHJcbiAqL1xyXG5jbGFzcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gdmVsb2NpdHkgVGhlIHZlbG9jaXR5IG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSBoZWFsdGggVGhlIGhlYWx0aCBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gZGFtYWdlIFRoZSBkYW1hZ2Ugb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHBvaW50c09uS2lsbCBUaGUgcG9pbnRzIHJld2FyZGVkIGZvciBraWxsaW5nIHRoZSBFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgdmVsb2NpdHksIGhlYWx0aCwgZGFtYWdlLCBwb2ludHNPbktpbGwpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy5hbmdsZSA9IE1hdGguUEkvMjtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdmVsb2NpdHk7XHJcbiAgICAgICAgdGhpcy5oZWFsdGggPSBoZWFsdGg7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XHJcbiAgICAgICAgdGhpcy5wb2ludHNPbktpbGwgPSBwb2ludHNPbktpbGw7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tDb29sZG93biA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbG9hZEltYWdlIGZ1bmN0aW9uIHRha2VzIGluIGEgdXJsIGFuZCBsb2FkcyBpdCBhcyBhbiBJbWFnZS4gT25jZSB0aGUgaW1hZ2UgaXMgbG9hZGVkLCB0aGlzLmlzSW1hZ2VMb2FkZWQgaXNcclxuICAgICAqIHNldCB0byB0cnVlLiBUaGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgRW5lbXkgYXJlIHNldCB0byB0aGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgaW1hZ2UuXHJcbiAgICAgKiBAcGFyYW0gdXJsIFRoZSB1cmwgdGhhdCBzaG91bGQgYmUgbG9hZGVkLlxyXG4gICAgICovXHJcbiAgICBsb2FkSW1hZ2UodXJsKSB7XHJcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGF0dGFjayBmdW5jdGlvbiB0YWtlcyBpbiBhbiBvYmplY3QgYW5kIHJlbW92ZXMgdGhlIGFtb3VudCBvZiBkYW1hZ2UgdGhlIEVuZW15IGRlYWxzIGZyb20gdGhlaXIgaGVhbHRoLlxyXG4gICAgICogNTAwIGlzIGFkZGVkIHRvIHRoZSBhdHRhY2sgY29vbGRvd24gb2YgdGhlIGVuZW15IGFmdGVyIGFuIGF0dGFjay5cclxuICAgICAqIEBwYXJhbSBvYmplY3QgVGhlIG9iamVjdCB0aGF0IGlzIGJlaW5nIGF0dGFja2VkLlxyXG4gICAgICovXHJcbiAgICBhdHRhY2sob2JqZWN0KSB7XHJcbiAgICAgICAgb2JqZWN0LmhlYWx0aCAtPSB0aGlzLmRhbWFnZTtcclxuICAgICAgICB0aGlzLmF0dGFja0Nvb2xkb3duICs9IDUwMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1vdmVzIHRoZSBlbmVteSB0b3dhcmRzIHRoZSBwbGF5ZXIuXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIFRoZSBwbGF5ZXIgb2JqZWN0IHRvIG1vdmUgdG93YXJkcy5cclxuICAgICAqIEBwYXJhbSBtb2RpZmllciBUaGUgbW9kaWZpZXIgdG8gYmUgbXVsdGlwbGllZCBieSB0aGUgdmVsb2NpdHkuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3RzIEFuIGFycmF5IG9mIGVudmlyb25tZW50IG9iamVjdHMuXHJcbiAgICAgKi9cclxuICAgIG1vdmUocGxheWVyLCBtb2RpZmllciwgZW52aXJvbm1lbnRPYmplY3RzKSB7XHJcbiAgICAgICAgbGV0IGRpZmZYID0gcGxheWVyLnggLSB0aGlzLng7XHJcbiAgICAgICAgbGV0IGRpZmZZID0gcGxheWVyLnkgLSB0aGlzLnk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IE1hdGguc3FydChkaWZmWCAqIGRpZmZYICsgZGlmZlkgKiBkaWZmWSk7XHJcbiAgICAgICAgaWYobGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGRpZmZYIC89IGxlbmd0aDtcclxuICAgICAgICAgICAgZGlmZlkgLz0gbGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hbmdsZSA9IE1hdGguYXRhbjIoZGlmZlksIGRpZmZYKTtcclxuXHJcbiAgICAgICAgaWYoZGlmZlggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMueCArIHRoaXMud2lkdGggPD0gMTAwMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdChlbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54IC09IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihkaWZmWCA8IDApIHtcclxuICAgICAgICAgICAgaWYodGhpcy54ID49IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdChlbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGlmZlkgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMueSArIHRoaXMuaGVpZ2h0IDw9IDU2MjUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdChlbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55IC09IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihkaWZmWSA8IDApIHtcclxuICAgICAgICAgICAgaWYodGhpcy55ID49IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueSAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdChlbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgcGxheWVyKSAmJiB0aGlzLmF0dGFja0Nvb2xkb3duID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVhbHRoIGJlZm9yZSBhdHRhY2tcIiArIHBsYXllci5oZWFsdGgpO1xyXG4gICAgICAgICAgICB0aGlzLmF0dGFjayhwbGF5ZXIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlYWx0aCBhZnRlciBhdHRhY2tcIiArIHBsYXllci5oZWFsdGgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gc2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGVuZW15IGdpdmVuIHggYW5kIHkuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiB0byBiZSBzZXQuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiB0byBiZSBzZXQuXHJcbiAgICAgKi9cclxuICAgIHNldFBvc2l0aW9uKHgsIHkpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGEgaGVscGVyIGZ1bmN0aW9uIHVzZWQgYnkgdGhlIG1vdmUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIHRoZXJlIGlzIGEgY29sbGlzaW9uIGJldHdlZW4gYW5cclxuICAgICAqIGVudmlyb25tZW50IG9iamVjdCBhbmQgdGhlIGVuZW15LiBJZiB0aGVyZSBpcyBhIGNvbGxpc2lvbiwgdGhlIG9iamVjdCBpcyBhdHRhY2tlZC5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdHMgQW4gYXJyYXkgb2YgZW52aXJvbm1lbnQgb2JqZWN0cy5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIGEgY29sbGlzaW9uIGV4aXN0cy5cclxuICAgICAqL1xyXG4gICAgaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIGVudmlyb25tZW50T2JqZWN0c1tpXSkgJiYgZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzQmxvY2tpbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYXR0YWNrQ29vbGRvd24gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFjayhlbnZpcm9ubWVudE9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRyYXcgZnVuY3Rpb24gZHJhd3MgdGhlIGltYWdlIG9uIHRoZSBjYW52YXMgYXQgdGhlIHggYW5kIHkgcG9zaXRpb24gb2YgdGhlIExpZ2h0RW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gY3R4IFRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gY2FtZXJhIFRoZSBjYW1lcmEgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XHJcbiAgICAgICAgLy9jdHguc2F2ZSgpO1xyXG4gICAgICAgIC8vY3R4LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgLy9jdHgucm90YXRlKHRoaXMuYW5nbGUgKyBNYXRoLlBJLzIuMCk7XHJcbiAgICAgICAgLy9jdHgudHJhbnNsYXRlKC10aGlzLngsIC10aGlzLnkpO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcclxuICAgICAgICAvL2N0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVuZW15OyIsImltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgRW5lbXlQcm9qZWN0aWxlIGNsYXNzIGlzIHRoZSBvYmplY3QgdGhhdCBpcyBmaXJlZCBmcm9tIHRoZSBQcm9qZWN0aWxlRW5lbXkgZW5lbXkuXHJcbiAqL1xyXG5jbGFzcyBFbmVteVByb2plY3RpbGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEVuZW15UHJvamVjdGlsZSBjbGFzcyBhbmQgZ2V0cyB0aGUgeCBhbmQgeSBjb2VmZmljaWVudHMgZm9yIHVzZVxyXG4gICAgICogaW4gdGhlIG1vdmUgZnVuY3Rpb24uIFRoZSBsb2FkSW1hZ2UgZnVuY3Rpb24gaXMgYWxzbyBjYWxsZWQuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBkZXN0WCBUaGUgeCBkZXN0aW5hdGlvbiBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIGRlc3RZIFRoZSB5IGRlc3RpbmF0aW9uIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGRlc3RYLCBkZXN0WSkge1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSA2MDA7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSA1O1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLmxpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBkaWZmWCA9IGRlc3RYIC0gdGhpcy54O1xyXG4gICAgICAgIGxldCBkaWZmWSA9IGRlc3RZIC0gdGhpcy55O1xyXG4gICAgICAgIGlmKE1hdGguYWJzKGRpZmZYKSA+IE1hdGguYWJzKGRpZmZZKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvZWZmWCA9IGRpZmZYIC8gTWF0aC5hYnMoZGlmZlgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvZWZmWSA9IGRpZmZZIC8gTWF0aC5hYnMoZGlmZlgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb2VmZlkgPSBkaWZmWSAvIE1hdGguYWJzKGRpZmZZKTtcclxuICAgICAgICAgICAgdGhpcy5jb2VmZlggPSBkaWZmWCAvIE1hdGguYWJzKGRpZmZZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gbW92ZXMgdGhlIEVuZW15UHJvamVjdGlsZSBhY2NvcmRpbmcgdG8gdGhlIHggYW5kIHkgY29lZmZpY2llbnRzLlxyXG4gICAgICogQHBhcmFtIG1vZGlmaWVyIFRoZSBtb2RpZmllciB0byBiZSBtdWx0aXBsaWVkIGJ5IHRoZSB2ZWxvY2l0eS5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdHMgVGhlIGFycmF5IG9mIGVudmlyb25tZW50IG9iamVjdHMuXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIFRoZSBwbGF5ZXIgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBtb3ZlKG1vZGlmaWVyLCBlbnZpcm9ubWVudE9iamVjdHMsIHBsYXllcikge1xyXG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyKnRoaXMuY29lZmZYO1xyXG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyKnRoaXMuY29lZmZZO1xyXG4gICAgICAgIGlmKHRoaXMuaGl0U29tZXRoaW5nKGVudmlyb25tZW50T2JqZWN0cywgcGxheWVyKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy54IDwgMCB8fCB0aGlzLnggPiAxMDAwMCB8fCB0aGlzLnkgPCAwIHx8IHRoaXMueSA+IDU2MjUpe1xyXG4gICAgICAgICAgICB0aGlzLmxpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGF3YXkgaGVhbHRoIGZyb20gdGhlIHBsYXllciBlcXVhbCB0byB0aGUgZGFtYWdlIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIFRoZSBwbGF5ZXIgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBkYW1hZ2VQbGF5ZXIocGxheWVyKSB7XHJcbiAgICAgICAgcGxheWVyLmhlYWx0aCAtPSB0aGlzLmRhbWFnZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYXdheSBoZWFsdGggZnJvbSB0aGUgZW52aXJvbm1lbnQgb2JqZWN0IGVxdWFsIHRvIHRoZSBkYW1hZ2Ugb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdCBUaGUgZW52aXJvbm1lbnQgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBkYW1hZ2VFbnZpcm9ubWVudChlbnZpcm9ubWVudE9iamVjdCl7XHJcbiAgICAgICAgZW52aXJvbm1lbnRPYmplY3QuaGVhbHRoIC09IHRoaXMuZGFtYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgYW4gZW52aXJvbm1lbnQgb2JqZWN0IG9yIGEgcGxheWVyIHdlcmUgaGl0IGJ5IHRoZSBwcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0cyBUaGUgYXJyYXkgb2YgZW52aXJvbm1lbnQgb2JqZWN0cy5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciBvYmplY3QuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBvciBub3Qgc29tZXRoaW5nIHdhcyBoaXQuXHJcbiAgICAgKi9cclxuICAgIGhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIHBsYXllcikge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbnZpcm9ubWVudE9iamVjdHNbaV0pICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZUVudmlyb25tZW50KGVudmlyb25tZW50T2JqZWN0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIHBsYXllcikpe1xyXG4gICAgICAgICAgICB0aGlzLmRhbWFnZVBsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiBsb2FkcyB0aGUgdXJsIGFzIGFuIEltYWdlLiBPbmNlIHRoZSBpbWFnZSBpcyBsb2FkZWQsIHRoaXMuaXNJbWFnZUxvYWRlZCBpc1xyXG4gICAgICogc2V0IHRvIHRydWUuIFRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBFbmVteVByb2plY3RpbGUgYXJlIHNldCB0byB0aGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgaW1hZ2UuXHJcbiAgICAgKi9cclxuICAgIGxvYWRJbWFnZSgpIHtcclxuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBcIkdyYXBoaWNzL0VuZW15UHJvamVjdGlsZS5wbmdcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkcmF3IGZ1bmN0aW9uIGRyYXdzIHRoZSBpbWFnZSBvbiB0aGUgY2FudmFzIGF0IHRoZSB4IGFuZCB5IHBvc2l0aW9uIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gY3R4IFRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gY2FtZXJhIFRoZSBjYW1lcmEgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFbmVteVByb2plY3RpbGU7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBMaWdodEVuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBpcyBhIGZhc3QgZW5lbXkgd2l0aCBsb3cgaGVhbHRoLlxyXG4gKi9cclxuY2xhc3MgTGlnaHRFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBMaWdodEVuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byAxMjgsIHRoZSBoZWFsdGggc2V0IHRvIDEwLCB0aGUgZGFtYWdlIHNldCB0byAxMCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byA1MC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBMaWdodEVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIExpZ2h0RW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAxMjgsIDEwLCAxMCwgNTApO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0xpZ2h0RW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaWdodEVuZW15OyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgTWluaUJvc3MgY2xhc3MgZXh0ZW5kcyB0aGUgRW5lbXkgY2xhc3MuIEl0IGlzIGEgaGlnaCBoZWFsdGggYW5kIGRhbWFnZSBlbmVteS5cclxuICovXHJcbmNsYXNzIE1pbmlCb3NzIGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIE1pbmlCb3NzLiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byAxMjgsIHRoZSBoZWFsdGggc2V0IHRvIDUwMCwgdGhlIGRhbWFnZSBzZXQgdG8gNTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gMTAwMC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBNaW5pQm9zcy5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBNaW5pQm9zcy5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDEyOCwgNTAwLCA1MCwgMTAwMCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duID0gMjAwO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJhdGUgPSAxO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJlc2V0ID0gMjAwO1xyXG4gICAgICAgIHRoaXMuc2hvb3RBbW91bnQgPSA1O1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL01pbmlCb3NzLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWluaUJvc3M7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQcm9qZWN0aWxlRW5lbXkgY2xhc3MgZXh0ZW5kcyB0aGUgZW5lbXkgY2xhc3MuIEl0IGNhbiBzaG9vdCBwcm9qZWN0aWxlcyBhdCB0aGUgcGxheWVyLlxyXG4gKi9cclxuY2xhc3MgUHJvamVjdGlsZUVuZW15IGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFByb2plY3RpbGVFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gOTYsIHRoZSBoZWFsdGggc2V0IHRvIDQwLCB0aGUgZGFtYWdlIHNldCB0byAxMCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byAyNTAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgUHJvamVjdGlsZUVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFByb2plY3RpbGVFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDk2LCA0MCwgMTAsIDI1MCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdENvb2xkb3duID0gMzAwO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJhdGUgPSAxO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93blJlc2V0ID0gMzAwO1xyXG4gICAgICAgIHRoaXMuc2hvb3RBbW91bnQgPSAxO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1Byb2plY3RpbGVFbmVteS5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2plY3RpbGVFbmVteTsiLCJpbXBvcnQgRW5lbXkgZnJvbSAnLi9FbmVteS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIFJlZ3VsYXJFbmVteSBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaGFzIGJhbGFuY2VkIHN0YXRzIGFjcm9zcyB0aGUgYm9hcmQuXHJcbiAqL1xyXG5jbGFzcyBSZWd1bGFyRW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgUmVndWxhckVuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byA2NCwgdGhlIGhlYWx0aCBzZXQgdG8gMjUsIHRoZSBkYW1hZ2Ugc2V0IHRvIDEwLCBhbmQgdGhlIHBvaW50c09uS2lsbFxyXG4gICAgICogc2V0IHRvIDEwMC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBSZWd1bGFyRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgUmVndWxhckVuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgNjQsIDI1LCAxMCwgMTAwKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9SZWd1bGFyRW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWd1bGFyRW5lbXk7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBUYW5rRW5lbXkgY2xhc3MgZXh0ZW5kcyB0aGUgRW5lbXkgY2xhc3MuIEl0IGlzIGEgc2xvdyBlbmVteSB3aXRoIGhpZ2ggaGVhbHRoIGFuZCBkYW1hZ2UuXHJcbiAqL1xyXG5jbGFzcyBUYW5rRW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgVGFua0VuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byAzMiwgdGhlIGhlYWx0aCBzZXQgdG8gMTAwLCB0aGUgZGFtYWdlIHNldCB0byAyNSwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byA1MDAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgVGFua0VuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFRhbmtFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDMyLCAxMDAsICAyNSwgNTAwKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9UYW5rRW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYW5rRW5lbXk7IiwiaW1wb3J0IEVudmlyb25tZW50T2JqZWN0IGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3QuanMnO1xuXG4vKipcbiAqIFRoZSBCdXNoIGNsYXNzIGV4dGVuZHMgdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzLiBJdCBpcyBhIG5vbi1ibG9ja2luZyBvYmplY3QuXG4gKi9cbmNsYXNzIEJ1c2ggZXh0ZW5kcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgQnVzaC4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzZXMgY29uc3RydWN0b3JcbiAgICAgKiB3aXRoIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgaGVhbHRoIHNldCB0byAxMDAwMDAsIGFuZCBpc0Jsb2NraW5nIHNldCB0byBmYWxzZS5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgQnVzaC5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgQnVzaC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHN1cGVyKHgsIHksIDEwMDAwMCwgZmFsc2UpO1xuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9CdXNoLnBuZ1wiKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1c2g7IiwiaW1wb3J0IEVudmlyb25tZW50T2JqZWN0IGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3QuanMnO1xuXG4vKipcbiAqIFRoZSBDcmF0ZSBjbGFzcyBleHRlbmRzIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzcy4gSXQgaXMgYSBibG9ja2luZyBvYmplY3Qgd2l0aCBsb3cgaGVhbHRoLlxuICovXG5jbGFzcyBDcmF0ZSBleHRlbmRzIEVudmlyb25tZW50T2JqZWN0IHtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBDcmF0ZS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzZXMgY29uc3RydWN0b3JcbiAgICAgKiB3aXRoIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgaGVhbHRoIHNldCB0byAxMDAsIGFuZCBpc0Jsb2NraW5nIHNldCB0byB0cnVlLlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBDcmF0ZS5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgQ3JhdGUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICBzdXBlcih4LCB5LCAxMDAsIHRydWUpO1xuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9DcmF0ZS5wbmdcIik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDcmF0ZTtcbiIsIi8qKlxuICogVGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzIGlzIHRoZSBwYXJlbnQgZm9yIGFsbCBlbnZpcm9ubWVudCBvYmplY3RzLlxuICovXG5jbGFzcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0gaGVhbHRoIFRoZSBoZWFsdGggb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSBpc0Jsb2NraW5nIFdoZXRoZXIgdGhlIEVudmlyb25tZW50T2JqZWN0IGNhbiBiZSB3YWxrZWQgdGhyb3VnaC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBoZWFsdGgsIGlzQmxvY2tpbmcpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5oZWFsdGggPSBoZWFsdGg7XG4gICAgICAgIHRoaXMuaXNCbG9ja2luZyA9IGlzQmxvY2tpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBmdW5jdGlvbiBzZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgZW52aXJvbm1lbnQgb2JqZWN0IGdpdmVuIHggYW5kIHkuXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gdG8gYmUgc2V0LlxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIHRvIGJlIHNldC5cbiAgICAgKi9cbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiB0YWtlcyBpbiBhIHVybCBhbmQgbG9hZHMgaXQgYXMgYW4gSW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0ltYWdlTG9hZGVkIGlzXG4gICAgICogc2V0IHRvIHRydWUuIFRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdCBhcmUgc2V0IHRvIHRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBpbWFnZS5cbiAgICAgKiBAcGFyYW0gdXJsIFRoZSB1cmwgdGhhdCBzaG91bGQgYmUgbG9hZGVkLlxuICAgICAqL1xuICAgIGxvYWRJbWFnZSh1cmwpIHtcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZHJhdyBmdW5jdGlvbiBkcmF3cyB0aGUgaW1hZ2Ugb24gdGhlIGNhbnZhcyBhdCB0aGUgeCBhbmQgeSBwb3NpdGlvbiBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIGN0eCBUaGUgY29udGV4dCBvZiB0aGUgY2FudmFzLlxuICAgICAqIEBwYXJhbSBjYW1lcmEgVGhlIGNhbWVyYSBvYmplY3QuXG4gICAgICovXG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbnZpcm9ubWVudE9iamVjdDsiLCJpbXBvcnQgRW52aXJvbm1lbnRPYmplY3QgZnJvbSAnLi9FbnZpcm9ubWVudE9iamVjdC5qcyc7XG5cbi8qKlxuICogVGhlIFJvY2sgY2xhc3MgZXh0ZW5kcyB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3MuIEl0IGlzIGEgYmxvY2tpbmcgb2JqZWN0IHdpdGggaGlnaCBoZWFsdGguXG4gKi9cbmNsYXNzIFJvY2sgZXh0ZW5kcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgUm9jay4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzZXMgY29uc3RydWN0b3JcbiAgICAgKiB3aXRoIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgaGVhbHRoIHNldCB0byAzMDAsIGFuZCBpc0Jsb2NraW5nIHNldCB0byB0cnVlLlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBSb2NrLlxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBSb2NrLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgMzAwLCB0cnVlKTtcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvUm9jay5wbmdcIik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb2NrO1xuIiwiY2xhc3MgQ29udHJvbGxlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnRCb2R5KSB7XHJcbiAgICAgICAgdGhpcy5rZXlzUHJlc3NlZCA9IFtdO1xyXG4gICAgICAgIHRoaXMubW91c2UgPSBbMCwgMF07XHJcbiAgICAgICAgdGhpcy5tb3VzZVByZXNzZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnRCb2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmtleXNQcmVzc2VkW2V2ZW50LmtleUNvZGVdID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnRCb2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5rZXlzUHJlc3NlZFtldmVudC5rZXlDb2RlXSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudEJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubW91c2VbMF0gPSBldmVudC5jbGllbnRYO1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlWzFdID0gZXZlbnQuY2xpZW50WTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnRCb2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Qm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubW91c2VQcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNLZXlQcmVzc2VkKGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmtleXNQcmVzc2VkW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgaXNNb3VzZVByZXNzZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW91c2VQcmVzc2VkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1vdXNlUG9zaXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW91c2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7XHJcbiIsImltcG9ydCBXb3JsZCBmcm9tICcuL1dvcmxkLmpzJztcclxuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9Db250cm9sbGVyLmpzJztcclxuaW1wb3J0IEVuZW15UHJvamVjdGlsZSBmcm9tIFwiLi4vRW5lbWllcy9FbmVteVByb2plY3RpbGVcIjtcclxuaW1wb3J0IE1pbmlCb3NzIGZyb20gXCIuLi9FbmVtaWVzL01pbmlCb3NzXCI7XHJcbmltcG9ydCBQcm9qZWN0aWxlRW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvUHJvamVjdGlsZUVuZW15XCI7XHJcbmltcG9ydCBDdXJzb3IgZnJvbSAnLi4vQ3Vyc29yLmpzJztcclxuaW1wb3J0IFBpc3RvbCBmcm9tIFwiLi4vV2VhcG9ucy9QaXN0b2xcIjtcclxuaW1wb3J0IFNuaXBlciBmcm9tIFwiLi4vV2VhcG9ucy9TbmlwZXJcIjtcclxuaW1wb3J0IEFzc2F1bHRSaWZsZSBmcm9tICcuLi9XZWFwb25zL0Fzc2F1bHRSaWZsZSdcclxuaW1wb3J0IEJ1bGxldDUwY2FsIGZyb20gXCIuLi9XZWFwb25zL0J1bGxldDUwY2FsXCI7XHJcbmltcG9ydCBCdWxsZXQ1NTYgZnJvbSBcIi4uL1dlYXBvbnMvQnVsbGV0NTU2XCI7XHJcbmltcG9ydCBCdWxsZXQ5bW0gZnJvbSBcIi4uL1dlYXBvbnMvQnVsbGV0OW1tXCI7XHJcbmltcG9ydCBSb2NrIGZyb20gJy4uL0Vudmlyb25tZW50T2JqZWN0cy9Sb2NrJztcclxuaW1wb3J0IENyYXRlIGZyb20gJy4uL0Vudmlyb25tZW50T2JqZWN0cy9DcmF0ZSc7XHJcbmltcG9ydCBCdXNoIGZyb20gJy4uL0Vudmlyb25tZW50T2JqZWN0cy9CdXNoJztcclxuaW1wb3J0IEdyb3VuZFdlYXBvbiBmcm9tIFwiLi4vR3JvdW5kV2VhcG9ucy9Hcm91bmRXZWFwb24uanNcIjtcclxuaW1wb3J0IEdyb3VuZEFzc2F1bHRSaWZsZSBmcm9tIFwiLi4vR3JvdW5kV2VhcG9ucy9Hcm91bmRBc3NhdWx0UmlmbGUuanNcIjtcclxuaW1wb3J0IEdyb3VuZFNuaXBlciBmcm9tIFwiLi4vR3JvdW5kV2VhcG9ucy9Hcm91bmRTbmlwZXIuanNcIjtcclxuXHJcbmNsYXNzIEdhbWUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgZG9jdW1lbnRCb2R5KSB7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICAgICAgdGhpcy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIHRoaXMud29ybGQgPSBuZXcgV29ybGQoY2FudmFzKTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcihkb2N1bWVudEJvZHkpO1xyXG4gICAgICAgIHRoaXMuY3Vyc29yID0gbmV3IEN1cnNvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShtb2RpZmllcikge1xyXG4gICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmhlYWx0aCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoODcpKSB7IC8vIFBsYXllciBob2xkaW5nIHVwXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci55ID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55IC09IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnkgKz0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoODMpKSB7IC8vIFBsYXllciBob2xkaW5nIGRvd25cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLnkgKyB0aGlzLndvcmxkLnBsYXllci5oZWlnaHQgPD0gNTYyNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnkgKz0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdCh0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueSAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg2NSkpIHsgLy8gUGxheWVyIGhvbGRpbmcgbGVmdFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIueCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueCAtPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDY4KSkgeyAvLyBQbGF5ZXIgaG9sZGluZyByaWdodFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIueCArIHRoaXMud29ybGQucGxheWVyLndpZHRoIDw9IDEwMDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueCArPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54IC09IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29udHJvbGxlci5pc01vdXNlUHJlc3NlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2VwID0gdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W3RoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleF07XHJcbiAgICAgICAgICAgICAgICBsZXQgbW91c2UgPSB0aGlzLmNvbnRyb2xsZXIuZ2V0TW91c2VQb3NpdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vRmlyZSB0aGUgY29ycmVjdCBidWxsZXQgdHlwZSBmb3IgdGhlIGN1cnJlbnRseSBlcXVpcHBlZCB3ZWFwb24uXHJcbiAgICAgICAgICAgICAgICAvL1RoaXMgY291bGQgYmUgZG9uZSBtb3JlIGdyYWNlZnVsbHkgaW4gdGhlIGZ1dHVyZVxyXG4gICAgICAgICAgICAgICAgaWYod2VwIGluc3RhbmNlb2YgUGlzdG9sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYod2VwLmNvb2xkb3duIDw9IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0OW1tKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55LCBtb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54LCBtb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcC5zb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcC5zb3VuZC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcC5jb29sZG93bis9MzAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYod2VwIGluc3RhbmNlb2YgU25pcGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYod2VwLmNvb2xkb3duIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDUwY2FsKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55LCBtb3VzZVswXSt0aGlzLndvcmxkLmNhbWVyYS54LCBtb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcC5zb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcC5zb3VuZC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcC5jb29sZG93bis9MTIwMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHdlcCBpbnN0YW5jZW9mIEFzc2F1bHRSaWZsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHdlcC5jb29sZG93biA8PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDU1Nih0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSwgbW91c2VbMF0rdGhpcy53b3JsZC5jYW1lcmEueCwgbW91c2VbMV0rdGhpcy53b3JsZC5jYW1lcmEueSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXAuc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXAuc291bmQuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXAuY29vbGRvd24rPTEwMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL1RoZSBib3VuZGluZyBib3ggaW4gdGhpcyBpZiBzdGF0ZW1lbnQgdGVsbHMgaWYgdGhlIG1vdXNlIHdhcyBjbGlja2VkIGluc2lkZSB0aGUgdHJ5IGFnYWluIGJ1dHRvbixcclxuICAgICAgICAgICAgICAgIC8vYW5kIGlmIHNvIHRoZSB0aGlzLndvcmxkIGlzIHJlc3RhcnRlZC5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL1RoZXNlIGNvbnRyb2xzIGNoYW5nZSB0aGUgYWN0aXZlIHdlYXBvbiB3aXRoIHNpbXBsZSAxLDIsMyxldGMgY29udHJvbHMgZm9yIGludmVudG9yeVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg0OSkpIHsgLy8gUGxheWVyIHByZXNzZWQgMVxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg1MCkpIHsgLy8gUGxheWVyIHByZXNzZWQgMlxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg1MSkpIHsgLy8gUGxheWVyIHByZXNzZWQgM1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4ID0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSB0aGlzLndvcmxkLmJ1bGxldHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0c1tpXS5tb3ZlKG1vZGlmaWVyLCB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cywgdGhpcy53b3JsZC5lbmVtaWVzKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuYnVsbGV0c1tpXS5saXZlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYnVsbGV0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29udHJvbGxlci5pc01vdXNlUHJlc3NlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW91c2UgPSB0aGlzLmNvbnRyb2xsZXIuZ2V0TW91c2VQb3NpdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKG1vdXNlWzBdID4gdGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCAmJiBtb3VzZVswXSA8ICh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwKzIwMClcclxuICAgICAgICAgICAgICAgICAgICAmJiBtb3VzZVsxXSA+IHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUgJiYgbW91c2VbMV0gPCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1ICsgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5zdGFydCh0aGlzLmNhbnZhcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpID0gdGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5tb3ZlKHRoaXMud29ybGQucGxheWVyLCBtb2RpZmllciwgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMpO1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0uYXR0YWNrQ29vbGRvd24gPiAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmF0dGFja0Nvb2xkb3duIC09IDU7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXSBpbnN0YW5jZW9mIFByb2plY3RpbGVFbmVteSB8fCB0aGlzLndvcmxkLmVuZW1pZXNbaV0gaW5zdGFuY2VvZiBNaW5pQm9zcykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLnNob290Q29vbGRvd24gPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duIC09IHRoaXMud29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duUmF0ZTtcclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlcy5wdXNoKG5ldyBFbmVteVByb2plY3RpbGUodGhpcy53b3JsZC5lbmVtaWVzW2ldLnggKyB0aGlzLndvcmxkLmVuZW1pZXNbaV0ud2lkdGgvMiwgdGhpcy53b3JsZC5lbmVtaWVzW2ldLnkgKyB0aGlzLndvcmxkLmVuZW1pZXNbaV0uaGVpZ2h0LzIsIHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0LzIpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93biArPSB0aGlzLndvcmxkLmVuZW1pZXNbaV0uc2hvb3RDb29sZG93blJlc2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5oZWFsdGggPD0gMClcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vVXBkYXRlIHdlYXBvbiBjb29sZG93bnNcclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICBsZXQgd2VwID0gdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W2ldO1xyXG4gICAgICAgICAgaWYod2VwLmNvb2xkb3duID4gMCl7XHJcbiAgICAgICAgICAgIHdlcC5jb29sZG93biAtPTU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXNbaV0ubW92ZShtb2RpZmllciwgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMsIHRoaXMud29ybGQucGxheWVyKTtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzW2ldLmxpdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5oZWFsdGggPD0gMClcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzLnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy53b3JsZC53YXZlICs9IDE7XHJcbiAgICAgICAgICAgIHRoaXMud29ybGQuc3RhcnRXYXZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLndvcmxkLmNhbWVyYS51cGRhdGUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZHJhdygpIHtcclxuICAgICAgICBsZXQgbW91c2UgPSB0aGlzLmNvbnRyb2xsZXIuZ2V0TW91c2VQb3NpdGlvbigpO1xyXG4gICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmhlYWx0aCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMTI4cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI0ZGRic7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiR2FtZSBPdmVyXCIsIHRoaXMuY2FudmFzLndpZHRoLzIsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyMwMDAnO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KFwiR2FtZSBPdmVyXCIsIHRoaXMuY2FudmFzLndpZHRoLzIsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1LCAyMDAsIDEwMCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVJlY3QodGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSwgMjAwLCAxMDApO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIyNHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyMwMDAnO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlRyeSBhZ2Fpbj9cIiwgdGhpcy5jYW52YXMud2lkdGgvMiAtIDEwMCArIDEwMCwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSArIDUwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuaXNCYWNrZ3JvdW5kTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmRyYXdCYWNrZ3JvdW5kKHRoaXMuY3R4LCB0aGlzLmNhbnZhcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLmlzSW1hZ2VMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uaXNJbWFnZUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5ncm91bmRXZWFwb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLmdyb3VuZFdlYXBvbnNbaV0uaXNJbWFnZUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZ3JvdW5kV2VhcG9uc1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLndvcmxkLmNhbWVyYSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuYnVsbGV0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5idWxsZXRzW2ldLmlzSW1hZ2VMb2FkZWQgJiYgdGhpcy53b3JsZC5idWxsZXRzW2ldLmxpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHNbaV0uZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5pc0ltYWdlTG9hZGVkICYmIHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5saXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaXNJbWFnZUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIuZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEsIG1vdXNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjQ4cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkZGJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRoaXMud29ybGQucGxheWVyLmhlYWx0aCArIFwiIEhQXCIsIHRoaXMuY2FudmFzLndpZHRoLzIgLSAyOTAsIDUwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQodGhpcy53b3JsZC5wbGF5ZXIuaGVhbHRoICsgXCIgSFBcIiwgdGhpcy5jYW52YXMud2lkdGgvMiAtIDI5MCwgNTApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJXYXZlIFwiICsgdGhpcy53b3JsZC53YXZlLCB0aGlzLmNhbnZhcy53aWR0aC8yLCA1MCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KFwiV2F2ZSBcIiArIHRoaXMud29ybGQud2F2ZSwgdGhpcy5jYW52YXMud2lkdGgvMiwgNTApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGhpcy53b3JsZC5lbmVtaWVzLmxlbmd0aCArIFwiIEVuZW1pZXMgTGVmdFwiLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgMzUwLCA1MCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGggKyBcIiBFbmVtaWVzIExlZnRcIiwgdGhpcy5jYW52YXMud2lkdGgvMiArIDM1MCwgNTApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiNDhweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoJ0FjdGl2ZSBXZWFwb246ICcgKyB0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnlbdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4XS5uYW1lLCB0aGlzLmNhbnZhcy53aWR0aC8yLCAxMjUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCgnQWN0aXZlIFdlYXBvbjogJyArIHRoaXMud29ybGQucGxheWVyLmludmVudG9yeVt0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXhdLm5hbWUsIHRoaXMuY2FudmFzLndpZHRoLzIsIDEyNSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTWluaW1hcFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJ3JnYmEoMzUsIDE3NywgNzcsIDAuMiknO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QodGhpcy5jYW52YXMud2lkdGggLSA0MjUsIDI1LCA0MDAsIDIyNSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KHRoaXMuY2FudmFzLndpZHRoIC0gNDI1LCAyNSwgNDAwLCAyMjUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHhQZXJjZW50ID0gKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yKSAvIHRoaXMud29ybGQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBsZXQgeVBlcmNlbnQgPSAodGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yKSAvIHRoaXMud29ybGQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHhSZWxhdGl2ZSA9IHhQZXJjZW50KjQwMDtcclxuICAgICAgICAgICAgICAgIGxldCB5UmVsYXRpdmUgPSB5UGVyY2VudCoyMjU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzAwRkYwMCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmFyYygodGhpcy5jYW52YXMud2lkdGggLSA0MjUpICsgeFJlbGF0aXZlLCAyNSArIHlSZWxhdGl2ZSwgMi41LCAwLCAyKk1hdGguUEkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uaXNJbWFnZUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgeFBlcmNlbnQgPSAodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0ueCArIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLndpZHRoLzIpIC8gdGhpcy53b3JsZC53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHlQZXJjZW50ID0gKHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLnkgKyB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5oZWlnaHQvMikgLyB0aGlzLndvcmxkLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHhSZWxhdGl2ZSA9IHhQZXJjZW50KjQwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHlSZWxhdGl2ZSA9IHlQZXJjZW50KjIyNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jdHguZHJhd0ltYWdlKHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmltYWdlLCAodGhpcy5jYW52YXMud2lkdGggLSA0MjUpICsgeFJlbGF0aXZlICsgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0ud2lkdGgvMiwgMjUgKyB5UmVsYXRpdmUgKyB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5oZWlnaHQvMiwgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0ud2lkdGgvMjUsIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmhlaWdodC8yNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjODA4MDgwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmFyYygodGhpcy5jYW52YXMud2lkdGggLSA0MjUpICsgeFJlbGF0aXZlLCAyNSArIHlSZWxhdGl2ZSwgMi41LCAwLCAyKk1hdGguUEkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB4UGVyY2VudCA9ICh0aGlzLndvcmxkLmVuZW1pZXNbaV0ueCArIHRoaXMud29ybGQuZW5lbWllc1tpXS53aWR0aC8yKSAvIHRoaXMud29ybGQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB5UGVyY2VudCA9ICh0aGlzLndvcmxkLmVuZW1pZXNbaV0ueSArIHRoaXMud29ybGQuZW5lbWllc1tpXS5oZWlnaHQvMikgLyB0aGlzLndvcmxkLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHhSZWxhdGl2ZSA9IHhQZXJjZW50KjQwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHlSZWxhdGl2ZSA9IHlQZXJjZW50KjIyNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRjAwMDAnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguYXJjKCh0aGlzLmNhbnZhcy53aWR0aCAtIDQyNSkgKyB4UmVsYXRpdmUsIDI1ICsgeVJlbGF0aXZlLCAyLjUsIDAsIDIqTWF0aC5QSSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGxhdGVyIC0gZGVidWdnaW5nIHB1cnBvc2VzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIyNHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkZGJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCdQb3NYOiAnICsgdGhpcy53b3JsZC5wbGF5ZXIueCwgdGhpcy5jYW52YXMud2lkdGgvMiAtIDI5MCwgMTc1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoJ1Bvc1k6ICcgKyB0aGlzLndvcmxkLnBsYXllci55LCB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMjkwLCAyNTApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoJ0NhbWVyYVg6ICcgKyB0aGlzLndvcmxkLmNhbWVyYS54LCB0aGlzLmNhbnZhcy53aWR0aC8yLCAxNzUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCgnQ2FtZXJhWTogJyArIHRoaXMud29ybGQuY2FtZXJhLnksIHRoaXMuY2FudmFzLndpZHRoLzIsIDI1MCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgnbW91c2VYOiAnICsgbW91c2VbMF0sIHRoaXMuY2FudmFzLndpZHRoLzIgKyAzNTAsIDE3NSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCdtb3VzZVk6ICcgKyBtb3VzZVsxXSwgdGhpcy5jYW52YXMud2lkdGgvMiArIDM1MCwgMjUwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5jdXJzb3IuaW1hZ2UsIG1vdXNlWzBdIC0gdGhpcy5jdXJzb3IuaW1hZ2Uud2lkdGgvMiwgbW91c2VbMV0gLSB0aGlzLmN1cnNvci5pbWFnZS5oZWlnaHQvMik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWU7XHJcbiIsImltcG9ydCBSb2NrIGZyb20gXCIuLi9FbnZpcm9ubWVudE9iamVjdHMvUm9ja1wiO1xyXG5pbXBvcnQgQnVzaCBmcm9tIFwiLi4vRW52aXJvbm1lbnRPYmplY3RzL0J1c2hcIjtcclxuaW1wb3J0IENyYXRlIGZyb20gXCIuLi9FbnZpcm9ubWVudE9iamVjdHMvQ3JhdGVcIjtcclxuaW1wb3J0IFRhbmtFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9UYW5rRW5lbXlcIjtcclxuaW1wb3J0IFJlZ3VsYXJFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9SZWd1bGFyRW5lbXlcIjtcclxuaW1wb3J0IExpZ2h0RW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvTGlnaHRFbmVteVwiO1xyXG5pbXBvcnQgUHJvamVjdGlsZUVuZW15IGZyb20gXCIuLi9FbmVtaWVzL1Byb2plY3RpbGVFbmVteVwiO1xyXG5pbXBvcnQgTWluaUJvc3MgZnJvbSAnLi4vRW5lbWllcy9NaW5pQm9zcyc7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL1BsYXllcnMvUGxheWVyXCI7XHJcbmltcG9ydCBDYW1lcmEgZnJvbSBcIi4uL1BsYXllcnMvQ2FtZXJhXCI7XHJcbmltcG9ydCBHcm91bmRXZWFwb24gZnJvbSBcIi4uL0dyb3VuZFdlYXBvbnMvR3JvdW5kV2VhcG9uLmpzXCI7XHJcbmltcG9ydCBHcm91bmRBc3NhdWx0UmlmbGUgZnJvbSBcIi4uL0dyb3VuZFdlYXBvbnMvR3JvdW5kQXNzYXVsdFJpZmxlLmpzXCI7XHJcbmltcG9ydCBHcm91bmRTbmlwZXIgZnJvbSBcIi4uL0dyb3VuZFdlYXBvbnMvR3JvdW5kU25pcGVyLmpzXCI7XHJcbmltcG9ydCBVdGlsIGZyb20gXCIuLi9VdGlsaXRpZXMvVXRpbFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBXb3JsZCBjbGFzcyBob2xkcyB0aGUgaW5mb3JtYXRpb24gcmVsYXRlZCB0byB0aGUgd29ybGQuXHJcbiAqL1xyXG5jbGFzcyBXb3JsZCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkIG9mIHRoZSB3b3JsZCBhbmQgbG9hZHMgdGhlIGJhY2tncm91bmQuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzIFRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhcykge1xyXG4gICAgICAgIHRoaXMuc3RhcnQoY2FudmFzKTtcclxuICAgICAgICB0aGlzLmxvYWRCYWNrZ3JvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc3RhcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgV29ybGQuIFRoZSBwbGF5ZXIgaXMgbWFkZSBhbmQgdGhlIGNhbWVyYSBpcyBhdHRhY2hlZCB0byB0aGUgcGxheWVyLlxyXG4gICAgICogQSBjYWxsIGlzIHRvIGluaXRpYWxpemUgdGhlIGVudmlyb25tZW50IGFuZCBzdGFydCB0aGUgd2F2ZS5cclxuICAgICAqIEBwYXJhbSBjYW52YXMgVGhlIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgc3RhcnQoY2FudmFzKSB7XHJcbiAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLmVuZW1pZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmJ1bGxldHMgPSBbXTtcclxuICAgICAgICB0aGlzLmVuZW15UHJvamVjdGlsZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmdyb3VuZFdlYXBvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVFbnZpcm9ubWVudCgpO1xyXG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcihjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBDYW1lcmEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0LCAxMDAwMCwgNTYyNSk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyLCBjYW52YXMud2lkdGgvMiwgY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLndhdmUgPSAxO1xyXG4gICAgICAgIHRoaXMuc3RhcnRXYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGluaXRpYWxpemVzIHRoZSBlbnZpcm9ubWVudCBieSBwdXNoaW5nIGVudmlyb25tZW50IG9iamVjdHMgb250byB0aGUgZW52aXJvbm1lbnRPYmplY3RzIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplRW52aXJvbm1lbnQoKSB7XHJcbiAgICAgICAgbGV0IGNyYXRlQ2FwID0gMjA7XHJcbiAgICAgICAgbGV0IGJ1c2hDYXAgPSAzMDtcclxuICAgICAgICBsZXQgcm9ja0NhcCA9IDMwO1xyXG4gICAgICAgIGxldCBzbmlwZXJDYXAgPSAxMDtcclxuICAgICAgICBsZXQgYXNzYXVsdFJpZmxlQ2FwID0gMjA7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjcmF0ZUNhcDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cy5wdXNoKG5ldyBDcmF0ZShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGJ1c2hDYXA7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMucHVzaChuZXcgQnVzaChVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHJvY2tDYXA7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMucHVzaChuZXcgUm9jayhVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNuaXBlckNhcDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ncm91bmRXZWFwb25zLnB1c2gobmV3IEdyb3VuZFNuaXBlcihVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFzc2F1bHRSaWZsZUNhcDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ncm91bmRXZWFwb25zLnB1c2gobmV3IEdyb3VuZEFzc2F1bHRSaWZsZShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcblxyXG4gICAgICAgIGxldCBjb2xsaXNpb25GbGFnID0gdHJ1ZTtcclxuICAgICAgICB3aGlsZShjb2xsaXNpb25GbGFnID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCBpID0gVXRpbC5hcmVBbnlDb2xsaXNpb25zSW5TYW1lQXJyYXkodGhpcy5lbnZpcm9ubWVudE9iamVjdHMpO1xyXG4gICAgICAgICAgICBpZihpID09PSAtMSlcclxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbkZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHNbaV0uc2V0UG9zaXRpb24oVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vTm93IHdlIGNoZWNrIGlmIHRoZSB3ZWFwb25zIGFyZSBoaXR0aW5nIGVhY2hvdGhlclxyXG4gICAgICAgIGxldCBzZWxmQ29sbGlzaW9uRmxhZyA9IHRydWU7XHJcbiAgICAgICAgd2hpbGUoc2VsZkNvbGxpc2lvbkZsYWcpe1xyXG4gICAgICAgICAgbGV0IGkgPSBVdGlsLmFyZUFueUNvbGxpc2lvbnNJblNhbWVBcnJheSh0aGlzLmdyb3VuZFdlYXBvbnMpO1xyXG4gICAgICAgICAgaWYoaSA9PT0gLTEpXHJcbiAgICAgICAgICAgIHNlbGZDb2xsaXNpb25GbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ncm91bmRXZWFwb25zW2ldLnNldFBvc2l0aW9uKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gc3RhcnRzIHRoZSB3YXZlIGJ5IHB1c2hpbmcgZW5lbWllcyBvbnRvIHRoZSBlbmVtaWVzIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBzdGFydFdhdmUoKSB7XHJcbiAgICAgICAgbGV0IGxpZ2h0RW5lbXlDYXAgPSB0aGlzLndhdmUgKiAxMDtcclxuICAgICAgICBsZXQgcmVndWxhckVuZW15Q2FwID0gdGhpcy53YXZlICogMTA7XHJcbiAgICAgICAgbGV0IHRhbmtFbmVteUNhcCA9IHRoaXMud2F2ZSAqIDU7XHJcbiAgICAgICAgbGV0IHByb2plY3RpbGVFbmVteUNhcCA9IE1hdGguZmxvb3IodGhpcy53YXZlLzIpKjU7XHJcbiAgICAgICAgbGV0IG1pbmlCb3NzQ2FwID0gTWF0aC5mbG9vcih0aGlzLndhdmUvNSk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsaWdodEVuZW15Q2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBMaWdodEVuZW15KFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmVndWxhckVuZW15Q2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBSZWd1bGFyRW5lbXkoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0YW5rRW5lbXlDYXA7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IFRhbmtFbmVteShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHByb2plY3RpbGVFbmVteUNhcDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgUHJvamVjdGlsZUVuZW15KFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbWluaUJvc3NDYXA7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IE1pbmlCb3NzKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbGxpc2lvbkZsYWcgPSB0cnVlO1xyXG4gICAgICAgIHdoaWxlKGNvbGxpc2lvbkZsYWcgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IGkgPSBVdGlsLmFyZUFueUNvbGxpc2lvbnModGhpcy5lbmVtaWVzLCB0aGlzLmVudmlyb25tZW50T2JqZWN0cyk7XHJcbiAgICAgICAgICAgIGlmIChpID09PSAtMSlcclxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbkZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmVtaWVzW2ldLnNldFBvc2l0aW9uKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsb2FkQmFja2dyb3VuZCBmdW5jdGlvbiBsb2FkcyB0aGUgYmFja2dyb3VuZCBpbWFnZS4gT25jZSB0aGUgaW1hZ2UgaXMgbG9hZGVkLCB0aGlzLmlzQmFja2dyb3VuZExvYWRlZCBpc1xyXG4gICAgICogc2V0IHRvIHRydWUuXHJcbiAgICAgKi9cclxuICAgIGxvYWRCYWNrZ3JvdW5kKCkge1xyXG4gICAgICAgIHRoaXMuaXNCYWNrZ3JvdW5kTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0JhY2tncm91bmRMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5iYWNrZ3JvdW5kLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuYmFja2dyb3VuZC5oZWlnaHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQuc3JjID0gXCJHcmFwaGljcy9CYWNrZ3JvdW5kLnBuZ1wiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRyYXdCYWNrZ3JvdW5kIGZ1bmN0aW9uIGRyYXdzIHRoZSBiYWNrZ3JvdW5kIG9mIHRoZSB3b3JsZC5cclxuICAgICAqIEBwYXJhbSBjdHggVGhlIGNvbnRleHQgb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjYW52YXMgVGhlIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgZHJhd0JhY2tncm91bmQoY3R4LCBjYW52YXMpIHtcclxuICAgICAgICBsZXQgc1dpZHRoLCBzSGVpZ2h0O1xyXG4gICAgICAgIHNXaWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgICAgICBzSGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuXHJcbiAgICAgICAgaWYodGhpcy5iYWNrZ3JvdW5kLndpZHRoIC0gdGhpcy5jYW1lcmEueCA8IGNhbnZhcy53aWR0aClcclxuICAgICAgICAgICAgc1dpZHRoID0gdGhpcy5iYWNrZ3JvdW5kLndpZHRoIC0gdGhpcy5jYW1lcmEueDtcclxuICAgICAgICBpZih0aGlzLmJhY2tncm91bmQuaGVpZ2h0IC0gdGhpcy5jYW1lcmEueSA8IGNhbnZhcy5oZWlnaHQpXHJcbiAgICAgICAgICAgIHNIZWlnaHQgPSB0aGlzLmJhY2tncm91bmQuaGVpZ2h0IC0gdGhpcy5jYW1lcmEueTtcclxuXHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmJhY2tncm91bmQsIHRoaXMuY2FtZXJhLngsIHRoaXMuY2FtZXJhLnksIHNXaWR0aCwgc0hlaWdodCwgMCwgMCwgc1dpZHRoLCBzSGVpZ2h0KTtcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdvcmxkO1xyXG4iLCJpbXBvcnQgR3JvdW5kV2VhcG9uIGZyb20gJy4vR3JvdW5kV2VhcG9uLmpzJztcclxuaW1wb3J0IFdlYXBvbiBmcm9tICcuLi9XZWFwb25zL1dlYXBvbi5qcyc7XHJcbmltcG9ydCBBc3NhdWx0UmlmbGUgZnJvbSAnLi4vV2VhcG9ucy9Bc3NhdWx0UmlmbGUuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBSb2NrIGNsYXNzIGV4dGVuZHMgdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzLiBJdCBpcyBhIGJsb2NraW5nIG9iamVjdCB3aXRoIGhpZ2ggaGVhbHRoLlxyXG4gKi9cclxuY2xhc3MgR3JvdW5kQXNzYXVsdFJpZmxlIGV4dGVuZHMgR3JvdW5kV2VhcG9uIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgbGV0IHdlYXBvbiA9IG5ldyBBc3NhdWx0UmlmbGUoKTtcclxuICAgICAgICBzdXBlcih4LCB5LCB3ZWFwb24pO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0dyb3VuZEFzc2F1bHRSaWZsZS5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdyb3VuZEFzc2F1bHRSaWZsZTtcclxuIiwiaW1wb3J0IEdyb3VuZFdlYXBvbiBmcm9tICcuL0dyb3VuZFdlYXBvbi5qcyc7XHJcbmltcG9ydCBXZWFwb24gZnJvbSAnLi4vV2VhcG9ucy9XZWFwb24uanMnO1xyXG5pbXBvcnQgU25pcGVyIGZyb20gJy4uL1dlYXBvbnMvU25pcGVyLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUm9jayBjbGFzcyBleHRlbmRzIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzcy4gSXQgaXMgYSBibG9ja2luZyBvYmplY3Qgd2l0aCBoaWdoIGhlYWx0aC5cclxuICovXHJcbmNsYXNzIEdyb3VuZFNuaXBlciBleHRlbmRzIEdyb3VuZFdlYXBvbiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIGxldCB3ZWFwb24gPSBuZXcgU25pcGVyKCk7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2VhcG9uKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9Hcm91bmRTbmlwZXIucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHcm91bmRTbmlwZXI7XHJcbiIsImNsYXNzIEdyb3VuZFdlYXBvbiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgd2VhcG9uKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMud2VhcG9uID0gd2VhcG9uO1xyXG4gICAgfVxyXG4gICAgc2V0UG9zaXRpb24oeCwgeSkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxuICAgIGxvYWRJbWFnZSh1cmwpIHtcclxuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB1cmw7XHJcbiAgICB9XHJcbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEdyb3VuZFdlYXBvbjtcclxuIiwiLypcbiAgU291cmNlczpcbiAgaHR0cDovL3d3dy5sb3N0ZGVjYWRlZ2FtZXMuY29tL2hvdy10by1tYWtlLWEtc2ltcGxlLWh0bWw1LWNhbnZhcy1nYW1lL1xuICBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80MDM3MjEyL2h0bWwtY2FudmFzLWZ1bGwtc2NyZWVuP3V0bV9tZWRpdW09b3JnYW5pYyZ1dG1fc291cmNlPWdvb2dsZV9yaWNoX3FhJnV0bV9jYW1wYWlnbj1nb29nbGVfcmljaF9xYVxuICBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjkxOTYwMS9odG1sNS1jYW52YXMtd29ybGQuY2FtZXJhLXZpZXdwb3J0LWhvdy10by1hY3RhbGx5LWRvLWl0P3V0bV9tZWRpdW09b3JnYW5pYyZ1dG1fc291cmNlPWdvb2dsZV9yaWNoX3FhJnV0bV9jYW1wYWlnbj1nb29nbGVfcmljaF9xYVxuICBodHRwOi8vanNmaWRkbGUubmV0L2dmY2Fydi9RS2dIcy9cbiAqL1xuXG5pbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUvR2FtZS5qcyc7XG5cbmxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG5sZXQgZ2FtZSA9IG5ldyBHYW1lKGNhbnZhcywgZG9jdW1lbnQuYm9keSk7XG5cbmxldCBtYWluID0gKCkgPT4ge1xuICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGxldCBkZWx0YSA9IG5vdyAtIHRoZW47XG5cbiAgICBnYW1lLnVwZGF0ZShkZWx0YSAvIDEwMDApO1xuICAgIGdhbWUuZHJhdygpO1xuXG4gICAgdGhlbiA9IG5vdztcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShtYWluKTtcbn07XG5cbi8vIENyb3NzLWJyb3dzZXIgc3VwcG9ydCBmb3IgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cbmxldCB0aGVuID0gRGF0ZS5ub3coKTtcbm1haW4oKTtcbiIsIi8qXHJcbiAgU291cmNlczpcclxuICBodHRwOi8vanNmaWRkbGUubmV0L2dmY2Fydi9RS2dIcy9cclxuKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgQ2FtZXJhIGNsYXNzIGlzIHVzZWQgdG8gZm9sbG93IHRoZSBwbGF5ZXIncyBtb3ZlbWVudC5cclxuICovXHJcbmNsYXNzIENhbWVyYSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgQ2FtZXJhLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIENhbWVyYS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBDYW1lcmEuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzV2lkdGggVGhlIHdpZHRoIG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzSGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSB3b3JsZFdpZHRoIFRoZSB3aWR0aCBvZiB0aGUgd29ybGQuXHJcbiAgICAgKiBAcGFyYW0gd29ybGRIZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgd29ybGQuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQsIHdvcmxkV2lkdGgsIHdvcmxkSGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMueERlYWRab25lID0gMDtcclxuICAgICAgICB0aGlzLnlEZWFkWm9uZSA9IDA7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IGNhbnZhc1dpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gY2FudmFzSGVpZ2h0O1xyXG4gICAgICAgIHRoaXMud29ybGRXaWR0aCA9IHdvcmxkV2lkdGg7XHJcbiAgICAgICAgdGhpcy53b3JsZEhlaWdodCA9IHdvcmxkSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIHNldCB3aG8gdGhlIGNhbWVyYSBpcyBmb2xsb3dpbmcuXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIFRoZSBwbGF5ZXIgdGhhdCB0aGUgY2FtZXJhIHNob3VsZCBmb2xsb3cuXHJcbiAgICAgKiBAcGFyYW0geERlYWRab25lXHJcbiAgICAgKiBAcGFyYW0geURlYWRab25lXHJcbiAgICAgKi9cclxuICAgIGZvbGxvdyhwbGF5ZXIsIHhEZWFkWm9uZSwgeURlYWRab25lKSB7XHJcbiAgICAgICAgdGhpcy5mb2xsb3dpbmcgPSBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy54RGVhZFpvbmUgPSB4RGVhZFpvbmU7XHJcbiAgICAgICAgdGhpcy55RGVhZFpvbmUgPSB5RGVhZFpvbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVwZGF0ZXMgdGhlIGNhbWVyYSdzIHggYW5kIHkgcG9zaXRpb24uXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBpZih0aGlzLmZvbGxvd2luZyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZm9sbG93aW5nLnggLSB0aGlzLnggKyB0aGlzLnhEZWFkWm9uZSA+IHRoaXMud2lkdGgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmZvbGxvd2luZy54IC0gKHRoaXMud2lkdGggLSB0aGlzLnhEZWFkWm9uZSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5mb2xsb3dpbmcueCAtIHRoaXMueERlYWRab25lIDwgdGhpcy54KVxyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5mb2xsb3dpbmcueCAtIHRoaXMueERlYWRab25lO1xyXG4gICAgICAgICAgICBpZih0aGlzLmZvbGxvd2luZy55IC0gdGhpcy55ICsgdGhpcy55RGVhZFpvbmUgPiB0aGlzLmhlaWdodClcclxuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuZm9sbG93aW5nLnkgLSAodGhpcy5oZWlnaHQgLSB0aGlzLnlEZWFkWm9uZSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5mb2xsb3dpbmcueSAtIHRoaXMueURlYWRab25lIDwgdGhpcy55KVxyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5mb2xsb3dpbmcueSAtIHRoaXMueURlYWRab25lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnggPCAwKVxyXG4gICAgICAgICAgICB0aGlzLnggPSAwO1xyXG4gICAgICAgIGlmKHRoaXMueSA8IDApXHJcbiAgICAgICAgICAgIHRoaXMueSA9IDA7XHJcbiAgICAgICAgaWYodGhpcy54ICsgdGhpcy53aWR0aCA+IHRoaXMud29ybGRXaWR0aClcclxuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy53b3JsZFdpZHRoIC0gdGhpcy53aWR0aDtcclxuICAgICAgICBpZih0aGlzLnkgKyB0aGlzLmhlaWdodCA+IHRoaXMud29ybGRIZWlnaHQpXHJcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMud29ybGRIZWlnaHQgLSB0aGlzLmhlaWdodDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2FtZXJhOyIsImltcG9ydCBQaXN0b2wgZnJvbSAnLi4vV2VhcG9ucy9QaXN0b2wuanMnXG5pbXBvcnQgU25pcGVyIGZyb20gJy4uL1dlYXBvbnMvU25pcGVyLmpzJ1xuaW1wb3J0IEFzc2F1bHRSaWZsZSBmcm9tICcuLi9XZWFwb25zL0Fzc2F1bHRSaWZsZS5qcydcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcblxuY2xhc3MgUGxheWVyIHtcbiAgLy90aGlzLnggPSB4IHBvc2l0aW9uXG4gIC8vdGhpcy55ID0geSBwb3NpdGlvblxuICAvL3RoaXMuaGVhbHRoID0gcGxheWVyJ3MgbGlmZVxuICAvL3RoaXMuc3BlZWQgPSBwbGF5ZXIncyBtb3Zlc3BlZWRcbiAgLy90aGlzLmxvYWRJbWFnZSgpIGlzIGEgZnVuY3Rpb24gdG8gYXR0YWNoIHRoZSBpbWFnZSB0byB0aGUgcGxheWVyLlxuICAvL1RoZSBwbGF5ZXIgaGFzIGFuIGFycmF5IHRvIGhvbGQgaGlzIGl0ZW1zIGFuZCBoZSB3aWxsIHN0YXJ0IHdpdGggYSBwaXN0b2wgYW5kIHNuaXBlciB0aGlzIHdlZWsgZm9yIGVhc3kgdGVzdGluZ1xuICAvL05leHQgd2VlayBpdGVtcyB3aWxsIGJlIHBpY2tlZCB1cCBieSB3YWxraW5nIG92ZXIgdGhlbSBhbmQgYXMgc3VjaCB0aGVyZSB3aWxsIG5lZWQgdG8gYmUgYW4gYWRkSXRlbSBmdW5jdGlvblxuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICB0aGlzLnggPSB4O1xuICAgICAgdGhpcy55ID0geTtcbiAgICAgIHRoaXMuaGVhbHRoID0gMTAwO1xuICAgICAgdGhpcy5zcGVlZCA9IDI1NjtcbiAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgICBsZXQgc3RhcnRfcGlzdG9sID0gbmV3IFBpc3RvbCgpO1xuICAgICAgbGV0IHN0YXJ0X3NuaXBlciA9IG5ldyBTbmlwZXIoKTtcbiAgICAgIGxldCBzdGFydF9yaWZsZSA9IG5ldyBBc3NhdWx0UmlmbGUoKTtcbiAgICAgIHRoaXMuaW52ZW50b3J5ID0gW3N0YXJ0X3Bpc3RvbCwgc3RhcnRfc25pcGVyLCBzdGFydF9yaWZsZV07XG4gICAgICB0aGlzLmFjdGl2ZV9pbmRleCA9IDA7XG4gIH1cblxuICAgIGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KGVudmlyb25tZW50T2JqZWN0cykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKFV0aWwuaXNDb2xsaXNpb24oZW52aXJvbm1lbnRPYmplY3RzW2ldLCB0aGlzKSAmJiBlbnZpcm9ubWVudE9iamVjdHNbaV0uaXNCbG9ja2luZylcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICBsb2FkSW1hZ2UoKSB7XG4gICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcbiAgICAgIH07XG4gICAgICB0aGlzLmltYWdlLnNyYyA9IFwiR3JhcGhpY3MvUGxheWVyLnBuZ1wiO1xuICB9XG5cbiAgICBkcmF3KGN0eCwgY2FtZXJhLCBtb3VzZSkge1xuICAgICAgICAvL2N0eC5zYXZlKCk7XG4gICAgICAgIC8vY3R4LnRyYW5zbGF0ZSgodGhpcy54ICsgdGhpcy53aWR0aC8yKSAtIGNhbWVyYS54LCAodGhpcy55ICsgdGhpcy5oZWlnaHQvMikgLSBjYW1lcmEueSk7XG4gICAgICAgIC8vY3R4LnJvdGF0ZShNYXRoLmF0YW4yKG1vdXNlWzFdIC0gKHRoaXMueSAtIGNhbWVyYS55KSwgbW91c2VbMF0gLSAodGhpcy54IC0gY2FtZXJhLngpKSk7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcbiAgICAgICAgLy9jdHgucmVzdG9yZSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiLypcclxuICBTb3VyY2VzOlxyXG4gIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvR2FtZXMvVGVjaG5pcXVlcy8yRF9jb2xsaXNpb25fZGV0ZWN0aW9uXHJcbiAgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDk1OTk3NS9nZW5lcmF0ZS1yYW5kb20tbnVtYmVyLWJldHdlZW4tdHdvLW51bWJlcnMtaW4tamF2YXNjcmlwdFxyXG4qL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBVdGlsIGNsYXNzIGNvbnRhaW5zIHZhcmlvdXMgdXRpbGl0eSBmdW5jdGlvbnMuXHJcbiAqL1xyXG5jbGFzcyBVdGlsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBpc0NvbGxpc2lvbiBtZXRob2QgY2hlY2tzIGlmIHRoZXJlIGlzIGEgY29sbGlzaW9uIGJldHdlZW4gdGhlIHR3byBpbnB1dHRlZCByZWN0YW5nbGVzLiBUaGlzIGFsZ29yaXRobSBvbmx5XHJcbiAgICAgKiB3b3JrcyB3aXRoIGF4aXMtYWxpZ25lZCByZWN0YW5nbGVzLlxyXG4gICAgICogQHBhcmFtIHJlY3RhbmdsZTEgVGhlIGZpcnN0IHJlY3RhbmdsZS5cclxuICAgICAqIEBwYXJhbSByZWN0YW5nbGUyIFRoZSBzZWNvbmQgcmVjdGFuZ2xlLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgdGhlcmUgZXhpc3RzIGEgY29sbGlzaW9uIGJldHdlZW4gdGhlIHR3byBpbnB1dHRlZCByZWN0YW5nbGVzLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNDb2xsaXNpb24ocmVjdGFuZ2xlMSwgcmVjdGFuZ2xlMikge1xyXG4gICAgICAgIGlmKHJlY3RhbmdsZTEueCA8IHJlY3RhbmdsZTIueCArIHJlY3RhbmdsZTIud2lkdGggJiZcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMS54ICsgcmVjdGFuZ2xlMS53aWR0aCA+IHJlY3RhbmdsZTIueCAmJlxyXG4gICAgICAgICAgICByZWN0YW5nbGUxLnkgPCByZWN0YW5nbGUyLnkgKyByZWN0YW5nbGUyLmhlaWdodCAmJlxyXG4gICAgICAgICAgICByZWN0YW5nbGUxLnkgKyByZWN0YW5nbGUxLmhlaWdodCA+IHJlY3RhbmdsZTIueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyBpZiB0aGVyZSBhcmUgYW55IGNvbGxpc2lvbnMgYmV0d2VlbiB0aGUgdHdvIGFycmF5cy4gVGhpcyBhbGdvcml0aG0gb25seSB3b3JrcyB3aXRoXHJcbiAgICAgKiBheGlzLWFsaWduZWQgcmVjdGFuZ2xlcy5cclxuICAgICAqIEBwYXJhbSBhcnJheTEgQW4gYXJyYXkgb2YgcmVjdGFuZ2xlcy5cclxuICAgICAqIEBwYXJhbSBhcnJheTIgQW4gYXJyYXkgb2YgcmVjdGFuZ2xlcy5cclxuICAgICAqIEByZXR1cm5zIHtpbnRlZ2VyfSAtMSBpZiB0aGVyZSBhcmUgbm8gY29sbGlzaW9ucyBvciB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGFycmF5IGlmIHRoZXJlIGlzLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXJlQW55Q29sbGlzaW9ucyhhcnJheTEsIGFycmF5Mikge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcnJheTEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGFycmF5Mi5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc0NvbGxpc2lvbihhcnJheTFbaV0sIGFycmF5MltqXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhcmVBbnlDb2xsaXNpb25zSW5TYW1lQXJyYXkoYXJyYXkpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGFycmF5Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihpICE9PSBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pc0NvbGxpc2lvbihhcnJheVtpXSwgYXJyYXlbal0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYSByYW5kb20gbnVtYmVyIGluIHRoZSBnaXZlbiBpbnRlcnZhbC5cclxuICAgICAqIEBwYXJhbSBmcm9tXHJcbiAgICAgKiBAcGFyYW0gdG9cclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByYW5kb21JbnRGcm9tSW50ZXJ2YWwoZnJvbSwgdG8pIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRvIC0gZnJvbSArIDEpICsgZnJvbSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXRpbDsiLCJpbXBvcnQgV2VhcG9uIGZyb20gJy4vV2VhcG9uLmpzJztcclxuXHJcbmNsYXNzIEFzc2F1bHRSaWZsZSBleHRlbmRzIFdlYXBvbntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoNSwgMzApO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiQXNzYXVsdCBSaWZsZVwiO1xyXG4gICAgICAgIHN1cGVyLmxvYWRTaG9vdFNvdW5kKCdBdWRpby9SaWZsZVNob3QubXAzJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFzc2F1bHRSaWZsZTtcclxuIiwiaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xuXG5jbGFzcyBCdWxsZXR7XG4gICAgY29uc3RydWN0b3IodmVsb2NpdHksIGRhbWFnZSwgeCwgeSwgZGVzdFgsIGRlc3RZLCBwZW5ldHJhdGVzKSB7XG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2ZWxvY2l0eTtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuZGVzdFggPSBkZXN0WDtcbiAgICAgICAgdGhpcy5kZXN0WSA9IGRlc3RZO1xuICAgICAgICB0aGlzLmxpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzUGVuZXRyYXRpbmcgPSBwZW5ldHJhdGVzO1xuICAgICAgICBsZXQgZGlmZlggPSB0aGlzLmRlc3RYIC0gdGhpcy54O1xuICAgICAgICBsZXQgZGlmZlkgPSB0aGlzLmRlc3RZIC0gdGhpcy55O1xuICAgICAgICAvL1RoaXMgbG9naWMgZmluZHMgYSBjb2VmZmljaWVudCBmb3IgWCBhbmQgWSB0aGF0IGNhbiBiZSBhcHBsaWVkXG4gICAgICAgIC8vdG8gdGhlIG1vdmUgZnVuY3Rpb24gaW4gb3JkZXIgdG8gbW92ZSB0aGUgYnVsbGV0IGluIGEgc3RyYWlnaHQgbGluZVxuICAgICAgICAvL2RpcmVjdGx5IHRvIGl0cyBkZXN0aW5hdGlvbi5cbiAgICAgICAgaWYoTWF0aC5hYnMoZGlmZlgpID4gTWF0aC5hYnMoZGlmZlkpKSB7XG4gICAgICAgICAgICB0aGlzLmNvZWZmWCA9IGRpZmZYIC8gTWF0aC5hYnMoZGlmZlgpO1xuICAgICAgICAgICAgdGhpcy5jb2VmZlkgPSBkaWZmWSAvIE1hdGguYWJzKGRpZmZYKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29lZmZZID0gZGlmZlkgLyBNYXRoLmFicyhkaWZmWSk7XG4gICAgICAgICAgICB0aGlzLmNvZWZmWCA9IGRpZmZYIC8gTWF0aC5hYnMoZGlmZlkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxvYWRJbWFnZSh1cmwpIHtcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcbiAgICB9XG4gICAgLy9Nb3ZlcyB0aGUgYnVsbGV0IGZyb20gaXRzIHN0YXJ0aW5nIHBvaW50ICh3aGljaCB3aWxsIGJlIHRoZSBwbGF5ZXIncyBsb2NhdGlvbilcbiAgICAvL3RvIGl0cyBkZXN0aW5hdGlvbiAod2hpY2ggd2lsbCBiZSB0aGUgY3Vyc29yIGxvY2F0aW9uIHdoZW4gdGhlIGJ1bGxldCBpcyBjcmVhdGVkKS5cbiAgICAvL0VhY2ggdGltZSBtb3ZlIGlzIGNhbGxlZCBpdCBpcyBjaGVja2VkIGlmIHRoZSBidWxsZXQgaGl0cyBhbnl0aGluZywgaWYgaXQgZG9lcyB0aGVcbiAgICAvL2hpdFNvbWV0aGluZyBtZXRob2Qgd2lsbCBjYWxsIGEgZGFtYWdlIGZ1bmN0aW9uIGFuZCB0aGUgZGFtYWdlIHdpbGwgYmUgYXBwbGllZCwgc29cbiAgICAvL3RoaXMgZnVuY3Rpb24gc2V0cyB0aGlzLmxpdmUgPSBmYWxzZSBtZWFuaW5nIHRoZSBidWxsZXQgaXMgbm8gbG9uZ2VyIGxpdmUuXG4gICAgLy9JZiB0aGUgYnVsbGV0IGlzUGVuZXRyYXRpbmcgdGhhdCBtZWFucyBpdCB3aWxsIG5vdCBiZSBzZXQgdG8gJ2RlYWQnIHVwb24gYSBjb2xsaXNpb24gd2l0aCBzb21ldGhpbmdcbiAgICAvL1RoaXMgYWxsb3dzIHBlbmV0cmF0aW5nIGJ1bGxldHMgdG8gdHJhdmVsIHRocm91Z2ggbXVsdGlwbGUgdGFyZ2V0cyBhbmQgdGhyb3VnaCB3b3JsZCBvYmplY3RzLlxuICAgIG1vdmUobW9kaWZpZXIsIGVudmlyb25tZW50T2JqZWN0cywgZW5lbWllcyl7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyKnRoaXMuY29lZmZYO1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcip0aGlzLmNvZWZmWTtcbiAgICAgICAgaWYodGhpcy5oaXRTb21ldGhpbmcoZW52aXJvbm1lbnRPYmplY3RzLCBlbmVtaWVzKSAmJiB0aGlzLmlzUGVuZXRyYXRpbmcgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMueCA8IDAgfHwgdGhpcy54ID4gMTAwMDAgfHwgdGhpcy55IDwgMCB8fCB0aGlzLnkgPiA1NjI1KSB7XG4gICAgICAgICAgICB0aGlzLmxpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIC8vQ2hlY2tzIGlmIHRoZSBidWxsZXQgaGl0IGFueSBvZiBvdXIgb2JqZWN0cyB0aGF0IGNhbiBiZSBoaXQsIGlmIHNvIHRoYXQgb2JqZWN0IGxvc2VzIEhQXG4gICAgLy9hbmQgdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB0byBpbmRpY2F0ZSB0aGF0IHRoZSBvYmplY3Qgd2FzIGhpdC4gSWYgbm90LCBmYWxzZSBpcyByZXR1cm5lZFxuICAgIC8vYW5kIG5vdGhpbmcgaXMgZG9uZS5cbiAgICBkYW1hZ2VFbmVteShlbmVteU9iamVjdCkge1xuICAgICAgICBlbmVteU9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XG4gICAgfVxuXG4gICAgZGFtYWdlRW52aXJvbm1lbnQoZW52aXJvbm1lbnRPYmplY3Qpe1xuICAgICAgICBlbnZpcm9ubWVudE9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XG4gICAgfVxuICAgIC8vQ2hlY2tzIGlmIHdlIGhpdCBhbiBlbnZpcm9ubWVudCBvYmplY3QgdGhlbiBjaGVja3MgaWYgd2UgaGl0IGFuIGVuZW15LiBpbiBlaXRoZXIgY2FzZSBpdCBjYWxscyB0aGVcbiAgICAvL2NvcnJlc3BvbmRpbmcgZGFtYWdlIGZ1bmN0aW9uIGFuZCB0aGVuIHJldHVybnMgdHJ1ZSB0byBpbmRpY2F0ZSB0aGF0IHNvbWV0aGluZyB3YXMgaGl0LCB3aGljaCB0ZWxscyBtb3ZlIHRvIHNldCB0aGVcbiAgICAvL2J1bGxldCdzIGxpdmUgdmFsdWUgYWNjb3JkaW5nbHlcbiAgICBoaXRTb21ldGhpbmcoZW52aXJvbm1lbnRPYmplY3RzLCBlbmVtaWVzKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgZW52aXJvbm1lbnRPYmplY3RzW2ldKSAmJiBlbnZpcm9ubWVudE9iamVjdHNbaV0uaXNCbG9ja2luZykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlRW52aXJvbm1lbnQoZW52aXJvbm1lbnRPYmplY3RzW2ldKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZW5lbWllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbmVtaWVzW2ldKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VFbmVteShlbmVtaWVzW2ldKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ7XG4iLCJpbXBvcnQgQnVsbGV0IGZyb20gJy4vQnVsbGV0LmpzJztcclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG5cclxuLy9UaGUgNTAgY2FsaWJlciB3aWxsIHBlbmV0cmF0ZSB0aHJvdWdoIG9iamVjdHMgYW5kIG9ubHkgc3RvcHMgYmVpbmcgbGl2ZVxyXG4vL29uY2UgaXQgZXhpdHMgdGhlIGNhbnZhcywgc28gaXRzIGRhbWFnZSBpcyBzZXQgdG8gYSBzbWFsbCBudW1iZXIgYXMgaXQgZGVhbHNcclxuLy9kYW1hZ2UgZHVyaW5nIGVhY2ggZnJhbWUgYXMgaXQgcGVuZXRyYXRlcyB0aGUgb2JqZWN0IG9yIGVuZW15XHJcbmNsYXNzIEJ1bGxldDUwY2FsIGV4dGVuZHMgQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGRlc3RYLCBkZXN0WSkge1xyXG4gICAgICAgIHN1cGVyKDI1MDAsIDUsIHgsIHksIGRlc3RYLCBkZXN0WSwgdHJ1ZSk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvYnVsbGV0My5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1bGxldDUwY2FsO1xyXG4iLCJpbXBvcnQgQnVsbGV0IGZyb20gJy4vQnVsbGV0LmpzJztcclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG5cclxuLy9UaGUgNTAgY2FsaWJlciB3aWxsIHBlbmV0cmF0ZSB0aHJvdWdoIG9iamVjdHMgYW5kIG9ubHkgc3RvcHMgYmVpbmcgbGl2ZVxyXG4vL29uY2UgaXQgZXhpdHMgdGhlIGNhbnZhcywgc28gaXRzIGRhbWFnZSBpcyBzZXQgdG8gYSBzbWFsbCBudW1iZXIgYXMgaXQgZGVhbHNcclxuLy9kYW1hZ2UgZHVyaW5nIGVhY2ggZnJhbWUgYXMgaXQgcGVuZXRyYXRlcyB0aGUgb2JqZWN0IG9yIGVuZW15XHJcbmNsYXNzIEJ1bGxldDU1NiBleHRlbmRzIEJ1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBkZXN0WCwgZGVzdFkpIHtcclxuICAgICAgICBzdXBlcigxNTAwLCAxMiwgeCwgeSwgZGVzdFgsIGRlc3RZLCBmYWxzZSk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvYnVsbGV0My5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQnVsbGV0NTU2O1xyXG4iLCJpbXBvcnQgQnVsbGV0IGZyb20gJy4vQnVsbGV0LmpzJztcclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG4vL3RoZSA5bW0gYnVsbGV0IGlzIGEgc2ltcGxlIHBpc3RvbCBidWxsZXQgdGhhdCB3aWxsIGJlIGluIHRoZVxyXG4vL3VzZXIncyBzdGFydGluZyB3ZWFwb24uIGl0IGRvZXMgbWluaW1hbCBkYW1hZ2UgYW5kIG1vdmVzIGF0IGEgc2xvdyBzcGVlZC5cclxuLy90aGUgdmFsdWUgb2YgaXNQZW5ldHJhdGluZyBpcyBzZXQgdG8gZmFsc2UgdG8gaW5kaWNhdGUgdGhlIGJ1bGxldCBzaG91bGRcclxuLy9ub3QgYmUgbGl2ZSBhZnRlciBpdCBjb2xsaWRlcyB3aXRoIHNvbWV0aGluZyBhbmQgZG9lcyBpdHMgZGFtYWdlLlxyXG4vL2luIHRoZSBmdXR1cmUgdGhlIGJ1bGxldCB3aWxsIGhhdmUgYSBtYXhpbXVtIHJhbmdlL2xpdmUgdGltZSB0b1xyXG4vL2xpbWl0IGl0cyB1c2VmdWxuZXNzIG1vcmUuXHJcbmNsYXNzIEJ1bGxldDltbSBleHRlbmRzIEJ1bGxldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBkZXN0WCwgZGVzdFkpIHtcclxuICAgICAgICBzdXBlcigxMDAwLCAxMCwgeCwgeSwgZGVzdFgsIGRlc3RZLCBmYWxzZSk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvYnVsbGV0My5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1bGxldDltbTtcclxuIiwiLy9UaGUgc25pcGVyIGlzIG9ubHkgY3VycmVudGx5IHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSB0eXBlIG9mIGJ1bGxldCB0byBiZSBnZW5lcmF0ZWRcbi8vaW4gbWFpbi5qcycgZXZlbnQgaGFuZGxlciBmb3IgY2xpY2tzXG4vL0luIHRoZSBmdXR1cmUgaXQgd2lsbCBjb250cm9sIGZpcmUgcmF0ZSBhbmQgdGhlIGFtbW8gY2FwYWNpdHkuXG5pbXBvcnQgV2VhcG9uIGZyb20gJy4vV2VhcG9uLmpzJztcblxuY2xhc3MgUGlzdG9sIGV4dGVuZHMgV2VhcG9ue1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKDE1LCA5MCk7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiUGlzdG9sXCI7XG4gICAgICAgIHN1cGVyLmxvYWRTaG9vdFNvdW5kKCdBdWRpby9QaXN0b2xTaG90Lm1wMycpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGlzdG9sO1xuIiwiLy9UaGUgc25pcGVyIGlzIG9ubHkgY3VycmVudGx5IHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSB0eXBlIG9mIGJ1bGxldCB0byBiZSBnZW5lcmF0ZWRcclxuLy9pbiBtYWluLmpzJyBldmVudCBoYW5kbGVyIGZvciBjbGlja3NcclxuLy9JbiB0aGUgZnV0dXJlIGl0IHdpbGwgY29udHJvbCBmaXJlIHJhdGUgYW5kIHRoZSBhbW1vIGNhcGFjaXR5LlxyXG5pbXBvcnQgV2VhcG9uIGZyb20gJy4vV2VhcG9uLmpzJztcclxuXHJcbmNsYXNzIFNuaXBlciBleHRlbmRzIFdlYXBvbntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoNSwgMzApO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiU25pcGVyXCI7XHJcbiAgICAgICAgc3VwZXIubG9hZFNob290U291bmQoJ0F1ZGlvL1NuaXBlclNob3QubXAzJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNuaXBlcjtcclxuIiwiLy9jbGlwU2l6ZSBhbmQgYW1tbyB3aWxsIGJlIHVzZWQgYXMgZXhwZWN0ZWQgbmV4dCB3ZWVrXG4vL2F1dG9tYXRpYyB3aWxsIGJlIHVzZWQgYXMgYSBib29sZWFuIGZvciB3aGV0aGVyIG9yIG5vdFxuLy9ob2xkaW5nIGNsaWNrIHNob3VsZCBjb250aW51b3VzbHkgZmlyZS5cbi8vVGhlIG5hbWUgZmllbGQgaXMgdXNlZCBmb3IgdGhlIEhVRCBkaXNwbGF5aW5nIHRoZSBhY3RpdmUgd2VhcG9uLlxuY2xhc3MgV2VhcG9uIHtcblxuICAgIGNvbnN0cnVjdG9yKGNsaXBTaXplLCBtYXhBbW1vKSB7XG4gICAgICAgIHRoaXMuY2xpcFNpemUgPSBjbGlwU2l6ZTtcbiAgICAgICAgdGhpcy5tYXhBbW1vID0gbWF4QW1tbztcbiAgICAgICAgdGhpcy5uYW1lID0gJyc7XG4gICAgICAgIHRoaXMuY29vbGRvd24gPSAwO1xuICAgIH1cbiAgICBsb2FkU2hvb3RTb3VuZCh1cmwpIHtcbiAgICAgICAgdGhpcy5pc1NvdW5kTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc291bmQgPSBuZXcgQXVkaW8oKTtcbiAgICAgICAgdGhpcy5zb3VuZC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzU291bmRMb2FkZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNvdW5kLnNyYyA9IHVybDtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2VhcG9uO1xuIl19
