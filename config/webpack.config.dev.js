const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(path.join(__dirname, '..', 'src', 'index.js')),
    output: {
        path: path.join(__dirname, '..dist'),
        filename: 'index-bundle.js'
    },
    module:{
        rules:  [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(path.join(__dirname, '../public/index.html')),
            filename: 'index.html'
        })
    ]
}