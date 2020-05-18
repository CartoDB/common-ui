import Vue from 'vue';
import VueRouter from 'vue-router';
import DOCatalog from '../views/CatalogHome.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'do-catalog',
    component: DOCatalog
  },
  {
    path: '/datasets/:dataset_id',
    name: 'do-summary',
    component: () =>
      import(/* webpackChunkName: "summary" */ '../views/DatasetDetail.vue'),
    children: [
      {
        path: '',
        name: 'Default',
        component: () =>
          import(
            /* webpackChunkName: "summary" */ '../views/DatasetSummary.vue'
          )
      },
      {
        path: 'data',
        name: 'Data',
        component: () =>
          import(/* webpackChunkName: "summary" */ '../views/DatasetData.vue')
      }
    ]
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
