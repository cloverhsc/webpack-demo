const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
var webpack = require('webpack')

const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const common = {
    entry:
    {
        // app: PATHS.app,
        // vendor: ['react']
        app: PATHS.app,
        vendor: ['./app/a.js']
    },
    output:
    {
        path: PATHS.build,
        filename: '[name].js'
        // filename: 'app.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack demo'
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     filename: 'common.js',
        //     minChunks: Infinity
        // }),
    ],
    resolve: {
        alias: {
            'a': '/app/a.js'
        }
    }
}
module.exports = function(env) {
    if(env === 'build')
    {
        return merge(
            common,
            {
                devtool: 'source-map'
            },
            parts.setFreeVariable(
                'process.env.NODE_ENV',
                'production'
            ),
            // parts.extractBundle({
            //     name: 'vendor',
            //     entries:['/app/a.js']
            // }),
            parts.minify(),
            parts.setupCSS(PATHS.app)
        );
    }

    return merge(
        common,
        {
            devtool: 'eval-source-map'
            // Disable performance hints during development
            // performance: {
            //     hints: false
            // }
        },
        parts.setupCSS(PATHS.app),
        parts.devServer({
            // Customize host/port here if needed
            host: process.env.HOST,
            port: process.env.PORT
        })
    )
};
