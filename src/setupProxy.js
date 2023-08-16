const { createProxyMiddleware } = require("http-proxy-middleware");

const proxybaseURL = {
  target: `https://market-id.vercel.app/api/v1`,
  changeOrigin: true,
  pathRewrite: {
    "^/api": "",
  },
};

const proxyIndonesiaRegionAPI = {
  target: `http://www.emsifa.com/api-wilayah-indonesia/api`,
  changeOrigin: true,
  pathRewrite: {
    "^/api-region": "",
  },
};

module.exports = function (app) {
  app.use("/api", createProxyMiddleware(proxybaseURL));
  app.use("/api-region", createProxyMiddleware(proxyIndonesiaRegionAPI));
};
