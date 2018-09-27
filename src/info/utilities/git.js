module.exports = utils => ({
  name: 'Git',

  get filter() {
    return process.platform === 'darwin' || process.platform === 'linux';
  },

  get version() {
    return utils.run('git --version').then(utils.findVersion);
  },

  get path() {
    return utils.run('which git');
  },
});
