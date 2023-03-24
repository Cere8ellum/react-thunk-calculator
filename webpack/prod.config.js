const { merge } = require("webpack-merge");
const common = require("./common.config.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const plugins = [
  new MiniCssExtractPlugin({
    filename: "[contenthash].css",
  }),
  // Compress images
  new ImageMinimizerPlugin({
    minimizer: {
      implementation: ImageMinimizerPlugin.imageminMinify,
      options: {
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["jpegtran", { progressive: true }],
          ["optipng", { optimizationLevel: 8 }],
          "svgo",
        ],
      },
    },
  }),
];

module.exports = merge(common, {
  mode: "development",
  target: "browserslist",
  plugins,
  devtool: false,
  output: {
    filename: "[fullhash].js",
    publicPath: "/",
  },
  module: {
    rules: [],
  },
});
