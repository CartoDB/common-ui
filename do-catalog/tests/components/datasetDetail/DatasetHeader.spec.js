import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import DatasetHeader from '@/components/datasetDetail/DatasetHeader';
import dataset from '../../fixtures/dataset';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('DatasetHeader.vue', () => {
  const store = createStore();

  it('Renders view properly', () => {
    const datasetHeader = shallowMount(DatasetHeader, {
      localVue,
      store
    });
    expect(datasetHeader).toMatchSnapshot();
  });
});

function createStore(data = dataset.dataset_samples[0]) {
  const store = new Vuex.Store({
    state: {
      catalog: {
        dataset: data
      }
    }
  });
  return store;
}
