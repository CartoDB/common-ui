<template>
  <div class="filter-summary">
    <div class="header">
      <div class="entities-count">{{ count }} <span>datasets</span></div>
      <div class="filters-count" v-if="filtersCount">
        <button @click="toggleDetails()">{{ filtersCount }} <span>filters applied</span></button>
        <button @click="clearFilters">Clear</button>
      </div>
    </div>
    <div class="extra-container" v-if="showDetails">
      <FilterDetail v-for="[filterKey, filterContent] in filtersApplied" :key="filterKey" :filterId="filterKey" :filters="filterContent"></FilterDetail>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FilterDetail from './FilterDetail';

export default {
  name: 'FilterSummary',
  components: {
    FilterDetail
  },
  data() {
    return {
      showDetails: false
    }
  },
  computed: {
    ...mapState({
      count: state => state.doCatalog.datasetsListCount,
      filter: state => state.doCatalog.filter,
      filtersAvailable: state => state.doCatalog.filtersAvailable
    }),
    filtersApplied: function() {
      const filterMap = new Map();
      for (let filterId in this.filtersAvailable) {
        if (this.filter[filterId].length) {
          filterMap.set(filterId, this.filter[filterId]);
        }
      }
      return filterMap;
    },
    filtersCount: function() {
      let filterCount = 0;
      for (let filterId in this.filtersAvailable) {
        filterCount += this.filter[filterId].length;
      }
      return filterCount;
    }
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
    clearFilters() {
      this.$store.dispatch('doCatalog/clearTagFilters');
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-summary {
    position: relative;

    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .extra-container {
      position: absolute;
      top: 100%;
      left: 0;
      background: #FFF;
    }
  }
</style>