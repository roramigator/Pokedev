const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/master.js",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "./public/dist"),
    publicPath: "/dist/"
  },
  devServer: {
    port: 7000,
    publicPath: "/dist/",
    contentBase: path.resolve(__dirname, "./public"),
    watchContentBase: true,
    after: app => {
      app.get('/:section', (req,res)=>{
        const pg = req.params.section;
        res.sendFile(path.resolve(__dirname, `./states/${pg}.html`));
      });
    }
  },
  module: {
      rules: [
          {
              test: /\.s[ac]ss$/i,
              use: ["style-loader", "css-loader", "sass-loader"]
          }
      ]
  }
};
