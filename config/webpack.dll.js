const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        library: [
            'react',
            'react-dom',
            'react-router-dom',
            'antd',
            'axios',
            'wangeditor'
        ],
    },
    output: {
        filename: '[name]_[chunkhash].dll.js',
        path: path.join(__dirname, '../build/library'),
        library: '[name]',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: path.join(__dirname, '../build/library/[name].json'),
        }),
    ],
};