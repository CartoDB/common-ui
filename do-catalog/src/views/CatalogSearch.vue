<template>
  <div>
    <header class="grid u-flex__justify--center u-mb--36 u-mt--36">
      <h1 class="grid-cell--col12 title is-title">Spatial Data Catalog</h1>
    </header>
    <div class="grid u-flex__justify--center">
      <div
        class="u-pr--10 grid-cell--col4 grid-cell--col12--tablet dynamic-filtering"
        :class="{ 'filter-expanded': filterDetail }"
      >
        <div class="header-mobile">
          <img
            @click="hideFilters()"
            src="../assets/close-filters.svg"
            alt="Close"
          />
        </div>
        <FilterBox
          v-for="category in filterCategories"
          :key="category"
          class="u-mt--36--tablet"
          :title="getFilterLabel(category)"
          :filter="category"
          :placeholder="category"
        ></FilterBox>
      </div>
      <div class="grid-cell grid-cell--col8 grid-cell--col12--tablet">
        <SearchBox></SearchBox>
        <FilterSummary
          class="u-mt--4"
          v-on:toggle-filter-detail="toggleFilterDetail()"
        ></FilterSummary>
        <div v-if="loading">
          <LoadingBar></LoadingBar>
        </div>
        <div v-if="datasetsList.length > 0" class="results-container">
          <ul class="datasets-list">
            <DatasetListItem
              v-for="dataset in datasetsList"
              :key="dataset.slug"
              :dataset="dataset"
            ></DatasetListItem>
          </ul>
          <Pager class="pager u-mt--48 u-mb--48"></Pager>
        </div>
        <div v-else-if="!loading">
          <div class="empty-result u-mt--36">
            <img :src="icon_by_environment('empty-search.svg')" alt="No results" />
            <h3 class="title is-body is-txtNavyBlue u-mt--16">
              We couldn’t find anything for your search:
            </h3>
            <p class="text is-caption is-txtNavyBlue u-mt--16">
              Try again with another keyword or clear your filters
            </p>
            <hr class="u-mt--24" />
            <p class="text is-caption is-txtNavyBlue u-mt--24">
              Still can’t find what you’re looking for? <br />Get help from our
              team
            </p>
            <Button
              class="u-mt--24"
              @click.native="navigateToContact()"
              >Contact us</Button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Button from '../components/Button';
import DatasetListItem from '../components/catalogSearch/DatasetListItem';
import FilterBox from '../components/catalogSearch/FilterBox';
import FilterSummary from '../components/catalogSearch/FilterSummary';
import LoadingBar from '../components/catalogSearch/LoadingBar';
import Pager from '../components/catalogSearch/Pager';
import SearchBox from '../components/catalogSearch/SearchBox';
import { filtersMetadata } from '../utils/constants';
import { toTitleCase } from '../utils/string-to-title-case';
import icon_by_environment from '../mixins/icon_by_environment';

export default {
  name: 'CatalogSearch',
  mixins: [icon_by_environment],
  components: {
    Button,
    DatasetListItem,
    FilterBox,
    FilterSummary,
    LoadingBar,
    Pager,
    SearchBox
  },
  data() {
    return {
      filterDetail: false
    };
  },
  watch: {
    filter: {
      deep: true,
      handler() {
        this.fetchDatasetsList();
      }
    },
    currentPage: {
      handler() {
        window.scrollTo(0, 0);
      }
    }
  },
  computed: {
    ...mapState({
      datasetsList: state => state.doCatalog.datasetsList,
      count: state => state.doCatalog.datasetsListCount,
      loading: state => state.doCatalog.isFetching,
      filtersAvailable: state => state.doCatalog.filtersAvailable,
      filter: state => state.doCatalog.filter,
      currentPage: state => state.doCatalog.filter.page
    }),
    filterCategories() {
      return Object.keys(this.filtersAvailable).sort((a, b) => {
        const orderA = filtersMetadata[a] ? filtersMetadata[a].order : Number.MAX_VALUE;
        const orderB = filtersMetadata[b] ? filtersMetadata[b].order : Number.MAX_VALUE;
        return orderA - orderB;
      });
    }
  },
  methods: {
    initFilters() {
      const query = this.$route.query;
      if (Object.keys(query).length) {
        this.$store.dispatch('doCatalog/initFilter', this.$route.query);
      }
    },
    fetchDatasetsList() {
      this.$store.dispatch('doCatalog/fetchDatasetsList');
    },
    toggleFilterDetail() {
      this.filterDetail = !this.filterDetail;
    },
    hideFilters() {
      this.filterDetail = false;
    },
    getFilterLabel(filterId) {
      return filtersMetadata[filterId]
        ? filtersMetadata[filterId].label
        : toTitleCase(filterId);
    },
    navigateToContact() {
      window.open('https://carto.com/contact/', '_blank');
    }
  },
  mounted() {
    this.initFilters();
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

.results-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .datasets-list {
    width: 100%;
    margin-top: 12px;
    border-top: 1px solid $neutral--300;
  }
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

.header-mobile {
  display: none;
}

@media (max-width: $layout-tablet) {
  .dynamic-filtering {
    position: fixed;
    z-index: 11;
    top: 100%;
    width: 100%;
    height: 100%;
    overflow: scroll;
    transition: top 0.2s ease-out;
    background-color: $white;

    &.filter-expanded {
      top: 0;
    }
  }

  .header-mobile {
    display: block;
    position: fixed;
    z-index: 1;
    right: 0;
    width: 100%;
    padding: 20px 20px 4px;
    background-color: $white;
    text-align: right;
  }
}
</style>
