import {createProxyMiddleware} from 'http-proxy-middleware';

const {DADATA_TOKEN} = process.env;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const dadataProxy = createProxyMiddleware('/', {
    target: 'https://suggestions.dadata.ru',
    secure: false,
    pathRewrite: {
        '^/suggests/country': '/suggestions/api/4_1/rs/suggest/country',
        '^/suggests/address': '/suggestions/api/4_1/rs/suggest/address',
    },
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Host', 'suggestions.dadata.ru');
        proxyReq.setHeader('Authorization', `Token ${DADATA_TOKEN}`);
    },
});
