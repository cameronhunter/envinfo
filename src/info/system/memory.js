const os = require('os');

module.exports = utils => ({
  name: 'Memory',

  get info() {
    return Promise.resolve(
      `${utils.toReadableBytes(os.freemem())} / ${utils.toReadableBytes(os.totalmem())}`
    );
  },
});
