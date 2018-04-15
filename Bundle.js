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
                this.x += this.velocity * modifier;
                if (this.isCollisionWithEnvironmentObject(environmentObjects)) {
                    this.x -= this.velocity * modifier;
                }
            } else if (diffX < 0) {
                this.x -= this.velocity * modifier;
                if (this.isCollisionWithEnvironmentObject(environmentObjects)) {
                    this.x += this.velocity * modifier;
                }
            }
            if (diffY > 0) {
                this.y += this.velocity * modifier;
                if (this.isCollisionWithEnvironmentObject(environmentObjects)) {
                    this.y -= this.velocity * modifier;
                }
            } else if (diffY < 0) {
                this.y -= this.velocity * modifier;
                if (this.isCollisionWithEnvironmentObject(environmentObjects)) {
                    this.y += this.velocity * modifier;
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
    world.bullets.push(new _Bullet9mm2.default(world.player.x + world.player.width / 2, world.player.y, e.clientX, e.clientY));
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
            world.player.y -= world.player.speed * modifier;
            if (isCollisionWithEnvironmentObject()) {
                world.player.y += world.player.speed * modifier;
            }
        }
        if (83 in keysPressed) {
            // Player holding down
            world.player.y += world.player.speed * modifier;
            if (isCollisionWithEnvironmentObject()) {
                world.player.y -= world.player.speed * modifier;
            }
        }
        if (65 in keysPressed) {
            // Player holding left
            world.player.x -= world.player.speed * modifier;
            if (isCollisionWithEnvironmentObject()) {
                world.player.x += world.player.speed * modifier;
            }
        }
        if (68 in keysPressed) {
            // Player holding right
            world.player.x += world.player.speed * modifier;
            if (isCollisionWithEnvironmentObject()) {
                world.player.x -= world.player.speed * modifier;
            }
        }
    }

    for (var i = world.enemies.length - 1; i >= 0; i--) {
        world.enemies[i].move(world.player, modifier, world.environmentObjects);
        if (world.enemies[i].attackCooldown > 0) {
            world.enemies[i].attackCooldown -= 5;
        }
        if (world.enemies[i].health <= 0) {
            world.enemies.splice(i, 1);
        }
    }
    for (var _i = world.bullets.length - 1; _i >= 0; _i--) {
        world.bullets[_i].move(modifier, world.environmentObjects, world.enemies);
        if (world.bullets[_i].live == false) {
            world.bullets.splice(_i, 1);
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
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    } else {
        if (world.isBackgroundLoaded) {
            world.drawBackground(ctx, canvas);
        }

        if (world.player.isImageLoaded) {
            world.player.draw(ctx, world.camera);
            ctx.font = "48px sans-serif";
            ctx.fillText(world.player.health + " HP", 10, 50);
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
    }

    //Render all the world.bullets at their locations and remove world.bullets that aren't live
    for (var _i4 = 0; _i4 < world.bullets.length; _i4++) {
        if (world.bullets[_i4].isImageLoaded && world.bullets[_i4].live) {
            world.bullets[_i4].draw(ctx, world.camera);
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
    // breaks when character/world.camera moves too far down or to the right
    // bullet ultra messed up
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

// Let's play this game!
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
            if (this.x > this.worldWidth) this.x = this.worldWidth - this.width;
            if (this.y > this.worldHeight) this.y = this.worldHeight - this.height;
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
    function Player() {
        _classCallCheck(this, Player);

        this.health = 100;
        this.speed = 256;
        this.x = 250;
        this.y = 250;
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
    }, {
        key: "isWithin",
        value: function isWithin(x1, y1, width1, height1, x2, y2, width2, height2) {}
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
        //this.angle = Math.PI/2;
        this.live = true;
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
            var diffX = this.destX - this.x;
            var diffY = this.destY - this.y;
            var length = Math.sqrt(diffX * diffX + diffY * diffY);
            /*if(length !== 0){
              diffX /= length;
              diffY /= length;
            }*/

            //this.angle = Math.atan2(diffY, diffX);

            if (diffX > 0) {
                this.x += this.velocity * modifier;
                if (this.hitSomething(environmentObjects, enemies)) {
                    this.live = false;
                }
            } else if (diffX < 0) {
                this.x -= this.velocity * modifier;
                if (this.hitSomething(environmentObjects, enemies)) {
                    this.live = false;
                }
            } else {
                this.live = false;
            }
            if (diffY > 0) {
                this.y += this.velocity * modifier;
                if (this.hitSomething(environmentObjects, enemies)) {
                    this.live = false;
                }
            } else if (diffY < 0) {
                this.y -= this.velocity * modifier;
                if (this.hitSomething(environmentObjects, enemies)) {
                    this.live = false;
                }
            } else {
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

    var _this = _possibleConstructorReturn(this, (Bullet9mm.__proto__ || Object.getPrototypeOf(Bullet9mm)).call(this, 400, 10, x, y, destX, destY));

    _get(Bullet9mm.prototype.__proto__ || Object.getPrototypeOf(Bullet9mm.prototype), 'loadImage', _this).call(_this, "Graphics/Bullet.png");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJFbmVtaWVzL0VuZW15LmpzIiwiRW5lbWllcy9MaWdodEVuZW15LmpzIiwiRW5lbWllcy9SZWd1bGFyRW5lbXkuanMiLCJFbmVtaWVzL1RhbmtFbmVteS5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9CdXNoLmpzIiwiRW52aXJvbm1lbnRPYmplY3RzL0NyYXRlLmpzIiwiRW52aXJvbm1lbnRPYmplY3RzL0Vudmlyb25tZW50T2JqZWN0LmpzIiwiRW52aXJvbm1lbnRPYmplY3RzL1JvY2suanMiLCJNYWluLmpzIiwiUGxheWVycy9DYW1lcmEuanMiLCJQbGF5ZXJzL1BsYXllci5qcyIsIlV0aWxpdGllcy9VdGlsLmpzIiwiV2VhcG9ucy9CdWxsZXQuanMiLCJXZWFwb25zL0J1bGxldDltbS5qcyIsIldvcmxkL1dvcmxkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O3FqQkNBQTs7Ozs7O0FBTUE7Ozs7Ozs7O0FBRUE7OztJQUdNLEs7O0FBRUY7Ozs7Ozs7OztBQVNBLG1CQUFZLENBQVosRUFBZSxDQUFmLEVBQWtCLFFBQWxCLEVBQTRCLE1BQTVCLEVBQW9DLE1BQXBDLEVBQTRDLFlBQTVDLEVBQTBEO0FBQUE7O0FBQ3RELGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxhQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsYUFBSyxLQUFMLEdBQWEsS0FBSyxFQUFMLEdBQVEsQ0FBckI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGFBQUssWUFBTCxHQUFvQixZQUFwQjtBQUNBLGFBQUssY0FBTCxHQUFzQixDQUF0QjtBQUNIOztBQUVEOzs7Ozs7Ozs7a0NBS1UsRyxFQUFLO0FBQUE7O0FBQ1gsaUJBQUssYUFBTCxHQUFxQixLQUFyQjtBQUNBLGlCQUFLLEtBQUwsR0FBYSxJ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QkFBSyxVQUFMLENBQWdCLEdBQWhCLEdBQXNCLHlCQUF0QjtBQUNIOztBQUVEOzs7Ozs7Ozt1Q0FLZSxHLEVBQUssTSxFQUFRO0FBQ3hCLGdCQUFJLGVBQUo7QUFBQSxnQkFBWSxnQkFBWjtBQUNBLHFCQUFTLE9BQU8sS0FBaEI7QUFDQSxzQkFBVSxPQUFPLE1BQWpCOztBQUVBLGdCQUFHLEtBQUssVUFBTCxDQUFnQixLQUFoQixHQUF3QixLQUFLLE1BQUwsQ0FBWSxDQUFwQyxHQUF3QyxPQUFPLEtBQWxELEVBQ0ksU0FBUyxLQUFLLFVBQUwsQ0FBZ0IsS0FBaEIsR0FBd0IsS0FBSyxNQUFMLENBQVksQ0FBN0M7QUFDSixnQkFBRyxLQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsR0FBeUIsS0FBSyxNQUFMLENBQVksQ0FBckMsR0FBeUMsT0FBTyxNQUFuRCxFQUNJLFVBQVUsS0FBSyxVQUFMLENBQWdCLE1BQWhCLEdBQXlCLEtBQUssTUFBTCxDQUFZLENBQS9DOztBQUVKLGdCQUFJLFNBQUosQ0FBYyxLQUFLLFVBQW5CLEVBQStCLEtBQUssTUFBTCxDQUFZLENBQTNDLEVBQThDLEtBQUssTUFBTCxDQUFZLENBQTFELEVBQTZELE1BQTdELEVBQXFFLE9BQXJFLEVBQThFLENBQTlFLEVBQWlGLENBQWpGLEVBQW9GLE1BQXBGLEVBQTRGLE9BQTVGO0FBQ0g7Ozs7OztrQkFHVSxLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXHJcbiAqIFNvdXJjZXM6XHJcbiAqIGh0dHBzOi8vbWVkaXVtLmNvbS9AeXVyaWJldHQvamF2YXNjcmlwdC1hYnN0cmFjdC1tZXRob2Qtd2l0aC1lczYtNWRiZWE0YjAwMDI3XHJcbiAqIGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9STVkQVJwQVBsTmtcclxuICovXHJcblxyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIEVuZW15IGNsYXNzIGlzIHRoZSBwYXJlbnQgY2xhc3MgZm9yIGFsbCBvZiB0aGUgZW5lbWllcy5cclxuICovXHJcbmNsYXNzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSB2ZWxvY2l0eSBUaGUgdmVsb2NpdHkgb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIGhlYWx0aCBUaGUgaGVhbHRoIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSBkYW1hZ2UgVGhlIGRhbWFnZSBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gcG9pbnRzT25LaWxsIFRoZSBwb2ludHMgcmV3YXJkZWQgZm9yIGtpbGxpbmcgdGhlIEVuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB2ZWxvY2l0eSwgaGVhbHRoLCBkYW1hZ2UsIHBvaW50c09uS2lsbCkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLmFuZ2xlID0gTWF0aC5QSS8yO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2ZWxvY2l0eTtcclxuICAgICAgICB0aGlzLmhlYWx0aCA9IGhlYWx0aDtcclxuICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgICB0aGlzLnBvaW50c09uS2lsbCA9IHBvaW50c09uS2lsbDtcclxuICAgICAgICB0aGlzLmF0dGFja0Nvb2xkb3duID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsb2FkSW1hZ2UgZnVuY3Rpb24gdGFrZXMgaW4gYSB1cmwgYW5kIGxvYWRzIGl0IGFzIGFuIEltYWdlLiBPbmNlIHRoZSBpbWFnZSBpcyBsb2FkZWQsIHRoaXMuaXNJbWFnZUxvYWRlZCBpc1xyXG4gICAgICogc2V0IHRvIHRydWUuIFRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBFbmVteSBhcmUgc2V0IHRvIHRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBpbWFnZS5cclxuICAgICAqIEBwYXJhbSB1cmwgVGhlIHVybCB0aGF0IHNob3VsZCBiZSBsb2FkZWQuXHJcbiAgICAgKi9cclxuICAgIGxvYWRJbWFnZSh1cmwpIHtcclxuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgYXR0YWNrIGZ1bmN0aW9uIHRha2VzIGluIGFuIG9iamVjdCBhbmQgcmVtb3ZlcyB0aGUgYW1vdW50IG9mIGRhbWFnZSB0aGUgRW5lbXkgZGVhbHMgZnJvbSB0aGVpciBoZWFsdGguXHJcbiAgICAgKiA1MDAgaXMgYWRkZWQgdG8gdGhlIGF0dGFjayBjb29sZG93biBvZiB0aGUgZW5lbXkgYWZ0ZXIgYW4gYXR0YWNrLlxyXG4gICAgICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0IHRoYXQgaXMgYmVpbmcgYXR0YWNrZWQuXHJcbiAgICAgKi9cclxuICAgIGF0dGFjayhvYmplY3QpIHtcclxuICAgICAgICBvYmplY3QuaGVhbHRoIC09IHRoaXMuZGFtYWdlO1xyXG4gICAgICAgIHRoaXMuYXR0YWNrQ29vbGRvd24gKz0gNTAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTW92ZXMgdGhlIGVuZW15IHRvd2FyZHMgdGhlIHBsYXllci5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciBvYmplY3QgdG8gbW92ZSB0b3dhcmRzLlxyXG4gICAgICogQHBhcmFtIG1vZGlmaWVyIFRoZSBtb2RpZmllciB0byBiZSBtdWx0aXBsaWVkIGJ5IHRoZSB2ZWxvY2l0eS5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdHMgQW4gYXJyYXkgb2YgZW52aXJvbm1lbnQgb2JqZWN0cy5cclxuICAgICAqL1xyXG4gICAgbW92ZShwbGF5ZXIsIG1vZGlmaWVyLCBlbnZpcm9ubWVudE9iamVjdHMpIHtcclxuICAgICAgICBsZXQgZGlmZlggPSBwbGF5ZXIueCAtIHRoaXMueDtcclxuICAgICAgICBsZXQgZGlmZlkgPSBwbGF5ZXIueSAtIHRoaXMueTtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gTWF0aC5zcXJ0KGRpZmZYICogZGlmZlggKyBkaWZmWSAqIGRpZmZZKTtcclxuICAgICAgICBpZihsZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgZGlmZlggLz0gbGVuZ3RoO1xyXG4gICAgICAgICAgICBkaWZmWSAvPSBsZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFuZ2xlID0gTWF0aC5hdGFuMihkaWZmWSwgZGlmZlgpO1xyXG5cclxuICAgICAgICBpZihkaWZmWCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54IC09IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihkaWZmWCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy54IC09IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGlmZlkgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KGVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueSAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZGlmZlkgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMueSAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KGVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIHBsYXllcikgJiYgdGhpcy5hdHRhY2tDb29sZG93biA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlYWx0aCBiZWZvcmUgYXR0YWNrXCIgKyBwbGF5ZXIuaGVhbHRoKTtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2socGxheWVyKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWFsdGggYWZ0ZXIgYXR0YWNrXCIgKyBwbGF5ZXIuaGVhbHRoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBlbmVteSBnaXZlbiB4IGFuZCB5LlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gdG8gYmUgc2V0LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gdG8gYmUgc2V0LlxyXG4gICAgICovXHJcbiAgICBzZXRQb3NpdGlvbih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyBhIGhlbHBlciBmdW5jdGlvbiB1c2VkIGJ5IHRoZSBtb3ZlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBpZiB0aGVyZSBpcyBhIGNvbGxpc2lvbiBiZXR3ZWVuIGFuXHJcbiAgICAgKiBlbnZpcm9ubWVudCBvYmplY3QgYW5kIHRoZSBlbmVteS4gSWYgdGhlcmUgaXMgYSBjb2xsaXNpb24sIHRoZSBvYmplY3QgaXMgYXR0YWNrZWQuXHJcbiAgICAgKiBAcGFyYW0gZW52aXJvbm1lbnRPYmplY3RzIEFuIGFycmF5IG9mIGVudmlyb25tZW50IG9iamVjdHMuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciBhIGNvbGxpc2lvbiBleGlzdHMuXHJcbiAgICAgKi9cclxuICAgIGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KGVudmlyb25tZW50T2JqZWN0cykge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbnZpcm9ubWVudE9iamVjdHNbaV0pICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmF0dGFja0Nvb2xkb3duID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRhY2soZW52aXJvbm1lbnRPYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkcmF3IGZ1bmN0aW9uIGRyYXdzIHRoZSBpbWFnZSBvbiB0aGUgY2FudmFzIGF0IHRoZSB4IGFuZCB5IHBvc2l0aW9uIG9mIHRoZSBMaWdodEVuZW15LlxyXG4gICAgICogQHBhcmFtIGN0eCBUaGUgY29udGV4dCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICovXHJcbiAgICBkcmF3KGN0eCwgY2FtZXJhKSB7XHJcbiAgICAgICAgLy9jdHguc2F2ZSgpO1xyXG4gICAgICAgIC8vY3R4LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgLy9jdHgucm90YXRlKHRoaXMuYW5nbGUgKyBNYXRoLlBJLzIuMCk7XHJcbiAgICAgICAgLy9jdHgudHJhbnNsYXRlKC10aGlzLngsIC10aGlzLnkpO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54IC0gY2FtZXJhLngsIHRoaXMueSAtIGNhbWVyYS55KTtcclxuICAgICAgICAvL2N0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVuZW15OyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgTGlnaHRFbmVteSBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaXMgYSBmYXN0IGVuZW15IHdpdGggbG93IGhlYWx0aC5cclxuICovXHJcbmNsYXNzIExpZ2h0RW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgTGlnaHRFbmVteS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVuZW15IGNsYXNzZXMgY29uc3RydWN0b3Igd2l0aFxyXG4gICAgICogdGhlIGlucHV0dGVkIHggYW5kIHksIHRoZSB2ZWxvY2l0eSBzZXQgdG8gMTI4LCB0aGUgaGVhbHRoIHNldCB0byAxMCwgdGhlIGRhbWFnZSBzZXQgdG8gMTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gNTAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgTGlnaHRFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBMaWdodEVuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMTI4LCAxMCwgMTAsIDUwKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9MaWdodEVuZW15LnBuZ1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlnaHRFbmVteTsiLCJpbXBvcnQgRW5lbXkgZnJvbSAnLi9FbmVteS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIFJlZ3VsYXJFbmVteSBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaGFzIGJhbGFuY2VkIHN0YXRzIGFjcm9zcyB0aGUgYm9hcmQuXHJcbiAqL1xyXG5jbGFzcyBSZWd1bGFyRW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgUmVndWxhckVuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byA2NCwgdGhlIGhlYWx0aCBzZXQgdG8gMjUsIHRoZSBkYW1hZ2Ugc2V0IHRvIDEwLCBhbmQgdGhlIHBvaW50c09uS2lsbFxyXG4gICAgICogc2V0IHRvIDEwMC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBSZWd1bGFyRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgUmVndWxhckVuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgNjQsIDI1LCAxMCwgMTAwKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9SZWd1bGFyRW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWd1bGFyRW5lbXk7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBUYW5rRW5lbXkgY2xhc3MgZXh0ZW5kcyB0aGUgRW5lbXkgY2xhc3MuIEl0IGlzIGEgc2xvdyBlbmVteSB3aXRoIGhpZ2ggaGVhbHRoIGFuZCBkYW1hZ2UuXHJcbiAqL1xyXG5jbGFzcyBUYW5rRW5lbXkgZXh0ZW5kcyBFbmVteSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgVGFua0VuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byAzMiwgdGhlIGhlYWx0aCBzZXQgdG8gMTAwLCB0aGUgZGFtYWdlIHNldCB0byAyNSwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byA1MDAuXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgVGFua0VuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIFRhbmtFbmVteS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDMyLCAxMDAsICAyNSwgNTAwKTtcclxuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9UYW5rRW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYW5rRW5lbXk7IiwiaW1wb3J0IEVudmlyb25tZW50T2JqZWN0IGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3QuanMnO1xuXG4vKipcbiAqIFRoZSBCdXNoIGNsYXNzIGV4dGVuZHMgdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzLiBJdCBpcyBhIG5vbi1ibG9ja2luZyBvYmplY3QuXG4gKi9cbmNsYXNzIEJ1c2ggZXh0ZW5kcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgQnVzaC4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzZXMgY29uc3RydWN0b3JcbiAgICAgKiB3aXRoIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgaGVhbHRoIHNldCB0byAxMDAwMDAsIGFuZCBpc0Jsb2NraW5nIHNldCB0byBmYWxzZS5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgQnVzaC5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgQnVzaC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHN1cGVyKHgsIHksIDEwMDAwMCwgZmFsc2UpO1xuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9CdXNoLnBuZ1wiKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1c2g7IiwiaW1wb3J0IEVudmlyb25tZW50T2JqZWN0IGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3QuanMnO1xuXG4vKipcbiAqIFRoZSBDcmF0ZSBjbGFzcyBleHRlbmRzIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzcy4gSXQgaXMgYSBibG9ja2luZyBvYmplY3Qgd2l0aCBsb3cgaGVhbHRoLlxuICovXG5jbGFzcyBDcmF0ZSBleHRlbmRzIEVudmlyb25tZW50T2JqZWN0IHtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBDcmF0ZS4gQSBjYWxsIGlzIG1hZGUgdG8gdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzZXMgY29uc3RydWN0b3JcbiAgICAgKiB3aXRoIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgaGVhbHRoIHNldCB0byAxMDAsIGFuZCBpc0Jsb2NraW5nIHNldCB0byB0cnVlLlxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBDcmF0ZS5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgQ3JhdGUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICBzdXBlcih4LCB5LCAxMDAsIHRydWUpO1xuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9DcmF0ZS5wbmdcIik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDcmF0ZTtcbiIsIi8qKlxuICogVGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzIGlzIHRoZSBwYXJlbnQgZm9yIGFsbCBlbnZpcm9ubWVudCBvYmplY3RzLlxuICovXG5jbGFzcyBFbnZpcm9ubWVudE9iamVjdCB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdC5cbiAgICAgKiBAcGFyYW0gaGVhbHRoIFRoZSBoZWFsdGggb2YgdGhlIEVudmlyb25tZW50T2JqZWN0LlxuICAgICAqIEBwYXJhbSBpc0Jsb2NraW5nIFdoZXRoZXIgdGhlIEVudmlyb25tZW50T2JqZWN0IGNhbiBiZSB3YWxrZWQgdGhyb3VnaC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBoZWFsdGgsIGlzQmxvY2tpbmcpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5oZWFsdGggPSBoZWFsdGg7XG4gICAgICAgIHRoaXMuaXNCbG9ja2luZyA9IGlzQmxvY2tpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGxvYWRJbWFnZSBmdW5jdGlvbiB0YWtlcyBpbiBhIHVybCBhbmQgbG9hZHMgaXQgYXMgYW4gSW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0ltYWdlTG9hZGVkIGlzXG4gICAgICogc2V0IHRvIHRydWUuIFRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBFbnZpcm9ubWVudE9iamVjdCBhcmUgc2V0IHRvIHRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBpbWFnZS5cbiAgICAgKiBAcGFyYW0gdXJsIFRoZSB1cmwgdGhhdCBzaG91bGQgYmUgbG9hZGVkLlxuICAgICAqL1xuICAgIGxvYWRJbWFnZSh1cmwpIHtcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZHJhdyBmdW5jdGlvbiBkcmF3cyB0aGUgaW1hZ2Ugb24gdGhlIGNhbnZhcyBhdCB0aGUgeCBhbmQgeSBwb3NpdGlvbiBvZiB0aGUgRW52aXJvbm1lbnRPYmplY3QuXG4gICAgICogQHBhcmFtIGN0eCBUaGUgY29udGV4dCBvZiB0aGUgY2FudmFzLlxuICAgICAqL1xuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW52aXJvbm1lbnRPYmplY3Q7IiwiaW1wb3J0IEVudmlyb25tZW50T2JqZWN0IGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3QuanMnO1xuXG4vKipcbiAqIFRoZSBSb2NrIGNsYXNzIGV4dGVuZHMgdGhlIEVudmlyb25tZW50T2JqZWN0IGNsYXNzLiBJdCBpcyBhIGJsb2NraW5nIG9iamVjdCB3aXRoIGhpZ2ggaGVhbHRoLlxuICovXG5jbGFzcyBSb2NrIGV4dGVuZHMgRW52aXJvbm1lbnRPYmplY3Qge1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIFJvY2suIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbnZpcm9ubWVudE9iamVjdCBjbGFzc2VzIGNvbnN0cnVjdG9yXG4gICAgICogd2l0aCB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIGhlYWx0aCBzZXQgdG8gMzAwLCBhbmQgaXNCbG9ja2luZyBzZXQgdG8gdHJ1ZS5cbiAgICAgKiBAcGFyYW0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgUm9jay5cbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgUm9jay5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHN1cGVyKHgsIHksIDMwMCwgdHJ1ZSk7XG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1JvY2sucG5nXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUm9jaztcbiIsIi8qXG4gIFNvdXJjZXM6XG4gIGh0dHA6Ly93d3cubG9zdGRlY2FkZWdhbWVzLmNvbS9ob3ctdG8tbWFrZS1hLXNpbXBsZS1odG1sNS1jYW52YXMtZ2FtZS9cbiAgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDAzNzIxMi9odG1sLWNhbnZhcy1mdWxsLXNjcmVlbj91dG1fbWVkaXVtPW9yZ2FuaWMmdXRtX3NvdXJjZT1nb29nbGVfcmljaF9xYSZ1dG1fY2FtcGFpZ249Z29vZ2xlX3JpY2hfcWFcbiAgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTY5MTk2MDEvaHRtbDUtY2FudmFzLXdvcmxkLmNhbWVyYS12aWV3cG9ydC1ob3ctdG8tYWN0YWxseS1kby1pdD91dG1fbWVkaXVtPW9yZ2FuaWMmdXRtX3NvdXJjZT1nb29nbGVfcmljaF9xYSZ1dG1fY2FtcGFpZ249Z29vZ2xlX3JpY2hfcWFcbiAgaHR0cDovL2pzZmlkZGxlLm5ldC9nZmNhcnYvUUtnSHMvXG4gKi9cblxuaW1wb3J0IEJ1bGxldDltbSBmcm9tICcuL1dlYXBvbnMvQnVsbGV0OW1tLmpzJ1xuaW1wb3J0IFV0aWwgZnJvbSAnLi9VdGlsaXRpZXMvVXRpbC5qcyc7XG5pbXBvcnQgV29ybGQgZnJvbSAnLi9Xb3JsZC9Xb3JsZC5qcyc7XG5cbi8vIENyZWF0ZSB0aGUgY2FudmFzXG5sZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbmxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG5sZXQgd29ybGQgPSBuZXcgV29ybGQoY2FudmFzKTtcblxuLy8gSGFuZGxlIGNvbnRyb2xzXG5sZXQga2V5c1ByZXNzZWQgPSB7fTtcbmxldCBtb3VzZSA9IFswLDBdO1xubGV0IGNsaWNraW5nID0gZmFsc2U7XG5cbmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG5cdGtleXNQcmVzc2VkW2Uua2V5Q29kZV0gPSB0cnVlO1xufSwgZmFsc2UpO1xuXG5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcblx0ZGVsZXRlIGtleXNQcmVzc2VkW2Uua2V5Q29kZV07XG59LCBmYWxzZSk7XG5cbmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XG5cdG1vdXNlWzBdID0gZS5jbGllbnRYO1xuXHRtb3VzZVsxXSA9IGUuY2xpZW50WTtcbn0sIGZhbHNlKTtcblxuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcblx0Y2xpY2tpbmcgPSB0cnVlO1xuXHR3b3JsZC5idWxsZXRzLnB1c2gobmV3IEJ1bGxldDltbSh3b3JsZC5wbGF5ZXIueCArIHdvcmxkLnBsYXllci53aWR0aC8yLCB3b3JsZC5wbGF5ZXIueSwgZS5jbGllbnRYLCBlLmNsaWVudFkpKTtcbn0pO1xuXG5sZXQgaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3JsZC5lbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKFV0aWwuaXNDb2xsaXNpb24od29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLCB3b3JsZC5wbGF5ZXIpICYmIHdvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG4vLyBVcGRhdGUgZ2FtZSBvYmplY3RzXG5sZXQgdXBkYXRlID0gKG1vZGlmaWVyKSA9PiB7XG5cdGlmKHdvcmxkLnBsYXllci5oZWFsdGggPiAwKSB7XG4gICAgICAgIGlmICg4NyBpbiBrZXlzUHJlc3NlZCkgeyAvLyBQbGF5ZXIgaG9sZGluZyB1cFxuICAgICAgICAgICAgd29ybGQucGxheWVyLnkgLT0gd29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XG4gICAgICAgICAgICBpZihpc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdCgpKSB7XG4gICAgICAgICAgICAgICAgd29ybGQucGxheWVyLnkgKz0gd29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKDgzIGluIGtleXNQcmVzc2VkKSB7IC8vIFBsYXllciBob2xkaW5nIGRvd25cbiAgICAgICAgICAgIHdvcmxkLnBsYXllci55ICs9IHdvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xuICAgICAgICAgICAgaWYoaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoKSkge1xuICAgICAgICAgICAgICAgIHdvcmxkLnBsYXllci55IC09IHdvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICg2NSBpbiBrZXlzUHJlc3NlZCkgeyAvLyBQbGF5ZXIgaG9sZGluZyBsZWZ0XG4gICAgICAgICAgICB3b3JsZC5wbGF5ZXIueCAtPSB3b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcbiAgICAgICAgICAgIGlmKGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KCkpIHtcbiAgICAgICAgICAgICAgICB3b3JsZC5wbGF5ZXIueCArPSB3b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoNjggaW4ga2V5c1ByZXNzZWQpIHsgLy8gUGxheWVyIGhvbGRpbmcgcmlnaHRcbiAgICAgICAgICAgIHdvcmxkLnBsYXllci54ICs9IHdvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xuICAgICAgICAgICAgaWYoaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoKSkge1xuICAgICAgICAgICAgICAgIHdvcmxkLnBsYXllci54IC09IHdvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdH1cblxuXHRmb3IobGV0IGkgPSB3b3JsZC5lbmVtaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0d29ybGQuZW5lbWllc1tpXS5tb3ZlKHdvcmxkLnBsYXllciwgbW9kaWZpZXIsIHdvcmxkLmVudmlyb25tZW50T2JqZWN0cyk7XG4gICAgICAgIGlmKHdvcmxkLmVuZW1pZXNbaV0uYXR0YWNrQ29vbGRvd24gPiAwKSB7XG4gICAgICAgICAgICB3b3JsZC5lbmVtaWVzW2ldLmF0dGFja0Nvb2xkb3duIC09IDU7XG4gICAgICAgIH1cblx0XHRpZih3b3JsZC5lbmVtaWVzW2ldLmhlYWx0aCA8PSAwKSB7XG5cdFx0XHR3b3JsZC5lbmVtaWVzLnNwbGljZShpLCAxKTtcblx0XHR9XG5cdH1cblx0Zm9yKGxldCBpID0gd29ybGQuYnVsbGV0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdHdvcmxkLmJ1bGxldHNbaV0ubW92ZShtb2RpZmllciwgd29ybGQuZW52aXJvbm1lbnRPYmplY3RzLCB3b3JsZC5lbmVtaWVzKTtcbiAgICAgICAgaWYod29ybGQuYnVsbGV0c1tpXS5saXZlID09IGZhbHNlKXtcbiAgICAgICAgICAgIHdvcmxkLmJ1bGxldHMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG5cdH1cblx0Zm9yKGxldCBpID0gd29ybGQuZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0aWYod29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmhlYWx0aCA8PSAwKSB7XG5cdFx0XHR3b3JsZC5lbnZpcm9ubWVudE9iamVjdHMuc3BsaWNlKGksIDEpO1xuXHRcdH1cblx0fVxuXG5cdGlmKHdvcmxkLmVuZW1pZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0d29ybGQud2F2ZSArPSAxO1xuXHRcdHdvcmxkLnN0YXJ0V2F2ZSgpO1xuXHR9XG5cbn07XG5cbi8vIERyYXcgZXZlcnl0aGluZ1xubGV0IHJlbmRlciA9ICgpID0+IHtcblx0aWYod29ybGQucGxheWVyLmhlYWx0aCA8IDApe1xuICAgICAgICBjdHguZm9udCA9IFwiMTI4cHggc2Fucy1zZXJpZlwiO1xuICAgICAgICBjdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiR2FtZSBPdmVyXCIsIGNhbnZhcy53aWR0aC8yLCBjYW52YXMuaGVpZ2h0LzIpO1xuXHR9XG5cdGVsc2Uge1xuICAgICAgICBpZih3b3JsZC5pc0JhY2tncm91bmRMb2FkZWQpIHtcbiAgICAgICAgICAgIHdvcmxkLmRyYXdCYWNrZ3JvdW5kKGN0eCwgY2FudmFzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHdvcmxkLnBsYXllci5pc0ltYWdlTG9hZGVkKSB7XG4gICAgICAgICAgICB3b3JsZC5wbGF5ZXIuZHJhdyhjdHgsIHdvcmxkLmNhbWVyYSk7XG4gICAgICAgICAgICBjdHguZm9udCA9IFwiNDhweCBzYW5zLXNlcmlmXCI7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQod29ybGQucGxheWVyLmhlYWx0aCArIFwiIEhQXCIsIDEwLCA1MCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgd29ybGQuZW5lbWllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYod29ybGQuZW5lbWllc1tpXS5pc0ltYWdlTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgd29ybGQuZW5lbWllc1tpXS5kcmF3KGN0eCwgd29ybGQuY2FtZXJhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB3b3JsZC5lbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKHdvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5pc0ltYWdlTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgd29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmRyYXcoY3R4LCB3b3JsZC5jYW1lcmEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdH1cblxuXHQvL1JlbmRlciBhbGwgdGhlIHdvcmxkLmJ1bGxldHMgYXQgdGhlaXIgbG9jYXRpb25zIGFuZCByZW1vdmUgd29ybGQuYnVsbGV0cyB0aGF0IGFyZW4ndCBsaXZlXG5cdGZvcihsZXQgaSA9IDA7IGkgPCB3b3JsZC5idWxsZXRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYod29ybGQuYnVsbGV0c1tpXS5pc0ltYWdlTG9hZGVkICYmIHdvcmxkLmJ1bGxldHNbaV0ubGl2ZSkge1xuXHRcdFx0d29ybGQuYnVsbGV0c1tpXS5kcmF3KGN0eCwgd29ybGQuY2FtZXJhKTtcblx0XHR9XG5cdH1cbn07XG5cbi8vIFRoZSBtYWluIGdhbWUgbG9vcFxubGV0IG1haW4gPSAoKSA9PiB7XG5cdGxldCBub3cgPSBEYXRlLm5vdygpO1xuXHRsZXQgZGVsdGEgPSBub3cgLSB0aGVuO1xuXG5cdHVwZGF0ZShkZWx0YSAvIDEwMDApO1xuXHR3b3JsZC5jYW1lcmEudXBkYXRlKCk7XG5cdGNvbnNvbGUubG9nKCd3b3JsZC5jYW1lcmEueCA9ICcgKyB3b3JsZC5jYW1lcmEueCArICdcXG53b3JsZC5jYW1lcmEueSA9ICcgKyB3b3JsZC5jYW1lcmEueSk7XG5cdC8vIGJyZWFrcyB3aGVuIGNoYXJhY3Rlci93b3JsZC5jYW1lcmEgbW92ZXMgdG9vIGZhciBkb3duIG9yIHRvIHRoZSByaWdodFxuXHQvLyBidWxsZXQgdWx0cmEgbWVzc2VkIHVwXG5cdHJlbmRlcigpO1xuXG5cdHRoZW4gPSBub3c7XG5cblx0Ly8gUmVxdWVzdCB0byBkbyB0aGlzIGFnYWluIEFTQVBcblx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW4pO1xufTtcblxuLy8gQ3Jvc3MtYnJvd3NlciBzdXBwb3J0IGZvciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0ICAgICAgICAgICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZTtcblxuLy8gTGV0J3MgcGxheSB0aGlzIGdhbWUhXG5sZXQgdGhlbiA9IERhdGUubm93KCk7XG5tYWluKCk7XG4iLCIvKlxyXG4gIFNvdXJjZXM6XHJcbiAgaHR0cDovL2pzZmlkZGxlLm5ldC9nZmNhcnYvUUtnSHMvXHJcbiovXHJcblxyXG4vKipcclxuICogVGhlIENhbWVyYSBjbGFzcyBpcyB1c2VkIHRvIGZvbGxvdyB0aGUgcGxheWVyJ3MgbW92ZW1lbnQuXHJcbiAqL1xyXG5jbGFzcyBDYW1lcmEge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIGluaXRpYWxpemVzIHRoZSBmaWVsZHMgb2YgdGhlIENhbWVyYS5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBDYW1lcmEuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgQ2FtZXJhLlxyXG4gICAgICogQHBhcmFtIGNhbnZhc1dpZHRoIFRoZSB3aWR0aCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIGNhbnZhc0hlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKiBAcGFyYW0gd29ybGRXaWR0aCBUaGUgd2lkdGggb2YgdGhlIHdvcmxkLlxyXG4gICAgICogQHBhcmFtIHdvcmxkSGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIHdvcmxkLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0LCB3b3JsZFdpZHRoLCB3b3JsZEhlaWdodCkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLnhEZWFkWm9uZSA9IDA7XHJcbiAgICAgICAgdGhpcy55RGVhZFpvbmUgPSAwO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSBjYW52YXNXaWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGNhbnZhc0hlaWdodDtcclxuICAgICAgICB0aGlzLndvcmxkV2lkdGggPSB3b3JsZFdpZHRoO1xyXG4gICAgICAgIHRoaXMud29ybGRIZWlnaHQgPSB3b3JsZEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBzZXQgd2hvIHRoZSBjYW1lcmEgaXMgZm9sbG93aW5nLlxyXG4gICAgICogQHBhcmFtIHBsYXllciBUaGUgcGxheWVyIHRoYXQgdGhlIGNhbWVyYSBzaG91bGQgZm9sbG93LlxyXG4gICAgICogQHBhcmFtIHhEZWFkWm9uZVxyXG4gICAgICogQHBhcmFtIHlEZWFkWm9uZVxyXG4gICAgICovXHJcbiAgICBmb2xsb3cocGxheWVyLCB4RGVhZFpvbmUsIHlEZWFkWm9uZSkge1xyXG4gICAgICAgIHRoaXMuZm9sbG93aW5nID0gcGxheWVyO1xyXG4gICAgICAgIHRoaXMueERlYWRab25lID0geERlYWRab25lO1xyXG4gICAgICAgIHRoaXMueURlYWRab25lID0geURlYWRab25lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB1cGRhdGVzIHRoZSBjYW1lcmEncyB4IGFuZCB5IHBvc2l0aW9uLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgaWYodGhpcy5mb2xsb3dpbmcgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmZvbGxvd2luZy54IC0gdGhpcy54ICsgdGhpcy54RGVhZFpvbmUgPiB0aGlzLndpZHRoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5mb2xsb3dpbmcueCAtICh0aGlzLndpZHRoIC0gdGhpcy54RGVhZFpvbmUpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuZm9sbG93aW5nLnggLSB0aGlzLnhEZWFkWm9uZSA8IHRoaXMueClcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuZm9sbG93aW5nLnggLSB0aGlzLnhEZWFkWm9uZTtcclxuICAgICAgICAgICAgaWYodGhpcy5mb2xsb3dpbmcueSAtIHRoaXMueSArIHRoaXMueURlYWRab25lID4gdGhpcy5oZWlnaHQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmZvbGxvd2luZy55IC0gKHRoaXMuaGVpZ2h0IC0gdGhpcy55RGVhZFpvbmUpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuZm9sbG93aW5nLnkgLSB0aGlzLnlEZWFkWm9uZSA8IHRoaXMueSlcclxuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuZm9sbG93aW5nLnkgLSB0aGlzLnlEZWFkWm9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy54IDwgMClcclxuICAgICAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICBpZih0aGlzLnkgPCAwKVxyXG4gICAgICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgIGlmKHRoaXMueCA+IHRoaXMud29ybGRXaWR0aClcclxuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy53b3JsZFdpZHRoIC0gdGhpcy53aWR0aDtcclxuICAgICAgICBpZih0aGlzLnkgPiB0aGlzLndvcmxkSGVpZ2h0KVxyXG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLndvcmxkSGVpZ2h0IC0gdGhpcy5oZWlnaHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhbWVyYTsiLCJjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHRoaXMuaGVhbHRoID0gMTAwO1xuICAgICAgdGhpcy5zcGVlZCA9IDI1NjtcbiAgICAgIHRoaXMueCA9IDI1MDtcbiAgICAgIHRoaXMueSA9IDI1MDtcbiAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gIH1cblxuICAgIGxvYWRJbWFnZSgpIHtcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IFwiR3JhcGhpY3MvUGxheWVyLnBuZ1wiO1xuICAgIH1cbiAgICBzaG9vdCgpIHtcbiAgICAgIHRoaXMuc2hvb3RDb29sZG93biArPSAxMDtcbiAgICB9XG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCIvKlxyXG4gIFNvdXJjZXM6XHJcbiAgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9HYW1lcy9UZWNobmlxdWVzLzJEX2NvbGxpc2lvbl9kZXRlY3Rpb25cclxuICBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80OTU5OTc1L2dlbmVyYXRlLXJhbmRvbS1udW1iZXItYmV0d2Vlbi10d28tbnVtYmVycy1pbi1qYXZhc2NyaXB0XHJcbiovXHJcblxyXG4vKipcclxuICogVGhlIFV0aWwgY2xhc3MgY29udGFpbnMgdmFyaW91cyB1dGlsaXR5IGZ1bmN0aW9ucy5cclxuICovXHJcbmNsYXNzIFV0aWwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGlzQ29sbGlzaW9uIG1ldGhvZCBjaGVja3MgaWYgdGhlcmUgaXMgYSBjb2xsaXNpb24gYmV0d2VlbiB0aGUgdHdvIGlucHV0dGVkIHJlY3RhbmdsZXMuIFRoaXMgYWxnb3JpdGhtIG9ubHlcclxuICAgICAqIHdvcmtzIHdpdGggYXhpcy1hbGlnbmVkIHJlY3RhbmdsZXMuXHJcbiAgICAgKiBAcGFyYW0gcmVjdGFuZ2xlMSBUaGUgZmlyc3QgcmVjdGFuZ2xlLlxyXG4gICAgICogQHBhcmFtIHJlY3RhbmdsZTIgVGhlIHNlY29uZCByZWN0YW5nbGUuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciB0aGVyZSBleGlzdHMgYSBjb2xsaXNpb24gYmV0d2VlbiB0aGUgdHdvIGlucHV0dGVkIHJlY3RhbmdsZXMuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc0NvbGxpc2lvbihyZWN0YW5nbGUxLCByZWN0YW5nbGUyKSB7XHJcbiAgICAgICAgaWYocmVjdGFuZ2xlMS54IDwgcmVjdGFuZ2xlMi54ICsgcmVjdGFuZ2xlMi53aWR0aCAmJlxyXG4gICAgICAgICAgICByZWN0YW5nbGUxLnggKyByZWN0YW5nbGUxLndpZHRoID4gcmVjdGFuZ2xlMi54ICYmXHJcbiAgICAgICAgICAgIHJlY3RhbmdsZTEueSA8IHJlY3RhbmdsZTIueSArIHJlY3RhbmdsZTIuaGVpZ2h0ICYmXHJcbiAgICAgICAgICAgIHJlY3RhbmdsZTEueSArIHJlY3RhbmdsZTEuaGVpZ2h0ID4gcmVjdGFuZ2xlMi55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIHRoZXJlIGFyZSBhbnkgY29sbGlzaW9ucyBiZXR3ZWVuIHRoZSB0d28gYXJyYXlzLiBUaGlzIGFsZ29yaXRobSBvbmx5IHdvcmtzIHdpdGhcclxuICAgICAqIGF4aXMtYWxpZ25lZCByZWN0YW5nbGVzLlxyXG4gICAgICogQHBhcmFtIGFycmF5MSBBbiBhcnJheSBvZiByZWN0YW5nbGVzLlxyXG4gICAgICogQHBhcmFtIGFycmF5MiBBbiBhcnJheSBvZiByZWN0YW5nbGVzLlxyXG4gICAgICogQHJldHVybnMge2ludGVnZXJ9IC0xIGlmIHRoZXJlIGFyZSBubyBjb2xsaXNpb25zIG9yIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgYXJyYXkgaWYgdGhlcmUgaXMuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhcmVBbnlDb2xsaXNpb25zKGFycmF5MSwgYXJyYXkyKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFycmF5MS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgYXJyYXkyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzQ29sbGlzaW9uKGFycmF5MVtpXSwgYXJyYXkyW2pdKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzV2l0aGluKHgxLCB5MSwgd2lkdGgxLCBoZWlnaHQxLCB4MiwgeTIsIHdpZHRoMiwgaGVpZ2h0Mikge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcmFuZG9tSW50RnJvbUludGVydmFsKGZyb20sIHRvKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0byAtIGZyb20gKyAxKSArIGZyb20pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFV0aWw7IiwiaW1wb3J0IFV0aWwgZnJvbSAnLi4vVXRpbGl0aWVzL1V0aWwuanMnO1xuaW1wb3J0IENyYXRlIGZyb20gJy4uL0Vudmlyb25tZW50T2JqZWN0cy9DcmF0ZS5qcyc7XG5pbXBvcnQgQnVzaCBmcm9tICcuLi9FbnZpcm9ubWVudE9iamVjdHMvQnVzaC5qcyc7XG5pbXBvcnQgUm9jayBmcm9tICcuLi9FbnZpcm9ubWVudE9iamVjdHMvUm9jay5qcyc7XG5cbmNsYXNzIEJ1bGxldHtcbiAgY29uc3RydWN0b3IodmVsb2NpdHksIGRhbWFnZSwgeCwgeSwgZGVzdFgsIGRlc3RZKSB7XG4gICAgICB0aGlzLnZlbG9jaXR5ID0gdmVsb2NpdHk7XG4gICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcbiAgICAgIHRoaXMueCA9IHg7XG4gICAgICB0aGlzLnkgPSB5O1xuICAgICAgdGhpcy5kZXN0WCA9IGRlc3RYO1xuICAgICAgdGhpcy5kZXN0WSA9IGRlc3RZO1xuICAgICAgdGhpcy5jb29sZG93biA9IDA7XG4gICAgICAvL3RoaXMuYW5nbGUgPSBNYXRoLlBJLzI7XG4gICAgICB0aGlzLmxpdmUgPSB0cnVlO1xuICB9XG5cbiAgbG9hZEltYWdlKHVybCkge1xuICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XG4gICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xuICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XG4gICAgICB9O1xuICAgICAgdGhpcy5pbWFnZS5zcmMgPSB1cmw7XG4gIH1cbiAgLy9Nb3ZlcyB0aGUgYnVsbGV0IGZyb20gaXRzIHN0YXJ0aW5nIHBvaW50ICh3aGljaCB3aWxsIGJlIHRoZSBwbGF5ZXIncyBsb2NhdGlvbilcbiAgLy90byBpdHMgZGVzdGluYXRpb24gKHdoaWNoIHdpbGwgYmUgdGhlIGN1cnNvciBsb2NhdGlvbiB3aGVuIHRoZSBidWxsZXQgaXMgY3JlYXRlZCkuXG4gIC8vRWFjaCB0aW1lIG1vdmUgaXMgY2FsbGVkIGl0IGlzIGNoZWNrZWQgaWYgdGhlIGJ1bGxldCBoaXRzIGFueXRoaW5nLCBpZiBpdCBkb2VzIHRoZVxuICAvL2hpdFNvZW10aGluZyBtZXRob2Qgd2lsbCBjYWxsIGEgZGFtYWdlIGZ1bmN0aW9uIGFuZCB0aGUgZGFtYWdlIHdpbGwgYmUgYXBwbGllZCwgc29cbiAgLy90aGlzIGZ1bmN0aW9uIHNldHMgdGhpcy5saXZlID0gZmFsc2UgbWVhbmluZyB0aGUgYnVsbGV0IGlzIG5vIGxvbmdlciBsaXZlLlxuICBtb3ZlKG1vZGlmaWVyLCBlbnZpcm9ubWVudE9iamVjdHMsIGVuZW1pZXMpe1xuICAgIGxldCBkaWZmWCA9IHRoaXMuZGVzdFggLSB0aGlzLng7XG4gICAgbGV0IGRpZmZZID0gdGhpcy5kZXN0WSAtIHRoaXMueTtcbiAgICBsZXQgbGVuZ3RoID0gTWF0aC5zcXJ0KGRpZmZYICogZGlmZlggKyBkaWZmWSAqIGRpZmZZKTtcbiAgICAvKmlmKGxlbmd0aCAhPT0gMCl7XG4gICAgICBkaWZmWCAvPSBsZW5ndGg7XG4gICAgICBkaWZmWSAvPSBsZW5ndGg7XG4gICAgfSovXG5cbiAgICAvL3RoaXMuYW5nbGUgPSBNYXRoLmF0YW4yKGRpZmZZLCBkaWZmWCk7XG5cbiAgICBpZihkaWZmWCA+IDApIHtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XG4gICAgICAgIGlmKHRoaXMuaGl0U29tZXRoaW5nKGVudmlyb25tZW50T2JqZWN0cywgZW5lbWllcykpIHtcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYoZGlmZlggPCAwKSB7XG4gICAgICAgIHRoaXMueCAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xuICAgICAgICBpZih0aGlzLmhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIGVuZW1pZXMpKSB7XG4gICAgICAgICAgICB0aGlzLmxpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgdGhpcy5saXZlID0gZmFsc2U7XG4gICAgfVxuICAgIGlmKGRpZmZZID4gMCkge1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcbiAgICAgICAgaWYodGhpcy5oaXRTb21ldGhpbmcoZW52aXJvbm1lbnRPYmplY3RzLCBlbmVtaWVzKSkge1xuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZihkaWZmWSA8IDApIHtcbiAgICAgICAgdGhpcy55IC09IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XG4gICAgICAgIGlmKHRoaXMuaGl0U29tZXRoaW5nKGVudmlyb25tZW50T2JqZWN0cywgZW5lbWllcykpIHtcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5saXZlID0gZmFsc2U7XG4gICAgfVxuXG4gIH1cbiAgLy9DaGVja3MgaWYgdGhlIGJ1bGxldCBoaXQgYW55IG9mIG91ciBvYmplY3RzIHRoYXQgY2FuIGJlIGhpdCwgaWYgc28gdGhhdCBvYmplY3QgbG9zZXMgSFBcbiAgLy9hbmQgdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB0byBpbmRpY2F0ZSB0aGF0IHRoZSBvYmplY3Qgd2FzIGhpdC4gSWYgbm90LCBmYWxzZSBpcyByZXR1cm5lZFxuICAvL2FuZCBub3RoaW5nIGlzIGRvbmUuXG4gIGRhbWFnZUVuZW15KGVuZW15T2JqZWN0KSB7XG4gICAgZW5lbXlPYmplY3QuaGVhbHRoIC09IHRoaXMuZGFtYWdlO1xuICB9XG4gIGRhbWFnZUVudmlyb25tZW50KGVudmlyb25tZW50T2JqZWN0KXtcbiAgICBlbnZpcm9ubWVudE9iamVjdC5oZWFsdGggLT0gdGhpcy5kYW1hZ2U7XG4gIH1cbiAgaGl0U29tZXRoaW5nKGVudmlyb25tZW50T2JqZWN0cywgZW5lbWllcykge1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIGVudmlyb25tZW50T2JqZWN0c1tpXSkgJiYgZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzQmxvY2tpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlRW52aXJvbm1lbnQoZW52aXJvbm1lbnRPYmplY3RzW2ldKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZW5lbWllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIGVuZW1pZXNbaV0pKXtcbiAgICAgICAgICB0aGlzLmRhbWFnZUVuZW15KGVuZW1pZXNbaV0pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBkcmF3KGN0eCwgY2FtZXJhKSB7XG4gICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnVsbGV0O1xuIiwiaW1wb3J0IEJ1bGxldCBmcm9tICcuL0J1bGxldC5qcyc7XHJcbmltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcclxuXHJcbmNsYXNzIEJ1bGxldDltbSBleHRlbmRzIEJ1bGxldCB7XHJcbiAgY29uc3RydWN0b3IoeCwgeSwgZGVzdFgsIGRlc3RZKSB7XHJcbiAgICBzdXBlcig0MDAsIDEwLCB4LCB5LCBkZXN0WCwgZGVzdFkpO1xyXG4gICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvQnVsbGV0LnBuZ1wiKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1bGxldDltbTtcclxuIiwiaW1wb3J0IFJvY2sgZnJvbSBcIi4uL0Vudmlyb25tZW50T2JqZWN0cy9Sb2NrXCI7XHJcbmltcG9ydCBCdXNoIGZyb20gXCIuLi9FbnZpcm9ubWVudE9iamVjdHMvQnVzaFwiO1xyXG5pbXBvcnQgQ3JhdGUgZnJvbSBcIi4uL0Vudmlyb25tZW50T2JqZWN0cy9DcmF0ZVwiO1xyXG5pbXBvcnQgVGFua0VuZW15IGZyb20gXCIuLi9FbmVtaWVzL1RhbmtFbmVteVwiO1xyXG5pbXBvcnQgUmVndWxhckVuZW15IGZyb20gXCIuLi9FbmVtaWVzL1JlZ3VsYXJFbmVteVwiO1xyXG5pbXBvcnQgTGlnaHRFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9MaWdodEVuZW15XCI7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL1BsYXllcnMvUGxheWVyXCI7XHJcbmltcG9ydCBDYW1lcmEgZnJvbSBcIi4uL1BsYXllcnMvQ2FtZXJhXCI7XHJcbmltcG9ydCBVdGlsIGZyb20gXCIuLi9VdGlsaXRpZXMvVXRpbFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBXb3JsZCBjbGFzcyBob2xkcyB0aGUgaW5mb3JtYXRpb24gcmVsYXRlZCB0byB0aGUgd29ybGQuXHJcbiAqL1xyXG5jbGFzcyBXb3JsZCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaW5pdGlhbGl6ZXMgdGhlIGZpZWxkIG9mIHRoZSB3b3JsZCBhbmQgbG9hZHMgdGhlIGJhY2tncm91bmQuXHJcbiAgICAgKiBAcGFyYW0gY2FudmFzIFRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNhbnZhcykge1xyXG4gICAgICAgIHRoaXMuc3RhcnQoY2FudmFzKTtcclxuICAgICAgICB0aGlzLmxvYWRCYWNrZ3JvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc3RhcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgdGhlIGZpZWxkcyBvZiB0aGUgV29ybGQuIFRoZSBwbGF5ZXIgaXMgbWFkZSBhbmQgdGhlIGNhbWVyYSBpcyBhdHRhY2hlZCB0byB0aGUgcGxheWVyLlxyXG4gICAgICogQSBjYWxsIGlzIHRvIGluaXRpYWxpemUgdGhlIGVudmlyb25tZW50IGFuZCBzdGFydCB0aGUgd2F2ZS5cclxuICAgICAqIEBwYXJhbSBjYW52YXMgVGhlIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgc3RhcnQoY2FudmFzKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKGNhbnZhcy53aWR0aC8yLCBjYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhID0gbmV3IENhbWVyYSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQsIDEwMDAwLCA1NjI1KTtcclxuICAgICAgICB0aGlzLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIsIGNhbnZhcy53aWR0aC8yLCBjYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuZW5lbWllcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5idWxsZXRzID0gW107XHJcbiAgICAgICAgdGhpcy53YXZlID0gMTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVFbnZpcm9ubWVudCgpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRXYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGluaXRpYWxpemVzIHRoZSBlbnZpcm9ubWVudCBieSBwdXNoaW5nIGVudmlyb25tZW50IG9iamVjdHMgb250byB0aGUgZW52aXJvbm1lbnRPYmplY3RzIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBpbml0aWFsaXplRW52aXJvbm1lbnQoKSB7XHJcbiAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMucHVzaChuZXcgQ3JhdGUoMjAwLCA0MDApKTtcclxuICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cy5wdXNoKG5ldyBCdXNoKDIwLCAxMDApKTtcclxuICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cy5wdXNoKG5ldyBSb2NrKDkwMCwgMjApKTtcclxuICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cy5wdXNoKG5ldyBSb2NrKDk1MDAsIDIwKSk7XHJcbiAgICAgICAgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMucHVzaChuZXcgUm9jaygyMCwgNTI1MCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzdGFydHMgdGhlIHdhdmUgYnkgcHVzaGluZyBlbmVtaWVzIG9udG8gdGhlIGVuZW1pZXMgYXJyYXkuXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0V2F2ZSgpIHtcclxuICAgICAgICBsZXQgbGlnaHRFbmVteUNhcCA9IHRoaXMud2F2ZSAqIDU7XHJcbiAgICAgICAgbGV0IHJlZ3VsYXJFbmVteUNhcCA9IE1hdGguZmxvb3IodGhpcy53YXZlLzIgKiA1KTtcclxuICAgICAgICBsZXQgdGFua0VuZW15Q2FwID0gTWF0aC5mbG9vcih0aGlzLndhdmUgKiAxLjUpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbGlnaHRFbmVteUNhcDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgTGlnaHRFbmVteShVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKSk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHJlZ3VsYXJFbmVteUNhcDsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMucHVzaChuZXcgUmVndWxhckVuZW15KFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgOTc1MCksIFV0aWwucmFuZG9tSW50RnJvbUludGVydmFsKDI1MCwgNTM3NSkpKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGFua0VuZW15Q2FwOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBUYW5rRW5lbXkoVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA5NzUwKSwgVXRpbC5yYW5kb21JbnRGcm9tSW50ZXJ2YWwoMjUwLCA1Mzc1KSkpO1xyXG4gICAgICAgIC8vIGluY2x1ZGUgdGhlIG90aGVyIHR5cGVzIGFzIHdlbGwsIG1heWJlIGlmIHdhdmUgPT0gc29tZXRoaW5nIG9yID4gc29tZXRoaW5nXHJcblxyXG4gICAgICAgIGxldCBjb2xsaXNpb25GbGFnID0gdHJ1ZTtcclxuICAgICAgICB3aGlsZShjb2xsaXNpb25GbGFnID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCBpID0gVXRpbC5hcmVBbnlDb2xsaXNpb25zKHRoaXMuZW5lbWllcywgdGhpcy5lbnZpcm9ubWVudE9iamVjdHMpO1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gLTEpXHJcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25GbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5lbWllc1tpXS5zZXRQb3NpdGlvbihVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDk3NTApLCBVdGlsLnJhbmRvbUludEZyb21JbnRlcnZhbCgyNTAsIDUzNzUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbG9hZEJhY2tncm91bmQgZnVuY3Rpb24gbG9hZHMgdGhlIGJhY2tncm91bmQgaW1hZ2UuIE9uY2UgdGhlIGltYWdlIGlzIGxvYWRlZCwgdGhpcy5pc0JhY2tncm91bmRMb2FkZWQgaXNcclxuICAgICAqIHNldCB0byB0cnVlLlxyXG4gICAgICovXHJcbiAgICBsb2FkQmFja2dyb3VuZCgpIHtcclxuICAgICAgICB0aGlzLmlzQmFja2dyb3VuZExvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZC5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNCYWNrZ3JvdW5kTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZC5zcmMgPSBcIkdyYXBoaWNzL0JhY2tncm91bmQucG5nXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZHJhd0JhY2tncm91bmQgZnVuY3Rpb24gZHJhd3MgdGhlIGJhY2tncm91bmQgb2YgdGhlIHdvcmxkLlxyXG4gICAgICogQHBhcmFtIGN0eCBUaGUgY29udGV4dCBvZiB0aGUgY2FudmFzLlxyXG4gICAgICogQHBhcmFtIGNhbnZhcyBUaGUgY2FudmFzLlxyXG4gICAgICovXHJcbiAgICBkcmF3QmFja2dyb3VuZChjdHgsIGNhbnZhcykge1xyXG4gICAgICAgIGxldCBzV2lkdGgsIHNIZWlnaHQ7XHJcbiAgICAgICAgc1dpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgICAgIHNIZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG5cclxuICAgICAgICBpZih0aGlzLmJhY2tncm91bmQud2lkdGggLSB0aGlzLmNhbWVyYS54IDwgY2FudmFzLndpZHRoKVxyXG4gICAgICAgICAgICBzV2lkdGggPSB0aGlzLmJhY2tncm91bmQud2lkdGggLSB0aGlzLmNhbWVyYS54O1xyXG4gICAgICAgIGlmKHRoaXMuYmFja2dyb3VuZC5oZWlnaHQgLSB0aGlzLmNhbWVyYS55IDwgY2FudmFzLmhlaWdodClcclxuICAgICAgICAgICAgc0hlaWdodCA9IHRoaXMuYmFja2dyb3VuZC5oZWlnaHQgLSB0aGlzLmNhbWVyYS55O1xyXG5cclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuYmFja2dyb3VuZCwgdGhpcy5jYW1lcmEueCwgdGhpcy5jYW1lcmEueSwgc1dpZHRoLCBzSGVpZ2h0LCAwLCAwLCBzV2lkdGgsIHNIZWlnaHQpO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgV29ybGQ7Il19
