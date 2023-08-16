const { createProxyMiddleware } = require("http-proxy-middleware");

const proxybaseURL = {
  target: process.env.REACT_APP_BASE_URL || "",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "",
  },
};

const proxyIndonesiaRegionAPI = {
  target: process.env.REACT_APP_API_INDONESIA_REGION || "",
  changeOrigin: true,
  pathRewrite: {
    "^/api-region": "",
  },
};

module.exports = function (app) {
  app.use("/api", createProxyMiddleware(proxybaseURL));
  app.use("/api-region", createProxyMiddleware(proxyIndonesiaRegionAPI));
};
