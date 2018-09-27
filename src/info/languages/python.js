module.exports = utils => ({
  name: 'Python',

  get version() {
    return utils.run('python -V 2>&1').then(utils.findVersion);
  },

  get path() {
    return utils.run('which python');
  },
});
