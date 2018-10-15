module.exports = utils => ({
  name: 'Elixir',

  get version() {
    return utils
      .run('elixir --version')
      .then(v => utils.findVersion(v, /[Elixir]+\s([\d+.[\d+|.]+)/, 1));
  },

  get path() {
    return utils.which('elixir');
  },
});
