import 'whatwg-fetch';

const baseUrl =
  'https://cmonteserin-do-st.carto-staging.com/api/v4/data/observatory/'; // "https://public.carto.com"
const datasetsEndpoint = 'metadata/datasets';
const entitiesEndpoint = 'metadata/entities';

function filtersToPayload(filter) {
  let payload = '';

  const {
    searchText = '',
    categories = [],
    countries = [],
    geographies = [],
    sources = [],
    licenses = [],
    limit = 30,
    page = 0
  } = filter;
  const offset = page * limit;

  payload += `?searchtext=${searchText}&limit=${limit}&offset=${offset}`;
  payload += licenses.length ? `&public=${licenses.join(',')}` : '';
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
    if (data.filters) {
      context.commit('setAvailableCategories', data.filters.category || []);
      context.commit('setAvailableCountries', data.filters.country || []);
      context.commit('setAvailableSources', data.filters.provider || []);
      context.commit('setAvailableLicenses', data.filters.license || []);
    }
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
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}

export async function fetchKeyVariables(context, datasetId) {
  const url = baseUrl + datasetsEndpoint + '/' + datasetId + '/key_variables';

  try {
    const response = await fetch(url);
    const data = await response.json();
    context.commit('setKeyVariables', data);
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}

export async function fetchVariables(context, datasetId) {
  const url =
    baseUrl + datasetsEndpoint + '/' + datasetId + '/variables?minimal=true';

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

export function clearTagFilters(context) {
  context.commit('resetTagFilters');
}
