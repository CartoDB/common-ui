<template>
  <div class="filter-summary" :class="{ highlight: showDetails }">
    <div class="header">
      <div class="entities-count title">
        <span class="is-caption is-txtNavyBlue">{{ count }}</span>
        <span class="is-txtMidGrey is-small"> datasets</span>
      </div>
      <div class="filters-count" v-if="filtersCount">
        <button
          class="title is-small is-navyBlue u-mr--20 detail-button"
          @click="toggleDetails()"
        >
          <img
            class="u-mr--12 expand-icon"
            src="../../assets/arrow-blue.svg"
            alt="Expand"
          />
          {{ filtersCount }} <span>filters applied</span>
        </button>
        <Button
          :isOutline="true"
          :extraBorder="true"
          color="engine-blue"
          @click.native="clearFilters"
          :narrow="true"
          >Clear all</Button
        >
      </div>
    </div>
    <transition
      name="slide"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="extra-container" v-if="showDetails">
        <FilterDetail
          v-for="[filterKey, filterContent] in filtersApplied"
          :key="filterKey"
          :filterId="filterKey"
          :filters="filterContent"
        ></FilterDetail>
      </div>
    </transition>
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
    };
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
  watch: {
    filtersCount: function(newValue) {
      if (newValue === 0) {
        this.showDetails = false;
      }
    }
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
    clearFilters() {
      this.$store.dispatch('doCatalog/clearTagFilters');
    },

    // Vue transition to force precalculate height
    enter(el) {
      el.style.overflow = 'hidden';
      el.style.height = '0';

      window.requestAnimationFrame(() => {
        el.style.height = `${el.scrollHeight}px`;
      });
    },
    leave(el) {
      el.style.overflow = 'hidden';
      el.style.height = `${el.scrollHeight}px`;

      window.requestAnimationFrame(() => {
        el.style.height = '0';
      });
    },
    afterEnter(el) {
      el.style.height = '';
      el.style.overflow = '';
    },
    afterLeave(el) {
      el.style.height = '';
      el.style.overflow = '';
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.filter-summary {
  border-radius: 8px;
  background-color: $white;
  box-shadow: 0 0 0 0 transparent;
  transition: box-shadow 0.2s ease-out;

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 12px 12px 12px 24px;
  }

  .extra-container {
    width: 100%;
    padding: 0 12px;
    background: #fff;
    border-radius: 0 0 8px 8px;
  }

  &.highlight {
    box-shadow: 0 4px 16px 0 rgba($neutral--800, 0.16);

    .expand-icon {
      transform: rotate(180deg);
    }
  }
}

.detail-button {
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &.highlight-header {
    box-shadow: 0 4px 16px 0 rgba($neutral--800, 0.16);

    .expand-icon {
      transform: rotate(180deg);
    }
  }
}

.detail-button {
  padding: 8px 16px 8px 12px;
  border-radius: 4px;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:hover {
    background-color: $blue--100;
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: height 0.2s ease-out;
  overflow: hidden;
}
.expand-enter,
.expand-leave-to {
  height: 0;
}

// Vue transition
$animationTimming: 250ms;
$animationFunc: ease;

.slide-enter-active {
  transition: height $animationTimming $animationFunc,
    opacity $animationTimming $animationFunc $animationTimming/3;
}

.slide-leave-active {
  transition: height $animationTimming $animationFunc,
    opacity $animationTimming $animationFunc;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  margin: 0;
}
</style>
