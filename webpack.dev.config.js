var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
	entry: {
		main: './src/index.js',
		vendor: './src/vendor.js'
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "[name].js?[hash]",
		chunkFilename: '[name].js?[hash]'
	},

	module: {
		loaders: [
			{ 
				test: /\.js?$/, 
				exclude: /node_modules/,
				loader: 'babel-loader', 
				query: { presets: ['es2015', 'react', 'stage-0']} 
			},
			{ test: /\.css?$/, loader: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader']
			})}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'TDD-test-dom',
			filename: 'index.html'
		}),
		new OpenBrowserPlugin({
			url: 'http://localhost:9998'
		}),
		new ExtractTextPlugin({
			filename: 'style.css?[contenthash]',
			allChunks: true
		}),
		// new webpack.optimize.CommonsChunkPlugin('vendor.js')
		new webpack.optimize.CommonsChunkPlugin({
			name: ['main', 'vendor']
		})
	]
}