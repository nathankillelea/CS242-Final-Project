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

var Bush = function (_EnvironmentObject) {
    _inherits(Bush, _EnvironmentObject);

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

var Crate = function (_EnvironmentObject) {
    _inherits(Crate, _EnvironmentObject);

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

var EnvironmentObject = function () {
    function EnvironmentObject(x, y, health, isBlocking) {
        _classCallCheck(this, EnvironmentObject);

        this.x = x;
        this.y = y;
        this.health = health;
        this.isBlocking = isBlocking;
    }

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

var Rock = function (_EnvironmentObject) {
    _inherits(Rock, _EnvironmentObject);

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

var reset = function reset() {
	world.player.x = canvas.width / 2;
	world.player.y = canvas.height / 2;
};

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
	console.log(world.enemies);
};

// Draw everything
var render = function render() {
	if (world.isBackgroundLoaded) {
		world.drawBackground(ctx, canvas);
	}

	if (world.player.isImageLoaded) {
		world.player.draw(ctx, world.camera);
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
reset();
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
var Camera = function () {
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

    _createClass(Camera, [{
        key: "follow",
        value: function follow(player, xDeadZone, yDeadZone) {
            this.following = player;
            this.xDeadZone = xDeadZone;
            this.yDeadZone = yDeadZone;
        }
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

/**
 * Sources:
 * https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
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
    }, {
        key: "isWithin",
        value: function isWithin(x1, y1, width1, height1, x2, y2, width2, height2) {}
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var World = function () {
    function World(canvas) {
        _classCallCheck(this, World);

        this.player = new _Player2.default();
        this.camera = new _Camera2.default(0, 0, canvas.width, canvas.height, 10000, 5625); // dont have bgimage in this file
        this.camera.follow(this.player, canvas.width / 2, canvas.height / 2);
        this.enemies = [];
        this.environmentObjects = [];
        this.bullets = [];
        this.wave = 1;
        this.loadBackground();
        this.initializeEnvironment();
        this.startWave();
    }

    _createClass(World, [{
        key: "initializeEnvironment",
        value: function initializeEnvironment() {
            this.environmentObjects.push(new _Crate2.default(200, 400));
            this.environmentObjects.push(new _Bush2.default(20, 100));
            this.environmentObjects.push(new _Rock2.default(900, 20));
            this.environmentObjects.push(new _Rock2.default(9500, 20));
            this.environmentObjects.push(new _Rock2.default(20, 5250));
        }
    }, {
        key: "startWave",
        value: function startWave() {
            this.enemies.push(new _LightEnemy2.default(500, 0));
            this.enemies.push(new _RegularEnemy2.default(300, 0));
            this.enemies.push(new _TankEnemy2.default(450, 0));
        }
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

},{"../Enemies/LightEnemy":2,"../Enemies/RegularEnemy":3,"../Enemies/TankEnemy":4,"../EnvironmentObjects/Bush":5,"../EnvironmentObjects/Crate":6,"../EnvironmentObjects/Rock":8,"../Players/Camera":10,"../Players/Player":11}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJFbmVtaWVzL0VuZW15LmpzIiwiRW5lbWllcy9MaWdodEVuZW15LmpzIiwiRW5lbWllcy9SZWd1bGFyRW5lbXkuanMiLCJFbmVtaWVzL1RhbmtFbmVteS5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9CdXNoLmpzIiwiRW52aXJvbm1lbnRPYmplY3RzL0NyYXRlLmpzIiwiRW52aXJvbm1lbnRPYmplY3RzL0Vudmlyb25tZW50T2JqZWN0LmpzIiwiRW52aXJvbm1lbnRPYmplY3RzL1JvY2suanMiLCJNYWluLmpzIiwiUGxheWVycy9DYW1lcmEuanMiLCJQbGF5ZXJzL1BsYXllci5qcyIsIlV0aWxpdGllcy9VdGlsLmpzIiwiV2VhcG9ucy9CdWxsZXQuanMiLCJXZWFwb25zL0J1bGxldDltbS5qcyIsIldvcmxkL1dvcmxkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O3FqQkNBQTs7Ozs7O0FBTUE7Ozs7Ozs7O0FBRUE7OztJQUdNLEs7O0FBRUY7Ozs7Ozs7OztBQVNBLG1CQUFZLENBQVosRUFBZSxDQUFmLEVBQWtCLFFBQWxCLEVBQTRCLE1BQTVCLEVBQW9DLE1BQXBDLEVBQTRDLFlBQTVDLEVBQTBEO0FBQUE7O0FBQ3RELGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDQSxhQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsYUFBSyxLQUFMLEdBQWEsS0FBSyxFQUFMLEdBQVEsQ0FBckI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGFBQUssWUFBTCxHQUFvQixZQUFwQjtBQUNBLGFBQUssY0FBTCxHQUFzQixDQUF0QjtBQUNIOztBQUVEOzs7Ozs7Ozs7a0NBS1UsRyxFQUFLO0FBQUE7O0FBQ1gsaUJBQUssYUFBTCxHQUFxQixLQUFyQjtBQUNBLGlCQUFLLEtBQUwsR0FBYSxJ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LEtBQUssVUFBTCxDQUFnQixLQUFoQixHQUF3QixLQUFLLE1BQUwsQ0FBWSxDQUFwQyxHQUF3QyxPQUFPLEtBQWxELEVBQ0ksU0FBUyxLQUFLLFVBQUwsQ0FBZ0IsS0FBaEIsR0FBd0IsS0FBSyxNQUFMLENBQVksQ0FBN0M7QUFDSixnQkFBRyxLQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsR0FBeUIsS0FBSyxNQUFMLENBQVksQ0FBckMsR0FBeUMsT0FBTyxNQUFuRCxFQUNJLFVBQVUsS0FBSyxVQUFMLENBQWdCLE1BQWhCLEdBQXlCLEtBQUssTUFBTCxDQUFZLENBQS9DOztBQUVKLGdCQUFJLFNBQUosQ0FBYyxLQUFLLFVBQW5CLEVBQStCLEtBQUssTUFBTCxDQUFZLENBQTNDLEVBQThDLEtBQUssTUFBTCxDQUFZLENBQTFELEVBQTZELE1BQTdELEVBQXFFLE9BQXJFLEVBQThFLENBQTlFLEVBQWlGLENBQWpGLEVBQW9GLE1BQXBGLEVBQTRGLE9BQTVGO0FBQ0g7Ozs7OztrQkFJVSxLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXHJcbiAqIFNvdXJjZXM6XHJcbiAqIGh0dHBzOi8vbWVkaXVtLmNvbS9AeXVyaWJldHQvamF2YXNjcmlwdC1hYnN0cmFjdC1tZXRob2Qtd2l0aC1lczYtNWRiZWE0YjAwMDI3XHJcbiAqIGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9STVkQVJwQVBsTmtcclxuICovXHJcblxyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIEVuZW15IGNsYXNzIGlzIHRoZSBwYXJlbnQgY2xhc3MgZm9yIGFsbCBvZiB0aGUgZW5lbWllcy5cclxuICovXHJcbmNsYXNzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSB2ZWxvY2l0eSBUaGUgdmVsb2NpdHkgb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIGhlYWx0aCBUaGUgaGVhbHRoIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSBkYW1hZ2UgVGhlIGRhbWFnZSBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gcG9pbnRzT25LaWxsIFRoZSBwb2ludHMgcmV3YXJkZWQgZm9yIGtpbGxpbmcgdGhlIEVuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB2ZWxvY2l0eSwgaGVhbHRoLCBkYW1hZ2UsIHBvaW50c09uS2lsbCkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLmFuZ2xlID0gTWF0aC5QSS8yO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2ZWxvY2l0eTtcclxuICAgICAgICB0aGlzLmhlYWx0aCA9IGhlYWx0aDtcclxuICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgICB0aGlzLnBvaW50c09uS2lsbCA9IHBvaW50c09uS2lsbDtcclxuICAgICAgICB0aGlzLmF0dGFja0Nvb2xkb3duID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsb2FkSW1hZ2UgZnVuY3Rpb24gdGFrZXMgaW4gYSB1cmwgYW5kIGxvYWRzIGl0IGFzIGFuIEltYWdlLiBPbmNlIHRoZSBpbWFnZSBpcyBsb2FkZWQsIHRoaXMuaXNJbWFnZUxvYWRlZCBpc1xyXG4gICAgICogc2V0IHRvIHRydWUuIFRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBFbmVteSBhcmUgc2V0IHRvIHRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBpbWFnZS5cclxuICAgICAqIEBwYXJhbSB1cmwgVGhlIHVybCB0aGF0IHNob3VsZCBiZSBsb2FkZWQuXHJcbiAgICAgKi9cclxuICAgIGxvYWRJbWFnZSh1cmwpIHtcclxuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgYXR0YWNrIGZ1bmN0aW9uIHRha2VzIGluIGFuIG9iamVjdCBhbmQgcmVtb3ZlcyB0aGUgYW1vdW50IG9mIGRhbWFnZSB0aGUgRW5lbXkgZGVhbHMgZnJvbSB0aGVpciBoZWFsdGguXHJcbiAgICAgKiA1MDAgaXMgYWRkZWQgdG8gdGhlIGF0dGFjayBjb29sZG93biBvZiB0aGUgZW5lbXkgYWZ0ZXIgYW4gYXR0YWNrLlxyXG4gICAgICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0IHRoYXQgaXMgYmVpbmcgYXR0YWNrZWQuXHJcbiAgICAgKi9cclxuICAgIGF0dGFjayhvYmplY3QpIHtcclxuICAgICAgICBvYmplY3QuaGVhbHRoIC09IHRoaXMuZGFtYWdlO1xyXG4gICAgICAgIHRoaXMuYXR0YWNrQ29vbGRvd24gKz0gNTAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTW92ZXMgdGhlIGVuZW15IHRvd2FyZHMgdGhlIHBsYXllci5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciBvYmplY3QgdG8gbW92ZSB0b3dhcmRzLlxyXG4gICAgICogQHBhcmFtIG1vZGlmaWVyIFRoZSBtb2RpZmllciB0byBiZSBtdWx0aXBsaWVkIGJ5IHRoZSB2ZWxvY2l0eS5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdHMgQW4gYXJyYXkgb2YgZW52aXJvbm1lbnQgb2JqZWN0cy5cclxuICAgICAqL1xyXG4gICAgbW92ZShwbGF5ZXIsIG1vZGlmaWVyLCBlbnZpcm9ubWVudE9iamVjdHMpIHtcclxuICAgICAgICBsZXQgZGlmZlggPSBwbGF5ZXIueCAtIHRoaXMueDtcclxuICAgICAgICBsZXQgZGlmZlkgPSBwbGF5ZXIueSAtIHRoaXMueTtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gTWF0aC5zcXJ0KGRpZmZYICogZGlmZlggKyBkaWZmWSAqIGRpZmZZKTtcclxuICAgICAgICBpZihsZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgZGlmZlggLz0gbGVuZ3RoO1xyXG4gICAgICAgICAgICBkaWZmWSAvPSBsZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFuZ2xlID0gTWF0aC5hdGFuMihkaWZmWSwgZGlmZlgpO1xyXG5cclxuICAgICAgICBpZihkaWZmWCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54IC09IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihkaWZmWCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy54IC09IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGlmZlkgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KGVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueSAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZGlmZlkgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMueSAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KGVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIHBsYXllcikgJiYgdGhpcy5hdHRhY2tDb29sZG93biA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlYWx0aCBiZWZvcmUgYXR0YWNrXCIgKyBwbGF5ZXIuaGVhbHRoKTtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2socGxheWVyKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWFsdGggYWZ0ZXIgYXR0YWNrXCIgKyBwbGF5ZXIuaGVhbHRoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGEgaGVscGVyIGZ1bmN0aW9uIHVzZWQgYnkgdGhlIG1vdmUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIHRoZXJlIGlzIGEgY29sbGlzaW9uIGJldHdlZW4gYW5cclxuICAgICAqIGVudmlyb25tZW50IG9iamVjdCBhbmQgdGhlIGVuZW15LiBJZiB0aGVyZSBpcyBhIGNvbGxpc2lvbiwgdGhlIG9iamVjdCBpcyBhdHRhY2tlZC5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdHMgQW4gYXJyYXkgb2YgZW52aXJvbm1lbnQgb2JqZWN0cy5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIGEgY29sbGlzaW9uIGV4aXN0cy5cclxuICAgICAqL1xyXG4gICAgaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIGVudmlyb25tZW50T2JqZWN0c1tpXSkgJiYgZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzQmxvY2tpbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYXR0YWNrQ29vbGRvd24gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFjayhlbnZpcm9ubWVudE9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRyYXcgZnVuY3Rpb24gZHJhd3MgdGhlIGltYWdlIG9uIHRoZSBjYW52YXMgYXQgdGhlIHggYW5kIHkgcG9zaXRpb24gb2YgdGhlIExpZ2h0RW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gY3R4IFRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGRyYXcoY3R4LCBjYW1lcmEpIHtcclxuICAgICAgICAvL2N0eC5zYXZlKCk7XHJcbiAgICAgICAgLy9jdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICAvL2N0eC5yb3RhdGUodGhpcy5hbmdsZSArIE1hdGguUEkvMi4wKTtcclxuICAgICAgICAvL2N0eC50cmFuc2xhdGUoLXRoaXMueCwgLXRoaXMueSk7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xyXG4gICAgICAgIC8vY3R4LnJlc3RvcmUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRW5lbXk7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBMaWdodEVuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBpcyBhIGZhc3QgZW5lbXkgd2l0aCBsb3cgaGVhbHRoLlxyXG4gKi9cclxuY2xhc3MgTGlnaHRFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBMaWdodEVuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byAxMjgsIHRoZSBoZWFsdGggc2V0IHRvIDEwLCB0aGUgZGFtYWdlIHNldCB0byAxMCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byA1MC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBMaWdodEVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIExpZ2h0RW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAxMjgsIDEwLCAxMCwgNTApO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0xpZ2h0RW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaWdodEVuZW15OyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUmVndWxhckVuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBoYXMgYmFsYW5jZWQgc3RhdHMgYWNyb3NzIHRoZSBib2FyZC5cclxuICovXHJcbmNsYXNzIFJlZ3VsYXJFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBSZWd1bGFyRW5lbXkuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDY0LCB0aGUgaGVhbHRoIHNldCB0byAyNSwgdGhlIGRhbWFnZSBzZXQgdG8gMTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gMTAwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFJlZ3VsYXJFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBSZWd1bGFyRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCA2NCwgMjUsIDEwLCAxMDApO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1JlZ3VsYXJFbmVteS5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlZ3VsYXJFbmVteTsiLCJpbXBvcnQgRW5lbXkgZnJvbSAnLi9FbmVteS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIFRhbmtFbmVteSBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaXMgYSBzbG93IGVuZW15IHdpdGggaGlnaCBoZWFsdGggYW5kIGRhbWFnZS5cclxuICovXHJcbmNsYXNzIFRhbmtFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBUYW5rRW5lbXkuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDMyLCB0aGUgaGVhbHRoIHNldCB0byAxMDAsIHRoZSBkYW1hZ2Ugc2V0IHRvIDI1LCBhbmQgdGhlIHBvaW50c09uS2lsbFxyXG4gICAgICogc2V0IHRvIDUwMC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBUYW5rRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgVGFua0VuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMzIsIDEwMCwgIDI1LCA1MDApO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1RhbmtFbmVteS5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhbmtFbmVteTsiLCJpbXBvcnQgRW52aXJvbm1lbnRPYmplY3QgZnJvbSAnLi9FbnZpcm9ubWVudE9iamVjdC5qcyc7XG5cbmNsYXNzIEJ1c2ggZXh0ZW5kcyBFbnZpcm9ubWVudE9iamVjdCB7XG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICBzdXBlcih4LCB5LCAxMDAwMDAsIGZhbHNlKTtcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvQnVzaC5wbmdcIik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdXNoOyIsImltcG9ydCBFbnZpcm9ubWVudE9iamVjdCBmcm9tICcuL0Vudmlyb25tZW50T2JqZWN0LmpzJztcblxuY2xhc3MgQ3JhdGUgZXh0ZW5kcyBFbnZpcm9ubWVudE9iamVjdCB7XG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICBzdXBlcih4LCB5LCAxMDAsIHRydWUpO1xuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9DcmF0ZS5wbmdcIik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDcmF0ZTtcbiIsImNsYXNzIEVudmlyb25tZW50T2JqZWN0IHtcblxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGhlYWx0aCwgaXNCbG9ja2luZykge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLmhlYWx0aCA9IGhlYWx0aDtcbiAgICAgICAgdGhpcy5pc0Jsb2NraW5nID0gaXNCbG9ja2luZztcbiAgICB9XG5cbiAgICBsb2FkSW1hZ2UodXJsKSB7XG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmltYWdlLmhlaWdodDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB1cmw7XG4gICAgfVxuXG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbnZpcm9ubWVudE9iamVjdDsiLCJpbXBvcnQgRW52aXJvbm1lbnRPYmplY3QgZnJvbSAnLi9FbnZpcm9ubWVudE9iamVjdC5qcyc7XG5cbmNsYXNzIFJvY2sgZXh0ZW5kcyBFbnZpcm9ubWVudE9iamVjdCB7XG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICBzdXBlcih4LCB5LCAzMDAsIHRydWUpO1xuICAgICAgICBzdXBlci5sb2FkSW1hZ2UoXCJHcmFwaGljcy9Sb2NrLnBuZ1wiKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJvY2s7XG4iLCIvKlxuICBTb3VyY2VzOlxuICBodHRwOi8vd3d3Lmxvc3RkZWNhZGVnYW1lcy5jb20vaG93LXRvLW1ha2UtYS1zaW1wbGUtaHRtbDUtY2FudmFzLWdhbWUvXG4gIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQwMzcyMTIvaHRtbC1jYW52YXMtZnVsbC1zY3JlZW4/dXRtX21lZGl1bT1vcmdhbmljJnV0bV9zb3VyY2U9Z29vZ2xlX3JpY2hfcWEmdXRtX2NhbXBhaWduPWdvb2dsZV9yaWNoX3FhXG4gIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2OTE5NjAxL2h0bWw1LWNhbnZhcy13b3JsZC5jYW1lcmEtdmlld3BvcnQtaG93LXRvLWFjdGFsbHktZG8taXQ/dXRtX21lZGl1bT1vcmdhbmljJnV0bV9zb3VyY2U9Z29vZ2xlX3JpY2hfcWEmdXRtX2NhbXBhaWduPWdvb2dsZV9yaWNoX3FhXG4gIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvZ2ZjYXJ2L1FLZ0hzL1xuICovXG5cbmltcG9ydCBCdWxsZXQ5bW0gZnJvbSAnLi9XZWFwb25zL0J1bGxldDltbS5qcydcbmltcG9ydCBVdGlsIGZyb20gJy4vVXRpbGl0aWVzL1V0aWwuanMnO1xuaW1wb3J0IFdvcmxkIGZyb20gJy4vV29ybGQvV29ybGQuanMnO1xuXG4vLyBDcmVhdGUgdGhlIGNhbnZhc1xubGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxubGV0IHdvcmxkID0gbmV3IFdvcmxkKGNhbnZhcyk7XG5cbi8vIEhhbmRsZSBjb250cm9sc1xubGV0IGtleXNQcmVzc2VkID0ge307XG5sZXQgbW91c2UgPSBbMCwwXTtcbmxldCBjbGlja2luZyA9IGZhbHNlO1xuXG5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuXHRrZXlzUHJlc3NlZFtlLmtleUNvZGVdID0gdHJ1ZTtcbn0sIGZhbHNlKTtcblxuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG5cdGRlbGV0ZSBrZXlzUHJlc3NlZFtlLmtleUNvZGVdO1xufSwgZmFsc2UpO1xuXG5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4ge1xuXHRtb3VzZVswXSA9IGUuY2xpZW50WDtcblx0bW91c2VbMV0gPSBlLmNsaWVudFk7XG59LCBmYWxzZSk7XG5cbmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG5cdGNsaWNraW5nID0gdHJ1ZTtcblx0d29ybGQuYnVsbGV0cy5wdXNoKG5ldyBCdWxsZXQ5bW0od29ybGQucGxheWVyLnggKyB3b3JsZC5wbGF5ZXIud2lkdGgvMiwgd29ybGQucGxheWVyLnksIGUuY2xpZW50WCwgZS5jbGllbnRZKSk7XG59KTtcblxubGV0IHJlc2V0ID0gKCkgPT4ge1xuXHR3b3JsZC5wbGF5ZXIueCA9IGNhbnZhcy53aWR0aCAvIDI7XG5cdHdvcmxkLnBsYXllci55ID0gY2FudmFzLmhlaWdodCAvIDI7XG59O1xuXG5sZXQgaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3JsZC5lbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKFV0aWwuaXNDb2xsaXNpb24od29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLCB3b3JsZC5wbGF5ZXIpICYmIHdvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuLy8gVXBkYXRlIGdhbWUgb2JqZWN0c1xubGV0IHVwZGF0ZSA9IChtb2RpZmllcikgPT4ge1xuXHRpZiAoODcgaW4ga2V5c1ByZXNzZWQpIHsgLy8gUGxheWVyIGhvbGRpbmcgdXBcblx0XHR3b3JsZC5wbGF5ZXIueSAtPSB3b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcblx0XHRpZihpc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdCgpKSB7XG4gICAgICAgICAgICB3b3JsZC5wbGF5ZXIueSArPSB3b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcbiAgICAgICAgfVxuXHR9XG5cdGlmICg4MyBpbiBrZXlzUHJlc3NlZCkgeyAvLyBQbGF5ZXIgaG9sZGluZyBkb3duXG5cdFx0d29ybGQucGxheWVyLnkgKz0gd29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XG4gICAgICAgIGlmKGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KCkpIHtcbiAgICAgICAgICAgIHdvcmxkLnBsYXllci55IC09IHdvcmxkLnBsYXllci5zcGVlZCAqIG1vZGlmaWVyO1xuICAgICAgICB9XG5cdH1cblx0aWYgKDY1IGluIGtleXNQcmVzc2VkKSB7IC8vIFBsYXllciBob2xkaW5nIGxlZnRcblx0XHR3b3JsZC5wbGF5ZXIueCAtPSB3b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcbiAgICAgICAgaWYoaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoKSkge1xuICAgICAgICAgICAgd29ybGQucGxheWVyLnggKz0gd29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XG4gICAgICAgIH1cblx0fVxuXHRpZiAoNjggaW4ga2V5c1ByZXNzZWQpIHsgLy8gUGxheWVyIGhvbGRpbmcgcmlnaHRcblx0XHR3b3JsZC5wbGF5ZXIueCArPSB3b3JsZC5wbGF5ZXIuc3BlZWQgKiBtb2RpZmllcjtcbiAgICAgICAgaWYoaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoKSkge1xuICAgICAgICAgICAgd29ybGQucGxheWVyLnggLT0gd29ybGQucGxheWVyLnNwZWVkICogbW9kaWZpZXI7XG4gICAgICAgIH1cblx0fVxuXG5cdGZvcihsZXQgaSA9IHdvcmxkLmVuZW1pZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHR3b3JsZC5lbmVtaWVzW2ldLm1vdmUod29ybGQucGxheWVyLCBtb2RpZmllciwgd29ybGQuZW52aXJvbm1lbnRPYmplY3RzKTtcbiAgICAgICAgaWYod29ybGQuZW5lbWllc1tpXS5hdHRhY2tDb29sZG93biA+IDApIHtcbiAgICAgICAgICAgIHdvcmxkLmVuZW1pZXNbaV0uYXR0YWNrQ29vbGRvd24gLT0gNTtcbiAgICAgICAgfVxuXHRcdGlmKHdvcmxkLmVuZW1pZXNbaV0uaGVhbHRoIDw9IDApIHtcblx0XHRcdHdvcmxkLmVuZW1pZXMuc3BsaWNlKGksIDEpO1xuXHRcdH1cblx0fVxuXHRmb3IobGV0IGkgPSB3b3JsZC5idWxsZXRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0d29ybGQuYnVsbGV0c1tpXS5tb3ZlKG1vZGlmaWVyLCB3b3JsZC5lbnZpcm9ubWVudE9iamVjdHMsIHdvcmxkLmVuZW1pZXMpO1xuICAgICAgICBpZih3b3JsZC5idWxsZXRzW2ldLmxpdmUgPT0gZmFsc2Upe1xuICAgICAgICAgICAgd29ybGQuYnVsbGV0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cblx0fVxuXHRmb3IobGV0IGkgPSB3b3JsZC5lbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRpZih3b3JsZC5lbnZpcm9ubWVudE9iamVjdHNbaV0uaGVhbHRoIDw9IDApIHtcblx0XHRcdHdvcmxkLmVudmlyb25tZW50T2JqZWN0cy5zcGxpY2UoaSwgMSk7XG5cdFx0fVxuXHR9XG5cdGNvbnNvbGUubG9nKHdvcmxkLmVuZW1pZXMpXG59O1xuXG4vLyBEcmF3IGV2ZXJ5dGhpbmdcbmxldCByZW5kZXIgPSAoKSA9PiB7XG5cdGlmKHdvcmxkLmlzQmFja2dyb3VuZExvYWRlZCkge1xuXHRcdHdvcmxkLmRyYXdCYWNrZ3JvdW5kKGN0eCwgY2FudmFzKTtcblx0fVxuXG5cdGlmKHdvcmxkLnBsYXllci5pc0ltYWdlTG9hZGVkKSB7XG5cdCAgd29ybGQucGxheWVyLmRyYXcoY3R4LCB3b3JsZC5jYW1lcmEpO1xuXHR9XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgd29ybGQuZW5lbWllcy5sZW5ndGg7IGkrKykge1xuICAgIFx0aWYod29ybGQuZW5lbWllc1tpXS5pc0ltYWdlTG9hZGVkKSB7XG5cdFx0XHR3b3JsZC5lbmVtaWVzW2ldLmRyYXcoY3R4LCB3b3JsZC5jYW1lcmEpO1xuXHRcdH1cbiAgICB9XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgd29ybGQuZW52aXJvbm1lbnRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYod29ybGQuZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzSW1hZ2VMb2FkZWQpIHtcblx0XHRcdHdvcmxkLmVudmlyb25tZW50T2JqZWN0c1tpXS5kcmF3KGN0eCwgd29ybGQuY2FtZXJhKTtcblx0XHR9XG5cdH1cblxuXHQvL1JlbmRlciBhbGwgdGhlIHdvcmxkLmJ1bGxldHMgYXQgdGhlaXIgbG9jYXRpb25zIGFuZCByZW1vdmUgd29ybGQuYnVsbGV0cyB0aGF0IGFyZW4ndCBsaXZlXG5cdGZvcihsZXQgaSA9IDA7IGkgPCB3b3JsZC5idWxsZXRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYod29ybGQuYnVsbGV0c1tpXS5pc0ltYWdlTG9hZGVkICYmIHdvcmxkLmJ1bGxldHNbaV0ubGl2ZSkge1xuXHRcdFx0d29ybGQuYnVsbGV0c1tpXS5kcmF3KGN0eCwgd29ybGQuY2FtZXJhKTtcblx0XHR9XG5cdH1cbn07XG5cbi8vIFRoZSBtYWluIGdhbWUgbG9vcFxubGV0IG1haW4gPSAoKSA9PiB7XG5cdGxldCBub3cgPSBEYXRlLm5vdygpO1xuXHRsZXQgZGVsdGEgPSBub3cgLSB0aGVuO1xuXG5cdHVwZGF0ZShkZWx0YSAvIDEwMDApO1xuXHR3b3JsZC5jYW1lcmEudXBkYXRlKCk7XG5cdGNvbnNvbGUubG9nKCd3b3JsZC5jYW1lcmEueCA9ICcgKyB3b3JsZC5jYW1lcmEueCArICdcXG53b3JsZC5jYW1lcmEueSA9ICcgKyB3b3JsZC5jYW1lcmEueSk7XG5cdC8vIGJyZWFrcyB3aGVuIGNoYXJhY3Rlci93b3JsZC5jYW1lcmEgbW92ZXMgdG9vIGZhciBkb3duIG9yIHRvIHRoZSByaWdodFxuXHQvLyBidWxsZXQgdWx0cmEgbWVzc2VkIHVwXG5cdHJlbmRlcigpO1xuXG5cdHRoZW4gPSBub3c7XG5cblx0Ly8gUmVxdWVzdCB0byBkbyB0aGlzIGFnYWluIEFTQVBcblx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW4pO1xufTtcblxuLy8gQ3Jvc3MtYnJvd3NlciBzdXBwb3J0IGZvciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0ICAgICAgICAgICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZTtcblxuLy8gTGV0J3MgcGxheSB0aGlzIGdhbWUhXG5sZXQgdGhlbiA9IERhdGUubm93KCk7XG5yZXNldCgpO1xubWFpbigpO1xuIiwiLypcclxuICBTb3VyY2VzOlxyXG4gIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvZ2ZjYXJ2L1FLZ0hzL1xyXG4qL1xyXG5jbGFzcyBDYW1lcmEge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCwgd29ybGRXaWR0aCwgd29ybGRIZWlnaHQpIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy54RGVhZFpvbmUgPSAwO1xyXG4gICAgICAgIHRoaXMueURlYWRab25lID0gMDtcclxuICAgICAgICB0aGlzLndpZHRoID0gY2FudmFzV2lkdGg7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBjYW52YXNIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy53b3JsZFdpZHRoID0gd29ybGRXaWR0aDtcclxuICAgICAgICB0aGlzLndvcmxkSGVpZ2h0ID0gd29ybGRIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZm9sbG93KHBsYXllciwgeERlYWRab25lLCB5RGVhZFpvbmUpIHtcclxuICAgICAgICB0aGlzLmZvbGxvd2luZyA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLnhEZWFkWm9uZSA9IHhEZWFkWm9uZTtcclxuICAgICAgICB0aGlzLnlEZWFkWm9uZSA9IHlEZWFkWm9uZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgaWYodGhpcy5mb2xsb3dpbmcgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmZvbGxvd2luZy54IC0gdGhpcy54ICsgdGhpcy54RGVhZFpvbmUgPiB0aGlzLndpZHRoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5mb2xsb3dpbmcueCAtICh0aGlzLndpZHRoIC0gdGhpcy54RGVhZFpvbmUpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuZm9sbG93aW5nLnggLSB0aGlzLnhEZWFkWm9uZSA8IHRoaXMueClcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuZm9sbG93aW5nLnggLSB0aGlzLnhEZWFkWm9uZTtcclxuICAgICAgICAgICAgaWYodGhpcy5mb2xsb3dpbmcueSAtIHRoaXMueSArIHRoaXMueURlYWRab25lID4gdGhpcy5oZWlnaHQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmZvbGxvd2luZy55IC0gKHRoaXMuaGVpZ2h0IC0gdGhpcy55RGVhZFpvbmUpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuZm9sbG93aW5nLnkgLSB0aGlzLnlEZWFkWm9uZSA8IHRoaXMueSlcclxuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuZm9sbG93aW5nLnkgLSB0aGlzLnlEZWFkWm9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy54IDwgMClcclxuICAgICAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICBpZih0aGlzLnkgPCAwKVxyXG4gICAgICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgIGlmKHRoaXMueCA+IHRoaXMud29ybGRXaWR0aClcclxuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy53b3JsZFdpZHRoIC0gdGhpcy53aWR0aDtcclxuICAgICAgICBpZih0aGlzLnkgPiB0aGlzLndvcmxkSGVpZ2h0KVxyXG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLndvcmxkSGVpZ2h0IC0gdGhpcy5oZWlnaHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhbWVyYTsiLCJjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHRoaXMuaGVhbHRoID0gMTAwO1xuICAgICAgdGhpcy5zcGVlZCA9IDI1NjtcbiAgICAgIHRoaXMueCA9IDI1MDtcbiAgICAgIHRoaXMueSA9IDI1MDtcbiAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gIH1cblxuICAgIGxvYWRJbWFnZSgpIHtcbiAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IFwiR3JhcGhpY3MvUGxheWVyLnBuZ1wiO1xuICAgIH1cbiAgICBzaG9vdCgpIHtcbiAgICAgIHRoaXMuc2hvb3RDb29sZG93biArPSAxMDtcbiAgICB9XG4gICAgZHJhdyhjdHgsIGNhbWVyYSkge1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCAtIGNhbWVyYS54LCB0aGlzLnkgLSBjYW1lcmEueSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCIvKipcclxuICogU291cmNlczpcclxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9HYW1lcy9UZWNobmlxdWVzLzJEX2NvbGxpc2lvbl9kZXRlY3Rpb25cclxuICovXHJcblxyXG4vKipcclxuICogVGhlIFV0aWwgY2xhc3MgY29udGFpbnMgdmFyaW91cyB1dGlsaXR5IGZ1bmN0aW9ucy5cclxuICovXHJcbmNsYXNzIFV0aWwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGlzQ29sbGlzaW9uIG1ldGhvZCBjaGVja3MgaWYgdGhlcmUgaXMgYSBjb2xsaXNpb24gYmV0d2VlbiB0aGUgdHdvIGlucHV0dGVkIHJlY3RhbmdsZXMuIFRoaXMgYWxnb3JpdGhtIG9ubHlcclxuICAgICAqIHdvcmtzIHdpdGggYXhpcy1hbGlnbmVkIHJlY3RhbmdsZXMuXHJcbiAgICAgKiBAcGFyYW0gcmVjdGFuZ2xlMSBUaGUgZmlyc3QgcmVjdGFuZ2xlLlxyXG4gICAgICogQHBhcmFtIHJlY3RhbmdsZTIgVGhlIHNlY29uZCByZWN0YW5nbGUuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciB0aGVyZSBleGlzdHMgYSBjb2xsaXNpb24gYmV0d2VlbiB0aGUgdHdvIGlucHV0dGVkIHJlY3RhbmdsZXMuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc0NvbGxpc2lvbihyZWN0YW5nbGUxLCByZWN0YW5nbGUyKSB7XHJcbiAgICAgICAgaWYocmVjdGFuZ2xlMS54IDwgcmVjdGFuZ2xlMi54ICsgcmVjdGFuZ2xlMi53aWR0aCAmJlxyXG4gICAgICAgICAgICByZWN0YW5nbGUxLnggKyByZWN0YW5nbGUxLndpZHRoID4gcmVjdGFuZ2xlMi54ICYmXHJcbiAgICAgICAgICAgIHJlY3RhbmdsZTEueSA8IHJlY3RhbmdsZTIueSArIHJlY3RhbmdsZTIuaGVpZ2h0ICYmXHJcbiAgICAgICAgICAgIHJlY3RhbmdsZTEueSArIHJlY3RhbmdsZTEuaGVpZ2h0ID4gcmVjdGFuZ2xlMi55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNXaXRoaW4oeDEsIHkxLCB3aWR0aDEsIGhlaWdodDEsIHgyLCB5Miwgd2lkdGgyLCBoZWlnaHQyKSB7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVdGlsOyIsImltcG9ydCBVdGlsIGZyb20gJy4uL1V0aWxpdGllcy9VdGlsLmpzJztcbmltcG9ydCBDcmF0ZSBmcm9tICcuLi9FbnZpcm9ubWVudE9iamVjdHMvQ3JhdGUuanMnO1xuaW1wb3J0IEJ1c2ggZnJvbSAnLi4vRW52aXJvbm1lbnRPYmplY3RzL0J1c2guanMnO1xuaW1wb3J0IFJvY2sgZnJvbSAnLi4vRW52aXJvbm1lbnRPYmplY3RzL1JvY2suanMnO1xuXG5jbGFzcyBCdWxsZXR7XG4gIGNvbnN0cnVjdG9yKHZlbG9jaXR5LCBkYW1hZ2UsIHgsIHksIGRlc3RYLCBkZXN0WSkge1xuICAgICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgICAgdGhpcy5kYW1hZ2UgPSBkYW1hZ2U7XG4gICAgICB0aGlzLnggPSB4O1xuICAgICAgdGhpcy55ID0geTtcbiAgICAgIHRoaXMuZGVzdFggPSBkZXN0WDtcbiAgICAgIHRoaXMuZGVzdFkgPSBkZXN0WTtcbiAgICAgIHRoaXMuY29vbGRvd24gPSAwO1xuICAgICAgLy90aGlzLmFuZ2xlID0gTWF0aC5QSS8yO1xuICAgICAgdGhpcy5saXZlID0gdHJ1ZTtcbiAgfVxuXG4gIGxvYWRJbWFnZSh1cmwpIHtcbiAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgfTtcbiAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdXJsO1xuICB9XG4gIC8vTW92ZXMgdGhlIGJ1bGxldCBmcm9tIGl0cyBzdGFydGluZyBwb2ludCAod2hpY2ggd2lsbCBiZSB0aGUgcGxheWVyJ3MgbG9jYXRpb24pXG4gIC8vdG8gaXRzIGRlc3RpbmF0aW9uICh3aGljaCB3aWxsIGJlIHRoZSBjdXJzb3IgbG9jYXRpb24gd2hlbiB0aGUgYnVsbGV0IGlzIGNyZWF0ZWQpLlxuICAvL0VhY2ggdGltZSBtb3ZlIGlzIGNhbGxlZCBpdCBpcyBjaGVja2VkIGlmIHRoZSBidWxsZXQgaGl0cyBhbnl0aGluZywgaWYgaXQgZG9lcyB0aGVcbiAgLy9oaXRTb2VtdGhpbmcgbWV0aG9kIHdpbGwgY2FsbCBhIGRhbWFnZSBmdW5jdGlvbiBhbmQgdGhlIGRhbWFnZSB3aWxsIGJlIGFwcGxpZWQsIHNvXG4gIC8vdGhpcyBmdW5jdGlvbiBzZXRzIHRoaXMubGl2ZSA9IGZhbHNlIG1lYW5pbmcgdGhlIGJ1bGxldCBpcyBubyBsb25nZXIgbGl2ZS5cbiAgbW92ZShtb2RpZmllciwgZW52aXJvbm1lbnRPYmplY3RzLCBlbmVtaWVzKXtcbiAgICBsZXQgZGlmZlggPSB0aGlzLmRlc3RYIC0gdGhpcy54O1xuICAgIGxldCBkaWZmWSA9IHRoaXMuZGVzdFkgLSB0aGlzLnk7XG4gICAgbGV0IGxlbmd0aCA9IE1hdGguc3FydChkaWZmWCAqIGRpZmZYICsgZGlmZlkgKiBkaWZmWSk7XG4gICAgLyppZihsZW5ndGggIT09IDApe1xuICAgICAgZGlmZlggLz0gbGVuZ3RoO1xuICAgICAgZGlmZlkgLz0gbGVuZ3RoO1xuICAgIH0qL1xuXG4gICAgLy90aGlzLmFuZ2xlID0gTWF0aC5hdGFuMihkaWZmWSwgZGlmZlgpO1xuXG4gICAgaWYoZGlmZlggPiAwKSB7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xuICAgICAgICBpZih0aGlzLmhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIGVuZW1pZXMpKSB7XG4gICAgICAgICAgICB0aGlzLmxpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmKGRpZmZYIDwgMCkge1xuICAgICAgICB0aGlzLnggLT0gdGhpcy52ZWxvY2l0eSptb2RpZmllcjtcbiAgICAgICAgaWYodGhpcy5oaXRTb21ldGhpbmcoZW52aXJvbm1lbnRPYmplY3RzLCBlbmVtaWVzKSkge1xuICAgICAgICAgICAgdGhpcy5saXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZihkaWZmWSA+IDApIHtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XG4gICAgICAgIGlmKHRoaXMuaGl0U29tZXRoaW5nKGVudmlyb25tZW50T2JqZWN0cywgZW5lbWllcykpIHtcbiAgICAgICAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYoZGlmZlkgPCAwKSB7XG4gICAgICAgIHRoaXMueSAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xuICAgICAgICBpZih0aGlzLmhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIGVuZW1pZXMpKSB7XG4gICAgICAgICAgICB0aGlzLmxpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMubGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICB9XG4gIC8vQ2hlY2tzIGlmIHRoZSBidWxsZXQgaGl0IGFueSBvZiBvdXIgb2JqZWN0cyB0aGF0IGNhbiBiZSBoaXQsIGlmIHNvIHRoYXQgb2JqZWN0IGxvc2VzIEhQXG4gIC8vYW5kIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgdG8gaW5kaWNhdGUgdGhhdCB0aGUgb2JqZWN0IHdhcyBoaXQuIElmIG5vdCwgZmFsc2UgaXMgcmV0dXJuZWRcbiAgLy9hbmQgbm90aGluZyBpcyBkb25lLlxuICBkYW1hZ2VFbmVteShlbmVteU9iamVjdCkge1xuICAgIGVuZW15T2JqZWN0LmhlYWx0aCAtPSB0aGlzLmRhbWFnZTtcbiAgfVxuICBkYW1hZ2VFbnZpcm9ubWVudChlbnZpcm9ubWVudE9iamVjdCl7XG4gICAgZW52aXJvbm1lbnRPYmplY3QuaGVhbHRoIC09IHRoaXMuZGFtYWdlO1xuICB9XG4gIGhpdFNvbWV0aGluZyhlbnZpcm9ubWVudE9iamVjdHMsIGVuZW1pZXMpIHtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbnZpcm9ubWVudE9iamVjdHNbaV0pICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKSB7XG4gICAgICAgICAgICB0aGlzLmRhbWFnZUVudmlyb25tZW50KGVudmlyb25tZW50T2JqZWN0c1tpXSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVuZW1pZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYoVXRpbC5pc0NvbGxpc2lvbih0aGlzLCBlbmVtaWVzW2ldKSl7XG4gICAgICAgICAgdGhpcy5kYW1hZ2VFbmVteShlbmVtaWVzW2ldKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZHJhdyhjdHgsIGNhbWVyYSkge1xuICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnggLSBjYW1lcmEueCwgdGhpcy55IC0gY2FtZXJhLnkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1bGxldDtcbiIsImltcG9ydCBCdWxsZXQgZnJvbSAnLi9CdWxsZXQuanMnO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG5jbGFzcyBCdWxsZXQ5bW0gZXh0ZW5kcyBCdWxsZXQge1xyXG4gIGNvbnN0cnVjdG9yKHgsIHksIGRlc3RYLCBkZXN0WSkge1xyXG4gICAgc3VwZXIoNDAwLCAxMCwgeCwgeSwgZGVzdFgsIGRlc3RZKTtcclxuICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0J1bGxldC5wbmdcIik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdWxsZXQ5bW07XHJcbiIsImltcG9ydCBSb2NrIGZyb20gXCIuLi9FbnZpcm9ubWVudE9iamVjdHMvUm9ja1wiO1xyXG5pbXBvcnQgQnVzaCBmcm9tIFwiLi4vRW52aXJvbm1lbnRPYmplY3RzL0J1c2hcIjtcclxuaW1wb3J0IENyYXRlIGZyb20gXCIuLi9FbnZpcm9ubWVudE9iamVjdHMvQ3JhdGVcIjtcclxuaW1wb3J0IFRhbmtFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9UYW5rRW5lbXlcIjtcclxuaW1wb3J0IFJlZ3VsYXJFbmVteSBmcm9tIFwiLi4vRW5lbWllcy9SZWd1bGFyRW5lbXlcIjtcclxuaW1wb3J0IExpZ2h0RW5lbXkgZnJvbSBcIi4uL0VuZW1pZXMvTGlnaHRFbmVteVwiO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLi9QbGF5ZXJzL1BsYXllclwiO1xyXG5pbXBvcnQgQ2FtZXJhIGZyb20gXCIuLi9QbGF5ZXJzL0NhbWVyYVwiO1xyXG5cclxuY2xhc3MgV29ybGQge1xyXG4gICAgY29uc3RydWN0b3IoY2FudmFzKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgQ2FtZXJhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCwgMTAwMDAsIDU2MjUpOyAvLyBkb250IGhhdmUgYmdpbWFnZSBpbiB0aGlzIGZpbGVcclxuICAgICAgICB0aGlzLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIsIGNhbnZhcy53aWR0aC8yLCBjYW52YXMuaGVpZ2h0LzIpO1xyXG4gICAgICAgIHRoaXMuZW5lbWllcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzID0gW107XHJcbiAgICAgICAgdGhpcy5idWxsZXRzID0gW107XHJcbiAgICAgICAgdGhpcy53YXZlID0gMTtcclxuICAgICAgICB0aGlzLmxvYWRCYWNrZ3JvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplRW52aXJvbm1lbnQoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0V2F2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVFbnZpcm9ubWVudCgpIHtcclxuICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cy5wdXNoKG5ldyBDcmF0ZSgyMDAsIDQwMCkpO1xyXG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzLnB1c2gobmV3IEJ1c2goMjAsIDEwMCkpO1xyXG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzLnB1c2gobmV3IFJvY2soOTAwLCAyMCkpO1xyXG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnRPYmplY3RzLnB1c2gobmV3IFJvY2soOTUwMCwgMjApKTtcclxuICAgICAgICB0aGlzLmVudmlyb25tZW50T2JqZWN0cy5wdXNoKG5ldyBSb2NrKDIwLCA1MjUwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRXYXZlKCkge1xyXG4gICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBMaWdodEVuZW15KDUwMCwgMCkpO1xyXG4gICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBSZWd1bGFyRW5lbXkoMzAwLCAwKSk7XHJcbiAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IFRhbmtFbmVteSg0NTAsIDApKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkQmFja2dyb3VuZCgpIHtcclxuICAgICAgICB0aGlzLmlzQmFja2dyb3VuZExvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZC5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNCYWNrZ3JvdW5kTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZC5zcmMgPSBcIkdyYXBoaWNzL0JhY2tncm91bmQucG5nXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0JhY2tncm91bmQoY3R4LCBjYW52YXMpIHtcclxuICAgICAgICBsZXQgc1dpZHRoLCBzSGVpZ2h0O1xyXG4gICAgICAgIHNXaWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgICAgICBzSGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuXHJcbiAgICAgICAgaWYodGhpcy5iYWNrZ3JvdW5kLndpZHRoIC0gdGhpcy5jYW1lcmEueCA8IGNhbnZhcy53aWR0aClcclxuICAgICAgICAgICAgc1dpZHRoID0gdGhpcy5iYWNrZ3JvdW5kLndpZHRoIC0gdGhpcy5jYW1lcmEueDtcclxuICAgICAgICBpZih0aGlzLmJhY2tncm91bmQuaGVpZ2h0IC0gdGhpcy5jYW1lcmEueSA8IGNhbnZhcy5oZWlnaHQpXHJcbiAgICAgICAgICAgIHNIZWlnaHQgPSB0aGlzLmJhY2tncm91bmQuaGVpZ2h0IC0gdGhpcy5jYW1lcmEueTtcclxuXHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmJhY2tncm91bmQsIHRoaXMuY2FtZXJhLngsIHRoaXMuY2FtZXJhLnksIHNXaWR0aCwgc0hlaWdodCwgMCwgMCwgc1dpZHRoLCBzSGVpZ2h0KTtcclxuICAgIH07XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXb3JsZDsiXX0=
