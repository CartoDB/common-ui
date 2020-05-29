<template>
  <div class="filter-detail">
    <div class="label">{{ filterId }}</div>
    <ul>
      <li v-for="filter in filters" :key="filter">
        <div class="filter-tag">
          {{ filterMetadata.get(filter).name }}
          <button @click="deleteFilter(filter)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FilterDetail',
  props: {
    filterId: String,
    filters: Array
  },
  computed: {
    ...mapState({
      filterMetadata: state => state.doCatalog.filtersAvailable[this.filterId]
    })
  },
  methods: {
    deleteFilter(filterValue) {
      this.$store.dispatch('doCatalog/deleteFilter', {id: this.filterId, value: filterValue });
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-detail {
    display: flex;
    flex-direction: row;
  }
</style>