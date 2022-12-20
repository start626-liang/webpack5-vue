const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    optimization: {
        runtimeChunk: 'single',
    },
});
