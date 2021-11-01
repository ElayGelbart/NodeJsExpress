const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const clientConfig = {
  target: 'web',
  entry: "./pokemon-api/src/front/index.js",
  output: {
    path: path.resolve(__dirname, "./pokemon-api/src/dist"),
    filename: "app.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './pokemon-api/src/front/index.html',
      filename: "./index.html"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  }
};

module.exports = [serverConfig, clientConfig];