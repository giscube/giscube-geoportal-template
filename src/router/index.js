import Router from 'vue-router'

// Custom
import ContactPanel from 'components/ContactPanel'
import HomePanel from 'components/HomePanel'

import {
  AuthPanel,
  CatalogPanel,
  CoordsPanel,
  DataPanel,
  GiscubeLayout,
  HelpPanel,
  DrawPanel,
  PlacePanel,
  SearchPanel,
  SharePanel,
  ShareQuery,
  StreetViewPanel
} from '@giscube/geoportal'

export default function ({ Vue, store }) {
  Vue.use(Router)

  const routes = [
    {
      path: '/',
      component: GiscubeLayout,
      children: [
        { path: 'auth/', name: 'auth', component: AuthPanel },
        { path: 'catalog/:q?', component: CatalogPanel, name: 'catalog' },
        { path: 'contact/', component: ContactPanel, name: 'contact' },
        { path: 'coords/:epsg/:coords', component: CoordsPanel, name: 'coords' },
        { path: 'data/:sourceName?/:layerName?/', component: DataPanel, name: 'data' },
        { path: 'geoportal/:q/', redirect: { name: 'place' } },
        { path: 'help/', component: HelpPanel, name: 'help' },
        { path: 'home/', component: HomePanel, name: 'home' },
        { path: 'draw/', component: DrawPanel, name: 'draw' },
        { path: 'place/:q*', component: PlacePanel, name: 'place' },
        { path: 'search/:q*', component: SearchPanel, name: 'search' },
        { path: 'share', component: SharePanel, name: 'share' },
        { path: 'streetview/:q?', component: StreetViewPanel, name: 'streetview' },

        { path: ':q?', name: 'auth_params', component: AuthPanel },
        { path: '', redirect: { name: 'home' } }
      ]
    }
  ]
  const router = new Router({
    routes: routes,
    parseQuery: ShareQuery.fromQuery,
    stringifyQuery: ShareQuery.toQuery
  })

  router.beforeEach((to, from, next) => {
    store.dispatch('layout/applyDialogs', { to, from, next })
  })

  return router
}
