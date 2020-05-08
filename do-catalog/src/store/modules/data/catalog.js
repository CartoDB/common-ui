import * as CatalogActions from '../../actions/catalog';
import * as CatalogMutations from '../../mutations/catalog';

const catalog = {
  namespaced: true,
  state: {
    isFetching: false,
    isErrored: false,
    dataset: {}
  },
  computed: {},
  getters: {},
  mutations: {
    setFetchingState: CatalogMutations.setFetchingState,
    setDataset: CatalogMutations.setDataset,
  },
  actions: {
    fetchDataset: CatalogActions.fetchDataset,
  }
};

export default catalog;