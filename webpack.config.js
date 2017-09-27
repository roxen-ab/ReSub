var path = require('path');
var webpack = require('webpack');

var webpackConfig = {
    entry: './resub.ts',
    
    output: {
        filename: './dist/resub.js',
    },

    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ],
        extensions: ['.ts', '.tsx', '.js']
    },
    
    module: {
        rules: [{
            // Compile TS.
            test: /\.tsx?$/, 
            exclude: /node_modules/,
            loader: 'awesome-typescript-loader'
        }]
    },

    // plugins: [
    //     new webpack.optimize.OccurrenceOrderPlugin(),
    //     new webpack.optimize.UglifyJsPlugin({ mangle: true, sourceMap: false })
    // ]
};

module.exports = webpackConfig;
