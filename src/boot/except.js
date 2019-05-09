import config from '../config'
// import except from '../lib/except.js'
import {
  exceptLib as except
} from '@giscube/geoportal'

export default async ({ Vue }) => {
  window.addEventListener('error', except)
  Vue.config.errorHandler = except.vue

  // Sentry setup
  if (process.env.NODE_ENV === 'production' && config.sentry.dsn) {
    const Sentry = require('@sentry/browser')
    const Integrations = require('@sentry/integrations')

    Sentry.init({
      dsn: config.sentry.dsn,
      integrations: [new Integrations.Vue({ Vue })]
    })

    except.setSentry(Sentry)
  }

  // Shortcut
  Vue.prototype.$except = except
}
