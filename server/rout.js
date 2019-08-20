/**
 * Created by nero on 2017/6/2.
 */
const launcher = require('./launcher')
const StaticFiles = require('./static')
let staticFiles = new StaticFiles()

// static
launcher.addrouter(/^\/(\w*)(?:\/|$)/, async (ctx) => {
  await staticFiles.getfile(ctx, '../dist')
})

launcher.listen()
