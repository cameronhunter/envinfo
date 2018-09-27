module.exports = utils => ({
  name: 'Nvim',

  get filter() {
    return process.platform === 'darwin' || process.platform === 'linux';
  },

  get version() {
    return utils.run('nvim --version').then(utils.findVersion);
  },

  get path() {
    return utils.run('which nvim');
  },
});
