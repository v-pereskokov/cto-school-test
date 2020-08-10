const {createProxyMiddleware} = require('http-proxy-middleware');

const apiProxy = createProxyMiddleware('/api/**', {
    target: 'https://tst-01.vpa.group:5083/',
    secure: false,
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Host', 'tst-01.vpa.group');
    },
});

export {
    apiProxy,
};
