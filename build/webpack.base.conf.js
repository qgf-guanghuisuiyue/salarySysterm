var path = require('path')
var utils = require('./utils')
var config = require('../config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
// plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "static/css/style.css",
    // disable: process.env.NODE_ENV === "development"
});

const extractLess = new ExtractTextPlugin({
    filename: "static/css/antd.css",
    // disable: process.env.NODE_ENV === "development"
});

// 公共库
const vendor = [
    'react',
    'react-dom',
    'react-redux',
    'redux',
    'redux-thunk',
    'md5',
    'store',
    'moment'
]

module.exports = {
  entry: {
    vendor: vendor,
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      antd: 'antd'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
        // 'moment':resolve('node_modules/moment/min/moment-with-locales.min.js'),
        'md5': resolve('node_modules/blueimp-md5/js/md5.min.js'),
        'store': resolve('node_modules/store/dist/store.legacy.min.js'),
        '@': resolve('src'),
        'constants': resolve('src/constants'),
        'actions': resolve('src/actions'),
        'reducer': resolve('src/reducer'),
        'pages': resolve('src/pages'),
        'views': resolve('src/views'),
        'utils': resolve('src/utils'),
        'components': resolve('src/components'),
        'data': resolve('src/data'),
        'static': resolve('static')
    }
  },
  devtool: "source-map",
  module: {
    rules: [
        //https://github.com/bhovhannes/svg-url-loader
        {
            test: /\.svg/,
            loader:'svg-url-loader',
            options: {}
        },
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
            // @remove-on-eject-begin
            // babelrc: false,
            // presets: [require.resolve('babel-preset-react-app')],
            // @remove-on-eject-end
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            plugins: ['lodash']
        },
        include: [resolve('src'), resolve('test')]
      },
    //   {
    //     test: /\.css$/,
    //     use: [ 'style-loader', 'css-loader' ]
    //   },
      {
        test: /\.(scss|css)$/,
        // include: [resolve('src')],
        use: extractSass.extract({
            use: [
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true,
                        importLoaders: 1,
                    }
                }, 
                {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true,
                        plugins: function () {
                            return [
                                require('autoprefixer')({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ]
                                })
                            ];
                        }
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                        outputStyle: "expanded",
                        sourceMapContents: true
                    }
                }
            ],
            // use style-loader in development
            fallback: "style-loader"
        })
      },
      {
        test: /\.less$/,
        use: extractLess.extract({
            use: [
                // {
                //     loader: "style-loader" // creates style nodes from JS strings
                // }, 
                {
                    loader: "css-loader" // translates CSS into CommonJS
                }, 
                {
                    loader: "less-loader", // compiles Less to CSS
                    options: {
                        "modifyVars":config.theme
                    }
                }
            ],
            // use style-loader in development
            fallback: "style-loader"
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
      new LodashModuleReplacementPlugin,
      extractSass,
      extractLess
  ]
}
