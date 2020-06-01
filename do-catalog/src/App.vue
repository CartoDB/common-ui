<template>
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import store from './store';
import createRouter from './router';

export default {
  store,
  router: createRouter(),
  name: 'DOCatalogHome',
  created() {
    if (this.$root.userData) {
      this.$store.dispatch('user/setUserData', this.$root.userData);
    }
  }
};
</script>

<style lang="scss">
@import './styles/main.scss';
</style>
