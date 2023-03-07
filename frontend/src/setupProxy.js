const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/artists",
        createProxyMiddleware({
            target: "http://localhost:8080",
            changeOrigin: true,
            timeout: 300000 // 5 minutes
        })
    );
};