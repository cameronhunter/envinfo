const wrap = require('./wrapper');

function Registry(options) {
  this.registry = {};
  this.options = options;
}

Registry.prototype.register = function register(...plugins) {
  const wrapped = plugins
    .map(plugin => wrap(plugin, this.options))
    .filter(plugin => plugin.filter)
    .reduce((state, plugin) => Object.assign({}, state, { [plugin.name]: plugin }), {});

  Object.assign(this.registry, wrapped);

  return this;
};

Registry.prototype.get = function get(item) {
  return this.registry[item];
};

module.exports = Registry;
