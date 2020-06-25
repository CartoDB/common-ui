import Vue from 'vue';
import { setUrlParameters } from '../../utils/url-parameters';

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
  // Filter options to highlight (handmade so far)
  const highlightedFilter = {
    glo: true
  };
  const filtersMap = options.reduce((acum, elem) => {
    elem.highlighted = highlightedFilter[elem.id] || false;
    acum.set(elem.id, elem);
    return acum;
  }, new Map());
  Vue.set(state.filtersAvailable, id, filtersMap);
}

export function setFilter(state, filter) {
  const newFilter = Object.assign(state.filter, filter);
  state.filter = newFilter;
  if (!filter.page) {
    state.filter.page = 0;
  }
  setUrlParameters(state);
}

export function removeFilter(state, filter) {
  const filterPos = state.filter[filter.id].indexOf(filter.value);
  if (filterPos > -1) {
    state.filter[filter.id].splice(filterPos, 1);
    state.filter.page = 0;
  }
  setUrlParameters(state);
}

export function setDatasetsListCount(state, count) {
  state.datasetsListCount = count;
}

export function resetTagFilters(state) {
  state.filter.category = [];
  state.filter.country = [];
  state.filter.license = [];
  state.filter.provider = [];
  state.filter.page = 0;
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
