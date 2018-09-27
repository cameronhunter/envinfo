module.exports = utils => ({
  name: 'WebStorm',

  get version() {
    return utils.getDarwinApplicationVersion('com.jetbrains.WebStorm');
  },
});
