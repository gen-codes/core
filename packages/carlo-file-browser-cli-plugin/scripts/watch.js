process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const paths = require('react-scripts/config/paths');
const webpack = require('webpack');
const configFunc = require('react-scripts/config/webpack.config.js');
// removes react-dev-utils/webpackHotDevClient.js at first in the array
const config = configFunc("development")
// console.log(config)
config.entry.shift()
config.output.path = __dirname+"/../build/"
webpack(config).watch({}, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    copyPublicFolder();
  }
  console.error(stats.toString({
    chunks: false,
    colors: true
  }));
});

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  });
}