<template>
  <li class="list-item">
    <div class="category title is-small">
      {{ dataset.country_name }}<span>·</span>{{ dataset.category_name }}
    </div>
    <h3 class="title">
      <router-link
        :to="{
          name: 'do-dataset-summary',
          params: { datasetId: dataset.slug }
        }"
        >{{ dataset.name }}</router-link
      >
    </h3>
    <div class="description text">{{ dataset.description }}</div>
    <div class="extra text is-small grid grid--out">
      <div class="grid-cell grid-cell--col7 grid grid--align-end grid--no-wrap">
        <div class="license"><span>License</span> {{ dataset.license_name }}</div>
        <div class="geography">
          <span>Geography</span> {{ dataset.geography_name }}
        </div>
      </div>
      <div class="grid-cell grid-cell--col5 grid grid--align-end grid--space">
        <div class="aggregation">
          <span>Temporal aggr.</span> {{ dataset.temporal_aggregation }}
        </div>
        <div class="provider" :alt="dataset.provider_name"></div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'DatasetListItem',
  props: {
    dataset: Object
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
      color: $neutral--600;
      margin: 0 8px;
    }
  }

  h3 a {
    font-size: 20px;
    line-height: 28px;
    color: inherit;
    margin-bottom: 8px;
  }

  .description {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 8px;
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
      height: 36px;
      width: 36px;
      background-color: $navy-blue;
    }
  }
}
</style>
