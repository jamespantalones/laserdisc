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


var Stretcher = require('./components/Stretcher');
var SetupDOM = require('./components/SetupDOM');
var OverwriteDefaults = require('./components/OverwriteDefaults');
var CheckRequirements = require('./components/Requirements');
var FindClosest = require('./components/FindClosest');
var Listeners = require('./components/Listeners');



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




module.exports = LaserDisc;
