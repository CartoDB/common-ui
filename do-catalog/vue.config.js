module.exports = {
  lintOnSave: false,
  css: { extract: false },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .options({ limit: 5120000 });
  }
};
