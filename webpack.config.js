const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  const config = {
    output: {
      path: path.join(__dirname, "/build"), // the bundle output path
      filename: "main.js", // the name of the bundle
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/index.html", // to import index.html file inside index.js
      }),
    ],
    devServer: {
      port: 3030, // you can change the port
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // .js and .jsx files
          exclude: /node_modules/, // excluding the node_modules folder
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(sa|sc|c)ss$/, // styles files
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
          loader: "url-loader",
          options: { limit: false },
        },
      ],
    },
  };

  if (env.library) {
    delete config.plugins;
    delete config.devServer;

    config.entry = path.join(__dirname, "src", "App.js");
    config.output = {
      path: path.join(__dirname, "/lib"),
      filename: "index.js",
      globalObject: "this",
      library: {
        name: "SearchboxShowcase",
        type: "umd",
      },
    };
    config.externals = {
      // Don't bundle react or react-dom
      react: {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react",
      },
      "react-dom": {
        root: "ReactDOM",
        commonjs2: "react-dom",
        commonjs: "react-dom",
        amd: "react-dom",
      },
    };
  }

  return config;
};
