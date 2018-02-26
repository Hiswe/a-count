`use strict`

const path    = require( `path` )
const webpack = require( `webpack` )
const args    = require( `yargs` ).argv
const nodeExternals = require(`webpack-node-externals`)

const isDev = args.prod !== true
const env = isDev ? `development` : `production`

////////
// SERVER
////////

// can't make it requireable with the right value :(

// const server = {
//   target: `node`,
//   mode:   env,
//   entry:  `./server/index.js`,
//   output: {
//     path:     path.resolve(__dirname, `dist`),
//     filename: 'server.js',
//     libraryTarget: "umd",
//   },
//   // https://www.npmjs.com/package/webpack-node-externals#quick-usage
//   externals: [
//     nodeExternals(),
//   ],
//   // https://medium.com/@muthuks/creating-a-server-bundle-with-webpack-for-universal-rendering-50bf0b71af79
//   devtool:    `inline-source-map`,
//   plugins: [
//     new webpack.BannerPlugin({
//       banner: 'require("source-map-support").install();',
//       raw: true,
//       entryOnly: false
//     }),
//   ],
//   module: {
//     rules: [{
//       test: /\.jsx?$/,
//       include: [
//         path.resolve( __dirname, `server` ),
//         path.resolve( __dirname, `shared` ),
//       ],
//       use: {
//         loader: 'babel-loader',
//         options: {
//           presets: ['es2015', 'react'],
//         },
//       },
//     }]
//   },
// }

////////
// CLIENT
////////

const client = {
  target: `web`,
  mode:   env,
  entry:  `./client/index.jsx`,
  output: {
    filename: `concompte.js`,
    path:     path.resolve( __dirname, 'public' )
  },
  devtool:    `inline-source-map`,
  // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: `initial`,
          test: path.resolve(__dirname, `node_modules`),
          name: `vendor`,
          enforce: true,
        }
      }
    }
  },
  module: {
    rules: [{
      test:     /\.jsx?$/,
      include: [
        path.resolve( __dirname, `client` ),
        path.resolve( __dirname, `shared` ),
      ],
      use: {
        loader: `babel-loader`,
        options: {
          presets: [`es2015`, `react`],
        },
      },
    }],
  },
}

module.exports = [client]
