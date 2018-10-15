module.exports = utils => ({
  name: 'Watchman',

  get version() {
    return utils
      .which('watchman')
      .then(watchmanPath => (watchmanPath ? utils.run(watchmanPath + ' -v') : undefined));
  },

  get path() {
    return utils.which('watchman');
  },
});
