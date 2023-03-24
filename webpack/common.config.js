const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const BUILD_DIR = "build";

const plugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, "..", "src", "index.html"),
    //favicon: path.join(__dirname, "..", "src", "favicon.ico"),
    filename: "./index.html",
  }),
  new FaviconsWebpackPlugin({
    logo: path.resolve(__dirname, "..", "src", "favicon.ico"),
    prefix: "/",
    inject: (htmlPlugin) =>
      path.basename(htmlPlugin.options.filename) === "index.html",
  }),
  new webpack.HotModuleReplacementPlugin(), // применять изменения только при горячей перезагрузке
];

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

const devServer = {
  historyApiFallback: true,
  open: true,
  compress: true,
  allowedHosts: "all",
  hot: true, // Включает автоматическую перезагрузку страницы при изменениях
  client: {
    // Shows a full-screen overlay in the browser when there are compiler errors or warnings
    overlay: {
      errors: true,
      warnings: false,
    },
    // Prints compilation progress in percentage in the browser.
    progress: true,
  },
  static: "./",
  port: 3000,
};

module.exports = {
  devServer,
  plugins,
  entry: path.join(__dirname, "..", "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "..", BUILD_DIR),
    clean: true,
  },
  // Проверка максимального веса бандла отключена
  performance: {
    hints: false,
  },
  module: {
    rules: [
      // --- Загрузчик для html (html-loader)
      { test: /\.(html)$/, use: ["html-loader"] },
      // --- S/A/C/SS
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", // translates css into CommonJS
            options: {
              modules: true, // css modules
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]", // format of output
              },
            },
          },
          {
            // autoprefixer
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      // --- S/A/SS
      {
        test: /\.(s[ac])ss$/i,
        use: ["sass-loader"],
      },
      //
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      // --- Images
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/img/[hash][ext]",
        },
      },
      // --- Fonts
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
      },
      // --- Babel
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, // Использование кэша для избежания рекомпиляции
          },
        },
      },
    ],
  },
};
