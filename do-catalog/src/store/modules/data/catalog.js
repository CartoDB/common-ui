import * as CatalogActions from '../../actions/catalog';
import * as CatalogMutations from '../../mutations/catalog';

export const catalog = {
  namespaced: true,
  state: {
    isFetching: false,
    hasError: false,
    datasetsList: [],
    datasetsListCount: 0,
    dataset: {},
    keyVariables: {},
    variables: {},
    filtersAvailable: {},
    filter: {
      searchText: '',
      limit: process.env.VUE_APP_PAGE_SIZE || 10,
      page: 0,

      //TODO: Make this filters dynamic too
      category: [],
      country: [],
      license: [],
      provider: []
    }
  },
  computed: {},
  getters: {},
  mutations: {
    setFetchingState: CatalogMutations.setFetchingState,
    setDatasetsList: CatalogMutations.setDatasetsList,
    setDataset: CatalogMutations.setDataset,
    setKeyVariables: CatalogMutations.setKeyVariables,
    setVariables: CatalogMutations.setVariables,
    setAvailableFilters: CatalogMutations.setAvailableFilters,
    setFilter: CatalogMutations.setFilter,
    removeFilter: CatalogMutations.removeFilter,
    setDatasetsListCount: CatalogMutations.setDatasetsListCount,
    resetTagFilters: CatalogMutations.resetTagFilters,
    resetDatasetsList: CatalogMutations.resetDatasetsList,
    resetDataset: CatalogMutations.resetDataset
  },
  actions: {
    fetchDatasetsList: CatalogActions.fetchDatasetsList,
    fetchDataset: CatalogActions.fetchDataset,
    fetchKeyVariables: CatalogActions.fetchKeyVariables,
    fetchVariables: CatalogActions.fetchVariables,
    updateFilter: CatalogActions.updateFilter,
    deleteFilter: CatalogActions.deleteFilter,
    clearTagFilters: CatalogActions.clearTagFilters
  }
};
