<template lang="html">
    <div class="marquee-ads">
        <div class="marquee-ads__wrapper" ref="marqueeWrapper">
            <ul class="marquee-ads__list" ref="marqueeList">
                <li class="marquee-ads__item" v-for="ad in ads">
                    <lly-ad-item :ad-data="ad"></lly-ad-item>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {
  mapGetters,
} from 'vuex';
import AdItem from './AdItem';

export default {
  name: 'indexMarquee',
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      marqueeAds: 'marqueeAds',
    }),
    ads: function ads() {
      return [...this.marqueeAds];
    },
  },
  updated() {
    this.setTransition();
  },
  mounted() {
    this.setTransition();
  },
  methods: {
    setTransition() {
      const styleId = 'marquee-style';
      const wrapperWidth = this.$refs.marqueeWrapper.offsetWidth;
      const listWidth = this.$refs.marqueeList.offsetWidth;
      const duration = `${(wrapperWidth + listWidth) / 100}s`;

      const head = document.getElementsByTagName('head')[0];
      let style = document.getElementById(styleId);

      if (!style) {
        style = document.createElement('style');
        const attrNode = document.createAttribute('id');
        attrNode.nodeValue = styleId;
        style.attributes.setNamedItem(attrNode);
        head.appendChild(style);
      }

      const styleStr =
        `
      .marquee-ads__list{
          -webkit-animation:marquee ${duration} linear infinite;
      }
      @-webkit-keyframes marquee{
          0%{
              -webkit-transform:translateX(${wrapperWidth}px);
          }
          100%{
              -webkit-transform:translateX(-${listWidth}px);
          }
      }
      `;

      style.innerHTML = styleStr;
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

$marquee_height: px(60);

.marquee-ads {
    position: relative;
    padding-left: px(60);
    padding-right: px(20);
    line-height: $marquee_height;
    height: $marquee_height;

    background-color: #FFFFFF;
}
.marquee-ads:before {
    content: "";
    background: url("../assets/p_icon/marquee.png");
    background-size: cover;
    @include size(px(28));
    @include abs-pos(px(16), auto, auto, px(20));
}
.marquee-ads__wrapper {
    overflow: hidden;
}
.marquee-ads__list {
    display: inline-block;
    // display: flex;
    height: 100%;
    width: auto;
    white-space: nowrap;
}
.marquee-ads__item {
    display: inline-block;
    padding-right: px(50);
}
</style>
