export function formUrl(category, country, datastream) {
  let formUrl = 'https://carto.com/platform/spatial-data-catalog/form/?';
  formUrl += category ? `category=${category}&` : '';
  formUrl += country ? `country=${country}&` : '';
  formUrl += `datastream=${datastream}`;
  return encodeURI(formUrl);
}
