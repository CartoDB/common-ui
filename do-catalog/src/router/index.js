import Vue from 'vue';
import VueRouter from 'vue-router';
import DOCatalog from '../views/CatalogHome.vue';
import Summary from '../views/DatasetSummary.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'do-catalog',
    component: DOCatalog
  },
  {
    path: 'summary',
    name: 'do-summary',
    component: Summary
  }
];

function createRouter() {
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  });
  return router;
}

export { routes };
export default createRouter;
