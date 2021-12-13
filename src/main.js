import Vue from 'vue'

import 'normalize.css/normalize.css'
import '@/styles/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueClipboard from 'vue-clipboard2'

import store from './store'
import router from './router'
import App from './App.vue'


Vue.use(ElementUI)
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
