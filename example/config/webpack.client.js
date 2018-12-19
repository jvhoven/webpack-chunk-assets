const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: [
    './src/client/index.tsx'
  ],
  output: {
    path: path.resolve(__dirname, '..', 'build/client'),
    filename: '[name].js',
    chunkFilename: '[name].bundle.[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.tsx']
  },
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, '..', 'config/ts.client.json')
        }
      },
      { test: /\.(css)$/, 
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new WebpackAssetsManifest({
      publicPath: true,
      output: path.resolve(__dirname, '..', 'build/manifest.json'),
      writeToDisk: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].[hash:8].css',
    }),
  ]
};
