var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports={
	entry : {
        index : ['babel-polyfill','./app/index.js'],
        entry : ['./app/entrypoint.js', './app/routes.js'],
        refs : [ './app/referenceVars/paramsset.js', './app/referenceVars/loginsettings.js', './app/referenceVars/firebaseConfig.js' ],
        login:  ['./app/login/loginComponent.js','./app/login/loginPage.js', './app/login/signup.js'],
        home: ['./app/apphome/appHome.js', './app/apphome/appComponent.js', './app/apphome/timerComponent.js', './app/apphome/taskhistory.js', './app/apphome/header.js', './app/apphome/logoutrouter.js', './app/apphome/nextform.js'],
        reactComponents : [ './app/reactComponents/optionsMenu.js', './app/reactComponents/progressTimer.js', './app/reactComponents/submitbutton.js', './app/reactComponents/imagebutton.js'],
        firebase : ['./app/firebase/firebaseContext.js', './app/firebase/firebaseInitializer.js', './app/firebase/firebaseInstance.js']
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
            { from: 'static' }, {from : './app/resources/images'}
        ])
/*        new HtmlWebpackPlugin ({
            filename : 'running.html',
            template : 'app/running.html',
            chunks : ['display']
        })
*/    ]
}