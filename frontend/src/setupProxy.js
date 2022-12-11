const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/artists",
        createProxyMiddleware({
            target: "http://backend:8000",
            changeOrigin: true,
        })
    );
};