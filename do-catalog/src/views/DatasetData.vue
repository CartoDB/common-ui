<template>
  <div class="grid grid-cell u-flex__justify--center">
    <div class="grid-cell grid-cell--col12 u-mt--28">
      <h2 class="title is-caption is-txtMainTextColor">
        Data sample
        <a @click="scrollToVariables()" class="is-small"
          >View {{ numberColumns }} variables list</a
        >
      </h2>
      <div class="table-wrapper" ref="tableWrapper" v-if="columns.length">
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
        <div
          class="scrollable-table u-mt--24"
          v-if="numberRows > 0 && !isPublicWebsite"
        >
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
                <span v-if="tableSample[value][n - 1]">{{
                  tableSample[value][n - 1]
                }}</span>
                <span v-else class="is-txtLightGrey is-italic">null</span>
              </td>
            </tr>
          </table>
        </div>
        <div
          class="empty-container grid u-flex__justify--center u-mt--24"
          v-else
        >
          <div class="grid-cell--col5">
            <h4 class="title is-body is-txtMidGrey">Sample is not available</h4>
            <p class="text is-caption is-txtMidGrey u-mt--8">
              <span v-if="numberRows > 0"
                >This data sample is only available for customers.</span
              >
              <span v-else
                >This data sample can’t be shown because the real dataset only
                contains a few rows.</span
              >
            </p>
            <div>
              <Button
                v-if="numberRows > 0"
                class="u-mt--24"
                url="https://carto.com/login"
                :isOutline="false"
                :reverseColors="true"
                >Login</Button
              >
              <span
                v-if="numberRows > 0"
                class="u-ml--12 u-mr--12 text is-small"
                >or</span
              >
              <Button class="u-mt--24" :url="getFormUrl()" :isOutline="true"
                >Contact us for a demo</Button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="empty-container grid u-flex__justify--center u-mt--24" v-else>
        <div class="grid-cell--col5">
          <h4 class="title is-body is-txtMidGrey">Sample is not available</h4>
          <p class="text is-caption is-txtMidGrey u-mt--8">
            <span v-if="numberRows > 0"
              >This data sample is only available for customers.</span
            >
            <span v-else
              >This data sample can’t be shown because the real dataset only
              contains a few rows.</span
            >
          </p>
          <div>
            <Button
              v-if="numberRows > 0"
              class="u-mt--24"
              url="https://carto.com/login"
              :isOutline="false"
              :reverseColors="true"
              >Login</Button
            >
            <span v-if="numberRows > 0" class="u-ml--12 u-mr--12 text is-small"
              >or</span
            >
            <Button class="u-mt--24" :url="getFormUrl()" :isOutline="true"
              >Contact us for a demo</Button
            >
          </div>
        </div>
      </div>
    </div>

    <div class="grid-cell--col10 u-mt--60" ref="variablesSection" v-if="!isGeography">
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
          <div class="grid-cell grid-cell--col4 is-semibold name-cell">
            {{ variable.column_name }}
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
import Button from '../components/Button.vue';
import { formUrl } from '../utils/form-url';

export default {
  name: 'DatasetSummary',
  components: {
    Button
  },
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
    isPublicWebsite() {
      return !(this.$store.state.user && this.$store.state.user.id);
    },
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
      return this.variables ? this.variables.length : this.columns.length;
    },
    isGeography() {
      return this.$route.params.type === 'geography';
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

      if (this.tooltip.left < -20) {
        this.tooltip.left = -20;
      } else if (tableBoundingSize.width - this.tooltip.left < -20) {
        this.tooltip.left = tableBoundingSize.width + 20;
      }
      this.tooltip.description = tooltipInfo.description;
      this.tooltip.type = tooltipInfo.db_type;
      this.tooltip.visible = true;
    },
    hideTooltip() {
      this.tooltip.visible = false;
      this.tooltip.isFirst = false;
      this.tooltip.isLast = false;
    },
    getFormUrl() {
      return formUrl(this.dataset.category_name, this.dataset.country_name, this.dataset.data_source_name)
    },
    scrollToVariables() {
      window.scrollTo(0, this.$refs.variablesSection.offsetTop);
    }
  }
};
</script>

<style scoped lang="scss">
@import '../styles/variables';

.title a {
  margin-left: 26px;
}

a {
  cursor: pointer;
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

.name-cell {
  overflow: hidden;
  text-overflow: ellipsis;
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
  transform: translateX(-50%);
  border: 1px solid $border-color;
  border-radius: 4px;
  background-color: #fff;
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
      right: 24px;
      left: auto;
    }
  }
}

.empty-container {
  padding: 36px 0 48px;
  border-radius: 6px;
  background-color: $blue--100;
  text-align: center;
}
</style>
