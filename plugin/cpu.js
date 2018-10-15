const os = require('os');

module.exports = () => ({
  name: 'CPU',

  get info() {
    try {
      return Promise.resolve(os.arch() + ' ' + os.cpus()[0].model);
    } catch (err) {
      return Promise.resolve('Unknown');
    }
  },
});
