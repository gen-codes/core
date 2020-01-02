/* config-overrides.js */
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const glob = require("glob")
const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = 
module.exports = function override(config, env) {
  // config = {
  //   module: {
  //     rules: [
  //       {
  //         test: /\.(js|jsx)$/,
  //         exclude: /node_modules/,
  //         use: {
  //           loader: "babel-loader"
  //         }
  //       },
  //       {
  //         test: /\.html$/,
  //         use: [
  //           {
  //             loader: "html-loader"
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   plugins: [
  //     new HtmlWebPackPlugin({
  //       template: "./src/index.html",
  //       filename: "./index.html"
  //     })
  //   ]
  // }  
  // console.log(JSON.stringify(config, null, 2))
  // config.optimization.runtimeChunk = false;
  // config.optimization.splitChunks = {
  //   cacheGroups: {
  //     default: false,
  //   },
  // };
  // delete config.optimization

  // config.output = {
  //   path: config.output.path,
  //   filename: "bundle.min.js",
  //   library: "code-editor",      
  //   libraryTarget: 'umd',      
  //   umdNamedDefine: true  
  // }
  if(!config.plugins) {
    config.plugins = [];
  }
  config.plugins.push(
    new MonacoWebpackPlugin()
  );
  // console.log(config)
  return config;
}
