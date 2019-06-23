var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
	entry : {
        index : './app/index.js',
        display : './app/formdisplay.js',
        bg : './app/background.js',
        reactComponents : ['./app/reactComponents/optionsMenu.js']
    },
	output : {
		path : path.resolve(__dirname, 'dist'),
		filename : '[name]_bundle.js'
	},
	module : {
        rules : [
            {test : /\.(js)$/, use:'babel-loader'},
            {test : /\.css$/, use:['style-loader', 'css-loader']}
        ]
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            file : 'index.html',
            template : 'app/index.html',
            chunks : ['index', 'bg']
        }),
        new HtmlWebpackPlugin ({
            filename : 'running.html',
            template : 'app/running.html',
            chunks : ['display']
        })
    ]
}