
const POSTER = 'http://animals.sandiegozoo.org/sites/default/files/juicebox_slides/caiman_lizard.jpg'
const SRC = 'test'


module.exports = function(){
	let target = document.getElementById('video')
	let el = null

	if (target){
		target.setAttribute('data-source', SRC)
		target.setAttribute('data-poster', POSTER)

		el = target
	}

	else{
		const div = document.createElement('div')
		div.setAttribute('id', 'video')
		div.setAttribute('class', 'video')
		div.setAttribute('data-source', SRC)
		div.setAttribute('data-poster', POSTER)
		document.body.appendChild(div)

		el = div
	}

	return el
	
}