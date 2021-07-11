const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

// const SpeedMeasurePlugin=require("speed-measure-webpack-plugin");
// const smp=new SpeedMeasurePlugin();
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const prodConfig = {
    mode: 'production',
    devtool: 'inline-source-map',
    stats: 'normal',
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 300000,
            maxSize: 500000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
            // minSize: 0,
            // cacheGroups: {
            //     commons: {
            //         name: 'commons',
            //         chunks: 'all',
            //         minChunks: 2
            //     }
            // }
        },
        minimizer: [
            new TerserPlugin({
                parallel: true,
                cache: true,
            })
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 3,
                        },
                    },
                    {
                        loader:'babel-loader',
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
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    'css-loader',
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
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    'css-loader',
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
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        // new webpack.DllReferencePlugin({
        //     manifest: require('../build/library/library.json'),
        // }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        // new BundleAnalyzerPlugin(),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module:'react',
                    entry: 'https://cdn.bootcdn.net/ajax/libs/react/17.0.1/umd/react.production.min.js',
                    global:'React',
                    type: 'js'
                },
                {
                    module:'react-dom',
                    entry: 'https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.1/umd/react-dom.production.min.js',
                    global:'ReactDOM',
                    type: 'js'
                },
                {
                    module:'antd',
                    entry:'https://cdn.bootcdn.net/ajax/libs/antd/4.4.1/antd.min.js',
                    global:'antd',
                    type: 'js'
                }
            ]
        }),
    ]
};

// module.exports = smp.wrap(merge(baseConfig, prodConfig));
module.exports = merge(baseConfig, prodConfig);