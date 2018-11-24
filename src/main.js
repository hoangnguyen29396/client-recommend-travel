// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import TheHeader from './components/share/TheHeader.vue'
import Loader from './components/share/Loader.vue'
import SideBar from './components/share/SideBar.vue'
import router from './router'
import store from './store/index'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.component('Loader', Loader)
Vue.component('TheHeader', TheHeader)
Vue.component('SideBar', SideBar)
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
  store
})
