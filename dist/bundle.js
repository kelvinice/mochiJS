(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gameObject = require("./gameObject");

var _gameObject2 = _interopRequireDefault(_gameObject);

var _asset = require("./asset");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PersonAnimation = function (_GameObject) {
    _inherits(PersonAnimation, _GameObject);

    function PersonAnimation(img) {
        var _ref;

        _classCallCheck(this, PersonAnimation);

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = PersonAnimation.__proto__ || Object.getPrototypeOf(PersonAnimation)).call.apply(_ref, [this].concat(args)));

        _this.img = img;
        _this.sprites = (0, _asset.splitSprite)(img, 8, 1);
        _this.spriteSize = 8;
        _this.spriteIdx = 0;
        _this.lastTime = Date.now();
        _this.lapseTime = 0;
        _this.timePerFrame = 100;
        return _this;
    }

    _createClass(PersonAnimation, [{
        key: "draw",
        value: function draw(ctx) {
            var now = Date.now();
            this.lapseTime += now - this.lastTime;
            this.lastTime = now;
            if (this.lapseTime >= this.timePerFrame) {
                this.lapseTime %= this.timePerFrame;
                this.spriteIdx = (this.spriteIdx + 1) % this.spriteSize;
            }

            var currentSprite = this.sprites[this.spriteIdx];
            ctx.drawImage(this.img, currentSprite.x, currentSprite.y, currentSprite.width, currentSprite.height, this.x, this.y, this.width, this.height);
        }
    }, {
        key: "update",
        value: function update() {}
    }]);

    return PersonAnimation;
}(_gameObject2.default);

exports.default = PersonAnimation;

},{"./asset":2,"./gameObject":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.splitSprite = splitSprite;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AssetManager = function () {
    function AssetManager() {
        _classCallCheck(this, AssetManager);

        this.ipaths = [];
        this.assetDone = null;
        this.images = [];
        this.doneCount = 0;
        this.loadedImage = {};
    }

    _createClass(AssetManager, [{
        key: "addPath",
        value: function addPath(name, path) {
            this.ipaths.push({
                "name": name,
                "path": path
            });
        }
    }, {
        key: "addAssetDoneListener",
        value: function addAssetDoneListener(assetDone) {
            this.assetDone = assetDone;
        }
    }, {
        key: "loadAsset",
        value: function loadAsset() {
            var _this = this;

            var clonePaths = [].concat(_toConsumableArray(this.ipaths));
            clonePaths.forEach(function (c) {
                var name = c["name"];
                var path = c["path"];

                var img = new Image();
                img.src = "./assets/images/" + path;
                img.onload = function () {
                    _this.loadedImage[name] = img;
                    _this.doneCount++;

                    _this.check();
                };
            });
        }
    }, {
        key: "check",
        value: function check() {
            if (this.doneCount == this.ipaths.length) {
                this.assetDone();
            }
        }
    }, {
        key: "loadImage",
        value: function loadImage(path) {
            var img = new Image();
            img.src = "./assets/images/" + path;
            return img;
        }
    }]);

    return AssetManager;
}();

exports.default = AssetManager;
function splitSprite(image, horizontalCount, verticalCount) {
    var spriteDatas = [];
    var spriteWidth = image.width / horizontalCount;
    var spriteHeight = image.height / verticalCount;
    for (var i = 0; i < verticalCount; i++) {
        for (var j = 0; j < horizontalCount; j++) {
            spriteDatas.push({ "x": spriteWidth * j, "y": spriteHeight * i, "width": spriteWidth, "height": spriteHeight });
        }
    }
    return spriteDatas;
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gameObject = require("./gameObject");

var _gameObject2 = _interopRequireDefault(_gameObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ball = function (_GameObject) {
    _inherits(Ball, _GameObject);

    function Ball() {
        var _ref;

        _classCallCheck(this, Ball);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Ball.__proto__ || Object.getPrototypeOf(Ball)).call.apply(_ref, [this].concat(args)));

        _this.velX = 1;
        _this.velY = 1;
        _this.isCollide = false;
        return _this;
    }

    _createClass(Ball, [{
        key: "draw",
        value: function draw(ctx) {
            if (this.isCollide) {
                ctx.fillStyle = "red";
            } else {
                ctx.fillStyle = "white";
            }
            ctx.fillRect(this.x, this.y, 100, 100);
            // ctx.beginPath();
            // ctx.arc(this.x+(this.width/2),this.y+(this.width/2),(this.width/2),0,360);
            // ctx.fill();
            // ctx.closePath();
        }
    }, {
        key: "update",
        value: function update() {
            this.x += this.velX * 5;
            this.y += this.velY * 5;

            if (this.x + this.width >= width || this.x <= 0) {
                this.velX *= -1;
            }
            if (this.y + this.height >= height || this.y <= 0) {
                this.velY *= -1;
            }
            this.isCollide = false;
        }
    }]);

    return Ball;
}(_gameObject2.default);

exports.default = Ball;

},{"./gameObject":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameObject = function () {
    function GameObject(x, y, width, height) {
        _classCallCheck(this, GameObject);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    _createClass(GameObject, [{
        key: "draw",
        value: function draw(ctx) {
            throw "You must define function to draw!";
        }
    }, {
        key: "update",
        value: function update() {
            throw "You must define function to update!";
        }
    }, {
        key: "isIntersect",
        value: function isIntersect(g) {
            return this.x <= g.x + g.width && this.x + this.width >= g.x && this.y <= g.y + g.height && this.y + this.height >= g.y;
        }
    }, {
        key: "isHorizontalLinearIntersect",
        value: function isHorizontalLinearIntersect(g) {
            return this.x <= g.x + g.width && this.x + this.width >= g.x && this.y <= g.y + g.height / 2 && this.y + this.height >= g.y + g.height / 2;
        }
    }, {
        key: "isIn",
        value: function isIn(x, y) {
            return this.x <= x && this.x + this.width >= x && this.y <= y && this.y + this.height >= y;
        }
    }]);

    return GameObject;
}();

exports.default = GameObject;

var AnimatedGameObject = function (_GameObject) {
    _inherits(AnimatedGameObject, _GameObject);

    function AnimatedGameObject() {
        _classCallCheck(this, AnimatedGameObject);

        return _possibleConstructorReturn(this, (AnimatedGameObject.__proto__ || Object.getPrototypeOf(AnimatedGameObject)).apply(this, arguments));
    }

    return AnimatedGameObject;
}(GameObject);

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mochi = function () {
    function Mochi(canvas) {
        _classCallCheck(this, Mochi);

        this.canvas = canvas;
        this.reactiveListener = null;
    }

    /**
     * @description maximize canvas width and height
     */


    _createClass(Mochi, [{
        key: "setMaximize",
        value: function setMaximize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }, {
        key: "resizeCanvas",
        value: function resizeCanvas() {
            this.setMaximize();
            if (this.reactiveListener != null) {
                this.reactiveListener(this.getWidthCanvas(), this.getHeightCanvas());
            }
        }
    }, {
        key: "makeWindowReactive",
        value: function makeWindowReactive() {
            var _this = this;

            window.addEventListener('resize', function () {
                return _this.resizeCanvas();
            }, false);
        }
    }, {
        key: "setReactiveListener",
        value: function setReactiveListener(reactiveListener) {
            this.reactiveListener = reactiveListener;
        }
    }, {
        key: "getContext2d",
        value: function getContext2d() {
            return this.canvas.getContext("2d");
        }
    }, {
        key: "getWidthCanvas",
        value: function getWidthCanvas() {
            return this.canvas.width;
        }
    }, {
        key: "getHeightCanvas",
        value: function getHeightCanvas() {
            return this.canvas.height;
        }
    }]);

    return Mochi;
}();

exports.default = Mochi;

},{}],6:[function(require,module,exports){
'use strict';

var _mochi = require('./game/mochi');

var _mochi2 = _interopRequireDefault(_mochi);

var _ball = require('./game/ball');

var _ball2 = _interopRequireDefault(_ball);

var _animation = require('./game/animation');

var _animation2 = _interopRequireDefault(_animation);

var _asset = require('./game/asset');

var _asset2 = _interopRequireDefault(_asset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ctx = null;
var width = 0;
var height = 0;
var balls = [];
var guy = null;

window.onload = function () {
    function init() {
        var canv = document.getElementById("game-canvas");
        var mochi = new _mochi2.default(canv);
        ctx = mochi.getContext2d();
        mochi.setMaximize();
        mochi.setReactiveListener(handleWindowListener);

        width = mochi.getWidthCanvas();
        height = mochi.getHeightCanvas();

        mochi.makeWindowReactive();
        var am = new _asset2.default();

        var img = am.loadImage("guy.png");
        img.onload = function () {
            guy = new _animation2.default(img, 0, 0, 100, 200);
            setInterval(update, 1000 / 60);
            requestAnimationFrame(render);
        };

        balls.push(new _ball2.default(0, 0, 100, 100));
        balls.push(new _ball2.default(300, 200, 100, 100));
        balls.push(new _ball2.default(400, 600, 100, 100));
        balls.push(new _ball2.default(600, 200, 100, 100));
        balls.push(new _ball2.default(700, 300, 100, 100));
    }

    function render() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);

        balls.forEach(function (b) {
            b.draw(ctx);
        });
        guy.draw(ctx);

        requestAnimationFrame(render);
    }

    function update() {
        balls.forEach(function (b) {
            b.update();
        });

        for (var i = 0; i < balls.length; i++) {
            for (var j = i + 1; j < balls.length; j++) {
                if (balls[i].isIntersect(balls[j])) {
                    balls[i].isCollide = true;
                    balls[j].isCollide = true;

                    var difX = Math.abs(balls[i].x - balls[j].x);
                    var difY = Math.abs(balls[i].y - balls[j].y);

                    var xPercentage = difX / (difX + difY);
                    var yPercentage = difY / (difX + difY);

                    if (balls[i].x < balls[j].x) {
                        balls[i].velX = -2 * xPercentage;
                        balls[j].velX = 2 * xPercentage;
                    } else {
                        balls[i].velX = 2 * xPercentage;
                        balls[j].velX = -2 * xPercentage;
                    }

                    if (balls[i].y < balls[j].y) {
                        balls[i].velY = -2 * yPercentage;
                        balls[j].velY = 2 * yPercentage;
                    } else {
                        balls[i].velY = 2 * yPercentage;
                        balls[j].velY = -2 * yPercentage;
                    }
                }
            }
        }
    }

    function handleWindowListener(w, h) {
        width = w;
        height = h;
    }

    init();
};

},{"./game/animation":1,"./game/asset":2,"./game/ball":3,"./game/mochi":5}]},{},[6]);
