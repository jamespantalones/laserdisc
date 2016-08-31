//--------------------------------------------
//
// Overwrite Defaults
//
//--------------------------------------------
'use strict';



var OverwriteDefaults = function(self){

	self.fullScreen = self.opts.fullScreen || false;
	self.controls = self.opts.controls || false;
	self.autoplay = self.opts.autoplay || true;
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
	if (self.opts.muted !== null && self.opts.muted !== 'undefined'){
		self.muted = self.opts.muted;
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

	if (typeof self.opts.onClick === 'function'){
		self.onClickCallback = self.opts.onClick;
	}

	if (typeof self.opts.onDurationChange === 'function'){
		self.onDurationChangeCallback = self.opts.onDurationChange;
	}

	if (typeof self.opts.onLoadedMetaData === 'function'){
		self.onLoadedMetaDataCallback = self.opts.onLoadedMetaData;
	}

	if (typeof self.opts.onCanPlay === 'function'){
		self.onCanPlayCallback = self.opts.onCanPlay;
	}

	if (typeof self.opts.onCanPlayThrough === 'function'){
		self.onCanPlayThroughCallback = self.opts.onCanPlayThrough;
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

