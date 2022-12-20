const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const path = require('path')
module.exports = merge(common, {
    devtool: 'eval',
    devServer: {
        hot: true, // 热替代
        // host: 'localhost',
        port: 1990, // 端口号
        static: {
            directory: path.join(__dirname, '../pages'),
            publicPath: '/pages',
        },
        proxy: {
            // '/api': {
            //     //本地服务接口地址
            //     target: '',
            //     ws: true,
            //     pathRewrite: {
            //         '^/api': '/'
            //     }
            // }
        }
    },
    optimization: {
        moduleIds: 'named',
        runtimeChunk: true
    },
});
