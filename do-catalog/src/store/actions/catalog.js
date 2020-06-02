import 'whatwg-fetch';

const baseUrl =
  'https://cmonteserin-do-st.carto-staging.com/api/v4/data/observatory/'; // "https://public.carto.com"
const entitiesEndpoint = 'metadata/entities';
const datasetsEndpoint = 'metadata/datasets';
const geographiesEndpoint = 'metadata/geographies';

function filtersToPayload(filter) {
  let payload = '';

  const {
    searchText = '',
    categories = [],
    countries = [],
    geographies = [],
    sources = [],
    licenses = [],
    limit = process.env.VUE_APP_PAGE_SIZE,
    page = 0
  } = filter;
  const offset = page * limit;

  payload += `?limit=${limit}&offset=${offset}`;
  payload += searchText.length ? `&searchtext=${searchText}` : '';

  //TODO: Make this filters dynamic too
  payload += licenses.length ? `&license=${licenses.join(',')}` : '';
  payload += categories.length ? `&category=${categories.join(',')}` : '';
  payload += countries.length ? `&country=${countries.join(',')}` : '';
  payload += geographies.length ? `&geography=${geographies.join(',')}` : '';
  payload += sources.length ? `&provider=${sources.join(',')}` : '';

  return payload;
}

export async function fetchDatasetsList(context) {
  context.commit('resetDatasetsList');
  context.commit('setFetchingState');

  let url = baseUrl + entitiesEndpoint + filtersToPayload(context.state.filter);

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Entities list
    context.commit('setDatasetsList', data.results);

    // Entities list count
    context.commit('setDatasetsListCount', data.total_results);

    // Filters
    for (let key in data.filters) {
      context.commit('setAvailableFilters', {
        id: key,
        options: data.filters[key]
      });
    }
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}

export async function fetchDataset(context, { id, type }) {
  context.commit('resetDataset');
  context.commit('setFetchingState');

  let url = baseUrl;
  if (type === 'dataset') {
    url += datasetsEndpoint + '/' + id;
  } else {
    url += geographiesEndpoint + '/' + id;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    context.commit('setDataset', data);
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}

export async function fetchKeyVariables(context, { id, type }) {
  let url = baseUrl;
  if (type === 'dataset') {
    url += datasetsEndpoint + '/' + id + '/key_variables';
  } else {
    url += geographiesEndpoint + '/' + id + '/key_variables';
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    context.commit('setKeyVariables', data);
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}

export async function fetchVariables(context, { id, type }) {
  let url = baseUrl;
  if (type === 'dataset') {
    url += datasetsEndpoint + '/' + id + '/variables?minimal=true';
  } else {
    url += geographiesEndpoint + '/' + id + '/variables?minimal=true';
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    context.commit('setVariables', data);
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}

export function updateFilter(context, filter) {
  context.commit('setFilter', filter);
}

export function deleteFilter(context, filter) {
  context.commit('removeFilter', filter);
}

export function clearTagFilters(context) {
  context.commit('resetTagFilters');
}
