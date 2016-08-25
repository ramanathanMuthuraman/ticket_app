'use strict';
var webpack = require("webpack");
var webpackConfig = require('./webpack.config');
var path = require('path');
module.exports = function(config) {
    config.set({
        files: [
            'test/test.js'
        ],
        frameworks: ['mocha'],
        preprocessors: {
            'test/test.js': ['webpack']
        },
        coverageReporter: {
            type: 'html',
            dir: 'dist/coverage/'
        },
        webpack: {
            resolve: webpackConfig.resolve,
            module: {
                preLoaders: [{
                    test: /\.js$/,
                    include: path.resolve('src'),
                    loader: "istanbul-instrumenter-loader"
                }],
                loaders: webpackConfig.module.loaders
            },
            plugins: webpackConfig.plugins
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        reporters: ['progress', 'coverage'],
        plugins: [
            require("karma-webpack"),
            require("karma-mocha"),
            require("karma-phantomjs-launcher"),
            require("karma-coverage")
        ],
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity,
        webpackMiddleware: {
            noInfo: true //please don't spam the console when running in karma!
        }
    });
};
