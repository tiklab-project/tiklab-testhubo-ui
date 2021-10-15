/**
 * @description：
 * @date: 2021-08-17 16:21
 */
const webpack = require('webpack');
const path = require('path')
module.exports = {
    entry: __dirname + "/dk/dk.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/dist",
        filename: "dk.js",
        // 采用通用模块定义
        libraryTarget: "umd",
    },
    devtool: 'none',
    module:{
        rules:[
            {
                test:/(\.jsx|\.js)$/,
                use:{
                    loader:"babel-loader",

                },
                exclude:path.resolve(__dirname,"node_modules"),
                include:path.resolve(__dirname,"dk")
            }
        ]
    }

}
