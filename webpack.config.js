const path    = require( 'path' )
const webpack = require( 'webpack' )

module.exports = {
  entry: {
    app:      `./js/index.js`,
  },
  output: {
    filename: `concompte.js`,
    path:     path.resolve( __dirname, 'public' )
  },
  devtool: 'inline-source-map',
  plugins: [
    // https://webpack.js.org/plugins/commons-chunk-plugin/#passing-the-minchunks-property-a-function
    new webpack.optimize.CommonsChunkPlugin({
      name:     `vendor`,
      filename: `concompte-lib.js`,
      minChunks: m => m.context && m.context.indexOf( `node_modules` ) !== -1
    }),
  ],
  module: {
    rules: [
      {
        test:     /\.jsx?$/,
        include: [
          path.resolve( __dirname, 'js' ),
          path.resolve( __dirname, 'shared' ),
          path.resolve( __dirname, 'views' ),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
          },
        },
      },
    ],
  }
}
