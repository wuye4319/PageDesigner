// let production = 'http://' + window.location.hostname + ':8067'
let production = 'http://120.25.77.12:7001/web/v1'
let dev = '/web/v1'

let admin = {
  pro: `http://${window.location.hostname}/`,
  dev: `http://${window.location.hostname}:8001/`
}

let ispro = process.env.NODE_ENV === 'production'

export const baseUrl = ispro ? production : dev
export const adminUrl = ispro ? admin.pro : admin.dev
