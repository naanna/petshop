const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: true,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@components', resolve('src/components'))
            .set('@assets', resolve('src/assets'))
            .set('@picture', resolve('src/assets/picture'))
            .set('@store', resolve('src/store'))
    },
    devServer: {
        // 设置主机地址
        //   host: '127.1.0.1',
        // 设置默认端口
        //port: 3000,
        // 设置代理
        proxy: {
            '/api': {
                // 目标 API 地址
                target: 'http://127.0.0.1:3000',
                // 如果要代理 websockets
                ws: true,
                // 将主机标头的原点更改为目标URL
                changeOrigin: false
            }
        }
    },
};