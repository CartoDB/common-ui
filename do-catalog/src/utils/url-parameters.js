export function setUrlParameters(state) {
  const baseUrl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname;

  let urlParams = '';

  const categories = state.filter.categories;
  for (let cat in categories) {
    urlParams += categories[cat] && categories[cat].length
      ? `&${cat}=${categories[cat].map(c => c.id).join(`,`)}`
      : '';
  }

  urlParams += state.filter.searchText
    ? `&search=${encodeURIComponent(state.filter.searchText)}`
    : '';

  urlParams += state.filter.page
    ? `&page=${state.filter.page+1}`
    : '';

  const finalUrl = urlParams != '' ? `${baseUrl}?${urlParams}` : baseUrl;

  window.history.pushState(null, null, finalUrl);
}
