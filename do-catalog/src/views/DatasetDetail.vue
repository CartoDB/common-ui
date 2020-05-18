<template>
  <div id="app">
    <DatasetHeader></DatasetHeader>
    <div class="grid grid-cell u-flex__justify--center">
      <NavigationTabs class="grid-cell--col10">
        <router-link :to="{ name: 'do-dataset-summary' }">Summary</router-link>
        <router-link :to="{ name: 'do-dataset-data' }">Data</router-link>
        <router-link to="/">Map</router-link>
        <router-link to="/">Use it</router-link>
        <router-link to="/">Catalog</router-link>
      </NavigationTabs>
    </div>
    <router-view />
  </div>
</template>

<script>
import DatasetHeader from '../components/datasetDetail/DatasetHeader';
import NavigationTabs from '../components/datasetDetail/NavigationTabs';

export default {
  name: 'App',
  mounted() {
    this.fetchDataset();
    this.fetchKeyVariables();
  },
  components: {
    DatasetHeader,
    NavigationTabs
  },
  methods: {
    fetchDataset() {
      this.$store.dispatch(
        'doCatalog/fetchDataset',
        this.$route.params.datasetId
      );
    },
    fetchKeyVariables() {
      this.$store.dispatch(
        'doCatalog/fetchKeyVariables',
        this.$route.params.datasetId
      );
    }
  }
};
</script>
