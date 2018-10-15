module.exports = utils => ({
  name: 'Make',

  get filter() {
    return process.platform === 'darwin' || process.platform === 'linux';
  },

  get version() {
    return utils.run('make --version').then(utils.findVersion);
  },

  get path() {
    return utils.run('which make');
  },
});
