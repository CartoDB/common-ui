import * as CatalogActions from '../../actions/catalog';
import * as CatalogMutations from '../../mutations/catalog';

const catalog = {
  namespaced: true,
  state: {
    isFetching: false,
    hasError: false,
    datasetsList: [],
    datasetsListCount: 0,
    dataset: {},
    keyVariables: {},
    variables: {},
    filtersAvailable: {
      categories: [],
      countries: [],
      licenses: [
        { id: 'premium', name: 'Premium' },
        { id: 'public', name: 'Public' }
      ],
      sources: []
    },
    filter: {
      searchText: '',
      categories: [],
      countries: [],
      licenses: [],
      sources: [],
      limit: 30,
      page: 0
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
    setAvailableCategories: CatalogMutations.setAvailableCategories,
    setAvailableCountries: CatalogMutations.setAvailableCountries,
    setAvailableLicenses: CatalogMutations.setAvailableLicenses,
    setAvailableSources: CatalogMutations.setAvailableSources,
    setFilter: CatalogMutations.setFilter,
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
    clearTagFilters: CatalogActions.clearTagFilters
  }
};

export default catalog;
