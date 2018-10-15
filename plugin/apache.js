module.exports = utils => ({
  name: 'Apache',

  get filter() {
    return process.platform === 'darwin' || process.platform === 'linux';
  },

  get version() {
    return utils.run('apachectl -v').then(utils.findVersion);
  },

  get path() {
    return utils.run('which apachectl');
  },
});
