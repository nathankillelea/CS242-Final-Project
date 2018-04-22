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

/**
 *
 */
var Controller = function () {

    /**
     *
     * @param documentBody
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
     *
     * @param key
     * @returns {*}
     */


    _createClass(Controller, [{
        key: "isKeyPressed",
        value: function isKeyPressed(key) {
            return this.keysPressed[key];
        }

        /**
         *
         * @returns {boolean}
         */

    }, {
        key: "isMousePressed",
        value: function isMousePressed() {
            return this.mousePressed;
        }

        /**
         *
         * @returns {number[]}
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

var _GroundWeapon = require('../Graphics/GroundWeapon.js');

var _GroundWeapon2 = _interopRequireDefault(_GroundWeapon);

var _GroundAssaultRifle = require('../Graphics/GroundAssaultRifle.js');

var _GroundAssaultRifle2 = _interopRequireDefault(_GroundAssaultRifle);

var _GroundSniper = require('../Graphics/GroundSniper.js');

var _GroundSniper2 = _interopRequireDefault(_GroundSniper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 */
var Game = function () {

    /**
     *
     * @param canvas
     * @param documentBody
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
     *
     * @param modifier
     */


    _createClass(Game, [{
        key: 'update',
        value: function update(modifier) {
            if (this.gameState === 'Playing') {
                if (this.world.player.health <= 0) this.gameState = 'Game Over';else if (this.controller.isKeyPressed(27)) this.gameState = 'Paused';
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

                    //Fire the correct bullet type for the currently equipped weapon.
                    //This could be done more gracefully in the future
                    if (wep instanceof _Pistol2.default) {
                        if (wep.cooldown <= 0) {
                            this.world.bullets.push(new _Bullet9mm2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y, this.controller.mouse[0] + this.world.camera.x, this.controller.mouse[1] + this.world.camera.y));
                            wep.sound.play();
                            wep.sound.currentTime = 0;
                            wep.cooldown += 300;
                        }
                    } else if (wep instanceof _Sniper2.default) {
                        if (wep.cooldown <= 0) {
                            this.world.bullets.push(new _Bullet50cal2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y, this.controller.mouse[0] + this.world.camera.x, this.controller.mouse[1] + this.world.camera.y));
                            wep.sound.play();
                            wep.sound.currentTime = 0;
                            wep.cooldown += 1200;
                        }
                    } else if (wep instanceof _AssaultRifle2.default) {
                        if (wep.cooldown <= 0) {
                            this.world.bullets.push(new _Bullet2.default(this.world.player.x + this.world.player.width / 2, this.world.player.y, this.controller.mouse[0] + this.world.camera.x, this.controller.mouse[1] + this.world.camera.y));
                            wep.sound.play();
                            wep.sound.currentTime = 0;
                            wep.cooldown += 100;
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
         *
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

                this.drawEnemies();
                this.drawEnvironmentObjects();
                this.drawWeapons();
                this.drawBullets();
                this.drawEnemyProjectiles();

                if (this.world.player.isImageLoaded) {
                    this.world.player.draw(this.ctx, this.world.camera, this.controller.mouse);
                    this.drawHUD();
                    this.drawMiniMap();
                }
            }
            this.ctx.drawImage(this.cursor.image, this.controller.mouse[0] - this.cursor.image.width / 2, this.controller.mouse[1] - this.cursor.image.height / 2);
        }

        /**
         *
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
            for (var _i5 = 0; _i5 < this.world.enemies.length; _i5++) {
                if (this.world.enemies[_i5].isImageLoaded) {
                    var _xPercent2 = (this.world.enemies[_i5].x + this.world.enemies[_i5].width / 2) / this.world.width;
                    var _yPercent2 = (this.world.enemies[_i5].y + this.world.enemies[_i5].height / 2) / this.world.height;
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
         *
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
         *
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
         *
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
         *
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
         *
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
         *
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
         *
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
    }]);

    return Game;
}();

exports.default = Game;

},{"../Cursor.js":1,"../Enemies/EnemyProjectile":3,"../Enemies/MiniBoss":5,"../Enemies/ProjectileEnemy":6,"../EnvironmentObjects/Bush":9,"../EnvironmentObjects/Crate":10,"../EnvironmentObjects/Rock":12,"../Graphics/GroundAssaultRifle.js":16,"../Graphics/GroundSniper.js":17,"../Graphics/GroundWeapon.js":18,"../Weapons/AssaultRifle":23,"../Weapons/Bullet50cal":25,"../Weapons/Bullet556":26,"../Weapons/Bullet9mm":27,"../Weapons/Pistol":28,"../Weapons/Sniper":29,"./Controller.js":13,"./World.js":15}],15:[function(require,module,exports){
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

var _GroundAssaultRifle = require("../Graphics/GroundAssaultRifle.js");

var _GroundAssaultRifle2 = _interopRequireDefault(_GroundAssaultRifle);

var _GroundSniper = require("../Graphics/GroundSniper.js");

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
            var sniperCap = 3;
            var assaultRifleCap = 5;

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

},{"../Enemies/LightEnemy":4,"../Enemies/MiniBoss":5,"../Enemies/ProjectileEnemy":6,"../Enemies/RegularEnemy":7,"../Enemies/TankEnemy":8,"../EnvironmentObjects/Bush":9,"../EnvironmentObjects/Crate":10,"../EnvironmentObjects/Rock":12,"../Graphics/GroundAssaultRifle.js":16,"../Graphics/GroundSniper.js":17,"../Players/Camera":20,"../Players/Player":21,"../Utilities/Util":22}],16:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDdXJzb3IuanMiLCJFbmVtaWVzL0VuZW15LmpzIiwiRW5lbWllcy9FbmVteVByb2plY3RpbGUuanMiLCJFbmVtaWVzL0xpZ2h0RW5lbXkuanMiLCJFbmVtaWVzL01pbmlCb3NzLmpzIiwiRW5lbWllcy9Qcm9qZWN0aWxlRW5lbXkuanMiLCJFbmVtaWVzL1JlZ3VsYXJFbmVteS5qcyIsIkVuZW1pZXMvVGFua0VuZW15LmpzIiwiRW52aXJvbm1lbnRPYmplY3RzL0J1c2guanMiLCJFbnZpcm9ubWVudE9iamVjdHMvQ3JhdGUuanMiLCJFbnZpcm9ubWVudE9iamVjdHMvRW52aXJvbm1lbnRPYmplY3QuanMiLCJFbnZpcm9ubWVudE9iamVjdHMvUm9jay5qcyIsIkdhbWUvQ29udHJvbGxlci5qcyIsIkdhbWUvR2FtZS5qcyIsIkdhbWUvV29ybGQuanMiLCJHcmFwaGljcy9Hcm91bmRBc3NhdWx0UmlmbGUuanMiLCJHcmFwaGljcy9Hcm91bmRTbmlwZXIuanMiLCJHcmFwaGljcy9Hcm91bmRXZWFwb24uanMiLCJNYWluLmpzIiwiUGxheWVycy9DYW1lcmEuanMiLCJQbGF5ZXJzL1BsYXllci5qcyIsIlV0aWxpdGllcy9VdGlsLmpzIiwiV2VhcG9ucy9Bc3NhdWx0UmlmbGUuanMiLCJXZWFwb25zL0J1bGxldC5qcyIsIldlYXBvbnMvQnVsbGV0NTBjYWwuanMiLCJXZWFwb25zL0J1bGxldDU1Ni5qcyIsIldlYXBvbnMvQnVsbGV0OW1tLmpzIiwiV2VhcG9ucy9QaXN0b2wuanMiLCJXZWFwb25zL1NuaXBlci5qcyIsIldlYXBvbnMvV2VhcG9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtJQUNNLE07QUFDRixzQkFBYztBQUFBOztBQUNWLGFBQUssU0FBTDtBQUNIOzs7O29DQUVXO0FBQUE7O0FBQ1IsaUJBQUssYUFBTCxHQUFxQixL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Q0E7Ozs7Ozs7Ozs7OztJQUVNLE07OztBQUNGLHNCQUFhO0FBQUE7O0FBQUEsb0hBQ0gsRUFERyxFQUNDLEVBREQ7O0FBRVQsY0FBSyxJQUFMLEdBQVksUUFBWjtBQUNBLHlIQUFxQixzQkFBckI7QUFIUztBQUlaOzs7OztrQkFHVSxNOzs7Ozs7Ozs7NGVDYmY7QUFDQTtBQUNBOzs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU0sTTs7O0FBQ0Ysc0JBQWE7QUFBQTs7QUFBQSxvSEFDSCxDQURHLEVBQ0EsRUFEQTs7QUFFVCxjQUFLLElBQUwsR0FBWSxRQUFaO0FBQ0EseUhBQXFCLHNCQUFyQjtBQUhTO0FBSVo7Ozs7O2tCQUdVLE07Ozs7Ozs7Ozs7Ozs7QUNiZjtBQUNBO0FBQ0E7QUFDQTtJQUNNLE07QUFFRixvQkFBWSxRQUFaLEVBQXNCLE9BQXRCLEVBQStCO0FBQUE7O0FBQzNCLGFBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLGFBQUssT0FBTCxHQUFlLE9BQWY7QUFDQSxhQUFLLElBQUwsR0FBWSxFQUFaO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLENBQWhCO0FBQ0g7Ozs7dUNBQ2MsRyxFQUFLO0FBQUE7O0FBQ2hCLGlCQUFLLGFBQUwsR0FBcUIsS0FBckI7QUFDQSxpQkFBSyxLQUFMLEdBQWEsSUFBSSxLQUFKLEVBQWI7QUFDQSxpQkFBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixZQUFNO0FBQ3RCLHNCQUFLLGFBQUwsR0FBcUIsSUFBckI7QUFDSCxhQUZEO0FBR0EsaUJBQUssS0FBTCxDQUFXLEdBQVgsR0FBaUIsR0FBakI7QUFDSDs7Ozs7O2tCQUlVLE0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL0p1c3QgYSBwbHVzIGN1cnNvciB0byBiZSByZW5kZXJlZCBhdCB0aGVcclxuLy9jdXJzb3IncyBsb2NhdGlvbiBlYWNoIFVwZGF0ZVxyXG4vL1RoZSBjdXJzb3IgZm9yIHRoZSBlbnRpcmUgSFRNTCBkb2N1bWVudCBpcyB0dXJuZWQgb2ZmIHZpYSBzdHlsaW5nIG9uIHRoZSBkb2N1bWVudC5cclxuY2xhc3MgQ3Vyc29yIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEltYWdlKCkge1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gXCJHcmFwaGljcy9jcm9zc2hhaXIucG5nXCI7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQ3Vyc29yO1xyXG4iLCIvKipcclxuICogU291cmNlczpcclxuICogaHR0cHM6Ly9tZWRpdW0uY29tL0B5dXJpYmV0dC9qYXZhc2NyaXB0LWFic3RyYWN0LW1ldGhvZC13aXRoLWVzNi01ZGJlYTRiMDAwMjdcclxuICogaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1JNWRBUnBBUGxOa1xyXG4gKi9cclxuXHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgRW5lbXkgY2xhc3MgaXMgdGhlIHBhcmVudCBjbGFzcyBmb3IgYWxsIG9mIHRoZSBlbmVtaWVzLlxyXG4gKi9cclxuY2xhc3MgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHZlbG9jaXR5IFRoZSB2ZWxvY2l0eSBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gaGVhbHRoIFRoZSBoZWFsdGggb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIGRhbWFnZSBUaGUgZGFtYWdlIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSBwb2ludHNPbktpbGwgVGhlIHBvaW50cyByZXdhcmRlZCBmb3Iga2lsbGluZyB0aGUgRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIHZlbG9jaXR5LCBoZWFsdGgsIGRhbWFnZSwgcG9pbnRzT25LaWxsKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuYW5nbGUgPSBNYXRoLlBJLzI7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5O1xyXG4gICAgICAgIHRoaXMuaGVhbHRoID0gaGVhbHRoO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlO1xyXG4gICAgICAgIHRoaXMucG9pbnRzT25LaWxsID0gcG9pbnRzT25LaWxsO1xyXG4gICAgICAgIHRoaXMuYXR0YWNrQ29vbGRvd24gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiB0YWtlcyBpbiBhIHVybCBhbmQgbG9hZHMgaXQgYXMgYW4gSW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0ltYWdlTG9hZGVkIGlzXHJcbiAgICAgKiBzZXQgdG8gdHJ1ZS4gVGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIEVuZW15IGFyZSBzZXQgdG8gdGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIGltYWdlLlxyXG4gICAgICogQHBhcmFtIHVybCBUaGUgdXJsIHRoYXQgc2hvdWxkIGJlIGxvYWRlZC5cclxuICAgICAqL1xyXG4gICAgbG9hZEltYWdlKHVybCkge1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhdHRhY2sgZnVuY3Rpb24gdGFrZXMgaW4gYW4gb2JqZWN0IGFuZCByZW1vdmVzIHRoZSBhbW91bnQgb2YgZGFtYWdlIHRoZSBFbmVteSBkZWFscyBmcm9tIHRoZWlyIGhlYWx0aC5cclxuICAgICAqIDUwMCBpcyBhZGRlZCB0byB0aGUgYXR0YWNrIGNvb2xkb3duIG9mIHRoZSBlbmVteSBhZnRlciBhbiBhdHRhY2suXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3QgdGhhdCBpcyBiZWluZyBhdHRhY2tlZC5cclxuICAgICAqL1xyXG4gICAgYXR0YWNrKG9iamVjdCkge1xyXG4gICAgICAgIG9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tDb29sZG93biArPSA1MDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlcyB0aGUgZW5lbXkgdG93YXJkcyB0aGUgcGxheWVyLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdCB0byBtb3ZlIHRvd2FyZHMuXHJcbiAgICAgKiBAcGFyYW0gbW9kaWZpZXIgVGhlIG1vZGlmaWVyIHRvIGJlIG11bHRpcGxpZWQgYnkgdGhlIHZlbG9jaXR5LlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0cyBBbiBhcnJheSBvZiBlbnZpcm9ubWVudCBvYmplY3RzLlxyXG4gICAgICovXHJcbiAgICBtb3ZlKHBsYXllciwgbW9kaWZpZXIsIGVudmlyb25tZW50T2JqZWN0cykge1xyXG4gICAgICAgIGxldCBkaWZmWCA9IHBsYXllci54IC0gdGhpcy54O1xyXG4gICAgICAgIGxldCBkaWZmWSA9IHBsYXllci55IC0gdGhpcy55O1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBNYXRoLnNxcnQoZGlmZlggKiBkaWZmWCArIGRpZmZZICogZGlmZlkpO1xyXG4gICAgICAgIGlmKGxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICBkaWZmWCAvPSBsZW5ndGg7XHJcbiAgICAgICAgICAgIGRpZmZZIC89IGxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYW5nbGUgPSBNYXRoLmF0YW4yKGRpZmZZLCBkaWZmWCk7XHJcblxyXG4gICAgICAgIGlmKGRpZmZYID4gMCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnggKyB0aGlzLndpZHRoIDw9IDEwMDAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZGlmZlggPCAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMueCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggLT0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRpZmZZID4gMCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnkgKyB0aGlzLmhlaWdodCA8PSA1NjI1KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZGlmZlkgPCAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMueSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgLT0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIHBsYXllcikgJiYgdGhpcy5hdHRhY2tDb29sZG93biA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlYWx0aCBiZWZvcmUgYXR0YWNrXCIgKyBwbGF5ZXIuaGVhbHRoKTtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2socGxheWVyKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWFsdGggYWZ0ZXIgYXR0YWNrXCIgKyBwbGF5ZXIuaGVhbHRoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBlbmVteSBnaXZlbiB4IGFuZCB5LlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gdG8gYmUgc2V0LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gdG8gYmUgc2V0LlxyXG4gICAgICovXHJcbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyBhIGhlbHBlciBmdW5jdGlvbiB1c2VkIGJ5IHRoZSBtb3ZlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBpZiB0aGVyZSBpcyBhIGNvbGxpc2lvbiBiZXR3ZWVuIGFuXHJcbiAgICAgKiBlbnZpcm9ubWVudCBvYmplY3QgYW5kIHRoZSBlbmVteS4gSWYgdGhlcmUgaXMgYSBjb2xsaXNpb24sIHRoZSBvYmplY3QgaXMgYXR0YWNrZWQuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3RzIEFuIGFycmF5IG9mIGVudmlyb25tZW50IG9iamVjdHMuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBhIGNvbGxpc2lvbiBleGlzdHMuXHJcbiAgICAgKi9cclxuICAgIGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KGVudmlyb25tZW50T2JqZWN0cykge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbnZpcm9ubWVudE9iamVjdHNbaV0pICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmF0dGFja0Nvb2xkb3duID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2soZW52aXJvbm1lbnRPYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkcmF3IGZ1bmN0aW9uIGRyYXdzIHRoZSBpbWFnZSBvbiB0aGUgY2FudmFzIGF0IHRoZSB4IGFuZCB5IHBvc2l0aW9uIG9mIHRoZSBMaWdodEVuZW15LlxyXG4gICAgICogQHBhcmFtIGN0eCBUaGUgY29udGV4dCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIGNhbWVyYSBUaGUgY2FtZXJhIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xyXG4gICAgICAgIC8vY3R4LnNhdmUoKTtcclxuICAgICAgICAvL2N0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgICAgIC8vY3R4LnJvdGF0ZSh0aGlzLmFuZ2xlICsgTWF0aC5QSS8yLjApO1xyXG4gICAgICAgIC8vY3R4LnRyYW5zbGF0ZSgtdGhpcy54LCAtdGhpcy55KTtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XHJcbiAgICAgICAgLy9jdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFbmVteTsiLCJpbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIEVuZW15UHJvamVjdGlsZSBjbGFzcyBpcyB0aGUgb2JqZWN0IHRoYXQgaXMgZmlyZWQgZnJvbSB0aGUgUHJvamVjdGlsZUVuZW15IGVuZW15LlxyXG4gKi9cclxuY2xhc3MgRW5lbXlQcm9qZWN0aWxlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBFbmVteVByb2plY3RpbGUgY2xhc3MgYW5kIGdldHMgdGhlIHggYW5kIHkgY29lZmZpY2llbnRzIGZvciB1c2VcclxuICAgICAqIGluIHRoZSBtb3ZlIGZ1bmN0aW9uLiBUaGUgbG9hZEltYWdlIGZ1bmN0aW9uIGlzIGFsc28gY2FsbGVkLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gZGVzdFggVGhlIHggZGVzdGluYXRpb24gb2YgdGhlIEVuZW15UHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBkZXN0WSBUaGUgeSBkZXN0aW5hdGlvbiBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBkZXN0WCwgZGVzdFkpIHtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gNjAwO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlID0gNTtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy5saXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgZGlmZlggPSBkZXN0WCAtIHRoaXMueDtcclxuICAgICAgICBsZXQgZGlmZlkgPSBkZXN0WSAtIHRoaXMueTtcclxuICAgICAgICBpZihNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jb2VmZlggPSBkaWZmWCAvIE1hdGguYWJzKGRpZmZYKTtcclxuICAgICAgICAgICAgdGhpcy5jb2VmZlkgPSBkaWZmWSAvIE1hdGguYWJzKGRpZmZYKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29lZmZZID0gZGlmZlkgLyBNYXRoLmFicyhkaWZmWSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZEltYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIG1vdmVzIHRoZSBFbmVteVByb2plY3RpbGUgYWNjb3JkaW5nIHRvIHRoZSB4IGFuZCB5IGNvZWZmaWNpZW50cy5cclxuICAgICAqIEBwYXJhbSBtb2RpZmllciBUaGUgbW9kaWZpZXIgdG8gYmUgbXVsdGlwbGllZCBieSB0aGUgdmVsb2NpdHkuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3RzIFRoZSBhcnJheSBvZiBlbnZpcm9ubWVudCBvYmplY3RzLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgbW92ZShtb2RpZmllciwgZW52aXJvbm1lbnRPYmplY3RzLCBwbGF5ZXIpIHtcclxuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcip0aGlzLmNvZWZmWDtcclxuICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcip0aGlzLmNvZWZmWTtcclxuICAgICAgICBpZih0aGlzLmhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIHBsYXllcikpIHtcclxuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMueCA8IDAgfHwgdGhpcy54ID4gMTAwMDAgfHwgdGhpcy55IDwgMCB8fCB0aGlzLnkgPiA1NjI1KXtcclxuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB0YWtlcyBhd2F5IGhlYWx0aCBmcm9tIHRoZSBwbGF5ZXIgZXF1YWwgdG8gdGhlIGRhbWFnZSBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZGFtYWdlUGxheWVyKHBsYXllcikge1xyXG4gICAgICAgIHBsYXllci5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGF3YXkgaGVhbHRoIGZyb20gdGhlIGVudmlyb25tZW50IG9iamVjdCBlcXVhbCB0byB0aGUgZGFtYWdlIG9mIHRoZSBFbmVteVByb2plY3RpbGUuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3QgVGhlIGVudmlyb25tZW50IG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZGFtYWdlRW52aXJvbm1lbnQoZW52aXJvbm1lbnRPYmplY3Qpe1xyXG4gICAgICAgIGVudmlyb25tZW50T2JqZWN0LmhlYWx0aCAtPSB0aGlzLmRhbWFnZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIGFuIGVudmlyb25tZW50IG9iamVjdCBvciBhIHBsYXllciB3ZXJlIGhpdCBieSB0aGUgcHJvamVjdGlsZS5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdHMgVGhlIGFycmF5IG9mIGVudmlyb25tZW50IG9iamVjdHMuXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyIFRoZSBwbGF5ZXIgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHNvbWV0aGluZyB3YXMgaGl0LlxyXG4gICAgICovXHJcbiAgICBoaXRTb21ldGhpbmcoZW52aXJvbm1lbnRPYmplY3RzLCBwbGF5ZXIpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKFV0aWwuaXNDb2xsaXNpb24odGhpcywgZW52aXJvbm1lbnRPYmplY3RzW2ldKSAmJiBlbnZpcm9ubWVudE9iamVjdHNbaV0uaXNCbG9ja2luZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VFbnZpcm9ubWVudChlbnZpcm9ubWVudE9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBwbGF5ZXIpKXtcclxuICAgICAgICAgICAgdGhpcy5kYW1hZ2VQbGF5ZXIocGxheWVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsb2FkSW1hZ2UgZnVuY3Rpb24gbG9hZHMgdGhlIHVybCBhcyBhbiBJbWFnZS4gT25jZSB0aGUgaW1hZ2UgaXMgbG9hZGVkLCB0aGlzLmlzSW1hZ2VMb2FkZWQgaXNcclxuICAgICAqIHNldCB0byB0cnVlLiBUaGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlIGFyZSBzZXQgdG8gdGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIGltYWdlLlxyXG4gICAgICovXHJcbiAgICBsb2FkSW1hZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gXCJHcmFwaGljcy9FbmVteVByb2plY3RpbGUucG5nXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZHJhdyBmdW5jdGlvbiBkcmF3cyB0aGUgaW1hZ2Ugb24gdGhlIGNhbnZhcyBhdCB0aGUgeCBhbmQgeSBwb3NpdGlvbiBvZiB0aGUgRW5lbXlQcm9qZWN0aWxlLlxyXG4gICAgICogQHBhcmFtIGN0eCBUaGUgY29udGV4dCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIGNhbWVyYSBUaGUgY2FtZXJhIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRW5lbXlQcm9qZWN0aWxlOyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgTGlnaHRFbmVteSBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaXMgYSBmYXN0IGVuZW15IHdpdGggbG93IGhlYWx0aC5cclxuICovXHJcbmNsYXNzIExpZ2h0RW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgTGlnaHRFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gMTI4LCB0aGUgaGVhbHRoIHNldCB0byAxMCwgdGhlIGRhbWFnZSBzZXQgdG8gMTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gNTAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgTGlnaHRFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBMaWdodEVuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMTI4LCAxMCwgMTAsIDUwKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9MaWdodEVuZW15LnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlnaHRFbmVteTsiLCJpbXBvcnQgRW5lbXkgZnJvbSAnLi9FbmVteS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIE1pbmlCb3NzIGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBpcyBhIGhpZ2ggaGVhbHRoIGFuZCBkYW1hZ2UgZW5lbXkuXHJcbiAqL1xyXG5jbGFzcyBNaW5pQm9zcyBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBNaW5pQm9zcy4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gMTI4LCB0aGUgaGVhbHRoIHNldCB0byA1MDAsIHRoZSBkYW1hZ2Ugc2V0IHRvIDUwLCBhbmQgdGhlIHBvaW50c09uS2lsbFxyXG4gICAgICogc2V0IHRvIDEwMDAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgTWluaUJvc3MuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgTWluaUJvc3MuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAxMjgsIDUwMCwgNTAsIDEwMDApO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93biA9IDIwMDtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SYXRlID0gMTtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SZXNldCA9IDIwMDtcclxuICAgICAgICB0aGlzLnNob290QW1vdW50ID0gNTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9NaW5pQm9zcy5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1pbmlCb3NzOyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUHJvamVjdGlsZUVuZW15IGNsYXNzIGV4dGVuZHMgdGhlIGVuZW15IGNsYXNzLiBJdCBjYW4gc2hvb3QgcHJvamVjdGlsZXMgYXQgdGhlIHBsYXllci5cclxuICovXHJcbmNsYXNzIFByb2plY3RpbGVFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBQcm9qZWN0aWxlRW5lbXkuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDk2LCB0aGUgaGVhbHRoIHNldCB0byA0MCwgdGhlIGRhbWFnZSBzZXQgdG8gMTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gMjUwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFByb2plY3RpbGVFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBQcm9qZWN0aWxlRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCA5NiwgNDAsIDEwLCAyNTApO1xyXG4gICAgICAgIHRoaXMuc2hvb3RDb29sZG93biA9IDMwMDtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SYXRlID0gMTtcclxuICAgICAgICB0aGlzLnNob290Q29vbGRvd25SZXNldCA9IDMwMDtcclxuICAgICAgICB0aGlzLnNob290QW1vdW50ID0gMTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9Qcm9qZWN0aWxlRW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0aWxlRW5lbXk7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBSZWd1bGFyRW5lbXkgY2xhc3MgZXh0ZW5kcyB0aGUgRW5lbXkgY2xhc3MuIEl0IGhhcyBiYWxhbmNlZCBzdGF0cyBhY3Jvc3MgdGhlIGJvYXJkLlxyXG4gKi9cclxuY2xhc3MgUmVndWxhckVuZW15IGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFJlZ3VsYXJFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gNjQsIHRoZSBoZWFsdGggc2V0IHRvIDI1LCB0aGUgZGFtYWdlIHNldCB0byAxMCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byAxMDAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgUmVndWxhckVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFJlZ3VsYXJFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDY0LCAyNSwgMTAsIDEwMCk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvUmVndWxhckVuZW15LnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVndWxhckVuZW15OyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgVGFua0VuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBpcyBhIHNsb3cgZW5lbXkgd2l0aCBoaWdoIGhlYWx0aCBhbmQgZGFtYWdlLlxyXG4gKi9cclxuY2xhc3MgVGFua0VuZW15IGV4dGVuZHMgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFRhbmtFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gMzIsIHRoZSBoZWFsdGggc2V0IHRvIDEwMCwgdGhlIGRhbWFnZSBzZXQgdG8gMjUsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gNTAwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFRhbmtFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBUYW5rRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAzMiwgMTAwLCAgMjUsIDUwMCk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvVGFua0VuZW15LnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFua0VuZW15OyIsImltcG9ydCBFbnZpcm9ubWVudE9iamVjdCBmcm9tICcuL0Vudmlyb25tZW50T2JqZWN0LmpzJztcblxuLyoqXG4gKiBUaGUgQnVzaCBjbGFzcyBleHRlbmRzIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzcy4gSXQgaXMgYSBub24tYmxvY2tpbmcgb2JqZWN0LlxuICovXG5jbGFzcyBCdXNoIGV4dGVuZHMgRW52aXJvbm1lbnRPYmplY3Qge1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEJ1c2guIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzc2VzIGNvbnN0cnVjdG9yXG4gICAgICogd2l0aCB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIGhlYWx0aCBzZXQgdG8gMTAwMDAwLCBhbmQgaXNCbG9ja2luZyBzZXQgdG8gZmFsc2UuXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEJ1c2guXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIEJ1c2guXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICBzdXBlcih4LCB5LCAxMDAwMDAsIGZhbHNlKTtcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvQnVzaC5wbmdcIik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdXNoOyIsImltcG9ydCBFbnZpcm9ubWVudE9iamVjdCBmcm9tICcuL0Vudmlyb25tZW50T2JqZWN0LmpzJztcblxuLyoqXG4gKiBUaGUgQ3JhdGUgY2xhc3MgZXh0ZW5kcyB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3MuIEl0IGlzIGEgYmxvY2tpbmcgb2JqZWN0IHdpdGggbG93IGhlYWx0aC5cbiAqL1xuY2xhc3MgQ3JhdGUgZXh0ZW5kcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgQ3JhdGUuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzc2VzIGNvbnN0cnVjdG9yXG4gICAgICogd2l0aCB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIGhlYWx0aCBzZXQgdG8gMTAwLCBhbmQgaXNCbG9ja2luZyBzZXQgdG8gdHJ1ZS5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgQ3JhdGUuXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIENyYXRlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgMTAwLCB0cnVlKTtcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvQ3JhdGUucG5nXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ3JhdGU7XG4iLCIvKipcbiAqIFRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzcyBpcyB0aGUgcGFyZW50IGZvciBhbGwgZW52aXJvbm1lbnQgb2JqZWN0cy5cbiAqL1xuY2xhc3MgRW52aXJvbm1lbnRPYmplY3Qge1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIGhlYWx0aCBUaGUgaGVhbHRoIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0gaXNCbG9ja2luZyBXaGV0aGVyIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjYW4gYmUgd2Fsa2VkIHRocm91Z2guXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSwgaGVhbHRoLCBpc0Jsb2NraW5nKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gaGVhbHRoO1xuICAgICAgICB0aGlzLmlzQmxvY2tpbmcgPSBpc0Jsb2NraW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gc2V0cyB0aGUgcG9zaXRpb24gb2YgdGhlIGVudmlyb25tZW50IG9iamVjdCBnaXZlbiB4IGFuZCB5LlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIHRvIGJlIHNldC5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiB0byBiZSBzZXQuXG4gICAgICovXG4gICAgc2V0UG9zaXRpb24oeCwgeSkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBsb2FkSW1hZ2UgZnVuY3Rpb24gdGFrZXMgaW4gYSB1cmwgYW5kIGxvYWRzIGl0IGFzIGFuIEltYWdlLiBPbmNlIHRoZSBpbWFnZSBpcyBsb2FkZWQsIHRoaXMuaXNJbWFnZUxvYWRlZCBpc1xuICAgICAqIHNldCB0byB0cnVlLiBUaGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QgYXJlIHNldCB0byB0aGUgaGVpZ2h0IGFuZCB3aWR0aCBvZiB0aGUgaW1hZ2UuXG4gICAgICogQHBhcmFtIHVybCBUaGUgdXJsIHRoYXQgc2hvdWxkIGJlIGxvYWRlZC5cbiAgICAgKi9cbiAgICBsb2FkSW1hZ2UodXJsKSB7XG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB1cmw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGRyYXcgZnVuY3Rpb24gZHJhd3MgdGhlIGltYWdlIG9uIHRoZSBjYW52YXMgYXQgdGhlIHggYW5kIHkgcG9zaXRpb24gb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSBjdHggVGhlIGNvbnRleHQgb2YgdGhlIGNhbnZhcy5cbiAgICAgKiBAcGFyYW0gY2FtZXJhIFRoZSBjYW1lcmEgb2JqZWN0LlxuICAgICAqL1xuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW52aXJvbm1lbnRPYmplY3Q7IiwiaW1wb3J0IEVudmlyb25tZW50T2JqZWN0IGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3QuanMnO1xuXG4vKipcbiAqIFRoZSBSb2NrIGNsYXNzIGV4dGVuZHMgdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzLiBJdCBpcyBhIGJsb2NraW5nIG9iamVjdCB3aXRoIGhpZ2ggaGVhbHRoLlxuICovXG5jbGFzcyBSb2NrIGV4dGVuZHMgRW52aXJvbm1lbnRPYmplY3Qge1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFJvY2suIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzc2VzIGNvbnN0cnVjdG9yXG4gICAgICogd2l0aCB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIGhlYWx0aCBzZXQgdG8gMzAwLCBhbmQgaXNCbG9ja2luZyBzZXQgdG8gdHJ1ZS5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgUm9jay5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgUm9jay5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHN1cGVyKHgsIHksIDMwMCwgdHJ1ZSk7XG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1JvY2sucG5nXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUm9jaztcbiIsIi8qKlxyXG4gKlxyXG4gKi9cclxuY2xhc3MgQ29udHJvbGxlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRvY3VtZW50Qm9keVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudEJvZHkpIHtcclxuICAgICAgICB0aGlzLmtleXNQcmVzc2VkID0gW107XHJcbiAgICAgICAgdGhpcy5tb3VzZSA9IFswLCAwXTtcclxuICAgICAgICB0aGlzLm1vdXNlUHJlc3NlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBkb2N1bWVudEJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMua2V5c1ByZXNzZWRbZXZlbnQua2V5Q29kZV0gPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudEJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmtleXNQcmVzc2VkW2V2ZW50LmtleUNvZGVdID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50Qm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZVswXSA9IGV2ZW50LmNsaWVudFg7XHJcbiAgICAgICAgICAgIHRoaXMubW91c2VbMV0gPSBldmVudC5jbGllbnRZO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudEJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubW91c2VQcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnRCb2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZVByZXNzZWQgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xyXG4gICAgaXNLZXlQcmVzc2VkKGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmtleXNQcmVzc2VkW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGlzTW91c2VQcmVzc2VkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vdXNlUHJlc3NlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyW119XHJcbiAgICAgKi9cclxuICAgIGdldE1vdXNlUG9zaXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW91c2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7XHJcbiIsImltcG9ydCBXb3JsZCBmcm9tICcuL1dvcmxkLmpzJztcclxuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9Db250cm9sbGVyLmpzJztcclxuaW1wb3J0IEVuZW15UHJvamVjdGlsZSBmcm9tIFwiLi4vRW5lbWllcy9FbmVteVByb2plY3RpbGVcIjtcclxuaW1wb3J0IE1pbmlCb3NzIGZyb20gXCIuLi9FbmVtaWVzL01pbmlCb3NzXCI7XHJcbmltcG9ydCBQcm9qZWN0aWxlRW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvUHJvamVjdGlsZUVuZW15XCI7XHJcbmltcG9ydCBDdXJzb3IgZnJvbSAnLi4vQ3Vyc29yLmpzJztcclxuaW1wb3J0IFBpc3RvbCBmcm9tIFwiLi4vV2VhcG9ucy9QaXN0b2xcIjtcclxuaW1wb3J0IFNuaXBlciBmcm9tIFwiLi4vV2VhcG9ucy9TbmlwZXJcIjtcclxuaW1wb3J0IEFzc2F1bHRSaWZsZSBmcm9tICcuLi9XZWFwb25zL0Fzc2F1bHRSaWZsZSdcclxuaW1wb3J0IEJ1bGxldDUwY2FsIGZyb20gXCIuLi9XZWFwb25zL0J1bGxldDUwY2FsXCI7XHJcbmltcG9ydCBCdWxsZXQ1NTYgZnJvbSBcIi4uL1dlYXBvbnMvQnVsbGV0NTU2XCI7XHJcbmltcG9ydCBCdWxsZXQ5bW0gZnJvbSBcIi4uL1dlYXBvbnMvQnVsbGV0OW1tXCI7XHJcbmltcG9ydCBSb2NrIGZyb20gJy4uL0Vudmlyb25tZW50T2JqZWN0cy9Sb2NrJztcclxuaW1wb3J0IENyYXRlIGZyb20gJy4uL0Vudmlyb25tZW50T2JqZWN0cy9DcmF0ZSc7XHJcbmltcG9ydCBCdXNoIGZyb20gJy4uL0Vudmlyb25tZW50T2JqZWN0cy9CdXNoJztcclxuaW1wb3J0IEdyb3VuZFdlYXBvbiBmcm9tIFwiLi4vR3JhcGhpY3MvR3JvdW5kV2VhcG9uLmpzXCI7XHJcbmltcG9ydCBHcm91bmRBc3NhdWx0UmlmbGUgZnJvbSBcIi4uL0dyYXBoaWNzL0dyb3VuZEFzc2F1bHRSaWZsZS5qc1wiO1xyXG5pbXBvcnQgR3JvdW5kU25pcGVyIGZyb20gXCIuLi9HcmFwaGljcy9Hcm91bmRTbmlwZXIuanNcIjtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKi9cclxuY2xhc3MgR2FtZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNhbnZhc1xyXG4gICAgICogQHBhcmFtIGRvY3VtZW50Qm9keVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIGRvY3VtZW50Qm9keSkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgICAgIHRoaXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB0aGlzLndvcmxkID0gbmV3IFdvcmxkKGNhbnZhcyk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIoZG9jdW1lbnRCb2R5KTtcclxuICAgICAgICB0aGlzLmN1cnNvciA9IG5ldyBDdXJzb3IoKTtcclxuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9ICdQbGF5aW5nJztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbW9kaWZpZXJcclxuICAgICAqL1xyXG4gICAgdXBkYXRlKG1vZGlmaWVyKSB7XHJcbiAgICAgICAgaWYodGhpcy5nYW1lU3RhdGUgPT09ICdQbGF5aW5nJykge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5oZWFsdGggPD0gMClcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gJ0dhbWUgT3Zlcic7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCgyNykpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9ICdQYXVzZWQnO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg4NykpIHsgLy8gUGxheWVyIGhvbGRpbmcgdXBcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLnkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnkgLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdCh0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueSArPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmlzS2V5UHJlc3NlZCg4MykpIHsgLy8gUGxheWVyIGhvbGRpbmcgZG93blxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodCA8PSA1NjI1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5wbGF5ZXIueSArPSB0aGlzLndvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQucGxheWVyLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci55IC09IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDY1KSkgeyAvLyBQbGF5ZXIgaG9sZGluZyBsZWZ0XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci54ID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54IC09IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggKz0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5pc0tleVByZXNzZWQoNjgpKSB7IC8vIFBsYXllciBob2xkaW5nIHJpZ2h0XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGggPD0gMTAwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci54ICs9IHRoaXMud29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5wbGF5ZXIuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucGxheWVyLnggLT0gdGhpcy53b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5jb250cm9sbGVyLmlzTW91c2VQcmVzc2VkKCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCB3ZXAgPSB0aGlzLndvcmxkLnBsYXllci5pbnZlbnRvcnlbdGhpcy53b3JsZC5wbGF5ZXIuYWN0aXZlX2luZGV4XTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0ZpcmUgdGhlIGNvcnJlY3QgYnVsbGV0IHR5cGUgZm9yIHRoZSBjdXJyZW50bHkgZXF1aXBwZWQgd2VhcG9uLlxyXG4gICAgICAgICAgICAgICAgLy9UaGlzIGNvdWxkIGJlIGRvbmUgbW9yZSBncmFjZWZ1bGx5IGluIHRoZSBmdXR1cmVcclxuICAgICAgICAgICAgICAgIGlmKHdlcCBpbnN0YW5jZW9mIFBpc3RvbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHdlcC5jb29sZG93biA8PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDltbSh0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdK3RoaXMud29ybGQuY2FtZXJhLngsIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSt0aGlzLndvcmxkLmNhbWVyYS55KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcC5zb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcC5zb3VuZC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcC5jb29sZG93bis9MzAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYod2VwIGluc3RhbmNlb2YgU25pcGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYod2VwLmNvb2xkb3duIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDUwY2FsKHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55LCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0rdGhpcy53b3JsZC5jYW1lcmEueCwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdK3RoaXMud29ybGQuY2FtZXJhLnkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VwLnNvdW5kLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VwLnNvdW5kLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VwLmNvb2xkb3duKz0xMjAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYod2VwIGluc3RhbmNlb2YgQXNzYXVsdFJpZmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYod2VwLmNvb2xkb3duIDw9IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHMucHVzaChuZXcgQnVsbGV0NTU2KHRoaXMud29ybGQucGxheWVyLnggKyB0aGlzLndvcmxkLnBsYXllci53aWR0aC8yLCB0aGlzLndvcmxkLnBsYXllci55LCB0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0rdGhpcy53b3JsZC5jYW1lcmEueCwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdK3RoaXMud29ybGQuY2FtZXJhLnkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VwLnNvdW5kLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VwLnNvdW5kLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VwLmNvb2xkb3duKz0xMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vVGhlc2UgY29udHJvbHMgY2hhbmdlIHRoZSBhY3RpdmUgd2VhcG9uIHdpdGggc2ltcGxlIDEsMiwzLGV0YyBjb250cm9scyBmb3IgaW52ZW50b3J5XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDQ5KSkgeyAvLyBQbGF5ZXIgcHJlc3NlZCAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDUwKSkgeyAvLyBQbGF5ZXIgcHJlc3NlZCAyXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXggPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIuaXNLZXlQcmVzc2VkKDUxKSkgeyAvLyBQbGF5ZXIgcHJlc3NlZCAzXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5hY3RpdmVfaW5kZXggPSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IHRoaXMud29ybGQuYnVsbGV0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzW2ldLm1vdmUobW9kaWZpZXIsIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzLCB0aGlzLndvcmxkLmVuZW1pZXMpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5idWxsZXRzW2ldLmxpdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5idWxsZXRzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSB0aGlzLndvcmxkLmVuZW1pZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5tb3ZlKHRoaXMud29ybGQucGxheWVyLCBtb2RpZmllciwgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLmF0dGFja0Nvb2xkb3duID4gMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW1pZXNbaV0uYXR0YWNrQ29vbGRvd24gLT0gNTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXSBpbnN0YW5jZW9mIFByb2plY3RpbGVFbmVteSB8fCB0aGlzLndvcmxkLmVuZW1pZXNbaV0gaW5zdGFuY2VvZiBNaW5pQm9zcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLnNob290Q29vbGRvd24gLT0gdGhpcy53b3JsZC5lbmVtaWVzW2ldLnNob290Q29vbGRvd25SYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXMucHVzaChuZXcgRW5lbXlQcm9qZWN0aWxlKHRoaXMud29ybGQuZW5lbWllc1tpXS54ICsgdGhpcy53b3JsZC5lbmVtaWVzW2ldLndpZHRoLzIsIHRoaXMud29ybGQuZW5lbWllc1tpXS55ICsgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmhlaWdodC8yLCB0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMiwgdGhpcy53b3JsZC5wbGF5ZXIueSArIHRoaXMud29ybGQucGxheWVyLmhlaWdodC8yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duICs9IHRoaXMud29ybGQuZW5lbWllc1tpXS5zaG9vdENvb2xkb3duUmVzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLmhlYWx0aCA8PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbWllcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9VcGRhdGUgd2VhcG9uIGNvb2xkb3duc1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2VwID0gdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYod2VwLmNvb2xkb3duID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VwLmNvb2xkb3duIC09NTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlc1tpXS5tb3ZlKG1vZGlmaWVyLCB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cywgdGhpcy53b3JsZC5wbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzW2ldLmxpdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uaGVhbHRoIDw9IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQud2F2ZSArPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5zdGFydFdhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLndvcmxkLmNhbWVyYS51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLmdhbWVTdGF0ZSA9PT0gJ0dhbWUgT3ZlcicpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5jb250cm9sbGVyLmlzTW91c2VQcmVzc2VkKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY29udHJvbGxlci5tb3VzZVswXSA+IHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAgJiYgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdIDwgKHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDArMjAwKVxyXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSA+IHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUgJiYgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdIDwgdGhpcy5jYW52YXMuaGVpZ2h0LzIgKyAyNSArIDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuc3RhcnQodGhpcy5jYW52YXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gJ1BsYXlpbmcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5nYW1lU3RhdGUgPT09ICdQYXVzZWQnKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29udHJvbGxlci5pc01vdXNlUHJlc3NlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNvbnRyb2xsZXIubW91c2VbMF0gPiB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwICYmIHRoaXMuY29udHJvbGxlci5tb3VzZVswXSA8ICh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwKzIwMClcclxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmNvbnRyb2xsZXIubW91c2VbMV0gPiB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1ICYmIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSA8IHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUgKyAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9ICdQbGF5aW5nJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGRyYXcoKSB7XHJcbiAgICAgICAgaWYodGhpcy5nYW1lU3RhdGUgPT09ICdHYW1lIE92ZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0dhbWVPdmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5nYW1lU3RhdGUgPT09ICdQYXVzZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1BhdXNlU2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmlzQmFja2dyb3VuZExvYWRlZClcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZHJhd0JhY2tncm91bmQodGhpcy5jdHgsIHRoaXMuY2FudmFzKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0VuZW1pZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3RW52aXJvbm1lbnRPYmplY3RzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1dlYXBvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3QnVsbGV0cygpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdFbmVteVByb2plY3RpbGVzKCk7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLnBsYXllci5pc0ltYWdlTG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnBsYXllci5kcmF3KHRoaXMuY3R4LCB0aGlzLndvcmxkLmNhbWVyYSwgdGhpcy5jb250cm9sbGVyLm1vdXNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd0hVRCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3TWluaU1hcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmN1cnNvci5pbWFnZSwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdIC0gdGhpcy5jdXJzb3IuaW1hZ2Uud2lkdGgvMiwgdGhpcy5jb250cm9sbGVyLm1vdXNlWzFdIC0gdGhpcy5jdXJzb3IuaW1hZ2UuaGVpZ2h0LzIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgZHJhd01pbmlNYXAoKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJ3JnYmEoMzUsIDE3NywgNzcsIDAuMiknO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCI7XHJcbiAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gMztcclxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLmNhbnZhcy53aWR0aCAtIDQyNSwgMjUsIDQwMCwgMjI1KTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KHRoaXMuY2FudmFzLndpZHRoIC0gNDI1LCAyNSwgNDAwLCAyMjUpO1xyXG4gICAgICAgIGxldCB4UGVyY2VudCA9ICh0aGlzLndvcmxkLnBsYXllci54ICsgdGhpcy53b3JsZC5wbGF5ZXIud2lkdGgvMikgLyB0aGlzLndvcmxkLndpZHRoO1xyXG4gICAgICAgIGxldCB5UGVyY2VudCA9ICh0aGlzLndvcmxkLnBsYXllci55ICsgdGhpcy53b3JsZC5wbGF5ZXIuaGVpZ2h0LzIpIC8gdGhpcy53b3JsZC5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IHhSZWxhdGl2ZSA9IHhQZXJjZW50KjQwMDtcclxuICAgICAgICBsZXQgeVJlbGF0aXZlID0geVBlcmNlbnQqMjI1O1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjMDBGRjAwJztcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICB0aGlzLmN0eC5hcmMoKHRoaXMuY2FudmFzLndpZHRoIC0gNDI1KSArIHhSZWxhdGl2ZSwgMjUgKyB5UmVsYXRpdmUsIDIuNSwgMCwgMipNYXRoLlBJKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzSW1hZ2VMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCB4UGVyY2VudCA9ICh0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS54ICsgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0ud2lkdGgvMikgLyB0aGlzLndvcmxkLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgbGV0IHlQZXJjZW50ID0gKHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLnkgKyB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5oZWlnaHQvMikgLyB0aGlzLndvcmxkLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGxldCB4UmVsYXRpdmUgPSB4UGVyY2VudCo0MDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgeVJlbGF0aXZlID0geVBlcmNlbnQqMjI1O1xyXG4gICAgICAgICAgICAgICAgLy9jdHguZHJhd0ltYWdlKHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmltYWdlLCAodGhpcy5jYW52YXMud2lkdGggLSA0MjUpICsgeFJlbGF0aXZlICsgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0ud2lkdGgvMiwgMjUgKyB5UmVsYXRpdmUgKyB0aGlzLndvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5oZWlnaHQvMiwgdGhpcy53b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0ud2lkdGgvMjUsIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmhlaWdodC8yNSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzgwODA4MCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmFyYygodGhpcy5jYW52YXMud2lkdGggLSA0MjUpICsgeFJlbGF0aXZlLCAyNSArIHlSZWxhdGl2ZSwgMi41LCAwLCAyKk1hdGguUEkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmVuZW1pZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5lbmVtaWVzW2ldLmlzSW1hZ2VMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCB4UGVyY2VudCA9ICh0aGlzLndvcmxkLmVuZW1pZXNbaV0ueCArIHRoaXMud29ybGQuZW5lbWllc1tpXS53aWR0aC8yKSAvIHRoaXMud29ybGQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBsZXQgeVBlcmNlbnQgPSAodGhpcy53b3JsZC5lbmVtaWVzW2ldLnkgKyB0aGlzLndvcmxkLmVuZW1pZXNbaV0uaGVpZ2h0LzIpIC8gdGhpcy53b3JsZC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgeFJlbGF0aXZlID0geFBlcmNlbnQqNDAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHlSZWxhdGl2ZSA9IHlQZXJjZW50KjIyNTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkYwMDAwJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguYXJjKCh0aGlzLmNhbnZhcy53aWR0aCAtIDQyNSkgKyB4UmVsYXRpdmUsIDI1ICsgeVJlbGF0aXZlLCAyLjUsIDAsIDIqTWF0aC5QSSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBkcmF3SFVEKCkge1xyXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjQ4cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCI7XHJcbiAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gMTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aGlzLndvcmxkLnBsYXllci5oZWFsdGggKyBcIiBIUFwiLCB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMjkwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCh0aGlzLndvcmxkLnBsYXllci5oZWFsdGggKyBcIiBIUFwiLCB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMjkwLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJXYXZlIFwiICsgdGhpcy53b3JsZC53YXZlLCB0aGlzLmNhbnZhcy53aWR0aC8yLCA1MCk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIldhdmUgXCIgKyB0aGlzLndvcmxkLndhdmUsIHRoaXMuY2FudmFzLndpZHRoLzIsIDUwKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aGlzLndvcmxkLmVuZW1pZXMubGVuZ3RoICsgXCIgRW5lbWllcyBMZWZ0XCIsIHRoaXMuY2FudmFzLndpZHRoLzIgKyAzNTAsIDUwKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGggKyBcIiBFbmVtaWVzIExlZnRcIiwgdGhpcy5jYW52YXMud2lkdGgvMiArIDM1MCwgNTApO1xyXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjQ4cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCdBY3RpdmUgV2VhcG9uOiAnICsgdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W3RoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleF0ubmFtZSwgdGhpcy5jYW52YXMud2lkdGgvMiwgMTI1KTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KCdBY3RpdmUgV2VhcG9uOiAnICsgdGhpcy53b3JsZC5wbGF5ZXIuaW52ZW50b3J5W3RoaXMud29ybGQucGxheWVyLmFjdGl2ZV9pbmRleF0ubmFtZSwgdGhpcy5jYW52YXMud2lkdGgvMiwgMTI1KTtcclxuICAgICAgICAvLyByZW1vdmUgbGF0ZXIgLSBkZWJ1Z2dpbmcgcHVycG9zZXNcclxuICAgICAgICAvLyB0aGlzLmN0eC5mb250ID0gXCIyNHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICAvLyB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI0ZGRic7XHJcbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbFRleHQoJ1Bvc1g6ICcgKyB0aGlzLndvcmxkLnBsYXllci54LCB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMjkwLCAxNzUpO1xyXG4gICAgICAgIC8vIHRoaXMuY3R4LnN0cm9rZVRleHQoJ1Bvc1k6ICcgKyB0aGlzLndvcmxkLnBsYXllci55LCB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMjkwLCAyNTApO1xyXG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxUZXh0KCdDYW1lcmFYOiAnICsgdGhpcy53b3JsZC5jYW1lcmEueCwgdGhpcy5jYW52YXMud2lkdGgvMiwgMTc1KTtcclxuICAgICAgICAvLyB0aGlzLmN0eC5zdHJva2VUZXh0KCdDYW1lcmFZOiAnICsgdGhpcy53b3JsZC5jYW1lcmEueSwgdGhpcy5jYW52YXMud2lkdGgvMiwgMjUwKTtcclxuICAgICAgICAvLyB0aGlzLmN0eC5maWxsVGV4dCgnbW91c2VYOiAnICsgdGhpcy5jb250cm9sbGVyLm1vdXNlWzBdLCB0aGlzLmNhbnZhcy53aWR0aC8yICsgMzUwLCAxNzUpO1xyXG4gICAgICAgIC8vIHRoaXMuY3R4LnN0cm9rZVRleHQoJ21vdXNlWTogJyArIHRoaXMuY29udHJvbGxlci5tb3VzZVsxXSwgdGhpcy5jYW52YXMud2lkdGgvMiArIDM1MCwgMjUwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGRyYXdHYW1lT3ZlcigpIHtcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIxMjhweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI0ZGRic7XHJcbiAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gMTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkdhbWUgT3ZlclwiLCB0aGlzLmNhbnZhcy53aWR0aC8yLCB0aGlzLmNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyMwMDAnO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoXCJHYW1lIE92ZXJcIiwgdGhpcy5jYW52YXMud2lkdGgvMiwgdGhpcy5jYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkZGJztcclxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1LCAyMDAsIDEwMCk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdCh0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1LCAyMDAsIDEwMCk7XHJcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMjRweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJUcnkgYWdhaW4/XCIsIHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAgKyAxMDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUgKyA1MCk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd1BhdXNlU2NyZWVuKCkge1xyXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjEyOHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjRkZGJztcclxuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiUGF1c2VkXCIsIHRoaXMuY2FudmFzLndpZHRoLzIsIHRoaXMuY2FudmFzLmhlaWdodC8yKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIlBhdXNlZFwiLCB0aGlzLmNhbnZhcy53aWR0aC8yLCB0aGlzLmNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRkYnO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUsIDIwMCwgMTAwKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KHRoaXMuY2FudmFzLndpZHRoLzIgLSAxMDAsIHRoaXMuY2FudmFzLmhlaWdodC8yICsgMjUsIDIwMCwgMTAwKTtcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIyNHB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIlJlc3VtZVwiLCB0aGlzLmNhbnZhcy53aWR0aC8yIC0gMTAwICsgMTAwLCB0aGlzLmNhbnZhcy5oZWlnaHQvMiArIDI1ICsgNTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgZHJhd0VuZW1pZXMoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuZW5lbWllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW1pZXNbaV0uaXNJbWFnZUxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVtaWVzW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGRyYXdFbnZpcm9ubWVudE9iamVjdHMoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzSW1hZ2VMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGRyYXdXZWFwb25zKCkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLndvcmxkLmdyb3VuZFdlYXBvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy53b3JsZC5ncm91bmRXZWFwb25zW2ldLmlzSW1hZ2VMb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuZ3JvdW5kV2VhcG9uc1tpXS5kcmF3KHRoaXMuY3R4LCB0aGlzLndvcmxkLmNhbWVyYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBkcmF3QnVsbGV0cygpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53b3JsZC5idWxsZXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMud29ybGQuYnVsbGV0c1tpXS5pc0ltYWdlTG9hZGVkICYmIHRoaXMud29ybGQuYnVsbGV0c1tpXS5saXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmJ1bGxldHNbaV0uZHJhdyh0aGlzLmN0eCwgdGhpcy53b3JsZC5jYW1lcmEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgZHJhd0VuZW15UHJvamVjdGlsZXMoKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMud29ybGQuZW5lbXlQcm9qZWN0aWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXNbaV0uaXNJbWFnZUxvYWRlZCAmJiB0aGlzLndvcmxkLmVuZW15UHJvamVjdGlsZXNbaV0ubGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5lbmVteVByb2plY3RpbGVzW2ldLmRyYXcodGhpcy5jdHgsIHRoaXMud29ybGQuY2FtZXJhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcclxuIiwiaW1wb3J0IFJvY2sgZnJvbSBcIi4uL0Vudmlyb25tZW50T2JqZWN0cy9Sb2NrXCI7XHJcbmltcG9ydCBCdXNoIGZyb20gXCIuLi9FbnZpcm9ubWVudE9iamVjdHMvQnVzaFwiO1xyXG5pbXBvcnQgQ3JhdGUgZnJvbSBcIi4uL0Vudmlyb25tZW50T2JqZWN0cy9DcmF0ZVwiO1xyXG5pbXBvcnQgVGFua0VuZW15IGZyb20gXCIuLi9FbmVtaWVzL1RhbmtFbmVteVwiO1xyXG5pbXBvcnQgUmVndWxhckVuZW15IGZyb20gXCIuLi9FbmVtaWVzL1JlZ3VsYXJFbmVteVwiO1xyXG5pbXBvcnQgTGlnaHRFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9MaWdodEVuZW15XCI7XHJcbmltcG9ydCBQcm9qZWN0aWxlRW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvUHJvamVjdGlsZUVuZW15XCI7XHJcbmltcG9ydCBNaW5pQm9zcyBmcm9tICcuLi9FbmVtaWVzL01pbmlCb3NzJztcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi4vUGxheWVycy9QbGF5ZXJcIjtcclxuaW1wb3J0IENhbWVyYSBmcm9tIFwiLi4vUGxheWVycy9DYW1lcmFcIjtcclxuaW1wb3J0IEdyb3VuZEFzc2F1bHRSaWZsZSBmcm9tIFwiLi4vR3JhcGhpY3MvR3JvdW5kQXNzYXVsdFJpZmxlLmpzXCI7XHJcbmltcG9ydCBHcm91bmRTbmlwZXIgZnJvbSBcIi4uL0dyYXBoaWNzL0dyb3VuZFNuaXBlci5qc1wiO1xyXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi4vVXRpbGl0aWVzL1V0aWxcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGUgV29ybGQgY2xhc3MgaG9sZHMgdGhlIGluZm9ybWF0aW9uIHJlbGF0ZWQgdG8gdGhlIHdvcmxkLlxyXG4gKi9cclxuY2xhc3MgV29ybGQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZCBvZiB0aGUgd29ybGQgYW5kIGxvYWRzIHRoZSBiYWNrZ3JvdW5kLlxyXG4gICAgICogQHBhcmFtIGNhbnZhcyBUaGUgY2FudmFzLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0KGNhbnZhcyk7XHJcbiAgICAgICAgdGhpcy5sb2FkQmFja2dyb3VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHN0YXJ0IGZ1bmN0aW9uIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFdvcmxkLiBUaGUgcGxheWVyIGlzIG1hZGUgYW5kIHRoZSBjYW1lcmEgaXMgYXR0YWNoZWQgdG8gdGhlIHBsYXllci5cclxuICAgICAqIEEgY2FsbCBpcyB0byBpbml0aWFsaXplIHRoZSBlbnZpcm9ubWVudCBhbmQgc3RhcnQgdGhlIHdhdmUuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzIFRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0KGNhbnZhcykge1xyXG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5lbmVtaWVzID0gW107XHJcbiAgICAgICAgdGhpcy5idWxsZXRzID0gW107XHJcbiAgICAgICAgdGhpcy5lbmVteVByb2plY3RpbGVzID0gW107XHJcbiAgICAgICAgdGhpcy5ncm91bmRXZWFwb25zID0gW107XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplRW52aXJvbm1lbnQoKTtcclxuICAgICAgICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoY2FudmFzLndpZHRoLzIsIGNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgQ2FtZXJhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCwgMTAwMDAsIDU2MjUpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLmZvbGxvdyh0aGlzLnBsYXllciwgY2FudmFzLndpZHRoLzIsIGNhbnZhcy5oZWlnaHQvMik7XHJcbiAgICAgICAgdGhpcy53YXZlID0gMTtcclxuICAgICAgICB0aGlzLnN0YXJ0V2F2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpbml0aWFsaXplcyB0aGUgZW52aXJvbm1lbnQgYnkgcHVzaGluZyBlbnZpcm9ubWVudCBvYmplY3RzIG9udG8gdGhlIGVudmlyb25tZW50T2JqZWN0cyBhcnJheS5cclxuICAgICAqL1xyXG4gICAgaW5pdGlhbGl6ZUVudmlyb25tZW50KCkge1xyXG4gICAgICAgIGxldCBjcmF0ZUNhcCA9IDIwO1xyXG4gICAgICAgIGxldCBidXNoQ2FwID0gMzA7XHJcbiAgICAgICAgbGV0IHJvY2tDYXAgPSAzMDtcclxuICAgICAgICBsZXQgc25pcGVyQ2FwID0gMztcclxuICAgICAgICBsZXQgYXNzYXVsdFJpZmxlQ2FwID0gNTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGNyYXRlQ2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzLnB1c2gobmV3IENyYXRlKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYnVzaENhcDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cy5wdXNoKG5ldyBCdXNoKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcm9ja0NhcDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cy5wdXNoKG5ldyBSb2NrKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc25pcGVyQ2FwOyBpKyspXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VuZFdlYXBvbnMucHVzaChuZXcgR3JvdW5kU25pcGVyKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXNzYXVsdFJpZmxlQ2FwOyBpKyspXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VuZFdlYXBvbnMucHVzaChuZXcgR3JvdW5kQXNzYXVsdFJpZmxlKFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbGxpc2lvbkZsYWcgPSB0cnVlO1xyXG4gICAgICAgIHdoaWxlKGNvbGxpc2lvbkZsYWcgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IGkgPSBVdGlsLmFyZUFueUNvbGxpc2lvbnNJblNhbWVBcnJheSh0aGlzLmVudmlyb25tZW50T2JqZWN0cyk7XHJcbiAgICAgICAgICAgIGlmKGkgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0c1tpXS5zZXRQb3NpdGlvbihVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9Ob3cgd2UgY2hlY2sgaWYgdGhlIHdlYXBvbnMgYXJlIGhpdHRpbmcgZWFjaG90aGVyXHJcbiAgICAgICAgbGV0IHNlbGZDb2xsaXNpb25GbGFnID0gdHJ1ZTtcclxuICAgICAgICB3aGlsZShzZWxmQ29sbGlzaW9uRmxhZyl7XHJcbiAgICAgICAgICBsZXQgaSA9IFV0aWwuYXJlQW55Q29sbGlzaW9uc0luU2FtZUFycmF5KHRoaXMuZ3JvdW5kV2VhcG9ucyk7XHJcbiAgICAgICAgICBpZihpID09PSAtMSlcclxuICAgICAgICAgICAgc2VsZkNvbGxpc2lvbkZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmdyb3VuZFdlYXBvbnNbaV0uc2V0UG9zaXRpb24oVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzdGFydHMgdGhlIHdhdmUgYnkgcHVzaGluZyBlbmVtaWVzIG9udG8gdGhlIGVuZW1pZXMgYXJyYXkuXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0V2F2ZSgpIHtcclxuICAgICAgICBsZXQgbGlnaHRFbmVteUNhcCA9IHRoaXMud2F2ZSAqIDEwO1xyXG4gICAgICAgIGxldCByZWd1bGFyRW5lbXlDYXAgPSB0aGlzLndhdmUgKiAxMDtcclxuICAgICAgICBsZXQgdGFua0VuZW15Q2FwID0gdGhpcy53YXZlICogNTtcclxuICAgICAgICBsZXQgcHJvamVjdGlsZUVuZW15Q2FwID0gTWF0aC5mbG9vcih0aGlzLndhdmUvMikqNTtcclxuICAgICAgICBsZXQgbWluaUJvc3NDYXAgPSBNYXRoLmZsb29yKHRoaXMud2F2ZS81KTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxpZ2h0RW5lbXlDYXA7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IExpZ2h0RW5lbXkoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCByZWd1bGFyRW5lbXlDYXA7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IFJlZ3VsYXJFbmVteShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRhbmtFbmVteUNhcDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgVGFua0VuZW15KFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcHJvamVjdGlsZUVuZW15Q2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBQcm9qZWN0aWxlRW5lbXkoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtaW5pQm9zc0NhcDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgTWluaUJvc3MoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG5cclxuICAgICAgICBsZXQgY29sbGlzaW9uRmxhZyA9IHRydWU7XHJcbiAgICAgICAgd2hpbGUoY29sbGlzaW9uRmxhZyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBsZXQgaSA9IFV0aWwuYXJlQW55Q29sbGlzaW9ucyh0aGlzLmVuZW1pZXMsIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzKTtcclxuICAgICAgICAgICAgaWYgKGkgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW1pZXNbaV0uc2V0UG9zaXRpb24oVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvYWRCYWNrZ3JvdW5kIGZ1bmN0aW9uIGxvYWRzIHRoZSBiYWNrZ3JvdW5kIGltYWdlLiBPbmNlIHRoZSBpbWFnZSBpcyBsb2FkZWQsIHRoaXMuaXNCYWNrZ3JvdW5kTG9hZGVkIGlzXHJcbiAgICAgKiBzZXQgdG8gdHJ1ZS5cclxuICAgICAqL1xyXG4gICAgbG9hZEJhY2tncm91bmQoKSB7XHJcbiAgICAgICAgdGhpcy5pc0JhY2tncm91bmRMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmQub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzQmFja2dyb3VuZExvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmJhY2tncm91bmQud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5iYWNrZ3JvdW5kLmhlaWdodDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZC5zcmMgPSBcIkdyYXBoaWNzL0JhY2tncm91bmQucG5nXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZHJhd0JhY2tncm91bmQgZnVuY3Rpb24gZHJhd3MgdGhlIGJhY2tncm91bmQgb2YgdGhlIHdvcmxkLlxyXG4gICAgICogQHBhcmFtIGN0eCBUaGUgY29udGV4dCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIGNhbnZhcyBUaGUgY2FudmFzLlxyXG4gICAgICovXHJcbiAgICBkcmF3QmFja2dyb3VuZChjdHgsIGNhbnZhcykge1xyXG4gICAgICAgIGxldCBzV2lkdGgsIHNIZWlnaHQ7XHJcbiAgICAgICAgc1dpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgICAgIHNIZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG5cclxuICAgICAgICBpZih0aGlzLmJhY2tncm91bmQud2lkdGggLSB0aGlzLmNhbWVyYS54IDwgY2FudmFzLndpZHRoKVxyXG4gICAgICAgICAgICBzV2lkdGggPSB0aGlzLmJhY2tncm91bmQud2lkdGggLSB0aGlzLmNhbWVyYS54O1xyXG4gICAgICAgIGlmKHRoaXMuYmFja2dyb3VuZC5oZWlnaHQgLSB0aGlzLmNhbWVyYS55IDwgY2FudmFzLmhlaWdodClcclxuICAgICAgICAgICAgc0hlaWdodCA9IHRoaXMuYmFja2dyb3VuZC5oZWlnaHQgLSB0aGlzLmNhbWVyYS55O1xyXG5cclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuYmFja2dyb3VuZCwgdGhpcy5jYW1lcmEueCwgdGhpcy5jYW1lcmEueSwgc1dpZHRoLCBzSGVpZ2h0LCAwLCAwLCBzV2lkdGgsIHNIZWlnaHQpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgV29ybGQ7XHJcbiIsImltcG9ydCBHcm91bmRXZWFwb24gZnJvbSAnLi9Hcm91bmRXZWFwb24uanMnO1xyXG5pbXBvcnQgV2VhcG9uIGZyb20gJy4uL1dlYXBvbnMvV2VhcG9uLmpzJztcclxuaW1wb3J0IEFzc2F1bHRSaWZsZSBmcm9tICcuLi9XZWFwb25zL0Fzc2F1bHRSaWZsZS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIFJvY2sgY2xhc3MgZXh0ZW5kcyB0aGUgRW52aXJvbm1lbnRPYmplY3QgY2xhc3MuIEl0IGlzIGEgYmxvY2tpbmcgb2JqZWN0IHdpdGggaGlnaCBoZWFsdGguXHJcbiAqL1xyXG5jbGFzcyBHcm91bmRBc3NhdWx0UmlmbGUgZXh0ZW5kcyBHcm91bmRXZWFwb24ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBsZXQgd2VhcG9uID0gbmV3IEFzc2F1bHRSaWZsZSgpO1xyXG4gICAgICAgIHN1cGVyKHgsIHksIHdlYXBvbik7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvR3JvdW5kQXNzYXVsdFJpZmxlLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3JvdW5kQXNzYXVsdFJpZmxlO1xyXG4iLCJpbXBvcnQgR3JvdW5kV2VhcG9uIGZyb20gJy4vR3JvdW5kV2VhcG9uLmpzJztcclxuaW1wb3J0IFdlYXBvbiBmcm9tICcuLi9XZWFwb25zL1dlYXBvbi5qcyc7XHJcbmltcG9ydCBTbmlwZXIgZnJvbSAnLi4vV2VhcG9ucy9TbmlwZXIuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBSb2NrIGNsYXNzIGV4dGVuZHMgdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzLiBJdCBpcyBhIGJsb2NraW5nIG9iamVjdCB3aXRoIGhpZ2ggaGVhbHRoLlxyXG4gKi9cclxuY2xhc3MgR3JvdW5kU25pcGVyIGV4dGVuZHMgR3JvdW5kV2VhcG9uIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgbGV0IHdlYXBvbiA9IG5ldyBTbmlwZXIoKTtcclxuICAgICAgICBzdXBlcih4LCB5LCB3ZWFwb24pO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0dyb3VuZFNuaXBlci5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdyb3VuZFNuaXBlcjtcclxuIiwiY2xhc3MgR3JvdW5kV2VhcG9uIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB3ZWFwb24pIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy53ZWFwb24gPSB3ZWFwb247XHJcbiAgICB9XHJcbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG4gICAgbG9hZEltYWdlKHVybCkge1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcclxuICAgIH1cclxuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgR3JvdW5kV2VhcG9uO1xyXG4iLCIvKlxuICBTb3VyY2VzOlxuICBodHRwOi8vd3d3Lmxvc3RkZWNhZGVnYW1lcy5jb20vaG93LXRvLW1ha2UtYS1zaW1wbGUtaHRtbDUtY2FudmFzLWdhbWUvXG4gIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQwMzcyMTIvaHRtbC1jYW52YXMtZnVsbC1zY3JlZW4/dXRtX21lZGl1bT1vcmdhbmljJnV0bV9zb3VyY2U9Z29vZ2xlX3JpY2hfcWEmdXRtX2NhbXBhaWduPWdvb2dsZV9yaWNoX3FhXG4gIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2OTE5NjAxL2h0bWw1LWNhbnZhcy13b3JsZC5jYW1lcmEtdmlld3BvcnQtaG93LXRvLWFjdGFsbHktZG8taXQ/dXRtX21lZGl1bT1vcmdhbmljJnV0bV9zb3VyY2U9Z29vZ2xlX3JpY2hfcWEmdXRtX2NhbXBhaWduPWdvb2dsZV9yaWNoX3FhXG4gIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvZ2ZjYXJ2L1FLZ0hzL1xuICovXG5cbmltcG9ydCBHYW1lIGZyb20gJy4vR2FtZS9HYW1lLmpzJztcblxubGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbmxldCBnYW1lID0gbmV3IEdhbWUoY2FudmFzLCBkb2N1bWVudC5ib2R5KTtcblxubGV0IG1haW4gPSAoKSA9PiB7XG4gICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgbGV0IGRlbHRhID0gbm93IC0gdGhlbjtcblxuICAgIGdhbWUudXBkYXRlKGRlbHRhIC8gMTAwMCk7XG4gICAgZ2FtZS5kcmF3KCk7XG5cbiAgICB0aGVuID0gbm93O1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW4pO1xufTtcblxuLy8gQ3Jvc3MtYnJvd3NlciBzdXBwb3J0IGZvciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZTtcblxubGV0IHRoZW4gPSBEYXRlLm5vdygpO1xubWFpbigpO1xuIiwiLypcclxuICBTb3VyY2VzOlxyXG4gIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvZ2ZjYXJ2L1FLZ0hzL1xyXG4qL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBDYW1lcmEgY2xhc3MgaXMgdXNlZCB0byBmb2xsb3cgdGhlIHBsYXllcidzIG1vdmVtZW50LlxyXG4gKi9cclxuY2xhc3MgQ2FtZXJhIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBDYW1lcmEuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgQ2FtZXJhLlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIENhbWVyYS5cclxuICAgICAqIEBwYXJhbSBjYW52YXNXaWR0aCBUaGUgd2lkdGggb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjYW52YXNIZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIHdvcmxkV2lkdGggVGhlIHdpZHRoIG9mIHRoZSB3b3JsZC5cclxuICAgICAqIEBwYXJhbSB3b3JsZEhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSB3b3JsZC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCwgd29ybGRXaWR0aCwgd29ybGRIZWlnaHQpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy54RGVhZFpvbmUgPSAwO1xyXG4gICAgICAgIHRoaXMueURlYWRab25lID0gMDtcclxuICAgICAgICB0aGlzLndpZHRoID0gY2FudmFzV2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBjYW52YXNIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy53b3JsZFdpZHRoID0gd29ybGRXaWR0aDtcclxuICAgICAgICB0aGlzLndvcmxkSGVpZ2h0ID0gd29ybGRIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gc2V0IHdobyB0aGUgY2FtZXJhIGlzIGZvbGxvd2luZy5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciB0aGF0IHRoZSBjYW1lcmEgc2hvdWxkIGZvbGxvdy5cclxuICAgICAqIEBwYXJhbSB4RGVhZFpvbmVcclxuICAgICAqIEBwYXJhbSB5RGVhZFpvbmVcclxuICAgICAqL1xyXG4gICAgZm9sbG93KHBsYXllciwgeERlYWRab25lLCB5RGVhZFpvbmUpIHtcclxuICAgICAgICB0aGlzLmZvbGxvd2luZyA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLnhEZWFkWm9uZSA9IHhEZWFkWm9uZTtcclxuICAgICAgICB0aGlzLnlEZWFkWm9uZSA9IHlEZWFkWm9uZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyB0aGUgY2FtZXJhJ3MgeCBhbmQgeSBwb3NpdGlvbi5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZm9sbG93aW5nICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5mb2xsb3dpbmcueCAtIHRoaXMueCArIHRoaXMueERlYWRab25lID4gdGhpcy53aWR0aClcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuZm9sbG93aW5nLnggLSAodGhpcy53aWR0aCAtIHRoaXMueERlYWRab25lKTtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmZvbGxvd2luZy54IC0gdGhpcy54RGVhZFpvbmUgPCB0aGlzLngpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmZvbGxvd2luZy54IC0gdGhpcy54RGVhZFpvbmU7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZm9sbG93aW5nLnkgLSB0aGlzLnkgKyB0aGlzLnlEZWFkWm9uZSA+IHRoaXMuaGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5mb2xsb3dpbmcueSAtICh0aGlzLmhlaWdodCAtIHRoaXMueURlYWRab25lKTtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmZvbGxvd2luZy55IC0gdGhpcy55RGVhZFpvbmUgPCB0aGlzLnkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmZvbGxvd2luZy55IC0gdGhpcy55RGVhZFpvbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMueCA8IDApXHJcbiAgICAgICAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgICAgaWYodGhpcy55IDwgMClcclxuICAgICAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICBpZih0aGlzLnggKyB0aGlzLndpZHRoID4gdGhpcy53b3JsZFdpZHRoKVxyXG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLndvcmxkV2lkdGggLSB0aGlzLndpZHRoO1xyXG4gICAgICAgIGlmKHRoaXMueSArIHRoaXMuaGVpZ2h0ID4gdGhpcy53b3JsZEhlaWdodClcclxuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy53b3JsZEhlaWdodCAtIHRoaXMuaGVpZ2h0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYW1lcmE7IiwiaW1wb3J0IFBpc3RvbCBmcm9tICcuLi9XZWFwb25zL1Bpc3RvbC5qcydcbmltcG9ydCBTbmlwZXIgZnJvbSAnLi4vV2VhcG9ucy9TbmlwZXIuanMnXG5pbXBvcnQgQXNzYXVsdFJpZmxlIGZyb20gJy4uL1dlYXBvbnMvQXNzYXVsdFJpZmxlLmpzJ1xuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xuXG5jbGFzcyBQbGF5ZXIge1xuICAvL3RoaXMueCA9IHggcG9zaXRpb25cbiAgLy90aGlzLnkgPSB5IHBvc2l0aW9uXG4gIC8vdGhpcy5oZWFsdGggPSBwbGF5ZXIncyBsaWZlXG4gIC8vdGhpcy5zcGVlZCA9IHBsYXllcidzIG1vdmVzcGVlZFxuICAvL3RoaXMubG9hZEltYWdlKCkgaXMgYSBmdW5jdGlvbiB0byBhdHRhY2ggdGhlIGltYWdlIHRvIHRoZSBwbGF5ZXIuXG4gIC8vVGhlIHBsYXllciBoYXMgYW4gYXJyYXkgdG8gaG9sZCBoaXMgaXRlbXMgYW5kIGhlIHdpbGwgc3RhcnQgd2l0aCBhIHBpc3RvbCBhbmQgc25pcGVyIHRoaXMgd2VlayBmb3IgZWFzeSB0ZXN0aW5nXG4gIC8vTmV4dCB3ZWVrIGl0ZW1zIHdpbGwgYmUgcGlja2VkIHVwIGJ5IHdhbGtpbmcgb3ZlciB0aGVtIGFuZCBhcyBzdWNoIHRoZXJlIHdpbGwgbmVlZCB0byBiZSBhbiBhZGRJdGVtIGZ1bmN0aW9uXG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgIHRoaXMueCA9IHg7XG4gICAgICB0aGlzLnkgPSB5O1xuICAgICAgdGhpcy5oZWFsdGggPSAxMDA7XG4gICAgICB0aGlzLnNwZWVkID0gMjU2O1xuICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICAgIGxldCBzdGFydF9waXN0b2wgPSBuZXcgUGlzdG9sKCk7XG4gICAgICBsZXQgc3RhcnRfc25pcGVyID0gbmV3IFNuaXBlcigpO1xuICAgICAgbGV0IHN0YXJ0X3JpZmxlID0gbmV3IEFzc2F1bHRSaWZsZSgpO1xuICAgICAgdGhpcy5pbnZlbnRvcnkgPSBbc3RhcnRfcGlzdG9sLCBzdGFydF9zbmlwZXIsIHN0YXJ0X3JpZmxlXTtcbiAgICAgIHRoaXMuYWN0aXZlX2luZGV4ID0gMDtcbiAgfVxuXG4gICAgaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoVXRpbC5pc0NvbGxpc2lvbihlbnZpcm9ubWVudE9iamVjdHNbaV0sIHRoaXMpICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gIGxvYWRJbWFnZSgpIHtcbiAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgfTtcbiAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gXCJHcmFwaGljcy9QbGF5ZXIucG5nXCI7XG4gIH1cblxuICAgIGRyYXcoY3R4LCBjYW1lcmEsIG1vdXNlKSB7XG4gICAgICAgIC8vY3R4LnNhdmUoKTtcbiAgICAgICAgLy9jdHgudHJhbnNsYXRlKCh0aGlzLnggKyB0aGlzLndpZHRoLzIpIC0gY2FtZXJhLngsICh0aGlzLnkgKyB0aGlzLmhlaWdodC8yKSAtIGNhbWVyYS55KTtcbiAgICAgICAgLy9jdHgucm90YXRlKE1hdGguYXRhbjIobW91c2VbMV0gLSAodGhpcy55IC0gY2FtZXJhLnkpLCBtb3VzZVswXSAtICh0aGlzLnggLSBjYW1lcmEueCkpKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xuICAgICAgICAvL2N0eC5yZXN0b3JlKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCIvKlxyXG4gIFNvdXJjZXM6XHJcbiAgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9HYW1lcy9UZWNobmlxdWVzLzJEX2NvbGxpc2lvbl9kZXRlY3Rpb25cclxuICBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80OTU5OTc1L2dlbmVyYXRlLXJhbmRvbS1udW1iZXItYmV0d2Vlbi10d28tbnVtYmVycy1pbi1qYXZhc2NyaXB0XHJcbiovXHJcblxyXG4vKipcclxuICogVGhlIFV0aWwgY2xhc3MgY29udGFpbnMgdmFyaW91cyB1dGlsaXR5IGZ1bmN0aW9ucy5cclxuICovXHJcbmNsYXNzIFV0aWwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGlzQ29sbGlzaW9uIG1ldGhvZCBjaGVja3MgaWYgdGhlcmUgaXMgYSBjb2xsaXNpb24gYmV0d2VlbiB0aGUgdHdvIGlucHV0dGVkIHJlY3RhbmdsZXMuIFRoaXMgYWxnb3JpdGhtIG9ubHlcclxuICAgICAqIHdvcmtzIHdpdGggYXhpcy1hbGlnbmVkIHJlY3RhbmdsZXMuXHJcbiAgICAgKiBAcGFyYW0gcmVjdGFuZ2xlMSBUaGUgZmlyc3QgcmVjdGFuZ2xlLlxyXG4gICAgICogQHBhcmFtIHJlY3RhbmdsZTIgVGhlIHNlY29uZCByZWN0YW5nbGUuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciB0aGVyZSBleGlzdHMgYSBjb2xsaXNpb24gYmV0d2VlbiB0aGUgdHdvIGlucHV0dGVkIHJlY3RhbmdsZXMuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc0NvbGxpc2lvbihyZWN0YW5nbGUxLCByZWN0YW5nbGUyKSB7XHJcbiAgICAgICAgaWYocmVjdGFuZ2xlMS54IDwgcmVjdGFuZ2xlMi54ICsgcmVjdGFuZ2xlMi53aWR0aCAmJlxyXG4gICAgICAgICAgICByZWN0YW5nbGUxLnggKyByZWN0YW5nbGUxLndpZHRoID4gcmVjdGFuZ2xlMi54ICYmXHJcbiAgICAgICAgICAgIHJlY3RhbmdsZTEueSA8IHJlY3RhbmdsZTIueSArIHJlY3RhbmdsZTIuaGVpZ2h0ICYmXHJcbiAgICAgICAgICAgIHJlY3RhbmdsZTEueSArIHJlY3RhbmdsZTEuaGVpZ2h0ID4gcmVjdGFuZ2xlMi55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIHRoZXJlIGFyZSBhbnkgY29sbGlzaW9ucyBiZXR3ZWVuIHRoZSB0d28gYXJyYXlzLiBUaGlzIGFsZ29yaXRobSBvbmx5IHdvcmtzIHdpdGhcclxuICAgICAqIGF4aXMtYWxpZ25lZCByZWN0YW5nbGVzLlxyXG4gICAgICogQHBhcmFtIGFycmF5MSBBbiBhcnJheSBvZiByZWN0YW5nbGVzLlxyXG4gICAgICogQHBhcmFtIGFycmF5MiBBbiBhcnJheSBvZiByZWN0YW5nbGVzLlxyXG4gICAgICogQHJldHVybnMge2ludGVnZXJ9IC0xIGlmIHRoZXJlIGFyZSBubyBjb2xsaXNpb25zIG9yIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgYXJyYXkgaWYgdGhlcmUgaXMuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhcmVBbnlDb2xsaXNpb25zKGFycmF5MSwgYXJyYXkyKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFycmF5MS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgYXJyYXkyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzQ29sbGlzaW9uKGFycmF5MVtpXSwgYXJyYXkyW2pdKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFyZUFueUNvbGxpc2lvbnNJblNhbWVBcnJheShhcnJheSkge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgYXJyYXkubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKGkgIT09IGopIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlzQ29sbGlzaW9uKGFycmF5W2ldLCBhcnJheVtqXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhIHJhbmRvbSBudW1iZXIgaW4gdGhlIGdpdmVuIGludGVydmFsLlxyXG4gICAgICogQHBhcmFtIGZyb21cclxuICAgICAqIEBwYXJhbSB0b1xyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJhbmRvbUludEZyb21JbnRlcnZhbChmcm9tLCB0bykge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodG8gLSBmcm9tICsgMSkgKyBmcm9tKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVdGlsOyIsImltcG9ydCBXZWFwb24gZnJvbSAnLi9XZWFwb24uanMnO1xyXG5cclxuY2xhc3MgQXNzYXVsdFJpZmxlIGV4dGVuZHMgV2VhcG9ue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcig1LCAzMCk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJBc3NhdWx0IFJpZmxlXCI7XHJcbiAgICAgICAgc3VwZXIubG9hZFNob290U291bmQoJ0F1ZGlvL1JpZmxlU2hvdC5tcDMnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXNzYXVsdFJpZmxlO1xyXG4iLCJpbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XG5cbmNsYXNzIEJ1bGxldHtcbiAgICBjb25zdHJ1Y3Rvcih2ZWxvY2l0eSwgZGFtYWdlLCB4LCB5LCBkZXN0WCwgZGVzdFksIHBlbmV0cmF0ZXMpIHtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5kZXN0WCA9IGRlc3RYO1xuICAgICAgICB0aGlzLmRlc3RZID0gZGVzdFk7XG4gICAgICAgIHRoaXMubGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNQZW5ldHJhdGluZyA9IHBlbmV0cmF0ZXM7XG4gICAgICAgIGxldCBkaWZmWCA9IHRoaXMuZGVzdFggLSB0aGlzLng7XG4gICAgICAgIGxldCBkaWZmWSA9IHRoaXMuZGVzdFkgLSB0aGlzLnk7XG4gICAgICAgIC8vVGhpcyBsb2dpYyBmaW5kcyBhIGNvZWZmaWNpZW50IGZvciBYIGFuZCBZIHRoYXQgY2FuIGJlIGFwcGxpZWRcbiAgICAgICAgLy90byB0aGUgbW92ZSBmdW5jdGlvbiBpbiBvcmRlciB0byBtb3ZlIHRoZSBidWxsZXQgaW4gYSBzdHJhaWdodCBsaW5lXG4gICAgICAgIC8vZGlyZWN0bHkgdG8gaXRzIGRlc3RpbmF0aW9uLlxuICAgICAgICBpZihNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpIHtcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWCk7XG4gICAgICAgICAgICB0aGlzLmNvZWZmWSA9IGRpZmZZIC8gTWF0aC5hYnMoZGlmZlgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb2VmZlkgPSBkaWZmWSAvIE1hdGguYWJzKGRpZmZZKTtcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9hZEltYWdlKHVybCkge1xuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xuICAgIH1cbiAgICAvL01vdmVzIHRoZSBidWxsZXQgZnJvbSBpdHMgc3RhcnRpbmcgcG9pbnQgKHdoaWNoIHdpbGwgYmUgdGhlIHBsYXllcidzIGxvY2F0aW9uKVxuICAgIC8vdG8gaXRzIGRlc3RpbmF0aW9uICh3aGljaCB3aWxsIGJlIHRoZSBjdXJzb3IgbG9jYXRpb24gd2hlbiB0aGUgYnVsbGV0IGlzIGNyZWF0ZWQpLlxuICAgIC8vRWFjaCB0aW1lIG1vdmUgaXMgY2FsbGVkIGl0IGlzIGNoZWNrZWQgaWYgdGhlIGJ1bGxldCBoaXRzIGFueXRoaW5nLCBpZiBpdCBkb2VzIHRoZVxuICAgIC8vaGl0U29tZXRoaW5nIG1ldGhvZCB3aWxsIGNhbGwgYSBkYW1hZ2UgZnVuY3Rpb24gYW5kIHRoZSBkYW1hZ2Ugd2lsbCBiZSBhcHBsaWVkLCBzb1xuICAgIC8vdGhpcyBmdW5jdGlvbiBzZXRzIHRoaXMubGl2ZSA9IGZhbHNlIG1lYW5pbmcgdGhlIGJ1bGxldCBpcyBubyBsb25nZXIgbGl2ZS5cbiAgICAvL0lmIHRoZSBidWxsZXQgaXNQZW5ldHJhdGluZyB0aGF0IG1lYW5zIGl0IHdpbGwgbm90IGJlIHNldCB0byAnZGVhZCcgdXBvbiBhIGNvbGxpc2lvbiB3aXRoIHNvbWV0aGluZ1xuICAgIC8vVGhpcyBhbGxvd3MgcGVuZXRyYXRpbmcgYnVsbGV0cyB0byB0cmF2ZWwgdGhyb3VnaCBtdWx0aXBsZSB0YXJnZXRzIGFuZCB0aHJvdWdoIHdvcmxkIG9iamVjdHMuXG4gICAgbW92ZShtb2RpZmllciwgZW52aXJvbm1lbnRPYmplY3RzLCBlbmVtaWVzKXtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXIqdGhpcy5jb2VmZlg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyKnRoaXMuY29lZmZZO1xuICAgICAgICBpZih0aGlzLmhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIGVuZW1pZXMpICYmIHRoaXMuaXNQZW5ldHJhdGluZyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy54IDwgMCB8fCB0aGlzLnggPiAxMDAwMCB8fCB0aGlzLnkgPCAwIHx8IHRoaXMueSA+IDU2MjUpIHtcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgLy9DaGVja3MgaWYgdGhlIGJ1bGxldCBoaXQgYW55IG9mIG91ciBvYmplY3RzIHRoYXQgY2FuIGJlIGhpdCwgaWYgc28gdGhhdCBvYmplY3QgbG9zZXMgSFBcbiAgICAvL2FuZCB0aGUgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHRvIGluZGljYXRlIHRoYXQgdGhlIG9iamVjdCB3YXMgaGl0LiBJZiBub3QsIGZhbHNlIGlzIHJldHVybmVkXG4gICAgLy9hbmQgbm90aGluZyBpcyBkb25lLlxuICAgIGRhbWFnZUVuZW15KGVuZW15T2JqZWN0KSB7XG4gICAgICAgIGVuZW15T2JqZWN0LmhlYWx0aCAtPSB0aGlzLmRhbWFnZTtcbiAgICB9XG5cbiAgICBkYW1hZ2VFbnZpcm9ubWVudChlbnZpcm9ubWVudE9iamVjdCl7XG4gICAgICAgIGVudmlyb25tZW50T2JqZWN0LmhlYWx0aCAtPSB0aGlzLmRhbWFnZTtcbiAgICB9XG4gICAgLy9DaGVja3MgaWYgd2UgaGl0IGFuIGVudmlyb25tZW50IG9iamVjdCB0aGVuIGNoZWNrcyBpZiB3ZSBoaXQgYW4gZW5lbXkuIGluIGVpdGhlciBjYXNlIGl0IGNhbGxzIHRoZVxuICAgIC8vY29ycmVzcG9uZGluZyBkYW1hZ2UgZnVuY3Rpb24gYW5kIHRoZW4gcmV0dXJucyB0cnVlIHRvIGluZGljYXRlIHRoYXQgc29tZXRoaW5nIHdhcyBoaXQsIHdoaWNoIHRlbGxzIG1vdmUgdG8gc2V0IHRoZVxuICAgIC8vYnVsbGV0J3MgbGl2ZSB2YWx1ZSBhY2NvcmRpbmdseVxuICAgIGhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIGVuZW1pZXMpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbnZpcm9ubWVudE9iamVjdHNbaV0pICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VFbnZpcm9ubWVudChlbnZpcm9ubWVudE9iamVjdHNbaV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbmVtaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIGVuZW1pZXNbaV0pKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZUVuZW15KGVuZW1pZXNbaV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1bGxldDtcbiIsImltcG9ydCBCdWxsZXQgZnJvbSAnLi9CdWxsZXQuanMnO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vL1RoZSA1MCBjYWxpYmVyIHdpbGwgcGVuZXRyYXRlIHRocm91Z2ggb2JqZWN0cyBhbmQgb25seSBzdG9wcyBiZWluZyBsaXZlXHJcbi8vb25jZSBpdCBleGl0cyB0aGUgY2FudmFzLCBzbyBpdHMgZGFtYWdlIGlzIHNldCB0byBhIHNtYWxsIG51bWJlciBhcyBpdCBkZWFsc1xyXG4vL2RhbWFnZSBkdXJpbmcgZWFjaCBmcmFtZSBhcyBpdCBwZW5ldHJhdGVzIHRoZSBvYmplY3Qgb3IgZW5lbXlcclxuY2xhc3MgQnVsbGV0NTBjYWwgZXh0ZW5kcyBCdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgZGVzdFgsIGRlc3RZKSB7XHJcbiAgICAgICAgc3VwZXIoMjUwMCwgNSwgeCwgeSwgZGVzdFgsIGRlc3RZLCB0cnVlKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9idWxsZXQzLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnVsbGV0NTBjYWw7XHJcbiIsImltcG9ydCBCdWxsZXQgZnJvbSAnLi9CdWxsZXQuanMnO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vL1RoZSA1MCBjYWxpYmVyIHdpbGwgcGVuZXRyYXRlIHRocm91Z2ggb2JqZWN0cyBhbmQgb25seSBzdG9wcyBiZWluZyBsaXZlXHJcbi8vb25jZSBpdCBleGl0cyB0aGUgY2FudmFzLCBzbyBpdHMgZGFtYWdlIGlzIHNldCB0byBhIHNtYWxsIG51bWJlciBhcyBpdCBkZWFsc1xyXG4vL2RhbWFnZSBkdXJpbmcgZWFjaCBmcmFtZSBhcyBpdCBwZW5ldHJhdGVzIHRoZSBvYmplY3Qgb3IgZW5lbXlcclxuY2xhc3MgQnVsbGV0NTU2IGV4dGVuZHMgQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGRlc3RYLCBkZXN0WSkge1xyXG4gICAgICAgIHN1cGVyKDE1MDAsIDEyLCB4LCB5LCBkZXN0WCwgZGVzdFksIGZhbHNlKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9idWxsZXQzLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ1NTY7XHJcbiIsImltcG9ydCBCdWxsZXQgZnJvbSAnLi9CdWxsZXQuanMnO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcbi8vdGhlIDltbSBidWxsZXQgaXMgYSBzaW1wbGUgcGlzdG9sIGJ1bGxldCB0aGF0IHdpbGwgYmUgaW4gdGhlXHJcbi8vdXNlcidzIHN0YXJ0aW5nIHdlYXBvbi4gaXQgZG9lcyBtaW5pbWFsIGRhbWFnZSBhbmQgbW92ZXMgYXQgYSBzbG93IHNwZWVkLlxyXG4vL3RoZSB2YWx1ZSBvZiBpc1BlbmV0cmF0aW5nIGlzIHNldCB0byBmYWxzZSB0byBpbmRpY2F0ZSB0aGUgYnVsbGV0IHNob3VsZFxyXG4vL25vdCBiZSBsaXZlIGFmdGVyIGl0IGNvbGxpZGVzIHdpdGggc29tZXRoaW5nIGFuZCBkb2VzIGl0cyBkYW1hZ2UuXHJcbi8vaW4gdGhlIGZ1dHVyZSB0aGUgYnVsbGV0IHdpbGwgaGF2ZSBhIG1heGltdW0gcmFuZ2UvbGl2ZSB0aW1lIHRvXHJcbi8vbGltaXQgaXRzIHVzZWZ1bG5lc3MgbW9yZS5cclxuY2xhc3MgQnVsbGV0OW1tIGV4dGVuZHMgQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGRlc3RYLCBkZXN0WSkge1xyXG4gICAgICAgIHN1cGVyKDEwMDAsIDEwLCB4LCB5LCBkZXN0WCwgZGVzdFksIGZhbHNlKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9idWxsZXQzLnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnVsbGV0OW1tO1xyXG4iLCIvL1RoZSBzbmlwZXIgaXMgb25seSBjdXJyZW50bHkgdXNlZCB0byBkZXRlcm1pbmUgdGhlIHR5cGUgb2YgYnVsbGV0IHRvIGJlIGdlbmVyYXRlZFxuLy9pbiBtYWluLmpzJyBldmVudCBoYW5kbGVyIGZvciBjbGlja3Ncbi8vSW4gdGhlIGZ1dHVyZSBpdCB3aWxsIGNvbnRyb2wgZmlyZSByYXRlIGFuZCB0aGUgYW1tbyBjYXBhY2l0eS5cbmltcG9ydCBXZWFwb24gZnJvbSAnLi9XZWFwb24uanMnO1xuXG5jbGFzcyBQaXN0b2wgZXh0ZW5kcyBXZWFwb257XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoMTUsIDkwKTtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJQaXN0b2xcIjtcbiAgICAgICAgc3VwZXIubG9hZFNob290U291bmQoJ0F1ZGlvL1Bpc3RvbFNob3QubXAzJyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQaXN0b2w7XG4iLCIvL1RoZSBzbmlwZXIgaXMgb25seSBjdXJyZW50bHkgdXNlZCB0byBkZXRlcm1pbmUgdGhlIHR5cGUgb2YgYnVsbGV0IHRvIGJlIGdlbmVyYXRlZFxyXG4vL2luIG1haW4uanMnIGV2ZW50IGhhbmRsZXIgZm9yIGNsaWNrc1xyXG4vL0luIHRoZSBmdXR1cmUgaXQgd2lsbCBjb250cm9sIGZpcmUgcmF0ZSBhbmQgdGhlIGFtbW8gY2FwYWNpdHkuXHJcbmltcG9ydCBXZWFwb24gZnJvbSAnLi9XZWFwb24uanMnO1xyXG5cclxuY2xhc3MgU25pcGVyIGV4dGVuZHMgV2VhcG9ue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcig1LCAzMCk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJTbmlwZXJcIjtcclxuICAgICAgICBzdXBlci5sb2FkU2hvb3RTb3VuZCgnQXVkaW8vU25pcGVyU2hvdC5tcDMnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU25pcGVyO1xyXG4iLCIvL2NsaXBTaXplIGFuZCBhbW1vIHdpbGwgYmUgdXNlZCBhcyBleHBlY3RlZCBuZXh0IHdlZWtcbi8vYXV0b21hdGljIHdpbGwgYmUgdXNlZCBhcyBhIGJvb2xlYW4gZm9yIHdoZXRoZXIgb3Igbm90XG4vL2hvbGRpbmcgY2xpY2sgc2hvdWxkIGNvbnRpbnVvdXNseSBmaXJlLlxuLy9UaGUgbmFtZSBmaWVsZCBpcyB1c2VkIGZvciB0aGUgSFVEIGRpc3BsYXlpbmcgdGhlIGFjdGl2ZSB3ZWFwb24uXG5jbGFzcyBXZWFwb24ge1xuXG4gICAgY29uc3RydWN0b3IoY2xpcFNpemUsIG1heEFtbW8pIHtcbiAgICAgICAgdGhpcy5jbGlwU2l6ZSA9IGNsaXBTaXplO1xuICAgICAgICB0aGlzLm1heEFtbW8gPSBtYXhBbW1vO1xuICAgICAgICB0aGlzLm5hbWUgPSAnJztcbiAgICAgICAgdGhpcy5jb29sZG93biA9IDA7XG4gICAgfVxuICAgIGxvYWRTaG9vdFNvdW5kKHVybCkge1xuICAgICAgICB0aGlzLmlzU291bmRMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zb3VuZCA9IG5ldyBBdWRpbygpO1xuICAgICAgICB0aGlzLnNvdW5kLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNTb3VuZExvYWRlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc291bmQuc3JjID0gdXJsO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBXZWFwb247XG4iXX0=
