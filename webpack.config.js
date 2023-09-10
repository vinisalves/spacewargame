//Webpack requires this to work with directories
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
// This is main configuration object that tells Webpackw what to do.
module.exports = {
  //path to entry paint
  entry: "./game/index.js",
  //path and filename of the final output
  output: {
    filename: "space_war_game.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/game",
  },
  resolve: {
    alias: {
      Assets: path.resolve(__dirname, "./game/assets/"),
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./game/assets", to: "assets" }],
    }),
  ],

  //default mode is production
  mode: "development",
};
