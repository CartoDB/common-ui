<template>
  <div class="filter-summary">
    <div class="header">
      <div class="entities-count">{{ count }} <span>datasets</span></div>
      <div class="filters-count" v-if="filtersCount">
        {{ filtersCount }}
        <span>filters applied</span>
        <button @click="clearFilters">Clear</button>
      </div>
    </div>
    <div class="extra">
      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FilterSummary',
  computed: {
    ...mapState({
      count: state => state.doCatalog.datasetsListCount,
      filter: state => state.doCatalog.filter
    }),
    filtersCount: function() {
      return this.filter.categories.length + this.filter.countries.length + this.filter.licenses.length + this.filter.sources.length;
    }
  },
  methods: {
    clearFilters() {
      this.$store.dispatch('doCatalog/clearTagFilters');
    }
  }
}
</script>

<style lang="scss" scoped>

</style>