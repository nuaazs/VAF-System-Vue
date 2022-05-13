// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })


module.exports = {
  //transpileDependencies: true,

  // 输出文件目录
  outputDir: 'dist',
  publicPath:'./',

  lintOnSave: false,

  chainWebpack: () => { },
  configureWebpack: () => { },

  devServer: {
      host:'0.0.0.0',
      port: 8081,
      //ws: false,
      // disableHostCheck: true
  },
  // 第三方插件配置
  pluginOptions: {
      // ...
  }
}
