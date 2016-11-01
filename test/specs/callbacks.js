//--------------------------------------------
//
// Callback functions
//
//--------------------------------------------
'use strict'

const LaserDisc = require('../../index')
const expect = require('chai').expect
const generate = require('./generate')

module.exports = describe('Callbacks', function(){


	//--------------------------------------------
	// On Play
	//
			
	it('if onPlay is passed in, it should trigger on video play', function(done){

		const target = generate()
		const options = {autoplay: false, controls: true, onPlay: function(){
			expect(l.video.currentTime).to.be.above(0)
		}}

		const l = new LaserDisc(target, options)
		
		setTimeout(function(){
			l.video.play()
			l.destroy()
			done()
		})
	})


	//--------------------------------------------
	// On Pause
	//
			
	it('if onPause is passed in, it should trigger on video pause', function(done){
		const target = generate()
		const options = {autoplay: false, controls: false, onPause: function(){
			expect(l.video.paused).to.be.true
		}}

		const l = new LaserDisc(target, options)

		

		setTimeout(function(){
			l.video.play()
			setTimeout(function(){
				l.video.pause()
				done()
				l.destroy()
			},300)
		},100)
	})

	//--------------------------------------------
	// On Load
	//	
	it('if onLoad is passed in, it should trigger on video load', function(done){
		const target = generate()
		const options = {autoplay: false, onLoad: function(){
			expect(l.loaded).to.be.true
			done()
			l.destroy()
		}}

		const l = new LaserDisc(target, options)
	})


	//--------------------------------------------
	// On Can Play
	//
			
	it('if onCanPlay callback is passed in, it should trigger when video is ready', function(done){
		const target = generate()
		const options = {autoplay: false, onCanPlay: function(){
			expect(l.canplay).to.be.true
			done()
			l.destroy()
		}}

		const l = new LaserDisc(target, options)
	})

	//--------------------------------------------
	// On Can Play Through
	//
			
	it('if onCanPlayThrough callback is passed in, it should trigger when video is ready', function(done){
		const target = generate()
		const options = {autoplay: false, onCanPlayThrough: function(){
			expect(l.canplaythrough).to.be.true
			done()
			l.destroy()
		}}

		const l = new LaserDisc(target, options)
	}).timeout(5000)


	//--------------------------------------------
	// On Time update
	//
	it('if onTimeUpdate is passed in, it should update every so often', function(done){
		let time = 0
		const target = generate()
		const options = {autoplay: true, onTimeUpdate: function(){
			expect(l.video.currentTime).to.be.above(0)
			done()
			l.destroy()
		}}

		const l = new LaserDisc(target, options)
	})

	//--------------------------------------------
	// On End
	//
	it('if onEnd callback is passed in, it should update when video is over', function(done){

		const target = generate()
		const options = {autoplay: true, loop: false, onEnd: function(){
			done()
		}}

		const l = new LaserDisc(target, options)

	}).timeout(12000)


			
			
})
