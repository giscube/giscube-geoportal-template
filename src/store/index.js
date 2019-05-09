import Vue from 'vue'
import Vuex from 'vuex'
import config from '../config'

Vue.use(Vuex)

import {
  store
} from '@giscube/geoportal'

export default function () {
  const store_ = store()
  store_.config = config

  return store_
}
