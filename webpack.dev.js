/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-25 14:34:26
 */

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base');

const PORT = 4000;

module.exports = merge(baseWebpackConfig, {
    devtool: 'source-map',
    mode:'development',
    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://0.0.0.0:${PORT}/`,
        path.resolve(__dirname, './src/index.js')
    ],
    optimization:{
        namedModules: true,
        namedChunks: true,
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks:{
            name: false,
            chunks: 'all',
            minChunks: 1,
            cacheGroups:{
                default: false,
                vendors:{
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                    test: /node_modules/
                },
                styles:{
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                    test: /\.(css|less|scss|stylus)$/,
                    enforce: true,
                    priority: 50
                }
            }
        }
    },

    devServer: {
        contentBase: path.join(__dirname, 'plugins'), //开发服务运行时的文件根目录
        port:PORT,//端口
        historyApiFallback: true,
        inline: true,
        hot: true,//热更新
        host: '0.0.0.0',
        hotOnly:true,
        open:false,//自动打开浏览器
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});