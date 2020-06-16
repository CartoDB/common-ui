module.exports = {
  presets: [
    [ '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: false
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-template-literals'
  ]
};
