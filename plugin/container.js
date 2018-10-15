module.exports = utils => ({
  name: 'Container',

  get filter() {
    return process.platform === 'linux';
  },

  get info() {
    return Promise.all([utils.fileExists('/.dockerenv'), utils.readFile('/proc/self/cgroup')]).then(
      results => (results[0] || results[1] ? 'Yes' : 'N/A')
    );
  },
});
