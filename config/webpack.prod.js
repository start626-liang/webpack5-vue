const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
// const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        // splitChunks: {
        //     chunks: 'all',
        // },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            // filename: '[name].[hash:5].css',
            // chunkFilename: '[id].css'
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, `../pages`),
        //             to: path.resolve(__dirname, `../dist/pages`),
        //         }
        //     ],
        //     options: {
        //     },
        // })
    ],
});
