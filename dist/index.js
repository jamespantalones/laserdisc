(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//--------------------------------------------
	//
	// Main export
	//
	//--------------------------------------------


	var Laserdisc = __webpack_require__(2);

	console.log(Laserdisc);

	module.exports = Laserdisc;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	//--------------------------------------------
	//
	// Laserdisc
	//
	//--------------------------------------------

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Stretcher = __webpack_require__(3);

	var _Stretcher2 = _interopRequireDefault(_Stretcher);

	var _SetupDOM = __webpack_require__(4);

	var _SetupDOM2 = _interopRequireDefault(_SetupDOM);

	var _OverwriteDefaults = __webpack_require__(5);

	var _OverwriteDefaults2 = _interopRequireDefault(_OverwriteDefaults);

	var _Requirements = __webpack_require__(6);

	var _Requirements2 = _interopRequireDefault(_Requirements);

	var _FindClosest = __webpack_require__(7);

	var _FindClosest2 = _interopRequireDefault(_FindClosest);

	var _Listeners = __webpack_require__(8);

	var _Listeners2 = _interopRequireDefault(_Listeners);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//--------------------------------------------
	// Laserdisc class yo
	//

	var Laserdisc = function () {

		//--------------------------------------------
		// Constructor
		//

		function Laserdisc(el, opts) {
			_classCallCheck(this, Laserdisc);

			//--------------------------------------------
			// Element to replace with Laserdisc
			//
			this.el = el || null;

			//--------------------------------------------
			// Window sizing
			//
			this.winWidth = window.innerWidth;
			this.winHeight = window.innerHeight;

			//--------------------------------------------
			// Required Data
			//
			this.source = '';
			this.poster = '';

			//--------------------------------------------
			// Defaults
			//

			this.sizes = [];

			//stretch + crop to fill container at all times
			this.stretch = false;

			//default video screen ratio
			this.ratio = 16 / 9;

			//loop
			this.loop = true;

			//show controls
			this.controls = false;

			//play video automatically
			this.autoplay = true;

			//play video on click
			this.clickToPlay = true;

			//play video on hover
			this.hoverToPlay = false;

			//show play button
			this.showPlayButton = true;

			//mute audio
			this.mute = true;

			//--------------------------------------------
			// Stats
			//
			//(All times in ms)
			this.duration = 0;
			this.currentTime = 0;

			//--------------------------------------------
			// Media states
			//		
			this.canplay = false;
			this.canplaythrough = false;
			this.playing = false;
			this.hasPlayed = false;

			//--------------------------------------------
			// Overwrite defaults if options provided
			//	
			this.opts = opts || null;

			this.init();
		}

		//--------------------------------------------
		// Launch order
		//	


		_createClass(Laserdisc, [{
			key: 'init',
			value: function init() {

				//make sure correct inputs are passed in
				(0, _Requirements2.default)(this);

				//call overwrite module if options are passed in
				if (this.opts) {
					(0, _OverwriteDefaults2.default)(this);
				}

				//call module to setup dom components
				(0, _SetupDOM2.default)(this);

				//make sure we still have ref to this on callbacks
				this.bindThis();

				_Listeners2.default.add(this);

				//add video source
				this.addSourcesAndLoad();

				//--------------------------------------------
				// If stretch option is on, instantiate the Stretcher
				//
				if (this.stretch) {
					(0, _Stretcher2.default)(this.video, this.ratio, this.outerWrap);
				}
			}

			//--------------------------------------------
			// Bind 'this' to all events
			//	

		}, {
			key: 'bindThis',
			value: function bindThis() {
				this.onResize = this.onResize.bind(this);
				this.onCanPlay = this.onCanPlay.bind(this);
				this.onCanPlayThrough = this.onCanPlayThrough.bind(this);
				this.onDurationChange = this.onDurationChange.bind(this);
				this.onEnd = this.onEnd.bind(this);
				this.onPlay = this.onPlay.bind(this);
				this.onPause = this.onPause.bind(this);
				this.onTimeUpdate = this.onTimeUpdate.bind(this);
				this.onMouseEnter = this.onMouseEnter.bind(this);
				this.onMouseLeave = this.onMouseLeave.bind(this);
				this.onClick = this.onClick.bind(this);
				this.onLoad = this.onLoad.bind(this);
			}

			//--------------------------------------------
			// Check sizing and add correct video
			//	

		}, {
			key: 'addSourcesAndLoad',
			value: function addSourcesAndLoad() {

				// Pick closest size
				var closest = (0, _FindClosest2.default)(this);

				//set appropriate sources
				this.webmSource.src = this.source + '_' + closest + '.webm';
				this.mp4Source.src = this.source + '_' + closest + '.mp4';

				//load video
				this.video.load();
			}

			//--------------------------------------------
			//
			// Methods
			//
			//--------------------------------------------


			//--------------------------------------------
			// Trigger play
			//	

		}, {
			key: 'play',
			value: function play() {
				this.video.play();
			}

			//--------------------------------------------
			// Trigger pause
			//	

		}, {
			key: 'pause',
			value: function pause() {
				this.video.pause();
			}

			//--------------------------------------------
			// Trigger mute
			//		

		}, {
			key: 'mute',
			value: function mute() {
				this.video.muted = true;
			}

			//--------------------------------------------
			// Trigger sound
			//		

		}, {
			key: 'unmute',
			value: function unmute() {
				this.video.muted = false;
			}

			//--------------------------------------------
			// Destroy all event listeners + container
			//

		}, {
			key: 'destroy',
			value: function destroy() {
				_Listeners2.default.remove(this);
				this.outerWrap.remove();
			}

			//--------------------------------------------
			//
			// Events
			//
			//--------------------------------------------

			//--------------------------------------------
			// Called when duration is first available, or if video
			// source changes
			//

		}, {
			key: 'onDurationChange',
			value: function onDurationChange(ev) {
				this.duration = ev.timeStamp;
			}

			//--------------------------------------------
			// When video has loaded enough frames to begin playing
			//

		}, {
			key: 'onCanPlay',
			value: function onCanPlay() {
				this.canplay = true;

				if (this.onCanPlayCallback) {
					this.onCanPlayCallback();
				}
			}

			//--------------------------------------------
			// When video has loaded data, could be before
			// ready to play
			//

		}, {
			key: 'onLoad',
			value: function onLoad() {
				this.loaded = true;

				if (this.onLoadCallback) {
					this.onLoadCallback();
				}

				if (this.autoplay) {
					this.video.play();
				}
			}

			//--------------------------------------------
			// When video can fully play through
			//

		}, {
			key: 'onCanPlayThrough',
			value: function onCanPlayThrough() {
				this.canplaythrough = true;
			}

			//--------------------------------------------
			// Video is over
			//		

		}, {
			key: 'onEnd',
			value: function onEnd() {
				if (this.video.loop) {
					this.video.play();
				}
			}

			//--------------------------------------------
			// Error loading video
			//	

		}, {
			key: 'onError',
			value: function onError(err) {
				console.warn('VIDEO ERROR', err);
			}

			//--------------------------------------------
			// Video is playing
			//		

		}, {
			key: 'onPlay',
			value: function onPlay(ev) {
				this.playing = true;

				if (!this.hasPlayed) {
					this.hasPlayed = true;
					this.posterWrap.classList.add('active');
				}

				if (this.onPlayCallback) {
					this.onPlayCallback();
				}
			}

			//--------------------------------------------
			// Vidoe is paused
			//	

		}, {
			key: 'onPause',
			value: function onPause(ev) {
				this.playing = false;

				if (this.onPauseCallback) {
					this.onPauseCallback();
				}
			}

			//--------------------------------------------
			// Current playback time
			//		

		}, {
			key: 'onTimeUpdate',
			value: function onTimeUpdate(ev) {
				this.currentTime = ev.timeStamp;
			}

			//--------------------------------------------
			// Click on video
			//

		}, {
			key: 'onClick',
			value: function onClick(ev) {
				if (this.playing) {
					this.pause();
				} else {
					this.play();
				}
			}

			//--------------------------------------------
			// Mouse exit
			//	

		}, {
			key: 'onMouseLeave',
			value: function onMouseLeave() {
				if (this.playing) {
					this.pause();
				} else {
					return null;
				}
			}

			//--------------------------------------------
			// Mouse enter
			//		

		}, {
			key: 'onMouseEnter',
			value: function onMouseEnter() {
				if (!this.playing) {
					this.play();
				} else {
					return null;
				}
			}

			//--------------------------------------------
			// Window/container resize
			//		

		}, {
			key: 'onResize',
			value: function onResize() {

				this.winWidth = window.innerWidth;
				this.winHeight = window.innerHeight;

				if (this.stretch) {
					(0, _Stretcher2.default)(this.video, this.ratio, this.outerWrap);
				}
			}
		}]);

		return Laserdisc;
	}();

	//--------------------------------------------
	// Export module
	//


	exports.default = Laserdisc;

/***/ },
/* 3 */
/***/ function(module, exports) {

	//--------------------------------------------
	//
	// Stretch vids to fill screen
	//
	//--------------------------------------------
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Stretcher = function Stretcher(player, ratio, parent) {

		var poster = parent.getElementsByClassName('laser-poster-wrap')[0];

		var container = parent || window;

		var width = container.innerWidth;
		var height = container.innerHeight;

		if (!width) {
			width = container.clientWidth;
		}

		if (!height) {
			height = container.clientHeight;
		}

		console.log(width, height);

		var pWidth = container.innerWidth;
		var pHeight = pWidth / ratio;

		// ------------------------------------------------
		// Gap underneath
		//
		if (width / ratio < height) {
			pWidth = Math.ceil(height * ratio);

			player.style.position = 'absolute';
			player.style.width = pWidth + 'px';
			player.style.height = height + 'px';
			player.style.top = 0;
			player.style.left = (width - pWidth) / 2 + 'px';

			poster.style.position = 'absolute';
			poster.style.width = pWidth + 'px';
			poster.style.height = height + 'px';
			poster.style.top = 0;
			poster.style.left = (width - pWidth) / 2 + 'px';
		}

		// ------------------------------------------------
		// Gap on side
		//

		else {
				pHeight = Math.ceil(width / ratio);

				player.style.position = 'absolute';
				player.style.width = width + 'px';
				player.style.height = pHeight + 'px';
				player.style.left = 0;
				player.style.top = (height - pHeight) / 2 + 'px';

				poster.style.position = 'absolute';
				poster.style.width = width + 'px';
				poster.style.height = pHeight + 'px';
				poster.style.left = 0;
				poster.style.top = (height - pHeight) / 2 + 'px';
			}
	};

	exports.default = Stretcher;

/***/ },
/* 4 */
/***/ function(module, exports) {

	//--------------------------------------------
	//
	// Setup DOM
	//
	//--------------------------------------------
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var SetupDOM = function SetupDOM(self) {

		//Create elements needed to be reused throughout
		self.outerWrap = document.createElement('div');
		self.posterWrap = document.createElement('div');

		//other els
		var innerWrap = document.createElement('div');
		var video = document.createElement('video');
		var mp4Source = document.createElement('source');
		var webmSource = document.createElement('source');

		//add media types
		mp4Source.setAttribute('type', 'video/mp4');
		mp4Source.setAttribute('src', '');
		webmSource.setAttribute('type', 'video/webm');
		webmSource.setAttribute('src', '');

		//Add needed classes
		self.outerWrap.classList.add('laser-outer-wrap');
		self.posterWrap.classList.add('laser-poster-wrap');
		innerWrap.classList.add('laser-inner-wrap');
		video.classList.add('laser-video');

		if (self.showPlayButton) {
			self.posterWrap.classList.add('show-button');
		}

		if (self.ratio === 16 / 9) {
			innerWrap.style.paddingBottom = '56.25%';
		} else if (self.ratio === 4 / 3) {
			innerWrap.style.paddingBottom = '75%';
		}

		self.posterWrap.style.background = 'url(' + self.poster + ')';
		self.posterWrap.style.backgroundRepeat = 'no-repeat';
		self.posterWrap.style.backgroundPosition = 'center center';
		self.posterWrap.style.backgroundSize = 'cover';
		self.posterWrap.style.pointerEvents = 'none';

		//--------------------------------------------
		// Set webkit inline play
		//
		video.setAttribute('webkit-playsinline', '');

		if (self.mute) {
			video.setAttribute('muted', '');
		}

		if (self.controls) {
			video.setAttribute('controls', '');
		}

		self.el.parentNode.replaceChild(self.outerWrap, self.el);

		self.outerWrap.appendChild(innerWrap);
		innerWrap.appendChild(self.posterWrap);
		innerWrap.appendChild(video);

		video.appendChild(mp4Source);
		video.appendChild(webmSource);

		self.video = video;
		self.mp4Source = mp4Source;
		self.webmSource = webmSource;

		if (self.autoplay) {
			self.video.setAttribute('autoplay', '');
		}

		if (self.loop) {
			self.video.setAttribute('loop', '');
		}
	};

	exports.default = SetupDOM;

/***/ },
/* 5 */
/***/ function(module, exports) {

	//--------------------------------------------
	//
	// Overwrite Defaults
	//
	//--------------------------------------------
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var OverwriteDefaults = function OverwriteDefaults(self) {

		self.fullScreen = self.opts.fullScreen || false;
		self.controls = self.opts.controls || false;
		self.autoplay = self.opts.autoplay || false;
		self.stretch = self.opts.stretch || false;
		self.showPlayButton = self.opts.showPlayButton || false;

		//--------------------------------------------
		// Check for sizes
		//
		if (self.opts.sizes) {

			//Make sure we have number and not string
			for (var i = 0; i < self.opts.sizes.length; i++) {
				var num = parseInt(self.opts.sizes[i], 10);
				self.sizes.push(num);
			}
		}

		//--------------------------------------------
		// Check for loop
		//		
		if (self.opts.loop !== null && self.opts.loop !== 'undefined') {
			self.loop = self.opts.loop;
		}

		//--------------------------------------------
		// Check for mute
		if (self.opts.mute !== null && self.opts.mute !== 'undefined') {
			self.mute = self.opts.mute;
		}

		//--------------------------------------------
		// Check for click to play
		//
		if (self.opts.clickToPlay !== null && self.opts.clickToPlay !== 'undefined') {
			self.clickToPlay = self.opts.clickToPlay;
		}

		//--------------------------------------------
		// Check for play on hover
		//
		if (self.opts.hoverToPlay !== null && self.opts.hoverToPlay !== 'undefined') {
			self.hoverToPlay = self.opts.hoverToPlay;
		}

		//--------------------------------------------
		// Controls
		//
		if (self.opts.controls !== null && self.opts.controls !== 'undefined') {
			self.controls = self.opts.controls;
		}

		//--------------------------------------------
		// Setup optional callbacks
		//
		if (typeof self.opts.onPlay === 'function') {
			self.onPlayCallback = self.opts.onPlay;
		}

		if (typeof self.opts.onPause === 'function') {
			self.onPauseCallback = self.opts.onPause;
		}

		if (typeof self.opts.onLoad === 'function') {
			self.onLoadCallback = self.opts.onLoad;
		}

		//--------------------------------------------
		// Check ratio overrides
		//
		if (self.opts.ratio) {

			if (self.opts.ratio === '16:9' || self.opts.ratio === 16 / 9) {
				self.ratio = 16 / 9;
			} else if (self.opts.ratio === '4:3' || opts.ratio === 4 / 3) {
				self.ratio = 4 / 3;
			} else {
				self.ratio = 16 / 9;
			}
		}
	};

	exports.default = OverwriteDefaults;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//--------------------------------------------
	//
	// Requirements
	//
	//--------------------------------------------


	var Requirements = function Requirements(self) {

		if (!self.el) {
			console.warn('No element passed to Laserdisc constructor');
			return null;
		}

		self.source = self.el.dataset.source;
		self.poster = self.el.dataset.poster;

		//------------------------------------------
		// Verify
		//		
		if (!self.source || !self.poster) {
			console.warn('Missing some required info. Make sure you have MP4, WEBM, and Poster attributes specified');
			return null;
		}

		//--------------------------------------------
		// Make sure users don't enable click and hover
		//
		if (self.hoverToPlay) {
			self.clickToPlay = false;
		} else if (self.clickToPlay) {
			self.hoverToPlay = false;
		}
	};

	exports.default = Requirements;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//--------------------------------------------
	//
	// Finds closest video size to display
	// based on screensize
	//
	//--------------------------------------------


	var FindClosest = function FindClosest(self) {

		var i = 0;
		var minDiff = self.winWidth;
		var arr = self.sizes;
		var num = self.winWidth;
		var ans = void 0;

		for (i in arr) {
			var m = Math.abs(num - arr[i]);

			if (m < minDiff) {
				minDiff = m;
				ans = arr[i];
			}
		}

		return ans;
	};

	exports.default = FindClosest;

/***/ },
/* 8 */
/***/ function(module, exports) {

	//--------------------------------------------
	//
	// Adds all needed event listeners
	//
	//--------------------------------------------
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Listeners = {

		add: function add(self) {

			window.addEventListener('resize', self.onResize, false);
			self.video.addEventListener('canplay', self.onCanPlay, false);
			self.video.addEventListener('canplaythrough', self.onCanPlayThrough, false);
			self.video.addEventListener('durationchange', self.onDurationChange, false);
			self.video.addEventListener('ended', self.onEnd, false);
			self.video.addEventListener('error', self.onError, false);
			self.video.addEventListener('play', self.onPlay, false);
			self.video.addEventListener('pause', self.onPause, false);
			self.video.addEventListener('timeupdate', self.onTimeUpdate, false);
			self.video.addEventListener('loadeddata', self.onLoad, false);

			if (self.hoverToPlay) {
				self.video.addEventListener('mouseenter', self.onMouseEnter, false);
				self.video.addEventListener('mouseleave', self.onMouseLeave, false);
			}

			if (self.clickToPlay) {
				self.video.addEventListener('click', self.onClick, false);
			}
		},

		remove: function remove(self) {
			window.removeEventListener('resize', self.onResize, false);

			self.video.removeEventListener('canplay', self.onCanPlay, false);
			self.video.removeEventListener('canplaythrough', self.onCanPlayThrough, false);
			self.video.removeEventListener('durationchange', self.onDurationChange, false);
			self.video.removeEventListener('ended', self.onEnd, false);
			self.video.removeEventListener('error', self.onError, false);
			self.video.removeEventListener('play', self.onPlay, false);
			self.video.removeEventListener('pause', self.onPause, false);
			self.video.removeEventListener('timeupdate', self.onTimeUpdate, false);
			self.video.removeEventListener('loadeddata', self.onLoad, false);

			if (self.hoverToPlay) {
				self.video.removeEventListener('mouseenter', self.onMouseEnter, false);
				self.video.removeEventListener('mouseleave', self.onMouseLeave, false);
			}

			if (self.clickToPlay) {
				self.video.removeEventListener('click', self.onClick, false);
			}
		}

	};

	exports.default = Listeners;

/***/ }
/******/ ])
});
;