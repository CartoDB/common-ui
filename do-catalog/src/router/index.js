import Vue from 'vue';
import VueRouter from 'vue-router';
import CatalogSearch from '../views/CatalogSearch.vue';
import DatasetDetail from '../views/DatasetDetail.vue';
import DatasetSummary from '../views/DatasetSummary.vue';
import DatasetData from '../views/DatasetData.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'do-catalog',
    component: CatalogSearch
  },
  {
    path: '/datasets/:type/:datasetId',
    component: DatasetDetail,
    children: [
      {
        path: 'data',
        name: 'do-dataset-data',
        component: DatasetData
      },
      {
        path: '',
        name: 'do-dataset-summary',
        component: DatasetSummary
      }
    ]
  }
];

function createRouter() {
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else if (to.hash) {
        return { selector: to.hash };
      } else {
        return { x: 0, y: 0 };
      }
    }
  });
  return router;
}

export { routes };
export default createRouter;
