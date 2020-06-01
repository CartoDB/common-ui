<template>
  <div class="filter-box" :class="{'is-compressed':isCompressed}">
    <div class="filter-header" @click="toggleVisibility">
      <div class="expand-button u-mr--16">
        <img src="../../assets/arrow-navy.svg" alt="Expand">
      </div>
      <div>
        <h3 class="title is-caption">{{ title }}</h3>
        <p class="title is-small" v-if="currentFilter.length">
          {{
            currentFilter.length > 1
              ? `${currentFilter.length} filters`
              : `${currentFilter.length} filter`
          }}
          <span>·</span>
          <button class="title is-small clear-button" @click="clearFilter">Clear</button>
        </p>
      </div>
    </div>
    <div class="filter-options">
      <div class="options-filter u-mb--4">
        <input
          class="filter-input"
          v-if="options.size > 10"
          type="text"
          :placeholder="`Find a ${placeholder}`"
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
          <span class="checkbox u-mr--12">
            <input
              class="checkbox-input"
              type="checkbox"
              name="option.id"
              :checked="currentFilter.includes(option.id)"
              @change="filterChanged($event, option)"
            />
            <span data-v-d1b5b660="" class="checkbox-decoration">
              <svg data-v-d1b5b660="" viewBox="0 0 12 12" svg-inline="" role="presentation" focusable="false" tabindex="-1" class="checkbox-decorationMedia"><path data-v-d1b5b660="" d="M1.65 3.803l2.84 3.169L10.38.717" fill="none" class="checkbox-check"></path></svg>
            </span>
          </span>
          <span>
            {{ option.name }}
            <span class="is-txtMidGrey is-small" v-if="option.entity_count">({{ option.entity_count }})</span>
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FilterBox',
  props: {
    title: String,
    filter: String,
    placeholder: String
  },
  data() {
    return {
      model: new Set(),
      filterText: '',
      isCompressed: false
    };
  },
  computed: {
    ...mapState({
      filtersAvailable: state => state.doCatalog.filtersAvailable,
      currentFilter(state) {
        return state.doCatalog.filter[this.filter];
      }
    }),
    options() {
      return this.filtersAvailable[this.filter] || new Map();
    },
    filteredOptions() {
      const lowercaseFilter = this.filterText.toLowerCase();
      return [...this.options.values()].filter(opt =>
        opt.name.toLowerCase().includes(lowercaseFilter)
      );
    }
  },
  watch: {
    currentFilter: {
      deep: true,
      handler() {
        this.model = new Set(this.currentFilter);
      }
    }
  },
  methods: {
    filterChanged(event, option) {
      if (this.model.has(option.id)) {
        this.model.delete(option.id);
      } else {
        this.model.add(option.id);
      }
      this.updateFilter();
    },
    updateFilter() {
      const newFilter = {};
      newFilter[this.filter] = [...this.model.values()];
      this.$store.dispatch('doCatalog/updateFilter', newFilter);
    },
    clearFilter() {
      this.model.clear();
      this.updateFilter();
    },
    clearOptionsFilter() {
      this.filterText = '';
    },
    toggleVisibility() {
      this.isCompressed = !this.isCompressed;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.filter-box {
  border-bottom: 1px solid $neutral--300;
  cursor: pointer;

  .filter-header {
    display: flex;
    align-items: center;
    padding: 24px 0 24px 20px;

    &:hover {
      background-color: $blue--100;
    }
  }

  .filter-content {
    height: 100%;
    padding: 16px;
    overflow-y: auto;

    label {
      display: flex;
      margin-bottom: 16px;
      cursor: pointer;
    }
  }

  .filter-options {
    display: flex;
    flex-direction: column;
    max-height: 268px;
    overflow: hidden;
  }

  &.is-compressed {
    .filter-options {
      max-height: 0;
    }

    .expand-button {
      transform: rotate(-90deg);
    }
  }
}

.clear-button {
  color: $engine-blue;
  cursor: pointer;
}

.filter-input {
  width: 100%;
  height: 36px;
  padding: 10px 12px;
  border: 0;
  border-radius: 4px;
  background-color: $neutral--100;

  &::placeholder {
    opacity: 1;
    color: $neutral--600;
  }
}
</style>
