// @ts-ignore
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app: any) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://110.80.41.154:50001/',
            changeOrigin: true,
        })
    );
};