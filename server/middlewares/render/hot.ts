/* eslint-disable */

// TODO: Настроить пути различные у webpack

import {RequestHandler} from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../../webpack.config.js';
import render from './render';

function getWebpackMiddlewares(config: webpack.Configuration): RequestHandler[] {
    // const compiler = webpack({...config, mode: 'development'});

    return [
        // devMiddleware(compiler, {
        //     logLevel: 'error',
        //     publicPath: config.output!.publicPath!
        // }),
        // hotMiddleware(compiler, {path: '/__webpack_hmr'}),
    ];
}

export default [
    // ...getWebpackMiddlewares(webpackConfig),
    render,
];
