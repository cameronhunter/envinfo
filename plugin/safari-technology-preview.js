module.exports = utils => ({
  name: 'Safari Technology Preview',

  get version() {
    return utils.getDarwinApplicationVersion('com.apple.SafariTechnologyPreview');
  },
});
