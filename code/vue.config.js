const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  assetsDir: './',
  outputDir: 'raf',
  publicPath: '/raf',
  filenameHashing: false,
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Prolibu | RAF'
    }
  },
  devServer: {
    https: false,
    port: 3003
  }
})
