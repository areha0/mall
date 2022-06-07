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
    output: {
      filename: './js/[name].chunk.js',
      // chunkFilename: './js/[name].[chunkhash:8].js'
      chunkFilename: './js/[name].chunk.js'
    },
  },
  productionSourceMap: false,
  // publicPath: './'
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
}