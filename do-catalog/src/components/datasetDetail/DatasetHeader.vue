<template>
  <header class="grid u-flex__justify--center u-mb--36 u-mb--20--tablet u-mt--36">
    <div class="grid-cell grid-cell--col9 grid-cell--col8--tablet">
      <nav class="breadcrumbs">
        <p class="text is-caption is-txtMainTextColor" v-if="!isGeography">
          <span class="title is-txtMainTextColor">{{
            dataset.category_name
          }}</span>
          /
          <span class="text is-txtMainTextColor">{{
            dataset.data_source_name
          }}</span>
        </p>
        <p class="text is-caption is-txtMainTextColor" v-else>
          <span class="title is-txtMainTextColor">Geography</span>
        </p>
      </nav>
      <h1 class="title is-sectiontitle is-txtMainTextColor u-mt--4">
        {{ dataset.name }}
      </h1>
    </div>

    <div class="u-ml--auto grid-cell grid-cell--col3 grid-cell--col4--tablet">
      <div class="u-flex u-flex__justify--end">
        <Button v-if="isPublicWebsite" :url="getFormUrl()"
          >I’m interested</Button
        >
        <Button v-else @click.native="showModal()">Request</Button>
      </div>
      <p class="text is-small is-txtMainTextColor u-mt--16 right-align">
        Any questions? <a href="/">Contact</a>
      </p>
    </div>

    <ModalSubscription
      @closeModal="hideModal()"
      :isOpen="modalOpen"
      :dataset="dataset"
    ></ModalSubscription>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import Button from '../Button';
import ModalSubscription from '../ModalSubscription';
import { formUrl } from '../../utils/form-url';

export default {
  name: 'DatasetHeader',
  data() {
    return {
      modalOpen: false
    };
  },
  components: {
    Button,
    ModalSubscription
  },
  computed: {
    ...mapState({
      dataset: state => state.doCatalog.dataset
    }),
    isPublicWebsite() {
      return !(this.$store.state.user && this.$store.state.user.id);
    },
    isGeography() {
      return this.$route.params.type === 'geography';
    }
  },
  methods: {
    getFormUrl() {
      return formUrl(
        this.dataset.category_name,
        this.dataset.country_name,
        this.dataset.data_source_name
      );
    },
    showModal() {
      this.modalOpen = true;
    },
    hideModal() {
      this.modalOpen = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.right-align {
  text-align: right;
}

.u-ml--auto {
  margin-left: auto;
}
</style>
