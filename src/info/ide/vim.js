module.exports = utils => ({
  name: 'vim',

  get filter() {
    return process.platform === 'darwin' || process.platform === 'linux';
  },

  get version() {
    return utils.run('vim --version').then(utils.findVersion);
  },

  get path() {
    return utils.run('which vim');
  },
});
