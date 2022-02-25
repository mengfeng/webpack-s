const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ProgressPlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: "./public/index.html?"
})
const miniCssExtractPlugin = new MiniCssExtractPlugin();
 const progressPlugin =  new ProgressPlugin({
    // activeModules: false, //显示活动模块计数和一个活动模块正在进行的消息
    entries: true, // 显示正在进行的入口文件计数消息。
    // handler(percentage, message, ...args) {
    //   // custom logic 
    // }, // 可以自定义行为的函数
    modules: true, //显示正在进行的模块计数消息。
    // modulesCount: 5000, //开始时的最小模块数。modules启用属性时生效。
    // profile: false, //告诉ProgressPlugin为进度步骤收集配置文件数据。
    dependencies: true, //显示正在进行的依赖项计数消息。
    // dependenciesCount: 10000, //开始时的最小依赖项计数。dependencies启用属性时生效。
    // percentBy: null, //说明如何计算进度百分比。
})

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path:path.resolve(__dirname,"./../dist"),
        filename: "bundle.js",
        clean: true,
    },
    resolve: {
        alias: {
            "@":path.resolve(__dirname,"./../src")
        },
        extensions:[".tsx",".ts",".jsx",".js","mjs"]
        },
    module: {
        rules: [{
            test: /\.(css|less)$/,
            use: [MiniCssExtractPlugin.loader,"css-loader", "less-loader"]
        },{
            test: /\.(ts|js|jsx|tsx|mjs)$/,
            use: ["babel-loader","ts-loader"]
        }]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    },
    plugins: [miniCssExtractPlugin,progressPlugin,htmlWebpackPlugin]
}