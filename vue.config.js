// eslint-disable-next-line no-undef
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://lx.web.cdyoue.com',
        changeOrigin: true
      }
    }
  }
}
