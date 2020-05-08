export function setFetchingState (state) {
  state.isFetching = true;
  state.isErrored = false;
}

export function setDataset (state, data) {
  state.dataset = data;
  state.isFetching = false;
  state.isErrored = false;
}