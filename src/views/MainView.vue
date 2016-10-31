<template>
<lly-page class="main-page">

  <lly-section>
    <lly-swipe-Ads v-if="showBanner"></lly-swipe-Ads>
    <div class="main-page__download-hint" v-if="showDownLoadHint">
      <a href="javascript:void(0)" class="main-page__download-btn" @click="toDownloadPage">
        <img src="../assets/down/download.png" width="100%" alt="" />
      </a>
      <a href="javascript:void(0)" class="main-page__download-close" @click="closeDownloadHint"></a>
    </div>
    <lly-marquee></lly-marquee>
    <lly-small-banner></lly-small-banner>
  </lly-section>

  <lly-footer></lly-footer>
</lly-page>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex';
import Header from '../components/Header';
import NavFooter from '../components/NavFooter';
import Page from '../components/Page';
import PageSection from '../components/PageSection';
import SwipeAds from '../components/SwipeAds';
import Marquee from '../components/Marquee';
import SmallBanner from '../components/SmallBanner';
import request from '../api/main';

export default {
  created() {
    this.$store.dispatch('loadAdData');
    async function getData() {
      try {
        const res = await request('searchInvestList', {
          searchtype: 0,
          searchname: 10,
          searchParameter: {
            searchType: 0,
            searchName: 10,
            projectType: 1,
          },
          pageno: 1,
          pagesize: 20,
        });
        console.log('result', res);
      } catch (err) {
        console.log('err', err);
      } finally {
        console.log('finally');
      }
    }
    getData();
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      bannerAds: 'bannerAds',
      marqueeAds: 'marqueeAds',
      smallBannerAds: 'smallBannerAds',
      showDownLoadHint: 'showDownLoadHint',
    }),
    showBanner: function showBanner() {
      return this.bannerAds.length > 0;
    },
    showMarquee: function showBanner() {
      return this.marqueeAds.length > 0;
    },
    showSmallBanner: function showSmallBanner() {
      return this.smallBannerAds.length > 0;
    },
  },
  methods: {
    ...mapActions(['closeDownloadHint']),
    toDownloadPage: function toDownloadPage() {
      console.log('to download page...');
    },
  },
  components: {
    'lly-header': Header,
    'lly-footer': NavFooter,
    'lly-page': Page,
    'lly-section': PageSection,
    'lly-swipe-Ads': SwipeAds,
    'lly-marquee': Marquee,
    'lly-small-banner': SmallBanner,
  },
};
</script>

<style lang="scss">
// import
@import "../scss/vars";
@import "../scss/mixins";

.main-page__download-hint {
    position: relative;
    height: 0;
    z-index: $z_page + 1;
}

.main-page__download-btn {
    @include abs-pos(auto, 0, 0, auto);
}

.main-page__download-close {
    display: block;
    background: url("../assets/down/download-x.png");
    background-size: contain;
    @include size(pxImage(35));
    @include abs-pos(auto, auto, px(32), px(25));
}
</style>
