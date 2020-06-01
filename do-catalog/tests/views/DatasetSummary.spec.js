import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import DatasetSummary from '@/views/DatasetSummary';
import dataset from '../fixtures/dataset';
import keyVariables from '../fixtures/key_variables';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('DatasetSummary.vue', () => {
  const store = createStore();

  it('Renders view properly', () => {
    const datasetSummary = shallowMount(DatasetSummary, {
      localVue,
      store
    });
    expect(datasetSummary).toMatchSnapshot();
  });

  describe('computed', () => {
    it('Renders view properly', () => {
      const datasetSummary = shallowMount(DatasetSummary, {
        localVue,
        store
      });
      const aggregation = datasetSummary.vm.temporal_aggregation;
      expect(aggregation).toBe('Yearly');
    });

    it("Transform update frequency to 'None' when the update frequency is null", () => {
      const datasetSummary = shallowMount(DatasetSummary, {
        localVue,
        store
      });
      const updateFrequency = datasetSummary.vm.update_frequency;
      expect(updateFrequency).toBe('None');
    });

    it('Converts update frequency to readable data', () => {
      let altStore = createStore(dataset.dataset_samples[1]);
      const datasetSummary = shallowMount(DatasetSummary, {
        localVue,
        store: altStore
      });
      const updateFrequency = datasetSummary.vm.update_frequency;
      expect(updateFrequency).toBe('Daily');
    });

    it('Returns premium data when is not public data', () => {
      // let altStore = createStore(dataset.dataset_samples[1])
      const datasetSummary = shallowMount(DatasetSummary, {
        localVue,
        store
      });
      const dataPrivacy = datasetSummary.vm.dataset_privacy;
      expect(dataPrivacy).toBe('Premium Data');
    });

    it('Returns public data when is not public data', () => {
      let altStore = createStore(dataset.dataset_samples[1]);
      const datasetSummary = shallowMount(DatasetSummary, {
        localVue,
        store: altStore
      });
      const dataPrivacy = datasetSummary.vm.dataset_privacy;
      expect(dataPrivacy).toBe('Public Data');
    });
  });
});

function createStore(data = dataset.dataset_samples[0]) {
  const keyVariablesSample = keyVariables.key_variable_samples[0];
  const store = new Vuex.Store({
    state: {
      doCatalog: {
        dataset: data,
        keyVariables: keyVariablesSample
      }
    }
  });
  return store;
}
