<template lang="html">
    <div class="small-banner">
        <ul class="small-banner__wrapper">
            <li class="small-banner__item" v-for="ad in ads">
                <lly-ad-item :ad-data="ad" class="small-banner__link"></lly-ad-item>
            </li>
        </ul>
    </div>
</template>

<script>
import {
  mapGetters,
} from 'vuex';
import AdItem from './AdItem';

export default {
  name: 'indexSmallBanner',
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      smallBannerAds: 'smallBannerAds',
    }),
    ads: function ads() {
      return [...this.smallBannerAds];
    },
  },
  methods: {
    ...mapGetters({
      marqueeAds: 'marqueeAds',
    }),
    ads: function ads() {
      return [...this.marqueeAds];
    },
  },
  components: {
    'lly-ad-item': AdItem,
  },
};
</script>

<style lang="scss">
// import
@import "../scss/vars";
@import "../scss/mixins";

.small-banner {
    padding: 0 px(20) px(20);
    height: px(220);
    background-color: #FFFFFF;
}

.small-banner__wrapper {
    overflow-x: scroll;
    overflow-y: hidden;
    width: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
        display: none;
    }
}

.small-banner__item {
    display: inline-block;
    margin-right: px(20);
}
.small-banner__item:last-of-type {
    margin-right: 0;
}
</style>
