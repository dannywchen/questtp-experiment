const path = require('path');

module.exports = {
  // Other webpack configurations...
  module: {
    rules: [
      // Other rules...
      {
        test: /\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
        include: /node_modules/,
        type: "javascript/auto",
      },
      // Remove or comment out the source-map-loader rule if present
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   loader: 'source-map-loader',
      // },
    ],
  },
};
