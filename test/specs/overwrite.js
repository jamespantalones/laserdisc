//--------------------------------------------
//
// Overwrite Defaults w/ Options
//
//--------------------------------------------
		


const LaserDisc = require('../../index')
const expect = require('chai').expect
const generate = require('./generateDOM')

const POSTER = 'http://animals.sandiegozoo.org/sites/default/files/juicebox_slides/caiman_lizard.jpg'
const SRC = 'test'


module.exports = describe('Overwrite defaults', function(){
	
	it('Should allow options object to be passed in', function(){
		const opts = {}
		const target = generate()
		const l = new LaserDisc(target, opts)
		expect(typeof l.opts).to.equal('object')
		l.destroy()
	})

	it('Should have null options if no options passed in', function(){
		const target = generate()
		const l = new LaserDisc(target)
		expect(l.opts).to.equal(null)
		l.destroy()
	})

	it('should allow autoplay to be set false', function(){
		const target = generate()
		const options = {autoplay: false}
		const l = new LaserDisc(target, options)
		expect(l.autoplay).to.equal(false)
		l.destroy()
	})

	it('should allow autoplay to be set true', function(){
		const target = generate()
		const options = {autoplay: true}
		const l = new LaserDisc(target, options)
		expect(l.autoplay).to.equal(true)
		l.destroy()
	})

	it('If autoplay is set to true, clickToPlay should be false', function(){
		const target = generate()
		const options = {autoplay: true}
		const l = new LaserDisc(target, options)
		expect(l.clickToPlay).to.equal(false)
		l.destroy()
	})

	it('If clickToPlay is set to true, autoplay should be false', function(){
		const target = generate()
		const options = {autoplay: true, clickToPlay: true}
		const l = new LaserDisc(target, options)
		expect(l.autoplay).to.equal(false)
		l.destroy()
	})

	it('If hoverToPlay is set to true, autoplay and clickToPlay should be false', function(){
		const target = generate()
		const options = {autoplay: true, clickToPlay: true, hoverToPlay: true}
		const l = new LaserDisc(target, options)
		expect(l.autoplay).to.equal(false)
		l.destroy()
	})

	it('should have controls set to true if controls are passed in', function(){
		const target = generate()
		const options = {autoplay: true, controls: true}
		const l = new LaserDisc(target, options)
		expect(l.controls).to.be.true
		l.destroy()
	})

	it('should allow for a 4:3 ratio to be passed in', function(){
		const target = generate()
		const options = {autoplay: true, controls: true, ratio: 4 / 3}
		const l = new LaserDisc(target, options)
		expect(l.ratio).to.equal(4 / 3)
		l.destroy()
	})

	it('should allow for 4:3 ratio passed in as string', function(){
		const target = generate()
		const options = {autoplay: false, controls: false, ratio: '4:3'}
		const l = new LaserDisc(target, options)
		expect(l.ratio).to.equal(4 / 3)
		l.destroy()
	})

	it('should keep 16:9 ratio if any other ratio besides 4:3 is passed in', function(){
		const target = generate()
		const options = {autoplay: true, controls: false, ratio: 17/8}
		const l = new LaserDisc(target, options)
		expect(l.ratio).to.equal(16 / 9)
		l.destroy()
	})
})