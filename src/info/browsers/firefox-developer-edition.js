module.exports = utils => ({
  name: 'Firefox Developer Edition',

  get version() {
    return utils.getDarwinApplicationVersion('org.mozilla.firefoxdeveloperedition');
  },
});
