<template>
  <div>
    <router-link :to="{ name: 'do-catalog' }">Datasets list</router-link>
    <DatasetHeader></DatasetHeader>
    <div class="grid grid-cell u-flex__justify--center">
      <NavigationTabs class="grid-cell--col10">
        <router-link :to="{ name: 'do-dataset-summary' }">Summary</router-link>
        <router-link :to="{ name: 'do-dataset-data' }">Data</router-link>
      </NavigationTabs>
    </div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import DatasetHeader from '../components/datasetDetail/DatasetHeader';
import NavigationTabs from '../components/datasetDetail/NavigationTabs';

export default {
  name: 'DatasetDetail',
  components: {
    DatasetHeader,
    NavigationTabs
  },
  computed: {
    isGeography() {
      return this.$route.params.type === 'geography'
    }
  },
  methods: {
    fetchDataset() {
      this.$store.dispatch(
        'doCatalog/fetchDataset',
        { id: this.$route.params.datasetId, type: this.$route.params.type }
      );
    },
    fetchKeyVariables() {
      this.$store.dispatch(
        'doCatalog/fetchKeyVariables',
        this.$route.params.datasetId
      );
    }
  },
  mounted() {
    this.fetchDataset();
    this.fetchKeyVariables();
  }
};
</script>
