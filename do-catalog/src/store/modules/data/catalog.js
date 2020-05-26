import * as CatalogActions from '../../actions/catalog';
import * as CatalogMutations from '../../mutations/catalog';

const catalog = {
  namespaced: true,
  state: {
    isFetching: false,
    hasError: false,
    datasetsList: [],
    dataset: {},
    keyVariables: {},
    variables: {},
    filtersAvailable: {
      categories: [],
      countries: [],
      licenses: [
        { id: 'premium', name: 'Premium' },
        { id: 'public', name: 'Public' },
      ],
      geographies: [],
      sources: [],
    },
    filter: {
      searchText: '',
      categories: [],
      countries: [],
      geographies: [],
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
    setAvailableGeographies: CatalogMutations.setAvailableGeographies,
    setAvailableSources: CatalogMutations.setAvailableSources,
    setFilter: CatalogMutations.setFilter,
    resetDatasetsList: CatalogMutations.resetDatasetsList,
    resetDataset: CatalogMutations.resetDataset
  },
  actions: {
    fetchDatasetsList: CatalogActions.fetchDatasetsList,
    fetchDataset: CatalogActions.fetchDataset,
    fetchKeyVariables: CatalogActions.fetchKeyVariables,
    fetchVariables: CatalogActions.fetchVariables,
    fetchFilters: CatalogActions.fetchFilters,
    updateFilter: CatalogActions.updateFilter
  }
};

export default catalog;
