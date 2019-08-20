const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');

/**
 * 初始化本地开发配置
 */
const filepath = './env.local.json'
const envlocalDefault = {
  port: 8008,
  proxy: {
    '/apis': {
      // 目标 API 地址
      target: 'http://localhost:8067',
      changeOrigin: false,
      // pathRewrite: { '^/apis': '' },
    },
  },
  host: 'localhost'
}
try {
  fs.statSync(filepath);
} catch (e) {
  console.log('初始化写入本地环境配置文件');
  fs.writeFileSync(filepath, JSON.stringify(envlocalDefault, null, 4));
}
const envLocal = require('./env.local.json');

module.exports = {
  publicPath: '/',
  pages: {
    designer: {
      entry: 'src/main.ts',
      publicPath: './dist/',
      template: 'public/index.html',
      chunkFilename: '[name].js',
      filename: 'index.html',
      title: 'Page Designer',
      chunks: ['chunk-vendors', 'chunk-common', 'designer']
    },
    // website: {
    //   entry: 'src/website/main.ts',
    //   template: 'public/index.html',
    //   filename: 'website/index.html',
    //   title: 'Page Website',
    //   chunks: ['chunk-vendors', 'chunk-common', 'website']
    // }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#107FFF'
        },
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: (config) => {
    config.externals = {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
    };
    config.plugins.push( // copy custom static assets
      new CopyWebpackPlugin([{
        from: path.join(__dirname, 'static'),
        to: '.',
        ignore: ['.*']
      }]));
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'));
    config.module.rule('ts').use('ts-loader').tap(options => Object.assign(options, {
      getCustomTransformers: () => ({
        before: [tsImportPluginFactory({
          libraryName: 'h3-antd-vue',
          libraryDirectory: 'es',
          style: true
        })]
      }),
    }));
  },
  productionSourceMap: false,
  devServer: {
    host: envLocal.host,
    port: envLocal.port,
    open: true,
    // openPage: 'designer/',
    https: false,
    hotOnly: false,
    disableHostCheck: false,
    proxy: envLocal.proxy,
  }
};
