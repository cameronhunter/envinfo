module.exports = utils => ({
  name: 'PhpStorm',

  get version() {
    return utils.getDarwinApplicationVersion('com.jetbrains.PhpStorm');
  },
});
