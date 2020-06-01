<template>
  <li class="list-item">
    <div class="category title is-small">
      {{ dataset.country_name }}<span v-if="dataset.category_name && dataset.country_name">·</span>{{ dataset.category_name }}
    </div>
    <div class="info u-mr--72">
      <h3 class="title is-body u-mb--8">
        <router-link
          :to="{
            name: 'do-dataset-summary',
            params: { datasetId: dataset.slug, type: dataset.is_geography ? 'geography' : 'dataset' }
          }"
          >{{ dataset.name }}</router-link
        >
      </h3>
      <p class="description text">{{ dataset.description }}</p>
    </div>
    <div class="extra text is-small grid grid--out" v-if="!dataset.is_geography">
      <div class="grid-cell grid-cell--col7 grid grid--align-end grid--no-wrap">
        <div class="license"><span>License</span> {{ dataset.license_name }}</div>
        <div class="geography">
          <span>Geography</span> {{ dataset.geography_name }}
        </div>
      </div>
      <div class="grid-cell grid-cell--col5 grid grid--align-end grid--space">
        <div class="aggregation">
          <span>Temporal aggr.</span> {{ temporalAggregation }}
        </div>
        <div class="provider">
          <img :src="providerLogo" :alt="dataset.provider_name" :title="dataset.provider_name"/>
        </div>
      </div>
    </div>
    <div class="extra text is-small grid grid--out" v-else>
      <div class="grid-cell grid-cell--col7 grid grid--align-end grid--no-wrap">
        <div class="license"><span>License</span> {{ dataset.license_name }}</div>
        <div class="geography">
          <span>Spatial aggr.</span> {{ spatialAggregation }}
        </div>
      </div>
      <div class="grid-cell grid-cell--col5 grid grid--align-end grid--space">
        <div class="aggregation">
          <span>Geometry type</span> {{ geometryType }}
        </div>
        <div class="provider">
          <img :src="providerLogo" :alt="dataset.provider_name" :title="dataset.provider_name" />
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { temporalAggregationName } from '../../utils/temporal-agregation-name';
import { geometryTypeName } from '../../utils/geometry-type-name';
import { toTitleCase } from '../../utils/string-to-title-case';

export default {
  name: 'DatasetListItem',
  props: {
    dataset: Object
  },
  computed: {
    temporalAggregation() {
      return temporalAggregationName(this.dataset.temporal_aggregation);
    },
    providerLogo() {
      return `https://libs.cartocdn.com/data-observatory/assets/providers/${this.dataset.provider_id}.png`;
    },
    geometryType() {
      return geometryTypeName(this.dataset.geom_type);
    },
    spatialAggregation() {
      return toTitleCase(this.dataset.spatial_aggregation);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.list-item {
  padding: 24px;
  border-bottom: 1px solid $neutral--300;
  color: $navy-blue;

  .category {
    margin-bottom: 8px;

    span {
      margin: 0 8px;
      color: $neutral--600;
    }
  }

  h3 a {
    margin-bottom: 8px;
    color: inherit;
    font-size: 20px;
    line-height: 28px;
  }

  .description {
    font-size: 14px;
    line-height: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .extra {
    width: 100%;

    .grid-cell > div {
      white-space: nowrap;

      &.geography {
        overflow-x: hidden;
        text-overflow: ellipsis;
      }
    }

    span {
      color: $neutral--600;
    }

    .license {
      margin-right: 24px;
    }

    .provider {
      display: block;
      width: 36px;
      height: 36px;

      img {
        max-width: 100%;
      }
    }
  }
}
</style>
