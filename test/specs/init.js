'use strict'

const LaserDisc = require('../../index')
const expect = require('chai').expect

const POSTER = 'http://animals.sandiegozoo.org/sites/default/files/juicebox_slides/caiman_lizard.jpg'
const SRC = 'test'

module.exports = describe('Constructor', function(){

		let l = null

		beforeEach(function(){
			const div = document.createElement('div')
			div.setAttribute('id', 'video')
			div.setAttribute('class', 'video')
			document.body.appendChild(div)
		})

		afterEach(function(){
			const target = document.getElementById('video')
			target.setAttribute('data-source', SRC)
			target.setAttribute('data-poster', POSTER)

			if (l){
				l.destroy()
			}

			else{
				l = new LaserDisc(target)
				l.destroy()
			}
			
		})

		//Target element
		it('Should throw an error if no dom element is passed in', function(){
			expect(function(){
				(l = new LaserDisc())
			}).to.throw(Error)
		})

		//Source
		it('Should throw an error if no source is passed in', function(){
			const target = document.getElementById('video')
			target.setAttribute('data-source', '')
			
			expect(function(){
				(l = new LaserDisc(target))
			}).to.throw(Error)
		})

		//Poster
		it('Should throw an error if no poster is passed in', function(){
			const target = document.getElementById('video')
			target.setAttribute('data-source', SRC)
			target.setAttribute('data-poster', '')
			
			expect(function(){
				(l = new LaserDisc(target))
			}).to.throw(Error)
		})

		//Should not throw an error when all source + poster are passed in
		it('Should not throw an error when source and poster are both passed in', function(){
			const target = document.getElementById('video')
			target.setAttribute('data-source', SRC)
			target.setAttribute('data-poster', POSTER)

			expect(function(){
				(l = new LaserDisc(target))
			}).to.not.throw(Error)
		})

	})