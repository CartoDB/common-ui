export function fetchDataset (context, datasetId) {
  context.commit('setFetchingState');

  var baseUrl = "https://public.carto.com";
  var apiPath = "/api/v4/data/observatory/metadata/datasets/";
  var url = baseUrl + apiPath + datasetId;
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      if(req.status == 200)
        context.commit('setDataset', JSON.parse(req.responseText));
      else
        console.log("Error loading page\n"); //TODO
    }
  };
  req.send(null);
}