import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import NavigationTabs from '@/components/datasetDetail/NavigationTabs';
import dataset from '../../fixtures/dataset';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('NavigationTabs.vue', () => {
  const store = createStore();

  it('Renders view properly', () => {
    const navigationTabs = shallowMount(NavigationTabs, {
      localVue,
      store
    });
    expect(navigationTabs).toMatchSnapshot();
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
