module.exports = utils => ({
  name: 'Firefox',

  get filter() {
    return process.platform === 'darwin' || process.platform === 'linux';
  },

  get version() {
    switch (process.platform) {
      case 'darwin':
        return utils.getDarwinApplicationVersion('org.mozilla.firefox');
      case 'linux':
        return utils.run('firefox --version').then(v => v.replace(/^.* ([^ ]*)/g, '$1'));
      default:
        return Promise.reject(new Error(`Unsupported platform "${process.platform}"`));
    }
  },
});
