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
        }
    }
}