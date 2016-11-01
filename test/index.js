//--------------------------------------------
//
// Tests
//
//--------------------------------------------
'use strict'

const LaserDisc = require('../index')
const expect = require('chai').expect



describe('Tests', function(){

	require('./specs/init')
	require('./specs/defaults')
	require('./specs/overwrite')
	require('./specs/callbacks')
})
