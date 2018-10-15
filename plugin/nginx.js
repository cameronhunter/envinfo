module.exports = utils => ({
  name: 'Nginx',

  get filter() {
    return process.platform === 'darwin' || process.platform === 'linux';
  },

  get version() {
    return utils.run('nginx -v 2>&1').then(utils.findVersion);
  },

  get path() {
    return utils.run('which nginx');
  },
});
