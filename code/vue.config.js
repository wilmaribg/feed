const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  assetsDir: './',
  outputDir: 'report-feed',
  publicPath: '/report-feed',
  filenameHashing: false,
  transpileDependencies: true,
  devServer: {
    https: false,
    port: 3003
  }
})
