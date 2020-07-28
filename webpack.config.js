module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/, use: [
          'style-loader', 'css-loader'
        ]
      },
      {
        test: /\.js$/, exclude: /node_modules/, use: {
          loader: "babel-loader", options: {
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }
      }
    ]
  },
}