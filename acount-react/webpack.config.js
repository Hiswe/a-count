'use strict'

const path = require(`path`)
const chalk = require(`chalk`)
const webpack = require(`webpack`)
const args = require(`yargs`).argv
const nodeExternals = require(`webpack-node-externals`)
const ExtractTextPlugin = require(`extract-text-webpack-plugin`)
const BundleAnalyzerPlugin = require(`webpack-bundle-analyzer`)
  .BundleAnalyzerPlugin

const isProd = args.env && args.env.production
const isDev = !isProd
const env = isProd ? `production` : `development`

console.log(`build with environment`, chalk.magenta(env))

process.on('uncaughtException', error => {
  console.error(error.stack)
})

////////
// SERVER
////////

const server = {
  entry: path.join(__dirname, `./server/index.js`),
  output: {
    filename: `application-server.js`,
    path: path.resolve(__dirname, `./`),
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
      entryOnly: false,
    }),
    new webpack.NormalModuleReplacementPlugin(
      /isomorphic-config$/,
      path.join(__dirname, `./shared/isomorphic-config-server`),
    ),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  // define mode as `none` because we don't want minifying in production
  mode: `none`,
  // prevent bundling node_modules on server
  // • just ignore them :)
  // • https://www.npmjs.com/package/webpack-node-externals#quick-usage
  // since we're using yarn workspaces there is some issues with nodeExternals
  // https://github.com/liady/webpack-node-externals/issues/39#issuecomment-356647854
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../node_modules'),
    }),
  ],
  devtool: `inline-source-map`,
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, `server`),
          path.resolve(__dirname, `shared`),
        ],
        use: {
          loader: `babel-loader`,
          options: {
            babelrc: true,
          },
        },
      },
    ],
  },
}

////////
// CLIENT
////////

const client = {
  target: `web`,
  mode: env,
  entry: path.join(__dirname, `./client/index.js`),
  output: {
    filename: `application-client.js`,
    chunkFilename: `[name].application-client.js`,
    path: path.resolve(__dirname, `./server/public`),
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: `static`,
      openAnalyzer: false,
      defaultSizes: `stat`,
      reportFilename: `webpack-report.html`,
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fr\.js/),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify(env),
        IS_DEV: JSON.stringify(isDev),
        IS_PROD: JSON.stringify(isProd),
      },
    }),
    new webpack.NormalModuleReplacementPlugin(
      /isomorphic-config$/,
      path.join(__dirname, `./shared/isomorphic-config-browser`),
    ),
    new ExtractTextPlugin(`application-client.css`),
  ],
  devtool: isDev ? `inline-source-map` : false,
  // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: `all`,
          test: path.resolve(__dirname, `node_modules`),
          name: `vendor`,
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, `client`),
          path.resolve(__dirname, `shared`),
        ],
        use: {
          loader: `babel-loader`,
          options: {
            babelrc: false,
            presets: [`@babel/preset-env`, `@babel/preset-react`],
            plugins: [
              `@babel/transform-runtime`,
              `@babel/plugin-proposal-object-rest-spread`,
              `@babel/plugin-proposal-class-properties`,
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: `style-loader`,
          use: [
            {
              loader: `css-loader`,
              options: {
                sourceMap: isDev,
                url: false,
              },
            },
            {
              loader: `postcss-loader`,
              options: {
                ident: 'postcss',
                sourceMap: isDev,
                plugins: loader => [require(`autoprefixer`)()],
              },
            },
            {
              loader: `sass-loader`,
              options: {
                sourceMap: isDev,
              },
            },
          ],
        }),
      },
    ],
  },
}

module.exports = [client, server]
