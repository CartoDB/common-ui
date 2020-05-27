export function setFetchingState(state) {
  state.isFetching = true;
  state.hasError = false;
}

export function setDatasetsList(state, data) {
  state.datasetsList = data;
  state.isFetching = false;
  state.hasError = false;
}

export function setDataset(state, data) {
  state.dataset = data;
  state.isFetching = false;
  state.hasError = false;
}

export function setKeyVariables(state, data) {
  state.keyVariables = data;
  state.isFetching = false;
  state.hasError = false;
}

export function setVariables(state, data) {
  state.variables = data;
  state.isFetching = false;
  state.hasError = false;
}

export function setAvailableCategories(state, data) {
  state.filtersAvailable.categories = data;
}

export function setAvailableCountries(state, data) {
  state.filtersAvailable.countries = data;
}

export function setAvailableLicenses(state, data) {
  state.filtersAvailable.licenses = data;
}

export function setAvailableSources(state, data) {
  state.filtersAvailable.sources = data;
}

export function setFilter(state, filter) {
  const newFilter = Object.assign(state.filter, filter);
  state.filter = newFilter;
}

export function setDatasetsListCount(state, count) {
  state.datasetsListCount = count;
}

export function resetTagFilters(state) {
  state.filter.categories = [];
  state.filter.countries = [];
  state.filter.licenses = [];
  state.filter.sources = [];
}

export function resetDatasetsList(state) {
  state.datasetsList = [];
  state.datasetsListCount = 0;
}

export function resetDataset(state) {
  state.dataset = {};
  state.keyVariables = {};
  state.variables = {};
}
