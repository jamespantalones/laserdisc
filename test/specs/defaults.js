//--------------------------------------------
//
// Defaults
//
//--------------------------------------------
'use strict'

const LaserDisc = require('../../index')
const expect = require('chai').expect
const generate = require('./generate')

const POSTER = 'http://animals.sandiegozoo.org/sites/default/files/juicebox_slides/caiman_lizard.jpg'
const SRC = 'test'


module.exports = describe('Defaults', function(){

		let d

		beforeEach(function(){
			const div = document.createElement('div')
			div.setAttribute('id', 'video')
			div.setAttribute('class', 'video')
			document.body.appendChild(div)
		})


		it('autoplay should default to true', function(){
			const target = generate()
			const d = new LaserDisc(target)
			expect(d.autoplay).to.be.true
			d.destroy()
		})

		it('clickToPlay should default to false', function(){
			const target = generate()
			const d = new LaserDisc(target)
			expect(d.clickToPlay).to.be.false
			d.destroy()
		})

		it('hoverToPlay should default to false', function(){
			const target = generate()
			const d = new LaserDisc(target)
			expect(d.hoverToPlay).to.be.false
			d.destroy()
		})

		it('showPlayButton should default to false', function(){
			const target = generate()
			const d = new LaserDisc(target)
			expect(d.showPlayButton).to.be.false
			d.destroy()
		})

		it('muted should default to true', function(){
			const target = generate()
			const d = new LaserDisc(target)
			expect(d.muted).to.be.true
			d.destroy()
		})

		it('loop should default to true', function(){
			const target = generate()
			const d = new LaserDisc(target)
			expect(d.loop).to.be.true
			d.destroy()
		})

		it('volume should default to 1.0', function(){
			const target = generate()
			
			const d = new LaserDisc(target)
			expect(d.volume).to.equal(1.0)
			d.destroy()
		})
	})