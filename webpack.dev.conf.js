const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: '#eval-source-map',

  watch: true,
  entry: {
    //   client:['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'],
    app: './src/front/index.js',
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'jquery',
    ],
  },
  output: {
    path: '/',
    filename: '[name].js',
    publicPath: '',
    chunkFilename: '[name].min.js',    // require.ensure 按需加载的时候  输出名称
  },

  module: {
    noParse: ['jquery'],                  // 忽略对已知文件解析  提高编译速度
    loaders: [
      {
        test: /\.(png|jpg|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader',
        query: {
          limit: 1,
          name: '/asset/[name].[ext].[hash]',
        },
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        cacheDirectory: true,
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-decorators-legacy', 'transform-object-assign'],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css?$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css?modules&importLoaders=1&localIdentName=[local]!postcss-loader'),
      },
    ],
  },
  postcss() {
    return [
      require('autoprefixer'),
      require('precss'),
      require('postcss-advanced-variables')({
        variables: {
          // font
          'site-width': '1180px',
          g_color: '#d80c18',
        },
      }),
    ];
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('[name].css'),	// 单独使用style标签加载css并设置其路径
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      isBrowser: true,
    }),
    new webpack.NoErrorsPlugin(),
  ],
};
