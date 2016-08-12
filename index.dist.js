(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//--------------------------------------------
//
// Main export
//
//--------------------------------------------


//--------------------------------------------
//
// Laserdisc
//
//--------------------------------------------
		
'use strict';


var Stretcher = require('./src/components/Stretcher');
var SetupDOM = require('./src/components/SetupDOM');
var OverwriteDefaults = require('./src/components/OverwriteDefaults');
var CheckRequirements = require('./src/components/Requirements');
var FindClosest = require('./src/components/FindClosest');
var Listeners = require('./src/components/Listeners');



var LaserDisc = function(el, opts) {

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
};



LaserDisc.prototype = {

	//--------------------------------------------
	// Launch order
	//
			
	init: function(){

		//make sure correct inputs are passed in
		CheckRequirements(this);
		
		//call overwrite module if options are passed in
		if (this.opts){
			OverwriteDefaults(this);
		}

		//call module to setup dom components
		SetupDOM(this);
		
		//make sure we still have ref to this on callbacks
		this.bindThis();

		Listeners.add(this);

		//add video source
		this.addSourcesAndLoad();

		//--------------------------------------------
		// If stretch option is on, instantiate the Stretcher
		//
		if (this.stretch){
			Stretcher(this.video, this.ratio, this.outerWrap);
		}
	},


	//--------------------------------------------
	// Bind 'this' to all events
	//	
	bindThis: function(){
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
	},


	//--------------------------------------------
	// Check sizing and add correct video
	//
	addSourcesAndLoad: function(){
		// Pick closest size
		var closest = FindClosest(this);

		//set appropriate sources

		this.webmSource.src = this.source + '_' + closest + '.webm';
		this.mp4Source.src = this.source + '_' + closest + '.mp4';
				
		//load video
		this.video.load();
	},



	//--------------------------------------------
	//
	// Methods
	//
	//--------------------------------------------

	//--------------------------------------------
	// Trigger play
	//	
	play: function(){
		this.video.play();
	},


	//--------------------------------------------
	// Trigger pause
	//
	pause: function(){
		this.video.pause();
	},


	//--------------------------------------------
	// Trigger mute
	//
	mute: function(){
		this.video.mute();
	},

	//--------------------------------------------
	// Trigger sound
	//
	unmute: function(){
		this.video.unmute();
	},


	//--------------------------------------------
	// Destroy
	//
	destroy: function(){
		Listeners.remove(this);
		this.outerWrap.remove();
	},


	//--------------------------------------------
	//
	// Events
	//
	//--------------------------------------------
	

	//--------------------------------------------
	// Called when duration is first available, or if video
	// source changes
	//
	onDurationChange: function(ev){
		this.duration = ev.timeStamp;
	},


	//--------------------------------------------
	// When video has loaded enough frames to begin playing
	//
			
	onCanPlay: function(){
		this.canplay = true;

		if (this.onCanPlayCallback){
			this.onCanPlayCallback();
		}
	},


	//--------------------------------------------
	// When video has loaded data, could be before
	// ready to play
	//
			
	onLoad: function(ev){
		this.loaded = true;

		if (this.onLoadCallback){
			this.onLoadCallback(ev);
		}

		if (this.autoplay){
			this.video.play();
		}

	},


	//--------------------------------------------
	// When video can fully play through
	//
	onCanPlayThrough: function(){
		this.canplaythrough = true;
	},


	//--------------------------------------------
	// Video is over
	//		
	onEnd: function(ev){
		if (this.video.loop){
			this.video.play();
		}

		if (this.onEndCallback){
			this.onEndCallback(ev);
		}
	},


	//--------------------------------------------
	// Error loading video
	//	
	onError: function(err){
		console.warn('VIDEO ERROR', err);

		if (this.onErrorCallback){
			this.onErrorCallback(err);
		}
	},


	//--------------------------------------------
	// Video is playing
	//		
	onPlay: function(ev){
		this.playing = true;
		
		if (!this.hasPlayed){
			this.hasPlayed = true;
			this.posterWrap.classList.add('active');
		}

		if (this.onPlayCallback){
			this.onPlayCallback(ev);
		}
	},


	//--------------------------------------------
	// Vidoe is paused
	//	
	onPause: function(ev){
		this.playing = false;

		if (this.onPauseCallback){
			this.onPauseCallback(ev);
		}
	},


	//--------------------------------------------
	// Current playback position
	//
	onTimeUpdate: function(ev){
		this.currentTime = ev.timeStamp;

		if (this.onTimeUpdateCallback){
			this.onTimeUpdateCallback(this.currentTime);
		}
	},


	//--------------------------------------------
	// Click on video
	//
	onClick: function(ev){
		if (this.playing){
			this.pause();
		}
		else{
			this.play();
		}
	},


	//--------------------------------------------
	// Mouse exit
	//	
	onMouseLeave: function(ev){
		if (this.playing){
			this.pause();
		}

		else{
			return null;
		}
	},



	//--------------------------------------------
	// Mouse enter
	//		
	onMouseEnter: function(ev){
		if (!this.playing){
			this.play();
		}

		else{
			return null;
		}
	},


	//--------------------------------------------
	// Window/container resize
	//		
	onResize: function(ev){

		this.winWidth = window.innerWidth;
		this.winHeight = window.innerHeight;


		if (this.stretch){
			Stretcher(this.video, this.ratio, this.outerWrap);
		}
	}
}


// console.log(LaserDisc);


// module.exports = LaserDisc;

},{"./src/components/FindClosest":2,"./src/components/Listeners":3,"./src/components/OverwriteDefaults":4,"./src/components/Requirements":5,"./src/components/SetupDOM":6,"./src/components/Stretcher":7}],2:[function(require,module,exports){
//--------------------------------------------
//
// Finds closest video size to display
// based on screensize
//
//--------------------------------------------

var FindClosest = function(self){

	var i = 0;
	var minDiff = self.winWidth;
	var num = self.winWidth;
	var arr = self.sizes;
	var ans;

	for (i in arr){
		var m = Math.abs(num - arr[i]);

		if (m < minDiff){
			minDiff = m;
			ans = arr[i];
		}
	}

	return ans;
};


module.exports = FindClosest;

},{}],3:[function(require,module,exports){
//--------------------------------------------
//
// Adds all needed event listeners
//
//--------------------------------------------
'use strict';


var Listeners = {

	add: function(self){

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


		if (self.hoverToPlay){
			self.video.addEventListener('mouseenter', self.onMouseEnter, false);
			self.video.addEventListener('mouseleave', self.onMouseLeave, false);
		}

		if (self.clickToPlay){
			self.video.addEventListener('click', self.onClick, false);
		}

	},

	remove: function(self){
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

		if (self.hoverToPlay){
			self.video.removeEventListener('mouseenter', self.onMouseEnter, false);
			self.video.removeEventListener('mouseleave', self.onMouseLeave, false);
		}
		

		if (self.clickToPlay){
			self.video.removeEventListener('click', self.onClick, false);
		}
	}

}

module.exports = Listeners;
},{}],4:[function(require,module,exports){
//--------------------------------------------
//
// Overwrite Defaults
//
//--------------------------------------------
'use strict';



var OverwriteDefaults = function(self){

	self.fullScreen = self.opts.fullScreen || false;
	self.controls = self.opts.controls || false;
	self.autoplay = self.opts.autoplay || false;
	self.stretch = self.opts.stretch || false;
	self.showPlayButton = self.opts.showPlayButton || false;

	//--------------------------------------------
	// Check for sizes
	//
	if (self.opts.sizes){

		//Make sure we have number and not string
		for (var i = 0; i < self.opts.sizes.length; i++ ){
			var num = parseInt(self.opts.sizes[i], 10);
			self.sizes.push(num);
		}
	}

	//--------------------------------------------
	// Check for loop
	//		
	if (self.opts.loop !== null && self.opts.loop !== 'undefined'){
		self.loop = self.opts.loop;
	}

	//--------------------------------------------
	// Check for mute
	if (self.opts.mute !== null && self.opts.mute !== 'undefined'){
		self.mute = self.opts.mute;
	}

	//--------------------------------------------
	// Check for click to play
	//
	if (self.opts.clickToPlay !== null && self.opts.clickToPlay !== 'undefined'){
		self.clickToPlay = self.opts.clickToPlay;
	}
	

	//--------------------------------------------
	// Check for play on hover
	//
	if (self.opts.hoverToPlay !== null && self.opts.hoverToPlay !== 'undefined'){
		self.hoverToPlay = self.opts.hoverToPlay;
	}

	//--------------------------------------------
	// Controls
	//
	if (self.opts.controls !== null && self.opts.controls !== 'undefined'){
		self.controls = self.opts.controls;
	}

	//--------------------------------------------
	// Setup optional callbacks
	//
	if (typeof self.opts.onPlay === 'function'){
		self.onPlayCallback = self.opts.onPlay;
	}

	if (typeof self.opts.onPause === 'function'){
		self.onPauseCallback = self.opts.onPause;
	}

	if (typeof self.opts.onLoad === 'function'){
		self.onLoadCallback = self.opts.onLoad;
	}

	if (typeof self.opts.onError === 'function'){
		self.onErrorCallback = self.opts.onError;
	}

	if (typeof self.opts.onEnd === 'function'){
		self.onEndCallback = self.opts.onEnd;
	}

	if (typeof self.opts.onTimeUpdate === 'function'){
		self.onTimeUpdateCallback = self.opts.onTimeUpdate;
	}

	//--------------------------------------------
	// Check ratio overrides
	//
	if (self.opts.ratio){

		if (self.opts.ratio === '16:9' || self.opts.ratio === 16 / 9){
			self.ratio = 16 / 9;
		}

		else if (self.opts.ratio === '4:3' || opts.ratio === 4 / 3){
			self.ratio = 4 / 3;
		}

		else {
			self.ratio = 16 / 9;
		}
	}

};


module.exports = OverwriteDefaults;


},{}],5:[function(require,module,exports){
//--------------------------------------------
//
// Requirements
//
//--------------------------------------------


var Requirements = function(self){

	if (!self.el) {
		console.warn('No element passed to Laserdisc constructor');
		return null;
	}

	self.source = self.el.dataset.source;
	self.poster = self.el.dataset.poster;

	//------------------------------------------
	// Verify
	//		
	if (!self.source || !self.poster){
		console.warn('Missing some required info. Make sure you have MP4, WEBM, and Poster attributes specified');
		return null;
	}

	//--------------------------------------------
	// Make sure users don't enable click and hover
	//
	if (self.hoverToPlay){
		self.clickToPlay = false;
	}

	else if (self.clickToPlay){
		self.hoverToPlay = false;
	}
}

module.exports = Requirements;
},{}],6:[function(require,module,exports){
//--------------------------------------------
//
// Setup DOM
//
//--------------------------------------------
'use strict';


var SetupDOM = function(self){

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

	if (self.showPlayButton){
		self.posterWrap.classList.add('show-button');
	}

	if (self.ratio === 16 / 9){
		innerWrap.style.paddingBottom = '56.25%';
	}

	else if (self.ratio === 4 / 3){
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

	if (self.mute){
		video.setAttribute('muted', '');
	}

	if (self.controls){
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
	

	if (self.autoplay){
		self.video.setAttribute('autoplay', '');
	}

	if (self.loop){
		self.video.setAttribute('loop', '');
	}


};

module.exports = SetupDOM;



},{}],7:[function(require,module,exports){
//--------------------------------------------
//
// Stretch vids to fill screen
//
//--------------------------------------------
'use strict';


var Stretcher = function(player, ratio, parent){

	var poster = parent.getElementsByClassName('laser-poster-wrap')[0];
	var container = parent || window;
	var width = container.innerWidth;
	var height = container.innerHeight;

	if (!width){
		width = container.clientWidth;
	}

	if (!height){
		height = container.clientHeight;
	}

	var pWidth = container.innerWidth;
	var pHeight = pWidth / ratio;

	// ------------------------------------------------
	// Gap underneath
	//
	if (width / ratio < height){
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

module.exports = Stretcher;

},{}]},{},[1]);
