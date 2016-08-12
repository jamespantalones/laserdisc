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


