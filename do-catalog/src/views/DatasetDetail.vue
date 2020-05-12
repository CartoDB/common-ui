<template>
  <div id="app">
    <DatasetHeader></DatasetHeader>
    <div class="grid grid-cell u-flex__justify--center">
      <NavigationTabs class="grid-cell--col10">
        <router-link :to="{name: 'Default'}">Summary</router-link>
        <router-link :to="{name: 'Data'}">Data</router-link>
        <router-link to="/">Map</router-link>
        <router-link to="/">Use it</router-link>
        <router-link to="/">Catalog</router-link>
      </NavigationTabs>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DatasetHeader from '../components/datasetDetail/DatasetHeader';
import NavigationTabs from '../components/datasetDetail/NavigationTabs';

export default {
  name: 'App',
  mounted () {
    this.fetchDataset();
  },
  components: {
    DatasetHeader,
    NavigationTabs
  },
  methods: {
    fetchDataset () {
      this.$store.dispatch('catalog/fetchDataset', this.$route.params.dataset_id)
    }
  }
}
</script>
