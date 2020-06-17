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
        <Button
          v-if="getSubscriptionStatus === 'interested'"
          :url="getFormUrl()"
        >
          I’m interested
        </Button>
        <Button
          v-else-if="getSubscriptionStatus === 'free_subscription'"
          @click.native="showModal('subscribe')"
        >
          Subscribe for free
        </Button>
        <Button
          v-else-if="getSubscriptionStatus === 'request_subscription'"
          @click.native="showModal('request')"
        >
          Request subscription
        </Button>
        <div
          v-else-if="getSubscriptionStatus === 'active'"
          class="u-flex u-flex__direction--column u-flex__align--center"
        >
          <Button class="is-outline extra-border navy-blue noCursor">
            Subscribed
            <img class="u-ml--12" src="../../assets/check.svg" alt="check" />
          </Button>
          <span
            @click.native="showModal('unsubscribe')"
            class="text is-small is-txtSoftGrey u-mt--8 underline"
            >Unsubscribe</span
          >
        </div>
        <Button
          v-else-if="getSubscriptionStatus === 'requested'"
          class="is-outline extra-border navy-blue noCursor"
        >
          Requested
          <img class="u-ml--12" src="../../assets/check.svg" alt="check" />
        </Button>
      </div>
      <p
        v-if="subscriptionInfo.status !== 'active'"
        class="text is-small is-txtMainTextColor u-mt--16 right-align"
      >
        Any questions? <a href="/">Contact</a>
      </p>
    </div>

    <ModalSubscription
      @closeModal="hideModal()"
      :isOpen="modalOpen"
      :dataset="dataset"
      :mode="modalMode"
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
      modalOpen: false,
      modalMode: null
    };
  },
  components: {
    Button,
    ModalSubscription
  },
  computed: {
    ...mapState({
      dataset: state => state.doCatalog.dataset,
      subscriptionInfo: state => state.doCatalog.subscriptionInfo
    }),
    isPublicWebsite() {
      return !(this.$store.state.user && this.$store.state.user.id);
    },
    isGeography() {
      return this.$route.params.type === 'geography';
    },
    getSubscriptionStatus() {
      const possibleLicenceStates = ['requested', 'active', 'expired'];
      if (
        !this.isPublicWebsite &&
        this.subscriptionInfo.status &&
        possibleLicenceStates.indexOf(this.subscriptionInfo.status) >= 0
      ) {
        return this.subscriptionInfo.status;
      }
      if (this.isPublicWebsite || !this.$store.state.user.is_enterprise) {
        return 'interested';
      } else if (
        this.$store.state.user.is_enterprise &&
        this.dataset.is_public_data !== undefined
      ) {
        return this.dataset.is_public_data
          ? 'free_subscription'
          : 'request_subscription';
      }
      return null;
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
    showModal(mode) {
      this.modalMode = mode;
      this.modalOpen = true;
    },
    hideModal() {
      this.modalMode = null;
      this.modalOpen = false;
    },
    fetchSubscriptionInfo() {
      if (this.dataset && this.dataset.id && !this.isPublicWebsite) {
        this.$store.dispatch('doCatalog/fetchSubscriptionInfo', {
          id: this.dataset.id,
          type: this.isGeography ? 'geography' : 'dataset',
          api_key: this.$store.state.user.api_key
        });
      }
    }
  },
  watch: {
    dataset() {
      this.fetchSubscriptionInfo();
    }
  },
  destroyed() {
    this.$store.commit('doCatalog/resetSubscriptionInfo');
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables';
.right-align {
  text-align: right;
}

.u-ml--auto {
  margin-left: auto;
}

.underline {
  text-decoration: underline;
}
</style>
