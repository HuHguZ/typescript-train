const { resolve } = require('path');
const { merge } = require('webpack-merge');
const base = require('./base');

module.exports = merge(base, {
    devtool: 'source-map',
    mode: 'development',
    devServer: {
        port: 3000,
        hot: true
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'build')
    }
});