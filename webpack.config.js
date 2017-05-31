var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
      app:'./src/front/index.js',
      vendor: [
        'react',
        'react-dom',
        'react-router',
        "jquery"
      ]
    },
    output: {
        path: 'public',
        filename: '[name].js',
        publicPath: '',
        chunkFilename: "[name].min.js"    // require.ensure 按需加载的时候  输出名称
    },

    module: {
        loaders: [
            {
                test: /\.(png|jpg|woff|svg|eot|ttf)\??.*$/,
                loader: 'url',
                query: {
                    limit: 1,
                    name: '/asset/[name].[ext]'
                }
            },
            { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'img?progressive=true' },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                cacheDirectory: true,
                query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins: ['transform-decorators-legacy']
                },
                exclude: /node_modules/
            },
            {
                test: /\.css?$/,
                loader: ExtractTextPlugin.extract("style-loader", "css?modules&importLoaders=1&localIdentName=[local]!postcss-loader")
            }
        ]
    },
    postcss: function () {
        return [
                    require('autoprefixer'),
                    require('precss'),
                    require('postcss-advanced-variables')({
                        variables: {
                            // font
                            'site-width': '1180px',
                            'g_color': '#d80c18'
                        }
                    })
                ];
    },
    plugins: [
        new webpack.ProvidePlugin({
            $ : "jquery",
            jQuery : "jquery",
            "window.jQuery" : "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin("vendor","vendor.js"),
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin("[name].css"),	//单独使用style标签加载css并设置其路径
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            mangle: true,
            output: {
                comments: false, // remove all comments
            },
            except: ['$super', '$', 'exports', 'require'] //排除关键字
        }),
        new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          },
          "isBrowser": true
        })
    ]
}
