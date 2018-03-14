const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    library: 'Permawit',
    filename: 'permawit.js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    ipfs: 'ipfs'
  }
}
