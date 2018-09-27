module.exports = utils => ({
  name: 'Nano',

  get filter() {
    return process.platform === 'darwin' || process.platform === 'linux';
  },

  get version() {
    return utils.run('nano --version').then(utils.findVersion);
  },

  get path() {
    return utils.run('which nano');
  },
});
