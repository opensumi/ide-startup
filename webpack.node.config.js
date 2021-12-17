const path = require('path');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const tsConfigPath = path.join(__dirname, './tsconfig.json');
const srcDir = path.join(__dirname, 'src', 'node');
const distDir = path.join(__dirname, './dist-node/server');

module.exports = {
  entry: path.join(srcDir, './index.ts'),
  target: 'node',
  output: {
    filename: 'index.js',
    path: distDir,
  },
  node: false,
  mode: 'production',
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
    ],
  },
  externals: [
    function(context, request, callback) {
      if (
        [
          'node-pty',
          'oniguruma',
          'nsfw',
          'spdlog',
          'efsw',
          'canvas',
        ].indexOf(request) !== -1
      ) {
        return callback(null,  `commonjs ${request}`);
      }
      // 构建公网版本时替换 @ali/vscode-ripgrep
      if ('@ali/vscode-ripgrep' === request) {
        return callback(null,  `commonjs vscode-ripgrep`);
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
