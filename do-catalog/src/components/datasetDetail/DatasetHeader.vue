<template>
  <header class="grid u-flex__justify--center u-mb--36 u-mt--36">
    <div class="grid-cell grid-cell--col7">
      <nav class="breadcrumbs">
        <p class="text is-caption is-txtNavyBlue">
          <a class="title is-txtNavyBlue">{{dataset.category_name}}</a> / 
          <a class="text is-txtNavyBlue">{{dataset.data_source_name}}</a>
        </p>
      </nav>
      <h2 class="title is-subheader is-txtNavyBlue u-mt--4">{{dataset.name}}</h2>
    </div>
    <div class="grid-cell--col1"></div>
    <div class="grid-cell--col2">
      <div class="u-flex u-flex__justify--end">
        <button class="button">Subscribe for Free</button>
      </div>
      <p class="text is-small is-txtNavyBlue u-mt--16 right-align">Any questions? <a href="/">Contact</a></p>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'DatasetHeader',
  computed: {
    ...mapState({
      dataset: state => state.catalog.dataset,
    })
  },
}
</script>

<style lang="scss" scoped>
.right-align {
  text-align: right;
}
</style>
