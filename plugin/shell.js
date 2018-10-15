module.exports = utils => ({
  name: 'Shell',

  get filter() {
    return process.platform === 'darwin' || process.platform === 'linux';
  },

  get shell() {
    return process.env.SHELL || utils.runSync('getent passwd $LOGNAME | cut -d: -f7 | head -1');
  },

  get version() {
    return utils.run(`${this.shell} --version`).then(utils.findVersion);
  },

  get path() {
    return utils.which(this.shell);
  },
});
