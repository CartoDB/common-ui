<template>
  <div class="filter-detail">
    <div class="label text is-small is-txtMidGrey u-mt--8 u-ml--12">
      {{ filterName }}
    </div>
    <ul class="filter-container">
      <li v-for="filter in filters" :key="filter.id">
        <div class="filter-tag title is-small is-txtNavyBlue u-ml--12 u-mb--12">
          {{ filter.name }}
          <button class="u-ml--8" @click="deleteFilter(filter)">
            <img src="../../assets/close-tag.svg" alt="Delete" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { filtersMetadata } from '../../utils/constants';

export default {
  name: 'FilterDetail',
  props: {
    filterId: String,
    filters: Array
  },
  computed: {
    ...mapState({
      filterMetadata: function(state) {
        return state.doCatalog.filtersAvailable[this.filterId];
      }
    }),
    filterName: function() {
      return filtersMetadata[this.filterId].label;
    }
  },
  methods: {
    deleteFilter(filterValue) {
      this.$store.commit('doCatalog/removeFilter', {
        id: this.filterId,
        value: filterValue
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.label {
  flex-shrink: 0;
  width: 82px;
}

.filter-detail {
  display: flex;
  flex-direction: row;
  padding-top: 12px;
  border-top: 1px solid $neutral--300;
}

.filter-container {
  display: flex;
  flex-wrap: wrap;
}

.filter-tag {
  display: flex;
  align-items: center;
  padding: 6px 6px 6px 12px;
  border-radius: 4px;
  background-color: $color-primary--soft;
  white-space: nowrap;

  button {
    padding: 0;
    cursor: pointer;
  }
}
</style>
