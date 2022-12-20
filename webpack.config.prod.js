const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: false,
  devServer: {
    static: path.resolve(__dirname, "src"),
    open: true,
  },
  entry: "./src/scripts/app.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./scripts/[name]-[contenthash].js",
    // publicPath: "../",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "> 0.2% and not dead",
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(css|sass|scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              url: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")({ grid: true })],
              },
            },
          },
          { loader: "sass-loader", options: { sourceMap: false } },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name]-[contenthash][ext]",
        },
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
        ],
      },
      {
        test: /\.html/,
        loader: "html-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/[name]-[chunkhash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/index.html",
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new TerserPlugin({
      terserOptions: {
        compress: { drop_console: true },
      },
    }),
  ],
};
