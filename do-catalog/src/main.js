import Vue from 'vue';
import DOCatalogHome from './App.vue';

import createRouter from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router: createRouter(),
  store,
  render: h => h(DOCatalogHome)
}).$mount('#app');
