`use strict`

const path    = require( `path` )
const webpack = require( `webpack` )
const args    = require( `yargs` ).argv
const nodeExternals = require( `webpack-node-externals` )
const ExtractTextPlugin = require( `extract-text-webpack-plugin` )

const isDev = args.prod !== true
const env = isDev ? `development` : `production`

////////
// SERVER
////////

const server = {
  entry:  path.join( __dirname, `./server/index.js` ),
  output: {
    filename: `server.js`,
    path:     path.resolve( __dirname, `dist` ),
  },
  // this will prevent bundling node native modules
  target: `node`,
  // get the right __dirname inside bundled files
  // https://webpack.js.org/configuration/node/#node-__dirname
  node: {
    __dirname: true,
  },
  context: __dirname,
  plugins: [
    // enable source-map server side
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
    new webpack.NormalModuleReplacementPlugin(
      /isomorphic-config$/,
      path.join(__dirname, `./shared/isomorphic-config-server`)
    ),
  ],
  //
  mode:   env,
  // prevent bundling node_modules on server
  // • just ignore them :)
  // • https://www.npmjs.com/package/webpack-node-externals#quick-usage
  externals: [
    nodeExternals(),
  ],
  devtool:    `inline-source-map`,
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve( __dirname, `server` ),
        path.resolve( __dirname, `shared` ),
      ],
      use: {
        loader: `babel-loader`,
        options: {
          babelrc: true,
        },
      },
    }]
  }
}

////////
// CLIENT
////////

const client = {
  target: `web`,
  mode:   env,
  entry:  `./client/index.js`,
  output: {
    filename: `concompte.js`,
    path:     path.resolve( __dirname, `server/public` )
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify( true )
      },
    }),
    new webpack.NormalModuleReplacementPlugin(
      /isomorphic-config$/,
      path.join(__dirname, `./shared/isomorphic-config-browser`)
    ),
    new ExtractTextPlugin( `concompte.css` )
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
      test:     /\.js$/,
      include: [
        path.resolve( __dirname, `client` ),
        path.resolve( __dirname, `shared` ),
      ],
      use: {
        loader: `babel-loader`,
        options: {
          babelrc: false,
          presets: [
            `@babel/preset-env`,
            `@babel/preset-react`,
          ],
          plugins: [
            `@babel/transform-runtime`,
            `@babel/plugin-proposal-object-rest-spread`,
            `@babel/plugin-proposal-class-properties`,
          ],
        },
      },
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: `style-loader`,
        use: [{
          loader: `css-loader`,
          options: {
            sourceMap: true,
            url: false,
          },
        }, {
          loader: `postcss-loader`,
          options: {
            ident: 'postcss',
            sourceMap: true,
            plugins: loader => [
              require( `autoprefixer` )(),
            ]
          }
        }, {
          loader: `sass-loader`,
          options: { sourceMap: true },
        }]
      }),
    }],
  },
}

module.exports = [client, server]
