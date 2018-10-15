const Registry = require('./registry');

module.exports = function envinfo(options, sections, ...plugins) {
  const registry = new Registry(options);

  plugins
    .map(plugin => (typeof plugin === 'string' ? require(plugin) : plugin)) // eslint-disable-line global-require
    .map(plugin => (Array.isArray(plugin) ? plugin : [plugin]))
    .forEach(plugin => registry.register(...plugin));

  return Promise.all(
    sections.map(({ title, lines }) => {
      return Promise.all(
        (lines || [])
          .map(plugin => {
            const [pluginName, ...config] = Array.isArray(plugin) ? plugin : [plugin];
            const pluginFn = registry.get(pluginName);
            return pluginFn ? pluginFn(...config).resolve() : undefined;
          })
          .filter(Boolean)
      ).then(resolvedLines => {
        return { title, lines: resolvedLines };
      });
    })
  );
};
