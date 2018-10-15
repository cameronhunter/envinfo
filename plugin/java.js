module.exports = utils => ({
  name: 'Java',

  get filter() {
    return process.platform === 'darwin' || process.platform === 'linux';
  },

  get version() {
    return utils.run('javac -version 2>&1').then(utils.findVersion);
  },

  get path() {
    return utils.run('which javac');
  },
});
