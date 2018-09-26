const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "../extress/react/src/index.js",
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: { presets: ["@babel/env"] }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
      path: path.resolve(__dirname, "dist/"), //may need to direct this to correct folder
      publicPath: "/dist/",
      filename: "bundle.js"
    },
    devServer: {
      contentBase: path.join(__dirname, "react/public/"),
      port: 8080,
      publicPath: "http://localhost:8080/dist/",
      hotOnly: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
  };