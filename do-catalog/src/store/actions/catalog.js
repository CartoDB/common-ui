export function fetchDataset (context, datasetId) {
  context.commit('setFetchingState');

  // var baseUrl = "https://public.carto.com";
  var baseUrl = "https://cmonteserin-do-st.carto-staging.com";
  var apiPath = "/api/v4/data/observatory/metadata/datasets/";
  var url = baseUrl + apiPath + datasetId;
  console.log(url);
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

export function fetchKeyVariables (context, datasetId) {
  // context.commit('setFetchingState');

  // var baseUrl = "https://public.carto.com";
  var baseUrl = "https://cmonteserin-do-st.carto-staging.com";
  var apiPath = "/api/v4/data/observatory/metadata/datasets/";
  var url = baseUrl + apiPath + datasetId + "/key_variables";
  console.log(url);
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      if(req.status == 200)
        context.commit('setKeyVariables', JSON.parse(req.responseText));
      else
        console.log("Error loading page\n"); //TODO
    }
  };
  req.send(null);
}