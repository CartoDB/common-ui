<template>
  <div class="u-pb--72">
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
    <template v-if="!loading">
      <DatasetActionsBar
        v-if="subscription"
        :subscription="subscription"
        :slug="dataset.slug"
        class="u-mt--12"
      ></DatasetActionsBar>
      <DatasetHeader></DatasetHeader>
      <div class="grid grid-cell u-flex__justify--center">
        <NavigationTabs class="grid-cell--col12">
          <router-link :to="{ name: 'do-dataset-summary' }">Summary</router-link>
          <router-link :to="{ name: 'do-dataset-data' }">Data</router-link>
        </NavigationTabs>
      </div>
      <router-view></router-view>
    </template>
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
  data() {
    return {
      loading: true
    };
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
  methods: {},
  mounted() {
    Promise.all([
      this.$store.dispatch('doCatalog/fetchSubscriptionsList'),
      this.$store.dispatch('doCatalog/fetchDataset', {
        id: this.$route.params.datasetId,
        type: this.$route.params.type
      })
    ]).then(() => {
      this.loading = false;
    });
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
