const user = {
  namespaced: true,
  state: {
    id: process.env.VUE_APP_USER_ID || null,
    username: process.env.VUE_APP_USER_USERNAME || null,
    api_key: process.env.VUE_APP_USER_API_KEY || null,
    base_url: process.env.VUE_APP_USER_BASE_URL || null,
    account_type: process.env.VUE_APP_USER_ACCOUNT_TYPE || null,
    organization: process.env.VUE_APP_USER_ORGANIZATION || null,
    is_enterprise: process.env.VUE_APP_USER_IS_ENTERPRISE || null
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
