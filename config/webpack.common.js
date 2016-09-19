var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },
    resolve: {
        extensions: ['', '.js', '.ts', '.json']
  },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|json)$/,
                exclude: helpers.root('src', 'app', 'i18n'),
                loader: 'file?name=assets/[name].[ext]'
            },
            {
                test: /\.(json)$/,
                include: helpers.root('src', 'app', 'i18n'),
                loader: 'file?name=assets/i18n/[name].[ext]'
            },
            // Support for *.json files.
//            {
//                test: /\.json$/, 
//                include: helpers.root('src', 'app'),
//                loader: 'json-loader'
//            },      
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
//        new CopyWebpackPlugin([
//            {
//                from: helpers.root('src', 'app', 'i18n'), // replace with your folder
//                to: 'assets/i18n'
//            },
//            {
//                from: helpers.root('src', 'app', 'img'), // replace with your folder
//                to: 'assets'
//            }
//        ])

    ]
};