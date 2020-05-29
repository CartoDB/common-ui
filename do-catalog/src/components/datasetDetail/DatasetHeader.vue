<template>
  <header class="grid u-flex__justify--center u-mb--36 u-mt--36">
    <div class="grid-cell grid-cell--col7">
      <nav class="breadcrumbs">
        <p class="text is-caption is-txtMainTextColor">
          <a class="title is-txtMainTextColor">{{ dataset.category_name }}</a> /
          <a class="text is-txtMainTextColor">{{ dataset.data_source_name }}</a>
        </p>
      </nav>
      <h1 class="title is-sectiontitle is-txtMainTextColor u-mt--4">
        {{ dataset.name }}
      </h1>
    </div>
    <div class="grid-cell--col1"></div>
    <div class="grid-cell--col2">
      <div class="u-flex u-flex__justify--end">
        <Button v-if="isPublicWebsite" :url="getFormUrl()">I’m interested</Button>
        <Button v-else @click.native="showModal()">Request</Button>
      </div>
      <p class="text is-small is-txtMainTextColor u-mt--16 right-align">
        Any questions? <a href="/">Contact</a>
      </p>
    </div>

    <ModalSubscription @closeModal="hideModal()" :isOpen="modalOpen" :dataset="dataset"></ModalSubscription>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import Button from '@/components/Button';
import ModalSubscription from '@/components/ModalSubscription';
import { formUrl } from '@/utils/form-url';

export default {
  name: 'DatasetHeader',
  data() {
    return {
      modalOpen: false
    }
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
      return false;
    },
  },
  methods: {
    getFormUrl() {
      return formUrl(this.dataset.category_name, this.dataset.country_name, this.dataset.data_source_name)
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
</style>
