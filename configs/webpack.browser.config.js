const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const tsConfigPath = path.join(__dirname, '../tsconfig.json');
const srcDir = path.join(__dirname, '..', 'src', 'browser');
const distDir = path.join(__dirname, '..', 'dist');
const port = 8080;

const isDevelopment = process.env['NODE_ENV'] === 'development' || process.env['NODE_ENV'] === 'dev';

const idePkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', './node_modules/@opensumi/ide-core-browser/package.json')).toString(),
);

const styleLoader = process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader';

module.exports = {
  entry: srcDir,
  node: {
    net: 'empty',
    child_process: 'empty',
    path: 'empty',
    url: false,
    fs: 'empty',
    process: 'mock',
  },
  output: {
    filename: 'bundle.js',
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
  mode: process.env['NODE_ENV'],
  devtool: isDevelopment ? 'source-map' : 'null',
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              happyPackMode: true,
              transpileOnly: true,
              configFile: tsConfigPath,
              compilerOptions: {
                target: 'es2015',
              },
            },
          },
        ],
      },
      {
        test: /\.png$/,
        use: 'file-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.module.less$/,
        use: [
          styleLoader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /^((?!\.module).)*less$/,
        use: [
          styleLoader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  resolveLoader: {
    modules: [path.resolve('node_modules')],
    extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
    mainFields: ['loader', 'main'],
    moduleExtensions: ['-loader'],
  },
  optimization: {
    nodeEnv: process.env.NODE_ENV,
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
    new webpack.DefinePlugin({
      'process.env.WORKSPACE_DIR': JSON.stringify(
        isDevelopment ? path.join(__dirname, '..', 'workspace') : process.env['WORKSPACE_DIR'],
      ),
      'process.env.EXTENSION_DIR': JSON.stringify(
        isDevelopment ? path.join(__dirname, '..', 'extensions') : process.env['EXTENSION_DIR'],
      ),
      'process.env.REVERSION': JSON.stringify(idePkg.version || 'alpha'),
      'process.env.DEVELOPMENT': JSON.stringify(!!isDevelopment),
      'process.env.TEMPLATE_TYPE': JSON.stringify(isDevelopment ? process.env['TEMPLATE_TYPE'] : 'standard'),
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:${port}`],
      },
      clearConsole: true,
    }),
    new CopyPlugin([{ from: path.join(__dirname, '..', './public/'), to: distDir }]),
  ],
  devServer: {
    contentBase: distDir,
    port,
    host: '127.0.0.1',

    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    overlay: true,
  },
};
