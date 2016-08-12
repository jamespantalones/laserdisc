//--------------------------------------------
//
// Dev config
//
//--------------------------------------------
var path = require('path');

module.exports = {
	entry: ['./src/index.js'],
	output: {
		path: './dist',
		filename: 'index.js',
		// libraryTarget: 'umd',
		// library: 'LaserDisc'
	},

	module: {
		loaders: [
			{
				text: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},

	//resolve: { fallback: path.join(__dirname, 'node_modules')}
};