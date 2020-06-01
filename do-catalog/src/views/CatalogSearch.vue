<template>
  <div>
    <header class="grid u-flex__justify--center u-mb--36 u-mt--36">
      <h1 class="grid-cell--col10 title is-title">Data Catalog</h1>
    </header>
    <div class="grid grid-cell u-flex__justify--center">
      <div class="grid-cell grid-cell--col3">
        <FilterBox title="Countries" filter="countries" placeholder="country"></FilterBox>
        <FilterBox title="Categories" filter="categories" placeholder="category"></FilterBox>
        <FilterBox title="Licenses" filter="licenses" placeholder="license"></FilterBox>
        <FilterBox title="Sources" filter="sources" placeholder="source"></FilterBox>
      </div>
      <div class="grid-cell grid-cell--col7">
        <SearchBox></SearchBox>
        <FilterSummary></FilterSummary>
        <div v-if="loading">
          <LoadingBar></LoadingBar>
        </div>
        <div v-if="datasetsList.length > 0">
          <ul class="datasets-list">
            <DatasetListItem
              v-for="dataset in datasetsList"
              :key="dataset.slug"
              :dataset="dataset"
            ></DatasetListItem>
          </ul>
          <ul class="pager">
            <li v-if="filter.page > 0" @click="goPrevPage">Prev page</li>
            <li @click="goNextPage">Next page</li>
          </ul>
        </div>
        <div v-else-if="!loading">
          <div class="empty-result u-mt--36">
            <img src="../assets/empty-search.svg" alt="No results">
            <h3 class="title is-body is-txtNavyBlue u-mt--16">We couldn’t find anything for your search:</h3>
            <p class="text is-caption is-txtNavyBlue u-mt--16">Try again with another keyword or clear your filters</p>
            <hr class="u-mt--24"/>
            <p class="text is-caption is-txtNavyBlue u-mt--24">Still can’t find what you’re looking for?
                <br/>Get help from our team</p>
            <Button class="u-mt--24" color="engine-blue">Contact us</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DatasetListItem from '../components/catalogSearch/DatasetListItem';
import FilterBox from '../components/catalogSearch/FilterBox';
import FilterSummary from '../components/catalogSearch/FilterSummary';
import SearchBox from '../components/catalogSearch/SearchBox';
import Button from '../components/Button';
import LoadingBar from '../components/catalogSearch/LoadingBar';

export default {
  name: 'CatalogSearch',
  components: {
    DatasetListItem,
    FilterBox,
    FilterSummary,
    SearchBox,
    Button,
    LoadingBar
  },
  watch: {
    filter: {
      deep: true,
      handler() {
        this.fetchDatasetsList();
      }
    }
  },
  computed: {
    ...mapState({
      datasetsList: state => state.doCatalog.datasetsList,
      loading: state => state.doCatalog.isFetching,
      filtersAvailable: state => state.doCatalog.filtersAvailable,
      filter: state => state.doCatalog.filter
    })
  },
  methods: {
    fetchDatasetsList() {
      this.$store.dispatch('doCatalog/fetchDatasetsList');
    },
    goPrevPage() {
      this.$store.dispatch('doCatalog/updateFilter', {
        page: this.filter.page - 1
      });
    },
    goNextPage() {
      this.$store.dispatch('doCatalog/updateFilter', {
        page: this.filter.page + 1
      });
    }
  },
  mounted() {
    this.fetchDatasetsList();
  }
};
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

  .datasets-list {
    margin-top: 12px;
    border-top: 1px solid $neutral--300;
  }

  .empty-result {
    padding: 64px;
    border-radius: 12px;
    background-color: $neutral--100;
    text-align: center;

    hr {
      width: 78px;
      border: 1px solid $neutral--400;
    }
  }
</style>
