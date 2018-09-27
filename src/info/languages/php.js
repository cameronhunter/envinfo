module.exports = utils => ({
  name: 'PHP',

  get version() {
    return utils.run('php -v').then(utils.findVersion);
  },

  get path() {
    return utils.which('php');
  },
});
