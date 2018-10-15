module.exports = utils => ({
  name: 'Homebrew',

  get filter() {
    return process.platform === 'darwin';
  },

  get version() {
    return utils.run('brew --version').then(utils.findVersion);
  },

  get path() {
    return utils.which('brew');
  },
});
