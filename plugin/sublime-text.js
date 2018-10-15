module.exports = utils => ({
  name: 'Sublime Text',

  get version() {
    switch (process.platform) {
      case 'darwin':
        return utils.getDarwinApplicationVersion('com.sublimetext.3');
      default:
        return utils.run('subl --version').then(version => utils.findVersion(version, /\d+/));
    }
  },

  get path() {
    return process.platform === 'darwin' ? Promise.resolve() : utils.which('subl');
  },
});
