const user = {
  namespaced: true,
  state: {
    id: null,
    username: null,
    api_key: null,
    base_url: null,
    account_type: null,
    organization: null
  },
  computed: {},
  getters: {},
  mutations: {
    setUserData(state, data) {
      Object.assign(state, data);
    }
  },
  actions: {
    setUserData(context, data) {
      context.commit('setUserData', data);
    }
  }
};

export default user;
