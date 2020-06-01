import Vue from 'vue';
import Vuex from 'vuex';
import doCatalog from './modules/data/catalog';
import user from './modules/data/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    doCatalog,
    user
  }
});
