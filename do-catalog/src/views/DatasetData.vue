<template>
  <div class="grid u-flex__justify--center">
    <div class="grid-cell grid-cell--col10 u-mt--28">
      <h2 class="title is-caption is-txtMainTextColor">Data sample <a href="#" class="is-small">(View {{numberColumns}} variables list)</a></h2>
      <div class="table-wrapper" ref="tableWrapper">
        <div class="tooltip is-small" v-if="tooltipVisible" :style="{left: tooltipLeft+'px'}">
          <p class="text is-small"><span class="is-semibold">Description:</span> {{tooltipDescription}}</p>
          <p class="text is-small"><span class="is-semibold">Type:</span> {{tooltipType}}</p>
        </div>
        <div class="scrollable-table u-mt--24">
          <table class="text is-small">
            <tr>
              <th @mouseover="showTooltip(value, $event)" @mouseleave="hideTooltip" v-for="value in columns" :key="value">
                {{value}}
              </th>
            </tr>
            <tr v-for="n in numberRows" :key="n">
              <td v-for="value in columns" :key="value">{{tableSample[value][n-1]}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="grid-cell--col10 u-mt--60">
      <h2 class="grid-cell title is-caption is-txtMainTextColor">Variables</h2>

      <ul class="u-mt--24 text f12 is-small is-txtMainTextColor">
        <li class="grid title is-txtMidGrey header-row">
          <div class="grid-cell grid-cell--col4">Column Name</div>
          <div class="grid-cell grid-cell--col7">Description</div>
          <div class="grid-cell grid-cell--col1">Type</div>
        </li>

        <li class="grid info-row" v-for="variable in variables" :key="variable.slug">
          <div class="grid-cell grid-cell--col4 is-semibold">{{variable.name}}</div>
          <div class="grid-cell grid-cell--col7">{{variable.description}}</div>
          <div class="grid-cell grid-cell--col1">{{variable.db_type}}</div>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "DatasetSummary",
  data () {
    return {
      tooltipVisible: false,
      tooltipLeft: 0,
      tooltipDescription: null,
      tooltipType: null
    }
  },
  mounted () {
    this.fetchVariables()
  },
  computed: {
    ...mapState({
      dataset: state => state.catalog.dataset,
      variables: state => state.catalog.variables
    }),
    tableSample () {
      return this.dataset && this.dataset.summary_json ? this.dataset.summary_json.glimpses.head : {};
    },
    columns () {
      return this.tableSample ? Object.keys(this.tableSample) : [];
    },
    numberRows () {
      return this.tableSample[this.columns[0]].length;
    },
    numberColumns () {
      return this.columns.length;
    }
  },
  methods: {
    fetchVariables () {
      this.$store.dispatch('catalog/fetchVariables', this.$route.params.dataset_id)
    },
    findVariableInfo (variableName) {
      return this.variables.find(e => e.column_name == variableName);
    },
    showTooltip (variableName, event) {
      let tooltipInfo = this.findVariableInfo(variableName);
      this.tooltipLeft = event.target.getBoundingClientRect().left - this.$refs.tableWrapper.getBoundingClientRect().left;
      this.tooltipDescription = tooltipInfo.description;
      this.tooltipType = tooltipInfo.db_type;
      this.tooltipVisible = true;
    },
    hideTooltip() {
      console.log("HIDE")
      this.tooltipVisible = false;
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/variables";

.scrollable-table {
  width: 100%;
  overflow: scroll;
  border: 1px solid $neutral--400;

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
  background-color: #FFF;

  &::before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 24px;
    width: 14px;
    height: 14px;
    transform: rotate(45deg);
    border: 1px solid $neutral--200;
    border-top: none;
    border-left: none;
    border-radius: 2px;
    background-color: #FFF;
  }
}
</style>
