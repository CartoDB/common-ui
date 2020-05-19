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
  name: 'DOCatalogHome'
};
</script>

<style lang="scss">
@import './styles/main.scss';
</style>
