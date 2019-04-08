const webpack = require('webpack');


// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: cssOptions,
    },
    { loader: 'postcss-loader' },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push({
      loader: 'less-loader',
    });
  }
  return loaders;
};

module.exports = {
  devtool: 'cheap-module-eval-source-map',
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    host: 'localhost', // 默认是localhost
    port: 3000, // 端口
    open: true, // 自动打开浏览器
    hot: true, // 开启热更新
  },
};
