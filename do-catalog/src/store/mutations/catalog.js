export function setFetchingState (state) {
  state.isFetching = true;
  state.hasError = false;
}

export function setDataset (state, data) {
  state.dataset = data;
  state.isFetching = false;
  state.hasError = false;
}