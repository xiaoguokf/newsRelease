const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
    let target = ''
    // 代理目标地址
    // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
    if (req.url.startsWith('/api')) {
        target = 'http://106.52.150.170:8080/'
        console.log("检测");
    }

    // 创建代理对象并转发请求
    createProxyMiddleware({
        target, //目标地址
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/api': '/' } //这里重写路径
    })(req, res)
}

