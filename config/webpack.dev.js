const path = require('path');

const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        port: 9000,
        open: false,
        hot: true,
        stats: 'errors-only',
    },
    devtool: 'inline-source-map',
    watch: true,//默认false也就是不开启
    watchOptions: {//只有开启监听模式时watchOptions才有意义
        ignored: /node_modules/,//默认为空，不监听的文件或文件夹，支持正则匹配
        aggregateTimeout: 300,//监听到变化发生后会等300ms再去执行，默认300ms
        poll: 1000//判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
    },
    resolve: {
        alias: {
            'react': path.resolve(__dirname, '../node_modules/react/umd/react.development.js'),
            'react-dom': path.resolve(__dirname, '../node_modules/react-dom/umd/react-dom.development.js')
        }
    },
    plugins: [

    ]
};

module.exports = merge(baseConfig, devConfig);