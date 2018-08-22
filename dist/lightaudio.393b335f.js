// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"..\\..\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"..\\..\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"..\\..\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\bundle-url.js"}],"css\\style.scss":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"..\\..\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\css-loader.js"}],"js\\CircularMode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CircularMode = exports.CircularMode = function () {
    function CircularMode(options) {
        _classCallCheck(this, CircularMode);

        this.canvas = options.canvas;
        this.ctx = options.ctx;
        this.color = options.color;
    }

    _createClass(CircularMode, [{
        key: "draw",
        value: function draw(data) {
            var start_angle = 0;
            for (var dataValue in data) {
                var val = data[dataValue];
                var slice_angle = 2 * Math.PI * val / 360;

                this.drawPieSlice(this.ctx, this.canvas.width / 2, this.canvas.height / 2, 0.7 * Math.min(this.canvas.width / 2, this.canvas.height / 2, Math.max((this.canvas.width / 2, this.canvas.height / 2) - val, 0)), start_angle, start_angle + slice_angle, this.color);

                start_angle += slice_angle;
            }
        }
    }, {
        key: "drawPieSlice",
        value: function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fill();
        }
    }]);

    return CircularMode;
}();
},{}],"js\\LightAudio.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LightAudio = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CircularMode = require("./CircularMode");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LightAudio = exports.LightAudio = function () {
    function LightAudio(options) {
        _classCallCheck(this, LightAudio);

        this.parent = options.parent;
        this.audioTitle = options.audioTitle || "";
        var _thumb = options.thumbnail || this.parent.querySelector("img");
        var _audio = this.parent.querySelector("audio");

        this.removeUnsusedElements(_thumb, _audio);

        var _rgb = this.getAverageRGB(this.thumbnail);
        this.color = options.color || "rgba(" + (255 - _rgb.r) + ", " + (255 - _rgb.g) + ", " + (255 - _rgb.b) + ", 0.7)";

        this.thumbnail.style.display = "none";
        this.init();
        this.textX = 5;
    }

    _createClass(LightAudio, [{
        key: "init",
        value: function init() {
            this.initCanvas();
            this.initAudio();
        }
    }, {
        key: "removeUnsusedElements",
        value: function removeUnsusedElements(_thumb, _audio) {
            this.thumbnail = _thumb.cloneNode(true);
            this.parent.removeChild(_thumb);

            this.audio = _audio.cloneNode(true);
            this.parent.removeChild(_audio);
        }
    }, {
        key: "initCanvas",
        value: function initCanvas() {
            var _this = this;

            this.canvas = document.createElement("CANVAS");
            this.ctx = this.canvas.getContext("2d");
            this.circularMode = new _CircularMode.CircularMode({
                canvas: this.canvas,
                ctx: this.ctx,
                color: this.color
            });
            this.canvas.width = this.parent.offsetWidth;
            this.canvas.height = this.parent.offsetHeight;
            this.parent.appendChild(this.canvas);

            this.canvas.addEventListener("mousedown", function (e) {
                _this.handleMouse(e);
            });
        }
    }, {
        key: "initAudio",
        value: function initAudio() {
            this.audio.controls = false;

            var audioContext = new AudioContext() || window.webkitAudioContext;
            var src = audioContext.createMediaElementSource(this.audio);
            this.analyser = audioContext.createAnalyser();
            src.connect(this.analyser);
            this.analyser.connect(audioContext.destination);
            this.analyser.fftSize = 256;
            var bufferLength = this.analyser.frequencyBinCount;

            this.dataArray = new Uint8Array(bufferLength);

            this.audio.load();
            // this.audio.play();

            this.renderFrame();
        }
    }, {
        key: "renderFrame",
        value: function renderFrame() {
            var _this2 = this;

            requestAnimationFrame(function () {
                return _this2.renderFrame();
            });

            this.analyser.getByteFrequencyData(this.dataArray);

            this.drawAudioThumbnail(this.ctx, this.canvas, this.thumbnail);

            this.drawAudioInfo();
            this.circularMode.draw(this.dataArray, this.color);
        }
    }, {
        key: "drawAudioThumbnail",
        value: function drawAudioThumbnail(ctx, canvas, img) {
            var grayScale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            if (grayScale) {}
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
    }, {
        key: "drawAudioInfo",
        value: function drawAudioInfo() {
            var _currentTime = {
                m: pad(parseInt(this.audio.currentTime / 60, 10), 2),
                s: pad(parseInt(this.audio.currentTime % 60, 10), 2)
            };

            var _duration = {
                m: pad(parseInt(this.audio.duration / 60, 10), 2),
                s: pad(parseInt(this.audio.duration % 60, 10), 2)
            };

            this.ctx.font = "16px Arial";
            this.ctx.fillText(_currentTime.m + ":" + _currentTime.s, 5, 20);
            this.ctx.fillText(_duration.m + ":" + _duration.s, this.canvas.width - this.ctx.measureText(_duration.m + ":" + _duration.s).width - 5, 20);

            if (this.canvas.width > this.textX) {
                this.textX++;
            } else {
                this.textX = 5 - this.ctx.measureText(this.audioTitle).width;
            }

            this.ctx.fillText(this.audioTitle, this.textX, this.canvas.height - 10);
        }
    }, {
        key: "playPausePlayer",
        value: function playPausePlayer() {
            if (this.audio.ended || this.audio.paused) {
                this.audio.play();
            } else {
                this.audio.pause();
            }
        }
    }, {
        key: "handleMouse",
        value: function handleMouse(e) {
            e.preventDefault();
            this.playPausePlayer();
        }
    }, {
        key: "getAverageRGB",
        value: function getAverageRGB(imgEl) {
            var blockSize = 5,
                defaultRGB = { r: 50, g: 50, b: 50 },
                canvas = document.createElement("canvas"),
                context = canvas.getContext && canvas.getContext("2d"),
                data,
                width,
                height,
                i = -4,
                length,
                rgb = { r: 0, g: 0, b: 0 },
                count = 0;

            if (!context) {
                return defaultRGB;
            }

            height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
            width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

            context.drawImage(imgEl, 0, 0);

            try {
                data = context.getImageData(0, 0, width, height);
            } catch (e) {
                console.error("LIGHTAUDIO: image is in another domain");
                return defaultRGB;
            }

            length = data.data.length;

            while ((i += blockSize * 4) < length) {
                ++count;
                rgb.r += data.data[i];
                rgb.g += data.data[i + 1];
                rgb.b += data.data[i + 2];
            }

            rgb.r = ~~(rgb.r / count);
            rgb.g = ~~(rgb.g / count);
            rgb.b = ~~(rgb.b / count);

            return rgb;
        }
    }]);

    return LightAudio;
}();

function pad(num, size) {
    var s = num + "";
    while (s.length < size) {
        s = "0" + s;
    }return s;
}
},{"./CircularMode":"js\\CircularMode.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("./css/style.scss");

var _LightAudio = require("./js/LightAudio");

var lightaudio = document.querySelectorAll(".lightaudio__container");

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = lightaudio[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var laElem = _step.value;

        var la = new _LightAudio.LightAudio({
            parent: laElem,
            audioTitle: "Mohsen yeganeh - To Hata To Hata To Hata"
        });
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}
},{"./css/style.scss":"css\\style.scss","./js/LightAudio":"js\\LightAudio.js"}],"..\\..\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '54947' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["..\\..\\AppData\\Roaming\\npm\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/lightaudio.393b335f.map