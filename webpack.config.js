`use strict`

const path    = require( `path` )
const webpack = require( `webpack` )
const args    = require( `yargs` ).argv
const nodeExternals = require(`webpack-node-externals`)
const mergeDeep = require(`lodash/merge`)

const isDev = args.prod !== true
const env = isDev ? `development` : `production`

const sharedServerConfig = {
  // this will prevent bundling node native modules
  target: `node`,
  // get the right __dirname inside bundled files
  // https://webpack.js.org/configuration/node/#node-__dirname
  node: {
    __dirname: true,
  },
  context: __dirname,
  //
  mode:   env,
  entry:  `./path/to/index.js`,
  output: {
    path:     path.resolve(__dirname, `dist`),
    filename: 'output-filename.js',
  },
  // prevent bundling node_modules on server
  // just ignore them :)
  // https://www.npmjs.com/package/webpack-node-externals#quick-usage
  externals: [
    nodeExternals(),
  ],
  // Get the source map working on the server
  // https://medium.com/@muthuks/creating-a-server-bundle-with-webpack-for-universal-rendering-50bf0b71af79
  devtool:    `inline-source-map`,
  plugins: [
    // serverSourceMapPlugin(),
  ],
  module: {
    rules: []
  },
}

const createBabelLoader = includePathName => {
  return {
    test: /\.jsx?$/,
    include: [
      path.resolve( __dirname, includePathName ),
      path.resolve( __dirname, `shared` ),
    ],
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          [`@babel/preset-env`, {targets: {node: `current`}}],
          `@babel/preset-react`,
        ],
      },
    },
  }
}

const serverSourceMapPlugin = () => new webpack.BannerPlugin({
  banner: 'require("source-map-support").install();',
  raw: true,
  entryOnly: false
})

const definePlugin = () => new webpack.DefinePlugin({
  API_URL: JSON.stringify( `http://localhost:4040` ),
})

////////
// SERVER
////////

const server = mergeDeep({}, sharedServerConfig, {
  entry:  path.join( __dirname, `./server/index.js` ),
  output: {
    filename: `server.js`,
  },
  plugins: [
    serverSourceMapPlugin(),
    definePlugin(),
  ],
  module: {
    rules: [
      createBabelLoader( `server` )
    ]
  }
})

////////
// API
////////

const api = mergeDeep({}, sharedServerConfig, {
  entry:  path.join( __dirname, `./api/index.js` ),
  context: path.join(__dirname, `api`),
  output: {
    filename: 'api.js',
  },
  plugins: [
    serverSourceMapPlugin(),
  ],
  module: {
    rules: [
      createBabelLoader( `api` )
    ]
  }
})

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
  plugins: [
    definePlugin(),
  ],
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
          plugins: [
            `@babel/transform-runtime`,
          ],
          presets: [
            `@babel/preset-env`,
            `@babel/preset-react`,
          ],
        },
      },
    }],
  },
}

module.exports = [client, api, server]
