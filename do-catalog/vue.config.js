module.exports = {
  lintOnSave: false,

  css: {
    extract: false,
    loaderOptions: {
      sass: {
        prependData: `
          /* Theme */
          @import "~@/styles/colors.scss";
          $color-primary--soft: $blue--100;
          $color-primary: $blue--500;
          $color-primary--dark: $blue--700;
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
