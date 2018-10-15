module.exports = utils => ({
  name: 'npm',

  get version() {
    return utils.run('npm -v');
  },

  get path() {
    return utils.which('npm').then(utils.condensePath);
  },
});
