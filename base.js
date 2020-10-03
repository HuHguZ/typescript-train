const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    context: resolve(__dirname, 'src'),
    entry: ['./advanced.ts'],
    plugins: [
        new HTMLWebpackPlugin(),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-typescript'
                            ],
                            plugins: [
                                ['@babel/plugin-proposal-decorators', { legacy: true }],
                                ['@babel/plugin-transform-typescript', { allowNamespaces: true }],
                                '@babel/plugin-proposal-class-properties',
                            ]
                        }
                    }
                ]
            }
        ]
    },
    target: 'web'
};