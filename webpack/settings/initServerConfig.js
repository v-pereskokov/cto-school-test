const webpack = require('webpack');
const merge = require('lodash.merge');
const {config: envConfig} = require('dotenv');

envConfig();

const webpackNodeExternals = require('webpack-node-externals');

const config = require('../../config');

const {__DEV__} = config.globals;
const paths = config.utils_paths;

const {DADATA_TOKEN, OPEN_WEATHER_TOKEN} = process.env;

module.exports = ({entry, context, provideClient = {}}) => webpackConfig => {
    Object.assign(webpackConfig, {
        context,
        target: 'node',
        devtool: undefined,
        entry: entry.app,
        mode: __DEV__ ? 'development' : 'production',
        externals: [webpackNodeExternals()],

        resolve: {
            extensions: ['.js', '.ts', '.tsx', '.json'],
            modules: [
                'node_modules',
                paths.base(config.dir_static),
            ],
            alias: config.aliases,
        },

        output: {
            filename: 'server.js',
            path: paths.base(config.dir_server_dist),
        },

        module: {rules: []},

        stats: {
            all: undefined,
            builtAt: !__DEV__,
            chunks: !__DEV__,
            assets: !__DEV__,
            errors: true,
            warnings: true,
            outputPath: true,
            timings: true,
        },
        performance: {
            hints: false
        },

        plugins: [
            new webpack.ProgressPlugin(),
            new webpack.DefinePlugin(merge(
                config.globals,
                {
                    'process.env': {
                        DADATA_TOKEN: JSON.stringify(DADATA_TOKEN),
                        OPEN_WEATHER_TOKEN: JSON.stringify(OPEN_WEATHER_TOKEN),
                    },
                },
            )),
            new webpack.ProvidePlugin(provideClient),
        ],

        resolveLoader: {
            modules: [
                'node_modules',
                'webpack/loaders'
            ]
        },
    });

    return webpackConfig;
};
