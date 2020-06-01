<template>
  <div class="filter-summary">
    <div class="header" :class="{'highlight-header': showDetails}">
      <div class="entities-count title"><span class="is-caption is-txtNavyBlue">{{ count }}</span> <span class="is-txtMidGrey is-small">datasets</span></div>
      <div class="filters-count" v-if="filtersCount">
        <button class="title is-small is-navyBlue u-mr--20 detail-button" @click="toggleDetails()">
          <img class="u-mr--12" src="../../assets/arrow-blue.svg" alt="Expand">
          {{ filtersCount }} <span>filters applied</span>
        </button>
        <Button :isOutline="true" :extraBorder="true" color="engine-blue" @click.native="clearFilters">Clear all</Button>
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
import Button from '../Button.vue';

export default {
  name: 'FilterSummary',
  components: {
    FilterDetail,
    Button
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
    filtersApplied() {
      const filterMap = new Map();
      for (let filterId in this.filtersAvailable) {
        if (this.filter[filterId].length) {
          filterMap.set(filterId, this.filter[filterId]);
        }
      }
      return filterMap;
    },
    filtersCount() {
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
  @import '../../styles/variables';

  .filter-summary {
    position: relative;

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 12px 12px 12px 24px;

      &.highlight-header {
        border-radius: 8px 8px 0 0;
        background-color: #FFF;
        box-shadow: 0 4px 16px 0 rgba($neutral--800, 0.16);
      }
    }

    .extra-container {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      padding: 0 12px;
      border-radius: 0 0 8px 8px;
      background: #FFF;
      box-shadow: 0 4px 16px 0 rgba($neutral--800, 0.16);
    }
  }

  .detail-button {
    cursor: pointer;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
</style>