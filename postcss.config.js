// const postcssNormalize = require('postcss-normalize'); //@import-normalize 导入 sanitize.css
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
// const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer')
const postcssNested = require('postcss-nested') // 解析类似scss语法

module.exports = {
    // parser: 'sugarss',
    parser: 'postcss-scss',
    plugins: [
        // postcssImport(),
        postcssNested(),
        autoprefixer(),
        postcssPresetEnv(),
        // cssnano(),
        
        // postcssNormalize({
        //   browsers: 'last 2 versions'
        // }),
    ]
}
