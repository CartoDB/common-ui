import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

export class DOCatalog {
  constructor(target, { baseUrl, userData, requestDatasetCallback } = {}) {
    this.DOCatalogComponent = require('../dist/do-catalog.umd.min');
    this.target = target;
    this.baseUrl = baseUrl || '/';
    this.userData = userData;
    this.requestDatasetCallback = requestDatasetCallback;
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
  }

  setUserData(userData) {
    this.userData = userData;
  }

  setRequestDatasetCallback(requestDataset) {
    this.requestDataset = requestDataset;
  }

  render() {
    Vue.use(VueRouter);
    Vue.use(Vuex);

    // Configure routing
    this.DOCatalogComponent.router.options.base = this.baseUrl;
    this.DOCatalogComponent.router.history.base = this.baseUrl;

    new Vue({
      data: {
        userData: this.userData
      },
      methods: {
        requestDataset: this.requestDatasetCallback
      },
      components: {
        docatalog: this.DOCatalogComponent
      }
    }).$mount(this.target);
  }
}
