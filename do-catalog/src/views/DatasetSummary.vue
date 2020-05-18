<template>
  <div class="grid u-flex__justify--center">
    <div class="grid-cell grid-cell--col7 main-column">
      <div class="map-header">
        <!-- <img class="" src="../assets/map-samples.jpg" alt="map-sample" /> -->
      </div>
      <p class="text is-caption is-txtMainTextColor u-mt--32">
        {{ dataset.description }}
      </p>

      <div class="key-variables u-mt--32">
        <h5 class="title is-caption is-txtMainTextColor">
          Key variables <a href="#" class="is-small">(View all)</a>
        </h5>
        <ul class="text is-caption column-list u-mt--24">
          <li v-for="variable in key_variables" :key="variable.id">
            <span>{{ variable.name }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="grid-cell--col1"></div>
    <div class="grid-cell grid-cell--col2 sidebar">
      <ul class="side-characteristics">
        <li class="u-mb--32">
          <h4 class="text is-small is-txtSoftGrey u-mb--10">Licence</h4>
          <p class="text is-caption is-txtMainTextColor">
            {{ dataset_privacy }}
          </p>
        </li>
        <li class="u-mb--32">
          <h4 class="text is-small is-txtSoftGrey u-mb--10">Country</h4>
          <p class="text is-caption is-txtMainTextColor">
            {{ dataset.country_name }}
          </p>
        </li>
        <li class="u-mb--32">
          <h4 class="text is-small is-txtSoftGrey u-mb--10">Source</h4>
          <p class="text is-caption is-txtMainTextColor">
            {{ dataset.provider_name }}
          </p>
        </li>
        <li class="u-mb--32">
          <h4 class="text is-small is-txtSoftGrey u-mb--10">Geography</h4>
          <p class="text is-caption is-txtMainTextColor">
            {{ dataset.geography_name }}
          </p>
        </li>
        <li class="u-mb--32">
          <h4 class="text is-small is-txtSoftGrey u-mb--10">
            Temporal aggregation
          </h4>
          <p class="text is-caption is-txtMainTextColor">
            {{ temporal_aggregation }}
          </p>
        </li>
        <li class="u-mb--32">
          <h4 class="text is-small is-txtSoftGrey u-mb--10">
            Update Frequency
          </h4>
          <p class="text is-caption is-txtMainTextColor">
            {{ update_frequency }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { temporalAggregationName } from '../utils/temporal-agregation-name';

export default {
  name: 'DatasetSummary',
  computed: {
    ...mapState({
      dataset: state => state.doCatalog.dataset,
      key_variables: state => state.doCatalog.key_variables
    }),
    temporal_aggregation() {
      return temporalAggregationName(this.dataset.temporal_aggregation);
    },
    update_frequency() {
      return this.dataset.update_frequency
        ? this.dataset.update_frequency
        : 'None';
    },
    dataset_privacy() {
      return this.dataset.is_public_data ? 'Public Data' : 'Premium Data';
    }
  }
};
</script>

<style scoped lang="scss">
.map-header {
  overflow: hidden;
  border-radius: 4px;

  img {
    max-width: 100%;
  }
}

.column-list {
  padding-left: 32px;
  column-gap: 48px;
  column-count: 2;
  column-width: 50%;

  li {
    margin-bottom: 12px;
    list-style: disc;

    span {
      display: inline-block;
      vertical-align: text-top;
    }
  }
}
</style>
