<template>
  <div class="grid u-flex__justify--center">
    <div class="grid-cell grid-cell--col7 main-column">
      <div class="map-header">
        <img class="" src="../assets/map-samples.jpg" alt="map-sample">
      </div>
      <p class="text is-caption is-txtNavyBlue u-mt--32">
        {{dataset.description}}
      </p>

      <div class="key-variables u-mt--32">
        <h5 class="title is-caption is-txtNavyBlue">Key variables <a href="#" class="is-small">(View all)</a></h5>
        <ul class="grid text is-caption bullet-list u-mt--24">
          <li class="grid-cell grid-cell--col6">Households by age of reference person</li>
          <li class="grid-cell grid-cell--col6">Households by number of dependant children</li>
          <li class="grid-cell grid-cell--col6">Households by dwelling type</li>
          <li class="grid-cell grid-cell--col6">Households by number of rooms</li>
          <li class="grid-cell grid-cell--col6">Households by economic activity</li>
          <li class="grid-cell grid-cell--col6">Households by size</li>
          <li class="grid-cell grid-cell--col6">Households by ethnic groups</li>
          <li class="grid-cell grid-cell--col6">Households by tenure</li>
        </ul>
      </div>
    </div>
    <div class="grid-cell--col1"></div>
    <div class="grid-cell grid-cell--col2 sidebar">
      <ul class="side-characteristics">
        <li class="u-mb--32">
          <h4 class="text is-small is-txtSoftGrey u-mb--10">Licence</h4>
          <p class="text is-caption is-txtNavyBlue">{{dataset_privacy}}</p>
        </li>
        <li class="u-mb--32">
          <h4 class="text is-small is-txtSoftGrey u-mb--10">Country</h4>
          <p class="text is-caption is-txtNavyBlue">{{dataset.country_name}}</p>
        </li>
        <li class="u-mb--32">
          <h4 class="text is-small is-txtSoftGrey u-mb--10">Source</h4>
          <p class="text is-caption is-txtNavyBlue">{{dataset.provider_name}}</p>
        </li>
        <li class="u-mb--32">
          <h4 class="text is-small is-txtSoftGrey u-mb--10">Geography</h4>
          <p class="text is-caption is-txtNavyBlue">{{dataset.geography_name}}</p>
        </li>
        <li class="u-mb--32">
          <h4 class="text is-small is-txtSoftGrey u-mb--10">Temporal aggregation</h4>
          <p class="text is-caption is-txtNavyBlue">{{temporal_aggregation}}</p>
        </li>
        <li class="u-mb--32">
          <h4 class="text is-small is-txtSoftGrey u-mb--10">Update Frequency</h4>
          <p class="text is-caption is-txtNavyBlue">{{update_frequency}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { temporalAggregationName } from '../utils/temporal-agregation-name';

export default {
  name: "DatasetSummary",
  computed: {
    ...mapState({
      dataset: state => state.catalog.dataset
    }),
    temporal_aggregation () {
      return temporalAggregationName(this.dataset.temporal_aggregation)
    },
    update_frequency () {
      return this.dataset.update_frequency ? this.dataset.update_frequency : 'None';
    },
    dataset_privacy () {
      return this.dataset.is_public_data ? 'Public Data' : 'Premium Data';
    }
  },
}
</script>


<style scoped lang="scss">
.map-header {
  overflow: hidden;
  border-radius: 4px;

  img {
    max-width: 100%;
  }
}

.bullet-list {
  li {
    margin-bottom: 12px;
    list-style: inside;
  }
}
</style>