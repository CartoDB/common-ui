<template>
  <div class="search-box">
    <input
      type="text"
      class="text is-caption"
      placeholder="Search datasets by title or description"
      v-model="filterText"
      v-on:keyup.enter="updateFilter"
    />
    <button v-if="filterText.length" @click="clearFilter">Clear</button>
    <button @click="updateFilter">Search</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SearchBox',
  data() {
    return {
      filterText: ''
    };
  },
  computed: {
    ...mapState({
      searchText: state => state.doCatalog.filter.searchText
    })
  },
  methods: {
    clearFilter() {
      this.filterText = '';
      this.updateFilter();
    },
    updateFilter() {
      this.$store.dispatch('doCatalog/updateFilter', {
        searchText: this.filterText
      });
    }
  },
  mounted() {
    this.filterText = this.searchText;
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.search-box {
  display: flex;
  flex-direction: row;

  input[type='text'] {
    flex: 1 1 auto;
    padding: 12px 16px;
    border: 1px solid $neutral--600;
    border-radius: 8px;
    margin: 1px;
    color: $navy-blue;

    &:focus {
      outline: none;
      border: 2px solid $blue--500;
      margin: 0;
    }
  }
}
</style>
