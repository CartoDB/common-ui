import Vue from "vue";
import VueRouter from "vue-router";
import CatalogHome from "../views/CatalogHome.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: CatalogHome
  },
  {
    path: "/datasets/:dataset_id",
    name: "Dataset",
    component: () =>
      import(/* webpackChunkName: "summary" */ "../views/DatasetDetail.vue"),
    children: [
      {
        path: "",
        name: "Default",
        component: () =>
          import(/* webpackChunkName: "summary" */ "../views/DatasetSummary.vue")
      },
      {
        path: "data",
        name: "Data",
        component: () =>
          import(/* webpackChunkName: "summary" */ "../views/DatasetData.vue")
      }
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
