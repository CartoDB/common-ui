import Vue from 'vue';
import DOCatalogHome from './App.vue';
import createRouter from './router';
import store from './store';

Vue.config.productionTip = false;

class DOCatalogStandalone {
  constructor(el) {
    new Vue({
      router: createRouter(),
      store,
      render: h => h(DOCatalogHome)
    }).$mount(el);
  }
}

new DOCatalogStandalone('#app');

export default DOCatalogStandalone;
