// eslint-disable-next-line no-undef
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://lx.web.cdyoue.com',
        changeOrigin: true
      },
      '/oauth': {
        target: 'http://lx.web.cdyoue.com',
        changeOrigin: true
      },
      '/v3': {
        target: 'http://api.map.baidu.com/reverse_geocoding',
        changeOrigin: true
      }
    }
  }
}
