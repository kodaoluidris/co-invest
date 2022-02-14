import '@/@fake-db/db'
import { i18n } from '@/plugins/i18n'
import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import Toast from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import './plugins/acl'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'



// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(Toast)

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    dynamic_route(endUrl) {
      // return `https://api.diimtech.com/api/admin/${endUrl}`;
      return `http://localhost:1000/api${endUrl}`
    },
    dynamic_auth_route(endUrl) {
      // return `https://api.diimtech.com/api/${endUrl}`;
      return `http://localhost:1000/api${endUrl}`
    },

  },
})

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App),
}).$mount('#app')
