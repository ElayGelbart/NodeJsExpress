const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const serverConfig = {
  target: 'node',
  entry: "./back/server.js",
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: 'server.node.js',
  },
};

const clientConfig = {
  target: 'web',
  entry: "./front/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './front/index.html',
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