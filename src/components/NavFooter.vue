<template lang="html">
  <footer class="footer-nav">
      <ul class="footer-nav__wrapper">
          <li class="footer-nav__li footer-nav__index">
              <router-link to="/" v-if="!isMain">首页</router-link>
              <a href="javascript:void(0)" class="footer-nav__index--current" v-if="isMain">首页</a>
          </li>
          <li class="footer-nav__li footer-nav__search">
              <router-link to="/search" v-if="!isSearch">理财</router-link>
              <a href="javascript:void(0)" class="footer-nav__search--current" v-if="isSearch">理财</a>
          </li>
          <li class="footer-nav__li footer-nav__read">
              <router-link to="/read" v-if="!isRead">必读</router-link>
              <a href="javascript:void(0)" class="footer-nav__read--current" v-if="isRead">必读</a>
          </li>
          <li class="footer-nav__liandou">
              <a v-on:click="toLianDou">联豆</a>
          </li>
          <li class="footer-nav__li footer-nav__account">
              <router-link to="/account" v-if="!isAccount">我的</router-link>
              <a href="javascript:void(0)" class="footer-nav__account--current" v-if="isAccount">我的</a>
          </li>
      </ul>
  </footer>
</template>

<script>
export default {
  props: {
    current: {
      type: String,
      default: 'main',
    },
  },
  methods: {
    toLianDou: function toLianDou() {
      console.log('to liandou......');
    },
  },
  computed: {
    isMain: function isMain() {
      return this.current === 'main';
    },
    isSearch: function isSearch() {
      return this.current === 'search';
    },
    isRead: function isRead() {
      return this.current === 'read';
    },
    isAccount: function isAccount() {
      return this.current === 'account';
    },
  },
};
</script>

<style lang="scss">
// import
@import "../scss/vars";
@import "../scss/mixins";

$footer_height: px(98);
$bg_footer: #303543;

.footer-nav {
    height: $footer_height;
    border-top: 1px solid $line_color;
    background-color: $bg_footer;
}

.footer-nav__wrapper {
    display: flex;
    a {
        display: block;
        height: $footer_height;
        font-size: 0;
    }
}
.footer-nav__liandou > a {
    width: px(150);
    background: url("../assets/footer/liandou.png") center no-repeat;
    background-size: pxImage(70) pxImage(163);
}
.footer-nav__li {
    flex: 1;
}
.footer-nav__index {
    background: url("../assets/footer/index.png") center no-repeat;
    background-size: pxImage(70) pxImage(163);
}
.footer-nav__search {
    background: url("../assets/footer/list.png") center no-repeat;
    background-size: pxImage(70) pxImage(163);
}
.footer-nav__read {
    background: url("../assets/footer/read.png") center no-repeat;
    background-size: pxImage(70) pxImage(163);
}
.footer-nav__account {
    background: url("../assets/footer/account.png") center no-repeat;
    background-size: pxImage(70) pxImage(163);
}

.footer-nav__index--current {
    background: url("../assets/footer/index-selected.png") center no-repeat;
    background-size: pxImage(70) pxImage(163);
}
.footer-nav__search--current {
    background: url("../assets/footer/list-selected.png") center no-repeat;
    background-size: pxImage(70) pxImage(163);
}
.footer-nav__read--current {
    background: url("../assets/footer/read-selected.png") center no-repeat;
    background-size: pxImage(70) pxImage(163);
}
.footer-nav__account--current {
    background: url("../assets/footer/account-selected.png") center no-repeat;
    background-size: pxImage(70) pxImage(163);
}
</style>
