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
      categories: {}
    },
    subscriptionsList: []
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
    setSearchText: CatalogMutations.setSearchText,
    setPage: CatalogMutations.setPage,
    setDatasetsListCount: CatalogMutations.setDatasetsListCount,
    resetTagFilters: CatalogMutations.resetTagFilters,
    resetDatasetsList: CatalogMutations.resetDatasetsList,
    resetDataset: CatalogMutations.resetDataset,
    setSubscriptionsList: CatalogMutations.setSubscriptionsList,
    setSubscriptionInfo: CatalogMutations.setSubscriptionInfo,
    resetSubscriptionsList: CatalogMutations.resetSubscriptionsList
  },
  actions: {
    initFilter: CatalogActions.initFilter,
    fetchDatasetsList: CatalogActions.fetchDatasetsList,
    fetchDataset: CatalogActions.fetchDataset,
    fetchKeyVariables: CatalogActions.fetchKeyVariables,
    fetchVariables: CatalogActions.fetchVariables,
    setSearchText: CatalogActions.setSearchText,
    setPage: CatalogActions.setPage,
    clearTagFilters: CatalogActions.clearTagFilters,
    fetchSubscriptionsList: CatalogActions.fetchSubscriptionsList,
    fetchSubscribe: CatalogActions.fetchSubscribe,
    fetchUnSubscribe: CatalogActions.fetchUnSubscribe,
    requestDataset: CatalogActions.requestDataset
  },
  getters: {
    getSubscriptionByDataset: state => datasetId => {
      return state.subscriptionsList
        ? state.subscriptionsList.find(elem => elem.id === datasetId)
        : undefined;
    }
  }
};
