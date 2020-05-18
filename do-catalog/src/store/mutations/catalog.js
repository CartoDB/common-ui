export function setFetchingState (state) {
  state.isFetching = true;
  state.hasError = false;
}

export function setDataset (state, data) {
  state.dataset = data;
  state.isFetching = false;
  state.hasError = false;
}

export function setKeyVariables (state, data) {
  state.key_variables = data;
  state.isFetching = false;
  state.hasError = false;
}

export function setVariables (state, data) {
  state.variables = data;
  state.isFetching = false;
  state.hasError = false;
}