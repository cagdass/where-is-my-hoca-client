"use strict";

var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

var srcPath = path.join(__dirname, "src");

var env = process.env.NODE_ENV || "local";
module.exports = {
    devtool: "eval-cheap-module-source-map",
    devServer: {hot: true, port: 8080},
    entry: ['whatwg-fetch', path.join(srcPath, "app.js")],
    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        chunkFilename: "[id].js"
    },
    resolve: {
        root: srcPath,
        extensions: ["", ".js"],
        modulesDirectories: ["node_modules"]
    }, //resolve allows us to define the places where the code we use resides, namely our src and node_modules folders. Setting up the moduleDirectories is a nifty trick to help Webpack locate your modules using imports no matter where you are in the code. For example import components/example instead of something like ../../components/example. extensions lists file types that can have optional extensions in your imports; instead of import components/example.js you can then write import components/example.
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ["file?hash=sha512&digest=hex&name=[hash].[ext]", "image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false"]
            },

            {test: /\.woff2(\?\S*)?$/, loader: "url?prefix=font/&limit=5000"},
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.(otf)(\?[a-z0-9]+)?$/, loader: "file-loader?name=fonts/[name].[ext]"},
        ]
    },
    plugins: [
        new webpack.DefinePlugin({RUN_ENVIRONMENT: "'" + env + "'"}),
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({template: "./src/index.html"}),
        new webpack.HotModuleReplacementPlugin()
    ]
};

