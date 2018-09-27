const utils = require('./utils');

function safeInfo(info) {
  const infoWithDefaults = Object.assign(
    {
      name: 'Unknown',
      filter: true,
      version: Promise.resolve(),
      path: Promise.resolve(),
      info: Promise.resolve(),
    },
    info(utils)
  );

  return {
    name: infoWithDefaults.name,
    filter: infoWithDefaults.filter,
    get version() {
      return infoWithDefaults.filter ? infoWithDefaults.version : Promise.resolve();
    },
    get path() {
      return infoWithDefaults.filter ? infoWithDefaults.path : Promise.resolve();
    },
    get info() {
      return infoWithDefaults.filter ? infoWithDefaults.info : Promise.resolve();
    },
  };
}

const registry = {};

module.exports = {
  get registry() {
    return Object.freeze(registry);
  },

  register(...infos) {
    Object.assign(
      registry,
      infos.reduce((state, unsafeInfo) => {
        const info = safeInfo(unsafeInfo);
        return Object.assign(state, { [info.name]: info });
      }, {})
    );
  },
};
