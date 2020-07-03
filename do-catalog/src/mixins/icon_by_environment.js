const icons = {
  'empty-search.svg': {
    purple: require('../assets/empty-search.svg'),
    blue: require('../assets/empty-search_blue.svg')
  },
  'arrow-blue.svg': {
    purple: require('../assets/arrow-blue.svg'),
    blue: require('../assets/arrow-blue_blue.svg')
  },
  'close-tag.svg': {
    purple: require('../assets/close-tag.svg'),
    blue: require('../assets/close-tag_blue.svg')
  }
};
export default {
  methods: {
    icon_by_environment(icon) {
      return icons[icon][process.env.VUE_APP_COLOR_PRIMARY ? 'purple' : 'blue'];
    }
  }
};
