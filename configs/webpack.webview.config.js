const path = require('path');
const entry = require.resolve('@opensumi/ide-webview/lib/webview-host/web-preload.js');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const tsConfigPath = path.join(__dirname, '../tsconfig.json');
const distDir = path.join(__dirname, '..', 'dist');
const port = 8899;

module.exports = {
  entry,
  node: {
    net: 'empty',
    child_process: 'empty',
    path: 'empty',
    url: false,
    fs: 'empty',
    process: 'mock',
  },
  output: {
    filename: 'webview.js',
    path: distDir,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: tsConfigPath,
      }),
    ],
  },
  bail: true,
  mode: 'development',
  devtool: 'source-map',
  module: {
    // https://github.com/webpack/webpack/issues/196#issuecomment-397606728
    exprContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          happyPackMode: true,
          transpileOnly: true,
          configFile: tsConfigPath,
        },
      },
    ],
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, '../../../node_modules'),
      path.join(__dirname, '../node_modules'),
      path.resolve('node_modules'),
    ],
    extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
    mainFields: ['loader', 'main'],
    moduleExtensions: ['-loader'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.dirname(entry) + '/webview.html',
    }),
  ],
  devServer: {
    contentBase: distDir + '/public',
    disableHostCheck: true,
    port,
    host: '0.0.0.0',
    quiet: true,
    overlay: true,
    open: false,
    hot: true,
  },
};
