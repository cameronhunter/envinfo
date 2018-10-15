module.exports = utils => ({
  name: 'Chrome Canary',

  get version() {
    return utils.getDarwinApplicationVersion('com.google.Chrome.canary');
  },
});
