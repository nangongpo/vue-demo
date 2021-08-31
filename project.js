const isProd = process.env.NODE_ENV === 'production'
const packageJSON = require('./package.json')
const publicPath = './'
const outputDir = 'dist'
const assetsDir = 'static'

const project = {
  title: 'vue-demo',
  name: 'vue',
  publicPath,
  outputDir,
  assetsDir,
  isProd,
  prefixPath: isProd ? `${publicPath}${assetsDir}` : '',
  version: packageJSON.version
}

module.exports = project
