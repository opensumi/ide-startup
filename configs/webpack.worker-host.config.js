const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const tsConfigPath = path.join(__dirname, '..', 'tsconfig.json');
const srcDir = path.join(__dirname, '../src', 'extension');
const distDir = path.join(__dirname, '..', 'dist');

module.exports = {
  entry: path.join(srcDir, 'worker-host'),
  output: {
    publicPath: '',
    filename: 'worker-host.js',
    path: distDir,
  },
  target: 'webworker',
  devtool: 'eval-source-map',
  mode: 'production',
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
    },
  },
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: tsConfigPath,
          compilerOptions: {
            target: 'es2016',
          }
        },
      },
    ],
  },
  resolveLoader: {
    modules: [path.join(__dirname, '../node_modules')],
    extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
    mainFields: ['loader', 'main'],
  },
  plugins: [
    new NodePolyfillPlugin({
      includeAliases: ['process', 'util', 'Buffer'],
    }),
  ],
};
