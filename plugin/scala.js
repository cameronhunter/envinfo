module.exports = utils => ({
  name: 'Scala',

  get filter() {
    return process.platform === 'darwin' || process.platform === 'linux';
  },

  get version() {
    return utils.run('scalac -version').then(utils.findVersion);
  },

  get path() {
    return utils.run('which scalac');
  },
});
