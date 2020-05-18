import Vue from 'vue';
import VueRouter from 'vue-router';
import DOCatalog from '../views/CatalogHome.vue';
import DatasetDetail from '../views/DatasetDetail.vue';
import DatasetSummary from '../views/DatasetSummary.vue';
import DatasetData from '../views/DatasetData.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'do-catalog',
    component: DOCatalog
  },
  {
    path: '/datasets/:datasetId',
    component: DatasetDetail,
    name: 'do-dataset',
    children: [
      {
        path: 'data',
        name: 'do-dataset-data',
        component: DatasetData
      },
      {
        path: 'summary',
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
    routes
  });
  return router;
}

export { routes };
export default createRouter;
