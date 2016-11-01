//--------------------------------------------
//
// Overwrite Defaults
//
//--------------------------------------------
'use strict';



var OverwriteDefaults = function(self){

	//--------------------------------------------
	// Required opts /defaults
	//
			
	self.fullScreen = self.opts.fullScreen || false
	self.controls = self.opts.controls || false
	self.stretch = self.opts.stretch || false
	self.showPlayButton = self.opts.showPlayButton || false

	if (!self.opts){
		return null
	}

	if (self.opts.hasOwnProperty('autoplay')){
		self.autoplay = self.opts.autoplay
		self.clickToPlay = false
		self.hoverToPlay = false
	}

	//--------------------------------------------
	// Check for sizes
	//
	if (self.opts.hasOwnProperty('sizes')){
		//Make sure we have number and not string
		for (var i = 0; i < self.opts.sizes.length; i++ ){
			var num = parseInt(self.opts.sizes[i], 10)
			self.sizes.push(num)
		}
	}
			

	//--------------------------------------------
	// Check for loop
	//		
	if (self.opts.hasOwnProperty('loop')){
		self.loop = self.opts.loop
	}

	//--------------------------------------------
	// Check for mute
	if (self.opts.hasOwnProperty('muted')){
		self.muted = self.opts.muted
	}

	//--------------------------------------------
	// Check for click to play
	//
	if (self.opts.hasOwnProperty('clickToPlay')){
		self.clickToPlay = self.opts.clickToPlay
		self.autoplay = false
		self.clickToPlay = false
	}
	

	//--------------------------------------------
	// Check for play on hover
	//
	if (self.opts.hasOwnProperty('hoverToPlay')){
		self.hoverToPlay = self.opts.hoverToPlay;
	}

	//--------------------------------------------
	// Controls
	//
	if (self.opts.hasOwnProperty('controls')){
		self.controls = self.opts.controls;
	}

	//--------------------------------------------
	// Setup optional callbacks
	//
	if (self.opts.hasOwnProperty('onPlay') && typeof self.opts.onPlay === 'function'){
		self.onPlayCallback = self.opts.onPlay;
	}

	if (self.opts.hasOwnProperty('onPause') && typeof self.opts.onPause === 'function'){
		self.onPauseCallback = self.opts.onPause;
	}

	if (self.opts.hasOwnProperty('onLoad') && typeof self.opts.onLoad === 'function'){
		self.onLoadCallback = self.opts.onLoad;
	}

	if (self.opts.hasOwnProperty('onError') && typeof self.opts.onError === 'function'){
		self.onErrorCallback = self.opts.onError;
	}

	if (self.opts.hasOwnProperty('onEnd') && typeof self.opts.onEnd === 'function'){
		self.onEndCallback = self.opts.onEnd;
	}

	if (self.opts.hasOwnProperty('onTimeUpdate') && typeof self.opts.onTimeUpdate === 'function'){
		self.onTimeUpdateCallback = self.opts.onTimeUpdate;
	}

	if (self.opts.hasOwnProperty('onClick') && typeof self.opts.onClick === 'function'){
		self.onClickCallback = self.opts.onClick;
	}

	if (self.opts.hasOwnProperty('onDurationChange') && typeof self.opts.onDurationChange === 'function'){
		self.onDurationChangeCallback = self.opts.onDurationChange;
	}


	if (self.opts.hasOwnProperty('onCanPlay') && typeof self.opts.onCanPlay === 'function'){
		self.onCanPlayCallback = self.opts.onCanPlay;
	}

	if (self.opts.hasOwnProperty('onCanPlayThrough') && typeof self.opts.onCanPlayThrough === 'function'){
		self.onCanPlayThroughCallback = self.opts.onCanPlayThrough;
	}

	//--------------------------------------------
	// Check ratio overrides
	//
	if (self.opts.hasOwnProperty('ratio')){

		if (self.opts.ratio === '16:9' || self.opts.ratio === 16 / 9){
			self.ratio = 16 / 9;
		}

		else if (self.opts.ratio === '4:3' || self.opts.ratio === 4 / 3){
			self.ratio = 4 / 3;
		}

		else {
			self.ratio = 16 / 9;
		}
	}

};


module.exports = OverwriteDefaults;

