<template>
  <div class="grid u-flex__justify--center">
    <div class="grid-cell grid-cell--col10 u-mt--28">
      <h2 class="title is-caption is-txtMainTextColor">
        Data sample
        <a href="#variables-section" class="is-small"
          >View {{ numberColumns }} variables list</a
        >
      </h2>
      <div class="table-wrapper" ref="tableWrapper">
        <div
          class="tooltip is-small"
          :class="{ first: tooltip.isFirst, last: tooltip.isLast }"
          v-if="tooltip.visible"
          :style="{ left: tooltip.left + 'px' }"
        >
          <p class="text is-small">
            <span class="is-semibold">Description:</span>
            {{ tooltip.description }}
          </p>
          <p class="text is-small">
            <span class="is-semibold">Type:</span> {{ tooltip.type }}
          </p>
        </div>
        <div class="scrollable-table u-mt--24">
          <table class="text is-small">
            <tr>
              <th></th>
              <th
                @mouseover="showTooltip(value, $event)"
                @mouseleave="hideTooltip"
                v-for="value in columns"
                :key="value"
              >
                {{ value }}
              </th>
            </tr>
            <tr v-for="n in numberRows" :key="n">
              <td class="is-semibold">{{ n - 1 }}</td>
              <td v-for="value in columns" :key="value">
                {{ tableSample[value][n - 1] }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="grid-cell--col10 u-mt--60" id="variables-section">
      <h2 class="grid-cell title is-caption is-txtMainTextColor">Variables</h2>

      <ul class="u-mt--24 text f12 is-small is-txtMainTextColor">
        <li class="grid title is-txtMidGrey header-row">
          <div class="grid-cell grid-cell--col4">Column Name</div>
          <div class="grid-cell grid-cell--col7">Description</div>
          <div class="grid-cell grid-cell--col1">Type</div>
        </li>

        <li
          class="grid info-row"
          v-for="variable in variables"
          :key="variable.slug"
        >
          <div class="grid-cell grid-cell--col4 is-semibold">
            {{ variable.name }}
          </div>
          <div class="grid-cell grid-cell--col7">
            {{ variable.description }}
          </div>
          <div class="grid-cell grid-cell--col1">{{ variable.db_type }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'DatasetSummary',
  data() {
    return {
      tooltip: {
        visible: false,
        isFirst: false,
        isLast: false,
        left: 0,
        description: null,
        type: null
      }
    };
  },
  mounted() {
    this.fetchVariables();
  },
  computed: {
    ...mapState({
      dataset: state => state.doCatalog.dataset,
      variables: state => state.doCatalog.variables
    }),
    tableSample() {
      return this.dataset && this.dataset.summary_json
        ? this.dataset.summary_json.glimpses.head
        : {};
    },
    columns() {
      return this.tableSample ? Object.keys(this.tableSample) : [];
    },
    numberRows() {
      return this.columns.length ? this.tableSample[this.columns[0]].length : 0;
    },
    numberColumns() {
      return this.columns.length;
    }
  },
  methods: {
    fetchVariables() {
      this.$store.dispatch(
        'doCatalog/fetchVariables',
        this.$route.params.datasetId
      );
    },
    findVariableInfo(variableName) {
      return this.variables.find(e => e.column_name == variableName);
    },
    showTooltip(variableName, event) {
      let tooltipInfo = this.findVariableInfo(variableName);
      let tableBoundingSize = this.$refs.tableWrapper.getBoundingClientRect();
      let targetBoundingSize = event.target.getBoundingClientRect();
      this.tooltip.left = targetBoundingSize.left - tableBoundingSize.left;
      if (this.tooltip.left < 60) {
        this.tooltip.isFirst = true;
      } else if (tableBoundingSize.width - this.tooltip.left < 120) {
        this.tooltip.isLast = true;
        this.tooltip.left += targetBoundingSize.width;
      } else {
        this.tooltip.left += targetBoundingSize.width / 2;
      }
      this.tooltip.description = tooltipInfo.description;
      this.tooltip.type = tooltipInfo.db_type;
      this.tooltip.visible = true;
    },
    hideTooltip() {
      this.tooltip.visible = false;
      this.tooltip.isFirst = false;
      this.tooltip.isLast = false;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/styles/variables';

.title a {
  margin-left: 26px;
}

.scrollable-table {
  width: 100%;
  overflow: auto;

  td,
  th {
    padding: 12px 24px 12px 8px;
  }

  tr:nth-child(even) {
    background-color: $color-primary--soft;
  }

  th {
    position: relative;
    color: $link__color;
    text-align: left;
  }
}

.info-row {
  padding: 14px 0;
  border-bottom: 1px solid $blue--100;
}

.header-row {
  padding-bottom: 12px;
  border-bottom: 2px solid $blue--100;
}

.tooltip-container {
  position: absolute;
  z-index: 2;
  bottom: 100%;
  margin-left: 32px;
  padding-bottom: 8px;
}

.table-wrapper {
  position: relative;
}

.tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  width: 300px;
  padding: 12px 16px 8px;
  border: 1px solid $border-color;
  border-radius: 4px;
  background-color: #fff;
  transform: translateX(-50%);
  word-break: break-word;

  &::before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: calc(50% - 12px); // To compensate right extra padding
    width: 14px;
    height: 14px;
    transform: rotate(45deg);
    border: 1px solid $neutral--200;
    border-top: none;
    border-left: none;
    border-radius: 2px;
    background-color: #fff;
  }

  &.first {
    transform: translateX(0);

    &::before {
      left: 12px;
    }
  }

  &.last {
    transform: translateX(-100%);

    &::before {
      left: auto;
      right: 24px;
    }
  }
}
</style>
