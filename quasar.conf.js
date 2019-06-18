// Configuration for your app
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'geoportal'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      'roboto-font',
      'material-icons', // optional, you are not bound to it
      'ionicons-v4',
      'mdi-v3',
      'fontawesome-v5'
      // 'eva-icons'
    ],

    // framework: 'all', // --- includes everything; for dev only!
    framework: {
      components: [],
      directives: [],

      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog',
        'AppFullscreen'
      ]

      // iconSet: 'ionicons-v4'
      // lang: 'ca' // Quasar language
    },

    supportIE: true,

    build: {
      scopeHoisting: true,
      // publicPath: '/geoportal/',
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        // cfg.plugins.push(new BundleAnalyzerPlugin())

        cfg.plugins.push(
            new webpack.DefinePlugin({
            'process.env.CONFIG_PATH': JSON.stringify(
              'src/config/' + cfg.mode + (process.env.CONFIG ? '-' + process.env.CONFIG : '')
            )
          })
        )

        let template
        const paths = [
          './src/index-' + cfg.mode + '-' + process.env.CONFIG + '.template.html',
          './src/index-' + cfg.mode + '.template.html',
          './src/index.template.html'
        ]
        const fs = require('fs')
        try {
          template = paths.find(fs.existsSync)
        } catch (err) {
          console.error(err)
          template = paths[paths.length - 1]
        }
        if (template === void 0) {
          console.error('Template is undefined')
        }

        const htmlWebpackPlugin = cfg.plugins.find(plugin => plugin.constructor === HtmlWebpackPlugin)
        htmlWebpackPlugin.options.template = template

        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all' --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
    },

    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
