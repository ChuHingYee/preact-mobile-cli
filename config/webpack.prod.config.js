const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isReport = require('yargs').argv.report;

const publicPath = './';
// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../../',
      },
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    { loader: 'postcss-loader' },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push({
      loader: preProcessor,
    });
  }
  return loaders;
};

const config = {
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: getStyleLoaders({
          importLoaders: 1,
        }),
      },
      {
        test: /\.module\.css$/,
        use: getStyleLoaders({
          importLoaders: 1,
          modules: true,
          localIdentName: '[local]__[hash:base64:5]',
        }),
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: getStyleLoaders({
          importLoaders: 2,
        }, 'less-loader'),
      },
      {
        test: /\.module\.less$/,
        use: getStyleLoaders({
          importLoaders: 2,
          modules: true,
          localIdentName: '[local]__[hash:base64:5]',
        }, 'less-loader'),
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        common: {
          minChunks: 2,
          name: 'commons',
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new OptimizeCss(),
    new TerserPlugin({
      terserOptions: {
        warnings: false,
        sourceMap: false,
        parallel: true,
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      publicPath: '../../',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
};

if (isReport) {
  config.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
  }));
}

module.exports = config;
