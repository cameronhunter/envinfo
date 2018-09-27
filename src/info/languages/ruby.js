module.exports = utils => ({
  name: 'Ruby',

  get version() {
    return utils.run('ruby -v').then(utils.findVersion);
  },

  get path() {
    return utils.which('ruby');
  },
});
