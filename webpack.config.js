const merge = require('webpack-merge');
const baseConfig = require('./config/webpack.base.config');


let config;
if (process.env.NODE_ENV === 'production') {
  config = require('./config/webpack.prod.config');
} else {
  config = require('./config/webpack.dev.config');
}

module.exports = merge(baseConfig, config);
