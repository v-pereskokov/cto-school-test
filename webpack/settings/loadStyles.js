const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('../../config');

const {__DEV__} = config.globals;

module.exports = () => webpackConfig => {
    const cssLoaders = [
        {loader: './webpack/loaders/b_-loader/loader.js'},
        __DEV__ ? {loader: 'style-loader'} : MiniCssExtractPlugin.loader,
        {loader: 'css-loader'},
        {loader: 'postcss-loader'},
    ];

    const sassLoader = {
        loader: 'sass-loader',
        options: {
            sourceMap: false,
            resolveUrl: true,
        }
    };

    webpackConfig.plugins.push(
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        }),
    );

    webpackConfig.module.rules.push(
        {
            test: /\.css$/,
            use: cssLoaders,
        },
        {
            test: /\.scss$/,
            use: [
                ...cssLoaders,
                sassLoader,
                {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: [
                            'client/sass/_variables.scss',
                            'client/sass/_functions.scss',
                            'client/sass/_mixins.scss',
                            'client/sass/_extendable.scss',
                            'client/sass/_reset.scss',
                        ],
                    },
                },
            ],
        },
    );

    return webpackConfig;
};
