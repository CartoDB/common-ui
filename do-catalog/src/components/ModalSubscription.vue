<template>
<div v-if="isOpen" class="modal">
  <div @click="closeModal()" class="close-modal">
    <img src="../assets/modal/close.svg" alt="close" />
  </div>

  <div class="grid u-flex__justify--center u-mt--120">
    <div class="grid-cell--col6 u-align--center">
      <img src="../assets/modal/data-request.svg" alt="Request data" />
      <h2 class="title is-sectiontitle is-txtNavyBlue u-mt--24">Confirm your request</h2>
      <p class="text is-caption is-txtNavyBlue u-mt--12">You are going to request a subscription to the following dataset and its geography.</p>
      <p class="title is-small is-txtNavyBlue u-flex u-mt--48">
        <img class="u-mr--8" src="../assets/modal/db-icon.svg" alt="Dataset selected" />
        1 Dataset
      </p>
      <ul class="u-mt--10 data-request-container">
        <li class="u-flex data-request-card u-mb--24">
          <div class="card-info u-mr--16">
            <h4 class="text is-caption is-txtNavyBlue">{{dataset.name}}</h4>
            <p class="text is-small is-txtNavyBlue is-semibold u-mt--4 u-flex">
              <img class="u-mr--8" src="../assets/modal/provider.svg" alt="Provider" />
              {{dataset.provider_name}}
            </p>
          </div>
          <div class="dataset-type-container" :class="{'public-data' : dataset.is_public_data}">
            <span class="dataset-type title">{{datasetPrivacy}}</span>
          </div>
        </li>
      </ul>

      <p class="text is-caption is-txtNavyBlue u-mt--16">After confirming this request, a <span class="is-semibold">CARTO team member will contact you</span> to give you more information about this dataset and solve other doubts you may have.</p>

      <div class="grid u-flex__justify--center u-mt--32">
        <Button class="u-mr--16" @click.native="requestDataset()">Confirm request</Button>
        <Button @click.native="closeModal()" :isOutline="true">Cancel</Button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'ModalSubscription',
  components: {
    Button
  },
  props: {
    isOpen: Boolean,
    dataset: Object
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    datasetPrivacy () {
      return this.dataset.is_public_data ? "Public data" : "Premium"
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    requestDataset() {
      // Check if requestDataset is defined or call Dashboard's requestDataset action as a fallback
      if (this.$root.requestDataset) {
        this.$root.requestDataset(this.user, this.dataset);
      } else {
        this.$store.dispatch('catalog/requestDataset', {user: this.user, dataset: this.dataset});
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.modal {
  position: fixed;
  z-index: 5; // Min value for Dashboard
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($white, 0.96);
}

.close-modal {
  position: absolute;
  top: 32px;
  right: 24px;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.data-request-card {
  padding: 16px 16px 20px 24px;
  border: 1px solid $neutral--300;
  border-radius: 4px;
  background-color: $white;
}

.dataset-type-container {
  align-self: flex-start;
  margin-left: auto;
  padding: 2px 8px;
  border-radius: 2px;
  background-color: $premium-yellow;

  &.public-data {
    background-color: $neutral--300;
  }
}

.dataset-type {
  font-size: 10px;
  letter-spacing: 0.83px;
  line-height: 16px;
  text-transform: uppercase;
  white-space: nowrap;
}

.data-request-container {
  border-bottom: 1px solid $neutral--300;
}

.u-align--center {
  text-align: center;
}
</style>