module.exports = {
    // 输出文件目录
    outputDir: 'dist',
    publicPath:'./',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
 
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    //compiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => { },
    configureWebpack: () => { },
    //如果想要引入babel-polyfill可以这样写
    // configureWebpack: (config) => {
    //   config.entry = ["babel-polyfill", "./src/main.js"]
    // },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    //vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    // productionSourceMap: true,
    // css相关配置
    //css: {
    // 是否使用css分离插件 ExtractTextPlugin
    //   extract: true,
    // 开启 CSS source maps?
    //   sourceMap: false,
    // css预设器配置项
    //   loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false
    // },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    //parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    //   pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        host:'0.0.0.0',
        port: 8081,
        //  proxy: { // 设置代理
        //     '/api': {
        //         // target: 'https://www.lyxxkj.com.cn',
        //         target:'http://192.168.0.85:8070',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             // '^/api': '/api'
        //             '^/api': ''
        //         }
        //     },
        // }, 
        disableHostCheck: true
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}