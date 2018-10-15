module.exports = utils => ({
  name: 'Atom',

  get version() {
    return utils.getDarwinApplicationVersion('com.github.atom');
  },
});
