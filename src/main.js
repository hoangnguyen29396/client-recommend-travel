// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { router } from './router'
import store from './store/index'
import * as VueGoogleMaps from 'vue2-google-maps'
import VeeValidate from 'vee-validate'
import i18n from './locales'
import attributes from './locales/attributes/en.js'

Vue.config.productionTip = false
Vue.use(VeeValidate, {
  locale: 'en',
  dictionary: {
    en: {
      attributes: attributes
    }
  }
})

/* eslint-disable no-new */
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBkCZgIVYIi0Uintdf23Dx3Epg-LEA9dzA',
    libraries: 'places'
  }
})
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  i18n,
  store
})
