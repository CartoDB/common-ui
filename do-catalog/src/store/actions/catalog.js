import 'whatwg-fetch';

const baseUrl = 'https://cmonteserin-do-st.carto-staging.com/api/v4/'; // "https://public.carto.com"
const entitiesEndpoint = 'data/observatory/metadata/entities';
const datasetsEndpoint = 'data/observatory/metadata/datasets';
const geographiesEndpoint = 'data/observatory/metadata/geographies';
const subscriptionsEndpoint = 'do/subscriptions';
const subscriptionInfoEndpoint = 'do/subscription_info';

function filtersToPayload(filter) {
  let payload = '';

  const {
    searchText = '',
    category = [],
    country = [],
    geography = [],
    provider = [],
    license = [],
    limit = process.env.VUE_APP_PAGE_SIZE || 10,
    page = 0
  } = filter;
  const offset = page * limit;

  payload += `?limit=${limit}&offset=${offset}`;
  payload += searchText.length ? `&searchtext=${searchText}` : '';

  //TODO: Make this filters dynamic too
  payload += license.length ? `&license=${license.join('&license=')}` : '';
  payload += category.length ? `&category=${category.join('&category=')}` : '';
  payload += country.length ? `&country=${country.join('&country=')}` : '';
  payload += geography.length
    ? `&geography=${geography.join('&geography=')}`
    : '';
  payload += provider.length ? `&provider=${provider.join('&provider=')}` : '';

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
    url += geographiesEndpoint + '/' + id + '/variables?minimal=true';
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

export async function fetchSubscriptionsList(context) {
  const url = `${context.rootState.user.base_url}/api/v4/${subscriptionsEndpoint}?api_key=${context.rootState.user.api_key}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    context.commit('setSubscriptionsList', data.subscriptions || []);
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}

export async function fetchSubscriptionInfo(context, { id, type }) {
  const url = `${context.rootState.user.base_url}/api/v4/${subscriptionInfoEndpoint}?id=${id}&type=${type}&api_key=${context.rootState.user.api_key}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    context.commit('setSubscriptionInfo', data);
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}
