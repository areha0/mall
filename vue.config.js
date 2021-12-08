module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [".css"],
      alias: {
        "assets": "@/assets",
        "network": "@/network",
        "components": "@/components",
        "views": "@/views",
        "commen": "@/commen"
      }
    },
  },
  productionSourceMap: false,
  // publicPath: './'
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        // pathRewrite: {
        // '^/api': ''
        // }
      }
    }
  }
}