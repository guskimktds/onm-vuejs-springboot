const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
.BundleAnalyzerPlugin;

module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    host: 'sub.ktvsaas.co.kr',
    port : 8443,
    https: true
  },
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        // analyzerMode: 'disabled'
      })
    ]
  }
}

