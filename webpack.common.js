const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const basePath = __dirname;

module.exports = {
  context: path.join(basePath, "src"),
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  entry: {
    app: "./index.tsx",
    appStyles: ["./styles.scss"],
  },
  output: {
    filename: "./js/[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                exportLocalsConvention: "camelCase",
                localIdentName: "[name]__[local]__[hash:base64:5]",
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        use: {
          loader: "url-loader",
          options: {
            limit: 5000,
            name: "./img/[hash].[name].[ext]",
            esModule: false,
          },
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html", //Name of file in ./dist/
      template: "index.html", //Name of template in ./src
    }),
    new MiniCssExtractPlugin({
      filename: "./css/[name].[chunkhash].css",
      chunkFilename: "[id].css",
    }),
  ],
};
