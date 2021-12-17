const { merge } = require('webpack-merge');
const webpack = require('webpack');
const editor = require('babylonjs-editor-webpack-progress');
const base = require('./webpack.base');

module.exports = merge(base, {
  plugins: [editor.createProgressPlugin(new webpack.ProgressPlugin())],
});
