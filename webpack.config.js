'use strict';
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var PORT = 9000;

module.exports = {
    entry: __dirname + "/src/app/",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    resolve: {
        alias: {
            'jquery': __dirname + '/bower_components/jquery/dist/jquery.min.js',
            'lodash': __dirname + '/bower_components/lodash/dist/lodash.min.js',
            'autoComplete': __dirname + '/bower_components/jquery-auto-complete/jquery.auto-complete.min.js',
            'flatpickr': __dirname + '/bower_components/flatpickr/dist/flatpickr.min.js',
            'jRange': __dirname + '/bower_components/jRange/jquery.range-min.js',
            'moment': __dirname + '/bower_components/moment/min/moment.min.js'
        }
    },
    devServer: {
        port: PORT
    },
    watch: true,
    debug: true,
    devtool: 'source-map',
    jshint: {
        emitErrors: true,
        failOnHint: true
    },
    postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: [/node_modules/, /bower_components/],
            loader: "jshint-loader"
        }],
        loaders: [{
            test: /\.(less|css)$/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader?sourceMap!postcss-loader!less-loader"
            })
        }, {
            test: /\.(png|jpg)$/,
            loader: "file-loader?name=img/[name].[ext]"
        }, {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader: 'file-loader'
        }, {
            test: /\.html$/,
            loader: "html"
        }]
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new CopyWebpackPlugin([
            { from: 'flight_data.json', to: 'flight_data.json' }
        ]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new HtmlWebpackPlugin({
            favicon: 'favicon.ico',
            template: 'index.html'
        }),
        new ExtractTextPlugin({
            filename: "style.css",
            allChunks: true
        })
    ]
};
