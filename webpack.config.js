const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

<<<<<<< HEAD
const serverConfig = {
  target: 'node',
  entry: "./pokemon-api/src/back/server.js",
  output: {
    path: path.resolve(__dirname, '/pokemon-api/src/dist/server'),
    filename: 'server.node.js',
  },
};
=======
>>>>>>> dae34621ec4fdffaccca56bbda9900aa5475ae69

const clientConfig = {
  target: 'web',
  entry: "./pokemon-api/src/front/index.js",
  output: {
<<<<<<< HEAD
    path: path.resolve(__dirname, "/pokemon-api/src/dist"),
=======
    path: path.resolve(__dirname, "./pokemon-api/src/dist"),
>>>>>>> dae34621ec4fdffaccca56bbda9900aa5475ae69
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

module.exports = [clientConfig];