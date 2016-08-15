//--------------------------------------------
//
// Main export
//
//--------------------------------------------
var q = require('q');

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


	//default volume
	this.volume = 1.0;


	//--------------------------------------------
	// Stats
	//
	//(All times in ms)
	this.duration = 0;
	this.currentTime = 0;


	this.reverseInterval = 10;

	

	//--------------------------------------------
	// Media states
	//		
	this.canplay = false;
	this.canplaythrough = false;
	this.loadedMetaData = false;
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
		this.onLoadedMetaData = this.onLoadedMetaData.bind(this);
	},


	//--------------------------------------------
	// See if video exists
	//
			
	doesVideoExist: function(url){
		var deferred = q.defer();
		var request = new XMLHttpRequest();

		
		request.open('GET', url, true);

		request.onload = function(){
			deferred.resolve(request.status);
		}

		request.onerror = function(err){
			deferred.reject(err);
		}

		
		request.send();

		return deferred.promise;

	},


	//--------------------------------------------
	// Check sizing and add correct video
	//
	addSourcesAndLoad: function(){
		var self = this;
		var mp4Source = '';
		var webmSource = '';


		if (!this.sizes || this.sizes.length > 0){
			// Pick closest size
			var closest = FindClosest(this);

			//see if file exists + set appropriate sources

			webmSource = this.source + '_' + closest + '.webm';
			mp4Source = this.source + '_' + closest + '.mp4';
		}

		else {

			webmSource = this.source + '.webm';
			mp4Source = this.source + '.mp4';

		}


		this.doesVideoExist(webmSource).then(function(firstResponse){
			
			if (firstResponse === 404){
				console.log('Cannot find WEBM source ', webmSource);
				return null;
			}



			self.doesVideoExist(mp4Source).then(function(secondResponse){

				if (secondResponse === 404){
					console.log('Cannot find MP4 source ', webmSource);
					return null;
				}

				self.webmSource.src = webmSource;
				self.mp4Source.src = mp4Source;
				self.video.load();

			}, function(err){
				console.log('Error loading MP4 ', mp4Source);
			});
		
		}, function(err){
			console.log('Error loading WEBM', webmSource);
		});

	},



	//--------------------------------------------
	//
	// Methods
	//
	//--------------------------------------------

	//--------------------------------------------
	// Trigger play
	//	
	play: function(timeInSeconds){
		var self = this;

		if (timeInSeconds){
			this.seekTo(timeInSeconds);
		}
		setTimeout(function(){
			self.video.play();
		},10);
		
	},


	//--------------------------------------------
	// Trigger pause
	//
	pause: function(){
		var self = this;

		setTimeout(function(){
			self.video.pause();
		},10);
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
	// Swap
	//
	swap: function(file, sizes){
		this.source = file;

		if (sizes){
			this.sizes = sizes;
		}
		this.addSourcesAndLoad();
	},


	//--------------------------------------------
	// Manual loading
	//
	load: function(){
		this.video.load();
	},

	//--------------------------------------------
	// Seek To
	//
	seekTo: function(time){
		var self = this;
		setTimeout(function(){
			self.video.currentTime = time;
			//self.currentTime = self.video.currentTime;
		});
		
	},

	//--------------------------------------------
	// Set volume
	//
	setVolume: function(volume){
		

		this.volume = volume;

		if (this.volume < 0){
			this.volume = 0.0;
		}

		if (this.volume > 1){
			this.volume = 1.0;
		}

		this.video.volume = this.volume;

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

		if (this.onDurationChangeCallback){
			this.onDurationChangeCallback(ev);
		}
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

	onLoadedMetaData: function(ev){
		
		this.loadedMetaData = true;

		if (this.onLoadedMetaDataCallback){
			this.onLoadedMetaDataCallback(ev);
		}
	},


	//--------------------------------------------
	// When video can fully play through
	//
	onCanPlayThrough: function(){
		this.canplaythrough = true;

		if (this.onCanPlayThroughCallback){
			this.onCanPlayThroughCallback();
		}
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

		if (this.clickToPlay){
			if (this.playing){
				this.pause();
			}
			else{
				this.play();
			}

			if (this.onClickCallback){
				this.onClickCallback(ev);
			}
		}

		else{
			if (this.onClickCallback){
				this.onClickCallback(ev);
			}
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
