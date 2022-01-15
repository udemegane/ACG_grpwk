const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const entryPath = path.join(__dirname, 'src/index.ts');
const package = require('./package.json');

module.exports = {
  // we output both a minified version & a non minified version on production build
  entry: { bundle: entryPath },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    library: 'game',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        // we use babel-loader for polyfill only on production build
        use: [
          {
            loader: 'ts-loader',
            options: { transpileOnly: true },
          },
        ],
        exclude: [
          path.join(__dirname, 'node_modules'),
          path.join(__dirname, 'dist'),
          path.join(__dirname, 'projects'),
          path.join(__dirname, 'scenes'),
          // python script
          path.join(__dirname, 'app'),
          path.join(__dirname, 'migration'),
          // path.join(__dirname, 'protobuf'),
        ],
      },
      {
        test: /\.(glsl|vs|fs)$/,
        use: ['ts-shader-loader', 'glslify-loader'],
        exclude: [
          path.join(__dirname, 'node_modules'),
          path.join(__dirname, 'dist'),
          path.join(__dirname, 'projects'),
          path.join(__dirname, 'scenes'),
          // python script
          path.join(__dirname, 'app'),
          path.join(__dirname, 'migration'),
          path.join(__dirname, 'protobuf'),
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `${package.name} ${package.version} ${new Date().toString()}`,
    }),
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
    }),
    new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
    new ForkTsCheckerWebpackPlugin(),
  ],
  optimization: {
    minimize: false,
    usedExports: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  devtool: 'eval-cheap-module-source-map',
};
