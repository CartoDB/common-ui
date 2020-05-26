<template>
  <div class="filter-box">
    <div class="filter-header">
      <h3 class="title is-caption">{{ title }}</h3>
      <p v-if="currentFilter.length">
        {{
          currentFilter.length > 1
            ? `${currentFilter.length} filters`
            : `${currentFilter.length} filters`
        }}
        <span>·</span>
        <button @click="clearFilter">Clear</button>
      </p>
    </div>
    <div class="options-filter">
      <input
        v-if="options.length > 10"
        type="text"
        placeholder="Filter options"
        v-model="filterText"
      />
      <button v-if="filterText.length" @click="clearOptionsFilter">
        Clear
      </button>
    </div>
    <div class="filter-content">
      <label
        class="text is-caption"
        v-for="option in filteredOptions"
        :key="option.id"
      >
        <input
          type="checkbox"
          name="option.id"
          :checked="currentFilter.includes(option.id)"
          @change="filterChanged($event, option.id)"
        />
        {{ option.name }}
      </label>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FilterBox',
  props: {
    title: String,
    filter: String
  },
  data() {
    return {
      model: new Set(),
      filterText: ''
    };
  },
  computed: {
    ...mapState({
      options: function(state) {
        return state.doCatalog.filtersAvailable[this.filter];
      },
      currentFilter: function(state) {
        return state.doCatalog.filter[this.filter];
      }
    }),
    filteredOptions() {
      const lowercaseFilter = this.filterText.toLowerCase();
      return this.options.filter(opt =>
        opt.name.toLowerCase().includes(lowercaseFilter)
      );
    }
  },
  methods: {
    filterChanged(event, option) {
      if (this.model.has(option)) {
        this.model.delete(option);
      } else {
        this.model.add(option);
      }
      this.updateFilter();
    },
    updateFilter() {
      const newFilter = {};
      newFilter[this.filter] = [...this.model];
      this.$store.dispatch('doCatalog/updateFilter', newFilter);
    },
    clearFilter() {
      this.model.clear();
      this.updateFilter();
    },
    clearOptionsFilter() {
      this.filterText = '';
    }
  },
  mounted() {
    this.model = new Set(this.currentFilter);
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.filter-box {
  border-bottom: 1px solid $neutral--400;

  .filter-header {
    padding: 24px 12px;
  }

  .filter-content {
    max-height: 340px;
    padding: 16px;
    overflow-y: auto;

    label {
      display: block;
      margin-bottom: 16px;
      cursor: pointer;
    }
  }
}
</style>
