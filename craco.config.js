module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Suppress source map warnings
      webpackConfig.ignoreWarnings = [/Failed to parse source map/];

      // Return the modified configuration
      return webpackConfig;
    },
  },
};
