const resolve = require("path").resolve;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const BABEL_CONFIG = {
  presets: ["@babel/env", "@babel/react"],
};

const config = {
  devServer: {
    disableHostCheck: true,
    contentBase: resolve("static"),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    compress: true,
  },

  entry: resolve("src/index.js"),
  
  output: {
    chunkFilename: "[name].bundle.js",
    path: resolve("public"),
  },

  module: {
    rules: [
      {
        // Compile ES2015 using babel
        test: /\.js$/,
        include: [resolve("../../../")],
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: BABEL_CONFIG,
          },
        ],
      },
      {
        // .png Icons loading as data URIs
        test: /\.(png)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
            },
          },
        ],
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "markdown-loader",
          },
        ],
      },
      {
        test: /\.(woff2|woff)$/,
        use: ["file-loader"],
      },
      {
        // SVG loading
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        // enable SASS loading
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        // enable CSS loading
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        // JSON loading + geoJSON
        test: /\.geojson$/,
        use: ["json-loader"],
      },
    ],
  },

  optimization: {
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: resolve("static"), to: resolve("public") },
      ]
    })
  ],
};

module.exports = config;
