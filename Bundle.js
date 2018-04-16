(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"../Utilities/Util.js":12}],2:[function(require,module,exports){
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

},{"./Enemy.js":1}],3:[function(require,module,exports){
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

},{"./Enemy.js":1}],4:[function(require,module,exports){
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

},{"./Enemy.js":1}],5:[function(require,module,exports){
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

},{"./EnvironmentObject.js":7}],6:[function(require,module,exports){
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

},{"./EnvironmentObject.js":7}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"./EnvironmentObject.js":7}],9:[function(require,module,exports){
'use strict';

var _Bullet9mm = require('./Weapons/Bullet9mm.js');

var _Bullet9mm2 = _interopRequireDefault(_Bullet9mm);

var _Util = require('./Utilities/Util.js');

var _Util2 = _interopRequireDefault(_Util);

var _World = require('./World/World.js');

var _World2 = _interopRequireDefault(_World);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create the canvas
var canvas = document.createElement("canvas"); /*
                                                 Sources:
                                                 http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
                                                 https://stackoverflow.com/questions/4037212/html-canvas-full-screen?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
                                                 https://stackoverflow.com/questions/16919601/html5-canvas-world.camera-viewport-how-to-actally-do-it?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
                                                 http://jsfiddle.net/gfcarv/QKgHs/
                                                */

var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

var world = new _World2.default(canvas);

// Handle controls
var keysPressed = {};
var mouse = [0, 0];
var clicking = false;

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
    clicking = true;
    world.bullets.push(new _Bullet9mm2.default(world.player.x + world.player.width / 2, world.player.y, e.clientX + world.camera.x, e.clientY + world.camera.y));
    if (world.player.health < 0) {
        if (e.clientX > canvas.width / 2 - 100 && e.clientX < canvas.width / 2 - 100 + 200 && e.clientY > canvas.height / 2 + 25 && e.clientY < canvas.height / 2 + 25 + 100) {
            world.start(canvas);
        }
    }
});

var isCollisionWithEnvironmentObject = function isCollisionWithEnvironmentObject() {
    for (var i = 0; i < world.environmentObjects.length; i++) {
        if (_Util2.default.isCollision(world.environmentObjects[i], world.player) && world.environmentObjects[i].isBlocking) {
            return true;
        }
    }
    return false;
};

// Update game objects
var update = function update(modifier) {
    if (world.player.health > 0) {
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
        for (var i = world.bullets.length - 1; i >= 0; i--) {
            world.bullets[i].move(modifier, world.environmentObjects, world.enemies);
            if (world.bullets[i].live == false) {
                world.bullets.splice(i, 1);
            }
        }
    }

    for (var _i = world.enemies.length - 1; _i >= 0; _i--) {
        world.enemies[_i].move(world.player, modifier, world.environmentObjects);
        if (world.enemies[_i].attackCooldown > 0) {
            world.enemies[_i].attackCooldown -= 5;
        }
        if (world.enemies[_i].health <= 0) {
            world.enemies.splice(_i, 1);
        }
    }
    for (var _i2 = world.environmentObjects.length - 1; _i2 >= 0; _i2--) {
        if (world.environmentObjects[_i2].health <= 0) {
            world.environmentObjects.splice(_i2, 1);
        }
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

        for (var _i3 = 0; _i3 < world.environmentObjects.length; _i3++) {
            if (world.environmentObjects[_i3].isImageLoaded) {
                world.environmentObjects[_i3].draw(ctx, world.camera);
            }
        }

        //Render all the world.bullets at their locations and remove world.bullets that aren't live
        for (var _i4 = 0; _i4 < world.bullets.length; _i4++) {
            if (world.bullets[_i4].isImageLoaded && world.bullets[_i4].live) {
                world.bullets[_i4].draw(ctx, world.camera);
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
    }
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

},{"./Utilities/Util.js":12,"./Weapons/Bullet9mm.js":14,"./World/World.js":15}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    function Player(x, y) {
        _classCallCheck(this, Player);

        this.x = x;
        this.y = y;
        this.health = 100;
        this.speed = 256;
        this.loadImage();
    }

    _createClass(Player, [{
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
            this.image.src = "Graphics/Player.png";
        }
    }, {
        key: "shoot",
        value: function shoot() {
            this.shootCooldown += 10;
        }
    }, {
        key: "draw",
        value: function draw(ctx, camera) {
            ctx.drawImage(this.image, this.x - camera.x, this.y - camera.y);
        }
    }]);

    return Player;
}();

exports.default = Player;

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = require('../Utilities/Util.js');

var _Util2 = _interopRequireDefault(_Util);

var _Crate = require('../EnvironmentObjects/Crate.js');

var _Crate2 = _interopRequireDefault(_Crate);

var _Bush = require('../EnvironmentObjects/Bush.js');

var _Bush2 = _interopRequireDefault(_Bush);

var _Rock = require('../EnvironmentObjects/Rock.js');

var _Rock2 = _interopRequireDefault(_Rock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bullet = function () {
    function Bullet(velocity, damage, x, y, destX, destY) {
        _classCallCheck(this, Bullet);

        this.velocity = velocity;
        this.damage = damage;
        this.x = x;
        this.y = y;
        this.destX = destX;
        this.destY = destY;
        this.cooldown = 0;
        this.live = true;
        var diffX = this.destX - this.x;
        var diffY = this.destY - this.y;
        var bigger = 1;
        if (Math.abs(diffX) > Math.abs(diffY)) {
            bigger = diffX;
            this.coeffX = diffX / Math.abs(diffX);
            this.coeffY = diffY / Math.abs(diffX);
        } else {
            bigger = diffY;
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
            //let length = Math.sqrt(diffX * diffX + diffY * diffY);
            this.x += this.velocity * modifier * this.coeffX;
            this.y += this.velocity * modifier * this.coeffY;
            if (this.hitSomething(environmentObjects, enemies)) {
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

},{"../EnvironmentObjects/Bush.js":5,"../EnvironmentObjects/Crate.js":6,"../EnvironmentObjects/Rock.js":8,"../Utilities/Util.js":12}],14:[function(require,module,exports){
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

        var _this = _possibleConstructorReturn(this, (Bullet9mm.__proto__ || Object.getPrototypeOf(Bullet9mm)).call(this, 1000, 10, x, y, destX, destY));

        _get(Bullet9mm.prototype.__proto__ || Object.getPrototypeOf(Bullet9mm.prototype), 'loadImage', _this).call(_this, "Graphics/bullet3.png");
        return _this;
    }

    return Bullet9mm;
}(_Bullet3.default);

exports.default = Bullet9mm;

},{"../Utilities/Util.js":12,"./Bullet.js":13}],15:[function(require,module,exports){
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
            var lightEnemyCap = this.wave * 5;
            var regularEnemyCap = Math.floor(this.wave / 2 * 5);
            var tankEnemyCap = Math.floor(this.wave * 1.5);

            for (var i = 0; i < lightEnemyCap; i++) {
                this.enemies.push(new _LightEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i = 0; _i < regularEnemyCap; _i++) {
                this.enemies.push(new _RegularEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            }for (var _i2 = 0; _i2 < tankEnemyCap; _i2++) {
                this.enemies.push(new _TankEnemy2.default(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375)));
            } // include the other types as well, maybe if wave == something or > something

            var collisionFlag = true;
            while (collisionFlag === true) {
                var _i3 = _Util2.default.areAnyCollisions(this.enemies, this.environmentObjects);
                if (_i3 === -1) collisionFlag = false;else this.enemies[_i3].setPosition(_Util2.default.randomIntFromInterval(250, 9750), _Util2.default.randomIntFromInterval(250, 5375));
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

},{"../Enemies/LightEnemy":2,"../Enemies/RegularEnemy":3,"../Enemies/TankEnemy":4,"../EnvironmentObjects/Bush":5,"../EnvironmentObjects/Crate":6,"../EnvironmentObjects/Rock":8,"../Players/Camera":10,"../Players/Player":11,"../Utilities/Util":12}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJFbmVtaWVzL0VuZW15LmpzIiwiRW5lbWllcy9MaWdodEVuZW15LmpzIiwiRW5lbWllcy9SZWd1bGFyRW5lbXkuanMiLCJFbmVtaWVzL1RhbmtFbmVteS5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9CdXNoLmpzIiwiRW52aXJvbm1lbnRPYmplY3RzL0NyYXRlLmpzIiwiRW52aXJvbm1lbnRPYmplY3RzL0Vudmlyb25tZW50T2JqZWN0LmpzIiwiRW52aXJvbm1lbnRPYmplY3RzL1JvY2suanMiLCJNYWluLmpzIiwiUGxheWVycy9DYW1lcmEuanMiLCJQbGF5ZXJzL1BsYXllci5qcyIsIlV0aWxpdGllcy9VdGlsLmpzIiwiV2VhcG9ucy9CdWxsZXQuanMiLCJXZWFwb25zL0J1bGxldDltbS5qcyIsIldvcmxkL1dvcmxkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O3FqQkNBQTs7Ozs7O0FBTUE7Ozs7Ozs7O0FBRUE7OztJQUdNLEs7O0FBRUY7Ozs7Ozs7OztBQVNBLG1CQUFZLENBQVosRUFBZSxDQUFmLEVBQWtCLFFBQWxCLEVBQTRCLE1BQTVCLEVBQW9DLE1BQXBDLEVBQTRDLFlBQTVDLEVBQTBEO0FBQUE7O0FBQ3RELGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxhQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsYUFBSyxLQUFMLEdBQWEsS0FBSyxFQUFMLEdBQVEsQ0FBckI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGFBQUssWUFBTCxHQUFvQixZQUFwQjtBQUNBLGFBQUssY0FBTCxHQUFzQixDQUF0QjtBQUNIOztBQUVEOzs7Ozs7Ozs7a0NBS1UsRyxFQUFLO0FBQUE7O0FBQ1gsaUJBQUssYUFBTCxHQUFxQixLQUFyQjtBQUNBLGlCQUFLLEtBQUwsR0FBYSxJ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O0FBQzNCLHNCQUFLLGtCQUFMLEdBQTBCLElBQTFCO0FBQ0gsYUFGRDtBQUdBLGlCQUFLLFVBQUwsQ0FBZ0IsR0FBaEIsR0FBc0IseUJBQXRCO0FBQ0g7O0FBRUQ7Ozs7Ozs7O3VDQUtlLEcsRUFBSyxNLEVBQVE7QUFDeEIsZ0JBQUksZUFBSjtBQUFBLGdCQUFZLGdCQUFaO0FBQ0EscUJBQVMsT0FBTyxLQUFoQjtBQUNBLHNCQUFVLE9BQU8sTUFBakI7O0FBRUEsZ0JBQUcsS0FBSyxVQUFMLENBQWdCLEtBQWhCLEdBQXdCLEtBQUssTUFBTCxDQUFZLENBQXBDLEdBQXdDLE9BQU8sS0FBbEQsRUFDSSxTQUFTLEtBQUssVUFBTCxDQUFnQixLQUFoQixHQUF3QixLQUFLLE1BQUwsQ0FBWSxDQUE3QztBQUNKLGdCQUFHLEtBQUssVUFBTCxDQUFnQixNQUFoQixHQUF5QixLQUFLLE1BQUwsQ0FBWSxDQUFyQyxHQUF5QyxPQUFPLE1BQW5ELEVBQ0ksVUFBVSxLQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsR0FBeUIsS0FBSyxNQUFMLENBQVksQ0FBL0M7O0FBRUosZ0JBQUksU0FBSixDQUFjLEtBQUssVUFBbkIsRUFBK0IsS0FBSyxNQUFMLENBQVksQ0FBM0MsRUFBOEMsS0FBSyxNQUFMLENBQVksQ0FBMUQsRUFBNkQsTUFBN0QsRUFBcUUsT0FBckUsRUFBOEUsQ0FBOUUsRUFBaUYsQ0FBakYsRUFBb0YsTUFBcEYsRUFBNEYsT0FBNUY7QUFDSDs7Ozs7O2tCQUdVLEsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKipcclxuICogU291cmNlczpcclxuICogaHR0cHM6Ly9tZWRpdW0uY29tL0B5dXJpYmV0dC9qYXZhc2NyaXB0LWFic3RyYWN0LW1ldGhvZC13aXRoLWVzNi01ZGJlYTRiMDAwMjdcclxuICogaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1JNWRBUnBBUGxOa1xyXG4gKi9cclxuXHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgRW5lbXkgY2xhc3MgaXMgdGhlIHBhcmVudCBjbGFzcyBmb3IgYWxsIG9mIHRoZSBlbmVtaWVzLlxyXG4gKi9cclxuY2xhc3MgRW5lbXkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIHZlbG9jaXR5IFRoZSB2ZWxvY2l0eSBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gaGVhbHRoIFRoZSBoZWFsdGggb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIGRhbWFnZSBUaGUgZGFtYWdlIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSBwb2ludHNPbktpbGwgVGhlIHBvaW50cyByZXdhcmRlZCBmb3Iga2lsbGluZyB0aGUgRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIHZlbG9jaXR5LCBoZWFsdGgsIGRhbWFnZSwgcG9pbnRzT25LaWxsKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuYW5nbGUgPSBNYXRoLlBJLzI7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5O1xyXG4gICAgICAgIHRoaXMuaGVhbHRoID0gaGVhbHRoO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlO1xyXG4gICAgICAgIHRoaXMucG9pbnRzT25LaWxsID0gcG9pbnRzT25LaWxsO1xyXG4gICAgICAgIHRoaXMuYXR0YWNrQ29vbGRvd24gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiB0YWtlcyBpbiBhIHVybCBhbmQgbG9hZHMgaXQgYXMgYW4gSW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0ltYWdlTG9hZGVkIGlzXHJcbiAgICAgKiBzZXQgdG8gdHJ1ZS4gVGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIEVuZW15IGFyZSBzZXQgdG8gdGhlIGhlaWdodCBhbmQgd2lkdGggb2YgdGhlIGltYWdlLlxyXG4gICAgICogQHBhcmFtIHVybCBUaGUgdXJsIHRoYXQgc2hvdWxkIGJlIGxvYWRlZC5cclxuICAgICAqL1xyXG4gICAgbG9hZEltYWdlKHVybCkge1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhdHRhY2sgZnVuY3Rpb24gdGFrZXMgaW4gYW4gb2JqZWN0IGFuZCByZW1vdmVzIHRoZSBhbW91bnQgb2YgZGFtYWdlIHRoZSBFbmVteSBkZWFscyBmcm9tIHRoZWlyIGhlYWx0aC5cclxuICAgICAqIDUwMCBpcyBhZGRlZCB0byB0aGUgYXR0YWNrIGNvb2xkb3duIG9mIHRoZSBlbmVteSBhZnRlciBhbiBhdHRhY2suXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3QgdGhhdCBpcyBiZWluZyBhdHRhY2tlZC5cclxuICAgICAqL1xyXG4gICAgYXR0YWNrKG9iamVjdCkge1xyXG4gICAgICAgIG9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tDb29sZG93biArPSA1MDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlcyB0aGUgZW5lbXkgdG93YXJkcyB0aGUgcGxheWVyLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIG9iamVjdCB0byBtb3ZlIHRvd2FyZHMuXHJcbiAgICAgKiBAcGFyYW0gbW9kaWZpZXIgVGhlIG1vZGlmaWVyIHRvIGJlIG11bHRpcGxpZWQgYnkgdGhlIHZlbG9jaXR5LlxyXG4gICAgICogQHBhcmFtIGVudmlyb25tZW50T2JqZWN0cyBBbiBhcnJheSBvZiBlbnZpcm9ubWVudCBvYmplY3RzLlxyXG4gICAgICovXHJcbiAgICBtb3ZlKHBsYXllciwgbW9kaWZpZXIsIGVudmlyb25tZW50T2JqZWN0cykge1xyXG4gICAgICAgIGxldCBkaWZmWCA9IHBsYXllci54IC0gdGhpcy54O1xyXG4gICAgICAgIGxldCBkaWZmWSA9IHBsYXllci55IC0gdGhpcy55O1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBNYXRoLnNxcnQoZGlmZlggKiBkaWZmWCArIGRpZmZZICogZGlmZlkpO1xyXG4gICAgICAgIGlmKGxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICBkaWZmWCAvPSBsZW5ndGg7XHJcbiAgICAgICAgICAgIGRpZmZZIC89IGxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYW5nbGUgPSBNYXRoLmF0YW4yKGRpZmZZLCBkaWZmWCk7XHJcblxyXG4gICAgICAgIGlmKGRpZmZYID4gMCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnggKyB0aGlzLndpZHRoIDw9IDEwMDAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZGlmZlggPCAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMueCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggLT0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRpZmZZID4gMCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnkgKyB0aGlzLmhlaWdodCA8PSA1NjI1KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZGlmZlkgPCAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMueSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgLT0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIHBsYXllcikgJiYgdGhpcy5hdHRhY2tDb29sZG93biA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlYWx0aCBiZWZvcmUgYXR0YWNrXCIgKyBwbGF5ZXIuaGVhbHRoKTtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2socGxheWVyKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWFsdGggYWZ0ZXIgYXR0YWNrXCIgKyBwbGF5ZXIuaGVhbHRoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBlbmVteSBnaXZlbiB4IGFuZCB5LlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gdG8gYmUgc2V0LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gdG8gYmUgc2V0LlxyXG4gICAgICovXHJcbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyBhIGhlbHBlciBmdW5jdGlvbiB1c2VkIGJ5IHRoZSBtb3ZlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBpZiB0aGVyZSBpcyBhIGNvbGxpc2lvbiBiZXR3ZWVuIGFuXHJcbiAgICAgKiBlbnZpcm9ubWVudCBvYmplY3QgYW5kIHRoZSBlbmVteS4gSWYgdGhlcmUgaXMgYSBjb2xsaXNpb24sIHRoZSBvYmplY3QgaXMgYXR0YWNrZWQuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3RzIEFuIGFycmF5IG9mIGVudmlyb25tZW50IG9iamVjdHMuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBhIGNvbGxpc2lvbiBleGlzdHMuXHJcbiAgICAgKi9cclxuICAgIGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KGVudmlyb25tZW50T2JqZWN0cykge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbnZpcm9ubWVudE9iamVjdHNbaV0pICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmF0dGFja0Nvb2xkb3duID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2soZW52aXJvbm1lbnRPYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkcmF3IGZ1bmN0aW9uIGRyYXdzIHRoZSBpbWFnZSBvbiB0aGUgY2FudmFzIGF0IHRoZSB4IGFuZCB5IHBvc2l0aW9uIG9mIHRoZSBMaWdodEVuZW15LlxyXG4gICAgICogQHBhcmFtIGN0eCBUaGUgY29udGV4dCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICovXHJcbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XHJcbiAgICAgICAgLy9jdHguc2F2ZSgpO1xyXG4gICAgICAgIC8vY3R4LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgLy9jdHgucm90YXRlKHRoaXMuYW5nbGUgKyBNYXRoLlBJLzIuMCk7XHJcbiAgICAgICAgLy9jdHgudHJhbnNsYXRlKC10aGlzLngsIC10aGlzLnkpO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcclxuICAgICAgICAvL2N0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVuZW15OyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgTGlnaHRFbmVteSBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaXMgYSBmYXN0IGVuZW15IHdpdGggbG93IGhlYWx0aC5cclxuICovXHJcbmNsYXNzIExpZ2h0RW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgTGlnaHRFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gMTI4LCB0aGUgaGVhbHRoIHNldCB0byAxMCwgdGhlIGRhbWFnZSBzZXQgdG8gMTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gNTAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgTGlnaHRFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBMaWdodEVuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMTI4LCAxMCwgMTAsIDUwKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9MaWdodEVuZW15LnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlnaHRFbmVteTsiLCJpbXBvcnQgRW5lbXkgZnJvbSAnLi9FbmVteS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIFJlZ3VsYXJFbmVteSBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaGFzIGJhbGFuY2VkIHN0YXRzIGFjcm9zcyB0aGUgYm9hcmQuXHJcbiAqL1xyXG5jbGFzcyBSZWd1bGFyRW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgUmVndWxhckVuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byA2NCwgdGhlIGhlYWx0aCBzZXQgdG8gMjUsIHRoZSBkYW1hZ2Ugc2V0IHRvIDEwLCBhbmQgdGhlIHBvaW50c09uS2lsbFxyXG4gICAgICogc2V0IHRvIDEwMC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBSZWd1bGFyRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgUmVndWxhckVuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgNjQsIDI1LCAxMCwgMTAwKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9SZWd1bGFyRW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWd1bGFyRW5lbXk7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBUYW5rRW5lbXkgY2xhc3MgZXh0ZW5kcyB0aGUgRW5lbXkgY2xhc3MuIEl0IGlzIGEgc2xvdyBlbmVteSB3aXRoIGhpZ2ggaGVhbHRoIGFuZCBkYW1hZ2UuXHJcbiAqL1xyXG5jbGFzcyBUYW5rRW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgVGFua0VuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byAzMiwgdGhlIGhlYWx0aCBzZXQgdG8gMTAwLCB0aGUgZGFtYWdlIHNldCB0byAyNSwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byA1MDAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgVGFua0VuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFRhbmtFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDMyLCAxMDAsICAyNSwgNTAwKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9UYW5rRW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYW5rRW5lbXk7IiwiaW1wb3J0IEVudmlyb25tZW50T2JqZWN0IGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3QuanMnO1xuXG4vKipcbiAqIFRoZSBCdXNoIGNsYXNzIGV4dGVuZHMgdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzLiBJdCBpcyBhIG5vbi1ibG9ja2luZyBvYmplY3QuXG4gKi9cbmNsYXNzIEJ1c2ggZXh0ZW5kcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgQnVzaC4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzZXMgY29uc3RydWN0b3JcbiAgICAgKiB3aXRoIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgaGVhbHRoIHNldCB0byAxMDAwMDAsIGFuZCBpc0Jsb2NraW5nIHNldCB0byBmYWxzZS5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgQnVzaC5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgQnVzaC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHN1cGVyKHgsIHksIDEwMDAwMCwgZmFsc2UpO1xuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9CdXNoLnBuZ1wiKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1c2g7IiwiaW1wb3J0IEVudmlyb25tZW50T2JqZWN0IGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3QuanMnO1xuXG4vKipcbiAqIFRoZSBDcmF0ZSBjbGFzcyBleHRlbmRzIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzcy4gSXQgaXMgYSBibG9ja2luZyBvYmplY3Qgd2l0aCBsb3cgaGVhbHRoLlxuICovXG5jbGFzcyBDcmF0ZSBleHRlbmRzIEVudmlyb25tZW50T2JqZWN0IHtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBDcmF0ZS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzZXMgY29uc3RydWN0b3JcbiAgICAgKiB3aXRoIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgaGVhbHRoIHNldCB0byAxMDAsIGFuZCBpc0Jsb2NraW5nIHNldCB0byB0cnVlLlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBDcmF0ZS5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgQ3JhdGUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICBzdXBlcih4LCB5LCAxMDAsIHRydWUpO1xuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9DcmF0ZS5wbmdcIik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDcmF0ZTtcbiIsIi8qKlxuICogVGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzIGlzIHRoZSBwYXJlbnQgZm9yIGFsbCBlbnZpcm9ubWVudCBvYmplY3RzLlxuICovXG5jbGFzcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0gaGVhbHRoIFRoZSBoZWFsdGggb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSBpc0Jsb2NraW5nIFdoZXRoZXIgdGhlIEVudmlyb25tZW50T2JqZWN0IGNhbiBiZSB3YWxrZWQgdGhyb3VnaC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBoZWFsdGgsIGlzQmxvY2tpbmcpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5oZWFsdGggPSBoZWFsdGg7XG4gICAgICAgIHRoaXMuaXNCbG9ja2luZyA9IGlzQmxvY2tpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiB0YWtlcyBpbiBhIHVybCBhbmQgbG9hZHMgaXQgYXMgYW4gSW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0ltYWdlTG9hZGVkIGlzXG4gICAgICogc2V0IHRvIHRydWUuIFRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdCBhcmUgc2V0IHRvIHRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBpbWFnZS5cbiAgICAgKiBAcGFyYW0gdXJsIFRoZSB1cmwgdGhhdCBzaG91bGQgYmUgbG9hZGVkLlxuICAgICAqL1xuICAgIGxvYWRJbWFnZSh1cmwpIHtcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZHJhdyBmdW5jdGlvbiBkcmF3cyB0aGUgaW1hZ2Ugb24gdGhlIGNhbnZhcyBhdCB0aGUgeCBhbmQgeSBwb3NpdGlvbiBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIGN0eCBUaGUgY29udGV4dCBvZiB0aGUgY2FudmFzLlxuICAgICAqL1xuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW52aXJvbm1lbnRPYmplY3Q7IiwiaW1wb3J0IEVudmlyb25tZW50T2JqZWN0IGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3QuanMnO1xuXG4vKipcbiAqIFRoZSBSb2NrIGNsYXNzIGV4dGVuZHMgdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzLiBJdCBpcyBhIGJsb2NraW5nIG9iamVjdCB3aXRoIGhpZ2ggaGVhbHRoLlxuICovXG5jbGFzcyBSb2NrIGV4dGVuZHMgRW52aXJvbm1lbnRPYmplY3Qge1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFJvY2suIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzc2VzIGNvbnN0cnVjdG9yXG4gICAgICogd2l0aCB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIGhlYWx0aCBzZXQgdG8gMzAwLCBhbmQgaXNCbG9ja2luZyBzZXQgdG8gdHJ1ZS5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgUm9jay5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgUm9jay5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHN1cGVyKHgsIHksIDMwMCwgdHJ1ZSk7XG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1JvY2sucG5nXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUm9jaztcbiIsIi8qXG4gIFNvdXJjZXM6XG4gIGh0dHA6Ly93d3cubG9zdGRlY2FkZWdhbWVzLmNvbS9ob3ctdG8tbWFrZS1hLXNpbXBsZS1odG1sNS1jYW52YXMtZ2FtZS9cbiAgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDAzNzIxMi9odG1sLWNhbnZhcy1mdWxsLXNjcmVlbj91dG1fbWVkaXVtPW9yZ2FuaWMmdXRtX3NvdXJjZT1nb29nbGVfcmljaF9xYSZ1dG1fY2FtcGFpZ249Z29vZ2xlX3JpY2hfcWFcbiAgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTY5MTk2MDEvaHRtbDUtY2FudmFzLXdvcmxkLmNhbWVyYS12aWV3cG9ydC1ob3ctdG8tYWN0YWxseS1kby1pdD91dG1fbWVkaXVtPW9yZ2FuaWMmdXRtX3NvdXJjZT1nb29nbGVfcmljaF9xYSZ1dG1fY2FtcGFpZ249Z29vZ2xlX3JpY2hfcWFcbiAgaHR0cDovL2pzZmlkZGxlLm5ldC9nZmNhcnYvUUtnSHMvXG4gKi9cblxuaW1wb3J0IEJ1bGxldDltbSBmcm9tICcuL1dlYXBvbnMvQnVsbGV0OW1tLmpzJ1xuaW1wb3J0IFV0aWwgZnJvbSAnLi9VdGlsaXRpZXMvVXRpbC5qcyc7XG5pbXBvcnQgV29ybGQgZnJvbSAnLi9Xb3JsZC9Xb3JsZC5qcyc7XG5cbi8vIENyZWF0ZSB0aGUgY2FudmFzXG5sZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbmxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG5sZXQgd29ybGQgPSBuZXcgV29ybGQoY2FudmFzKTtcblxuLy8gSGFuZGxlIGNvbnRyb2xzXG5sZXQga2V5c1ByZXNzZWQgPSB7fTtcbmxldCBtb3VzZSA9IFswLDBdO1xubGV0IGNsaWNraW5nID0gZmFsc2U7XG5cbmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG5cdGtleXNQcmVzc2VkW2Uua2V5Q29kZV0gPSB0cnVlO1xufSwgZmFsc2UpO1xuXG5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcblx0ZGVsZXRlIGtleXNQcmVzc2VkW2Uua2V5Q29kZV07XG59LCBmYWxzZSk7XG5cbmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XG5cdG1vdXNlWzBdID0gZS5jbGllbnRYO1xuXHRtb3VzZVsxXSA9IGUuY2xpZW50WTtcbn0sIGZhbHNlKTtcblxuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcblx0Y2xpY2tpbmcgPSB0cnVlO1xuXHR3b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDltbSh3b3JsZC5wbGF5ZXIueCArIHdvcmxkLnBsYXllci53aWR0aC8yLCB3b3JsZC5wbGF5ZXIueSwgZS5jbGllbnRYK3dvcmxkLmNhbWVyYS54LCBlLmNsaWVudFkrd29ybGQuY2FtZXJhLnkpKTtcbiAgICBpZih3b3JsZC5wbGF5ZXIuaGVhbHRoIDwgMCkge1xuICAgICAgICBpZihlLmNsaWVudFggPiBjYW52YXMud2lkdGgvMiAtIDEwMCAmJiBlLmNsaWVudFggPCAoY2FudmFzLndpZHRoLzIgLSAxMDArMjAwKVxuICAgICAgICAgICAgJiYgZS5jbGllbnRZID4gY2FudmFzLmhlaWdodC8yICsgMjUgJiYgZS5jbGllbnRZIDwgY2FudmFzLmhlaWdodC8yICsgMjUgKyAxMDApIHtcbiAgICAgICAgICAgIHdvcmxkLnN0YXJ0KGNhbnZhcyk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxubGV0IGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0ID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29ybGQuZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChVdGlsLmlzQ29sbGlzaW9uKHdvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXSwgd29ybGQucGxheWVyKSAmJiB3b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uaXNCbG9ja2luZykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuLy8gVXBkYXRlIGdhbWUgb2JqZWN0c1xubGV0IHVwZGF0ZSA9IChtb2RpZmllcikgPT4ge1xuXHRpZih3b3JsZC5wbGF5ZXIuaGVhbHRoID4gMCkge1xuICAgICAgICBpZiAoODcgaW4ga2V5c1ByZXNzZWQpIHsgLy8gUGxheWVyIGhvbGRpbmcgdXBcbiAgICAgICAgXHRpZih3b3JsZC5wbGF5ZXIueSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgd29ybGQucGxheWVyLnkgLT0gd29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XG4gICAgICAgICAgICAgICAgaWYoaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoKSkge1xuICAgICAgICAgICAgICAgICAgICB3b3JsZC5wbGF5ZXIueSArPSB3b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcbiAgICAgICAgICAgICAgICB9XG5cdFx0XHR9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKDgzIGluIGtleXNQcmVzc2VkKSB7IC8vIFBsYXllciBob2xkaW5nIGRvd25cbiAgICAgICAgXHRpZih3b3JsZC5wbGF5ZXIueSArIHdvcmxkLnBsYXllci5oZWlnaHQgPD0gNTYyNSkge1xuICAgICAgICAgICAgICAgIHdvcmxkLnBsYXllci55ICs9IHdvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xuICAgICAgICAgICAgICAgIGlmKGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgd29ybGQucGxheWVyLnkgLT0gd29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XG4gICAgICAgICAgICAgICAgfVxuXHRcdFx0fVxuICAgICAgICB9XG4gICAgICAgIGlmICg2NSBpbiBrZXlzUHJlc3NlZCkgeyAvLyBQbGF5ZXIgaG9sZGluZyBsZWZ0XG4gICAgICAgIFx0aWYod29ybGQucGxheWVyLnggPj0gMCkge1xuICAgICAgICAgICAgICAgIHdvcmxkLnBsYXllci54IC09IHdvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xuICAgICAgICAgICAgICAgIGlmKGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgd29ybGQucGxheWVyLnggKz0gd29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XG4gICAgICAgICAgICAgICAgfVxuXHRcdFx0fVxuICAgICAgICB9XG4gICAgICAgIGlmICg2OCBpbiBrZXlzUHJlc3NlZCkgeyAvLyBQbGF5ZXIgaG9sZGluZyByaWdodFxuICAgICAgICBcdGlmKHdvcmxkLnBsYXllci54ICsgd29ybGQucGxheWVyLndpZHRoIDw9IDEwMDAwKSB7XG4gICAgICAgICAgICAgICAgd29ybGQucGxheWVyLnggKz0gd29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XG4gICAgICAgICAgICAgICAgaWYoaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoKSkge1xuICAgICAgICAgICAgICAgICAgICB3b3JsZC5wbGF5ZXIueCAtPSB3b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcbiAgICAgICAgICAgICAgICB9XG5cdFx0XHR9XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpID0gd29ybGQuYnVsbGV0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgd29ybGQuYnVsbGV0c1tpXS5tb3ZlKG1vZGlmaWVyLCB3b3JsZC5lbnZpcm9ubWVudE9iamVjdHMsIHdvcmxkLmVuZW1pZXMpO1xuICAgICAgICAgICAgaWYod29ybGQuYnVsbGV0c1tpXS5saXZlID09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICB3b3JsZC5idWxsZXRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXHR9XG5cblx0Zm9yKGxldCBpID0gd29ybGQuZW5lbWllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdHdvcmxkLmVuZW1pZXNbaV0ubW92ZSh3b3JsZC5wbGF5ZXIsIG1vZGlmaWVyLCB3b3JsZC5lbnZpcm9ubWVudE9iamVjdHMpO1xuICAgICAgICBpZih3b3JsZC5lbmVtaWVzW2ldLmF0dGFja0Nvb2xkb3duID4gMCkge1xuICAgICAgICAgICAgd29ybGQuZW5lbWllc1tpXS5hdHRhY2tDb29sZG93biAtPSA1O1xuICAgICAgICB9XG5cdFx0aWYod29ybGQuZW5lbWllc1tpXS5oZWFsdGggPD0gMCkge1xuXHRcdFx0d29ybGQuZW5lbWllcy5zcGxpY2UoaSwgMSk7XG5cdFx0fVxuXHR9XG5cdGZvcihsZXQgaSA9IHdvcmxkLmVudmlyb25tZW50T2JqZWN0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdGlmKHdvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5oZWFsdGggPD0gMCkge1xuXHRcdFx0d29ybGQuZW52aXJvbm1lbnRPYmplY3RzLnNwbGljZShpLCAxKTtcblx0XHR9XG5cdH1cblxuXHRpZih3b3JsZC5lbmVtaWVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdHdvcmxkLndhdmUgKz0gMTtcblx0XHR3b3JsZC5zdGFydFdhdmUoKTtcblx0fVxuXG59O1xuXG4vLyBEcmF3IGV2ZXJ5dGhpbmdcbmxldCByZW5kZXIgPSAoKSA9PiB7XG5cdGlmKHdvcmxkLnBsYXllci5oZWFsdGggPCAwKSB7XG4gICAgICAgIGN0eC5mb250ID0gXCIxMjhweCBzYW5zLXNlcmlmXCI7XG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICBjdHguZmlsbFN0eWxlPScjRkZGJztcbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiR2FtZSBPdmVyXCIsIGNhbnZhcy53aWR0aC8yLCBjYW52YXMuaGVpZ2h0LzIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlPScjMDAwJztcbiAgICAgICAgY3R4LnN0cm9rZVRleHQoXCJHYW1lIE92ZXJcIiwgY2FudmFzLndpZHRoLzIsIGNhbnZhcy5oZWlnaHQvMik7XG4gICAgICAgIGN0eC5maWxsU3R5bGU9JyNGRkYnO1xuICAgICAgICBjdHguZmlsbFJlY3QoY2FudmFzLndpZHRoLzIgLSAxMDAsIGNhbnZhcy5oZWlnaHQvMiArIDI1LCAyMDAsIDEwMCk7XG4gICAgICAgIGN0eC5zdHJva2VSZWN0KGNhbnZhcy53aWR0aC8yIC0gMTAwLCBjYW52YXMuaGVpZ2h0LzIgKyAyNSwgMjAwLCAxMDApO1xuICAgICAgICBjdHguZm9udCA9IFwiMjRweCBzYW5zLXNlcmlmXCI7XG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICBjdHguZmlsbFN0eWxlPScjMDAwJztcbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiVHJ5IGFnYWluP1wiLCBjYW52YXMud2lkdGgvMiAtIDEwMCArIDEwMCwgY2FudmFzLmhlaWdodC8yICsgMjUgKyA1MClcblx0fVxuXHRlbHNlIHtcbiAgICAgICAgaWYod29ybGQuaXNCYWNrZ3JvdW5kTG9hZGVkKSB7XG4gICAgICAgICAgICB3b3JsZC5kcmF3QmFja2dyb3VuZChjdHgsIGNhbnZhcyk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgd29ybGQuZW5lbWllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYod29ybGQuZW5lbWllc1tpXS5pc0ltYWdlTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgd29ybGQuZW5lbWllc1tpXS5kcmF3KGN0eCwgd29ybGQuY2FtZXJhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB3b3JsZC5lbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKHdvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5pc0ltYWdlTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgd29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmRyYXcoY3R4LCB3b3JsZC5jYW1lcmEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9SZW5kZXIgYWxsIHRoZSB3b3JsZC5idWxsZXRzIGF0IHRoZWlyIGxvY2F0aW9ucyBhbmQgcmVtb3ZlIHdvcmxkLmJ1bGxldHMgdGhhdCBhcmVuJ3QgbGl2ZVxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgd29ybGQuYnVsbGV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYod29ybGQuYnVsbGV0c1tpXS5pc0ltYWdlTG9hZGVkICYmIHdvcmxkLmJ1bGxldHNbaV0ubGl2ZSkge1xuICAgICAgICAgICAgICAgIHdvcmxkLmJ1bGxldHNbaV0uZHJhdyhjdHgsIHdvcmxkLmNhbWVyYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih3b3JsZC5wbGF5ZXIuaXNJbWFnZUxvYWRlZCkge1xuICAgICAgICAgICAgd29ybGQucGxheWVyLmRyYXcoY3R4LCB3b3JsZC5jYW1lcmEpO1xuICAgICAgICAgICAgY3R4LmZvbnQgPSBcIjQ4cHggc2Fucy1zZXJpZlwiO1xuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlPScjRkZGJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh3b3JsZC5wbGF5ZXIuaGVhbHRoICsgXCIgSFBcIiwgY2FudmFzLndpZHRoLzIgLSAyOTAsIDUwKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KHdvcmxkLnBsYXllci5oZWFsdGggKyBcIiBIUFwiLCBjYW52YXMud2lkdGgvMiAtIDI5MCwgNTApO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KFwiV2F2ZSBcIiArIHdvcmxkLndhdmUsIGNhbnZhcy53aWR0aC8yLCA1MCk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlVGV4dChcIldhdmUgXCIgKyB3b3JsZC53YXZlLCBjYW52YXMud2lkdGgvMiwgNTApO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHdvcmxkLmVuZW1pZXMubGVuZ3RoICsgXCIgRW5lbWllcyBMZWZ0XCIsIGNhbnZhcy53aWR0aC8yICsgMzUwLCA1MCk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlVGV4dCh3b3JsZC5lbmVtaWVzLmxlbmd0aCArIFwiIEVuZW1pZXMgTGVmdFwiLCBjYW52YXMud2lkdGgvMiArIDM1MCwgNTApO1xuICAgICAgICB9XG5cdH1cbn07XG5cbi8vIFRoZSBtYWluIGdhbWUgbG9vcFxubGV0IG1haW4gPSAoKSA9PiB7XG5cdGxldCBub3cgPSBEYXRlLm5vdygpO1xuXHRsZXQgZGVsdGEgPSBub3cgLSB0aGVuO1xuXG5cdHVwZGF0ZShkZWx0YSAvIDEwMDApO1xuXHR3b3JsZC5jYW1lcmEudXBkYXRlKCk7XG5cdGNvbnNvbGUubG9nKCd3b3JsZC5jYW1lcmEueCA9ICcgKyB3b3JsZC5jYW1lcmEueCArICdcXG53b3JsZC5jYW1lcmEueSA9ICcgKyB3b3JsZC5jYW1lcmEueSk7XG5cdHJlbmRlcigpO1xuXG5cdHRoZW4gPSBub3c7XG5cblx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW4pO1xufTtcblxuLy8gQ3Jvc3MtYnJvd3NlciBzdXBwb3J0IGZvciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0ICAgICAgICAgICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZTtcblxubGV0IHRoZW4gPSBEYXRlLm5vdygpO1xubWFpbigpO1xuIiwiLypcclxuICBTb3VyY2VzOlxyXG4gIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvZ2ZjYXJ2L1FLZ0hzL1xyXG4qL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBDYW1lcmEgY2xhc3MgaXMgdXNlZCB0byBmb2xsb3cgdGhlIHBsYXllcidzIG1vdmVtZW50LlxyXG4gKi9cclxuY2xhc3MgQ2FtZXJhIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBDYW1lcmEuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgQ2FtZXJhLlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIENhbWVyYS5cclxuICAgICAqIEBwYXJhbSBjYW52YXNXaWR0aCBUaGUgd2lkdGggb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIEBwYXJhbSBjYW52YXNIZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIHdvcmxkV2lkdGggVGhlIHdpZHRoIG9mIHRoZSB3b3JsZC5cclxuICAgICAqIEBwYXJhbSB3b3JsZEhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSB3b3JsZC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCwgd29ybGRXaWR0aCwgd29ybGRIZWlnaHQpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy54RGVhZFpvbmUgPSAwO1xyXG4gICAgICAgIHRoaXMueURlYWRab25lID0gMDtcclxuICAgICAgICB0aGlzLndpZHRoID0gY2FudmFzV2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBjYW52YXNIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy53b3JsZFdpZHRoID0gd29ybGRXaWR0aDtcclxuICAgICAgICB0aGlzLndvcmxkSGVpZ2h0ID0gd29ybGRIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gc2V0IHdobyB0aGUgY2FtZXJhIGlzIGZvbGxvd2luZy5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciB0aGF0IHRoZSBjYW1lcmEgc2hvdWxkIGZvbGxvdy5cclxuICAgICAqIEBwYXJhbSB4RGVhZFpvbmVcclxuICAgICAqIEBwYXJhbSB5RGVhZFpvbmVcclxuICAgICAqL1xyXG4gICAgZm9sbG93KHBsYXllciwgeERlYWRab25lLCB5RGVhZFpvbmUpIHtcclxuICAgICAgICB0aGlzLmZvbGxvd2luZyA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLnhEZWFkWm9uZSA9IHhEZWFkWm9uZTtcclxuICAgICAgICB0aGlzLnlEZWFkWm9uZSA9IHlEZWFkWm9uZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyB0aGUgY2FtZXJhJ3MgeCBhbmQgeSBwb3NpdGlvbi5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZm9sbG93aW5nICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5mb2xsb3dpbmcueCAtIHRoaXMueCArIHRoaXMueERlYWRab25lID4gdGhpcy53aWR0aClcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuZm9sbG93aW5nLnggLSAodGhpcy53aWR0aCAtIHRoaXMueERlYWRab25lKTtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmZvbGxvd2luZy54IC0gdGhpcy54RGVhZFpvbmUgPCB0aGlzLngpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB0aGlzLmZvbGxvd2luZy54IC0gdGhpcy54RGVhZFpvbmU7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZm9sbG93aW5nLnkgLSB0aGlzLnkgKyB0aGlzLnlEZWFkWm9uZSA+IHRoaXMuaGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5mb2xsb3dpbmcueSAtICh0aGlzLmhlaWdodCAtIHRoaXMueURlYWRab25lKTtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmZvbGxvd2luZy55IC0gdGhpcy55RGVhZFpvbmUgPCB0aGlzLnkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmZvbGxvd2luZy55IC0gdGhpcy55RGVhZFpvbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMueCA8IDApXHJcbiAgICAgICAgICAgIHRoaXMueCA9IDA7XHJcbiAgICAgICAgaWYodGhpcy55IDwgMClcclxuICAgICAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICBpZih0aGlzLnggKyB0aGlzLndpZHRoID4gdGhpcy53b3JsZFdpZHRoKVxyXG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLndvcmxkV2lkdGggLSB0aGlzLndpZHRoO1xyXG4gICAgICAgIGlmKHRoaXMueSArIHRoaXMuaGVpZ2h0ID4gdGhpcy53b3JsZEhlaWdodClcclxuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy53b3JsZEhlaWdodCAtIHRoaXMuaGVpZ2h0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYW1lcmE7IiwiY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgdGhpcy54ID0geDtcbiAgICAgIHRoaXMueSA9IHk7XG4gICAgICB0aGlzLmhlYWx0aCA9IDEwMDtcbiAgICAgIHRoaXMuc3BlZWQgPSAyNTY7XG4gICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICB9XG5cbiAgICBsb2FkSW1hZ2UoKSB7XG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBcIkdyYXBoaWNzL1BsYXllci5wbmdcIjtcbiAgICB9XG4gICAgc2hvb3QoKSB7XG4gICAgICB0aGlzLnNob290Q29vbGRvd24gKz0gMTA7XG4gICAgfVxuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiLypcclxuICBTb3VyY2VzOlxyXG4gIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvR2FtZXMvVGVjaG5pcXVlcy8yRF9jb2xsaXNpb25fZGV0ZWN0aW9uXHJcbiAgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDk1OTk3NS9nZW5lcmF0ZS1yYW5kb20tbnVtYmVyLWJldHdlZW4tdHdvLW51bWJlcnMtaW4tamF2YXNjcmlwdFxyXG4qL1xyXG5cclxuLyoqXHJcbiAqIFRoZSBVdGlsIGNsYXNzIGNvbnRhaW5zIHZhcmlvdXMgdXRpbGl0eSBmdW5jdGlvbnMuXHJcbiAqL1xyXG5jbGFzcyBVdGlsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBpc0NvbGxpc2lvbiBtZXRob2QgY2hlY2tzIGlmIHRoZXJlIGlzIGEgY29sbGlzaW9uIGJldHdlZW4gdGhlIHR3byBpbnB1dHRlZCByZWN0YW5nbGVzLiBUaGlzIGFsZ29yaXRobSBvbmx5XHJcbiAgICAgKiB3b3JrcyB3aXRoIGF4aXMtYWxpZ25lZCByZWN0YW5nbGVzLlxyXG4gICAgICogQHBhcmFtIHJlY3RhbmdsZTEgVGhlIGZpcnN0IHJlY3RhbmdsZS5cclxuICAgICAqIEBwYXJhbSByZWN0YW5nbGUyIFRoZSBzZWNvbmQgcmVjdGFuZ2xlLlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgdGhlcmUgZXhpc3RzIGEgY29sbGlzaW9uIGJldHdlZW4gdGhlIHR3byBpbnB1dHRlZCByZWN0YW5nbGVzLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNDb2xsaXNpb24ocmVjdGFuZ2xlMSwgcmVjdGFuZ2xlMikge1xyXG4gICAgICAgIGlmKHJlY3RhbmdsZTEueCA8IHJlY3RhbmdsZTIueCArIHJlY3RhbmdsZTIud2lkdGggJiZcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMS54ICsgcmVjdGFuZ2xlMS53aWR0aCA+IHJlY3RhbmdsZTIueCAmJlxyXG4gICAgICAgICAgICByZWN0YW5nbGUxLnkgPCByZWN0YW5nbGUyLnkgKyByZWN0YW5nbGUyLmhlaWdodCAmJlxyXG4gICAgICAgICAgICByZWN0YW5nbGUxLnkgKyByZWN0YW5nbGUxLmhlaWdodCA+IHJlY3RhbmdsZTIueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyBpZiB0aGVyZSBhcmUgYW55IGNvbGxpc2lvbnMgYmV0d2VlbiB0aGUgdHdvIGFycmF5cy4gVGhpcyBhbGdvcml0aG0gb25seSB3b3JrcyB3aXRoXHJcbiAgICAgKiBheGlzLWFsaWduZWQgcmVjdGFuZ2xlcy5cclxuICAgICAqIEBwYXJhbSBhcnJheTEgQW4gYXJyYXkgb2YgcmVjdGFuZ2xlcy5cclxuICAgICAqIEBwYXJhbSBhcnJheTIgQW4gYXJyYXkgb2YgcmVjdGFuZ2xlcy5cclxuICAgICAqIEByZXR1cm5zIHtpbnRlZ2VyfSAtMSBpZiB0aGVyZSBhcmUgbm8gY29sbGlzaW9ucyBvciB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGFycmF5IGlmIHRoZXJlIGlzLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXJlQW55Q29sbGlzaW9ucyhhcnJheTEsIGFycmF5Mikge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBhcnJheTEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGFycmF5Mi5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc0NvbGxpc2lvbihhcnJheTFbaV0sIGFycmF5MltqXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgcmFuZG9tIG51bWJlciBpbiB0aGUgZ2l2ZW4gaW50ZXJ2YWwuXHJcbiAgICAgKiBAcGFyYW0gZnJvbVxyXG4gICAgICogQHBhcmFtIHRvXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmFuZG9tSW50RnJvbUludGVydmFsKGZyb20sIHRvKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0byAtIGZyb20gKyAxKSArIGZyb20pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFV0aWw7IiwiaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xuaW1wb3J0IENyYXRlIGZyb20gJy4uL0Vudmlyb25tZW50T2JqZWN0cy9DcmF0ZS5qcyc7XG5pbXBvcnQgQnVzaCBmcm9tICcuLi9FbnZpcm9ubWVudE9iamVjdHMvQnVzaC5qcyc7XG5pbXBvcnQgUm9jayBmcm9tICcuLi9FbnZpcm9ubWVudE9iamVjdHMvUm9jay5qcyc7XG5cbmNsYXNzIEJ1bGxldHtcbiAgICBjb25zdHJ1Y3Rvcih2ZWxvY2l0eSwgZGFtYWdlLCB4LCB5LCBkZXN0WCwgZGVzdFkpIHtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5kZXN0WCA9IGRlc3RYO1xuICAgICAgICB0aGlzLmRlc3RZID0gZGVzdFk7XG4gICAgICAgIHRoaXMuY29vbGRvd24gPSAwO1xuICAgICAgICB0aGlzLmxpdmUgPSB0cnVlO1xuICAgICAgICBsZXQgZGlmZlggPSB0aGlzLmRlc3RYIC0gdGhpcy54O1xuICAgICAgICBsZXQgZGlmZlkgPSB0aGlzLmRlc3RZIC0gdGhpcy55O1xuICAgICAgICBsZXQgYmlnZ2VyID0gMVxuICAgICAgICBpZihNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpe1xuICAgICAgICAgICAgYmlnZ2VyID0gZGlmZlhcbiAgICAgICAgICAgIHRoaXMuY29lZmZYID0gZGlmZlggLyBNYXRoLmFicyhkaWZmWClcbiAgICAgICAgICAgIHRoaXMuY29lZmZZID0gZGlmZlkgLyBNYXRoLmFicyhkaWZmWClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGJpZ2dlciA9IGRpZmZZXG4gICAgICAgICAgICB0aGlzLmNvZWZmWSA9IGRpZmZZIC8gTWF0aC5hYnMoZGlmZlkpXG4gICAgICAgICAgICB0aGlzLmNvZWZmWCA9IGRpZmZYIC8gTWF0aC5hYnMoZGlmZlkpXG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9hZEltYWdlKHVybCkge1xuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xuICAgIH1cbiAgICAvL01vdmVzIHRoZSBidWxsZXQgZnJvbSBpdHMgc3RhcnRpbmcgcG9pbnQgKHdoaWNoIHdpbGwgYmUgdGhlIHBsYXllcidzIGxvY2F0aW9uKVxuICAgIC8vdG8gaXRzIGRlc3RpbmF0aW9uICh3aGljaCB3aWxsIGJlIHRoZSBjdXJzb3IgbG9jYXRpb24gd2hlbiB0aGUgYnVsbGV0IGlzIGNyZWF0ZWQpLlxuICAgIC8vRWFjaCB0aW1lIG1vdmUgaXMgY2FsbGVkIGl0IGlzIGNoZWNrZWQgaWYgdGhlIGJ1bGxldCBoaXRzIGFueXRoaW5nLCBpZiBpdCBkb2VzIHRoZVxuICAgIC8vaGl0U29lbXRoaW5nIG1ldGhvZCB3aWxsIGNhbGwgYSBkYW1hZ2UgZnVuY3Rpb24gYW5kIHRoZSBkYW1hZ2Ugd2lsbCBiZSBhcHBsaWVkLCBzb1xuICAgIC8vdGhpcyBmdW5jdGlvbiBzZXRzIHRoaXMubGl2ZSA9IGZhbHNlIG1lYW5pbmcgdGhlIGJ1bGxldCBpcyBubyBsb25nZXIgbGl2ZS5cbiAgICBtb3ZlKG1vZGlmaWVyLCBlbnZpcm9ubWVudE9iamVjdHMsIGVuZW1pZXMpe1xuICAgICAgICAvL2xldCBsZW5ndGggPSBNYXRoLnNxcnQoZGlmZlggKiBkaWZmWCArIGRpZmZZICogZGlmZlkpO1xuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcip0aGlzLmNvZWZmWDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXIqdGhpcy5jb2VmZlk7XG4gICAgICAgIGlmKHRoaXMuaGl0U29tZXRoaW5nKGVudmlyb25tZW50T2JqZWN0cywgZW5lbWllcykpIHtcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMueCA8IDAgfHwgdGhpcy54ID4gMTAwMDAgfHwgdGhpcy55IDwgMCB8fCB0aGlzLnkgPiA1NjI1KXtcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgLy9DaGVja3MgaWYgdGhlIGJ1bGxldCBoaXQgYW55IG9mIG91ciBvYmplY3RzIHRoYXQgY2FuIGJlIGhpdCwgaWYgc28gdGhhdCBvYmplY3QgbG9zZXMgSFBcbiAgICAvL2FuZCB0aGUgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHRvIGluZGljYXRlIHRoYXQgdGhlIG9iamVjdCB3YXMgaGl0LiBJZiBub3QsIGZhbHNlIGlzIHJldHVybmVkXG4gICAgLy9hbmQgbm90aGluZyBpcyBkb25lLlxuICAgIGRhbWFnZUVuZW15KGVuZW15T2JqZWN0KSB7XG4gICAgICAgIGVuZW15T2JqZWN0LmhlYWx0aCAtPSB0aGlzLmRhbWFnZTtcbiAgICB9XG4gICAgZGFtYWdlRW52aXJvbm1lbnQoZW52aXJvbm1lbnRPYmplY3Qpe1xuICAgICAgICBlbnZpcm9ubWVudE9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XG4gICAgfVxuICAgIGhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIGVuZW1pZXMpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbnZpcm9ubWVudE9iamVjdHNbaV0pICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VFbnZpcm9ubWVudChlbnZpcm9ubWVudE9iamVjdHNbaV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbmVtaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIGVuZW1pZXNbaV0pKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZUVuZW15KGVuZW1pZXNbaV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1bGxldDsiLCJpbXBvcnQgQnVsbGV0IGZyb20gJy4vQnVsbGV0LmpzJztcclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xyXG5cclxuY2xhc3MgQnVsbGV0OW1tIGV4dGVuZHMgQnVsbGV0IHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGRlc3RYLCBkZXN0WSkge1xyXG4gICAgICAgIHN1cGVyKDEwMDAsIDEwLCB4LCB5LCBkZXN0WCwgZGVzdFkpO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL2J1bGxldDMucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ5bW07IiwiaW1wb3J0IFJvY2sgZnJvbSBcIi4uL0Vudmlyb25tZW50T2JqZWN0cy9Sb2NrXCI7XHJcbmltcG9ydCBCdXNoIGZyb20gXCIuLi9FbnZpcm9ubWVudE9iamVjdHMvQnVzaFwiO1xyXG5pbXBvcnQgQ3JhdGUgZnJvbSBcIi4uL0Vudmlyb25tZW50T2JqZWN0cy9DcmF0ZVwiO1xyXG5pbXBvcnQgVGFua0VuZW15IGZyb20gXCIuLi9FbmVtaWVzL1RhbmtFbmVteVwiO1xyXG5pbXBvcnQgUmVndWxhckVuZW15IGZyb20gXCIuLi9FbmVtaWVzL1JlZ3VsYXJFbmVteVwiO1xyXG5pbXBvcnQgTGlnaHRFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9MaWdodEVuZW15XCI7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL1BsYXllcnMvUGxheWVyXCI7XHJcbmltcG9ydCBDYW1lcmEgZnJvbSBcIi4uL1BsYXllcnMvQ2FtZXJhXCI7XHJcbmltcG9ydCBVdGlsIGZyb20gXCIuLi9VdGlsaXRpZXMvVXRpbFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBXb3JsZCBjbGFzcyBob2xkcyB0aGUgaW5mb3JtYXRpb24gcmVsYXRlZCB0byB0aGUgd29ybGQuXHJcbiAqL1xyXG5jbGFzcyBXb3JsZCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkIG9mIHRoZSB3b3JsZCBhbmQgbG9hZHMgdGhlIGJhY2tncm91bmQuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzIFRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhcykge1xyXG4gICAgICAgIHRoaXMuc3RhcnQoY2FudmFzKTtcclxuICAgICAgICB0aGlzLmxvYWRCYWNrZ3JvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc3RhcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgV29ybGQuIFRoZSBwbGF5ZXIgaXMgbWFkZSBhbmQgdGhlIGNhbWVyYSBpcyBhdHRhY2hlZCB0byB0aGUgcGxheWVyLlxyXG4gICAgICogQSBjYWxsIGlzIHRvIGluaXRpYWxpemUgdGhlIGVudmlyb25tZW50IGFuZCBzdGFydCB0aGUgd2F2ZS5cclxuICAgICAqIEBwYXJhbSBjYW52YXMgVGhlIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgc3RhcnQoY2FudmFzKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKGNhbnZhcy53aWR0aC8yLCBjYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhID0gbmV3IENhbWVyYSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQsIDEwMDAwLCA1NjI1KTtcclxuICAgICAgICB0aGlzLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIsIGNhbnZhcy53aWR0aC8yLCBjYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuZW5lbWllcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5idWxsZXRzID0gW107XHJcbiAgICAgICAgdGhpcy53YXZlID0gMTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVFbnZpcm9ubWVudCgpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRXYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGluaXRpYWxpemVzIHRoZSBlbnZpcm9ubWVudCBieSBwdXNoaW5nIGVudmlyb25tZW50IG9iamVjdHMgb250byB0aGUgZW52aXJvbm1lbnRPYmplY3RzIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplRW52aXJvbm1lbnQoKSB7XHJcbiAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMucHVzaChuZXcgQ3JhdGUoMjAwLCA0MDApKTtcclxuICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cy5wdXNoKG5ldyBCdXNoKDIwLCAxMDApKTtcclxuICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cy5wdXNoKG5ldyBSb2NrKDkwMCwgMjApKTtcclxuICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cy5wdXNoKG5ldyBSb2NrKDk1MDAsIDIwKSk7XHJcbiAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMucHVzaChuZXcgUm9jaygyMCwgNTI1MCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzdGFydHMgdGhlIHdhdmUgYnkgcHVzaGluZyBlbmVtaWVzIG9udG8gdGhlIGVuZW1pZXMgYXJyYXkuXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0V2F2ZSgpIHtcclxuICAgICAgICBsZXQgbGlnaHRFbmVteUNhcCA9IHRoaXMud2F2ZSAqIDU7XHJcbiAgICAgICAgbGV0IHJlZ3VsYXJFbmVteUNhcCA9IE1hdGguZmxvb3IodGhpcy53YXZlLzIgKiA1KTtcclxuICAgICAgICBsZXQgdGFua0VuZW15Q2FwID0gTWF0aC5mbG9vcih0aGlzLndhdmUgKiAxLjUpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGlnaHRFbmVteUNhcDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgTGlnaHRFbmVteShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHJlZ3VsYXJFbmVteUNhcDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgUmVndWxhckVuZW15KFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGFua0VuZW15Q2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBUYW5rRW5lbXkoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIC8vIGluY2x1ZGUgdGhlIG90aGVyIHR5cGVzIGFzIHdlbGwsIG1heWJlIGlmIHdhdmUgPT0gc29tZXRoaW5nIG9yID4gc29tZXRoaW5nXHJcblxyXG4gICAgICAgIGxldCBjb2xsaXNpb25GbGFnID0gdHJ1ZTtcclxuICAgICAgICB3aGlsZShjb2xsaXNpb25GbGFnID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCBpID0gVXRpbC5hcmVBbnlDb2xsaXNpb25zKHRoaXMuZW5lbWllcywgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMpO1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gLTEpXHJcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25GbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5lbWllc1tpXS5zZXRQb3NpdGlvbihVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbG9hZEJhY2tncm91bmQgZnVuY3Rpb24gbG9hZHMgdGhlIGJhY2tncm91bmQgaW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0JhY2tncm91bmRMb2FkZWQgaXNcclxuICAgICAqIHNldCB0byB0cnVlLlxyXG4gICAgICovXHJcbiAgICBsb2FkQmFja2dyb3VuZCgpIHtcclxuICAgICAgICB0aGlzLmlzQmFja2dyb3VuZExvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZC5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNCYWNrZ3JvdW5kTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZC5zcmMgPSBcIkdyYXBoaWNzL0JhY2tncm91bmQucG5nXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZHJhd0JhY2tncm91bmQgZnVuY3Rpb24gZHJhd3MgdGhlIGJhY2tncm91bmQgb2YgdGhlIHdvcmxkLlxyXG4gICAgICogQHBhcmFtIGN0eCBUaGUgY29udGV4dCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIGNhbnZhcyBUaGUgY2FudmFzLlxyXG4gICAgICovXHJcbiAgICBkcmF3QmFja2dyb3VuZChjdHgsIGNhbnZhcykge1xyXG4gICAgICAgIGxldCBzV2lkdGgsIHNIZWlnaHQ7XHJcbiAgICAgICAgc1dpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgICAgIHNIZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG5cclxuICAgICAgICBpZih0aGlzLmJhY2tncm91bmQud2lkdGggLSB0aGlzLmNhbWVyYS54IDwgY2FudmFzLndpZHRoKVxyXG4gICAgICAgICAgICBzV2lkdGggPSB0aGlzLmJhY2tncm91bmQud2lkdGggLSB0aGlzLmNhbWVyYS54O1xyXG4gICAgICAgIGlmKHRoaXMuYmFja2dyb3VuZC5oZWlnaHQgLSB0aGlzLmNhbWVyYS55IDwgY2FudmFzLmhlaWdodClcclxuICAgICAgICAgICAgc0hlaWdodCA9IHRoaXMuYmFja2dyb3VuZC5oZWlnaHQgLSB0aGlzLmNhbWVyYS55O1xyXG5cclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuYmFja2dyb3VuZCwgdGhpcy5jYW1lcmEueCwgdGhpcy5jYW1lcmEueSwgc1dpZHRoLCBzSGVpZ2h0LCAwLCAwLCBzV2lkdGgsIHNIZWlnaHQpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgV29ybGQ7Il19
