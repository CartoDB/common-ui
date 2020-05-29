module.exports = {
  lintOnSave: false,
  css: { extract: false },
  chainWebpack: config => {
    config.module.rule('images')
      .use('url-loader')
      .loader('url-loader')
      .options({ limit: 5120000 })

    config.module.rule('svg')
      .uses
      .delete('file-loader')

    config.module.rule('svg')
      .use()
      .loader('url-loader')
      .options({ limit: 51200 })
  }
};
