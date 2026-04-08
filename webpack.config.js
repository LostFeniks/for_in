const path = require('path');

module.exports = {
  entry: './src/js/orderByProps.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'orderByProps',
      type: 'umd',
    },
    globalObject: 'this',
    clean: true,
  },
  target: 'web',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: "> 0.25%, not dead",
                modules: 'commonjs'
              }]
            ]
          }
        }
      }
    ]
  }
};