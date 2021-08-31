// 用来模拟线上前端情况，在终端执行 npm run preview
const { sh } = require('tasksfile')
const chalk = require('chalk')
const config = require('../vue.config.js')
const rawArgv = process.argv.slice(2)
const args = rawArgv.join(' ')

// const history = require('connect-history-api-fallback')

if (process.env.npm_config_preview || rawArgv.includes('--preview')) {
  const report = rawArgv.includes('--report')

  sh(`vue-cli-service build ${args}`)

  const port = config.devServer.port - 1 || 9526
  const publicPath = config.publicPath

  const connect = require('connect')
  const serveStatic = require('serve-static')
  const staticPath = './' + config.outputDir
  const app = connect()
  // // 模拟history路由模式
  // app.use(history())

  app.use(
    publicPath,
    serveStatic(staticPath, {
      index: ['index.html']
    })
  )


  app.listen(port, function() {
    console.log(chalk.green(`> Preview at  http://localhost:${port}${publicPath}`))
    if (report) {
      console.log(chalk.green(`> Report at  http://localhost:${port}${publicPath}report.html`))
    }
  })
} else {
  sh(`vue-cli-service build ${args}`)
}
