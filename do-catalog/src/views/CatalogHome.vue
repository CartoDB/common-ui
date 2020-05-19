<template>
  <div class="home">
    <h1>I'm a catalog</h1>
    <router-link
      :to="{
        name: 'do-dataset-summary',
        params: {
          datasetId:
            'carto-do-public-data.usa_acs.demographics_sociodemographics_usa_county_2015_5yrs_20062010'
        }
      }"
    >
      Go to Summary
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'DOCatalog'
};
</script>
