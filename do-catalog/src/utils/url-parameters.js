export function setUrlParameters(state) {
  const baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;

  const countries = state.filter.countries ? state.filter.countries.join(',') : '';
  const categories = state.filter.categories ? state.filter.categories.join(',') : '';
  const licenses = state.filter.licenses ? state.filter.licenses.join(',') : '';
  const sources = state.filter.sources ? state.filter.sources.join(',') : '';
  const search = state.filter.searchText ? encodeURIComponent(state.filter.searchText) : '';
  const page = state.filter.page ? state.filter.page + 1 : '0';

  let params = []
  countries != '' ? params.push(`country=${countries}`) : '';
  categories != '' ? params.push(`category=${categories}`) : '';
  licenses != '' ? params.push(`license=${licenses}`) : '';
  sources != '' ? params.push(`source=${sources}`) : '';
  search != '' ? params.push(`search=${search}`) : '';
  page > 1 ? params.push(`page=${page}`) : '';

  const urlParams = params.join('&');
  const finalUrl = urlParams != '' ? `${baseUrl}?${urlParams}` : baseUrl;

  window.history.pushState(null, null, finalUrl);
}