const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/server/index.tsx',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, '..'),
    filename: 'build/server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, '..', 'config/ts.server.json')
        }
      },
      { test: /\.(css)$/, loader: "css-loader", options: { exportOnlyLocals: true } }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.tsx']
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    })
  ]
}