const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.tsx",

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.[contenthash].js",
      publicPath: "/",
      clean: true,
    },

    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "eval-source-map",

    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],

    devServer: {
      historyApiFallback: true,
      static: {
        directory: path.resolve(__dirname, "dist"),
      },
      open: true,
      compress: true,
      hot: true,
      port: 8080,
    },
  };
};
