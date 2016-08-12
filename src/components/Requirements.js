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