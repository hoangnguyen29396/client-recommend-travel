import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex/dist/vuex.esm'
import location from './modules/location'
import picture from './modules/picture'
import evaluation from './modules/evaluation'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    location,
    picture,
    evaluation
  }
})
