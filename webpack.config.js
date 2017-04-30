const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'dist/'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node-modules/
            },
            {
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader']
                }),
                test: /\.s?css$/
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: "file-loader?name=[name].[ext]&publicPath=resources/fonts/"

            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("development")
            }
        }),
    ],
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        contentBase: './',
        port: 3000,
        inline: true,
        hot: true,
        historyApiFallback: true,
    }
};