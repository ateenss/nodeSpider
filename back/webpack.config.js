let webpack = require('webpack');
let path = require('path');
let fs = require('fs');

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
        path: __dirname,
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
    ],
    mode:'production',
    devtool: 'source-map',
    node: {
        __dirname: false,
        __filename: false,
    }
};