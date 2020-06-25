<template>
  <div class="grid grid-cell">
    <div
      class="dataset-actions-bar grid grid-cell grid--space grid-cell--col12"
    >
      <ul
        class="actions grid grid-cell--col8 grid--align-center text is-caption"
      >
        <li>
          <a
            :href="
              user
                ? `${user.base_url}/dashboard/datasets/?id=${subscription.sync_table}&create=true`
                : ''
            "
            >Create map</a
          >
        </li>
        <li>
          <a
            :href="
              user ? `${user.base_url}/dataset/${subscription.sync_table}` : ''
            "
            >View dataset</a
          >
        </li>
        <li class="disabled">Build App</li>
        <li class="disabled">Explore Notebook</li>
      </ul>
      <div
        class="status grid grid-cell--col4 grid--align-center grid--justify-end text is-small"
      >
        <p class="expiration">Expires at {{ subscriptionExpirationLabel }}</p>
        <p class="subscription is-semibold" :class="subscription.status">
          {{ subscriptionStatusLabel }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { format } from 'date-fns';

export default {
  name: 'DatasetActionsBar',
  props: {
    subscription: Object
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    subscriptionStatusLabel: function() {
      switch (this.subscription.status) {
        case 'requested':
          return 'In progress subscription';
        case 'active':
          return 'Active subscription';
        case 'expired':
          return 'Expired subscription';
        default:
          return 'Unknown status';
      }
    },
    subscriptionExpirationLabel: function() {
      const expirationDate = new Date(this.subscription.expires_at);
      return format(expirationDate, 'MMM dd, yyyy');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.dataset-actions-bar {
  background-color: $blue--100;
  border-radius: 4px;

  &.grid-cell {
    padding: 8px 16px;
  }

  .actions {
    li {
      color: $color-primary;

      & + li::before {
        content: '|';
        color: $neutral--600;
        margin: 0 8px;
      }

      &.disabled {
        opacity: 0.4;
      }
    }
  }

  .status {
    color: $navy-blue;

    .subscription {
      margin-left: 12px;

      &::after {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-left: 4px;
        border-radius: 50%;
        background-color: $navy-blue;
      }

      &.active {
        color: $green--400;

        &::after {
          background-color: $green--400;
        }
      }

      &.requested {
        color: $yellow--800;

        &::after {
          background-color: $yellow--800;
        }
      }

      &.expired {
        color: $red--600;

        &::after {
          background-color: $red--600;
        }
      }
    }
  }
}
</style>
