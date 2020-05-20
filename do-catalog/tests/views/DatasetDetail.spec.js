import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import DatasetDetail from '@/views/DatasetDetail';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();

describe('DatasetDetail.vue', () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      'doCatalog/fetchDataset': jest.fn(),
      'doCatalog/fetchKeyVariables': jest.fn()
    };
    store = new Vuex.Store({
      state: {},
      actions
    });
  });

  it('Renders view properly', () => {
    const datasetDetail = shallowMount(DatasetDetail, {
      localVue,
      router,
      store
    });
    expect(datasetDetail).toMatchSnapshot();
  });

  it('Fetch data from the api', () => {
    shallowMount(DatasetDetail, {
      localVue,
      router,
      store
    });
    expect(actions['doCatalog/fetchDataset']).toHaveBeenCalled();
    expect(actions['doCatalog/fetchKeyVariables']).toHaveBeenCalled();
  });
});
