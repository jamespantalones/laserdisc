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