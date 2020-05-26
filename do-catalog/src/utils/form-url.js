export function formUrl(category, country, datastream) {
  var formUrl = "https://carto.com/platform/location-data-streams/form/?";
  formUrl = category ? formUrl + "category=" + category + "&" : formUrl;
  formUrl = country  ? formUrl + "country=" + country + "&" : formUrl;
  formUrl = formUrl + "datastream=" + datastream;
  return encodeURI(formUrl);
}