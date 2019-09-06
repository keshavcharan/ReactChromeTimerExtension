var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports={
	entry : {
        index : ['babel-polyfill','./app/index.js'],
        vars : [ './app/referenceVars/paramsset.js', './app/referenceVars/loginsettings.js' ],
        nex:  ['./app/loginform.js', './app/loginRouter.js', './app/logoutrouter.js', './app/authenticator.js'],
        reactComponents : ['./app/reactComponents/appComponent.js',
                            './app/reactComponents/nextform.js',
                            './app/reactComponents/optionsMenu.js', 
                            './app/reactComponents/progressTimer.js',
                            './app/reactComponents/submitbutton.js'
                            ]
    },
	output : {
		path : path.resolve(__dirname, 'dist'),
		filename : '[name]_bundle.js',
        publicPath: '/'
	},
	module : {
        rules : [
            {test : /\.(js)$/, use:'babel-loader'},
            {test : /\.css$/, use:['style-loader', 'css-loader']},
        ]
    },
    devServer: {
        historyApiFallback: true,
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