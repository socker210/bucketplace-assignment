const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mode = process.env.NODE_ENV

module.exports = {
  mode: mode,
  entry: path.resolve(__dirname, 'src', 'App.jsx'),
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss']
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'static'),
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true
  },
  performance: {
    hints: false
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.(css|sass|scss)$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }, 'postcss-loader', 'sass-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'template.html')
    })
  ]
}