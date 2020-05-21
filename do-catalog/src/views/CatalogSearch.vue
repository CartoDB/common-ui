<template>
  <div>
    <header class="grid u-flex__justify--center u-mb--36 u-mt--36">
      <h1 class="grid-cell--col10 title is-title">Data Catalog</h1>
    </header>
    <div class="grid grid-cell u-flex__justify--center">
      <div class="grid-cell--col3">
        <div class="filter-box">
          <h3>License</h3>
          <label><input type="checkbox" v-model="filter.premiumOnly">Premium</label>
          <label><input type="checkbox" v-model="filter.publicOnly">Public</label>
        </div>
      </div>
      <div class="grid-cell--col7">
        <div class="search-box">
          <input
            type="text"
            class="text is-caption"
            placeholder="Search datasets by title or description"
            v-model="filter.searchText"
            v-on:keyup.enter="fetchDatasetsList"
          />
        </div>
        <h2 v-if="loading">LOADING...</h2>
        <div v-else>
          <ul class="datasets-list">
            <DatasetListItem v-for="dataset in datasetsList" :key="dataset.slug" :dataset="dataset"></DatasetListItem>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DatasetListItem from '../components/catalogSearch/DatasetListItem'

export default {
  name: 'CatalogSearch',
  components: {
    DatasetListItem
  },
  data() {
    return {
      filter: {
        searchText: '',
        publicOnly: false,
        premiumOnly: false
      }
    };
  },
  watch: {
    publicOnly() {
      this.fetchDatasetsList();
    },
    premiumOnly() {
      this.fetchDatasetsList();
    }
  },
  computed: {
    ...mapState({
      datasetsList: state => state.doCatalog.datasetsList,
      loading: state => state.doCatalog.isFetching
    }),
    publicOnly() {
      return this.filter.publicOnly;
    },
    premiumOnly() {
      return this.filter.premiumOnly;
    },
    filterLicense() {
      return this.publicOnly === true
        ? this.premiumOnly === true
          ? null
          : true
        : this.premiumOnly === false
          ? null
          : false
    }
  },
  methods: {
    fetchDatasetsList() {
      const options = {
        searchText: this.filter.searchText,
        publicOnly: this.filterLicense
      }
      this.$store.dispatch('doCatalog/fetchDatasetsList', options);
    }
  },
  mounted() {
    this.fetchDatasetsList();
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/variables';

  header {
    padding-top: 24px;

    h1 {
      padding-bottom: 24px;
      border-bottom: 1px solid $neutral--300;
    }
  }

  .search-box {
    padding-bottom: 12px;
    border-bottom: 1px solid $neutral--300;

    input[type=text] {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid $neutral--600;
      border-radius: 8px;
      margin: 1px;
      color: $navy-blue;

      &:focus {
        outline: none;
        border: 2px solid $blue--500;
        margin: 0;
      }
    }
  }
</style>