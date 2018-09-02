'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: true
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    'markdown-it-vue': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].mini.js',
    library: 'MarkdownItVue',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    },
    modules: ['node_modules']
  },
  module: {
    rules: [
      ... [createLintingRule()],
      ...utils.styleLoaders(),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: utils.cssLoaders(),
          transformToRequire: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
  ,plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}
