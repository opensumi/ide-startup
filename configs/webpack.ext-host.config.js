const path = require('path');
const esbuild = require('esbuild');
const TerserJSPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const { resolveTSConfig } = require('./utils');

const tsConfigPath = path.join(__dirname, '../tsconfig.json');
const srcDir = path.join(__dirname, '../src', 'extension');
const distDir = path.join(__dirname, '../hosted');

module.exports = {
  entry: path.join(srcDir, './ext-host'),
  target: 'node',
  output: {
    filename: 'ext.process.js',
    path: distDir,
  },
  devtool: 'null',
  mode: 'production',
  node: false,
  optimization: {
    nodeEnv: process.env.NODE_ENV,
    minimizer: [
      new TerserJSPlugin({
        minify: TerserJSPlugin.esbuildMinify,
        terserOptions: {
          drop: ['debugger'],
          format: 'cjs',
          minify: true,
          treeShaking: true,
          keepNames: true,
          target: 'es2020',
        },
      }),
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: tsConfigPath,
      }),
    ],
  },
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              implementation: esbuild,
              loader: 'tsx',
              target: ['es2020', 'chrome91', 'node14.16'],
              tsconfigRaw: resolveTSConfig(path.join(__dirname, '../tsconfig.json')),
            },
          },
        ],
      },
      { test: /\.css$/, loader: require.resolve('null-loader') },
      { test: /\.less$/, loader: require.resolve('null-loader') },
    ],
  },
  externals: [
    {
      nsfw: 'nsfw'
    },
    function (context, request, callback) {
      if (['node-pty', 'oniguruma', '@parcel/watcher', 'spdlog', 'efsw', 'getmac'].indexOf(request) !== -1) {
        return callback(null, `commonjs ${request}`);
      }
      callback();
    },
  ],
  resolveLoader: {
    modules: [path.join(__dirname, '../node_modules')],
    extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
    mainFields: ['loader', 'main'],
    moduleExtensions: ['-loader'],
  },
};
