module.exports = utils => ({
  name: 'Docker',

  get version() {
    return utils.run('docker --version').then(utils.findVersion);
  },

  get path() {
    return utils.which('docker');
  },
});
