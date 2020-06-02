<template>
  <div>
    <div class="grid grid-cell u-flex__justify--center">
      <div class="grid-cell--col12 navigation-header">
        <router-link
          class="title is-small is-txtNavyBlue back-link"
          :to="{ name: 'do-catalog' }"
        >
          <img class="u-mr--12" src="../assets/back-arrow.svg" alt="back" />
          Datasets list
        </router-link>
      </div>
    </div>
    <DatasetHeader></DatasetHeader>
    <div class="grid grid-cell u-flex__justify--center">
      <NavigationTabs class="grid-cell--col12">
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
      return this.$route.params.type === 'geography';
    }
  },
  methods: {
    fetchDataset() {
      this.$store.dispatch('doCatalog/fetchDataset', {
        id: this.$route.params.datasetId,
        type: this.$route.params.type
      });
    },
    fetchKeyVariables() {
      this.$store.dispatch('doCatalog/fetchKeyVariables', {
        id: this.$route.params.datasetId,
        type: this.$route.params.type
      });
    }
  },
  mounted() {
    this.fetchDataset();
    this.fetchKeyVariables();
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.navigation-header {
  padding: 24px 0;

  .back-link {
    display: flex;
  }

  border-bottom: 1px solid $neutral--300;
}
</style>
