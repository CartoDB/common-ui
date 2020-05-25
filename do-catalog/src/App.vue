<template>
  <div id="app" class="do-root">
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

<style lang="scss" scoped>
  ::v-deep {
    @import './styles/main.scss';
  }
</style>
