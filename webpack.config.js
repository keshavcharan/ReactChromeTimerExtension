var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports={
	entry : {
        index : './app/index.js',
        vars : './app/paramsset.js',
        nex: './app/nextform.js',
/*        ac:'./app/reactComponents/appComponent.js',
        pt: './app/reactComponents/progressTimer.js',
        sb: './app/reactComponents/submitbutton.js',
        om: './app/reactComponents/optionsMenu.js',*/
        reactComponents : ['./app/reactComponents/appComponent.js',
                            './app/reactComponents/submitbutton.js', 
                            './app/reactComponents/optionsMenu.js', 
                            './app/reactComponents/progressTimer.js']
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
            template : 'app/index.html'
            //chunks : ['index', 'bg']
        }),
         new CopyWebpackPlugin([
            { from: 'static' }
        ])
/*        new HtmlWebpackPlugin ({
            filename : 'running.html',
            template : 'app/running.html',
            chunks : ['display']
        })
*/    ]
}