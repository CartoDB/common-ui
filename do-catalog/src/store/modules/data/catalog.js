import * as CatalogActions from '../../actions/catalog';
import * as CatalogMutations from '../../mutations/catalog';

const catalog = {
  namespaced: true,
  state: {
    isFetching: false,
    hasError: false,
    dataset: {},
    key_variables: {},
    variables: {}
  },
  computed: {},
  getters: {},
  mutations: {
    setFetchingState: CatalogMutations.setFetchingState,
    setDataset: CatalogMutations.setDataset,
    setKeyVariables: CatalogMutations.setKeyVariables,
    setVariables: CatalogMutations.setVariables
  },
  actions: {
    fetchDataset: CatalogActions.fetchDataset,
    fetchKeyVariables: CatalogActions.fetchKeyVariables,
    fetchVariables: CatalogActions.fetchVariables
  }
};

export default catalog;
