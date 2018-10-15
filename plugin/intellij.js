module.exports = utils => ({
  name: 'IntelliJ',

  get version() {
    return utils.getDarwinApplicationVersion('com.jetbrains.intellij');
  },
});
