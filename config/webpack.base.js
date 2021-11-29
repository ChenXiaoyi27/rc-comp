const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const alias = require('./alias');

module.exports = {
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
        alias,
        extensions: ['.js'],
        mainFields: ['main']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: { injectType: 'singletonStyleTag' }
                    },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    () => {
                                        autoprefixer({
                                            overrideBrowserslist: [
                                                'last 2 version',
                                                '>1%',
                                                'ios7'
                                            ]
                                        })
                                    },
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: { injectType: 'singletonStyleTag' }
                    },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    () => {
                                        autoprefixer({
                                            overrideBrowserslist: [
                                                'last 2 version',
                                                '>1%',
                                                'ios7'
                                            ]
                                        })
                                    },
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name][hash:8].[ext]'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        }),
        new FriendlyErrorsWebpackPlugin(),
        new CopyPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: '',
            globOptions: { ignore: ['.*'] }
        }]),
    ]
};