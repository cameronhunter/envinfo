module.exports = utils => ({
  name: 'Go',

  get version() {
    return utils.run('go version').then(utils.findVersion);
  },

  get path() {
    return utils.which('go');
  },
});
