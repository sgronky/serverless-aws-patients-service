var path = require('path');
var webpack = require('webpack');

 module.exports = {
     entry: [
         './handlers/checkups.js',
         './handlers/create.js',
         './handlers/delete.js',
         './handlers/retrieve.js',
         './handlers/search.js',
         './handlers/update.js'
        ],
     output: {
         path: path.resolve(__dirname, 'dist'),
         filename: 'main.bundle.js'
     },
     module: {
         rules: [
             {                 
                exclude: /node_modules/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
             }
         ]
     },
     mode: 'production'
 };