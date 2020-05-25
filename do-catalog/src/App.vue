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

<style lang="scss" scoped>
/* stylelint-disable */
::v-deep {
  @import './styles/main.scss';
}
/* stylelint-enable */
</style>
