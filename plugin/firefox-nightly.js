module.exports = utils => ({
  name: 'Firefox Nightly',

  get filter() {
    return process.platform === 'darwin' || process.platform === 'linux';
  },

  get version() {
    switch (process.platform) {
      case 'darwin':
        return utils.getDarwinApplicationVersion('org.mozilla.nightly');
      case 'linux':
        return utils.run('firefox-trunk --version').then(v => v.replace(/^.* ([^ ]*)/g, '$1'));
      default:
        return Promise.reject(new Error(`Unsupported platform "${process.platform}"`));
    }
  },
});
