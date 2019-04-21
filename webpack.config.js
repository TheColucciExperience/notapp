
// Getting all necessary loaders and plugins

const path = require( 'path' ),
  MiniCssExtractPlugin = require( 'mini-css-extract-plugin' ),
  OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );

module.exports = {
  entry: {
    app: './src/main.js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [ 'file-loader' ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin( {
      filename: '[name].css',
      chunkFilename: '[id].css  '
    } )
  ],
  mode: 'production',
  optimization: {
    minimizer: [ new OptimizeCSSAssetsPlugin({}) ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve( __dirname, 'dist' )
  }
}
