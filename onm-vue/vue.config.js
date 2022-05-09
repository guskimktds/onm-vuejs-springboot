module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    host: 'sub.ktvsaas.co.kr',
    port : 8443,
    https: true
  },
  configureWebpack: function(config) {
    if(process.env.NODE_ENV === 'local'){
      config.output.filename = 'js/[name].[hash].js'
      config.output.chunkFilename = 'js/[name].[hash].js'
    }
  }
  
}

