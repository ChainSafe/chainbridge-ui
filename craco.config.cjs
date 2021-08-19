const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  babel: {
    plugins: ["macros"],
  },
  webpack: {
    configure: (webpackConfig) => ({
      ...webpackConfig,
      optimization: {
        ...webpackConfig.optimization,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
                drop_console: false,
              },
              mangle: {
                safari10: true,
              },
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
              },
            },
            parallel: 2,
            cache: true,
            sourceMap: true,
            extractComments: false,
          }),
        ],
      },
      module: {
        rules: [
          ...webpackConfig.module.rules,
          {
            test: /\.mjs$/,
            include: /node_modules/,
            type: "javascript/auto",
          },
        ],
      },
      devtool: "source-map",
    }),
  },
};
