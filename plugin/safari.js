module.exports = utils => ({
  name: 'Safari',

  get version() {
    return utils.getDarwinApplicationVersion('com.apple.Safari');
  },
});
