//--------------------------------------------
//
// Requirements
//
//--------------------------------------------


var Requirements = function(self){

	if (!self.el) {
		console.warn('No element passed to Laserdisc constructor');
		throw new Error('No element passed to Laserdisc constructor')
	}

	self.source = self.el.getAttribute('data-source')
	self.poster = self.el.getAttribute('data-poster')


	//------------------------------------------
	// Verify
	//		
	if (!self.source || !self.poster){
		console.warn('Missing some required info. Make sure you have MP4, WEBM, and Poster attributes specified')
		throw new Error('Missing some required info. Make sure you have MP4, WEBM, and Poster attributes specified')
	}


	//--------------------------------------------
	// Make sure users don't enable click and hover
	//
	if (self.hoverToPlay){
		self.clickToPlay = false;
		self.autoplay = false;
	}

	else if (self.clickToPlay){
		self.hoverToPlay = false;
		self.autoplay = false;
	}
}

module.exports = Requirements;