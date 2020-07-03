<template>
  <div id="app" class="do-catalog">
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
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,600,700|Open+Sans:400,600');

.do-catalog {
  @import './styles/main.scss';
}
@import './styles/do-catalog.scss';
</style>
