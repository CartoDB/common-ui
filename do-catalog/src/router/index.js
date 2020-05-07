import Vue from "vue";
import VueRouter from "vue-router";
import DOCatalog from "../views/CatalogHome.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: DOCatalog
  },
  {
    path: "/summary",
    name: "Summary",
    component: () =>
      import(/* webpackChunkName: "summary" */ "../views/DatasetSummary.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
