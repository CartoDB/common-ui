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
    variables: [],
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
    },
    subscriptionsList: [],
    subscriptionInfo: {}
  },
  computed: {},
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
    resetDataset: CatalogMutations.resetDataset,
    setSubscriptionsList: CatalogMutations.setSubscriptionsList,
    setSubscriptionInfo: CatalogMutations.setSubscriptionInfo,
    resetSubscriptionsList: CatalogMutations.resetSubscriptionsList,
    resetSubscriptionInfo: CatalogMutations.resetSubscriptionInfo
  },
  actions: {
    fetchDatasetsList: CatalogActions.fetchDatasetsList,
    fetchDataset: CatalogActions.fetchDataset,
    fetchKeyVariables: CatalogActions.fetchKeyVariables,
    fetchVariables: CatalogActions.fetchVariables,
    updateFilter: CatalogActions.updateFilter,
    deleteFilter: CatalogActions.deleteFilter,
    clearTagFilters: CatalogActions.clearTagFilters,
    fetchSubscriptionsList: CatalogActions.fetchSubscriptionsList,
    fetchSubscriptionInfo: CatalogActions.fetchSubscriptionInfo
  },
  getters: {
    getSubscriptionByDataset: state => datasetId => {
      return state.subscriptionsList
        ? state.subscriptionsList.find(elem => elem.id === datasetId)
        : undefined;
    }
  }
};
