//--------------------------------------------
//
// Stretch vids to fill screen
//
//--------------------------------------------
'use strict';


const Stretcher = (player, ratio, parent) => {

	const poster = parent.getElementsByClassName('laser-poster-wrap')[0];

	const container = parent || window;

	let width = container.innerWidth;
	let height = container.innerHeight;

	if (!width){
		width = container.clientWidth;
	}

	if (!height){
		height = container.clientHeight;
	}

	console.log(width, height);

	let pWidth = container.innerWidth;
	let pHeight = pWidth / ratio;

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

}

export default Stretcher;