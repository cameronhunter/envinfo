module.exports = utils => ({
  name: 'Emacs',

  get filter() {
    return process.platform === 'darwin' || process.platform === 'linux';
  },

  get version() {
    return utils.run('emacs --version').then(utils.findVersion);
  },

  get path() {
    return utils.run('which emacs');
  },
});
