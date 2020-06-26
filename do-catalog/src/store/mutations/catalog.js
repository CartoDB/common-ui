import Vue from 'vue';
import { setUrlParameters } from '../../utils/url-parameters';
import { filtersHighlighted } from '../../utils/constants';

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

export function setAvailableFilters(state, { id, options }) {
  // Load extra filters metadata for highlighted options
  const optionsMetadata = filtersHighlighted[id] || {};

  // Set filter options
  const filtersMap = options.reduce((acum, elem) => {
    elem.highlighted = optionsMetadata[elem.id] || false;
    acum.set(elem.id, elem);
    return acum;
  }, new Map());
  state.filtersAvailable = { ...state.filtersAvailable, [id]: filtersMap };

  // Init filters if needed
  if (!state.filter.categories[id]) {
    state.filter.categories[id] = [];
  }
}

export function setFilter(state, filter) {
  const newFilter = Object.assign({...state.filter.categories}, filter);
  state.filter.categories = newFilter;
  if (!filter.page) {
    state.filter.page = 0;
  }
  setUrlParameters(state);
}

export function removeFilter(state, filter) {
  const filterPos = state.filter.categories[filter.id].indexOf(filter.value);
  if (filterPos > -1) {
    state.filter.categories[filter.id].splice(filterPos, 1);
    state.filter.page = 0;
  }
  setUrlParameters(state);
}

export function setSearchText(state, searchText) {
  state.filter.searchText = searchText;
  setUrlParameters(state);
}

export function setPage(state, page) {
  state.filter.page = page;
  setUrlParameters(state);
}

export function setDatasetsListCount(state, count) {
  state.datasetsListCount = count;
}

export function resetTagFilters(state) {
  for (let category in state.filter.categories) {
    state.filter.categories[category] = [];
  }
  state.filter.page = 0;
  setUrlParameters(state);
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

export function setSubscriptionsList(state, data) {
  state.subscriptionsList = data;
}

export function setSubscriptionInfo(state, data) {
  state.subscriptionInfo = data;
}

export function resetSubscriptionsList(state) {
  state.subscriptionsList = [];
}

export function resetSubscriptionInfo(state) {
  state.subscriptionInfo = {};
}
