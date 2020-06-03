import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import DOCatalogComponent from '../dist/do-catalog.umd.min';

class DOCatalog {
  constructor(target, { baseUrl, userData, requestDatasetCallback } = {}) {
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
    DOCatalogComponent.router.options.base = this.baseUrl;
    DOCatalogComponent.router.history.base = this.baseUrl;

    new Vue({
      data: {
        userData: this.userData
      },
      methods: {
        requestDataset: this.requestDatasetCallback
      },
      components: {
        docatalog: DOCatalogComponent
      }
    }).$mount(this.target);
  }
}

export default DOCatalog;
