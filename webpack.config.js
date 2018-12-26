// DEVELOPMENT
const webpack = require('webpack');
const path = require('path');

const entry = [
	'webpack-dev-server/client?http://localhost:8888',
	'webpack/hot/only-dev-server',
	'./app.js'
]

const output = {
	path: path.join(__dirname, 'dist'),
	publicPath: '/dist',
	filename: 'bundle.min.js'
}

const plugins = [
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NamedModulesPlugin()
]

const config = {
	context: path.join(__dirname, 'src'),
	mode: 'development',
	entry: entry,
	output: output,
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				include: path.join(__dirname, 'src'),
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [{
					loader: 'url-loader',
					options: { name: './images/[name].[ext]' }
				}]
			},
			{
				test: /\.(sass|scss)$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: plugins
}

module.exports = config
