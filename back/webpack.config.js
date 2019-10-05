let webpack = require('webpack');
let path = require('path');
let fs = require('fs');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './app.js',
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'backend.js'
    },
    externals: nodeModules,
    plugins: [
        new webpack.IgnorePlugin(/\.(css|less)$/),
        new webpack.BannerPlugin(
            {
                banner:'require("source-map-support").install();',
                raw: true,
                entryOnly: false }),
        new webpack.ProgressPlugin({
            entries: true,
            modules: true,
            modulesCount: 100,
            profile: true,
            handler: (percentage, message, ...args) => {
                console.info(percentage, message, ...args);
            }
        }),
        new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i,
            include: /\/includes/,
            exclude: /\/node_modules\/*/,
            cache: true,
            parallel: true,
        }),
    ],
    mode:'production',
    devtool: 'sourcemap'
};