const path = require('path');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const tsConfigPath = path.join(__dirname, '../tsconfig.json');
const distDir = path.join(__dirname, '../dist-node/hosted');

module.exports = {
  entry: require.resolve(
    '@opensumi/ide-extension/lib/hosted/ext.process.js',
  ),
  target: 'node',
  output: {
    filename: 'ext.process.js',
    path: distDir,
  },
  devtool: 'null',
  mode: 'production',
  node: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: tsConfigPath,
      }),
    ],
  },
  module: {
    // https://github.com/webpack/webpack/issues/196#issuecomment-397606728
    exprContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: tsConfigPath,
        },
      },
      { test: /\.css$/, loader: require.resolve('null-loader') },
      { test: /\.less$/, loader: require.resolve('null-loader') },
    ],
  },
  externals: [
    function(context, request, callback) {
      if (
        ['node-pty', 'oniguruma', 'nsfw', 'spdlog', 'efsw', 'getmac'].indexOf(
          request,
        ) !== -1
      ) {
        return callback(null, `commonjs ${request}`);
      }
      callback();
    },
  ],
  resolveLoader: {
    modules: [path.join(__dirname, './node_modules')],
    extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
    mainFields: ['loader', 'main'],
    moduleExtensions: ['-loader'],
  },
};
