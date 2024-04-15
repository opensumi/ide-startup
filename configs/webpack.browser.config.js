const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const NodePolyfillPlugin = require('@bytemain/node-polyfill-webpack-plugin');
const esbuild = require('esbuild');
const { resolveTSConfig } = require('./utils');

const tsConfigPath = path.join(__dirname, '../tsconfig.json');
const srcDir = path.join(__dirname, '..', 'src', 'browser');
const distDir = path.join(__dirname, '..', 'dist');
const port = 8080;

const isDevelopment =
  process.env['NODE_ENV'] === 'development' || process.env['NODE_ENV'] === 'dev';

const idePkg = JSON.parse(
  fs
    .readFileSync(
      path.join(__dirname, '..', './node_modules/@opensumi/ide-core-browser/package.json'),
    )
    .toString(),
);

const styleLoader =
  process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader';

module.exports = {
  entry: srcDir,
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
    fallback: {
      net: false,
      path: false,
      os: false,
      crypto: false,
      child_process: false,
      url: false,
      fs: false,
    },
  },
  bail: true,
  mode: process.env['NODE_ENV'],
  devtool: isDevelopment ? 'source-map' : false,
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
      {
        test: /\.png$/,
        type: 'asset/resource',
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
              modules: {
                localIdentName: '[local]___[hash:base64:5]',
              }
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
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]-[hash:8][ext][query]',
        },
      },
    ],
  },
  resolveLoader: {
    modules: [path.resolve('node_modules')],
    extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
    mainFields: ['loader', 'main'],
  },
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
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'templates', 'index.html'),
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
      'process.env.TEMPLATE_TYPE': JSON.stringify(
        isDevelopment ? process.env['TEMPLATE_TYPE'] : 'standard',
      ),
    }),
    new CopyPlugin({
      patterns: [{ from: path.join(__dirname, '..', './public/'), to: distDir }]
    }),
    new NodePolyfillPlugin({
      includeAliases: ['process', 'Buffer'],
    }),
  ],
  devServer: {
    static: {
      directory: distDir,
    },
    port,
    host: '0.0.0.0',
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: false,
      },
    },
  },
};
