const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin'); // antd 主题插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 去除console.log
const antdOptions = {
  antDir: path.join(__dirname, './node_modules/ant-design-vue'), // antd包位置
  stylesDir: path.join(__dirname, './src/common/styles/theme'), // 主题文件所在文件夹
  varFile: path.join(__dirname, './src/common/styles/theme/variables.less'), // 自定义默认的主题色
  mainLessFile: path.join(__dirname,
    './src/common/styles/theme/index.less'), // 项目中其他自定义的样式（如果不需要动态修改其他样式，该文件可以为空）
  outputFilePath: path.join(__dirname, './public/color.less'), // 提取的less文件输出到什么地方
  themeVariables: ['@primary-color', '@success-color', '@warning-color', '@error-color',
    '@font-size-base', '@heading-color', '@text-color', '@text-color-secondary',
    '@disabled-color', '@border-radius-base', '@border-color-base'
  ], // 要改变的主题变量
  indexFileName: './public/index.html', // index.html所在位置
  generateOnce: false // 是否只生成一次（if you don't want to generate color.less on each chnage in code to make build process fast in development mode, assign it true value. But if you have new changes in your styles, you need to re-run your build process npm start.）
};
// const projectname = process.argv

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
      // chunkFilename: '[name].test.js',
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
          // 'primary-color': '#17BC94' // 全局主色
        },
        javascriptEnabled: true
      }
    },
    // extract: false, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'));
    // config.module.rule('ts').use('ts-loader').tap(options => Object.assign(options, {
    //   getCustomTransformers: () => ({
    //     before: [tsImportPluginFactory({
    //       libraryName: 'h3-antd-vue',
    //       libraryDirectory: 'es',
    //       style: true
    //     })]
    //   }),
    // }));
    // config.plugins.delete('preload-index');
    config.plugins.delete('prefetch-index');
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.optimization.minimizer.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true // console
            }
          }
        })
      );
    }
    config.externals = {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
    };
    config.plugins.push( // copy custom static assets
      new CopyWebpackPlugin([{
        from: path.join(__dirname, 'static'),
        to: '.',
        ignore: ['.*']
      }]),
      new MonacoWebpackPlugin({
        languages: ['typescript', 'json', 'markdown'],
        output: './static/plugin/monaco-editor'
      }),
      new AntDesignThemePlugin(antdOptions)
    );
  },
  productionSourceMap: true,
  lintOnSave: true,
  devServer: {
    // host: envLocal.host,
    port: envLocal.port,
    open: true,
    // openPage: 'designer/',
    https: false,
    hotOnly: false,
    disableHostCheck: false,
    proxy: envLocal.proxy,
  }
};
