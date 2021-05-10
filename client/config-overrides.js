const { override, addBabelPlugin } = require("customize-cra");

module.exports = {
  webpack: function (config, env) {
    const { REACT_APP_CUSTOM_NODE_ENV } = process.env;

    const requireConsole = REACT_APP_CUSTOM_NODE_ENV !== "PRODUCTION";

    if (env === "production" && !requireConsole) {
      /**
       * add babel plugin to
       * remove all console.* statements
       * from production build
       */
      return Object.assign(
        config,
        override(addBabelPlugin("transform-remove-console"))(config, env)
      );
    }
    return config;
  },
};
