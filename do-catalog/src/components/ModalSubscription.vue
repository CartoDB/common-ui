<template>
  <div
    v-if="isOpen"
    class="modal u-flex u-flex__justify--center u-flex__align--center"
  >
    <div @click="closeModal()" class="close-modal">
      <img src="../assets/modal/close.svg" alt="close" />
    </div>

    <div class="grid u-flex__justify--center">
      <div class="grid-cell--col6">
        <div class="u-align--center">
          <img
            v-if="getHeaderIcon"
            :src="require('../assets/modal/' + getHeaderIcon)"
            alt="Request data"
          />
          <h2 class="title is-sectiontitle is-txtNavyBlue u-mt--24">
            {{ getTitle }}
          </h2>
          <p class="text is-caption is-txtNavyBlue u-mt--12">
            {{ getSubTitle }}
          </p>
        </div>
        <ul>
          <DatasetListItem
            :key="dataset.slug"
            :dataset="dataset"
          ></DatasetListItem>
        </ul>

        <p
          v-if="currentMode === 'request'"
          class="text is-caption is-txtNavyBlue u-mt--16 u-align--center"
        >
          Once you confirm your request, a
          <span class="is-semibold">CARTO team member will get in touch</span>
          to give you more information and go over any questions you may have.
        </p>

        <div
          v-else-if="currentMode === 'unsubscribe'"
          class="text is-caption is-txtNavyBlue u-mt--16"
        >
          If you unsubcribe pellentesque diam nisi, faucibus varius enim mollis
          sit amet. Cras nec varius magna, in dignissim diam:
          <ul class="u-mt--20 u-ml--32" style="list-style: disc;">
            <li>
              If you imported the dataset, it will disappear from
              <span class="is-semibold">your datasets</span> list.
            </li>
            <li>
              All <span class="is-semibold">maps</span> where you are using the
              dataset will be removed.
            </li>
            <li>
              The dataset will stop working in
              <span class="is-semibold">apps</span> where it is being used
              through API.
            </li>
          </ul>
        </div>

        <p
          v-else-if="currentMode === 'unsubscribe'"
          class="text is-caption is-txtNavyBlue u-mt--16 u-flex u-flex__justify--center u-flex__align-cen"
        >
          <img class="u-mr--12" src="../assets/check.svg" alt="check" />
          Your subscription request has been added to your subscriptions.
        </p>

        <div class="grid u-flex__justify--center u-mt--32">
          <Button
            @click.native="closeModal()"
            :isOutline="true"
            :color="currentMode === 'unsubscribe' ? 'navy-blue' : ''"
            class="noBorder"
            >{{ getCloseText }}</Button
          >
          <!-- <Button class="u-ml--16" @click.native="requestDataset()"
            >Confirm request</Button
          > -->
          <Button
            v-if="currentMode === 'subscribe'"
            @click.native="subscribe()"
            class="u-ml--16"
          >
            Confirm subscription
          </Button>

          <Button
            v-else-if="currentMode === 'unsubscribe'"
            @click.native="unsubscribe()"
            class="u-ml--16"
            :color="'red'"
          >
            Confirm unsubscription
          </Button>

          <Button
            v-else-if="currentMode === 'request'"
            @click.native="request()"
            class="u-ml--16"
          >
            Confirm request
          </Button>

          <router-link
            v-else-if="currentMode === 'subscribed' || currentMode === 'requested'"
            :to="{ name: 'subscriptions' }">
              <Button
                @click.native="closeModal()"
                class="u-ml--16"
                :color="'green'"
              >
                <img class="u-mr--12" src="../assets/check_white.svg" alt="check" />
                Check your subscriptions
              </Button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Button from './Button.vue';
import DatasetListItem from './catalogSearch/DatasetListItem';

export default {
  name: 'ModalSubscription',
  components: {
    Button,
    DatasetListItem
  },
  props: {
    isOpen: Boolean,
    dataset: Object,
    type: {
      type: String,
      required: true,
      validator: value => {
        return ['geography', 'dataset'].indexOf(value) !== -1;
      }
    },
    mode: {
      type: String,
      required: false,
      validator: value => {
        return ['subscribe', 'unsubscribe', 'request'].indexOf(value) !== -1;
      }
    }
  },
  data() {
    return {
      currentMode: null
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    datasetPrivacy() {
      return this.dataset.is_public_data ? 'Public data' : 'Premium';
    },
    getHeaderIcon() {
      if (this.currentMode === 'subscribe') {
        return 'subsc-add-icon.svg';
      } else if (this.currentMode === 'unsubscribe') {
        return 'subsc-unsubsc-icon.svg';
      } else if (this.currentMode === 'request') {
        return 'data-request.svg';
      } else if (this.currentMode === 'subscribed') {
        return 'subsc-subscribed-icon.svg';
      } else if (this.currentMode === 'requested') {
        return 'subsc-requested-icon.svg';
      }
      return null;
    },
    getTitle() {
      if (this.currentMode === 'subscribe') {
        return 'Confirm your subscription';
      } else if (this.currentMode === 'unsubscribe') {
        return 'Confirm your unsubscription';
      } else if (this.currentMode === 'request') {
        return 'Confirm your request';
      } else if (this.currentMode === 'subscribed') {
        return 'Subscription confirmed';
      } else if (this.currentMode === 'requested') {
        return 'Subscription request confirmed';
      }
      return '';
    },
    getSubTitle() {
      if (this.currentMode === 'subscribe') {
        return 'You are going to subscribe to the following dataset:';
      } else if (this.currentMode === 'unsubscribe') {
        return 'You are going to unsubscribe to the following dataset:';
      } else if (this.currentMode === 'request') {
        return 'You are going to request a subscription to the following dataset:';
      } else if (this.currentMode === 'subscribed') {
        return 'Your subscription has been activated successfully.';
      } else if (this.currentMode === 'requested') {
        return 'We have received your subscription request and we will contact you really soon about the following dataset:';
      }
      return '';
    },
    getCloseText() {
      if (
        this.currentMode === 'subscribed' ||
        this.currentMode === 'requested'
      ) {
        return 'Close';
      }
      return 'Cancel';
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
        this.$store.dispatch('catalog/requestDataset', {
          user: this.user,
          dataset: this.dataset
        });
      }
      //GTM event trigger
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'requestDataset' });
    },
    async subscribe() {
      if (
        await this.$store.dispatch('doCatalog/fetchSubscribe', {
          id: this.dataset.id,
          type: this.type
        })
      ) {
        await this.$store.dispatch('doCatalog/fetchSubscriptionsList');
        this.currentMode = 'subscribed';
      }
    },
    async unsubscribe() {
      if (
        await this.$store.dispatch('doCatalog/fetchUnSubscribe', {
          id: this.dataset.id,
          type: this.type
        })
      ) {
        await this.$store.dispatch('doCatalog/fetchSubscriptionsList');
        this.closeModal();
      }
    },
    async request() {
      if (
        await this.$store.dispatch('doCatalog/fetchSubscribe', {
          id: this.dataset.id,
          type: this.type
        })
      ) {
        await this.$store.dispatch('doCatalog/fetchSubscriptionsList');
        this.currentMode = 'requested';
      }
    }
  },
  watch: {
    mode() {
      this.currentMode = this.mode;
    }
  }
};
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
  overflow-y: auto;
}

.close-modal {
  position: absolute;
  top: 32px;
  right: 24px;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.u-align--center {
  text-align: center;
}

.list-item {
  border: none;
  margin: 42px 0;
  background-color: $white;
  box-shadow: 0 4px 16px 0 rgba(44, 44, 44, 0.16);
  &:hover {
    background-color: $white;
  }
}
</style>
