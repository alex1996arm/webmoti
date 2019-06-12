const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    noParse: ['ws']
  },
  externals: ['ws'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
