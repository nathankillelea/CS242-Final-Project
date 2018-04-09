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
        value: function draw(ctx) {
            //ctx.save();
            //ctx.translate(this.x, this.y);
            //ctx.rotate(this.angle + Math.PI/2.0);
            //ctx.translate(-this.x, -this.y);
            ctx.drawImage(this.image, this.x, this.y);
            //ctx.restore();
        }
    }]);

    return Enemy;
}();

exports.default = Enemy;

},{"../Utilities/Util.js":11}],2:[function(require,module,exports){
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

        var _this = _possibleConstructorReturn(this, (Crate.__proto__ || Object.getPrototypeOf(Crate)).call(this, x, y, 500, true));

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
        value: function draw(ctx) {
            ctx.drawImage(this.image, this.x, this.y);
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

        var _this = _possibleConstructorReturn(this, (Rock.__proto__ || Object.getPrototypeOf(Rock)).call(this, x, y, 3000, true));

        _get(Rock.prototype.__proto__ || Object.getPrototypeOf(Rock.prototype), "loadImage", _this).call(_this, "Graphics/Rock.png");
        return _this;
    }

    return Rock;
}(_EnvironmentObject3.default);

exports.default = Rock;

},{"./EnvironmentObject.js":7}],9:[function(require,module,exports){
'use strict';

var _Player = require('./Players/Player.js');

var _Player2 = _interopRequireDefault(_Player);

var _LightEnemy = require('./Enemies/LightEnemy.js');

var _LightEnemy2 = _interopRequireDefault(_LightEnemy);

var _RegularEnemy = require('./Enemies/RegularEnemy.js');

var _RegularEnemy2 = _interopRequireDefault(_RegularEnemy);

var _TankEnemy = require('./Enemies/TankEnemy.js');

var _TankEnemy2 = _interopRequireDefault(_TankEnemy);

var _Crate = require('./EnvironmentObjects/Crate.js');

var _Crate2 = _interopRequireDefault(_Crate);

var _Bush = require('./EnvironmentObjects/Bush.js');

var _Bush2 = _interopRequireDefault(_Bush);

var _Rock = require('./EnvironmentObjects/Rock.js');

var _Rock2 = _interopRequireDefault(_Rock);

var _Util = require('./Utilities/Util.js');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create the canvas
//http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 720;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "Graphics/Background.png";

// Game objects
var hero = new _Player2.default();
var enemies = [];
var environmentObjects = [];
enemies.push(new _LightEnemy2.default(500, 0));
enemies.push(new _RegularEnemy2.default(300, 0));
enemies.push(new _TankEnemy2.default(450, 0));
environmentObjects.push(new _Crate2.default(200, 400));
environmentObjects.push(new _Bush2.default(20, 100));
environmentObjects.push(new _Rock2.default(900, 20));

// Handle keyboard controls
var keysPressed = {};

addEventListener("keydown", function (e) {
	keysPressed[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysPressed[e.keyCode];
}, false);

var reset = function reset() {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
};

var isCollisionWithEnvironmentObject = function isCollisionWithEnvironmentObject() {
	for (var i = 0; i < environmentObjects.length; i++) {
		if (_Util2.default.isCollision(environmentObjects[i], hero) && environmentObjects[i].isBlocking) {
			return true;
		}
	}
	return false;
};

// Update game objects
var update = function update(modifier) {
	if (87 in keysPressed) {
		// Player holding up
		hero.y -= hero.speed * modifier;
		if (isCollisionWithEnvironmentObject()) {
			hero.y += hero.speed * modifier;
		}
	}
	if (83 in keysPressed) {
		// Player holding down
		hero.y += hero.speed * modifier;
		if (isCollisionWithEnvironmentObject()) {
			hero.y -= hero.speed * modifier;
		}
	}
	if (65 in keysPressed) {
		// Player holding left
		hero.x -= hero.speed * modifier;
		if (isCollisionWithEnvironmentObject()) {
			hero.x += hero.speed * modifier;
		}
	}
	if (68 in keysPressed) {
		// Player holding right
		hero.x += hero.speed * modifier;
		if (isCollisionWithEnvironmentObject()) {
			hero.x -= hero.speed * modifier;
		}
	}

	for (var i = 0; i < enemies.length; i++) {
		enemies[i].move(hero, modifier, environmentObjects);
		if (enemies[i].attackCooldown > 0) {
			enemies[i].attackCooldown -= 5;
		}
	}
	for (var _i = 0; _i < environmentObjects.length; _i++) {
		if (environmentObjects[_i].health <= 0) {
			environmentObjects.splice(_i, 1);
		}
	}
};

// Draw everything
var render = function render() {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (hero.isImageLoaded) {
		ctx.drawImage(hero.image, hero.x, hero.y);
	}

	for (var i = 0; i < enemies.length; i++) {
		if (enemies[i].isImageLoaded) {
			enemies[i].draw(ctx);
		}
	}

	for (var _i2 = 0; _i2 < environmentObjects.length; _i2++) {
		if (environmentObjects[_i2].isImageLoaded) {
			environmentObjects[_i2].draw(ctx);
		}
	}
};

// The main game loop
var main = function main() {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
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

},{"./Enemies/LightEnemy.js":2,"./Enemies/RegularEnemy.js":3,"./Enemies/TankEnemy.js":4,"./EnvironmentObjects/Bush.js":5,"./EnvironmentObjects/Crate.js":6,"./EnvironmentObjects/Rock.js":8,"./Players/Player.js":10,"./Utilities/Util.js":11}],10:[function(require,module,exports){
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
    }]);

    return Player;
}();

exports.default = Player;

},{}],11:[function(require,module,exports){
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
    }]);

    return Util;
}();

exports.default = Util;

},{}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJFbmVtaWVzL0VuZW15LmpzIiwiRW5lbWllcy9MaWdodEVuZW15LmpzIiwiRW5lbWllcy9SZWd1bGFyRW5lbXkuanMiLCJFbmVtaWVzL1RhbmtFbmVteS5qcyIsIkVudmlyb25tZW50T2JqZWN0cy9CdXNoLmpzIiwiRW52aXJvbm1lbnRPYmplY3RzL0NyYXRlLmpzIiwiRW52aXJvbm1lbnRPYmplY3RzL0Vudmlyb25tZW50T2JqZWN0LmpzIiwiRW52aXJvbm1lbnRPYmplY3RzL1JvY2suanMiLCJNYWluLmpzIiwiUGxheWVycy9QbGF5ZXIuanMiLCJVdGlsaXRpZXMvVXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztxakJDQUE7Ozs7OztBQU1BOzs7Ozs7OztBQUVBOzs7SUFHTSxLOztBQUVGOzs7Ozs7Ozs7QUFTQSxtQkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQixRQUFsQixFQUE0QixNQUE1QixFQUFvQyxNQUFwQyxFQUE0QyxZQUE1QyxFQUEwRDtBQUFBOztBQUN0RCxhQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsYUFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLGFBQUssS0FBTCxHQUFhLEtBQUssRUFBTCxHQUFRLENBQXJCO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLGFBQUssTUFBTCxHQUFjLE1BQWQ7QUFDQSxhQUFLLFlBQUwsR0FBb0IsWUFBcEI7QUFDQSxhQUFLLGNBQUwsR0FBc0IsQ0FBdEI7QUFDSDs7QUFFRDs7Ozs7Ozs7O2tDQUtVLEcsRUFBSztBQUFBOztBQUNYLGlCQUFLLGFBQUwsR0FBcUIsS0FBckI7QUFDQSxpQkFBSyxLQUFMLEdBQWEsSUFBSSxLQUFKLEVBQWI7QUFDQSxpQkFBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixZQUFNO0FBQ3RCLHNCQUFLLGFBQUwsR0FBcUIsSUFBckI7QUFDQSxzQkFBSyxLQUFMLEdBQWEsTUFBSyxLQUFMLENBQVcsS0FBeEI7QUFDQSxzQkFBSyxNQUFMLEdBQWMsTUFBSyxLQUFMLENBQVcsTUFBekI7QUFDSCxhQUpEO0FBS0EsaUJBQUssS0FBTCxDQUFXLEdBQVgsR0FBaUIsR0FBakI7QUFDSDs7QUFFRDs7Ozs7Ozs7K0JBS08sTSxFQUFRO0FBQ1gsbUJBQU8sTUFBUCxJQUFpQixLQUFLLE1BQXRCO0FBQ0EsaUJBQUssY0FBTCxJQUF1QixHQUF2QjtBQUNIOztBQUVEOzs7Ozs7Ozs7NkJBTUssTSxFQUFRLFEsRUFBVSxrQixFQUFvQjtBQUN2QyxnQkFBSSxRQUFRLE9BQU8sQ0FBUCxHQUFXLEtBQUssQ0FBNUI7QUFDQSxnQkFBSSxRQUFRLE9BQU8sQ0FBUCxHQUFXLEtBQUssQ0FBNUI7QUFDQSxnQkFBSSxTQUFTLEtBQUssSUFBTCxDQUFVLFFBQVEsS0FBUixHQUFnQixRQUFRLEtBQWxDLENBQWI7QUFDQSxnQkFBRyxXQUFXLENBQWQsRUFBaUI7QUFDYix5QkFBUyxNQUFUO0FBQ0EseUJBQVMsTUFBVDtBQUNIOztBQUVELGlCQUFLLEtBQUwsR0FBYSxLQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQWtCLEtBQWxCLENBQWI7O0FBRUEsZ0JBQUcsUUFBUSxDQUFYLEVBQWM7QUFDVixxQkFBSyxDQUFMLElBQVUsS0FBSyxRQUFMLEdBQWMsUUFBeEI7QUFDQSxvQkFBRyxLQUFLLGdDQUFMLENBQXNDLGtCQUF0QyxDQUFILEVBQThEO0FBQzFELHlCQUFLLENBQUwsSUFBVSxLQUFLLFFBQUwsR0FBYyxRQUF4QjtBQUNIO0FBQ0osYUFMRCxNQU1LLElBQUcsUUFBUSxDQUFYLEVBQWM7QUFDZixxQkFBSyxDQUFMLElBQVUsS0FBSyxRQUFMLEdBQWMsUUFBeEI7QUFDQSxvQkFBRyxLQUFLLGdDQUFMLENBQXNDLGtCQUF0QyxDQUFILEVBQThEO0FBQzFELHlCQUFLLENBQUwsSUFBVSxLQUFLLFFBQUwsR0FBYyxRQUF4QjtBQUNIO0FBQ0o7QUFDRCxnQkFBRyxRQUFRLENBQVgsRUFBYztBQUNWLHFCQUFLLENBQUwsSUFBVSxLQUFLLFFBQUwsR0FBYyxRQUF4QjtBQUNBLG9CQUFHLEtBQUssZ0NBQUwsQ0FBc0Msa0JBQXRDLENBQUgsRUFBOEQ7QUFDMUQseUJBQUssQ0FBTCxJQUFVLEtBQUssUUFBTCxHQUFjLFFBQXhCO0FBQ0g7QUFDSixhQUxELE1BTUssSUFBRyxRQUFRLENBQVgsRUFBYztBQUNmLHFCQUFLLENBQUwsSUFBVSxLQUFLLFFBQUwsR0FBYyxRQUF4QjtBQUNBLG9CQUFHLEtBQUssZ0NBQUwsQ0FBc0Msa0JBQXRDLENBQUgsRUFBOEQ7QUFDMUQseUJBQUssQ0FBTCxJQUFVLEtBQUssUUFBTCxHQUFjLFFBQXhCO0FBQ0g7QUFDSjs7QUFFRCxnQkFBRyxlQUFLLFdBQUwsQ0FBaUIsSUFBakIsRUFBdUIsTUFBdkIsS0FBa0MsS0FBSyxjQUFMLEtBQXdCLENBQTdELEVBQWdFO0FBQzVELHdCQUFRLEdBQVIsQ0FBWSx5QkFBeUIsT0FBTyxNQUE1QztBQUNBLHFCQUFLLE1BQUwsQ0FBWSxNQUFaO0FBQ0Esd0JBQVEsR0FBUixDQUFZLHdCQUF3QixPQUFPLE1BQTNDO0FBQ0g7QUFDSjs7QUFFRDs7Ozs7Ozs7O3lEQU1pQyxrQixFQUFvQjtBQUNqRCxpQkFBSSxJQUFJLElBQUksQ0FBWixFQUFlLElBQUksbUJBQW1CLE1BQXRDLEVBQThDLEdBQTlDLEVBQW1EO0FBQy9DLG9CQUFHLGVBQUssV0FBTCxDQUFpQixJQUFqQixFQUF1QixtQkFBbUIsQ0FBbkIsQ0FBdkIsS0FBaUQsbUJBQW1CLENBQW5CLEVBQXNCLFVBQTFFLEVBQXNGO0FBQ2xGLHdCQUFHLEtBQUssY0FBTCxLQUF3QixDQUEzQixFQUE4QjtBQUMxQiw2QkFBSyxNQUFMLENBQVksbUJBQW1CLENBQW5CLENBQVo7QUFDSDtBQUNELDJCQUFPLElBQVA7QUFDSDtBQUNKO0FBQ0QsbUJBQU8sS0FBUDtBQUNIOztBQUVEOzs7Ozs7OzZCQUlLLEcsRUFBSztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQUksU0FBSixDQUFjLEtBQUssS0FBbkIsRUFBMEIsS0FBSyxDQUEvQixFQUFrQyxLQUFLLENBQXZDO0FBQ0E7QUFDSDs7Ozs7O2tCQUdVLEs7Ozs7Ozs7Ozs7O0FDNUlmOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR00sVTs7O0FBRUY7Ozs7Ozs7QUFPQSxzQkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQjtBQUFBOztBQUFBLHdIQUNSLENBRFEsRUFDTCxDQURLLEVBQ0YsR0FERSxFQUNHLEVBREgsRUFDTyxFQURQLEVBQ1csRUFEWDs7QUFFZCx3SEFBZ0IseUJBQWhCO0FBRmM7QUFHakI7Ozs7O2tCQUdVLFU7Ozs7Ozs7Ozs7O0FDcEJmOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR00sWTs7O0FBRUY7Ozs7Ozs7QUFPQSx3QkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQjtBQUFBOztBQUFBLDRIQUNSLENBRFEsRUFDTCxDQURLLEVBQ0YsRUFERSxFQUNFLEVBREYsRUFDTSxFQUROLEVBQ1UsR0FEVjs7QUFFZCw0SEFBZ0IsMkJBQWhCO0FBRmM7QUFHakI7Ozs7O2tCQUdVLFk7Ozs7Ozs7Ozs7O0FDcEJmOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR00sUzs7O0FBRUY7Ozs7Ozs7QUFPQSxxQkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQjtBQUFBOztBQUFBLHNIQUNSLENBRFEsRUFDTCxDQURLLEVBQ0YsRUFERSxFQUNFLEdBREYsRUFDUSxFQURSLEVBQ1ksR0FEWjs7QUFFZCxzSEFBZ0Isd0JBQWhCO0FBRmM7QUFHakI7Ozs7O2tCQUdVLFM7Ozs7Ozs7Ozs7O0FDcEJmOzs7Ozs7Ozs7Ozs7SUFFTSxJOzs7QUFDRixrQkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQjtBQUFBOztBQUFBLGdIQUNSLENBRFEsRUFDTCxDQURLLEVBQ0YsTUFERSxFQUNNLEtBRE47O0FBRWQsZ0hBQWdCLG1CQUFoQjtBQUZjO0FBR2pCOzs7OztrQkFHVSxJOzs7Ozs7Ozs7OztBQ1RmOzs7Ozs7Ozs7Ozs7SUFFTSxLOzs7QUFDRixtQkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQjtBQUFBOztBQUFBLGtIQUNSLENBRFEsRUFDTCxDQURLLEVBQ0YsR0FERSxFQUNHLElBREg7O0FBRWQsa0hBQWdCLG9CQUFoQjtBQUZjO0FBR2pCOzs7OztrQkFHVSxLOzs7Ozs7Ozs7Ozs7O0lDVFQsaUI7QUFFRiwrQkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQixNQUFsQixFQUEwQixVQUExQixFQUFzQztBQUFBOztBQUNsQyxhQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsYUFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLGFBQUssTUFBTCxHQUFjLE1BQWQ7QUFDQSxhQUFLLFVBQUwsR0FBa0IsVUFBbEI7QUFDSDs7OztrQ0FFUyxHLEVBQUs7QUFBQTs7QUFDWCxpQkFBSyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0EsaUJBQUssS0FBTCxHQUFhLElBQUksS0FBSixFQUFiO0FBQ0EsaUJBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsWUFBTTtBQUN0QixzQkFBSyxhQUFMLEdBQXFCLElBQXJCO0FBQ0Esc0JBQUssS0FBTCxHQUFhLE1BQUssS0FBTCxDQUFXLEtBQXhCO0FBQ0Esc0JBQUssTUFBTCxHQUFjLE1BQUssS0FBTCxDQUFXLE1BQXpCO0FBQ0gsYUFKRDtBQUtBLGlCQUFLLEtBQUwsQ0FBVyxHQUFYLEdBQWlCLEdBQWpCO0FBQ0g7Ozs2QkFFSSxHLEVBQUs7QUFDTixnQkFBSSxTQUFKLENBQWMsS0FBSyxLQUFuQixFQUEwQixLQUFLLENBQS9CLEVBQWtDLEtBQUssQ0FBdkM7QUFDSDs7Ozs7O2tCQUdVLGlCOzs7Ozs7Ozs7OztBQ3pCZjs7Ozs7Ozs7Ozs7O0lBRU0sSTs7O0FBQ0Ysa0JBQVksQ0FBWixFQUFlLENBQWYsRUFBa0I7QUFBQTs7QUFBQSxnSEFDUixDQURRLEVBQ0wsQ0FESyxFQUNGLElBREUsRUFDSSxJQURKOztBQUVkLGdIQUFnQixtQkFBaEI7QUFGYztBQUdqQjs7Ozs7a0JBR1UsSTs7Ozs7QUNSZjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQVZBO0FBV0EsSUFBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFiO0FBQ0EsSUFBSSxNQUFNLE9BQU8sVUFBUCxDQUFrQixJQUFsQixDQUFWO0FBQ0EsT0FBTyxLQUFQLEdBQWUsSUFBZjtBQUNBLE9BQU8sTUFBUCxHQUFnQixHQUFoQjtBQUNBLFNBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsTUFBMUI7O0FBRUE7QUFDQSxJQUFJLFVBQVUsS0FBZDtBQUNBLElBQUksVUFBVSxJQUFJLEtBQUosRUFBZDtBQUNBLFFBQVEsTUFBUixHQUFpQixZQUFNO0FBQ3RCLFdBQVUsSUFBVjtBQUNBLENBRkQ7QUFHQSxRQUFRLEdBQVIsR0FBYyx5QkFBZDs7QUFFQTtBQUNBLElBQUksT0FBTyxzQkFBWDtBQUNBLElBQUksVUFBVSxFQUFkO0FBQ0EsSUFBSSxxQkFBcUIsRUFBekI7QUFDQSxRQUFRLElBQVIsQ0FBYSx5QkFBZSxHQUFmLEVBQW9CLENBQXBCLENBQWI7QUFDQSxRQUFRLElBQVIsQ0FBYSwyQkFBaUIsR0FBakIsRUFBc0IsQ0FBdEIsQ0FBYjtBQUNBLFFBQVEsSUFBUixDQUFhLHdCQUFjLEdBQWQsRUFBbUIsQ0FBbkIsQ0FBYjtBQUNBLG1CQUFtQixJQUFuQixDQUF3QixvQkFBVSxHQUFWLEVBQWUsR0FBZixDQUF4QjtBQUNBLG1CQUFtQixJQUFuQixDQUF3QixtQkFBUyxFQUFULEVBQWEsR0FBYixDQUF4QjtBQUNBLG1CQUFtQixJQUFuQixDQUF3QixtQkFBUyxHQUFULEVBQWMsRUFBZCxDQUF4Qjs7QUFFQTtBQUNBLElBQUksY0FBYyxFQUFsQjs7QUFFQSxpQkFBaUIsU0FBakIsRUFBNEIsVUFBQyxDQUFELEVBQU87QUFDbEMsYUFBWSxFQUFFLE9BQWQsSUFBeUIsSUFBekI7QUFDQSxDQUZELEVBRUcsS0FGSDs7QUFJQSxpQkFBaUIsT0FBakIsRUFBMEIsVUFBQyxDQUFELEVBQU87QUFDaEMsUUFBTyxZQUFZLEVBQUUsT0FBZCxDQUFQO0FBQ0EsQ0FGRCxFQUVHLEtBRkg7O0FBS0EsSUFBSSxRQUFRLFNBQVIsS0FBUSxHQUFNO0FBQ2pCLE1BQUssQ0FBTCxHQUFTLE9BQU8sS0FBUCxHQUFlLENBQXhCO0FBQ0EsTUFBSyxDQUFMLEdBQVMsT0FBTyxNQUFQLEdBQWdCLENBQXpCO0FBQ0EsQ0FIRDs7QUFLQSxJQUFJLG1DQUFtQyxTQUFuQyxnQ0FBbUMsR0FBTTtBQUN6QyxNQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksbUJBQW1CLE1BQXZDLEVBQStDLEdBQS9DLEVBQW9EO0FBQ2hELE1BQUksZUFBSyxXQUFMLENBQWlCLG1CQUFtQixDQUFuQixDQUFqQixFQUF3QyxJQUF4QyxLQUFpRCxtQkFBbUIsQ0FBbkIsRUFBc0IsVUFBM0UsRUFBdUY7QUFDNUYsVUFBTyxJQUFQO0FBQ007QUFDSjtBQUNELFFBQU8sS0FBUDtBQUNILENBUEQ7O0FBU0E7QUFDQSxJQUFJLFNBQVMsU0FBVCxNQUFTLENBQUMsUUFBRCxFQUFjO0FBQzFCLEtBQUksTUFBTSxXQUFWLEVBQXVCO0FBQUU7QUFDeEIsT0FBSyxDQUFMLElBQVUsS0FBSyxLQUFMLEdBQWEsUUFBdkI7QUFDQSxNQUFHLGtDQUFILEVBQXVDO0FBQzdCLFFBQUssQ0FBTCxJQUFVLEtBQUssS0FBTCxHQUFhLFFBQXZCO0FBQ0g7QUFDUDtBQUNELEtBQUksTUFBTSxXQUFWLEVBQXVCO0FBQUU7QUFDeEIsT0FBSyxDQUFMLElBQVUsS0FBSyxLQUFMLEdBQWEsUUFBdkI7QUFDTSxNQUFHLGtDQUFILEVBQXVDO0FBQ25DLFFBQUssQ0FBTCxJQUFVLEtBQUssS0FBTCxHQUFhLFFBQXZCO0FBQ0g7QUFDUDtBQUNELEtBQUksTUFBTSxXQUFWLEVBQXVCO0FBQUU7QUFDeEIsT0FBSyxDQUFMLElBQVUsS0FBSyxLQUFMLEdBQWEsUUFBdkI7QUFDTSxNQUFHLGtDQUFILEVBQXVDO0FBQ25DLFFBQUssQ0FBTCxJQUFVLEtBQUssS0FBTCxHQUFhLFFBQXZCO0FBQ0g7QUFDUDtBQUNELEtBQUksTUFBTSxXQUFWLEVBQXVCO0FBQUU7QUFDeEIsT0FBSyxDQUFMLElBQVUsS0FBSyxLQUFMLEdBQWEsUUFBdkI7QUFDTSxNQUFHLGtDQUFILEVBQXVDO0FBQ25DLFFBQUssQ0FBTCxJQUFVLEtBQUssS0FBTCxHQUFhLFFBQXZCO0FBQ0g7QUFDUDs7QUFFRCxNQUFJLElBQUksSUFBSSxDQUFaLEVBQWUsSUFBSSxRQUFRLE1BQTNCLEVBQW1DLEdBQW5DLEVBQXdDO0FBQ3ZDLFVBQVEsQ0FBUixFQUFXLElBQVgsQ0FBZ0IsSUFBaEIsRUFBc0IsUUFBdEIsRUFBZ0Msa0JBQWhDO0FBQ0EsTUFBRyxRQUFRLENBQVIsRUFBVyxjQUFYLEdBQTRCLENBQS9CLEVBQWtDO0FBQ2pDLFdBQVEsQ0FBUixFQUFXLGNBQVgsSUFBNkIsQ0FBN0I7QUFDQTtBQUNEO0FBQ0QsTUFBSSxJQUFJLEtBQUksQ0FBWixFQUFlLEtBQUksbUJBQW1CLE1BQXRDLEVBQThDLElBQTlDLEVBQW1EO0FBQ2xELE1BQUcsbUJBQW1CLEVBQW5CLEVBQXNCLE1BQXRCLElBQWdDLENBQW5DLEVBQXNDO0FBQ3JDLHNCQUFtQixNQUFuQixDQUEwQixFQUExQixFQUE2QixDQUE3QjtBQUNBO0FBQ0Q7QUFDRCxDQXJDRDs7QUF1Q0E7QUFDQSxJQUFJLFNBQVMsU0FBVCxNQUFTLEdBQU07QUFDbEIsS0FBRyxPQUFILEVBQVk7QUFDWCxNQUFJLFNBQUosQ0FBYyxPQUFkLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCO0FBQ0E7O0FBRUQsS0FBRyxLQUFLLGFBQVIsRUFBdUI7QUFDdEIsTUFBSSxTQUFKLENBQWMsS0FBSyxLQUFuQixFQUEwQixLQUFLLENBQS9CLEVBQWtDLEtBQUssQ0FBdkM7QUFDQTs7QUFFRSxNQUFJLElBQUksSUFBSSxDQUFaLEVBQWUsSUFBSSxRQUFRLE1BQTNCLEVBQW1DLEdBQW5DLEVBQXdDO0FBQ3BDLE1BQUcsUUFBUSxDQUFSLEVBQVcsYUFBZCxFQUE2QjtBQUNsQyxXQUFRLENBQVIsRUFBVyxJQUFYLENBQWdCLEdBQWhCO0FBQ0E7QUFDRTs7QUFFRCxNQUFJLElBQUksTUFBSSxDQUFaLEVBQWUsTUFBSSxtQkFBbUIsTUFBdEMsRUFBOEMsS0FBOUMsRUFBbUQ7QUFDckQsTUFBRyxtQkFBbUIsR0FBbkIsRUFBc0IsYUFBekIsRUFBd0M7QUFDdkMsc0JBQW1CLEdBQW5CLEVBQXNCLElBQXRCLENBQTJCLEdBQTNCO0FBQ0E7QUFDRDtBQUNELENBcEJEOztBQXNCQTtBQUNBLElBQUksT0FBTyxTQUFQLElBQU8sR0FBTTtBQUNoQixLQUFJLE1BQU0sS0FBSyxHQUFMLEVBQVY7QUFDQSxLQUFJLFFBQVEsTUFBTSxJQUFsQjs7QUFFQSxRQUFPLFFBQVEsSUFBZjtBQUNBOztBQUVBLFFBQU8sR0FBUDs7QUFFQTtBQUNBLHVCQUFzQixJQUF0QjtBQUNBLENBWEQ7O0FBYUE7QUFDQSx3QkFBd0IsT0FBTyxxQkFBUCxJQUNILE9BQU8sMkJBREosSUFFSCxPQUFPLHVCQUZKLElBR0gsT0FBTyx3QkFINUI7O0FBS0E7QUFDQSxJQUFJLE9BQU8sS0FBSyxHQUFMLEVBQVg7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0lDcEpNLE07QUFDSixzQkFBYztBQUFBOztBQUNWLGFBQUssTUFBTCxHQUFjLEdBQWQ7QUFDQSxhQUFLLEtBQUwsR0FBYSxHQUFiO0FBQ0EsYUFBSyxDQUFMLEdBQVMsR0FBVDtBQUNBLGFBQUssQ0FBTCxHQUFTLEdBQVQ7QUFDQSxhQUFLLFNBQUw7QUFDSDs7OztvQ0FFYTtBQUFBOztBQUNSLGlCQUFLLGFBQUwsR0FBcUIsS0FBckI7QUFDQSxpQkFBSyxLQUFMLEdBQWEsSUFBSSxLQUFKLEVBQWI7QUFDQSxpQkFBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixZQUFNO0FBQ3RCLHNCQUFLLGFBQUwsR0FBcUIsSUFBckI7QUFDQSxzQkFBSyxLQUFMLEdBQWEsTUFBSyxLQUFMLENBQVcsS0FBeEI7QUFDQSxzQkFBSyxNQUFMLEdBQWMsTUFBSyxLQUFMLENBQVcsTUFBekI7QUFDSCxhQUpEO0FBS0EsaUJBQUssS0FBTCxDQUFXLEdBQVgsR0FBaUIscUJBQWpCO0FBQ0g7Ozs7OztrQkFHVSxNOzs7Ozs7Ozs7Ozs7O0FDckJmOzs7OztBQUtBOzs7SUFHTSxJOzs7Ozs7Ozs7QUFFRjs7Ozs7OztvQ0FPbUIsVSxFQUFZLFUsRUFBWTtBQUN2QyxnQkFBRyxXQUFXLENBQVgsR0FBZSxXQUFXLENBQVgsR0FBZSxXQUFXLEtBQXpDLElBQ0MsV0FBVyxDQUFYLEdBQWUsV0FBVyxLQUExQixHQUFrQyxXQUFXLENBRDlDLElBRUMsV0FBVyxDQUFYLEdBQWUsV0FBVyxDQUFYLEdBQWUsV0FBVyxNQUYxQyxJQUdDLFdBQVcsQ0FBWCxHQUFlLFdBQVcsTUFBMUIsR0FBbUMsV0FBVyxDQUhsRCxFQUdxRDtBQUNqRCx1QkFBTyxJQUFQO0FBQ0gsYUFMRCxNQU1LO0FBQ0QsdUJBQU8sS0FBUDtBQUNIO0FBQ0o7Ozs7OztrQkFHVSxJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXHJcbiAqIFNvdXJjZXM6XHJcbiAqIGh0dHBzOi8vbWVkaXVtLmNvbS9AeXVyaWJldHQvamF2YXNjcmlwdC1hYnN0cmFjdC1tZXRob2Qtd2l0aC1lczYtNWRiZWE0YjAwMDI3XHJcbiAqIGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9STVkQVJwQVBsTmtcclxuICovXHJcblxyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIEVuZW15IGNsYXNzIGlzIHRoZSBwYXJlbnQgY2xhc3MgZm9yIGFsbCBvZiB0aGUgZW5lbWllcy5cclxuICovXHJcbmNsYXNzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSB2ZWxvY2l0eSBUaGUgdmVsb2NpdHkgb2YgdGhlIEVuZW15LlxyXG4gICAgICogQHBhcmFtIGhlYWx0aCBUaGUgaGVhbHRoIG9mIHRoZSBFbmVteS5cclxuICAgICAqIEBwYXJhbSBkYW1hZ2UgVGhlIGRhbWFnZSBvZiB0aGUgRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gcG9pbnRzT25LaWxsIFRoZSBwb2ludHMgcmV3YXJkZWQgZm9yIGtpbGxpbmcgdGhlIEVuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB2ZWxvY2l0eSwgaGVhbHRoLCBkYW1hZ2UsIHBvaW50c09uS2lsbCkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLmFuZ2xlID0gTWF0aC5QSS8yO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB2ZWxvY2l0eTtcclxuICAgICAgICB0aGlzLmhlYWx0aCA9IGhlYWx0aDtcclxuICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgICB0aGlzLnBvaW50c09uS2lsbCA9IHBvaW50c09uS2lsbDtcclxuICAgICAgICB0aGlzLmF0dGFja0Nvb2xkb3duID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBsb2FkSW1hZ2UgZnVuY3Rpb24gdGFrZXMgaW4gYSB1cmwgYW5kIGxvYWRzIGl0IGFzIGFuIEltYWdlLiBPbmNlIHRoZSBpbWFnZSBpcyBsb2FkZWQsIHRoaXMuaXNJbWFnZUxvYWRlZCBpc1xyXG4gICAgICogc2V0IHRvIHRydWUuIFRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBFbmVteSBhcmUgc2V0IHRvIHRoZSBoZWlnaHQgYW5kIHdpZHRoIG9mIHRoZSBpbWFnZS5cclxuICAgICAqIEBwYXJhbSB1cmwgVGhlIHVybCB0aGF0IHNob3VsZCBiZSBsb2FkZWQuXHJcbiAgICAgKi9cclxuICAgIGxvYWRJbWFnZSh1cmwpIHtcclxuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgYXR0YWNrIGZ1bmN0aW9uIHRha2VzIGluIGFuIG9iamVjdCBhbmQgcmVtb3ZlcyB0aGUgYW1vdW50IG9mIGRhbWFnZSB0aGUgRW5lbXkgZGVhbHMgZnJvbSB0aGVpciBoZWFsdGguXHJcbiAgICAgKiA1MDAgaXMgYWRkZWQgdG8gdGhlIGF0dGFjayBjb29sZG93biBvZiB0aGUgZW5lbXkgYWZ0ZXIgYW4gYXR0YWNrLlxyXG4gICAgICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0IHRoYXQgaXMgYmVpbmcgYXR0YWNrZWQuXHJcbiAgICAgKi9cclxuICAgIGF0dGFjayhvYmplY3QpIHtcclxuICAgICAgICBvYmplY3QuaGVhbHRoIC09IHRoaXMuZGFtYWdlO1xyXG4gICAgICAgIHRoaXMuYXR0YWNrQ29vbGRvd24gKz0gNTAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTW92ZXMgdGhlIGVuZW15IHRvd2FyZHMgdGhlIHBsYXllci5cclxuICAgICAqIEBwYXJhbSBwbGF5ZXIgVGhlIHBsYXllciBvYmplY3QgdG8gbW92ZSB0b3dhcmRzLlxyXG4gICAgICogQHBhcmFtIG1vZGlmaWVyIFRoZSBtb2RpZmllciB0byBiZSBtdWx0aXBsaWVkIGJ5IHRoZSB2ZWxvY2l0eS5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdHMgQW4gYXJyYXkgb2YgZW52aXJvbm1lbnQgb2JqZWN0cy5cclxuICAgICAqL1xyXG4gICAgbW92ZShwbGF5ZXIsIG1vZGlmaWVyLCBlbnZpcm9ubWVudE9iamVjdHMpIHtcclxuICAgICAgICBsZXQgZGlmZlggPSBwbGF5ZXIueCAtIHRoaXMueDtcclxuICAgICAgICBsZXQgZGlmZlkgPSBwbGF5ZXIueSAtIHRoaXMueTtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gTWF0aC5zcXJ0KGRpZmZYICogZGlmZlggKyBkaWZmWSAqIGRpZmZZKTtcclxuICAgICAgICBpZihsZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgZGlmZlggLz0gbGVuZ3RoO1xyXG4gICAgICAgICAgICBkaWZmWSAvPSBsZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFuZ2xlID0gTWF0aC5hdGFuMihkaWZmWSwgZGlmZlgpO1xyXG5cclxuICAgICAgICBpZihkaWZmWCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54IC09IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihkaWZmWCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy54IC09IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkqbW9kaWZpZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGlmZlkgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KGVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueSAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZGlmZlkgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMueSAtPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KGVudmlyb25tZW50T2JqZWN0cykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5Km1vZGlmaWVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIHBsYXllcikgJiYgdGhpcy5hdHRhY2tDb29sZG93biA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlYWx0aCBiZWZvcmUgYXR0YWNrXCIgKyBwbGF5ZXIuaGVhbHRoKTtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2socGxheWVyKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWFsdGggYWZ0ZXIgYXR0YWNrXCIgKyBwbGF5ZXIuaGVhbHRoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGEgaGVscGVyIGZ1bmN0aW9uIHVzZWQgYnkgdGhlIG1vdmUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIHRoZXJlIGlzIGEgY29sbGlzaW9uIGJldHdlZW4gYW5cclxuICAgICAqIGVudmlyb25tZW50IG9iamVjdCBhbmQgdGhlIGVuZW15LiBJZiB0aGVyZSBpcyBhIGNvbGxpc2lvbiwgdGhlIG9iamVjdCBpcyBhdHRhY2tlZC5cclxuICAgICAqIEBwYXJhbSBlbnZpcm9ubWVudE9iamVjdHMgQW4gYXJyYXkgb2YgZW52aXJvbm1lbnQgb2JqZWN0cy5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIGEgY29sbGlzaW9uIGV4aXN0cy5cclxuICAgICAqL1xyXG4gICAgaXNDb2xsaXNpb25XaXRoRW52aXJvbm1lbnRPYmplY3QoZW52aXJvbm1lbnRPYmplY3RzKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihVdGlsLmlzQ29sbGlzaW9uKHRoaXMsIGVudmlyb25tZW50T2JqZWN0c1tpXSkgJiYgZW52aXJvbm1lbnRPYmplY3RzW2ldLmlzQmxvY2tpbmcpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYXR0YWNrQ29vbGRvd24gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFjayhlbnZpcm9ubWVudE9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRyYXcgZnVuY3Rpb24gZHJhd3MgdGhlIGltYWdlIG9uIHRoZSBjYW52YXMgYXQgdGhlIHggYW5kIHkgcG9zaXRpb24gb2YgdGhlIExpZ2h0RW5lbXkuXHJcbiAgICAgKiBAcGFyYW0gY3R4IFRoZSBjb250ZXh0IG9mIHRoZSBjYW52YXMuXHJcbiAgICAgKi9cclxuICAgIGRyYXcoY3R4KSB7XHJcbiAgICAgICAgLy9jdHguc2F2ZSgpO1xyXG4gICAgICAgIC8vY3R4LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgLy9jdHgucm90YXRlKHRoaXMuYW5nbGUgKyBNYXRoLlBJLzIuMCk7XHJcbiAgICAgICAgLy9jdHgudHJhbnNsYXRlKC10aGlzLngsIC10aGlzLnkpO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54LCB0aGlzLnkpO1xyXG4gICAgICAgIC8vY3R4LnJlc3RvcmUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRW5lbXk7IiwiaW1wb3J0IEVuZW15IGZyb20gJy4vRW5lbXkuanMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBMaWdodEVuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBpcyBhIGZhc3QgZW5lbXkgd2l0aCBsb3cgaGVhbHRoLlxyXG4gKi9cclxuY2xhc3MgTGlnaHRFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBMaWdodEVuZW15LiBBIGNhbGwgaXMgbWFkZSB0byB0aGUgRW5lbXkgY2xhc3NlcyBjb25zdHJ1Y3RvciB3aXRoXHJcbiAgICAgKiB0aGUgaW5wdXR0ZWQgeCBhbmQgeSwgdGhlIHZlbG9jaXR5IHNldCB0byAxMjgsIHRoZSBoZWFsdGggc2V0IHRvIDEwLCB0aGUgZGFtYWdlIHNldCB0byAxMCwgYW5kIHRoZSBwb2ludHNPbktpbGxcclxuICAgICAqIHNldCB0byA1MC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBMaWdodEVuZW15LlxyXG4gICAgICogQHBhcmFtIHkgVGhlIHkgcG9zaXRpb24gb2YgdGhlIExpZ2h0RW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCAxMjgsIDEwLCAxMCwgNTApO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0xpZ2h0RW5lbXkucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaWdodEVuZW15OyIsImltcG9ydCBFbmVteSBmcm9tICcuL0VuZW15LmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUmVndWxhckVuZW15IGNsYXNzIGV4dGVuZHMgdGhlIEVuZW15IGNsYXNzLiBJdCBoYXMgYmFsYW5jZWQgc3RhdHMgYWNyb3NzIHRoZSBib2FyZC5cclxuICovXHJcbmNsYXNzIFJlZ3VsYXJFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBSZWd1bGFyRW5lbXkuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDY0LCB0aGUgaGVhbHRoIHNldCB0byAyNSwgdGhlIGRhbWFnZSBzZXQgdG8gMTAsIGFuZCB0aGUgcG9pbnRzT25LaWxsXHJcbiAgICAgKiBzZXQgdG8gMTAwLlxyXG4gICAgICogQHBhcmFtIHggVGhlIHggcG9zaXRpb24gb2YgdGhlIFJlZ3VsYXJFbmVteS5cclxuICAgICAqIEBwYXJhbSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSBSZWd1bGFyRW5lbXkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCA2NCwgMjUsIDEwLCAxMDApO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1JlZ3VsYXJFbmVteS5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlZ3VsYXJFbmVteTsiLCJpbXBvcnQgRW5lbXkgZnJvbSAnLi9FbmVteS5qcyc7XHJcblxyXG4vKipcclxuICogVGhlIFRhbmtFbmVteSBjbGFzcyBleHRlbmRzIHRoZSBFbmVteSBjbGFzcy4gSXQgaXMgYSBzbG93IGVuZW15IHdpdGggaGlnaCBoZWFsdGggYW5kIGRhbWFnZS5cclxuICovXHJcbmNsYXNzIFRhbmtFbmVteSBleHRlbmRzIEVuZW15IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBpbml0aWFsaXplcyB0aGUgZmllbGRzIG9mIHRoZSBUYW5rRW5lbXkuIEEgY2FsbCBpcyBtYWRlIHRvIHRoZSBFbmVteSBjbGFzc2VzIGNvbnN0cnVjdG9yIHdpdGhcclxuICAgICAqIHRoZSBpbnB1dHRlZCB4IGFuZCB5LCB0aGUgdmVsb2NpdHkgc2V0IHRvIDMyLCB0aGUgaGVhbHRoIHNldCB0byAxMDAsIHRoZSBkYW1hZ2Ugc2V0IHRvIDI1LCBhbmQgdGhlIHBvaW50c09uS2lsbFxyXG4gICAgICogc2V0IHRvIDUwMC5cclxuICAgICAqIEBwYXJhbSB4IFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBUYW5rRW5lbXkuXHJcbiAgICAgKiBAcGFyYW0geSBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgVGFua0VuZW15LlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgMzIsIDEwMCwgIDI1LCA1MDApO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1RhbmtFbmVteS5wbmdcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhbmtFbmVteTsiLCJpbXBvcnQgRW52aXJvbm1lbnRPYmplY3QgZnJvbSAnLi9FbnZpcm9ubWVudE9iamVjdC5qcyc7XHJcblxyXG5jbGFzcyBCdXNoIGV4dGVuZHMgRW52aXJvbm1lbnRPYmplY3Qge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDEwMDAwMCwgZmFsc2UpO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL0J1c2gucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXNoOyIsImltcG9ydCBFbnZpcm9ubWVudE9iamVjdCBmcm9tICcuL0Vudmlyb25tZW50T2JqZWN0LmpzJztcclxuXHJcbmNsYXNzIENyYXRlIGV4dGVuZHMgRW52aXJvbm1lbnRPYmplY3Qge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDUwMCwgdHJ1ZSk7XHJcbiAgICAgICAgc3VwZXIubG9hZEltYWdlKFwiR3JhcGhpY3MvQ3JhdGUucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDcmF0ZTsiLCJjbGFzcyBFbnZpcm9ubWVudE9iamVjdCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgaGVhbHRoLCBpc0Jsb2NraW5nKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuaGVhbHRoID0gaGVhbHRoO1xyXG4gICAgICAgIHRoaXMuaXNCbG9ja2luZyA9IGlzQmxvY2tpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEltYWdlKHVybCkge1xyXG4gICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pc0ltYWdlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHVybDtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3KGN0eCkge1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54LCB0aGlzLnkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFbnZpcm9ubWVudE9iamVjdDsiLCJpbXBvcnQgRW52aXJvbm1lbnRPYmplY3QgZnJvbSAnLi9FbnZpcm9ubWVudE9iamVjdC5qcyc7XHJcblxyXG5jbGFzcyBSb2NrIGV4dGVuZHMgRW52aXJvbm1lbnRPYmplY3Qge1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDMwMDAsIHRydWUpO1xyXG4gICAgICAgIHN1cGVyLmxvYWRJbWFnZShcIkdyYXBoaWNzL1JvY2sucG5nXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSb2NrOyIsIi8vaHR0cDovL3d3dy5sb3N0ZGVjYWRlZ2FtZXMuY29tL2hvdy10by1tYWtlLWEtc2ltcGxlLWh0bWw1LWNhbnZhcy1nYW1lL1xyXG5pbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVycy9QbGF5ZXIuanMnO1xyXG5pbXBvcnQgTGlnaHRFbmVteSBmcm9tICcuL0VuZW1pZXMvTGlnaHRFbmVteS5qcyc7XHJcbmltcG9ydCBSZWd1bGFyRW5lbXkgZnJvbSAnLi9FbmVtaWVzL1JlZ3VsYXJFbmVteS5qcyc7XHJcbmltcG9ydCBUYW5rRW5lbXkgZnJvbSAnLi9FbmVtaWVzL1RhbmtFbmVteS5qcyc7XHJcbmltcG9ydCBDcmF0ZSBmcm9tICcuL0Vudmlyb25tZW50T2JqZWN0cy9DcmF0ZS5qcyc7XHJcbmltcG9ydCBCdXNoIGZyb20gJy4vRW52aXJvbm1lbnRPYmplY3RzL0J1c2guanMnO1xyXG5pbXBvcnQgUm9jayBmcm9tICcuL0Vudmlyb25tZW50T2JqZWN0cy9Sb2NrLmpzJztcclxuaW1wb3J0IFV0aWwgZnJvbSAnLi9VdGlsaXRpZXMvVXRpbC5qcyc7XHJcblxyXG4vLyBDcmVhdGUgdGhlIGNhbnZhc1xyXG5sZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxubGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbmNhbnZhcy53aWR0aCA9IDEyODA7XHJcbmNhbnZhcy5oZWlnaHQgPSA3MjA7XHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcclxuXHJcbi8vIEJhY2tncm91bmQgaW1hZ2VcclxubGV0IGJnUmVhZHkgPSBmYWxzZTtcclxubGV0IGJnSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuYmdJbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcblx0YmdSZWFkeSA9IHRydWU7XHJcbn07XHJcbmJnSW1hZ2Uuc3JjID0gXCJHcmFwaGljcy9CYWNrZ3JvdW5kLnBuZ1wiO1xyXG5cclxuLy8gR2FtZSBvYmplY3RzXHJcbmxldCBoZXJvID0gbmV3IFBsYXllcigpO1xyXG5sZXQgZW5lbWllcyA9IFtdO1xyXG5sZXQgZW52aXJvbm1lbnRPYmplY3RzID0gW107XHJcbmVuZW1pZXMucHVzaChuZXcgTGlnaHRFbmVteSg1MDAsIDApKTtcclxuZW5lbWllcy5wdXNoKG5ldyBSZWd1bGFyRW5lbXkoMzAwLCAwKSk7XHJcbmVuZW1pZXMucHVzaChuZXcgVGFua0VuZW15KDQ1MCwgMCkpO1xyXG5lbnZpcm9ubWVudE9iamVjdHMucHVzaChuZXcgQ3JhdGUoMjAwLCA0MDApKTtcclxuZW52aXJvbm1lbnRPYmplY3RzLnB1c2gobmV3IEJ1c2goMjAsIDEwMCkpO1xyXG5lbnZpcm9ubWVudE9iamVjdHMucHVzaChuZXcgUm9jayg5MDAsIDIwKSk7XHJcblxyXG4vLyBIYW5kbGUga2V5Ym9hcmQgY29udHJvbHNcclxubGV0IGtleXNQcmVzc2VkID0ge307XHJcblxyXG5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xyXG5cdGtleXNQcmVzc2VkW2Uua2V5Q29kZV0gPSB0cnVlO1xyXG59LCBmYWxzZSk7XHJcblxyXG5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcclxuXHRkZWxldGUga2V5c1ByZXNzZWRbZS5rZXlDb2RlXTtcclxufSwgZmFsc2UpO1xyXG5cclxuXHJcbmxldCByZXNldCA9ICgpID0+IHtcclxuXHRoZXJvLnggPSBjYW52YXMud2lkdGggLyAyO1xyXG5cdGhlcm8ueSA9IGNhbnZhcy5oZWlnaHQgLyAyO1xyXG59O1xyXG5cclxubGV0IGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0ID0gKCkgPT4ge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoVXRpbC5pc0NvbGxpc2lvbihlbnZpcm9ubWVudE9iamVjdHNbaV0sIGhlcm8pICYmIGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0Jsb2NraW5nKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbi8vIFVwZGF0ZSBnYW1lIG9iamVjdHNcclxubGV0IHVwZGF0ZSA9IChtb2RpZmllcikgPT4ge1xyXG5cdGlmICg4NyBpbiBrZXlzUHJlc3NlZCkgeyAvLyBQbGF5ZXIgaG9sZGluZyB1cFxyXG5cdFx0aGVyby55IC09IGhlcm8uc3BlZWQgKiBtb2RpZmllcjtcclxuXHRcdGlmKGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KCkpIHtcclxuICAgICAgICAgICAgaGVyby55ICs9IGhlcm8uc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICB9XHJcblx0fVxyXG5cdGlmICg4MyBpbiBrZXlzUHJlc3NlZCkgeyAvLyBQbGF5ZXIgaG9sZGluZyBkb3duXHJcblx0XHRoZXJvLnkgKz0gaGVyby5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgIGlmKGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KCkpIHtcclxuICAgICAgICAgICAgaGVyby55IC09IGhlcm8uc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICB9XHJcblx0fVxyXG5cdGlmICg2NSBpbiBrZXlzUHJlc3NlZCkgeyAvLyBQbGF5ZXIgaG9sZGluZyBsZWZ0XHJcblx0XHRoZXJvLnggLT0gaGVyby5zcGVlZCAqIG1vZGlmaWVyO1xyXG4gICAgICAgIGlmKGlzQ29sbGlzaW9uV2l0aEVudmlyb25tZW50T2JqZWN0KCkpIHtcclxuICAgICAgICAgICAgaGVyby54ICs9IGhlcm8uc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICB9XHJcblx0fVxyXG5cdGlmICg2OCBpbiBrZXlzUHJlc3NlZCkgeyAvLyBQbGF5ZXIgaG9sZGluZyByaWdodFxyXG5cdFx0aGVyby54ICs9IGhlcm8uc3BlZWQgKiBtb2RpZmllcjtcclxuICAgICAgICBpZihpc0NvbGxpc2lvbldpdGhFbnZpcm9ubWVudE9iamVjdCgpKSB7XHJcbiAgICAgICAgICAgIGhlcm8ueCAtPSBoZXJvLnNwZWVkICogbW9kaWZpZXI7XHJcbiAgICAgICAgfVxyXG5cdH1cclxuXHJcblx0Zm9yKGxldCBpID0gMDsgaSA8IGVuZW1pZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGVuZW1pZXNbaV0ubW92ZShoZXJvLCBtb2RpZmllciwgZW52aXJvbm1lbnRPYmplY3RzKTtcclxuXHRcdGlmKGVuZW1pZXNbaV0uYXR0YWNrQ29vbGRvd24gPiAwKSB7XHJcblx0XHRcdGVuZW1pZXNbaV0uYXR0YWNrQ29vbGRvd24gLT0gNTtcclxuXHRcdH1cclxuXHR9XHJcblx0Zm9yKGxldCBpID0gMDsgaSA8IGVudmlyb25tZW50T2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0aWYoZW52aXJvbm1lbnRPYmplY3RzW2ldLmhlYWx0aCA8PSAwKSB7XHJcblx0XHRcdGVudmlyb25tZW50T2JqZWN0cy5zcGxpY2UoaSwgMSk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuLy8gRHJhdyBldmVyeXRoaW5nXHJcbmxldCByZW5kZXIgPSAoKSA9PiB7XHJcblx0aWYoYmdSZWFkeSkge1xyXG5cdFx0Y3R4LmRyYXdJbWFnZShiZ0ltYWdlLCAwLCAwKTtcclxuXHR9XHJcblxyXG5cdGlmKGhlcm8uaXNJbWFnZUxvYWRlZCkge1xyXG5cdFx0Y3R4LmRyYXdJbWFnZShoZXJvLmltYWdlLCBoZXJvLngsIGhlcm8ueSk7XHJcblx0fVxyXG5cclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbmVtaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYoZW5lbWllc1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcblx0XHRcdGVuZW1pZXNbaV0uZHJhdyhjdHgpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnZpcm9ubWVudE9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGlmKGVudmlyb25tZW50T2JqZWN0c1tpXS5pc0ltYWdlTG9hZGVkKSB7XHJcblx0XHRcdGVudmlyb25tZW50T2JqZWN0c1tpXS5kcmF3KGN0eCk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuLy8gVGhlIG1haW4gZ2FtZSBsb29wXHJcbmxldCBtYWluID0gKCkgPT4ge1xyXG5cdGxldCBub3cgPSBEYXRlLm5vdygpO1xyXG5cdGxldCBkZWx0YSA9IG5vdyAtIHRoZW47XHJcblxyXG5cdHVwZGF0ZShkZWx0YSAvIDEwMDApO1xyXG5cdHJlbmRlcigpO1xyXG5cclxuXHR0aGVuID0gbm93O1xyXG5cclxuXHQvLyBSZXF1ZXN0IHRvIGRvIHRoaXMgYWdhaW4gQVNBUFxyXG5cdHJlcXVlc3RBbmltYXRpb25GcmFtZShtYWluKTtcclxufTtcclxuXHJcbi8vIENyb3NzLWJyb3dzZXIgc3VwcG9ydCBmb3IgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuXHQgICAgICAgICAgICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuXHQgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG5cdCAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZTtcclxuXHJcbi8vIExldCdzIHBsYXkgdGhpcyBnYW1lIVxyXG5sZXQgdGhlbiA9IERhdGUubm93KCk7XHJcbnJlc2V0KCk7XHJcbm1haW4oKTsiLCJjbGFzcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICB0aGlzLmhlYWx0aCA9IDEwMDtcclxuICAgICAgdGhpcy5zcGVlZCA9IDI1NjtcclxuICAgICAgdGhpcy54ID0gMjUwO1xyXG4gICAgICB0aGlzLnkgPSAyNTA7XHJcbiAgICAgIHRoaXMubG9hZEltYWdlKCk7XHJcbiAgfVxyXG5cclxuICAgIGxvYWRJbWFnZSgpIHtcclxuICAgICAgICB0aGlzLmlzSW1hZ2VMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbWFnZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBcIkdyYXBoaWNzL1BsYXllci5wbmdcIjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyOyIsIi8qKlxyXG4gKiBTb3VyY2VzOlxyXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0dhbWVzL1RlY2huaXF1ZXMvMkRfY29sbGlzaW9uX2RldGVjdGlvblxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgVXRpbCBjbGFzcyBjb250YWlucyB2YXJpb3VzIHV0aWxpdHkgZnVuY3Rpb25zLlxyXG4gKi9cclxuY2xhc3MgVXRpbCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgaXNDb2xsaXNpb24gbWV0aG9kIGNoZWNrcyBpZiB0aGVyZSBpcyBhIGNvbGxpc2lvbiBiZXR3ZWVuIHRoZSB0d28gaW5wdXR0ZWQgcmVjdGFuZ2xlcy4gVGhpcyBhbGdvcml0aG0gb25seVxyXG4gICAgICogd29ya3Mgd2l0aCBheGlzLWFsaWduZWQgcmVjdGFuZ2xlcy5cclxuICAgICAqIEBwYXJhbSByZWN0YW5nbGUxIFRoZSBmaXJzdCByZWN0YW5nbGUuXHJcbiAgICAgKiBAcGFyYW0gcmVjdGFuZ2xlMiBUaGUgc2Vjb25kIHJlY3RhbmdsZS5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIHRoZXJlIGV4aXN0cyBhIGNvbGxpc2lvbiBiZXR3ZWVuIHRoZSB0d28gaW5wdXR0ZWQgcmVjdGFuZ2xlcy5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzQ29sbGlzaW9uKHJlY3RhbmdsZTEsIHJlY3RhbmdsZTIpIHtcclxuICAgICAgICBpZihyZWN0YW5nbGUxLnggPCByZWN0YW5nbGUyLnggKyByZWN0YW5nbGUyLndpZHRoICYmXHJcbiAgICAgICAgICAgIHJlY3RhbmdsZTEueCArIHJlY3RhbmdsZTEud2lkdGggPiByZWN0YW5nbGUyLnggJiZcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMS55IDwgcmVjdGFuZ2xlMi55ICsgcmVjdGFuZ2xlMi5oZWlnaHQgJiZcclxuICAgICAgICAgICAgcmVjdGFuZ2xlMS55ICsgcmVjdGFuZ2xlMS5oZWlnaHQgPiByZWN0YW5nbGUyLnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVdGlsOyJdfQ==
