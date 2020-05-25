import 'whatwg-fetch';

const baseUrl = 'https://cmonteserin-do-st.carto-staging.com/api/v4/data/observatory/'; // "https://public.carto.com"
const datasetsEndpoint = 'metadata/datasets';

function filterLicenseToPayload(licenses) {
  return licenses.includes('public')
    ? licenses.includes('premium')
      ? null
      : true
    : !licenses.includes('premium')
      ? null
      : false
}

function filtersToPayload(filter) {
  let payload = '';

  const {
    searchText = '',
    categories = [],
    countries = [],
    geographies = [],
    sources = [],
    limit = 30,
    offset = 0
  } = filter;
  const publicOnly = filterLicenseToPayload(filter.licenses)

  payload += `?searchtext=${searchText}&limit=${limit}&offset=${offset}`;
  payload += publicOnly !== null ? `&public=${publicOnly}` : '';
  payload += categories.length ? `&category=${categories.join(',')}` : '';
  payload += countries.length ? `&country=${countries.join(',')}` : '';
  payload += geographies.length ? `&geography=${geographies.join(',')}` : '';
  payload += sources.length ? `&provider=${sources.join(',')}` : '';
  
  return payload;
}

export async function fetchDatasetsList(context) {
  context.commit('resetDatasetsList');
  context.commit('setFetchingState');

  let url = baseUrl + datasetsEndpoint + filtersToPayload(context.state.filter);
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    context.commit('setDatasetsList', data);
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}

export async function fetchDataset(context, datasetId) {
  context.commit('resetDataset');
  context.commit('setFetchingState');

  const url = baseUrl + datasetsEndpoint + '/' + datasetId;

  try {
    const response = await fetch(url);
    const data = await response.json();
    context.commit('setDataset', data);
  } catch(error) {
    console.error(`ERROR: ${error}`);
  }
}

export async function fetchKeyVariables(context, datasetId) {
  const url = baseUrl + datasetsEndpoint + '/' + datasetId + '/key_variables';

  try {
    const response = await fetch(url);
    const data = await response.json();
    context.commit('setKeyVariables', data);
  } catch(error) {
    console.error(`ERROR: ${error}`);
  }
}

export async function fetchVariables(context, datasetId) {
  const url = baseUrl + datasetsEndpoint + '/' + datasetId + '/variables?minimal=true';

  try {
    const response = await fetch(url);
    const data = await response.json();
    context.commit('setVariables', data);
  } catch(error) {
    console.error(`ERROR: ${error}`);
  }
}

export async function fetchFilters(context) {
  const url = baseUrl + 'metadata/';
  
  // categories
  try {
    const response = await fetch(url + 'categories');
    const data = await response.json();
    context.commit('setAvailableCategories', data);
  } catch(error) {
    console.error(`ERROR: ${error}`);
  }

  // countries
  try {
    const response = await fetch(url + 'countries');
    const data = await response.json();
    context.commit('setAvailableCountries', data);
  } catch(error) {
    console.error(`ERROR: ${error}`);
  }

  // geographies
  try {
    const response = await fetch(url + 'geographies');
    const data = await response.json();
    context.commit('setAvailableGeographies', data);
  } catch(error) {
    console.error(`ERROR: ${error}`);
  }

  // sources
  try {
    const response = await fetch(url + 'providers');
    const data = await response.json();
    context.commit('setAvailableSources', data);
  } catch(error) {
    console.error(`ERROR: ${error}`);
  }
}

export function updateFilter(context, filter) {
  context.commit('setFilter', filter);
}