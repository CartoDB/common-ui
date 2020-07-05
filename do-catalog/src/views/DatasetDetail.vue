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
    <DatasetActionsBar
      v-if="subscription"
      :subscription="subscription"
      class="u-mt--12"
    ></DatasetActionsBar>
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
import { mapState } from 'vuex';
import DatasetActionsBar from '../components/datasetDetail/DatasetActionsBar';
import DatasetHeader from '../components/datasetDetail/DatasetHeader';
import NavigationTabs from '../components/datasetDetail/NavigationTabs';

export default {
  name: 'DatasetDetail',
  components: {
    DatasetActionsBar,
    DatasetHeader,
    NavigationTabs
  },
  computed: {
    ...mapState({
      dataset: state => state.doCatalog.dataset
    }),
    subscription() {
      return this.$store.getters['doCatalog/getSubscriptionByDataset'](
        this.dataset.id
      );
    },
    isGeography() {
      return this.$route.params.type === 'geography';
    }
  },
  methods: {
    fetchDataset() {
      if (!this.dataset || this.dataset.slug !== this.$route.params.datasetId) {
        this.$store.dispatch('doCatalog/fetchDataset', {
          id: this.$route.params.datasetId,
          type: this.$route.params.type
        });
      }
    }
  },
  mounted() {
    // TODO: commented for DO Catalog soft-release
    // this.$store.dispatch('doCatalog/fetchSubscriptionsList');
    this.fetchDataset();
  },
  destroyed() {
    this.$store.commit('doCatalog/resetDataset');
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.navigation-header {
  padding: 24px 0;
  border-bottom: 1px solid $neutral--300;

  .back-link {
    display: flex;
  }
}
</style>
