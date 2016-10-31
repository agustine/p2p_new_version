<template lang="html">
    <lly-swiper :options="swiperOption">

      <lly-swiper-item v-for="ad in ads">
          <lly-ad-item :ad-data="ad"></lly-ad-item>
          <!-- <img class="index-banner__img" width="100%" :src="ad.data.imageUrl"> -->
      </lly-swiper-item>

      <div class="swiper-pagination" slot="pagination"></div>
    </lly-swiper>
</template>

<script>
import {
  mapGetters,
} from 'vuex';
import {
  swiper,
  swiperSlide,
} from 'vue-awesome-swiper';
import AdItem from './AdItem';

export default {
  name: 'indexBanner',
  data() {
    return {
      swiperOption: {
        name: 'currentSwiper',
        autoplay: 3000,
        // direction: 'vertical',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        // prevButton: '.swiper-button-prev',
        // nextButton: '.swiper-button-next',
        // scrollbar: '.swiper-scrollbar',
        mousewheelControl: true,
        observeParents: true,
        debugger: true,
        onTransitionStart: function onTransitionStart() {
          //   console.log(s);
        },
      },
    };
  },
  components: {
    'lly-swiper': swiper,
    'lly-swiper-item': swiperSlide,
    'lly-ad-item': AdItem,
  },
  computed: {
    ...mapGetters({
      bannerAds: 'bannerAds',
    }),
    ads: function ads() {
      return [...this.bannerAds];
    },
  },
  created() {},
  updated() {
    this.getSwiper().reLoop();
  },
  mounted() {
    this.getSwiper().update();
  },
  methods: {
    getSwiper() {
      const currentSwiper = this.$children.find(
        children => children.options.name === 'currentSwiper').swiper;
      //   console.log(currentSwiper);
      return currentSwiper;
    },
  },
};
</script>

<style lang="scss">
// import
@import "../scss/vars";
@import "../scss/mixins";

.index-banner__img {
    height: px(375);
}
</style>
