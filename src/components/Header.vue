<template>
<header class="header" v-bind:class="{ 'header--no-bottom-line': !bottomLine }">
  <h1 class="header__title">{{ title }}</h1>
  <a class="header__back" v-on:click="back" v-if="showBack"></a>
</header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    bottomLine: {
      type: Boolean,
      default: true,
    },
    showBack: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss">
// import
@import "../scss/vars";
@import "../scss/mixins";

$header_height: px(88);
$header_bg: #FFFFFF;

.header {
    height: $header_height;
    border-bottom: 1px solid $line_color;
    background-color: $header_bg;
}

.header--no-bottom-line {
    border-bottom: none;
}

.header__title {
    padding: 0 px(90);
    height: $header_height;
    line-height: $header_height;

    text-align: center;
    font-size: $font_size_header;
    @include text-truncate;
}
.header__back {
    background: url("../assets/header/back.png") center no-repeat;
    background-size: pxImage(28) pxImage(53);
    @include size($header_height);
    @include abs-pos(0, auto, auto, 0);
}
</style>
