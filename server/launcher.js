/**
 * Created by nero on 2017/5/22.
 */
const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  let myurl = ctx.url.substr(0, ctx.url.indexOf('http'))
  console.log(`${ctx.method} ${myurl || ctx.url} - ${ms}ms`)
  let alloworigin = [
    'https://www.test.com',
  ]
  for (let i in alloworigin) {
    if (alloworigin[i] === ctx.request.header.origin) {
      ctx.response.set('Access-Control-Allow-Origin', alloworigin[i])
    }
  }

  ctx.response.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
  ctx.response.set('Access-Control-Max-Age', '0')
  ctx.response.set('Access-Control-Allow-Headers',
    'X-Requested-With,Content-Type,Access-Token,Origin-Host')
  ctx.response.set('Access-Control-Allow-Credentials', 'true')
  if (ctx.request.method === 'OPTIONS') {
    ctx.response.status = 200
  }
})

app.use(router.routes()).use(router.allowedMethods())

// error
app.on('error', function (err, ctx) {
  console.log('server error', err, ctx)
})

var server = {
  addrouter: (url, fn) => {
    router.get(url, fn).post(url, fn)
  },
  close: () => {
    lis.close()
  },
  redirect: (i, o) => {
    router.redirect(i, o);
  },
  listen: () => {
    console.log('The server is started!!!')
    return app.listen(8888)
  }
}

module.exports = server
