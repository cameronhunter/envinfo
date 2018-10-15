module.exports = utils => ({
  name: 'Perl',

  get version() {
    return utils.run('perl -v').then(utils.findVersion);
  },

  get path() {
    return utils.which('perl');
  },
});
