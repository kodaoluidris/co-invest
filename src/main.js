/* eslint-disable no-console */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueTouch from 'vue-touch';
import Trend from 'vuetrend';
// import Toasted from 'vue-toasted';
import VueApexCharts from 'vue-apexcharts';

import store from './store';
import router from './Routes';
import App from './App';
import layoutMixin from './mixins/layout';
import Widget from './components/Widget/Widget';
import vuetify from './plugins/vuetify'
import 'vue-toastification/dist/index.css'
import Toast from 'vue-toastification';


Vue.use(BootstrapVue);
Vue.use(Toast)

Vue.use(VueTouch);
Vue.use(Trend);
Vue.component('Widget', Widget);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
  },
});
Vue.component('apexchart', VueApexCharts);
Vue.mixin(layoutMixin);
// Vue.use(Toasted, {duration: 10000});

Vue.config.productionTip = false;

//  navigation guards
router.beforeEach((to, from, next) => {
  let isLoggedIn = localStorage.getItem('auth_token');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //  Route requires AUth? Check if logged in. If not, redirect to login page
    if(!isLoggedIn || isLoggedIn==null) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    //  Route requires AUth? Check if logged in. If not, redirect to login page
    if(store.getters.loggedIn) {
      next({
        name: 'AnalyticsPage'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
});
Vue.mixin({
  methods: {
    dynamic_route(endUrl) {
      // return `https://api.diimtech.com/api/admin/${endUrl}`;
      return `http://localhost:1000/api${endUrl}`
    },
    dynamic_auth_route(endUrl) {
      // return `https://api.diimtech.com/api/${endUrl}`;
      return `http://localhost:1000/api/auth${endUrl}`
    },

    logoutUser() {
      this.$toast.error('Login expired, please login again!', {
        position: 'top-center',
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: 'button',
        icon: true,
        rtl: false,
      })
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      return this.$router.push({name: 'Login'});
    }

  },
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  vuetify,
  render: h => h(App)
});
