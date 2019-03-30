const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');

console.log(require('less-loader'));

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'lib': path.resolve(__dirname, 'lib')
        },
        modules: [
            // path.resolve(__dirname, 'lib'),
            path.resolve(__dirname, 'node_modules')
        ],
        mainFields: ['jsnext:main', 'browser', 'main']
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'less-loader' ]
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                use: "url-loader"
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'lib'),
                ],
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        })
    ],
    devtool: "source-map"
}