const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: './src/index.js',
    output: {
        filename: isDev ? '[name].js' : '[name].[contenthash].js',
        path: path.resolve(__dirname, isDev ?'../dev':'../dist'),
        clean: true,
        pathinfo: !isDev
    },
    resolve: {
        // 路径别名
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@pages': path.resolve(__dirname, '../webpack-pages')
        },
        // 路径别名自动解析确定的扩展
        extensions: ['.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "thread-loader",
                        options: {
                            // 产生的 worker 的数量，默认是 cpu 的核心数
                            // workers: 4,
                            // 一个 worker 进程中并行执行工作的数量,默认为20
                            // workerParallelJobs: 50,
                            // Allow to respawn a dead worker pool
                            // respawning slows down the entire compilation
                            // and should be set to false for development
                            poolRespawn: false,
                            // 闲置时定时删除 worker 进程
                            // 默认为 500ms
                            // 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
                            poolTimeout: 2000,
                            // 池(pool)分配给 worker 的工作数量
                            // 默认为 200
                            // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
                            poolParallelJobs: 50,
                            // 池(pool)的名称
                            // 可以修改名称来创建其余选项都一样的池(pool)
                            name: "my-pool"
                        }
                    },
                    'babel-loader'
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // {
            //     test: /\.css$/i,
            //     use: ['style-loader', 'css-loader'],
            // },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'vue-style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        // options: {
                        //   publicPath: (resourcePath, context) => {
                        //     // publicPath is the relative path of the resource to the context
                        //     // e.g. for ./css/admin/main.css the publicPath will be ../../
                        //     // while for ./css/main.css the publicPath will be ../
                        //     return path.relative(path.dirname(resourcePath), context) + '/'
                        //   }
                        // }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        },
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    isDev ? 'vue-style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../',
                            //   publicPath: (resourcePath, context) => {
                            //     // publicPath is the relative path of the resource to the context
                            //     // e.g. for ./css/admin/main.css the publicPath will be ../../
                            //     // while for ./css/main.css the publicPath will be ../
                            //     return path.relative(path.dirname(resourcePath), context) + '/'
                            //   }
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        },
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/i,
                use: [
                    isDev ? 'vue-style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../',
                            //   publicPath: (resourcePath, context) => {
                            //     // publicPath is the relative path of the resource to the context
                            //     // e.g. for ./css/admin/main.css the publicPath will be ../../
                            //     // while for ./css/main.css the publicPath will be ../
                            //     return path.relative(path.dirname(resourcePath), context) + '/'
                            //   }
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        },
                    },
                    'less-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[hash][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/font/[hash][ext][query]'
                }
            }
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new BundleStatsWebpackPlugin(),
        new HtmlWebpackPlugin({
            // favicon: path.join(__dirname, '../public/bj-favicon.png'),
            template: path.join(__dirname, '../public/index.html'),
            // https://github.com/jantimon/html-webpack-plugin#minification
            minify: {
                collapseWhitespace: isDev ? false : true,
                removeComments: isDev ? false : true,
                removeRedundantAttributes: isDev ? false : true,
                removeScriptTypeAttributes: isDev ? false : true,
                removeStyleLinkTypeAttributes: isDev ? false : true,
                useShortDoctype: isDev ? false : true
            }
        }),
    ],
};