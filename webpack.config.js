`use strict`

const path    = require( `path` )
const webpack = require( `webpack` )
const args    = require( `yargs` ).argv

const isDev   = args.prod !== true

const entry   = {
  app:      `./client/index.jsx`,
}
const output  = {
  filename: `concompte.js`,
  path:     path.resolve( __dirname, 'public' )
}
const plugins = [
  // https://webpack.js.org/plugins/commons-chunk-plugin/#passing-the-minchunks-property-a-function
  new webpack.optimize.CommonsChunkPlugin({
    name:     `vendor`,
    filename: `concompte-lib.js`,
    minChunks: m => m.context && m.context.indexOf( `node_modules` ) !== -1
  }),
]

if (isDev) {
  // plugins.push(new webpack.HotModuleReplacementPlugin())
}

const rules = [
  {
    test:     /\.jsx?$/,
    include: [
      path.resolve( __dirname, 'client' ),
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
]

module.exports = {
  entry,
  output,
  watch:    true,
  devtool:  'inline-source-map',
  plugins,
  module: {
    rules,
  },
}
