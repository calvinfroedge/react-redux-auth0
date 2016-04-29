'use strict'; 

var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.NODE_ENV;
const AUTH0_CLIENTID = process.env.AUTH0_CLIENTID;
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;

var config = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.json?$/, loader: 'json' },
      { test: /\.css$/, loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]' },
      { test: /\.less$/, loader: "style!css!less" }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      'process.env.AUTH0_CLIENTID': JSON.stringify(AUTH0_CLIENTID),
      'process.env.AUTH0_DOMAIN': JSON.stringify(AUTH0_DOMAIN)
    })
  ]
};

if(env === 'build'){
  config.output = {
    library: 'react-redux-auth0',
    libraryTarget: 'umd'
  }
} else if(env === 'development'){
  config.devtool = 'eval-source-map';

  config.entry = [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/dev.js')
  ];

  config.output = {
    path: path.join(__dirname, '/dist/'),
    filename: 'react-redux-auth0.js',
    publicPath: '/'
  };

  config.plugins = config.plugins.concat([
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]);
} else if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    })
  )
}

module.exports = config
