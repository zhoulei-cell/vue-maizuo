module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/scss/base.scss";`
      }
    }
  },
  devServer: {
    open: true
  }
}
