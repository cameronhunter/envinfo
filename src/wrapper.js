const utils = require('./utils');

module.exports = (plugin, options) => (...config) => {
  const infoWithDefaults = Object.assign(
    {
      name: 'Unknown',
      filter: true,
      version: Promise.resolve(),
      path: Promise.resolve(),
      info: Promise.resolve(),
    },
    plugin(utils, options, ...config)
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
    resolve() {
      return Promise.all([this.version, this.path, this.info])
        .then(([version, path, info]) => {
          return {
            name: this.name,
            version,
            path,
            info,
            toString: () => `${this.name}: ${[info, path, version].filter(Boolean).join(' - ')}`,
          };
        })
        .catch(error => {
          const info = `Error! (${error})`;
          return {
            name: this.name,
            info,
            toString: () => `${this.name}: ${info}`,
          };
        });
    },
  };
};
