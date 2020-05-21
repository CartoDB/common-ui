import 'whatwg-fetch';

const baseUrl = 'https://cmonteserin-do-st.carto-staging.com/api/v4/data/observatory/'; // "https://public.carto.com"
const datasetsEndpoint = 'metadata/datasets';

export async function fetchDatasetsList(context, options = {}) {
  context.commit('resetDatasetsList');
  context.commit('setFetchingState');

  const {
    searchText = '',
    publicOnly = null,
    limit = 30,
    offset = 0
  } = options;

  let url = baseUrl + datasetsEndpoint + `?searchtext=${searchText}&limit=${limit}&offset=${offset}`;
  url += publicOnly !== null ? `&public=${publicOnly}` : '';
  
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
