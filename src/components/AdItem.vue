<template lang="html">
    <a href="javascript:void(0)" v-on:click="clickAd">
        <img class="index-banner__img" width="100%" :src="adData.data.imageUrl" v-if="isHomeBanner" />
        <template v-if="isHomeNotice">
            {{ adData.data.title }}
        </template>
        <img class="small-banner__img" :src="adData.data.imageUrl" v-if="isSmallBanner" />
    </a>
</template>

<script>
export default {
  props: {
    adData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isHomeBanner: function isHomeBanner() {
      return this.adData.position === 'Home_Banner';
    },
    isSmallBanner: function isSmallBanner() {
      return this.adData.position === 'SmallBanner';
    },
    isHomeNotice: function isHomeNotice() {
      return this.adData.position === 'Home_Notice';
    },
    isLink: function isLink() {
      return this.adData.kind === 'Link';
    },
    isImage: function isImage() {
      return this.adData.kind === 'Image';
    },
    isText: function isText() {
      return this.adData.kind === 'Text';
    },
    isInternal: function isInternal() {
      return this.adData.kind === 'Internal';
    },
    url: function getUrl() {
      if (this.isLink) {
        return this.adData.data.url;
      }
      if (this.isImage || this.isText) {
        return '';
      }
      switch (this.adData.data.target) {
        case 'LianDouIntro':
          return '#/whatIsLD';
        case 'MessageDetails':
          if (this.adData.data.parameters && this.adData.data.parameters.id) {
            const id = this.adData.data.parameters.id;
            return `#/m/${id}`;
          }
          return '';
        case 'LoanDetails':
          if (this.adData.data.parameters && this.adData.data.parameters.id) {
            const id = this.adData.data.parameters.id;
            return `#/d/${id}`;
          }
          return '';
        case 'Loans':
          if (this.adData.data.parameters && this.adData.data.parameters.type) {
            if (this.adData.data.parameters.type.toLowerCase() === 'investment') {
              return '#/search';
            }
            if (this.adData.data.parameters.type.toLowerCase() === 'debt') {
              return '#/search/dabt';
            }
          }
          return '';
        default:
          return '';
      }
    },
    isHash: function isHash() {
      return this.url.trim().startsWith('#');
    },
  },
  ready() {},
  attached() {},
  methods: {
    clickAd: function clickAd() {
      if (!this.url) {
        // console.log('no thing to do', this.url);
        return;
      }
      if (this.isHash) {
        console.log('go hash', this.url);
        this.$router.push(this.url.replace('#', ''));
        return;
      }
      //   console.log('open page', this.url);
    },
  },
  components: {},
};
</script>

<style lang="scss">
// import
@import "../scss/vars";
@import "../scss/mixins";

.index-banner__img {
    height: px(375);
}

.small-banner__img {
    @include size(px(240), px(220));
}
</style>
