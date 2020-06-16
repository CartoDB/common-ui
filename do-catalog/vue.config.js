module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,

  css: {
    extract: false,
    loaderOptions: {
      sass: {
        prependData: `
          /* Theme */
          @import "~@/styles/colors.scss";
          $color-primary: ${process.env.VUE_APP_COLOR_PRIMARY || '$blue--500'};
          $color-primary--soft: ${process.env.VUE_APP_COLOR_PRIMARY_SOFT ||
            '$blue--100'};
          $color-primary--dark: ${process.env.VUE_APP_COLOR_PRIMARY_DARK ||
            '$blue--700'};
          $color-premium: $yellow--700;
        `
      }
    }
  },

  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .options({ limit: 5120000 });

    config.module.rule('svg').uses.delete('file-loader');

    config.module
      .rule('svg')
      .use()
      .loader('url-loader')
      .options({ limit: 51200 });
  }
};
