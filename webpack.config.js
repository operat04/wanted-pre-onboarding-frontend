const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "docs"), // './dist'의 절대 경로를 리턴합니다.
    filename: "app.bundle.js",
  },
  module: {
    rules: [
      {
        // 파일명이 .css로 끝나는 모든 파일에 적용
        test: /\.css$/,
        // 배열 마지막 요소부터 오른쪽에서 왼쪽 순으로 적용
        // 먼저 css-loader가 적용되고, styled-loader가 적용되어야 한다.
        // 순서 주의!
        use: ["style-loader", "css-loader"],
        // loader가 node_modules 안의 있는 내용도 처리하기 때문에
        // node_modules는 제외해야 합니다
        exclude: /node_modules/,
      },
      {
        //test: /\.(js)$/,
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html", // public/index.html 파일을 읽는다.
      filename: "index.html", // output으로 출력할 파일은 index.html 이다.
    }),
  ],
};
