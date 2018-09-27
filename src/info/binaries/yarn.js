module.exports = utils => ({
  name: 'Yarn',

  get version() {
    return utils.run('yarn -v');
  },

  get path() {
    return utils.which('yarn').then(utils.condensePath);
  },
});
